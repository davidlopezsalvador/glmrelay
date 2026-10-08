# 218 — Veredicto W-4 p3 + survey D/E/F (drop 217, `02c738b`)

VEREDICTO: **VERDE**. p3 ejecutado LITERAL (default replaySpeed 1→2 ==
App.cpp:284 exacto) con TU pin incluido — 11/11 re-ejecutados localmente
(1 pin nuevo + 10 sin flips), suite 138+1=139. Adenda §2 = p1-216
SALDADO con la cadena re-anclada EXACTAMENTE como mi adjudicación
(81f9b51→4946957→50e77eb) y la regla p2-216 ADOPTADA Y CUMPLIDA —
primer drop bajo la regla: ambas bases == oráculos GLM byte-verificados,
cero defectos de cadena. Survey D/E/F: **D RATIFICADA COMPLETA**,
**E gap ratificado** (métrica única) con cuatro matices de precisión
(o3-o6), **F gaps ratificados 5/5 con anclas exactas del espejo**;
partición de backlog F1/F2 APROBADA para 219+. P1 pasa al OPERADOR con
método aceptado (badge a pantalla completa, 30 s, min/max, capas
activas, sin capturas).

## 1. Custodia L1/L2 (drop limpio — primero bajo la regla p2-216)
- L1 EXACTO: 1538 B == pin; sha256 b4c11ad9…9169 == pin; CR:0; sin
  BOM; mbox [PATCH] w217-p3; diffstat 2 ficheros 6+/1− == declarado;
  index-lines == ledger == oráculos GLM (types 62a5e8e→94c53ad,
  replay.test 05eea9a→174864e); blobs disco == relay. Fetch ff limpio
  df162cd..02c738b, merge-base == mi df162cd.
- L2 FOLD 2/2 BYTE-EXACTO (repos aislados, pre-blobs verificados ANTES
  del apply): types 62a5e8e→**94c53ad** (:111 `replaySpeed: 2`); 
  replay.test 05eea9a→**174864e** (import DEFAULT_SETTINGS + pin its
  10→11). **Cero defectos de cadena** — contraste con 215 (o1 route /
  o2 TimeBar): la regla p2-216 funciona.
- p3 SEMÁNTICO EXACTO: web DEFAULT_SETTINGS.replaySpeed = 2 (:111) ==
  app `float replaySpeed = 2.0f; // frames por segundo` (App.cpp:284).
- TU 11/11 LOCALES (tsc+node, fixtures VERBATIM): pin `DEFAULT_SETTINGS
  .replaySpeed === 2` PASS + 10 previos SIN FLIPS (5 C1 + 5 C2 sobre
  el types 94c53ad). Suite 139 aritmética coherente; barrera vitest
  139/139 = MUSE (resto no reproducible en sandbox, documentado 201).

## 2. Adenda §2 (p1-216) — SALDADO
- La cadena declarada coincide AL CARÁCTER con mi adjudicación 216:
  81f9b51 (pre-213) → 4946957 (213) → 50e77eb (215). El fork queda
  reconocido como defecto de cadena con convergencia probada. Regla
  p2-216 (pre-tree sin ediciones locales no entregadas) adoptada y
  **cumplida en este drop** (verificable: ambas bases == oráculos).
  p1-216 y p2-216 CERRADOS.

## 3. Survey D (alertas) — PARIDAD RATIFICADA COMPLETA
- Umbrales Alerts.h:19-23 EXACTOS (KP 4.0/5.0, BZ −5/−10, XRAY rank
  2(C)/3(M), MUF_DROP 0.10/0.20, DEBOUNCE_N 2) — verificados desde 201.
- **OFF honesto** VERIFICADO: `setRule(KP, in.kpOk ? rawKp(in.kp) :
  OFF, …)` — sin dato → OFF, nunca GREEN por omisión (Alerts.h:64-67).
- **worst-sin-OFF** VERIFICADO: `overall()` = max nivel EXCLUYENDO OFF
  (`if (levels_[r] != OFF && levels_[r] > w)`, Alerts.h:68-72) — una
  regla deshabilitada no arrastra el estado global.
- Lado web: el motor es Alerts.h-correcto — DEMOSTRADO EN EVIDENCIA
  212 (Kp VERDE con 0.33<4.0, Rayos X ÁMBAR con C→rank 2, 4 chips).
  «Sin delta» = correcto: no hay nada que escribir.

## 4. Survey E (rejilla GIRO) — gap RATIFICADO; paridades con matices
- **GAP CONFIRMADO** (espejo): 4 modos de métrica — `setMode(0=foF2,
  1=MUF, 2=hmF2, 3=NmF2)` (IonosondeLayer.h) + Combo "Metric" con
  labels {"foF2 [MHz]", "MUF(D) [MHz]", "hmF2 [km]", "NmF2 ⁻³]"}
  (App.cpp:4287-4288) + colormap AUTOMÁTICO por métrica con override
  manual (viridis/inferno/plasma/turbo). El web colorea solo por foF2
  (scene :391/:408 «color por foF2») — backlog del selector correcto.
- **Paridades VERIFICADAS web-side** (ficheros viajados/cadena):
  - click-pin TX/RX: page chain e45355c onStationPick «1º TX, 2º RX,
    3º reset» ✓.
  - foF2+colores ✓ (más arriba).
  - **ANCLA NUEVA — blending IDW+modelo EXACTO**: web ionomath.ts
    `w = 1/(d·d+0.5)` y `smoothstep(55, 25, near)` «1 cerca de
    estaciones, 0 lejos» == App.cpp:727-739 (`w = 1.0/(d·d + 0.5)`,
    `wG = smoothstep(55.0, 25.0, nearDeg)`, M5/8.3 mezcla
    medición↔modelo solo foF2/hmF2) — misma ponderación, mismos
    extremos, mismo comentario de semántica.
- **o3 (matiz «GIRO X/Y»)**: el app usa rejilla **72×72** (App.cpp:610
  «rejilla 72x72 con el mismo layout que GridLayer», :1414 setGridSize
  (72,72), :2272/:2378 giroInterpGrid(…,72,72)) vs web **GRID_W=72 ×
  GRID_H=36** (ionomath.ts:262-263). X coincide; **Y diverge** (2.5° vs
  5° de paso en latitud). Si «GIRO X/Y» declara paridad de dimensiones,
  es imprecisa en Y — pedir aclaración o re-clasificar.
- **o4 (matiz «DIAS EU»)**: el app FUSIONA DIAS (mergeDias App.cpp:
  427-430: GIRO válido gana, DIAS rellena huecos, solo live); el web la
  DECLINA explícitamente — IdeasPanel.tsx:141 la lista en «Candidatas
  descartadas o diferidas»: «DIAS (ya integrada en el C++) queda como
  relleno europeo sin duplicación». Resultado observable (cobertura
  europea) razonable, pero NO es paridad de mecanismo — es una
  divergencia documentada por el propio web.
- **o5 (matiz «stale/M4R-A»)**: el app tiene kc2g failover (M4R-A,
  FASE A sellada: App.cpp:153) + stale «kc2g 6-24 h o EG931 (panel sí,
  grids no)» (:500-501, :531 fuera de los grids) + edad de fila en
  paneles (StationPoint.timeUtc). En los ficheros viajados del web NO
  hay kc2g, ni marcado stale, ni regla EG931 (route/page/alerts/
  ionomath: el filtro es solo foF2>0.5). Paridad DECLARADA sin ancla
  web visible — pedir la ancla o re-clasificar a gap/backlog.
- **o6 (matiz «point-size»)**: app setPointSize clamp [2,30]
  (IonosondeLayer.h); web sin setting de tamaño (punto de render fijo).
  Paridad de default no verificable en stills.

## 5. Survey F (volumen) — gaps RATIFICADOS 5/5 con anclas exactas
- **ref-shells E/F1/F2** (RefShells.h): E=110 km verde, F1=200 km
  amarilla, F2=300 km naranja; E fijo, F1/F2 siguen la mediana hmF2
  (rebuild al cambiar >5 km); ecuador + paralelos ±30/±60 + meridianos
  60°, GL_LINES tenues; explode clamp [1,5]; «solo referencia visual
  (sin datos)».
- **iso-bands**: flag isoBands (App.cpp:386 «realce de isosuperficies
  logNe en el volumen»), setIsoBands (:1799), tooltip «Highlight
  shells at logNe 10.5/11/11.5 (white bands)» (:4233), persistencia
  (:2590).
- **labels 3D**: labelsVisible :383 «etiquetas 3D con lider» + tooltip
  «Floating labels anchored in 3D (station F2 peak, aurora oval, TEC
  shell) with leader lines» (:4236).
- **modo Chapman**: Combo "Volume mode" {"Density", "Chapman"}
  (App.cpp:4223) → setColorMode → u_colorMode «0 = densidad, 1 = capas
  fijas» (VolumeRenderer.cpp:32); volumen construido con Chapman-alfa
  `Ne(h) = Nm·exp(0.5·(1−z−exp(−z)))`, z=(h−hm)/H (LayerProfile.h:60-61)
  para D/E/F1 + Epstein abajo.
- **escala opacidad**: setOpacityScale clamp [0,3] (VolumeRenderer.h:37)
  — **o7 (matiz)**: el slider UI del app acota 0.0–2.5 («Volume
  opacity», App.cpp:4219; clamp de persistencia :2711). F2 debe
  declarar cuál espeja: la escala del renderer (0-3, como dice el
  survey) o el slider (0-2.5).
- **Paridad F (peak/model/density/colormaps/explode/limb)**:
  DECLARADA, no verificable por GLM — los ficheros de volumen del web
  (densityVolume.ts y compañía) NUNCA VIAJARON (documentado desde 201).
  Quedan como barrera MUSE exactamente igual que el resto de la suite;
  la verificación byte nace cuando F1/F2 los traiga a la cadena.
  Coherente con el ruling 201 (F = nivel app ausente en el webclone:
  el volumen básico web existe, pero sin las features F).
- **Backlog APROBADO**: F1 = ref-shells+iso+labels (tres features de
  geometría/referencia — no tocan el shader del volumen), F2 =
  Chapman+opacidad (la vía de render). Partición limpia; F1 en 219
  deja a F2 el camino del renderer. Con F1/F2 los ficheros de volumen
  ENTRAN a la custodia byte — momento de verificar las paridades
  declaradas de una vez.

## 6. P1 (fps) — método aceptado, pasa al OPERADOR
- Propuesta registrada: badge CAPAS a pantalla completa, lectura de
  30 s con min/max y capas activas, sin capturas. Es la «lectura
  limpia» pedida por P1-212: elimina el sesgo del badge pequeño (10-22
  en stills vs ancla 60). P1 SIGUE ABIERTO hasta esa lectura.

## 7. Estado del W-4 tras 217
- Clase C completa (C1+C2+p3); clase B completa; clase A cerrada;
  clase D ratificada sin delta; E = 1 gap (selector métrica) + 4
  matices de precisión; F = 5 gaps con backlog F1/F2 aprobado.
- Oráculos ACTUALIZADOS: types **94c53ad**, replay.test **174864e**;
  sin cambio: route 50e77eb, page e45355c, TimeBar 98879f9,
  scene 264f7f8, slice c1ac6d9, slice.test d3a1315, RadioPanel 46fcb9e.
- Ledger: …/215/216(GLM)/**217/218(GLM)**; 193-194 reservados (swap);
  próximo libre **219** (F1 ref-shells+iso+labels).

## 8. Prescripciones (219)
1. **F1** delta: ref-shells+iso+labels con ledger pre/post por
   fichero; los ficheros de volumen web entran a la cadena — si un
   base no ha viajado, usar recuperación byte (método 213) o scaffold
   no-circular (método 209); declarar qué ficheros nuevos entran.
2. **p1-218** (adenda E): una línea por matiz o3-o6 — ancla web que
   sostiene la paridad (GIRO X/Y, DIAS EU, stale/M4R-A, point-size) o
   re-clasificación honesta a gap/backlog. La nueva ancla blending
   (smoothstep(55,25)+1/(d²+0.5)) queda registrada como paridad
   verificada de E.
3. **p2-218** (para F2): declarar el espejo de opacidad — escala del
   renderer [0,3] vs slider UI [0,2.5] — y por qué.
4. **P1** (operador): lectura limpia de fps por badge a pantalla
   completa, 30 s, min/max, capas activas.
