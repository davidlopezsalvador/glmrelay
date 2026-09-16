# 028 — Paquete M-irtam-replay ESCALONADO (veredicto 026): bracket + render-lerp + memo

Fichero: `to-glm/files/replay028delta.txt` (31.245 B, SHA-256 `C3CBAEDB32491EE0ADDB62F4A8777C3A90BFF0446993D6FED73253E6EF837583`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit:** `6a2cbf0` — `M-irtam-replay-028: bracket entregado + render-lerp + memo scan/TOV`. Tree `32a902c57fd1dd71e9762cccfb119efcda77b4a8`, padre `7206b4f` (drop 025). Titular (`git diff --shortstat`, lección 010): **5 files changed, 335 insertions(+), 146 deletions(-)**. Numstat: App.cpp 240/145, App.h 14/1, IrtamState.cpp 33/0, IrtamState.h 18/0, test_irtam_state 30/0 (= 335+/146- exacto).

## Las 3 piezas (un solo drop)

- **Bracket entregado**: el worker evalúa endpoints del bracket (reutiliza `pairBracketTovs` testeado) y guarda `{gA0,gA1,gB0,gB1,t0,t1}`; `sampleIrtamPairAt`/`consumeIrtamSample` eliminados (aserción estructural: `sampleIrtamBracketWorker` solo en def + worker).
- **Render-lerp por cursor**: `lerpBracketGrid` (~µs, wait-free) en las 4 entradas (update 8/9 + 10/11 con clamp-color B0 preservado, applyColorLayer 8/9 + 10/11); badge nombra el TOV del bracket más cercano al cursor.
- **Memo App-level** (IrtamCoeffCache intacto): índice scan por mtime (ante cualquier duda, full `loadCached` con heal/prune) + rejillas por TOV FIFO cap 16 (~132 KB); endpoints compartidos entre brackets consecutivos se reutilizan. Solo-worker, sin locks.

## Gates

- ctest global **20/20** (state 50/50: 44 + 6 `pairBracketTovs`; oráculos intactos). TUs: 56. Warnings: clases idénticas al baseline (1 `param` sin usar detectado y eliminado antes del commit).
- G6: 0 literales URL. Publish/fetch/cache/parse/eval/M4 intactos (cero hunks). O1 (`epoch` local en radio) NO tocado (fuera de la lista taxativa, pendiente declarado).
- EOL: 473 CRs, población = todas las líneas del delta en la sección App.cpp (fichero CRLF-mayoritario; resto LF +0).
- Anclas por `grep -n` final (lección 024), poblaciones: líneas App.cpp — gate F/H :1411, commonTov :1456, consume 8/9 :2041, consume 10/11 :2065, applyCL 8/9 :3002, applyCL 10/11 :3033, Zone: :4483, DATA :4486, busy :4646, replayEpoch :4673.
- Re-medición: miss antes ≈ 0,5-1 s en render (021); miss ahora = memo-hit ~150-250 ms en worker + render ~µs (lerp 2×2070). Prueba viva del presupuesto en premiere (drop siguiente).
