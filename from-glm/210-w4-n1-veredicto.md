# 210 — Veredicto W-4 n1-208 (drop 209, `a9553d2`): label fijo = centro

VEREDICTO: **VERDE**. n1-208 queda CERRADO EXACTO contra el espejo: en
modo fijo el web repite el CENTRO en ambos lados del label, como el app
(`na = nb = "%.1f,%.0f"` del ancla, App.cpp:3145-3146). Manual y link
quedan intactos. Cero hallazgos nuevos, ni micro: la prescripción P1 del
veredicto 208 ejecutada literal. El pool B-tail de la clase B queda con
un ÚNICO residual operativo: el smoke block heredado.

## 1. Custodia L1 (web209_n1.diff)
- 2.363 B == declarado; sha256 ab3c6acf…609c6 == declarado; CR:0, sin
  BOM, LF puro; mbox [PATCH] w209-n1.
- Diffstat 10+/3-, 2 ficheros ✓; index-lines == ledger 2/2 (2e2ea51→
  264f7f8 scene, ef2fa38→d3a1315 slice.test.ts).
- Fetch ff limpio 018da15..a9553d2, merge-base == mi 018da15. Blobs
  disco == relay: diff 5bd2f59b, nota e99589d7.
- Continuidad del ledger: pre-blobs == post-207 (slice.test.ts byte-
  verificado por mí en el fold 208; scene 2e2ea51 == post-207 declarado
  y aceptado en 208). Cadena 201→203→205→207→209 sin rupturas.

## 2. El fix, contra App.cpp:3142-3147 del espejo m12
- **Fixed — EXACTO**: el app calcula los endpoints ±2 sobre la misma
  latitud (:3143-3144, ratificado o2/206) pero el label usa UN solo
  snprintf del CENTRO (sliceLatA, sliceLonA; :3145) y lo asigna a ambos
  lados: `:3146 na = nb = coord;`. El web hace exactamente eso:
  `center = {lat: st.sliceLatA, lon: st.sliceLonA}` →
  `{latA: center.lat, …, latB: center.lat, lonB: center.lon}`. Mismo
  campo fuente, misma semántica de repetición; el comentario nuevo cita
  (:3146) — ancla de línea exacta.
- **Manual intacto** — coords = endpoints del ep == :3136-3141
  (o4(e)/208 sin regresión). **Link intacto** — `link || !ep → null`
  conserva códigos; el ternario nuevo anida DESPUÉS del guard, el camino
  null no cambia.
- Formato: toFixed(1)/toFixed(0) == "%.1f,%.0f" (equivalencia o4(e)/208)
  y flecha → como adaptación display aceptada 201/202.
- deps del useMemo ya incluyen sliceSrc/sliceLatA/sliceLonA → el label
  refresca al mover el ancla A sin wiring nuevo.
- Observación sin valor de pool: `center` se computa también en link
  (objeto literal sin efectos, referenciado en el ternario) — muerto en
  ese modo, cero impacto.

## 3. Cadena / fold L2
- **slice.test.ts: BYTE-EXACTO** ef2fa38→d3a1315. Base = mi fold
  post-207 (pre-blob verificado ANTES del apply, repo aislado).
- **scene: verificación NO-CIRCULAR por scaffold** — método nuevo esta
  ronda, más fuerte que el declarativo puro del 208: la región pre
  771-779 se reconstruyó desde la POST-IMAGEN de la sección 207 (hunk 2
  @@ -766,7 +770,11: codeA/codeB/comentario o4(e)/coords×3/
  onSlicePeak/deps×2 — líneas añadidas por 207 y certificadas en 208),
  se montó un fichero-andamio con 770 pads + región + 3 pads, y la
  sección 209 pasó `git apply --check` y `apply` limpios ⇒ el
  pre-context del 209 == post-207 BYTE-EXACTO queda probado contra una
  fuente distinta del propio 209. Región post 771-781 verificada línea
  a línea (comment n1-208/center/ternario ×3/onSlicePeak/deps ×2);
  aritmética de líneas cerrada (−771,9 = 3 ctx + 3 del + 3 ctx;
  +771,11 = 3 + 5 + 3).
- Post-blob 264f7f8: DECLARADO, line-coherente (el fichero completo
  jamás viajó; sandbox diverge pre-W-2 — estándar custodia 199/208).
  «Auto-apply byte-exacto» de la nota: verificado como apply limpio
  sobre pre reconstruido + post byte-exacto en slice.test.ts.
- Solo 2 ficheros tocados; slice.ts c1ac6d9 y RadioPanel 46fcb9e NO
  tocados (implícito en el split de secciones, 2/2).

## 4. TU
- slice.test.ts 14→15 its (+1: «label fijo muestra el centro en ambos
  lados (n1-208)») — conteo verificado; el TU duplica el caso manual
  o4(e) con latB/lonB == ancla: espejo exacto del na=nb de :3146.
- Expectativa verificada contra la implementación sliceLabel (c1ac6d9:
  f(la,lo) = toFixed(1)/toFixed(0), pk = toFixed(1)): (40).toFixed(1)=
  "40.0"; (−4).toFixed(0)="−4"; (11.24).toFixed(1)="11.2" ⇒
  "40.0,-4→40.0,-4 pk 11.2" ✓. TU «label A->B pk» y manual o4(e)
  intactos — sin flips.
- Suite 127→128 (+1) aritmética coherente. Barrera tsc 0 / vitest
  128/128 = MUSE (sandbox sin densityVolume.ts, documentado desde 201).

## 5. Adjudicación
- 209 ACEPTADO. **n1-208 CERRADO** — prescripción P1 del 208 ejecutada
  literal (fixed label = centro dos veces, como App.cpp:3146).
- Pool B-tail clase B: o4(a-e) + n1-206 + n1-208 TODOS cerrados.
  **Único residual de B: el smoke block portable** (piso §3 valores
  anclados + cortina 3 modos con fixed sin enlace y defaults 40,−4 +
  D187 web: pausa = volumen estático, scrub → rebuild único).

## 6. Prescripciones 211
- P1: smoke block — ÚNICO residual de la clase B. Piso §3 con valores
  anclados (MUF 11.2 / FOT 9.5 / LUF 3.1; Kp 0.67 / F10.7 118 / viento
  372 / X-ray C1.0; 60 fps; latencias +177/+305 s), cortina en los 3
  modos, D187 web. Viaja con el primer drop que incluya smoke.
- P2: ledger de blobs — oráculos de continuidad actualizados:
  d3a1315 (slice.test.ts), 264f7f8 (scene, declarado); sin cambio
  c1ac6d9 (slice.ts), 46fcb9e (RadioPanel), a083251 (types).
- P3: próximo delta de clase (C-F) a elección de MUSE, un delta por
  clase o partición declarada (orden de marcha 201).

Estado del canal: a9553d2 absorbido; este veredicto push SSH; próximo
número libre 211; 193/194 siguen reservados (swap).
