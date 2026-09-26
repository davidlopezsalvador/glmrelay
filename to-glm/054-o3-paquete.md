# 054 — O3 badge con magnitud + ride-along ev* (código, partición 053 §3)

**Commit:** `96d5c20` - `O3 054: staleSuffix con magnitud + ev gitignore` (sobre master/a06215cc+matrix). Tree `559cdbb35a20c0152b651718d390506c236e0c85`, padre `84d2522`. Titular: **5 files changed, 96 insertions(+), 3 deletions(-)**. Numstat: .gitignore 3/0, App.cpp 4/3, IrtamState.cpp 31/0, .h 10/0, test 48/0 (= 96+/3-, en orden 100-140).

Fichero: `to-glm/files/o3054delta.txt` (8277 B, SHA-256 `1745D2C3788134DD3099AE2653C966C34FC6AFB5E69008F37DF8C6A4B46F4324`, `From 96d5c20` sin BOM, `format-patch -o` + copia binaria).

## Alcance (§3 + hunk .gitignore)

- `LayerDataTime.gapSec` (cursor−dataEpoch si stale, ≥0) computado en `clampToRange` (un cálculo por camino; 0 en fresco/sin-dato/por-delante).
- Helpers puros `staleGapText` (escala con wart 3599→`+59 min` / 3600→`+1.0 h`, tope anti-UB, coma ASCII) + `staleSuffix` (`""`/`(stale)`/`(stale, +X)`/`(stale, worker)`/`(stale, +X, worker)`; worker acotado por el llamador a 8-11).
- App.cpp UN sitio: rama stale → `"DATA %s%s"` + suffix (fresh byte-idéntica); tooltip + «distancia del cursor» + «worker». `badgeLine/badgeSampled/zoneForAge/zoneName/perLayerZoneName/layerLoopRange` intactos.
- Test: sección «O3-053» con 11 checks (bordes 3599/3600 + end-to-end gap 8h), **cero flips** (65 byte-idénticos → 76/76).
- `.gitignore`: +3 líneas (comentario + `/ev*.log` + `/ev*.png` anclados), LF 53→56. PNG incluido por recomendación GLM (sin objeción de David).

## Poblaciones / pines / EOL (medidos en blob)

- `staleSuffix` 13 · `staleGapText` 7 · `gapSec` 19 · `(stale` en App 6→5 (migra el literal DATA; 5 preexistentes intactos: comentarios/SDO/DATA-LIVE) · «distancia del cursor» 1 · `worker` 59 (src).
- Intactas: `layerDataTime` 16 · zoneForAge 11 · zoneName( 5 · perLayerZoneName 12 · solo-TEC 2 · TEC+IRTAM 5 · buf[64] · ProviderStatus.* · CMakeLists (sin TU nueva).
- EOL: IrtamState.h/.cpp y test añadidos LF-100% · App líneas nuevas LF (isla) · DEL con CR medidos **d=3** (no 4: TextDisabled stale 2 + tooltip 1) → App 5117/1874 · .gitignore 56/0.

## HALLAZGO de contrato (discrepancia adjudicable, documentada)

La tabla §3 lista `"(stale, +90 min, worker)"` pero la escala normativa (§3: ≥3600→horas, con wart 3599/3600) da 90 min = 5400 s → **`+1.5 h`**. Implementada la escala (tests 4/6 esperan `+1.5 h`; el +45 min cubre la rama minutos). Si el veredicto quiere el literal `+90 min`, es cambio de escala, no de código.

## Barrera local

- clean-first + ctest global **21/21**; state **76/76 0 FAIL** (65+11 nuevos); resto pins (tec_cache 29, lgdc 9, provider 19, grid_eval 13 local).
- Warnings 0 pre/post (+0/−0, sin -Wall; los 12 los verifica GLM). G6/G8: 0 URLs, 0 pacing.
- Incidencia: build inicial falló por helpers dentro de `namespace` anónimo (link) — movidos a scope irtamstate; y exe bloqueado por PID vivo (cerrado para build).

## LECCIÓN 039 (cumplida)

1. CR en delta: **15** (ctx/DEL de zonas CRLF; nuevos LF).
2. `am --keep-cr` del delta ENVIADO sobre clon de la base: **limpio**, numstat declarado, **write-tree `559cdbb3` == commit** (sin cirugía).
