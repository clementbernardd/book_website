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

    for entry in books:
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
