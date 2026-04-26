import Link from 'next/link';
import { TAXONOMY, SUBCATEGORY_LABEL } from '@/lib/taxonomy';
import { loadIndex, countByCategory } from '@/lib/books';
import EmotionIcon from '@/components/primitives/EmotionIcon';
import BookCard from '@/components/BookCard';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ExplorerPage() {
  const books = loadIndex();
  // Default visible: first category that has books
  const firstWithBooks = TAXONOMY.find((c) => countByCategory(c.slug) > 0)
    ?? TAXONOMY[0];
  const visible = books.filter((b) => b.category === firstWithBooks.slug).slice(0, 12);

  return (
    <div className="max-w-frame mx-auto px-10 py-10">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Explorer' }]} />

      <header className="mt-4 border-b border-lineSoft pb-8">
        <h1 className="font-serif text-5xl display-tight">Explorer</h1>
        <p className="mt-3 text-mute max-w-prose1">
          Promène-toi dans les six familles d&apos;émotions. Choisis une porte d&apos;entrée.
        </p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="flex flex-col gap-1">
          <h3 className="text-[10px] uppercase tracking-wider text-mute font-medium mb-2">
            Familles
          </h3>
          {TAXONOMY.map((c) => {
            const n = countByCategory(c.slug);
            const active = c.slug === firstWithBooks.slug;
            return (
              <Link
                key={c.slug}
                href={`/emotion/${c.slug}/`}
                className={
                  active
                    ? 'flex items-center justify-between rounded-card border border-terra bg-terraWash px-3 py-2 text-sm'
                    : 'flex items-center justify-between rounded-card px-3 py-2 text-sm hover:bg-fillSoft'
                }
              >
                <span className="flex items-center gap-3">
                  <EmotionIcon kind={c.icon} size={18} className="text-terra" />
                  <span>{c.label}</span>
                </span>
                <span className="text-xs text-mute">{n}</span>
              </Link>
            );
          })}
        </aside>

        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-mute font-medium">
                {firstWithBooks.label} {firstWithBooks.subLabel && (
                  <span className="italic font-normal">/ {firstWithBooks.subLabel}</span>
                )}
              </p>
              <h2 className="font-serif text-3xl mt-1 tracking-display">
                {visible.length} {visible.length === 1 ? 'livre' : 'livres'}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {firstWithBooks.subs.slice(0, 4).map((s) => (
                <Link
                  key={s.slug}
                  href={`/emotion/${firstWithBooks.slug}/${s.slug}/`}
                  className="rounded-full border border-line px-3 py-1 text-xs text-ink hover:border-terra hover:text-terra"
                >
                  {SUBCATEGORY_LABEL[s.slug] ?? s.label}
                </Link>
              ))}
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-card border border-dashed border-lineSoft p-10 text-center text-mute">
              Aucun livre n&apos;a encore trouvé sa place ici.
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {visible.map((b) => (
                <BookCard key={b.isbn13} book={b} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
