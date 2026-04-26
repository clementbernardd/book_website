import { clsx } from '@/lib/clsx';

interface TagProps {
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ active, children, className }: TagProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs',
        active
          ? 'bg-terra text-paper border-terra'
          : 'bg-paper text-ink border-line',
        className,
      )}
    >
      {children}
    </span>
  );
}
