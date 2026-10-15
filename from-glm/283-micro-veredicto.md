# Veredicto 283 — micro-drop 282 de MUSE: P1-280 reloj client-only + P1-281 ventana Dst 45 d + erratas (a6c0f6c)

**VERDE** — drop 282 ACEPTADO. Micro-drop limpio (precedente 263): 3 ficheros 29+/12− que cierra las DOS salvedades del 280. **P1-280 CERRADO** (React #418 eliminado de raíz) · **P1-281 CERRADO** (diagrama de fase AE/Dst VIVO) · erratas 281(3) y 281(4) SALDADAS. F2a #18 queda COMPLETO.

## 0. Caja negra de la ronda (obligación de honestidad)

FALSO VERDE CAZADO EN LA PROPIA RONDA: la primera batería de smoke dio "4/4 cargas limpias (0 errores, 0 consola)" que resultó VACUA — el rebuild del 282 había regenerado `.next/standalone` SIN la copia manual de `.next/static` (todos los chunks devolvían 404 -> sin JS -> sin hidratación -> sin error #418 POSIBLE, y reloj congelado en `--:--:--`). Detectado porque el check DOM exigía reloj vivo + círculos del diagrama (daba `--:--:--` y 0): un smoke "limpio" sin hidratación real NO ES EVIDENCIA. Corregido (recopia static + reinicio), re-testeado 5/5 con JS cargado de verdad. LECCIÓN DE CASA NUEVA: tras cada rebuild, recopiar `.next/static` -> `standalone/.next/static` ANTES de cualquier smoke, y todo smoke "0 errores" debe acompañarse de una prueba de VIDA (reloj avanzando / dots presentes) para no ser vacuo. Nota adicional: el proceso del servidor standalone se RENOMBRA a `next-server (v16.4.0)` en ps — `pkill -f server.js` no lo caza; matar por ese nombre.

## 1. L1 — custodia y delta (TODO CONFORME)

- Relay: tip a6c0f6c == drop 282 de MUSE, parent b93ec406 == mi veredicto 281, cadena ee44bfa -> 281 -> 282 limpia. Append-only +163/-0 (nota 35 líneas + web282_micro.diff 128 líneas).
- Delta: 6709 B sha256 cdaeb494…59aaf4 EXACTO, LF puro sin BOM, mbox [PATCH] w282-micro, 3 ficheros 29+/12− EXACTO, index-lines 3/3 == nota, PROHIBIDOS 261 cero, sin ficheros nuevos ni tests tocados (nota: "sin cambios de tests" — delta sin menciones).
- Pre-tree 3/3 EXACTOS al certificado w280-web (api/dst 73e8072 · page e21cd74 · AePanel 889e71b). Apply patch -p1 dry-run limpio + EXIT 0 + post-blobs 3/3 (api/dst fe1c1cb · page da5321a · AePanel 5318be3).
- FIX P1-280 verificado en el delta: `useState<Date | null>(null)` + `mounted` + `setNow(new Date())` SOLO en useEffect, `nowMs = now ? now.getTime() : 0` determinista pre-mount, `effSec` y `cmeEpoch` derivan de nowMs (el `Date.now()` del cuerpo de render ELIMINADO), header `mounted && now ? … : "--:--:--"`. Escaneo estático del page.tsx aplicado: los únicos `Date.now()`/`new Date()` restantes están DENTRO de useEffect (línea 112, alertas — client-only) o derivan de effSec/nowMs (subsolar línea 302-303); CERO null-derefs sobre `now` (la línea 520 `now.getTime()` es el PARÁMETRO de la función módulo `subsolar(now: Date)`, shadowing, no el estado).
- FIX P1-281 verificado en el delta: `pm`/`ptag` mes anterior con enero->dic año−1 correcto, fetch NUEVO `dst_realtime/YYYYMM/dst${ptag}.for.request` (patrón YA pineado como referencia (a) del dst.ts), `pts.push` del previo + sort, `cut = now - 45d` para la serie, `cut7`/`win7` para now/min7d/live (7 d intactos), serie decimada i%3 como CONTEXTO intacto.
- Erratas: #18 "polling 5 min; TTL de ruta 15 min" (la vieja "== TTL" eliminada) · pie AePanel "below, in the Dst panel" (el viejo "arrives with #18 — declared" eliminado). Ambas por conteo, no por display.

## 2. Barrera (declaración de MUSE 100% reproducida)

tsc full-tree EXIT 0 · vitest 259/259 (26 ficheros, suite idéntica — racha 259) · next build EXIT 0 (4 estáticas + 11 API = 10 previas + /api/dst, igual que 280). Entorno: node_modules BARRIDO de nuevo por el rollback (0 bins) — restaurado bun install 870 + prisma generate antes de la barrera.

## 3. Oráculo independiente (puerto Python propio + fuentes vivas, scripts/w282_oracle.py)

- KYOTO MES ANTERIOR VIVO (la URL NUEVA): `dst_realtime/202609/dst2609.for.request` -> 200, 30 filas DST2609* completas (1-30 sep) + presentmonth dst2610 -> 200 con 31 filas. La nota lo declaraba "verificado vivo dst2609 200" — reproducido.
- REPRODUCCIÓN COMPLETA de la aritmética de la ruta desde los DOS ficheros crudos (parse WDC réplica exacta con enumerate — jamás la secuencia 5b68, lección 280): count repro 1056 == payload 1056 (44 d × 24 h exactos, 1-sep -> 14-oct) · now repro −2 == payload −2 · min7d repro −95 == payload −95 · serie decimada 352/352 PUNTO A PUNTO (t y dst) contra el payload vivo de :3002. La serie ARRANCA EN SEPTIEMBRE (2026-09-01, cobertura 44.6 d) — el fix anti-disjunto funciona de origen.
- CONTROL NEGATIVO: sin el mes anterior la serie arrancaría el 1-oct con 336 pts (comportamiento 280 exacto) — la diferencia 336 -> 1056 SOLO puede venir del fetch nuevo.
- INTERSECCIÓN del diagrama (lógica EXACTA DstPanel L30-38 sobre los payloads vivos): AE = 27-sep completo (serie 5-min, 288 pts, latestDate 2026-09-27, ageDays 18) x serie Dst 45 d decimada -> **dots = 8** (en 280: 0 SIEMPRE). Matemática del matching: 24 horas AE que sobreviven la decimación 1/3 de la serie Dst = 8; el slice(-60) del render sobra. Dst de los dots en [−26, 0] nT, AE(x) en [14, 467] nT.
- GST SIN CAMBIOS: 2 tormentas Kp7 (10-10) + Kp5.67 (10-04) == certificado 280.
- INTEGRIDAD dst.ts: hash-object == bddc0e9 == certificado 280 (intacto por el micro-drop) + standing check del patrón parseInt correcto (bytes 5b68 presentes exactamente 1 vez, typo 0).
- P1-280 OFFLINE: prerender del build certificado con EXACTAMENTE 1 `--:--:--` y CERO horas `HH:MM:SS UTC` congeladas (en 280 el prerender llevaba la hora del build horneada); subsolar del prerender = función pura de epoch 0 (−23° W 179°, sol de 1970-01-01 — determinista en ambos lados); cero `new Date` en el HTML.

## 4. Smoke (:3002, node .next/standalone/server.js del build certificado, static recopiado)

- **P1-280 SALDADO EN NAVEGADOR**: 5/5 cargas con JS real -> 0 page errors, 0 mensajes de consola (en 280: 4/4 cargas con React #418 text mismatch). El error de hidratación está ELIMINADO, no enmascarado: la causa de fondo (hora congelada en prerender) desapareció del HTML servido.
- **Reloj VIVO y haciendo tic-tac**: lecturas DOM 14:06:58 -> 14:07:44 -> 14:07:48 -> 14:13:00 UTC (el setInterval avanza cada segundo); `--:--:--` solo como placeholder prerender.
- **P1-281 SALDADO EN UI**: el SVG del diagrama de fase renderiza con EXACTAMENTE 8 círculos (210×84 px, etiquetas AE→ / Dst↓) — coincide 8==8 con el oráculo.
- Paneles vivos: ELECTROJETS AE now 25 nT · quiet · 24h max 704 nT · data 2026-09-27 (18d old — Kyoto publishes with up to 3-week delay) — P1-279 sigue saldado · DST RING Dst now −2 nT · quiet · 7d min −95 nT · DONKI storms Kp5.67 + Kp7 · aviso Kyoto "unverified raw data" · pie AePanel "Substorm AE/Dst correlation below, in the Dst panel" · monitor GLM VIVO (G19/G18 "live · 40s ago" — P1-276 persiste) · WSPRnet down honesto ("feed caído o sin red — jamás spots falsos", estado externo transitorio, no defecto del drop).
- 3 capturas válidas download/smoke282/ (01-wide 1920×1080 · 02-wide-1280 · 03-dst-panel con el diagrama en pantalla; verificadas no-blank por desviación de píxeles). El navegador se colgó dos veces por WebGL software a 1080p (CDP timeouts) — las capturas del header se sustituyen por lecturas DOM del reloj.

## 5. Adjudicaciones

1. **P1-280 CERRADO** — prescripción del 281 §5.1 cumplida AL PIE DE LA LETRA (estado nulo + set en useEffect + derivadas deterministas). Verificado en delta + prerender + navegador (5/5 limpias + tic-tac). Causa de fondo eliminada, no el síntoma.
2. **P1-281 CERRADO** — prescripción del 281 §5.2 cumplida con la OPCIÓN A (ventana anclada al rango del AE trayendo el mes anterior, patrón pineado). Ventana 45 d > lag máximo declarado del AE digital (~3 semanas) con margen; now/min7d preservados sobre 7 d como exigía el núcleo del panel. Diagrama vivo: 8 dots verificados por oráculo + DOM.
3. Erratas 281 §5.3 (polling #18) y §5.4 (pie AePanel) SALDADAS ambas.
4. Observación nueva MENOR (sin número P1, no bloquea): el JSDoc del header de AePanel conserva un "Substorm correlation view with #18 arrives with #18 (declared, O17)" desactualizado — remanente de la MISMA familia que la errata saldada pero en comentario no visible, pre-existente de #17 (no registrado en 281, no tocado por 282). Saldable 1 línea opcional junto a material futuro.
5. WSPRnet "down" durante el smoke — feed externo caído, panel honesto, estado transitorio externo; sin acción (clase ya documentada).

## 6. Notas de libro

- 6.6 Falso-verde del smoke estático (ver §0) — protocolo actualizado: static SIEMPRE recopiado tras rebuild + prueba de vida obligatoria en todo smoke "limpio".
- 6.7 Proceso standalone renombrado `next-server (v16.4.0)` — pkill por nombre real.
- 6.8 Los 8 dots no son capricho: 24 h de AE (serie 5-min, horas todas cubiertas) x serie Dst decimada 1/3 (una de cada 3 horas) = 8 coincidencias exactas. Si el lag del AE creciera hasta cubrir más días del rango Dst, los dots crecen proporcionalmente (288 h -> hasta 96).
- 6.9 El rango de la ventana 45 d lo cubren presente+anterior (1-sep -> 15-oct); si el lag del AE digital superara ~44 d el inicio de la ventana quedaría sin datos — margen actual 18 d, límite declarado del Kyoto ~3 semanas: suficiente POR DISEÑO.

## 7. Ledger

282 VERDE sin salvedades de verificación · racha 259 · **P1-280 CERRADO** · **P1-281 CERRADO** · **F2a #18 COMPLETO** (núcleo 280: anillo ecuatorial vivo con radio/color del Dst real + panel EN valores/banda/GST/toggle/aviso Kyoto; 282: diagrama de fase AE/Dst vivo + hidratación limpia) · P1-279 CERRADO persiste · P1-276 sigue CERRADO (GLM vivo) · app C++ 85f4ba4 congelada hasta la 191 (ciclo 191 ABIERTO N=44, P2-238 sin ETA) · árbol w282-web = w280-web + micro (3 post-blobs) desplegable SIN salvedades — queda solo la observación opcional del JSDoc · referencias pineadas intactas (mes anterior dst_realtime/YYYYMM/dstYYMM ya estaba pineado como (a)) · próximo libre 284 · MUSE sigue desde 284 (F2 siguiente paso o lo que decida el operador).

## 8. Erratas propias de esta ronda (registradas)

(a) El falso-verde del smoke por standalone sin static (§0) — cazado por el propio protocolo de la ronda, corregido y re-testeado; el resultado final 5/5 es con hidratación real. (b) Check del oráculo demasiado amplio: `"arrives with #18" not in AePanel` falló por el JSDoc pre-existente de #17 (distinto de la errata registrada del pie) — precisado al string registrado. (c) node_modules y paramiko barridos de nuevo por el rollback (bun install 870 + prisma generate + pip paramiko 5.0.0) y relay local con refs perdidas (re-clon HTTPS). (d) Selector CSS con corchetes (`p.text-\[11px\]`) mangleado en eval del browser — sustituido por finders por contenido; una captura sospechosa (90 KB, sesión colgada) descartada y repetida.

Scripts persistidos: w282_l1.py · w282_barrier.sh · w282_oracle.py (w283_push.py para el push de este veredicto). Evidencia: download/smoke282/01..03 · verify282/282-nota.md + web282_micro.diff.
