# 005 — Paquete P4 (M-IRTAM-F2): plumbing gambit (contrato F2-R2, opción A)

Fichero: `to-glm/files/mirtamf2p4delta.txt` (35.382 B, SHA-256 `D415945AA656A1A16A5DF64678476F7D096B4E22FC37F837F8E313EC6DFE30D0`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit P4:** `42dc233` — `M-IRTAM-F2 P4: plumbing gambit (adapter + backfill + wiring + badge DATA-age, bundle valid=false F2-R2)`. Tree `7ed02a27583bd4638a55ad5d6d2037170fecaaed`, padre `459e8bc` (P3). 5 ficheros, 509 inserciones, 32 borrados (diffstat: CMakeLists 13±, App.cpp 143±, IrtamCoeffAdapter.cpp +168, .h +116, test +101).

**Nombres declarados para tu grep**: namespace `irtamfetch`; `irtamfetch::IrtamCoeffAdapter` (`fetchOnce`, `planBackfill`, `scan`, `freshestTov`, `urlFor`); `irtamfetch::FetchTarget`, `planMissing`, `quantizeSlot`, `windowEndFor`, `formatGambitTime`, `dataAgeMin`, `CacheHave`, `IrtamBundle` (con `valid`, `dataEpoch`, `foF2`, `hmF2`, `error`); `kSlots = 96`, `kSlotSec = 900.0`, `kGambitLagSec = 259200.0`, `kParams = {foF2, hmF2}`; `App::Impl::irtam`, `getIrtam`, `irtamBackfillThread`; `lgdcpacing::canLaunchGambit` + `recordLaunch` en el adapter.

**Mapeo a tus 6 condiciones F2-R2:**
1. **Bundle honesto**: `IrtamBundle` declara grids finales + `valid` + `dataEpoch` + `error`. P4 publica `valid=false` SIEMPRE (hilo backfill, `publish()`); grids default 0x0 vacíos (test: jamás 46x45 de ceros). Draw path (`applyColorLayer` + streaming `update`) EXIGE `valid`: `if (!b || !b->valid) return` — capa ausente, sin dibujo.
2. **Flip aditivo**: P1b = rellenar `foF2/hmF2` + `valid=true`. Tipos y wiring intactos (nada que cirugiar: la estructura ya está).
3. **Scope taxativo**: adapter (curl twin SDO: UA + timeout 20 s + FOLLOWLOCATION) + CONSULTA (`canLaunchGambit` en `fetchOnce`) + REGISTRO (`recordLaunch` al lanzar, reloj ms como `GiroAdapter::msNow`) + backfill 192 req (96×2, ≥15 s, UNA vez, resumable: `planMissing` solo pide faltantes) + steady (rechequeo 300 s, nace ~1 slot/ciclo) + integración cache P2 (`scan`/`saveBucket`, pre-gate `shouldCacheBucket`) + wiring + badge DATA-age desde TOV del bucket (calculada AL PINTAR). Cero primitivas de pacing nuevas.
4. **Heredadas**: M4 intacto (GiroAdapter no tocado en este drop); App.cpp diffstat completo arriba + **anclas re-pineadas** (abajo); ctest acumulado 17/17; G6 (abajo); B0/B1 diferidos (adapter ignora params fuera de foF2/hmF2; `scan` los salta).
5. **Tu aceptación**: barrera abajo + `valid=false` por grep del draw path + tabla de tráfico re-verificada contra código (abajo, no solo nota).
6. **P1b**: listo para recibir — zip del drop 002 + 4 ASC como oráculos + coeficientes reales fluyendo al cache cuando el backfill corra.

**Verificación (mi lado):**
- `test_irtam_adapter`: **19/19 OK** (slots/ventana/formato 7, planMissing 5, DATA-age 2, bundle honesto 4, URL-cableado 2 sin repetir endpoint). Reloj explícito, cero red.
- `ctest` **global acumulado P2+P3+P4: 17/17 pass** (16 + `irtam_adapter`; `irtam_coeff_parse` 43/43, `irtamc_cache` 28/28, `irtamc_gate` 19/19 intactos).
- TUs: **53** (52 + `IrtamCoeffAdapter.cpp`). Warnings: 0 en los 2 TUs nuevos con `-Wall -Wextra`; rebuild UCRT64 sin líneas `warning` (tu baseline 11 queda a tu fold-relativo).
- G6: URL gambit vive **UNA vez** (`IrtamCoeffAdapter.cpp` `urlFor`); 0 URLs/hosts en .h y test; `curl` solo en el adapter (donde pertenece); ficheros nuevos LF-100%, sin BOM.
- NINGUNA ruta lanza gambit sin consultar el gate: `fetchOnce` es el único lanzador y su primera instrucción efectiva es `canLaunchGambit` (grep: 1 consulta + 1 registro en el adapter; el gate sigue siendo solo `lgdcpacing`).

**Anclas re-pineadas** (solo inserciones por encima; ninguna línea ancla modificada):
| Ancla | Árbol P3 | P4 (este drop) |
|---|---|---|
| `mergeKc2g` def | 346 | 353 |
| `restoreKc2gCache()` call | 1237 | 1282 |
| `mergeKc2g` call (applyColorLayer) | 1442 | 1487 |
| `mergeKc2g` call (replay) | 1485 | 1530 |
| `restoreKc2gCache` def | 2318 | 2368 |
| `mergeKc2g` call (applyColorLayer 2) | 2434 | 2483 |
| `freshestAgeMinLive` call | 3062 | 3142 |
| `setvbuf` | src/main.cpp:8 (fichero no tocado) | igual |
| `bloomThreshold`, `gitignore:51-53` | no tocados | igual |

**Tabla de tráfico re-verificada contra código (G10 parcial):**
| Fuente | Ritmo verificado | Sitio |
|---|---|---|
| getbest régimen/frío/catálogo | intacto, sin tocar (~5 GET/min, 1 GET/arranque) | `GiroAdapter.cpp` sin cambios en este drop |
| gambit backfill | 192 targets máx (96×2), 1 fetch/iteración a ritmo de gate (≥15 s) ≈ 48 min UNA vez; resumable (`planMissing` respeta lo cacheado) | `IrtamCoeffAdapter.cpp` `planBackfill` + hilo `App.cpp` backfill |
| gambit steady | rechequeo 300 s idle si `targets.empty()`; nace ~1 slot (15 min) por ciclo | mismo hilo, `sleepIntr(3000)` |
| gambit cede SIEMPRE | consulta antes + registro al lanzar; sin espera activa (reintento ~5 s, sin burst) | `fetchOnce` |
| Agregado steady con F2 | getbest ~5/min + gambit ~1/15 min; picos disjuntos por construcción del gate | `LgdcPacing` (P3, intacto) |

Siguiente: **P1b** (port del reader + flip + visual + oráculos ASC) cuando lo pidas.
