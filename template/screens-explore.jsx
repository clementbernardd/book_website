// Explorer par émotion — 4 variations (modern)

const ExploreEmoA = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Display size={42}>Explorer par émotion</Display>
        <Note>Tabs + cartes visuelles</Note>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['Toutes', 'Amour', 'Espoir', 'Tristesse', 'Réconfort', 'Évasion', 'Guérison', 'Inspiration'].map((t, i) => (
          <Tag key={t} active={i === 0} style={{ padding: '6px 14px', fontSize: 12 }}>{t}</Tag>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 8 }}>
        {['Amour naissant', 'Amour impossible', 'Se reconstruire', 'Retrouver espoir'].map((t, i) => (
          <div key={t} style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${W.lineSoft}` }}>
            <ImgBox h={220} label="image d'ambiance" />
            <div style={{ padding: 16, background: W.paper }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20 }}>{t}</div>
              <div style={{ fontSize: 11, color: W.mute, marginTop: 6, letterSpacing: 0.3 }}>{18 + i * 4} livres</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 12 }}><Btn primary big>Voir toutes les émotions</Btn></div>
    </div>
  </Frame>
);

const ExploreEmoB = () => (
  <Frame bg={W.fill}>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }}>
      <div>
        <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Les 6 familles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {EMOTIONS_6.map((e, i) => (
            <div key={e.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 4, background: i === 1 ? W.terraWash : 'transparent', borderLeft: i === 1 ? `2px solid ${W.terra}` : '2px solid transparent', cursor: 'pointer' }}>
              <Icon kind={e.icon} size={18} color={i === 1 ? W.terra : W.ink} />
              <span style={{ fontSize: 13, fontWeight: i === 1 ? 500 : 400 }}>{e.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Display size={40}>Aimer / vibrer</Display>
          <Note>Sidebar + grille</Note>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['amour', 'passion', 'attachement', 'attirance complexe'].map((s, i) => (
            <Tag key={s} active={i === 0} style={{ padding: '5px 12px' }}>{s}</Tag>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: 12, border: `1px solid ${W.lineSoft}`, borderRadius: 4 }}>
              <ImgBox w={54} h={78} label="" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 14, lineHeight: 1.2 }}>Titre du livre</div>
                <div style={{ fontSize: 11, color: W.mute }}>Auteur</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 'auto' }}>
                  <Tag style={{ fontSize: 9, padding: '1px 6px' }}>intense</Tag>
                  <Tag style={{ fontSize: 9, padding: '1px 6px' }}>cathartique</Tag>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Frame>
);

const ExploreEmoC = () => (
  <Frame bg={W.fillSoft}>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Display size={42}>Le champ des émotions</Display>
        <Note>Tailles = nombre de livres</Note>
      </div>
      <div style={{ fontSize: 13, color: W.mute, maxWidth: 560 }}>Survole pour voir un aperçu. Clique pour filtrer.</div>
      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '16px 24px', alignItems: 'center', justifyContent: 'center', alignContent: 'center', padding: 30 }}>
        {[
          ['amour', 56, true], ['tristesse', 42, false], ['espoir', 48, false], ['nostalgie', 34, false],
          ['passion', 28, false], ['solitude', 32, false], ['résilience', 36, false], ['sérénité', 26, false],
          ['manque', 22, false], ['aventure', 30, false], ['peur', 24, false], ['émerveillement', 32, false],
          ['douceur', 34, false], ['suspense', 22, false], ['inspiration', 34, false], ['fascination', 20, false],
          ['réconfort', 38, false], ['renouveau', 24, false], ['tension', 20, false], ['légèreté', 26, false],
        ].map(([t, size, active]) => (
          <span key={t} style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: size,
            fontWeight: active ? 500 : 400,
            color: active ? W.terra : W.ink,
            padding: '2px 10px',
            letterSpacing: -0.4,
            cursor: 'pointer',
            opacity: active ? 1 : 0.72,
          }}>{t}</span>
        ))}
      </div>
    </div>
  </Frame>
);

const ExploreEmoD = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Display size={40}>La carte des émotions</Display>
          <Note>Carte 2D spatiale</Note>
        </div>
        <div style={{ flex: 1, position: 'relative', background: W.fillSoft, borderRadius: 6, minHeight: 500 }}>
          <div style={{ position: 'absolute', inset: 50 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: `1px dashed ${W.line}` }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, borderLeft: `1px dashed ${W.line}` }} />
            <div style={{ position: 'absolute', top: -26, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: W.mute, letterSpacing: 1, textTransform: 'uppercase' }}>↑ intense</div>
            <div style={{ position: 'absolute', bottom: -26, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: W.mute, letterSpacing: 1, textTransform: 'uppercase' }}>doux ↓</div>
            <div style={{ position: 'absolute', left: -40, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: 11, color: W.mute, letterSpacing: 1, textTransform: 'uppercase' }}>sombre</div>
            <div style={{ position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontSize: 11, color: W.mute, letterSpacing: 1, textTransform: 'uppercase' }}>lumineux</div>
            {[
              ['amour', '70%', '30%', true], ['espoir', '72%', '60%', false],
              ['tristesse', '28%', '30%', false], ['sérénité', '62%', '80%', false],
              ['peur', '20%', '20%', false], ['nostalgie', '40%', '55%', false],
              ['aventure', '78%', '45%', false], ['solitude', '32%', '65%', false],
            ].map(([t, x, y, active]) => (
              <div key={t} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: active ? 14 : 8, height: active ? 14 : 8, borderRadius: '50%', background: active ? W.terra : W.ink, opacity: active ? 1 : 0.7 }} />
                <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: active ? 15 : 13, color: active ? W.terra : W.ink }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Box pad={18} radius={6} fill={W.terraWash} border={false}>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24 }}>Amour</div>
          <div style={{ fontSize: 12, color: W.mute, letterSpacing: 0.3, marginTop: 4 }}>48 livres ici</div>
          <TextBlock lines={3} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <ImgBox w={32} h={48} label="" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>Titre {i + 1}</div>
                  <TextLine width="70%" height={4} />
                </div>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  </Frame>
);

Object.assign(window, { ExploreEmoA, ExploreEmoB, ExploreEmoC, ExploreEmoD });
