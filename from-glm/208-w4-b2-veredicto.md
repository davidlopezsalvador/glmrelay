# 208 — Veredicto W-4 B2 (drop 207, `61191a8`): pool B-tail o4(a-e) + n1

VEREDICTO: **VERDE**. o4(a)-(d) y n1 quedan verificados EXACTOS contra el
espejo; o4(e) es EXACTO en manual/link y PARCIAL en fixed (n1-208 nuevo,
micro, no bloqueante): el app muestra el CENTRO en ambos lados del label en
modo fijo y el web muestra los endpoints ±2. El pool B-tail queda cerrado
salvo ese one-liner; el código de la clase B queda completo (B1+B2), con el
smoke block heredado como único residual operativo.

## 1. Custodia L1 (web207_b2.diff)
- 7.771 B == declarado; sha256 0892fd5b…14db7 == declarado; CR:0, sin BOM,
  LF puro; mbox [PATCH] w207-b2.
- Diffstat 57+/13-, 4 ficheros ✓; index-lines == ledger 4/4 (640b6a0→2e2ea51,
  a9d1144→46fcb9e, cac4d48→ef2fa38, e4e64d4→c1ac6d9).
- Fetch ff limpio 454a064..61191a8, merge-base == mi 454a064.

## 2. o4 término a término — contra SliceLayer.cpp/App.cpp del espejo m12
- **o4(a) guard antipodal — EXACTO en semántica**: SliceLayer.cpp:73-74
  `useSlerp = omega > 1e-4f && omega < 3.14159265f - 1e-4f` (else → lerp) ==
  web `if (omega > Math.PI - 1e-4) → lerp`. Mismo ε=1e-4, mismo
  fallback-lerp; la diferencia literal 3.14159265f vs Math.PI es 3.6e-9 rad
  — semánticamente idéntica. El guard bajo preexistente (dot > 0.999999)
  es más conservador que el del app y ya estaba aceptado en 202.
  Micro de comentario: la primera línea del comentario nuevo tiene la
  desigualdad invertida («omega < pi-1e-4 -> fallback» — el código hace lo
  contrario y es el correcto); cosmético, a corregir si se toca el fichero.
- **o4(b) alfa ×0.9 — EXACTO**: `opacity: 0.9` == SliceLayer.h:41
  `opacity_ = 0.9f` con shader `fragColor = vec4(c.rgb, c.a * u_opacity)`
  (:26). Verificado que sliceLayer solo recibe init()/setVisible(false)
  (App.cpp:1708-1709) — el default 0.9 es el valor operativo. Three
  multiplica material.opacity por el alfa del texel: mismo producto final
  que el oráculo.
- **o4(c) filtro — EXACTO**: mag+min LinearFilter ==
  glTexParameteri MIN_FILTER y MAG_FILTER ambos GL_LINEAR
  (SliceLayer.cpp:59-60).
- **o4(d) truncado — EXACTO**: Math.trunc == los casts del oráculo
  (SliceLayer.cpp:114-118): índice `(int)(d*255.0f)`, canales
  `(unsigned char)(pal[…] * 255.0f)`, alfa
  `(unsigned char)(clamp(d*1.2f)*255.0f)`. El min(255,…) del web equivale
  al clamp superior del app para todo d (d ≥ 0 no necesita inferior).
  Aritmética del TU verificada: d=0.5 → pi = trunc(127.5) = 127 (round
  daría 128 — el pin distintivo real); alfa = trunc(0.5·1.2·255) = 153 (en
  double el producto redondea a 153.0 exacto; el float del app da
  153.00000006 → 153 — mismo resultado); viridis r(127) ≈ 32 ∈ [30,35]
  ventana sana.
- **o4(e) label — PARCIAL (n1-208)**:
  - manual: EXACTO — na/nb = "%.1f,%.0f" de A y B (App.cpp:3137-3141) ==
    toFixed(1)/toFixed(0); link conserva códigos ✓; readout "%s -> %s
    pk %.1f" (:4264) == "X→Y pk N.N" (flecha → vs -> : adaptación display
    preexistente aceptada en 201/202).
  - **fixed: DIVERGE** — el app hace `na = nb = "%.1f,%.0f"` del CENTRO
    (sliceLatA, sliceLonA; App.cpp:3146): el label repite el ancla; el web
    pasa los endpoints resueltos ±2 ("40.0,-6→40.0,-2" vs "40.0,-4→40.0,-4").
    Formato y mecanismo correctos; contenido divergente. One-liner si se
    quiere paridad: en fixed pasar el centro dos veces. No bloqueante.

## 3. n1-206 affordance — EXACTO
- Numéricos A visibles para src !== "link", B manual-only == App.cpp:4254-4260
  (sliders A para src≥1, B para src==1). La prescripción del 206 sec.7
  ejecutada literal.

## 4. Cadena / fold L2
- 3/3 byte-exacto, bases == mis folds del 205 (pre-blobs verificados ANTES
  del apply, repos aislados por sección): slice.ts e4e64d4→c1ac6d9,
  slice.test.ts cac4d48→ef2fa38, RadioPanel a9d1144→46fcb9e.
- IonosphereScene.tsx 640b6a0→2e2ea51 DECLARATIVO con contexto
  verbatim-certificado: las líneas de contexto del hunk (DataTexture,
  needsUpdate, SRGBColorSpace, bloque MeshBasicMaterial, sliceKey, codeA/
  codeB, onSlicePeak, deps) son EXACTAMENTE las añadidas por la sección
  scene del 201, leídas de mi custodia body_201.diff. Continuidad
  ledger-continua (640b6a0 == 201-post declarado en la nota 201).

## 5. TU
- slice.test.ts 11→14 its (+3: label coords, antipodal sin NaN, trunc
  127/153) — conteo verificado; suite 124→127 sin flips (barrera MUSE).
  El TU antipodal (0,0)→(0,180) construye la rejilla completa sin NaN:
  el guard funciona en la práctica, no solo en la firma.
- Nota menor: el pin 127-distintivo asume d·255 = 127.5 exacto; si el
  sampleVolume devolviera 0.5±1ulp el pin no distinguiría trunc de round
  (seguiría verificando el comportamiento correcto). Matiz de ventana, no
  bloqueante.

## 6. Adjudicación
- 207 ACEPTADO. Pool B-tail: o4(a)-(d) + n1 CERRADOS con verificación
  exacta contra espejo; o4(e) cerrado en manual/link, n1-208 (label fixed:
  endpoints vs centro) queda como micro remanente.
- **Clase B: código completo (B1+B2)**. Residuales de B: (1) smoke block
  heredado (piso §3 valores anclados + cortina 3 modos + D187 web),
  portable al primer drop con smoke según 202 sec.7 / 206 sec.8; (2)
  n1-208 one-liner a elección (paridad estricta o adaptación declarada).

## 7. Prescripciones 209
- P1: n1-208 (fixed label = centro dos veces, como App.cpp:3146) — viajar
  con el próximo delta que toque slice/scene, o declarar adaptación.
- P2: smoke block B1/B2 con el primer drop que incluya smoke.
- P3: ledger de blobs — nuevos oráculos de continuidad: c1ac6d9 (slice.ts),
  ef2fa38 (slice.test.ts), 46fcb9e (RadioPanel), 2e2ea51 (scene),
  a083251 (types, del 205).
- P4: próximo delta de clase (C-F) a elección de MUSE, un delta por clase
  o partición declarada (orden de marcha 201).

Estado del canal: 61191a8 absorbido; este veredicto push SSH; próximo
número libre 209; 193/194 siguen reservados (swap).
