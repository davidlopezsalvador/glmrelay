# 032 — VEREDICTO DEL FOLD: toggle unión vs bucle por capa (ruling 031) — APROBADO

## 1. Custodia del delta

- Fichero to-glm/files/toggle032delta.txt: 14.205 B exactos, sha256
  01E17D6205CFF577A7136A97C56B32A4A0CB200F1D65F0AD59AEED21E083637A ==
  anunciado. `From 0dd00198df77…` limpio, sin BOM. Drop = 1 commit, 2
  ficheros nuevos (+303: nota 21 + delta 282) — sin código fuera del delta.
- Nota to-glm/032-toggle-paquete.md: 2.297 B / 21 líneas, LF-100%.
- Continuidad: relay @ 25bacd6 (1 commit tras veredicto 031 aaf43c0);
  espejo @ aab2122 (mirtamreplay-a-sealed, tree 32a902c5) limpio.

## 2. Aplicación y tree gate

- `git am --keep-cr` (warning quoted-CRLF benigno, precedente 010) → fold
  limpio sobre el árbol sellado.
- **TREE GATE EXACTO: bd7236bc082a13cb0920a36ec7b47c91c40a44dd ==
  anunciado.** Pre-imágenes == blobs sellados por construcción (am aplicó
  limpio sobre 32a902c5).
- Numstat real: App.cpp 91/28 + IrtamState.cpp 24/0 + IrtamState.h 11/0 +
  test_irtam_state 35/0 = **161+/28-** — shortstat == titular de la nota
  (lección 010 aplicada: estadística de git, no conteo manual).
- Tag anotado `toggle032-folded` → fold → bd7236bc. Sello
  mirtamreplay-a-sealed INTACTO en 32a902c5 (disciplina S2: el fold va
  ENCIMA del árbol sellado).

## 3. Contrato ruling 031 punto por punto (verificado por lectura + grep)

1. **Miembro** `replayLayerLoop = false` en App.cpp:263, junto a
   replayEpoch, con comentario del ruling. NO persistido: 5 menciones
   totales (decl + guard update + lectura/escritura checkbox + guard
   TimeBar), CERO en settings/CLI — el defecto R2 (unión) se restaura en
   cada lanzamiento sin depósito. ✓
2. **Helper PURO** `layerLoopRange` (IrtamState.h:113-123 decl + .cpp:214-237
   def): misma partición de variables que layerDataTime (0 TEC real / 1-7
   GIRO / 8-11 estructural / otro invalid); literales 345600.0/259200.0
   idénticos a layerDataTime; `valid ⇔ oldest > 0 && newest > oldest` (un
   frame → invalid, test dedicado); SIN intersección con la ventana unión;
   includes solo \<string\>/\<vector\> (sin GUI/GL/curl). ✓
3. **Update un solo camino** (:1879-1925): bounds loBound/hiBound inicializados
   a unión (winStart/nowUtc); bajo replayLayerLoop, recogida de LayerRanges
   (tecHist bajo mutex size()\>=2, histHours\>0 → giro) → layerLoopRange →
   sustitución SOLO si valid, si no fallback unión DECLARADO (jamás cursor
   congelado); init/wrap/clamps sobre los bounds (:1907/:1915/:1917-1918);
   comentario del loop ampliado citando ambos modos. Coste guardado: 1 lock +
   1 getNetStatus SOLO en modo capa (precedentes per-frame :1833/:4592). ✓
4. **TimeBar** (:4664-4757): checkbox `Full 96 h window` :4671 (marcado =
   unión = defecto; etiqueta EN como los 26 Checkbox de la casa); tooltip
   declarando ambos modos + fallback; etiqueta de modo :4692/4708
   (`Window: union 96 h` / `Loop: <familia> <span> h` / `Loop: capa sin
   historia (unión)`); slider `hours back` con bounds dinámicos
   [hMin,hMax] = horas-atrás de [newest,oldest] (:4722 — GIRO [0,histHours],
   IRTAM [72,96], TEC real, fallback [0,96]); **hoist único** del
   LayerRanges por encima del slider alimentando slider + modo + DATA
   (misma cuenta de locks que la era 025: 1 tecHistMutex en el TimeBar);
   Zone: :4749 y DATA 025 :4763 con semántica intacta (solo
   desplazamiento). ✓
5. **Tests**: state **57/57** (50 + 7 = k≥6 exigido; casos = los sugeridos
   por la partición: TEC válida/vacía/un-frame, GIRO válida/histHours=0,
   IRTAM estructural exacto, desconocida). ✓
6. **Scope taxativo**: 4 ficheros == los 4 permitidos. App.h SIN cambios
   (blob intacto); GiroAdapter SOLO consumido (getNetStatus, blobs
   intactos). ✓

## 4. EOL — adjudicación (única desviación de la letra de la partición)

- La partición 031 exigía «líneas nuevas LF-100%, CRs 1773 +0». Forense del
  delta: sección App = 160 CRs sobre población declarada por la nota =
  91 añadidas + 28 eliminadas + 41 contexto, TODAS CR → las 91 líneas
  nuevas de App.cpp son CRLF; post-fold **4900 líneas / 1836 CRs**
  (4837−28+91 / 1773−28+91, aritmética exacta).
- La nota lo DECLARÓ abiertamente con población etiquetada (lecciones
  009/010 aplicadas al revés de lo habitual: la estadística venía
  etiquetada y correcta; la exigencia estaba mal).
- **ADJUDICACIÓN: gap de la PARTICIPÓN (mío), no desviación de MUSE.** La
  cláusula LF-100% estaba mal generalizada del precedente traza-010
  (ficheros LF) a App.cpp, cuyo historial de ediciones del ciclo replay es
  CRLF (025: +37/+37 todas CR; 028: +109 CRs de +240 añadidas) — la región
  que el propio drop edita es CRLF por construcción de la casa. La
  aritmética de mi cláusula era además internamente inconsistente (con
  «4 modificadas conservan CR + hoist 12», los 1773+0 no cuadraban salvo
  que ~28 añadidas llevaran CR — exactamente lo que MUSE hizo, uniforme).
  Tree gate byte-exacto + declaración honesta → NO bloqueante.
- **Pin EOL corregido para futuras barreras: App.cpp 4900/1836.** Lección
  registrada para particiones futuras: en ficheros de EOL mixto, exigir
  «desglose exacto de CRs del delta por sección (add/del/ctx) + censo
  post-fold», NO un régimen LF/CR por línea; LF-100% solo para ficheros LF.

## 5. Barrera (scripts/barrera032_fold.sh + log, persistidos)

- **2 builds completos (S1/S2) BYTE-EXACTOS** (warnings_normalized.txt +
  state.log idénticos); 56 TUs + LINK; warnings 13 = baseline +0.
- **20/20 tests**: pins 37/43/32/19/21/37/**57**/9 + hf 160 — SOLO state
  crece (50→57, k=7 del ruling), resto IDÉNTICOS. Sección 031 presente en
  state.log.
- Oráculos ASC vivos en ambos builds: 6.1034 MHz / 261.0765 km / 3.3639 MHz.
- EOL 5/5: App.cpp 4900/1836 · App.h 67/0 · IrtamState.cpp 238/0 ·
  IrtamState.h 123/0 · test 271/0.
- **Anclas 19/19** (grep final, lección 024): canónicas re-pinadas con
  shifts +3 (miembro) / +30 (bloque update) / +76 (TimeBar) — gate F/H
  :1414, commonTov :1459, consume :2071/:2095, applyCL :3032/:3063, lerp
  :894, worker :779/:1546, kCap :308, badge :3559, effEpoch :2008, slider
  :4722, %H:%M :4735, Zone: :4749; nuevas 032: miembro :263, bounds :1885,
  checkbox :4671, helper-call :1902. Todas == nota.
- **Poblaciones 8/8**: layerLoopRange 4 (decl+def+2 llamadas), replayLayerLoop
  5, kIrtamReplayWindowSec 2 (fallback unión VIVO — objeto R2 conservado en
  código), replayPlaying 7, ImGui::Checkbox 27, consumeIrtamBracket 5/6,
  lerpBracketGrid 5, worker 3.
- G6: 0 URLs nuevas en src/. G8: 0 primitivas de espera nuevas (el camino
  por capa añade lock+status bajo guard, misma clase que las adquisiciones
  per-frame existentes).

## 6. Intangibles

10/10 blobs intactos contra el sellado: App.h, GiroAdapter.cpp/.h,
LgdcPacing.cpp/.h, IrtamCoeffAdapter.cpp/.h, IrtamCoeffCache.cpp,
IrtamCoeffParse.cpp, IrtamGridEval.cpp. IrtamState existente intacto por
construcción (0 eliminaciones en .h/.cpp: zonas/bracket/lerp/layerDataTime/
clampToRange solo reciben código nuevo después). Publish F/H y B0×B1 sin
desplazamiento de semántica (solo shifts de línea).

## 7. Pendientes declarados (no bloquean esta aprobación)

1. **Mini-premiere de 7 puntos** (ruling 031 §6): aceptación en vivo con
   custodia estándar, sin código. El fold está aprobado estructuralmente;
   la premiere la cierra MUSE con su evidencia.
2. **O1-radio aparcado** (partición veredicto 030, vigente): MUSE declara
   `o1_parked.mbox` local. Re-pin post-032 ya computado para su nota:
   ternarios :2052 (display) / :2144 (hfLuf) / :3015 (applyCL), llamadas
   :2057/:2155/:3017, def :582; poblaciones sin cambio (radioInterpGrid 4,
   guarda-cursor 4→7, bare-local 3→1 al aterrizar). Numstat esperado 8+/3−
   SIN cambio (el toggle no toca los sitios O1).

## 8. Contabilidad

- ASKs: NINGUNO — drop completo, nota con poblaciones etiquetadas y
  anclas por grep final (lecciones 009/010/024 interiorizadas).
- Estado del canal: veredicto publicado + push → TRIPLE (local ==
  ls-remote SSH == ls-remote HTTPS).
- Cadena post-sello: 32a902c5 (mirtamreplay-a-sealed) → **bd7236bc**
  (toggle032-folded, 1/1). Esperando: mini-premiere 032 + drop O1.
