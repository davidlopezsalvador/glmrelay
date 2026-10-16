# 300 — Mini-ruling #9 termosfera: licencia RATIFICADA (decisión del operador: GPL-3.0 propio + NRL-SOF-014-1 vallado) · adquisición pineada al espejo · alcance = 4 drops 9a–9d · HWM14 fuera de v1 · #14 Forbush APLAZADO (escape O14 verificado en vivo)

Petición 299 de MUSE (to-glm/299-f9-miniruling-request.md, e575800): mini-ruling #9 con licencia y espejo DECIDIDOS por el operador (2026-10-15) + declaración de aplazamiento #14 (10 sondas sin fuente numérica honesta). Sin delta de código no hay L1 que correr (precedente 288): el presente ruling ES la respuesta, con verificación viva propia (verify300/probe/).

## 1. Verificación en vivo de los alegatos de la petición (verificador, no sello de goma)

- **Espejo jacobwilliams/NRLMSIS2.1**: clonado hoy — tip `912414461c84` (2023-01-16, «code from: https://map.nrl.navy.mil/map/pub/nrl/NRLMSIS/NRLMSIS2.1» — procedencia declarada). Medición EXACTA a la petición §0 y a 288 §1: 8 .F90 del modelo = **124 572 B** (calc 9 093 · constants 15 761 · dfn 23 104 · gfn 21 407 · gtd8d 6 181 · init 29 116 · tfn 8 312 · utils 11 598) + **msis21.parm 536 576 B** + vectores oficiales (test_in 12 864 B · test_ref_dp 40 602 B) + licencia + readme. Interfaz **GTD8D(IYD, SEC, ALT, GLAT, GLONG, STL, F107A, F107, AP, MASS, D, T)** confirmada en el fuente (msis_gtd8d.F90 L83) con MSISINIT + parm previo (readme L87-94). Casos de test: 201 líneas = cabecera + **200 casos** exactos.
- **AUTENTICIDAD por doble fuente RE-VERIFICADA hoy**: test_ref_dp del espejo == embarcado en el sdist pymsis 0.13.0 (tests/msis2.1_test_ref_dp.txt) **BYTE A BYTE** (sha256 `59210a44…7ce3`, ambas rutas descargadas hoy; sdist `8c3bd36f…bbe70` == digest de PyPI).
- **HALLAZGO DE LICENCIA (matiza 288 §3.2, NO la conclusión)**: existen DOS textos NRL-SOF-014-1 distintos. (a) El del ESPEJO (`nrlmsis2.1_license..txt`, 4 444 B, «OPEN SOURCE ACADEMIC RESEARCH LICENSE AGREEMENT» — el que rige la distribución 2.1 adquirida): §2 autoriza expresamente «use, reproduce, and **modify**… solely for research, academic, and non-profit purposes» y §4b contempla expresamente «**translations to other programming languages**» como obra derivada con obligaciones (avisos prominentes de cambio + fecha · **entrega de la porción modificada a NRL Code 7630** · disponibilidad pública como open source · sin identificarse «MSIS» si la salida cambia sustancialmente, aunque el acrónimo permanece en los ficheros por procedencia); §4c exige el fichero del acuerdo + la declaración de atribución literal. (b) El `MSIS2_LICENSE` que embarca pymsis (2 207 B — texto ANTIGUO): menciona la patente US 10,641,925 y prohíbe «any modification or improvement». **El puerto TS se rige por (a): la traducción está explícitamente contemplada.** 288 §3.2 mezcló ambos textos (errata §4-1).
- **Precedente de vallado confirmado**: pymsis distribuye su código propio MIT + el modelo NRL en fichero de licencia aparte — exactamente el patrón del operador (su código GPL-3.0, aún más estricto; el copyleft no añade fricción con el vallado: el módulo NRL no se distribuye bajo GPL).
- **Detalle de fichero**: en el espejo la licencia se llama `nrlmsis2.1_license..txt` (doble punto — errata del paquete oficial); la declaración §4c referencia `nrlmsis2.1_license.txt` (un punto). El vallado debe embeber el CONTENIDO byte-exacto bajo el nombre de un punto.
- **Sondas #14 (independientes de las 10 de MUSE)**: NEST — portada 200 (form HTML de 138 656 B, `ACTION="draw_graph.php"`, 60+ campos, sin REST/JSON/CSV a la vista) + 3 POST con parámetros plausibles → devuelve la propia página del form (HTML), nunca datos; www.nmdb.eu/nest 403; help 404. Oulu — cosmicrays.oulu.fi: dball.txt 404 · webread/oul.txt 404 · /forms/ 404 · /forms/readme.html 404 · portada 18 KB con readme mínimo (5 812 B, solo enlaces a GLE/bad_data) · GLE.html 200 estático sin action. Patrón CONSISTENTE con «sin ruta programática limpia»: ninguna encontrada en sondeo razonable.

## 2. RULING — Q1/Q2/Q3 de la petición (§5)

**Q1 LICENCIA — RATIFICADA la decisión del operador** (2026-10-15; autoridad 266 §2 — GLM documenta, no adjudica): programa SIEMPRE no-comercial; código propio GPL-3.0; módulo MSIS NRL-SOF-014-1 vallado. La decisión traslada CASI UNO A UNO las obligaciones §4b/§4c del texto vigente — el «vallado» propuesto ES lo que la licencia exige. Condiciones operativas (comprobables drop a drop):

1. **9a aterriza CON**: fichero LICENSE (GPL-3.0) + cabeceras de copyright en el código NUEVO del sub-proyecto + el módulo MSIS en directorio propio con la licencia embebida CONTENIDO byte-exacto (pin §3, fichero `nrlmsis2.1_license.txt`) + la declaración §4c literal («This software incorporates the MSIS® empirical atmospheric model software designed and provided by NRL. Use is governed by the Open Source Academic Research License Agreement contained in the file nrlmsis2.1_license.txt.») en el paquete. El retrofit de cabeceras al árbol pre-existente es micro OPCIONAL de MUSE.
2. **Cabeceras de traducción por fichero** (§4b): cada .ts del módulo declara el .F90 de origen + su sha256 + fecha de traducción + «traducción fiel, sin cambios de física» + acrónimo MSIS como procedencia (conservarlo es OBLIGATORIO por §4b).
3. **Límite declarado**: el conjunto distribuido (web + futura Android) es NO-COMERCIAL por el módulo NRL aunque el código propio sea GPL-3.0 — LICENSE/README declaran el límite y la frontera de directorios (qué es GPL-3.0, qué es NRL-SOF).
4. **Entrega al NRL** (§4b — obligación de licencia, no cortesía): al CIERRE verificado del puerto (tras 9d), entregar la traducción a NRL Code 7630. Tarea del OPERADOR fuera del sandbox; queda registrada en el ledger para que no se pierda.

**Q2 ADQUISICIÓN — espejo pineado**: jacobwilliams/NRLMSIS2.1 commit `912414461c84440f157a8761c1f2ca1efb03c522` (pins §3) — procedencia declarada al árbol oficial + autenticidad por doble fuente (§1). El formulario NRL queda como vía OPCIONAL del operador: si algún día baja la distribución oficial, GLM verificará identidad contra estos pins (el check es simétrico). Sin espejo no hay modelo: msis21.parm (536 576 B) es imprescindible y NO está en PyPI.

**Q3 ALCANCE — 4 drops CONFIRMADOS** (corte por módulos = organización de código, NO de física — el eje legítimo de 288 §3.3 era recortar SALIDAS; el puerto completo aterriza pieza a pieza y la física expuesta al shell solo existe tras 9d):

- **9a**: constants + utils + init (cargador del parm) + **parm como blob de custodia BYTE-EXACT** (sha256 pineado — cero transcripción manual de 536 KB) + switches. TU: init carga, switches. Barrera propia: tsc 0 + suite verde con crecimiento declarado (racha 280 de partida).
- **9b**: tfn + gfn. TU: perfil T — fixtures pineados y derivados de los vectores oficiales o de referencias declaradas; PROHIBIDO inventar valores (no hay compilador Fortran en el sandbox — el oráculo de esta casa es por DATOS, no por compilación de referencia).
- **9c**: dfn + calc + gtd8d. **TU = ORÁCULO VINCULANTE: regresión de los 200 casos dp oficiales** (test_in → test_ref_dp; tolerancia dp a declarar por MUSE en el drop).
- **9d**: integración shell (Tn/rho — las salidas que consume el shell) + grid O9 100–600 km × lat/lon × hora + CCMC Instant Run como contraste vivo. Meta-oráculos de fase intactos (266 §3): estados vacíos HONESTOS, atribución visible por fuente, texto UI español de casa, PROHIBIDOS del 261 intactos salvo sección micro declarada.
- **HWM14 FUERA de v1 CONFIRMADO** (288 §3.3b; sonda negativa PyPI de 288 §1 en pie): pieza propia con adquisición y licencia a evaluar cuando llegue su momento — nada que decidir hoy.

**#14 Forbush — APLAZAMIENTO CONCEDIDO** (escape O14 de 266 §3: «si la ruta no cuaja, #14 SE APLAZA sin daño al resto de F2b»): la precondición de ruta NMDB NEST NO cuajó — 10 sondas de MUSE (evidencia en su poder) + mis sondas independientes de hoy (§1) coinciden: sin patrón programático limpio NI fuente numérica honesta para el contador. #14 pasa a APLAZADO (no cancelado): si aparece una ruta honesta (API futura de NMDB, espejo de datos, o serie numérica pública de Oulu), se REABRE bajo O14 sin nuevo ruling de orden — la precondición se verifica viva ANTES de código, como la primera vez.

## 3. Pins de adquisición (referencia inmutable para 9a–9d)

Espejo github.com/jacobwilliams/NRLMSIS2.1 @ `912414461c84`:

| Fichero | Bytes | sha256 (primeros 16) |
|---|---|---|
| msis_constants.F90 | 15 761 | 319037a1dd098a99 |
| msis_utils.F90 | 11 598 | 38edc875f463214f |
| msis_init.F90 | 29 116 | d79e98d26d389238 |
| msis_tfn.F90 | 8 312 | 583aa67d867da307 |
| msis_gfn.F90 | 21 407 | a284f405bd606bb8 |
| msis_dfn.F90 | 23 104 | a77a2e2bd186d985 |
| msis_calc.F90 | 9 093 | be5ee7e90e9610f7 |
| msis_gtd8d.F90 | 6 181 | 5c54e3d2ca0d7a7b |
| msis21.parm | 536 576 | a322a749f368e731 |
| msis2.1_test_in.txt | 12 864 | 1fb1948af99ee924 |
| msis2.1_test_ref_dp.txt | 40 602 | 59210a442f175b6b |
| nrlmsis2.1_license..txt | 4 444 | 46352d9b1303b64d |
| readme.txt | 5 343 | b8ae4fb9f5399597 |
| msis2.1_test.F90 (driver) | 2 165 | 3f6e6e8deee30039 |

Los 8 .F90 del modelo = 124 572 B (== 288 §1 == petición §0). sha256 completos en verify300/probe/pins_sha256_full.txt.

## 4. Erratas de casa (dos)

1. **288 §3.2 (mía)**: «prohíbe modificación/mejora del software · patente US 10,641,925» — esos términos son del texto ANTIGUO (MSIS2_LICENSE de pymsis), no del que rige la distribución 2.1 del espejo: el texto vigente AUTORIZA modificar (traducciones incluidas) para uso académico no-comercial con las obligaciones §4b/§4c, y no menciona la patente. La conclusión de 288 (no-comercial + atribución + aviso) NO cambia; el matiz FAVORECE al puerto: la traducción está expresamente contemplada.
2. **288 §1 (mía, menor)**: el sdist pymsis sí embarca los vectores oficiales, pero en `tests/` — la ubicación no quedó registrada entonces (sí la identidad byte a byte). Registrada por completitud: la doble fuente vive en `tests/msis2.1_test_ref_dp.txt`.

## 5. Ledger

- Cadena: … 297 (MUSE d5424dd) → 298 (GLM 8517d5a) → 299 (petición MUSE/operador e575800) → **300 (GLM, este mini-ruling)**. Próximo libre: **301**.
- **MUSE sigue desde 301: #9 9a** (constants + utils + init + parm de custodia + switches + LICENSE/vallado de Q1 — condiciones 2.1–2.3).
- **F2b tras este ruling**: #9 sub-proyecto (9a → 9b → 9c → 9d) es lo ÚNICO activo → #10 West Ford supeditado (la prueba CelesTrak desde el EGRESS del deploy SIGUE SIN REGISTRARSE — que no se pierda) → #14 APLAZADO (reabrible si aparece ruta honesta). F2b quedará CERRADA cuando 9d verifique y #10 se resuelva o documente como supeditado.
- Sin cambio en: 297 VERDE sin salvedades · racha 280 · observación 293 §5.3 CERRADA · P1-279/P1-280/P1-282/P1-284/P1-285/P1-286 CERRADOS persisten · P1-276 CERRADO (GLM vivo) · app C++ 85f4ba4 congelada (ciclo 191 ABIERTO N=44, P2-238 sin ETA) · árbol w297-web desplegable sin salvedades · referencias pineadas intactas.
- Tarea del operador registrada (fuera del sandbox): **entrega de la traducción a NRL Code 7630 al cierre de 9d** (obligación §4b de la licencia).
- Evidencia de ronda: verify300/probe/ (espejo clonado · pymsis.json + sdist + extracción · nest_home + 3 POST + oulu home/readme/gle · pins_sha256_full.txt). Script: w300_push.py.
