# 278 — W-4 F2a #17 electrojets (Kyoto AE + filamentos) + fix P1-276

Tercera pieza F2a (ruling 266). Todo web; app re-congelada 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web278_ae.diff` — 24719 B,
sha256 `74e1dd18edf733c9e4256c250999f66e82f92c4dbe7c05cb57e40e6242387d30`,
LF puro, mbox `[PATCH] w278-ae`, 10 ficheros, 365+/8-.
Pre-tree anclado al certificado: lightning b923589 ·
lightning.test 5d9bc3a · types f8a32b4 · page 10bf22a ·
panel ec20e61 · escena 263803a (6/6 EXACTOS).
Diff con `-c core.autocrlf=false -c core.eol=lf`; prohibidos 261 INTACTOS.
Triple verificación por fichero (aplicado == post && SHA-1 == index):
- `src/lib/iono/electrojets.ts` NUEVO 69f457d
- `src/lib/iono/electrojets.test.ts` NUEVO 62c3463
- `src/app/api/ae/route.ts` NUEVO a180045
- `src/components/ionosphere/hud/AePanel.tsx` NUEVO e845887
- `src/lib/iono/lightning.ts` b923589 → 48b7f3e (fix P1-276)
- `src/lib/iono/lightning.test.ts` 5d9bc3a → f56b3a6 (regresión P1-276)
- `src/components/ionosphere/types.ts` f8a32b4 → 90a8afa
- `src/app/page.tsx` 10bf22a → 55f94e2
- `src/components/ionosphere/hud/LayersPanel.tsx` ec20e61 → da44ebe
- `src/components/ionosphere/IonosphereScene.tsx` 263803a → cec479a

## 2. Referencia pineada (regla 252, ANTES de código)
Kyoto WDC AE realtime digital (desde dic-2024, vivo 2026-10-14;
non-commercial + cita obligatoria, atribuido en panel). Patrón
MENSUAL fijado por este drop (O17):
`ae_realtime/data_dir/YYYY/MM/DD/aeYYMMDD` (9.4 KB/día). Forma:
`AEALAOAU YYMMDD E HH AE QUICKLK` + 60 valores minutales (9999 =
hueco, descartado). Mapeo AE→color declarado: ≤100 azul, 100-500
→amarillo, 500-1500 →blanco. Filamento a 67°N magnéticos (solo
norte, declarado). Correlación AE/Dst con #18 declarada pendiente.

## 3. Contenido (O17 + P1-276)
- O17: ruta /api/ae (hoy+ayer, TTL 15 min) + loop magnético con color
  vivo + panel EN (AE now, max 24h, sparkline, cita Kyoto) + toggle.
- P1-276: parseGlmList empareja Key/Size POR ORDEN (tolera
  ChecksumAlgorithm/Type); fixture de regresión con forma real;
  re-verificado en vivo: 40+40 gránulos G19/G18 (con el fix habrían
  sido 0/40). Polling AE 5 min vs TTL 15 min (cache; declarado).

## 4. Barrera
`tsc` 0; `vitest` 254/254 (25 ficheros; 249 sin flips + 4 nuevos AE
+ 1 regresión P1-276).
Nota de proceso: el revert de tipos partió una línea y dejó cabecera
huérfana; detectado por hash contra testigos w276/post y reparado —
verificado byte-exacto antes del delta. Lección: verificar reverts
contra testigos siempre que existan (más fuerte que count==1).
