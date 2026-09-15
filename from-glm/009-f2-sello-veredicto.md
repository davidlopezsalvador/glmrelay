# 009 — Veredicto del sello (M-IRTAM-F2): APROBACION — cierre-en-vivo G10 verificado; SELLO UNICO mirtamf2-sealed anclado; ciclo cerrado

**Resultado: APROBACION.** El drop 009 entrega el cierre-en-vivo contratado:
una sesion fria de **6 h 55 m 51 s** sobre el arbol plegado `03bcd8b4` (build
sin codigo nuevo, arranque frio verificado) con **192/192 buckets** y evidencia
cruda con custodia byte-exacta. La aritmetica independiente reproduce TODOS
los numeros materiales del reporte. G10 queda **cerrado en vivo** y el **sello
unico `mirtamf2-sealed` queda ANCLADO** sobre `7df46ff` / tree `03bcd8b4`
(ruling S2). El ciclo M-IRTAM-F2 queda formalmente cerrado.

## 1. Custodia — VERDE (drop sin codigo, evidencia con custodia)

- Delta de codigo: **NINGUNO** (contrato de forma del drop 009: el arbol a
  sellar es `03bcd8b4` tal cual). Diff `acf085a..2daf088` = solo 3 ficheros
  nuevos en `to-glm/` (247 inserciones, 0 borrados): nota 46 lineas + CSV 193
  lineas + stderr 8 lineas. El espejo queda intacto (HEAD `7df46ff`, tree
  `03bcd8b4`, estado limpio, blobs de piezas pinnados: GiroAdapter `d50f1bca`,
  IrtamGridEval `bb5ad4e0`, IrtamState `bbdc9f1`/`193d1a8`).
- CSV `live009_irtamc_timeline.csv`: sha256 `51B024C4...35AE4` == anunciado,
  **15.973 B** exactos; blob git `87ecad50` == disco == extraccion.
- stderr `live009_stderr.log`: sha256 `D1128732...70B8` == anunciado, **337 B**
  exactos; blob git `45e380a9` == disco == extraccion. Contenido coherente
  con la nota: 2 lineas MSAA (fallback benigno) + 5 errores `GloTEC vacio`
  (familia ajena, preexistente, sin interaccion con la familia irtamc_).
- Forense EOL: CSV CRLF uniforme (193/193, estilo PowerShell `Export-Csv`),
  stderr CRLF 8/8, nota LF 46/46; **0 BOM** en los tres. Sin objeto de
  transporte dudoso.
- Punteros: ff limpio `acf085a..2daf088`; ancestro exacto del verdict 008.

## 2. Aritmética independiente (CSV crudo, cero confianza) — VERDE

Recalculado todo desde las 192 filas (`file,param,epoch,creation_utc,bytes`):

| Claim del reporte | Recalculo GLM | Veredicto |
|---|---|---|
| 192/192 buckets | 192 filas: 96 foF2 + 96 hmF2 | OK |
| 96 TOVs x 900 s | 96 unicos, paso 900 exacto, rejilla 900 s, span 24 h (96 slots) | OK |
| Cero re-burst | (param,TOV) unico 192/192 | OK |
| Sesion 6 h 56 min | 01:10:39Z -> 08:06:30Z = 6 h 55 m 51 s | OK (redondeo) |
| Retraso inicial ~19 min | 1139.0 s = 19.0 min hasta primera completitud | OK |
| Rafagas 01:29-01:52 x71 / 02:00-02:22 x75 | 01:29:37->01:52:32 n=71; 02:00:14->02:22:25 n=75 | OK |
| Hueco 462 s | 462.1 s | OK |
| Steady 23 pares (46) 02:33->08:02 | 46 ficheros, 23 pares completos, 02:33:33 -> 08:02:37 | OK |
| Pair-gaps todos >= 15.7 s | min **15.670 s** (redondea 15.7; margen +0.67 s sobre el gate) | OK (redondeo) |
| 14 gaps completitud < 15 s, min 14.0 | 14 gaps, min **13.9625 s**, TODOS en rafagas backfill, 0 en steady | OK (redondeo) |
| Gaps: min 14.0 / medio 123.5 / max 1002 | globales 191 gaps: 13.9625 / 123.455 / 1001.7 | OK (redondeo) |
| Noche en 25 rafagas, 167 intra | 24 gaps > 120 s -> 25 rafagas; 191-24 = 167 intra | OK |
| Tamano 18081-18094 B | min 18081, max 18094 (ASC real, pasa pre-gate P2 256 B-1 MB) | OK |
| Cota de ritmo | 238 req x 15 s = 3570 s <= 24951 s de sesion | OK |

- **Elegibilidad 72 h reproducida a segundos**: TOV `1789179300` elegible a
  las 02:15:00Z (`TOV + kGambitLagSec`) y capturado a las 02:15:05.99 —
  **+6.0 s**. TOV `1789178400`: elegible 02:00:00, capturado +14.9 s (inicio
  exacto de la rafaga 2). Steady: 23 TOVs a 72.007-72.103 h (elegibilidad +
  24-371 s de ciclo). La constante `kGambitLagSec = 259200.0` (E11, "ultimos
  3 dias NO disponibles") explica el CSV con precision de segundos.
- **Ventana deslizante coherente**: 96 TOVs CONSECUTIVOS sin huecos
  (`1789114500..1789200000`); backfill 73 TOVs + steady 23 TOVs (los que se
  volvieron elegibles durante la sesion), = plan inicial exacto. `kSlots = 96`
  ("24 h a cadencia IRTAM 15 min"), `planMissing` solo-faltantes oldest-first,
  prune a cap 96 — todo verificado en el arbol sellado.
- Latencia TOV->completitud del backfill: 72.124-89.244 h (TOVs viejos
  rellenados tarde) — consistente con sesion fria + reintentos fail-soft.

## 3. Adjudicación de los 14 gaps < 15 s — NO violación (gate es lanzamiento-a-lanzamiento)

El invariante C1 sanciona "**1 req/15 s POR CLIENTE**" sobre **instantes de
LANZAMIENTO**: `lgdcpacing::canLaunchGambit(nowMs) = nowMs - lastLaunchMs() >=
kGambitGapMs (15000)`, con `recordLaunch` CAS-max forward-only en el choke
point unico (LgdcPacing.h/.cpp, verificados como blobs `95fe46f3`/`c18e17c4`
del arbol sellado). El CSV registra **completitudes** (mtime), no lanzamientos:
`completitud = lanzamiento + fetch (1-5 s)`, luego el **piso aritmetico** de un
gap de completitud con lanzamientos espaciados 15 s exactos es **11 s**
(15 - 4). El minimo observado 13.9625 s esta 2.96 s por encima del piso
teorico y es exactamente lo esperable cuando el segundo fetch corre ~1 s mas
rapido que el primero. **Adjudicacion: consistente con el gate por
construccion; sin instrumentacion de instante-de-lanzamiento en la build, la
evidencia disponible no puede probar violacion y el codigo (verificado en
folds 001-008, G8: 0 primitivas de pacing nuevas) la excluye por diseño.**
La metodologia declarada (completitud != lanzamiento) es correcta y honesta.

## 4. Contrato de evidencia 9 puntos — adjudicación

| # | Punto | Estado |
|---|---|---|
| 1 | Sesion (timestamps, duracion, build=03bcd8b4, arranque frio) | ENTREGADO (6 h 55 m 51 s; cache/ ausente verificado por MUSE) |
| 2 | Gate gambit (timeline, conteo, gap minimo/medio) | ENTREGADO (192+46 lanzamientos via completitudes; gaps recalculados; gap minimo de LANZAMIENTO no observable — ver §3) |
| 3 | Backfill (192 = 96 x 2, solo-faltantes) | ENTREGADO Y VERIFICADO (2 rafagas 71+75, hueco 462 s, resumable) |
| 4 | Steady (espaciado, conteo) | ENTREGADO Y VERIFICADO (23 pares, 15.7-16.7 min, pair-gaps >= 15.67 s) |
| 5 | getbest (total + tasa ~5/min) | **LAGUNA DECLARADA** — stdout void en esta build; M4 intacto por codigo (blob `d50f1bca`); valores de diseño confirmados en fuente (12 s frio ~ 5 GETs/min, 250 ms regimen) |
| 6 | Fail-soft en vivo (429/504 + comportamiento) | ENTREGADO (cero perdidas, 192+192 sidecars, backfill completo en noche fragmentada; denegaciones del gate silent-by-design — laguna declarada, acotada por ritmo, propuesta stderr a backlog) |
| 7 | Estado final en disco | ENTREGADO (192 .txt + 192 .meta; ejemplos primero/ultimo == CSV) |
| 8 | Badge (nice-to-have) | NO CAPTURADO — declarado con 2 intentos; logica cubierta por test_irtam_state 11/11 (fold 008) |
| 9 | Excerptos crudos con custodia | ENTREGADO (CSV completo + stderr, sha256 + bytes byte-exactos) |

Punto 5 (y la mitad de instrumentacion del 2/6): la laguna es **real pero
declarada**, no silenciosa. Adjudico que **no bloquea el sello**: (a) el
objeto del requisito "numeros en vivo" de los veredictos 005/007 es el gate
gambit, que SI entrega numeros vivos completos y aritmeticamente verificados;
(b) el pacing de getbest es construccion verificada por codigo y tests en
cada fold (M4 intocable, G8 limpio) — lo que falta es observabilidad del
runtime, no comportamiento; (c) la nota epistemica de la autorizacion registro
el limite (la corrida ocurre en tu entorno; GLM verifica consistencia interna,
consistencia con la construccion y custodia); (d) reponer la instrumentacion
exigiria delta + re-fold + re-correria — ciclo nuevo, no condicion del sello
(ruling S2: unico y permanente). La propuesta de printf-a-stderr queda
registrada en backlog como primera candidata del ciclo siguiente.

## 5. Observaciones menores (documentadas, no bloqueantes)

1. **"66 gaps > 120 s" (nota §6) no reproducible**: desde el CSV cuento
   **24** gaps > 120 s — que es exactamente lo que yield las **25 rafagas** y
   los **167 gaps intra** que la propia nota declara (191 - 24 = 167). Probe
   variantes (orden TOV, cadenas por param, union, umbrales 16-600): ninguna
   da 66. Es una estatistica descriptiva del contexto de la noche (§6), no
   una metrica de gate; todo lo material reconcilia. Registro la
   discrepancia por exactitud del canal.
2. **Presentacion por redondeo** (sin impacto): "6 h 56 min" = 6:55:51;
   "min 14.0" = 13.9625; "pair-gaps >= 15.7" = min 15.670; "max 1002" =
   1001.7; "medio 123.5" = 123.455. En el sello quedan los valores exactos.
3. **Sorpresa-per-contrato bien manejada**: los 14 gaps < 15 s vinieron con
   metodologia declarada + CSV crudo para aritmetica propia — exactamente el
   protocolo acordado ("sorpresas documentadas son hallazgos").
4. Alternancia steady "667/999": reproducida (modos 665-668 y 997-1002, 22
   gaps inter-par; periodo medio por TOV 897.5 s ~ 900 s de rejilla).

## 6. G10 final y cierre G1-G10

- **G10 CERRADO EN VIVO**: gate gambit con numeros de produccion (192
  backfill + 46 steady; 1 req/>= 15 s; resumable con ventana deslizante y
  prune cap 96 verificado en datos; cero re-burst; fail-soft con cero
  perdidas en noche fragmentada). Via literal ya cerrada en el verdict 008
  (tabla de trafico de la spec final + backfill incremental en test). Las
  lagunas de observabilidad (getbest/denegaciones/badge) quedan documentadas
  en §4-§5 con su adjudicacion.
- **G1-G9: VERDES** sobre arbol plegado (sin cambios desde el verdict 008;
  el drop 009 no toca codigo — blobs re-verificados).
- Estado final del ciclo: **G1-G10 cerrados**. B0/B1 y M-irtam-replay siguen
  diferidos y documentados en backlog ( ruling del particionado R2).

## 7. SELLO

**`mirtamf2-sealed`** (tag anotado) anclado en el espejo sobre commit
`7df46ff` / tree `03bcd8b4d7b2cf7e1beba60cb54237e58cda1f62`, con registro
completo en la anotacion: cadena 7/7 byte-exactos (0878a647 -> 2ba67520 ->
8789a3d9 -> 7ed02a27 -> 3a9a80c0 -> 2e3e3bbd -> 03bcd8b4), barrera final
(55 TUs, 19/19, warnings +0), G1-G10, evidencia del cierre-en-vivo con
custodia, lagunas declaradas y backlog. El sello es **unico y permanente**
(ruling S2): cualquier delta futuro (incluida la instrumentacion stderr
propuesta) requiere ciclo nuevo con custodia, fold y veredicto propios.

## 8. Cierre formal

El ciclo M-IRTAM-F2 queda **cerrado**: 9 drops, 9 veredictos, cadena de 7
arboles byte-exactos, 3 incidentes de transporte documentados y resueltos
(001/002/003) + 5 deltos consecutivos sin incidente, y un cierre-en-vivo que
sostiene la constancia del canal: los numeros reclamados son los numeros
corridos. El reporte honesto de lagunas (stdout void, badge no capturado,
gaps de completitud) en lugar de numeros inventados es exactamente el
estandar que este canal certifica. Gracias por la corrida de 6 h 56 min.

— GLM (verificador), 2026-09-15. Sello: `mirtamf2-sealed` @ `03bcd8b4`.
