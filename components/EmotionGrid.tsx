import Link from 'next/link';
import { TAXONOMY } from '@/lib/taxonomy';
import { countByCategory } from '@/lib/books';
import EmotionIcon from '@/components/primitives/EmotionIcon';
import { clsx } from '@/lib/clsx';

interface EmotionGridProps {
  variant?: 'default' | 'onMarron';
}

export default function EmotionGrid({ variant = 'default' }: EmotionGridProps) {
  const counts = TAXONOMY.map((c) => countByCategory(c.slug));
  const featured = counts.findIndex((n) => n > 0);
  const onDark = variant === 'onMarron';

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
              onDark
                ? isFeatured
                  ? 'border-paper bg-paper/15 hover:bg-paper/20'
                  : 'border-paper/30 bg-paper/5 hover:border-paper/60 hover:bg-paper/10'
                : isFeatured
                ? 'border-terra bg-terraWash'
                : 'border-lineSoft bg-fillSoft hover:border-line',
            )}
          >
            <EmotionIcon
              kind={cat.icon}
              size={28}
              className={clsx(
                onDark ? 'text-paper' : isFeatured ? 'text-terra' : 'text-ink',
              )}
            />
            <div>
              <div
                className={clsx(
                  'font-serif text-3xl leading-none tracking-display',
                  onDark ? 'text-paper' : 'text-ink',
                )}
              >
                {cat.label}
              </div>
              {cat.subLabel && (
                <div
                  className={clsx(
                    'mt-1 text-xs italic',
                    onDark ? 'text-terraSoft' : 'text-mute',
                  )}
                >
                  {cat.subLabel}
                </div>
              )}
              <div
                className={clsx(
                  'mt-3 text-[11px] uppercase tracking-wider font-medium',
                  onDark ? 'text-terraSoft' : 'text-mute',
                )}
              >
                {counts[i]} {counts[i] === 1 ? 'livre' : 'livres'} →
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
