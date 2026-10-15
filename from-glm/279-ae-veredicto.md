# 279 — Veredicto del drop 278 (F2a #17 electrojets Kyoto + fix P1-276, 39de772) — VERDE con P1-279 registrado

Respuesta al ruling 266 sec.3-O17. Drop de MUSE: `39de772`, parent `4a20937`
(mi 277 — cadena limpia 276→277→278), autor MUSE, append-only **+665/−0**
(nota 49 líneas + `to-glm/files/web278_ae.diff` 616 líneas).

## 1. L1 — estructura y custodia

- Diff: **24719 B, sha256 `74e1dd18…2387d` EXACTO** a la declaración, LF
  puro sin BOM sin CR, mbox `[PATCH] w278-ae`.
- 10 ficheros **365+/8− EXACTO**, index-lines 10/10 == nota (4 nuevos:
  electrojets.ts `69f457d` · electrojets.test.ts `62c3463` ·
  api/ae/route.ts `a180045` · AePanel.tsx `e845887`; 6 modificados:
  lightning `b923589→48b7f3e` · lightning.test `5d9bc3a→f56b3a6` · types
  `f8a32b4→90a8afa` · page `10bf22a→55f94e2` · LayersPanel
  `ec20e61→da44ebe` · escena `263803a→cec479a`).
- Pre-tree 6/6 EXACTOS al certificado w276-web + **4 nuevos ausentes**
  pre-apply. El rollback parcial del sandbox de esta sesión solo comió
  `~/.ssh` (deploy key intacta en `keys/`), paramiko (reinstalado) y el
  webtree VIEJO — **el árbol de barrera scratch-barrier quedó INTACTO en
  post-276**: los 6 pre-pins del 278 verificaron sin rebuild de cadena.
- PROHIBIDOS 261 (shaders · builders · solar · geo · densityVolume): cero
  aparición en el diff. Delta de escena revisado hunk a hunk: SOLO material
  electrojet (loop + color), **cero líneas borradas**, boltGroup del 276
  intacto.
- Aplicación: `patch -p1` (lección 275), dry-run limpio, post-blobs 10/10
  EXACTOS.
- **FIX P1-276 verificado en el delta**: el regex único de adyacencia
  estricta (`<Key>…<LastModified>…<ETag>…<Size>` en una sola expresión —
  la forma que anulaba los granulos ante los elementos Checksum reales)
  ELIMINADO; reemplazado por dos `matchAll` independientes (Key y Size)
  emparejados POR ORDEN con comentario documental («un par por
  `<Contents>`, no por adyacencia. Cubre XML con y sin checksum») — la vía
  «desacoplar Key de Size» exacta que el 277 prescribió. **Fixture de
  regresión con la forma REAL** (LastModified→ETag→ChecksumAlgorithm CRC32
  →ChecksumType FULL_OBJECT→Size, la del evidencia s3_g19_real.xml) espera
  1 granulo con size 471987 — el TU ya no es ciego a la forma real.
- **Errata de proceso propia (registro)**: mi primera pasada del chequeo
  P1-276 falló por esperar la forma literal escapada del regex viejo —
  corregido contra el delta real; sin efecto sobre el árbol.

## 2. Barrera (certificado de build estándar)

- `tsc --noEmit` full-tree: **EXIT 0**.
- `vitest run`: **254/254** (25 ficheros = 24 + electrojets.test.ts nuevo;
  249 sin flips + 4 AE nuevos + 1 regresión P1-276) — **racha 249 → 254**.
- `next build` (Next 16.4.0): **EXIT 0** — generación estática 4/4 idéntica
  al certificado; cubo ƒ = **10 rutas API** (las 9 previas + `/api/ae`).
  Cuenta de ficheros: 10 route.ts.

## 3. Oráculo O17 — recálculo INDEPENDIENTE (scripts/w278_oracle.py + sonda probe278.ts persistidos)

- **Geometría del filamento (puerto propio IGRF-14 pineado, m_WEB ∝
  (g11, g10, −h11), base {u,v,m} espejo de magBasis)**: los 129 puntos del
  loop (círculo ⊥ eje dipolar a 67°N magnéticos, `fromMag` genuino, escala
  1.008) == mi puerto con **peor componente 3.33e-16** (mejor que el
  8.3e-13 del whistler del 276); loop cerrado (gap 8.33e-17, artefacto
  flotante de sin(2π)); **todos los puntos a 67°N magnéticos exacto**
  (desv máx 2.84e-14°); radio GEO constante 1.008 — sin z-fighting con el
  overlay fadeout 1.006 ni la superficie 1.0.
- **Aritmética**: aeColor 13 muestras == lerp por tramos de mi puerto
  (azul (0.2,0.4,1.0) ≤100 → amarillo (1.0,0.85,0.2) → blanco (1,1,1)
  ≥1500) con continuidad en las fronteras 100/500/1500; aeBand fronteras
  99/100/499/500/501 == declarado (<100 quiet · 100-500 active · >500
  storm); aeFileName (padStart) == puerto.
- **parseKyotoAe genuino vs puerto Python sobre fichero REAL**: contra
  `ae260927` (el último día digital disponible) la función genuina y mi
  puerto dan **1440 puntos IDÉNTICOS** (n/first/last/max exactos, max
  704 nT), cadencia 60 s exacta. **Forma WDC verificada**: cada fila
  horaria = **61 tokens = 60 valores minutales + 1 MEDIA horaria** (el
  61º == media de los 60 en las 24 filas) — el parse toma los PRIMEROS 60
  (`Math.min(60,·)`), la media horaria se descarta CORRECTO; huecos 9999
  descartados (0 en el fichero del día verificado); marca QUICKLK presente.
- **FUENTES VIVAS**: patrón pineado `ae_realtime/data_dir/YYYY/MM/DD/
  aeYYMMDD` VERIFICADO (GET 200, ~9.4 KB/día, 24 filas horarias en
  ae260927); el índice mensual de plots quicklook llega a HOY
  (index_20261014.html 200 — los plots son en vivo, el archivo digital
  no: ver P1-279). S3 noaa-goes19/18 GLM-L2-LCFA 200 con 40 keys cada
  uno a la hora en curso.
- **ERRATA PROPIA (registro, familia de red 277 no aplicable aquí)**: mi
  primera sondeo S3 usó buckets `noaa-g19`/`noaa-g18` — INEXISTENTES
  (NoSuchBucket 404 determinista ×20); los reales son `noaa-goes19`/
  `noaa-goes18`. Corregido; los 404 NO eran la ráfaga intermitente
  registrada en 277.
- **P1-276 RE-VERIFICADO EN VIVO (40+40 EXACTO como declaró MUSE)**:
  parseGlmList FIX genuino sobre el XML S3 real de la hora en curso →
  **goes19: 40 granulos · goes18: 40 granulos** (con el fix habrían sido
  0/40: la réplica del regex VIEJO sobre el MISMO XML da **0** hoy
  también); granulos con ChecksumAlgorithm/ChecksumType reales presentes;
  el más nuevo a 8-9 min de frescura. La prescripción completa del 277
  (fix + fixture forma real + re-verificación viva granules>0) queda
  **CUMPLIDA y SALDADA**.

## 4. P1-279 REGISTRADO (defecto funcional, fix exigido próximo drop)

- **La ruta /api/ae trae SOLO hoy+ayer; el repositorio digital de Kyoto
  publica CON LAG DE HASTA 3 SEMANAS POR DISEÑO**: el 00readme.pdf
  oficial del propio repositorio (upd. 2025-04-09) dice «The digital
  values have been published … with a **delay of up to three weeks**».
  Verificado empíricamente hoy: `ae261015` y `ae261014` → **404 ambos**;
  el último día digital disponible es **ae260927 (lag 18 días)**. Por
  tanto el fetch hoy+ayer 404 **SIEMPRE** → payload
  `{now:0, max24h:0, series:[], source:"unavailable"}` permanente →
  panel «DOWN · AE NOW 0 nT · quiet» y filamento oculto para siempre
  (visible = showAe && aeNow>0). **Muerto al nacer, misma clase que
  P1-276**: degradación HONESTA (O5.4 — sin datos falsos), pero la pieza
  viva no funciona.
- **FIX prescrito**: caminar hacia atrás desde hoy hasta el último día
  disponible (cap ~25 días, el oráculo ya lo hace como referencia), traer
  ese fichero (+ el anterior para ventana), computar now/max24h sobre la
  ventana relativa AL ÚLTIMO DATO y mostrar la EDAD del dato en el panel;
  opcionalmente citar versión/DOI (el readme lo pide). El resto de la ruta
  (parseo, TTL, sparkline) no cambia.
- **El núcleo de #17 NO depende de ello** (referencia pineada + parseo
  verificado contra puerto independiente + geometría + mapeo + panel +
  toggle + cita) — mismo patrón de adjudicación que #8 con P1-276.

## 5. Smoke (:3002, agent-browser + VLM + DOM eval + estado de escena por fiber)

- HTTP 200 · **0 console · 0 page errors**. 14 capturas
  `download/smoke278/01..14`.
- **Panel ELECTROJETS**: «DOWN · AE NOW 0 nT · quiet · 24h max 0 nT ·
  AE index: WDC for Geomagnetism, Kyoto (non-commercial, citation
  required)» — cita visible, degradación honesta, P1-279 visible en UI;
  toggle «Electrojets» presente en CAPAS; `aejet.line.visible=false`
  confirmado en el estado interno de la escena.
- **Monitor GLM VIVO POR PRIMERA VEZ** (efecto del fix P1-276 en
  producción): /api/lightning → **granules: 40** (antes del fix era `[]`
  SIEMPRE), tormentas NWS vivas (4→3 durante el smoke: Comanche OK
  expira, Haskell/Throckmorton TX entra), panel «GLM G19 East · stale ·
  778s» (honesto: frescura que envejece a mitad de hora — ver observación
  4) y «GLM G18 West · no data» (ver observación 3).
- **Escena (estado extraído del fiber — verdad por encima del VLM, que
  erró la geografía por escorzo)**: boltVisible=true, 9 children = 3
  tormentas × 3 (arco `#7ef0ff` + sprite `#ff4a3d` + pulso `#bdf6ff`,
  colores EXACTOS del diseño); las 3 trayectorias de 49 puntos anclan
  **EXACTO** en las 3 tormentas vivas del payload ((33.22,−99.3) ·
  (34.05,−99.47) · (29.94,−102.65)), puntos medios en el ecuador
  magnético (−8,−103/−106), extremos en los conjugados del Pacífico Sur
  (−49.9,−108.1 — EXACTO al certificado 276/277).
- **NEGATIVO Lightning**: toggle OFF → columnas rojas 0 (VLM sobre
  captura 10); restaurado ON → vuelven (captura 12: 3 columnas con arcos
  naciendo en ellas). Como sprites+arcos+pulsos comparten el grupo
  (visible todo-o-nada), el negativo cubre las tres piezas.
- Servidor DEJADO VIVO en :3002 para el operador.

## 6. Adjudicaciones no bloqueantes

1. **Errata comentario/código (precedente errata kp 275)**: page.tsx:62
   comenta «polling 15 min == TTL de la ruta» pero el intervalo real es
   300_000 ms = **5 min** (la nota §3 declara honestamente «Polling AE
   5 min vs TTL 15 min»; el comentario es el que miente — polling MÁS
   frecuente que TTL, sin impacto funcional). Saldable en una línea el
   próximo drop.
2. **Observación emergente del fix P1-276 (sin acción exigida)**: el
   payload concatena G19+G18 y `slice(0,40)` — cuando G19 llena la cuota
   (hora completa), G18 queda fuera y el panel lo muestra «no data»
   aunque su feed esté sano (visto en vivo). Opciones de una línea:
   estados por satélite en el payload · intercalar · subir el cap. MUSE
   decide.
3. **Observación (diseño 276 preexistente, sin acción exigida)**: la
   frescura GLM envejece a lo largo de la hora (max-keys=40 trae las
   PRIMERAS claves de la hora → fresco junto al cambio de hora, «stale»
   a mitad de hora — «stale · 778s» capturado). glmStatus honesto;
   opción futura: última página de la hora o cap mayor.
4. **Registro menor (para cuando el fix P1-279 toque el panel)**: el
   readme pide citar versión y DOI del AE; el pie actual atribuye WDC
   Kyoto + no-comercial (suficiente para la cita obligatoria genérica).
5. La correlación AE/Dst con #18 queda declarada pendiente — CONFORME
   (llega con #18, visible en el propio panel).

## 7. Veredicto y ledger

**VEREDICTO VERDE**: 278 VERDE con **P1-279 abierto** — **F2a #17
electrojets CERRADO EN SU NÚCLEO** (referencia Kyoto WDC AE realtime
digital pineada con patrón+forma+lag declarados; parseo verificado contra
puerto independiente sobre fichero real 1440/1440; geometría 67°N
reproducida 129/129 a 3.3e-16; mapeo color/banda verificado; panel EN con
cita + toggle; la vía viva muerta al nacer por el lag del archivo — fix
prescrito) y **P1-276 CERRADO** (fix por orden verificado en delta + TU,
fixture regresión con forma real, re-verificación viva 40+40 reproducida
EXACTA por el oráculo, regex viejo → 0 reproducido hoy).

- **Ledger**: racha **254** · F2a #17 CERRADO (núcleo) · F2 ABIERTO —
  siguiente **#18** según orden 266 §2 (substorm/Dst; la correlación
  AE/Dst llega con él) · app C++ 85f4ba4 hasta la 191 (ciclo 191 ABIERTO
  N=44, P2-238 sin ETA) · árbol web **w278-web** = w276-web + ae (10
  post-blobs verificados) desplegable con salvedad P1-279 (decisión del
  operador: desplegar ya — el monitor GLM por fin vivo, panel AE DOWN
  honesto — o esperar el walk-back de una tarde) · referencias pineadas
  intactas (Shue-1998 #4 · Sauer-Wilkinson #3 · catálogo 251-D #5 ·
  efeméride propia #6 J2000 · Helliwell 1965) + **Kyoto WDC AE realtime
  digital NUEVO pineado para #17** (patrón mensual + forma 61 tokens +
  lag hasta 3 semanas POR DISEÑO documentado) · próximo libre **280** ·
  MUSE sigue desde 280: **fix P1-279** (walk-back + edad del dato) +
  errata comentario polling en la misma línea + #18.
