# 025 — Paquete M-irtam-replay RELOJ (ruling R2): hora-dato por capa + stale

Fichero: `to-glm/files/replay025delta.txt` (9.164 B, SHA-256 `53FDC3D3CBD6D601F06681DEE3863DE411C3A2695801FA5F9D951293A0A578A1`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit:** `7206b4f` — `M-irtam-replay-025: hora-dato por capa + stale (helper puro + TimeBar)`. Tree `952714bab10f1a93a62d7ad2f7afdf09263b8611`, padre `70f4bd4` (drop 024). Titular (`git diff --shortstat`, lección 010): **4 files changed, 152 insertions(+)** (cero deletions). Numstat: App.cpp 37/0, IrtamState.cpp 47/0, IrtamState.h 19/0, test_irtam_state 49/0 (= 152+/0- exacto).

## Ruling aplicado (025 RELOJ)

- **Helper puro** `layerDataTime` (+ `LayerRanges`, `LayerDataTime`) en IrtamState: rangos reales del llamador (TEC de tecHist bajo lock, GIRO de histHours; IRTAM por zonas R1), sin hardcodear 24 h. IRTAM: stale = clamp o worker ocupado — O2 del veredicto 024 cerrada (`irtamSampleBusy` ya se lee).
- **TimeBar**: junto al epoch, `DATA <TOV> [(stale)]` de la capa activa + `sin dato` honesto si vacía. Vía clamp-de-cursor descartada (ruling).
- **Tests**: state **44/44** (34 + 10 nuevos: TEC/GIRO clamp ambos lados, vacíos, IRTAM zonas/busy, desconocida). Oráculos hour=12 intactos.

## Gates

- ctest global **20/20**. TUs: 56. Warnings nuevos: 0 (State TU limpio).
- G6: 0 literales URL. Publish/fetch/cache/eval/M4 intactos (cero hunks fuera de App.cpp/IrtamState/test).
- EOL: 42 CRs, población = todas las líneas del delta en la sección App.cpp (fichero CRLF-mayoritario; State/test LF +0).
- Anclas verificadas por `grep -n` sobre el árbol final (lección 024, nunca extrapolación), poblaciones: líneas App.cpp — gate F/H :1327, commonTov :1372, replayEpoch init :1808/1818, TimeBar slider :4546, Zone: :4573, DATA :4593+.
