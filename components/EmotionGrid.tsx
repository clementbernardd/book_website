import Link from 'next/link';
import { TAXONOMY } from '@/lib/taxonomy';
import { countByCategory } from '@/lib/books';
import EmotionIcon from '@/components/primitives/EmotionIcon';
import { clsx } from '@/lib/clsx';

export default function EmotionGrid() {
  const counts = TAXONOMY.map((c) => countByCategory(c.slug));
  const featured = counts.findIndex((n) => n > 0);

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:flex-1">
      {TAXONOMY.map((cat, i) => {
        const isFeatured = i === featured;
        return (
          <Link
            key={cat.slug}
            href={`/emotion/${cat.slug}/`}
            className={clsx(
              'group flex min-h-[180px] flex-col justify-between rounded-card border p-6 transition-colors',
              isFeatured
                ? 'border-terra bg-terraWash'
                : 'border-lineSoft bg-fillSoft hover:border-line',
            )}
          >
            <EmotionIcon
              kind={cat.icon}
              size={28}
              className={isFeatured ? 'text-terra' : 'text-ink'}
            />
            <div>
              <div className="font-serif text-3xl leading-none tracking-display">
                {cat.label}
              </div>
              {cat.subLabel && (
                <div className="mt-1 text-xs italic text-mute">{cat.subLabel}</div>
              )}
              <div className="mt-3 text-[11px] uppercase tracking-wider text-mute font-medium">
                {counts[i]} {counts[i] === 1 ? 'livre' : 'livres'} →
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
