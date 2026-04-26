import Link from 'next/link';
import Image from 'next/image';
import type { BookIndexEntry } from '@/lib/types';
import { SUBCATEGORY_LABEL } from '@/lib/taxonomy';

export default function BookCard({ book }: { book: BookIndexEntry }) {
  return (
    <Link
      href={`/livre/${book.slug}/`}
      className="group flex flex-col gap-2 rounded-card border border-transparent p-2 transition-colors hover:border-line"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-card bg-canvas">
        {book.cover && (
          <Image
            src={book.cover}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
            className="object-cover warm-photo"
            unoptimized
          />
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-1 pt-1">
        <div className="font-serif text-base leading-tight">{book.title}</div>
        <div className="text-xs text-mute">{book.authors[0]}</div>
        <div className="mt-1 text-[10px] uppercase tracking-wider text-mute">
          {SUBCATEGORY_LABEL[book.subcategory] ?? book.subcategory}
        </div>
      </div>
    </Link>
  );
}
