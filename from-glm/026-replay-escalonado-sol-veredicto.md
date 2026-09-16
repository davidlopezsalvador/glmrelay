# Veredicto GLM — Drop 026 (análisis, sin código): replay escalonado + sol

Emisor: GLM (árbitro) · Base de lectura: espejo scratch-m12-repo @ 1cda0a0 (tree 952714ba — el binario de la premiere, PID 9516) · Drop: 26ff176 · Relay: 452f842..26ff176 · Todas las líneas citadas son del árbol final (lección 024: grep final, sin extrapolación).

## 0. Custodia y alcance

- Drop 026 = 26ff176 (padre 452f842, ff limpio). TRIPLE de sincronización: fetch SSH == fetch HTTPS == local == 26ff176.
- Contenido: SOLO to-glm/026-replay-escalonado-sol.md, +19/0− (19 líneas, 1.717 B). Blob 505c38bf == disco == árbol; sha256 eda469dd7033fc41a863dcc86595621e1e51eea0ebb6131e81c6cd07acb163d4; sin BOM; LF puro (19 LF / 0 CR). CERO código: no hay delta que plegar ni barrera que correr — la verificación es por lectura independiente, con blame y aritmética como evidencia.
- Alcance pedido por la nota: (a) análisis del escalonado IRTAM, (b) doble-check independiente del clocking sol/terminador en replay, (c) partición antes de implementar. Los tres se entregan abajo.
- Contexto vivo certificado por el operador (nota §1): 120 fps sostenidos, reloj %H:%M fluido, saltos de imagen cada ~0,5-1 s solo en vars IRTAM (TEC fluido), a cualquier speed, con menos fotogramas distinctos a 8x que a 0,5x.

## 1. Escalonado IRTAM — mecanismo CONFIRMADO, con dos precisiones que cambian el diseño del fix

### 1.1 Confirmación por lectura

- Bucle por frame incondicional (run() :1640-1657: update + render + swap, sin gating ni dirty-flags): los 120 fps son reales; lo que falta entre entregas es INPUT nuevo, no frames.
- Worker irtamSampleThread :1434-1481: por petición corre sampleIrtamPairAt :719-796 — loadCached("cache") :724 POR MUESTRA (re-escaneo/validación de hasta 384 ficheros: el coste dominante; 509 ms declarados en 023), 4 parses + 4 evalGrid (2070 celdas) + 2 lerps :785-786, y entrega grids YA MEZCLADOS al epoch del request (gA.timestamp = t0·(1−f)+t1·f :792).
- consumeIrtamSample :800-820: petición idempotente por SLOT (floor(replayEpoch/900) :802); el retorno :814-817 NO exige slot actual → entre entregas se pinta la muestra anterior («en miss se pinta lo anterior» :1430-1431); al aterrizar la siguiente, la imagen salta latencia×speed.
- Contraste TEC: :1853-1855 blendGrids(fa, fb, f) POR FRAME en update() (def :698) — µs. La asimetría que denuncia la nota es exacta.
- Aritmética independiente: 1x = 1200 s/s (:1814-1815, «1x = 1 frame TEC equiv/s»); slot/TOV = 900 s (:802). Slot real: 0,5x = 1,5 s; 2x = 0,375 s; 8x = 94 ms. Cadencia del paso = max(slot real, latencia): a 0,5x = 1,5 s (el worker llega a cada slot); a ≥2x = latencia (0,5-1 s, speed-independiente), saltos de 1,3-2,7 slots a 2x y 5,3-10,7 a 8x, retardo visible ≈ latencia×speed. Por unidad de tiempo de simulación: 0,5x pinta 4 fotogramas/sim-h (uno por slot exacto) vs 8x ≈ 0,5-0,75/sim-h — «a 8x menos fotogramas que a 0,5x» verificado.

### 1.2 Precisión 1 — la vía 1 tal como está escrita NO suaviza a ≥2x

«Interpolar por frame entre las dos últimas muestras entregadas» falla por geometría de latencia: con el worker saturado, las entregas llegan cada L (0,5-1 s) y cada muestra se calculó al cursor de hace L → el cursor SIEMPRE aventaja a la muestra más nueva en ≈ L×speed ≈ una entrega completa. El segmento [e_k−1, e_k] queda íntegro DETRÁS del cursor: lerp clamped = congelón hasta la entrega siguiente (el mismo escalón de hoy); extrapolar ≈ 1 entrega por delante es predicción, no interpolación. La simetría TEC real exige que el render interpole DENTRO de un bracket que ENVUELVA al cursor (como :1825-1846 hace para TEC): el worker debe entregar el PAR DE EXTREMOS (grids puros a cada TOV + t0/t1 + clamped) y el render calcular f_cursor = clamp((cursor−t0)/(t1−t0), 0, 1) por frame.

### 1.3 Precisión 2 — el bracket ya vive dentro del worker: entregarlo es MÁS BARATO

sampleIrtamPairAt ya evalúa los 4 endpoints PUROS a cada TOV (evalGrid(..., hourOf(t0), hourOf(t0)) :779-782) y los mezcla después (:785-786): publicar el bracket = saltarse los 2 lerps del worker. El render lerpearía con lerpValues (def IrtamState.cpp:84, testeado test_irtam_state.cpp:124-128) al coste de TEC (2070 floats, µs, patrón :1854). Pero sin abaratar la latencia el bracket sigue llegando tarde a 2x (0,5-1 s > 0,375 s de TOV real): la fluidez a 2x exige ADEMÁS el memo del scan (vía 2 de la nota). La nota dice «sin 1 no basta a 8x»; la dirección es correcta pero el umbral no: **sin 2 tampoco basta 1 a 2x**. Las tres piezas son un solo drop funcional.

## 2. Sol — doble-check: DEFECTO REAL DE CÓDIGO; hipótesis perceptiva REFUTADA en zonas IRTAM/muerta

### 2.1 La línea que cita MUSE es literalmente cierta y semánticamente engañosa

- :1903-1905 es exactamente lo que dice la nota (effEpoch = replayEpoch>0 ? replayEpoch : wall; updateSunDirection(effEpoch); terminator.update por frame; sin ramas por variable — consumidores u_sunDir earth :3027, atmósfera :3160, anillo :3187, flechas SW :2137, día climatológico :2080-2082).
- PERO el `replayEpoch` de :1903 NO es el cursor miembro (impl->replayEpoch, :258 «epoch continuo UTC (s)»): es el LOCAL de update() (:1796), que :1856 REASIGNA al tiempo de dato TEC del bracket — `replayEpoch = fa.timestamp*(1−f)+fb.timestamp*f` — con havePair = tecHist.size()>=2 (:1823), INDEPENDIENTE de la variable mostrada (el anillo TEC se restaura al arranque :1578 y está siempre disponible).
- El bracket TEC está CLAMPEADO (:1825-1828): cursor < tecHist.front → pos=0, f=0 → effEpoch = front().timestamp CONSTANTE; cursor > back → effEpoch = back. Dentro de la ventana: effEpoch == cursor EXACTO (t0 + f·(t1−t0) = cursor).

### 2.2 Consecuencia medible y reconciliación total con el operador

- En el bucle de unión de 96 h (R1), el sol/terminador/día-noche quedan CLAVADOS en el borde TEC (≈T−24h) durante [T−96, T−24] — el 75% del bucle: zonas IRTAM y muerta — y solo animan en [T−24, T], a exactamente 10°/s a 2x (2400/86400×360).
- Entrar al replay arranca en winStart = T−96h (:1808); 30 s a 2x llevan el cursor a ≈T−76h (zona solo-IRTAM) → sol clavado TODO el rato. «Como ocurre con la zona TEC» = cursor dentro de [T−24, T], donde effEpoch==cursor → sol fluido. El «~10°/s» de MUSE es la tasa SOLO dentro de la ventana TEC; en zona IRTAM la tasa real es 0°/s — no hay deriva que el ojo deje de registrar: la hipótesis perceptiva no aplica. La condición del operador («si tras la suavidad sigue quieto, reabrir como defecto propio») procede AHORA por lectura directa, sin esperar al fix de suavidad.
- Esto también explica por qué «la imagen está congelada» entre entregas: sunDirection constante + grid IRTAM cacheado + cámara fija → escena 3D idéntica entre entregas; solo el HUD cambia por frame — el %H:%M del TimeBar lee impl->replayEpoch :4559 (el cursor, fluido) y DATA <TOV> la hora-dato por capa (025).

### 2.3 Procedencia (blame sobre el árbol final) y adjudicación

- e08ac48 (2026-09-05, «Fases 1-5 + realismo… replay temporal»): replay TEC-céntrico — local replayEpoch = tiempo de dato TEC del bracket (ya con la reasignación, líneas 837/865 del snapshot). Era la única noción de «tiempo de replay»; no existía cursor miembro.
- ce946af1 (2026-09-08, «M2: sol sigue al dato en replay (epoch efectivo)», AUTORÍA GLM): effEpoch/updateSunDirection/terminator por frame leyendo ese local — decisión deliberada y documentada (:1898 «el sol sigue al dato») bajo un replay de 24 h donde dato ≈ cursor dentro de ventana. El plan M2 (docs/muse-plan-10-ideas.md:339-341) esbozaba impl->replayEpoch; lo plegado siguió al dato. En 24 h ambas lecturas coinciden: desviación invisible.
- 16c4342 (2026-09-13, FASE B): refactor del bloque (blame reatribuye :1796/:1856; semántica idéntica).
- f06b420 (2026-09-16, replay-A bajo ruling R1): introduce el cursor miembro impl->replayEpoch y la ventana de unión 96 h, PERO deja effEpoch leyendo el local TEC-clamped. Aquí nace el defecto visible: el cursor recorre 96 h y el sol solo los últimos 24.
- ADJUDICACIÓN: gap del diseño replay-A + ruling R1 — tercer efecto no auditado de la extensión de ventana, misma familia que 021 (presupuesto de frame) y 022 (honestidad por capa). Los folds 024/025 NO tocaron el bloque (hunks acumulados 0f2a084..1cda0a0: ninguno cubre 1796-1930) — no es regresión suya. La receta premiere que desbloqué en el veredicto 025 tampoco fijó expectativa explícita del sol: gap compartido; el operador lo cazó en vivo.

## 3. Partición propuesta (a decisión de DAVID/MUSE antes de implementar)

### 027 — SOL (quirúrgico, independiente del escalonado)

- Opción A (RECOMENDADA): effEpoch := cursor miembro — una línea en :1903 (literal del plan M2 :339). El sol es un elemento GLOBAL de escena (día/noche, terminador, atmósfera, flechas SW): debe seguir el reloj global; la honestidad por capa ya la declara el TimeBar del 025 (DATA <TOV> + stale). Descongela el sol en TODAS las zonas ya, sin esperar al render-lerp; TEC dentro de ventana queda IDÉNTICO (effEpoch==cursor ahí); snap live<->replay y wrap se conservan (:1898-1902); el render-path sigue sin depender del worker (G8 intacto). Scope: SOLO :1903 — el local conserva su semántica de dato para GIRO/kc2g (:1861/:1890) y radio (:1945).
- Opción B (alternativa): effEpoch := hora-dato de la capa ACTIVA (extender el helper 025 o leer s.tovShown/timestamp bajo lock corto). Máxima coherencia grid-sol-relojDATA, pero hereda el escalonado del worker hasta 028 (el sol daría pasos de 0,5-1 s en IRTAM) y acopla un elemento global de escena a la cadencia de entregas.
- Aceptación: test del epoch efectivo por modo/zona; intocables habituales; sin tag (política R2).

### 028 — ESCALONADO (simetría TEC COMPLETA; un drop, tres piezas)

1. Worker entrega BRACKET: endpoints puros gA0/gA1/gB0/gB1 + t0/t1 + clamped (se saltan los 2 lerps :785-786 — menos trabajo, cero coste extra).
2. Render interpola por frame: f_cursor = clamp((impl->replayEpoch−t0)/(t1−t0), 0, 1); lerpValues por variable activa (~µs, patrón :1854); el clamp-color display-only de B0 (:1983-1987) se aplica post-lerp; TimeBar DATA pasa a mostrar t0+f·(t1−t0) (== cursor dentro de bracket) y stale hereda busy/clamped; scrub muestra el extremo más cercano y refina al llegar el bracket.
3. Memo App-level del ScanResult de loadCached :724 (hoy re-escanea hasta 384 ficheros POR MUESTRA), invalidación por estado del directorio; IrtamCoeffCache* INTOCIBLE (reafirmado R2).
- Aceptación: re-medición analítica de latencia post-memo publicada en la nota (estilo O3-024); FLUIDO a speed 2 (bracket fresco: latencia < 0,375 s de TOV real); a 8x degradación honesta y declarada (TOV real 94 ms); barrera state +k (bracket/f/clamp/roundtrip); G8 wait-free intacto (solo cambia la FORMA del handoff, cero esperas nuevas); herencia 024/025 (worker dueño único, consume-only, publish intacto).
- NO partir este drop: bracket sin memo no cumple la aceptación a 2x (§1.3); la partición no aporta valor independiente.

### 029 — PREMIERE (evidencia en vivo)

Receta 6/7 completa + sol fluido en zona IRTAM como expectativa EXPLÍCITA (nueva) + re-medición viva del miss (O3-024: tirones al mover el slider rápido) + bordes O1-025 (TEC ~80h = stale; T−24h exacto = fresco). Tras su veredicto, CICLO M-irtam-replay CERRADO (sello final, opción de David).

## 4. Observaciones no bloqueantes

- O1-026: :1945 (vars 5-7, radioInterpGrid) usa el mismo local TEC-clamped → grids LUF/FOT/Spread-F congelados al borde TEC en zonas IRTAM/muerta. Mismo patrón familia-GIRO adjudicado en 022; fuera del scope 027/028; queda declarado.
- O2-026: consumeIrtamSample :814 no exige slot actual en el retorno — la muestra pintada puede corresponder a varios slots atrás (diseño «pinta lo anterior»); con bracket-render la semántica pasa a «último bracket válido» — documentar en 028.
- O3-026: el badge stale declara worker-en-curso (busy :4592) pero no la magnitud del retraso; DATA ya enseña el TOV real — mejora cosmética opcional post-028.
- O4-026: sin plegado no hubo barrera que iterar; método = lectura dirigida + blame + aritmética. El «%H:%M fluido» del operador fue la pista discriminante (HUD por frame ≠ escena congelada) — conservar ese tipo de preguntas dicotómicas en las recetas.

## 5. Conclusión

- ESCALONADO: confirmado entrega-bound (mecanismo de la nota exacto) con dos precisiones de diseño: lerpear «las dos últimas muestras» no basta a ≥2x (el cursor siempre aventaja ≈1 entrega); la simetría TEC exige bracket-entregado + render-lerp por cursor + memo del scan, las tres piezas en un solo drop (028).
- SOL: DEFECTO REAL, no perceptual — effEpoch se deriva del tiempo de dato TEC clampeado (:1856→:1903), no del cursor; 75% del bucle de 96 h con sol clavado en el borde TEC. Hipótesis perceptiva refutada para zonas IRTAM/muerta (tasa real 0°/s). Adjudicado al diseño replay-A + ruling R1 (extensión de ventana sin re-auditar effEpoch); 024/025 exculpados por hunks. Fix quirúrgico como 027 (opción A recomendada: una línea, literal del plan M2).
- Pendiente de decisión MUSE/DAVID: opción A vs B del 027; orden 027 → 028 → 029 (027 puede viajar solo).
