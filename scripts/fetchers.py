"""Metadata fetching: Open Library + Google Books + cover download."""
from __future__ import annotations
import re
from pathlib import Path
from urllib.parse import urlencode
import httpx
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

UA = "BreezyCat/0.1 (+https://github.com/clementbernard/site-livre)"
TIMEOUT = httpx.Timeout(15.0)


def _retry():
    return retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=2, max=20),
        retry=retry_if_exception_type((httpx.TransportError, httpx.HTTPStatusError)),
        reraise=True,
    )


@_retry()
def _get(url: str) -> httpx.Response:
    r = httpx.get(url, headers={"User-Agent": UA}, timeout=TIMEOUT, follow_redirects=True)
    if r.status_code >= 500 or r.status_code == 429:
        r.raise_for_status()
    return r


def open_library_by_isbn(isbn: str) -> dict | None:
    url = f"https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data"
    r = _get(url)
    if r.status_code != 200:
        return None
    payload = r.json()
    return payload.get(f"ISBN:{isbn}")


def open_library_search(title: str, author: str | None = None) -> str | None:
    """Return ISBN-13 of the first match, or None.

    OL's search API hides the isbn array unless we explicitly request it via fields.
    From the (often huge) returned ISBN list we prefer French ISBN-13s (978-2-…)
    then any ISBN-13, then any ISBN.
    """
    params = {"title": title, "limit": "1", "fields": "title,author_name,isbn"}
    if author:
        params["author"] = author
    url = "https://openlibrary.org/search.json?" + urlencode(params)
    r = _get(url)
    if r.status_code != 200:
        return None
    docs = r.json().get("docs", [])
    if not docs:
        return None
    isbns = docs[0].get("isbn") or []
    # 1) ISBN-13 starting with 978-2 (French)
    for cand in isbns:
        if len(cand) == 13 and cand.startswith("9782"):
            return cand
    # 2) any ISBN-13
    for cand in isbns:
        if len(cand) == 13:
            return cand
    # 3) any ISBN-10 → convert
    for cand in isbns:
        if len(cand) == 10:
            return isbn10_to_isbn13(cand) or cand
    return None


def google_books_by_isbn(isbn: str) -> dict | None:
    url = f"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}"
    r = _get(url)
    if r.status_code != 200:
        return None
    items = r.json().get("items") or []
    if not items:
        return None
    return items[0].get("volumeInfo")


def google_books_search(title: str, author: str | None = None, lang: str = "fr") -> str | None:
    """Search Google Books and return the best ISBN-13.

    Prefer French editions (langRestrict=fr) — fall back to any language.
    """
    def _query(restrict_lang: bool) -> str | None:
        q = f'intitle:"{title}"'
        if author:
            q += f' inauthor:"{author}"'
        params = {"q": q, "maxResults": "5", "printType": "books"}
        if restrict_lang:
            params["langRestrict"] = lang
        r = _get("https://www.googleapis.com/books/v1/volumes?" + urlencode(params))
        if r.status_code != 200:
            return None
        items = r.json().get("items") or []
        for it in items:
            ids = (it.get("volumeInfo") or {}).get("industryIdentifiers") or []
            for ident in ids:
                if ident.get("type") == "ISBN_13":
                    return ident.get("identifier")
            for ident in ids:
                if ident.get("type") == "ISBN_10":
                    cand = isbn10_to_isbn13(ident.get("identifier", ""))
                    if cand:
                        return cand
        return None

    return _query(restrict_lang=True) or _query(restrict_lang=False)


def isbn13_to_isbn10(isbn13: str) -> str | None:
    if not re.fullmatch(r"\d{13}", isbn13) or not isbn13.startswith("978"):
        return None
    core = isbn13[3:12]
    total = sum((10 - i) * int(d) for i, d in enumerate(core))
    check = (11 - total % 11) % 11
    return core + ("X" if check == 10 else str(check))


def isbn10_to_isbn13(isbn10: str) -> str | None:
    raw = re.sub(r"[^0-9X]", "", isbn10.upper())
    if len(raw) != 10:
        return None
    core = "978" + raw[:9]
    total = sum(int(d) * (1 if i % 2 == 0 else 3) for i, d in enumerate(core))
    check = (10 - total % 10) % 10
    return core + str(check)


def normalize_isbn(s: str) -> str:
    return re.sub(r"[^0-9X]", "", s.upper())


def fetch_metadata(isbn: str | None, title: str | None, author: str | None) -> dict:
    """Returns a normalized dict ready for classification + writing."""
    if not isbn and title:
        # Prefer Google Books — picks better canonical editions than OL search.
        isbn = google_books_search(title, author) or open_library_search(title, author)
    if not isbn:
        raise ValueError(f"No ISBN found for title={title!r} author={author!r}")
    isbn = normalize_isbn(isbn)
    if len(isbn) == 10:
        isbn13 = isbn10_to_isbn13(isbn) or ""
        isbn10 = isbn
    elif len(isbn) == 13:
        isbn13 = isbn
        isbn10 = isbn13_to_isbn10(isbn) or ""
    else:
        raise ValueError(f"Invalid ISBN: {isbn!r}")

    ol = open_library_by_isbn(isbn13) or open_library_by_isbn(isbn10) or {}
    gb = google_books_by_isbn(isbn13) or google_books_by_isbn(isbn10) or {}

    title_out = (
        ol.get("title")
        or gb.get("title")
        or title
        or "Untitled"
    )
    authors = (
        [a.get("name") for a in ol.get("authors", []) if a.get("name")]
        or gb.get("authors")
        or ([author] if author else [])
    )
    summary = (
        gb.get("description")
        or (ol.get("notes", {}).get("value") if isinstance(ol.get("notes"), dict) else ol.get("notes"))
        or ""
    )
    if isinstance(summary, dict):
        summary = summary.get("value", "")
    summary = (summary or "").strip()

    publisher = None
    if ol.get("publishers"):
        publisher = ol["publishers"][0].get("name") if isinstance(ol["publishers"][0], dict) else ol["publishers"][0]
    publisher = publisher or gb.get("publisher")

    publish_year = None
    if ol.get("publish_date"):
        m = re.search(r"\d{4}", str(ol["publish_date"]))
        if m:
            publish_year = int(m.group(0))
    if not publish_year and gb.get("publishedDate"):
        m = re.search(r"\d{4}", gb["publishedDate"])
        if m:
            publish_year = int(m.group(0))

    language = (
        gb.get("language")
        or (ol.get("languages") or [{}])[0].get("key", "").rsplit("/", 1)[-1]
        or None
    )

    return {
        "isbn13": isbn13,
        "isbn10": isbn10 or None,
        "title": title_out,
        "authors": authors,
        "summary": summary,
        "publisher": publisher,
        "publishedYear": publish_year,
        "originalLanguage": language,
    }


def download_cover(isbn13: str, dest_dir: Path) -> tuple[str, str]:
    """Download cover from Open Library (size L). Returns (local_src, remote_url)."""
    dest_dir.mkdir(parents=True, exist_ok=True)
    remote = f"https://covers.openlibrary.org/b/isbn/{isbn13}-L.jpg"
    target = dest_dir / f"{isbn13}.jpg"
    if not target.exists():
        try:
            r = _get(remote)
            if r.status_code == 200 and len(r.content) > 1000:
                target.write_bytes(r.content)
        except Exception:
            pass
    src = f"/covers/{isbn13}.jpg" if target.exists() else remote
    return src, remote
