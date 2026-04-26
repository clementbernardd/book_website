// "Que veux-tu ressentir ?" — 4 variations (modern)

const QuestionA = () => (
  <Frame>
    <NavBar />
    <div style={{ flex: 1, padding: '40px 80px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <Note>Grille d'icônes</Note>
      <Display size={52} style={{ textAlign: 'center' }}>
        Que veux-tu ressentir<br />aujourd'hui&nbsp;?
      </Display>
      <div style={{ fontSize: 13, color: W.mute, maxWidth: 480, textAlign: 'center', lineHeight: 1.6 }}>
        Choisis l'émotion qui te parle le plus en ce moment.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, width: '100%', marginTop: 16 }}>
        {EMOTIONS_8.map((e, i) => (
          <div key={e.label} style={{ background: i === 0 ? W.terraWash : W.fillSoft, border: i === 0 ? `1px solid ${W.terra}` : `1px solid ${W.lineSoft}`, borderRadius: 6, padding: 20, aspectRatio: '1/1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <Icon kind={e.icon} size={28} color={i === 0 ? W.terra : W.ink} />
            <div style={{ fontSize: 14, fontWeight: 500 }}>{e.label}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}><Btn primary big>Voir toutes les émotions</Btn></div>
    </div>
  </Frame>
);

const QuestionB = () => {
  const emotions = [
    { label: 'Joie', icon: 'spark', tone: 0 },
    { label: 'Sérénité', icon: 'leaf', tone: 0 },
    { label: 'Amour', icon: 'heart2', tone: 0 },
    { label: 'Gratitude', icon: 'feather', tone: 1 },
    { label: 'Espoir', icon: 'star', tone: 1 },
    { label: 'Tristesse', icon: 'wave', tone: 1 },
    { label: 'Peur', icon: 'mountain', tone: 2 },
    { label: 'Colère', icon: 'flame', tone: 2 },
    { label: 'Surprise', icon: 'spark', tone: 2 },
  ];
  const tones = [W.beige1, W.beige2, W.beige3];
  return (
    <Frame bg={W.paper}>
      <NavBar />
      <div style={{ flex: 1, padding: '40px 80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
        <Note style={{ alignSelf: 'flex-end' }}>Grille 3×3 sur ambiance</Note>
        <Display size={60} style={{ textAlign: 'center', fontStyle: 'italic' }}>
          Les émotions
        </Display>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, width: '100%', maxWidth: 720 }}>
          {emotions.map((e, i) => (
            <div key={e.label} style={{
              background: tones[e.tone],
              borderRadius: 6,
              aspectRatio: '1/1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              padding: 16,
              border: i === 4 ? `1px solid ${W.ink}` : 'none',
              boxShadow: '0 2px 12px rgba(78, 50, 26, 0.08)',
            }}>
              <Icon kind={e.icon} size={36} color={W.ink} />
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, color: W.ink }}>
                {e.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
};

const QuestionC = () => (
  <Frame>
    <NavBar />
    <div style={{ flex: 1, padding: '80px 100px', display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, color: W.mute, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>
          Étape 1 / 3
        </div>
        <Note>Phrase à compléter</Note>
      </div>
      <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 60, lineHeight: 1.15, fontWeight: 400, letterSpacing: -0.5 }}>
        Aujourd'hui je me sens<br />
        <span style={{ borderBottom: `2px solid ${W.terra}`, padding: '0 20px', color: W.terra, fontStyle: 'italic' }}>
          perdue
        </span>
        <span style={{ color: W.mute }}>,</span>
        <br />et j'ai envie de
        <span style={{ borderBottom: `2px dashed ${W.line}`, padding: '0 20px', marginLeft: 10, color: W.mute }}>
          ___________
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 500, marginRight: 8, alignSelf: 'center' }}>Suggestions</div>
        {['triste', 'fatiguée', 'perdue', 'curieuse', 'nostalgique', 'amoureuse', 'apaisée'].map(s => (
          <Tag key={s} active={s === 'perdue'}>{s}</Tag>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <span style={{ fontSize: 13, color: W.mute }}>← retour</span>
        <Btn primary big>Suite →</Btn>
      </div>
    </div>
  </Frame>
);

const QuestionD = () => (
  <Frame>
    <NavBar />
    <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Display size={44}>Place les curseurs selon ton humeur.</Display>
        <Note>3 axes, pas de catégories</Note>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36, padding: '30px 80px', margin: '20px auto 0', width: '100%', maxWidth: 900 }}>
        {[
          ['Calme', 'Intense', 0.7],
          ['Triste', 'Joyeux', 0.3],
          ['Réaliste', 'Évasion', 0.5],
        ].map(([a, b, v]) => (
          <div key={a}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13, color: W.mute }}>
              <span>← {a}</span><span>{b} →</span>
            </div>
            <div style={{ position: 'relative', height: 20 }}>
              <div style={{ position: 'absolute', top: 9, left: 0, right: 0, height: 2, background: W.line, borderRadius: 1 }} />
              <div style={{ position: 'absolute', top: 9, left: 0, width: `${v * 100}%`, height: 2, background: W.terra, borderRadius: 1 }} />
              <div style={{ position: 'absolute', top: 0, left: `calc(${v * 100}% - 10px)`, width: 20, height: 20, borderRadius: '50%', background: W.terra }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 10 }}>
        <Btn primary big>Trouve mon livre →</Btn>
        <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.3 }}>~ 17 livres correspondent</div>
      </div>
    </div>
  </Frame>
);

Object.assign(window, { QuestionA, QuestionB, QuestionC, QuestionD });
