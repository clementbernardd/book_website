import { clsx } from '@/lib/clsx';

interface DotRatingProps {
  value: number; // 1..5
  max?: number;
  className?: string;
}

const FILL_BY_INDEX = [
  'bg-beige1',
  'bg-beige2',
  'bg-beige3',
  'bg-beige4',
  'bg-beige5',
];

export default function DotRating({ value, max = 5, className }: DotRatingProps) {
  return (
    <div className={clsx('flex items-center gap-1', className)} aria-label={`${value} sur ${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < value;
        return (
          <span
            key={i}
            className={clsx(
              'h-2 w-2 rounded-full',
              filled ? FILL_BY_INDEX[Math.min(value - 1, 4)] : 'bg-lineSoft',
            )}
          />
        );
      })}
    </div>
  );
}
