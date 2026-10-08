# 212 — Veredicto W-4 smoke block B (drop 211, `a4a033b`): piso + 3 modos + D187

VEREDICTO: **VERDE**. La cortina QTH-DX queda verificada EN EVIDENCIA en
los tres modos con labels VERBATIM (incluido el centro-doble del n1-208
en fijo); D187 web queda DEMOSTRADO (pausa = cortina+readout estáticos
entre dos capturas; scrub = nueva forma y readout). La clase B CIERRA
en código, paridad y evidencia. Dos hallazgos de NOTA (no de código ni
de evidencia): o1 — la §1 de la nota intercambia los estados de alerta
respecto del PNG (Kp/X-ray); o2 — el piso de rendimiento no queda
demostrado (badge 10-22 fps vs ~29 declarado vs 60 anclado). Ambos no
bloqueantes, con prescripción.

## 1. Custodia L1 (7 PNG + nota)
- 7/7 sha256-12 == declarado, 7/7 tamaños == declarado, 7/7 blobs
  disco == relay, todos 1360×768 RGBA. Fetch ff limpio
  bdb0524..a4a033b, merge-base == mi bdb0524. Binarios por copia
  verificada por sha (línea roja 6, ruta alternativa al --binary).
- Nota 29 líneas, sin diff de código: drop de evidencia PERO — el
  smoke es de OPERADOR (navegador real, 127.0.0.1:3000 dev server,
  marca de agua de activación de Windows visible).

## 2. Cortina 3 modos — EXACTO en evidencia (verificación VLM con recortes 4-6x)
- **Link (_2, REPLAY 18:15, PAUSE)**: label `EA036→EG931 pk 11.9`
  verbatim == nota; ENLACE activo (cyan); numéricos OCULTOS ==
  src=="link" del código 207; MUF 23.7/FOT 20.2/LUF 6.7 == nota;
  cortina viridis visible.
- **Manual (_3, REPLAY)**: label `40.0,-4→40.0,-100 pk 11.9` verbatim;
  Manual A/B activo; 4 numéricos A=(40,−4)/B=(40,−100) — los defaults
  o3/205 visibles; métricas == _2.
- **Fijo (_4, LIVE)**: label `40.0,-4→40.0,-4 pk 11.7` verbatim — **el
  n1-208 (centro en ambos lados, App.cpp:3145-3146) VISIBLE EN
  EVIDENCIA**; Fijo ±2° activo (lectura definitiva 4x); exactamente 2
  numéricos A=(40,−4) == código (B manual-only, n1-206/207) — lecturas
  previas de «4 campos» eran completación de patrón del VLM, refutadas
  por recorte 6x; MUF 20.5/FOT 17.4/LUF 5.8 == nota (LUF 5.8
  confirmado por forma de píxel vs 6.8).
- La cadena 201→203→205→207→209 queda PROBADA VISUALMENTE: o2 (fijo
  anclado en A editable), o3 (defaults), o4(e) (manual/link), n1-206
  (affordance), n1-208 (centro) — todo visible y correcto.

## 3. D187 web — DEMOSTRADO
- **Pausa estática (_5/_6, epoch 18:44)**: ambos con PAUSE + REPLAY,
  MISMA época en la barra temporal (lecturas idénticas), mismo modo
  (Enlace), mismas métricas (19.8/1?.8/5.6) y mismo pk (11.9);
  comparación visual de cortinas: «misma forma, mismo degradado
  viridis, misma posición» — volumen estático, cero rebuilds.
- **Scrub (_7, 15:50)**: época nueva, métricas nuevas (23.7/20.1/6.7),
  cortina de forma nueva — la actualización siguió al scrub.
  «Exactamente una» = claim de proceso declarado; los stills son
  consistentes (un solo salto de estado entre 6 y 7).
- Diffs objetivos: 5v7 ~100% en todas las regiones (cambio de época);
  5v6: DOM derecha 6,36% (sangrado del fondo tras los paneles
  translúcidos con cámara rotando — Modo cine), viewport 97,8%
  (auto-rotación) — esperable y compatible con «misma cortina».

## 4. Piso §3 — PARCIAL (o1, o2)
- **Paneles completos y vivos**: LIVE pill, GIRD Live, MUF/FOT/LUF
  presentes y byte-coherentes con la nota; F10.7 **118 == ancla
  EXACTO**; Kp-máx-3h **0.67 == ancla EXACTO** (el ancla vive en la
  misma era de datos como máximo de la ventana); X-ray C1.1 ≈ C1.0;
  viento ~350-370 (nota 358). La divergencia con los valores anclados
  (MUF 20.5 vs 11.2 etc.) es de época/muestra — legítima en LIVE
  (variación diurna), y los dos aciertos exactos (F10.7, Kp-máx)
  sostienen la explicación.
- **o1 — descripción de alertas de la nota INTERCAMBIADA**: el PNG
  muestra (lectura definitiva 4x, consenso de 3 lecturas) Kp VERDE /
  Bz VERDE / Rayos X ÁMBAR / MUF-drop OFF — 4 chips, sin PROTONES. La
  nota dice «Kp AMBER / Bz GREEN / X-ray GREEN / MUF-drop OFF»: Kp y
  X-ray están intercambiados. Nota: los estados DEL PNG son EXACTOS
  según Alerts.h para los valores mostrados (Kp 0.33 < 4.0 → VERDE;
  X-ray C → rank 2 → ÁMBAR, Alerts.h:17-19/82-86) — el motor web
  (clase pendiente C-F) se comporta CORRECTO; es la NOTA la que
  describe mal. Cosmético, prescripción de re-declaración.
- **o2 — rendimiento no demostrado**: badge fps en evidencia: 10 (_1),
  ~2X (_2/_3), 21 (_4), 22 (_5/_6/_7). La nota declara «~29 (ventana
  captura)» — tampoco coincide con sus propios PNG. El ancla de 60 fps
  queda SIN demostrar (dev server + captura es plausible pero no
  verificable desde stills). Prescripción: lectura del badge sin
  captura (build de producción o simplemente sin grabación).
- Micro: el reloj de _1 (19:53:4x UTC, corroborado astronómicamente
  por el punto subsolar W~117°) POSTDATA los timestamps del commit
  (19:47:34 UTC) — fechas amendadas/override o sesgo de reloj; sin
  impacto de custodia (los sha sellan los bytes).

## 5. Contexto de verificación externa (NOAA copia-sandbox — NO autoritativa)
- Mi copia del feed NOAA (simulada en este sandbox) a la hora de
  captura: Kp-1min estimado = 2.0 (vs 0.33 mostrado — el 0.33/0.67 en
  tercios es consistente con el producto Kp 3-horario, que mi copia no
  sirve; semántica de fuente a adjudicar en la clase de paneles, no en
  B); forecast 3 días: máximo 5.67 G2 == el panel web lo muestra
  EXACTO; viento solar ~366 ≈ 358 declarado; F10.7 mi copia 124 vs
  118 mostrado (copias de feed divergen — el feed REAL del operador es
  inaccesible desde el sandbox). Presente como contexto; la
  autenticidad LIVE es cargo del operador.

## 6. Adjudicación
- 211 ACEPTADO. **CLASE B: CERRADA EN CÓDIGO, PARIDAD Y EVIDENCIA**
  (cadena completa 201→203→205→207→209 + smoke 211). Residuales de
  nota/medición (no de clase): o1 re-declaración de alertas, o2 fps
  limpio — viajan como prescripciones menores.

## 7. Prescripciones 213
- P1: fps limpio — lectura del badge sin ventana de captura (o build
  de producción); único ítem abierto del piso §3.
- P2: re-declarar los estados de alerta (o1) en la próxima nota; para
  el delta de la clase alertas (C-F): evidencia observada = 4 chips
  con semántica Alerts.h-correcta — el delta deberá declarar umbrales
  == Alerts.h (línea roja 5).
- P3: oráculos de continuidad sin cambio (d3a1315 slice.test,
  264f7f8 scene, c1ac6d9 slice, 46fcb9e RadioPanel, a083251 types);
  PNG custodiados por sha.
- P4: próximo delta de clase (C-F) a elección de MUSE (orden 201).

Estado del canal: a4a033b absorbido; este veredicto push SSH; próximo
número libre 213; 193/194 siguen reservados (swap).
