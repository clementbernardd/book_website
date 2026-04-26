import type { Intensity, Effect } from './taxonomy';

export interface EmotionalImprint {
  mainEmotion: string;
  nuance: string;
  intensity: Intensity;
  effect: Effect;
  context: string[];
}

export interface BookCover {
  src: string;
  remote: string;
}

export interface Book {
  isbn13: string;
  isbn10?: string;
  slug: string;
  title: string;
  authors: string[];
  originalLanguage?: string;
  publishedYear?: number;
  publisher?: string;
  summary?: string;
  cover: BookCover;
  imprint: EmotionalImprint;
  category: string;
  subcategory: string;
  confidence: number;
  classifiedAt: string;
  classifiedWith: string;
}

export interface BookIndexEntry {
  isbn13: string;
  slug: string;
  title: string;
  authors: string[];
  cover: string;
  category: string;
  subcategory: string;
  mainEmotion: string;
  intensity: Intensity;
  effect: Effect;
}
