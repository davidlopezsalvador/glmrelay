# 253 — W-4 #4 Magnetosfera v1 (Shue + IGRF + B(r))

Primer drop F1 (orden #4 primero). Todo web; app congelado post-239.

## 1. Pin y custodia
Fichero: `to-glm/files/web253_magneto.diff` — 32609 B,
sha256 `9a12b49f18a66513d528ea09753742cada6cf8157405fde643abf5a588506ac2`,
LF puro, mbox `[PATCH] w253-magneto`, 7 ficheros, 623+/7-.
Pre-tree certificado: route (primer toque, sin oráculo) · page
cd23ad3 (246-post) · types 027217c (244-post) · panel 29f4e55
(223-post) · escena cfbe254 (249-post).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/app/api/space-weather/route.ts` 7929412 → a5da666 (densidad)
- `src/app/page.tsx` cd23ad3 → 4ee407f (sw prop ×2)
- `src/components/ionosphere/types.ts` 027217c → edb7b7a (settings)
- `src/components/ionosphere/hud/LayersPanel.tsx` 29f4e55 → 1120c35
- `src/components/ionosphere/IonosphereScene.tsx` cfbe254 → ff9ae9e
- `src/lib/iono/magnetosphere.ts` NUEVO 8630250
- `src/lib/iono/magnetosphere.test.ts` NUEVO badb85f

## 2. Referencias pineadas (regla 252, ANTES de código)
- [S97] forma r = r0·[2/(1+cosθ)]^α, JGR 102, 9497, doi:10.1029/97JA00196.
- [S98] COEFICIENTES IMPLEMENTADOS (desviación declarada del 1997 por
  partes — continuo, mejor en extremos; a adjudicar):
  r0 = [10.22 + 1.29·tanh(0.184·(Bz+8.14))] / Dp^(1/6.6)
  α = (0.58 − 0.007·Bz)·[1 + 0.024·ln(Dp)]
  (verificado contra transcripción independiente ar5iv 2306.09621).
- [IGRF] grado 1, época 2025.0 CONGELADA sin SV (espejo del spec app
  Utils/Igrf.cpp; testigo g10 = −29350.0):
  g10 = −29350.0, g11 = −1410.30, h11 = 4545.50.
  Tilt 9.21° (banda 9-12 ✓); polo N (80.79°N, 72.77°W) ártico ✓.
- [Dp] 1.6726e-6 · n · v². Cola v1 parametrizada ×(1+0.15·sur/5).

## 3. Contenido (O4.1–O4.7)
- `magnetosphere.ts`: Shue + dipolo + B(r) nT servicio + traza
  conjugada analítica + malla + clave + tail. O4.5: el TU consume
  B(r) y traza superficie→conjugado.
- Visual: magnetopausa wireframe a escala R_E real + líneas dipolo
  (L 3/4/5.6/8.5, estáticas: la cola real exige Tsyganenko v2) +
  río solar (deriva a v real ×60 declarado + desvío Shue).
- Toggle Magnetosfera (default OFF) + readout r0/Dp/cola (O4.6).
- Cámara maxDistance 9→30 (la burbuja vive a ~10 R_E).
- Densidad rtsw en ruta (mismo host SWPC) para Dp en vivo.
- TU `magnetosphere.test.ts`: 24/24 (tabla O4.1 6 pts + bandas,
  monotonías O4.2 automáticas, tilt/polo, conjugado, B finito).

## 4. Barrera
`tsc` 0; `vitest` 189/189 (165 sin flips + 24 nuevos).
