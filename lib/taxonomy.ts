export type IconKind =
  | 'wave' | 'heart' | 'leaf' | 'balloon' | 'flame' | 'moon';

export interface Subcategory {
  slug: string;
  label: string;
}

export interface Category {
  slug: string;
  label: string;
  subLabel: string;
  icon: IconKind;
  subs: Subcategory[];
}

export const TAXONOMY: Category[] = [
  {
    slug: 'ressentir-liberer',
    label: 'Ressentir',
    subLabel: 'libérer',
    icon: 'wave',
    subs: [
      { slug: 'tristesse', label: 'Tristesse' },
      { slug: 'solitude', label: 'Solitude' },
      { slug: 'nostalgie', label: 'Nostalgie' },
      { slug: 'manque', label: 'Manque' },
    ],
  },
  {
    slug: 'aimer-vibrer',
    label: 'Aimer',
    subLabel: 'vibrer',
    icon: 'heart',
    subs: [
      { slug: 'amour', label: 'Amour' },
      { slug: 'passion', label: 'Passion' },
      { slug: 'attachement', label: 'Attachement' },
      { slug: 'attirance-complexe', label: 'Attirance complexe' },
    ],
  },
  {
    slug: 'se-reconstruire',
    label: 'Se reconstruire',
    subLabel: 'espérer',
    icon: 'leaf',
    subs: [
      { slug: 'espoir', label: 'Espoir' },
      { slug: 'resilience', label: 'Résilience' },
      { slug: 'renouveau', label: 'Renouveau' },
      { slug: 'sens-inspiration', label: 'Sens / inspiration' },
    ],
  },
  {
    slug: 'sevader',
    label: 'S’évader',
    subLabel: 'se perdre',
    icon: 'balloon',
    subs: [
      { slug: 'emerveillement', label: 'Émerveillement' },
      { slug: 'curiosite', label: 'Curiosité' },
      { slug: 'aventure', label: 'Aventure' },
      { slug: 'imaginaire', label: 'Imaginaire' },
    ],
  },
  {
    slug: 'ressentir-intensement',
    label: 'Ressentir intensément',
    subLabel: '',
    icon: 'flame',
    subs: [
      { slug: 'peur', label: 'Peur' },
      { slug: 'tension', label: 'Tension' },
      { slug: 'choc', label: 'Choc' },
      { slug: 'fascination', label: 'Fascination' },
      { slug: 'suspense', label: 'Suspense' },
    ],
  },
  {
    slug: 'sapaiser',
    label: 'S’apaiser',
    subLabel: 'ralentir',
    icon: 'moon',
    subs: [
      { slug: 'serenite', label: 'Sérénité' },
      { slug: 'douceur', label: 'Douceur' },
      { slug: 'reconfort', label: 'Réconfort' },
      { slug: 'legerete', label: 'Légèreté' },
    ],
  },
];

export const CATEGORY_BY_SLUG: Record<string, Category> = Object.fromEntries(
  TAXONOMY.map((c) => [c.slug, c]),
);

export const SUBCATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  TAXONOMY.flatMap((c) => c.subs.map((s) => [s.slug, s.label])),
);

export type Intensity = 'doux' | 'modéré' | 'bouleversant';
export type Effect = 'apaisant' | 'cathartique' | 'inspirant' | 'déstabilisant';

export const INTENSITY_LEVEL: Record<Intensity, number> = {
  'doux': 1,
  'modéré': 3,
  'bouleversant': 5,
};

export const CONTEXT_LABEL: Record<string, string> = {
  'rupture': 'Rupture',
  'deuil': 'Deuil',
  'solitude': 'Solitude',
  'quete-de-sens': 'Quête de sens',
  'burn-out': 'Burn-out',
  'exil': 'Exil',
  'parentalite': 'Parentalité',
  'transition': 'Transition',
  'adolescence': 'Adolescence',
  'vieillesse': 'Vieillesse',
};

export const SITUATIONS: { slug: string; label: string; tags: string[] }[] = [
  { slug: 'rupture',       label: 'Une rupture',         tags: ['amour perdu', 'reconstruction'] },
  { slug: 'deuil',         label: 'Un deuil',            tags: ['absence', 'mémoire'] },
  { slug: 'solitude',      label: 'La solitude',         tags: ['isolement', 'silence'] },
  { slug: 'quete-de-sens', label: 'Une quête de sens',   tags: ['vocation', 'doute'] },
  { slug: 'transition',    label: 'Une transition',      tags: ['changement', 'nouveau départ'] },
  { slug: 'parentalite',   label: 'La parentalité',      tags: ['enfance', 'transmission'] },
];
