// Explorer par situation — 4 variations (modern)

const SituationA = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Display size={42}>Des livres pour traverser…</Display>
        <Note>Grille de situations</Note>
      </div>
      <div style={{ fontSize: 13, color: W.mute, maxWidth: 560, lineHeight: 1.6 }}>
        Des lectures pensées pour les moments charnières — ceux où un livre peut faire office de compagnon.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {['Une rupture', 'Un deuil', 'La solitude', 'Une quête de sens', 'Un changement de vie', 'Un burn-out'].map((t, i) => (
          <div key={t} style={{ background: i === 0 ? W.terraWash : W.fillSoft, border: i === 0 ? `1px solid ${W.terra}` : `1px solid ${W.lineSoft}`, borderRadius: 6, padding: 22, minHeight: 160, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 26 }}>{t}</div>
            <div style={{ fontSize: 12, color: W.mute, lineHeight: 1.5 }}>
              Des mots pour nommer, comprendre, traverser.
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: 6 }}>
              <Tag style={{ fontSize: 10 }}>cathartique</Tag>
              <Tag style={{ fontSize: 10 }}>doux</Tag>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const SituationB = () => (
  <Frame bgPhoto="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=75&auto=format&fit=crop" bgWash={0.93}>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Display size={42}>Je traverse…</Display>
        <Note>Liste éditoriale numérotée</Note>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
        {[
          ['Une rupture', '12 livres', true],
          ['Un deuil', '8 livres', false],
          ['La solitude', '15 livres', false],
          ['Un recommencement', '9 livres', false],
          ['Une traversée', '11 livres', false],
        ].map(([t, c, active], i) => (
          <div key={t} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 160px 40px', gap: 24, alignItems: 'center', padding: '22px 14px', borderBottom: `1px solid ${W.lineSoft}`, background: active ? W.terraWash : 'transparent' }}>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 26, color: W.mute }}>0{i + 1}</div>
            <div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 28 }}>{t}</div>
              <div style={{ fontSize: 12, color: W.mute, marginTop: 4 }}>Pour nommer, comprendre, avancer.</div>
            </div>
            <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase' }}>{c}</div>
            <div style={{ fontSize: 20, color: active ? W.terra : W.ink }}>→</div>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const SituationC = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: 40, flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Note>Champ libre (IA matching)</Note>
        <Display size={52}>Raconte-moi<br />ce que tu traverses.</Display>
        <div style={{ fontSize: 13, color: W.mute, lineHeight: 1.6, maxWidth: 440 }}>
          Décris ce que tu vis avec tes mots. On trouvera le livre qui peut t'accompagner.
        </div>
        <Box pad={16} radius={6} fill={W.fillSoft} border={false}>
          <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>Dis-le avec tes mots</div>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, color: W.mute, fontStyle: 'italic', minHeight: 70, lineHeight: 1.4 }}>
            "Je viens de rompre et je n'arrive pas à…"
          </div>
        </Box>
        <div><Btn primary big>Trouve-moi un livre</Btn></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>Ou une situation courante</div>
        {['rupture', 'deuil', 'quête de sens', 'solitude', 'changement', 'perte', 'burn-out', 'anxiété'].map(s => (
          <div key={s} style={{ padding: '12px 16px', border: `1px solid ${W.line}`, borderRadius: 4, fontSize: 13, fontWeight: 500 }}>
            {s}
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const SituationD = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Display size={42}>Les chemins de lecture</Display>
        <Note>Parcours enchaînés — plusieurs livres</Note>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 8 }}>
        {[
          ['Traverser une rupture', '4 livres', ['reconnaître', 'pleurer', 'se retrouver', 'recommencer']],
          ['Apprivoiser la solitude', '3 livres', ['ressentir', 'accueillir', 'créer']],
          ['Après un deuil', '5 livres', ['le choc', 'le vide', 'la colère', 'la trace', 'la lumière']],
          ['Retrouver du sens', '4 livres', ['questionner', 'déconstruire', 'réimaginer', 'choisir']],
        ].map(([t, c, steps]) => (
          <Box key={t} pad={22} radius={6}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22 }}>{t}</div>
              <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.3 }}>{c}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, marginTop: 22 }}>
              {steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: i === 0 ? W.terra : W.paper, border: `1px solid ${i === 0 ? W.terra : W.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 0 ? W.paper : W.mute, fontSize: 11, fontWeight: 600 }}>{i + 1}</div>
                    <div style={{ fontSize: 10, textAlign: 'center', color: W.mute, letterSpacing: 0.3 }}>{s}</div>
                  </div>
                  {i < steps.length - 1 && <div style={{ flex: 0.4, height: 1, background: W.line, marginTop: 13 }} />}
                </React.Fragment>
              ))}
            </div>
          </Box>
        ))}
      </div>
    </div>
  </Frame>
);

Object.assign(window, { SituationA, SituationB, SituationC, SituationD });
