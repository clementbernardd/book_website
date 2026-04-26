import type { Category } from '@/lib/taxonomy';
import Link from 'next/link';

interface FilterPanelProps {
  category: Category;
  activeSubcategory?: string;
}

export default function FilterPanel({ category, activeSubcategory }: FilterPanelProps) {
  return (
    <aside className="flex flex-col gap-7 text-sm">
      <div>
        <h3 className="text-[10px] uppercase tracking-wider text-mute font-medium mb-3">
          Nuance
        </h3>
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              href={`/emotion/${category.slug}/`}
              className={
                !activeSubcategory
                  ? 'text-terra font-medium'
                  : 'text-ink hover:text-terra'
              }
            >
              Toutes
            </Link>
          </li>
          {category.subs.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/emotion/${category.slug}/${s.slug}/`}
                className={
                  s.slug === activeSubcategory
                    ? 'text-terra font-medium'
                    : 'text-ink hover:text-terra'
                }
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-[10px] uppercase tracking-wider text-mute font-medium mb-3">
          Intensité
        </h3>
        <ul className="flex flex-col gap-2 text-ink">
          <li>Doux</li>
          <li>Modéré</li>
          <li>Bouleversant</li>
        </ul>
        <p className="text-[10px] italic text-mute mt-2">
          Filtres à venir
        </p>
      </div>

      <div>
        <h3 className="text-[10px] uppercase tracking-wider text-mute font-medium mb-3">
          Effet
        </h3>
        <ul className="flex flex-col gap-2 text-ink">
          <li>Apaisant</li>
          <li>Cathartique</li>
          <li>Inspirant</li>
          <li>Déstabilisant</li>
        </ul>
      </div>
    </aside>
  );
}
