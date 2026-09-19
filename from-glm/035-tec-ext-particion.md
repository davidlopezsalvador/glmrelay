# 035 — RULING + PARTICIÓN: TEC-ext 72 h (petición 034, precedente F2-R2)

## 0. Contexto de sesión — incidente de entorno #5 y reconstrucción

Quinto rollback a era traza-010 (espejo @ ae88923, worklog truncado en fold-010).
Registro durable = relay (lección 023). Reconstrucción re-ejecutada en esta sesión
con la receta certificada de los veredictos 020/033:

- Custodia re-assert 10/10: b0b1delta DF3847D3 (32.147 B) · mbox docs 0B8941AF
  (7.048.328 B) · replay018 DFF6D42A (40.860 B) · replay019 0A932A1A (3.621 B) ·
  replay024 9881CECE (17.969 B) · replay025 53FDC3D3 (9.164 B) · replay027 110CBB2E
  (1.396 B) · replay028 C3CBAEDB (31.245 B) · toggle032 01E17D62 (14.205 B) ·
  o1delta 9F3D9643 (2.837 B). Sin BOM en ninguno.
- Tree gates 9/9 EXACTOS ×2 vías: c61f2c1a → d4393198 (mbox 3 parches) → 493e4816
  → ac9d95b3 → 239bf4a3 → 952714ba → {8355e8e7 → 32a902c5} → bd7236bc → deeeebf9.
  Vía A: mbox 028 serie completa (parche 1/2 == delta 027, intermedio 8355e8e7
  verificado). Vía B: delta 027 standalone + parche 2/2 extraído. Ambas convergen.
- Tags recreados con procedencia: b0b1-folded, mirtamreplay-a-folded,
  mirtamreplay-a-sealed → árbol 32a902c5 (disciplina S2: ruling del veredicto 030
  ÚNICO Y PERMANENTE, no re-emitido), o1radio-folded → deeeebf9. 16 tags en espejo.
- Blob spot-check: LgdcPacing.h 95fe46f3, LgdcPacing.cpp c18e17c4 (pines 010).
- test_tec_cache corrido directo sobre el árbol: 24 OK / 0 FAIL.

**Base de esta partición: deeeebf9 EXACTO** (o1radio-folded, O1 cerrado en 033).

## 1. Custodia del drop 034

- 1 commit (50a80c0..5b5605b), 1 fichero, +13 líneas — «petición, sin código»
  LITERAL (nada más en el árbol).
- Nota to-glm/034-tec-ext-particion.md: 797 B, 13 líneas, LF-100%, sin BOM;
  sha256 29f0c6b639c4516dbc444945aadc9b47e3a4a71b31f5c784c22596b666b7a77c;
  blob 78dd4075 == disco == árbol (@5b5605b). From 50a80c0 (veredicto 033) limpio.
- Decisión de diseño ratificada por David en chat + nota: **N = 72 h** (432 frames
  a 10 min, ~9 MB) — «con 72 h, TEC llega a T−72 h y el hueco muere del todo».

## 2. Verificación del alcance propuesto — 3 hallazgos + verificaciones OK

La nota propone: kCapFrames 72→432 (TecCache.h:25) + take 72→432 (App.cpp:1331) +
tecCacheMaxAgeH 24→72 (default :374) + rótulos + GIRO declarado + test_tec_cache +k.
Pines reales medidos en deeeebf9 (lección 024 — la nota usa pines pre-031/032/033):
kCapFrames **:25** ✓ · take **:1334** (no :1331) · default maxAge **:377** (no :374)
· clamp [1,168] :2452 ✓.

### H1 — BLOQUEANTE para el objetivo: caps EN MEMORIA omitidos

El anillo `impl->tecHist` tiene DOS caps propios en App.cpp que la nota no lista:
**:2842** (vía restore, `while (size() > 72)`) y **:2912** (vía insert, igual).
Sin tocarlos, la extensión es INERTE: aunque kCapFrames (disco) y take (fetch)
suban a 432, el anillo en memoria seguiría podando a 72.

### H2 — BLOQUEANTE, bug heredado M10: insert duplicado en pushHistoryFrame

**:2910-2911** son DOS líneas idénticas
`impl->tecHist.insert(impl->tecHist.begin() + pos, fr);` — blame: :2910 viene de
e08ac48 (pre-M10), **:2911 lo introdujo el commit M10 627fdd9** (2026-09-12,
«cache TEC en disco… sello GLM»). Cada frame real entra DOS veces al anillo.
Consecuencia: cobertura efectiva ~mitad de la nominal — 72 slots ≈ 36 únicos
≈ 6 h reales a 10 min (el «cap 72 = 12 h efectivas» de Q-TEC-1 era aritmética
NOMINAL del sondeo; en runtime con el dup eran ~6 h útiles). Con cap 432 sin fix:
~216 únicos = ~36 h — **el hueco [T−72,T−36] seguiría muerto y el objeto del drop
fallaría**. Invisible a todos los gates hasta hoy: sin crash, lerp correcto (el par
duplicado deja un k muerto en el escaneo de bracket), dedup de entrada impide
triplicar. FIX EXIGIDO EN ESTE DROP: borrar :2911. La vía restore (:2840) ya
inserta una vez por frame — el fix hace pushHistoryFrame consistente con ella.

### H3 — la «precarga 360» de la nota exige semántica de VENTANA

El bloque actual (:1325-1336, first/cut/avail/take) solo descarga frames MÁS
NUEVOS que el caché (missingSince tiene la misma semántica; de hecho missingSince
no tiene usos en App — el lambda implementa su propio corte). En una instalación
CÁLIDA (cache con los ~72 más nuevos — la realidad de tu máquina), subir take a
432 no produce backfill de los 360 VIEJOS: el anillo tardaría ~60 h en llenarse a
1 frame/10 min y la mini-premiere en [T−72,T−24] no mostraría TEC. La nota declara
«432−72 = 360» — esa aritmética SOLO ocurre si la precarga pasa a descargar la
VENTANA [now−72 h, now] ausente en anillo/disco. Partición: helper PURO nuevo
`missingInWindow` (§4a) + constante estructural `kHistWindowSec`.

### Verificado OK de la nota

- Slider [0,96] contiene 72 sin pieza propia ✓ — bounds dinámicos por modo
  (:4725-4733), union anclado a kIrtamReplayWindowSec 345600.
- Helper 025 intacto en lógica ✓ — layerDataTime var 0 = clampToRange(tecOldest,
  tecNewest) con rangos RUNTIME de tecHist (:1890-1893, :4684-4687): auto-adapta.
- layerLoopRange var 0 = rangos reales (IrtamState.cpp): la etiqueta «Loop: TEC
  N h» mostrará el span real sin cambios.
- GIRO manda en estaciones (6 h, sin cambios) ✓ — ojo: el «cap 72» de GiroAdapter
  (:63/:94/:225) y test_kc2g/test_getbest es OTRO cap (filas de estación @5 min);
  el 72×72 de GloTecAdapter es el TAMAÑO DE GRID. Ninguno se toca.
- Clamp [1,168] admite 72 ✓ (:2452).

## 3. RULING de diseño

1. **N = 72 h RATIFICADO.** Cierra [T−72,T−24] por el lado TEC alineando el borde
   con IRTAM (T−72): la ventana unión queda 100 % cubierta [T-96,T]. 48 h
   descartado (dejaría [T−72,T−48] muerto 24 h). Coste: anillo ~9 MB RAM
   (432 × 72×72 × 4 B) + ~9 MB disco — trivial.
2. **Ventana de fetch = estructural, no maxAge-dependiente.** Nueva constante
   `kHistWindowSec = 259200.0` (72 h = 432 × 10 min, sondeo Q-TEC-1 0D632DA2:
   4465 frames/744 h/cadencia media 10 min). El anillo es cap-bound; maxAgeH
   gobierna SOLO elegibilidad current (isFresh :2849). Fetching más allá de
   259200 s sería desperdicio puro (el anillo lo borra).
3. **Adjudicación maxAgeH 24→72:** alinea la elegibilidad current con la ventana
   del anillo — un cache cuyo newest tenga 24-72 h ahora SÍ publica bundle
   current (badge fromCache + edad honesta) hasta que llegue live. Comportamiento
   M10 intacto; el tooltip :4028 ya nombra el parámetro. Settings VIEJOS con
   `tecCacheMaxAgeH 24` persisten 24 (preferencia honesta, sin migración): el
   replay 72 h NO depende de maxAgeH — solo la elegibilidad current se estrecha.
4. **Zonas: el hueco MUERE.** El modelo R1 §5-CORRECCIÓN 2 se actualiza: con TEC
   cubriendo [T−72,T], DeadGap deja de existir. El valor se ELIMINA del enum
   (IrtamState.h), zoneForAge queda IrtamOnly [259200,345600] / resto TecOnly,
   zoneName «solo-TEC [T-72,T]». Borde exacto T−72: IrtamOnly gana por `>=`
   (convención existente; el frame TEC más viejo coexiste un instante — la
   etiqueta DATA da la verdad runtime, diseño R1 sin cambio).
5. **missingSince SE CONSERVA** (semántica más-nuevo-que-cache intacta, testeada
   M10, vestigio-en-App declarado). No se elimina: churn cero.
6. **kReplayWindowSec 86400** (IrtamState.h:30): vestigio sin usos (0 en src/
   fuera de su declaración/comentarios), declarado «intacta» por R1 — NO se toca.
7. **Comentario :2006-2007** (cita histórica del veredicto 026 «clavado en T-24h
   el 75 %»): NO se toca — es provenance de un ruling, no estado vivo.

## 4. PARTICIÓN (scope taxativo, F2-R2: partición antes de escribir)

FICHEROS: **src/Data/TecCache.h + src/Data/TecCache.cpp + src/App.cpp + src/App.h
(1 comentario) + src/Data/IrtamState.h + src/Data/IrtamState.cpp +
tests/test_tec_cache.cpp + tests/test_irtam_state.cpp. NADA MÁS.**
GloTecAdapter INTOCIBLE (G6: cero URLs nuevas — fetchFrame reutiliza las URLs del
índice; el índice ya fue sondeado 0D632DA2). CMakeLists INTOCIBLE (cero ficheros
nuevos → 56 TUs). main.cpp, publicación F/H, B0xB1, IrtamCoeffCache, LgdcPacing,
LgdcTrace, IrtamGridEval, oráculos ASC: intocables.

### (a) TecCache.h — constante + helper (junto a kCapFrames/missingSince)

- :25 `kCapFrames = 72` → **432** (comentario «mismo cap que tecHist» sigue
  cierto; refrescar a gusto con «TEC-ext 034»).
- NUEVO `inline constexpr double kHistWindowSec = 259200.0;`
  // 72 h — 432 × 10 min (sondeo Q-TEC-1, 0D632DA2)
- NUEVO decl PURO (solo std):
  `std::vector<std::size_t> missingInWindow(const std::vector<double>& cachedEpochs,
  const std::vector<double>& indexEpochs, double nowUtc, std::size_t cap);`
  — índices (orden ASC, fetch oldest-first) de las entradas del índice con
  `epoch >= nowUtc - kHistWindowSec` ausentes en cachedEpochs (dedup exacto:
  ambas poblaciones derivan del mismo time_tag); si faltan > cap se conservan
  los cap MÁS NUEVOS (el anillo borra los viejos — no se pide lo que se pierde).

### (b) TecCache.cpp — impl de missingInWindow junto a missingSince

### (c) App.cpp — el cableado (pins medidos en deeeebf9)

1. **:258** comentario «(96 h IRTAM + 24 h TEC)» → «+ 72 h TEC».
2. **:377** `tecCacheMaxAgeH = 24.0` → **72.0** (línea LF — conservar LF).
3. **:1305** comentario «ultimos 72 frames» → ventana 72 h.
4. **:1325-1336** bloque first/cut/avail/take → forma prescrita (22 líneas, todas
   CRLF — práctica casa 025/028/032; adaptación menor de espaciado permitida,
   semántica FIJA): recoger cachedEp bajo `tecHistMutex` (timestamps del anillo —
   el restore ya volcó ahí el disco), construir idxEp desde idx, llamar
   `teccache::missingInWindow(cachedEp, idxEp, now, (std::size_t)teccache::kCapFrames)`,
   `histTotal.store((int)want.size())`, y el for pasa a iterar `for (std::size_t k
   : want)` conservando el guard `shutdownRequested` y el cuerpo intactos.
5. **:1343** printf `(int)take` → `(int)want.size()` (línea LF — conservar).
6. **:2842** `> 72` → **`> 432`** (vía restore).
7. **:2911** **BORRAR** la línea (insert duplicado M10 — H2).
8. **:2912** `> 72` → **`> 432`** + comentario refrescado (cap 432 = 72 h @ 10 min).
9. **:2064-2068** comentario de descomposición de zonas → reescritura: unión 96 h
   = [T-96,T-72] solo-IRTAM (muestreo lerp al epoch) · [T-72,T] solo-TEC (TEC-ext
   034: ventana 72 h con backfill de precarga) · solape TEC-IRTAM = borde T-72.
10. **:4636** tooltip «up to 72» → «up to 432».
11. **:4734-4736** tooltip del slider → «TEC covers [T-72,T], IRTAM [T-96,T-72]»
    (la frase del hueco estructural MUERE).
12. **:4756** tooltip de zonas → «Union window zones — [T-96,T-72] IRTAM-only
    (sampled lerp) · [T-72,T] TEC (+ GIRO 6 h).»

### (d) App.h — SOLO :32 (comment-only): «cap 72 + write-through M10» → «cap 432»

### (e) IrtamState.h

- :9 comentario «ventana de replay ~= 24 h (tecHist cap 72, tecCacheMaxAgeH
  24.0)» → «~= 72 h (cap 432, maxAge 72.0)».
- :44-45 comentario de zonas + **enum sin DeadGap**: `{ IrtamOnly, TecOnly }`.

### (f) IrtamState.cpp

- zoneForAge: eliminar la rama DeadGap — queda `if (ageSec >= 259200.0 &&
  ageSec <= 345600.0) return IrtamOnly; return TecOnly;`
- zoneName: sin case DeadGap; TecOnly → **«solo-TEC [T-72,T]»**; IrtamOnly igual.

### (g) tests/test_tec_cache.cpp

- Sección «cap 72 + heal + orden» :107-108: `i < 75` → `i < 435`,
  `== 72` → `== 432`, etiqueta «72 kept» → «432 kept» («3 podados» y
  «conserva los mas nuevos» NO cambian: 435−432 = 3, front = +3×300 s).
- NUEVA sección missingInWindow **+k, k ≥ 5**: (1) filtra viejos fuera de
  ventana, (2) dedup exacto contra cached, (3) orden asc, (4) cap conserva los
  más nuevos cuando faltan > cap, (5) cache vacío → ventana completa cap-bound.
- Secciones isFresh/missingSince/round-trip intactas (isFresh es paramétrico —
  sus 24.0 de argumento siguen válidos).

### (h) tests/test_irtam_state.cpp

- :82-83 «48h → DeadGap» → **«48h → TecOnly»**; :84-85 «24h+1s → DeadGap» →
  **«24h+1s → TecOnly»** (mismas 2 checks, expectación volteada).
- :91-94 check de zoneName no-vacío: quitar la referencia a DeadGap (2 refs).
- La cuenta de la sección se mantiene en 9 → **state 57 exacto**.

## 5. Poblaciones (medidas en deeeebf9 → esperadas post-drop)

| Patrón | Hoy | Esperado |
|---|---|---|
| `kCapFrames` (ocurrencias globales) | 3 (h1 + cpp2) | 4 (+1 llamada App) |
| `kHistWindowSec` | 0 | ≥2 (decl + uso en missingInWindow) |
| `missingInWindow` | 0 | ≥6 (h1 + cpp1 + App1 + tests ≥3) |
| `missingSince` | 7 | 7 (conservado) |
| `DeadGap` | 9 (cpp2 + h2 + test5) | **0** |
| `zoneForAge` | 11 | 11 |
| `teccache::` (ocurrencias App.cpp) | 6 | 8 |
| `tecHist` (substring, líneas App.cpp) | 40 | 42 (−1 :2911, +3 bloque) |
| checks test_tec_cache | 24 | 24+k (k ≥ 5) |
| checks test_irtam_state | 57 | 57 |

## 6. EOL + censo

- App.cpp hoy **4905/1841** (líneas/CRs). Forma prescrita: se eliminan 13 líneas
  (bloque :1325-1336 = 12, de las cuales 10 CRLF + 2 LF; y :2911 CRLF) y se
  añaden 22 CRLF → **predicción 4914/1852**. La nota DECLARA el censo medido
  (lección 024: grep final, sin extrapolación — la predicción es orientativa).
- Líneas editadas in-place conservan su EOL original (:377 y :1343 son LF).
- TecCache.h/.cpp, IrtamState.h/.cpp, tests: **LF puro hoy → +0 CRs** (las
  líneas nuevas en estos ficheros son LF, práctica casa en ficheros LF).
- EOL forense del delta por hunk como es costumbre (desglose add/del/ctx).

## 7. Barrera (se verifica sobre el árbol plegado)

- **56 TUs +0** (cero ficheros nuevos) + LINK; warnings **13 +0/-0** lista
  byte-identica (la lista normalizada sin prefijo TU — lección 010).
- **20/20 tests**: tec_cache **24→24+k** (k≥5) · irtam_state **57** (2 flips,
  cuenta igual) · resto pins EXACTOS heredados de 033: irtam_cache 37,
  coeff_parse 43, irtamc_cache 32, irtamc_gate 19, irtam_adapter 21,
  grid_eval 37, lgdc_trace 9, hf 160, kc2g_*/getbest/model/dregion/sdo/m2sun/
  hop sin cambio.
- Oráculos ASC vivos intactos: 6.1034 / 261.0765 / 3.3639.
- Intangibles por blob: GloTecAdapter.{h,cpp}, LgdcPacing.{h,cpp},
  LgdcTrace.{h,cpp}, IrtamCoeffAdapter.{h,cpp}, IrtamCoeffCache.{h,cpp},
  IrtamCoeffParse.{h,cpp}, IrtamGridEval.{h,cpp}, IrtamCache.{h,cpp},
  Kc2gAdapter/Kc2gCache, main.cpp, CMakeLists.txt, shaders, README.
- G6: **0 URLs nuevas** (las URLs de frame vienen del índice — la única constante
  de URL es el índice, ya sondeado). G8: **0 esperas nuevas** (el bucle de
  precarga no duerme hoy y sigue sin dormir; timeouts curl intactos).
- Determinismo ×2 + tree gate anunciado + custodia estándar (delta + sha256 +
  From limpio sin BOM). ff-absorción primero si el drop llega durante
  verificación (lección 005).

## 8. Mini-premiere (receta de cierre en vivo)

1. Arranque con cache CÁLIDA (la de siempre, ~72+ frames) → consola
   «[App] History preload: N cached + M fetched» con **M ≈ 360** (backfill de
   ventana), no 432 ni ~0. Traza LGDC sin tráfico nuevo (TEC no pasa por el gate
   LGDC — va a services.swpc.noaa.gov, sin pacing E9/E11 involucrado).
2. Tras precarga: badge LIVE ~432 frames; scrub en [T−72,T−24] con mapa TEC
   presente (antes muerto), DATA sin «(stale)» dentro del span real, Zone:
   «solo-TEC [T-72,T]».
3. Scrub [T−96,T−72]: IRTAM como siempre (badge TOV avanzando), TEC ausente,
   Zone «solo-IRTAM [T-96,T-72]».
4. T−80 h: mapa + HF ≠ Live (herencia O1), sin saltos al presente, vuelta a
   live exacta. GIRO estaciones 6 h sin cambios; checkbox «Full 96 h window» +
   modo por capa intactos; slider [0,96] sin cambios.
5. Disco: cache/ pasa de ~72 a ~432 tec_*.bin (~9 MB). Reinicio → restore 432 +
   preload ≈ 0 fetch (ventana ya cubierta).
6. Regla permanente 033: verificar LastWriteTime del exe tras el build, ANTES
   de cualquier evidencia en vivo.

## 9. Observaciones y backlog

- Tráfico: ráfaga única ≤432 req al índice+frames de SWPC (back-to-back como la
  precarga actual, cada una ≤15 s timeout); régimen permanente SIN cambio
  (1 frame/10 min por la vía live). RAM +~7,5 MB; disco +~7 MB. Declarado, no
  exigido pacing nuevo (el sondeo ya tocó el índice: techo sobrado).
- O-030a (volEpoch bare-local :2207) y Opción B (W=168 h) y O3 (badge magnitud):
  backlog sin cambios.
- Nice-to-have heredado no exigido: buf[64] en LgdcTrace (format-truncation).
- Lección de este drop para la casa: los «caps» de una familia viven en VARIOS
  estratos (disco/anillo/fecth) — una partición de extensión debe enumerar los
  TRES o es inerte; y toda estadística de cobertura («12 h efectivas») debe
  decir si es nominal-de-cadencia o runtime-del-anillo (familia
  etiquetado-de-poblaciones, lección 009/010, ahora con el dup M10 como caso).

— GLM. Nada se pliega hasta tu delta; el árbol base queda en espejo limpio
@ deeeebf9 (o1radio-folded) con los 4 tags recreados y S2 intacto.
