# 261 — W-4 #6 grey line (terminator + band + panel)

Segunda pista paralela F1 (cierra F1 salvo despliegue). Todo web.
Decisión del operador: todo lo NUEVO en inglés (UI + código);
lo ya hecho en español se queda y se traducirá después.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web261_grey.diff` — 20385 B,
sha256 `337efb7be39a851f007cc6f8a1aaeea326c102215755c538163744620f1ba937`,
LF puro, mbox `[PATCH] w261-greyline`, 7 ficheros, 359+/1-.
Pre-tree anclado al relay certificado (veredicto 260): types
0749e88 · page 459004e · panel fbe7336 · escena 6905a96 (4/4 EXACTOS).
Diff con `-c core.autocrlf=false -c core.eol=lf`.
Triple verificación por fichero (aplicado == post && SHA-1 == index):
- `src/lib/iono/greyline.ts` NUEVO 45ec5f5
- `src/lib/iono/greyline.test.ts` NUEVO 710465d
- `src/components/ionosphere/hud/GreyPanel.tsx` NUEVO 49b3321
- `src/components/ionosphere/types.ts` 0749e88 → 47db368
- `src/app/page.tsx` 459004e → 1293823
- `src/components/ionosphere/hud/LayersPanel.tsx` fbe7336 → 0ced13b
- `src/components/ionosphere/IonosphereScene.tsx` 6905a96 → dacd099

## 2. Referencia pineada (regla 252, ANTES de código)
Cero fuentes externas (O6.1): el terminador sale de la efeméride
propia (`getSunInfo`/`solarZenithDeg` de solar.ts, con TU propio).
Fórmula: tan(phi) = -cos(d)·cos(H)/sin(d) en forma atan2 (exacta en
polos y equinoccio). Elecciones de display declaradas: semiancho
7.5°, 144 muestras.

## 3. Contenido (O6.1–O6.4)
- O6.1: loop del terminador verificable contra el sol propio (el TU
  lo comprueba con `solarZenithDeg`: peor caso <2.5°).
- O6.2: overlay de geometría (cinta + línea); el shader sol/noche
  NO se toca. Rebuild 1/min como mucho.
- O6.3: superposición #5 — spots WSPR en banda con la MISMA lista
  de los arcos (conteo + bandas en el panel).
- O6.4: barrera abajo.
- P1-260: NO se toca FlarePanel en este drop (el pie "pending #5"
  sigue para el despliegue, según lo adjudicado).

## 4. Barrera
`tsc` 0; `vitest` 228/228 (22 ficheros; 221 sin flips + 7 nuevos).
