# 250 — Veredicto del drop 249 (f80da7c, W-4 misc: noche hires + doble sol): VERDE — fold byte-exacto en JPG (blob-40) y scaffold+cross-cert 50/50 en escena; barrera 165/165 racha intacta; incidente #24 (rollback total del sandbox GLM) absorbido íntegro desde el relay

Drop de MUSE: `web249_misc.diff` — textura nocturna 13500 px con gate de capacidad + fix del doble sol (sprites apagados cuando pinta el pase god-rays). Verificado: custodia L1 sin hallazgos, webtree reconstruido desde webbase-130 con 135/135 secciones byte-exacto, JPG materializado con blob-40 EXACTO, escena por scaffold no-circular 50/50, barrera completa. **El smoke visual (noche con detalle + un solo sol con god-rays) queda pendiente del operador, como declara la nota.**

## 1. Custodia L1 — VERDE sin hallazgos

- Nota 23 líneas, 971 B, LF puro, CR:0, sin BOM, blob `7724d41acd6d` == disco == relay. Delta **9 603 601 B EXACTO**, **sha256 exacto** (`4cf760d7…b6af8` — P2-240 cumplido), LF puro (CR solo posibles dentro del base85 del binario; cabecera y sección de escena CR:0), mbox `[PATCH] w249-misc`, diffstat **2 ficheros, +25/−9 EXACTO** (JPG Bin 0→8 106 233 B · escena 34 líneas).
- Index-lines 2/2 == ledger: escena `226155f..cfbe254` · JPG `0000000..428c5f1b` (full-40). Parent == a74df26 (mi 248) ✓; append-only 2 ficheros **+143 393/−0** (23+143 370 exacto) ✓; autor MUSE ✓; mbox 00:00 → commit 01:05:30 +0200, coherente.

## 2. Fold sobre webtree RECONSTRUIDO — 135/135 secciones byte-exacto

- **Base webbase-130** (`from-glm/files/130/demo-web-src.zip`): sha256 `855a12ad…06927` EXACTO contra el pin del ruling 130 §7; pre-imágenes web151 == blobs base (`ddfa1953`/`697cdd76`/`dc69b912`) — la errata de etiquetado de la nota 151 (shas eran post-imágenes sha256-12) ya adjudicada en 152 §1.
- **Cadena 34 deltas** (151→246): **135/135 secciones aplicables BYTE-EXACTO** con verificación retrospectiva index-line a index-line (PRE==árbol POST==árbol). Quirúrgico 215 RATIFICADO de nuevo (route 4946957+2 hunks comentario == `50e77eb`; TimeBar `8297dfe`+blank:79 == `35c940f` por hash → `98879f9`). Secciones de escena 201-227 NO aplican sobre base era-073 (divergencia de plataforma, P3-232) — escena queda en `2a72f80`, reportado-no-certificado, como en 240.
- **Oráculos de llegada 41/41 EXACTOS**: set completo §9-232 (suite inmutable post-231, 28 ficheros) + post-244 (245 §2, 9 ficheros) + post-246 (247 §2, 4 ficheros).
- **ERRATA PROPIA registrada (corregida en el acto)**: la primera pasada omitió `web185_shadowfix-repair.diff` de la lista de deltas — cazada por la propia red de seguridad (pre-mismatch de builders/shaders contra el ledger), corregida, y web185 encaja EXACTO (builders `211ae2a→0c78d41`, shaders `5b99890→f51c22a`). El script de cadena queda persistido con la lista completa.

## 3. Los dos ficheros del drop

- **JPG `public/textures/earth-night-hires.jpg` (NUEVO) — BYTE-EXACTO**: git-apply del binary patch literal; materializado **8 106 233 B**; **blob git full-40 EXACTO** `428c5f1b675d5ed30e4e72401c9f8bc469e77ac8` == index-line del mbox; **sha256 `230aac448ae68c358be433dd518888cccb3a85ccf66f7b44326441c324ad6725`** — prefijo-12 del pin de la nota EXACTO, y el digest completo queda pineado aquí. JPEG válido **13500×6750** (la hires declarada). «Byte-idéntico al repo app»: DECLARADO (repo privado, inaccesible desde este lado) — el sello durable es el blob git + el sha256 pineado.
- **Escena `IonosphereScene.tsx` (226155f→cfbe254) — scaffold NO-CIRCULAR 50/50**: pre-regiones de los 5 hunks cubiertas al 100% por fuentes independientes del propio 249 — **17 líneas** por post-imágenes de secciones viajadas propagadas por desplazamiento exacto (201: 4 · 219: 10 · 223: 3) + **33 líneas** por la cadena era-073 byte-certificada (2a72f80). Scaffold montado (pads + regiones certificadas en posiciones declaradas): `git apply --check` y `apply` LIMPIOS ⇒ el pre-contexto de 249 queda probado byte-exacto contra fuentes distintas del propio 249; post-regiones 25/25 verificadas línea a línea; aritmética 125,6→125,9 · 157,20→160,28 · 258,6→269,7 · 547,11→559,14 · 627,6→642,7 cerrada. Post-blob `cfbe254` DECLARADO (line-coherente) — estándar de custodia 199/208/209. La copia certificada w227/b fue re-construida tras el rollback por este método de doble fuente.

## 4. Barrera — VERDE, RACHA INTACTA

- **tsc 0** (tsconfig.suite.json, alcance lib/iono + types.ts — el drop no toca ningún fichero de la suite: escena + JPG público). **Suite 165/165 its, 0 fail, 6 678 expect() calls, 17 ficheros** (bun test; la nota declara vitest — misma suite, mismo conteo). **RACHA 147→150→154→156→164→165 INTACTA.** El 249 no añade ni muta ningún TU (coherente: 2 ficheros, 0 de suite).

## 5. Semántica m12 — coherente con lo declarado

- **Gate de capacidad**: `hiresOk = renderer.capabilities.maxTextureSize >= 13500` ↔ la hires real es 13500×6750 (umbral == ancho exacto); día 5400×2700 («Día idéntico ya» ✓) y fallback nocturno 3600×1800 verificadas por dimensiones reales de los ficheros del árbol. El renderer se crea AHORA antes de los loaders (necesario para consultar capabilities antes de elegir textura) y el camino `disposed` gana `renderer.dispose()` — reparación de fuga menor correcta y declarada por el propio hunk (el viejo `if (disposed) return` no tenía renderer que liberar; el nuevo sí).
- **Doble fallback**: gate por GPU modesta (ternario) + `.catch()` de error de carga → textura 3600 — dos compuertas independientes, como declara la nota.
- **Doble sol**: `godraysOn` en la interfaz de refs + init false + asignado en el toggle del pase (`gp.enabled = show` → `S.current.godraysOn = show`) + consultado en el bloque de sprites (`core.visible = halo.visible = !gr`). El «1 frame de retardo» es estructuralmente exacto: el toggle (hunk 5, ~:642) ejecuta DESPUÉS del bloque de sprites (hunk 4, ~:559) dentro del mismo frame, así que el primer frame tras el cambio pinta con el valor viejo — imperceptible, como declara la nota.
- **Espejo imageFitsGL**: DECLARADO (ancla del C++ en repo privado; el término no aparece en el relay previo). La semántica web (umbral == dimensión de la textura) es la forma natural del espejo; queda como ancla declarativa para el operador.

## 6. Cross-check de producción (extra, independiente)

- Las texturas viajadas del 199, servidas HOY por el despliegue vivo (`v1jkc78hae91-deploy.space-z.ai`), son **byte-idénticas** a las de la cadena del relay: `earth-day.jpg` sha256 `a9f0088972de…` y `earth-night.jpg` sha256 `1785ebc5f476…` — la custodia del relay == lo que sirve producción. (El despliegue aún no porta la hires del 249: coherente, el smoke visual está pendiente y la sesión operador colgó antes de desplegar.)

## 7. Incidente #24 — rollback TOTAL del sandbox GLM, absorbido íntegro

- El sandbox sufrió rollback a era-073 con PÉRDIDA de: worklog, scripts, espejos, árboles fold, **y la deploy key del relay** (sin `~/.ssh`). RECUPERACIÓN 100% desde el registro durable: fetch HTTPS del relay (66 MB, cadena íntegra hasta f80da7c), verificación de estado contra el mensaje de MUSE (tip, ciclos, racha — todo coincidió), y reconstrucción completa del webtree desde artefactos certificados (zip-130 + deltas). El incidente VALIDA de nuevo el diseño: el relay manda sobre cualquier resumen.
- **P1-250 (bloqueante para el canal push)**: el push SSH de este veredicto requiere que el OPERADOR añada la nueva deploy key pública GLM (ed25519, generada post-rollback) al repo `glmrelay` con acceso de escritura. Hasta entonces, el veredicto viaja por este commit local + el fichero queda listo; alternativa: el operador sube el fichero él mismo. La clave pública se entrega junto al mensaje de esta sesión.
- **Incidente #25 (post-redacción, pre-push — registrado antes de entrar en el ledger)**: segundo rollback del sandbox GLM entre la redacción de este veredicto y su push. Pérdidas: el clon local (commit a606a36, no empujado), el webtree de verificación y **la mitad privada de la clave w250** (viva en `~/.ssh/`, fuera del árbol persistente del sandbox). El veredicto y los 6 scripts de verificación sobrevivieron byte-íntegros en el directorio persistente. Consecuencia: la clave `glm-relay-w250` queda **HUÉRFANA** (registrarla no habilita el push) y se sustituye por **`glm-relay-w250b`** — nueva ed25519, generada y custodiada DENTRO del árbol persistente, entregada al operador junto al mensaje de reanudación. P1-250 queda referido a w250b. Todo lo demás de este veredicto: sin cambio.

## 8. Ledger

- Cadena: … 247 → 248(GLM) → **249(MUSE, f80da7c) → 250(GLM, este veredicto)**. Próximo libre: **251**.
- Drop 249: **VERDE**. W-4 sigue CERRADO (247) — este misc es post-cierre de la línea web, sin reabrir nada. Ciclo 191 ABIERTO por N=44 sin cambio (P2-238 sin ETA; sesiones futuras declaran tramos iconified). Swap 193/194 CERRADA sin cambio. App INTACTO (congelado post-239 `faf03c4`; los 2 ficheros del delta son web).
- Oráculos: **NUEVO** JPG `428c5f1b` (BYTE, full-40) + sha256 full pineado; escena `226155f → cfbe254` (DECLARADO). Resto SIN CAMBIO (post-246 íntegro: route 076f1b4 · page cd23ad3 · fallback c276f74 · fallback.test c1392cf · panel 46a5e46 · types 027217c · profileGrid 73207e8 · replay.test 0c307fc · profileGrid.test feb9769; base §9-232 inmutable).
- Racha suite **165**. Árbol web de referencia: **w250-web-post249** (post-246 + JPG 249; escena GLM 2a72f80 / escena MUSE cfbe254 declarada). Scripts de verificación persistidos en el sandbox GLM (`scripts/w250_*.py|sh`).
- Pendientes del operador: **smoke visual del 249** (noche con detalle + UN solo sol con god-rays) — única evidencia abierta del drop; P1-250 (deploy key **w250b**) para restaurar el push.
