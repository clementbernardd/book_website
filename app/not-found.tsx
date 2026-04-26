import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-frame mx-auto px-10 py-24 text-center flex flex-col items-center gap-6">
      <h1 className="font-serif text-5xl display-tight">Aucun livre ici, pour l&apos;instant.</h1>
      <p className="text-mute max-w-prose1">
        Cette page n&apos;existe pas — ou pas encore. Reviens à l&apos;accueil et choisis
        une émotion.
      </p>
      <Link
        href="/"
        className="rounded-full bg-terra px-6 py-2.5 text-sm text-paper hover:bg-ink"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
