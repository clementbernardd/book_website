// Profil / ma liste — 4 variations (modern)

const ProfileA = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: W.terraWash, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, color: W.terra }}>M</div>
          <div>
            <Display size={34}>Bonjour Marie,</Display>
            <div style={{ fontSize: 12, color: W.mute, marginTop: 4 }}>12 livres · 3 en cours · 9 terminés</div>
          </div>
        </div>
        <Note>Grille + tabs</Note>
      </div>
      <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${W.lineSoft}` }}>
        {['Ma liste', 'En cours', 'Déjà lus', 'Mes émotions'].map((t, i) => (
          <div key={t} style={{ padding: '10px 18px', fontSize: 13, fontWeight: i === 0 ? 500 : 400, color: i === 0 ? W.ink : W.mute, borderBottom: i === 0 ? `2px solid ${W.terra}` : '2px solid transparent', marginBottom: -1 }}>{t}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ImgBox h={180} label="cov" />
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 14, lineHeight: 1.2 }}>Titre {i + 1}</div>
            <Tag style={{ fontSize: 9, padding: '1px 6px', alignSelf: 'flex-start' }}>{['amour', 'espoir', 'douceur', 'nostalgie', 'guérison', 'réconfort'][i]}</Tag>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const ProfileB = () => (
  <Frame bg={W.paper} bgPhoto="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=75&auto=format&fit=crop" bgWash={0.92}>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Display size={40} style={{ fontStyle: 'italic' }}>Ton paysage<br />émotionnel</Display>
          <Note>Liste tonale (réf. image 2)</Note>
        </div>
        <div style={{ fontSize: 13, color: W.mute, lineHeight: 1.6, maxWidth: 360 }}>
          Tes lectures dessinent une carte. Voici la tienne, en ce moment.
        </div>
        <Box pad={28} radius={6} fill={W.fillSoft} border={false} style={{ marginTop: 10 }}>
          {(() => {
            const items = [
              { label: 'Joie', icon: 'spark', value: 3 },
              { label: 'Sérénité', icon: 'leaf', value: 4 },
              { label: 'Amour', icon: 'heart2', value: 5 },
              { label: 'Gratitude', icon: 'feather', value: 3 },
              { label: 'Espoir', icon: 'star', value: 4 },
              { label: 'Tristesse', icon: 'wave', value: 4 },
              { label: 'Nostalgie', icon: 'moon', value: 3 },
              { label: 'Évasion', icon: 'balloon', value: 2 },
              { label: 'Douceur', icon: 'cup', value: 3 },
              { label: 'Intensité', icon: 'flame', value: 4 },
            ];
            const dotTones = [W.beige5, W.beige4, W.beige3, W.beige2, W.beige1];
            return items.map((it, i) => (
              <div key={it.label} style={{ display: 'grid', gridTemplateColumns: '32px 1fr auto', alignItems: 'center', gap: 14, padding: '9px 4px', borderBottom: i < items.length - 1 ? `1px solid ${W.lineSoft}` : 'none' }}>
                <Icon kind={it.icon} size={18} color={W.ink} />
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 16 }}>{it.label}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[0, 1, 2, 3, 4].map(k => (
                    <div key={k} style={{ width: 10, height: 10, borderRadius: '50%', background: k < it.value ? dotTones[k] : 'transparent', border: k < it.value ? 'none' : `1px solid ${W.lineSoft}` }} />
                  ))}
                </div>
              </div>
            ));
          })()}
        </Box>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, fontStyle: 'italic' }}>En ce moment, tu lis surtout…</div>
        {[['Amour impossible', 4], ['Résilience', 3], ['Nostalgie douce', 2]].map(([l, v]) => (
          <div key={l} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, alignItems: 'center', fontSize: 13 }}>
            <span>{l}</span>
            <DotRating value={v} />
          </div>
        ))}
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, marginTop: 18, fontStyle: 'italic' }}>Ma liste</div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', borderBottom: `1px solid ${W.lineSoft}`, padding: '8px 0' }}>
            <ImgBox w={36} h={52} label="" />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15 }}>Titre {i + 1}</div>
              <div style={{ fontSize: 11, color: W.mute }}>Auteur</div>
            </div>
            <Tag style={{ fontSize: 10 }}>{['à lire', 'en cours', 'fini', 'à lire'][i]}</Tag>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const ProfileC = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Display size={40}>Mon journal de lectures</Display>
        <Note>Timeline émotionnelle</Note>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
        {[
          ['Avril 2026', "Nos étoiles contraires", "J'avais besoin de pleurer un bon coup.", 'tristesse', true],
          ['Mars 2026', "La délicatesse", "Un livre doux après la rupture.", 'douceur', false],
          ['Février 2026', "L'alchimiste", "Pour retrouver un cap.", 'sens', false],
          ['Janvier 2026', "Le consentement", "Dur mais nécessaire.", 'choc', false],
        ].map(([date, title, feeling, emo, hi], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 40px 70px 1fr 120px', gap: 20, alignItems: 'center', padding: '18px 0', borderBottom: `1px solid ${W.lineSoft}` }}>
            <div style={{ fontSize: 12, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>{date}</div>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: hi ? W.terra : W.line, margin: '0 auto' }} />
            <ImgBox w={50} h={72} label="" />
            <div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20 }}>{title}</div>
              <div style={{ fontSize: 12, color: W.mute, fontStyle: 'italic', marginTop: 4 }}>« {feeling} »</div>
            </div>
            <Tag style={{ fontSize: 10 }}>{emo}</Tag>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const ProfileD = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '30px 40px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Display size={40}>Mes étagères</Display>
        <Note>Rangé par émotion</Note>
      </div>
      {[['Pour pleurer', 5], ['Pour espérer', 4], ["Pour m'évader", 3], ['Pour ralentir', 4]].map(([label, n]) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20 }}>{label}</div>
            <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase' }}>{n} livres →</div>
          </div>
          <div style={{ display: 'flex', gap: 10, padding: '10px 12px', borderBottom: `2px solid ${W.ink}`, alignItems: 'flex-end' }}>
            {Array.from({ length: n }).map((_, i) => (
              <ImgBox key={i} w={58} h={80 + (i % 3) * 8} label="" />
            ))}
            <div style={{ width: 50, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px dashed ${W.line}`, borderRadius: 4, fontSize: 20, color: W.mute }}>+</div>
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

Object.assign(window, { ProfileA, ProfileB, ProfileC, ProfileD });
