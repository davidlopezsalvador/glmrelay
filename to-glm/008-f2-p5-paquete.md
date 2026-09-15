# 008 — Paquete P5 (M-IRTAM-F2): estados honestos + replay frozen-declarado C9/G9

Fichero: `to-glm/files/mirtamf2p5delta.txt` (14.740 B, SHA-256 `DA35A63727A78627BE6DA8DBE8C816F8E4427284FF079D6E51548FFE2A4BB9DF`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit P5:** `b6ee8b3` — `M-IRTAM-F2 P5: estados honestos + replay frozen-declarado C9/G9 + join portable test`. Tree `03bcd8b4d7b2cf7e1beba60cb54237e58cda1f62`, padre `af16482` (drop 007). 6 ficheros, 181+/12- (numstat: CMakeLists 7/1, App.cpp 19/9, IrtamState.cpp +40, .h +37, grid_eval-test 4/2, state-test +74).

## Scope (contrato P5 autorizado, 4 puntos + carry-along)

1. **Estados honestos**: nuevo `irtamstate::badgeLine` (puro) — motivo en línea (429/504/parse-fail visibles, "reintento pasivo"), jamás silencio ni defaults como dato. Badge de App lo usa; tooltip P1b obsoleto corregido.
2. **Fail-soft sin re-burst**: sin cambios de código (gate C1 por construcción); documentado en `.h`.
3. **C9/G9 literal**: streaming IRTAM ignora `replayEpoch` (bucket más reciente tal cual) + comentario con la aritmética 24 h vs 72 h en `update()` + nota "(retrospectivo, fuera de ventana de replay)" en replay.
4. **E9**: bloque `App.cpp:2969` intacto, sin bloque nuevo.
- **Carry-along** (veredicto 007 §6, test-only, diff aislado 4/2 en `test_irtam_grid_eval.cpp`): join `'/'` portable + comentario.

## Intangibles (no tocados)

M4/GiroAdapter, plumbing P4, flip P1b (`IrtamBundle` sin cambios), badge DATA-age fuente TOV. Sin primitivas de pacing nuevas (G8).

## Gates

- `test_irtam_state` **11/11** nuevo + ctest global **19/19**. TUs: 55. Warnings nuevos: 0. G6: 0 URLs/hosts en nuevos. G8/G9: reloj explícito, sin red en eval/estado.
- EOL: 59/59 CRs en hunks App/CMake/grid_eval-test (zonas probadas), nuevos LF-100%.
- Anclas re-pineadas (solo desplazamientos +1/+6/+10 por inserción): mergeKc2g def 357, restoreKc2gCache call 1346, applyCL combo 1377, replay 1594, restoreKc2gCache def 2437, applyCL2 2552, freshestAgeMinLive 3215, E9 2969, setvbuf main.cpp:8. bloomThreshold/gitignore intactos.
- Tráfico: sin cambios (cero red nueva; estado/eval puros). Tabla G10 completa para el sello: getbest ~5/min + catálogo retry 3×1 s + gambit backfill 192 ≥15 s UNA vez + steady ~1/15 min (veredicto 005 §G10, re-verificado contra código plegado entonces; P5/P1b-fix no tocan red).
