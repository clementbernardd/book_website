#!/usr/bin/env python3
"""CLI entrypoint: fetch metadata + classify + write JSON.

Usage:
    python scripts/classify.py                          # only new books
    python scripts/classify.py --force 9782070360024    # reclassify one ISBN
    python scripts/classify.py --force-all              # re-run after editing seeds.yaml
    python scripts/classify.py --dry-run                # fetch + classify, don't write
    python scripts/classify.py --input scripts/books.sample.yaml
"""
from __future__ import annotations
import argparse
import json
import sys
import time
import traceback
from pathlib import Path

import yaml

# Allow running as `python scripts/classify.py` (without -m)
if __package__ in (None, ""):
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
    from scripts.classifier import classify
    from scripts.fetchers import fetch_metadata, download_cover
    from scripts.writers import write_book, rebuild_index, BOOKS_DIR
else:
    from .classifier import classify
    from .fetchers import fetch_metadata, download_cover
    from .writers import write_book, rebuild_index, BOOKS_DIR

ROOT = Path(__file__).resolve().parent.parent
COVERS_DIR = ROOT / "public" / "covers"
DEFAULT_INPUT = ROOT / "scripts" / "books.yaml"


def already_classified(isbn13: str) -> bool:
    return (BOOKS_DIR / f"{isbn13}.json").exists()


def isbn_for(entry: dict) -> str | None:
    return str(entry["isbn"]) if entry.get("isbn") else None


def _normalize(s: str) -> str:
    import re, unicodedata
    s = unicodedata.normalize("NFD", s or "").encode("ascii", "ignore").decode("ascii").lower()
    return re.sub(r"[^a-z0-9]+", " ", s).strip()


def looks_valid(entry: dict, meta: dict) -> tuple[bool, str]:
    """Reject obviously-wrong fetches so they never reach the frontend.

    Returns (is_valid, reason_if_not).
    """
    title = (meta.get("title") or "").strip()
    if not title or title.lower() == "untitled":
        return False, "fetched title missing/Untitled"

    # When the user supplied a title, the fetched title must share at least
    # one significant word (≥ 4 chars after normalization). Catches wrong-book
    # matches like 'Belle du Seigneur' → 'Un petit sauvage'.
    user_title = (entry.get("title") or "").strip()
    if user_title:
        fetched_words = {w for w in _normalize(title).split() if len(w) >= 4}
        wanted_words  = {w for w in _normalize(user_title).split() if len(w) >= 4}
        if wanted_words and not (fetched_words & wanted_words):
            return False, f"fetched title {title!r} shares no significant word with requested {user_title!r}"

    # When the user supplied an author, last name must appear in the fetched authors.
    user_author = (entry.get("author") or "").strip()
    if user_author:
        last = _normalize(user_author).split()[-1] if _normalize(user_author).split() else ""
        fetched_authors_norm = " ".join(_normalize(a) for a in (meta.get("authors") or []))
        if last and last not in fetched_authors_norm:
            return False, f"fetched authors {meta.get('authors')!r} don't include {user_author!r}"

    return True, ""


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--input", default=str(DEFAULT_INPUT))
    p.add_argument("--force", help="Reclassify this single ISBN")
    p.add_argument("--force-all", action="store_true", help="Reclassify everything")
    p.add_argument("--dry-run", action="store_true", help="Fetch + classify but do not write")
    args = p.parse_args()

    src = Path(args.input)
    if not src.exists():
        print(f"Input file not found: {src}", file=sys.stderr)
        return 2

    payload = yaml.safe_load(src.read_text(encoding="utf-8")) or {}
    books = payload.get("books") or []

    n_processed = 0
    n_failed = 0
    failures: list[dict] = []
    rows: list[dict] = []

    for i, entry in enumerate(books):
        if i > 0:
            time.sleep(1.0)  # rate-friendly to Google Books / Open Library
        try:
            meta = fetch_metadata(
                isbn=isbn_for(entry),
                title=entry.get("title"),
                author=entry.get("author"),
            )
        except Exception as e:
            n_failed += 1
            failures.append({"entry": entry, "error": str(e)})
            print(f"  ✗ fetch failed: {entry} → {e}", file=sys.stderr)
            continue

        meta["hints"] = entry.get("hints")

        ok, why = looks_valid(entry, meta)
        if not ok:
            n_failed += 1
            failures.append({"entry": entry, "fetched": {"title": meta.get("title"), "authors": meta.get("authors"), "isbn13": meta.get("isbn13")}, "error": why})
            print(f"  ✗ rejected: {entry} — {why}", file=sys.stderr)
            continue

        if not args.force_all and not args.dry_run and already_classified(meta["isbn13"]):
            if args.force and args.force != meta["isbn13"]:
                print(f"  · skip {meta['isbn13']} ({meta['title']!r}) — already classified")
                continue
            if not args.force:
                print(f"  · skip {meta['isbn13']} ({meta['title']!r}) — already classified")
                continue

        try:
            cls = classify(meta)
        except Exception as e:
            n_failed += 1
            failures.append({"entry": entry, "error": str(e), "trace": traceback.format_exc()})
            print(f"  ✗ classify failed: {meta.get('title')!r} → {e}", file=sys.stderr)
            continue

        local_src, remote = ("", "")
        if not args.dry_run:
            local_src, remote = download_cover(meta["isbn13"], COVERS_DIR)
        cover = {"src": local_src, "remote": remote}

        row = {
            "title": meta["title"],
            "isbn13": meta["isbn13"],
            "category": cls["category"],
            "subcategory": cls["subcategory"],
            "intensity": cls["imprint"]["intensity"],
            "effect": cls["imprint"]["effect"],
            "confidence": cls["confidence"],
        }
        rows.append(row)
        print(f"  ✓ {meta['title']!r:60s} → {cls['category']}/{cls['subcategory']}  conf={cls['confidence']:.3f}")

        if args.dry_run:
            continue

        write_book(meta, cls, cover)
        n_processed += 1

    if not args.dry_run and (n_processed > 0 or args.force_all):
        n = rebuild_index()
        print(f"\n  index.json rebuilt with {n} books.")

    print(f"\nClassified: {n_processed}   Failed: {n_failed}   Skipped: {len(books) - n_processed - n_failed}")
    if failures:
        (ROOT / "scripts" / "failures.jsonl").write_text(
            "\n".join(json.dumps(f, ensure_ascii=False) for f in failures) + "\n",
            encoding="utf-8",
        )
        print(f"  → failures written to scripts/failures.jsonl")
    return 0 if n_failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
