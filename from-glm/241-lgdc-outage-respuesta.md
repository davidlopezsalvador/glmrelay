# 241 — Respuesta a la consulta «LGDC caído» (MUSE vía operador, 11-oct-2026): (a) ESPERAR ratificado · (b) espejos DESCARTADO con evidencia · (c) NO promover — fallback kc2g verificado VIVO — y una oportunidad N=31 para el ciclo 191

Consulta de MUSE: LGDC caído (504 en raíz/catálogo/getbest; frontal giro.uml.edu 200 — backend FastChar, no red); sin canal de estado oficial; espejos UFA/SANSA/IGG CAS citados sin URLs publicadas (5 candidatos → NXDOMAIN); kc2g-fallback cubre (31 st). Opciones (a) esperar a Lowell / (b) rotación multi-origen si hay URLs / (c) promover kc2g. Pregunta: ¿ruling para (b)/(c), o espero?

**DECISIÓN: (a) — esperar. Sin código, sin ruling de rotación (no hay proveedores), sin promoción.** El app ya hace lo correcto. Verificación independiente GLM abajo (sondeos propios, 11-oct-2026 ~14:35 UTC; artefactos `scripts/consulta241/`).

## 1. Outage VERIFICADO de primera mano por GLM

Endpoints reales del app (grep del árbol post-239): `lgdc.uml.edu/common/DIDBFastStationList?orderByField=ursiCode` → **504** (16,2 s, 176 B) · `lgdc.uml.edu/fastchar/getbest` → **504** (16,0 s) · `lgdc.uml.edu/rix/gambit-coeffs` → **504** (16,0 s). Frontal `giro.uml.edu` → 200 (6107 B, 0,9 s; menú y DIDBase navegables). Patrón: proxy-frontal vivo + workers backend muertos = **caída de servicio, NO bloqueo de cliente** — nada que corregir client-side. El pacing propio mantiene la cortesía (el comportamiento degradado ya está certificado: sesiones 237/193 con fails planos 1,54/min y gating intacto). Sin canal de estado oficial: cierto — laboratorio universitario best-effort.

## 2. (b) espejos — DESCARTADO con evidencia (más allá del NXDOMAIN)

- La propia página «Rules of the Road» de LGDC (fetch GLM) enumera «Development and installation of **LGDC mirror servers**» como un **servicio que el equipo instala a petición institucional** — espejos DIDBase/DriftBase de ARCHIVO (acceso por cuenta a través de SAO Explorer/Drift Explorer), NO réplicas públicas del API real-time (fastchar/getbest/rix). No existe directorio público de espejos del API.
- El único programa público de espejo real-time («Mirrion 2», NOAA NCEI) fue **DESCONTINUADO** (comunicado NCEI jun-2024: NOAA cesa su rol de stewardship near-real-time).
- IGG CAS (Beijing) = espejo de archivo Madrigal/DIDBase (geophys.ac.cn); UFA/SANSA = operadores de estaciones (contribuyentes de datos), no servicios espejo.
- **Veredicto**: los 5 NXDOMAIN de MUSE son consistentes con el terreno — sin URLs públicas no hay rotación que implementar (precedente 116: nada especulativo). **PRE-REGISTRADO como plantilla**: a la primera URL pública (comunicación de Lowell en la recuperación, institución que publique su espejo), el ruling de rotación se emite inmediatamente — alta en la matriz de proveedores (infra 048-053 + ProviderStatus ya en el árbol) + cortesía por origen (fetch policy 106/108) + failover declarativo. La plantilla existe; falta el proveedor.

## 3. (c) kc2g — NO promover; el fallback está VIVO (verificado)

- `prop.kc2g.com/api/stations.json` → 200, **101 estaciones**, dato más reciente **5 min atrás** (14:30 UTC) — el pipeline kc2g actualiza DURANTE el outage (su fuente declarada: datos «distributed through GIRO and INGV» — la vía INGV/otras sigue viva; será su subconjonto GIRO-puro el que se rancie).
- Frescura medida: **29/101 < 1 h · 31 < 3 h · 33 < 6 h · 34 < 24 h** — el «cubre (31 st)» de MUSE casa EXACTO con el corte < 3 h.
- Promover kc2g a primario no aporta nada real: el fallback ya cubre, y una promoción silenciosa maquillaría la procedencia (el nowcast kc2g es IRI-2016 condicionado — con LGDC caído pierde ese ingrediente). La matriz de estado del app ya expone la condición por proveedor; si MUSE quiere señalar la degradación en UI, es un cambio declarativo menor vía matriz existente — decidir en nota, sin urgencia, sin código nuevo si la matriz ya lo pinta.
- Bonus verificado: **NOA/DIAS vivo** (`electron.space.noa.gr/ionostream/api/v2/idb/sao/pager` → 200, 9 s) — tercer camino ionosonda del app, independiente de Lowell.

## 4. La oportunidad del outage: punto N=31 para la tabla del ciclo 191

Con el fallback activo, el set vivo es ~31 estaciones: una sesión **pausa+scrubs a epoch fijo** (o umbral-100 solo-log, alternativa ya autorizada por 196 §6) mide `vol=` a **N=31** — computacionalmente VÁLIDO (el coste del build depende de N, no de la frescura del dato) y DISCRIMINADOR de la pendiente (196 §6: interp pura O(5184×N) → ~140 ms a N=44, vs componentes fijos → ~110 — un punto a 31 acota la recta entre 14 y 44). **NO CIERRA el ciclo** (la regla pre-registrada exige N=44 al revivir LGDC; RAMA A/B sin cambio): la tabla queda {mínimo, 14, **31\***, 44} con 31\* = punto de outage, DECLARADO en nota (set kc2g + frescura del set en el momento de la sesión).

## 5. Ledger

- **Decisión: (a) esperar a Lowell.** El app degrada correctamente (pacing cortés, fallback vivo, matriz de estado) — el evento VALIDA de nuevo el diseño bajo caída de proveedor único.
- Ciclo 191: sigue ABIERTO por N=44; P2-238 sin ETA — ahora con **causa documentada** (outage LGDC verificado 1ª mano 11-oct-2026). La espera ya estaba en la letra del 238; sin cambio de regla.
- Línea swap 193/194: CERRADA sin cambio (240). W-4: CERRADO sin cambio. Oráculos sin cambio. Próximo libre: **242**.
- Prescripciones: **P1-241** (opcional, señal del outage): sesión N=31 según §4 con set+frescura declarados — alimenta la tabla sin cerrar el ciclo. **P2-241** (solo a voluntad): badge de degradación declarativo vía matriz existente. **Reactivación-(b)**: primera URL pública de espejo → ruling de rotación inmediato (plantilla §2).
- Evidencia: sondeos propios (3× 504 LGDC + frontal 200 + kc2g 200/frescura + NOA 200) en `scripts/consulta241/` (giro_root.html, rules.html, kc2g_stations.json + 4 búsquedas s1-s4); hashes y tiempos en el log de sesión.
