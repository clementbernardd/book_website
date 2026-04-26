import fs from 'node:fs';
import path from 'node:path';
import 'server-only';
import type { Book, BookIndexEntry } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const INDEX_PATH = path.join(DATA_DIR, 'index.json');

let _indexCache: BookIndexEntry[] | null = null;

export function loadIndex(): BookIndexEntry[] {
  if (_indexCache) return _indexCache;
  if (!fs.existsSync(INDEX_PATH)) {
    _indexCache = [];
    return _indexCache;
  }
  _indexCache = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8')) as BookIndexEntry[];
  return _indexCache;
}

export function loadBook(slug: string): Book | null {
  const entry = loadIndex().find((b) => b.slug === slug);
  if (!entry) return null;
  const file = path.join(DATA_DIR, 'books', `${entry.isbn13}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Book;
}

export function booksByCategory(category: string, subcategory?: string): BookIndexEntry[] {
  return loadIndex().filter(
    (b) => b.category === category && (!subcategory || b.subcategory === subcategory),
  );
}

export function countByCategory(category: string): number {
  return loadIndex().filter((b) => b.category === category).length;
}

export function countBySubcategory(subcategory: string): number {
  return loadIndex().filter((b) => b.subcategory === subcategory).length;
}
