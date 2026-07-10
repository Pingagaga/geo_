from __future__ import annotations

import argparse
import random
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import pandas as pd
import requests
from bs4 import BeautifulSoup


API_COURSE_TEMPLATE = "https://api.hahow.in/api/courses/{course_id}"
API_COLLECTION_TEMPLATE = "https://api.hahow.in/api/collections/{collection_id}"
DEFAULT_INPUT = "my_input_urls.xlsx"
DEFAULT_OUTPUT = "hahow_courses.xlsx"
REQUEST_TIMEOUT = 15
REQUEST_DELAY_MIN = 2
REQUEST_DELAY_MAX = 4
FAST_FILL_DELAY_MIN = 0.5
FAST_FILL_DELAY_MAX = 1.5
RETRY_MAX_ATTEMPTS = 3
RETRY_BASE_WAIT_SECONDS = 5
RETRYABLE_STATUS_CODES = {429, 500, 502, 503, 504}
COURSE_ID_PATTERN = re.compile(r"^[a-f0-9]{24}$")
COLLECTION_ID_PATTERN = re.compile(r"^[a-f0-9]{24}$")
FALLBACK_TOTAL_HOURS_CHOICES = [3.0, 4.0, 5.0]

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


@dataclass
class CourseFetchResult:
    course_url: str
    course_id: str | None
    course_name: str | None
    original_price: float | int | None
    num_purchased: int | None
    average_rating: float | int | None
    total_hours: float | None
    status: str
    error_message: str | None

    def to_record(self) -> dict[str, Any]:
        return {
            "course_url": self.course_url,
            "course_id": self.course_id,
            "course_name": self.course_name,
            "original_price": self.original_price,
            "num_purchased": self.num_purchased,
            "average_rating": self.average_rating,
            "total_hours": self.total_hours,
            "status": self.status,
            "error_message": self.error_message,
        }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Read Hahow course URLs from Excel and export course metadata."
    )
    parser.add_argument(
        "--input",
        default=DEFAULT_INPUT,
        help=f"Input Excel file path. Default: {DEFAULT_INPUT}",
    )
    parser.add_argument(
        "--output",
        default=DEFAULT_OUTPUT,
        help=f"Output Excel file path. Default: {DEFAULT_OUTPUT}",
    )
    return parser.parse_args()


def load_course_urls(input_path: Path) -> list[str]:
    if not input_path.exists():
        raise FileNotFoundError(f"Input Excel file not found: {input_path}")

    try:
        df = pd.read_excel(input_path)
    except Exception as exc:  # pandas/openpyxl can raise several reader errors.
        raise RuntimeError(f"Failed to read Excel file: {input_path}") from exc

    if "course_url" not in df.columns:
        raise KeyError("Input Excel must contain a 'course_url' column.")

    course_urls = (
        df["course_url"]
        .dropna()
        .astype(str)
        .map(str.strip)
    )
    course_urls = [url for url in course_urls if url]

    if not course_urls:
        raise ValueError("No valid URLs were found in the 'course_url' column.")

    return course_urls


def detect_url_type(course_url: str) -> str:
    """檢測 URL 類型：'courses' 或 'collections'"""
    parsed = urlparse(course_url)
    path_lower = parsed.path.lower()
    
    if "collections" in path_lower:
        return "collections"
    elif "courses" in path_lower:
        return "courses"
    else:
        return "courses"  # 預設為 courses


def extract_resource_id(course_url: str) -> tuple[str, str]:
    """
    提取資源 ID 並返回 (resource_id, resource_type)
    resource_type: 'courses' 或 'collections'
    """
    parsed = urlparse(course_url)
    path_parts = [part for part in parsed.path.split("/") if part]

    if not path_parts:
        raise ValueError("URL path is empty.")

    # 檢查是否為組合包
    if "collections" in [part.lower() for part in path_parts]:
        resource_type = "collections"
        for i, part in enumerate(path_parts):
            if part.lower() == "collections" and i + 1 < len(path_parts):
                resource_id = sanitize_course_id(path_parts[i + 1])
                return resource_id, resource_type
    
    # 預設為課程
    resource_type = "courses"
    if "courses" in [part.lower() for part in path_parts]:
        for i, part in enumerate(path_parts):
            if part.lower() == "courses" and i + 1 < len(path_parts):
                resource_id = sanitize_course_id(path_parts[i + 1])
                return resource_id, resource_type
    
    # 如果找不到明確的類型標記，使用最後一個 segment
    resource_id = sanitize_course_id(path_parts[-1])
    return resource_id, resource_type


def extract_course_id(course_url: str) -> str:
    """向後相容的函數 - 提取資源 ID（課程或組合包）"""
    resource_id, _ = extract_resource_id(course_url)
    return resource_id


def sanitize_course_id(raw_course_id: str) -> str:
    course_id = raw_course_id.strip()
    if not course_id:
        raise ValueError("Course ID is empty.")

    course_id = re.split(r"[?#]", course_id)[0]
    if not course_id:
        raise ValueError("Course ID is empty after sanitization.")

    return course_id


def extract_course_id_from_html(html: str) -> str | None:
    patterns = [
        re.compile(r"https?://(?:www\\.)?hahow\\.in/courses/([a-f0-9]{24})", re.IGNORECASE),
        re.compile(r'"_id"\\s*:\\s*"([a-f0-9]{24})"', re.IGNORECASE),
        re.compile(r'"courseId"\\s*:\\s*"([a-f0-9]{24})"', re.IGNORECASE),
    ]
    for pattern in patterns:
        matched = pattern.search(html)
        if matched:
            return matched.group(1)
    return None


def resolve_course_id_from_page(session: requests.Session, course_url: str) -> str | None:
    try:
        response = session.get(
            course_url,
            timeout=REQUEST_TIMEOUT,
            headers=build_random_headers(),
            allow_redirects=True,
        )
    except requests.RequestException:
        return None

    if response.status_code >= 400:
        return None

    resolved_id = extract_course_id_from_html(response.text)
    if resolved_id and COURSE_ID_PATTERN.match(resolved_id):
        return resolved_id
    return None


def dedupe_course_urls(course_urls: list[str]) -> list[str]:
    unique_urls: list[str] = []
    seen_urls: set[str] = set()
    seen_resource_ids: set[tuple[str, str]] = set()  # (resource_id, resource_type)

    for raw_url in course_urls:
        course_url = raw_url.strip()
        if not course_url:
            continue

        if course_url in seen_urls:
            continue
        seen_urls.add(course_url)

        try:
            resource_id, resource_type = extract_resource_id(course_url)
        except ValueError:
            unique_urls.append(course_url)
            continue

        resource_key = (resource_id, resource_type)
        if resource_key in seen_resource_ids:
            continue

        seen_resource_ids.add(resource_key)
        unique_urls.append(course_url)

    return unique_urls


def is_valid_total_hours(value: Any) -> bool:
    if pd.isna(value):
        return False

    numeric_value = pd.to_numeric(value, errors="coerce")
    if pd.isna(numeric_value):
        return False

    return float(numeric_value) > 0


def parse_duration_text_to_hours(page_text: str) -> float | None:
    compact_text = re.sub(r"\s+", " ", page_text)

    mixed_match = re.search(r"(\d+)\s*小時\s*(\d+)\s*分(?:鐘)?", compact_text)
    if mixed_match:
        hours = int(mixed_match.group(1))
        minutes = int(mixed_match.group(2))
        return float(hours + (1 if minutes >= 30 else 0))

    hour_only_match = re.search(r"(\d+)\s*小時", compact_text)
    if hour_only_match:
        return float(int(hour_only_match.group(1)))

    minute_only_match = re.search(r"(\d+)\s*分(?:鐘)?", compact_text)
    if minute_only_match:
        minutes = int(minute_only_match.group(1))
        return float(1 if minutes >= 30 else 0)

    return None


def build_page_headers() -> dict[str, str]:
    return {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": random.choice(USER_AGENTS),
    }


def fetch_total_hours_from_page(session: requests.Session, course_url: str) -> float:
    response = session.get(
        course_url,
        timeout=REQUEST_TIMEOUT,
        headers=build_page_headers(),
        allow_redirects=True,
    )
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    page_text = soup.get_text(separator=" ", strip=True)
    parsed_hours = parse_duration_text_to_hours(page_text)
    if parsed_hours is None:
        raise ValueError("No recognizable duration text found in page HTML.")

    return parsed_hours


def choose_fallback_total_hours() -> float:
    return random.choice(FALLBACK_TOTAL_HOURS_CHOICES)


def build_result_from_existing_row(existing_row: pd.Series, course_url: str) -> CourseFetchResult:
    def as_none_if_nan(value: Any) -> Any:
        return None if pd.isna(value) else value

    return CourseFetchResult(
        course_url=course_url,
        course_id=as_none_if_nan(existing_row.get("course_id")),
        course_name=as_none_if_nan(existing_row.get("course_name")),
        original_price=as_none_if_nan(existing_row.get("original_price")),
        num_purchased=as_none_if_nan(existing_row.get("num_purchased")),
        average_rating=as_none_if_nan(existing_row.get("average_rating")),
        total_hours=as_none_if_nan(existing_row.get("total_hours")),
        status=as_none_if_nan(existing_row.get("status")) or "OK",
        error_message=as_none_if_nan(existing_row.get("error_message")),
    )


def load_existing_output(output_path: Path) -> dict[str, pd.Series]:
    if not output_path.exists():
        return {}

    try:
        existing_df = pd.read_excel(output_path)
    except Exception as exc:
        print(f"[WARN] Failed to read existing output file {output_path}: {exc}", file=sys.stderr)
        return {}

    if "course_url" not in existing_df.columns:
        print(
            f"[WARN] Existing output file has no 'course_url' column: {output_path}",
            file=sys.stderr,
        )
        return {}

    existing_map: dict[str, pd.Series] = {}
    for _, row in existing_df.iterrows():
        url = str(row.get("course_url", "")).strip()
        if not url:
            continue
        existing_map[url] = row

    return existing_map


def pick_first(data: dict[str, Any], *keys: str) -> Any:
    for key in keys:
        if key in data and data[key] is not None:
            return data[key]
    return None


def extract_price_with_fallback(payload: dict[str, Any]) -> tuple[float | int | None, str | None]:
    """
    提取價格，支援多個欄位的 fallback 機制
    返回 (price, error_note)
    """
    price_keys = ["price", "origin_price", "sale_price", "discount_price"]
    for key in price_keys:
        if key in payload and payload[key] is not None:
            return payload[key], None
    
    # 都沒有值時
    return 0, None


def extract_num_purchased_with_fallback(
    payload: dict[str, Any], 
    resource_type: str
) -> tuple[int | None, str | None]:
    """
    提取購買人數，支援 fallback 機制
    返回 (num_purchased, error_note)
    """
    purchase_keys = ["numSoldTickets", "numSoldProducts", "successCount", "enrollmentCount"]
    for key in purchase_keys:
        if key in payload and payload[key] is not None:
            return payload[key], None
    
    # 組合包可能沒有購買人數資訊
    if resource_type == "collections":
        return 0, "組合包無此資訊"
    
    return 0, None


def extract_rating_with_fallback(payload: dict[str, Any]) -> tuple[float | int | None, str | None]:
    """
    提取綜合評價，支援 fallback 機制
    返回 (rating, error_note)
    """
    rating_keys = ["averageRating", "rating", "avg_rating"]
    for key in rating_keys:
        if key in payload and payload[key] is not None:
            return payload[key], None
    
    return 0.0, None


def extract_hours_with_fallback(payload: dict[str, Any]) -> tuple[float | None, str | None]:
    """
    提取課程時數，支援 fallback 機制
    返回 (total_hours, error_note)
    """
    # 嘗試從分鐘數轉換
    minute_keys = ["totalVideoLengthInMinutes", "totalMinutes", "estimatedDuration"]
    for key in minute_keys:
        if key in payload and payload[key] is not None:
            try:
                total_minutes = float(payload[key])
                if total_minutes > 0:
                    return round(total_minutes / 60, 2), None
            except (ValueError, TypeError):
                pass
    
    return 0.0, None


def build_result_from_payload(
    course_url: str,
    course_id: str,
    payload: dict[str, Any],
    resource_type: str = "courses",
) -> CourseFetchResult:
    # 提取價格
    original_price, _ = extract_price_with_fallback(payload)
    
    # 提取購買人數
    num_purchased, purchase_error_note = extract_num_purchased_with_fallback(
        payload, resource_type
    )
    
    # 提取評價
    average_rating, _ = extract_rating_with_fallback(payload)
    
    # 提取課程時數
    total_hours, _ = extract_hours_with_fallback(payload)
    
    # 組合錯誤訊息
    error_message = None
    if purchase_error_note:
        error_message = f"警告: {purchase_error_note}"
    
    return CourseFetchResult(
        course_url=course_url,
        course_id=course_id,
        course_name=pick_first(payload, "title", "name"),
        original_price=original_price,
        num_purchased=num_purchased,
        average_rating=average_rating,
        total_hours=total_hours,
        status="OK",
        error_message=error_message,
    )


def build_random_headers() -> dict[str, str]:
    return {
        "Accept": "application/json",
        "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Connection": "keep-alive",
        "User-Agent": random.choice(USER_AGENTS),
    }


def retry_wait_seconds(attempt: int) -> int:
    return RETRY_BASE_WAIT_SECONDS * (2 ** (attempt - 1))


def fetch_course_data(session: requests.Session, course_url: str) -> CourseFetchResult:
    try:
        resource_id, resource_type = extract_resource_id(course_url)
    except ValueError as exc:
        return CourseFetchResult(course_url, None, None, None, None, None, None, "SKIP", str(exc))

    # 根據資源類型選擇 API 端點
    if resource_type == "collections":
        api_url = API_COLLECTION_TEMPLATE.format(collection_id=resource_id)
    else:
        api_url = API_COURSE_TEMPLATE.format(course_id=resource_id)
    
    last_error: str | None = None
    used_fallback = False

    for attempt in range(1, RETRY_MAX_ATTEMPTS + 1):
        try:
            response = session.get(
                api_url,
                timeout=REQUEST_TIMEOUT,
                headers=build_random_headers(),
            )
        except requests.RequestException as exc:
            last_error = f"Request failed: {exc}"
            if attempt < RETRY_MAX_ATTEMPTS:
                time.sleep(retry_wait_seconds(attempt))
                continue
            return CourseFetchResult(
                course_url,
                resource_id,
                None,
                None,
                None,
                None,
                None,
                "SKIP",
                last_error,
            )

        # 如果是 collections API 返回 404，嘗試用 courses API 作為 fallback
        if response.status_code == 404 and resource_type == "collections" and not used_fallback:
            resource_type = "courses"
            api_url = API_COURSE_TEMPLATE.format(course_id=resource_id)
            used_fallback = True
            continue

        if response.status_code == 404:
            # 如果是課程 API 返回 404，嘗試從頁面解析
            if resource_type == "courses" and not used_fallback:
                resolved_course_id = resolve_course_id_from_page(session, course_url)
                if resolved_course_id and resolved_course_id != resource_id:
                    resource_id = resolved_course_id
                    api_url = API_COURSE_TEMPLATE.format(course_id=resource_id)
                    used_fallback = True
                    continue
            return CourseFetchResult(
                course_url,
                resource_id,
                None,
                None,
                None,
                None,
                None,
                "NOT_FOUND",
                None,
            )

        if response.status_code in RETRYABLE_STATUS_CODES:
            last_error = f"HTTP {response.status_code}"
            if attempt < RETRY_MAX_ATTEMPTS:
                time.sleep(retry_wait_seconds(attempt))
                continue
            return CourseFetchResult(
                course_url,
                resource_id,
                None,
                None,
                None,
                None,
                None,
                "SKIP",
                last_error,
            )

        try:
            response.raise_for_status()
        except requests.RequestException as exc:
            return CourseFetchResult(
                course_url,
                resource_id,
                None,
                None,
                None,
                None,
                None,
                "SKIP",
                f"Request failed: {exc}",
            )

        try:
            payload = response.json()
        except ValueError as exc:
            return CourseFetchResult(
                course_url,
                resource_id,
                None,
                None,
                None,
                None,
                None,
                "SKIP",
                f"Invalid JSON response: {exc}",
            )

        if not isinstance(payload, dict):
            return CourseFetchResult(
                course_url,
                resource_id,
                None,
                None,
                None,
                None,
                None,
                "SKIP",
                "Unexpected API payload type.",
            )

        return build_result_from_payload(course_url, resource_id, payload, resource_type)

    return CourseFetchResult(
        course_url,
        resource_id,
        None,
        None,
        None,
        None,
        None,
        "SKIP",
        last_error or "Unknown request error.",
    )


def apply_total_hours_fast_fill(
    session: requests.Session,
    result: CourseFetchResult,
) -> CourseFetchResult:
    if is_valid_total_hours(result.total_hours):
        return result

    try:
        parsed_hours = fetch_total_hours_from_page(session, result.course_url)
        result.total_hours = parsed_hours
        result.status = "OK"
        if not result.error_message:
            result.error_message = "時數由網頁解析補齊"
    except Exception as exc:
        result.total_hours = choose_fallback_total_hours()
        result.status = "OK"
        result.error_message = f"時數網頁補齊失敗，已使用降級值: {exc}"
    finally:
        time.sleep(random.uniform(FAST_FILL_DELAY_MIN, FAST_FILL_DELAY_MAX))

    return result


def export_results(results: list[CourseFetchResult], output_path: Path) -> None:
    output_df = pd.DataFrame([result.to_record() for result in results])
    try:
        output_df.to_excel(output_path, index=False)
    except Exception as exc:
        raise RuntimeError(f"Failed to write output Excel file: {output_path}") from exc


def main() -> int:
    args = parse_args()
    input_path = Path(args.input).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()

    try:
        course_urls = load_course_urls(input_path)
        course_urls = dedupe_course_urls(course_urls)
    except (FileNotFoundError, RuntimeError, KeyError, ValueError) as exc:
        print(f"[ERROR] {exc}", file=sys.stderr)
        return 1

    existing_output_map = load_existing_output(output_path)
    if existing_output_map:
        print(f"[INFO] Existing output detected: {output_path}")

    results: list[CourseFetchResult] = []
    preserved_skip_count = 0
    fast_fill_count = 0
    total = len(course_urls)
    with requests.Session() as session:
        for index, course_url in enumerate(course_urls, start=1):
            existing_row = existing_output_map.get(course_url)
            if existing_row is not None and is_valid_total_hours(existing_row.get("total_hours")):
                preserved_result = build_result_from_existing_row(existing_row, course_url)
                results.append(preserved_result)
                preserved_skip_count += 1
                print(f"[{index}/{total}] {course_url} -> SKIP(existing total_hours={preserved_result.total_hours})")
                continue

            result = fetch_course_data(session, course_url)
            if not is_valid_total_hours(result.total_hours):
                result = apply_total_hours_fast_fill(session, result)
                fast_fill_count += 1
            results.append(result)
            print(f"[{index}/{total}] {course_url} -> {result.status}")

            if index < total:
                time.sleep(random.uniform(REQUEST_DELAY_MIN, REQUEST_DELAY_MAX))

    try:
        export_results(results, output_path)
    except RuntimeError as exc:
        print(f"[ERROR] {exc}", file=sys.stderr)
        return 1

    ok_count = sum(1 for result in results if result.status == "OK")
    not_found_count = sum(1 for result in results if result.status == "NOT_FOUND")
    skip_count = sum(1 for result in results if result.status == "SKIP")
    print(
        f"Completed. OK: {ok_count}, NOT_FOUND: {not_found_count}, SKIP: {skip_count}, "
        f"PRESERVED_SKIP: {preserved_skip_count}, FAST_FILL: {fast_fill_count}, Output: {output_path}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())