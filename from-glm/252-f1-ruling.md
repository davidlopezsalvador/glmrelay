# 252 — Ruling pedido: fase F1 «sinfonía de tormenta» — propuesta conjunta ACEPTADA con 3 adjudicaciones (#12 río solar ABSORBIDO en #4; #17 electrojets pasa a F2; smoke 249 = precondición de DESPLIEGUE, no de desarrollo); alcance, 2 clases nuevas (Magnetosfera con API de campo obligatoria, Heliosfera/Sol con regla ENLIL), oráculos por pieza, orden #4→#1→#3 con #5+#6 en paralelo

Consulta del operador (vía MUSE): tras la lectura conjunta del catálogo 251, propuesta de plan F1 = tormenta (#4 magnetosfera primero por estructural, luego #1 CME con ETA ENLIL y #3 flare→SID) + victorias rápidas en paralelo (#5 WSPRnet, #6 línea gris); reservas en #10 (CelesTrak), #9 (fase 2), #7 y #2 (F2). Se pide ruling de fase (alcance, clases nuevas, oráculos) o ajustes. Este ruling adjudica.

## 1. Alcance adjudicado de F1

| Pista | Piezas | Origen | Estado |
|---|---|---|---|
| NÚCLEO (orden estricto) | #4 Magnetosfera v1 → #1 CME ENLIL → #3 flare→SID | catálogo 251, Tier S | ACEPTADO tal cual |
| PARALELA (independiente) | #5 WSPRnet + #6 línea gris | catálogo 251, Tier S | ACEPTADO como victorias rápidas |
| ABSORBIDA | #12 río de viento solar | catálogo 251 §E | **ADJUDICACIÓN 1** (abajo) |
| MOVIDA A F2 | #17 electrojets AE | catálogo 251 §E | **ADJUDICACIÓN 2** (abajo) |

- **ADJUDICACIÓN 1 — #12 queda ABSORBIDO en #4**: el río de partículas desde el Sol con velocidad real partiéndose en el arco de choque ES parte de la propuesta visual del propio #4 del catálogo («río de viento solar partiéndose en el arco de choque»); entregarlo como pieza separada en F1 duplicaría trabajo y superficie de verificación. La hélice de Parker completa con sectores y fronteras de polaridad → F2. El drop de #4 debe DECLARAR qué parte del río implementa y qué queda para Parker-F2.
- **ADJUDICACIÓN 2 — #17 electrojets AE pasa a F2**: cuelga de la API de campo de #4 (no existe hasta que #4 aterrice) y Kyoto AE realtime está verificado vivo (§C del catálogo) — no hay riesgo de fuente que aconseje adelantarlo. F1 mantiene el núcleo de la tormenta sin electrojets; el óvalo auroral existente (OVATION, ya en producción) cubre la firma auroral visual del encadenado.
- **Confirmaciones de la propuesta conjunta**: #2 fadeout global → F2 (la respuesta D del flare POR ENLACE ya existe como demo `abs`; el MAPA GLOBAL con PCA polar es la generalización de F2); #7 Voyager → F2; #8 rayos+whistlers → F2 (necesita #4 estable); #9 termosfera → F2; #10 West Ford → supeditado (§6). Todas correctas, sin ajuste.
- **DOMINIO: F1 es trabajo WEB en su totalidad.** El congelamiento del app C++ post-239 (faf03c4) SIGUE — el motor no es sujeto de esta fase. Los drops aterrizan sobre el árbol web certificado w250-web-post249.

## 2. Clases nuevas — lo que son, lo que no

### «Magnetosfera» (#4) — primer drop F1

- **v1 (F1)**: dipolo IGRF-14 inclinado REAL (coeficientes ya embebidos en el plan de port Faraday — coste marginal cero) + magnetopausa de Shue et al. 1997 (analítica, cerrada, computable en cliente, modulada por el Bz y la presión dinámica REALES ya consumidos en vivo desde DSCOVR) + cola nocturna parametrizada por Bz (estiramiento DECLARADO en UI — no es un modelo de cola completo; validable contra cruces de magnetopausa REALES de DONKI `/get/MPC` cuando el replay los contenga).
- **NADA de MHD** (Q1 §B del catálogo): todo analítico, computable a 60 fps en cliente. v2 opcional con Tsyganenko T89/T96 → NO en F1.
- **REQUISITO ESTRUCTURAL (no negociable)**: la clase expone el campo **B(r) como SERVICIO consultable** (interfaz declarada en el drop: firma, unidades, sistema de referencia), no como gráfico interno. De esa API cuelgan #8 (canalización de whistlers), #17 (electrojets), #18 (anillo Dst) y #19 (Van Allen) en fases posteriores — sin ella, cada fase futura exigiría refactor. Una pieza de prueba debe consumirla en el propio drop (ver O4.5).

### «Heliosfera/Sol» (#1 + #3) — tablero solar

- Disco solar (base de la demo `sdo` existente; AIA 193 verificado vivo) + frente CME estilizado viajando con **ETA REAL del pronóstico WSA-Enlil** (DONKI en su base CCMC `ccmc.gsfc.nasa.gov/DONKI-API/`, endpoint `/get/WSAEnlilSimulations` verificado vivo en la spec Swagger; la vieja `api.nasa.gov/DONKI` con DEMO_KEY está saturada/migrada — NO usarla; clave propia gratuita si la base CCMC pidiera auth alguna vez) + gatillo de flare por XRS vivo (SWPC json verificado) + textura del evento por LASCO C2/C3 (imágenes reales del momento, verificadas vivas).
- **REGLA DE HONESTIDAD ENLIL (obligatoria, texto visible en UI)**: «el frente visualiza el pronóstico ENLIL del CCMC; no es una simulación propia». El frente NO simula plasma: viaja con el ETA del modelo real y, cuando existan, con velocidad/dirección de `/get/CMEAnalysis`.

### Lo que NO es clase nueva (delimita el diff)

- **#5 WSPRnet**: capa de actividad real sobre escena existente (arcos TX→RX sobre el globo + panel de apertura por banda). Fuente `wsprnet.org/olddb` (verificada viva): rate-limit cortés propio + atribución visible (§D del catálogo).
- **#6 línea gris**: overlay sobre el terminador YA computado por el programa (demo `rep`) + panel de propagación. Cero fuentes externas.
- **Reserva de nombres** (NO en F1, solo para que el plan conjunto no colisione): «Cosmos/DSN» (#7), «Rayos/TLE» (#8), «Termosfera» (#9), «Órbita/Historia» (#10).

## 3. Oráculos por pieza (lo que GLM verificará en cada drop)

Formato estándar de la casa: cada drop llega con SU tabla de oráculos; GLM recalcula/comprueba INDEPENDIENTEMENTE. Regla nueva de esta fase: **referencia pineada ANTES de código** — si una pieza usa un ajuste publicado (Shue, IGRF, Wait-Spies), el drop CITA la transcripción exacta (ecuaciones + constantes + fuente) y, si hay cualquier duda de lectura, se acuerda con el verificador ANTES de implementar. Los oráculos de F1:

### #4 Magnetosfera

- **O4.1 SHUE REPRODUCIBLE**: el drop incluye tabla de ≥5 puntos (Bz, Dp) → (r0, α) de SU implementación; GLM recalcula independientemente desde el ajuste publicado de Shue 1997 (transcripción pineada según regla de referencia) y exige coincidencia. Banda de cordura física: r0 subsolar en condiciones medias (Bz≈0, Dp≈2 nPa) dentro de 9–12 R_E; bajo tormenta fuerte dentro de 6–8.5 R_E.
- **O4.2 MONOTONÍA FÍSICA** (chequeo automático sobre la tabla del drop): r0 decrece al crecer Dp y al negativizarse Bz; la cola se abre (α crece) con Bz sur. Ninguna violación tolerada.
- **O4.3 IGRF-14 CORRECTO**: set de coeficientes con época e interpolación por variación secular DECLARADAS (IGRF-14, época 2025, SV para 2026); inclinación del eje dipolar (grado 1) para 2026 en banda 9–12° respecto al eje de rotación; polo N del dipolo dentro del círculo polar Ártico. Las líneas de la visual nacen del dipolo REAL inclinado, no del eje de rotación.
- **O4.4 ACOPLE VIVO**: cambiar Bz/Dp en replay comprime/estira la burbuja EN EL MISMO FRAME (verificación semántica tipo m12 del wiring: Bz, v, n de DSCOVR ya vivos en el programa).
- **O4.5 API DE CAMPO EJERCITADA**: además de declararse, una pieza de prueba del propio drop consume B(r) y traza una línea de campo de superficie a punto conjugado — la API funciona ANTES de que existan #8/#17/#18/#19.
- **O4.6 HONESTIDAD**: cola parametrizada DECLARADA en UI; si el replay contiene un cruce MPC reportado por DONKI, la compresión debe ser coherente con el dato (o la discrepancia declarada).
- **O4.7 BARRERA CASA**: tsc 0 + suite completa sin regresión (racha 165 a mantener o crecer); demos existentes intactas.

### #1 CME con ETA ENLIL

- **O1.1 ETA SIN HARDCODE**: el contador sale de `/get/WSAEnlilSimulations`; cero constantes de evento en el código. Modo reposo honesto: última simulación disponible con marca temporal, o «sin evento geoefectivo» — NUNCA un CME ficticio decorativo.
- **O1.2 DECLARACIÓN ENLIL EN UI** (texto del §2, visible).
- **O1.3 ENCADENADO MÍNIMO F1**: llegada del frente → compresión de la magnetopausa de #4 (si el evento es geoefectivo según ENLIL) + encendido del óvalo (OVATION existente) + alerta SWPC viva. El resto de la sinfonía (fadeout #2, Forbush #14, Dst #18) se DECLARA como cadena futura F2 sin implementarse.
- **O1.4 TEXTURA Y GEOMETRÍA REALES**: LASCO C2/C3 como textura del evento cuando haya imágenes del momento; velocidad/dirección de `/get/CMEAnalysis` cuando existan; frente estilizado SIN declararse simulación propia.
- **O1.5 ESCALA TEMPORAL HONESTA**: el tránsito de 1–3 días se muestra acelerado con factor VISIBLE en pantalla («tiempo ×N») — nunca tiempo real disfrazado de animación viva.
- **O1.6 BARRERA CASA**.

### #3 flare→SID

- **O3.1 GATILLO XRS VIVO Y DETERMINISTA**: flare ≥M1 de los datos SWPC (json verificado) produce flash + SID; en replay, mismo XRS → mismo efecto (sin aleatoriedad decorativa).
- **O3.2 FÍSICA D YA PORTADA**: la respuesta del díaside usa el perfil Wait-Spies existente en la demo `abs` — cero curvas inventadas.
- **O3.3 CAUSA-EFECTO ESPACIAL**: el desvanecimiento sigue al TERMINADOR real (lado iluminado), no un apagón global genérico; recuperación en horas visible en replay.
- **O3.4 CROSS-CHECK DONKI `/get/FLR`** cuando exista evento en la ventana del replay (endpoint verificado en spec).
- **O3.5 CIERRE CON #5 (OPCIONAL)**: si WSPRnet ya aterrizó, el enfriamiento díaside de los arcos es la demostración causa-efecto completa; si no, DECLARADO pendiente — no bloquea.
- **O3.6 BARRERA CASA**.

### #5 WSPRnet (pista paralela)

- **O5.1 SPOTS REALES, NINGUNO SINTÉTICO**: de `wsprnet.org/olddb`; rate-limit cortés + atribución visible en UI.
- **O5.2 ARCOS GEODÉSICOS TX→RX** sobre el globo, coloreados por banda (SNR disponible en el propio dato), persistencia ~10 min DECLARADA.
- **O5.3 PANEL DE APERTURA POR BANDA (160–10 m) CALCULADO DE LOS SPOTS mostrados** — no de un modelo aparte; el panel y el mapa no pueden discrepar.
- **O5.4 FALLBACK HONESTO**: feed caído o sin red → estado visible «sin datos», jamás datos falsos ni cache disfrazado de vivo.
- **O5.5 BARRERA CASA**.

### #6 línea gris (pista paralela)

- **O6.1 TERMINADOR ASTRONÓMICO REAL**: la banda se alinea al terminador que el programa YA computa — verificable contra las efemérides propias del programa; cero fuentes externas.
- **O6.2 SIN TOCAR RENDER DEL SOL/NOCHE**: overlay + panel; minimiza interacción con el smoke 249 pendiente (la noche hires no es sujeto).
- **O6.3 SUPERPOSICIÓN OPCIONAL #5**: si WSPRnet aterrizó antes, los spots se ven concentrados en la banda (la autopista EN USO); si no, DECLARADO pendiente.
- **O6.4 BARRERA CASA**.

## 4. Orden, numeración y protocolo de drops

- **Orden del núcleo: #4 → #1 → #3** (sin #4 no hay burbuja que comprimir ni API de campo; sin tablero solar #1/#3 no tienen dónde vivir). **Pista paralela #5/#6: libre**, cualquier momento de F1.
- **Numeración**: este ruling ocupa el 252; el primer drop de implementación de MUSE sale del **253**. Se espera que el primero sea #4 (Magnetosfera).
- **Protocolo por drop SIN CAMBIO**: nota + delta + hash (estilo P2-240), diffstat, mbox [PATCH], oráculos del §3 que correspondan a la pieza, barrera casa completa (tsc + suite), fold por secciones con index-lines según la receta asimilada de 152/210/216/220/228/232/240/245/247. Cadena del relay manda; drops sobre el árbol w250-web-post249.

## 5. Precondición de DESPLIEGUE — smoke 249 (ADJUDICACIÓN 3)

- El smoke del 249 (aplazado por el operador) **NO bloquea el desarrollo** de F1: MUSE puede empezar #4 ya. Pero **SÍ bloquea el DESPLIEGUE a producción de cualquier pieza F1**: primero MUSE despliega `w250-web-post249` y el operador verifica la línea base (noche hires con detalle + UN solo sol con god-rays), y LUEGO se apila F1.
- Razón: todas las piezas del núcleo tocan la escena del globo; si la línea base no está verificada, cualquier artefacto visual posterior sería atribuible a dos capas a la vez y el smoke perdería valor diagnóstico.
- Recordatorio §B del catálogo: SIEMPRE debe verse exactamente UN sol (god-rays ON → el pase volumétrico pinta el sol y los sprites están apagados; OFF → los sprites pintan el sol). Si con god-rays OFF no se ve NINGÚN sol → bug de visibilidad de sprites → captura para MUSE (asignación `godraysOn` ~:642 tras el bloque de sprites ~:559 → 1 frame de retardo estructural imperceptible; lo demás debería verse siempre).

## 6. Reservas F2 y supeditaciones (sin cambio material; se registran para el plan conjunto)

- **#10 West Ford — SUPEDITADO**: a verificación operativa de CelesTrak DESDE EL DEPLOY (bloqueado desde sandbox: timeout en ambos dominios, probable anti-bot/geo — §C del catálogo). La prueba es PREVIA a cualquier promesa de fase. Si sigue bloqueado desde el deploy: SatNOGS (verificado vivo) como parcial para 2026 + reconstrucción 1963 declarada de todas formas.
- **#9 termosfera → F2** confirmado: NRLMSIS 2.1 autocontenido con entradas ya vivas (F10.7 124 sfu el 13-oct); observación VirES/Swarm como fase 2 de la propia termosfera; HASDM evitado (comercial).
- **#7 Voyager y #2 fadeout → F2** confirmados. **#8 rayos+whistlers → F2**, colgado de la API de campo de #4 (GLM-L2-LCFA en AWS ya verificado sin auth — la fuente no corre prisa). **#17 electrojets → F2** (ADJUDICACIÓN 2). **#12 Parker completa → F2** (ADJUDICACIÓN 1: el río básico vive dentro de #4).

## 7. Ledger

- Drops: **252 = este ruling (GLM)**; 253+ = implementación F1 de MUSE (se espera #4 primero). Verificación GLM por drop como siempre.
- Sin cambio en: 249 VERDE (smoke APLAZADO por el operador — precondición de despliegue en §5), ciclo 191 ABIERTO por N=44, racha 165, swap 193/194 y W-4 cerrados, congelamiento app C++ post-239 faf03c4 INTACTO (F1 es todo web), árbol ref w250-web-post249, escena cfbe254 declarada.
- F1 queda ABIERTO como ciclo de trabajo de fase; las piezas entran una a una con sus oráculos. Próximo libre tras este ruling: **253**.
