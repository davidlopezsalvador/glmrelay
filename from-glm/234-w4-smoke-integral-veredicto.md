# 234 — Veredicto W-4 smoke integral + point-size (drop 233, `a9968df`): VERDE; P1-232 CUMPLIDO en su componente principal (smoke integral CERTIFICADO); demo point-size reclasificada corroborativa (P1-234); incidente de entorno #9 absorbido sin pérdida de custodia

VEREDICTO: **VERDE**. Smoke integral verificado claim a claim con doble lectura VLM
(~48 lecturas: full ×2 + crops ×3-×6 + zooms adjudicados) + muestreo objetivo de
píxel (etiqueta TEC shell #50a0ff, censo de toggles) + coherencia astronómica
interna (relojes ↔ subsolar). Sin código (drop de evidencia puro): sin fold, sin
TU, oráculos SIN CAMBIO (método 225→226).

## 1. Custodia L1 (EXACTA; 1 observación no bloqueante)
- Nota 233: 545 B, 14 líneas, CR:0 (LF puro), sin BOM, sha256-12 `913189612560`,
  blob `458b84fa` == relay. 0 secciones diff (evidencia pura; sin web233*).
- 3 PNGs: bytes 1217496/848111/643041 == pins; sha256-12 `113e3966d942`/
  `d759bec0f0b3`/`925d59705346` == pins; blobs disco == relay
  (`bab72105`/`885605a0`/`7f08758a`); 3× **1360×768 RGBA** (== 211/221/225).
- **OBSERVACIÓN (no bloqueante)**: b y c portan un chunk iTXt `XML:com.adobe.xmp`
  (391 B, byte-idéntico entre ambos) cuyo contenido ÍNTEGRO es
  `<tiff:Orientation>1</tiff:Orientation>` sobre plantilla XMP constante — cero
  información más allá de orientación, sin sellos de tiempo ni huella de
  herramienta; a no porta texto. Heterogeneidad de vía de guardado dentro de la
  misma sesión (clase 071 «captura separada»); los pins cubren los ficheros TAL
  CUAL. Precedente 071 exigía «SIN tEXt»: aquí no hay tEXt/zTXt; el iTXt está
  divulgado y es inerte (P3-234 lo normaliza como observación menor).
- Commit `a9968df`: añade SOLO nota+3 PNG (4 ficheros, +14/−0, append-only),
  parent == mi 57098b1 (alternancia limpia), autor David. 233 == próximo libre
  declarado por 232 §11.

## 2. Sesión de captura (coherente; patrón 15 h, no 7-9 min)
- Relojes: a `23:40:52` → b `23:42:27` → c `23:43:44` UTC (Δ 95 s y 77 s,
  secuencia real de sesión). Adjudicación del dígito de segundos de a: lecturas
  full «:53» ×2 REFUTADAS por zoom ×3 («:52»: crop ×4 ×2 + cabecera ×3) — clase
  211/226 (zoom > full-view), sin efecto en coherencia alguna.
- **Coherencia astronómica interna** (motor validado en 226 §3, exactitud <0,15°):
  a 23:40:52Z → subsolar mostrado −7° W 178° (declinación −6.6° = 09/10-oct ✓,
  lon −178.2° con EoT ✓); b 23:42:27Z → W 179° (avance 0.4° en 95 s ✓);
  c 23:43:44Z → W 179°. Los tres pares reloj↔subsolar son autoconsistentes.
- Push 14:49:45 UTC 10-oct → capturas ~**15 h antes** (sesión nocturna ~01:40
  local). SIN postdata (los PNG viajan DENTRO del commit; precedencia trivial).
  Patrón distinto al 7-9 min de 225 — no existe regla de proximidad; la
  coherencia certificable (secuencia interna + precedencia + LIVE con reloj ==
  instante) es ÍNTEGRA.
- Overlays: «Activar Windows» ×3; banner «Para salir de la pantalla completa…
  Esc» visible en a (auto-oculto en b/c); créditos bottom-left (ESA/SDO/C++);
  sin chrome de navegador (F11). Cargo operador, como 211/221/225.

## 3. Claims a/b (piso completo) — TODOS VERIFICADOS
- **11/11 toggles ON** ×2 por imagen (Nubes, Aurora, Enlace HF, Modo cine, Shell
  foF2, God rays, Volumen, Ionosondas, Ref shells, Iso bands, Etiquetas) +
  volumen visual + wireframes de shells + bandas iso + etiquetas flotantes.
- **TEC shell PIXEL-VERIFICADO**: etiqueta cian #50a0ff estricto en a
  (cluster (692,352)-(716,368), ~36 px) y b (~(692,352), ~30 px == magnitud del
  «30 px» de 225) — misma clase de posición centro-izquierda; **c: 0 px cian**
  == Etiquetas OFF (conducta correcta).
- **Kp 1.33** ×4 lecturas por imagen, chips **GREEN**; motor: 1.33 < 4.0 ✓
  (umbral certificado 226). Alertas 4×GREEN (Kp/Bz/X-ray/MUF drop) ×2 por imagen;
  X-ray B9.6/B9.3 < C2 → GREEN ✓ coherente con el motor.
- **Ionosondas LIVE 7/7** ×5 (a) / ×4 (b) — contador dependiente del feed GIRO
  en el instante (225 leyó 24/24; sin contradicción: el badge lee lo vivo).
- **Timeline −168 h**: a ×2 crops; b ×2 crops + zoom ×6 (botón ▶ LIVE + reloj
  23:42 UTC + etiqueta «-168 h» dígito a dígito) — la lectura full-view «-24h»
  de b REFUTADA 3:1 (clase 211). == TimeBar C1 (ventana replay 168 h).
- **fps 30/18 EXACTO == nota == badge**: a=30 ×6, b=18 ×6 (dígito a dígito,
  zoom ×5). Badge vivo (prop useState(60)); P1 formal (30 s min/max) SIGUE en
  el operador.

## 4. Claim c (capas alternas) — VERIFICADO con censo completo
- Censo ×4 concordante (full ×2 + ptoggles ×2): ON = Aurora, Enlace HF, Modo
  cine, **Shell foF2 (punto azul + BORDE BLANCO de selección = «destacada»
  literal)**, God rays, Ionosondas; OFF = Nubes, **Volumen, Ref shells, Iso
  bands, Etiquetas**.
- «Resto OFF» se adjudica como el **piso de a/b** (Volumen/ref-shells/iso/
  etiquetas/TEC-shell ausente — exactamente los 4 toggles OFF + 0 px cian), no
  como los 11 toggles; censo documentado arriba para dejarlo sin ambigüedad.
- **Kp 0.67** ×3, GREEN ✓ (0.67 < 4.0); alertas 4×GREEN ×2. Shell foF2 visualmente
  prominente (envolvente F2 translúcida, sin etiquetas ni wireframe tricolor).
  fps c = 25 (sin claim; registrado).

## 5. Point-size slider 3-15 en CAPAS (valor 6) — VERIFICADO
- Etiqueta «Point size» + valor **«6»** ×11 lecturas (a ×4, b ×4, c ×3); formato
  «6» == `v.toFixed(0)` del slider certificado (web231_psfix.diff → LayersPanel
  **9650edf**: min 3, max 15, step 1) — el rango 3-15 es AFFORDANCE CERTIFICADA
  EN CÓDIGO (232 §4); la captura la corrobora: knob estimado ~25-35% (×3
  lecturas) — consistente con 25% (= (6−3)/(15−3)) e INCOMPATIBLE con 11% (=
  (6−3)/(30−3), rango viejo 3-30). El valor 6 == el «point size 6» declarado.

## 6. Incidentes VLM refutados (lecciones 211/226 re-aplicadas)
(a) Enlace HF b «OFF» (1 full-view) — refutado ×3 (2 crops + 1 full); (b) timeline
b «-24h» (1 full-view) — refutado ×3 zoom; (c) reloj a «:53» ×2 full — refutado
×3 zoom, adjudicado **:52**; (d) probe a media resolución «Kp 1.35» — refutado
×4 (1.33). Patrón estable: full-view inestable en dígitos pequeños y censos
densos; el zoom (crop ×3-×6) es el discriminador (P1-226; el análisis de glifo
a píxel no fue necesario: fuente de 7 px con antialiasing subpixel, todos los
conflictos se resolvieron por mayoría de zoom).

## 7. P1-232 — ADJUDICACIÓN: smoke integral CUMPLIDO; demo reclasificada
- **Componente smoke integral (a/b/c con slider 6): CUMPLIDO y CERTIFICADO** en
  este veredicto (§§2-5) — el principal pendiente de evidencia de W-4 llega y
  verifica íntegro.
- **Componente demo point-size (blob a 30 / recorrido 3-15): NO PORTADO** (las 3
  capturas son a slider 6; la nota solo declara visibilidad del slider) →
  **P1-234, RECLASIFICADA de bloqueante a CORROBORATIVA**: (i) el techo está
  verificado matemáticamente (232 §6: 26.0 px @11 idéntico al look anterior,
  35 @30, pin en 15); (ii) shaders **c94a6aa** es la ÚNICA vía de render del
  tamaño de punto y es byte-exacto tras el fold 232 §4 — no hay otra ruta que
  certificar visualmente; (iii) con el slider UI en 3-15 el setting 30 es
  inalcanzable desde la UI, y el recorrido declarado del operador (232 §8) queda
  como DECLARADO. OPCIÓN de cierre en evidencia: 2-3 capturas del recorrido 3-15
  (p. ej. 3/9/15) si el operador lo desea — NO bloquea.
- **P1 (fps, 30 s min/max por capas activas) del operador SIGUE** y queda como
  el ÚNICO bloqueante para cerrar W-4.

## 8. Incidente de entorno #9 (serie veredictos) — absorbido ANTES de verificar
El sandbox rodó a la era «073» ANTES de esta adjudicación: glmrelay local a
8a3f648, worklog truncado en via-ui-073, paramiko desinstalado, y TODOS los
árboles de custodia W-4 (w229/w231-custody, scratch web, shims) perdidos — más
profundo que el #8 del veredicto 232. RECUPERACIÓN (P3-232 aplicado por segunda
vez): fetch HTTPS + SSH (159 commits restaurados), cadena verificada
(a9968df^ == 57098b1 == mi 232; 8a3f648 ancestro lineal), triple verificado
local == SSH == HTTPS == `a9968df`, paramiko 5.0.0 reinstalado. La verificación
de este drop se ejecutó ÍNTEGRAMENTE desde el registro durable (relay + PNGs
custodiados): un drop de evidencia NO necesita árboles fold ni suite TU — la
receta P3-232 queda validada de nuevo; el ground-truth de código (slider 3-15,
umbrales de alertas, TimeBar C1) se citó de los veredictos 226/232 y del diff
web231 custodiado en el relay.

## 9. Oráculos y ledger
Oráculos SIN CAMBIO (drop de evidencia): post-231 vigente per 232 §9 — shaders
**c94a6aa**, LayersPanel **9650edf**, types **3bd771c**, replay.test 0ebbfb6,
profileGrid 459888f/feb9769, densityVolume 63c16fd/da4fc84, refshells
7c26a0e/5c1747b, slice c1ac6d9/d3a1315, alerts fb29e8b/d0f51cd, colormaps
47159a8/24361a7, export 73c3aa4/14f25eb, tour 234acb6/86aef6a, wiring f1201c3,
godrays 1d2fc0a/c48c59b, volumeMarch 271de05/05ec948, solar b6865e2/3f461ee,
volumeShadow cf20cc7/cdc7bc9, volumeJitter 9222237/04cf4cd, layerProfile
4184bdb/a71726c, builders 1c6709a, route 50e77eb, page e45355c, TimeBar
98879f9, RadioPanel 46fcb9e, geo d2f5c06; escena 226155f DECLARADA. Barrera
156/156 its / 6644 checks aritmética intacta (sin código tocado).
Ledger: …/229/230(GLM)/231/232(GLM)/233/**234(GLM)**; 193-194 reservados;
próximo libre **235**. Estado W-4: código COMPLETO + smoke integral EN EVIDENCIA;
pendientes: P1-fps (operador, único bloqueante) + P1-234 (corroborativa).

## 10. Prescripciones
- **P1-234** (corroborativa, no bloqueante): si el operador desea cerrar la
  demo point-size en evidencia, 2-3 capturas del recorrido 3-15 (3/9/15) con
  custodia estándar; en caso contrario queda DECLARADO (232 §8) sin objeco.
- **P1-fps** (bloqueante único de W-4, operador): badge fullscreen 30 s con
  min/max por configuración de capas activas.
- **P3-234** (prospectiva, PNG): los PNG de captura que porten chunks de texto
  (iTXt/tEXt/zTXt) quedan como observación menor SI el contenido es inerte y
  se divulga en el veredicto (como hoy); la heterogeneidad de vía de guardado
  dentro de una sesión es esperable en Windows y NO es objeco de custodia
  mientras bytes+sha pinen el fichero tal cual.
- Artefactos GLM: scripts/w233_{l1.sh,itxt.py,px.py,crops2.py,vlm.sh,vlm2.sh,
  glyph.py,calib.py,glyph2.py} + w233-custody/{crops/,x3/, vlm/ (~48 lecturas)}.
