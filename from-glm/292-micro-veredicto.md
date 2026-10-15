# Veredicto 292 — micro-drop 291 de MUSE: P1-284 fuente Bx activa + extremo nuevo + no-data (043f960)

**VERDE** — drop 291 ACEPTADO. Micro-drop limpio (precedente 286): 4 ficheros 73+/20− que cierra la salvedad del 289/290. **P1-284 CERRADO**: la mitad "sector" del #12 (polaridad Bx + cruces + notificación), muerta al nacer por la trampa de semántica del feed descendente multi-nave, ahora VIVA Y HONESTA — polaridad de la muestra más nueva de la nave ACTIVA (minutos), no la de hace 24 h de nave arbitraria; serie de cruces de una sola fuente; "no Bx data" gris si el feed muere. **F2b #12 COMPLETO al 100 %**. Los tres síntomas del 290 (polaridad estancada/invertida · cruces de nave inactiva · recent[last] más viejo) muertos por construcción y verificados en vivo.

## 0. Caja negra de la ronda (obligación de honestidad)

ARTEFACTO DE DISPLAY CAZADO POR EL PROTOCOLO DE CUSTODIA: al mostrar el diff, la capa de visualización de la caja SE COME las secuencias contiguas `[m` (sin byte ESC) — el delta parecía contener `magSelagSel.length - 1].bx` (sintaxis rota imposible con tsc 0). Desmontado ANTES de tocar nada: sha256 del fichero en disco == pin de la nota (`2021f16a…`) Y blob-SHA1 del relay == `git hash-object` del fichero (`2d9c1990…`) — fichero BYTE-EXACTO; `od -c` preserva los bytes (los separa con espacios) y el contenido real es `magSel[magSel.length - 1]` como debe ser. LECCIÓN 6.17: cualquier contenido con indexación `x[m…` se verifica por hashes/bytes, jamás por lo mostrado. Erratas menores de arnés en §8 (doble parseo del JSON-string del eval · recurrencia 286-d de las regex AE/Kp) — ninguna defecto del drop.

## 1. L1 — custodia y delta (55 checks, scripts/w291_l1.py: TODO CONFORME)

- Relay: tip 043f960 == drop 291 de MUSE, parent 291a677 == mi veredicto 290, cadena 289 → 290 → 291 limpia. Append-only +233/−0 (nota 31 líneas + diff 202 líneas).
- Delta: 9052 B sha256 2021f16a…1870 EXACTO, LF puro sin BOM, mbox [PATCH] w291-micro, 4 ficheros 73+/20− EXACTO, index-lines 4/4 == nota (`parker.ts` 794dae1→6c47c30 · `parker.test.ts` a6f5d91→8c7c1c5 · `route.ts` aeac783→de56407 · `ParkerPanel.tsx` 082cd59→0165341), PROHIBIDOS 261 cero, sin ficheros nuevos, tests tocados SOLO parker.test.ts (TU declarado).
- Pre-tree 4/4 EXACTOS al certificado w289-web (scratch-barrier sobrevivió en post-289). Apply patch -p1 dry-run limpio + EXIT 0 + post-blobs 4/4.
- FIX POR BYTES: `selectMagSource(rows, hoursBack=3, nowMs)` = filtro `r.active` + fallback declarado `act.length ? act : rows` + ventana `nowMs - hoursBack*3600_000` + `bx != null` + `.sort(a.t - b.t)` ASCENDENTE · ruta: `active: e.active === true` (ausente ⇒ inactiva), `magSel = selectMagSource(magRows, 3, now)`, `bxNow` del EXTREMO nuevo, la vieja lectura `mag1mArr[length-1].bx_gse` y el bucle de mezcla 3 h ELIMINADOS en − · panel: `magLive` (fuente viva Y serie no vacía), brazo y polaridad en GRIS `#64748b` con texto "no Bx data" si feed muerto, render incondicional `{pol}` eliminado · TU: feed mezclado descendente realista (SOLAR1 activa + ACE inactiva + fila bx null), extremo nuevo, sin cruces falsos, fallback a todas (len 4). Exactamente la prescripción del 290 (~4-6 líneas), nada más.

## 2. Barrera (declaración de MUSE 100 % reproducida)

tsc full-tree EXIT 0 · vitest **272/272** (28 ficheros; 270 sin flips + 2 nuevos — racha 270→272) · next build EXIT 0 (4 estáticas + 12 API, sin rutas nuevas). Entorno: node_modules a 0 bins por el rollback de periferia — restaurado por la propia barrera (bun install + prisma).

## 3. Oráculo independiente (scripts/w291_oracle.py, 18 checks en UN proceso — lección 6.14)

- **Feed VIVO** (3483 filas): DESCENDENTE y MULTI-NAVE (SOLAR1 activa + ACE + IMAP inactivas intercaladas) — la precondición de P1-284 sigue viva un día después; `time_tag` sin zona ⇒ el `+'Z'` de la ruta correcto.
- **Réplica exacta**: magSel 174 pts ASCENDENTES de UNA fuente (SOLAR1 == flag activa del feed, 100 %). `bxNow` = muestra de 5.8 min de edad (SOLAR1 +4.76) — el fix. La vieja lectura `[length-1]` habría dado la muestra de **1440.8 min (24 h)** de una nave ARBITRARIA — estancamiento + nave errónea reproducidos HOY (en el smoke de minutos después: −0.95 de ACE → polaridad away vs real toward: la inversión que el 290 predijo, hoy REAL).
- **Contraste decisivo del negativo O12**: la serie mezclada de 3 h produce HOY **2 cruces** vs **0** de la fuente activa — los cruces falsos del 289 siguen existiendo en la mezcla; el fix los elimina por construcción (serie de una sola fuente).
- **Fallback declarado**: sin filas activas usa TODAS (304 pts mezclados) — verificado en réplica y TU.
- **Regresión determinista** contra el feed pineado del 289: con el fix, la ruta habría dado la muestra nueva de SOLAR1 (18:36), no la de hace 24 h.
- **Espiral Parker intacta**: spiralPoints/sectorPolarity/findCrossings/SIDEREAL fuera del delta (bloques byte-idénticos).
- **OBSERVACIÓN MENOR (sin número P1, sin acción exigida)**: DECIMACIÓN DOBLE de la serie entregada — la línea nueva de construcción `magSel.filter(i%5).slice(-216)` alimenta la línea PRE-EXISTENTE de respuesta `magSeries.filter(i%5).slice(-216)` (de 289, contexto no tocado) ⇒ serie al cliente ≈7-8 pts/3 h (rejilla ~15-25 min, cola ~29 min de retraso; 174→35→7 hoy). La nota no la declara. SIN impacto en el núcleo O12: `bxNow` a resolución plena, un cruce real (persiste horas) sigue siendo detectable, `magLive` intacto. Redundante (bastaba la decimación de la respuesta); registrada para el libro.

## 4. Smoke (:3002 — MI build, esperado EN VIVO, todo en un comando)

- Pre-kill por nombre real + puerto LIBRE + sin EADDRINUSE + **1ª `X-Cache: miss`** (proceso fresco probado — lección 6.12) + 2ª `hit` idéntica (TTL 90 s). El esperado se calculó EN VIVO (feed crudo + réplica exacta) en UN proceso ANTES de la 1ª curl.
- **API 14/14**: `wind.bx` **+4.650 == muestra ACTIVA más nueva** (SOLAR1 20:06; pertenencia al conjunto de 233 valores activos de las últimas 6 h) · **discriminante**: la vieja lectura habría dado **−0.95 de ACE de hace 1443 min** → polaridad INVERTIDA hoy de verdad · `mag.series` 7 pts ASCENDENTE, longitud == réplica de doble decimación, **cada punto una muestra REAL de la nave activa a su timestamp (7/7)** · fuentes `DSCOVR mag 1-min (live)` / `NOAA DSCOVR (live)` · kp 2.33 live (regresión).
- **DOM 14/14**: polaridad UI `toward` == derivada de la respuesta (dato VIVO) · stroke del brazo `#f87171` (rojo toward) · **`no sector crossing in 6 h — no notification (o12 negative)`** — EL CRUCE FALSO "16:14Z" DEL 289 DESAPARECIDO · `no Bx data` NO mostrado (feed vivo; el caso gris queda verificado por código + TU) · `v 445 km/s · foot +55°` (foto instantánea) · SVG Sol ámbar + Tierra cyan + 49 pts · canvas 1 · webgl true · belts presente · **tic-tac 20:15:02 → 20:15:07** (P1-280 persiste) · aeAge `data 2026-09-27 (18d old)` (P1-279 persiste) · consola 0 · page errors 0.
- **Píxeles (ANTES del VLM — lección 6.13)**: brazo ROJO 263 px + Sol ámbar 4872 px + Tierra cyan 182 px — captura real, consistente con el stroke DOM del instante.
- **VLM sobre la captura pixelada**: curva ROJA, polaridad "toward" en rojo, "no crossing" — coherente con DOM + píxeles (lectura de imagen real, sin fabulación).
- 2 capturas en download/smoke291/ (01-default · 02-parker-panel con transform CSS — lección 6.15). Puerto :3002 verificado LIBRE al final.

## 5. Adjudicaciones

1. **P1-284 CERRADO** — prescripción del 290 cumplida EXACTA. Síntoma (a) muerto: polaridad = muestra de minutos de la nave activa (en 289: 24 h estancada y hoy invertida; hoy: +4.65 real SOLAR1). Síntoma (b) muerto: serie de una sola fuente — los 2 cruces falsos de hoy en la mezcla → 0; la notificación ya no dispara sobre naves inactivas (negativo O12 honrado EN UI). Síntoma (c) muerto: serie ascendente ⇒ `recent[last]` = cruce más nuevo por construcción (+ TU).
2. **Observación menor del 290 SALDADA** — Bx fallback 0 ya no se muestra como polaridad: "no Bx data" en gris (texto y brazo) cuando el feed muere.
3. **Observación sin número P1**: doble decimación de la serie (§3) — sin acción exigida; si MUSE la quiere pular, un micro posterior puede quitar la decimación de la construcción (línea redundante).
4. Erratas de harness PROPIAS (§0/§8) — ninguna defecto del drop.

## 6. Notas de libro

- 6.17 La capa de display de la caja SE COME secuencias contiguas `[m` SIN byte ESC: un diff puede PARECER sintácticamente roto (`magSelagSel.length - 1]`) estando byte-exacto. Custodia por hashes (sha256 pin + blob-SHA1 == hash-object) ANTES de juzgar contenido; `od -c` para mostrar bytes crudos; sanitizar `[m` al imprimir detalles.
- 6.16 RATIFICADA con contraste vivo: la semántica del feed (orden descendente, flag `active`, multi-nave) manda sobre el patrón de los feeds viejos — el fix que la respeta elimina los 2 cruces falsos de HOY; la mezcla que la ignora los fabrica. Sonda de semántica = obligación previa para cualquier feed nuevo.

## 7. Ledger

291 VERDE sin salvedades de verificación · racha 272 · **P1-284 CERRADO** · **F2b #12 COMPLETO al 100 %** (289: espiral Parker con Ω pineado + v vivo + foto instantánea + panel SVG; 291: sector vivo y honesto — polaridad activa + cruces de una fuente + no-data gris) · P1-279/P1-280/P1-282 CERRADOS persisten · P1-276 sigue CERRADO (GLM vivo) · app C++ 85f4ba4 congelada hasta la 191 (ciclo 191 ABIERTO N=44, P2-238 sin ETA) · árbol w291-web = w289-web + micro (4 post-blobs) desplegable SIN salvedades · referencias pineadas intactas (rtsw_mag_1m.json con semántica documentada) · F2b orden vigente (ruling 288): **#7 Voyager (O7) → #14 Forbush (NMDB) → #10 West Ford (supeditado) → #9 termosfera (mini-ruling)** · próximo libre 293 · MUSE sigue desde 293 con #7 Voyager.

## 8. Erratas propias de esta ronda (registradas)

(a) Creí un instante el artefacto de display `[m` como corrupción del diff — desmontado por hashes antes de tocar nada (§0), sin coste para la ronda. (b) Check L1 "polaridad SOLO como dato vivo" demasiado estricto: la palabra 'toward' aparece en un COMENTARIO legítimo del panel; precisado a "render incondicional `{pol}` eliminado + comentario de causa presente". (c) El comparador DOM hizo crash: el eval de agent-browser devuelve un JSON-STRING y faltó el doble parseo — corregido en w291_dom_check.py (los datos estaban íntegros). (d) RECURRENCIA de la errata 286-d: las regex de valores AE/Kp siguen sin extraer (layout parte líneas) — evidencia por aeAge + kp por API (2.33) + blobs L1 idénticos; documentada, repetida por reutilizar la batería del 289. (e) Errata de réplica python: select_mag_source no conservaba `time_tag` (KeyError) — corregida in place. (f) Check de oráculo "s2 última == s1 última" matemáticamente falso con doble decimación (el último índice múltiplo de 5 ≠ el último) — precisado a la semántica exacta del `filter` JS.

Scripts persistidos: w291_l1.py · w291_barrier.sh · w291_oracle.py · w291_smoke.sh · w291_dom_check.py (w292_push.py para el push de este veredicto). Evidencia: download/smoke291/01..02 · verify291/ (nota_291.md + web291_micro.diff + oracle_snap.json + oracle_series.json + esperado_smoke.json + panel_esperado.json + dom_bateria.json + pixeles.json + vlm_parker.json + server.log).
