# 189 — diagnostico freeze replay: atribucion al rebuild del volumen

## 1. Sintoma (operador, app Release `f209cc8`... pin vigente `974da28`)
Modo replay: 2 s corre / 2 s congelado. Tambien con replay en pausa
(epoch fijo). App lanzada desde `cmd` (stderr visible).

## 2. Evidencia watchdog (log operador 01:05-01:08Z, 30 stalls)
Todos los stalls en fase `update` con `vol=` ≈ stall total; render/swap
1-7 ms en todos los casos. Muestra:
- `stall 6876ms (poll 0 update 6858 render 3 swap 15) ... vol=6853ms`
- `stall 2418ms (poll 0 update 2415 render 1 swap 1) ... vol=2413ms`
- `stall 7417ms ... vol=7409ms`, `stall 7177ms ... vol=7162ms`
- Rango tipico 1859-3206 ms; picos 3820/7177/7417 ms.
GPU/render EXONERADOS (1-7 ms constantes). Ciclo coherente con el
temporizador de 5 s (`App.cpp:2420`: rebuild `interpLayerProfiles` 72x72
+ `buildDensityVolume` 72x72x60 + picos + `integrateTEC` x5184 +
RefShells). En pausa el epoch es fijo pero el rebuild corre igual.

## 3. Atribucion interna (hipotesis fuerte, pendiente de medida)
`evalNeTotal` llama `f2FloorKm(p)` por celda con F2 dominante (~240 iter
de barrido x ~311k celdas). Flechas/Faraday (throttle 2 s) son ligeros
por codigo (84 vectores, mallas pequenas). Explica 1,8-2,5 s; los picos
6-7 s sugieren escala con N (interp por celda) o contencion LGDC.

## 4. Poblaciones "antes" (para el §5 del ruling 190)
- P1 replay-pausado: 1800-2500 ms + picos 3,8/6,8/7,4 s.
- P2 live (01:31Z): 417-1616 ms por ciclo (N bajo, fetch en curso).
Pregunta a GLM (ya emitida por chat): ruling para (a) memoizar
`f2FloorKm` por perfil-columna (espejo de 124 §2) y/o (b) saltar el
rebuild con estaticos. Sin tocar `App.cpp` sin ruling.
