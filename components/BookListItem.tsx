import Link from 'next/link';
import Image from 'next/image';
import type { BookIndexEntry } from '@/lib/types';
import { SUBCATEGORY_LABEL } from '@/lib/taxonomy';

const EFFECT_LABEL: Record<string, string> = {
  'apaisant': 'Apaisant',
  'cathartique': 'Cathartique',
  'inspirant': 'Inspirant',
  'déstabilisant': 'Déstabilisant',
};

export default function BookListItem({ book }: { book: BookIndexEntry }) {
  return (
    <Link
      href={`/livre/${book.slug}/`}
      className="group flex gap-6 border-b border-lineSoft py-6 transition-colors hover:bg-fillSoft px-2"
    >
      <div className="relative h-[140px] w-[94px] shrink-0 overflow-hidden rounded-card bg-canvas">
        {book.cover && (
          <Image
            src={book.cover}
            alt={book.title}
            fill
            sizes="94px"
            className="object-cover warm-photo"
            unoptimized
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div>
          <h3 className="font-serif text-2xl leading-tight">{book.title}</h3>
          <p className="text-sm text-mute">{book.authors[0]}</p>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-mute">
          <span className="rounded-full border border-line px-3 py-1 text-ink">
            {SUBCATEGORY_LABEL[book.subcategory] ?? book.subcategory}
          </span>
          <span className="rounded-full border border-line px-3 py-1">
            {book.intensity}
          </span>
          <span className="rounded-full border border-line px-3 py-1">
            {EFFECT_LABEL[book.effect] ?? book.effect}
          </span>
        </div>
      </div>
    </Link>
  );
}
