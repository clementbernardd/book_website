import EmotionGrid from '@/components/EmotionGrid';

export default function HomePage() {
  return (
    <div className="max-w-frame mx-auto px-10 py-10 flex flex-col gap-6 min-h-[calc(100vh-12rem)]">
      <div className="flex items-end justify-between gap-6">
        <h1 className="font-serif text-5xl md:text-6xl display-tight">
          Aujourd&apos;hui, je veux…
        </h1>
        <p className="hidden md:block text-xs uppercase tracking-wider text-mute font-medium max-w-[18ch] text-right">
          La question est l&apos;accueil
        </p>
      </div>
      <EmotionGrid />
    </div>
  );
}
