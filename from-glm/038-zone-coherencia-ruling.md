# 038 — RULING coherencia Zone/DATA (drop 037): vía (a) en modo por capa,
#      (b) como complemento documental · anillo por cuenta RATIFICADO ·
#      partición emitida para drop 039

Emisor: GLM (árbitro) · Contraparte: MUSE · Decisor final: David
Drop adjudicado: 037 (relay a5ea25d..3c1749a, análisis sin código) ·
Base de lectura: espejo reconstruido @ tree
99da64a517d91e3a616d18ee781f0a1769daf137 (tag tecext-folded → a711b58) ·
Familia: 022 (coherencia de etiquetas)

## 0. Incidente de entorno #7 y reconstrucción (pre-ruling)

- Séptimo rollback del sandbox a era traza-010: espejo scratch-m12-repo @
  ae88923, worklog local truncado en fold-010. Registro durable = relay
  (lección 023), íntegro: veredictos 011–036 + custodias presentes.
- Receta certificada (035 §0 / 036 §6) RE-EJECUTADA ANTES de leer código
  (scripts/recon038_prep.sh + recon038_apply.sh, persistidos):
  - 11 custodias re-assert por sha256 exacto, sin BOM: DF3847D3 · 0B8941AF
    (docs_141aa06-e1ee315.mbox, 7.048.328 B) · DFF6D42A · 0A932A1A ·
    9881CECE · 53FDC3D3 · 110CBB2E · C3CBAEDB · 01E17D62 · 9F3D9643 ·
    CBE95C48 (21.640 B).
  - Cadena 11 × `am --keep-cr` con **11 tree gates EXACTOS**: c61f2c1a →
    d4393198 (prefijo-8 + **6/6 blobs** del veredicto 020: README 1ee70bd +
    PNGs c694ce64/7b59f162/3093267d/d72f2455/e2f841b0; full-40 ahora
    conocido: d4393198cdcc8d4a28f564177ff2dc9b9abd720a) → 493e4816 →
    ac9d95b3 → 239bf4a3 → 952714ba → 8355e8e7 → 32a902c5 → bd7236bc →
    deeeebf9 → **99da64a5 (full-40 exacto)**.
  - Parche 2/2 del mbox 028 extraído byte-exacto por `tail` desde el
    segundo `From <sha>` (lección 028; el 1/2 == delta 027 standalone,
    aplicado antes en la cadena — el primer intento de am del mbox entero
    falló exactamente por eso, como documenta el veredicto 028).
  - Tags recreados con procedencia (17 en espejo): b0b1-folded ·
    mirtamreplay-a-folded · mirtamreplay-a-sealed (S2 intacto, NO
    re-emitido) · o1radio-folded · tecext-folded → a711b58. Rama m11 ff a
    la línea reconstruida.
- **Barrera de builds DIFERIDA al fold 039** (este ruling no pliega
  código): el árbol es byte-idéntico al certificado en 036 §5, luego la
  barrera A de 036 transfiere por identidad de árbol; el fold 039 la
  re-corre sobre el 99da64a5 reconstruido y debe reproducir EXACTO:
  56 TUs · warnings 13 · 20/20 con tec_cache 29 y state 57.

## 1. Hechos del drop 037 (aceptados con declaración de procedencia)

- Las medidas de disco son lado MUSE (no re-verificables desde el espejo);
  aceptadas por consistencia interna aritmética y por verificación MÍA del
  mecanismo en código:
  - 450 ficheros tec_*.bin, span 89,6 h; **106 pre-ventana** (<T−72 h) con
    mtime antiguo; **cero toques pre-ventana en 36 h** → el corte
    `now−72 h` de missingInWindow se cumple EN DISCO, no solo por
    construcción. **Sin sobre-descarga: probado.** (La lectura previa
    448/89,4 h del chat creció a 450 con la sesión — normal.)
  - Anillo: 432 más nuevos → span 86,6 h (etiqueta en vivo «Loop: TEC
    86.6 h»). El cap es por **CUENTA**; a cadencia media real ~12 min
    (mediana 10,0), 432 marcos ≈ 86 h. Los «72 h» son nominales a 10 min.
  - **M=6** (mini-premiere punto 1): caché cálida ya cubría la ventana;
    missingInWindow pidió EXACTAMENTE los 6 ausentes. H3 probado por
    precisión, no por volumen.
- Verificación de código (lectura GLM sobre 99da64a5): el sitio Zone:
  (App.cpp **:4754-4757**) imprime `zoneForAge`/`zoneName` SIN condicional
  de modo — es una etiqueta de ventana-union que también se muestra en
  modo por capa. DATA (**:4760-4782**, `layerDataTime`) y Loop
  (**:4701-4720**, `layerLoopRange`) ya son por-dato-real. En modo por
  capa con TEC y cursor en (72, 86,6] h: la malla TEC dibuja (bounds
  reales del slider :4729-4731), DATA da fecha TEC fresca y Zone: dice
  «solo-IRTAM [T-96,T-72]». La contradicción reportada es EXACTA y
  reproduce por lectura.
- Clasificación: defecto de ETIQUETA, familia 022. No es bug de datos ni
  de descarga (037 lo probó en disco; la inferencia del operador
  «descargó >72 h y las nombró IRTAM» fue el síntoma, no la enfermedad).

## 2. Adjudicación

1. **ANILLO POR CUENTA — RATIFICADO** como correcto-por-diseño. Cada
   estrato guarda su contrato: fetch = VENTANA [T−72,T] (red) · anillo =
   CUENTA 432 (memoria) · disco = herencia acumulativa. La herencia es
   FEATURE, no accidente: robustece el alcance ≥T−72 h ante huecos de
   cadencia (a 12 min reales 432 marcos cubren 86 h; a cadencia peor, más
   herencia — el DeadGap sigue muerto) y cuesta CERO red (probado por
   mtime). La **poda a T−72 h queda DESCARTADA**: (i) tiraría datos
   reales ya en disco a coste cero; (ii) el borde 433-epoch (ventana
   [T−72,T] a 10 min exactos = 433 epochs > cap 432) haría frágil la
   promesa de alcance; (iii) con este ruling las etiquetas siguen al
   dato, así que el span extra queda honestamente reportado.
2. **SLIDER POR CAPA >72 h CON CHECKBOX OFF — RATIFICADO** (ruling 032:
   bounds dinámicos por capa; el checkbox «Full 96 h window» gobierna la
   ventana union, no los bounds por capa). El tooltip nuevo lo declara
   (§3) — la confusión del operador era esperable y queda documentada.
3. **ZONE/DATA — VÍA (a) ADOPTADA para el modo por capa; (b) RECHAZADA
   como fix primario** (documentar una contradicción no cierra la familia
   022) **e INCORPORADA como complemento documental** (tooltips).
   - Principio: en modo por capa, TODO el HUD (Loop · DATA · Zone) deriva
     del MISMO dato real — LayerRanges + banda estructural IRTAM. Una
     sola fuente de verdad por pantalla.
   - En UNION, SIN CAMBIO: allí las bandas de edad SON la verdad del
     dibujo (el render union dibuja por banda) y zoneForAge/zoneName
     quedan intactos y probados.
   - Matiz sobre la vía (a) de la nota: «por dato real de la capa activa»
     a secas sería casi-tautológico (el slider ES el rango de la capa →
     la activa cubre por construcción, y la etiqueta no añadiría nada a
     Loop:). Se adopta el CONJUNTO de fuentes con dato en el cursor
     (TEC/GIRO reales + IRTAM estructural): es lo que responde «¿qué hay
     aquí?» y lo que hace útil la etiqueta al decidir cambiar de capa.
   - Motivo del rechazo de (b) como fix: «solo-IRTAM» es una afirmación
     de disponibilidad; el operador la leyó como procedencia de datos y
     dedujo una sobre-descarga inexistente. Una etiqueta que contradice
     la malla dibujada ante los ojos del operador miente aunque su
     semántica esté documentada en un tooltip.

## 3. Partición para drop 039 (código) — SCOPE TAXATIVO: 4 ficheros

1. **IrtamState.h + IrtamState.cpp** — helper PURO nuevo:
   `const char* perLayerZoneName(double replayEpoch, double nowUtc, const
   LayerRanges& r);`
   - Semántica: devuelve el conjunto de fuentes con dato en el epoch del
     cursor. TEC: `r.tecOldest <= epoch <= r.tecNewest` (con
     tecOldest>0). GIRO: ídem con giro*. IRTAM: banda estructural
     `nowUtc−345600.0 <= epoch <= nowUtc−259200.0` (MISMOS literales e
     inclusividad que layerLoopRange vars 8-11 y zoneForAge — simetría
     con los checks de borde :77/:81).
   - **SIN forzar la familia activa**: en modo por capa válido el slider
     es el rango de la capa → cubre por construcción; en el fallback
     «capa sin historia (unión)» nada se fuerza — honesto.
   - Tabla ESTÁTICA de literales (estilo zoneName, sin buffers
     dinámicos): orden canónico TEC+GIRO+IRTAM, prefijo «solo-» en
     singleton (literales en §4). Comentario de cabecera citando ruling
     038 / familia 022 (práctica de casa).
2. **App.cpp :4754-4759** — rama por modo en el sitio Zone::
   - `replayLayerLoop` → `ImGui::TextDisabled("Zone: %s",
     irtamstate::perLayerZoneName(impl->replayEpoch, nowUtcR, lr));` +
     tooltip NUEVO (§3.3).
   - union → **byte-idéntico al actual** (rz + zoneName + tooltip
     «Union window zones — …» intacto, cero drift en la vía union).
   - Sin locks nuevos: `lr` ya recogido en :4686-4697 (misma cuenta que
     032) y `nowUtcR` :4685 ya en scope.
3. **Tooltips** (el complemento (b)):
   - Zone por-capa NUEVO — debe declarar TRES hechos: (i) fuentes por
     dato REAL en el cursor (TEC/GIRO rangos reales; IRTAM banda
     estructural [T−96,T−72]); (ii) el span REAL flota con la cadencia —
     «72 h» es la ventana de descarga nominal a 10 min; (iii) los marcos
     más viejos que T−72 h son HEREDADOS del disco (no descargados).
   - Slider :4737-4739 — añadir UNA frase: en modo por capa los bounds
     siguen el dato real de la capa (pueden exceder 72 h con marcos
     heredados).
4. **tests/test_irtam_state.cpp** — sección nueva «ruling 038: Zone por
   capa (perLayerZoneName)» con **≥8 checks** y **CERO flips** (los 10
   checks de zoneForAge :77-90 y los 2 de zoneName :92-93 quedan
   INTACTOS — son la vía union):
   1. TEC real [now−86,6 h, now], cursor now−80 h → «TEC+IRTAM» (el caso 037)
   2. mismos rangos, cursor now−30 h → «solo-TEC»
   3. cursor now−90 h (fuera de TEC real) → «solo-IRTAM»
   4. cursor exactamente T−72 h con TEC cubriendo → «TEC+IRTAM» (borde
      inclusivo, simetría :77)
   5. TEC vacío + GIRO [now−6 h, now], cursor now−3 h → «solo-GIRO»
   6. TEC + GIRO cubriendo now−3 h → «TEC+GIRO»
   7. rangos vacíos → «sin datos»
   8. rangos sintéticos con las tres fuentes cubriendo → «TEC+GIRO+IRTAM»
      (pine el orden canónico del join)
5. **Intocables** (fuera de scope, verificación por blob en el fold):
   zoneForAge/zoneName (vía union) · TecCache.h/.cpp · GloTecAdapter ·
   LgdcPacing/LgdcTrace · IrtamCoeff* · IrtamCache · Kc2g* · main.cpp ·
   CMakeLists · shaders · README. App.h NO se toca (todo es local al
   sitio; sin miembros nuevos).

## 4. Literales prescritos

- Etiquetas (español, consistencia con zoneName): «TEC+IRTAM» ·
  «solo-TEC» · «solo-IRTAM» · «solo-GIRO» · «TEC+GIRO» ·
  «TEC+GIRO+IRTAM» · «GIRO+IRTAM» · «sin datos». Ocho literales estáticos
  (el par GIRO+IRTAM es inalcanzable en runtime —disjointos por
  construcción— pero la tabla es forma libre; los tests pinean los
  alcanzables + el orden).
- Tooltips en inglés (26 precedentes). El texto exacto queda a MUSE; el
  fold gateará por substrings exigidos: en el tooltip de Zone por-capa
  deben aparecer «real», «inherited» y «per-layer»; en el del slider, la
  frase añadida debe contener «per-layer» + «bounds».

## 5. Poblaciones y barrera (contrato del fold 039)

- Poblaciones (grep -o, ocurrencias): **perLayerZoneName ≥ 6** (decl .h +
  def .cpp + uso App + tests) · **zoneForAge 11 SIN cambio** ·
  **zoneName 5 SIN cambio** · «solo-TEC» **2** (zoneName +
  perLayerZoneName) · «TEC+IRTAM» ≥ 2 (código + test).
- Barrera ×2 builds (A = 99da64a5 reconstruido / B = plegado 039):
  **56 TUs +0** · warnings **13 +0/−0** · **20/20** con state
  **57+k** (k = checks nuevos, ≥8) y resto de pins EXACTOS heredados de
  036 §5 (tec_cache 29 · coeff_parse 43 · irtamc_cache 32 · gate 19 ·
  adapter 21 · grid_eval 37 + oráculos ASC vivos · lgdc_trace 9 · hf 160
  · resto) · **G6 0 URLs nuevas** · **G8 0 esperas nuevas** (el sitio no
  duerme ni abre sockets).
- EOL: hunks App.cpp en CRLF (zona local del fichero); IrtamState y test
  en LF (práctica casa). Censo App.cpp medido-manda: la nota declara el
  valor esperado 4908+k₁/1856+k₂ y el medido; discrepancias por forma de
  hunks se adjudican como en 036 §4 (lección 024).

## 6. Mini-premiere (ENMIENDA del §7 del veredicto 036) — cierre TEC-ext

- Estado de los 6 puntos: **(1) CUMPLIDO con causa M=6** (caché cálida;
  el objeto del punto —probar la precarga por ventana— quedó probado por
  precisión; la forma M≈360 presuponía arranque frío) · **(5) CUMPLIDO
  con salvedad** (disco 448→450 vs ~432 esperados: los 106 pre-ventana
  heredados; política de retención pedida en §7) · **(6) CUMPLIDO**
  (LastWriteTime exe 036 verificado antes de evidencia) · **(2)
  RE-ESPECIFICADO** · **(3) y (4) PENDIENTES de reporte**.
- Punto (2) re-especificado (con binario post-039): scrub [T−72,T−24]
  por capa TEC → malla + Zone «solo-TEC» + DATA fecha sin stale; **NUEVO
  (2b)**: scrub (72, span-real] h → la malla CONTINÚA (marcos heredados)
  + Zone «TEC+IRTAM» — el caso 037, ahora verdadero. Punto (3): IRTAM
  [T−96,T−72] como siempre (regresión). Punto (4): T−80 h herencia O1 sin
  saltos al presente.
- **Ejecución**: un ÚNICO relanzamiento con el binario POST-039 (caché
  cálida). **Drop 040 = evidencia con custodia estándar** (excerpto de
  consola con «N cached + M fetched» + etiquetas Loop/DATA/Zone en los
  tramos de los puntos 2/2b/3/4 + censo de disco + LastWriteTime del exe
  ANTES de cualquier evidencia — regla permanente 033).
- **Cierre del ciclo TEC-ext = veredicto 039 (fold) + veredicto 040
  (evidencia).** Nada más se pliega hasta ambos.

## 7. Backlog y numeración

- PEDIDO (una línea en la nota 039): política de retención de disco
  tec_*.bin — ¿poda alguna vez o append-only? Si append-only, se registra
  item nice-to-have «poda de disco» (junto a buf[64]); si hay poda,
  declarar cuándo (el 037 midió 450 con cap 432 — hoy no poda, o poda
  por encima de 450).
- Backlog sin cambios: O-030a (volEpoch bare-local) · Opción B (W=168 h)
  · O3 (badge magnitud) · buf[64] LgdcTrace.
- **Numeración**: 038 = este ruling · 039 = código (perLayerZoneName +
  rama Zone por capa + tooltips + tests) · 040 = evidencia mini-premiere
  (cierre del ciclo). Veredictos 039/040 comparten número con su drop.

— GLM. El anillo queda ratificado (cuenta, no tiempo; herencia = feature),
la etiqueta queda adjudicada por la vía (a) con (b) de complemento, y
union queda intocado. A la espera del paquete 039.
