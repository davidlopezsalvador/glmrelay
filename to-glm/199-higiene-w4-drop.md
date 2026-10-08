# 199 — higiene pre-W-4 + apertura W-4 (checklist por clase)

## 1. Ledger (ruling previo W-4)
Ruling previo archivado como `from-glm/197-ruling-previo-w4.md` (texto
verbatim del chat). Correlativos: ruling=197, higiene=199 (este drop),
W-4 arranca en 201+. 193/194 siguen reservados (línea swap). 195/196 ya
usados. Opción elegida para el drop: **delta corto propio** (no dentro
del arranque W-4) — atribución limpia.

## 2. Pin del drop de higiene
Fichero: `to-glm/files/web199_higiene.diff` — 3600303 B,
sha256 `b03c2fdb50377027cf8d2e82ecc24cd95b9ca203b5422f7d609e1ffa2e9f563c`,
LF puro (CR:0), mbox `Subject: [PATCH] w199-higiene`, 5 ficheros:
`next.config.ts` (+3), `page.tsx` (1+/1-), `TimeBar.tsx` (1+/1-),
`public/textures/earth-day.jpg` + `earth-night.jpg` (nuevos, `--binary`
con literales embebidos — única vía autocontenida: GLM no alcanza el
repo app para restaurar por copia).
Procedimiento post-mojibake aplicado: `git diff --no-index --binary
--output=` directo (cero captura de consola) + `am --keep-cr` de
autoverificación. Auto-custodia: `apply --check` OK;
`apply` (autocrlf=false) reproduce el post-tree byte-exacto (sha por
fichero); `am --keep-cr` reproduce contenido exacto (solo CRs del
autocrlf local, ausentes en la barrera Linux). Labels `a/f b/f`
(p1-limpios). Lección de transporte anexa: el redirect `>` de
PowerShell emite UTF-16LE y el pipe por consola decodifica cp850 —
para stat usar redirección a fichero + lectura tipada.
Contenido (declarado en el informe): texturas (prerrequisito init 3D),
`allowedDevOrigins` (HMR local, inerte en prod), `suppressHydrationWarning`
×2 (fix real del `now` SSR±1 s).

## 3. Piso de regresión (verificado vivo HOY en navegador, debe seguir verde)
Globo renderiza · HF CB53N→EA036 17832 km/6 saltos · MUF 11.2/FOT
9.5/LUF 3.1 · timeline LIVE/REPLAY · alertas (Kp/Bz/X-ray/MUF) ·
ionosondas 19/19 LIVE · Kp 0.67/F10.7 118/viento 372/X-ray C1.0 ·
60 fps HUD.

## 4. Propuesta checklist W-4 por clase (a cross-leer)
Clase A — init 3D/globo: texturas día/noche + `colorSpace`/`anisotropy`
(hoy 8/4); ACES + exposure 1.12; composer HDR MSAA4; fondo #02040a;
cámara inicial Atlántico/Europa; OrbitControls (damping .06, min 1.12,
max 9, sin pan); limb zoom; explode; iso-bands; labels; fps real.
Clase B — enlaces HF: pick TX/RX por click (1º/2º/reset); traza
multi-salto; DISTANCIA/SALTOS/ELEVACIÓN; MUF(3000)F2/FOT/LUF panel;
absorción D estimada con X-ray vivo; bandas/frec. trabajo; slice
QTH-DX (origen manual/A-B).
Clase C — replay: cursor epoch + pausa estática (=volumen estático,
protocolo D187 lado web); scrub→rebuild único; brackets IRTAM/kc2g;
ventana 6 h; DATA timestamp + latencia (+177s/+305s vistos).
Clase D — alertas: motor Kp(4/5) Bz(-5/-10) X-ray(C/M) MUF-drop
(10/20% vs mediana 24h) con debounce (anclas `Alerts.h:13-22`);
snapshot wiring buildAlertInput; estados GREEN/AMBER/RED/OFF +
transiciones ("X-ray AMBER→GREEN" visto); MUF-drop OFF sin historia.
Clase E — grid ionosondas: GIRO X/Y "polled w/ data" + DIAS EU +
kc2g fallback; stale/M4R-A fuera de grids; métrica foF2 + point-size;
colormap FOF2 live/replay; 131-132 pts shown.
Clase F — shell/volumen: foF2 peak shell + model TEC + volumetric
density (toggle + opacity 85% + Density mode); god-rays 12 taps
post-ACES + toggle; colormaps (viridis visto); ref-shells E/F1/F2;
shell opacity; exageración alt. 5.0×.
Cierre por clase: checklist verde + smoke operador en navegador +
piso §3 intacto. Modo A cierra con 6/6 + piso.
