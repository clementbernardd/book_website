"""Classifier: sentence-transformers embeddings + cosine similarity vs. seed phrases."""
from __future__ import annotations
from functools import lru_cache
from pathlib import Path
import yaml
import numpy as np
from sentence_transformers import SentenceTransformer
from .taxonomy import TAXONOMY, INTENSITIES, EFFECTS

MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"

_SEEDS_PATH = Path(__file__).parent / "seeds.yaml"


@lru_cache(maxsize=1)
def _model() -> SentenceTransformer:
    return SentenceTransformer(MODEL_NAME)


def _emb(text: str | list[str]) -> np.ndarray:
    out = _model().encode(text, normalize_embeddings=True, convert_to_numpy=True)
    return out


@lru_cache(maxsize=1)
def _label_embs() -> dict[str, dict[str, np.ndarray]]:
    seeds = yaml.safe_load(_SEEDS_PATH.read_text(encoding="utf-8"))
    out: dict[str, dict[str, np.ndarray]] = {}
    for axis, labels in seeds.items():
        out[axis] = {}
        for label, phrases in labels.items():
            arr = _emb(phrases)
            mean = arr.mean(axis=0)
            mean = mean / (np.linalg.norm(mean) + 1e-12)
            out[axis][label] = mean
    return out


def _ranked(book_emb: np.ndarray, axis_seeds: dict[str, np.ndarray], restrict: list[str] | None = None):
    items = [(lbl, float(book_emb @ e)) for lbl, e in axis_seeds.items()
             if restrict is None or lbl in restrict]
    items.sort(key=lambda x: -x[1])
    return items


def classify(meta: dict) -> dict:
    """Return a classification result for a book metadata dict."""
    text = f"{meta.get('title', '')}. {', '.join(meta.get('authors') or [])}. {meta.get('summary', '')}"
    if meta.get("hints"):
        text += f" Indices: {meta['hints']}"
    book_emb = _emb(text)

    embs = _label_embs()

    cat_ranked = _ranked(book_emb, embs["category"])
    cat, cat_score = cat_ranked[0]
    cat_runner_score = cat_ranked[1][1] if len(cat_ranked) > 1 else 0.0

    sub_ranked = _ranked(book_emb, embs["subcategory"], restrict=TAXONOMY[cat]["subs"])
    sub, _sub_score = sub_ranked[0]

    intens_ranked = _ranked(book_emb, embs["intensity"])
    intens = intens_ranked[0][0]

    eff_ranked = _ranked(book_emb, embs["effect"])
    eff = eff_ranked[0][0]

    ctx_ranked = _ranked(book_emb, embs["context"])
    contexts = [c for c, score in ctx_ranked[:3] if score > 0.20][:2] or [ctx_ranked[0][0]]

    confidence = round(cat_score - cat_runner_score, 4)

    # Hard validation
    assert cat in TAXONOMY, f"bad category {cat!r}"
    assert sub in TAXONOMY[cat]["subs"], f"bad sub {sub!r} for {cat!r}"
    assert intens in INTENSITIES, f"bad intensity {intens!r}"
    assert eff in EFFECTS, f"bad effect {eff!r}"

    return {
        "category": cat,
        "subcategory": sub,
        "imprint": {
            "mainEmotion": sub,
            "nuance": sub,
            "intensity": intens,
            "effect": eff,
            "context": contexts,
        },
        "confidence": confidence,
        "classifiedWith": MODEL_NAME,
    }
