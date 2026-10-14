# 263 — Micro-fixes P1-260 + P1-261 (footer #5 + signo J2000)

Post-F1 (desarrollo completo). Todo web; app post-239 intacto.

## 1. Pin y custodia
Fichero: `to-glm/files/web263_micro.diff` — 3846 B,
sha256 `ac5755f8e1c301f32dc2c5bafa579a8efca28672d8b774961fa43f925e8fda8d`,
LF puro, mbox `[PATCH] w263-micro`, 3 ficheros, 23+/7-.
Pre-tree: solar.ts b6865e2 · solar.test.ts 3f461ee ·
FlarePanel fd9f7a4 (3/3 == certificado; sin ficheros nuevos).
Triple verificación (aplicado == post && SHA-1 == index):
- `src/lib/iono/solar.ts` b6865e2 → b5e13b6
- `src/lib/iono/solar.test.ts` 3f461ee → 36b9339
- `src/components/ionosphere/hud/FlarePanel.tsx` fd9f7a4 → dc63561

## 2. P1-261: signo J2000 (H1-261 del veredicto 262)
Un carácter: `+ 10957.5` → `- 10957.5`. Puerto Python independiente
(Meeus estándar + marcos motor replicados) confirma: reproduce el
buggy EXACTO (-5.7933,-3.0706 vs TU (-5.79,-3.07)) y el corregido da
(-5.6153,-3.0396); ancla J2000.0: buggy 21915.0 días, fijo 0.0 con
subsolar (-23.0332,+0.8323) físicamente consistente (declinación de
perihelio + EoT~-3.5min). El TU gana el test de anclaje absoluto;
expectativas actualizadas a valores NOAA-anclados (declarado).
Espejo C++ (SolarPosition.cpp, mismo signo): NO tocado — app
congelada post-239; el fix espejo requiere ruling (a adjudicar).

## 3. P1-260: pie FlarePanel
"pendiente de aterrizar — declarado" → "activo — ver panel WSPRnet".

## 4. Barrera
`tsc` 0; `vitest` 229/229 (22 ficheros; 228 sin flips + 1 nuevo test
J2000; solo cambian 2 expectativas solares, re-ancladas a NOAA).
