# 251 — Catálogo de exploración: visualizaciones vivas para ionosphere-live-3d (minería de literatura + sondeo de fuentes)

Encargo del operador (vía MUSE): exprimir el conocimiento existente en busca de visualizaciones impactantes del tema del programa (ionosfera, radio HF, clima espacial, heliosfera cercana), con búsqueda exhaustiva de fuentes y bases de datos disponibles. Barra visual: cinemáticas, coloridas, llenas de vida y pulsantes con variaciones temporales reales — nada estático decorativo. Condiciones: honestidad de dato (nada inventado; lo simulado se declara), en vivo preferido, licencias verificadas. Entrega: catálogo numerado priorizado (impacto × viabilidad), no implementación.

**Método**: (a) minería de literatura desde el conocimiento de dominio del verificador (anclas citadas por autor/año/revista — títulos canónicos verificables, sin DOIs inventados); (b) sondeo en vivo de 40+ endpoints desde el sandbox el 13-14 oct 2026 (6 scripts persistidos `scripts/w251_probe*.py`, resultados en `scripts/w251_probe*.json`); (c) deduplicación contra las 21 ideas del panel «Explorar ideas» del despliegue (10 demo + 11 propuestas, extraídas del bundle); (d) respuestas a las 4 preguntas de MUSE.

**Marcas de honestidad por entrada**: [DATO VIVO] feed real programático verificado · [MODELO PÚBLICO] modelo científico abierto autocontenido, entradas reales · [GEOMETRÍA] física determinista computable sin datos externos · [RECONSTRUCCIÓN DECLARADA] fenómeno histórico/física real, visualización declarada como tal.

**Puntuación**: Impacto (1-5, vida cinematográfica + valor para la misión) × Viabilidad (1-5, fuente viva + coste de integración). Máximo 25.

---

## TIER S — ejecutar primero (16-20 puntos)

### 1. CME: cuenta atrás real desde el Sol hasta el choque — I5×V4=20 [DATO VIVO]

- **Concepto**: cuando el Sol lanza una eyección con trayectoria geoefectiva, el programa muestra el frente expansivo viajando hacia la Tierra con reloj de llegada REAL, y a la llegada encadena todos los efectos medibles de la tormenta.
- **Ancla científica**: modelo WSA-Enlil (operativo en SWPC/CCMC para pronóstico de llegada de CME); cronología física de una tormenta geomagnética (choque → SSC → inyección → anillo).
- **Fuente (verificado HOY)**: DONKI en su nueva base `ccmc.gsfc.nasa.gov/DONKI-API/` — spec Swagger viva con 13 endpoints, incluyendo `/get/CME`, `/get/CMEAnalysis` (velocidad/dirección), **`/get/WSAEnlilSimulations` (tiempos de llegada estimados del ENLIL)**, `/get/GST` (tormentas), `/get/MPC` (cruces de magnetopausa reportados), `/get/notifications`. La vieja ruta `api.nasa.gov/DONKI` con DEMO_KEY está saturada/migrada (429/HTML de CCMC) — usar la base CCMC directa o clave gratuita propia. Además SWPC `alerts.json` verificado vivo (mensajes del 13-oct) y 3-day forecast.
- **Propuesta visual**: el disco solar (SDO ya presente como demo `sdo`) lanza un frente coronal (LASCO C2/C3 verificados vivos — imágenes reales del momento como textura del evento); el frente viaja por la escena con ETA del ENLIL en contador descendente; al llegar: la magnetopausa (#4) se comprime, la lluvia cósmica (#14) se aplana (Forbush), el óvalo (OVATION, ya presente) se enciende, el D-layer (#2) absorbe. La «sinfonía de tormenta» completa, toda dirigida por datos reales.
- **Encaje**: orquestador sobre piezas existentes y entradas nuevas; clase nueva «Heliosfera/Sol» para el tablero solar (disco + LASCO + cuenta atrás).
- **Relación panel 21**: extiende `sdo` (disco real) — sin duplicar.

### 2. Fadeout global HF: el planeta sordo en tormenta — I4×V5=20 [DATO VIVO]

- **Concepto**: mapa global vivo de absorción D: tras un flare, el hemisferio diurno se apaga para HF; en eventos de protones solares, los cascos polares quedan anegados (PCA, blackouts polares de radio real).
- **Ancla científica**: Sauer & Wilkinson 1968 (absorción por prótons/electrones; ya portado en la demo `abs` para la LUF); PCA (Polar Cap Absorption, fenómeno operativo documentado desde los años 50); Wait & Spies 1971 (perfil D vs X-ray).
- **Fuente (verificado HOY)**: SWPC GOES rayos X 1-día (json vivo) y GOES protones integrales 1-día (json vivo, satélite 18). El producto oficial D-RAP2 de SWPC como referencia de validación (ruta de imagen a fijar — el endpoint probado dio 202/0 B).
- **Propuesta visual**: overlay térmico de «sordera»: regiones con absorción >X dB se ven apagadas/hundidas; los enlaces HF del ray-tracing (demo `hf`) que crucen zonas absorbidas muestran la atenuación a lo largo de la trayectoria con desvanecimiento visible; alerta de fadeout en panel. La idea MÁS alineada con la misión: hace la herramienta de HF honesta bajo tormenta.
- **Encaje**: extensión directa de `abs` (Sauer-Wilkinson ya portado) — de cálculo por enlace a mapa global.
- **Relación panel 21**: generaliza `abs` + `alert`.

### 3. Flare: el flash del limbo y su firma ionosférica inmediata — I4×V5=20 [DATO VIVO]

- **Concepto**: cada flare X/M detectado en GOES produce un flash en el disco solar y, un instando después, la respuesta física real del D díaside: SID («sudden ionospheric disturbance»), desvanecimiento de onda corta en el lado iluminado, recuperación en horas.
- **Ancla científica**: curva XRS GOES 1-8 Å; SID/MOF — física clásica documentada desde 1937 (Mögel-Dellinger); respuesta D por X-ray (Wait & Spies).
- **Fuente (verificado HOY)**: SWPC GOES XRS 1-día json (vivo); DONKI `/get/FLR` (verificado en spec).
- **Propuesta visual**: flash coronal + onda de choque visual sobre el terminador díaside; el mapa de absorción de #2 se enciende progresivamente desde el subsolar; en modo replay, el ciclo flare→fadeout→recuperación se ve como respiración del planeta. Sincronizable con WSPRnet (#5): los spots diurnos se enfrían en minutos — LA demostración de causa-efecto ionosfera↔radio con datos reales.
- **Encaje**: gatillo visual sobre `sdo` + `abs`; pieza de la sinfonía #1.
- **Relación panel 21**: combina `sdo` + `abs` en un evento animado.

### 4. Magnetosfera viva: la burbuja que respira — I5×V4=20 [MODELO PÚBLICO + DATO VIVO]

- **Concepto**: la Tierra con su burbuja magnética: líneas de campo dipolares reales (inclinación IGRF) comprimidas en el díaside hasta la magnetopausa y estiradas en cola nocturna, respirando con el Bz, la velocidad y la presión dinámica reales del viento solar.
- **Ancla científica**: modelo analítico de magnetopausa de Shue et al. 1997 (JGR, «A new functional form to study the solar wind control of the magnetopause size and shape») — r0(θ) = f(Bz, Dp), cerrado y computable en cliente; IGRF-14 (Alken et al. 2021) — **los coeficientes ya están embebidos en el plan de port Faraday**; substorms (Akasofu 1964) para la descarga de cola; v2 opcional: Tsyganenko T89/T96 (código público, ponderado por presión solar).
- **Fuente (verificado HOY)**: Bz/v/n de viento solar — el programa ya los consume en vivo (deploy verificado); DONKI `/get/MPC` (cruces de magnetopausa reportados — ancla de validación); AE realtime de Kyoto (verificado: página hoy + repositorio `ae_realtime/data_dir/2026/`) para la cadencia de substorm.
- **Propuesta visual**: la escena gana una tercera escala: dentro→globo, fuera→burbuja; río de viento solar (partículas desde el Sol, velocidad real) partiéndose en el arco de choque; con Bz sur, la cola se estira y la cola «rompe» (substorm) cuando el AE real se dispara — el óvalo auroral existente aterriza en la escena como consecuencia visible. Color: líneas azul-violeta vivas con flujo.
- **Encaje**: clase nueva «Magnetosfera» — la pieza estructural de la que cuelgan #8 (whistlers), #18 (anillo Dst), #19 (Van Allen).
- **Relación panel 21**: reutiliza IGRF de la propuesta `faraday`; nada duplicado.

### 5. WSPRnet: el planeta sensando su propia ionosfera — I5×V4=20 [DATO VIVO]

- **Concepto**: miles de balizas de 200 mW WSPR son reportadas mundialmente cada 2 minutos: el mapa vivo de qué enlaces HF están abiertos AHORA, según la ionosfera real en uso.
- **Ancla científica**: propagación por trayecto oblicuo real (la red WSPR es de facto el mayor experimento permanente de sondeo ionosférico por crowdsourcing — citado en literatura de propagación amateur y académica).
- **Fuente (verificado HOY)**: `wsprnet.org/olddb` — tabla de spots viva (35 KB con spots reales); la BD histórica tiene dumps públicos. Atribución requerida. Alternativa/compaginación: RBN (`reversebecon.net/srch.php` con descarga de datos crudos) y agregadores comunitarios (DXClusterAPI).
- **Propuesta visual**: arcos finos TX→RX floreciendo por todo el globo en tiempo real, coloreados por banda y SNR, persistencia de ~10 min como «estelas de calor»; panel de apertura por banda (160-10 m) que respira con la hora del día; en replay, la danza horaria de apertura/cierre. Es la ionosfera usándose a sí misma — el corazón operativo del programa latiendo con datos vivos.
- **Encaje**: capa de actividad real sobre el shell foF2 y el ray-tracing `hf` (validación operativa de MUF).
- **Relación panel 21**: nueva — ninguna de las 21 usa actividad de radioaficionados reales.

### 6. Línea gris: la autopista del crepúsculo — I4×V5=20 [GEOMETRÍA]

- **Concepto**: la banda crepuscular que barre el globo dos veces al día y con ella la «autopista» de DX que une zonas de penumbra simétricas — propagación clásica de «gray line» visible como fenómeno planetario vivo.
- **Ancla científica**: propagación en el terminador (D-layer debilitada + absorción mínima; guía de onda crepuscular) — clásico de la literatura de propagación HF (Davies, «Ionospheric Radio», cap. propagación por caminos trans-terminador).
- **Fuente**: ninguna externa necesaria — el terminador ya se calcula en el programa (el replay «sol sigue al dato» ya es demo `rep`); opcionalmente superponer spots WSPR reales (#5) para ver la autopista EN USO.
- **Propuesta visual**: banda suave de crepúsculo (azul→ámbar) barrriendo el globo en tiempo real con «puentes» iluminados entre regiones oscuras antípodas; al pulsar, el ray-tracing `hf` rutas un circuito trans-gray-line real. Coste mínimo, efecto máximo: el planeta con un reloj de propagación incorporado.
- **Encaje**: overlay sobre escena existente + panel.
- **Relación panel 21**: nueva.

### 7. Voyager: el susurro de 25 800 millones de km — I5×V4=20 [DATO VIVO + CÁLCULO AUDITABLE]

- **Concepto**: hacer SENTIR la asimetría del enlace: la Tierra grita con ~180 MW de EIRP para que la sonda la oiga; la sonda contesta con el equivalente a ~16 kW; lo que llega a una antena de 70 m es del orden de 5×10⁻¹⁹ W.
- **Ancla científica**: presupuesto de enlace de espacio profundo (ecuación de Friis); parámetros públicos Voyager (transmisor ~23 W, antena 3.7 m, X-band 8.42 GHz) y DSN (70 m, ~20 kW) — cifras documentadas por JPL.
- **Fuente (verificado HOY)**: **JPL Horizons API — rango real de Voyager 1 el 14-oct-2026: 172.4869 AU = 25 800 millones de km, tiempo-luz 23 h 54 min** (consultado en vivo desde el sandbox; resuelve «VOYAGER 1» por nombre, sin auth). Cadena de cálculo completa auditada abajo en §A. DSN Now (`eyes.nasa.gov/apps/dsn-now`) vivo como herramienta; su feed programático quedó por localizar (el viejo `dsn.json` sirve ahora la página HTML de Eyes).
- **Propuesta visual**: modo «cosmos»: la cámara sale del sistema; un hilo de señal fino conecta la Tierra con un puntito a 172 AU — un pulso de luz que TARDA 24 h en cruzar (animación honesta en escala temporal real, con la tentación visible de acelerar el reloj); panel del link-budget vivo con la distancia actualizándose desde Horizons; el contraste grito/susurro en escala log con barras que hacen física perceptible. Bonus local: las antenas DSN de **Robledo de Chicala (Madrid)** aparecen en el mapa de estaciones terrestres.
- **Encaje**: clase nueva «Cosmos/DSN»; sin dependencia de las demás.
- **Relación panel 21**: nueva.

### 8. Relámpagos globales → whistlers y sprites — I5×V4=20 [DATO VIVO]

- **Concepto**: el planeta chispeando en tiempo real: cada rayo real de los sensores GOES destella en el globo, lanza un «whistler» (onda de VLF que canaliza por la línea de campo hacia el punto conjugado) y, sobre las tormentas más violentas, enciende sprites/duendes en la mesosfera.
- **Ancla científica**: ondas silbantes (Helliwell, «Whistlers and Related Ionospheric Phenomena», clásico absoluto); sprites — primera captura 1989 (Franz et al. 1990), fenomenología Sentman & Wescott; la física de canalización a lo largo de B (depende de #4).
- **Fuente (verificado HOY)**: GOES-16/18 GLM en AWS Open Data (bucket S3 público sin auth, prefijo `GLM-L2-LCFA/` verificado con claves presentes) — destellos de rayo en tiempo casi real sobre América; netCDF documentado. Global: complementar con WWLLN/Blitzortung (licencias no-comerciales, a revisar) — resto del planeta con reconstrucción declarada o nube de puntos GLM como «corazón vivo».
- **Propuesta visual**: tormentas como enjambres de destellos (cada uno ES un rayo real); de cada destello, un arco siseante que sube por la línea de campo (#4) y baja en el conjugado — «eco magnético» del rayo; sprites rojo-púrpura a 50-90 km de altitud REAL sobre las cúspides de tormenta. Es la vida más visceral disponible: el planeta con sistema nervioso.
- **Encaje**: clase nueva «Rayos/TLE» + sinergia fuerte con #4 (necesita líneas de campo).
- **Relación panel 21**: nueva.

### 9. Termosfera: la atmósfera que respira — I4×V4=16 [MODELO PÚBLICO]

- **Concepto**: la capa neutra acoplada a la ionosfera: densidad y temperatura termodinámicas reales modelizadas con el estándar internacional, respirando con el F10.7 y la actividad geomagnética que el programa ya muestra.
- **Ancla científica**: NRLMSIS 2.1 (Emmert et al. 2021, JGR — sucesor del MSISE-90; código público multi-lenguaje, dominio abierto); vientos HWM14 (Drob et al. 2015); sistema ionosfera-termosfera acoplado (el shell foF2 actual vive DENTRO de esta atmósfera neutra).
- **Fuente (verificado HOY)**: las entradas ya están: F10.7 verificado vivo (124 sfu el 13-oct), Kp/Ap ya consumidos. Modelo autocontenido (sin red). Observación viva fase-2: ESA VirES/Swarm (raíz viva; token gratuito) para densidad derivada real; HASDM es comercial — evitar.
- **Propuesta visual**: segunda piel volumétrica translúcida (densidad neutra en paleta térmica) bajo el shell foF2; vientos termosféricos como corrientes de partículas suaves arrastrando el plasma (visualización del acople: la ionosfera «navega» sobre el viento neutro); en tormenta, la termosfera se infla visiblemente (calentamiento auroral — los satélites de baja órbita lo sufren: nota operativa real, decaimiento de Starlink de feb-2022 como caso citable).
- **Encaje**: clase nueva «Termosfera» o extensión del shell; responde la pregunta Q4 de MUSE (ver §B).
- **Relación panel 21**: nueva (el `shadow`/`glow` son efectos de la F-region; esto es la capa neutra).

---

## TIER A — alto valor (12-15 puntos)

### 10. West Ford 1963 vs megaconstelaciones 2026: la ionosfera artificial, dos veces — I5×V3=15 [RECONSTRUCCIÓN DECLARADA + DATO VIVO]

- **Concepto**: la historia del único intento de fabricar una «ionosfera artificial»: ~4×10⁸ dipolos de cobre de 1.78 cm (media onda en X ~8.3 GHz) inyectados a ~3 600 km (MIT Lincoln Lab, mayo 1963, tras el fallo de dispersión de 1961), dispersados en anillo por presión de radiación solar y J2, decaídos hacia 1970. Y su eco actual: la constelación de objetos radioactivantes de 2026 — la comparación entre ambas «nubes artificiales» es la narrativa.
- **Ancla científica**: dispersión de resonancia por dipolos de media onda; mecánica orbital (J2 + presión de radiación — determinista y computable); la polémica con la comunidad radioastronómica que fundó los mecanismos modernos de coordinación (IAU/URSI); serie técnica en Proc. IEEE (1964).
- **Fuente**: sin feed vivo (evento histórico) → reconstrucción DECLARADA con física orbital real (dispersión del anillo en time-lapse honesto); para 2026: CelesTrak TLE (fuente pública estándar; **bloqueada desde el sandbox** — timeout en ambos dominios, verificación pendiente desde el deploy) y SatNOGS API (VERIFICADO vivo).
- **Propuesta visual**: modo historia: anillo dorado de millones de micro-puntos en crepúsculo polar; time-lapse de meses en segundos — el anillo se deshace en una nube difusa y llueve de vuelta; fundido a 2026: la misma órbita ahora con >10 000 objetos activos (TLE reales) — «volvimos a hacerlo, multiplicado por veinte». Cinematográfico, con física orbital real y una lección de ética científica.
- **Encaje**: clase nueva «Órbita/Historia»; comparte motor TLE con #23.
- **Relación panel 21**: nueva.

### 11. Es esporádica viva: cuchillos de metal ionizado — I3×V5=15 [DATO VIVO]

- **Concepto**: la propuesta `es` del panel (foEs por getbest, capa GridLayer a 110 km) llevada a vida: hojas finas de plasma metálico (iones de meteoros) cortando la geometría — y el detalle operacional: foEs ≥ 5 MHz abre la banda de 6 m/50 MHz: ventanas de DX transcontinentales REALMENTE visibles.
- **Ancla científica**: teoría wind-shear de Es (cizalla de marea + iones metálicos meteóricos — clásico: Whitehead 1961, Mathews 1998); correlación meteoros↔Es (con #20).
- **Fuente**: GIRO `getbest` soporta `charName=foEs` (el propio panel `es` lo declara) — pipeline existente, ya en producción en el deploy.
- **Propuesta visual**: hojas doradas translúcidas a 105-110 km derivando lentamente (cizalla real del modelo); cuando foEs cruza el umbral, un «destello de ventana de 50 MHz» en el panel de bandas y la opción de rutear el enlace HF por E (h′ 105 km) con salto más plano — la herramienta hace algo que los mapas estáticos no hacen: muestra la ruta E cuando existe.
- **Encaje**: implementación viva de la propuesta `es` (dedupe explícito: es la MISMA idea, con el extra visual/operacional).
- **Relación panel 21**: = `es` (propuesta existente, aquí desarrollada).

### 12. Viento solar visible: el río L1 y la espiral de Parker — I3×V5=15 [DATO VIVO]

- **Concepto**: los números que ya viven en el panel (Bz, velocidad, densidad) hechos materia: un río de partículas desde el Sol con velocidad real, y el campo interplanetario dibujado como hélice de Parker con su estructura de sectores — al cruzar una frontera de sector, la polaridad cambia visiblemente.
- **Ancla científica**: espiral de Parker (Parker 1958); estructura de sectores del IMF (por entonces Explorer, hoy DSCOVR).
- **Fuente (verificado)**: viento solar en vivo ya consumido por el programa (deploy verificado esta sesión). La hélice es GEOMETRÍA a partir del campo medido + rotación solar — la polaridad del sector se declara calculada del dato real.
- **Propuesta visual**: en el modo magnetosfera (#4): el río fluyendo con velocidad/densidad reales; la hélice IMF en dorado/plateado girando lento; frontera de sector cruzando la escena como cambio de tono — con notificación en panel («cruce de sector: Bz ha virado»).
- **Encaje**: overlay de #4; también útil en solitario como fondo del tablero solar.
- **Relación panel 21**: nueva (el panel NOAA muestra números; esto los hace materia).

### 13. Sombras de eclipse: la ionosfera bajo la Luna — I3×V5=15 [GEOMETRÍA]

- **Concepto**: el siguiente gran eclipse con España en el mapa: **total el 2-ago-2027 (sur peninsular al atardecer, hacia Cádiz/Gibraltar)** y anular el 26-ene-2028 (amanecer, a re-verificar) — el programa puede mostrar la sombra lunar barriendo el globo y el «valle» de ionización que arrastra (pérdida de TEC del 20-40% documentada en eclipses recientes).
- **Ancla científica**: respuesta ionosférica a eclipses (numerosos estudios de TEC con GNSS en eclipses 1999-2024; geometría besseliana clásica).
- **Fuente**: GEOMETRÍA pura (elementos besselianos de efemérides publicadas; cero datos externos). Nota: el eclipse del 12-ago-2026 ya pasó — candidata perfecta para REPLAY con datos TEC históricos si se incorpora #15.
- **Propuesta visual**: la umbra/penumbra como mancha doble barriendo el globo; debajo, el shell foF2 se «hunde» localmente (declaramos la magnitud del pozo según la literatura); cuenta atrás para el 2027 con la trayectoria sobre Iberia — un evento público nacional con la herramienta como ventana científica.
- **Encaje**: overlay de escena + timeline especial.
- **Relación panel 21**: nueva; conversa con `tour`.

### 14. Lluvia cósmica y decaimientos Forbush — I4×V3=12 [DATO VIVO]

- **Concepto**: una lluvia tenue de rayos cósmicos sobre todo el globo cuya INTENSIDAD sigue el contador real de un monitor de neutrones — y cuando un CME pasa por la Tierra, la lluvia se aplana visiblemente (decaimiento Forbush): la conexión Sol-Tierra hecha lluvia.
- **Ancla científica**: decaimientos Forbush (Forbush 1937; modulación galáctica por eyecciones — física sólida y citable); red de monitores de neutrones.
- **Fuente (verificado HOY)**: NMDB NEST vivo (interfaz 2025 operativa; datos reales desde 2018; el patrón exacto de consulta programática quedó por fijar — la página PHP viva permite descargar series de estaciones como OULU). 
- **Propuesta visual**: trazas finas cayendo por toda la atmósfera con tasa proporcional al contador real; overlay del CME de #1 llegando → en segundos, la lluvia se ralea un 5-15% (visible en el agregado, dramático en el panel); numerito vivo «rayos cósmicos ahora vs media de 24 h».
- **Encaje**: efecto acoplado a la sinfonía #1; pieza independiente barata.
- **Relación panel 21**: nueva.

### 15. TEC global en vivo: burbujas ecuatoriales y TIDs — I4×V3=12 [DATO VIVO, ruta por fijar]

- **Concepto**: el mapa mundial de TEC (GNSS) como malla viva: las crestas de la anomalía ecuatorial, las burbujas (EPB) que estallan tras el crepúsculo geomagnético, y las ondas de TID viajando como arrugas.
- **Ancla científica**: Global Ionospheric Maps por IONEX/GNSS (IGS); EPB/spread-F (clásico de la ionosfera ecuatorial); TIDs por ondas de gravedad (Hines 1960).
- **Fuente (verificado HOY)**: IGS Ionosphere WG vivo (productos TEC «open access»); JPL GUARDIAN GIM vivo (página con mapas y descarga); CDDIS/Earthdata (cuenta gratuita, ficheros IONEX 2-h); el acceso directo de CODE dio 404 (servidor reorganizado). Ruta definitiva por fijar entre las tres vivas — es la única tarea pendiente de esta entrada.
- **Propuesta visual**: malla TEC bajo el shell foF2 (capa «la verdad GNSS» sobre «el modelo»); burbujas ecuatoriales como hongos de plasma ascendiendo tras el terminador; TIDs como arrugas que se propagan por la malla (si el REPLAY trae TEC histórico, la onda del eclipse 2026 en replay).
- **Encaje**: capa nueva «TEC observado»; ancla de validación del modelo existente.
- **Relación panel 21**: nueva; da cuerpo a `grd` (fondo climatológico) con observación real.

### 16. SuperDARN: los radares que ven el viento ionosférico — I4×V3=12 [DATO VIVO, URL por fijar]

- **Concepto**: en vista polar, el mapa de convección de SuperDARN: flechas de flujo de plasma REALES medidas por la red de radares HF — el viento ionosférico polar en tiempo casi real.
- **Ancla científica**: SuperDARN (Greenwald et al. 1995); mapas de convección por potencial (Ruohoniemi & Baker 1998).
- **Fuente (verificado HOY)**: vt.superdarn.org vivo con servicio de plots de convección (página de plots operativa); el patrón de URL programático de las imágenes quedó por fijar (la página es un generador interactivo).
- **Propuesta visual**: vista polar norte con las flechas de convección animadas sobre el óvalo auroral existente; las células de flujo (célula doble en Bz sur, celular única en Bz norte — física real que MUSE ya conoce del panel) girando con el dato; al pulsar una flecha: radar que la midió y velocidad real.
- **Encaje**: capa polar; sinergia con #4/#17.
- **Relación panel 21**: nueva.

### 17. Electrojets aurorales: ríos de corriente con AE real — I3×V4=12 [DATO VIVO]

- **Concepto**: sobre el óvalo auroral existente, dos ríos de corriente (electrojet este/oeste) fluyendo con la intensidad del índice AE REAL de Kyoto.
- **Ancla científica**: electrojets aurorales y el índice AE (Davis & Sugiura 1966); substorms (Akasofu 1964).
- **Fuente (verificado HOY)**: AE realtime de Kyoto WDC — página «hoy» viva y repositorio de valores digitales `ae_realtime/data_dir/2026/` operativo (publicación digital desde dic-2024; formato WDC-like; patrón mensual por fijar en implementación).
- **Propuesta visual**: filamentos de corriente (azul → amarillo → blanco por intensidad) sobre el óvalo, fluyendo visiblemente; el AE vivo como panel con historia 24 h; en substorm, los electrojets se iluminan y el anillo Dst (#18) responde — narrativa de tormenta completa.
- **Encaje**: overlay auroral; barato y muy vivo.
- **Relación panel 21**: nueva (la aurora `aur` es el velo; esto es la corriente ELÉCTRICA).

### 18. Anillo de corriente Dst: el corazón de la tormenta — I3×V4=12 [DATO VIVO]

- **Concepto**: un anillo de corriente alrededor del ecuador geomagnético cuya intensidad y color siguen el SYM-H/Dst REAL — la firma profunda de cada tormenta geomagnética.
- **Ancla científica**: teoría de la corriente anular (Dessler-Parker-Sckopke 1961); Dst/SYM-H como su índice (clásico de geomagnetismo).
- **Fuente (verificado HOY)**: Kyoto WDC Dst (directorio vivo `dstdir/`; el servicio realtime de Dst por confirmar — las páginas de índice responden; DONKI `/get/GST` da las tormentas clasificadas con intensidad como complemento vivo ya verificado).
- **Propuesta visual**: anillo tenue rojo profundo alrededor del globo (bajo la magnetopausa de #4) que en tormenta principal (fase main phase) se enciende y gira; correlación visible AE↑→Dst↓ con un pequeño diagrama de fase en el panel; el «electrocardiograma» de la tormenta.
- **Encaje**: pieza de #4; independiente barato.
- **Relación panel 21**: nueva.

### 19. Cinturones de Van Allen respirando — I4×V3=12 [DATO VIVO + MODELO DECLARADO]

- **Concepto**: los dos toros de radiación alrededor del globo inhalando/exhalando con la actividad: en tormenta, el cinturón externo se hincha y se enciende (eventos RBE reales).
- **Ancla científica**: cinturones de Van Allen (descubrimiento Explorer 1, 1958); modelo AE9/AP9 (climatología de radiación, NASA, público) como v2; para v1, paramétrico por Kp/eventos DECLARADO.
- **Fuente (verificado HOY)**: DONKI `/get/RBE` — eventos REALES de realce de cinturón en la spec viva; Kp ya consumido.
- **Propuesta visual**: toros translúcidos (el interno estable, plateado; el externo vivo, ámbar) con partículas atrapadas realizando deriva longitudinal real (la física de deriva de partículas es determinista); en evento RBE, el toro externo se expande visiblemente con fecha real del feed.
- **Encaje**: pieza de #4.
- **Relación panel 21**: nueva.

### 20. Lluvia de meteoros: las trazas que alimentan la Es — I3×V4=12 [GEOMETRÍA + DECLARADO]

- **Concepto**: trazas incandescentes a 80-105 km bajo la capa E, concentrándose en radiantes REALES por fecha (Perseidas, Gemínidas…), y la narrativa física: esos metales ionizados son la materia prima de la Es (#11).
- **Ancla científica**: física de trazas meteoricas (espejos de ionización de ~1 s — meteor burst communications, técnica real); aporte de iones metálicos a la capa Es (link con #11); calendario IMO de enjambres (astronomía determinista).
- **Fuente**: GEOMETRÍA (efemérides de enjambres públicas); la tasa visual es la de los calendarios IMO — visualización declarada (sin feed de radar público estable hoy; radio-echo amateur anotado para vigilancia).
- **Propuesta visual**: en fechas de enjambre, trazas doradas radiando del radiante real (posición astronómica exacta); fuera de enjambre, esporádicos suaves; el «depósito metálico» acumulándose sutilmente en la banda de 100 km — y en días de Es alta (#11), la correlación visible como pregunta abierta en el panel (honestidad: correlación declarada, física real, causa multifactorial).
- **Encaje**: capa atmosférica baja; pareja de #11.
- **Relación panel 21**: nueva.

### 21. Airglow con ondas de gravedad — I3×V4=12 [MODELO PÚBLICO + DECLARADO]

- **Concepto**: la propuesta `glow` del panel, llevada a vida: el velo luminoso (557.7 nm verde ~95 km, 630 nm rojo ~250 km) ONDULANDO con ondas de gravedad atmosféricas — los MSTID visibles como arrugas luminosas.
- **Ancla científica**: emisiones airglow (quimiorrecombinación O/O₂/NO); ondas de gravedad atmosféricas (Hines 1960); los MSTID ya conocidos por el equipo del programa.
- **Fuente**: MODULO declarado con modulación real: la emisión 630 nm escala con la recombinación F (acoplada al foF2/hmF2 ya modelizados); fase y ondulación declaradas; opción de calibrar amplitud con TEC real (#15) en fase 2.
- **Propuesta visual**: velo fino en el limbo con ripple morfológico (bandas de 20-50 km de escala real desplazándose decenas de m/s reales); en el terminador, el resplandor crepuscular; paleta espectro-honesta (verde/rojo de las longitudes de onda reales).
- **Encaje**: = `glow` (dedupe explícito: es la MISMA propuesta, aquí con la física de ondulación y modulación por dato).
- **Relación panel 21**: = `glow` (propuesta existente, aquí desarrollada).

---

## TIER B — infraestructura y pendientes (≤10 puntos)

### 22. Paridad de estrellas con la web — I2×V5=10 [PORT DIRECTO]

La web ya lo demostró (demo `city`: 6 300 estrellas con banda galáctica y colores por temperatura) y el app se queda en 1 600. Port directo y barato. **Responde Q3 de MUSE: SÍ.** Además: el cielo lleno es el escenario de #7/#8 — el fondo que hace que el resto respire.

### 23. ISS y satélites con radio en órbita — I3×V3=9 [DATO VIVO + BLOQUEADO]

SatNOGS API verificado vivo (ISS resuelta) + CelesTrak TLE (público pero bloqueado desde el sandbox — verificar desde deploy). Pases con conos de cobertura, repetidor de la ISS, alertas de paso sobre el operador. Comparte motor TLE con #10 (West Ford).

### 24. PC index (convección polar) — pendiente

pcindex.org no respondió desde el sandbox (timeout ×3) y su licencia (DMI) requiere lectura antes de usar. Anotado para vigilancia; la convección polar queda cubierta por #16 (SuperDARN) mientras tanto.

### Vigilancia sin feed práctico hoy (anotadas, no puntúan)

**GOLD** (imageo FUV geoestacionario — la misión hermana temática del programa; acceso research-grade NASA, sin quicklook público ágil hoy) · **COSMIC-2** (perfiles RO por miles/día — CDAUC con registro; visual «sondas lloviendo» para fase investigación) · **NICT (Japón)** (productos HF de la región asiática; por localizar feed) · **WWLLN/Blitzortung** (rayos globales; licencias no-comerciales a revisar como complemento de #8).

### Descartadas con criterio (a petición del encargo: barra «nada estático decorativo»)

**Luna** (sin papel ionosférico; decorativa — coherente con el veredicto de MUSE) · **Fondo estelar animado artificioso** (las estrellas reales de #22 + Vía Láctea bastan; no inventar) · **Cualquier animación sin ancla temporal real** (regla general del catálogo).

---

## §A. Apéndice Voyager: cadena de cálculo auditada (para implementar viva)

Distancia REAL consultada hoy a JPL Horizons (14-oct-2026): **d = 172.4869 AU = 2.5804×10¹³ m = 25 804 millones de km**; tiempo-luz = d/c = 86 057 s = **23 h 54 min**.

| Paso | Valor | Cálculo |
|---|---|---|
| λ (X-band) | 0.03560 m | c/8.42 GHz |
| P TX Voyager | ~23 W = 13.6 dBW | parámetro público JPL |
| G HGA 3.7 m (η≈0.65) | ~48.4 dBi | G = η(πD/λ)² |
| **EIRP Voyager** | **62.0 dBW ≈ 16 kW** | 13.6+48.4 |
| Pérdida de espacio libre | 319.2 dB | 20·log₁₀(4πd/λ) |
| Densidad de flujo en la Tierra | **~1.9×10⁻²² W/m²** | EIRP/(4πd²) |
| G DSN 70 m (η≈0.74) | ~74.5 dBi | G = η(πD/λ)² |
| **Potencia recibida (downlink)** | **−182.7 dBW ≈ 5.4×10⁻¹⁹ W** | 62.0+74.5−319.2 |
| P TX DSN | 20 kW = 43 dBW | parámetro público JPL |
| **EIRP DSN** | **117.5 dBW ≈ 180 MW** | 43+74.5 |
| Potencia recibida en Voyager (uplink) | −153.3 dBW ≈ 4.7×10⁻¹⁶ W | 117.5+48.4−319.2 |
| **Asimetría grito/susurro** | **29.4 dB ≈ 870×** | 153.3−182.7 (dB) |

Notas de honestidad: la distancia es la real del día (Horizons, verificada hoy — el programa la refresca en vivo); P_TX y rendimientos son valores públicos documentados (JPL) con tolerancias — el programa muestra la cadena completa con supuestos visibles, no una cifra mágica. La cifra «~10⁻²³ W» que circula corresponde a densidades por m² u órdenes de magnitud de otra época/definición; la cadena auditable de arriba es la referencia del programa. El usuario citó «~20 000 millones de km»: hoy el real es **25 800 millones** (la sonda se aleja 3.6 UA/año del Sol).

## §B. Respuestas a las 4 preguntas de MUSE (+ aclaración del smoke)

**Q1 — ¿Clase nueva «magnetosfera» con qué modelo de campo?** SÍ, clase nueva. v1 (recomendada): **dipolo IGRF-14 inclinado real** (los coeficientes ya están embebidos en el plan de port Faraday — coste marginal cero) + **magnetopausa de Shue et al. 1997** (analítica, cerrada, modulada por la presión dinámica y Bz REALES ya consumidos) + cola nocturna parametrizada por Bz (estiramiento DECLARADO, validable contra los cruces de magnetopausa REALES de DONKI `/get/MPC`). v2 opcional si se quiere forma de campo completa: **Tsyganenko T89/T96** (código público, ponderado por presión solar). Nada de MHD: todo analítico y computable en cliente a 60 fps. Detalle en la entrada #4.

**Q2 — ¿Alcance de flare/CME?** Dos productos distintos y honestos. **Flare** (#3): física determinista del D ya portada (Sauer-Wilkinson en `abs`) gatillada por el XRS vivo — el flash del limbo y el fadeout del díaside son respuesta física computable, no simulación libre. **CME** (#1): NO simular plasma — usar el **pronóstico ENLIL real de DONKI** (`/get/WSAEnlilSimulations`, verificado hoy): frente estilizado viajando con ETA real del modelo + encadenado de efectos medibles (MPC, GST, aurora, absorción, Forbush). Declaración en UI: «el frente visualiza el pronóstico ENLIL del CCMC; no es una simulación propia».

**Q3 — ¿Paridad de estrellas sí/no?** **SÍ** — port directo de la demo `city` de la web (6 300 estrellas + banda galáctica + colores por temperatura), el app se queda en 1 600. Barato y el cielo lleno es escenario de #7/#8. Entrada #22.

**Q4 — ¿Hay fuente para termosfera?** **SÍ, dos niveles.** Modelo (v1): **NRLMSIS 2.1** (Emmert et al. 2021 — código público multi-lenguaje) + vientos **HWM14** (Drob et al. 2015), autocontenidos, con entradas YA disponibles (F10.7 verificado hoy 124 sfu; Ap/Kp ya en el panel). Observación viva (v2): **ESA VirES/Swarm** (raíz viva, token gratuito) para densidad neutra derivada real. HASDM es comercial (SET) — evitar. Entrada #9.

**Aclaración del smoke sol/sprites (pregunta del operador)**: por diseño SIEMPRE hay exactamente un sol — god-rays ON → el pase volumétrico pinta el sol y los sprites están apagados; OFF → los sprites pintan el sol. Si con god-rays OFF no se ve NINGÚN sol, eso es **bug** de la lógica de visibilidad de sprites, no diseño → captura para MUSE (del análisis del 249: la asignación `godraysOn` ocurre en ~:642, tras el bloque de sprites ~:559 → 1 frame de retardo estructural imperceptible, lo demás debería ser visible siempre).

## §C. Registro de fuentes: estado de verificación (sondeo en vivo 13-14 oct 2026, desde el sandbox)

**VERIFICADAS EN VIVO hoy** (respuesta real con datos del día; scripts `w251_probe1-6.py` + JSON de resultados persistidos):

| # | Fuente | Estado | Nota |
|---|---|---|---|
| 1 | SWPC GOES rayos X 1-día (json) | ✓ vivo | satélite 18, datos del 12-13 oct |
| 2 | SWPC GOES protones integrales 1-día (json) | ✓ vivo | PCA alimentable ya |
| 3 | SWPC F10.7 (json) | ✓ vivo | 124 sfu, 13-oct |
| 4 | SWPC alertas (json) | ✓ vivo | WARK04 n.º 5434, 13-oct |
| 5 | SWPC 3-day forecast (txt) | ✓ vivo | — |
| 6 | SWPC OVATION aurora latest (json) | ✓ vivo | 900 KB (1 retry) |
| 7 | **DONKI (nueva base `ccmc.gsfc.nasa.gov/DONKI-API/`)** | ✓ vivo | spec Swagger con 13 endpoints: CME, CMEAnalysis, **WSAEnlilSimulations**, FLR, SEP, GST, **MPC**, RBE, HSS, IPS, notifications |
| 8 | **JPL Horizons API** | ✓ vivo | «VOYAGER 1» por nombre, sin auth; rango 172.4869 AU |
| 9 | SOHO LASCO C2 y C3 (imágenes latest) | ✓ vivo | listado directo de jpgs |
| 10 | SDO AIA 193 latest (jpg) | ✓ vivo | 46.9 KB |
| 11 | WSPRnet olddb (spots) | ✓ vivo | tabla HTML con spots reales |
| 12 | AWS S3 noaa-goes16/18 (GLM-L2-LCFA) | ✓ vivo | sin auth, claves presentes |
| 13 | SatNOGS API | ✓ vivo | ISS resuelta |
| 14 | Kyoto WDC AE realtime | ✓ vivo | `ae_realtime/today` + repositorio `data_dir/2026/` |
| 15 | NMDB NEST | ✓ vivo | interfaz 2025 operativa; patrón de consulta programática por fijar |
| 16 | SuperDARN VT (`vt.superdarn.org`) | ✓ vivo | servicio de plots de convección; URL de imagen por fijar |
| 17 | JPL GUARDIAN (GIM) | ✓ vivo | página de mapas con descarga; feed por fijar |
| 18 | ESA VirES (Swarm) | ✓ vivo | raíz operativa; token gratuito para datos |

**Ya consumidas por el programa** (deploy verificado esta sesión): viento solar DSCOVR, Kp NOAA, GIRO/DIDBase getbest.

**Bloqueadas desde el sandbox** (públicas — verificar desde el deploy): CelesTrak TLE (timeout en ambos dominios, probable anti-bot/geo), pcindex.org (timeout ×3; además leer licencia DMI antes de usar).

**Muertas/migradas** (hallazgos del sondeo): `api.nasa.gov/DONKI` con DEMO_KEY (429 + redirección a CCMC) → usar la base CCMC directa (o clave propia gratuita); **CODE IONEX directo 404** (servidor reorganizado) → CDDIS/Earthdata (cuenta gratuita) / IGS / GUARDIAN; `eyes.nasa.gov/dsn/dsn.json` (devuelve el HTML de Eyes — el feed de DSN Now quedó por localizar; Horizons cubre la parte dura de Voyager).

**Pendientes de patrón exacto** (tarea de implementación, no de existencia): consulta NMDB, URL de imagen SuperDARN, patrón mensual Kyoto, feed GUARDIAN, ruta de imagen D-RAP2, feed DSN Now.

## §D. Licencias — notas por fuente (verificación fina al implementar)

Dominio público de EE. UU. (atribución recomendada): NOAA/SWPC, NASA (Horizons, DONKI/CCMC, SOHO/LASCO, SDO, GUARDIAN), AWS Open Data (GOES/GLM). Con atribución/términos propios: WSPRnet (red de voluntarios, atribución; olddb legado — uso cortés con rate-limit propio), RBN (uso razonable + atribución), Kyoto WDC (uso científico con cita obligatoria; AE realtime de acceso libre), NMDB (datos de los PI — citar estación y red), SuperDARN (consorcio; plots públicos, revisar términos antes de re-servir), VirES/Swarm (registro + token + cita ESA), Blitzortung (visualización no comercial con atribución), WWLLN (red académica con licencia). Gratuitos con registro: CDDIS/Earthdata (IONEX), api.nasa.gov (clave propia), VirES. **Leer antes de usar**: pcindex.org (licencia DMI específica). Evitados por licencia: HASDM (comercial, SET).

## §E. Plan de fases recomendado (propuesta no vinculante, para el plan conjunto con MUSE)

- **Fase 1 — «La sinfonía de tormenta»** (todo con feeds ya vivos hoy): #2 fadeout global + #3 flash + #1 CME ENLIL con cuenta atrás + #4 magnetosfera v1 (IGRF+Shue) + #12 río de viento solar + #17 electrojets AE. La tormenta completa de causa-efecto, el mayor salto de vida por euro de esfuerzo.
- **Fase 2 — «El planeta vivo»**: #5 WSPRnet + #6 línea gris + #8 relámpagos GLM con whistlers (sobre #4) + #11 Es viva + #22 estrellas (el escenario de todo lo demás).
- **Fase 3 — «Historia y cosmos»**: #10 West Ford + #7 Voyager + #23 satélites + #13 eclipse 2027 (con cuenta atrás nacional) + #18 anillo Dst + #19 Van Allen + #9 termosfera + #20 meteoros + #21 airglow ondulante.
- **Investigación** (rutas por fijar, no bloquean nada): #14 NMDB/Forbush, #15 TEC/IONEX, #16 SuperDARN, GOLD/COSMIC-2/NICT en vigilancia.
- **Dependencias estructurales**: #8, #17, #18, #19 cuelgan de #4 (líneas de campo); #13 en replay completo pide #15; #10 y #23 comparten motor TLE; #21 amplía #15 si llega.

## §F. Dedupe contra el panel «Explorar ideas» (las 21 del despliegue)

`god` → ya hecho en el drop 249 (verificado VERDE) · `glow` → #21 (misma idea, aquí con física de ondulación) · `es` → #11 (misma idea, aquí con vida visual/operacional) · `abs` → #2 (generalizado de LUF por enlace a mapa global) · `sdo` → base de #1/#3 · `city` → #22 (paridad app) · `hf`/`rep` → base de #5/#6/#13 · `alert` → avanza con #2/#3 (productos de alerta ya vivos) · `atm`/`aur`/`pipe`/`grd`/`giro`/`vol`/`shadow`/`faraday`/`iono`/`pred`/`export`/`tour` → sin solapamiento con este catálogo (demos/propuestas de port visual y producto; `faraday` aporta el IGRF que reutiliza #4).

---

*Persistencia: sondas y resultados en `scripts/w251_probe{1..6}.py|json` (re-ejecutables). Anclas científicas citadas por autor/año/revista — títulos canónicos verificables, sin DOIs inventados. Este catálogo es material del verificador GLM para el plan conjunto con MUSE; si el operador lo aprueba, sube al relay como `from-glm/251` (próximo libre del ledger).*
