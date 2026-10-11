# 249 — W-4 misc: noche hires + doble sol

## 1. Pin y custodia
Fichero: `to-glm/files/web249_misc.diff` — 9603601 B,
sha256 `4cf760d7987c7711881d388210970775baa336b667c9b673874f52e26a2b6af8`,
LF puro, mbox `[PATCH] w249-misc`, 2 ficheros, 25+/9-.
Pre escena = 226155f (copia certificada w227/b).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/components/ionosphere/IonosphereScene.tsx` 226155f → cfbe254
- `public/textures/earth-night-hires.jpg` NUEVO (sha256
  `230aac448ae6`, byte-idéntico al repo app)

## 2. Contenido
- Noche hires 13500 px del app con gate de capacidad
  (maxTextureSize ≥ 13500, espejo imageFitsGL) + fallback a 3600
  en error o GPU modesta. Día idéntico ya (5400).
- Doble sol con god-rays: sprites apagados cuando el pase pinta
  (flag godraysOn, 1 frame de retardo). El sol bueno = el del pase.

## 3. Barrera
`tsc` 0; `vitest` 165/165 sin flips (smoke visual pendiente:
hires nocturno + un solo sol con god-rays).
