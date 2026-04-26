# Bibliothèque émotionnelle

A static site that helps you find a book by **what you feel**, not by genre. Each book gets an *empreinte émotionnelle* in five layers (émotion principale, nuance, intensité, effet, contexte) and falls under one of six emotional families.

Built with Next.js (static export), Tailwind, and a tiny Python pipeline that classifies books with [sentence-transformers](https://www.sbert.net/) — locally, free, no API key. Hosted free on GitHub Pages.

## Stack

- **Frontend**: Next.js 15 (App Router) with `output: 'export'`, Tailwind CSS, Lucide icons.
- **Data**: committed JSON in `data/books/{isbn13}.json` + `data/index.json`. No DB.
- **Pipeline**: Python — Open Library + Google Books for metadata, sentence-transformers (`paraphrase-multilingual-MiniLM-L12-v2`) for classification.
- **Deploy**: GitHub Actions → GitHub Pages.

## Add a book

1. Edit `scripts/books.yaml` and add either an ISBN or a title + author:
   ```yaml
   books:
     - isbn: "9782070360024"
     - title: "La Promesse de l'aube"
       author: "Romain Gary"
       hints: "lien mère-fils, nostalgie"
   ```
2. Run the pipeline locally **or** trigger the **Classify books** workflow on GitHub.

### Locally

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r scripts/requirements.txt
python scripts/classify.py                          # only new books
python scripts/classify.py --force 9782070360024    # reclassify one ISBN
python scripts/classify.py --force-all              # full re-run after editing seeds
python scripts/classify.py --dry-run                # preview without writing
```

### From GitHub

Open the **Actions** tab → **Classify books** → **Run workflow**. The workflow runs the Python pipeline on the runner, commits the resulting JSON back to `main`, which triggers the deploy workflow automatically.

## Tuning the classifier

The seed phrases in `scripts/seeds.yaml` are the heart of the classifier. If a book lands in the wrong category:

1. Add or refine a seed phrase that better describes the *feeling* of books in that label (not the label name).
2. Run `python scripts/classify.py --force <isbn>` to reclassify.

The classifier is fully deterministic — same input + same seeds = same output.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to `out/`
npx serve out        # preview the production build
```

## Deploy

Push to `main`. The workflow at `.github/workflows/deploy.yml` builds and deploys to Pages.

If you serve at `https://<user>.github.io/site-livre/`, set `NEXT_PUBLIC_BASE_PATH=/site-livre` (already wired in the workflow). For a custom domain, leave it empty and add `public/CNAME`.

## Project map

```
app/                  Next.js App Router routes
components/           UI components (BookCard, EmotionalImprint, FilterPanel, …)
lib/                  Taxonomy, types, fs-based data loaders, URL builders
scripts/              Python pipeline (classify.py, fetchers.py, classifier.py, seeds.yaml)
data/                 Committed book JSON and slim index
public/covers/        Cached book covers (one-shot download from Open Library)
template/             Original Claude Design output (kept for reference, ignored at build)
```

## Notes

- No book scraping anywhere. Metadata comes from Open Library + Google Books; purchase URLs are constructed from the ISBN.
- Classification is offered, not authoritative. The empreinte is a doorway, not a verdict.
