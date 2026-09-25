# 048 — PARTICIÓN prov-matrix: matriz de estado por proveedor — CICLO ABIERTO, alcance SOLO-LECTURA, 0 ficheros de adapter tocados

Emisor: GLM (árbitro) · Contraparte: MUSE · Decisor final: David
Petición: to-glm/048-propuesta-matriz-proveedores.md (relay 5881ba9, cero
código), origen David literal («una matriz donde se vea qué datos hay
descargados por proveedor, qué falta, errores / retry / rate-limit»).
Grounding: espejo scratch-m12-repo @ tree a06215cc.

## 0. Entorno e incidente #12 (registro)

Sandbox rodado de nuevo (sexto rollback de la serie): espejo en a711b58,
folds 039/042/045 y tags perdidos, paramiko reinstalado 5.0.0 en el venv
(python3 → /home/z/.venv, 3.12 — pip del sistema apunta al 3.13, lección
#8 aplicada). Restauración certificada ANTES de leer código (receta 046 §2):
cirugía v2 del 039 reproducida BYTE-EXACTA (mbox 8889 B, sha256
a8ebe2c9…e1fb3 == veredicto 039) + 3 folds `am --keep-cr` con tree gates
EXACTOS 4e161f68 → dd985604 → a06215cc + determinismo ×2 (039) + 3 tags
recreados con procedencia (zone-folded, faseb042-folded, a1045-folded; 20
tags; sellos S2 intactos). Fetch limpio 17f10bd..5881ba9 (24 commits,
drops 039-046 ya adjudicados por sus veredictos en relay). Barrera
diferida por identidad de árbol (precedente #10/#11).

## 1. Respuesta a las preguntas (1) y (2) de la nota

1. **SE ABRE CICLO: `prov-matrix`** (tag de cierre: `provmatrix-folded`).
   Partición = esta nota. Drop 049 = código (matriz + línea 047 como hunk
   independiente). Drop 050 = veredicto del fold. Evidencia viva: OPCIONAL,
   a juicio de David (una captura del panel con 2-3 filas en estados
   distintos; sin relanzamiento forzado — el panel es visible en cualquier
   sesión natural, la clase de deuda 040-3c no se repite).
2. **Panel: sección NUEVA dentro del header existente `Data sources &
   attribution`** (App.cpp:3475-3479), NO ventana nueva: mismo tema
   (proveedores), cero chrome nuevo, cero persistencia nueva (las ventanas
   nuevas arrastran win* settings — SunPanel), y el header es la última
   sección de su ventana (crece hacia abajo sin tocar layout). Forma:
   `CollapsingHeader("Provider status (live)")` colapsado por defecto
   (la cita estática queda como está; el estado vivo es opt-in).
   **Columnas exactas (4): `Provider | State | Data | Reason`** — Estado es
   UNA celda por fila (no una columna por estado): 14 filas × 7 columnas de
   marcas sería ruido; David pregunta «qué falta / errores / retry /
   rate-limit» y eso es un atributo por fila, no una dimensión aparte.

## 2. Inventario verificado (14 adapters → 14 filas; qué señales existen HOY)

| Fila | Instancia (hilo) | Señal disponible hoy |
|:--|:--|:--|
| GIRO (LGDC getbest) | `impl->giro` (main) | `GiroNetStatus` completo (polled/withData/degraded/retryInMin/histHours/roundAttempts/roundOk) + `ionSourceMode` |
| kc2g failover | `impl->kc2g` (main) | `Kc2gStatus` completo (rows/gridUsable/panelUsable/stale/freshestAgeMin/lastFetchUtc/lastOkUtc) + `isFetching` |
| IRTAM gambit | thread-local `irt` App:1399 | `freshestTov()` + `getErrorMessage()` + `IrtamBundle{dataEpoch,valid}` |
| GloTEC TEC | worker-local `glo` | `TecBundle{grid,simulated,fromCache}` + cache TEC (badge frames/edad) + `getErrorMessage()` |
| SWPC índices | worker-local `sidx` | `IndexSnapshot{valid,simulated,error,timeUtc}` (error = campos mock) |
| Viento solar | worker-local `sw` | `WindBundle{latest,error}` |
| Aurora OVATION | worker-local `au` | `AuroraBundle{grid,error}` |
| Kp SWPC (panel HF) | worker-local `rp` | `RadioBundle{latest,error,usedGiroReal}` |
| GOES X-ray | worker-local `xr` | `XrayBundle{latest}` + `getErrorMessage()` |
| SDO imágenes | worker-local `sdo` | `SdoBundle` + `sunImgTime/sunUpTime` + `getErrorMessage()` |
| DIAS | `impl->dias` (main) | `isFetching` + `getErrorMessage()` + muestras |
| Ebro FTP | `impl->ebro` (main) | `isFetching` + `getErrorMessage()` + muestras |
| ESA TEC | worker-local `esa` | `EsaTECData{valid,timestamp}` — mock offline POR DISEÑO |
| NOAA (stub) | — | `NoaaAdapter::fetch` = false literal — OFF permanente |

Hechos estructurales que fijan el diseño: (a) solo GIRO/kc2g tienen estado
estructurado; (b) **8 adapters viven DENTRO del hilo worker y 1 dentro del
hilo irtam** — sus `error_`/flags NO se pueden leer cross-thread (los
`std::string` serían data race); el patrón de publicación existente es
`bundleMutex` + `shared_ptr<const Bundle>` (getters App:112-121); (c) el
gate LGDC vive en `error_` como prefijo `"gate:"` (IrtamCoeffAdapter.cpp:139)
— es pacing PROPIO, no un 429 del servidor.

## 3. Diseño adjudicado (alcance Muse RATIFICADO con 4 precisiones)

Alcance de la nota ratificado: solo lectura, sin tocar fetch ni reintentos.
**Precisión 1 — MÁS estricto que la propuesta: CERO ficheros de adapter se
tocan.** No hacen falta accessors nuevos: todo lo que la matriz necesita ya
es público (§2). Los 14 ficheros `src/Data/*Adapter.*` quedan INTACTOS por
blob — la matriz es consumidor puro. La publicación worker→UI no se hace con
accessors cross-thread sino con el patrón ya establecido (§3b).

- **(a) Módulo puro NUEVO `src/Data/ProviderStatus.h/.cpp`** (`namespace
  provstatus`), patrón P5 `irtamstate::badgeLine`: 0 includes de curl/GL/
  ImGui/App; solo std. Contiene: `enum class State {Off, Failed,
  RateLimited, Degraded, Stale, Ok}` · `struct Snapshot {ProviderId id;
  bool hasData; double dataEpoch; bool fetching; bool rateLimited; double
  retryInMin; std::string data; std::string error;}` · `enum ProviderId
  {PROV_GIRO…PROV_NOAA_STUB, PROV_COUNT=14}` con tabla estática de labels ·
  tabla estática `kStaleSec[PROV_COUNT]` (ver §3e) · `State classify(const
  Snapshot&, double nowUtc)` · `std::string stateText(State, const
  Snapshot&)` · `std::vector<Row> buildRows(const Snapshot*, size_t n,
  double nowUtc)`. Puro y determinista → TODO testeable.
- **(b) Board de snapshots en `Impl` bajo `bundleMutex`** (precedente
  bundles): `provstatus::Snapshot provBoard[PROV_COUNT]`. Escritores:
  worker, 8 filas, una escritura por proveedor por pase (junto a las
  publicaciones de bundle existentes — SOLO lectura de estado interno ya
  computado: `getErrorMessage()`, `isFetching()`, validez del bundle; jamás
  dentro de las decisiones de fetch); hilo irtam, 1 fila (ídem, junto a la
  publicación :1505); hilo main, 4 filas (GIRO/kc2g/DIAS/Ebro leídos directos
  en el gather del render — accessors ya thread-safe de estos adapters).
  Lectura: gather del render bajo el mismo mutex, copia local, fuera del
  lock construye las filas con el módulo puro.
- **(c) Render — thin glue** (patrón badge P5): gate 1 s con `static double`
  para el SNAPSHOT (precedente HF `lastHfGrid` App:2159), edades ANDANTES
  calculadas al pintar (`nowUtc - dataEpoch`, patrón E10 del badge — la edad
  camina aunque el board tenga un pase de retraso); tabla ImGui de 4
  columnas que imprime `Row` sin lógica. Colapsado por defecto.
- **(d) Semántica de Estado — honestidad primero** (esto es lo que David
  leerá; cada mapeo debe ser defendible con una señal EXISTENTE):
  - `off`: stub/no-red por diseño (NOAA stub; ESA mock si no hay cache).
  - `failed`: sin datos Y error de fetch/parse reciente (`hasData==false &&
    !error.empty()`).
  - `rate-limited`: SOLO donde la app ya lo DECLARA: fila GIRO con
    `ionSourceMode == SRC_KC2G_FALLBACK` (el badge dice «GIRO is
    rate-limited» — la matriz repite la declaración, no inventa). El
    «429 duro» (`roundAttempts>=3 && roundOk==0`, el detector de failover
    App:1843-1866) también es rate-limited. **El gate LGDC NO es
    rate-limit**: es cortesía propia → `degraded (retry)`.
  - `degraded (retry Xm)`: GIRO `degraded>0` (backoff por estación), IRTAM
    en gate-wait (`error` prefijo `gate:`), kc2g 6-24 h banda.
  - `stale`: datos presentes y `edad > kStaleSec[prov]`.
  - `ok`: datos presentes y frescos.
  - Sufijo `"(fetching)"` en stateText cuando `fetching` — ortogonal a la
    precedencia. **Precedencia: off > failed > rate-limited > degraded >
    stale > ok**.
- **(e) `kStaleSec` por proveedor (tabla FIJA en el módulo, testeada)**:
  umbrales = 2× cadencia nominal de cada fuente: GIRO 900 · kc2g 21600 (el
  propio `gridUsable` 6 h) · IRTAM `kGambitLagSec + 2*kSlotSec` (lag 72 h
  ESTRUCTURAL por diseño: 75 h+ es stale real, no el lag — el test lo pina) ·
  TEC 1200 (cadencia 10 min) · índices 7200 · viento 1800 · aurora 7200 ·
  Kp-HF 1800 · X-ray 1800 · SDO 1800 (15 min) · DIAS 7200 · Ebro 7200 ·
  ESA/NOAA-stub 0 (n/a). La tabla ES el contrato de stale de la matriz.
- **(f) Columnas Data/Reason**: `Data` = qué hay en mano + edad compacta
  (GIRO «12/15 st · hist 61 h»; kc2g «3/7 rows · fresco 4 min»; IRTAM «TOV
  01:15 UTC»; TEC «432 frames»; índices «mock: Kp, Dst»/«5/5 real»; …).
  `Reason` = error corto o contexto (retry en min, «gate 15 s (courtesy)»,
  «round 0/5 (429)», «mock by design»). Los strings EXACTOS de estas dos
  columnas son libertad de implementación DENTRO del módulo puro (los tests
  pinan los que deciden estado, no la prosa).

## 4. SCOPE TAXATIVO — 5 ficheros (nada más toca)

1. `src/Data/ProviderStatus.h` (NUEVO): declaración del módulo puro (§3a).
   LF 100%. G6: 0 URLs/hosts. Comentario de cabecera con el contrato
   (estados + precedencia + por qué rate-limited solo-declarado).
2. `src/Data/ProviderStatus.cpp` (NUEVO): labels, kStaleSec, classify,
   stateText, buildRows. LF 100%. 0 primitivas de pacing (G8), 0 I/O.
3. `src/App.cpp`: (a) include + `provBoard[PROV_COUNT]` en Impl junto a los
   bundles; (b) 8 publicaciones worker (una línea de estado por proveedor
   junto a cada publicación de bundle — después del fetch, sin tocar
   decisiones); (c) 1 publicación en el hilo irtam (junto a :1505); (d)
   gather de render: 4 filas main-thread + copia del board bajo mutex +
   `buildRows` + tabla ImGui 4 columnas + CollapsingHeader «Provider status
   (live)» tras las 4 TextWrapped de cita (:3476-3479) dentro del header
   «Data sources & attribution»; (e) **hunk independiente de la 047**
   (tooltip per-layer :4775-486 — texto exacto en nota 047 §3).
4. `CMakeLists.txt`: `ProviderStatus.cpp` en SOURCES del app + target
   `test_provider_status` (2 menciones del fichero, patrón LgdcTrace 010).
5. `tests/test_provider_status.cpp` (NUEVO): ≥12 checks — §6.

## 5. Poblaciones y pines (forma prescrita; medido-manda en la nota de MUSE)

- 0→N: `ProviderSnapshot`/`Snapshot` ≥1 por fichero nuevo + ≥8 en App
  (escrituras worker) · `buildRows` 0→≥4 (decl/def/App/test) · `classify`
  0→≥3 · `kStaleSec` 0→≥2 · «Provider status (live)» 0→1 · literales de
  estado en stateText 0→≥6 («ok»/«stale»/«degraded»/«rate-limited»/
  «failed»/«off») · «(fetching)» 0→≥2 · `provstatus::` 0→≥5 ·
  `PROV_COUNT` 0→≥2.
- 047 (mismo delta, h aparte): `interpolated usability` 0→1 ·
  `median floor` 0→1 · `edges may not match` 0→1.
- INTACTOS (guardas por blob, cero cambio): los 14 `src/Data/*Adapter.*` ·
  `LgdcPacing.*` · `LgdcTrace.*` (buf[64] intacto) · `IrtamState.*`
  (badgeLine/perLayerZoneName/zoneForAge/zoneName intactos — la matriz no
  toca el badge) · `IrtamGridEval.*` · shaders y Render · las 4 TextWrapped
  de cita :3476-3479 byte-idénticas · badge GIRO-live :4815-4838 intacto ·
  gate HF 1 s :2153-2160 intacto (la matriz NO comparte su static) ·
  failover :1843-1866 intacto (la matriz SOLO lee ionSourceMode) · anclas
  mergeKc2g sin desplazamiento · E9 intacto.
- Poblaciones 039/042/045 intactas: perLayerZoneName 12 · zoneForAge 11 ·
  zoneName( 5 · buf[64] LgdcTrace 1 · Switching/re-clamps/never-jumps 1+1+1.

## 6. Barrera y tests

- Build: 56→**57 TUs** app (+ProviderStatus.cpp) + LINK; **warnings 12
  +0/-0** (ficheros nuevos limpios bajo los flags EXACTOS de barrera, GCC
  14.2.0 sandbox; -Wformat-truncation clase 010 no aplicable: snprintf solo
  si se usa, y con buf suficiente).
- Tests: 20→**21/21** (test_provider_status nuevo); **CERO FLIPS** — los 20
  logs previos byte-idénticos A==B. Checks NUEVOS ≥12: (1) off stub NOAA;
  (2) failed sin-datos+error; (3) rate-limited GIRO fallback; (4) 429-duro
  round 0/N; (5) degraded con retry Xm; (6) IRTAM gate-wait = degraded NO
  rate-limited; (7) stale por kStaleSec; (8) IRTAM lag 72 h NO stale (edad
  73 h dentro del margen), 76 h SÍ; (9) ok con edad andante; (10) sufijo
  (fetching); (11) precedencia off>failed>rate-limited>degraded>stale>ok
  (≥2 combinaciones); (12) determinismo ×2; (13) board vacío → 14 filas
  off; (14) labels 14 únicos.
- G6: 0 URLs/hosts en ProviderStatus.* (módulo puro std). G8: 0 primitivas
  de pacing. EOL: ProviderStatus.h/.cpp + test LF-100%; App.cpp líneas
  nuevas LF (isla 039/045), censo declarado: 4936+k líneas / **1878 CRs
  SIN CAMBIO** (solo líneas nuevas LF; ningún CR añadido ni borrado).

## 7. Fuera de scope (backlog documentado, no exige nada de 049)

Edad-uniforme para GIRO/DIAS/Ebro (accessors nuevos = tocar adapters — si
David los quiere, ciclo aparte); distinción 429-vs-timeout REAL en
GiroAdapter (instrumentación de código HTTP — tocaría fetch); desglose
mock por-campo de índices más allá de `IndexSnapshot::error`; techo duro
tec_*.bin; Opción B W=168; O3; O-030a; B0/B1; M-irtam-replay; ev*.log;
observación FPS a1 (046).

## 8. Empaquetado del drop 049 (lecciones vivas aplicadas)

- LECCIÓN 039 pre-push OBLIGATORIA: `grep -c CR` del delta con el conteo
  esperado declarado (hunks App.cpp: líneas nuevas LF → CRs del delta ==
  CRs de contexto/DEL pre-imagen) + `am --keep-cr` de prueba + write-tree
  == commit declarado, ANTES de pushear.
- Nota 049 con: sha256+tamaño del delta, `From <sha>` limpio sin BOM,
  numstat por fichero (titular de `git diff --shortstat`, nunca conteo
  manual — lección 010), árbol anunciado full-40, poblaciones medidas vs
  §5, censo EOL, conteo de checks nuevos, «warnings +0/-0» de su lado
  (sin -Wall) con nota de que GLM verifica los 12 del sandbox.
- Tamaño esperado del delta: orden 300-450 líneas (módulo puro ~120-150,
  App ~80-120, test ~120-150, CMake ~6) — si se dispara, revisar scope.

CICLO prov-matrix ABIERTO. A la espera del paquete 049 (matriz + hunk 047).
