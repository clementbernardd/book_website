"""Write per-book JSON + rebuild the slim index."""
from __future__ import annotations
import json
from datetime import datetime, timezone
from pathlib import Path
from slugify import slugify

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
BOOKS_DIR = DATA_DIR / "books"
INDEX_PATH = DATA_DIR / "index.json"


def _slug(title: str, authors: list[str]) -> str:
    last = ""
    if authors:
        parts = authors[0].split()
        last = parts[-1] if parts else authors[0]
    return slugify(f"{title}-{last}", lowercase=True, max_length=80, word_boundary=True)


def write_book(meta: dict, classification: dict, cover: dict) -> Path:
    BOOKS_DIR.mkdir(parents=True, exist_ok=True)
    slug = _slug(meta["title"], meta.get("authors", []))
    obj = {
        "isbn13": meta["isbn13"],
        "isbn10": meta.get("isbn10"),
        "slug": slug,
        "title": meta["title"],
        "authors": meta.get("authors") or [],
        "originalLanguage": meta.get("originalLanguage"),
        "publishedYear": meta.get("publishedYear"),
        "publisher": meta.get("publisher"),
        "summary": meta.get("summary") or "",
        "cover": cover,
        "imprint": classification["imprint"],
        "category": classification["category"],
        "subcategory": classification["subcategory"],
        "confidence": classification["confidence"],
        "classifiedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "classifiedWith": classification["classifiedWith"],
    }
    out = BOOKS_DIR / f"{meta['isbn13']}.json"
    out.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return out


def rebuild_index() -> int:
    BOOKS_DIR.mkdir(parents=True, exist_ok=True)
    entries = []
    for f in sorted(BOOKS_DIR.glob("*.json")):
        b = json.loads(f.read_text(encoding="utf-8"))
        entries.append({
            "isbn13": b["isbn13"],
            "slug": b["slug"],
            "title": b["title"],
            "authors": b.get("authors", []),
            "cover": b["cover"]["src"],
            "category": b["category"],
            "subcategory": b["subcategory"],
            "mainEmotion": b["imprint"]["mainEmotion"],
            "intensity": b["imprint"]["intensity"],
            "effect": b["imprint"]["effect"],
        })
    INDEX_PATH.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return len(entries)
