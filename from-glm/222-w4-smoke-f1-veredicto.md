# 222 — Veredicto W-4 smoke F1 (drop 221, `24ef4e4`)

VEREDICTO: **VERDE**. Smoke F1 verificado claim a claim con doble
lectura VLM + muestreo objetivo de píxeles: los tres toggles nuevos ON
en CAPAS (con 12 toggles totales == affordance del LayersPanel 11c9fdd
plegado), wireframe tricolor E/F1/F2 con las tres familias de matiz
del oráculo (57,5k px verdes / 21k amarillo-oliva / 10,5k naranja ==
REF_COLORS 7c26a0e), exageración 5.0× (máx del clamp [1,5] espejo),
label "TEC shell" azul visible en sub-cámara (paleta web #50a0ff del
55eda60 — p1-220 cumplida), station/aurora ausentes sin TX/RX (conducta
esperada), **alertas coherentes Kp 3.00 GREEN / Bz −6 AMBER / X-ray
B8.6 GREEN / MUF-drop OFF — nota, PNG y motor Alerts.h coinciden por
primera vez en evidencia** (la clase del hallazgo 211-o1 queda cerrada
en la práctica), transiciones listadas visibles, timeline "−168 h"
confirmado con análisis de forma de dígito (doble lectura), fps 30 con
Volumen ON. Clase F1 CERRADA EN EVIDENCIA. L1 exacto (sha+tamaño+blob+
1360×768 RGBA).

## 1. Custodia L1 (EXACTA)
- 740.070 B == pin; sha256 dac94f43…195d7 == pin; blob disco 8ee844e0
  == relay; 1360×768 RGBA (mismas dimensiones que el set 211). Nota
  14 líneas, drop de evidencia sin código (cero secciones).
- Captura en vivo con marca de agua Windows («Activar Windows») y dev
  server — como 211, cargo del operador.
- Reloj 09:57:42 UTC vs commit 24ef4e4 @ 10:00:08 UTC → captura ~2,5
  min ANTES del push — coherente (sin anomalía de postdata; contraste
  con 211 donde el reloj postdató el commit).

## 2. Claims de la nota vs evidencia (método 211: recortes 2-8×,
    lecturas múltiples, prompts neutros, refutación activa)
- **Toggles nuevos ON** (Ref shells / Iso bands / Etiquetas): 2
  lecturas concordantes (full + recorte 5× con dots cian ON). Panel
  CAPAS con 12 toggles (9 preexistentes + 3 nuevos) == el LayersPanel
  11c9fdd del fold 220. «Path slice» OFF (sin cortina — coherente).
- **Wireframe tricolor**: VLM describe grid lines en tres colores +
  muestreo objetivo: 57.541 px familia verde (E), 21.060 amarillo-
  oliva (F1), 10.540 naranja-marrón (F2) en el viewport — las tres
  familias de REF_COLORS (0.1,0.45,0.2 / 0.5,0.42,0.1 / 0.5,0.22,0.07)
  presentes en líneas. Ecuador+paralelos+meridianos visibles como
  patrón de rejilla. Exageración **5.0×** (doble lectura, knob a
  fondo derecho — techo del clamp [1,5] del espejo).
- **Label "TEC shell"**: texto exacto leído 2 veces; dot Y texto
  AZULES (paleta web #50a0ff — leída contra el código 55eda60 como
  prescribió p1-220, no contra el #8cc8ff del app); 287 px azules en
  bbox (420,264)-(720,378) — posición sub-cámara coherente. Sin
  labels de estación ni aurora (único label 3D en pantalla; Radio
  panel en modo «haz clic…» = sin TX/RX) — conducta esperada ✓.
- **Alertas coherentes**: chips leídos 2 veces en recortes 3×/5×:
  Kp GREEN / Bz AMBER / X-ray GREEN / MUF drop OFF. Valores en CLIMA
  (doble lectura): Kp **3.00**, Bz **−6 nT** (Bt 8), X-ray **B8.6**,
  viento 354 km/s, F10.7 112 sfu. Coherencia Alerts.h: 3.00 < 4.0 →
  GREEN ✓; −10 < −6 ≤ −5 → AMBER ✓; B rank 1 < 2 → GREEN ✓; OFF
  honesto ✓. **Nota == PNG == motor por primera vez en evidencia** —
  la clase del 211-o1 (nota que intercambiaba estados) queda saldada
  en la práctica. «Transiciones listadas» verificadas: log visible
  «Kp OFF → GREEN», «Bz OFF → AMBER», «X-ray OFF → GREEN», «Kp
  AMBER → GREEN»… (cola de eventos del motor, LOG_MAX 32).
- **Timeline "−168 h"**: doble lectura con análisis de forma de
  dígito (1 = trazo vertical; 6 = bucle inferior; 8 = dos bucles
  apilados) — **−168 h**, la etiqueta automática de TimeBar:65 con
  maxReplayMin 10080 (C1/213). Botón ▶ LIVE, reloj 09:57 UTC, extremo
  derecho «ahora».
- **fps 30 con Volumen ON**: badge «30 fps» (doble lectura, prop fps
  del LayersPanel — page:50 useState(60) inicial, lectura viva 30) +
  Volumen ON. Dato honesto; NO es la lectura limpia de P1 (sigue en
  manos del operador con el método aceptado).
- **Subsolar**: «subsolar −6° E 27°» (formato del código page:225-226
  = lat primero con signo, luego E/W + |lon|; −6° confirmado a 8×,
  27°E por doble lectura) — **astronómicamente EXACTO** para
  09:57:42 UTC 9-oct (ecuación del tiempo → lon +27,4°E; declinación
  −6,1°): el par reloj↔subsolar corrobora mutuamente (patrón 211).

## 3. Incidentes VLM refutados (lecciones 211 aplicadas)
- Lectura full-view DESEMPAREJÓ los chips («Kp AMBER / Bz GREEN /
  X-ray AMBER») — completación de patrón refutada por 2 recortes de
  precisión concordantes.
- «−186h» (6↔8) y «−7°» (6↔7): inestabilidad de dígito neutralizada
  con zoom 4-8× y análisis de forma.
- «12:45:33 UTC • 176.22°E 4.41°» en un recorte disperso:
  **ALUCINACIÓN** refutada contra el código (el header solo produce
  enteros toFixed(0), page:225-226; sin decimales ni segundo reloj).
- «Opacidad shell 66/65%» (5↔6): slider preexistente, no-claim de la
  nota, sin perseguir.
- Iso bands: toggle ON verificado; el bandeo blanco sobre el volumen
  no es distinguible con certeza en stills (574 px casi-blancos,
  señal débil sobre glow) — la nota reclama el TOGGLE, no el efecto;
  camino de código u_isoOn verificado en 220.

## 4. Estado de clase y ledger
- **Clase F1 CERRADA EN CÓDIGO (219/220) Y EVIDENCIA (221/222)**:
  ref-shells dinámicas + iso + labels con paridad de anclas exactas y
  smoke verificado. Clases B/C/F1 cerradas; F2 (Chapman+opacidad,
  con densityVolume.ts a custodia por primera vez) es el siguiente
  delta natural en 223.
- Oráculos SIN CAMBIO (drop de evidencia): types 00dfd14, builders
  50a8063, LayersPanel 11c9fdd, refshells 7c26a0e, refshells.test
  5c1747b, escena 55eda60 DECLARADA, route 50e77eb, page e45355c,
  TimeBar 98879f9, replay.test 174864e, slice c1ac6d9, slice.test
  d3a1315, RadioPanel 46fcb9e.
- P1 (fps) SIGUE ABIERTO — operador, método aceptado (badge CAPAS a
  pantalla completa, 30 s, min/max, capas activas, sin capturas). El
  «30 fps con Volumen ON» de este smoke es un dato coherente con el
  costo del volumen, no la medición formal.
- Observación de protocolo (ya anotada en 220): 221 llegó antes de
  mi 220 — primera vez dos commits consecutivos del operador; sin
  impacto de custodia, la alternancia del ledger se preservó.

Ledger: …/217/218(GLM)/219/220(GLM)/221/**222(GLM)**; 193-194
reservados (swap); próximo libre **223** (F2 esperado: Chapman +
escala opacidad [0,3] con slider 0-2.5 + densityVolume.ts y
compañía a custodia — aplicar recuperación/scaffold; el sandbox
puede ser fork como la escena). glmrelay @ (tras este push).
