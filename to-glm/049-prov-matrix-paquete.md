# 049 — prov-matrix (código, partición 048 + hunk 047)

**Commit rama `prov-matrix-049`:** `c41d67a` - `049: purga a1 del arbol (contenido puro dd985604+049)`. Tree `75502daf4799878451f1872e1fa6b1a836bef19e`, contenido sobre `fcef9b4` (árbol dd985604, base §0). Titular (`git diff --shortstat` fcef9b4..c41d67a): **5 files changed, 561 insertions(+), 10 deletions(-)**. Numstat: CMakeLists 6/1, App.cpp 189/9, ProviderStatus.cpp 134/0, .h 71/0, test 161/0.

Fichero: `to-glm/files/prov049delta.txt` (32632 B, SHA-256 `A64C0EF8974F46BEB371D19D025BF5B4F3926B4BFC0E4EB320B0FFC5384E505D`, `From` squash sin BOM, export `format-patch -o` + copia binaria).

## Alcance (§1/§4 + hunk 047)

- Módulo puro `provstatus::` (State 6 valores con precedencia off>failed>rate-limited>degraded>stale>ok; Snapshot/Row/ProviderId×14/labels; kStaleSec fija; `hard429`; classify/stateText/buildRows). Sin curl/GL/ImGui/App, solo std. `snprintf` solo con `%d`/`%s` en buf[32] (clase 010 sin riesgo).
- Board `provBoard/provCopy[14]` en Impl bajo `bundleMutex`; 8 escrituras worker + 1 irtam junto a publicaciones existentes (solo lectura de estado ya computado); 4 mains en gather con gate 1 s; tabla 4 columnas en `CollapsingHeader("Provider status (live)")` tras las 4 TextWrapped (byte-idénticas); edades andantes al pintar.
- Hunk 047 independiente: frase prescrita literal ASCII en el tooltip per-layer.
- rate-limited SOLO-declarado (fallback badge + hard429); gate LGDC = degraded; semántica por señal existente.
- Cero adapters tocados (name-only: los 5 ficheros); CMake/tests intactos salvo lo prescrito; guardas §5 verificadas (LgdcPacing/Trace, IrtamState/GridEval, shaders/Render, TextWrapped, badge GIRO-live, gate HF, failover solo-lectura, mergeKc2g, E9).

## Poblaciones / pines / EOL (medidos en blob)

- `provstatus::` 51 · PROV_COUNT 15 · buildRows 9 · classify 20 · kStaleSec 5 · Snapshot 51 · `(fetching)` 4 · `Provider status (live)` 1 · 6 literales de estado en stateText · 047 (`interpolated usability`/`median floor`/`edges may not match`) 1+1+1.
- 039/042 intactas: 12/11/5/2/5 · buf[64] 1 · Switching/re-clamps/never/inherited/tbuf 1.
- EOL blobs: nuevos LF-100% · App.cpp 5112/1879 (**−1 vs 1880**: un DEL con CR (línea 047) → ADDs LF; ADD con CR: 0 — aritmética exacta, isla prescrita).
- Tamaño 561 líneas vs estimado 300-450: justificado (14 mapeos proveedor ×~12 líneas mandados por §3b + gather + tabla; alternativa helper oscurecería el mapeo señal→fila que la partición exige explícito). Sin scope-creep.

## HALLAZGO de implementación (desviación declarada, adjudica el veredicto)

**kStaleSec[IRTAM] = 270000.0 (75 h), NO la fórmula** `kGambitLagSec+2*kSlotSec` (= 261000 = 72.5 h): la fórmula contradice DOS puntos del propio contrato — el test (8) prescrito (73 h NO stale) y la glosa §3e ("75 h+ es stale real"). Con 72.5 h, 73 h sería stale. Implementado el intento (75 h: 73 ok / 76 stale ✓); la fórmula queda documentada como errata candidata.

## Barrera local (metodología §7-G3)

- clean-first 131 pasos (56→57 TUs + LINK) + ctest global **21/21** (20 previos + provider_status); state **65/65**; tec_cache 29; lgdc_trace 9/9; provider_status **19/19 0 FAIL** (14 checks §6, varios con sub-checks); grid_eval 13/13 local con skips (fichero intacto, precedente 039).
- Warnings locales 0 pre/post (+0/−0, sin -Wall; los 12 del sandbox los verifica GLM). G6/G8: 0 URLs/hosts, 0 pacing (módulo std; App: solo string/snprintf-%d).
- Exe detenido para el build (sin run vigente que interfiera).

## LECCIÓN 039 pre-push (cumplida, con 2 hallazgos de método)

1. CR en delta: **35** (ctx/DEL de zonas CRLF; nuevos LF 0) — `format-patch -o` + copia binaria, jamás strings PS.
2. `am --keep-cr` sobre clon de dd985604: **limpio** (aviso menor: 2 líneas con trailing whitespace, sin efecto), numstat declarado, **write-tree `75502daf` == rama** (sin cirugía).
3. Incidencia de base (resuelta append-only en la rama): mi primer commit (05ca25c) se construyó por error sobre la línea a1 (30007e1, verificado tarde: `write-tree` comparado contra mi propio log en vez de contra el árbol de la partición). Detectado por divergencia del trial-am; corregido con commit de purga (bdf845f→c41d67a) SIN force-push: la rama documenta el error y su corrección. Ritual reforzado: el `write-tree` previo a implementar debe IGUALAR el árbol-base de la partición, no el HEAD local.
4. Incidencia de lectura (clase 039): `git show X:path > f` por redirect PS escribe UTF-16 (ficheros basura NUL); `git show | python` por pipe fabrica CRs; `git hash-object` sin `-w` no guarda (cat-file falla). Regla bidireccional vigente: bytes solo vía `checkout`/`-o`/copia/`subprocess`.
