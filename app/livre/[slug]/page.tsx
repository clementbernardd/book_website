import Image from 'next/image';
import { notFound } from 'next/navigation';
import { loadIndex, loadBook } from '@/lib/books';
import { CATEGORY_BY_SLUG, SUBCATEGORY_LABEL } from '@/lib/taxonomy';
import EmotionalImprint from '@/components/EmotionalImprint';
import PurchaseLinks from '@/components/PurchaseLinks';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
  return loadIndex().map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = loadBook(slug);
  if (!book) notFound();

  const cat = CATEGORY_BY_SLUG[book.category];

  return (
    <div className="max-w-frame mx-auto px-10 py-10">
      <Breadcrumbs
        items={[
          { label: 'Accueil', href: '/' },
          ...(cat ? [{ label: cat.label, href: `/emotion/${cat.slug}/` }] : []),
          {
            label: SUBCATEGORY_LABEL[book.subcategory] ?? book.subcategory,
            href: `/emotion/${book.category}/${book.subcategory}/`,
          },
          { label: book.title },
        ]}
      />

      <div className="mt-6 grid gap-12 lg:grid-cols-[260px_1fr_240px]">
        <div className="relative aspect-[2/3] w-full max-w-[260px] overflow-hidden rounded-card bg-canvas">
          {book.cover.src && (
            <Image
              src={book.cover.src}
              alt={book.title}
              fill
              sizes="260px"
              className="object-cover warm-photo"
              unoptimized
              priority
            />
          )}
        </div>

        <article className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h1 className="font-serif text-4xl display-tight">{book.title}</h1>
            <p className="text-mute">
              {book.authors.join(', ')}
              {book.publishedYear ? ` · ${book.publishedYear}` : ''}
              {book.publisher ? ` · ${book.publisher}` : ''}
            </p>
          </header>

          {book.summary && (
            <p className="text-ink leading-relaxed max-w-prose2 whitespace-pre-line">
              {book.summary}
            </p>
          )}

          <section className="mt-6 border-t border-lineSoft pt-6">
            <h2 className="font-serif text-2xl mb-5">Empreinte émotionnelle</h2>
            <EmotionalImprint imprint={book.imprint} />
          </section>
        </article>

        <PurchaseLinks isbn13={book.isbn13} isbn10={book.isbn10} />
      </div>
    </div>
  );
}
