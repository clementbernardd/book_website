import type { EmotionalImprint as Imprint } from '@/lib/types';
import { CONTEXT_LABEL, INTENSITY_LEVEL, SUBCATEGORY_LABEL } from '@/lib/taxonomy';
import DotRating from '@/components/primitives/DotRating';

const EFFECT_LABEL: Record<string, string> = {
  'apaisant': 'Apaisant',
  'cathartique': 'Cathartique',
  'inspirant': 'Inspirant',
  'déstabilisant': 'Déstabilisant',
};

export default function EmotionalImprint({ imprint }: { imprint: Imprint }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Cell
        label="Émotion principale"
        value={SUBCATEGORY_LABEL[imprint.mainEmotion] ?? imprint.mainEmotion}
      />
      <Cell label="Nuance" value={imprint.nuance} italic />

      <Cell label="Intensité" value={imprint.intensity}>
        <DotRating value={INTENSITY_LEVEL[imprint.intensity] ?? 3} />
      </Cell>
      <Cell label="Effet" value={EFFECT_LABEL[imprint.effect] ?? imprint.effect} />

      {imprint.context.length > 0 && (
        <div className="sm:col-span-2">
          <div className="text-[10px] uppercase tracking-wider text-mute font-medium">
            À lire si tu traverses
          </div>
          <ul className="mt-2 flex flex-wrap gap-2">
            {imprint.context.map((c) => (
              <li
                key={c}
                className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-ink"
              >
                {CONTEXT_LABEL[c] ?? c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Cell({
  label,
  value,
  italic,
  children,
}: {
  label: string;
  value: string;
  italic?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-mute font-medium">{label}</div>
      <div className={`mt-1 font-serif text-xl ${italic ? 'italic' : ''}`}>{value}</div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}
