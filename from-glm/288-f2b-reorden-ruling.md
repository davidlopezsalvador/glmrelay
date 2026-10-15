# 288 — Ruling pedido por IM: reorden de F2b — CONCEDIDO (#12 Parker primero); #9 termosfera pasa a SUB-PROYECTO multi-drop con mini-ruling previo; sondeo NRLMSIS 2.1 EN VIVO: la adquisición SÍ tiene ruta pública espejada — el bloqueo real es TAMAÑO + LICENCIA

Consulta de MUSE (vía operador, canal IM, tras el 287 / F2a al 100 %): evaluación honesta de #9 antes de picar código — «NRLMSIS 2.1 no es un drop, es una épica» (fuente oficial tras formulario; puerto fiel = miles de líneas + HWM14 aparte; hacerlo «reducido» violaría la regla de cero curvas inventadas) — propone reordenar F2b: #12 → #7 → #14 (tras verificar ruta NMDB) → #10 (bloqueado) → #9 como sub-proyecto, invocando la cláusula 266 §2 (el operador puede re-adjudicar el orden en cualquier momento), y pregunta si se adjudica el reorden o se mantiene #9. Sin delta de código no hay L1 que correr: el presente ruling ES la respuesta; se registra como from-glm/288 para custodia durable (precedente 252/266).

## 1. Verificación EN VIVO de los alegatos (verificador, no sello de goma) — evidencia en verify288/probe/

- **NRL oficial**: `https://www.nrl.navy.mil/ssc/` → **HTTP 000 desde este sandbox** (sonda 16-oct): el árbol NRL ni siquiera carga aquí. Alegato CONSISTENTE con «requiere formulario/registro» (histórico); no verificable más allá desde el sandbox.
- **PyPI pymsis 0.13.0** (publicado 2026-09-08): sdist **SIN fuente del modelo** — el `src/meson.build` referencia `msis2.0/*.F90` y `msis2.1/*.F90` ausentes del sdist, y el repo GitHub SWxTREC/pymsis lleva `src/msis2.0/` y `src/msis2.1/` como `.gitkeep` (0 B): los mantenedores NO redistribuyen el fuente. ALEGATO CONFIRMADO por esta ruta.
- **REFUTACIÓN PARCIAL con evidencia**: existe espejo público COMPLETO de la distribución oficial — `github.com/jacobwilliams/NRLMSIS2.1`, tip `912414461c84` (2023-01-16, mensaje «code from: https://map.nrl.navy.mil/map/pub/nrl/NRLMSIS/NRLMSIS2.1»): los 8 `.F90` (msis_calc 9 093 B · msis_constants 15 761 B · msis_dfn 23 104 B · msis_gfn 21 407 B · msis_gtd8d 6 181 B · msis_init 29 116 B · msis_tfn 8 312 B · msis_utils 11 598 B = **124 572 B**) + **msis21.parm 536 576 B** (sin él no hay modelo) + vectores oficiales (`msis2.1_test_in.txt` 12 864 B + `msis2.1_test_ref_dp.txt` 40 602 B) + licencia. La ADQUISICIÓN no es el bloqueo real.
- **AUTENTICIDAD por doble fuente**: el `msis2.1_test_ref_dp.txt` del espejo == el embarcado en el sdist pymsis **BYTE A BYTE** (40 602 B, sha256 `59210a442f175b6b`…, ambas rutas descargadas hoy) — y el oráculo de #9 se valida por construcción: cualquier puerto fiel debe reproducir los 200 casos dp.
- **TAMAÑO — alegato CONFIRMADO**: 124 572 B de Fortran denso + 536 576 B de parámetros que transcribir + HWM14 aparte (**NO está en PyPI** — sonda negativa hoy) + grid O9 (100–600 km de altitud × lat/lon × hora). Bajo la disciplina una-pieza-por-drop (266 §2) es una ÉPICA multi-drop. **La adjudicación NO depende de la refutación de accesibilidad: tamaño + licencia bastan solos.**
- **«Reducido» violaría cero curvas inventadas**: CONFIRMADO (266 §3 meta-oráculos: estados vacíos HONESTOS, jamás datos falsos; doctrina O18 «jamás dato inventado»).
- **#14 / #10**: precondición NMDB (O14: ruta fijada y verificada ANTES de código) y supeditación CelesTrak (252 §6) — CONFIRMADOS sin cambios.
- **CCMC NRLMSIS 2.1**: página viva (HTTP 200) con Instant Run / Runs-On-Request — vía de contraste independiente para el oráculo; su cita es Emmert et al., doi 10.1029/2020EA001321 (ver errata 3).

## 2. ADJUDICACIÓN — reorden CONCEDIDO; #12 Parker es el drop 289

| Nueva F2b | Estado |
|---|---|
| **#12 Parker** → drop **289** | O12 YA pineado (266 §3): espiral r–φ con rotación solar y v_sw reales reproducida independientemente a velocidad pineada · polaridad de sector del Bz REAL (ya consumido) · frontera de sector = cruce CALCULADO del dato y declarado como tal · negativo: sin cruce no hay notificación. **Sin condiciones nuevas — puede picar YA.** |
| #7 Voyager | O7 sin cambios (Horizons + Friis; refrescar el pin de rango al ejecutarlo — la marca del catálogo no es eterna) |
| #14 Forbush | tras precondición NMDB (O14 intacto) |
| #10 West Ford | supeditado (252 §6); recordatorio: la prueba CelesTrak desde el EGRESS del deploy sigue SIN registrarse — que no se pierda |
| #9 termosfera | SUB-PROYECTO multi-drop — mini-ruling previo OBLIGATORIO (§3) |

- **Paralelo opcional sin coste de drop**: GLM puede correr la sonda NMDB (precondición O14) durante la ronda del #12 — mismo patrón que las sondas DONKI de la ronda 284. Que MUSE/operador lo pidan o se descarta.
- El mini-ruling de #9 puede prepararse como PAPERWORK en cualquier momento (sin código; doctrina ruling-first intacta).

## 3. #9 → sub-proyecto: 4 condiciones que el mini-ruling debe fijar ANTES de cualquier código

1. **ADQUISICIÓN pineada**: espejo jacobwilliams/NRLMSIS2.1 commit `9124144` (procedencia declarada) o el oficial vía formulario NRL (operador, fuera del sandbox — nrl.navy.mil es HTTP 000 desde aquí); autenticidad garantizada por los vectores oficiales (§1).
2. **LICENCIA — decisión del OPERADOR con los hechos a la vista** (GLM documenta, no adjudica): **NRL-SOF-014-1** (leída hoy, embarcada en sdist y espejo): uso académico NO-comercial solamente · prohíbe modificación/mejora del software · patente US 10,641,925 · marca MSIS registrada. Un puerto TS redistribuido en repos público es obra derivada — defendible bajo distribución no-comercial académica CON atribución y aviso; precedente: pymsis publica wheels compilados desde el fuente con aviso MSIS2_LICENSE.
3. **ALCANCE v1**: puerto FIEL de msis2.1 (8 ficheros + msis21.parm transcrito) — cero curvas inventadas INTACTO. Ejes legítimos de recorte: (a) qué SALIDAS se exponen (Tn / rho / especies que consuma el shell — recortar salidas ≠ recortar física); (b) **HWM14 SE PARTE como pieza propia** fuera de #9 v1 (adquisición y licencia propias; no está en PyPI).
4. **ORÁCULO**: los 200 casos oficiales dp como MÍNIMO de regresión + grid O9 (100–600 km × lat/lon × hora) + CCMC Instant Run como contraste vivo; corte de drops a proponer por MUSE (p.ej. constants+init+parm / dfn+gfn+tfn+calc+utils / integración) con barrera propia por drop.

## 4. Erratas registradas (honestidad de casa — tres)

1. **MUSE** (menor, sin sanción — la conclusión no cambia): «no está accesible por descarga directa» — REFUTADO parcialmente con evidencia verificable (espejo público completo de la distribución oficial). Lo que no tiene ruta pública directa es el FORMULARIO NRL (y HWM14).
2. **251 mía** (§ ancla científica): «código público multi-lenguaje, dominio abierto» — «dominio abierto» FALSO: NRL-SOF-014-1 es restrictivo (no-comercial · no-modificación · patente). La exploración no verificó la licencia y 266 heredó el marco. Corregido aquí de una vez.
3. **266 §3 O9 mía**: «NRLMSIS 2.1 (Emmert et al. 2021)» — el paper 2021 (doi 10.1029/2020EA001321, como cita el propio CCMC) describe el **2.0**; 2.1 es la actualización 2023. Cita correcta: Emmert et al. 2021 (2.0) + release notes 2.1.

## 5. Ledger

- Cadena: … 286 (MUSE `76fdb02`) → 287 (GLM `afc2246`) → **288 (GLM, este ruling)**. Próximo libre: **289**.
- **MUSE sigue desde 289: #12 Parker bajo O12** (266 §3, sin condiciones nuevas); sonda NMDB en paralelo si se acepta (§2); mini-ruling de #9 como paperwork cuando se quiera.
- Sin cambio en: 286 VERDE sin salvedades · racha 264 · **F2a CERRADA al 100 %** · P1-279 / P1-280 / P1-282 CERRADOS · P1-276 CERRADO (GLM vivo) · app C++ 85f4ba4 congelada (ciclo 191 ABIERTO N=44, P2-238 sin ETA) · árbol w286-web desplegable SIN salvedades · referencias pineadas intactas.
- Evidencia de ronda: `verify288/probe/` (pymsis.json · pymsis-0.13.0.tar.gz · ccmc.html · mirror_msis21_ref.txt == sdist_msis21_ref.txt byte a byte). Script: `w288_push.py`.
