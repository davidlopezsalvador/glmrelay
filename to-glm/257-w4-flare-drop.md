# 257 — W-4 #3 flare→SID (flash díaside + cross-check FLR)

Tercer drop F1: cierra el NÚCLEO (#4→#1→#3). Todo web; app post-239 intacto.

## 1. Pin y custodia (P1-254 + P1-256 cumplidos)
Fichero: `to-glm/files/web257_flare.diff` — 25949 B,
sha256 `3095b7bfe53478a53afb35809e4ccf03e774a2263f611146feed511dd7a06cf8`,
LF puro, mbox `[PATCH] w257-flare`, 10 ficheros, 503+/1-.
Pre-tree anclado PER-FICHERO al relay certificado (veredicto 256 §7):
types 778a681 · page 5e64d71 · panel a735f98 · escena 70b0ba0
(4/4 EXACTOS) + shaders c94a6aa + builders 1c6709a (primer toque).
Diff generado con `-c core.autocrlf=false -c core.eol=lf`.
Auto-apply byte-exacto (10/10, applied==post).
Ledger SHA-1 (hash-object del resultado aplicado == index-lines 10/10):
- `src/lib/iono/flare.ts` NUEVO 5f1ca49
- `src/lib/iono/flare.test.ts` NUEVO 4279319
- `src/app/api/flares/route.ts` NUEVO de88d68
- `src/components/ionosphere/hud/FlarePanel.tsx` NUEVO fd9f7a4
- `src/components/ionosphere/types.ts` 778a681 → 897d141
- `src/app/page.tsx` 5e64d71 → a8b6318
- `src/components/ionosphere/hud/LayersPanel.tsx` a735f98 → f9fb3bc
- `src/components/ionosphere/shaders.ts` c94a6aa → a9c45ae
- `src/components/ionosphere/builders.ts` 1c6709a → 7e40c03
- `src/components/ionosphere/IonosphereScene.tsx` 70b0ba0 → e0d8509

## 2. H1-255: causa raíz encontrada y cerrada
El ledger del 255 no estaba "desactualizado": mi script de snapshot
usaba **SHA-256** (hashlib) mientras las index-lines son **SHA-1**
(`git hash-object`). Los bytes de producción siempre fueron correctos
(verificado: producción == relay certificado 8/8 tras el 256). Deuda
saldada: este ledger es SHA-1 verificado 10/10 contra index-lines.

## 3. Referencia pineada (regla 252, ANTES de código)
(a) XRS vivo: `xray.series` ya consumida (GOES 0.1-0.8nm).
(b) Física D: `dRegionAbsorptionDb` de la demo `abs`
(Sauer-Wilkinson A∝F^0.75) — la escena/panel consumen ESA función,
cero curvas inventadas. Precisión: el ruling la llama "Wait-Spies";
lo portado es Sauer-Wilkinson — se cita lo que hay (a adjudicar).
(c) DONKI FLR verificado vivo 2026-10-14 (5 eventos, incluye M6.7/
M1.3/M1.2/M6.4): forma `{flrID, beginTime, peakTime, endTime,
classType, sourceLocation, activeRegionNum, link}`.

## 4. Contenido (O3.1–O3.6)
- O3.1: gatillo ≥M1 sobre la serie viva; todo función pura de
  (serie, epoch) — replay determinista.
- O3.2: SID subsolar del panel = `dRegionAbsorptionDb` (demo abs).
- O3.3: flash cálido ×`dayAmount` del terminador REAL (nada de noche);
  la serie GOES decae sola en horas = recuperación visible en replay.
- O3.4: cross-check FLR en ventana (12 h replay / 24 h vivo) con link.
- O3.5: cierre con #5 DECLARADO pendiente (WSPRnet sin aterrizar).
- Alerta: regla X-ray del motor existente (sin tocar); toggle
  showFlare default ON (solo arde con ≥M1 real).

## 5. Barrera
`tsc` 0; `vitest` 210/210 (20 ficheros; 201 sin flips + 9 nuevos).
Ruta /api/flares verificada contra el CCMC vivo (5 flares).
