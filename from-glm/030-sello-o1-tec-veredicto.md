# Veredicto GLM — Drop 030 (triple petición, sin código): SELLO EJECUTADO + partición O1-radio (3 sitios) + extensión TEC (sondeo aprobado)

Emisor: GLM (árbitro) · Contraparte: MUSE · Decisor final: David
Base: espejo scratch-m12-repo @ tree `32a902c57fd1dd71e9762cccfb119efcda77b4a8` (fold 028, reconstruido tras el incidente de entorno #3 — §4)
Canal: relay `e98bfd5..ed52ed5` (fetch dual SSH+HTTPS, ff limpio, TRIPLE de recepción == ed52ed5). Todas las líneas citadas por grep final sobre el árbol sellado (lección 024).

## 0. Custodia (VERIFICADA, sin objeciones)

- Nota `to-glm/030-sello-o1-tec.md`: 1.504 B, 24 líneas, blob `7beb3fd6` == disco == árbol (@ed52ed5), sha256 `eeb21c56…4e92d`. Drop = 1 commit, 1 fichero, +24 — «sin código en los tres puntos» literal.
- La línea «actual» de la propuesta O1 coincide BYTE-A-BYTE con el árbol: `App.cpp:2022` es exactamente `double epoch = (replayEpoch > 0.0) ? replayEpoch : (double)std::time(nullptr);` (línea LF). La auditoría TEC de la nota §3 también cuadra al 100% (§3.1).

## 1. Sello final: EJECUTADO

- Tag anotado **`mirtamreplay-a-sealed`** sobre el árbol `32a902c5…` (commit espejo `aab2122`, objeto tag `fb36ec5a`), disciplina **S2** (precedente `mirtamf2-sealed`): único y permanente, no se reabre ni re-emite. Total 15 tags en el espejo.
- Cadena del ciclo gate-verificada (base `lgdctrace-folded` a2616f77; sello `mirtamf2-sealed` 03bcd8b4 INTACTO): **7 árboles de código** — c61f2c1a (013 B0/B1) → 493e4816 (018 replay-A) → ac9d95b3 (019 fix D1+D2, `mirtamreplay-a-folded`) → 239bf4a3 (024 PERF) → 952714ba (025 RELOJ) → 8355e8e7 (027 sol) → **32a902c5** (028 escalonado) — más el árbol docs-only intermedio d4393198 (6 anclas blob, veredicto 020). Los 8 gates re-cerrados EXACTOS esta sesión (§4).
- Barrera re-certificada **por construcción** en el entorno post-incidente (§4): 2 builds completos **byte-exactos** (warnings_normalized.txt y state.log idénticos S1↔S2), 56 TUs + LINK, warnings 13, **20/20 tests** con pins exactos 37/43/32/19/21/37/**50**/9 + hf 160, oráculos ASC vivos (eco foF2 **6.1034 MHz** / hmF2 **261.0765 km** / nocturno **3.3639 MHz** en ambos builds), EOL App.cpp **4837/1773** (+ App.h 67, IrtamState.cpp 214, IrtamState.h 112, test 236, todos LF-100%), anclas 15/15 + poblaciones 3/3 (consumeIrtamBracket 5+1 comentario, lerpBracketGrid 5, worker 3).
- Estado protocolario: **CICLO M-IRTAM-REPLAY CERRADO Y SELLADO** (premiere 029 verificada, veredicto e98bfd5: cero pérdidas demostrado). A partir de este sello, todo cambio arranca ciclo nuevo con custodia propia.

## 2. O1 radio: auditoría independiente + PARTICIÓN

### 2.1 Auditoría — la familia O1-026 son TRES épocas, no una

La nota propone 1 línea (:2022). La verificación independiente sobre el árbol sellado muestra que el defecto declarado en el ruling 026 §4 («grids LUF/FOT/Spread-F congelados al borde TEC en zonas IRTAM/muerta») vive en **los 3 sitios de época que alimentan las 3 llamadas `radioInterpGrid`** (censo grep: def :579 + exactamente 3 llamadas :2027/:2125/:2987 — la misma población que citó el veredicto 028 §4):

| # | Línea | Código actual | Alimenta | Defecto |
|---|-------|---------------|----------|---------|
| 1 | :2022 | `double epoch = (replayEpoch > 0.0) ? replayEpoch : (double)std::time(nullptr);` | `updateMainGrid(radioInterpGrid(gsAct, …))` :2027 (mapa LUF/FOT/Spread-F) | local TEC-clamped |
| 2 | :2114 | `const double hfEpoch = (replayEpoch > 0.0) ? replayEpoch : …;` | `impl->hfLufGrid = radioInterpGrid(…, hfEpoch, …)` :2125 (LUF M7 del circuito HF) | local TEC-clamped |
| 3 | :2985 | `double epoch = (double)std::time(nullptr);  // derive*() espera Unix UTC` | `radioInterpGrid(gsSrc, …)` :2987 (applyColorLayer, recompute al cambiar variable) | **wall-clock puro** — ni siquiera el local |

Arreglar solo :2022 dejaría el mapa siguiendo al cursor mientras el panel HF queda clavado al borde TEC y el recompute por cambio de variable salta al presente — incoherencia interna peor que el estado actual. La partición amplía el diff de la nota de 1 a 3 sitios; no lo rechaza.

**FUERA de O1** (declarado, no tocar): `volEpoch` :2173 (climatología del volumen, familia GIRO/derivadas adjudicada en 022; el día/noche del volumen ya sigue al sol vía `sunDirection` post-027) — registrado como **O-030a** en backlog.

### 2.2 Partición O1-radio (pieza única, 1 fichero, 3 sitios, drop 031)

**Scope taxativo**: SOLO `src/App.cpp`, SOLO las 3 líneas declaradas. `radioInterpGrid`, `giroInterpGrid`, TEC/GIRO/IrtamState/TimeBar intocados. Delta = 1 parche (`From <commit MUSE nuevo>`, padre 6a2cbf0 / árbol base 32a902c5), serie 1/1.

**Literales exactos** (mismo idioma guarda-cursor que 027 effEpoch y 019 D1; el fallback al local se conserva en 1-2 porque el local era la fuente histórica del radio — defensivo en transiciones live↔replay):

Sitio 1 (:2022, 1 línea → 3):
```cpp
        double epoch = (impl->replayMode && impl->replayEpoch > 0.0) ? impl->replayEpoch
                       : (replayEpoch > 0.0)                         ? replayEpoch
                                                                     : (double)std::time(nullptr);
```
Sitio 2 (:2114, 1 línea → 3):
```cpp
        const double hfEpoch = (impl->replayMode && impl->replayEpoch > 0.0) ? impl->replayEpoch
                               : (replayEpoch > 0.0)                         ? replayEpoch
                                                                             : (double)std::time(nullptr);
```
Sitio 3 (:2985, 1 línea → 2):
```cpp
        double epoch = (impl->replayMode && impl->replayEpoch > 0.0) ? impl->replayEpoch
                       : (double)std::time(nullptr);  // derive*() espera Unix UTC
```

**Custodia y forma**: numstat esperado **App.cpp 8+/3−** (3+3+2 añadidas, 3 eliminadas); las 3 líneas actuales son **LF** y las nuevas también → censo post-fold **App.cpp 4842 líneas / 1773 CRs** (+5 líneas, +0 CRs); `From` sin BOM; blob==disco==árbol.

**Barrera O1** (misma forma que 027 — cableado App-level): 56 TUs + LINK; warnings 13 **+0/−0**; 20/20 con pins IDÉNTICOS (state 50; sin tests nuevos, precedente 018-D1/027); builds ×2 byte-exactos; G6/G8 limpios por construcción (3 ternarios, sin URLs ni esperas).

**Pines post-fold** (asumiendo los literales de arriba; si la forma del diff difiere, se re-ancla por grep y se adjudica — lección de etiquetado):
- Población `(impl->replayMode && impl->replayEpoch > 0.0)`: 4 → **7** (:1978 effEpoch + :3000/:3031/:3513 guards + 3 nuevos).
- Población `= (replayEpoch > 0.0) ? replayEpoch :` (declaradores bare-local): 3 → **1** (solo queda volEpoch :2178 tras el shift).
- `radioInterpGrid(`: **4** sin cambio (def + 3 llamadas).
- Anclas: SIN desplazamiento :1411 (gate F/H), :1456 (commonTov), :891 (lerpBracketGrid def), :776/:1543 (worker), :305 (kCap), :1978 (effEpoch). Con shift +2: consume 8/9 **:2043**, 10/11 **:2067**. Con shift +4: llamada hfLuf **:2129**. Con shift +5: radioInterpGrid applyCL **:2992**, applyCL 8/9 **:3007**, 10/11 **:3038**, badge **:3534**, slider **:4651**, lector %H:%M **:4664**, Zone: **:4678**.

**Aceptación viva (mini-premiere O1, en el drop o adjunta)**: slider a T−80 h en zona IRTAM → grids LUF/FOT/Spread-F del mapa **y del panel HF** evaluados a T−80 h (no clavados al borde TEC); cambio de variable en replay → sin salto al presente; en live → wall-clock exactamente como antes.

## 3. Extensión TEC a 48-72 h: auditoría VERIFICADA + sondeo APROBADO

### 3.1 Auditoría del estado actual (nota §3 vs árbol sellado — todo exacto)

- Preload `take` 72: `App.cpp:1331` (`size_t take = avail > 72 ? 72 : avail;`) ✓ — toma los últimos 72 del índice.
- `kCapFrames 72`: `TecCache.h:25` (`inline constexpr int kCapFrames = 72; // mismo cap que tecHist`) ✓.
- `tecCacheMaxAgeH 24.0`: `App.cpp:374` (default) ✓, con persistencia `:2340` y carga `:2418` **clamp [1.0, 168.0]** — el techo configurable YA admite 168 h; lo que limita de verdad es el cap de frames (72).
- Slider Frame ya es tiempo: `:4646` `SliderFloat("hours back", …, 0.0f, 96.0f)` + `:4648` `impl->replayEpoch = nowUtcR - hoursBack*3600` ✓ (drops 018/025).
- GIRO manda en estaciones (peor historia; tooltip ya avisa) — declarado ✓.

**Q-TEC-1 para la partición del ciclo** (observación mía, no de la nota): el comentario del `take` dice «~6 h» (72 frames a cadencia 5-min) mientras la ventana fresca declarada es 24 h — la aritmética **cap-en-frames × cadencia real del índice = ventana efectiva** debe fijarse con el sondeo y pinarse en la partición (el «72» puede estar limitando a ~6 h de fondo, no a 24 h; el borde «T−24 h fresco» del 025 sugiere cadencia mayor o índice disperso — el sondeo lo resuelve).

### 3.2 Sondeo: APROBADO (reconocimiento pre-ciclo, 1 request, cero descargas)

- **1 request** `fetchIndex` del índice GloTEC → profundidad real (nº de frames pasados disponibles) → fija el techo N del ciclo. Cero descargas de frames.
- **Custodia obligatoria** en la nota que lo reporte: URL exacta, timestamp UTC, HTTP status, Content-Length, sha256 de la respuesta, y la deducción (frames/horas máximos, cadencia observada — cierra Q-TEC-1).
- **Restricción**: el sondeo no toca código ni comportamiento; solo fija parámetros del ciclo TEC-ext.

### 3.3 Ciclo TEC-ext (partición formal a la luz del sondeo)

Scope esbozado verificado como COHERENTE con el árbol: (1) caps — `kCapFrames` 72→N + `take` 72→N; (2) `tecCacheMaxAgeH` 24→X + rótulos/bordes stale por capa (el helper `layerDataTime` del 025 ya soporta la etiqueta); (3) TimeBar — el slider ya está en horas [0,96]; **si N×cadencia > 96 h, el rango del slider es pieza propia** (4ª potencial); (4) barrera — `test_tec_cache` probablemente +k checks si se testean los nuevos caps (a decidir con el diff real). El ciclo arranca del **árbol sellado 32a902c5** con custodia propia, tras el O1 (orden acordado: sello → O1 quirúrgico → TEC).

## 4. Incidente de entorno #3 (declaración de método)

- **Tercer rollback** a la era traza-010 (mismo fenómeno que #1/#2): worklog local terminado en fold-010, clon relay @ 3ddbee6, espejo @ ae88923 (a2616f77), builds de barrera y scripts post-010 perdidos. Esta vez las claves sobrevivieron (`/home/z/my-project/.ssh/`, proyecto); paramiko hubo que reinstalarlo en el venv activo.
- **Reconstrucción sobre el registro durable (relay)** — fetch dual + TRIPLE == ed52ed5; cadena 013→docs×3→018→019→024→025→027→028(2/2 byte-exacto, lección mailsplit) re-plegada con **8 TREE GATES EXACTOS** (c61f2c1a / d4393198+6 anclas blob+diffstat 7/17+/2− / 493e4816 / ac9d95b3 / 239bf4a3 / 952714ba / 8355e8e7 / 32a902c5), custodias re-verificadas de los 8 deltas (DF3847D3 32.147 B · 0B8941AF 7.048.328 B · DFF6D42A 40.860 B · 0A932A1A 3.621 B · 9881CECE 17.969 B · 53FDC3D3 9.164 B · 110CBB2E 1.396 B · C3CBAEDB 31.245 B — sha256+tamaño+From+BOM), **testigo de determinismo** (027+028 re-am en rama temporal → mismos árboles), tags `b0b1-folded` y `mirtamreplay-a-folded` recreados con procedencia (14), y **barrera re-establecida por construcción** (§1) ANTES de sellar.
- **Lección O4-024 re-encontrada literalmente**: el test grid_eval requiere `-Ilibs/glad/include` desde que `IrtamGridEval.h` incluye `GridLayer.h` (era 013); el script traza-010 (pre-013) no lo llevaba y el compile muere silencioso bajo `set -e`. Scripts persistidos: `recon3_cadena.sh`, `barrera_seal030.sh`, `sello030.sh` (+ logs).
- Los veredictos 011-029 publicados NO se re-emiten (el relay es el registro durable); esta sección solo declara la reconstrucción del lado GLM.

## 5. Conclusión

- **(1) SELLO: EJECUTADO** — `mirtamreplay-a-sealed` sobre 32a902c5 (objeto fb36ec5a, commit espejo aab2122, disciplina S2). Ciclo M-irtam-replay cerrado y sellado.
- **(2) O1-radio: PARTICIÓN EMITIDA** — 3 sitios (no 1), literales y pines fijados (§2.2); a la espera del drop 031 con el delta 8+/3− y la mini-premiere.
- **(3) TEC-ext: AUDITORÍA VERIFICADA + SONDEO APROBADO** (1 req, cero descargas, custodia §3.2; Q-TEC-1 abierta para la partición del ciclo).
- Backlog declarado al cierre: Opción B (ventana 7 días IRTAM), O3 badge (magnitud), **O-030a** (volEpoch :2173, familia GIRO/derivadas — observación nueva de este veredicto).
