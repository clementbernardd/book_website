// Résultats d'une émotion — 4 variations (modern)

const ResultsA = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '24px 40px 40px', flex: 1, display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 12, color: W.mute }}>← émotions</div>
        <div>
          <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>Nuance</div>
          {['amour naissant', 'amour impossible', 'amour réparateur'].map((s, i) => (
            <div key={s} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, margin: '6px 0' }}>
              <span style={{ width: 12, height: 12, borderRadius: 2, border: `1px solid ${W.line}`, background: i === 0 ? W.terra : 'transparent' }} />{s}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>Intensité</div>
          {['doux', 'modéré', 'bouleversant'].map(s => (
            <div key={s} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, margin: '6px 0' }}>
              <span style={{ width: 12, height: 12, borderRadius: 2, border: `1px solid ${W.line}` }} />{s}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>Prix max</div>
          <div style={{ position: 'relative', height: 16 }}>
            <div style={{ position: 'absolute', top: 7, left: 0, right: 0, height: 2, background: W.line }} />
            <div style={{ position: 'absolute', top: 7, left: 0, width: '60%', height: 2, background: W.terra }} />
            <div style={{ position: 'absolute', top: 0, left: 'calc(60% - 8px)', width: 16, height: 16, borderRadius: '50%', background: W.terra }} />
          </div>
          <div style={{ fontSize: 11, color: W.mute, marginTop: 6 }}>jusqu'à 18 €</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>Revendeur</div>
          {['Fnac', 'Cultura', 'Amazon', 'Leslibraires', 'Momox (occas.)'].map(s => (
            <div key={s} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, margin: '5px 0' }}>
              <span style={{ width: 12, height: 12, borderRadius: 2, border: `1px solid ${W.line}` }} />{s}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <Display size={40}>Amour</Display>
            <div style={{ fontSize: 12, color: W.mute, marginTop: 4 }}>27 livres</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Note>Grille + filtres</Note>
            <div style={{ fontSize: 12, color: W.mute }}>trier : intensité ▾</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <ImgBox h={170} label="couverture" />
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15, lineHeight: 1.2 }}>Titre {i + 1}</div>
              <div style={{ fontSize: 11, color: W.mute }}>Auteur</div>
              <Tag style={{ fontSize: 9, padding: '1px 6px', alignSelf: 'flex-start' }}>{['doux', 'intense', 'bouleversant'][i % 3]}</Tag>
              <div style={{ fontSize: 13, color: W.terra, fontWeight: 500 }}>dès 8,90 €</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Frame>
);

const ResultsB = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '24px 40px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <Display size={42}>Espoir</Display>
          <div style={{ fontSize: 13, color: W.mute, marginTop: 6 }}>31 livres pour retrouver la lumière</div>
        </div>
        <Note>Liste comparateur</Note>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {['résilience', 'renouveau', 'inspiration', 'sens'].map((t, i) => (
          <Tag key={t} active={i === 0}>{t}</Tag>
        ))}
        <span style={{ flex: 1 }} />
        <Tag>⊞ grille</Tag><Tag active>≡ liste</Tag><Tag>{'< 15€'}</Tag>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 200px 180px', gap: 20, padding: '10px 6px', fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, borderBottom: `1px solid ${W.line}` }}>
          <span></span><span>Livre</span><span>Empreinte</span><span>Prix</span>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 200px 180px', gap: 20, padding: '14px 6px', borderBottom: `1px solid ${W.lineSoft}`, alignItems: 'center' }}>
            <ImgBox w={54} h={78} label="" />
            <div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18 }}>Titre du livre {i + 1}</div>
              <div style={{ fontSize: 11, color: W.mute, marginTop: 2 }}>Auteur · roman · 2024</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11 }}><span style={{ width: 60, color: W.mute }}>Espoir</span><DotRating value={4 - (i % 3)} /></div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11 }}><span style={{ width: 60, color: W.mute }}>Intensité</span><DotRating value={2 + (i % 4)} color={W.ink} /></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 16, color: W.terra, fontWeight: 500 }}>dès {9 + i},{(i * 10) % 90 || 50} €</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {['Fnac', 'Cultura', 'Momox'].map(s => <Tag key={s} style={{ fontSize: 9, padding: '1px 6px' }}>{s}</Tag>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const ResultsC = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '24px 40px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Display size={42}>Pour traverser une rupture</Display>
        <Note>Mise en page éditoriale</Note>
      </div>
      <div style={{ fontSize: 13, color: W.mute, maxWidth: 560, lineHeight: 1.6 }}>
        Une sélection choisie avec soin. Commencez par le livre à lire en premier, puis suivez le fil.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14, flex: 1 }}>
        <div style={{ gridRow: 'span 2', background: W.terraWash, borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 11, color: W.terra, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>À lire en premier</div>
          <ImgBox h={240} label="couverture grande" />
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 28, lineHeight: 1.1 }}>Nos étoiles contraires</div>
          <div style={{ fontSize: 12, color: W.mute }}>John Green</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: W.ink, fontStyle: 'italic' }}>
            « Un livre qui fait pleurer… et du bien. »
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 16, color: W.terra, fontWeight: 500 }}>dès 8,90 €</div>
            <Btn primary>Voir →</Btn>
          </div>
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ border: `1px solid ${W.lineSoft}`, borderRadius: 6, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <ImgBox h={110} label="" />
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15 }}>Titre {i + 2}</div>
            <Tag style={{ fontSize: 9, padding: '1px 6px', alignSelf: 'flex-start' }}>{['doux', 'intense', 'cathartique', 'lumineux'][i]}</Tag>
            <div style={{ fontSize: 12, color: W.terra, fontWeight: 500, marginTop: 'auto' }}>dès {7 + i},90 €</div>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const ResultsD = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '24px 40px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Display size={38}>Nostalgie · du plus doux au plus bouleversant</Display>
        <Note>Axe d'intensité</Note>
      </div>
      <div style={{ position: 'relative', flex: 1, marginTop: 20 }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: W.line }} />
        <div style={{ position: 'absolute', top: '50%', left: 0, marginTop: 14, fontSize: 11, color: W.mute, letterSpacing: 1, textTransform: 'uppercase' }}>doux ←</div>
        <div style={{ position: 'absolute', top: '50%', right: 0, marginTop: 14, fontSize: 11, color: W.mute, letterSpacing: 1, textTransform: 'uppercase' }}>→ bouleversant</div>
        {[
          { x: '8%', y: '30%', s: 2 }, { x: '25%', y: '65%', s: 3 },
          { x: '42%', y: '25%', s: 4 }, { x: '55%', y: '70%', s: 3 },
          { x: '72%', y: '30%', s: 5 }, { x: '90%', y: '60%', s: 5 },
        ].map((p, i) => (
          <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <ImgBox w={64 + p.s * 4} h={92 + p.s * 6} label="" />
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 13 }}>Titre {i + 1}</div>
            <div style={{ fontSize: 11, color: W.terra, fontWeight: 500 }}>{8 + i},90 €</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <Tag active>tous prix</Tag><Tag>{'< 10€'}</Tag><Tag>10—20€</Tag><Tag>occasion</Tag>
      </div>
    </div>
  </Frame>
);

Object.assign(window, { ResultsA, ResultsB, ResultsC, ResultsD });
