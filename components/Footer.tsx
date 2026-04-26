export default function Footer() {
  return (
    <footer className="border-t border-lineSoft mt-24">
      <div className="max-w-frame mx-auto px-10 py-10 text-xs text-mute flex justify-between">
        <span>Bibliothèque émotionnelle · une lecture pour chaque état d&apos;âme</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
