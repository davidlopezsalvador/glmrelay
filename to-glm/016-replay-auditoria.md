# 016 — Auditoría M-irtam-replay (SIN CÓDIGO, base `c61f2c1a`)

Auditoría pre-write del último backlog (precedente F2-R2): estado medido del replay actual + Q1–Q7 con recomendación. Nada se escribe hasta el ruling.

## Estado medido (anclas re-pinadas post-B0/B1, poblaciones: líneas App.cpp)

- Replay = `tecHist` cap 72 (App.cpp:2463, prune oldest) ≈ 24 h a ~20 min/frame; `tecCacheMaxAgeH 24.0` (:307); `replayPos` fraccionario con lerp i0/i0+1 (:1616-1630, `replayEpoch` interpolado); slider `Frame` 0..nfr−1 + etiqueta `%H:%M UTC` + Play/Pause/speed (:4207-4226); `TimelineBar` es stub (UI inline).
- IRTAM en replay: congelado declarado al bucket fresco (C9/G9 literal en :1727-1729, ramas 8/9 y 10/11 en :1682-1760); gate F/H en :1190 intacto; par B0×B1 en :1235+; selector 10/11 en :2025/3105; badge 8-11 en :3102+.
- Caché IRTAM: cap 96/param (~24 h TOVs), buckets ~18 KB → ~7 MB/param hoy.

## Q1 Ventana — recomendación (b) propia por capa

- (a) Global 24→96 h: tecHist 72→288 (×4 memoria ~6 MB + preload red ×4) + `tecCacheMaxAgeH` + slider intacto. Arrastra a TEC/GIRO a una ventana que no necesitan.
- (b) **Propongo**: ventana propia IRTAM 96 h; TEC/GIRO intactos 24 h; fuera de su ventana cada capa clampa al borde + nota honesta (epistémica 009). Aritmética: 96 h a 15 min = 384 TOVs.

## Q2 Profundidad — vía sondeo (el PDF no dice)

- `GAMBIT_CoefficientsMessageFormat.pdf` (2017, 364.008 B): solo formato Jones-Gallet, **cero líneas sobre retención/historial**. Lo único probado: últimos 3 días NO disponibles (E11, en vivo).
- Propongo sondeo declarado: 12 TOVs spot (7/14/21/30/45/60 días × foF2) ≈ 12 req ≈ 3 min de tráfico a 1/15 s, pacing intacto. Si el servidor corta antes, la ventana se fija al corte medido.

## Q3 Tráfico — tabla (pacing intocable)

- Ventana 96 h = 384 TOVs × 4 params = **1536 req ≈ 6,4 h frías** a 1/15 s (vs 384 req/96 min aprobados Q5-B0B1). Steady idéntico al actual (slots nuevos). Memoria red: reutiliza backfill resumible P2.

## Q4 Caché

- Cap 96→384/param: ~27 MB + metas en disco (cierre aritmético patrón 015), prune mismo shape, familias disjuntas intactas.

## Q5 Muestreo

- Lerp por TOV al `replayEpoch` (molde tecHist fa/fb) sobre buckets del par; gate de parejas (`commonTovEpoch` + `evalPairGrids`) evaluado **al epoch muestreado**, no al fresco. La nota frozen se reemplaza por etiqueta `retrospectivo @ <TOV>`; el literal C9/G9 se actualiza (sigue habiendo 0 solape 24 h/72 h en ventana 24 h; en ventana 96 h el solape es total por diseño).

## Q6 TimeBar

- Rango = unión (96 h); ticks por día; tooltip con TOV; capas de 24 h clampan al borde con nota; badge DATA-age con el TOV muestreado (no el fresco).

## Q7 Tests

- Oráculos hour=12 intactos; helper puro de bracket+lerp con reloj simulado (estilo G8); par-fallido al epoch muestreado por test; ctest acumulado.

## Línea de parada (heredada)

Si el sondeo Q2 o la implementación exigieran tocar pacing/M4/sello, se para antes de escribir.
