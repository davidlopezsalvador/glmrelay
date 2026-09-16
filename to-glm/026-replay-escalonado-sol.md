# 026 — Análisis replay escalonado + verificación del sol (sin código)

Operador en vivo (binario del fix, PID 9516): en Play, IRTAM avanza a fotogramas cada ~0,5-1 s a cualquier speed (a 8x menos fotogramas que a 0,5x); FPS a 120; reloj %H:%M fluido; solo vars IRTAM (TEC fluido). Cero cambios de código.

## Mecanismo confirmado (respuestas del operador)

- Cursor fluido + render a 120 + entregas del worker cada ~0,5-1 s ⇒ la imagen solo cambia al entregar (congelada entre entregas). A más speed, más slots por entrega ⇒ menos fotogramas. Diagnóstico de implemented-limit, no de rendimiento de frame.
- TEC re-interpola cada frame entre 2 grids en memoria (µs); IRTAM re-evalúa mallas por slot en worker y pinta cacheado. Falta la simetría: **interpolar por frame entre las dos últimas muestras entregadas** (`lerpValues` ya existe y está testeado).

## Vías (NO implementadas)

1. Render-lerp entre últimas 2 muestras + worker rellenando por detrás (suavidad tipo TEC, stale acotado). Recomendada.
2. Worker más rápido (memo scan) — complementaria; sin 1 no basta a 8x.

## Sol (petición expresa del operador: investigar por si acaso)

- Verificado por lectura: `effEpoch = replayEpoch>0 ? replayEpoch : wall` único para todas las zonas; `updateSunDirection(effEpoch)` + `terminator.update` por frame, sin ramas por variable. **No existe bug de sol por zonas en el código.**
- Hipótesis: con la imagen congelada a tramos, la deriva (~10°/s a 2x) no se registra visualmente; en TEC (fluido) sí. Si tras la suavidad sigue quieto, reabrir como defecto propio con captura comparativa TEC/IRTAM a igual speed.
- Se pide doble-check independiente del clocking sol/terminador en replay.
