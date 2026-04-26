import Link from 'next/link';
import { SITUATIONS } from '@/lib/taxonomy';
import { loadIndex } from '@/lib/books';
import Breadcrumbs from '@/components/Breadcrumbs';

function countByContext(ctx: string): number {
  // We can't know context from the slim index alone — for now, show 0 and
  // resolve to a "tous les livres" anchor. A future enhancement will index
  // contexts in index.json.
  void ctx;
  return loadIndex().length;
}

export default function SituationPage() {
  return (
    <div className="max-w-frame mx-auto px-10 py-10">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Situations' }]} />

      <header className="mt-4 border-b border-lineSoft pb-8">
        <h1 className="font-serif text-5xl display-tight">Des livres pour traverser…</h1>
        <p className="mt-3 text-mute max-w-prose1">
          Quelques moments de la vie auxquels la lecture peut tenir compagnie.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SITUATIONS.map((s) => {
          const n = countByContext(s.slug);
          return (
            <Link
              key={s.slug}
              href={`/explorer/?contexte=${s.slug}`}
              className="group flex min-h-[160px] flex-col justify-between rounded-card border border-lineSoft bg-fillSoft p-6 transition-colors hover:border-line"
            >
              <div className="text-[10px] uppercase tracking-wider text-mute font-medium">
                {s.tags.join(' · ')}
              </div>
              <div>
                <h2 className="font-serif text-3xl tracking-display">{s.label}</h2>
                <div className="mt-3 text-[11px] uppercase tracking-wider text-mute font-medium">
                  {n} {n === 1 ? 'livre' : 'livres'} →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
