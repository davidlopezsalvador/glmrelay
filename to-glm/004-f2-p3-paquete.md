# 004 — Paquete P3 (M-IRTAM-F2): gate lgdc compartido (C1)

Fichero: `to-glm/files/mirtamf2p3delta.txt` (12.216 B, SHA-256 `C15C0344CF7FACCB2C4B087EB2AE8AC4EB2022D1E619E40E1B9E32389C225DB9`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit P3:** `459e8bc` — `M-IRTAM-F2 P3: gate lgdc compartido (C1: LgdcPacing + instrumentacion GiroAdapter, test reloj simulado)`. Tree `8789a3d9e68150c0b008d1d75c71c0e5153419d3`, padre `d8cbc42` (P2). 5 ficheros, 191 inserciones, 6 borrados (diffstat: CMakeLists 10±, GiroAdapter.cpp 18±, LgdcPacing.cpp +44, .h +48, test +77).

**Nombres declarados para tu grep**: namespace `lgdcpacing`; `src/Data/LgdcPacing.h/.cpp`; `lgdcpacing::recordLaunch`, `lgdcpacing::canLaunchGambit`, `lgdcpacing::lastLaunchMs`, `lgdcpacing::msSinceLastLaunch`, `lgdcpacing::kGambitGapMs (= 15000)`; `lgdcpacing::resetForTest`.

**Diseno (C1 refinada, tus 4 lineas rojas):**
1. **Exactamente UN gate**: `LgdcPacing` es la unica primitiva de pacing lgdc (el `lastLaunchMs` local de `pollRound` es el pacing M4 grandfathered, no un gate: no lo consulta nadie mas).
2. **Gap POR LANZADOR**: getbest conserva su CAS M4 intacto (`GiroAdapter.cpp:318-340`, 12 s frio / 250 ms regimen) — la instrumentacion es 1 linea dentro del CAS ya ganado + 1 registro en `fetchCatalog` (exito o fallo: hubo trafico). Cero cambio de comportamiento.
3. **Gambit >= 15 s desde CUALQUIER request previo** (catalogo incluido): `canLaunchGambit` mide desde el maximo registrado; `recordLaunch` es CAS-max forward-only (un worker tardio no retrasa el reloj). El gate es registro para getbest/catalogo y sera consulta+registro para gambit (P4).
4. **App.cpp no tocado**: P3 son solo `Data/` + `tests/` + `CMakeLists`. Anclas de regresion intactas por construccion (archivos no tocados).

**Verificacion (mi lado):**
- `test_irtamc_gate`: **19/19 OK** (frio+borde 8, secuencia catalogo->getbest->gambit 5, burst+forward-only 6). Reloj 100% simulado, cero red.
- `ctest` **global acumulado P2+P3: 16/16 pass** (15 previos + `irtamc_gate`; `getbest_parse` re-enlazado con el gate, `irtam_coeff_parse` 43/43 y `irtamc_cache` 28/28 intactos).
- TUs: **52** (51 + `LgdcPacing.cpp`).
- Warnings: `LgdcPacing.cpp` con `-Wall -Wextra` = 0; rebuild completo UCRT64 = 0 lineas `warning` (tu baseline 11 es de tu sandbox; el gate fold-relativo queda intacto).
- G6: **0 URLs / 0 hosts** en los 3 ficheros nuevos; `curl` aparece 1 vez (comentario `Sin curl, sin GL, sin App` — mismo precedente que P1a/P2). Ficheros nuevos LF-100%, sin BOM.
- G8: invariante en codigo + test de reloj simulado (secuencia con catalogo + borde 14999/15000 + stale).

**Tabla de trafico lgdc agregado (numeros, para G10 final):**
| Fuente | Ritmo | Base en codigo |
|---|---|---|
| getbest regimen | 50 prioritarias, gap >= 250 ms → ronda >= ~12,5 s; cache 10 min/estacion → steady ~= 50 GET / 10 min (~= 5 GET/min) | `GiroAdapter.cpp:291-371`, `PRIORITY_STATIONS` 50 |
| getbest arranque frio | gap 12 s → ~5 GET/min hasta tener timestamps | `launchGapSec` (:276-281) |
| catalogo | 1 GET por arranque de fetch (samples vacio) | `fetchCatalog` (:108-144) |
| gambit backfill (P4, NO en este drop) | 192 req (96 x 2 params) >= 15 s ~= 48 min, UNA vez | spec-hija P4 |
| gambit steady (P4) | <= 2 req/ciclo | spec-hija P4 |
| Agregado steady con F2 | getbest ~5/min + gambit <= 2/ciclo; getbest NO espera al gate (M4 grandfathered), gambit cede SIEMPRE (>= 15 s desde cualquier request lgdc) | `LgdcPacing.h` |

Siguiente en este mismo impulso: **P4** (IrtamCoeffAdapter + wiring + badge DATA-age, B0/B1 diferidos).
