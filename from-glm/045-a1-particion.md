# 045 — PARTICIÓN (a1): retícula-bloom — peine denso k=1..24 + PIN near-taps
#      · SCOPE TAXATIVO: 2 ficheros, 3 ítems (emitida tras la decisión de
#      David, nota to-glm/045; disciplina ruling-primero, patrón 042)

Emisor: GLM (árbitro) · Contraparte: MUSE · Decisor final: David (ya decidió:
(a1) densificar con huella — esta partición convierte la decisión en contrato)

## 0. Contexto, base y numerología

- Decisión registrada (to-glm/045-decision-a1-particion.md, drop 8111d2b):
  vía **(a1)** frente a (b12)/(d). El Pareto medido del 044 queda archivado;
  (b12) permanece medido y disponible si el look a1 no convence en vivo.
- Base del fold = árbol **dd985604** (faseb042-folded). 043/044 fueron
  consultas: CERO código desde 042.
- NUMERACIÓN: 045 comparte número por rol (patrón 042): decisión (to-glm,
  ya en relay) · **esta partición** (from-glm/045-a1-particion) · paquete
  (to-glm/045-a1-paquete + files/a1045delta.txt) · veredicto (from-glm/
  045-a1-veredicto). Cierre del ciclo = veredicto 045.
- **RESTAURACIÓN DEL ESPEJO (incidente #10, previa a esta partición)**: los
  folds 039/042 se re-emitieron desde los deltas custodiados. Cirugía v2 del
  039 reproducida BYTE-EXACTA (mbox sha256 a8ebe2c9…fb3 == prefijo/sufijo
  registrados en el veredicto 039; script scripts/zone039_cirugia_v2_recover.py)
  → tree gate **4e161f68** EXACTO + determinismo ×2; fold 042 limpio → tree
  gate **dd985604** EXACTO; numstat/EOL idénticos a lo certificado (App.cpp
  4932/1880 · LgdcTrace 71/0); tags zone-folded y faseb042-folded re-creados
  (4d90fa8 · b3b0813). El espejo vuelve a ser base válida de G3.
- **CORRECCIÓN DE CITA (protocolo corrección 041, append-only)**: mi respuesta
  044 citaba "u_direction :3223/:3239, ≈:3247/:3263 en dd985604". El +24 era
  un hecho de líneas >4736 (hunks Zone/tooltip/slider) mal generalizado:
  medido sobre dd985604 restaurado, u_direction queda en **:3223/:3239 SIN
  desplazamiento** (igual que el badge :4030; solo las líneas bajo ~4736
  llevan +24). La nota 044 no se reescribe.
- EMPÍRICA PRE-RULING ya persistida (§6): la tabla del 044 mide EXACTAMENTE
  lo que esta partición prescribe — regresión EXACTA del BASE 043 + variante
  a1 con energía 1.000 y pico ×1.05. Nada de lo que se pide aquí está sin
  medir.

## 1. SCOPE TAXATIVO: 2 ficheros, 3 ítems, NADA más

name-only EXACTO del drop 045:
  shaders/bloom.frag      (ítem A1-S: peine denso — el kernel activo)
  src/App.cpp             (ítems A1-F: fallback embebido · A1-D: u_direction)

- CERO ficheros nuevos. **CMakeLists.txt INTACTO** (el copy-step de shaders/
  :116-119 copia contenido, no lo compila — un cambio de .frag no necesita
  wiring). Sin TUs nuevas ni modificadas: los shaders son datos en runtime.
- Intocables por blob (transitivo): TODO lo demás. Guardas explícitas contra
  confusiones de scope:
  * shaders/composite.frag (blob 81d71456) y shaders/bloom.vert: intactos.
  * src/Render/Framebuffer.h (d7d3cbdd) y el resize :1716: intactos — a1 NO
    toca el ping-pong F0/F1 (esa era la letra (b12)).
  * src/Ionosphere/HFTraceLayer.h:321 bloomBypassThreshold() y el bypass V
    App.cpp:3241: intactos (el V-passthrough M9f no cambia).
  * RT half-res App.cpp:1623-1624: intacto (la geometría del fix depende de
    él: 1 texel = 2 px).
  * Pre-imágenes (dd985604): bloom.frag blob **4f9b7f7c** · App.cpp blob
    **15adf6b1** — el tree gate del paquete las verifica.
- HALLAZGO DE SCOPE (nuevo, no estaba en la letra 044): App.cpp:1202-1240
  contiene el **fallback embebido** del shader bloom (loadFromSource si falla
  la carga del fichero) con la MISMA copia del kernel. Precedente: M9g FIX C
  actualizó AMBAS copias. Y el PIN lo exige: el fallback con 0.35/0.70×texel
  y stride 1 colapsaría el núcleo a 0.7/1.4 px en esa vía. Por eso el scope
  App.cpp lleva DOS zonas (fallback + u_direction). Solo existen 2 copias del
  kernel en el repo (grep 0.1945946: exactamente bloom.frag:22 y
  App.cpp:1223).

## 2. Ítem A1-S — peine denso k=1..24 (bloom.frag:22-39)

El bloque actual (líneas 22-39: tabla weight[5] + bucle i=1..4 + bloque M9g
con nt1/nt2) se sustituye por el bloque canónico de abajo. Literales EXACTOS:

```glsl
    // 045 (a1): peine denso k=1..24 (1 texel half-res = 2 px) — sustituye el
    // peine disperso i=1..4 (stride 6 = 12 px) que sellaba cada fuente puntual
    // sobre umbral en la retícula de 12 px (causa 043, decisión 045). Pesos:
    // la curva del kernel anterior muestreada cada 2 px y renormalizada a la
    // MISMA masa discreta por dirección (suma 24 literales = 0.386486194 vs
    // 0.3864862 base); núcleo 0.227027 y near-taps M9g intactos.
    float wfar[24] = float[](
        0.005501586, 0.01100317, 0.01650476, 0.02200634, 0.02750793, 0.03300952,
        0.03094642, 0.02888332, 0.02682023, 0.02475713, 0.02269404, 0.02063094,
        0.01872067, 0.0168104, 0.01490012, 0.01298985, 0.01107957, 0.0091693,
        0.008099543, 0.007029786, 0.005960028, 0.004890271, 0.003820514, 0.002750756);
    vec3 result = brightPass(texture(u_texture, vUV).rgb) * 0.227027;
    vec2 texel = u_direction / u_resolution;
    for (int k = 1; k <= 24; k++) {
        result += brightPass(texture(u_texture, vUV + texel * float(k)).rgb) * wfar[k - 1];
        result += brightPass(texture(u_texture, vUV - texel * float(k)).rgb) * wfar[k - 1];
    }
    // M9g FIX C (paridad mip0 UnrealBloom, prescrito GLM): taps cercanos a
    // 2.1/4.2 texels del RT half-res (= 4.2/8.4 px pantalla) — DESACOPLADOS
    // de u_direction desde 045 (PIN: eran 0.35/0.70×texel relativos al
    // stride 6; con stride 1 colapsarían a 0.7/1.4 px y matarían el núcleo).
    // Sin renormalizar: fuera de la cabeza aportan ~0 -> falda lejana y
    // reposo intactos (L 0.587 < 0.72 -> brightPass~=0).
    vec2 nt1 = texel * 2.1;
    vec2 nt2 = texel * 4.2;
    result += brightPass(texture(u_texture, vUV + nt1).rgb) * 0.10;
    result += brightPass(texture(u_texture, vUV - nt1).rgb) * 0.10;
    result += brightPass(texture(u_texture, vUV + nt2).rgb) * 0.06;
    result += brightPass(texture(u_texture, vUV - nt2).rgb) * 0.06;
```

- La tabla es la construcción EXACTA del simulador (densified(2.0)): curva
  (0,0)→(12,0.1945946)→(24,0.1216216)→(36,0.054054)→(48,0.016216) muestreada
  a d=2k px (k=1..24) y escalada a Σ=0.3864862 (S=0.169632228). Generador
  persistido: scripts/a1045_tabla_densa.py (rounding %.7g, suma de los 24
  literales redondeados = 0.386486194, |Δ| ≤ 1e−8).
- **INVARIANTE DECLARABLE (la masa no cambia)**: w0 + 2·Σwfar + near ==
  0.227027 + 2·0.386486194 + 2·(0.10+0.06) == 1.319999388 vs BASE 1.3199994.
  La ganancia de contenido liso queda intacta (energía sim 1.000).
- brightPass, u_pass/u_intensity y el resto del fichero: byte-idénticos.
- Comentarios: el bloque canónico de arriba es el prescrito; se admite
  salvedad de FORMA (recorte de prosa) siempre que sobrevivan los substrings
  exigidos: `045`, `k=1..24`, `2.1/4.2`, `DESACOPLAD`, `4.2/8.4 px`.
- Geometría (ambas pasadas, verificada): H lee la escena full-res con
  texel=1/680 → taps a 2k px; V lee F0 half-res con texel=1/360 → 1 texel =
  2 px. Near-taps 2.1/4.2 texels = 4.2/8.4 px en ambas. Fetches/fragmento:
  13 → 53 por pasada (106 totales — fumata roja como criterio, 044 §4).

## 3. Ítem A1-F — el fallback embebido (App.cpp:1223-1235)

La MISMA cirugía en la copia string (estilo compacto del fallback, SIN
comentarios — consistente con su estilo actual):

```cpp
            "  float wfar[24] = float[](\n"
            "    0.005501586, 0.01100317, 0.01650476, 0.02200634, 0.02750793, 0.03300952,\n"
            "    0.03094642, 0.02888332, 0.02682023, 0.02475713, 0.02269404, 0.02063094,\n"
            "    0.01872067, 0.0168104, 0.01490012, 0.01298985, 0.01107957, 0.0091693,\n"
            "    0.008099543, 0.007029786, 0.005960028, 0.004890271, 0.003820514, 0.002750756);\n"
            "  vec3 result = brightPass(texture(u_texture, vUV).rgb) * 0.227027;\n"
            "  vec2 texel = u_direction / u_resolution;\n"
            "  for(int k=1;k<=24;k++){\n"
            "    result += brightPass(texture(u_texture, vUV + texel * float(k)).rgb) * wfar[k-1];\n"
            "    result += brightPass(texture(u_texture, vUV - texel * float(k)).rgb) * wfar[k-1];\n"
            "  }\n"
            "  vec2 nt1 = texel * 2.1;\n"
            "  vec2 nt2 = texel * 4.2;\n"
```

(sustituye a :1223-1231: la tabla weight[5] por las 5 líneas wfar, el
weight[0] por 0.227027, el bucle compacto i<5 por k<=24, y nt1/nt2 por los
multiplicadores absolutos; :1232-1235 —las 4 líneas result+= con nt1/nt2—
QUEDAN INTACTAS como contexto).

- **EOL de la zona (lección 039 viva aquí)**: las 6 líneas :1230-1235 llevan
  CR (isla M9g residual del fichero); el resto de la zona es LF. PRESCRITO:
  las líneas NUEVAS van en **LF** (práctica de casa, precedente 010); las 4
  ctx :1232-1235 conservan sus CR intactos (no se re-escriben — tocarlas
  sería scope-creep cosmético). Esperado post-fold: App.cpp CRs 1880 → **1878**.
- El fallback NO lleva el bloque de comentarios (su estilo actual es puro
  código string); el PIN queda documentado en bloom.frag (§2).

## 4. Ítem A1-D — u_direction 6→1 (App.cpp:3223 y :3239, zona LF)

Literal EXACTO (2 líneas modificadas, indentación 8 espacios, sin tocar nada
más de los bloques bloom):

  -3223-  impl->bloomShader.setVec2("u_direction", glm::vec2(6.0f, 0.0f));
  +3223+  impl->bloomShader.setVec2("u_direction", glm::vec2(1.0f, 0.0f));
  -3239-  impl->bloomShader.setVec2("u_direction", glm::vec2(0.0f, 6.0f));
  +3239+  impl->bloomShader.setVec2("u_direction", glm::vec2(0.0f, 1.0f));

- u_resolution NO se toca (sigue = dims de bloomFBO[0]; V-pass la hereda —
  ambas FBO same-size, verificado). Sin desplazamiento de líneas: numstat
  App.cpp neto = el del fallback (+4 de la tabla) con 0 líneas netas aquí.
- Citas SIN el +24 (ver §0 corrección): en dd985604 son literalmente
  :3223/:3239.

## 5. Poblaciones y EOL (censo medido-manda; método 039 exacto)

POBLACIONES SIN CAMBIO (ambos ficheros cambian de blob → re-verificar todas):
  * 039: perLayerZoneName 12 · zoneForAge 11 · zoneName( 5 · solo-TEC
    (IrtamState.cpp) 2 · TEC+IRTAM 5.
  * 042: "buf[64]" LgdcTrace.cpp 1 · "Switching" 1 · "re-clamps" 1 ·
    "never jumps to live" 1 · "inherited frames" App 1 · tbuf[32] App 1.
  * Kernel viviente: "0.227027" 1→1 por fichero · las 4 líneas result+= de
    near-taps ("vUV + nt1" etc.) 1→1 por fichero · "0.1945946"/"0.1216216"/
    "0.054054"/"0.016216" SOLO desaparecen del CÓDIGO (si los comentarios
    canónicos los citan, quedan 1→1 en comentario — declarar en la nota).
PINES NUEVOS (0→1):
  * "wfar[24]" bloom.frag 1 · App.cpp 1 (nombre prescrito §2/§3)
  * "0.005501586" (k=1) y "0.002750756" (k=24): 1 por fichero cada uno
  * "texel * 2.1" y "texel * 4.2": 1 por fichero cada uno
  * "glm::vec2(1.0f, 0.0f)" App.cpp 1 · "glm::vec2(0.0f, 1.0f)" App.cpp 1
PINES ELIMINADOS (1→0, por fichero):
  * "texel * 0.35" y "texel * 0.70" (los multiplicadores stride-relativos)
  * "float weight[5]" (la tabla dispersa)
EOL esperado post-fold (medido-manda; hoy dd985604: App.cpp 4932/1880 ·
bloom.frag 44/0):
  * shaders/bloom.frag: LF puro (0 CRs), ~55 líneas (hunks canónicos §2:
    23+/12−, neto +11 sobre 44).
  * src/App.cpp: 4936 líneas / **1878** CRs (+4 netos de la tabla fallback;
    −2 CRs por las nt1/nt2 nuevas en LF; las :1232-1235 conservan CR).
  * numstat total del drop: 2 ficheros, ≈36+/21− en forma canónica (bloom.frag
    23+/12− · App.cpp 13+/9−; el EXACTO lo declara la nota; el tree gate
    cierra contenido).

## 6. Empírica pre-ruling (persistida — esto ya está medido)

- scripts/ev044_sim_opciones.py (regresión EXACTA del 043: BASE 0.357/0.865)
  + scratch-ev044/sim044_results.json + sim044_cortes.png + hoy
  scripts/a1045_tabla_densa.py (la tabla §2 es su salida literal).
- Números de calibración de las bandas §7 (a1 vs BASE, misma métrica):
  composite ac@12 x/y 0.021/0.059 vs 0.357/0.383 → ratios **5.9%/15.4%**;
  ac@24 0.023/0.061 vs 0.282/0.289 → **8%/21%**; energía capa **1.000**;
  pico del punto **×1.05**; sello12_ratio 6.71 → **0.861**; control PCHIP
  0.017 (los kinks de la interp lineal no son el mecanismo).
- El residual y (15.4%) es la falda ANCHA de near-taps (ac@6 0.079, ac@8
  0.085 — estructura sub-12px legítima del núcleo M9g), NO un pico de peine:
  por eso las bandas §7-G1 son POR EJE.

## 7. Barrera A/B — dos puertas cuantitativas + la build estándar

**G1 FIRMA** (condiciones 043: color layer hidden, panel Bloom legible en
captura con Threshold 1.000 / Intensity 1.222 / Strength 1.873 / Exposure
0.491, lado nocturno Black Marble). Capturas: **S5 primero** (sonda de
aceptación), luego pareja A/B (A = build BASE dd985604, B = build a1), misma
sesión, misma vista y zoom (la retícula es screen-locked: la métrica ac es
robusta a la deriva de contenido; si la vista cambia visiblemente, repetir).
Métrica: ev043_reticula_medida.py (hp σ=6, ac por líneas, región 3D).
Bandas PRE-REGISTRADAS (en % del A MISMO-EJE MISMA-CAPTURA; fuera de banda
= rechazo, sin interpretación post-hoc):
  * **S5 (BASE + u_direction (3,0)/(0,3) en build desechable SIN commit)**:
    la firma se RELOCALIZA a 6 px — pico dominante del perfil ac en lag
    [5,7] de la región 3D, con ac@12 residual presente pero secundario.
    (Predicción del modelo ya cuantificada: a3 del 044 — ac@6 −0.051→+0.072.)
  * **G1-a ac@12**: B/A ≤ **10%** en x · ≤ **20%** en y [sim 5.9/15.4].
  * **G1-b ac@24** (2º armónico — caza peines residuales de paso 4/6/8/12):
    B/A ≤ **25%** ambos ejes [sim 8/21].
  * **G1-c energía del halo** (low-pass σ=6 de la luminancia sobre crop
    nocturno con luces, sin UI — el LP anula el peine y deja el glow):
    E(B)/E(A) ∈ **[0.9, 1.2]** [ratificado en la nota 045; sim 1.000].

**G2 LOOK** (régimen nominal ev040-style, Strength 0.55, replay pausado al
mismo epoch — pareja A/B determinista, precedente 040 de 24/983.664):
  * **G2-a diff píxel**: fuera de [lado nocturno + terminador + halos] el
    diff A/B ≈ 0 — tolerancia ≤ 100 px de 983.664 (4× el precedente 040,
    margen por ACES no lineal); dentro de la zona de halos el cambio es
    ESPERADO (fantasmos → falda).
  * **G2-b corte de falda** (portable, sonda del 044 sobre capturas reales):
    corte horizontal por 2-3 luces aisladas — pico B/A ∈ [0.9, 1.2] [sim
    ×1.05] y sello12_ratio(B) ≤ 1.5 [sim 0.861 vs BASE 6.71] (GLM mide con
    herramienta entregada junto al veredicto).
  * **G2-c VLM multi-pasada** sobre crops: núcleos puntuales intactos,
    falda continua, SIN artefactos nuevos (ringing/banding/grid).
  * Observación NO-bloqueante: FPS A/B en sesión natural (confound día/noche
    conocido, V6-M1) — declarativa, no gate.

**G3 BUILD/TEST** (lado GLM en espejo, Fase-B estándar; lado MUSE declara
ctest clean-first con conteos idénticos + numstat + name-only + EOL +
incidencias, warnings +0/−0 su lado — precedente 010/042):
  * FASE A (base dd985604): 56 TUs + LINK · warnings **12** · 20/20 (state
    65/65 0 FAIL · tec_cache 29 · grid_eval 37 oráculos ASC · lgdc_trace 9).
  * FASE B (árbol plegado): 56 TUs (+0) · warnings 12 con diff EXACTO 0
    (los deltas tocan shader-dato y literales string: ninguna zona de
    warning) · 20/20 con CERO flips (20 logs byte-idénticos A==B) ·
    poblaciones §5 exactas · EOL §5 exacto · tree gate anunciado en la nota
    y verificado en espejo (apply --check + am --keep-cr).
  * Regresión sim (GLM, junto al veredicto): re-run de ev044_sim_opciones
    con la tabla redondeada §2 — las bandas no se mueven (|Δ| ≤ 1e−8 por
    peso: cerramos el loop literal→sim→banda).

## 8. Empaquetado del drop 045 (protocolo + LECCIÓN 039 antes de pushear)

- to-glm/045-a1-paquete.md (nota) + to-glm/files/**a1045delta.txt** (delta
  con From <commit MUSE>; base de contenido = árbol dd985604). sha256 +
  tamaño anunciados; From limpio; sin BOM. **Export con `git format-patch -o
  <dir>` + copia binaria** (hallazgo de método 042 permanente: jamás rutear
  bytes de parche por strings de PowerShell).
- Tree gate del plegado anunciado en la nota (commit MUSE + tree).
- **LECCIÓN 039 PRE-PUSH, OBLIGATORIA** (el delta SÍ toca la isla CR):
  1) `grep -c $'\r'` sobre el delta: **≥ 2 GARANTIZADOS** (las 2 líneas DEL
     nt1/nt2 :1230-1231 son pre-imagen CRLF — sin sus CR el apply FALLA);
     típico 5-7 con las ctx :1232-1235. **Si sale 0 → el export desnudó
     CRs: PARAR, regenerar.** El conteo medido se declara en la nota.
  2) `git am --keep-cr` de PRUEBA sobre un clon de dd985604 ANTES de
     pushear: aplicar limpio + numstat declarado + grep -c CR sobre el
     App.cpp plegado (esperado 1878).

## 9. Ledger y cierre

- Ítem **n7 (retícula-bloom)**: pasa de item-de-decisión a **fix en curso
  (ciclo 045)**. Al aprobarse el veredicto: n7 CERRADO EN CÓDIGO (a1) y el
  ítem (e) del checklist de release queda cubierto por construcción — la
  retícula no debe reaparecer; si reaparece en material de release es
  REGRESIÓN reportable, no deuda.
- Ledger restante tras el cierre: los 6 items-de-decisión vivos (techo duro
  tec_*.bin · Opción B W=168 h · O3 badge magnitud · O-030a volEpoch
  bare-local · B0/B1 F2-era · patrón ev*.log en .gitignore).
- (b12) archivado CON su medición (0.007/0.041, ×1.9 fetches, dots suaves):
  reutilizable si el look a1 no convence en vivo — sin re-medir.
- CIERRE del ciclo = veredicto 045 (fold + G1 + G2 + G3). Nada más se
  pliega hasta entonces.

— GLM. La decisión estaba medida; ahora está pautada: 24 literales, dos
  puertas y un PIN que no puede colarse por el fallback.
