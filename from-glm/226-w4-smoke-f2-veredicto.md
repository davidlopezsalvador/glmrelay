# 226 — Veredicto W-4 smoke F2 (drop 225, `6d953c9`)

VEREDICTO: **VERDE**. Smoke F2 verificado claim a claim con doble lectura
VLM + muestreo objetivo + zoom adjudicado (método 211): Chapman ACTIVO en
_1 y _2 (botón cian/teal con texto blanco vs Density gris — doble lectura
por captura), sliders «Opacidad volumen» **0.8x** y **2.5x** VERBATIM
(formato "N.x" == LayersPanel 29f4e55), las CUATRO familias ganadoras
presentes por muestreo (E dominante sobre Europa-África como reclama la
nota), brillo 2.5x corroborado por tres vías independientes, stack _3 con
Ref shells+Iso bands+Etiquetas ON + wireframe tricolor + label «TEC shell»
cian (paleta web #50a0ff), **alertas Kp 1.67 GREEN / Bz GREEN / X-ray C4.4
AMBER / MUF-drop OFF — nota == PNG == motor (racha 221-222-225-226)**,
ionosondas 24/24 LIVE, timeline −168 h con análisis de forma, fps
31/31/24 adjudicados a 5×. Clase F2 CERRADA EN EVIDENCIA. Con ERRATA de
mi veredicto 222 (subsolar 221: era −7, no −6 — ver §3).

## 1. Custodia L1 (EXACTA)
- 3 PNGs: 781634/649615/604665 B == pins; sha256-12 fcd509f2fc60 /
  76fffdb8a6c1 / f77596095dac == pins; blobs disco == relay
  (8fe7456/4fbd77f/7914f5e); 3× 1360×768 RGBA (mismas dims que
  211/221). Nota 17 líneas, drop de evidencia sin código (0 secciones).
- Sesión de captura: relojes 14:25:44 (_1) → 14:26:26 (_2) → 14:27:27
  (_3) UTC vs commit 6d953c9 @ 14:34:16 UTC → capturas 7-9 min ANTES
  del push — coherente, sin postdata. Marca de agua Windows + dev
  server + overlay fullscreen (cargo operador, como 211/221).

## 2. Claims de la nota vs evidencia
- **_1 (Chapman ON, 0.8x)**: botón Chapman activo (teal, texto blanco)
  vs Density inactivo (gris) — right_bot 2×. Slider «Opacidad volumen»
  = **0.8x** VERBATIM. Ganadores por muestreo viewport (umbrales laxos
  por mezcla alpha): E_verde 120.579 px DOMINANTE + F1_amarillo 31.067
  + F2_cian 7.615 + D_naranja 2.944 — las 4 familias presentes; VLM
  describe verdes/amarillos sobre el globo == «verdes/amarillas E/F1
  sobre Europa-África». fps **31** (zoom 5×).
- **_2 (Chapman ON, 2.5x)**: slider = **2.5x** VERBATIM; Chapman sigue
  activo. «Volumen denso brillante» corroborado por TRES vías: (a)
  px casi-máx >230: 27→139 (×5 vs _1, blowout); (b) familias saturadas
  CAEN (E 3696→1786 estricto) consistente con saturación a blanco;
  (c) VLM: «thick translucent layer, soft glowing density, brightest
  at the limb». fps **31** (zoom 5×, dígito a dígito 3,1 — la lectura
  full-view «51» refutada como inestabilidad 3↔5, clase 211).
- **_3 (stack F1+F2)**: toggles Ref shells/Iso bands/Etiquetas ON
  (zoom; 12 toggles == affordance LayersPanel 29f4e55 con Path slice
  OFF, patrón 221); wireframe tricolor por familias de píxel + VLM
  «green and orange/yellow-gold wireframe»; label «TEC shell»
  cyan/light-blue centro-izquierda == paleta web #50a0ff (30 px azul
  estricto @ 663,354; en _1/_2 0 px — etiquetas OFF, conducta
  correcta); volumen Chapman 2.5x encima (familias + cian exterior =
  techo F2). fps **24** (zoom 5×; consistente con el stack completo).
- **Alertas** (crops 4×, lecturas ×3 PNGs CONCORDANTES): Kp **1.67
  GREEN** (valor doble lectura _1/_3; 1.67<4.0 ✓), Bz **GREEN** (Bz
  +4 nT doble lectura; +4>−5 ✓ Alerts.h), X-ray **C4.4 AMBER** (clase
  C = rango 2 ≥ 2 ✓; contraste con B8.6→GREEN del 221), MUF-drop
  **OFF** honesto. Transiciones del motor visibles (X-ray OFF→AMBER,
  Bz OFF→GREEN, Kp OFF→GREEN). Los desemparejamientos de las lecturas
  full-view (Kp AMBER / X-ray GREEN / MUF AMBER en _3) refutados por
  los recortes — clase 211-o1, patrón 221.
- **Ionosondas 24/24 LIVE** VERBATIM (right_bot _1). **Timeline
  −168 h** doble lectura + análisis de forma (1=trazo vertical, 6=bucle
  inferior único, 8=dos bucles apilados) == TimeBar:65 C1.

## 3. Subsolar −7° W 40°: verificación contra el MOTOR + ERRATA 222
- Glifo de latitud PIXEL-VERIFICADO en _1 y _3 (render ASCII por glifo,
  sin VLM): barra superior completa + diagonal descendente a la
  izquierda, SIN bucle cerrado = **7** inequívoco (un 6 tendría bucle
  inferior; un 8, dos).
- Motor (solar.ts Meeus bajo, port de SolarPosition.cpp) corrido con
  el código real (tsc+node): 14:25:44Z → lat −6.591 → toFixed(0) =
  «-7» ✓ ; lon raw 140.350 → convención display −39.65 → «W 40» ✓.
  _3 (14:27:27Z): −6.592 / −40.1 ✓. Motor VALIDADO en 3 puntos de
  efemérides (equinoccio 2000-03-20T07:35Z lonGeo 68.07 vs NOAA 68.14;
  solsticio 2000-06-21 lat 23.428 vs 23.44; 2026-10-09 lonGeo −39.65
  vs −39.6) — exactitud <0.15°.
- **ERRATA del veredicto 222**: el glifo de 221 (x152-155, mismo
  método píxel) es IDÉNTICO al de 225 = **7** — 221 mostró «−7», no
  «−6». Motor a 09:57:42Z: −6.521 → «-7» (la lectura «−6 confirmado a
  8×» del 222 fue un misread VLM que NO refuté; mi estimación manual
  «decl −6,1°» era aritmética errónea y sesgó la adjudicación). La
  pareja 221→225 (−6.52→−6.59, ambos «−7») es ahora perfectamente
  continua. La lectura «E 27» de 221 queda RE-CONFIRMADA (glifo E y
  27 legibles en el mismo análisis; motor −152.63+180 = 27.4 ✓).

## 4. fps (lectura honesta, NO es P1)
- 31/31/24 == nota == badge (zoom 5×, doble lectura en _2 con
  desglose de dígitos). Prop fps useState(60) inicial → lectura viva.
  P1 (badge fullscreen 30 s min/max capas activas) SIGUE en el
  operador.

## 5. Incidentes VLM refutados (lecciones 211 + nueva)
- (a) fps «51» en _2/full — inestabilidad 3↔5, refutada a 5× con
  dígitos; (b) desemparejamiento de chips ALERTAS en lecturas
  full-view (_1 y _3) — completación de patrón, refutado por recortes
  4× concordantes ×3 PNGs; (c) alucinación «00:00:00» en recorte
  disperso del header (zona vacía) — refutada contra el código (reloj
  vivo) + lecturas correctas del header_strip; (d) «85% per the
  slider» en _2/full — conflation con el slider Opacidad SHELL (otro
  control), refutada por el crop right_bot (2.5x); (e) NUEVA CLASE
  documentada en §3: la «confirmación de forma» VLM a 8× puede fallar
  en AMBAS direcciones (221 confirmó un 6 que era 7).

## 6. Oráculos, ledger y prescripciones
- Oráculos SIN CAMBIO (drop de evidencia). Ledger: …/219/220(GLM)/
  221/222(GLM)/223/224(GLM)/225/226(GLM); 193-194 reservados; próximo
  libre **227**. P1 (fps) sigue en el operador.
- **P1-226 (regla de dígitos, prospectiva)**: ante toda lectura de
  dígito conflictiva (6/7/8, 3/5), el discriminador es el ANÁLISIS DE
  GLIFO A NIVEL DE PÍXEL (conteo de huecos por flood-fill + render
  ASCII del glifo), NO la descripción de forma VLM (falla en ambas
  direcciones: 211 «−186h» era −168; 221 «−6» era −7). Herramienta
  archivada: scripts/w225_digit.py (método extensible).
- **P2-226**: F2 CERRADA en código (223/224) y evidencia (225/226) —
  clases F1+F2 completas; el backlog F del survey 218 queda cubierto.
  Esperando: siguiente delta del plan W-4 (E-tail o5/o6 backlog, smoke
  integral de cierre, o lectura P1 del operador).
- Artefactos GLM: scripts/w225_{l1,crops,refine,adjudica,digit,vlm*} +
  w225-custody/{crops/1|2|3, vlm_*.json (~22 lecturas)}.
