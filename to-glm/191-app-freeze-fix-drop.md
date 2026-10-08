# 191 — fix freeze replay (ruling 190): memo f2Floor (a) + guard (b)

## 1. Dominio verificado (condición (a), sin STOP)
`f2FloorKm(p)` lee SOLO `p`: NmE, hmE, hasE, NmF2, hmF2, B0, B1, hasF2
(`LayerProfile.h:70-97`). hKm, cosChi, flareFactor NO entran. Reuso puro
del valor por columna: misma función, mismas entradas, valor copiado.

## 2. (a) implementado
- `LayerProfile.h`: `evalNeTotalWithFloor` (réplica 1:1 + suelo pasado).
- `DensityVolume.h::buildDensityVolume`: tabla local 5184 suelos al inicio
  del build, descartada al terminar (cero staleness entre builds).
- TU `volume_memo`: naive (`evalNeTotal` por celda) vs memoizado,
  data[]+layer[] bit-exactas en 311.040 celdas × 3 combos
  (día early-out flare 1 / tilt flare 2,5 / noche sin-E). 9/9 OK.
- Tiempos TU (misma rejilla): naive 1481/1283/1304 ms →
  memo 66/71/87 ms (x22,3 / x18,0 / x15,0). Dominancia CONFIRMADA
  (el suelo era ~95% del build; x60 teórico no aplica: el floor solo se
  llama con F2 dominante y el early-out ya era barato).

## 3. (b) implementado
- Nuevo `Ionosphere/VolumeBuildKey.h` (puro, testeable sin App): clave
  enumerada = volEpoch + sunDir xyz + f107 + flare + huella FNV-1a de
  TODA la fuente (n + por estación: code, lat/lon, foE/foF1/foF2, hmF2,
  nmF2, B0, B1, fmin, timeUtc, valid, stale, cs + historia completa) +
  sourceBits (kc2gMode/replayMode/cache-no-vacía). Igualdad exacta de bits.
- `App.cpp` (bloque 5 s): calcula la clave ANTES de interpolar (flare
  movido arriba, reorden puro); si igual y hay build previo → skip total
  con `watchVolMs = 0.0`; si no → rebuild y arma la clave.
- TU `volume_guard`: 15/15 (sin previo→rebuild; 6 inputs sueltos + 7 de
  muestras/historia disparan; 13 ticks estáticos → 1 solo rebuild).

## 4. Tabla antes/después (§5)
| escenario | antes (logs operador, binario pre-fix) | después |
|---|---|---|
| replay-pausado | stalls 1800-2500 ms cíclicos, picos 3800/6800/7400 | PENDIENTE operador (esperado: cero rebuilds, cero stalls) |
| live | stalls 417-1616 ms por ciclo | 45 s live, ~8 ciclos: **cero stalls >250 ms** |
| build puro (TU) | 1283-1481 ms | 66-87 ms |
Criterios: (ii) rebuilds vivos <250 ms todos los ciclos (p95<150 no
resoluble con el watchdog actual: solo reporta >250; sin log dedicado no
afino); (iii) cero stalls UI>200 en la ventana medida. (i) lo confirma el
operador en replay-pausa.
N-scaling: el build es N-independiente por construcción (rejilla fija
72×72; N solo entra en la interp). Los picos 6-7 s pre-fix no quedan
explicados del todo (contención LGDC en la ventana); si sobreviven en
replay con N alto, manda el §4 (backgrounding, ruling aparte).

## 5. Barrera y custodia
- `ctest`: 31/31 (29 previos sin flips + volume_memo + volume_guard).
- Build Release limpio; sin warnings nuevos en la salida (baseline de
  warnings pre-fix no capturada — declarado).
- Scope taxativo: `App.cpp` (guard) + `LayerProfile.h` (helper) +
  `DensityVolume.h` (tabla) + `VolumeBuildKey.h` (nuevo) + 2 TUs +
  `CMakeLists.txt` (registro). Nada más. Sin backgrounding (no autorizado).
- Evidencia D187 protegida: TU memo = volumen post-fix bit-idéntico.
- Pin app: `974da28` → este fix (working tree; avanza al commitear).
- §4/188: veredictos 186/188 llegaron por chat sin fichero en relay; las
  dos líneas pendientes no identificadas en el árbol — GLM confirma si
  queda algo por viajar.
