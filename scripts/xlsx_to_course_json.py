import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path


NS = {
    "a": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}


def column_index(cell_ref):
    letters = "".join(ch for ch in cell_ref if ch.isalpha())
    value = 0
    for ch in letters:
        value = value * 26 + ord(ch.upper()) - 64
    return value - 1


def read_shared_strings(zf):
    if "xl/sharedStrings.xml" not in zf.namelist():
        return []
    root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
    values = []
    for item in root.findall("a:si", NS):
        values.append("".join(t.text or "" for t in item.findall(".//a:t", NS)))
    return values


def read_first_sheet_rows(xlsx_path):
    with zipfile.ZipFile(xlsx_path) as zf:
        shared_strings = read_shared_strings(zf)
        workbook = ET.fromstring(zf.read("xl/workbook.xml"))
        rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
        relmap = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels}
        sheet = workbook.find("a:sheets/a:sheet", NS)
        if sheet is None:
            raise RuntimeError("No worksheet found in workbook.")
        rel_id = sheet.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]
        target = relmap[rel_id].lstrip("/")
        sheet_path = target if target.startswith("xl/") else f"xl/{target}"
        root = ET.fromstring(zf.read(sheet_path))

        rows = []
        for row in root.findall(".//a:sheetData/a:row", NS):
            cells = {}
            for cell in row.findall("a:c", NS):
                index = column_index(cell.attrib.get("r", "A1"))
                node = cell.find("a:v", NS)
                value = ""
                if node is not None:
                    value = node.text or ""
                    if cell.attrib.get("t") == "s":
                        value = shared_strings[int(value)] if value else ""
                cells[index] = value
            if cells:
                rows.append([cells.get(i, "") for i in range(max(cells) + 1)])
        return sheet.attrib.get("name", "Sheet1"), rows


def clean_price(raw):
    text = str(raw or "")
    text = re.sub(r"(NT\$|NTD|TWD|元|,|\s)", "", text, flags=re.IGNORECASE)
    if not text:
        return None
    try:
        value = float(text)
    except ValueError:
        return None
    if not value or value <= 0:
        return None
    return int(round(value))


def clean_number(raw):
    text = str(raw or "").replace(",", "").strip()
    if not text:
        return None
    try:
        value = float(text)
    except ValueError:
        return None
    return value if value == value else None


def normalize_courses(rows):
    if not rows:
        raise RuntimeError("Workbook has no rows.")
    columns = [str(value).strip() for value in rows[0]]
    index = {name: i for i, name in enumerate(columns)}
    required = ["course_id", "course_name", "original_price"]
    missing = [name for name in required if name not in index]
    if missing:
        raise RuntimeError(f"Missing required columns: {', '.join(missing)}")

    courses = []
    warnings = []
    for offset, row in enumerate(rows[1:], start=2):
        def get(name):
            i = index.get(name)
            return row[i] if i is not None and i < len(row) else ""

        price = clean_price(get("original_price"))
        course_name = str(get("course_name") or "").strip()
        course_id = str(get("course_id") or "").strip()
        if not course_id:
            course_id = f"hahow-row-{offset}"
        if not course_name:
            warnings.append({"source_row": offset, "reason": "missing course_name"})
            continue
        if price is None:
            warnings.append({
                "source_row": offset,
                "course_id": course_id,
                "course_name": course_name,
                "reason": "invalid original_price",
                "raw_price": str(get("original_price") or ""),
            })
            continue

        rating = clean_number(get("average_rating"))
        students = clean_number(get("num_purchased"))
        duration_value = clean_number(get("total_hours"))
        duration = f"{int(duration_value) if duration_value and duration_value.is_integer() else duration_value} 小時" if duration_value else None

        courses.append({
            "course_id": course_id,
            "course_name": course_name,
            "price": price,
            "rating": rating,
            "students": int(round(students)) if students is not None else None,
            "duration": duration,
            "source_row": offset,
        })

    prices = [course["price"] for course in courses]
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_file": "geo_/hahow_courses.xlsx",
        "sheet_name": None,
        "columns": columns,
        "valid_count": len(courses),
        "invalid_count": len(warnings),
        "min_price": min(prices) if prices else None,
        "max_price": max(prices) if prices else None,
        "courses": courses,
        "warnings": warnings,
    }


def main():
    if len(sys.argv) != 3:
        print("Usage: xlsx_to_course_json.py <input.xlsx> <output.json>", file=sys.stderr)
        return 2
    xlsx_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    sheet_name, rows = read_first_sheet_rows(xlsx_path)
    payload = normalize_courses(rows)
    payload["sheet_name"] = sheet_name
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        f"Generated {output_path} from {xlsx_path}: "
        f"{payload['valid_count']} valid, {payload['invalid_count']} invalid, "
        f"price {payload['min_price']}..{payload['max_price']}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
