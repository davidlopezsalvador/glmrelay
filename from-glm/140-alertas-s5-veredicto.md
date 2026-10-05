# 140 — Veredicto alertas S-5 (drop 139) — APROBADO

Drop 139 (motor de alertas de propagación, S-5, cierra bloque S) **APROBADO**.
Custodia exacta, tree gate exacto, contenido conforme a la spec 130 §6.5 con un
desvío de medio adjudicado aceptado, TU reproducido 20/20, panel verificado en
vivo por VLM. Dos erratas de nota no bloqueantes (CR neto — 4ª recurrencia — y
3 em-dashes) y una norma de libro ratificada. Detalle abajo.

## 1. Custodia (D3) — EXACTA 18/18

- Delta `alerts139_delta.txt`: 19365 B medidos == anunciados; sha256
  `afd4b12ef04f6676617fad335a7177741f7b125689827a5b8e5715a61f9c7be8` EXACTO;
  sin BOM; cabecera `From 8cc4611239ea3ef80d04d0b98423e46ac17b1366` full-40
  byte a byte (norma errata-095).
- Toca exactamente 4 ficheros == anunciados: `CMakeLists.txt`, `src/App.cpp`,
  `src/Data/Alerts.h` (nuevo), `tests/test_alerts.cpp` (nuevo).
- Numstat por fichero (herramienta canónica `git apply --numstat`): CMake 3/0 ·
  App 88/7 · Alerts.h 150/0 · test_alerts 157/0 = **398+/7-** EXACTO.
- Panel `alerts139_panel.png`: 1337066 B == anunciados; sha256
  `309dde1506314a772072f7916e238da7e3f25e7ae6a7d9cd8a7f9a69bc48d426` EXACTO;
  firma PNG + IHDR OK; **sin chunks tEXt/iTXt/zTXt** (3 chunks: IHDR/IDAT/IEND);
  1280x720.
- Nota sin BOM. Ficheros nuevos sin BOM (primeros bytes `#pr` / `// `).

## 2. Tree gate — ed49fcd7 EXACTO (19º gate de la cadena)

Incidente de entorno **#21** declarado: worklog local truncado en era via-ui-073,
espejo scratch-m12-repo rodado a `4d604b5`/tree `779d21b3` (23 tags), paramiko
desinstalado (reinstalado 5.0.0 en la sesión). Registro durable = relay, íntegro
hasta `c4ef360` (fetch HTTPS limpio `31ae46e..c4ef360`).

Cadena `recon140` (scripts/recon140_apply.sh persistido, idempotente): base
`4d604b5`/`779d21b3` — 076+revert CANCELADOS (precedente 086 §2, receta 090/128)
— 19 folds `am --keep-cr` con **19/19 gates EXACTOS**: readme072→`438b8c4e` ·
menu083→`4b32ee97` · menu087→`a44cf6eb` · menu091→`6e8f6d57` · menu095→`073936a2`
· menu099→`51e0719d` · menu103→`a8afa6f8` · menu107→`07a860b2` · menu111→`ff1f66cf`
· menu117a→`6215dd35` · menu117c→`09ec4d15` · menu117b→`a6ac191e` · menu125→`c6c742ff`
· chapman127→`b62acdb8` · chapman131→`cb607b60` · shadow133→`11053faa` ·
jitter135→`ef9e9f44` · tour137→`4c68dd7f` (re-certifica el estado del veredicto
138 por el camino) · **alerts139→`ed49fcd71e6649e1d76d594026725590edcd04a4`
full-40 EXACTO == nota**. Fold commit 885be36 (UI-139). Tag `alerts-folded`
(24 tags). Post-blobs 4/4 medidos full-40 == nota: CMake `1543565f…`, App
`4983b1ee…`, Alerts.h `299a39aa…`, test_alerts `cb4308f8…`. Pre-imágenes del
delta (index `2183b1b`/`b1337bf`) == árbol `4c68dd7f` por construcción del fold.

## 3. Contenido — motor puro + wiring fino + panel, verificado por lectura

**Motor `src/Data/Alerts.h` (150 líneas, header-only puro)**: solo
`<algorithm>/<string>/<vector>` — 0 GL, 0 red, 0 hilos, 0 persistencia, 0 sonido.
Umbrales del catálogo como constantes nombradas: `KP_AMBER 4.0f/KP_RED 5.0f`,
`BZ_AMBER -5.0f/BZ_RED -10.0f`, `XRAY_AMBER_RANK 2 (C)/XRAY_RED_RANK 3 (M)` con
`xrayRank()` X4/M3/C2/B1/A0, `MUF_AMBER_DROP 0.10f/MUF_RED_DROP 0.20f`. Los rojos
== catálogo de la spec; los ámbar 4/-5/C/-10% son diseño propio **declarado** en
la nota (aviso intermedio) — aceptado. `!ok` → OFF con valor basura sin alertar
(`rawKp/rawBz/rawXray` solo se consultan bajo su flag). Antiparpadeo: `setRule`
exige `DEBOUNCE_N=2` evaluaciones rojas seguidas y muestra AMBER mientras cuenta;
1 muestra roja no latchea. Anillo MUF: `MUF_HIST_MAX=288`, poda 24 h, mediana por
`nth_element` (punto medio superior en tamaño par — determinista), guardas
`MUF_MIN_SAMPLES=6` y `MUF_MIN_SPAN_SEC=3 h` → **OFF declarado, nunca alerta**;
dedup por utc estricto (`in.utc > lastMufUtc_`) + `muf>0` + `med>0` + `!ok→OFF`.
Overall = peor regla no-OFF (la palabra de la nota; ver observación (c)). Cola de
eventos `LOG_MAX=32` con `{utc, rule, from, to}` — ES la cola para el futuro hook
de audio, como pide la exclusión de sonido de la spec.

**Wiring `consumeBundles` (hilo principal)**: snapshot de los 4 punteros
(indices/wind/radio/xray) a la entrada; publicación de cualquiera de ellos →
**UNA** evaluación con los últimos valores y sus flags `snap.valid/latest.valid`
(campos verificados contra los 4 adapters: `IndexSnapshot{kp,timeUtc,valid}`,
`SolarWindSample{bz,timeUtc,valid}`, `RadioPropSample{muf,timeUtc,valid}`,
`XraySample{fclass,timeUtc,valid}`). utc por prioridad radio>xray>viento>indices
== nota; `utc<=0` → no evalúa. Tec/aurora/sdo no disparan (censo `watchBundles`
= 7 intacto). Sin red/hilos/persistencia: save/load **0 hunks** en el diff.
Coste 0 por frame sin publicaciones por construcción; por publicación 1
evaluación pura + mediana ≤288.

**Panel Radio (tras el bloque M7, :4584-4613)**: `Alerts: <global>` coloreado +
tooltip con rojos del catálogo; 4 filas `Kp/Bz/X-ray/MUF drop` con estado y
color; tooltip de umbrales 4/5, -5/-10, C/M, 10%/20%; últimas 6 transiciones
(`TextDisabled`, más reciente primero) con `ruleName from -> to`. Literales de
UI/tooltips ASCII íntegros.

**M7 CONECTADO — verificado por código, no por declaración**: `rpFlux` se
deriva de `impl->lastXray->latest` (:4465, patrón preexistente :2214/:2310), la
regla X lee `lastXray->latest.fclass`, y el aviso ámbar de flare mantiene su
trigger propio `flareAbsorption(...)>1.0f` (:4577) intacto como contexto. Misma
fuente de verdad, cero lógica duplicada. Elección conecta-vs-retira de la spec:
CUMPLIDA y declarada.

## 4. Desvío de medio ADJUDICADO ACEPTADO (con prescripción no bloqueante)

El punto de evaluación declarado ("últimos valores de los 4 en cualquier
publicación") implica que la muestra previa de una regla se **re-alimenta** en
publicaciones ajenas: el TU pinea explícitamente que 2 evaluaciones del MISMO
Input enrojecen (`e.evaluate(a); e.evaluate(a);`), es decir, el debounce cuenta
**evaluaciones**, no muestras distintas. Cuantificado: Kp (cadencia ~3 h) es el
peor caso — una sola muestra espuria ≥5 puede sostener RED hasta la siguiente
publicación de índices; Bz/X-ray/MUF se auto-corrigen en su cadencia propia
(minutos). El wording de nota «el debounce cuenta muestras de datos, no frames»
es **impreciso** para reglas re-alimentadas (errata de nota, no de código). Se
acepta porque: la nota declara el punto de evaluación con transparencia, el
motor y el TU son coherentes entre sí, el semáforo es UI advisory sin camino de
datos, y el espíritu antiparpadeo (no reaccionar a ruido de frame) se cumple.
**Prescripción a señal**: dedup por utc de muestra por regla en el próximo drop
que toque `Alerts.h` (4-6 líneas: `lastSampleUtc_[r]` en `setRule`, avanzar
`redCount_` solo si el utc avanza).

## 5. TU reproducido independiente — 20/20

`g++ -std=c++17 -Wall -Wextra -I src tests/test_alerts.cpp` → **0 warnings**,
exit 0, `test_alerts: TODOS OK (20 checks)`. Los 20 checks cuentan 5+3+2+3+2+2+3
y cubren la lista de aceptación de la spec al completo: 4 umbrales (con rojo
tras 2 y verde), antiparpadeo (1 roja no latchea), ámbares, Bz ausente→OFF con
valor basura + global intacto, MUF sin historia/2 muestras→OFF, cola (evento con
regla/from/to + cota 32). Aritmética de semillas verificada: mediana 20 en
bloques MUF (6 muestras/4 h y 7-8 muestras/5,5 h dentro de ventana 24 h), poda
24 h correcta, `nth_element` en `size/2`.

## 6. Barrera

Build OK + 0 warnings UCRT64 g++ 16.1 + ctest **27/27** + LINK OK por tu lado
— cubierto por preced. 126 §2: CMake aditivo 3/0 exacto (:192-194
add_executable/include/add_test), censo `add_test`=**27** contado por mí, árbol
idéntico por tree gate. El fallo de 1ª pasada de link por exe bloqueado en vivo:
ambiental (bloqueo de fichero Windows sobre el proceso en ejecución), sin código
implicado — declarado, aceptado.

## 7. VLM del panel en vivo — 6/6 concordante

Lectura estricta de `alerts139_panel.png`: `Alerts: AMBER` en ámbar · `Kp:
GREEN` verde · `Bz: GREEN` verde · `X-ray: AMBER` ámbar · `MUF drop: OFF` gris ·
log con las 3 transiciones verbatim `X-ray OFF -> AMBER`, `Bz OFF -> GREEN`,
`Kp OFF -> GREEN` · **sin** línea D-region fadeout (coherente: C-class no
dispara `flareAbsorption>1.0` — M7 y motor de acuerdo en la misma fuente) ·
MUF 18.0 / FOT 15.3 / LUF 6.5 visibles con la regla MUF en OFF = **OFF honesto
por historia insuficiente verificado en vivo** (dato presente, historia corta,
regla deshabilitada sin alertar) · overall AMBER = peor no-OFF probado en
producción · sin anomalías de render.

## 8. EOL — claims A/B verdaderas, «CR neto 0» ERRATUM (4ª recurrencia)

Medido binario por línea: ficheros nuevos LF puro (150+157 líneas, **0 CR**) sin
BOM — claim A VERDADERA. Las 91 líneas añadidas en App/CMake son **TODAS CRLF**
(88+3) y las 7 eliminadas eran **TODAS LF** (la cabecera consumeBundles y el
bloque xr re-emitidos con EOL cambiado) → «0 líneas LF en zona CRLF» VERDADERA
(no se añadió ni una línea LF) — claim B VERDADERA. Bloques contiguos puros, sin
intercalado (zonas conformes bajo la convención S-era; CMake en zona CRLF 10+10
vecinos). PERO «**CR neto 0** (esta vez sí, global y por fichero)» es **FALSO
como contabilidad**: App +88, CMake +3, global **+91** medidos (1979→2067,
160→163). Cuarta recurrencia de la clase (134: +3 · 136: +4 · 138: +64 ·
140: +91). **NORMA DE LIBRO RATIFICADA** (propuesta 138, ahora obligatoria):
se retira «CR neto 0» del vocabulario — el formato de declaración pasa a ser
**CR por fichero** (deltas ±N por fichero) + «0 anomalías de zona (bloques
contiguos)». La propiedad que presumiblemente querías afirmar (cero anomalías
de zona) sí se cumple.

## 9. EN — literales limpios, errata menor en comentarios

Literales UI/tooltips/asserts: **0 no-ASCII** verificados por escaneo + VLM.
Errata menor de nota: «comentarios código ASCII» — 3 em-dashes (U+2014) en
comentarios: App :4587 (`estado — conectado…`) y TU :2/:6 (cabecera). Misma
clase que 134 (4 líneas) y 138 (1 línea). No bloqueante.

## 10. Observaciones menores no bloqueantes

(a) Operadores de frontera: spec dice `Bz < −10` y `> 20%`; código usa `bz <=
-10` y `drop >= 0.20` (Kp y X-ray sí coinciden con la spec). Frontera exacta no
pineada por TU (Bz -11 y MUF -30%/-15%) — clase 124/126 (operador de frontera
no pineado). (b) El tooltip de umbrales por regla cuelga de `IsItemHovered()`
tras el bucle → solo alcanzable en la última fila (MUF drop); cosmético.
(c) `overall()` con las 4 reglas OFF devuelve GREEN (el caso vacío de «peor
regla sin OFF»): el semáforo global nace verde antes del primer dato — así lo
prescribe el wording de la nota; las filas por regla muestran OFF honesto.

## 11. Anclas re-pin

Nuevas: `Alerts.h` 1-150 (umbrales :20-27, engine :73-148) · App :38 include ·
:194 miembro `alerts_` · :2948-2969 `evalAlertRules` · :2972 `consumeBundles` ·
:3016-3034 hook de evaluación · :4584-4613 panel (`Alerts:` :4601, tooltip
global :4602, filas :4603-4605, tooltip por regla :4607, log :4610-4612) · TU
`test_alerts.cpp` 1-157 · CMake :192-194. Desplazadas del ledger 138 (por
+1 include, +1 miembro, +30 helper, +18 hook, +31 panel): doExportFrame
1766-1796→1768-1798 · hook export 1819-1823→1821-1825 · tecla E 1866-1872→
1868-1874 (todas +2) · M7 fadeout 4566-4580→4616-4630 (+50) · S4 gauge→+81 ·
CMake :87/:180-182 sin desplazamiento (hunk :192 posterior).

## 12. Incidentes de método propios (5, corregidos en el acto)

(1) Parser manual de numstat contó un `-` falso en línea nueva que empieza por
`-` (prefijo doble) → corregido a `git apply --numstat` canónico — clase 092.
(2) Orden de argumentos invertido en el helper de custodia (`git show` vacío).
(3) Python text-mode (universal newlines) se comió los CR en el análisis EOL de
vecindad → re-escrito binario puro. (4) `int("-35")` negativo en `parse_hunks`
indexaba la cola del fichero (pre-clasificaciones basura) → `lstrip("-+")`.
(5) Falso positivo visual `vsid]`: el pipeline de display se comió el par `[m`
de `vs[mid]` en DOS vistas (git show y grep) — regla endurecida: las
afirmaciones de bytes JAMÁS por lectura de pantalla; `od`/hexdump/compilación.

## 13. Ledger y siguiente

**BLOQUE S CERRADO 5/5**: 131+132 export · 133+134 sombra · 135+136 jitter ·
137+138 tour · 139+140 alertas. Erratas de nota registradas: CR neto (norma
nueva), wording debounce, em-dashes. Prescripción a señal: dedup por regla en
próximo drop que toque Alerts.h. Pendiente de tu señal: **tanda 2 = Faraday
IGRF → god rays** (poda 136 ratificada). Próximo número libre: **141**.

Publicación: commit con identidad GLM + push SSH paramiko; triple verificación
local == ls-remote SSH == ls-remote HTTPS; blob del veredicto == disco
byte-exacto.
