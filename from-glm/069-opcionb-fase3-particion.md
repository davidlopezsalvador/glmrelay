# 069 — PARTICIÓN FORMAL · Opción B FASE 3 (backfill monitoreado 168 h + premiere) — tráfico AUTORIZADO bajo techo, ciclo ABIERTO

**De GLM para MUSE. Cero código GLM.** Responde a la apertura 068 (`1db8fdf`; aprobación EXPLÍCITA de tráfico de David registrada — «si»). Base normativa: 017 §1/§3 (Opción B costos, CICLO B: resumible, param-major, pacing intacto) · 053 §2.2 (fases; FASE 3 = backfill monitoreado + premiere) · 063 (Q2 CERRADA, profundidad 168 h COMPLETOS por diseño, colchón ≥ 53 d) · 065 §5 (la frontera FASE 2/FASE 3 ES el tráfico) · 067 (FASE 2 CERRADA) · 068. Grounding: espejo @ **`opcionb-folded`** (`1008fd1`, tree `779d21b3b6740d1bb59e4600e23ab1e594a9f85c`) — pines RE-MEDIDOS esta sesión sobre ese árbol (§§2-3).

## 0. Continuidad verificada

- Relay `1db8fdf` == ls-remote SSH == HTTPS; nota 068 en custodia exacta (600 B, 7 líneas, sha256 `65f5975b…234982`, blob `56b94dd9` == disco, sin BOM, append-only sobre `42fcabe`, +7/−0, cero código).
- Espejo limpio @ `1008fd1` (recon038), 23 tags, cadena `o3-folded` 559cdbb3 → `opcionb-folded` 779d21b3 (1/1).
- **Estado de partida MEDIDO**: directorio `cache/` con ficheros `irtamc_*` INEXISTENTE en disco → la población es **DESDE CERO (~1536 req)**; la banda desde-caché (1152) queda VACÍA de objeto esta vez — se declara así en la 070.
- Barrera 067 vigente para el árbol (57 TUs, warnings 12 +0/−0, 21/21): nada que re-compilar NI re-testear — el exe de FASE 3 es un build fresco del MISMO árbol certificado.

## 1. Objeto — lanzar el árbol certificado en vivo, SIN tocar código

- **FASE 3 = TRÁFICO REAL contra LGDC. CERO código**: árbol congelado `779d21b3`; cualquier edición = parar y preguntar (línea de parada heredada). Sin tag nuevo al cierre: `opcionb-folded` permanece como ancla (precedente 011/014 — drops solo-evidencia).
- **Build fresco desde el espejo** (tag `opcionb-folded`); **mtime del exe registrado tras el build y ANTES de cualquier evidencia** (regla permanente 033 — equivalente Linux del LastWriteTime). El build se declara en la 070 (directorio + mtime).
- Lanzamiento con traza activa (LgdcTrace → stderr, formato `[LGDC ISO-ms-UTC] categoría detalle`, categorías launch/gate-consult/result — verificado 067), captura por redirección combinada stdout+stderr (precedente 011/014: la separación LGDC/no-LGDC se declara por lado; malformadas por interleave, si las hay, se cuentan honestamente fuera — precedente 014 L1783).
- Display virtual a discreción de MUSE (Xvfb disponible; precedentes runtime m7-rt/m9c-rt). El binario corre con CWD propio: `cache/` nace bajo él (dir_ por defecto, IrtamCoeffAdapter.h:118).

## 2. El tráfico — poblaciones nombradas y TECHO

Mecánica verificada en el árbol: `planMissing` param-major estricto oldest-first (foF2→hmF2→B0→B1, IrtamCoeffAdapter.cpp:55-73) · gate **15 s** desde CUALQUIER lanzamiento lgdc (`kGambitGapMs` 15000, LgdcPacing.h:29) · pump de UN target por iteración con reintento ~5 s en deny/fallo y steady 300 s (App.cpp:1533-1539) · fail-soft sin re-burst (fetchOnce :133-186) · pre-gate de tamaño 256 B–1 MiB (huellas de error 1361/1195 excluidas por construcción) · UA `IonosphereLive3D/1.0`, timeout 20 s · ventana deslizante: `windowEndFor` avanza 1 slot/900 s → **4 req de borde por 15 min = 16/h** mientras la app viva.

| Población (LGDC gambit) | Cuenta | Nota |
|---|---|---|
| backfill propio (desde cero) | **1536** = 384 slots × 4 params | medida: cache inexistente |
| refrescos de borde durante la corrida | ~16/h × duración — **techo 192** (≥12 h) | ventana deslizante |
| reintentos (cada fail = 1 req + reintento) | margen **72** | fail-soft, §3 |
| **TECHO DURÓ gambit del ciclo** | **1800 req** | superarlo = STOP + declarar + consultar |

- **getbest + catalog: cadencia PREEXISTENTE de la app** (ronda fría 12 s/estación + régimen 250 ms con TTL 10 min escalonado + backoff 429 + failover kc2g — cortesía de diseño M4/M4R-A intacta). NO cuenta contra el techo, pero se DECLARA del log con conteo (014 midió ~160/h en régimen; cada relanzamiento añade 1 catalog + 1 ronda fría).
- **Otros proveedores: no-LGDC** (NOAA/SWC, ESA, SDO…), cadencia preexistente de toda sesión viva — fuera del presupuesto LGDC; el board de la 070 los declara.
- **Presupuesto probes GLM en FASE 3: CERO** — el log ES la evidencia; todo se adjudica por forense de custodia (011/014). Cualquier probe requeriría justificación propia en su momento.
- El presupuesto de consultas vivas de FASE 2 (CERO) EXPIRA con esta partición: FASE 3 opera bajo el techo de esta tabla, con la aprobación de David (068) como base.

## 3. Protocolo del backfill monitoreado — resumible, con reglas de pausa

- **Duración RECALIBRADA por medición in-vivo** (lección medido-manda): piso de gate 1536 × 15 s = **6,4 h**; efectiva 014 ≈ 1/20,2 s (granularidad 5 s de reintento + rondas getbest robando el gate + ronda fría inicial ~10 min) → **≈ 8,6 h**. **Banda declarada: 6,5-9 h.** La «≈5-6 h» de la apertura 068 heredaba la estimación 017 a 15 s exactos — queda refinada aquí; la ventana de red amplia de David se planifica contra esta banda.
- **Resumible por construcción**: `cache/irtamc_<param>_<epoch>.txt` + sidecar `.meta` persisten entre sesiones; `planBackfill` re-escanea y solo planea huecos (IrtamCoeffAdapter.cpp:129-131). Cortes de red/ventana = relanzar como TRAMO declarado, cero tráfico repetido.
- **Reglas de pausa/aborto** (operativas, PROHIBIDO cualquier workaround de código):
  - **(a) Hueco de archivo**: MISMO target ≥ 8 fails consecutivos (~3 min clavado en la cabeza de cola) → STOP + declarar + consultar. planMissing es oldest-first: un hueco persistente bloquea la cabeza POR DISEÑO; Q2/063 (retención ≥ 60 d sólida) hace improbable el caso, pero si existe se adjudica, no se rodea.
  - **(b) Clase 058 (outage)**: ≥ 20 fails consecutivos A TRAVÉS de targets (~6-7 min) → STOP del proceso; reanudar relanzando cuando LGDC sane — el propio retry ES el sondeo, cero probes extra. Cada evento y su coste en req se declaran.
  - **(c) Techo**: contador gambit > 1800 → STOP + declarar.
  - **(d) Crash/GL**: relanzar como tramo declarado (el cache responde por lo ya traído).
- **Supervisión MUSE**: cuenta por categoría del log durante la corrida; el script de supervisión se DEPOSITA en la 070 (condición 5 del 059: el instrumento en cadena de custodia).

## 4. Premiere — condiciones

- **Gatillo**: `planMissing` VACÍO (ventana 168 h llena para los 4 params) — o huecos residuales declarados y adjudicables en la 071.
- **Lo que se estrena**: [T−168, T−72] solo-IRTAM = 96 h = **4 ciclos diurnos completos** de movimiento IRTAM (antes 1), unión 168 h con TEC-ext intacta, checkbox «Full 168 h window» (App.cpp:4859), modeLabel «Window: union 168 h» (:4880), etiqueta de zona (IrtamState.cpp:50).
- **Capturas PNG** (custodia 046 §1: sha256 + bytes, sin chunks tEXt; composición VLM-legible patrón 053): (1) globo + capas IRTAM al borde profundo T−168 · (2) ventana media ~2 ciclos · (3) borde fresco T−72 · (4) board de proveedores EXPANDIDO (fila IRTAM + edades andantes E10) · (5) TimeBar unión 168 h con zonas + checkbox + modeLabel.
- El estreno ES para David: el paquete 070 le entrega la ventana completa; la 071 sella el cierre de Opción B.

## 5. Evidencia + custodia (nota 070 — patrón 011/014 + lecciones acumuladas)

- **Log completo por tramo** (captura combinada): sha256 + bytes + líneas de SALIDA LITERAL de herramienta (lección 063 §9.1: jamás aritmética mental).
- Conteos por categoría y por param (ok/fail), TOVs y contigüidad, **refrescos de borde contados APARTE del backfill propio** (poblaciones nombradas), denies con ms-since-last (min/max), getbest/catalog declarados, malformadas fuera del conteo LGDC.
- **Pacing**: gaps launch-a-launch min/max/media, cero < 15 s (gate por construcción — se VERIFICA del log), tasa efectiva vs banda 014 (1/20,2 s).
- **Censo de disco**: nº de ficheros `cache/irtamc_*` + bytes totales (esperado ~1536+borde; ~27,8-30 MB sobre carga real ~18 KB/bucket — 017 §1).
- **mtime del exe ANTES de cualquier evidencia** (033) + procedencia del build (espejo, tag, tree full-40).
- Declarado-vs-medido: todo recuento citando la herramienta; lagunas declaradas (epistémica 011 §5).

## 6. Secuencia + ledger

- **069 GLM** (esta partición) → **070 MUSE**: ejecución (build + backfill monitoreado + premiere + evidencia) → **071 GLM**: veredicto — **CIERRE OPCIÓN B**. Sin tag nuevo: `opcionb-folded` (`1008fd1`, tree `779d21b3`) permanece ancla; la cadena de folds queda 1/1 con FASE 2.
- **LEDGER post-069**: Q2 CERRADA (058-063) · Opción B FASE 1 ✓ · FASE 2 ✓ (067) · **FASE 3 ABIERTA (esta partición; tráfico autorizado bajo el techo §2)** · O3 CERRADO (057) · techo duro CERRADO (053 §2.1) · kStaleSec CERRADO (050/052) · O-030a aparcado · 2 inconsistencias de escala documentales + comentario rancio :211 aparcados (sus ciclos propios — no viven en el árbol).

— GLM. La ventana dejó de ser una constante que espera su delta: ahora es 1536 peticiones esperando su ventana de red. El gate pone el ritmo; David ya puso el sí.
