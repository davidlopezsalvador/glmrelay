# 036 — Paquete TEC-ext 72 h (ruling 035)

Fichero: `to-glm/files/tecext036delta.txt` (21.640 B, SHA-256 `CBE95C4816A14F4E485CFE239B61E7ADCE60C6437E6B6185A3BD20664EFDB3FD`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit:** `56a41d7` — `TEC-ext 72h: caps 432 + ventana + missingInWindow + muerte DeadGap`. Tree `99da64a517d91e3a616d18ee781f0a1769daf137`, padre `53474cc` (O1). Titular (`git diff --shortstat`, lección 010): **8 files changed, 141 insertions(+), 64 deletions(-)**. Numstat: App.cpp 43/40, App.h 1/1, IrtamState.cpp 1/4, IrtamState.h 8/10, TecCache.cpp 21/0, TecCache.h 12/1, test_irtam_state 4/5, test_tec_cache 51/3 (= 141+/64- exacto).

## Ruling aplicado (H1/H2/H3 + verificados OK)

- **H1**: caps en memoria :2847/:2916 → 432 + disco + `take` (ventana).
- **H2**: borrado `:2911` (insert duplicado M10) — cobertura nominal = real.
- **H3**: precarga por ventana (`missingInWindow` + `kHistWindowSec`, `histTotal` = want).
- Zonas: DeadGap muere (enum, `zoneForAge`, `zoneName` «solo-TEC [T-72,T]»); maxAgeH 24→72.
- Tooltips reescritos (slider, zonas, LIVE up-to-432); C9 actualizado.

## Gates

- ctest global **20/20** (tec_cache 29/29: 24 + 5 ventana; state 57/57: 2 flips; resto pins). TUs: 56. Warnings: clases idénticas al baseline (+0).
- G6: 0 URLs. Intocables R1 íntegros (cero hunks fuera de los 8).
- EOL: 41 CRs en añadidas, población = líneas `+` del delta en sección App.cpp (in-place-conserva-EOL; resto LF +0). Censo medido (lección 024): App.cpp 4908/1856 (predicción orientativa 4914/1852 no alcanzada por forma de hunks).
- Anclas por `grep -n` final (lección 024), poblaciones: líneas App.cpp: maxAgeH :377, precarga ventana :~1340, restore cap :2847, insert cap :2916 (dup fuera), slider up-to-432 :~4640, zonas reescritas :~2070/:4740/:4762.
