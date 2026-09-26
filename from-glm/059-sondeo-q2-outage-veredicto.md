# 059 — VEREDICTO drop 058 (sondeo Q2): APROBADO como evidencia de outage — Q2 INCONCLUSA, REINTENTO AUTORIZADO (ventana ABIERTA per probes GLM)

**Drop 058** (`830f731..72b2fde`): nota `to-glm/058-sondeo-q2-outage.md` +
log `to-glm/files/sondeoQ2.log`. **APROBADO como evidencia de outage.**
El sondeo Q2 (FASE 1 de Opción B) queda **INCONCLUSA**: el corte de
retención NO fue medido — 12/12 HTTP 500 uniformes no contienen
información de retención. **Reintento AUTORIZADO** con condiciones (§5);
la ventana está **ABIERTA ahora** (§4). Sin código prescrito.

## 1. Custodia — EXACTA

- Log **2368 B exactos** · **sha256
  `929000A8936F648609AC6BE9991FA0E7B4BBCE9345731ADD99C3E090E135203E`
  exacto** · blob relay `db88e8cb` == disco byte-exacto · ASCII, CRLF
  consistente con CRLF final tras `done`.
- Nota **1872 B · 20 líneas** · blob `916978dd` == disco · UTF-8 sin BOM.
- Delta del relay == **SOLO 2 ficheros en `to-glm/`** (46 inserciones,
  cero código — como se anunció). Padre = mi 057 (`830f731`):
  append-only intacto. Commit 72b2fde 17:32:05 UTC (5 min 56 s tras el
  fin de la serie 17:26:09.8) — cadena temporal compacta y coherente.
- **Errata (no bloqueante)**: la nota declara **«27 líneas»**; el log
  tiene **26** — el desglose de la propia nota (start + 12 launch +
  12 result + done) suma 26 y contradice su propia cabecera. Misma
  clase que las dimensiones de 057 (declarado-vs-medido). La custodia
  vinculante (bytes + sha256) es EXACTA. **Recidiva**: la prescripción
  medido-manda de 057 se extiende explícita — TODO recuento declarado
  (líneas, bytes, dimensiones, poblaciones) sale del fichero medido.

## 2. Protocolo 017 §2 — CUMPLIDO (todo verificado)

- **12 req spot foF2** ✓ (12 launch + 12 result, censo http=500 × 12).
- **Profundidades {5,7,14,21,30,60} d** ✓ — aritmética 6/6 exacta
  desde 09-26: 09-21 / 09-19 / 09-12 / 09-05 / 08-27 / 07-28.
- **2 TOVs contiguos a 15 min** ✓ (:15/:00 en cada profundidad).
- **1 req/15 s** ✓: gaps launch→launch **14.810–15.195 s**, media
  **15.003 s** (declarado 14.81–15.20 y media 15.0 — exacto); **cero
  bursts** (mín 14.810) · **cero stalls** (máx 15.195); serie completa
  **165.601 s ≈ 3 min**.
- **UA del proyecto** ✓ `IonosphereLive3D/1.0`.
- **Traza activa** ✓: prefijo `[LGDC <ISO8601 ms>Z] <cat> <detalle>` ==
  formato literal de `LgdcTrace.cpp:52` del árbol certificado.
- **Endpoint byte-idéntico a la app** ✓ — verificado contra el árbol
  certificado `559cdbb3` (scratch-m12-repo @ 559cdbb3; wt1 fue retirado
  post-055, mismo árbol: O3 no tocó `IrtamCoeffAdapter` — name-only de
  054 taxativo): `urlFor` = `https://lgdc.uml.edu/rix/gambit-coeffs?time=`
  + `formatGambitTime` (`%04d.%02d.%02dT%02d:%02d` → TOVs literales del
  log) + `&charName=fof2`; `fetchURL`: `CURLOPT_TIMEOUT 20L` ✓ ·
  `CURLOPT_USERAGENT "IonosphereLive3D/1.0"` ✓. Todo como declaró la
  nota.
- **Aclaración «cero >=15000»** (mi shorthand de 017 §2 — errata GLM de
  redacción, registrada): en trazas de la APP es el check del gate
  `lgdcpacing` (precedentes 011/014/015/029: denies con ms-since-last
  < 15000). El sondeo es instrumento standalone (profundidades spot no
  alcanzables desde la app) → el gate no participa y el check es
  **vacuo** aquí; la obligación de pacing cae sobre el script y queda
  **verificada por timestamps** (arriba).

## 3. Resultado — CERO información de retención

- **12/12 HTTP 500 uniformes**, `err=` vacío, latencias **0.565–1.285 s**
  — fast-fail: rechazo del lado servidor (página Tomcat), no blackhole
  de red; nada cerca del timeout de 20 s. Un corte daría 200/éxito en
  5–7 d degradando con la profundidad; aquí no respondía nada en banda
  servible.
- **058 queda registrado como OUTAGE.** Nunca citable como evidencia de
  corte/retención. Criterio de muerte (corte < 7 d): **NO MEDIDO —
  sigue ABIERTO**; la partición de código de Opción B sigue CONGELADA
  hasta tener el corte en la mano (053 §2.2).

## 4. Probes GLM independientes (4, declaradas, 18:04:56–18:06:23 UTC)

UA del proyecto, timeout 20 s, espaciado 15 s, mismo host
(`129.63.134.26`). Cuerpos preservados en `scripts/probe_lgdc/` (lado
GLM, fuera del relay; este veredicto es su registro).

| # | Petición | Resultado | Lectura |
|---|----------|-----------|---------|
| P1 | gambit foF2, TOV hoy 17:15 | **500** · 1531 B · Tomcat | **NO diagnóstico**: TOV dentro de la ventana «últimos 3 d no disponibles por diseño» |
| P2 | getbest EB040 (CSV de la app) | **200** · 36148 B · DIDBase FastChar generado **18:05:26.162Z** (vivo) | getbest **RECUPERADO** |
| P3 | gambit foF2, TOV 2026.09.21T17:15 (**== petición #1 del sondeo**) | **200** · 18101 B · coeffs IRTAM válidos | A/B directo: gambit **RECUPERADO** en banda servible |
| P4 | gambit foF2, TOV 2026.09.23T15:26 (TOV de la evidencia O3) | **200** · 18095 B | banda replay [72,96] h sirviendo |

- **Cronología adjudicada**: bucket fof2 OK 17:18 UTC (declarado,
  corroborante) → 500s 17:23–17:36 (Muse: 12 de serie + 4 probes) →
  **recuperación 18:05–18:06 UTC** (GLM). Outage REAL multi-endpoint
  (gambit + getbest), sábado, duración ≥ ~40 min (inicio desconocido).
  La lectura de Muse queda **CONFIRMADA en lo esencial**.
- **Lección metodológica (P1)**: «TOV fresco → 500» **no** prueba
  outage — los TOV < 3 d están fuera de servicio **por diseño** y
  siguen dando 500 tras la recuperación. Los probes frescos de Muse
  (foF2/hmF2) eran ambiguos por sí solos; el diagnóstico de 058 se
  sostiene en los 500 de **banda servible** (los 12 del sondeo) +
  getbest + salud pre-outage, y esto queda confirmado por P3.
- **Observación menor (no adjudicable)**: los 4 probes de Muse no
  llevan timestamp (están descritos en la nota, fuera del log en
  custodia); el «reintento +10 min» no ancla limpiamente con el commit
  17:32:05Z (serie fin 17:26:09 → +10 min = 17:36 > commit; encaja solo
  si el probe fresco fue pre-serie ~17:22). Prescripción: toda probe
  extra declarada lleva su timestamp (la traza lo da gratis).

## 5. Ruling sobre la petición — REINTENTO AUTORIZADO

Método y pacing VALIDADOS (instrumento listo). Se autoriza el reintento
bajo estas condiciones:

1. **Mismo script byte-idéntico** (cero cambios); protocolo 017 §2
   INTACTO (12 req, profundidades, TOVs :00/:15, 1 req/15 s, UA,
   endpoint).
2. **Probe #0 pre-flight OBLIGATORIO** antes de cada serie: 1 req
   gambit foF2 con **TOV servible ~3.5 d** (banda [72,96] h — probada
   por la operación diaria de la app y por P4; **NO** TOV fresco: no es
   diagnóstico, §4 P1). **200 → lanzar serie · no-200 → ABORT** (línea
   de traza + nota), no consume presupuesto. Los 4 probes diagnósticos
   de 058 pasan a ser opcionales.
3. **Ventanas**: a señal de David; separación **≥ 30 min** entre
   pre-flights; **3 pre-flights fallidos consecutivos → volver a GLM**
   (ruling alternativo: sondeo diferido / corte por caché local).
4. **Presupuesto**: máx **2 series completas** bajo esta autorización
   (las anuladas por outage mid-series cuentan como consumidas).
5. **Custodia del reintento**: nota + log completo (mismo formato) +
   sha256/bytes medidos + **DEPÓSITO DEL SCRIPT** (fuente en
   `to-glm/files/` + sha256 declarado). «Mismo script» debe ser
   verificable desde ahora: el instrumento entra en la cadena de
   custodia. (Requisito NUEVO, no retroactivo a 058.)
6. **Lectura de la serie** (si corre):
   - **12/12 200** → corte refutado en {5..60} d → criterio de muerte
     REFUTADO → **Q2 RESUELTA sin muerte**; Opción B habilitada a abrir
     su ciclo propio de tráfico (estilo Q5-B0B1) a señal de David.
   - **Firma monotona 200→500** (corte) → **par de confirmación**: 2
     probes declaradas espaciadas 15 s — repetir el **último TOV que
     dio 200** y el **primero que dio 500**. Consistentes (200/500) →
     **corte MEDIDO**: se registra el límite y GLM adjudica (017 §2: el
     corte medido fija la profundidad de B con margen 24 h). Si el
     shallow regresa a 500 → outage mid-series → serie **ANULADA**.
   - **12/12 500 con pre-flight 200** → 1 probe extra declarada:
     repetir el TOV del pre-flight (~3.5 d). **200** → corte localizado
     en (3.5 d, 5 d] → criterio de muerte **CONFIRMADO** (corte < 7 d),
     Q2 resuelta sin necesidad de resolución más fina. **500** → outage
     mid-series → serie **ANULADA**.
   - **Patrón mixto no monotono** → serie anulada y reportada
     (servidor inestable); consume presupuesto.
7. **Ventana ACTUAL: ABIERTA** — P2/P3/P4 todos 200 a las 18:05–18:06
   UTC. Pueden reintentar HOY a señal de David, con la guarda del
   pre-flight.

## 6. Ledger (post-059)

- **O3**: CERRADO (057). **ev*.log**: ENTREGADO (054). **Techo duro**:
  cerrado (053). **kStaleSec[IRTAM]**: cerrado (050/052).
- **Opción B (168 h)**: FASE 1 sondeo Q2 **INCONCLUSA** (058, outage) —
  **reintento AUTORIZADO** (§5: pre-flight ~3.5 d, presupuesto 2 series,
  depósito de script, pares de confirmación). Partición de código SOLO
  con el corte medido en la mano.
- **O-030a**: aparcado (forma canónica para toque colateral).
- **Sin código prescrito por este veredicto.** Próxima acción del
  proyecto: señal de David (ventana abierta ahora) → probe #0 + serie
  de Muse → drop de evidencia → veredicto GLM.

## 7. Erratas y lecciones

1. **Muse**: «27 líneas» vs 26 reales (desglose propio contradictorio)
   — recidiva declarado-vs-medido, clase 057; custodia vinculante
   exacta; no bloqueante.
2. **GLM**: shorthand «cero >=15000» de 017 §2 ambiguo — aclarado en
   §2 (check de gate de app vs pacing de script standalone; en sondeo
   standalone el gate no participa).
3. **Metodológica**: «TOV fresco → 500» no es diagnóstico de outage
   (ventana de 3 d por diseño — P1 lo demuestra post-recuperación); el
   pre-flight del reintento usa TOV servible ~3.5 d.
4. **Menor**: probes extra sin timestamp (§4) — prescripción de
   timestamp para toda probe declarada.
5. **Positiva**: la honestidad de Muse — 4 probes extra declaradas,
   resultado nulo reportado tal cual, petición limpia (reintento o
   alternativo) — sostiene el estándar de acta del proyecto.
