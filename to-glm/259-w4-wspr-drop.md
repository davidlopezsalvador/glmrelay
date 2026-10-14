# 259 — W-4 #5 WSPRnet (spots vivos + arcos + apertura por banda)

Primera pista paralela F1. Todo web; app post-239 intacto.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web259_wspr.diff` — 26483 B,
sha256 `490f3fb1d50d7f55a45a7a31b2c0cffa6d032d2d01e0bd60bb5403e69e5c49`,
LF puro, mbox `[PATCH] w259-wspr`, 8 ficheros, 518+/0 (puro añadido).
Pre-tree anclado al relay certificado (veredicto 258 §7): types
897d141 · page a8b6318 · panel f9fb3bc · escena e0d8509 (4/4 EXACTOS).
Diff con `-c core.autocrlf=false -c core.eol=lf`.
Triple verificación por fichero (aplicado == post && SHA-1 == index):
- `src/lib/iono/wspr.ts` NUEVO 02e0e6c
- `src/lib/iono/wspr.test.ts` NUEVO 1b9fa1c
- `src/app/api/wspr/route.ts` NUEVO c45032b
- `src/components/ionosphere/hud/WsprPanel.tsx` NUEVO 751010a
- `src/components/ionosphere/types.ts` 897d141 → 0749e88
- `src/app/page.tsx` a8b6318 → 459004e
- `src/components/ionosphere/hud/LayersPanel.tsx` f9fb3bc → fbe7336
- `src/components/ionosphere/IonosphereScene.tsx` e0d8509 → 6905a96

## 2. Referencia pineada (regla 252, ANTES de código)
Tabla HTML de `http://wsprnet.org/olddb?mode=html&band=all`
(verificada viva 2026-10-14: 200, ~35 KB, ~50 filas; catálogo 251 §D).
Columnas: Date Call Frequency SNR Drift Grid dBm W by loc km mi Mode
Version, con `&nbsp;`, fecha "2026-10-14 12:52" UTC. Dials WSPR
estándar (lista en wspr.ts). Maidenhead→centro de celda (TU pinea
JO31=(51.5,7.0), FN20=(40.5,-75)).

## 3. Contenido (O5.1–O5.5)
- O5.1: parseo de la tabla viva; límite 50 + caché 5 min (cortesía);
  atribución "red de voluntarios" en el panel.
- O5.2: arcos geodésicos (slerp + lift) coloreados por banda;
  techo 40 + TTL ~10 min declarados; SNR del propio dato.
- O5.3: apertura 160–10m+6m calculada DE LOS SPOTS mostrados
  (misma lista arcos/panel) + mejor SNR + conteo díaside (cierra O3.5).
- O5.4: sin red → "sin datos", jamás sintéticos.
- En vivo ahora: 40 spots en 6 bandas (30/40/17/15/80/20m).
- Toggle showWspr default ON (arcos sutiles).

## 4. Barrera
`tsc` 0; `vitest` 221/221 (21 ficheros; 210 sin flips + 11 nuevos).
Nota de entorno: node_modules parcialmente barrido (faltaba
vite/dist/client) → `npm install` (37 paquetes) antes del TU.
Erratas propias del TU (cazadas por el TU): `\d2`→`\d{2}` en toMs y
subcuadrícula de 6 caracteres (fórmula desde la esquina, no el centro).
