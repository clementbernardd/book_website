import { purchaseLinksFor } from '@/lib/purchaseLinks';

export default function PurchaseLinks({
  isbn13,
  isbn10,
}: {
  isbn13: string;
  isbn10?: string;
}) {
  const links = purchaseLinksFor(isbn13, isbn10);
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[10px] uppercase tracking-wider text-mute font-medium">
        Où le trouver
      </div>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-card border border-line px-4 py-2.5 text-sm hover:border-terra hover:text-terra"
            >
              <span>{l.label}</span>
              <span className="text-mute">→</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
