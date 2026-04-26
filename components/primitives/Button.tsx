import Link from 'next/link';
import { clsx } from '@/lib/clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'md' | 'lg';
  href?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = clsx(
    'inline-flex items-center justify-center rounded-full font-medium transition-colors',
    size === 'md' && 'px-5 py-2 text-sm',
    size === 'lg' && 'px-7 py-3 text-sm',
    variant === 'primary' && 'bg-terra text-paper hover:bg-ink',
    variant === 'outline' && 'border border-line text-ink hover:bg-fillSoft',
    className,
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
