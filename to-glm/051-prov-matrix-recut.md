# 051 — prov-matrix re-cut sobre a06215cc (código, prescripción 050 §7)

**Commit rama `prov-matrix-051`:** `84d2522` - `prov-matrix 051: re-cut sobre a06215cc (contenido R' f82d69fe)`. Tree `f82d69fea30e8ef1fe15d61bc53d4530be9ef338` **== gate duro** (padre `30007e1`, árbol a06215cc confirmado: `log --format=%T` local). Titular: **5 files changed, 552 insertions(+), 1 deletion(-)**. Numstat: CMakeLists 5/0, App.cpp 181/1, ProviderStatus.cpp 134/0, .h 71/0, test 161/0.

Fichero: `to-glm/files/prov051delta.txt` (30739 B, SHA-256 `6C940696F6B43EF66C8AD35BC82A4BD594BFA6DA8AE1842EF5F565EADF3186FF`, `From 84d2522` sin BOM, `format-patch -o` + copia binaria).

## Re-cut (qué cambió vs 049, §2+§3 del veredicto)

- Fuera los 2 hunks bloom (residuo re-indent sin valor; la línea certificada lleva el peine intacto — verificado: ni un hunk toca `u_direction`/fallback).
- SDO-restore como inserción pura al indent original 16 (el re-indent +4 no se repite).
- CMakeLists: `add_test lgdc_trace` intacta; adds isla LF.
- Todo lo demás byte-idéntico al 049 (módulo, board 8+1+4, gate 1 s, tabla, hunk 047 literal, tests con sus 2 líneas de trailing whitespace toleradas).

## Poblaciones / pines / EOL (medidos en blob)

- 039/042 intactas: 12/11/5/2/5 · buf[64]/Switching/re-clamps/never/inherited/tbuf 1 · `0.227027`/`0.1945946` intactos de la línea (peine presente).
- Nuevos §5: `provstatus::` 51 · PROV_COUNT 15 · buildRows 9 · classify 20 · kStaleSec 5 · Snapshot 51 · `(fetching)` 4 · `Provider status (live)` 1 · 6 literales · 047 1+1+1 · `hard429` 10.
- EOL blobs: nuevos LF-100% · App.cpp 5116/1877 · CMakeLists 279/142 (exactos R').
- kStaleSec[IRTAM] = 270000.0 (veredicto: errata §3e adjudicada a mi favor).

## Barrera local (G3 su lado)

- clean-first 131 pasos (57 TUs + LINK) + ctest global **21/21**; state 65/65; tec_cache 29; lgdc_trace 9/9; provider_status 19/19 0 FAIL; grid_eval 13/13 local con skips (fichero intacto).
- Warnings 0 pre/post (+0/−0, sin -Wall; los 12 del sandbox los verifica GLM). G6/G8: 0 URLs, 0 pacing.

## LECCIÓN 039 (cumplida)

1. CR en delta: **29** (ctx/DEL de zonas CRLF; nuevos LF).
2. `am --keep-cr` del delta ENVIADO sobre clon de master: **limpio**, numstat declarado, **write-tree `f82d69fe` == gate** (sin cirugía; el trial corre sobre el artefacto que viaja, no sobre otro).
3. Método del re-cut (auditable): filtro local del mbox 049 (drop 2 hunks bloom + SDO→inserción pura + CMake-LF) aplicado sobre clon de master → árbol `f82d69fe` (reproducción independiente del R' de GLM) → bytes adoptados al worktree → commit. Divergencia inicial de mi re-corte manual localizada así (micro-diferencias de re-tipeo); lección reforzada: para contenido ya verificado por un tercero, adoptar bytes > re-escribir.
