// Landing page — 4 variations (modern)

const LandingA = () => (
  <Frame>
    <NavBar />
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', padding: '60px 40px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, paddingRight: 40 }}>
        <Note>Hero classique</Note>
        <Display size={68}>Chaque émotion<br />a son histoire.</Display>
        <div style={{ fontSize: 15, color: W.mute, lineHeight: 1.6, maxWidth: 440 }}>
          Trouvez le livre qui résonne avec ce que vous vivez, ce que vous ressentez, ce que vous avez besoin de ressentir.
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Btn primary big>Comment te sens-tu aujourd'hui&nbsp;?</Btn>
          <Btn big outline>Explorer</Btn>
        </div>
      </div>
      <ImgBox h={520} label="Image d'ambiance — livre / matière" />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, padding: '40px', borderTop: `1px solid ${W.lineSoft}`, marginTop: 40 }}>
      {[['feather', 'Par émotion', 'Ce que vous ressentez'], ['book', 'Par situation', 'Ce que vous traversez'], ['leaf', 'Par parcours', 'Chemins de lecture'], ['spark', 'Empreinte', 'Signature émotionnelle']].map(([ic, t, d]) => (
        <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 24 }}>
          <Icon kind={ic} size={22} color={W.terra} />
          <div style={{ fontSize: 14, fontWeight: 500 }}>{t}</div>
          <div style={{ fontSize: 12, color: W.mute, lineHeight: 1.5 }}>{d}</div>
        </div>
      ))}
    </div>
  </Frame>
);

const LandingB = () => (
  <Frame bgPhoto="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=75&auto=format&fit=crop" bgWash={0.85}>
    <NavBar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center', gap: 24 }}>
      <Note>Hero typographique sur ambiance</Note>
      <div style={{ fontSize: 11, color: W.mute, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 500 }}>
        Une bibliothèque qui écoute
      </div>
      <Display size={104} style={{ maxWidth: 960 }}>
        Trouve le livre<br />
        <em style={{ fontStyle: 'italic', color: W.terra }}>qui te ressemble</em><br />
        en ce moment.
      </Display>
      <div style={{ width: 60, height: 1, background: W.ink, margin: '8px 0' }} />
      <div style={{ fontSize: 14, color: W.mute, lineHeight: 1.6, maxWidth: 520 }}>
        Un livre par émotion, une émotion par livre. Pas de catalogue — juste ce dont vous avez besoin aujourd'hui.
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <Btn primary big>Commencer</Btn>
        <Btn big outline>Explorer sans guide</Btn>
      </div>
    </div>
  </Frame>
);

const LandingC = () => (
  <Frame>
    <NavBar />
    <div style={{ flex: 1, padding: '40px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Display size={56}>Aujourd'hui, je veux…</Display>
        <Note>La question EST l'accueil</Note>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 14, flex: 1 }}>
        {EMOTIONS_6.map((e, i) => (
          <div key={e.label} style={{ background: i === 1 ? W.terraWash : W.fillSoft, border: i === 1 ? `1px solid ${W.terra}` : `1px solid ${W.lineSoft}`, borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
            <Icon kind={e.icon} size={28} color={i === 1 ? W.terra : W.ink} />
            <div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 28, fontWeight: 400, letterSpacing: -0.3 }}>{e.label}</div>
              {e.sub && <div style={{ fontSize: 12, color: W.mute, fontStyle: 'italic', marginTop: 2 }}>{e.sub}</div>}
              <div style={{ fontSize: 11, color: W.mute, marginTop: 12, letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 500 }}>
                {12 + i * 5} livres →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const LandingD = () => (
  <Frame>
    <NavBar />
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.3fr 1fr' }}>
      <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22, background: W.terraWash }}>
        <div style={{ fontSize: 11, color: W.terra, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>
          Humeur du jour · mardi
        </div>
        <Display size={68}>« Un livre<br />pour les cœurs<br />qui se réparent. »</Display>
        <div style={{ fontSize: 14, color: W.ink, lineHeight: 1.6, maxWidth: 420 }}>
          Chaque matin, une sélection qui épouse une humeur. Aujourd'hui, la résilience.
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 12 }}>
          <ImgBox w={70} h={100} label="cov" />
          <div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20 }}>Le livre du jour</div>
            <div style={{ fontSize: 12, color: W.mute }}>Tag · Résilience</div>
          </div>
        </div>
        <div style={{ marginTop: 8 }}><Btn primary big>Découvrir →</Btn></div>
      </div>
      <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
        <Note>Sélection du jour + picker</Note>
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 26 }}>Ou dis-moi ce que tu ressens</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {EMOTIONS_8.slice(0, 6).map(e => (
            <div key={e.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: `1px solid ${W.line}`, borderRadius: 4 }}>
              <Icon kind={e.icon} size={18} color={W.terra} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{e.label}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: W.mute, marginTop: 4 }}>+ voir les 24 émotions</div>
      </div>
    </div>
  </Frame>
);

Object.assign(window, { LandingA, LandingB, LandingC, LandingD });
