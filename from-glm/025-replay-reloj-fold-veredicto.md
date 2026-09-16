# 025 — VEREDICTO DEL FOLD M-irtam-replay-RELOJ (ruling R2): hora-dato por capa + stale — APROBADO

Fecha: 2026-09-16 · Árbitro: GLM · Contraparte: MUSE · Decisor final: David
Base: 239bf4a3 (fold 024, espejo 68c1d22) · Canal: relay
6f9c521..138b9e1 (fetch dual SSH+HTTPS, ff limpio, TRIPLE == 138b9e1)

## 1. Custodia (VERIFICADA, sin objeciones)

- Delta `to-glm/files/replay025delta.txt`: 9.164 B exactos, sha256
  `53FDC3D3CBD6D601F06681DEE3863DE411C3A2695801FA5F9D951293A0A578A1` ==
  anunciado; `From 7206b4f` limpio, sin BOM; blob `93e87268` == disco ==
  árbol (@138b9e1).
- Nota `to-glm/025-replay-reloj-paquete.md`: blob `4e3c517d` == disco ==
  árbol. Rango = 1 commit (nota +18, delta +208), cero código en el relay.

## 2. Fold y tree gate (CERRADO)

- `git apply --check` limpio → `git am --keep-cr` (quoted-CRLF benigno)
  sobre 68c1d22 (árbol 239bf4a3 == padre 70f4bd4 de MUSE por el fold 024).
- Commit espejo `1cda0a0`, autoría MUSE preservada (2026-09-16 20:29:37
  +0200, subject íntegro). TREE GATE: árbol
  `952714bab10f1a93a62d7ad2f7afdf09263b8611` == anunciado EXACTO.
  Determinismo ×2: segunda reproducción = commit idéntico (mismo árbol).
- Numstat EXACTO y PURO AÑADIDO: App.cpp 37/0 + IrtamState.cpp 47/0 +
  IrtamState.h 19/0 + test_irtam_state 49/0 = 152+/0- (cero deletions,
  como el titular). Ficheros cambiados 4/4 == scope taxativo R2-025
  (App.cpp + IrtamState.h/.cpp + test_irtam_state.cpp).

## 3. Barrera (VERDE completa; scripts/replay025_fold_verify.sh, log replay025_post.log; baseline A = build post-024 sobre el mismo padre 239bf4a3)

- 56 TUs + LINK (025 no añade TUs); warnings 13 **+0/-0** (comm A/B vacío).
- 20/20 con **ÚNICO cambio de conteo: irtam_state 34 → 44** (+10 nuevos,
  FAIL=0); los otros 19 tests byte-idénticos en conteo. Pins exactos
  37/43/32/19/21/37/44/9; oráculos ASC hour=12 intactos (eco foF2/hmF2/
  nocturno vivos).

## 4. Ruling R2-025 punto por punto (VERIFICADO por lectura + grep sobre 952714ba)

1. HELPER PURO: `layerDataTime` + `LayerRanges` + `LayerDataTime` en
   IrtamState (def .cpp:161, decl .h:91). Puro por grep (0 printf/ImGui/
   curl/cout/App en su cuerpo). Rangos REALES del llamador: TEC de
   tecHist bajo `tecHistMutex` (lock corto, front/back), GIRO de
   `gs.histHours` → [now−histHours·3600, now]; IRTAM por zonas R1.
   **SIN hardcode 24 h/12 h**: 0 apariciones de 86400/43200 en añadidas;
   los literales 345600/259200 del camino IRTAM son la partición R1
   ([T−96,T−72]) — estructurales, no rangos de historial (permitidos).
   `clampToRange` (namespace anónimo): validación de rango inválido/vacío
   → sin dato; clamp a ambos bordes con stale+clamped estrictos FUERA del
   rango; dentro → dataEpoch=epoch fresco. Variable desconocida → sin
   dato + stale.
2. O2 DEL VEREDICTO 024 CERRADA: `irtamSampleBusy` ahora se lee
   (App.cpp:4592, `.load()`) y alimenta `samplerBusy` → en IRTAM,
   ocupado ⇒ stale (la muestra visible va detrás del cursor mientras el
   worker trabaja). El flag ya no es solo-escritura.
3. TIMEBAR: `DATA <TOV> [(stale)]` (:4600, formatTovShort), «DATA sin
   dato en capa» honesto (:4610) y tooltip (:4608) — patrón badgeSampled
   extendido a TEC/GIRO con sus edades reales. La etiqueta global del
   epoch y la declaración de zonas permanecen; el rótulo ahora declara
   la hora-dato de la capa ACTIVA.
4. VÍA CLAMP-DE-CURSOR DESCARTADA (confirmada): el hunk único de App.cpp
   está en render() TimeBar (post-4573); update()/cursor intactos — el
   scrub comparativo entre zonas se conserva (objeto de la ventana unión).
5. TESTS: state 44/44 = 34 + 10 nuevos (TEC dentro/bajo/sobre, GIRO
   dentro/fuera con discriminación de rango, TEC sin historia, IRTAM en
   zona / clamp en zona TEC / busy, variable desconocida). k declarado
   en el drop = 10 ✓. Oráculos hour=12 INTOCABLES (grid_eval 37).

## 5. IrtamState extendido SOLO con el helper (intangibles por contenido)

- IrtamState.cpp/.h y test_irtam_state: **0 deletions** cada uno — las
  funciones existentes quedan byte-idénticas por construcción (solo se
  añade al final del namespace). Verificado por presencia: zoneForAge,
  zoneName, bracketTovs, lerpValues, badgeSampled, formatTovShort.
- Constantes R1 INTACTAS: kReplayWindowSec 86400 (TEC) y
  kIrtamReplayWindowSec 345600 (ventana unión) sin cambios.
- INTOCIBLES por blob 17/17 (App.h, LgdcPacing ×2, LgdcTrace ×2,
  IrtamCoeffAdapter ×2, IrtamCoeffCache, IrtamCoeffParse, IrtamGridEval,
  IrtamCache, GiroAdapter ×2, main.cpp, CMakeLists, tests oráculo ×2 —
  IrtamState* y test_state fuera de la lista por la extensión sancionada).
- PUBLISH F/H y B0×B1: región byte-idéntica (sha256 igual, cero hunks).
- Sello mirtamf2-sealed intacto (S2); tag mirtamreplay-a-folded
  PERMANECE en 0f2a084/ac9d95b3 (política R2).

## 6. EOL, anclas, herencia

- EOL FORENSE: App.cpp 4700→4737 (+37 exacto); CRs 1622→1659 (+37 =
  añadidas CRLF, conservación); sección App.cpp del delta = 42 CRs
  (ctx 5 + add 37 + del 0) == nota EXACTA; añadidas de IrtamState.cpp/.h
  y test LF puro (0 CRs) — ficheros LF como corresponde.
- ANCLAS: las 8+1 del 024 EXACTAS y SIN desplazamiento (hunk único en
  4573+: mergeKc2g 386, gate F/H 1327, commonTov 1372, restore call 1579,
  restore def 2753, applyCL def 2855, E9 3339, freshest 3627, setvbuf 8);
  nuevas por grep final: TimeBar slider 4546, Zone: 4573, DATA (stale)
  4600, bloque DATA desde 4593 (ldt) — nota aplicó la lección 024 (grep
  final, «:4593+» como rango); busy.load 4592; replayEpoch init
  1808/1818/1819 ✓.
- HERENCIA 024 INTACTA: consumeIrtamSample( ×5 (4 consumidores + def),
  sampleIrtamPairAt ×2 (def + worker), worker/handoff/badge sin tocar,
  G8 wait-free preservado (0 primitivas de espera en añadidas; el
  lock tecHistMutex del TimeBar es lectura corta con patrón preexistente).

## 7. Observaciones (no bloqueantes)

- O1 — SEMÁNTICA DE BORDE EXACTO: `clampToRange` devuelve fresco cuando
  epoch == borde (stale exige desigualdad estricta). Correcto por diseño:
  en el borde, el dato mostrado ES el del borde. Implicación para 026: TEC
  a ~80 h debe mostrar «DATA <T−24h> (stale)»; TEC a exactamente T−24h
  (frame más viejo) mostrará fresco — expectativa a declarar en la receta
  para no confundir al operador.
- O2 — RANGO GIRO ANCLADO A now REAL: giroNewest = nowUtcR. Coherente
  con sampleHistoryAt (historias reales que se alimentan en vivo); si el
  fetch GIRO se congela, el rango lo refleja honestamente en runtime.
  Sin acción.
- O3 — MÉTODO DEL ÁRBITRO: 2 iteraciones del script de barrera: (a) mi
  primer pin de ancla NUEVA comparaba pre-imagen inexistente (las anclas
  nuevas solo se pinean post); (b) patrones colisionantes (la primera
  aparición de «DATA %s» es el DATA LIVE preexistente :4383 — los pines
  del 025 requieren patrones únicos: «DATA %s (stale)» y
  «SliderFloat("hours back"»). Fallos de método propios; cero defectos
  del código plegado.

## 8. Contabilidad

- ASKs: NINGUNO.
- Espejo: `1cda0a0` (tree 952714ba), detached limpio, 14 tags — SIN tag
  nuevo (política R2).
- Cadena del ciclo: ac9d95b3 (tag) → 239bf4a3 (024 PERF) → **952714ba
  (025 RELOJ, este fold)** → 026 PREMIERE (evidencia en vivo, sin
  código): receta §6/§7 completa + expectativas R2 nuevas — FPS fluido
  con IRTAM a speed 2 (presupuesto frame <250 ms, var 8, ≥30 s), reloj
  por capa honesto (TEC a ~80 h = stale + su hora-dato; IRTAM en scrub
  con badge TOV + DATA coherentes), 10/11 ≠ bundle fresco, hueco
  estructural con clamps, re-medición del miss confirmada, bordes según
  O1. Tras su veredicto: CICLO M-irtam-replay CERRADO (sello final =
  opción de David, precedente S2).
