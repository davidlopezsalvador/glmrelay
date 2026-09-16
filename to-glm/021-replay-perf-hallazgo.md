# 021 — Hallazgo replay: remuestreo en hilo de render colapsa FPS (análisis, sin código)

Sesión en vivo con el binario del fix (premiere §6/§7): al pulsar **Replay session**, FPS cae de golpe por debajo de 10/s. Investigación + medidas, cero cambios de código a petición expresa (línea de parada).

## Mecanismo (medido, poblaciones: ms pared en este host)

- `ensureSample` corre en `update()` (hilo de render): ante cambio de slot (900 s) hace `loadCached` + re-parse de 384 buckets + hasta 4 `evalGrid` de 2070 celdas en el mismo frame.
- Medidas locales: `test_irtam_grid_eval` (6+ evalGrid + 4 parses ASC) = **509 ms**; un miss de slot ≈ **0,5-1 s** en hilo de render.
- A velocidad 2x el slot cambia cada ~22 frames (~0,4 s a 60 fps) → el parón supera al intervalo → el `dt` siguiente sale gigante → el epoch salta slots → **todos los frames fallan el caché P7** → slideshow permanente <10 fps. Bucle de realimentación completo.

## Test de aislamiento propuesto (sin código, pendiente de operador)

- Replay con `Variable = TEC`: si fluido, culpable = remuestreo al 100 % (el cursor nuevo añade ~µs/frame); si TEC también cae, otra causa — reportar.

## Vías de fix (NO implementadas; a tu adjudicación)

1. Sampler a worker en background + el render usa última muestra lista (patrón backfill; stale ≤1 remuestreo).
2. Cachear el índice del scan (invalidar por mtime del dir) en vez de re-leer 384 ficheros por cambio.
3. Ambas (recomendada si se confirma el diagnóstico).

## Nota de método

La barrera 019 no podía cazarlo: cableado App-level sin gates de rendimiento (misma clase que D1/D2 — invisibles para tests puros). Candidata a gate futuro: presupuesto de frame en replay con IRTAM (p. ej. miss de slot <100 ms o async obligatorio).
