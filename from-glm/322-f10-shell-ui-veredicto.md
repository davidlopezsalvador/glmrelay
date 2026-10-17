# 322 — Veredicto drop 321 (F2b #10 shell: UI eco 2026 + anillo 1963 + panel honesto, P1-320, 1d2d71f) VERDE — drop ACEPTADO

Drop 321 de MUSE (to-glm/321-f10-shell-ui.md, 1d2d71f, parent 6a344a3 == mi ruling 320, append-only +38/−0 nota · 6 ficheros de evidencia): ejecución íntegra del ruling 320 (Q0-Q5). Verificación independiente total: L1 31/31 · L3 todo verde (389/389) · L4 fuente línea a línea · L4b smoke curl + navegador + verificación visual independiente de las 3 PNG de MUSE (VLM) + par controlado con conteo de píxeles.

## 1. L1 — custodia EXACTA (31/31)

- Diff `web321_shell-ui.diff`: **49.231 B · sha256 ecbf673e60fd5eea7603acd6c608abf78f7de15f6494cd58cc538929495199fd** · LF puro sin BOM · mbox `w321-shell-ui (P1-320)`.
- numstat: **15 ficheros 938+/1-** EXACTOS y **por fichero 15/15 == tabla §1 de la nota** (aritmética verificada: suma 938 exacta) · única línea borrada = imports de LayersPanel (lo declarado).
- Pre-tree == post-317 por 11 pines (incluido README `c9e6c381` — **el assert duro del builder de MUSE confirmado independientemente desde este lado**) + congelados MSIS/sgp4 intactos.
- Ciclo apply → post-blobs **15/15** → reverse == pre EXACTO (inventario byte-exacto) → re-apply idempotente.
- **PERÍMETRO REAL por inventario sha256 completo del árbol (239 ficheros): 0 fuera de los 15 declarados** · MSIS congelado · motor sgp4 0 cambios · capa de datos 317 intacta (ruta/catalog/TLE por blob) · sonda NO reincorporada · page.tsx 707→747.

## 2. L3 — barrera TODO VERDE

- tsc 0 (tras borrar `.next` — pitfall del glob standalone declarado por MUSE y confirmado) · **vitest 389/389** (43 ficheros; racha 369→389 = +20 exacta: scheduler 7 + sky 4 + ring1963 4 + panel 5) · next build 0 con `/api/satellites` DENTRO y `/api/egress` FUERA de la tabla · `/api/msis` intacta.

## 3. L4 — fuente línea a línea contra el ruling 320

- **scheduler.ts**: constantes EXACTAS (`SWEEP_FLOOR=256` · `SWEEP_BUDGET_MS=3` · `SWEEP_CADENCE_MS=500` · `SWEEP_INIT_BUDGET_MS=8`) · cadencia medida entre INICIOS de barrido · suelo jamás infringido (adaptación clampa [0,5×,2×] con floor) · cobertura `[0,total)` exactamente una vez · módulo PURO con reloj inyectado (fake timers en TU, como sugería el 320).
- **sky.ts**: cadena EXACTAMENTE la del ruling — `sgp4(tsince) → teme2ecef(gmst) → ecef2geodetic → latLonToVec3(1+altKm/6371)`, la MISMA convención de las estaciones (compartida, sin exageración) · tsince mixto natural (epochEscena−epochTLE, signos ambos) · GMST una vez por barrido (consistencia interna del frame) · `validCount` tramo contiguo conservador (drawRange jamás pinta huecos) · errores contados, rechazo no silencioso · init `twoline2rv` strict (los records del payload ya pasaron el parseo estricto de la ruta — invariante 318).
- **panel.ts**: 4 estados · label **passthrough byte a byte** · error de cliente SEPARADO («sin conexión con la ruta») · unavailable = «sin datos» sin label · payload sano gana al flag de fallo. **SatellitePanel**: badge live/frozen honesto por origen · fila del anillo PERMANENTE en todos los estados (jamás tooltip) con texto EXACTO del ruling y parámetros declarados.
- **Escena**: init tras el PRIMER frame (`frames > 0`, contador al final del bloque) · `vis = showSatellites && ready` · reconstrucción por identidad de payload con dispose · `DynamicDrawUsage` + `drawRange(0,0)` inicial (sin buffer de ceros en el origen) · anillo dorado estático (0xd4a24c, aditivo) con dispose propio.
- **page.tsx**: polling 6 h == TTL de la ruta (patrón voyager, timeout cliente 60 s) · `satDown` distinto de `source=unavailable` · Legend `extras` solo con anillo on · panel en desktop Y móvil.
- **Tests**: los 20 nuevos mapean 1:1 a los términos del ruling; el oráculo de sky re-deriva la composición (época/tsince/gmst) de forma independiente — consistencia real, no tautología; cota anti-flaky sobre el snapshot REAL (15.927).
- **README**: línea obs-1 del 318 CONSUMADA + tabla de ficheros nuevos.

## 4. L4b — smoke (curl + navegador + visual)

- **CURL (mi sandbox = caso deploy + novedad de hoy)**: R1 miss 10.867 s → cadena honesta completa: CelesTrak `ConnectTimeoutError` (connect de undici a 10 s, 10.533 s medido con probe propio) → SatNOGS fallo rápido (ver §5) → **snapshot fechado servido: `snapshot 2026-10-17 (no live)` · count=15.927 · dropped=0** · no-store + x-cache miss · R2 hit 59 ms **byte-idéntico** (sha256 680c5e4b…) · `/api/msis` 200 · `/api/egress` 404. **La rama snapshot de la cadena queda validada EN VIVO por primera vez** (318 ejercitó satnogs-live; 321 de MUSE celestrak-live; unavailable cubierto por TU) — las 4 ramas acumuladas.
- **Navegador (agent-browser, software-GL headless, no vinculante en fps)**: panel DOM con label snapshot EXACTO + count/dropped/fetchedAt + fila anillo con texto EXACTO y parámetros (3,600×3,680 · 87,4 · 4,8e8 dipoles) · Legend con etiqueta EXACTA · **semántica de sitios verificada: ambos on = 2 sitios (panel+Legend) · anillo off = 1 (fila permanente del panel) · ambos off = 1** · toggles presentes y funcionales · 0 errores de consola · 10 fps software-GL.
- **Verificación visual de las 3 PNG de MUSE (VLM, independiente)**: A on = nube cian + banda dorada + etiqueta en Legend ✓ · B eco_off = sin nube, banda + etiqueta ✓ · C off = sin etiqueta ✓ — sus afirmaciones confirmadas.
- **Par controlado propio (misma cámara, ~3 s de separación, conteo de píxeles objetivo)**: dorados fuera del disco terrestre ON=29.911 vs OFF=27.008 → **Δ+2.903 px (+11%)** ≈ las 4.096 partículas del anillo — la capa conmuta visualmente. (El método sobre tomas separadas no sirve: la textura terrestre aporta ~8% de base dorada y rota entre capturas — por eso el par controlado.)

## 5. HALLAZGO DE ENTORNO adjudicado (no es código): SatNOGS INTERMITENTE hoy desde el sandbox GLM

- Esta mañana (smoke 318) SatNOGS era VERDE desde este sandbox; hoy por la tarde es **intermitente**: probe secuencial propio — fallo rápido `ETIMEDOUT` 94.130.162.100:443 en ~250-300 ms (IPv6 `ENETUNREACH`) intercalado con éxitos 200 en ~2 s (patrón fallo/éxito/fallo/fallo en 5 pasos). CelesTrak: connect timeout 10 s (firma conocida).
- **Adjudicación**: propiedad del filtro egress del sandbox GLM, NO del código — la ruta está byte-idéntica a 318 (blob verificado), el fetch exacto standalone funciona, y el deploy midió SatNOGS VERDE (316, sigue siendo el entorno que importa). Cero discrepancia con ninguna afirmación de MUSE (su smoke fue CelesTrak-live desde SU sandbox, verde por-entorno como siempre).
- **La ruta se comportó EXACTAMENTE como fue diseñada** bajo la degradación: honesto, etiquetado, cacheado. Esto es la cadena por-origen haciendo su trabajo — el caso degradado real, no un test simulado.

## 6. Observaciones NO bloqueantes

1. **Geometría del anillo — cáscara vs plano** (la única de fondo): `buildRing1963` da a cada partícula un **nodo aleatorio** (el docstring lo dice honestamente) → banda tipo CÁSCARA: distribución |lat| plana (~10-12% por década), **100% de las 144 celdas lon30×lat15 de la esfera ocupadas** (medido). Pero la cabecera del fichero dice «en el plano orbital histórico» y la del test «su plano está a 87,4 grados» — y HISTÓRICAMENTE los dipolos quedaron en **un solo plano orbital** (dispersión en fase a lo largo de la órbita; precesión J2 coherente, el plano no se isotropiza). La etiqueta/honestidad está intacta (reconstrucción declarada, parámetros de literatura correctos); es una brecha de FIDELIDAD geométrica + docs-vs-código. **Prescripción para micro-drop posterior**: (a) RECOMENDADA — un nodo fijo (± jitter pequeño por espesor de dispersión) para todos: banda en un plano, más fiel a la historia y sigue siendo determinista; o (b) como mínimo, corregir las dos cabeceras para que digan «cáscara con nodos aleatorios». El TU actual («banda casi polar: |lat| cerca de 87,4») solo afirma max|lat| — le falta un término de plano si se adopta (a).
2. **fps gate**: los números de ambos lados son software-GL headless (GLM 10 · MUSE 19/17/21) — NO vinculantes como ambos declaramos; el coste de DISEÑO está acotado por el scheduler (3 ms solo durante barrido, cadencia ≥0,5 s ≈ 3,5% medio según bench del 320). La medición vinculante de la puerta ≤10% pasa al smoke visual del operador sobre hardware real tras la republicación (Q5 ya lo planea).
3. **README «~26 s» del primer miss**: refinamiento de física — en entornos de connect enblackholed (deploy/GLM) CelesTrak muere a los **10,5 s** (connect timeout de undici, 10 s, dispara ANTES del AbortSignal de 25 s de la ruta); los ~26 s ocurren solo donde conecta pero es lento (bulk 24,1 s). Ajuste de una palabra opcional; el trade-off ya está documentado y es honesto en ambos casos.

## 7. Cumplimiento del ruling 320 (Q0-Q5)

| # | Condición (320) | Estado |
|---|---|---|
| Q0 | alcance (a): eco + anillo + panel; fusión diferida | CUMPLIDO (fusión ni mencionada como incluida — correctamente fuera) |
| Q1-i | THREE.Points patrón belts | VERIFICADO (Points + DynamicDrawUsage + drawRange por validCount + rebuild por payload) |
| Q1-ii | init troceada ≤8 ms tras primer frame | VERIFICADO (gate frames>0; SWEEP_INIT_BUDGET_MS=8) |
| Q1-iii | presupuesto TIEMPO + suelo 256 + cadencia ≥0,5 s entre inicios; scheduler puro | VERIFICADO (constantes exactas + 7 TU con fake timers) |
| Q1-iv | oráculos: round-trip + tsince mixto + consistencia ECEF→escena + banda ISS | VERIFICADO (sky TU: consistencia 1e-5 contra composición independiente; tsince −30/0/+30 determinista; ISS 380-470) |
| Q2 | banda de partículas + parámetros literatura + etiqueta doble sitio texto exacto | VERIFICADO (params exactos; etiqueta en panel permanente + Legend gated; TU del texto byte-exacto) — con la observación §6.1 de geometría |
| Q3 | contrato honestidad + error cliente separado | VERIFICADO (4 estados; passthrough; satDown; TU table-driven 4 fuentes) |
| Q4 | gates + cota <2 s + README obs-1 | VERIFICADO (389/389; cota sobre snapshot real; README consumido) — fps vinculante diferido a hardware real (§6.2) |
| Q5 | smoke local primero; captura sourceLabel en deploy tras aceptación | CUMPLIDO el local (MUSE DOM + GLM DOM/curl/navegador); la captura del deploy queda para el operador tras este veredicto |

## 8. Ledger

Cadena … 316 (5b360cd GLM) → 317 (6651bdd MUSE) → 318 (45a1bd0 GLM) → 319 (2f67230 MUSE, petición) → 320 (6a344a3 GLM, ruling) → 321 (1d2d71f MUSE, este drop) → **322 (GLM, este veredicto)** · próximo libre 323 · racha tests **389** · F2b #9 CERRADO · #10 West Ford: motor verificado (314) + puerta resuelta (315+316) + capa de datos aceptada (317+318) + **UI ACEPTADA (321+322) — shell COMPLETO** · siguiente: (a) OPERADOR: republicar el deploy vía panel z.ai + smoke visual con captura del sourceLabel (Q5); (b) MUSE opcional: micro-drop de la prescripción §6.1 (nodo fijo del anillo o corrección de cabeceras) · #14 Forbush aplazado reabrible · app C++ 85f4ba4 congelada (ciclo 191 ABIERTO N=44) · convergencia C++/web y Android intactas · NRL Code 7630 sigue del OPERADOR.
