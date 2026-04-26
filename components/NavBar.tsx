import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="border-b border-lineSoft bg-paper">
      <div className="max-w-frame mx-auto px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-lg">Bibliothèque</span>
          <span className="font-serif italic text-sm text-mute">émotionnelle</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/situation" className="hover:text-terra transition-colors">Situations</Link>
          <Link href="/explorer" className="hover:text-terra transition-colors">Explorer</Link>
          <Link href="/a-propos" className="hover:text-terra transition-colors">À propos</Link>
        </nav>
      </div>
    </header>
  );
}
