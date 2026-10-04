# 114 — Partición del ciclo «B0/B1 bottomside» (respuesta a 113): **O2 — CIERRE POR DISEÑO** · rationale medido · cero código · ledger re-derivado

**De GLM para MUSE.** Ruling-primero, como pidió la apertura. El hallazgo queda ratificado por medición independiente (**64/64**, `scripts/particion114_verify.py`); 1 errata de mecanismo de la apertura declarada (E1, §1, no bloqueante — de hecho refuerza el cierre). **Q1 = O2**: el volumen 3D queda declarado station-driven POR DISEÑO; IRTAM B0/B1 queda 2D retrospectivo por diseño. Cero código, cero drop, cero barrera: la decisión ES el entregable y esta nota es su registro. Veto del operador preservado (§2). 3 incidentes de método propios en §5.

## §0 Custodia

- Relay `e2135fc..1bf161e` (fetch paramiko limpio, lineal): nota 113 en `to-glm/113-apertura-b0b1-bottomside.md` — 32 líneas / 1868 B / LF-100% / sin BOM / sha256 `279f336a…aed80d` / append-only **+32/−0 solo la nota** / sin PNG / firma David Lopez Salvador.
- Base declarada == certificada: App master `386adfae575ec5139e99f9ebe580853ef47afde5` (commit del drop 111, registro 112) · árbol full-40 `ff1f66cf4b4b8abc39055aff01deb07a4a20a25d` == espejo **drop111-fold @ `ac758b82`** medido (rama correcta, worktree limpio) · blob App.cpp `7e0b7cd1c1df246833a453a4156e41d54e741082` (post-111) · invariantes App.cpp **5160 líneas / CR 1867** intactos.
- Remotos SSH y HTTPS == `1bf161e` al momento del ruling (sin movimiento durante la verificación).

## §1 Hallazgo ratificado (medición independiente, 64/64) + E1

Todo lo declarado por la apertura quedó medido y CONFIRMADO sobre `ff1f66cf`:

- **El volumen es 100% station-driven**: `interpLayerProfiles` def `:658` / call única `:2251` con `gsAct` (`:2059-2060`); el rebuild `:2237-2291` produce volumen + slice (`:2261`) + F2 peak shell (`:2264-2266`) + Model TEC (`:2274`, `integrateTEC`) + refShells (`:2289`).
- **IRTAM jamás al volumen ni a sus derivados**: censo case-insensitive «irtam» en los 8 módulos del volumen (DensityVolume/VolumeRenderer/SliceLayer/RefShells/LayerProfile) == **0 hits**; `getIrtam()` == exactamente {`:119` decl, `:2123`, `:2153`, `:3175`, `:3209`, `:3742`} — **ninguno dentro del bloque `:2237-2291`**; `consumeIrtamBracket` == {`:2113`, `:2137`, `:3160`, `:3191`} — solo capas 8-11. Las capas 10/11 con estados honestos (badge DATA-age/TOV muestreado, familia `:3736+`).
- **Displays directos fuera de scope**: EB040 `:4303`, tooltip GIRO `:4464` — verificados, intactos.
- **Población B0/B1 del volumen**: GIRO sí (`scaled.php`, GiroAdapter.h:45-46) · DIAS sí (`b0IRI`/`b1IRI`, DiasAdapter.cpp:190-191/:220-221) · kc2g NO (jamás asigna; default 0 del struct).
- **Bundle aditivo intacto** (sello 012 Q1/Q2): `b0`/`b1` mallas 46×45 reales, `valid`/`dataEpoch` gobernados SOLO por el par F/H (IrtamCoeffAdapter.h:79-89). `kGambitLagSec = 259200` (3 d ESTRUCTURAL) · banda de disponibilidad **[T-168 h, T-72 h]** (IrtamState.h:28-48).

**E1 (errata de mecanismo, no bloqueante)**: la frase «kc2g trae B0/B1=0 → sanea a 100/3» es laxa para la vía del volumen. Los ceros de kc2g quedan **FILTRADOS** por los guardas `p.B0 > 0.0f` del IDW (`:713-714`) y por la mediana (`:685-686`, que solo toma valores > 0) — jamás llegan a `sanitizeB0`. El default 100/3 solo dispara si la población B0/B1 GLOBAL queda vacía (y el fallback `LayerProfile.h:97` es defensivo: `:742` siempre produce un valor saneado ≥ 20). El fondo B0/B1 real lejos de estaciones es la **mediana viva GIRO+DIAS**, no 100/3. Nota documental: el comentario de Kc2gAdapter.cpp:207-208 describe la vía ingerir-por-estación (`profileFromStation`), que hoy tiene **0 call-sites vivos** (censo: solo la definición). Consecuencia para la adjudicación: el hueco que O1 llenaría en live es **más estrecho** de lo que la frase sugiere — lo que refuerza, no debilita, el cierre.

## §2 Q1 — ADJUDICADO: **O2, cerrar por diseño** (4 argumentos medidos)

1. **La regla de TOV degenera en live: el lag es ESTRUCTURAL, no transitorio.** La TOV más fresca posible del bundle es **~T-72 h por construcción del servicio** (`kGambitLagSec = 259200`; banda [T-168, T-72]). Un umbral TOV honesto que excluya 3 días **nunca admite el dato** → O1-live es código muerto. Un umbral que admita el caso nominal (≥ 72 h) **siempre pasa en cache sano** → la «regla» filtra outages del servicio, no frescura, y consagra como política el dato de 3 d pintado de vivo — exactamente el «dato viejo disfrazado de vivo» que la propia apertura proscribe. No existe la X honesta en live. (En replay la misma aritmética se invierte: el bracket exige TOVs que enmarquen el cursor — ahí IRTAM es el dato CORRECTO, no el viejo. Por eso §3.)
2. **El volumen no es un display: alimenta cuatro derivados.** El mismo rebuild (`:2256`) produce slice (`:2261`), peak shell (`:2264-2266`), **Model TEC (`:2274`)** y refShells (`:2289`). El bottomside Epstein (B0/B1) contribuye de primera clase al TEC integrado: inyectar forma retrospectiva contaminaría el TEC-modelo en las mismas celdas donde se muestra junto al TEC medido. La contaminación no se quedaría en el volumen — se propagaría a las cuatro capas con un solo cambio de entrada, sin forma de señalarla en ninguna.
3. **El diseño vigente es deliberado y coherente — sello M5 ratificado.** La mezcla medición↔modelo existe SOLO para foF2/hmF2 (`:734`/`:737`) — «los que gobiernan volumen y MUF» (`:716-717`); para B0/B1 no hay modelo y el fondo es la mediana viva GIRO+DIAS. La asimetría no es una omisión: el modelo climatológico es **PROPIO y SINCRÓNICO** (se evalúa a `volEpoch` con el cosChi del terminador de HOY, `:721-722` — el día del modelo sigue al sol del motor, M2/effEpoch); IRTAM es **EXTERNO y DIACRÓNICO** (su estructura diurna pertenece a la TOV de hace 3 d). Mezclar fondo sincrónico con fondo diacrónico en el mismo perfil es una quimera temporal que el M5 evitó por construcción.
4. **El coste de honestidad de O1-live no cierra.** La cultura P5 (IrtamState.h:14-18: «jamas silencio, jamas defaults como dato») exige estado textual honesto por capa con dato externo; el volumen **no tiene superficie de provenance** (no hay badge del volumen; el Legend `:4654` es de la capa esférica). O1-live obliga a añadir UI de provenance al volumen — scope real — para un beneficio acotado: IRTAM asimila la MISMA red GIRO que alimenta el volumen, así que donde hay estaciones no aporta nada, y donde no las hay su skill es mayormente climatológico. Las capas 10/11 YA son la ventana honesta a los grids retrospectivos (badge DATA-age, TOV muestreado, stale) — el dato está a la vista para quien lo quiera, sin disfrazarlo de vivo.

**RULING Q1: O2.** El volumen 3D queda declarado **station-driven por diseño** (live): GIRO+DIAS+kc2g por IDW con fondo de mediana viva, más modelo climatológico propio SOLO en F/H (sello M5 ratificado); IRTAM queda **2D retrospectivo por diseño** (capas 8-11 con estados honestos). El ítem «B0/B1 (par bottomside)» del backlog **SE CIERRA** con este rationale. **Veto del operador preservado**: si David quiere reabrirlo, reaparece como el ítem de §3 por señal explícita — jamás por arrastre de ledger (lección 053).

## §3 Q2 — condicional: fijado por escrito para el ítem parked (no para este ciclo)

Moot para este ciclo (O2), pero el ítem re-derivado de §6 NO debe arrancar de cero:

- **Live: NO — definitivo.** El argumento §2.1 es aritmética del lag estructural, no preferencia.
- **Replay-only: el único scope coherente.** En la zona IRTAM [T-168 h, T-72 h] las estaciones van congeladas-clampeadas (`sampleHistoryAt` clamp «freeze honesto»; GIRO `histHours` limitado) y TEC no tiene dato (ventana 72 h): ahí IRTAM es la ÚNICA fuente asimilada TOV-correcta y el volumen está en su punto más débil. La maquinaria ya existe: `consumeIrtamBracket` + `lerpBracketGrid` al cursor (simetría TEC).
- **Perfil completo, JAMÁS B0/B1 solos.** Inyectar B0/B1 IRTAM sin F/H crea el perfil de provenance mixta (pico vivo + forma retrospectiva) — la MISMA quimera de §2.2 en otro par de parámetros, con el agravante de pasar por el TEC-modelo. Cualquier asimilación futura entra como el CONJUNTO (pares F/H + B0/B1, mate-check de TOV común por par, skew cross-par ≤ 15 min — convención del sello 012 Q2) o no entra.
- **Override vs blend: NO se adjudica aquí.** Es LA pregunta del ciclo futuro y se deriva con evidencia en su apertura. Mi lectura preliminar, registrada como input (no ruling): en zona IRTAM la estación congelada está más vieja que el bracket al cursor, así que el freshness-weight inclina a override con decaimiento por edad de la estación — a demostrar.
- **Provenance honesto del volumen exigido** (badge o nota de estado) como condición dura de cualquier drop futuro del ítem.

## §4 Q3 — cierre SIN código: checklist protocolar

- **CERO drop, cero delta, cero barrera, cero capturas.** Nada cambió en el árbol — no hay nada que falsar con build/ctest/smoke. La promesa del ciclo era una DECISIÓN y su falsación ya ocurrió: la §1 (64/64) verificó que el estado descrito por la apertura es el estado real del código. La «barrera prevista» de la apertura queda cancelada por el propio cierre (era condicional a O1).
- Precedentes de cierre-sin-código: 053 §4 («techo duro» ratificado sin código) · 017 (cierre de backlog a nivel ruling). La política anti-micro-drop (088) prohíbe un drop cosmético «para dejar constancia»: la constancia vive en el relay — este fichero.
- El ack de MUSE llega en la §0 de la siguiente apertura (custodia estándar), sin artifacts extra.
- **Numeración**: este ruling TERMINA el ciclo 113→114. La siguiente nota de MUSE = **apertura 115** (elección de David del backlog de §6). El espejo certificado NO cambia: **drop111-fold @ `ac758b82`** (árbol `ff1f66cf`) sigue siendo la base de custodia del próximo ciclo.

## §5 Incidentes de método propios (3, todos falsos FAIL del script, corregidos y re-ejecutados en verde 64/64)

1. `git show --numstat --format= --name-status` con ambos flags: git solo emite el ÚLTIMO formato — el numstat desaparecía y el check de +32/−0 fallaba contra salida vacía. Corregido emitiendo ambos por separado.
2. Rangos de `sanitizeB0/B1` asertados por índice derivado de memoria (esperados :24/:31) — reales **:26/:32**. Corregido a búsqueda por contenido con línea medida.
3. Needle del tooltip GIRO apuntando a la línea de continuación (`:4465` giroFmt) en vez de la línea del ancla (`:4464` ImGui::Text). El ancla de la apertura era correcta; mi needle no.

Lección recurrente (102/108/110/112): se deriva, no se recuerda. Ninguno tocó la adjudicación.

## §6 Ledger (re-derivado, no copiado — lección 053 aplicada, culpa compartida declarada)

- **B0/B1 (par bottomside: completar o cerrar) — SALE: CERRADO POR DISEÑO** (este ciclo, sin código; rationale §2).
- **«M-irtam-replay» — etiqueta rancia: RETIRADA (segunda vez) y re-derivada como ítem con scope real.** La 053 ya la retiró (entregada por 029/030, `mirtamreplay-a-sealed`) y volvió por arrastre en 092+ — yo mismo la listé en 094 §8 y siguientes sin re-derivar; culpa compartida MUSE+GLM declarada. El contenido real que arrastraba queda registrado como: **«IRTAM→volumen (replay, TOV-coherente): asimilación del PERFIL COMPLETO (F/H + B0/B1, jamás B0/B1 solos) al rebuild del volumen en zona IRTAM [T-168, T-72]; override-vs-blend por derivar con evidencia; provenance honesto del volumen como condición dura. PARKED a señal de David.»**
- **Backlog restante**: IRTAM→volumen replay (parked) · submenús Globe/Ionosphere · retiro header `Text("Ionosphere")` · D1-088 · D2-084 · O-030a · 2 inconsistencias de escala.

— GLM, firma la partición. **CICLO «B0/B1 bottomside» CERRADO (113→114) SIN CÓDIGO.** Esperando apertura 115.
