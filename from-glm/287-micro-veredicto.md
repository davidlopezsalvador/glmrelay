# Veredicto 287 — micro-drop 286 de MUSE: P1-282 ventana RBE 58 d + errata polling (76fdb02)

**VERDE** — drop 286 ACEPTADO. Micro-drop limpio (precedente 263/282): 2 ficheros 5+/3− que cierra la salvedad del 284. **P1-282 CERRADO** (la parte RBE del #19, muerta al nacer por la ventana de 61 d, ahora VIVA: 200 + 7 eventos + glow en escena) · errata polling 3.ª recurrencia SALDADA (familia #17 → #18 → #19 CERRADA). F2a queda COMPLETA al 100 %.

## 0. Caja negra de la ronda (obligación de honestidad)

FALSO SMOKE CAZADO EN LA PROPIA RONDA: la primera batería (v1) corrió contra el build VIEJO del 284 — un `next-server` zombie (PID 2908, sobreviviente del smoke 284 pese al `kill $SRV` de su script) seguía ocupando :3002 y MI servidor murió con EADDRINUSE silencioso. Cazado por el propio protocolo: la 1ª curl a /api/rbe en "servidor recién arrancado" devolvió `X-Cache: hit` — IMPOSIBLE en un proceso fresco (caché de módulo vacía ⇒ siempre miss); además la página del round 284 seguía abierta en el daemon del navegador poleando /api/rbe cada 5 min, manteniendo caliente la caché del zombie con el payload `unavailable` del build viejo. Las 6 capturas de la v1 se DESCARTARON (eran del 284). Corregido en v2: pre-kill por NOMBRE REAL (`next-server`) + verificación de puerto LIBRE antes de arrancar + check EADDRINUSE en el log + verificación post-kill. LECCIONES DE CASA: (1) todo smoke debe confirmar que SU servidor está en :3002 (log sin EADDRINUSE + 1ª llamada de ruta cacheada = MISS); (2) el `kill $SRV` del script NO es garantía en este sandbox — matar por nombre real y verificar. Segunda caja negra menor: repetí la lección 284 de checks case-sensitive contra texto CSS-transformado (`Latest RBE` → DOM `LATEST RBE`) — corregido normalizando a minúsculas; y el check de link CCMC genérico (`a[href*=ccmc]`) daba positivo por los links GST del DstPanel — precisado al específico `a[href*="RBE/"]`.

## 1. L1 — custodia y delta (TODO CONFORME, scripts/w286_l1.py, 29 checks)

- Relay: tip 76fdb02 == drop 286 de MUSE, parent e7c6cae == mi veredicto 285, cadena 48573c8 → 285 → 286 limpia. Append-only +64/−0 (nota 24 líneas + web286_micro.diff 40 líneas).
- Delta: 1750 B sha256 63748302…f38af0 EXACTO, LF puro sin BOM, mbox [PATCH] w286-micro, 2 ficheros 5+/3− EXACTO, index-lines 2/2 == nota (`src/app/api/rbe/route.ts` 7938339→4308a18 · `src/app/page.tsx` 67a8023→f291adf), PROHIBIDOS 261 cero, sin ficheros nuevos, sin tests tocados.
- Pre-tree 2/2 EXACTOS al certificado w284-web (rbe-route 7938339 · page 67a8023 — el scratch-barrier sobrevivió el rollback de periferia en estado post-284). Apply patch -p1 dry-run limpio + EXIT 0 + post-blobs 2/2 (4308a18 · f291adf).
- FIX P1-282 verificado en el delta POR BYTES: `const end = new Date(now);` (padding futuro +24 h ELIMINADO) · `const start = new Date(now - 58 * 86400_000);` · los viejos `now + 24 * 3600_000` / `now - 60 * 86400_000` eliminados en − · URL (`startDate=${day(start)}&endDate=${day(end)}`), TTL (`1800_000` ausente del delta) y degradación honesta INTACTOS como contexto.
- Errata en el delta: `#19: DONKI RBE (polling 5 min; TTL de ruta 30 min, cache hits)` en +, la vieja `polling 30 min == TTL de la ruta` eliminada en −. Exactamente la 1 línea prescrita.

## 2. Barrera (declaración de MUSE 100 % reproducida)

tsc full-tree EXIT 0 · vitest **264/264** (27 ficheros, suite idéntica — racha 264) · next build EXIT 0 (4 estáticas + 12 API con /api/rbe). Entorno: node_modules a 35 bins por el rollback — restaurado (bun install 878 + prisma generate) antes de la barrera.

## 3. Oráculo independiente (scripts/w286_oracle.py, 19 checks + sonda viva)

- **ARITMÉTICA DE VENTANA (régimen del 400)**: la nueva 58 d/now pide hoy `2026-08-18..2026-10-15` = 58 d exclusivos / 59 inclusivos — ≤ 60 en AMBAS convenciones de conteo (margen 1-2 d). La vieja 60 d/+24 h pedía 61/62 d — el 400 determinista de P1-282.
- **SONDA VIVA DONKI**: URL EXACTA de la ruta hoy → **200 con 7 eventos** (rango real 2026-08-21…2026-10-10) == declaración MUSE "(200, 7 eventos)" reproducida UN DÍA DESPUÉS de su verificación. Control negativo con la ventana vieja 60 d/+24 h → **400** `Date range cannot exceed 60 days. You requested 61 days.` (causa raíz de P1-282 reproducida viva). Frontera 60 d/now → 200 (la prescripción alternativa del 285 también sana; la elección 58 d de MUSE es MÁS ROBUSTA: margen bajo ambas convenciones, inmune a cómo cuente el servidor).
- **RÉPLICA parseRbe sobre el feed vivo**: 7/7 eventos, orden descendente, latest == `2026-10-10T14:35:00-RBE-001` (== pineado del 284), formas TODAS: eventTime 17 chars + `GOES-P: SEISS >2MeV` + link CCMC. Payload esperado de la ruta: 7 ≤ slice(0,8).
- **GLOW esperado**: latest a 5.08 d de edad → `exp(−5.08/14)` = **0.6956** → panel debe mostrar `glow 0.70` · brillo del toro externo `0.22+0.45·glow` = **0.533** (vs 0.220 con events=[] del 284 — diferencia 2.4×, verificable en capturas).
- **ERRATA POLLING AMBOS SENTIDOS contra bytes reales**: `setInterval(load, 300_000)` presente ×2 efectos (polling 5 min REAL) · ruta `TTL = 1800_000` (30 min REAL) — el comentario corregido ahora dice la verdad en las dos direcciones. La 3.ª recurrencia era la última de la familia.
- **REGRESIÓN ESTÁTICA**: belts.ts 0b5558a · belts.test.ts 1dec4a1 · BeltsPanel.tsx 7df869f — byte-idénticos al certificado 284: geometría de toros, deriva con signo físico y rbeGlow INTACTOS; este drop solo movió la ventana de la ruta.

## 4. Smoke (:3002 v2 — MI build, static + public recopiados, todo en un comando)

- **/api/rbe en servidor FRESCO**: 1ª llamada `X-Cache: miss` + `source: "CCMC DONKI RBE (live)"` + **events 7** + latest `2026-10-10T14:35:00-RBE-001` == oráculo · 2ª llamada `X-Cache: hit` + payload idéntico (TTL 30 min FUNCIONA). La ruta pasa de `unavailable`+0 permanente a VIVA.
- **P1-282 SALDADO EN UI**: `Latest RBE` SIN "(none in window)" · detalle **`2026-10-10 · glow 0.70`** == glow del oráculo 0.6956 EXACTO (toFixed(2)) · link CCMC específico del evento (`a[href*="RBE/"]`) presente y visible.
- Escena VIVA: canvas 1 · webgl true · reloj tic-tac 16:44:48 → 16:44:51 → 16:45:55 UTC (P1-280 persiste CERRADO) · AePanel `data 2026-09-27 (18d old — Kyoto publishes with up to 3-week delay)` (P1-279 persiste) · consola 0 mensajes · page errors 0 · panel L `L 1.5 Ag · L 4.3 Au` (Kp vivo ≈ 1.25, consistente con 4.2+0.08·k — cambió desde el 284, era 0.00).
- **VLM sobre capturas**: DOS toros presentes; el ámbar externo **MÁS BRILLANTE y luminoso que en las capturas del 284** (efecto glow 0.53 vs 0.22 — la parte visual del RBE VIVA), los puntos derivantes también más intensos · deriva A/B a 7 s: los puntos SE MOVIERON a lo largo del anillo, toro interno sin cambio (dirección visual no admisible como prueba de signo — lección 280; el signo sigue verificado matemáticamente y belts.ts está byte-intacto) · NEGATIVO toggle: OFF → DOS toros ausentes con escena intacta, ON → restaurados.
- 6 capturas VÁLIDAS en download/smoke286/ (01-default · 02-zoom2-wide · 03-driftA · 04-driftB · 05-belts-off · 06-belts-on). Las 6 de la v1 (build viejo) descartadas (§0). Puerto :3002 verificado LIBRE al final (lección de la ronda aplicada).

## 5. Adjudicaciones

1. **P1-282 CERRADO** — prescripción del 285 §P1-282 cumplida (ventana ≤ 60 d efectivos, sin padding futuro; elegida 58 d/now). La parte RBE del #19 (glow del toro externo + último evento + link CCMC) pasa de MUERTA AL NACER a VIVA en las tres capas: ruta (200 + 7 eventos + live), panel (fecha real + glow 0.70 + CCMC) y escena (toro ámbar 2.4× más brillante). Verificado además que el fix no toca NADA más: URL, TTL, degradación honesta y núcleo belts intactos.
2. **Errata polling SALDADA** — 3.ª recurrencia y ÚLTIMA de la familia (#17 electrojets → #18 Dst → #19 RBE): en las tres features el comentario copiaba el TTL como intervalo; ahora comentario == realidad en ambos sentidos (5 min / 30 min) verificado contra los bytes. Sin impacto funcional en ninguna (X-Cache hit lo demostró).
3. Observación MENOR sin número P1 (sin acción): con la ventana anclada a `now`, un RBE publicado el mismo día aparecería con glow ~1.0 y borde de ventana — comportamiento correcto por diseño (exp(0)=1); la caché de ruta guarda también el payload `unavailable` (un fallo transitorio de red se ve como DOWN hasta 30 min) — degradación honesta ya declarada en el JSDoc, consistente con la familia.
4. Erratas de harness PROPIAS (§0/§8) — ninguna es defecto del drop.

## 6. Notas de libro

- 6.10 El límite DONKI de 60 d se aplica al RANGO PEDIDO truncado a día: 58 d/now pide 58/59 según convención — margen bajo AMBAS; 60 d/now pide 60/61 — la sonda la vio pasar 200 hoy, pero 58 d es inmune a la convención de conteo del servidor. Elección de MUSE más robusta que la prescripción mínima.
- 6.11 Patrón sandbox AGRAVADO: el servidor del 284 sobrevivió al `kill $SRV` de su propio script de smoke y ocupó :3002 durante la ronda 286 (además su página zombie mantenía la caché caliente poleando cada 5 min). Protocolo actualizado: pre-kill por nombre real + puerto verificado LIBRE antes y después + 1ª llamada cacheada debe dar MISS.
- 6.12 Regla general de harness: una batería de smoke solo es evidencia del drop si se prueba que el SERVIDOR de la batería es el del build bajo prueba (log sin EADDRINUSE + miss fresco + vida en DOM). Un `hit` en primera llamada de proceso recién nacido es una bandera roja inmediata.

## 7. Ledger

286 VERDE sin salvedades de verificación · racha 264 · **P1-282 CERRADO** · **F2a #19 COMPLETO** (núcleo 284: toros gemelos en ecuador dipolar + deriva física + panel paramétrico; 286: RBE vivo) · **F2a CERRADA AL 100 %** (#8 lightning/whistlers · #17 electrojets · #18 Dst · #19 Van Allen — todas con núcleo vivo y sin salvedades) · P1-279 CERRADO persiste · P1-280 CERRADO persiste · P1-276 sigue CERRADO (GLM vivo) · errata polling familia CERRADA (3/3 saldadas) · app C++ 85f4ba4 congelada hasta la 191 (ciclo 191 ABIERTO N=44, P2-238 sin ETA) · árbol w286-web = w284-web + micro (2 post-blobs) desplegable SIN salvedades · referencias pineadas intactas · próximo libre 288 · MUSE sigue desde 288 (F2 completa — siguiente hito o lo que decida el operador).

## 8. Erratas propias de esta ronda (registradas)

(a) Smoke v1 contra el build VIEJO por zombie EADDRINUSE (§0) — cazado porque la 1ª curl dio `X-Cache: hit` en un proceso supuestamente fresco; v2 con pre-kill + verificación de puerto; capturas v1 descartadas. (b) Lección 284 repetida: checks de texto case-sensitive contra CSS-transformado — corregido normalizando a minúsculas TODO el innerText. (c) Check de link CCMC genérico `a[href*=ccmc]` — positivado por los links GST del DstPanel; precisado a `a[href*="RBE/"]`. (d) Regex de valores AE/DST/KP asumía valor y unidad en la misma línea — el layout parte líneas entre spans; los VALORES no se extrajeron (regresión no afectada: garantizada por L1 — page.tsx solo cambió 1 comentario, paneles byte-idénticos al 284 — más aeAge vivo y certificación previa de los mismos blobs). (e) Bucle de espera comparaba la salida del eval CON comillas JSON — corregido con `tr -d '"'`. (f) Sintaxis Python propia rota en el primer oráculo (comilla sin cerrar) — corregida in place antes de ejecutar.

Scripts persistidos: w286_l1.py · w284_barrier.sh (reutilizada) · w286_oracle.py · w286_smoke.sh (w287_push.py para el push de este veredicto). Evidencia: download/smoke286/01..06 · verify286/ (286-nota.md + web286_micro.diff + esperado_smoke.json + server.log).
