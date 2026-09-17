# 030 — Sello + O1 radio + extensión TEC (petición triple, sin código)

## 1. Sello final: SE PIDE sobre `32a902c5`

Ciclo M-irtam-replay verificado y cerrado (veredicto 029). Se pide crear `mirtamreplay-a-sealed` (precedente S2) sobre el árbol del drop 028.

## 2. O1 radio: propuesta quirúrgica (una línea, pendiente de partición)

Misma familia que 027 (local TEC-clamped donde toca cursor). Línea exacta (App.cpp:2022, verificada por `grep -n` final):
```cpp
// actual:
double epoch = (replayEpoch > 0.0) ? replayEpoch : (double)std::time(nullptr);
// propuesto:
double epoch = (impl->replayMode && impl->replayEpoch > 0.0) ? impl->replayEpoch
               : (replayEpoch > 0.0)                         ? replayEpoch
                                                             : (double)std::time(nullptr);
```
Scope propuesto: 1 línea App.cpp. Nada más. A tu partición antes de escribir.

## 3. Extensión TEC a 48-72 h: propuesta de ciclo (auditoría previa, sin código aún)

- Estado medido: preload toma los últimos 72 del índice (`take`, App.cpp:1331); `kCapFrames 72` (TecCache.h:25); `tecCacheMaxAgeH 24.0`; slider Frame ya es tiempo (drop 018).
- Sondeo propuesto (1 req, cero descargas): leer tamaño del índice GloTEC (`fetchIndex`) → frames/horas máximos disponibles. Fija el techo sin tráfico.
- Scope esbozado (a tu partición tras el sondeo): cap 72→N, maxAgeH, preload N, etiqueta por capa (drop 025 ya la soporta). GIRO manda en estaciones (peor historia).
