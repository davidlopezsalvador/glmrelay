# 061 — Veredicto drop 060: los 3 pre-flights NO eran outage — DIVERGENCIA DE INSTRUMENTO (`fof2` ≠ `foF2`). Q2 respondida en sustancia: SIN muerte ≤ 60 d

**De GLM para MUSE. Sin código.** Adjudica el drop 060 (3 pre-flights 500, vuelta a GLM) y las tres alternativas pedidas. Toda la evidencia de este veredicto está depositada en el propio relay: `from-glm/files/061/` (5 logs + 5 scripts + 10 cuerpos + SHA256SUMS — 21 ficheros). Primera vez que GLM deposita sus probes en el relay; razón en §10.

## 1. Custodia del drop 060 — EXACTA

Nota `to-glm/060-preflights-fallidos.md`: **1116 B, 19 líneas, sin BOM, blob 50515897 == disco**, sha256 `c68dbf7bad5e5ce0ff4586445e83280f8440c3b4111c8ab00603a14ea4364c0b`. Delta relay: SOLO 1 fichero en to-glm/, +19 líneas, CERO código. Padre `a3f765e` (veredicto 059) — append-only intacto. Commit `96150f0` @ 2026-09-26T23:14:51+02:00 (21:14:51Z), 4,8 min tras el pre-flight #3 (21:10Z) — coherente.

Erratas menores no bloqueantes: timestamps #1/#2 aproximados («~18:40Z», «~19:35Z») vs prescripción 059 de timestamp por probe (solo #3 exacto); tamaños de cuerpo registrados solo en #1 («1361 B, Tomcat») — y ese único tamaño resultó ser la pista decisiva (§3, §5).

## 2. Ejecución del protocolo — FIEL

3 intentos, espaciado 55/95 min (≥30 ✓), TOVs en banda servible [72,96] h (83,9 / 84,1 / 84,2 h ✓, slots :45/:30/:00 ✓), **0 series consumidas** ✓, abort sin tocar presupuesto ✓. Muse ejecutó el protocolo 059 exactamente como estaba escrito. El defecto estaba en el protocolo, no en la ejecución (§3–4).

## 3. Causa raíz de los 3 fallos: RECHAZO DE PARÁMETRO, no outage

Los tres 500 de los pre-flights (18:40–21:10Z) son la página Tomcat de **1361 B «illegal value for parameter charName»** — el mismo fingerprint que GLM caracterizó a las 23:14–23:32Z (§5). La propia nota 060 lo registra en #1.

Divergencia de instrumento: el sondeo 058 y sus pre-flights usan `charName=fof2` (minúsculas) — la nota 058 lo declara explícitamente: «endpoint `lgdc.uml.edu/rix/gambit-coeffs?time=..&charName=fof2`, todo byte-idéntico al `urlFor`/`fetchURL` de la app». La app NO envía eso:

- `src/Data/IrtamCoeffAdapter.h:46` (verificado en espejo a711b58, linaje en §7): `kParams[4] = {"foF2", "hmF2", "B0", "B1"}` — formas display.
- `IrtamCoeffAdapter.cpp:78` `urlFor`: concatena `param` **verbatim** — sin transformación de caso.
- `planMissing` (:52–72) itera kParams → las 4 formas fluyen a la URL tal cual.
- La traza de la app emite «launch gambit foF2 …» (:180, con el param real) — la forma «gambit-fof2» del log del sondeo era etiqueta propia del script, no de la app.

**El instrumento de medición jamás fue byte-idéntico a la app: divergía exactamente en el caso del parámetro.** El servidor LGDC desplegó validación de `charName` (§6) y esa divergencia se volvió letal para el instrumento — e inocua para la app (§7).

## 4. Erratum GLM 059 — la verificación certificó el caso equivocado

El veredicto 059 afirmó: «endpoint byte-identico VERIFICADO contra arbol 559cdbb3: urlFor … + `&charName=fof2`». **ERRATA de transcripción de caso: el árbol emite `foF2`.** Todo lo demás de esa verificación (urlFor, formatGambitTime, CURLOPT_TIMEOUT 20L, UA) se mantiene. Clase: la misma que la «5a forma» del 053 (errata de ejemplo GLM). Consecuencia: la condición 1 del protocolo de reintento («mismo script byte-identico») perpetuaba el defecto — **queda VACADA por este veredicto**. Cadena de fallos: (i) el script del sondeo tomó la forma de la *etiqueta* de traza, no la del *parámetro*; (ii) GLM 059 la rubricó sin releer el caso en fuente. La responsabilidad de la certificación es de GLM.

## 5. Probes GLM 061 — estado actual del servidor (23:14–23:32Z, 16 reqs, UA proyecto, timeout 20 s, espaciado 15 s, DNS → 129.63.134.26)

| Probe | Petición | Resultado |
|---|---|---|
| Q1 | getbest EB040 (lista mixed) | **200** / 36269 B |
| Q2–Q4 | gambit `fof2` @ 09-23T15:26 / 09-21T17:15 / 09-19T17:15 | **500 / 1361 B** ×3 |
| R0 | gambit `fof2` control | **500 / 1361 B** |
| R1–R3 | gambit `FOF2` (mayúsculas) @ 3 TOVs | **500 / 1361 B** ×3 |
| S2 | gambit sin `charName` | **500 / 1195 B** «parameter charName not specified» |
| S1 | gambit `B0` @ 09-23T15:26 (~80 h, banda servible) | **200** / 18042 B |
| S3 | gambit `foF2` @ 09-23T15:26 (banda servible) | **200** / 18095 B |
| T1 | gambit `foF2` @ 09-21T17:15 (**5,26 d**) | **200** / 18100 B |
| T2 | gambit `foF2` @ 09-19T17:15 (**7,26 d**) | **200** / 18101 B |
| T3 | gambit `foF2` @ 07-28T17:15 (**60,26 d**) | **200** / 18089 B |
| U | gambit `hmF2` y `B1` @ 09-23T15:26 | **200** / 18088 y 18040 B |

T3 sirvió un fichero GIRO/IRTAM real con cabecera «Time of Validity 2026-07-28T17:15:00.000Z» exacta (cuerpo depositado). Fingerprints (cuerpos depositados): **1361 B** = validación de charName («illegal value … legal values [FOF2, B0, TAU, VTEC, MUF3000, NMF2, HMF2, B1]»); **1195 B** = falta de parámetro; **1531 B** = TOV fuera de ventana (P1 del 059, cuerpo no conservado). Inconsistencia server-side documentada: la enumeración «legal values» NO refleja las formas realmente aceptadas — rechaza `FOF2` que él mismo lista, acepta `foF2`/`hmF2` que no lista, más `B0`/`B1`. Las 4 formas aceptadas son exactamente las 4 de la app.

## 6. Timeline adjudicado del sábado (lo determinable)

- ≤17:18Z: servicio OK (bucket `foF2` de la app en disco, mtime 17:18).
- 17:23–17:26Z: sondeo 12/12 500 (`fof2`). Mecanismo fino **INDETERMINABLE**: el instrumento no registra bytes por respuesta y los cuerpos no se conservaron. P3 (fof2 + 09-21T17:15 → **200** @ 18:05) acota: `fof2` era servible a las 18:05.
- ~17:3xZ: diagnóstico 058 — gambit fof2-fresh y hmF2-fresh 500/1361 + **getbest 500/217 B** (cabecera DIDBase válida truncada) → fallo real multi-endpoint en esa ventana: getbest-217 B no es página de parámetro. El 1361 de hmF2-fresh no es reconcilible con el comportamiento actual (hmF2 aceptada a las 23:32) sin cuerpos — queda registrado como no resuelto.
- 18:04:56–18:06:23Z: recuperación TOTAL (P2 getbest 200; P3 gambit fof2 09-21 200 — lowercase AÚN aceptada; P4 09-23T15:26 200, param no registrado en el texto del veredicto).
- (18:06, 18:40]: **activación de la validación de charName** — el pre-flight #1 ya ve 1361 B.
- 18:40–21:10Z: 3 pre-flights `fof2` → 500/1361 — rechazos de parámetro leídos como outage. 0 series quemadas.
- 23:14–23:32Z: caracterización GLM — servidor VIVO, sin outage, validación estable.

Dos eventos server-side distintos: (1) fallo transitorio multi-endpoint ~17:2x–~18:0x; (2) despliegue de validación de parámetros ~18:0x–18:40. El 058 queda registrado como evidencia del evento (1) — outage real de esa ventana — y mantiene su condición de «no citable como corte», ahora por la razón adicional del instrumento divergente.

## 7. Impacto en la app: NINGUNO — cero código

kParams {foF2, hmF2, B0, B1} — las 4 formas servidas ahora mismo (S1/S3/T1/T2/T3/U). La forma de la app jamás fue observada fallando en ventana alguna del sábado (bucket 17:18 ✓, S3/T/U 23:19–23:32 ✓). Linaje certificado: ningún delta del relay posterior a tecext toca `IrtamCoeffAdapter.h` (prov049/prov051: App/CMake/ProviderStatus; o3054: no lo toca; kParams solo aparece en deltas antiguos b0b1/mirtamf2p4, muy anteriores) — el kParams verificado en a711b58 es el de la línea certificada actual. Cuando la app se reanude, la línea IRTAM re-fetchea normal.

## 8. Ruling sobre las tres alternativas del 060

- **(a) diferir — SIN OBJETO**: no hay outage que esperar; el servidor está vivo y sirviendo.
- **(b) corte por caché local — RECHAZADA**: población equivocada (mide continuidad local de descarga, no retención servible del servidor — lección 66-gaps de etiquetado de población). Además moot: la medición directa ya existe (§5).
- **(c) nueva ventana — SUPERADA**: la ventana YA está abierta; lo que fallaba era el instrumento.

**ADOPTADA (d): corrida formal de confirmación con instrumento corregido** (drop de Muse, a señal de David — §9).

## 9. Prescripción: corrida formal de confirmación (cierre formal de Q2)

- Instrumento 017 §2 con **UNA enmienda**: `charName=foF2` (forma byte-exacta de la app). TODO lo demás intacto: 12 req, profundidades {5,7,14,21,30,60} d × 2 TOVs contiguos :15/:00 (recalculados al momento de correr), pacing 1 req/15 s (14,81–15,20 s), UA `IonosphereLive3D/1.0`, timeout 20, endpoint urlFor byte-idéntico.
- **MEJORA obligatoria de instrumento**: registrar bytes de respuesta por request en el log — los fingerprints 1361/1531/1195 son diagnóstico; su ausencia es lo que dejó indeterminable el mecanismo de las 17:2x.
- Pre-flight: 1 req `foF2` TOV banda [72,96] h → 200 → serie (abrir ≤5 min después); 500 → abort, no consume presupuesto.
- Presupuesto: 1 serie de las 2 autorizadas (queda 1 en reserva).
- Custodia (059 cond. 5, ahora aplica): nota + log + sha256/bytes + **depósito del script fuente** en to-glm/files/ + timestamp exacto por probe.
- Lectura: 12/12 200 → Q2 CERRADA formalmente: **sin corte ≤ 60 d**. Cualquier 500: clasificar por fingerprint (1361 parámetro / 1531 TOV-ventana / otro: conservar cuerpo) y volver a GLM.
- Alternativa a señal de David: cerrar Q2 SIN corrida formal sobre la evidencia GLM 061 (3 profundidades + 4 formas app, cuerpos en custodia) — válida, pero deja la curva de 12 puntos sin registro formal. GLM recomienda la corrida.

## 10. Incidente de entorno #14 + custodia propia de evidencia GLM

El workspace rodó de nuevo: espejo scratch-m12-repo @ `a711b58` (era tecext; tags `provmatrix-folded` y `o3-folded` AUSENTES), y los cuerpos/scripts P1–P4 del 059 (citados como «cuerpos scripts/probe_lgdc/») DESAPARECIDOS del workspace. Registro durable = relay (veredictos íntegros). Lección aplicada este mismo veredicto: **la evidencia GLM también entra al relay** — de aquí en adelante, todo probe GLM citado en un veredicto se deposita con él. El script-U de esta tanda no se persistió antes del fin de contexto; se deposita una reconstrucción marcada (`probe_061u_reconstruido.sh`), siendo el log la evidencia primaria. Reconstrucción del espejo (receta 035 §0) prescrita ANTES del próximo fold de código — no bloquea la corrida del sondeo (cero código).

## 11. LEDGER post-061

- **Q2: RESPUESTA EN SUSTANCIA — criterio de muerte REFUTADO hasta 60 d** (T1/T2/T3 200 con coeficientes reales; el corte <7 d queda refutado por medición directa). Corrida formal de confirmación prescrita (§9) para el cierre con custodia completa.
- **Opción B: a ciclo propio** (estilo Q5-B0B1) — su premisa «partición de código solo con el corte en la mano» queda disuelta: no hay corte. A señal futura de David.
- O3 CERRADO (057) · techo duro cerrado (053) · kStaleSec cerrado (050/052) · O-030a aparcado · erratum 059 registrado (§4) · espejo a reconstruir (§10).
- CERO código prescrito. Próxima acción del proyecto: **señal de David → corrida formal 017 §2 corregida → drop de evidencia → veredicto de cierre Q2**.
