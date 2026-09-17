# 031 — RULING: toggle unión vs bucle por capa — PROPUESTA APROBADA (ampliación opt-in de R2) + PARTICIÓN EMITIDA

## 1. Custodia del drop

- 1 commit (7013700..c33639a), 1 fichero, +11 líneas — «propuesta, sin código»
  LITERAL (nada más en el árbol).
- Nota to-glm/031-toggle-union-por-capa.md: 1.020 B, 11 líneas, LF-100%, sin
  BOM; sha256 8b72e486d31fcb55de04155e4ba4f385dcd35ec0ea86dd960ecf17c7dee90296;
  blob 26baa7ba == disco == árbol (@c33639a). From 7013700 (veredicto 030)
  limpio.
- Base de auditoría: espejo @ aab2122, árbol sellado 32a902c5
  (mirtamreplay-a-sealed, disciplina S2 — este drop no toca código y el sello
  permanece sin mover).

## 2. Reporte de operador — verificación independiente

- La consecuencia estructural descrita ES la ya adjudicada en R2-022/023:
  cursor global sobre la ventana unión de 96 h con capas de historia más corta
  clampeadas a sus bordes (congelados declarados desde 025). El reporte la
  describe correctamente: no es bug, es el diseño.
- Mapa de cobertura PRECISO sobre 32a902c5 (corrección de precisión a la
  frase de la nota «ninguna capa cubre 96 h salvo IRTAM», familia
  etiquetado-de-poblaciones lección 009/010): NINGUNA capa cubre las 96 h.
  TEC (var 0): [T−24 h, T] nominal (72 frames × 1200 s, timestamps reales de
  tecHist). GIRO (vars 1-7): [T−histHours, T], hoy ~6 h (cap 72 filas × 5 min
  de una respuesta que trae 24 h de sobra — GiroAdapter.cpp:225). IRTAM
  (vars 8-11): [T−96 h, T−72 h] (lag físico de 3 días, 24 h de span). IRTAM
  es la única capa CON dato en la zona profunda; el tramo [T−72, T−24] es
  hueco estructural para TODAS.
- Cuantificación del coste UX que motiva la propuesta (aritmética sobre el
  mapa): con GIRO activa (6 h), 90/96 h = 93,75 % del ciclo unión transcurre
  sin dato de la capa; con TEC, 72/96 = 75 %; con IRTAM, el dato existe solo
  en [T−96, T−72] → 75 % del ciclo sin dato IRTAM. El bucle por capa elimina
  esos tramos del modo opt-in sin tocar el modo comparativo.

## 3. Adjudicación R2

- Letra del ruling (023 §4 DROP 025): «VÍA 2 de la nota (clamp del cursor al
  rango de la capa) DESCARTADA POR RULING: pierde el scrub comparativo entre
  zonas, que es el objeto de la ventana unión».
- El ruling descartaba el clamp por capa como comportamiento ÚNICO o
  sustitutivo de la unión. La propuesta C conserva el objeto del ruling:
  unión por defecto (checkbox marcado), scrub comparativo íntegro a un
  click, modo por capa opt-in del operador.
- ADJUDICACIÓN: COMPATIBLE — no reabre la cláusula, la AMPLÍA. Refuerzos
  exigidos por esta partición para que la ampliación no erosione el ruling:
  (a) el miembro arranca FALSE en cada lanzamiento y NO se persiste en
  settings — el defecto R2 se restaura sin depósito; (b) el fallback ante
  capa sin historia válida es SIEMPRE unión (jamás cursor congelado); (c) la
  etiqueta del modo declara familia y span en vivo.

## 4. PARTICIÓN (a drop de código posterior; F2-R2: partición antes de escribir)

PIEZA ÚNICA. SCOPE TAXATIVO: src/App.cpp + src/Data/IrtamState.h +
src/Data/IrtamState.cpp + tests/test_irtam_state.cpp. NADA MÁS. App.h SIN
cambios (el Impl vive en App.cpp); GiroAdapter se CONSUME
(getNetStatus/histHours) y no se toca.

### (a) Miembro Impl (App.cpp, junto a replayEpoch :260)

`bool replayLayerLoop = false;` con comentario «031: bucle por capa (false =
unión 96 h, defecto R2-023)». NO persistir en settings.

### (b) Helper PURO en IrtamState (junto a layerDataTime; MISMA partición de variables)

```cpp
struct LayerLoopRange {
    double oldest = -1.0, newest = -1.0;  // rango con dato de la capa
    bool valid = false;                    // oldest > 0 && newest > oldest
};
LayerLoopRange layerLoopRange(int mapVariable, double nowUtc,
                              const LayerRanges& r);
```

Semántica FIJADA: var 0 → [tecOldest, tecNewest]; vars 1-7 → [giroOldest,
giroNewest]; vars 8-11 → [nowUtc − 345600.0, nowUtc − 259200.0] (literales
estructurales de layerDataTime :167); cualquier otra → invalid. SIN
intersección con la ventana unión (los rangos actuales son subconjuntos por
construcción; el ciclo TEC-ext re-adjudicará ventana vs rango cuando toque).

### (c) Camino de update (App.cpp :1875-1893) — formulación FIJADA, un solo camino para ambos modos

- Antes del init (:1880): `double loBound = winStart; double hiBound =
  nowUtc;` y SOLO bajo `replayLayerLoop` (el bloque ya vive dentro de
  replayMode): recogida de LayerRanges (tecHist bajo tecHistMutex con
  size() >= 2 → front/back; getNetStatus().histHours > 0 → giroOldest /
  giroNewest = nowUtc) → `layerLoopRange(mapVariable, nowUtc, lr)` → si
  valid sustituye los bounds; si NO valid: fallback unión (declarado, sin
  congelar el cursor).
- Init :1880 → loBound; wrap :1888 → `if (replayEpoch > hiBound)
  replayEpoch = loBound;`; clamps :1891-1892 → [loBound, hiBound].
- Comentario del loop (:1881 «loop en ventana union») ampliado a dos modos
  con cita del ruling.
- Coste: lock + getNetStatus() extra SOLO en modo capa (guard); misma clase
  que las adquisiciones per-frame existentes (tecHistMutex :1894;
  getNetStatus :1833/:4592) — G8 sin esperas nuevas, G6 sin URLs.

### (d) TimeBar (App.cpp :4637-4712)

- Checkbox `Full 96 h window` (marcado = unión, defecto) — etiqueta en
  INGLÉS por consistencia con los 26 Checkbox existentes (adjudicación de
  esta partición; el rótulo español de la nota era descriptivo, no literal).
  Tooltip declarando ambos modos y el fallback.
- Etiqueta del modo activo: unión → `Window: union 96 h`; capa → `Loop:
  <familia> <span> h` (familia por mapVariable: 0=TEC, 1-7=GIRO, 8-11=IRTAM)
  o `Loop: capa sin historia (unión)` en fallback.
- Slider `hours back` con bounds dinámicos [hMin, hMax] = horas-atrás de
  [newest, oldest] del rango por capa (GIRO: [0, histHours]; TEC: real;
  IRTAM: [72, 96]), fallback [0, 96]. La alternativa (slider fijo 0-96 con
  el thumb loopeando en el sub-rango) DESCARTADA: doble modelo mental del
  mismo control; el scrub comparativo sigue a un checkbox.
- HOIST del bloque LayerRanges (hoy :4680-4691) a POR ENCIMA del slider: UNA
  sola recogida alimenta slider + etiqueta de modo + layerDataTime (el bloque
  DATA la reutiliza). Misma cuenta de locks que hoy.
- Zone: (:4671) y el bloque DATA del 025 (:4697-4711) permanecen con
  semántica intacta.

### INTOCIBLES

GiroAdapter.cpp/.h (el tope 72→288 del ciclo GIRO-ext es OTRO drop),
LgdcPacing, IrtamCoeffAdapter/Cache/Parse, IrtamGridEval, IrtamState
existente (zonas/bracket/lerp/layerDataTime/clampToRange — SOLO código
nuevo), publish F/H, B0×B1, M4 blobs, sello mirtamreplay-a-sealed (el fold
va ENCIMA del árbol sellado; S2).

## 5. Barrera exigida

- 56 TUs +0 (ningún TU nuevo); 20/20 con pins EXACTOS salvo irtam_state:
  50 → 50+k (k >= 6 declarado por MUSE; sugeridos: TEC válida / TEC vacía /
  TEC un frame (front==back) / GIRO válida / GIRO histHours=0 / IRTAM
  estructural exacto (345600/259200) / var desconocida → invalid /
  oldest==newest → invalid). Resto SIN CAMBIO: 37/43/32/19/21/37/9 + hf 160.
- Warnings: 13 +0 (vigilar variable sin uso en ramas de fallback).
- EOL: App.cpp 4837 → 48XX líneas / CRs 1773 +0 (líneas nuevas LF-100%; las
  4 modificadas hoy CR conservan CR; el hoist preserva EOL por línea).
  IrtamState.h 112→~120:0; IrtamState.cpp 214→~231:0; test 236→~28X:0.
- NUMSTAT esperado (forma, no falsa precisión): ~+105/−16 en 4 ficheros (4
  reescritas + 12 del hoist contados como move); EXACTOS a declarar en la
  nota del drop (regla: titular de git diff --shortstat).
- POBLACIONES post-fold: layerLoopRange = 4 (1 decl + 1 def + 2 llamadas:
  update + TimeBar); replayLayerLoop >= 5 (1 decl + checkbox + guard/slider/
  etiqueta); kIrtamReplayWindowSec = 2 SIN cambio (el fallback unión lo
  conserva); replayPlaying = 7 SIN cambio; ImGui::Checkbox 26 → 27.
- Builds ×2 byte-exactos; anclas re-pinadas si el wiring desplaza
  (precedente drop 008).

## 6. Mini-premiere (aceptación en vivo, evidencia con custodia estándar, sin código)

1. Var foF2 + toggle por capa + Play 1x: epoch loopeando dentro de [T−6 h, T]
   (wrap visible T → T−6 h); DATA SIN stale durante el play.
2. Scrub dentro del rango estrecho del slider: pausa y responsivo.
3. Toggle OFF: slider 0-96 restaurado; scrub hasta T−80 h (scrub comparativo
   — objeto de R2 — INTACTO); DATA declara stale/clamp en zonas ajenas.
4. Var IRTAM foF2 + por capa: loop dentro de [T−96, T−72]; Zone: IrtamOnly;
   DATA fresco dentro.
5. Var TEC + por capa: loop dentro del span real TEC (~24 h).
6. Capa sin historia (GIRO histHours=0 de arranque frío o equivalente
   declarado en la nota): fallback unión VISIBLE en la etiqueta de modo.
7. Back to Live → re-entrada a replay: el toggle sobrevive en la sesión; tras
   RELANZAR el binario: defecto unión (R2 restaurado).

## 7. Numeración y convivencia con O1-radio

- Drop 031 CONSUMIDO por este ruling (propuesta → partición). O1-radio
  (partición del veredicto 030) SIGUE VIGENTE contra 32a902c5 y toma el
  siguiente número que MUSE le asigne; orden de aterrizaje a discreción de
  MUSE.
- Interacción de anclas (ambas particiones contra el mismo árbol base): los
  sitios del update-path del toggle (:1875-1893) están ANTES de los sitios
  O1 (:2022/:2114/:2985) → si el toggle aterriza primero, O1 corre ~+17
  (miembro + bounds); si O1 aterriza primero, los sitios TimeBar del toggle
  corren +5. El que aterrice segundo RE-PINA (precedente estándar).

## 8. Observaciones menores (no bloqueantes)

- Precisión del mapa de cobertura (§2): la frase de la nota se registra
  corregida — IRTAM tampoco cubre las 96 h; es la única con dato en
  [T−96, T−72].
- Historia GIRO diminuta (p. ej. 0,1 h tras arranque frío): loop
  hiperrápido — comportamiento REAL y autodeclarado por la etiqueta de span;
  SIN guard de span mínimo (honestidad sobre cosmética).
- «Binario 028+O1 pendiente de fold» (nota): el espejo no ha recibido código
  O1 — la partición 030 sigue esperando su drop; nada que reconciliar aquí.
- Las extensiones de rango conversadas (GIRO 6 h → 24 h alzando el cap
  cliente, +0 tráfico; TEC → días) son ciclo(s) aparte: este toggle los
  COMPLEMENTA (el modo por capa lee los bounds en runtime y se beneficia
  automáticamente de rangos más anchos), no los sustituye.
