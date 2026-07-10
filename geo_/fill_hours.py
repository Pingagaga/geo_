from __future__ import annotations

import argparse
import random
import re
import sys
import time
from pathlib import Path
from typing import Optional

import pandas as pd
import requests
from bs4 import BeautifulSoup


DEFAULT_EXCEL_PATH = "hahow_courses.xlsx"
REQUEST_TIMEOUT = 15
SLEEP_MIN = 0.5
SLEEP_MAX = 1.5
FALLBACK_HOURS_CHOICES = [3, 4, 5]

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.2592.87",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 "
    "(KHTML, like Gecko) Version/17.5 Safari/605.1.15",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Fill missing/zero total_hours in hahow_courses.xlsx by parsing page HTML text."
    )
    parser.add_argument(
        "--file",
        default=DEFAULT_EXCEL_PATH,
        help=f"Excel file path. Default: {DEFAULT_EXCEL_PATH}",
    )
    return parser.parse_args()


def is_valid_existing_hours(value: object) -> bool:
    if pd.isna(value):
        return False

    if isinstance(value, str):
        text = value.strip()
        if not text:
            return False
        numeric = pd.to_numeric(text, errors="coerce")
    else:
        numeric = pd.to_numeric(value, errors="coerce")

    if pd.isna(numeric):
        return False

    return float(numeric) > 0


def build_random_headers() -> dict[str, str]:
    return {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": random.choice(USER_AGENTS),
    }


def rounded_hours(hours: int, minutes: int) -> int:
    return hours + (1 if minutes >= 30 else 0)


def extract_hours_from_text(page_text: str) -> Optional[int]:
    compact_text = re.sub(r"\s+", " ", page_text)

    # 先抓「X 小時 Y 分鐘」
    mixed_match = re.search(r"(\d+)\s*小時\s*(\d+)\s*分(?:鐘)?", compact_text)
    if mixed_match:
        hours = int(mixed_match.group(1))
        minutes = int(mixed_match.group(2))
        return rounded_hours(hours, minutes)

    # 再抓「X 小時」
    hour_only_match = re.search(r"(\d+)\s*小時", compact_text)
    if hour_only_match:
        return int(hour_only_match.group(1))

    # 最後抓「Y 分鐘」
    minute_only_match = re.search(r"(\d+)\s*分(?:鐘)?", compact_text)
    if minute_only_match:
        minutes = int(minute_only_match.group(1))
        return rounded_hours(0, minutes)

    return None


def fetch_and_parse_hours(session: requests.Session, url: str) -> int:
    response = session.get(
        url,
        timeout=REQUEST_TIMEOUT,
        headers=build_random_headers(),
        allow_redirects=True,
    )
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    page_text = soup.get_text(separator=" ", strip=True)

    parsed_hours = extract_hours_from_text(page_text)
    if parsed_hours is None:
        raise ValueError("No recognizable duration text found in page HTML.")

    return parsed_hours


def fallback_hours() -> int:
    return random.choice(FALLBACK_HOURS_CHOICES)


def main() -> int:
    args = parse_args()
    excel_path = Path(args.file).expanduser().resolve()

    if not excel_path.exists():
        print(f"[ERROR] Excel file not found: {excel_path}", file=sys.stderr)
        return 1

    try:
        df = pd.read_excel(excel_path)
    except Exception as exc:
        print(f"[ERROR] Failed to read Excel file: {exc}", file=sys.stderr)
        return 1

    if "course_url" not in df.columns:
        print("[ERROR] Missing required column: course_url", file=sys.stderr)
        return 1

    if "total_hours" not in df.columns:
        print("[ERROR] Missing required column: total_hours", file=sys.stderr)
        return 1

    skip_count = 0
    filled_count = 0
    fallback_count = 0

    with requests.Session() as session:
        for idx, row in df.iterrows():
            row_no = idx + 2  # Excel row number (header is row 1)
            current_hours = row.get("total_hours")

            if is_valid_existing_hours(current_hours):
                skip_count += 1
                print(f"[SKIP] row={row_no} total_hours={current_hours}")
                continue

            course_url = str(row.get("course_url", "")).strip()
            if not course_url:
                hours = fallback_hours()
                df.at[idx, "total_hours"] = hours
                fallback_count += 1
                print(f"[FALLBACK] row={row_no} empty course_url -> total_hours={hours}")
                continue

            try:
                hours = fetch_and_parse_hours(session, course_url)
                df.at[idx, "total_hours"] = hours
                filled_count += 1
                print(f"[FILL] row={row_no} url={course_url} -> total_hours={hours}")
            except Exception as exc:
                hours = fallback_hours()
                df.at[idx, "total_hours"] = hours
                fallback_count += 1
                print(
                    f"[FALLBACK] row={row_no} url={course_url} reason={exc} "
                    f"-> total_hours={hours}"
                )
            finally:
                time.sleep(random.uniform(SLEEP_MIN, SLEEP_MAX))

    try:
        df.to_excel(excel_path, index=False)
    except Exception as exc:
        print(f"[ERROR] Failed to write Excel file: {exc}", file=sys.stderr)
        return 1

    print(
        "Done. "
        f"SKIP={skip_count}, FILLED={filled_count}, FALLBACK={fallback_count}, "
        f"Output={excel_path}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
