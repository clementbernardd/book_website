import { notFound } from 'next/navigation';
import { TAXONOMY, CATEGORY_BY_SLUG, SUBCATEGORY_LABEL } from '@/lib/taxonomy';
import { booksByCategory } from '@/lib/books';
import BookListItem from '@/components/BookListItem';
import FilterPanel from '@/components/FilterPanel';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
  return TAXONOMY.flatMap((c) =>
    c.subs.map((s) => ({ category: c.slug, subcategory: s.slug })),
  );
}

export const dynamicParams = false;

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;
  const cat = CATEGORY_BY_SLUG[category];
  if (!cat) notFound();
  const sub = cat.subs.find((s) => s.slug === subcategory);
  if (!sub) notFound();

  const books = booksByCategory(cat.slug, sub.slug);

  return (
    <div className="max-w-frame mx-auto px-10 py-10">
      <Breadcrumbs
        items={[
          { label: 'Accueil', href: '/' },
          { label: cat.label, href: `/emotion/${cat.slug}/` },
          { label: SUBCATEGORY_LABEL[sub.slug] ?? sub.label },
        ]}
      />

      <header className="mt-4 flex items-end justify-between gap-6 border-b border-lineSoft pb-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-mute font-medium">
            {cat.label} {cat.subLabel && <span className="italic font-normal">/ {cat.subLabel}</span>}
          </p>
          <h1 className="font-serif text-5xl display-tight mt-2">{sub.label}</h1>
        </div>
        <p className="text-xs uppercase tracking-wider text-mute font-medium">
          {books.length} {books.length === 1 ? 'livre' : 'livres'}
        </p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[200px_1fr]">
        <FilterPanel category={cat} activeSubcategory={sub.slug} />

        {books.length === 0 ? (
          <div className="rounded-card border border-dashed border-lineSoft p-10 text-center text-mute">
            Aucun livre n&apos;a encore trouvé sa place ici. Reviens bientôt.
          </div>
        ) : (
          <div className="flex flex-col">
            {books.map((b) => (
              <BookListItem key={b.isbn13} book={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
