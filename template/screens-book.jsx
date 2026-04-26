// Fiche livre — 4 variations (modern)

const BookA = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '24px 40px 30px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 12, color: W.mute }}>‹ retour</div>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 260px', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ImgBox h={370} label="couverture" />
          <Btn outline style={{ width: '100%' }}>♡ Ajouter à ma liste</Btn>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Note>Couv + empreinte côte-à-côte (ref #4)</Note>
          <div>
            <Display size={48}>Nos étoiles contraires</Display>
            <div style={{ fontSize: 14, color: W.mute, marginTop: 6 }}>John Green · 2012</div>
          </div>
          <div style={{ width: 40, height: 1, background: W.ink }} />
          <div>
            <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>Empreinte émotionnelle</div>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', rowGap: 8, columnGap: 16, alignItems: 'center' }}>
              {[['Amour', 5], ['Tristesse', 5], ['Espoir', 3], ['Intensité', 4]].map(([l, v]) => (
                <React.Fragment key={l}>
                  <span style={{ fontSize: 12 }}>{l}</span>
                  <DotRating value={v} />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Tag fill={W.terraWash} style={{ border: `1px solid ${W.terra}` }}>Cathartique</Tag>
            <Tag>Intensité forte</Tag>
            <Tag>Rythme lent</Tag>
            <Tag>Fin ouverte</Tag>
          </div>
          <div>
            <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>À propos</div>
            <div style={{ fontSize: 13, color: W.ink, lineHeight: 1.7 }}>
              Hazel, 16 ans, est atteinte d'un cancer. Sa rencontre avec Augustus va bouleverser sa vie. Une histoire d'amour lumineuse et déchirante.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Box pad={18} radius={6} fill={W.terraWash} border={false}>
            <div style={{ fontSize: 11, color: W.terra, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>À lire si tu te sens…</div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15, lineHeight: 1.5, fontStyle: 'italic' }}>
              fragile, différent·e, en quête de sens, ou si tu as besoin d'une histoire qui fait pleurer et qui fait du bien.
            </div>
          </Box>
          <Box pad={16} radius={6}>
            <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>Où le trouver</div>
            {[['Fnac', '9,90 €'], ['Cultura', '10,50 €'], ['Amazon', '8,90 €'], ['Momox (occas.)', '4,20 €']].map(([s, p], i) => (
              <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${W.lineSoft}` : 'none', fontSize: 13 }}>
                <span>{s}</span>
                <span style={{ color: W.terra, fontWeight: 500 }}>{p} →</span>
              </div>
            ))}
          </Box>
        </div>
      </div>
    </div>
  </Frame>
);

const BookB = () => (
  <Frame bg={W.fill}>
    <NavBar />
    <div style={{ padding: '24px 40px 30px', flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 12, color: W.mute }}>‹ retour à Tristesse</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <ImgBox w={150} h={220} label="cov" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Display size={36}>Nos étoiles contraires</Display>
            <div style={{ fontSize: 13, color: W.mute }}>John Green · 2012</div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, color: W.terra, fontStyle: 'italic', marginTop: 6, lineHeight: 1.4 }}>
              « Un livre qui fait pleurer… et du bien. »
            </div>
            <div style={{ marginTop: 'auto' }}><Btn primary>♡ Ma liste</Btn></div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: W.ink, lineHeight: 1.7 }}>
          Hazel, 16 ans, est atteinte d'un cancer. Sa rencontre avec Augustus va bouleverser sa vie. Une histoire d'amour lumineuse et déchirante qui questionne ce que signifie vivre pleinement.
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Tag>rupture</Tag><Tag>deuil</Tag><Tag>premier amour</Tag><Tag>adolescence</Tag>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24, fontStyle: 'italic' }}>L'empreinte émotionnelle</div>
          <Note>Liste tonale (réf. image)</Note>
        </div>
        <Box pad={24} radius={6} fill={W.paper} border={false}>
          {(() => {
            const items = [
              { label: 'Amour', icon: 'heart2', value: 5 },
              { label: 'Tristesse', icon: 'wave', value: 5 },
              { label: 'Espoir', icon: 'star', value: 3 },
              { label: 'Intensité', icon: 'flame', value: 4 },
              { label: 'Douceur', icon: 'feather', value: 2 },
              { label: 'Suspense', icon: 'mountain', value: 1 },
            ];
            const dotTones = [W.beige5, W.beige4, W.beige3, W.beige2, W.beige1];
            return items.map((it, i) => (
              <div key={it.label} style={{ display: 'grid', gridTemplateColumns: '36px 1fr auto', alignItems: 'center', gap: 14, padding: '11px 4px', borderBottom: i < items.length - 1 ? `1px solid ${W.lineSoft}` : 'none' }}>
                <Icon kind={it.icon} size={20} color={W.ink} />
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 17 }}>{it.label}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[0, 1, 2, 3, 4].map(k => (
                    <div key={k} style={{ width: 11, height: 11, borderRadius: '50%', background: k < it.value ? dotTones[k] : 'transparent', border: k < it.value ? 'none' : `1px solid ${W.lineSoft}` }} />
                  ))}
                </div>
              </div>
            ));
          })()}
        </Box>
        <Box pad={14} radius={6}>
          <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Où le trouver</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Tag fill={W.terraWash}>Fnac — 9,90€</Tag>
            <Tag>Cultura — 10,50€</Tag>
            <Tag>Amazon — 8,90€</Tag>
            <Tag>Momox — 4,20€</Tag>
          </div>
        </Box>
      </div>
    </div>
  </Frame>
);

const BookC = () => (
  <Frame>
    <NavBar />
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.3fr 1fr' }}>
      <div style={{ padding: '60px 60px', background: W.terraWash, display: 'flex', flexDirection: 'column', gap: 22, justifyContent: 'center' }}>
        <div style={{ fontSize: 11, color: W.terra, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>Extrait choisi</div>
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 44, lineHeight: 1.2, letterSpacing: -0.3, color: W.ink, fontStyle: 'italic' }}>
          « Le monde n'est pas<br />une fabrique qui exauce<br />les souhaits… »
        </div>
        <div style={{ width: 40, height: 1, background: W.ink }} />
        <div style={{ fontSize: 12, color: W.mute }}>— Nos étoiles contraires, p. 87</div>
      </div>
      <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 12, color: W.mute }}>‹ retour</div>
        <Note>Citation en héros</Note>
        <div style={{ display: 'flex', gap: 14 }}>
          <ImgBox w={90} h={130} label="cov" />
          <div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24, lineHeight: 1.1 }}>Nos étoiles<br />contraires</div>
            <div style={{ fontSize: 12, color: W.mute, marginTop: 6 }}>John Green</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginTop: 6 }}>Empreinte</div>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', rowGap: 5, columnGap: 12, alignItems: 'center' }}>
          {[['Amour', 5], ['Tristesse', 5], ['Espoir', 3], ['Intensité', 4]].map(([l, v]) => (
            <React.Fragment key={l}>
              <span style={{ fontSize: 11 }}>{l}</span>
              <DotRating value={v} />
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Tag style={{ fontSize: 10 }}>cathartique</Tag><Tag style={{ fontSize: 10 }}>bouleversant</Tag><Tag style={{ fontSize: 10 }}>fin ouverte</Tag>
        </div>
        <div style={{ fontSize: 12, color: W.ink, lineHeight: 1.6 }}>
          Hazel, 16 ans, rencontre Augustus. Une histoire d'amour lumineuse et déchirante.
        </div>
        <Box pad={12} radius={6}>
          <div style={{ fontSize: 10, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Acheter</div>
          {[['Fnac', '9,90'], ['Cultura', '10,50'], ['Momox', '4,20']].map(([s, p]) => (
            <div key={s} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '4px 0' }}>
              <span>{s}</span><span style={{ color: W.terra, fontWeight: 500 }}>{p} € →</span>
            </div>
          ))}
        </Box>
        <Btn primary>♡ dans ma liste</Btn>
      </div>
    </div>
  </Frame>
);

const BookD = () => (
  <Frame>
    <NavBar />
    <div style={{ padding: '24px 40px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end' }}>
        <ImgBox w={86} h={124} label="cov" />
        <div style={{ flex: 1 }}>
          <Display size={40}>Nos étoiles contraires</Display>
          <div style={{ fontSize: 12, color: W.mute, marginTop: 4 }}>John Green</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <Tag fill={W.terraWash} style={{ fontSize: 11, border: `1px solid ${W.terra}` }}>Tristesse</Tag>
            <Tag style={{ fontSize: 11 }}>Amour impossible</Tag>
            <Tag style={{ fontSize: 11 }}>Cathartique</Tag>
          </div>
        </div>
        <Btn primary>♡ Ma liste</Btn>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22 }}>L'empreinte émotionnelle</div>
        <Note>Empreinte XXL en barres</Note>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[['Amour', 95, true], ['Tristesse', 90, true], ['Espoir', 55, false], ['Intensité', 78, false], ['Douceur', 40, false], ['Suspense', 20, false]].map(([l, v, hi]) => (
          <div key={l} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 50px', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: hi ? 500 : 400 }}>{l}</div>
            <div style={{ height: 14, background: W.fillSoft, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${v}%`, height: '100%', background: hi ? W.terra : W.line }} />
            </div>
            <div style={{ fontSize: 11, color: W.mute, textAlign: 'right' }}>{v}%</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 4 }}>
        <Box pad={14} radius={6} fill={W.terraWash} border={false}>
          <div style={{ fontSize: 11, color: W.terra, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>À lire si tu te sens…</div>
          <div style={{ fontSize: 12, lineHeight: 1.5, fontStyle: 'italic' }}>
            fragile, différent·e, en quête de sens, ou si tu as besoin d'une histoire qui fait pleurer et qui fait du bien.
          </div>
        </Box>
        <Box pad={14} radius={6}>
          <div style={{ fontSize: 11, color: W.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Où le trouver</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            <Tag style={{ fontSize: 10 }}>Fnac 9,90€</Tag><Tag style={{ fontSize: 10 }}>Cultura 10,50€</Tag>
            <Tag style={{ fontSize: 10 }}>Amazon 8,90€</Tag><Tag fill={W.terraWash} style={{ fontSize: 10, border: `1px solid ${W.terra}` }}>★ Momox 4,20€</Tag>
          </div>
        </Box>
      </div>
    </div>
  </Frame>
);

Object.assign(window, { BookA, BookB, BookC, BookD });
