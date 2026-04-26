import Breadcrumbs from '@/components/Breadcrumbs';

export default function AProposPage() {
  return (
    <div className="max-w-frame mx-auto px-10 py-10">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'À propos' }]} />

      <article className="mt-6 max-w-prose2 flex flex-col gap-6">
        <h1 className="font-serif text-5xl display-tight">À propos</h1>

        <p className="text-lg leading-relaxed">
          La Bibliothèque émotionnelle n&apos;est pas un catalogue. C&apos;est un espace qui
          accompagne les émotions à travers la lecture.
        </p>

        <p className="text-ink leading-relaxed">
          Au lieu de chercher un livre par genre, tu choisis une émotion — celle que tu
          ressens, ou celle dont tu as besoin. À chaque livre est associée une{' '}
          <em className="font-serif italic">empreinte émotionnelle</em> en cinq couches&nbsp;:
          émotion principale, nuance, intensité, effet recherché, contexte de vie.
        </p>

        <h2 className="font-serif text-2xl mt-6">Comment l&apos;empreinte est-elle calculée&nbsp;?</h2>
        <p className="text-ink leading-relaxed">
          Un petit modèle multilingue (sentence-transformers, MiniLM) compare la
          description de chaque livre à des phrases-graines décrivant chaque émotion.
          Il ne juge pas un livre, il propose une porte d&apos;entrée. Le modèle tourne
          localement, sans API ni coût.
        </p>

        <h2 className="font-serif text-2xl mt-6">D&apos;où viennent les livres&nbsp;?</h2>
        <p className="text-ink leading-relaxed">
          Les métadonnées (titre, auteur, résumé, couverture) sont récupérées depuis
          Open Library et Google Books. Les liens d&apos;achat sont construits à partir
          de l&apos;ISBN — Amazon, Fnac, BnF, WorldCat. Aucun affilié, aucun tracking.
        </p>
      </article>
    </div>
  );
}
