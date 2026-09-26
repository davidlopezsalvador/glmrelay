# 056 — O3 mini-evidencia: badge con magnitud en vivo (sin código)

**Sin delta de código** (árbol `559cdbb3`, binario `96d5c20`). Exe `LastWriteTime` **2026-09-26 17:01:01** (regla 033, antes de cualquier evidencia). Run PID 10820 con redirect desde el segundo cero (lección 040). Evidencia: `to-glm/files/ev056_o3_stale41h.png` (sha256 `8ED04908AC4591DA1EAE8895E2D6DD096083F2FA03B4763FBE8C9ADD3E2D5DE0`, 329194 B, 1296x758).

## Estado capturado (pausado, IRTAM foF2, unión, cursor 30.0 h)

- `Loop:` (unión 96 h) · slider `30.0 h` · `Zone: solo-TEC [T-72,T]` (vía unión intacta).
- **`DATA 09-23 15:26 UTC(stale, +41.9 h)`** — magnitud visible en la misma línea, sin wart.
- Coherencia aritmética: banda IRTAM [T−96,T−72], cursor a 30 h → gap = 72−30 = 42 h menos ~6 min de deriva de sesión = **41.9 h** ✓. Sin worker (sin sufijo worker, correcto: muestra clampeada, no worker en curso).
- IRTAM badge: `sin datos en este instante (replay)` (grid sin muestra al cursor; coherente con DATA clampeada al borde).
- Bloom nominal (0.550), noche, malla dibujando. Sin overlay salvo watermark del SO.

## Nota de método

Cursor posicionado por David a mano (mis clics sintéticos no llegan a botones Timeline — precedente 046; ffMPEG de método intacto: captura y métrica mías). Primer intento (foF2@30h) dio `(stale)` plano — correcto por diseño (dato más nuevo que el cursor, gap 0); el caso con magnitud requiere dato más viejo que el cursor (IRTAM@30h). Ambos estados observados en la misma sesión.
