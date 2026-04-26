import { clsx } from '@/lib/clsx';

interface CardProps {
  highlighted?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Card({ highlighted, className, children }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-card border transition-colors',
        highlighted
          ? 'bg-terraWash border-terra'
          : 'bg-fillSoft border-lineSoft hover:border-line',
        className,
      )}
    >
      {children}
    </div>
  );
}
