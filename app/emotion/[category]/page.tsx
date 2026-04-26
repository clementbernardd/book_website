import { notFound } from 'next/navigation';
import { TAXONOMY, CATEGORY_BY_SLUG } from '@/lib/taxonomy';
import { booksByCategory } from '@/lib/books';
import BookCard from '@/components/BookCard';
import FilterPanel from '@/components/FilterPanel';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
  return TAXONOMY.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORY_BY_SLUG[category];
  if (!cat) notFound();
  const books = booksByCategory(cat.slug);

  return (
    <div className="max-w-frame mx-auto px-10 py-10">
      <Breadcrumbs
        items={[
          { label: 'Accueil', href: '/' },
          { label: cat.label },
        ]}
      />
      <header className="mt-4 flex items-end justify-between gap-6 border-b border-lineSoft pb-8">
        <div>
          <h1 className="font-serif text-5xl display-tight">{cat.label}</h1>
          {cat.subLabel && (
            <p className="mt-1 text-mute italic font-serif text-lg">{cat.subLabel}</p>
          )}
        </div>
        <p className="text-xs uppercase tracking-wider text-mute font-medium">
          {books.length} {books.length === 1 ? 'livre' : 'livres'}
        </p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[200px_1fr]">
        <FilterPanel category={cat} />

        {books.length === 0 ? (
          <div className="rounded-card border border-dashed border-lineSoft p-10 text-center text-mute">
            Aucun livre n&apos;a encore trouvé sa place ici. Reviens bientôt.
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {books.map((b) => (
              <BookCard key={b.isbn13} book={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
