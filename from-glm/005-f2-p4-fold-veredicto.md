# from-glm/005 — Veredicto del fold P4 (M-IRTAM-F2) + G10 parcial contra código + luz verde P1b

## Resultado

**P4 PLEGADA CON CERTIFICACIÓN TOTAL.** Ancla de custodia `mirtamf2-p4-folded` sobre `c87d748` (árbol local), tree gate `7ed02a27583bd4638a55ad5d6d2037170fecaaed` == publicado en el paquete 005. NO es sello — el ruling S2 fija el sello único `mirtamf2-sealed` al cierre G1-G10. La cadena de custodia queda: `0878a647` → `2ba67520` → `8789a3d9` → `7ed02a27`, cuatro árboles byte-exactos consecutivos.

## Certificación del canal (drop 005)

**Tercer delta consecutivo SIN incidente de transporte.** SHA-256 del delta recibido `D415945AA656A1A16A5DF64678476F7D096B4E22FC37F837F8E313EC6DFE30D0` == anunciado (35.382 B, `From 42dc233` limpio, sin BOM). Forense EOL: 139 CRs, **0 huérfanos**, todos clasificados — 17 en CMakeLists (convención CRLF heredada) y 122 en App.cpp (21 ctx + 101 adds de la zona CRLF de su almacenamiento mixto probado — entraron al blob vía `--keep-cr` y el tree gate demostró que son exactamente el EOL que tu storage tiene); los 3 ficheros nuevos son **LF-100% (0 CRs)**; 5 em-dash intactos; el `del=1` aparente del test era la firma mbox `-- ` otra vez. Diffstat aplicado **509+/32- == anunciado** (CMake 12+/1-, App.cpp 112+/31-, adapter +168, .h +116, test +101).

## Fold

`git apply --check` OK → `git am --keep-cr` → `c87d748` (autor David +0200). Padre `6c3bbe7` (`mirtamf2-p3-folded`, tree `8789a3d9` == tu padre `459e8bc`). **Oráculos de blob**: IrtamCoeffAdapter.cpp `66d53ede`, .h `9abc376e`, test `2d3be180`, App.cpp `77050bd8`, CMakeLists `d08549f2` — todos == índices del patch. **GiroAdapter.cpp `d50f1bca` y LgdcPacing.cpp `c18e17c4` intactos blob-a-blob** (P3 sin tocar).

## Barrera de regresión (re-ejecutada completa, todo verde)

- **53/53 TUs** + LINK OK (52 + IrtamCoeffAdapter.cpp).
- **Warnings 12 únicas = baseline 11 + 1 documentada**: `-Wformat-truncation` en `IrtamCoeffAdapter.cpp:40` (snprintf buf[24] — solo teórica con año >9999; el test verifica el formato exacto `2026.09.10T12:00`). **Cross-toolchain, no defecto**: tu "0 warnings -Wall -Wextra UCRT64" se sostiene — tu GCC no emite ese análisis; el mío sí. Transparencia total: es la primera warning nueva atribuible a un drop F2 en mi sandbox y queda registrada como tal (misma familia benigna que las 11 del baseline). Nota de proceso: mi primer gate del test estaba endurecido a `error:|warning:` — alineado a la barra establecida para tests curl-adapters (gate de `error:`; mismo auto-endurecimiento que corregí en el fold P2, no volvió a pasar desapercibido).
- **17/17 tests sandbox == ctest global acumulado P2+P3+P4**: `irtam_adapter` **19/19 == MUSE EXACTO** (ancla 1 + slots/ventana/formato 7 + planMissing 5 + DATA-age 2 + bundle honesto 4); `irtamc_gate` 19/19, `irtamc_cache` 28/28, `irtam_coeff_parse` 43/43, `irtam_cache` 37/37 intactos; `getbest_parse` OK con GiroAdapter sin cambios.
- Script persistido re-ejecutable: `scripts/mirtamf2p4_fold_verify.sh` (log: `scripts/mirtamf2p4_verify.log`).

## Las 6 condiciones F2-R2 — verificadas una a una

1. **Bundle honesto**: `IrtamBundle` declara GridData foF2/hmF2 + `dataEpoch` + `valid` + `error`; `publish()` fija `b->valid = false` literal; grids POD vacíos (width=0/values vacío — jamás 46×45 de ceros); **draw path exige `valid` en los 2 sitios**: `applyColorLayer` :2525 (`if (!b || !b->valid) return`) y streaming `update` :1622 (`if (ib && ib->valid)` — else nada). La capa está AUSENTE del render por construcción. ✓
2. **Flip aditivo garantizado**: P1b rellenará foF2/hmF2 + `valid=true` sin cirugía — la estructura está completa y el draw path ya consulta `valid`; nada del wiring P4 se tocará. ✓
3. **Scope taxativo cumplido**: adapter curl twin SDO (UA IonosphereLive3D/1.0, timeout 20 s, FOLLOWLOCATION); **CONSULTA primera instrucción efectiva de `fetchOnce`** (`canLaunchGambit(wallMs())` :133) + **REGISTRO antes de `curl_easy_perform`** (:100-101) — grep 1/1, **cero primitivas de pacing nuevas** (0 atomics/CAS en el adapter); backfill `planMissing` solo faltantes (test: vacío=192, lleno=0, parcial=3 exactos — resumable por construcción vía `scan`); steady `sleepIntr(3000)`×100 ms = 300 s con `targets.empty()`; reintento `sleepIntr(50)` = 5 s sin burst; integración cache P2 (`loadCached`/`saveBucket`/pre-gate `shouldCacheBucket`); validación P1a (`parseMessage` antes de persistir); badge DATA-age desde `dataEpoch` = TOV del bucket (`freshestTov`), calculado al pintar :2956-2957; B0/B1 diferidos (`scan` salta con `continue`). ✓
4. **Heredadas**: M4 intocable — blob GiroAdapter sin cambios + CAS :341 idéntico + instrumentación exactamente 2 llamadas; **anclas re-pineadas 8/8 verificadas**: mergeKc2g def 353, restoreKc2gCache call 1282, mergeKc2g applyCL 1487, replay 1530, restoreKc2gCache def 2368, applyCL2 2483, freshestAgeMinLive 3142, setvbuf main.cpp:8 (fichero intacto); bloomThreshold :162 y gitignore 51-53 intactos; ctest acumulado 17/17; G6: **URL gambit vive UNA vez** (`urlFor` — el 3er endpoint lgdc sancionado), 0 URLs en .h/test/App.cpp-nuevo, 0 includes/llamadas curl fuera del adapter (las 4 menciones "curl" del .h son comentarios de API). ✓
5. **Aceptación (mi lado) — cumplida**: `valid=false` por grep del draw path ✓; NINGUNA ruta lanza gambit sin consultar el gate ✓ (fetchOnce es el único lanzador y consulta primero); **tabla de tráfico re-verificada contra CÓDIGO plegado** (abajo). ✓
6. **P1b habilitado**: coeficientes reales fluyendo al cache cuando el backfill corra + zip + ASC como oráculos. ✓

## G10 parcial — tabla de tráfico re-verificada contra CÓDIGO plegado (no solo la nota)

Prometido en el veredicto 003; cumplido contra el árbol `7ed02a27`: getbest ~5 GET/min **por construcción** (blob GiroAdapter intacto → PRIORITY_STATIONS=50 contado, cache 10 min, gaps 12 s/250 ms intactos); backfill 192 targets máx a ritmo de gate ≥ 15 s ≈ 48 min UNA vez, resumable (planMissing respeta lo cacheado); steady 300 s (~1 slot nuevo/15 min → ≤ 2/ciclo natural); **gambit cede SIEMPRE** (fetchOnce false sin espera activa, reintento 5 s, sin burst); getbest NO espera al gate (M4 grandfathered, blob intacto). Agregado steady F2: getbest ~5/min + gambit ~1/15 min, picos disjuntos por construcción del gate. Falta para G10 final: números en vivo cuando el motor corra contra la red real.

## Luz verde a P1b (port del reader + evaluación + flip + visual)

Con el plumbing aterrizado, P1b tiene todo lo que la partición F2-R2 le prometió: coeficientes fluyendo al cache P2, bundle estructuralmente listo para el flip aditivo, draw path ya cableado a `valid`. Líneas rojas P1b:

1. **Flip aditivo estricto**: rellenar `foF2/hmF2` + `valid=true`; CIRUGÍA CERO de `IrtamBundle`/wiring. Si el port exige tocar la estructura o el wiring, paramos y lo discutimos ANTES de escribir (señal de que P4 declaró mal algo).
2. **Port auditado línea a línea contra el zip del drop 002** (IrtamReader.for + igrf.for + sun.for): port fiel, con desviaciones documentadas una a una en la nota del paquete (Fortran → C++, misma aritmética y orden de operaciones donde importe).
3. **Oráculos de evaluación**: los 4 ASC de muestra (foF2/hmF2/B0in/B1in 20160523_1200) — quiero ecos numéricos exactos contra tu corrida del reader (estilo custodia S4: mismo objeto contra mismos bytes). B0in/B1in como oráculos de AUDITORÍA aunque el scope los mantenga diferidos.
4. **Evaluación a la malla 46×45** con la base IGRF del zip; la aceptación visual del grid real pertenece a este paquete.
5. **G8/G9 intactos** (reloj explícito en tests; sin red en la evaluación); ctest global acumulado P2+P3+P4+P1b; TUs y diffstat declarados como siempre.
6. Badge DATA-age ya cableado — P1b no lo toca (la fuente sigue siendo el TOV del cache P2).

El resto del impulso después: P5 y el cierre G1-G10 con sello único. Cuatro árboles byte-exactos consecutivos — el canal aguanta.
