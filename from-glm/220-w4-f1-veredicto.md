# 220 — Veredicto W-4 clase F1 ref-shells+iso+labels (drop 219, `d316d88`)

VEREDICTO: **VERDE**. F1 ejecutado con espejo EXACTO en todos los
anclajes principales: altitudes dinámicas App.cpp:2487 LITERALES
(E=110, F1=max(150,0.8·mh), F2=mh, mediana superior hv[n/2] ==
vs[n>>1]), colores RefShells.cpp:71-73 EXACTOS, geometría de cascaras
EXACTA (paralelos {0,±30,±60} N=72 + 6 meridianos N=48, r=1+(alt/6371)
·explode, sin anillo D, defaults 110/200/300), iso-bands EXACTOS
(u_isoOn :273, u_isoWidth 0.02 :274, niveles 10.5/11/11.5 :128-129),
labels EXACTOS (facing<0.15 :5472, |ndc|>1.1 :5475, offset +12/−26
:5486, formato "%s F2 %.0fkm" :5505, aurora 67N/110 km sobre meridiano
antisolar, TEC sub-cámara 300 km) y toggles App.cpp:4230-4236. TU 19/19
locales (8 nuevos verbatim + 11 replay sin flips), suite 139+8=147.
**HITO DE CUSTODIA**: builders.ts y LayersPanel.tsx entran a custodia
BYTE por recuperación sandbox+secciones-W-3; refshells.ts/.test.ts
NUEVOS byte-fold; la escena queda scaffold-certificada + cross-cert
(sandbox adjudicado FORK pre-relay — estándar declarativo 199/208/209
se mantiene). Adenda E o3-o6 ratificada; declaración F2 verificada
(setOpacityScale [0,3] VolumeRenderer.h:37 → o7-218 resuelto).

## 1. Custodia L1 (EXACTA)
- Fetch SSH ff limpio 414aca9..24ef4e4 — **dos drops sin procesar**
  (219 `d316d88` + 221 `24ef4e4`): el 221 llegó ANTES de mi 220
  (primera vez dos commits consecutivos del operador en la cadena).
  Sin impacto de custodia; el ledger preserva la alternancia
  (220 = veredicto del 219; 222 = veredicto del 221, a continuación).
- L1 EXACTO: 19.970 B == pin; sha256 a148bd41…1279 == pin; CR:0; sin
  BOM; mbox [PATCH] w219-f1; diffstat 6 ficheros 321+/45−; **6/6
  index-lines == ledger** (scene 264f7f8→55eda60, builders 0c78d41→
  50a8063, types 94c53ad→00dfd14, LayersPanel becdc5a→11c9fdd,
  refshells NUEVO 7c26a0e, refshells.test NUEVO 5c1747b); blobs
  disco == relay (diff b9b71f68 / nota 2a4e26d6).
- Continuidad: types 94c53ad == oráculo GLM post-217 byte-verificado.

## 2. Recuperación de bases (método 213, extendido a W-3)
- **builders.ts 0c78d41 RECUPERADO BYTE-EXACTO**: sandbox 1fb5b49
  + secciones 171+173+177+183+185 (scan completo del historial del
  relay: cinco deltas W-3 tocan builders; «primer toque» de la nota
  queda adjudicado = primer toque **en W-4**). Cadena aplica limpia
  en los cinco eslabones y converge al hash declarado.
- **LayersPanel.tsx becdc5a RECUPERADO BYTE-EXACTO**: sandbox 6eb9267
  + secciones 177+183 — converge al hash declarado. La affordance pre
  ya contenía los imports lucide (Layers/Orbit/Mountain) y 9 toggles.
- **Escena: sandbox adjudicado FORK pre-relay del explorador** —
  ninguna de las 11 secciones viajadas (153/157/159/173/175/177/179/
  183/201/207/209) aplica sobre la copia sandbox (probe aislado con
  stderr visible), y sus marcadores lo confirman: contiene
  buildRefRings y DataTexture pero carece de tour(157),
  godRays(177), raymarch(183) y slice(201). Linaje solo-operador:
  264f7f8 sigue DECLARADO (estándar 199/208/209) — el fichero
  completo jamás ha viajado.

## 3. L2 FOLD — 5/5 byte-exacto + escena scaffold+cross-cert
- BYTE-EXACTOS (repos aislados, pre-blobs verificados ANTES del
  apply): types 94c53ad→**00dfd14** (+showIso/showLabels con defaults
  false); builders 0c78d41→**50a8063** (buildRefRings→buildRefShells);
  LayersPanel becdc5a→**11c9fdd** (9→12 toggles: Ref shells / Iso
  bands / Etiquetas); refshells NUEVO **7c26a0e**; refshells.test
  NUEVO **5c1747b** (8 its: 4 alturas/guard/clave + 2 constantes +
  2 cull/medianoche).
- Escena (sección 232 líneas, 9 hunks): scaffold de 695 líneas
  (77 reales + 618 pads, posiciones exactas) — apply --check y apply
  LIMPIOS ⇒ aritmética interna consistente. **Cross-cert verbatim**
  del pre-contexto contra post-imágenes viajadas: 157→10/55 (import
  tour, tourLastIdx), 177→4/39 (buildGodRaysPass), 183→8/65
  (buildVolumeMesh + comentario W-3 P2-182), 201→19/105 (SLICE_SEG/
  SLICE_LVL/imports slice), 207→1/9, 209→**0/5 esperado** (el 219 no
  toca la región 771-781 — cero conflicto con el label-centro del
  209). Post **55eda60 DECLARADO** line-coherente.
- El bloque per-frame de reescritura de anillos (defs [90,110,170,
  300], reescritura de vértices por frame) queda ELIMINADO — «quits
  per-frame rewrite» verificado estructuralmente (hunk @@ -422,23).

## 4. TU locales — 19/19 (tsc+node, fixtures VERBATIM)
- 8/8 nuevos sobre refshells 7c26a0e + geo sandbox d2f5c06:
  alturas ([280,300,320]→{110,240,300}; [150,160]→{110,150,160} por
  mediana SUPERIOR), guard (vacío/[0,−3]/[0.2]→null), clave
  ("110|240|300|2.2" + sensibilidad a exageración), colores, iso
  10.5/11/11.5 ancho 0.02, cull (0.1/0.5·(1.2,0)/(0,−1.2)/ok) y
  **medianoche == vec3ToLatLon del antisolar** (3 direcciones,
  |d|<5e-10 — la réplica es algebraicamente la identidad: midnightLon
  computa phi_anti=atan2(−z,x), lon=phi·RAD−180 == convención geo).
- 11/11 replay re-run SIN FLIPS (5 C1 + 5 C2 + p3) sobre el types
  00dfd14. Suite 139+8=147 aritmética coherente; barrera vitest
  147/147 = MUSE; tsc local 0 (harness compila limpio).

## 5. Semántica vs espejo m12 — EXACTA
- **Altitudes (App.cpp:2487 EXACTO)**: `updateAltitudes(110.0f,
  max(150.0f, 0.8f*mh), mh)` ↔ web refAltitudes {e:110, f1:max(150,
  0.8·mh), f2:mh}; mediana `hv[hv.size()/2]` (superior) ↔ `vs[vs.
  length>>1]`; filtro `s.valid && s.hmF2>0` ↔ `(s.hmF2??0)>0`; hv
  vacío → sin update (anillos a defaults) ↔ null → sin rebuild.
- **Cáscaras**: RefShells.h defaults altE_/altF1_/altF2_ = 110/200/
  300 ↔ init web `buildRefShells({e:110,f1:200,f2:300}, 2.2)`;
  colores :71-73 (0.10,0.45,0.20 / 0.50,0.42,0.10 / 0.50,0.22,0.07) ↔
  REF_COLORS BYTE-IGUAL; paralelos {0,±30,±60} N=72 y 6 meridianos
  N=48 ↔ web idéntico; r=1+(alt/6371)·explode ↔ idéntico; solo
  E/F1/F2 sin D ↔ D=90 eliminado; explode clamp [1,5] (setExplode).
- **Iso-bands**: u_isoOn ? 1:0 (:273) ↔ `vm.u_isoOn.value = showIso
  ? 1 : 0`; u_isoWidth 0.02 (:274) ↔ ISO_WIDTH; niveles «10.5/11/
  11.5 (normalizado 0.556/0.667/0.778)» (:128-129) ↔ ISO_LEVELS.
- **Labels (App.cpp:5469-5525)**: project() facing<0.15 «cara
  oculta» ↔ labelCulled; ndc ±1.1 ↔ |ndcX|,|ndcY|>1.1; offset
  `ImVec2(s.x+12, s.y−26)` ↔ +12/−26; estación: pinned→(fallback
  hover) ↔ tx→(fallback rx), formato "%s F2 %.0fkm" ↔ template
  idéntico, hm 300 fallback, #ffdc50 ↔ IM_COL32(255,220,80) EXACTO;
  aurora 67N a 110 km sobre el meridiano de medianoche — **cada
  fórmula es la antisolar en su convención** (app theta=π−lon con
  «meridianos rotados 180°» RefShells.cpp:31-35; web φ=(lon+180)°,
  geo.ts declara «convención idéntica a la del proyecto C++») —
  verificado algebraicamente en ambos sentidos; TEC sub-cámara a 300
  km (clat=asin(cd.y), clon por convención) ↔ camLL vec3ToLatLon.
- **Toggles (App.cpp:4230-4236)**: Checkbox "Iso bands"/"Labels" con
  tooltips ↔ showIso/showLabels + UI "Iso bands"/"Etiquetas";
  "Ref shells" ↔ showRings (setting preexistente, ahora con toggle).
- **Rebuild**: app updateAltitudes con histéresis 0.5 km (:118) +
  «llamar cuando cambien >5 km» (RefShells.h) ↔ web rebuild por clave
  exacta (altitudes+exageración) — ver matiz o6.

## 6. Matices (micro, no bloqueantes)
- o1 **colores labels aurora/TEC**: web #50ff88/#50a0ff vs app
  IM_COL32(120,255,140)=#78ff8c / IM_COL32(140,200,255)=#8cc8ff
  (estación #ffdc50 sí EXACTO). Paleta propia del web, cosmético.
- o2 **fallback de estación**: app pinned→hover; web tx→rx.
- o3 **hmF2==0**: app hm≤0→300; web `hmF2 ?? 300` (solo null→300).
- o4 **NDC-z**: app también culla ndc.z>1.0; web no chequea z.
- o5 **leader line**: app dibuja línea s→t + punto 2.5px; web
  punto+texto inline (sin línea) — affordance simplificada.
- o6 **histéresis**: app salta rebuild si |Δ|<0.5 km en las tres
  alturas; web rebuild por cambio exacto de clave. Equivalencia
  práctica: el efecto web corre por cambio de deps (no por frame).
- Los seis son declarables/cosméticos; NINGUNO toca conducta medida
  por TU o anclas del espejo.

## 7. Adenda E o3-o6 (prescripción 218) — RAYIFICADA
- o3 GIRO 72×72 vs 72×36: ADAPTACIÓN declarada (doblar celdas ~2×
  coste/update; alineación solo con medida en E-tail) — aceptada.
- o4 DIAS EU: DECLINADA confirmada (sin cambio) — coherente con
  IdeasPanel:141.
- o5 stale/M4R-A + o6 point-size: backlog E-tail (fontanería
  StationData + slider) — registrados.
- **F2 declarada**: espejo opacidad setOpacityScale **[0,3]**
  (VolumeRenderer.h:37 EXACTO: `glm::clamp(k, 0.0f, 3.0f)`) con
  slider UI 0-2.5 como el app + modo Chapman → **o7-218 RESUELTO
  prospectivamente** (F2 deberá declarar cuál espeja al entrar).

## 8. Oráculos de continuidad (post-220)
types **00dfd14**; builders **50a8063** (nuevo, byte); LayersPanel
**11c9fdd** (nuevo, byte); refshells **7c26a0e** (nuevo); refshells.
test **5c1747b** (nuevo); escena **55eda60 DECLARADA** (scaffold+
cross-cert). Sin cambio: route 50e77eb, page e45355c, TimeBar
98879f9, replay.test 174864e, slice c1ac6d9, slice.test d3a1315,
RadioPanel 46fcb9e, geo d2f5c06 (sandbox, sin viajes).

## 9. Prescripciones
- p1-221 (smoke F1): los tres toggles ON, wireframe tricolor con
  paralelos/meridianos visibles, label "TEC shell", iso si Volumen
  ON, −168 h. NOTA: los colores de dot/aurora/TEC del PNG se leerán
  contra la PALETA WEB (#ffdc50/#50ff88/#50a0ff — matiz o1), no
  contra la del app.
- p2-F2 (223+): densityVolume.ts y compañía viajan por PRIMERA VEZ —
  aplicar recuperación/scaffold; OJO: si el sandbox es fork (como la
  escena), el método es scaffold+cross-cert, y el oráculo quedará
  declarado. Traer la declaración espejo de opacidad ([0,3] interno
  vs 0-2.5 UI) y modo Chapman (u_colorMode 0/1).
- p3 (opcional): alinear colores aurora/TEC al app o declarar la
  paleta propia en el tooltip (o1).

Ledger: …/215/216(GLM)/217/218(GLM)/**219/220(GLM)**/221(en trámite
→ 222)/223 libre (F2). 193-194 reservados (swap). P1 (fps) sigue en
manos del operador con método aceptado. glmrelay @ (tras este push).
