# 248 — Ruling pedido: arco duro circular en el limbo (app C++, Volume+Iso) — diagnóstico CONFIRMADO con precisión crítica: la esfera invisible es el DOMINIO de datos (no un proxy defectuoso) truncando una cola que NUNCA muere; NADA por ahora (congelamiento 242-§3 vigente); ampliar-proxy PROHIBIDO; 2 vías pre-registradas post-sesión

Consulta de MUSE (vía operador): bandas verdes/amarillas del volumen+iso terminan en un arco circular nítido en el limbo; hipótesis MUSE = proxy del raymarch / techo del volumen (radio × explode) recorta la densidad en vez de fundirla. Capturas `corte.png`/`corte2.png` en disco del operador (no viajan). Verificado en código y con el modelo REAL compilado, contra el árbol certificado post-239 (`scratch-m12-repo`, dfe6a0a, tree ec24e72f).

## 1. Diagnóstico — hipótesis confirmada en lo esencial, con una precisión que cambia el remedio

- **La esfera invisible EXISTE y es exactamente donde MUSE dice** (radio = techo × explode), pero **no es un proxy defectuoso**: la malla rasterizada (escala `outerR`, VolumeRenderer.cpp:258), el intervalo analítico del raymarch (`raySphere(u_outerR)`, :53) y el dominio de datos del upload son **EL MISMO radio** — no hay hueco entre proxy y datos que «no llegue» densidad. Lo que se recorta es densidad **VIVA del modelo** que el techo del upload trunca.
- **Techo de producción real: 700 km**, no 500 — `buildDensityVolume(profs, 72, 72, 60, 60.0f, 700.0f)` en App.cpp:2464 (los 500 km son el default de struct de DensityVolume.h:15 y de la SPEC — ver hallazgo §4). Arco a `r = 1 + (700/6371)·E` = **1.10987 (E=1) … 1.54936 (E=5)** — escala con el slider Explode exactamente.
- **Números de primera mano** (modelo REAL `LayerProfile.h` del árbol post-239 compilado — `scripts/w248_ceiling_check.cpp`, glm real del sandbox de build): logNe en el techo = **10.17–11.08** (normalizado **0.48–0.69**) en 4 regímenes (día medio / día activo foF2 13 / noche calma foF2 6 / amanecer bajo foF2 5) — el glow (d²·α) es plenamente visible EN la frontera y muere en seco: silueta de la esfera = arco circular perfecto. Las iso cruzan a 318–766 km (logNe 11) y 482–1860 km (logNe 10.5): en regímenes débiles la banda 10.5 vive DENTRO y se corta cerca del borde (648 km en noche calma); en día la última banda visible es la 11 (554 km) y el glow sigue solo hasta el corte.
- **CAUSA RAÍZ (propiedad del modelo, no del render)**: el topside difusivo `Htop = 60·(1 + Δ/300)` (LayerProfile.h:138/:185) crece linealmente con la altura → `Δ/Htop → 5` → la cola **ASINTOTA a Nm·e⁻⁵** (logNe(Nm)−2.17 = 9.3–10.2, normalizado 0.29–0.48) y **jamás llega a cero**. Todo techo finito corta densidad viva: el arco es **estructural**, no un bug.

## 2. Adjudicación de las tres opciones propuestas

- **AMPLIAR PROXY — PROHIBIDO / sin sentido**: no existe hueco proxy-dominio que llenar. Subir solo la esfera sin subir el dominio muestrearía `altNorm` clamp(1.0) (:96) con CLAMP_TO_EDGE (:152-154) = **cáscara FABRICADA de densidad constante** entre 700 km y el nuevo radio — un artefacto peor que el actual y deshonesto (densidad inventada donde el modelo no fue evaluado).
- **FADE DE BORDE — cosmético local, insuficiente**: no fabrica densidad (renderiza menos, no más) pero enmascara la frontera del dominio sin eliminar la causa (la cola sigue viva al otro lado del fundido) y es cambio de app → rompe el congelamiento.
- **AMPLIAR DOMINIO — única vía de raíz, con costes reales**: (i) **NO elimina el arco** (asíntota e⁻⁵: a 2000 km la cola sigue en norm ~0.3 — solo aleja y atenúa el corte); (ii) es cambio de **DATOS**: el Model TEC derivado del volumen (integrateTEC, App.cpp:2479+) sube **+1.4 TECU por cada 300 km** (20.72 TECU a 700 → 22.08 a 1000 → 24.41 a 2000, caso día medio); (iii) adelgaza la resolución del pico (60 niveles sobre más rango); (iv) el topside más allá de ~1000 km es cada vez más especulativo (sin estructura plasmasférica L-shell en el modelo).
- **DECISIÓN: NADA por ahora.** El congelamiento post-239 (sesión única pre-registrada 242 §3) tiene prioridad; el artefacto es visual, no toca data-paths ni mediciones (TEC/picos siguen íntegros dentro del dominio). Y el arco duro es la señal **honesta** de dónde acaba el modelo — mejor visible que maquillada.

## 3. Pre-registro post-sesión (a elección de MUSE cuando el ciclo 191 cierre)

- **VÍA A (dominio)**: subir `altMaxKm` con consecuencias DECLARADAS en el drop: tabla de TEC esperada por techo, `altRes` ajustado para preservar resolución del pico, y un **límite de validez del topside declarado** (no perseguir la cola al infinito: p.ej. 1000–1200 km con degradación del MODELO — no del render — más allá); oráculos de extractPeakGrids/integrateTEC pinneados; update de spec (§4).
- **VÍA B (cosmético)**: fade de borde DECLARADO cosmético en el shader (smoothstep en el último tramo de altNorm), sin tocar build/TEC/picos; oráculo del shader actualizado.
- En ambas: nota+delta+hash P2-240 + barrera motor 59 TUs + LINK A/B; el web no se toca (no es sujeto).

## 4. Hallazgos declarativos

- **P-248a (drift de spec)**: docs/volumetric-density-spec.md §1 («outerR(500km) = 1.07848») y §3 («72×72×48, 60-500 km») vs producción **72×72×60, 60-700 km** desde `7e1fcb1` (Fases 2-3: peak shell + Model TEC derivados). Corregir en el próximo drop app (post-sesión). Inmaterial al comportamiento, material a la documentación.
- **Simetría web**: el web espejó la SPEC (VOL_ALT_MAX_KM = 500, densityVolume.ts:20), no la producción (700) — divergencia de 200 km de cola (~1.75 TECU de diferencia en TEC derivado) y **el mismo artefacto de arco en el web**, aún más cerca del pico. Nota de paridad para el futuro; sin acción ahora (oráculos web intactos, veredicto 247).
- **Predicciones falsables para el operador** (verificación visual sin enviar capturas): (1) el arco escala con el slider Explode exactamente como r = 1 + 700/6371·E; (2) en regímenes nocturnos/débiles la banda 10.5 se corta cerca del borde; de día la última banda es la 11 (verde-amarillo viridis) y el glow amarillento se corta pelado.

## 5. Ledger

- Sin drops nuevos; **congelamiento post-239 SIGUE** (faf03c4); sesión única 242 §3 intacta (preservar cache/ kc2g_*.bin); ciclo 191 ABIERTO por N=44; swap 193/194 y W-4 cerrados (W-4 CERRADO COMPLETO en 247); oráculos sin cambio; racha suite 165. Próximo libre: **249**.
