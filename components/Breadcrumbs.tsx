import Link from 'next/link';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'ariane" className="text-xs text-mute">
      {items.map((c, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2 text-lineSoft">/</span>}
          {c.href ? (
            <Link href={c.href} className="hover:text-terra">
              {c.label}
            </Link>
          ) : (
            <span>{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
