# 319 — Petición mini-ruling: UI del shell #10 West Ford (eco 2026 + anillo 1963 + panel)

Precedente 299/311. F2b #10: motor verificado (314) · puerta resuelta (315+316) · capa de datos aceptada (317+318). 316 §4.8 autorizó que el anillo (historia + eco + fusión) vaya en un drop posterior; esto abre ese drop. Sin código nuevo aún (ruling-first). Pre-tree = post-317 (aceptado en 318; el scratch GLM ya queda en post-317).

## Recon de hoy (hechos, sin propuesta)

- **UI**: `page.tsx` (707 líneas) orquesta escena three.js (0.185 + UnrealBloom) + 23 paneles HUD con polling por TTL; `LayersPanel` con 21 toggles; las capas son Groups con build/update por datos (patrones `belts`/`dstloop`); fps vivo en el propio panel.
- **Motor cliente listo**: `src/lib/iono/sgp4/` (Vallado `sgp4init`/`sgp4`, `parseTle`/`twoline2rv` con checksum estricto, `teme2ecef`/`ecef2geodetic`) — sin red, verificado en 314.
- **Ruta viva**: `/api/satellites` (317) — payload `{source, sourceLabel, attribution, fetchedAt, count, dropped, records}`; TTL 6 h; snapshot 15.927 / SatNOGS 1.733.
- **Medición de hoy** (bench propio, Node V8, snapshot real de 15.927, sin recortes): `sgp4init` ×15.927 = **457,5 ms** (28,7 µs/sat, 0 errores init); barrido `sgp4` completo (15.927) = **31,2-52,4 ms primero / 31,8-40,0 ms en caliente** (2,0-2,5 µs/sat, 0 errores) a tsince 0, +30 y −30 min.

## Q0. Alcance del drop

(a) eco 2026 3D + anillo 1963 declarado + panel/etiquetas honestas; **fusión/time-lapse 1963→2026 diferida** a sub-drop posterior. (b) solo eco + panel; anillo después. MUSE recomienda (a). ¿Ruling?

## Q1. Eco 2026: render y propagación (con las mediciones de arriba)

Propuesta: THREE.Points (patrón `belts`); satrecs precomputados al cargar (457 ms, en chunks para no bloquear el primer frame); propagación **time-sliced ~3 ms/frame** (≈1.200 sat/frame a 60 fps → barrido completo cada ~0,2-0,3 s; staleness ≤ ~2 km = 0,0003 u. escena, invisible); posición = `sgp4(tsince = epochEscena − epochTLE)` → TEME → `teme2ecef(gmst)` → convención ECEF→escena existente (la de estaciones/enlace); epochEscena = reloj vivo/replay (determinista en replay, sin fetch). ¿Presupuesto 3 ms/frame o N fijo? ¿Oráculo extra para la conversión a escena (p. ej. contraste round-trip con `ecef2geodetic`)?

## Q2. Anillo 1963 (reconstrucción declarada)

Propuesta: banda de partículas dorada a ≈3.600 km, inclinación ≈87° (declarado), sin órbitas individuales (nube paramétrica — no hay TLEs 1963 y no se inventan), opacidad baja, etiqueta **permanente** "West Ford 1963 — reconstrucción declarada (sin datos vivos)" en panel y en `Legend` o etiqueta on-canvas. ¿Forma (banda de partículas vs torus translúcido)? ¿Dónde vive la etiqueta?

## Q3. Contrato de honestidad del panel

Propuesta: `SatellitePanel` muestra `sourceLabel` EXACTO del payload (incluidos `SatNOGS (live)` y `snapshot 2026-10-17 (no live)`), `count`/`dropped`, atribución íntegra, `fetchedAt`; estado `unavailable` = "sin datos" explícito (nunca capa muda); toggles nuevos en `LayersPanel` ("Eco 2026", "Anillo 1963"); polling del cliente con TTL 6 h == ruta (patrón voyager). ¿Se acepta?

## Q4. Perf y gates

- Gates: tsc 0 · vitest 369 + nuevos (conversión TEME→escena con oráculo; contrato de etiquetas; cota de barrido) · build 0 · smoke local (capa on: fps sin regresión >10 % vs off; miss→hit; estados del panel).
- Benchmark: propongo cota holgada "barrido completo < 2 s" en test (anti-flaky; lo medido es 31-40 ms) y medición real en smoke. ¿Cota aceptada?
- 318 obs-1: el trade-off del primer miss (~26 s) se documenta en el README del shell en este drop (una línea).

## Q5. Plan de smoke/deploy

Igual que 317: smoke local primero; republicación del deploy por el operador vía panel z.ai cuando el drop esté aceptado, + smoke visual (rutas + capa visible + etiqueta). Sin pregunta salvo objeción.

— MUSE
