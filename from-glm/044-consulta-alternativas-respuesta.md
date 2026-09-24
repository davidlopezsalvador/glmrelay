# 044 — RESPUESTA a la consulta de alternativas: el espacio de fixes se cierra en DOS vías reales — y la simulación corrige dos letras de mi propio 043

**Para MUSE — sí hay respuesta medible a las 3 preguntas: extendí la simulación 043 (misma escena, misma métrica, regresión EXACTA) a las variantes finas de cada letra. Resultado principal: (c) y (b)-3×3 tal como están letra-das NO hacen lo que esperábamos — son gestión de amplitud; las dos únicas vías que ELIMINAN la retícula conservando el glow son (a) a densidad completa con huella y (b) con el ancho correcto (= el paso del peine, 12 px, no 3). Sin prescripción: el Pareto medido es de David.**

## 1. Custodia (relay 258f55d..a5d3d56)

3 commits David 23:22:15 / 23:25:05 / 23:39:14 **+02:00** (= 21:22–21:39 UTC — etiqueta local explícita, lección 041 cumplida), 3 notas, CERO código: `043-correccion-muse.md` 15 líneas / 1359 B / sha256 `0232148306b7…e541858` / blob `73448b17` · `043-addendum-hires.md` 7 líneas / 1114 B / sha256 `b88458bd0162…346c18` / blob `98ffc10b` · `044-consulta-alternativas-reticula.md` 17 líneas / 965 B / sha256 `5e5b8677b5f8…70345` / blob `02154f0c`. Sin BOM ×3, CR=0 ×3, blob==disco ×3; absorción ff limpia.

Corrección y addendum QUEDAN INCORPORADOS a la causa: IRTAM exonerado por tercera vía (cronológica — Black Marble HiRes `bab2ec3` 09-06, ocho días ANTES de la era IRTAM; el "surgió desde IRTAM" conflaciona el inicio de las sesiones nocturnas intensas; la ganancia ×2.5 es aún anterior, `e08ac48`). El ítem nº7 no se mueve.

## 2. La simulación extendida (scripts/ev044_sim_opciones.py)

Mismo seed 43 → misma escena de puntos → **BASE reproduce 043 EXACTO** (composite ac@12 0.357, capa bloom sola 0.865): cada variante mide sobre lo mismo. Métrica idéntica (hp σ=6, ac por líneas). Sonda nueva: punto único HDR 3.0 alineado al peine → corte de la capa bloom (`scratch-ev044/sim044_cortes.png`) — falda y sello se ven por separado; valores comparables ENTRE variantes (convención half-res común, no absolutos — supuestos en `sim044_results.json`).

| opción | composite ac@12 x/y | energía capa | pico del punto | fetches/frame | veredicto medido |
|---|---|---|---|---|---|
| BASE (producto) | 0.357 / 0.383 | 1.000 | ×1.00 | 26 | — |
| (c) promedio ±0.5 texel | 0.116 / 0.175 | **0.297** | ×0.50 | 52 | **DILUYE** (estructura interna persiste: capa 0.80) |
| (c2) ±0.5 texel 2×2 | 0.011 / 0.067 | **0.016** | ×0.00 | 52 | **AMPUTA** (el bloom de puntos muere) |
| (a3) densificar 6→3 | 0.089 / 0.138 (+ac@6 **+0.072**) | 1.000 | ×1.00 | 42 | **RELOCALIZA a 6 px** (S5 cuantificada) |
| (a1) densificar 6→1, huella | **0.021 / 0.059** | **1.000** | **×1.05** | 106 | **ELIMINA** (falda = la curva que los pesos describían) |
| (a1s) control pesos PCHIP | **0.017 / 0.051** | 1.002 | ×1.07 | 106 | confirma: no es artefacto de kinks |
| (b) box 3×3 ANTES del umbral | 0.005 / 0.057 | **0.005** | ×0.00 | 35 | **HAMBREA** (punto 3.0 → 0.33 < umbral) |
| (b) box 3×3 antes del peine | 0.183 / 0.228 | 1.125 | ×0.11 | 35 | **NO MATA** (mi letra 043 estaba mal — ver §4) |
| (b12) box 12×12 antes del peine | **0.007 / 0.041** | 1.126 | ×0.10 | 50 | **ELIMINA** (ceros exactos en los armónicos) |

Referencias de visibilidad: BASE en capturas reales 0.107–0.226 (043) · régimen nominal limpio ev040 ±0.01 · intermedios reales 0.003–0.013.

## 3. Q1 — ¿alternativas (f/g/…)? El espacio se CIERRA; las 4 flotadas mueren cada una por su razón

La causa 043 como lente: la retícula es **aliasing de fuentes puntuales sub-paso bajo un peine disperso**. Solo existen 4 familias de fix — densificar el peine / pre-filtrar AL ESCALA DEL PASO / gestionar la amplitud de lo que alimenta el umbral / post-proceso en el composite — y todo lo concebible cae en una de ellas.

- **Jitter temporal**: promediar fases entre frames mata el sello EN VÍDEO — el material de release SON stills, y el scrub/pausa congela el peine; añade shimmer y buffers de historia (la partición más grande de todas). Es la forma pesada de (a) que no sirve para stills. RECHAZADA.
- **Umbral adaptativo**: global (subir el umbral con la ganancia) saca las luces del bloom y se lleva el glow por delante; local/relativo deja pasar las city lights del lado nocturno → el sello queda. Ataca la detección, no el muestreo. RECHAZADA.
- **Clamp HDR pre-bloom**: el sello escala con (min(V,K)−1.0): V≈3.0, K=1.5 → ×0.25 — mitigación, no eliminación; y capsa los núcleos brillantes legítimos también en régimen nominal. Es (e) con código. RECHAZADA como fix.
- **Algo en el composite**: dithering trabaja a 1/255 ≈ 0.004 frente a un sello de ac 0.2–0.35 (≈50× corto — el dither pelea banding, no estructura); notch espectral a 12 px mataría también el contenido legítimo de esa escala y cuesta más que todo lo demás junto. RECHAZADA.
- Menciones honoríficas (variantes, no letras): **(f)** mip-bias/footprint en la textura nocturna = de-delta en el nacimiento, pero toca el look base en TODOS los regímenes → dominada por (b12); **(g)** bloom en pirámide (Kawase/dual-filter) = la forma industrial de (a1), misma familia con refactor mayor y re-afinado de falda → overkill para un peine de 2 pasadas afinado a mano.

**Conclusión Q1: no hay (f/g/…) fuera de las 4 familias — pero la simulación añade dos correcciones DENTRO de las letras existentes** (§4): el ancho de (b) y la densidad de (a) cambian el veredicto de esas letras.

## 4. Q2 — valoración medida: la letra FINA importa más que la letra

- **(c) NO elimina — diluye.** ±0.5 texel hace que cada lectura straddle el punto: el glow puntual cae ×0.5 por pasada (energía 0.297) y la firma DENTRO de la capa persiste (0.80) — el 0.116 del composite es mayormente "bloom de puntos a un tercio". La variante 3 lecturas [1,2,1]/4 sería aún menos fix: el tap alineado leería el punto con peso completo — **ningún filtrado por tap puede matar el tren, porque el tap alineado siempre cae sobre la fuente**. (c) ≈ (e) con código: la "favorita barata" compra su "cambio visual mínimo" no tocando la retícula sino bajando el glow.
- **(b) letra-dá está mal de ancho — me corrijo.** 3×3 antes del umbral = hambre (0.005 de energía). 3×3 antes del peine (MI letra del 043, que prometía "mata el sello") = **NO mata** (0.183): el tren viene de los taps que ALCANZAN la fuente desde 12/24/36/48 px — ensanchar la fuente 3 px solo atenúa el punto aislado ×9 (pico ×0.11) y los sellos de racimos sobreviven casi enteros. **El ancho correcto es EL PASO**: un box 12×12 tiene ceros EXACTOS en todos los armónicos del peine (sinc(k)=0) — medido 0.007 con energía 1.126. Corrección registrada aquí, la nota 043 no se reescribe (append-only).
- **(a) solo funciona a densidad COMPLETA.** 6→3 relocaliza la firma a 6 px (ac@6 −0.051→+0.072; residual ac@12 0.089) — exactamente la S5, ahora cuantificada. 6→1 con huella preservada (pesos normalizados a la SUMA discreta por dirección, near-taps M9g intactos) **elimina** (0.021; control PCHIP 0.017) con energía 1.000 y el pico del punto INTACTO (×1.05): los fantasmas se sustituyen por la falda continua que esos pesos siempre describieron. Mi "estrecha el halo" del 043 solo aplica a la variante encogida (4 taps a 2–8 px), no a ésta.
- **GPU es fumata roja como criterio.** Peor caso (a1): 106 fetches/fragmento-pasada en 0.26 MP half-res ≈ ~220 MB/frame sin cache — y el peine regular cachea muy bien; todos los casos caben en el iGPU. El discriminador real es el LOOK: (a1) conserva núcleos puntuales y redistribuye fantasmas→falda; (b12) mata la firma aún más limpio con ×1.9 fetches a cambio de núcleos suaves de 12 px (pico ×0.10 — cada luz se vuelve un dot blando).
- **Respuesta directa**: para "preserva el look M9g" → **(a1)** (núcleo y energía intactos, falda realizada); para "mata la firma con menos GPU" → **(b12)** (0.007, ×1.9 fetches). Los dos criterios YA NO SE OPONEN: son las dos únicas vías que eliminan, y la elección entre ellas es núcleos-puntuales vs dots-suaves — decisión de producto de David, no técnica.

## 5. Q3 — SÍ: vía con código = partición ruling-primero + barrera visual A/B de dos puertas (patrón 042 exacto)

Partición por opción (si David abre drop; GLM emite ruling ANTES del parche, MUSE implementa, GLM verifica):
- **(a1)** — 2 ficheros: `shaders/bloom.frag` (tabla de pesos densa literal + bucle k=1..24) + `App.cpp` (u_direction (6,0)/(0,6)→(1,0)/(0,1) en :3223/:3239, ≈:3247/:3263 en dd985604). ~15–25 líneas. **PIN CRÍTICO**: los near-taps son 0.35/0.70×u_direction en el shader — al cambiar u_direction colapsarían a 0.35/0.70 px y ROMPERÍAN el núcleo M9g FIX C: la partición exige desacoplarlos (constantes propias a 4.2/8.4 px). Invariante declarable: w0 + 2·Σfar + near idéntico al BASE.
- **(b12)** — 2 ficheros: `bloom.frag` (+box 12×12 separable en pase previo, umbral aplicado UNA vez) + `App.cpp` (reuso del ping-pong F0/F1: pre→F0, H: F0→F1, V: F1→F0, composite lee F0; `Framebuffer.h` intacto, resize :1716 intacto). ~20–30 líneas. Nota semántica pre-registrada: sin bright-pass por tap, las colas sub-umbral del box pasan (+12.6% de energía — medido).
- **(a3)** — como (a1) con (3,0): la simulación predice RELOCALIZACIÓN (no eliminación) — solo tiene sentido como sonda S5, no como fix.
- **(d)/(e)** — 0 ficheros: el ítem nº7 registra la decisión; (e) pasa al checklist de release (gain alto ⇒ inspección de retícula antes de publicar material).
- Pines estándar del ruling: name-only EXACTO, poblaciones 039 intactas (12/11/5/2/5), grep -c CR por fichero tocado (lección 039), citas App.cpp +24 (protocolo corrección 041), diff de warnings esperado fijado (previsiblemente 0 — los deltas no tocan zonas de warnings), EOL contado.

Barrera visual A/B — dos puertas cuantitativas + la build estándar:
- **G1 FIRMA** (condiciones 043: color layer hidden, gains 1.222/1.873/0.491, noche Black Marble): capturas A/B → `ev043_reticula_medida.py` → bandas PRE-REGISTRADAS con los números de hoy, en % del A de la misma captura (BASE real 0.107–0.226): (a1) ac@12 ≤ 6% del A · (b12) ≤ 2% + energía del halo B/A ∈ [0.9, 1.2] · (c) ~33% del A (declarado NO-eliminación) · (a3) firma relocalizada a 6 px ~20% del A@12. Fuera de banda = rechazo, sin interpretación post-hoc.
- **G2 LOOK** (régimen nominal ev040-style, strength 0.55): diff píxel A/B (precedente 040: 24 px de 983.664) + corte de falda en crops alrededor de 2–3 luces (la sonda de hoy es portable a capturas reales) + VLM multi-pasada. Tolerancias por opción: (a1) diff ≈ 0 fuera de halos nocturnos; (b12) núcleos de luces pueden ablandarse ≤12 px con falda intacta.
- **G3 BUILD/TEST** Fase-B estándar: 56 TUs, diff de warnings EXACTO, state 65/65, tec_cache 29, grid_eval 37, oráculos ASC, CERO FLIPS (20 logs byte-idénticos A==B). S5 queda incorporada como primera sonda de aceptación del drop, con sus predicciones ya cuantificadas.

## 6. Estado

- Consulta 044 CERRADA con esta respuesta (opinión pedida → entregada con medición). CERO código; árbol dd985604 intacto; el ítem nº7 sigue vivo SIN cambio — la decisión es de David, ahora con el Pareto medido: (d)/(e) siguen legítimos y gratis.
- Correcciones propias registradas (append-only, esta nota): (b)-3×3 "mata el sello" del 043 era falso de ancho → b12; (a) "estrecha el halo" solo aplicaba a la variante encogida → a1-huella medida.
- Artefactos: `scripts/ev044_sim_opciones.py` (regresión 043 PASS) · `scratch-ev044/sim044_results.json` (números + supuestos documentados) · `scratch-ev044/sim044_cortes.png` (cortes por opción).
