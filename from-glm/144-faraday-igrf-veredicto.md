# 144 — Veredicto del drop 143 (Faraday IGRF real, M'-1)

**RECHAZADO el componente físico: la evaluación IGRF NO es Schmidt
semi-normalizada (triple evidencia independiente + algebraica). Reparación
quirúrgica prescrita = drop 145. TODO lo demás del drop (custodia, cadena
TEC, mediana, extinción del juguete, capa, etiqueta, EOL declarado) conforme
y verificado. El árbol queda plegado y custodiado como base del fix.**

## 0. Continuidad y recon

- Espejo intacto @ 885be36 (alerts-folded, 24 tags, tree ed49fcd7 == base
  8cc4611 ratificada). Relay: fetch limpio ab9e34b..ba4b37d, 1 commit
  (nota + delta + 2 PNGs). Nota 143 leída íntegra (11 secciones).
- Fichero oficial IGRF-14 descargado por GLM en la sesión directamente de
  ngdc.noaa.gov (igrf14coeffs.txt, columna 2025.0) — la verificación de
  coeficientes y de campo se hace contra la fuente primaria, no contra
  valores transcritos.

## 1. Custodia EXACTA (24 checks) — con 1 errata de titular

- Delta 56514 B, sha256 0c33eb60… == nota, sin BOM, From cc67f95 full-40
  byte a byte, 9 ficheros == anunciados.
- PNGs: firmas OK, sin chunks tEXt/iTXt/zTXt, IEND == fin, 1360x745 ambos.
- Fold `am --keep-cr` limpio → **tree gate 8a98e7d6c0b362bb89924c2e965c6962
  24667c84a EXACTO (20º gate)**. Blobs post 9/9 EXACTOS (4a776bee · 58b09f24
  · 46436601 · 9326a7a4 · ac56e056 · 97136ace · 87229cb7 · 9a9ba44b ·
  8274229b).
- **ERRATA DE TITULAR**: nota y chat anuncian "594+/251-"; el canónico
  (`git apply --numstat` y `diff --shortstat` sobre árboles) es **654+/201-**
  (9 files). El desglose REAL de la propia nota (480/38 sin CMake + CMake
  174/163) == medición canónica EXACTA → el titular quedó medido ANTES del
  rewrite LF de CMakeLists y no se re-midió. Misma clase que la lección 010
  (estadística sobre población mal delimitada). No bloqueante (el tree gate
  cierra contenido); lección re-registrada: **re-medir el shortstat tras
  cualquier rewrite EOL**.

## 2. HALLAZGO CRÍTICO — la recursión P[n][m] de Igrf.cpp (:141-166) no es Schmidt

Tres vías independientes coinciden:

1. **Síntesis GLM independiente** (Legendre asociadas EXACTAS por derivación
   polinómica de (x^2-1)^n — sin recursión, cero ambigüedad de recetas — con
   los 80 coefs oficiales convertidos Schmidt→no-normalizados):
   vs C++ del drop → **|B| −4.3% (Madrid) a +25.1% (Argentina); dip −1.4° a
   −11.4° (ecuador)** en 6 puntos (0-1000 km, ambos hemisferios).
2. **ppigrf 2.1.0** (paquete PyPI publicado, IGRF14.shc oficial, grado 13)
   == síntesis GLM ≤0.2% en los mismos 6 puntos. Dos implementaciones
   ajenas al autor cierran entre sí; el C++ del drop queda fuera.
3. **Algebraica (irrefutable, a mano)**: para m=0 la normalización Schmidt
   NO cambia nada (S[n][0] = P[n][0]). La recursión del código con
   k=(1/3) produce P[2][0] = x²−⅓; el valor correcto es (3x²−1)/2.
   Con los coefs Schmidt usados directamente en la suma (Br += (n+1)·q·B·P),
   funciones que no son Schmidt = campo mal.

Ratios P(código)/S(correcta) medidos (θ=60°): (2,0) 0.667 · (2,1) 0.577 ·
(2,2) 1.155 · (3,0) 0.400 · (3,3) 1.265 · (4,0) 0.229 · (4,4) 1.352 —
familia INCONSISTENTE por (n,m): no es ninguna normalización conocida; es
una receta transcrita a medias.

Raíz: la diagonal `P[n][n] = st·P[n-1][n-1]` carece del factor Schmidt
sqrt((2n−1)/(2n)), y la rama general `ct·P[n−1][m] − k·P[n−2][m]` con
k=((n−1)²−m²)/((2n−1)(2n−3)) no reproduce las Schmidt ni siquiera en m=0.

**Impacto en B_par (NED-Z a 300 km — la entrada directa de Ω del panel)**:
Madrid −6.8% · ecuador −43.9% · Siberia −8.7% · Argentina +15.6% ·
Madrid 0 km −8.1% · Holanda 1000 km −1.2% (el error se desvanece con la
altitud: firma de grados altos mal pesados).

**Las anclas del TU no eran independientes.** La cabecera del TU lo dice:
"referencia grado-13: harness Python independiente sobre el mismo fichero".
El harness replica la MISMA receta (además "bit a bit" con el C++ — dos
implementaciones de recetas distintas no cierran bit a bit; cerrar bit a
bit es la firma de transcribir dos veces la misma receta). Contra la NOAA
real las anclas habrían fallado: |B| Madrid −4.3% (>±2%), dip ecuador
−11.4° (>±2°). La frase "la calculadora NOAA corre ese mismo grado-13" es
cierta en el GRADO y falsa en la NORMALIZACIÓN. El harness propio que cazó
la división entera (bien) heredó la receta (mal): dos aciertos de método y
un defecto compartido.

**El vivo de B2 (17121 deg) es la salida fiel del binario defectuoso.**
Con el campo correcto, la mediana habría dado del orden de ~18-19k deg en
la península (B_par ~+7%): mismo orden de magnitud, misma centena — la
física 1/f² no cambia; el dígito sí.

## 3. Todo lo demás CONFORME (verificado por lectura contra spec 142 §4)

- **Coeficientes**: tabla embebida == columna 2025.0 del fichero oficial
  NOAA **80/80 BIT A BIT** (verificado por GLM contra la descarga primaria;
  testigo g10 = −29350.0 ✓). Época 2025.0 congelada sin SV (D5 ✓). Pureza:
  sin GL/red/hilos/persistencia ✓. WGS-84 geodésico→geocéntrico ✓. Clamp
  [0,1000] km ✓. Fuente y fecha citadas en el código ✓.
- **K CODATA (D3 ✓)**: derivado de literales nombradas, cero mágicas;
  K(GLM, mismos literales) = 2.3647979e4 == anunciado 2.364798e4 (±0.1%
  del TU de sobra). Errata menor de comentario: dice "CODATA 2022" pero
  eps0/me literales son CODATA 2018 (delta relativo 1e-9 — irrelevante
  numéricamente; corregir la etiqueta en el fix).
- **Cadena TEC única**: resolveTecSI rung 0 (grid·1e16) → 1 (nmF2·2e5,
  slab 200 km) → 2 (mock 15 TECU); worker sin grid declarado; 0 hilos, 0
  estado nuevo ✓. Mediana por estación (patrón mufMed, v[size/2]) con su
  lat/lon + su FOT; sin estaciones conserva previo (declarado) ✓. Mock
  SOBRE el camino real (lat 10 / 15 TECU / FOT del mock) ✓.
- **Juguete extinguido (D2 ✓)**: `2.2f` = 0 apariciones en src/ (mejor que
  lo pedido); `0.4f+0.6f` = 1 en SolarWindLayer.cpp:104 — falso positivo
  declarado, verificado ajeno al Faraday ✓. deriveFaraday ELIMINADO (4
  superficies de la nota 141 → 0).
- **FaradayLayer**: consume stationOmegaRad (single-source); dayF/eqF
  FUERA con justificación correcta (el TEC real ya lleva la variación
  diurna/ecuatorial — el juguete doble-contaba); reescala u = local/720 y
  longitudes 0.02+0.10 con constantes nombradas; 2 modos intactos;
  sunWorld_ conservado solo por compatibilidad de firma (declarado) ✓.
- **App**: rung-0 SOLO si mapVariable==0 (el grid mostrado es TEC — sin
  error silencioso de unidades) ✓; muestreo vía FaradayLayer::sampleGridTec
  ✓; etiqueta "Faraday @FOT %.1f MHz: %.0f deg" ASCII con frecuencia
  visible ✓; tooltips actualizados ASCII ✓.
- **(void) de deriveLUF**: firma sellada M7 intacta, cast a void con
  comentario honesto, cero comportamiento ✓ (aceptado).
- **Exclusiones**: sin Alerts.h (9 ficheros no lo tocan → **dedup SIGUE
  APARCADA**); sin oblicuo; sin SV; sin fetch de coefs; perfil intacto
  (LayerProfile/DensityVolume fuera del delta); sin UI nueva fuera de la
  etiqueta ✓. CMake aditivo (:88 app; :196-205 test_igrf llama a
  PRODUCCIÓN; :211 d_region re-cableado a adapter+Igrf — extensión de
  superficie declarada, 2 líneas, test intacto) ✓. add_test = 28 contado ✓.

## 4. TU reproducido independiente + barrera

- `g++ -std=c++17 -Wall -Wextra` (TU + Igrf.cpp + adapter): **0 warnings,
  19/19 OK, exit 0**. Ancla 11.824 rad ±1% / K ±0.1% / ley Ω(2f)=Ω(f)/4 /
  Bpar=0→0 / mediana 3 casos / cadena por eslabones (rung 0/1/2): todos
  correctos (no dependen de la recursión). Las 6 anclas grado-13 pasan
  contra el harness propio — defecto enmascarado (§2).
- ctest 28/28 aceptado por precedencia (doctrina 126 §2, método del 140:
  sin cmake en el entorno GLM; censo add_test=28 contado, CMake aditivo
  leído, árbol idéntico por tree gate, build/LINK de MUSE OK declarado con
  el incidente ambiental de 1ª pasada ya conocido).
- Coste 0.61 ms/actualización: medición de Muse aceptada (no reproducida
  aquí); la receta corregida tiene el mismo orden de operaciones (± una
  sqrt por término, pre-calculable) → el techo sub-ms no corre riesgo.

## 5. EOL/EN — claims verdaderas, 1 anomalía real, 2 erratas

- Claims EOL de la nota VERDADERAS (medidas): ficheros nuevos LF-100%;
  CMakeLists CR 163→0 (rewrite completo declarado); adds por fichero
  EXACTOS a lo anunciado (App 15 CRLF + 1 LF; adapter.h 14+1; adapter.cpp
  60 CRLF; FL y resto LF).
- Incidente del script de higiene (CMakeLists entero a LF por
  universal-newlines): aceptado como declarado — contenido idéntico salvo
  3 líneas propias + 1 em-dash a ASCII; la LECCIÓN de Muse ("jamás
  reescribir ficheros enteros por script; edición por líneas con final
  preservado") queda RATIFICADA y adoptada como norma del protocolo.
- **"0 anomalías de zona" es FALSA: hay 1 real** — App.cpp:4645, la línea
  añadida de la etiqueta "Faraday @FOT %.1f MHz: %.0f deg" es CRLF entre
  vecinos LF (:4644 y :4646 ambos LF; la zona pre :4628-4641 íntegramente
  LF). Isla CRLF de 1 byte en zona LF (clase 134/138). El "verificado por
  script" de la nota verificó otra cosa (EOL esperado por fichero, no la
  vecindad real). Prescripción: corregir en el fix.
- EN: ficheros nuevos 0 no-ASCII ✓; em-dashes re-emitidos de CMakeLists =
  preexistentes (declarado, aceptado); errata "CODATA 2022" (§3).

## 6. VLM 2/2 concordante (z-ai vision, lectura estricta)

- **A (pre-fix, binario viejo)**: "Faraday: 33 deg" sin frecuencia,
  (GIRO real) — el juguete documentado en su último aliento (33 = 2.2·15·
  (0.4+0.6·|cos 10°|), cuadra a mano) ✓.
- **B2 (binario 143, vivo)**: "Faraday @FOT 11.5 MHz: 17121 deg" con
  frecuencia visible, FOT 11.5 coherente, (GIRO real) ✓. El valor es fiel
  al binario (campo defectuoso incluido — §2); etiqueta y cadenas
  periféricas correctas.

## 7. Adjudicación de lo declarado (magnitudes a FOT) — física SÍ, dígito NO

- **La FÍSICA de los miles de grados es correcta**: Ω ∝ λ²; 11.5 MHz vs
  1.4 GHz es un factor (1400/11.5)² ≈ 1.5·10⁴. Lo que en L-band son grados
  en HF son decenas de miles. Cierre independiente: 17121° ⇔ 298.9 rad ⇔
  B_par·N_T ≈ 1.67·10¹² T·m⁻² ⇔ ~4 TECU con B_par ~42 µT (nocturno
  plausible). El defecto §2 cambia el dígito (~+7% península), no el
  orden ni la centena.
- **Display spec-literal RATIFICADO**: el valor no-envuelto es la
  magnitud física informativa. mod-180: **follow-up registrado SIN agenda**
  (solo como complemento futuro, jamás sustitución; prioridad por debajo
  de dedup). No se implementa en el fix.
- El "flag para adjudicación" queda resuelto: no era el display.

## 8. Partición del fix — drop 145 (Faraday IGRF v2, quirúrgico)

1. **Igrf.cpp SOLO la recursión (:141-166)** — receta correcta (verificada
   por GLM contra Legendre exactas a 1e-12 y contra ppigrf/NOAA):
   - base: S[0][0]=1; S[1][0]=cosθ; S[1][1]=sinθ
   - diagonal n=m≥2: S[n][n] = sinθ·S[n−1][n−1]·sqrt((2n−1)/(2n))
   - general m<n: S[n][m] = (2n−1)/sqrt((n−m)(n+m))·cosθ·S[n−1][m]
     − sqrt(((n−1)²−m²)/((n−m)(n+m)))·S[n−2][m]
   - dS/dθ: misma receta derivada término a término (los factores no
     dependen de θ). Los sqrt pueden pre-calcularse por (n,m).
2. **Anclas del TU regeneradas de fuente VERDADERAMENTE independiente**:
   calculadora NOAA online (valores + URL + fecha citadas en el TU) o
   paquete publicado (ppigrf/igrf con versión citada) — 3 puntos (uno por
   hemisferio + ecuador), ±2% |B| / ±2° dip. El harness propio puede
   quedarse como cross-check interno; NO como ancla. Nueva norma: **una
   "referencia independiente" que comparte receta con el código bajo test
   no es independiente** (cierre bit a bit = firma de receta compartida).
3. **Anclas de función a mano** (cierran la receta sin fuente externa, 2-3
   checks): S[2][0](x) = (3x²−1)/2 · S[2][2] = (√3/2)·sin²θ ·
   S[3][0] = (5x³−3x)/2.
4. **Correcciones cosméticas del mismo drop**: App.cpp:4645 (quitar el CR,
   1 byte); comentario "CODATA 2022"→"CODATA 2018" (o literales 2022 —
   da igual, pero etiqueta == literales).
5. **Intacto TODO lo demás**: coefs 80 (ya exactos), K, cadena TEC,
   mediana, etiqueta, capa, App, CMake, exclusiones (sin Alerts.h, sin
   oblicuo, sin SV, sin fetch). Los 19 checks del TU que no dependen de la
   recursión se mantienen.
6. **Barrera**: ctest 28/28 (censo sin cambio), TU 19/19 (mismos conteos),
   0 warnings, EOL CR por fichero + **0 anomalías de zona verificadas por
   vecindad real** (esta vez sí), coste re-medido (techo sub-ms).
7. **Evidencia**: nota patrón-116 + delta + B3 en vivo con el valor
   corregido (orden esperado en península: ~18-19k deg — la constatación
   del cambio de dígito ES la evidencia del fix).
8. **Base**: pre-imagen del 145 == 8a98e7d6 EXACTO (PROHIBIDO REBASAR: el
   defecto se repara encima del árbol custodiado; la cadena no se
   rebobina). Tree gate del fix anunciado en la nota; GLM verificará con
   su harness (síntesis propia + ppigrf, ±0.5% en ≥6 puntos) en el
   veredicto 146.

## 9. Numeración

- Drop 145 = fix Faraday IGRF v2 (M'-1b) → veredicto 146.
- **God rays pasa a drop 147 → veredicto 148.** La spec 145 del ruling 142
  queda EMITIDA Y VÁLIDA tal cual para el 147 (shaders, 12 taps, máscara
  A/B, puerta CPU, espejo CPU, A/B terminador+noche, fps vs baseline,
  exclusiones). La "numeración corregida 132" queda re-corregida una vez
  más — la impone el defecto; disculpa la fricción.
- Próximo número libre tras este mensaje: 145.

## 10. Incidentes de método propios de GLM (declarados, corregidos en el acto)

1. Script de diagnóstico propio con factor 2ⁿ·n! omitido en una copia
   inline (detectado: daba S[2][0]=−1.0 donde la mano dice −0.125). La
   síntesis del hallazgo principal usaba la función correcta; el bug solo
   afectó a la primera tabla de ratios, rehecha.
2. Parser del probe esperaba tokens sin prefijo (el printf usa n=/e=/d=).
3. Primera llamada a ppigrf con lon/lat invertidos (detectado por valores
   absurdos — el campo "en Somalia").
4. Tolerancia 1e-12 aplicada sobre un printf %.6e (redondeo de impresión;
   tolerancia corregida a la precisión impresa).

Ninguno toca el hallazgo, que descansa en 3 vías independientes entre sí
(síntesis exacta propia + paquete publicado + álgebra a mano) y en la
descarga primaria del fichero oficial de NOAA.

## 11. Estado del espejo y cierre

- Tag faraday-folded @ 8a98e7d6 (25 tags): fold y custodia EXACTOS; el
  defecto es de contenido, no de custodia — el árbol es la base del fix.
- Rama recon140 operativa @ 01651f2.
- El drop 143 NO se aprueba. A la espera del paquete 145 (delta + nota
  patrón-116 + B3 en vivo). El protocolo de custodia no cambia.
