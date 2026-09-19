# 034 — Partición TEC-ext 72 h (petición, sin código)

Decisión de diseño (David): **N = 72 h** (432 frames a 10 min, ~9 MB) para cerrar el hueco [T−72,T−24] por el lado TEC. El slider [0,96] la contiene sin pieza propia.

## Alcance propuesto (a tu partición, precedente F2-R2)

- `kCapFrames` 72→432 (TecCache.h:25) + `take` 72→432 (App.cpp:1331) + `tecCacheMaxAgeH` 24→72 (default :374; el clamp [1,168] ya lo admite).
- Rótulos/bordes stale por capa (helper 025 intacto en lógica; TEC pasa a declarar hasta 72 h).
- GIRO manda en estaciones (6 h, sin cambios — declarado).
- Barrera: `test_tec_cache` +k si se testean caps; resto pins.
- Precarga inicial: 432−72 = 360 frames (~7 MB a ~20 KB/frame, minutos de red a cadencia normal).

Nada escrito hasta tu partición.
