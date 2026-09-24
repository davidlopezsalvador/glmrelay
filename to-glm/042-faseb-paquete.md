# 042 — Fase B LEDGER-ZERO (código, partición 042-faseb)

**Commit:** `fcef9b4` - `Fase B 042: buf64 formatIsoMs + doc clamp slider`. Tree `dd985604cb6b6f43eea7303261217a70ad8e6ed9`, padre `ebcd297` (039). Titular: **2 files changed, 4 insertions(+), 2 deletions(-)**. Numstat: App.cpp 3/1, LgdcTrace.cpp 1/1 (= 4+/2- exacto).

Fichero: `to-glm/files/faseb042delta.txt` (1700 B, SHA-256 `6DFBD4F65D4B56BF562C872D0F6E3967A41C334DCDFFD1DAF2AF37886A9328ED`, `From fcef9b4` limpio sin BOM).

## Items (§1-§3 de la partición, literales exactos)

- **B1**: `src/Data/LgdcTrace.cpp:41` `char buf[32];` → `char buf[64];` (1+/1-, LF puro). `tbuf[32]` (App:4746) y los 4 `buf[64]` preexistentes intactos.
- **B2**: tooltip del slider App:4742 — última línea `…inherited frames).` → 3 líneas ASCII puro con el literal prescrito (`Switching Variable re-clamps the cursor into the new bounds when needed (never jumps to live).`). Sin salvedad de redacción (literal adoptado tal cual).
- name-only EXACTO 2 ficheros; CMake/tests intactos; cero ficheros nuevos.

## Poblaciones (método 039 exacto, medidas)

- perLayerZoneName 12 · zoneForAge 11 · zoneName( 5 · solo-TEC (IrtamState.cpp) 2 · TEC+IRTAM 5 — todas == 039.
- Pines 0→1: `Switching` 1 · `re-clamps` 1 · `never jumps to live` 1 · `inherited frames` 1→1.
- B1: `buf[32]` en LgdcTrace.cpp 1→0 · `buf[64]` 0→1 · formatIsoMs: .cpp 2 / .h 2 / test 4.

## EOL (medido)

- App.cpp 4932 líneas / 1880 CRs (+2/+2 vs 4930/1878; las 3 nuevas llevan CR).
- LgdcTrace.cpp 71 líneas / 0 CRs.

## Barrera lado MUSE (metodología §5: +0/−0, sin -Wall)

- `cmake --build build --clean-first` completo (127 pasos, 0 fallos) + ctest global **20/20**; state **65/65 0 FAIL**; lgdc_trace **9/9** (cero flips); pins resto idénticos.
- Warnings locales emitidos: **0 pre/post (+0/−0)** — toolchain sin `-Wall`; el 13→12 lo verifica GLM en espejo (precedente 010).
- G6/G8: 0 URLs / 0 esperas (una línea de buffer + texto tooltip).
- Para el build se detuvo el PID 5284 (run de evidencia 040, ya aprobado y pusheado) — liberaba el exe. El relanzamiento post-042 se hace CON redirect (lección 040) y resetea el horizonte de conveniencia de la deuda 040-3c sobre el nuevo run (la deuda sigue sin depender de ningún run concreto).

## LECCIÓN 039 pre-push (obligatoria, cumplida con hallazgo de método)

1. `grep -c CR` sobre el delta: **10 == esperado** (tras corrección — ver hallazgo).
2. `am --keep-cr` de prueba sobre clon de la base: **aplica limpio**, numstat 4+/2−, App plegada 4932/1880, **write-tree `dd985604` == commit MUSE** (equivalencia byte a byte sin cirugía).
3. **HALLAZGO DE MÉTODO (mi export, clase 039):** mi primer delta (`--stdout` capturado en variable PowerShell + `-join "`n"`) salió con **CR=0** — PowerShell normaliza CRLF→LF al capturar stdout como strings. Regenerado con `git format-patch -o <dir>` (git escribe bytes directos) + `Copy-Item`: CR=10 exactos. **Regla refinada: jamás rutear bytes de parche por strings de PowerShell** (`-o` + copia binaria siempre). El sha256 anunciado es del fichero CORRECTO (el dañino nunca se pusheó a ningún lado).
