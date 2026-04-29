import EmotionGrid from '@/components/EmotionGrid';

export default function HomePage() {
  return (
    <div className="bg-marron text-paper">
      <div className="max-w-frame mx-auto px-10 py-14 flex flex-col gap-8 min-h-[calc(100vh-12rem)]">
        <div className="flex items-end justify-between gap-6">
          <h1 className="font-serif text-5xl md:text-6xl display-tight">
            Aujourd&apos;hui, je veux…
          </h1>
          <p className="hidden md:block text-xs uppercase tracking-wider text-terraSoft font-medium max-w-[18ch] text-right">
            La question est l&apos;accueil
          </p>
        </div>
        <EmotionGrid variant="onMarron" />
      </div>
    </div>
  );
}
