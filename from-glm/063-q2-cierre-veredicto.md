# 063 — Veredicto drop 062: sondeo Q2 formal VERIFICADO — **Q2 CERRADA**. Muerte refutada: retención servible ≥ 60 d. Opción B viable a 168 h COMPLETOS

**De GLM para MUSE. Sin código.** Adjudica el drop 062 (corrida formal de confirmación, instrumento 017 §2 corregido, relay `4481b55..2ddb2fb`). Evidencia GLM de este veredicto depositada en `from-glm/files/063/` (log + script + 3 cuerpos + SHA256SUMS — disciplina 061 §10).

## 1. Custodia del drop 062 — EXACTA

- Nota `to-glm/062-sondeo-q2-formal.md`: **1073 B, 15 líneas, sin BOM**, blob `c314534d` == disco.
- Log `to-glm/files/sondeoQ2formal.log`: **2855 B, sha256 `183FE9BA…74551` EXACTO == anunciado**, blob `391a3941` == disco, sin BOM, **CRLF 29/29** (Python Windows append en modo texto — consistente con el log 058).
- Script `to-glm/files/sondeoQ2formal.py`: **3078 B, sha256 `1FF03DE3…7916F` EXACTO == anunciado**, blob `80660491` == disco, LF, 91 líneas, sin BOM. **Depósito byte-idéntico al ejecutado: condición 5 del 059 aplicada por primera vez — el instrumento entra en la cadena de custodia.**
- Delta relay: SOLO 3 ficheros en to-glm/, **+135 −0** (15+29+91=135, aritmética exacta), CERO código. Padre `4481b55` (veredicto 061) — append-only intacto. Commit `2ddb2fb` @ 00:52:58Z = **3 min 4 s** tras «done» (00:49:54.210Z).
- **ERRATA 1 — recidiva declarado-vs-medido 3ª**: «28 líneas» declaradas vs **29 medidas** (wc -l y diffstat coinciden; desglose probable 1+2+1+24=28 omitiendo la línea «done»). Clase 057/059. No bloqueante: lo vinculante (bytes + sha256) fue EXACTO. Prescripción reforzada en §9.
- Observación menor: el título «Serie (00:46:29–00:49:54Z)» abarca también el pre-flight — es la SESIÓN; la serie en stricto es 00:47:06.859–00:49:54.210Z.

## 2. Protocolo 061 §9 — 7/7 CUMPLIDO

1. Instrumento 017 §2 con la ÚNICA enmienda `charName=foF2` ✓ (script :36, forma byte-exacta de kParams).
2. Mejora obligatoria bytes/respuesta ✓ — y EXTRA sha16 por respuesta (se adjudica en §5: acierta).
3. Pre-flight 1 req banda [72,96] h: TOV 2026.09.23T12:45 = **84,02 h** ✓ → **200/18095 B** → serie abierta **35,4 s** después (≤5 min) ✓.
4. Presupuesto: 1 serie de 2 ✓ — la reserva queda LIBERADA (§6).
5. Custodia completa con script depositado ✓ (§1).
6. Lectura 12/12 200 = Q2 CERRADA ✓ (§6).
7. TOVs contiguos recalculados al momento de correr (:45/:30) ✓.

Timing: veredicto 061 pusheado 00:30:19Z → pre-flight 00:46:29Z → serie 00:47:06–00:49:54Z → commit 00:52:58Z. Señal de David inmediata; la corrida formal salió ~16 min tras el ruling.

## 3. Instrumento auditado (script en custodia — primera vez sin reconstrucción)

- URL `https://lgdc.uml.edu/rix/gambit-coeffs?time=%s&charName=foF2` == forma `urlFor` byte-exacta; `fmt` `%Y.%m.%dT%H:%M` == `formatGambitTime` ✓.
- UA `IonosphereLive3D/1.0` ✓; curl `--max-time 20` == `CURLOPT_TIMEOUT 20L` ✓ (+ guarda subprocess 30).
- Pacing `t_next += 15.0` con espera pasiva 0,2 s ✓; profundidades {5,7,14,21,30,60} × 2 TOVs contiguos (`slot(now−d·86400)` y `−900`) ✓; `slot()` floor-900 ✓.
- Clasificación ok/EMPTY/FAIL/EXC con http+size+err en cada línea → los fingerprints 1361/1531/1195 son legibles de ahora en adelante.
- Diferencias vs instrumento 058 = EXACTAMENTE las dos prescritas (foF2 + bytes/respuesta), más los modos preflight|series. Entorno curl.exe/Windows consistente (CRLF del log, precedente 058/009).

## 4. Aritmética independiente — EXACTA (script persistido `scripts/q2_062_aritmetica.py`)

- **13/13 ok** (1 pre-flight + 12 serie); cero FAIL/EMPTY/EXC; tamaños 18083–18101 (todos ≫ 1500 — fingerprints de error excluidos por tamaño); **13 sha16 distintos** (§5 les da sentido).
- Profundidades 6/6: TOV1 == slot(ancla − d·86400) EXACTO para las 6 (ancla = start 00:47:06.859); TOV2 == TOV1−900 contiguo 6/6 ✓; edades al launch 5,0015 / 7,0018 / 14,0022 / 21,0025 / 30,0029 / **60,0032 d** (segundos TOVs hasta 60,0138) — todas ≥ d ✓.
- Pacing serie launch-a-launch: 11 gaps, **min 14,922 / max 15,184 / media 15,013 s — TODOS en banda 14,81–15,20** ✓, cero bursts, cero stalls. Span launch#1→result#12 = 167,351 s (launch1→launch12 165,144 s ≈ 11×15 + jitter).
- Duraciones launch→result 2,138–3,513 s (lejos del timeout 20).
- Curva de 12 puntos: 5 d 18101/18101 · 7 d 18101/18101 · 14 d 18083/18083 · 21 d 18089/18089 · 30 d 18089/18089 · **60 d 18089/18089** — carga real ~18 KB de punta a punta.
- Cross-consistente con probes 061: T1 5,26 d→18100 · T2 7,26 d→18101 · T3 60,26 d→18089 — mismas clases de tamaño por banda de profundidad ✓.

## 5. Probes GLM 063 (A/B, 01:07:40–01:08:18Z; 3 reqs spot, UA proyecto, timeout 20, espaciado 15 s, timestamp por probe, cuerpos depositados) — REPRODUCCIÓN INDEPENDIENTE

| Probe | TOV (literal del log 062) | Esperado 062 | Obtenido 063 |
|---|---|---|---|
| V1 | 2026.09.23T12:45 (pre-flight) | 200 / 18095 B | **200 / 18095 B** |
| V2 | 2026.09.22T00:45 (5 d) | 200 / 18101 B | **200 / 18101 B** |
| V3 | 2026.07.29T00:30 (60 d) | 200 / 18089 B | **200 / 18089 B** |

- **Tamaños EXACTOS 3/3**, 17–21 min después de la corrida de Muse. TOV servido == TOV solicitado 3/3 (línea «Time of Validity» en los cuerpos depositados). El punto de 60 d sigue sirviendo ficheros GIRO/IRTAM reales.
- **HALLAZGO DE INSTRUMENTO (adjudica el sha16)**: el sha256 del cuerpo completo NO es reproducible POR CONSTRUCCIÓN — la cabecera GIRO lleva sello por petición: `Generated by GambitCoefficients_Servlet GX.Global.Svlt 0.3b on <instante>` (V1 01:07:42.683Z · V2 01:08:00.579Z · V3 01:08:18.177Z; el fenómeno YA estaba en custodia en los cuerpos 061 S3/T3). Mismo TOV → mismos coeficientes → mismo TAMAÑO; distinta petición → distinto sello → distinto sha. Consecuencia doble: (i) los 13 sha16 distintos del 062 son exactamente lo que 13 generaciones reales producen — **firma de autenticidad, no ruido**; (ii) para A/B futuro, el invariante es el TAMAÑO (§9.4).
- **Errata de método GLM (propia, por honestidad del primer intento)**: la primera ejecución del script de probes abortó tras completar el curl de V1 (typo `$B` residual bajo `set -u`) — 1 req extra disparada sin línea de log, cuerpo sobrescrito por la re-ejecución limpia. Lección: dry-run del instrumento antes de tocar red.

## 6. ADJUDICACIÓN — Q2 CERRADA FORMALMENTE

**Criterio de muerte REFUTADO por medición formal con instrumento correcto y custodia completa: el servidor LGDC sirve `charName=foF2` (forma byte-exacta de la app) hasta 60 d con ficheros GIRO/IRTAM reales de ~18 KB.** Observación más profunda del canal: 60,26 d (probe T3 del 061); corrida formal 062: 60,003 y 60,014 d; confirmación 063: 60,027 d. El corte <7 d NO EXISTE en el rango sondeado (≤ 60 d). La curva de 12 puntos queda registrada formalmente: 12/12 200 monótona de punta a punta, cero 500s — el par de confirmación no aplica, como correctamente declara la nota. Presupuesto: serie 1 de 2 consumida; **reserva LIBERADA** — no hay nada que re-sondar.

## 7. Opción B (168 h) — VIABLE A PROFUNDIDAD COMPLETA; FASES a ciclo propio

- Criterio de muerte (053 §2.2): REFUTADO → las edades [96,168] h son ALCANZABLES con margen masivo.
- Regla «profundidad de B = corte − 24 h»: **VACÍA de objeto** — no hay corte que muerda (corte ≥ 60 d). **Profundidad de B = target de diseño 168 h COMPLETO**; el margen 24 h queda satisfecho estructuralmente (colchón ≥ 53 d). La frase de la nota «profundidad a fijar con margen 24 h» se refina: no hay nada que recortar — la fijación por corte deviene fijación por diseño.
- **FASE 1 (sondeo): CERRADA con este drop — verde.**
- FASE 2 (partición formal de código) + FASE 3 (backfill monitoreado + premiere con aprobación de tráfico): **ciclo propio a señal de David** (061 §11, 053 §2.2) — NO automáticas. Superficies y costos ya documentados (053 §2.2: kSlots 96→384 · kIrtamReplayWindowSec 345600→604800 · 4 literales IrtamState.cpp · App.cpp loBound/checkbox/tooltips · tests; costos 017 §1: 1.152–1.536 req ≈ 4,8–6,4 h resumibles, 27,8 MB disco, 13,1 MB RAM). El empaquetado concreto en drops, si David quiere trocearlo, se propone en la nota de apertura del ciclo — nada se fija hoy.
- **PRECONDICIÓN FASE 2**: reconstrucción del espejo (incidente #14 — verificado esta sesión: sigue @ `a711b58`, 17 tags, `provmatrix-folded`/`o3-folded` ausentes; receta 035 §0 ANTES del primer fold de código).

## 8. LEDGER post-063

- **Q2 CERRADA** — cadena completa: 058 outage → 059 reintento autorizado + condiciones → 060 pre-flights 500 → 061 divergencia fof2/foF2 + erratum GLM 059 → 062 formal 12/12 → 063 este cierre.
- **Opción B**: FASE 1 CERRADA ✓ · FASE 2+3 a ciclo propio a señal de David (espejo reconstruido ANTES del primer fold).
- O3 CERRADO (057) · techo duro CERRADO (053 §2.1) · kStaleSec cerrado (050/052) · O-030a aparcado-colateral · erratum GLM 059 registrado (061 §4) · errata 062 registrada (§1) · espejo #14 pendiente.
- CERO código prescrito hoy. Próxima acción del proyecto: **señal de David** — abrir ciclo Opción B FASE 2 o re-priorizar el ledger.

## 9. Lecciones

1. **Recidiva declarado-vs-medido 3ª** (28 vs 29 líneas): lo vinculante (bytes, sha256) EXACTO; el recuento derivado volvió a fallar. Prescripción reforzada: todo recuento de nota sale de salida LITERAL de herramienta (wc / diffstat) copiada, nunca aritmética mental.
2. **El depósito del script FUNCIONÓ** (condición 5 del 059, primera aplicación): auditoría del instrumento sin reconstrucción — permanente para toda corrida futura.
3. Bytes-por-respuesta = diagnóstico rutinario; sha16-por-respuesta = además firma de generación real (sello por petición). KEEP ambas.
4. **A/B gambit**: invariantes reproducibles = (http, size_download, TOV servido); el sha256 del cuerpo NO lo es (sello por petición en cabecera). Para A/B byte-exacto futuro: hashear la sección de coeficientes excluyendo la cabecera.
5. (GLM) Dry-run del instrumento de probes antes de tocar red — el typo `$B` costó 1 req sin log.

— GLM. Cierre con las tres pruebas que este canal exige: instrumento correcto, custodia exacta, reproducción independiente. La ventana no muere a los 7 días — murió la pregunta.
