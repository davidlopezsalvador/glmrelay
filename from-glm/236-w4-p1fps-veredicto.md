# 236 — Veredicto W-4 P1 fps limpio (drop 235, `26f2bf3`): VERDE; P1-fps CUMPLIDO por vía declarativa — techo medido 20-35 fps ADJUDICADO; **W-4 CERRADO**; incidente de entorno #22 absorbido

VEREDICTO: **VERDE**. La lectura limpia del operador llega en la única forma
estructural en que puede llegar (declarativa: el propio acto de capturar deprime
el badge) y es **coherente con todo el historial certificado** bajo un modelo de
dos parámetros que alinea los 4 puntos en custodia + declarados. El techo medido
20-35 fps bajo carga máxima queda **ADJUDICADO como techo medido-declarado, no
como defecto**; el ancla 60 queda registrada como no alcanzada en el espejo web.
Sin código (evidencia declarativa pura): sin fold, sin TU, oráculos SIN CAMBIO.

## 1. Custodia L1 (EXACTA)
- Nota 235: 730 B, 15 líneas, CR:0 (LF puro), sin BOM, sha256-12 `73d8b37ee4b3`,
  blob `d71117e6` == relay == disco. Sin sección diff y **sin PNGs** («imágenes
  solo en chat, no viajan PNGs» — declarado en la propia nota; adjudicación §2).
- Commit `26f2bf3`: añade SOLO la nota (1 fichero, +15/−0, append-only), parent
  == mi `97c28b5` (alternancia limpia), autor David, 11-oct 00:43:02 +0200
  (~5,5 h tras mi 234). 235 == próximo libre declarado por 234 §9.

## 2. Naturaleza probatoria: la lectura limpia NO es capturable por construcción
- El objeto de P1-fps era el badge **sin devtools ni capturas activas**. El acto
  mismo de capturar deprime el contador ~**12 fps**: hoy ~34 (limpio) vs ~22 (con
  captura previa) — y el MISMO delta 12 está **medido en custodia** en 233
  (a=30, primera captura de sesión, vs b=18 con captura previa; ambos certificados
  ×6 dígito a dígito). Un PNG del «34 limpio» es estructuralmente imposible:
  exigirlo sería exigir el imposible.
- **ADJUDICACIÓN**: la cantidad limpia se acepta por **vía declarativa** con doble
  precedente: (i) enmienda V1-M1 — el criterio imposible en presencia de confound
  se sustituye por lectura con condiciones declaradas; (ii) 232 §7 / 234 §7 — el
  recorrido del operador queda DECLARADO cuando la mecánica está certificada y la
  ruta no añade información. La mecánica del badge está certificada (prop viva
  alimentada por el loop RAF propio — web157:212 «60 fps fuera de React»; 234 §3)
  y los puntos capturables de su entorno YA están en custodia (18/25/30 de 233).
  El fondo deprimido de HOY (~22, tormenta) queda declarado; su clase ya está
  anclada (233-b=18, calma). Opción de anclaje en §10.

## 3. Consistencia con el historial certificado (modelo de 2 parámetros, 4/4)
- En custodia (233; fullscreen 1360×768, calma Kp 1.33): a=**30** (piso completo,
  primera captura), b=**18** (piso completo, con captura previa), c=**25** (piso
  parcial, con captura).
- Declarados (235; ventana navegador, tormenta Kp 4.67, piso completo + slice):
  limpio **~34**, con captura **~22**, 30 s → **20-30** (min/max), rango honesto
  declarado **20-35**.
- **Modelo**: overhead de captura **−12** (34−22 == 30−18: idéntico en calma y en
  tormenta → coste fijo del pipeline de captura, no dependiente de carga) y offset
  entre sesiones **−4** (34→30 y 22→18, ambos cuadran; atribuible a viewport
  ventana-vs-fullscreen u otra diferencia de sesión — parámetro libre del modelo,
  no tesis). Los 4 puntos alinean con DOS parámetros; el 5º (c=25) preserva el
  ordenamiento (menos carga → más fps pese a captura). Es coherencia, no prueba —
  pero ninguna lectura la contradice y las dos medidas independientes del delta 12
  se confirman entre sí.
- El mínimo declarado 20 queda por ENCIMA del 18 certificado de 233-b — correcto
  bajo el modelo (18 = fullscreen + captura; su equivalente limpio sería ~30 ==
  233-a). Cero contradicciones.

## 4. Desviaciones de la prescripción P1-fps (218 → 234 §10) — ADJUDICADAS
- **Fullscreen → ventana navegador**: la prescripción decía «badge fullscreen
  30 s»; la nota entrega ventana y lo DECLARA abiertamente. Dirección del efecto:
  ventana ≤ píxeles que fullscreen → fps(ventana) ≥ fps(fullscreen). El top en
  fullscreen se estima ~30-31 (modelo §3 + 233-a=30 como primera-captura); el
  fondo se desplazaría parejo. En NINGUNA combinación el rango se acerca al ancla
  60 → la desviación es INMATERIAL para la conclusión del techo.
- **«min/max por configuración de capas activas» → solo carga máxima**: el techo
  se declara bajo la configuración VINCULANTE (piso completo + slice + tormenta
  = peor caso); toda configuración más ligera solo puede rendir más (c=25 lo
  corrobora). El desglose queda SUBSUMIDO por el peor caso + los puntos de carga
  parcial ya en custodia (233-a/b/c).
- «30 s» y «min/max»: CUMPLIDOS literales (30 s → 20-30).

## 5. Causas del techo contra custodia
- **raymarch 64 pasos: VERIFICADO** — `MARCH_STEPS = 64` (web181:159) con pin TU
  `expect(MARCH_STEPS).toBe(64)` (:77) y `u_steps: { value: 64 }` (web183:188);
  oráculo volumeMarch 271de05/05ec948 vigente.
- **Umbral Kp AMBER: VERIFICADO** — `export const KP_AMBER = 4.0` (web155:364);
  4.67 ≥ 4.0 → AMBER ✓ motor-correcto. Es el primer Kp-AMBER del récord W-4
  (3.00/1.67/1.33/0.67 fueron GREEN) — declarado, sin PNG.
- **MSAA4 HDR: declarada, no certificable hoy** — el corpus viajado no porta la
  configuración del renderer (solo ruido base64 en 199); contexto explicativo sin
  objeco. iGPU Intel (entorno conocido de David desde M1) y dev-server (forma de
  servicio conocida del espejo) ídem.
- **Ancla 60**: badge prop alimentado por el loop RAF propio (web157:212); el 60
  como ancla del app viene de 212 («badge 10-22 vs ~29 nota vs 60 ancla»). La
  no-alcanzabilidad del 60 en el espejo queda como TECHO MEDIDO — la adjudicación
  de la nota («techo medido, no defecto») queda RATIFICADA.

## 6. Claims declarados de la sesión (registro; sin PNG)
- 21/21 ionosondas LIVE: formato N/N == lecturas previas (7/7 en 233, 24/24 en
  225); contador dependiente del feed → plausible, sin contradicción posible.
- Timeline −168 h == TimeBar C1 (certificada 213/214).
- Piso completo ON + slice: superconjunto del piso 11/11 de 233 (slice es control
  aparte, B2/o4) — «carga máxima» coherente como peor caso.

## 7. W-4: CIERRE
- **Código**: COMPLETO (oráculos post-231 vigentes, §9).
- **Evidencia**: smoke integral CERTIFICADO (233/234); P1-fps CUMPLIDO por vía
  declarativa (235 + este veredicto); P1-234 (demo point-size 3-15) queda
  **DECLARADO sin objeco** (232 §8 + 234 §10: opción de capturas no ejercida; el
  techo 26.0 px @11 estaba verificado matemáticamente y shaders c94a6aa es la
  única vía de render, byte-exacto tras el fold 232).
- **W-4 QUEDA CERRADO** con techo medido-declarado 20-35 fps (ventana; fullscreen
  estimado ~16-31 por el modelo §3/§4) bajo carga máxima, ancla 60 no alcanzada
  (iGPU + dev-server + MSAA4 HDR + raymarch 64). NINGUNA prescripción de
  optimización se abre; un futuro ciclo de rendimiento (steps/viewport/MSAA
  configurables, etc.) queda a señal de MUSE.

## 8. Incidente de entorno #22 (absorbido ANTES de verificar)
- El sandbox rodó de nuevo a la era «073»: glmrelay local a `8a3f648`, worklog
  truncado en via-ui-073, paramiko ausente del venv, árboles de custodia W-4
  (w229/w231/w233-custody, shims) perdidos. RECUPERACIÓN: fetch HTTPS (161
  commits restaurados), cadena verificada (`26f2bf3^` == `97c28b5` == mi 234;
  `8a3f648` ancestro lineal), paramiko 5.0.0 reinstalado (uv → venv). La
  verificación se ejecutó ÍNTEGRAMENTE desde el registro durable (relay) —
  receta P3-232 tercera aplicación: un drop de evidencia declarativa no necesita
  árboles fold ni suite TU; el ground-truth de código (MARCH_STEPS, KP_AMBER,
  badge/loop) se citó del corpus de diffs custodiado en to-glm/files/.
- **Numeración reconciliada**: el censo del relay sube hasta #21 (veredicto 140);
  los #8/#9 de 232/234 eran la serie contada desde un worklog truncado. Hoy se
  declara **#22 de la serie global**. Lección (clase errata 025): el contador de
  incidentes vive en el relay durable, no en el worklog local.

## 9. Oráculos y ledger
Oráculos SIN CAMBIO (drop de evidencia): post-231 vigente per 232 §9/234 §9 —
shaders **c94a6aa**, LayersPanel **9650edf**, types **3bd771c**, replay.test
0ebbfb6, profileGrid 459888f/feb9769, densityVolume 63c16fd/da4fc84, refshells
7c26a0e/5c1747b, slice c1ac6d9/d3a1315, alerts fb29e8b/d0f51cd, colormaps
47159a8/24361a7, export 73c3aa4/14f25eb, tour 234acb6/86aef6a, wiring f1201c3,
godrays 1d2fc0a/c48c59b, volumeMarch 271de05/05ec948, solar b6865e2/3f461ee,
volumeShadow cf20cc7/cdc7bc9, volumeJitter 9222237/04cf4cd, layerProfile
4184bdb/a71726c, builders 1c6709a, route 50e77eb, page e45355c, TimeBar
98879f9, RadioPanel 46fcb9e, geo d2f5c06; escena 226155f DECLARADA. Barrera
156/156 its / 6644 checks aritmética intacta (sin código tocado).
Ledger: …/231/232(GLM)/233/234(GLM)/235/**236(GLM)**; 193-194 reservados;
próximo libre **237**. Estado W-4: **CERRADO**.

## 10. Prescripciones
- **NINGUNA bloqueante** (W-4 cerrado).
- **P1-236 (opcional, no exigida)**: 1 PNG del badge con captura activa bajo
  tormenta (~22 esperado) anclaría en custodia el piso de la sesión de HOY; su
  clase ya está anclada (233-b=18, calma). En caso contrario queda DECLARADO.
- **A señal de MUSE**: siguiente ciclo — backlog W-4 agotado, ninguna cola
  abierta conocida desde el registro durable.

Artefactos GLM: scripts/w236_l1.sh (custodia L1 + ground-truth grep, persistido).
