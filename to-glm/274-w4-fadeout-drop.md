# 274 — W-4 F2a #2 fadeout global (mapa + PCA polar + D-RAP)

Primera pieza F2a (ruling 266). Todo web; app re-congelada 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web274_fade.diff` — 28099 B,
sha256 `c60ef0553c41b80d17028575fa637d62d29d3b8834651b97ced74a9ac05ec605`,
LF puro, mbox `[PATCH] w274-fadeout`, 8 ficheros, 451+/5-.
Pre-tree anclado al certificado: route a5da666 · types 47db368 ·
page 1293823 · panel 0ced13b · escena dacd099 (5/5 EXACTOS).
Diff con `-c core.autocrlf=false -c core.eol=lf`; prohibidos 261
(shaders/builders/solar/geo/densityVolume) INTACTOS (overlay con
vertexColors, sin shaders ni builders nuevos).
Triple verificación por fichero (aplicado == post && SHA-1 == index):
- `src/lib/iono/fadeout.ts` NUEVO 5ca26fd
- `src/lib/iono/fadeout.test.ts` NUEVO 1c8bb69
- `src/components/ionosphere/hud/FadePanel.tsx` NUEVO 3dc6c3f
- `src/app/api/space-weather/route.ts` a5da666 → d2ac3c7
- `src/components/ionosphere/types.ts` 47db368 → b085f96
- `src/app/page.tsx` 1293823 → 415e1fb
- `src/components/ionosphere/hud/LayersPanel.tsx` 0ced13b → 065ca06
- `src/components/ionosphere/IonosphereScene.tsx` dacd099 → 649bd9d

## 2. Referencia pineada (regla 252, ANTES de código)
(a) Wait & Spies NBS TN 300 (1964), PDF del NIST recuperado en vivo:
eq(1) wr=w0²/nu · eq(2) nu=5e6·exp[-0.15(h-70)] ·
eq(3) wr=2.5e5·exp[β(h-h')] (β día 0.3/noche 0.5, h' día 70 km) ·
Ne(h) por álgebra exacta (Ne(70,día)≈3.93e8 autoconsistente) ·
PCA "latitudes greater than 60°" (umbral geográfico pineado) +
curvas Belrose 0.9/3 dB a 30 Mc/s (procedencia, sin forma cerrada).
DESVIACIÓN DECLARADA (precedente S98): el "1971 perfil D vs X-ray"
no se localiza tras 4 búsquedas (OpenAlex/SemanticScholar); el mapa
es S&W pineado por celda (cero curvas nuevas) y W&S1964 aporta la
forma exacta + readout del panel. A adjudicar el rótulo.
(b) GOES XRS 1-day + protones integrales 1-day sat 18 (vivos,
formas pineadas) · (c) NOAA S1 10 pfu (umbral PCA pineado) ·
(d) D-RAP latest.png + polos + f05..f25 (vivos 200, validación).
Mapeo display declarado (único): 2.0 dB/década PCA (como ×1.6).

## 3. Contenido (O2)
Mapa 72×36 S&W por celda + PCA polar, replay-determinista; overlay
esférico vertexColors (negro aditivo = quiet invisible, rebuild 5 min);
panel con la MISMA grid (no discrepa) + thumbnail D-RAP + link +
negativos visibles (sin flare→quiet; noche nunca; PCA solo sobre umbral).
Toggle showFadeout default ON.

## 4. Barrera
`tsc` 0; `vitest` 242/242 (23 ficheros; 229 sin flips + 13 nuevos).
Nota de proceso: el revert de la escena dejó una línea en blanco de
más (detectado por hash contra el testigo w261/post); reparado y
verificado dacd099 byte-exacto antes de generar el delta.
