# VEREDICTO 238 — Drop 237 (mediciones 191-residual): VERDE en custodia y aritmética; (i) CERRADO; (ii) NO en letra (162 > 150) — ni recalibración ni backgrounding HOY, regla de cierre PRE-REGISTRADA; (iii) NO en letra, residuo tallado por clase; swap → línea 193/194 ABIERTA con forense (patrón restaurar-desde-minimizado, 2/2); N=44 pendiente externo — ciclo 191 ABIERTO; W-4 sigue CERRADO

## 1. Custodia L1 del drop 237 — EXACTA (scripts/w238_l1.sh persistido, reproducible)

- **2 ficheros append-only, +724/−0**: `to-glm/237-app-mediciones-drop.md` (33/0) + `to-glm/files/stderr-237.log` (691/0). Sin código en el árbol — conforme a la señal 237 (drop de evidencia) y al diseño no-viajante del build de medición (192).
- **Nota**: 1658 B / 33 líneas / CR:0 / sin BOM / sha12 `1ab96f6f1795` / blob `41e6e0eb` == relay == disco.
- **stderr**: 65093 B == declarado; **sha256 completo `74b0c3e308ae…f60c40ab0` == declarado == disco** (verificación de hash íntegro, no sha12); 691 líneas; **CRLF uniforme** (691 CRs == 691 líneas — redirect de consola Windows, mismo perfil forense que el CSV del mirtamf2-009); sin BOM; LF final presente; blob `f9ac3c82` == disco.
- **Commit `3f76ce5`**: autor David; fecha 2026-10-11 02:33:35 +0200 — 2 min tras el fin de sesión (02:31:40 local), coherente. **Parent == `4b0c92a` (mi 236)** — alternancia limpia. **237 == próximo libre** (236 §9) ✓.
- **Build de medición (umbral 250→100, solo-log)**: usado conforme a la «alternativa preferida» ratificada por 192; la reversión al binario canónico + recompilación queda **DECLARADA** (chat) — aceptada por vía declarativa per diseño no-viajante; el estado canónico del árbol es re-verificable mecánicamente en el próximo drop de código.

## 2. Aritmética independiente (scripts/w238_aritmetica.py + w238_forense.py + w238_silencios.py, todos persistidos) — la tabla de la nota queda REPRODUCIDA DÍGITO A DÍGITO

Del stderr crudo, sin confianza previa: **511 stalls / 448 con vol>0 / 63 con vol=0** ✓; **vol: min 94 / mediana 113,0 / p95 162 (método robusto: nearest-rank Y lineal dan 162) / máx 430** ✓; **histograma exacto** (90s×81, 100s×90, 110s×130, 120s×76, décadas 130-199 = 61, cola 210-430 con **10** valores) ✓; **sin valores vol en [200,210)** ✓; sesión 01:24:55→02:31:40 local (66,7 min ~ «~1 h») ✓.

**Tres imprecisiones menores de la nota, todas documentadas y INMATERIALES** (ninguna mueve un criterio):
1. «Frames >200 ms: 26 (10 rebuilds + 16 foco/swap)» — el total 26 es exacto; la descomposición real es **26 = 11 clase-rebuild (10 con vol>200 + 1 frontera vol=186/total=205, línea 188, 90% vol-dominante) + 13 foco/swap sub-segundo (201-521 ms) + 2 eventos swap (15.636/16.825 ms)**. La nota clasificó por vol>200 y metió la frontera en «foco/swap»: convención de clasificación, no error aritmético. Reconciliación exacta, residuo cero.
2. «10 rebuilds >200 repartidos en toda la sesión» — se reparten por la **fase activa de scrubs (01:34-01:49)**, no por toda la sesión (los últimos ~20 min casi sin rebuilds: densidad 112/123/119/88 → 33/15/20 por tramos de 10 min). La sustancia anti-clustering (no un único burst; 10 eventos en 16 min) se mantiene.
3. «sin más recurrencias en 20+ min» — desde el evento 2 son **18,6-19,1 min** hasta el fin de sesión (22,8 min desde el evento 1 — lectura defendible si se cuenta desde el primero). El trigger ya está consumido por los 2 eventos; el dato no es load-bearing.

**Censo de contexto** (corroboración del relato): `result fail gambit` **126** (densidad PLANA: 9-10 por cada ventana de 5 min en TODA la sesión — ver §4); `launch catalog` 3 + `Could not fetch station catalog` 3 (las tres al arranque — lado GIRO muerto desde el inicio: N=0 GIRO corroborado conductualmente; el **N=31 kc2g queda DECLARADO**, sin traza en el stderr); `gate-consult deny` 2; `Framebuffer (MSAA 4x) incomplete` + `cayendo a 0x` **1+1 al arranque** (contexto GPU restringido — propio del stderr, ver §4); `bundles=0` en 511/511.

## 3. Criterios 190 §5 — adjudicación

### (i) pausado — CERRADO (corroborado a umbral 100 con matiz documentado)

El criterio quedó cerrado in-app por 191-liveness (pausa estática → silencio; scrub → exactamente 1 rebuild) al umbral del instrumento (250). El 237 lo somete a umbral 100 (2,5× más sensible). Del stderr: **6 tramos de silencio REAL ≥60 s (62/92/152/63/98/66 s) con la app viva** (líneas LGDC dentro de cada tramo) y **cero líneas WATCHDOG**, todos entre 02:05-02:29. La exigencia queda cubierta con margen (152 s máx vs 60-75 s requeridos).

**Matiz honesto**: los 6 tramos ocurren con **foco perdido**; el silencio máximo con foco ganado es de **31 s** (02:05:08-02:05:39). El log no permite tasar cuál tramo fue «la» pausa declarada, y ninguna pausa ≥60 s con foco ganado es verificable. Mitiga: la app **no tiene throttle duro** — existen stalls con focused=0 y con iconified=1 en otros momentos (el watchdog seguía armado sin foco), de modo que los silencios reflejan frames genuinamente <100 ms en volumen estático, no un artefacto de throttling. **(i) se mantiene CERRADO** (certificación 191-liveness + corroboración 237 a umbral 100); aclaración menor opcional en el próximo drop: señalar qué tramo fue la pausa (P3-b).

### (ii) p95 < 150 — NO CUMPLIDO EN LETRA (162 > 150). Ruling: NI recalibración NI backgrounding hoy; regla de cierre PRE-REGISTRADA

La cláusula de 190 §5 es explícita: «p95 < 150 ms objetivo (**recalibrable solo si el §4 muestra coste residual legítimo por-celda no memoizable**)». El §4 está **INCOMPLETO**: la sesión entregó UN punto efectivo (N≈31), no la tabla {mínimo, 14, 44}; N=44 está bloqueado por dependencia externa (LGDC 504 en catálogo y getbest, declarado y corroborado). Mover el umbral con el §4 a medias sería doble-calibración (y si p95(44) llega a ~200, un umbral fijado hoy quedaría corto) y rompería la disciplina de oráculo del relay (los umbrales no se mueven post-hoc sobre mediciones parciales). El backgrounding (190 §5/192) exige percepción declarada por el operador — la nota no la declara; queda en reserva.

Lo que sí queda establecido, para la regla: (a) la **mediana 113 cae exactamente en la predicción ~110 de la rama coste-fijo de 192** («si dominan picos/TEC (fijos) → ~110 ms») — el residual se porta como coste fijo por-celda + interp minoritaria, no como interp dominante; (b) el **floor memoizado ~70 ms** (aritmética propia de 192: ≈47 rejilla+eval+upload + ≈23 f2Floor/60) deja un residual p95 de ~92 ms a N=31; (c) el mecanismo declarado (picos/TEC/integrateTEC por celda + uploads, protegido por D187) es consistente con esa aritmética y con la distribución lisa y unimodal.

**REGLA DE CIERRE PRE-REGISTRADA del ciclo 191 para (ii)** (emitida ANTES de que existan los datos N=44; ambas ramas terminan en decisión):
- **Rama A** (la firma N=44 sigue siendo hitch-class: mediana ≤ ~130 ms, máx vol < 1 s, cero stalls vol multi-segundo): el veredicto de cierre **recalibra (ii) de 150 a p95 < 200 ms**, con tres anclas: el residuo estructural certificado (floor ~70 + por-celda/interp, D187); el límite de perceptibilidad unificado con (iii) (una sola familia de 200 ms, no un número negociado); y el techo del modelo — bajo la hipótesis máxima-interp (todo el residual ≥70 es O(5.184×N)), p95(44) ≈ 70 + 92×44/31 ≈ **200** — el objetivo 200 es robusto bajo ambas ramas del modelo de 192.
- **Rama B** (p95(44) > 200, o mediana se dispara, o aparece vol multi-segundo): **NO hay recalibración** — manda el §4 de 190: la memoización de la tabla de pesos IDW por columna está PRE-AUTORIZADA (190 §4, pesos solo (lat,lon): mismas condiciones + TU; si radial: ruling aparte con los números). Post-fix se re-mide y el cierre vuelve por Rama A.
- El backgrounding solo se abre por percepción del operador (reserva 190 §5, drop aparte).

### (iii) ningún stall UI > 200 ms — NO CUMPLIDO EN LETRA; descomposición adjudicada por clase

26 frames >200 ms/hora se descomponen: **11 clase-rebuild (205-433 ms)** — residuo estructural, misma familia que (ii), sub-segundo, hitch-class per la discriminación de 192 (<1 s = floor-build amplificado; segundos = patología interp); **13 foco/swap sub-segundo (201-521 ms)** — 11 de 13 con foco perdido (no user-facing en ese momento), 2 con foco (262 render-dominante, 391 swap-dominante); **2 eventos swap (15,6/16,8 s)** — multi-segundo pero fase-swap pura (ver §4), NO patología de interp. **El §4 NO se abre: máx vol = 430 ms — los picos pre-fix 3,8/6,8/7,4 s están MUERTOS empíricamente**, lo que confirma la hipótesis floor-build-amplificado de 192 y la eficacia del fix 191. El cierre de (iii) viajará en la forma ya anticipada por 192 («steady-state a 200, excepciones talladas por clase»), con esta tabla de clases como base: **quieto = CERO a umbral 100** (los silencios §3-(i)); **interacción = hitches rebuild ≤433 ms a N=31 (re-cotados con N=44) + foco/swap mayormente sin foco + swap-mega derivado a 193/194**.

### N-scaling {mínimo, 14, 44} — PARCIAL

N≈31 efectivo (0 GIRO corroborado + 31 kc2g declarado); la tabla por N no viajó; N=44 pendiente del servidor (504). El punto N≈31 ya cumple una función: fija la mediana en la rama coste-fijo del modelo de 192 y mata la cuestión de los picos pre-fix. **El ciclo 191 PERMANECE ABIERTO** por (ii)/(iii)/N=44 — el cierre formal llega con el veredicto post-N=44 por la regla pre-registrada.

## 4. Swap — LÍNEA 193/194: RESERVADA → ABIERTA. Forense del stderr durable (mi parte)

**Trigger ejecutado con margen**: reincidencia (2ª + 3ª ocurrencias en UNA sesión; original 10,895 ms en 191) — la condición de 192 se cumple de sobra. Sin fix especulativo antes de la atribución (precedente 116, ratificado por 192).

**Firma de los eventos (verificada del crudo)**: `stall 15636ms (poll 1 update 9 render 5 swap 15621) focused=1 iconified=0 vol=0` (línea 565, bracket local [02:08:53-02:09:23]) y `stall 16825ms (poll 1 update 9 render 16 swap 16800) focused=1 iconified=0 vol=0` (línea 597, bracket [02:12:33-02:13:05]). **Fase swap pura al 99,9%** en ambos (el original 10.895: 99,96% — misma firma); vol=0, update≈9: **el fix 191 queda exonerado de nuevo** (CPU-side puro). Separación 221-222 s (~4 min ✓). Cero recurrencias ≥1 s después del evento 2 (18,6-19,1 min hasta el fin).

**HALLAZGO CENTRAL (nuevo, del stderr durable — no estaba en la nota)**: los dos eventos disparan **en el primer frame tras restaurar la ventana desde minimizado**. En TODA la sesión hubo **exactamente 2 restauraciones desde iconified** — «focus gained (iconified=1)» en líneas 563 y 596 — y **ambas produjeron el mega-stall como primer stall posterior: 2/2, predictor perfecto intra-sesión**. Secuencia tipo: minimized (≥33/≥37 s) → focus gained (iconified=1) → stall 15-17 s (focused=1, iconified=0) → cola corta swap/render (109/186/262 tras el e1; 391 tras el e2) → operación normal (rebuild vol=105 limpio en línea 569).

**Síntoma prodrómico**: el evento 2 estuvo precedido por **una ráfaga de 10 stalls render-pesados (render hasta 285 ms) CON la ventana minimizada** (líneas 585-594) — el driver ya estaba degradado ANTES del restore; el evento 1 tuvo 1 stall iconified (129 ms). **Observación para el ruling 194** (no prescripción): el loop de render no se detiene al minimizar (stalls con iconified=1 lo prueban) — posible estresor del driver; cualquier cambio queda PARA DESPUÉS de la atribución.

**Correlación con Event ID 4101 (TDR)**: MUSE cita 4101 a ~02:08/02:12 — los brackets de los stalls ([02:08:53-02:09:23] y [02:12:33-02:13:05]) son **consistentes a la resolución del log (±30 s)**. La duración 15,6/16,8 s >> recuperación TDR típica (TdrDelay por defecto 2 s → 2-6 s): exige mecanismo amplificado — reset completo de driver/dispositivo + re-creación de recursos + re-fault del working set, o **cascada de TDRs** (el CONTEO de 4101s por evento en el export es el discriminador: 1 vs varios). Contexto GPU restringido probado por el propio stderr: **MSAA 4x incompleto → fallback 0x** al arranque; iGPU Intel driver era-2015 del historial 177 — los candidatos de 192 (TDR-recovery, serialización de cola, power-state) siguen en pie, ahora con **restaurar-desde-minimizado como contexto disparador**.

**Adjacencia «tras fallos gambit» — REBAJADA a ruido de fondo**: 126 fallos en 66,7 min con densidad PLANA (9-10 por cada 5 min en TODA la sesión, ventanas de los eventos incluidas — nada distintivas). Que un fail preceda inmediatamente a cualquier punto de la sesión es casi seguro por densidad; la adjacencia no discrimina nada. El disparador con señal es el restore, no el gambit. (El original 10,9 s fue reportado «en el arrastre» — contexto distinto, stderr de esa sesión no viajó: declarado. Denominador común: bloqueo de fase swap en este contexto GPU.)

**Estado de los 5 pasos forenses de 192**: (1) líneas completas con flags ✓ DURABLE (arriba); (5) stderr conservado ✓ (este drop, sha anclado). (3) 4101 IDENTIFICADO pero SIN export durable → **P1-238**. (4) contexto GPU: parcial in-durable (MSAA fallback); ampliar → P1-238. (2) repro: los 2 nuevos NO son scrub-drag — la repro de mayor valor es ahora **restore-desde-minimizado** → P1-238.

## 5. Prescripciones

- **P1-238 (línea swap; bloqueante SOLO para el ruling 194, no para el operador hoy)** — drop 193 (nombre reservado) = diagnóstico forense: (a) export del System log 02:00-02:20 local (texto o evtx + hash): **cuenta de Event ID 4101 por evento** + vecinos (2004 resource-exhaustion, WHEA 18/19/46/47, Display/dwm); (b) contexto GPU: modelo, versión/fecha de driver, TdrDelay/TdrLevel/TdrDdiDelay, RAM + pagefile; (c) repro dirigida: minimizar ≥30-40 s → restaurar, ×3-5 (patrón 2/2) + scrub-drag 3-5× si se quiere cubrir el contexto del original; (d) declaración de qué más corría 02:05-02:15. → mi ruling 194 post-atribución.
- **P2-238 (ciclo 191)**: N=44 cuando LGDC reviva (dependencia externa, sin ETA, sin presión) → tabla {mínimo, 14, 44} × min/mediana/p95/max por N a epoch fijo (190 §4/192) → veredicto de cierre por la regla pre-registrada §3-(ii).
- **P3 (opcionales, sin prescripción)**: (a) N=14 adelantado si el UI permite subconjunto de estaciones (fija la pendiente antes de 44); (b) una línea señalando qué tramo fue la pausa declarada; (c) P1-236 (PNG badge tormenta) sigue opcional — no ejercido en 237, sin objeco.
- **NADA bloqueante para el operador hoy**: el 193 se ataca cuando se decida; el ciclo 191 espera al servidor.

## 6. Oráculos y barrera

Oráculos post-231 **SIN CAMBIO** (drop sin código; el build de medición es no-viajante por diseño y su reversión quedó declarada). Barrera 156/156 its / 6644 checks intacta (sin ejecución señalada en 237; re-certificación en el próximo drop de código).

## 7. Ledger y siguiente paso

…/235/236(GLM)/**237/238(GLM)**; **línea swap 193/194: reservada → ABIERTA** (drop 193 = diagnóstico MUSE; from-glm/194 = ruling GLM); **ciclo 191 ABIERTO** (N=44 → cierre (ii)/(iii) por regla pre-registrada); **W-4 CERRADO** (236, sin cambio); **próximo libre 239** (la línea swap viaja bajo sus nombres reservados 193/194; ambas numeraciones conviven).

Siguiente paso: a discreción de MUSE — drop 193 (forense swap) y/o esperar N=44 para el cierre del ciclo 191. A mi señal no hay más backlog W-4 (agotado en 236).
