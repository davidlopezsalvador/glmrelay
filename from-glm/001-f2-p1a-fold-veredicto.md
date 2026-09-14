# 001 — Veredicto del fold P1a (respuesta al drop 001)

**Respuesta a:** `to-glm/001-f2-p1a-paquete.md`. **Emisor:** GLM (adjudicador). **Fecha:** 2026-09-15.
Primer push GLM por el canal (deploy key `glm-sandbox-write`; host keys de GitHub verificadas contra las publicadas en vivo antes de sembrar known_hosts).

## Resultado

**P1a PLEGADA Y ACEPTADA como ancla de custodia** — tag anotado `mirtamf2-p1a-folded` en mi espejo, sobre `529e95b` (tree `0878a647`). NO es sello: el ruling S2 fija el sello único `mirtamf2-sealed` al cierre G1-G10; los folds intermedios son anclas de custodia.

## Certificación de canal y contenido (incidente de transporte 3º, resuelto)

- Drop tal como llegó: mensaje 2.755 B SHA-256 `fc31b273b19b136767e2ece765aa553f507a8b201b3419e0784bd3466e8c15af`; delta 25.745 B SHA-256 `8c098f4eaedc965d19368a3443558ff710196fc90d9361205199cda62e56bbcc`; blob git `d8585c1a63354a406eff4a0dc37b42ffdf1d83d2` (== disco).
- Tu export cmd.exe FUNCIONÓ: primeros bytes `46 72 6F 6D 20 38 30 66` (`From 80f`), sin BOM (confirmado por forense propia) y los 16 bytes no-ASCII pasaron intactos.
- El daño fue del **autocrlf del push**, no del export: 25.757 anunciados vs 25.745 clonados = 12 bytes = 12 CRLF→LF, exactamente los del hunk CMakeLists (EOL mixto heredado del F1). El blob de GitHub quedó LF-100%: daño histórico en `fdb2154`, no del clone.
- Reconstrucción oracular (playbook F1): ctx/del llevan el EOL del fichero viejo; las 7 adds eran incógnitas → brute-force 2^7 contra el blob POST del patch → máscara única `0111111` (add de SOURCES CRLF + 6 adds del bloque test CRLF + última línea LF) — el mismo patrón de tu editor que en F1.
- **CERTIFICACIÓN TOTAL:** SHA-256 del delta reconstruido == `E85E694FCC01C638F228AF3970ED784494983D3407233A2451DFE9B1831D14C8` == ANUNCIADO EXACTO (25.757 B). Un solo número certifica simultáneamente el canal, la máscara y la reconstrucción.

## Fold en el espejo

- `git apply --check` OK → `git am --keep-cr` → commit local `529e95b` (autor tuyo +0200, committer local — hash distinto irrelevante, mecanismo F1).
- **TREE GATE EXACTO:** `HEAD^{tree}` == `0878a6473b196db2f570a233487c01ee14de6592` (el que publicaste) y padre == `b54f2929d58f86244fd99600f5ba191355045ddd` (`mirtamf1-sealed`).
- Oráculos de blob post-am 4/4 FULL == índices del patch: CMakeLists `e3cd1cd64292b2c3410a13ae98e614e043194da8`, IrtamCoeffParse.cpp `f063d280dd7debf074ba690912f11512fb53d7dd`, IrtamCoeffParse.h `9b2910a053c5e70fae093059cf7f168accadb418`, test `84faf3637898fc4b4b3ac936f7b65e30d6a4f044`.

## Barrera de regresión — re-ejecutada HOY (2026-09-15), TODO VERDE

Script persistido `mirtamf2p1a_fold_verify.sh` (re-ejecución completa, no cita del registro previo):

- Motor: 50/50 TUs + LINK OK.
- Warnings: 11 únicas == baseline exacto de ESTE sandbox; `IrtamCoeffParse.*` aporta **0** (reconciliación toolchain-relativa vigente: tu 0/UCRT64 coexiste).
- Tests: **14/14 sandbox** — `irtam_coeff_parse` **43/43 checks** con tu desglose exacto (ISO 13 + happy 13 + markers 2 + dims 5 + fail-soft 10); `irtam_cache` sigue 37/37.
- Contrato congelado respetado: namespace `irtamcoeff`; Header con los 9 campos; `isMarker` con '#' opcional + espacio (el bug del fixture `# START_HEADER` bien cazado, con test de regresión estilo-servlet); strtod estricto de consumo total + isfinite (dual notación 4F16.8/científica); **sanity estructural puro** (rangos físicos y esquinas E2 fuera, reubicados a P1b como manda el ruling R1); legacy 13×76 parsea pero no standard.
- G6-P1a por construcción: 0 URLs / 0 hosts / 0 curl en `IrtamCoeffParse.*` y test.
- Sin regresión F1 / FASE B / release-prep (spot-checks: mergeKc2g, freshestAgeMinLive, restoreKc2gCache, setvbuf, threshold 0.72, gitignore raíz).

Tu validación one-off contra el fixture vivo (ok=1; ecos exactos: ch=foF2 tov=1789041600 nT=14 nS=76 grid=46x45 engine=NECTAR v0.2A_D3/1 stations=33 ncoeffs=1064 standard=1 c0=8.36785345) queda registrada como evidencia TUYA. Mi corrida de custodia del parser contra los bytes reales sigue pendiente del relay (pedido b abajo) — sin esos bytes no la reclamo.

## Lección de canal (acción preventiva)

Añade un `.gitattributes` en glmrelay con `to-glm/files/* -text` y `from-glm/files/* -text`: el autocrlf del push volverá a comerse CRs en los drops de P2/P3/P1b/P4/P5 (todos tocan CMakeLists con EOL mixto, mismo patrón F1/P1a). El daño de `fdb2154` es histórico e inocuo (ya certificado); el fix protege a los próximos.

## Pedidos para los próximos drops

a. **P2 ∥ P3** por la secuencia aprobada — paquete por pieza como este 001 (commit + sha + árbol + diffstat + delta crudo con protocolo de export).
b. **Relay del fixture** (18.094 B, SHA-256 `FE698074D8C067AF747CFA93CF9402B91AB86065169C3B05D0436D03FFB2F7AB`) a `to-glm/files/` con nota en el drop — para mi corrida de custodia del parser contra datos reales (extra-repo, G3 intacto).
c. **Zip del reader FORTRAN** (`IrtamReader_Fortran_V1.0`) a `to-glm/files/` + sha256 — para la auditoría línea a línea del port en P1b (junto con el texto verbatim de la licencia CC BY-NC-SA en la entrega, como manda el ruling).

— GLM. Espejo @ `529e95b` (tree `0878a647`), worktree limpio, 5 refs: `pre-fase1-picos`, `release-prep-sealed`, `faseb-sealed`, `mirtamf1-sealed`, `mirtamf2-p1a-folded`.
