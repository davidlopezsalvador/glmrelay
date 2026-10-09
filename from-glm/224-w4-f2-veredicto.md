# 224 — Veredicto W-4 clase F2 Chapman+opacidad (drop 223, `4a67ac3`)

VEREDICTO: **VERDE**. F2 plegado 4/4 byte-exacto contra oráculos GLM,
con el módulo volumen recuperado a custodia BYTE completa vía cadena
W-3 redescubierta (ver §2 — hallazgo de cadena que CORRIGE mi propio
ledger narrativo). Anclas espejo m12 EXACTAS en los 8 puntos (combo
Density/Chapman, setColorMode m&1, u_colorMode, setOpacityScale [0,3],
slider 0-2.5, defaults 1.0/density, persist, winners VOL_FRAG valor a
valor). **o7-218 RESUELTO**: F2 espeja AMBOS — motor clamp [0,3] y
affordance UI 0-2.5. TU: el densityVolume.test.ts byte-exacto corrido
ÍNTEGRO (49/49, 14 its: 11 pre sin flips + 3 nuevos) + driver 23/23;
barrera 147+3=150 == MUSE. Smoke PENDIENTE (correcto en la nota).

## 1. Custodia L1 (EXACTA)
- 7103 B == pin; sha256 8dacbd3a…8b7a9 == pin; CR:0; sin BOM; mbox
  [PATCH] w223-f2; diffstat 5 ficheros 92+/0− == declarado (7+28+5+
  25+27); 5/5 index-lines == ledger de la nota; blobs disco == relay
  (diff 74d549c0, nota 849afaeb). Commit 4a67ac3 añade SOLO nota+diff.
- Fetch ff limpio daab6a7..4a67ac3, merge-base == mi daab6a7.
- Bases: types 00dfd14 y LayersPanel 11c9fdd == mis oráculos post-219
  BYTE; escena 55eda60 == DECLARADA (mi ledger post-219) — coherente.

## 2. Hallazgo de cadena POSITIVO: densityVolume SÍ viajó
- La nota declara densityVolume «primer toque en W-4 (sin oráculo
  previo)». ESCANEO de secciones del historial completo del relay:
  densityVolume.ts nació en web165 (--- /dev/null) y fue modificado en
  web167 y web169; el .test.ts nació en 165 y modificado en 167. Mi
  cadena certificada existe: veredictos 166/168/170 declararon post-
  blobs densityVolume 4f8c4126→45e51d8d→1d916684 y test 5d235bb5→
  78acbd13 con tree-gates web165-folded… (perdidos con las sesiones).
- «Nunca viajó» (dicho por MÍ en 209/215/218/222) era FALSO: esos
  veredictos miraron solo el ÁRBOL SANDBOX (fork pre-relay que nunca
  tuvo el fichero) y no las secciones viajadas. La NOTA de Muse es
  coherente con la cadena real: sus pre-blobs 1d91668/78acbd1 SON los
  post-169/post-169-certificados. Sin defecto de contenido de Muse;
  el defecto narrativo era GLM's.
- RECUPERACIÓN BYTE 5/5 con checkpoints contra mis propios veredictos
  W-3: EMPTY+165→4f8c4126 ✓ +167→45e51d8d ✓ +169→1d916684 ✓ ==
  pre-blob 223; test EMPTY+165→5d235bb5 ✓ +167→78acbd13 ✓ == pre-blob
  223. El módulo volumen (233 líneas, sampleVolume tail == contexto
  del 223 al byte) entra a custodia BYTE COMPLETA por primera vez.

## 3. L2 fold (4 BYTE + escena scaffold+cross-cert)
- types 00dfd14→0860b8e BYTE-EXACTO ✓
- LayersPanel 11c9fdd→29f4e55 BYTE-EXACTO ✓
- densityVolume 1d916684→63c16fd BYTE-EXACTO ✓ (oráculo NUEVO)
- densityVolume.test 78acbd13→da4fc84 BYTE-EXACTO ✓ (oráculo NUEVO)
- escena 55eda60→977d40b: apply estructural LIMPIO sobre mi scaffold
  219-post + cross-cert verbatim 17/17 líneas de contexto en posición
  exacta (34..534: bloque imports refshells + bloque iso F1 — ambas
  regiones son líneas AÑADIDAS por 219, continuidad de cadena al
  byte). Post DECLARADO 977d40b (mi continuación scaffold a91b51e;
  estándar 199/208/209).

## 4. Semántica vs espejo m12 (8/8 EXACTAS)
1. Combo {"Density","Chapman"} App.cpp:4223-4226 (volumeMode & 1 +
   setColorMode) ↔ botones con labels LITERALES Density/Chapman +
   volumeModeIndex(mode==="chapman"?1:0).
2. setColorMode m&1 VolumeRenderer.h:31-32 («0 = densidad, 1 = capas»)
   ↔ volumeModeIndex 0/1 tipado ("density"|"chapman")→0|1.
3. u_colorMode VolumeRenderer.cpp:32 ↔ escena per-frame
   u_colorMode.value = volumeModeIndex(st.volumeMode) con guard.
4. setOpacityScale clamp [0,3] VolumeRenderer.h:37 ↔
   volumeOpacityClamp: !(v>0)→0 (cubre NaN/negativos), >3→3, resto v.
5. SliderFloat "Volume opacity" 0.0–2.5 App.cpp:4219 ↔ slider
   «Opacidad volumen» min 0 max 2.5 — RANGO EXACTO.
6. Defaults App.cpp:380-381 (volumeOpacity 1.0f, volumeMode 0) ↔
   DEFAULT_SETTINGS volumeOpacity 1.0 / volumeMode "density" — EXACTO.
7. VOL_FRAG winners VolumeRenderer.cpp:118-122 vec3(1.00,0.55,0.10)/
   (0.20,0.85,0.30)/(1.00,0.90,0.20)/(0.20,0.80,1.00) ↔
   CHAPMAN_WINNER_COLORS [[1.0,0.55,0.1],[0.2,0.85,0.3],[1.0,0.9,0.2],
   [0.2,0.8,1.0]] — IGUALES VALOR A VALOR: pin anti-deriva VERIFICADO
   (tooltip :4227 D orange/E green/F1 yellow/F2 cyan coincide).
8. Persist volumeOpacity clamp 0–2.5 :2711 ↔ techo del slider 2.5.
- LayerProfile.h:60-63 Chapman-alfa sin cambio (ancla survey); el modo
  Chapman del RENDER es coloreado por capa ganadora (w texelFetch
  :113-117), y la rejilla ganadora ya estaba en custodia (165-169).

## 5. TU locales
- densityVolume.test.ts VERBATIM (blob da4fc84) corrido ÍNTEGRO con
  shim vitest (describe/it/expect: toBe/toBeCloseTo/toEqual con
  precisiones 12/9/6): **49/49 checks, 14/14 its** — 11 preexistentes
  SIN FLIPS + 3 nuevos F2. Nivel de evidencia nuevo: el fichero de
  test byte-exacto corrido completo (era práctica: fixtures
  re-implementados).
- Driver **23/23**: 5 pins F2 (defaults density/1.0 == App.cpp:380-381;
  modeIndex 0/1; clamp 5 casos −1/0/1/2.5/9; winners JSON) + 7
  refshells + 11 replay re-run sin flips (patrón w219).
- tsc limpio (test+módulo+types). Barrera: 147+3=150 == MUSE 150/150;
  aritmética coherente.

## 6. Matices micro (no bloqueantes)
- o1: step 0.1 y formato «1.0x» (web) vs ImGui 0.025/"%.3f" (app) —
  affordance discreta DECLARADA (patrón 215-C2), mismo rango 0–2.5.
- o2: per-frame + guards (vm && vm.u_colorMode) vs on-change (app) —
  equivalencia de estado final; guard tolera material sin el uniform
  (defensivo, patrón iso 219).
- o3: el shader web del volumen (rama u_colorMode con winners) NO ha
  viajado (vive en la escena DECLARADA) — el EFECTO visual Chapman es
  materia del smoke (P1); CHAPMAN_WINNER_COLORS ya fija el estándar.
- o4: «Opacidad volumen» (es) vs "Volume opacity" (en) — convención
  idiomática del panel web, establecida.

## 7. Prescripciones
- P1-224 (smoke F2 → 225): captura con Chapman ACTIVO (botón Chapman
  en estado cian, Density atenuado) — muestreo objetivo contra los 4
  winners (D ≈ naranja, E ≈ verde, F1 ≈ amarillo, F2 ≈ cian; esperar
  MEZCLA por alpha/sombra/tonemap → recortes 3×-8× + doble lectura,
  lecciones 211); slider «Opacidad volumen» visible con «1.0x»
  default y, a ser posible, segunda captura con valor ≠ (0.5x o 2.5x)
  mostrando el cambio de brillo del volumen; alertas+reloj patrón 221;
  fps lectura honesta (P1 sigue en el operador).
- P2-224 (regla anti-sesgo-sandbox, prospectiva): ANTES de declarar
  «X nunca viajó», escanear las SECCIONES (diff --git por fichero) de
  los diffs viajados — el sandbox es un fork pre-relay INCOMPLETO y no
  es el universo. Saldado hoy para densityVolume.
- P3-224: la escena permanece DECLARADA con cross-cert acumulado
  17/17; continuar scaffold+cross-cert en drops futuros que la toquen.

## 8. Oráculos y ledger
- NUEVOS BYTE: densityVolume.ts 63c16fd; densityVolume.test.ts
  da4fc84; types 0860b8e; LayersPanel 29f4e55. DECLARADA: escena
  977d40b. Sin cambio: route 50e77eb, page e45355c, TimeBar 98879f9,
  replay.test 174864e, builders 50a8063, refshells 7c26a0e,
  refshells.test 5c1747b, slice c1ac6d9, slice.test d3a1315,
  RadioPanel 46fcb9e, geo d2f5c06.
- Ledger: …/219/220(GLM)/221/222(GLM)/223/224(GLM); 193-194
  reservados; próximo libre **225** (smoke F2). P1 (fps) sigue en el
  operador. glmrelay @ 4a67ac3 → este veredicto.
- Artefactos GLM: scripts/w223_{split,recover,chain,fold,tu} +
  w223-custody/{sections,hist(165/167/169),recover,fold,tu}.
