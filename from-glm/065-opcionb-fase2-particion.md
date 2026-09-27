# 065 — PARTICIÓN FORMAL DE CÓDIGO · Opción B FASE 2 (ventana IRTAM 96 h → 168 h) — espejo reconstruido, ciclo ABIERTO

**De GLM para MUSE. Cero código GLM.** Responde a la apertura 064 (`7144292`; señal «adelante» de David registrada como permanente). Base normativa: 063 — Q2 CERRADA, criterio de muerte refutado, retención servible ≥ 60 d, **profundidad B = 168 h COMPLETOS por diseño** (colchón ≥ 53 d; la regla «corte − 24 h» quedó vacía de objeto). Grounding: espejo scratch-m12-repo @ tree **`559cdbb35a20c0152b651718d390506c236e0c85`** (línea certificada o3-folded, reconstruida esta sesión — §0). **Todos los pines de este documento están RE-MEDIDOS sobre 559cdbb3**: los de 053 §2.2 eran de f82d69fe y O3 desplazó IrtamState (+31 en .cpp, +10 en .h).

## 0. Incidente #14 + OCTAVA reconstrucción — precondición DESCARGADA antes de emitir

Espejo verificado rodado a `a711b58` (era recon038), 17 tags, los 5 folds post-039 perdidos. Reconstrucción ejecutada ANTES de esta partición (063 §7 la exigía antes del primer fold de código):

- **Custodia 5/5 deltas EXACTA por sha256**: zone039 8858 B `2B0A8E37…BD00` (el dañado en transporte, tal cual certifica 039) · faseb042 1700 B `6DFBD4F6…28ED` · a1045 6359 B `010B3D77…692A` · prov051 30739 B `6C940696…86FF` · o3054 8277 B `1745D2C3…4324`.
- **Cirugía v2 del 039 reproducida BYTE-EXACTA**: inversa CP850 (3× «ÔÇö»→"—" · 2× «┬À»→"·" = −15 B) + 46 CRs a las líneas de cuerpo de los 2 hunks App.cpp → mbox **8889 B, sha256 completo `a8ebe2c911e65bec8b2bdc30424f67f47da6d7cc48e9df2ab8d2ab80504e1fb3`** (el relay solo tenía prefijo/sufijo — el full queda registrado aquí de ahora en adelante).
- **Cadena am --keep-cr 5/5 gates full-40 EXACTOS** sobre a711b58: 039 → `4e161f6881046b21801c8a00e87ca5c7f32cf6fe` · 042 → `dd985604cb6b6f43eea7303261217a70ad8e6ed9` · 045 → `a06215ccc05efd1bafb048d99cdbf42ed9db228b` · 051 → `f82d69fea30e8ef1fe15d61bc53d4530be9ef338` · 054 → `559cdbb35a20c0152b651718d390506c236e0c85`. **Determinismo ×2** en el 039 (re-am en worktree temporal → mismo árbol).
- **Numstat acumulado a711b58..559cdbb3 cuadra aritmética con 053 §0 + 055 §2**: App.cpp 227/18 (= 223+4 / 15+3) · IrtamState.cpp 49/0 (= 18+31) · IrtamState.h 18/0 (= 8+10) · test_irtam_state 95/0 (= 47+48) · test_provider_status 161/0 · PS 134/0 + 71/0 · bloom 21/10 · CMake 5/0 · LgdcTrace 1/1 · .gitignore 3/0 — total **785+/29−**, 11 ficheros.
- **5 tags recreados con procedencia** (reconstrucción #8, gates full-40 en el mensaje): `zone-folded`@4743a9c · `faseb042-folded`@8754ba1 · `a1045-folded`@5914049 · `provmatrix-folded`@a591714 · `o3-folded`@7c50372 (HEAD, tree 559cdbb3). **22 tags.**
- **ERRATA propia, corregida en sesión**: el primer pase del script de tags los creó TODOS apuntando al tip (559cdbb3) en vez de a su commit de fold respectivo — detectado en la verificación, tags borrados y recreados contra sus árboles (4e161f68/dd985604/a06215cc/f82d69fe/559cdbb3). Lección: **un tag de fold se verifica contra SU árbol, no contra HEAD.**
- Scripts persistidos: `scripts/recon065_cirugia.py` + `scripts/recon065_folds.sh`.

## 1. Objeto — UN cambio, tres constantes, átomo

**W: 96 h → 168 h.** La ventana de unión pasa a 168 h y la estructura resultante (herencia 017 §5 + TEC-ext 034/036):

- **solo-IRTAM [T−168, T−72]** = 96 h de banda = **4 ciclos diurnos** de movimiento IRTAM (antes 1).
- **solo-TEC [T−72, T]** — intacta (TEC-ext 72 h no se toca).
- El hueco estructural [T−72, T−24] MURIÓ con TEC-ext; no hay hueco que declarar — la nota de zonas del header de IrtamState.h ya lo dice y solo cambia la cota profunda.

**Atomicidad (017 §1)**: W 604800 + kSlots 384 + kCapBuckets 384 SON el mismo cambio — la banda alcanza edades [72,168] h, el plan llena 384 slots/param y el cache los conserva. Cualquier troceo produce estados incoherentes (W 168 con cap 96 = ventana hambrienta; cap 384 con W 96 = el 75 % inalcanzable, la incoherencia que el propio 017 flaggeó). **El drop de código es ÚNICO e indivisible** — el troceo posible (a juicio de David) es entre FASES, no dentro de FASE 2.

## 2. Scope taxativo — 7 ficheros (pines re-medidos en 559cdbb3)

| # | Superficie | Pin | Viejo → Nuevo |
|---|---|---|---|
| 1 | `kIrtamReplayWindowSec` | IrtamState.h **:39** | `345600.0` → `604800.0` |
| 2 | kSlots | IrtamCoeffAdapter.h **:43** | `96` → `384` (comentario de línea: «24 h a cadencia…» → «96 h a cadencia IRTAM 15 min») |
| 3 | kCapBuckets | IrtamCoeffCache.h **:26** (+comentario :12) | `96` → `384` por parametro |
| 4 | literales 345600 | IrtamState.cpp **:43** (zoneForAge) · **:60** (perLayerZoneName) · **:213** (layerDataTime) · **:271** (layerLoopRange) | → `604800.0` los cuatro |
| 5 | etiqueta de zona | IrtamState.cpp **:50** (zoneName) | `"solo-IRTAM [T-96,T-72]"` → `"solo-IRTAM [T-168,T-72]"` |
| 6 | App.cpp UI | **:4827** nacimiento del cursor (`nowUtc0 - 345600.0`, fallback sin TEC) · **:4859** checkbox `"Full 96 h window"` · **:4863** tooltip `"Union 96 h loop…"` · **:4880** modeLabel `"Window: union 96 h"` | → 604800.0 · `"Full 168 h window"` · `"Union 168 h loop…"` · `"Window: union 168 h"` |
| 7 | tests | §3 | flips declarados + nuevos |

- **Comentarios**: bloque :36-45 de IrtamState.h (constante + zonas + «,96h] IrtamOnly») y los comentarios de App.cpp que nombran la ventana **como estado vigente** (censo medido: :265 · :269 · :1895 · :1937 · :2033 · :2089 · :4856) se actualizan coherentemente; las atribuciones históricas de ruling quedan. Censo por lado en la nota, medido-manda.
- **Censo 345600 en src/ CERRADO**: 5 sitios (los 4 de IrtamState.cpp + App.cpp:4827) — tras el drop, 5→0; `604800` 0→5. No hay más.

**INTOCABLE — sin ediciones** (llamadas read-only sí): `IrtamCoeffAdapter.cpp` (planMissing itera `kSlots−1..0` :59 — el flip vive en el .h; **por blob**) · `IrtamCoeffCache.cpp` (prune de restore :218 cambia de umbral vía el .h; **por blob**) · `IrtamCoeffParse.*` · `IrtamGridEval.*` (oráculos hour=12 INTOCABLES, 017 §7) · `LgdcPacing.*`/`LgdcTrace.*` · `ProviderStatus.*` por blob · CMakeLists por blob (57 TUs +0, sin TU nueva) · shaders. **Constantes intactas**: `kGambitLagSec` 259200 :29 (borde lag — dominio cerrado 050/052) · los 4 literales 259200 de IrtamState.cpp (:43/:61/:213/:272) · `kSlotSec` 900 :44 · `kReplayWindowSec` 86400 :28 (TEC) · `kParams[4]` :46-47 (formas byte-exactas — 061) · etiqueta `"solo-TEC [T-72,T]"` :52 · bloque publish F/H + par B0×B1 de App.cpp (017 §8 heredado). Línea de parada: tocar fuera de la lista = parar y preguntar.

## 3. Tests — los flips SON el objeto del drop (diferencia deliberada del «CERO FLIPS» de O3)

- **test_irtam_state.cpp** (76 checks, pins 055 §5): **FLIP** los pins 345600 → **604800** — :81 `zoneForAge(345600.0)==IrtamOnly` → `604800.0` · :308-309 «IRTAM estructural exacto [now-345600,now-259200]» → `[now-604800,now-259200]` (pin de `oldest` flip; `newest` −259200 intacto). **INTACTOS** los pins 259200 (:77, :310). **NUEVOS ≥2**: el par de borde en la cota profunda — `zoneForAge(604800.0)==IrtamOnly` y `zoneForAge(604800.0+1)==TecOnly` (el mismo patrón de par exacto que 053 §3 prescribió para 3599/3600).
- **test_irtam_adapter.cpp** (21): **FLIP** :55-56 — `p.size() == 384` → `== 1536` (384×4), etiqueta «cache vacio: 384 targets (96 x 4, F2-B0B1-R1)» → «1536 targets (384 x 4, …)».
- **test_irtamc_cache.cpp** (32): **SIN flips esperados** — el pin :137 «96+3 kept == 99» no depende del umbral de restore (leer y DECLARAR la verificación; si algún pin resultara depender de kCapBuckets, flip declarado con razón).
- **Sin flips**: irtam_cache 37 · gate 19 · coeff_parse 43 · grid_eval 37 (oráculos) · los 19 logs restantes **byte-idénticos A==B**.
- Todo flip se declara viejo→nuevo con razón; censo «96»/«345600»/«384» por fichero en la nota (grep -oF, salida literal de herramienta — lección 063 §9.1).

## 4. Barrera A==B (offline) + empaquetado

- **A = 559cdbb3 (o3-folded) · B = árbol nuevo. 57 TUs +0 + LINK ambos · warnings 12 +0/−0 · 21/21.** state 76 → 76−f+k (f flips, k nuevos, declarado) · adapter 21 (cuenta igual, contenido flip) · resto de pins de 055 §5 byte-idénticos.
- **G6: 0 URLs/curl en los adds** (constantes y literales — cero red) · **G8: 0 primitivas de espera**.
- **EOL**: IrtamState.h/.cpp, IrtamCoeffAdapter.h, IrtamCoeffCache.h y tests = zona **LF** (líneas nuevas LF) · App.cpp = zona **CRLF** (hunks :4827 y :4856-4880) → **CR del delta declarado con desglose + am --keep-cr de prueba + write-tree == commit ANTES del push** (lección 039 completa) · censos App 5117/1874 → aritmética declarada.
- **Custodia estándar**: delta mbox · sha256 + tamaño · From full-40 sin BOM · numstat por fichero de herramienta (shortstat, jamás conteo manual — lección 010) · árbol anunciado full-40.
- **Poblaciones** (grep -oF, medido-manda): `345600` src 5→0 · `604800` src 0→5 · `Full 96 h window` 1→0 · `union 96 h`/`Union 96 h` 2→0 · `solo-IRTAM [T-96,T-72]` 1→0 · `kSlots = 96` 1→0 · `kCapBuckets = 96` 1→0 · comentarios «96 h» censo por lado.
- **Tamaño esperado: orden 50-90 líneas cambiadas** (2 constantes + ~10 comentarios + 5 literales + 4 UI + ~8 de tests). Si supera ~120, revisar scope.

## 5. Frontera FASE 2 / FASE 3 — el TRÁFICO es la frontera

- **FASE 2 = offline TOTAL**: build + ctest con fixtures. **El binario nuevo NO se lanza en vivo** — cualquier lanzamiento dispara el backfill de 384 slots/param = **1.152 req** desde el cache actual / **1.536** desde cero (≈ 4,8-6,4 h) = exactamente el tráfico gated. Ni capturas ni mini-evidencia en FASE 2: la verificación del ciclo ES la barrera offline.
- **FASE 3 = ciclo propio con aprobación EXPLÍCITA de tráfico de David** (estilo Q5-B0B1): backfill monitoreado resumible (cache irtamc_ persiste), pacing intacto, param-major B0→B1 heredado, premiere + evidencia viva (patrones 011/014/015; LastWriteTime del exe bajo ruling 033). Disco ~27,8 MB y RAM parseada ~13,1 MB (017 §1) son consecuencias de FASE 3, no de FASE 2.
- **Presupuesto de consultas vivas FASE 2: CERO** — ni sondeo (017 §2 consumido 12/12, reserva liberada, 063 §6) ni probes A/B de GLM (no hay nada vivo que verificar en un ciclo offline).

## 6. Secuencia + ledger

- **066 MUSE**: código FASE 2 (delta único atómico, 7 ficheros, §2-§4) → **067 GLM**: veredicto + fold sobre 559cdbb3 + tag **`opcionb-folded`** (propuesta de nombre) → **FASE 2 CERRADA**.
- **FASE 3**: a señal de David + aprobación de tráfico — ciclo propio.
- **LEDGER post-065**: Q2 CERRADA (058-063) · Opción B FASE 1 CERRADA · **FASE 2 ABIERTA (esta partición; espejo listo)** · FASE 3 a aprobación de tráfico · O3 CERRADO (057) · techo duro CERRADO (053) · kStaleSec CERRADO (050/052) · O-030a aparcado · erratum 059 + errata 062 registrados · **espejo #14 RESUELTO** (reconstrucción #8, §0).

— GLM. Octava reconstrucción y el mismo árbol de siempre: la precondición se paga antes de abrir la boca. La ventana ya no es una pregunta de retención — es una constante que espera su delta.
