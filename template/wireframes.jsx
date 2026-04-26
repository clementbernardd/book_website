// Modern wireframe primitives — clean, flat, no sketchy vibes

const W = {
  paper: '#f5ede0',
  canvas: '#ebe1d0',
  ink: '#3d2c1d',
  mute: '#8a7560',
  line: '#c9b69a',
  lineSoft: '#d8c8b0',
  terra: '#8a6a4a',
  terraSoft: '#c9a785',
  terraWash: '#e2d2bc',
  fill: '#d8c4a8',
  fillSoft: '#ece1cc',
  // Tonal beige scale for emotion dots
  beige1: '#e9dcc4',
  beige2: '#d6c4a3',
  beige3: '#bfa57f',
  beige4: '#a4855e',
  beige5: '#7d6041',
};

const FONT = "Inter, -apple-system, BlinkMacSystemFont, sans-serif";

// Box — solid borders, flat fill
const Box = ({ children, style = {}, fill, pad = 12, radius = 4, border = true, className = '' }) => (
  <div
    className={className}
    style={{
      border: border ? `1px solid ${W.line}` : 'none',
      borderRadius: radius,
      padding: pad,
      background: fill || 'transparent',
      ...style,
    }}
  >
    {children}
  </div>
);

// Curated warm "cocooning bookshop / café / books" photos (Unsplash)
// Lightly sepia-toned via inline filter so they sit in the warm palette.
const PHOTO_POOL = [
  // bookshelves
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=70&auto=format&fit=crop', // wooden bookshelf
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=70&auto=format&fit=crop', // warm library
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&q=70&auto=format&fit=crop', // cozy library armchair
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900&q=70&auto=format&fit=crop', // books stacked
  // open book + hands
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=70&auto=format&fit=crop', // open book on lap
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=70&auto=format&fit=crop', // hands holding book
  'https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?w=900&q=70&auto=format&fit=crop', // open book pages
  // café / tea
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=70&auto=format&fit=crop', // cup of coffee
  'https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?w=900&q=70&auto=format&fit=crop', // book + tea
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=70&auto=format&fit=crop', // notebook + coffee warm
  // window light / cocoon
  'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&q=70&auto=format&fit=crop', // book by window
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&q=70&auto=format&fit=crop', // shelves close
];

// Book cover-like vertical photos
const COVER_POOL = [
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551029506-0807df4e2031?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=70&auto=format&fit=crop',
];

// hash a string -> small int for stable photo picking
const _hash = s => { let h = 0; for (let i = 0; i < (s || '').length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); };
let _autoSeed = 0;

// Image — real photo with warm sepia tint matching the palette
const ImgBox = ({ w = '100%', h = 100, label, kind, seed, style = {} }) => {
  // Pick photo: covers for "cov"/short labels & narrow boxes; ambiance otherwise
  const isCover = kind === 'cover' || label === 'cov' || label === 'couverture' || label === 'couverture grande' || (typeof w === 'number' && w < 120);
  const pool = isCover ? COVER_POOL : PHOTO_POOL;
  const key = seed != null ? String(seed) : (label || '') + '|' + (kind || '') + '|' + (++_autoSeed);
  const idx = _hash(key) % pool.length;
  const url = pool[idx];
  return (
    <div
      style={{
        width: w,
        height: h,
        background: `#d9c6ad url(${url}) center/cover no-repeat`,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        filter: 'sepia(0.18) saturate(0.9) contrast(0.96) brightness(0.98)',
        boxShadow: 'inset 0 0 0 1px rgba(122, 90, 66, 0.12)',
        ...style,
      }}
      aria-label={label || ''}
    />
  );
};

// Text placeholder line
const TextLine = ({ width = '100%', height = 8, color = W.line }) => (
  <div style={{ width, height, background: color, borderRadius: 2 }} />
);

const TextBlock = ({ lines = 3, width = '100%' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width }}>
    {Array.from({ length: lines }).map((_, i) => (
      <TextLine key={i} width={i === lines - 1 && lines > 1 ? '60%' : '100%'} height={6} />
    ))}
  </div>
);

// Button
const Btn = ({ children, primary = false, big = false, style = {}, outline = false }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: big ? '14px 28px' : '8px 18px',
      border: primary ? 'none' : `1px solid ${W.ink}`,
      borderRadius: 999,
      background: primary ? W.terra : (outline ? 'transparent' : W.paper),
      fontFamily: FONT,
      fontSize: big ? 14 : 12,
      fontWeight: 500,
      color: primary ? W.paper : W.ink,
      ...style,
    }}
  >
    {children}
  </div>
);

// Tag
const Tag = ({ children, fill, active = false, style = {} }) => (
  <span style={{
    display: 'inline-block',
    padding: '4px 10px',
    border: `1px solid ${active ? W.ink : W.line}`,
    borderRadius: 999,
    background: fill || (active ? W.ink : 'transparent'),
    fontFamily: FONT,
    fontSize: 11,
    fontWeight: 500,
    color: active ? W.paper : W.ink,
    ...style,
  }}>
    {children}
  </span>
);

// Dot rating
const DotRating = ({ value = 3, max = 5, color = W.terra }) => (
  <div style={{ display: 'inline-flex', gap: 3 }}>
    {Array.from({ length: max }).map((_, i) => (
      <div key={i} style={{
        width: 8, height: 8, borderRadius: '50%',
        background: i < value ? color : W.line,
      }} />
    ))}
  </div>
);

// Minimal icon — simple line shapes
const Icon = ({ kind, size = 24, color = W.ink }) => {
  const s = { fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const shapes = {
    heart: <path d="M12 20 C 4 14, 3 8, 7 6 Q 10 4.5, 12 7 Q 14 4.5, 17 6 C 21 8, 20 14, 12 20 Z" {...s} />,
    leaf: <><path d="M12 4 Q 18 8, 17 18 Q 7 19, 6 11 Q 7 6, 12 4 Z" {...s} /><path d="M9 9 Q 12 14, 13 17" {...s} /></>,
    cup: <><path d="M6 8 L 6 17 Q 6 19, 8 19 L 15 19 Q 17 19, 17 17 L 17 8 Z" {...s} /><path d="M17 10 Q 20 10, 20 13 Q 20 16, 17 16" {...s} /><path d="M6 8 L 17 8" {...s} /></>,
    balloon: <><path d="M12 4 Q 17 4, 17 10 Q 17 14, 12 17 Q 7 14, 7 10 Q 7 4, 12 4 Z" {...s} /><path d="M12 17 L 11 22 M 12 17 L 13 22" {...s} /></>,
    star: <path d="M12 4 L 14 10 L 20 10.5 L 15.5 14.5 L 17 20 L 12 17 L 7 20 L 8.5 14.5 L 4 10.5 L 10 10 Z" {...s} />,
    mountain: <path d="M3 19 L 9 10 L 12 14 L 15 8 L 21 19 Z" {...s} />,
    moon: <path d="M16 5 Q 9 7, 9 12 Q 9 17, 16 19 Q 11 15, 11 12 Q 11 9, 16 5 Z" {...s} />,
    spark: <><path d="M12 3 L 12 9 M 12 15 L 12 21 M 3 12 L 9 12 M 15 12 L 21 12" {...s} /><circle cx="12" cy="12" r="1.5" {...s} /></>,
    book: <><path d="M4 5 L 4 19 L 12 17 L 20 19 L 20 5 L 12 7 Z" {...s} /><path d="M12 7 L 12 17" {...s} /></>,
    wave: <path d="M3 12 Q 6 9, 9 12 T 15 12 T 21 12" {...s} />,
    flame: <path d="M12 3 Q 8 8, 9 13 Q 7 11, 6 14 Q 6 19, 12 20 Q 18 19, 18 14 Q 17 11, 15 13 Q 16 8, 12 3 Z" {...s} />,
    feather: <><path d="M5 19 Q 13 11, 19 5" {...s} /><path d="M8 16 Q 13 14, 16 9 M 10 14 Q 14 12, 16 7" {...s} /></>,
    search: <><circle cx="11" cy="11" r="6" {...s} /><path d="M15.5 15.5 L 20 20" {...s} /></>,
    heart2: <path d="M12 19 C 5 14, 4 9, 7 7 Q 10 5.5, 12 8 Q 14 5.5, 17 7 C 20 9, 19 14, 12 19 Z" {...s} />,
    user: <><circle cx="12" cy="9" r="3.5" {...s} /><path d="M5 19 Q 7 14, 12 14 Q 17 14, 19 19" {...s} /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24">{shapes[kind]}</svg>;
};

// Nav bar — clean
const NavBar = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 40px', borderBottom: `1px solid ${W.lineSoft}`, background: W.paper }}>
    <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15, fontWeight: 500, letterSpacing: -0.2, lineHeight: 1.2 }}>
      Bibliothèque<br /><span style={{ fontStyle: 'italic', marginLeft: 14, fontWeight: 400 }}>Émotionnelle</span>
    </div>
    <div style={{ display: 'flex', gap: 28, fontFamily: FONT, fontSize: 13, color: W.ink, alignItems: 'center' }}>
      <span>Accueil</span>
      <span style={{ color: W.terra, fontWeight: 500 }}>Explorer</span>
      <span>Parcours</span>
      <span>À propos</span>
      <Icon kind="user" size={18} />
    </div>
  </div>
);

// Annotation — small label in a circle
const Note = ({ children, style = {} }) => (
  <div className="wf-note" style={{
    fontFamily: FONT,
    fontSize: 10,
    color: W.terra,
    fontWeight: 500,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '3px 8px',
    border: `1px dashed ${W.terra}`,
    borderRadius: 3,
    background: W.terraWash,
    ...style,
  }}>
    {children}
  </div>
);

const EMOTIONS_6 = [
  { label: 'Ressentir', sub: 'libérer', icon: 'wave' },
  { label: 'Aimer', sub: 'vibrer', icon: 'heart' },
  { label: 'Se reconstruire', sub: 'espérer', icon: 'leaf' },
  { label: "S'évader", sub: 'se perdre', icon: 'balloon' },
  { label: 'Ressentir intensément', sub: '', icon: 'flame' },
  { label: "S'apaiser", sub: 'ralentir', icon: 'moon' },
];

const EMOTIONS_8 = [
  { label: 'Amour', icon: 'heart' },
  { label: 'Espoir', icon: 'leaf' },
  { label: 'Réconfort', icon: 'cup' },
  { label: 'Évasion', icon: 'balloon' },
  { label: 'Nostalgie', icon: 'moon' },
  { label: 'Guérison', icon: 'spark' },
  { label: 'Inspiration', icon: 'star' },
  { label: 'Frissons', icon: 'mountain' },
];

// Page frame — consistent wrapper. Optional cocoon ambiance photo behind everything.
const Frame = ({ children, bg = W.paper, bgPhoto, bgWash = 0.88 }) => (
  <div style={{ position: 'relative', width: 1200, height: 780, background: bg, fontFamily: FONT, color: W.ink, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
    {bgPhoto && (
      <>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${bgPhoto})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'sepia(0.4) saturate(0.8) contrast(0.95) brightness(0.98)',
          zIndex: 0,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(245, 237, 224, ${bgWash})`, zIndex: 0 }} />
      </>
    )}
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {children}
    </div>
  </div>
);

// Serif display for headlines
const Display = ({ children, size = 56, style = {} }) => (
  <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: size, fontWeight: 400, lineHeight: 1.05, letterSpacing: -0.5, margin: 0, color: W.ink, ...style }}>
    {children}
  </h1>
);

Object.assign(window, { W, FONT, Box, ImgBox, TextLine, TextBlock, Btn, Tag, DotRating, Icon, NavBar, Note, EMOTIONS_6, EMOTIONS_8, Frame, Display });
