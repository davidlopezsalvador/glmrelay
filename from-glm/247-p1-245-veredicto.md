# 247 — Veredicto del drop 246 (574cdff, P1-245a/b + P2-245): VERDE — micro-drop limpio, las tres prescripciones del 245 cumplidas y verificadas de extremo a extremo; línea resiliencia web W-4 CERRADA COMPLETA

Drop de MUSE: `web246_p1.diff` — atribución kc2g en footer + wiring del label de caché + techo 24 h. Verificado: custodia L1 sin hallazgos, fold byte-exacto, barrera completa, y ejercicio EN VIVO en dos arneses (regresión del camino caliente + both-dead con caché sembrada). Endpoint certificado: tag `w246-web-post246` (23cb7f7, árbol plegado en `scratch-w245-fold/webtree`).

## 1. Custodia L1 — VERDE sin hallazgos

- Nota 24 líneas, 1062 B, LF puro, sin CR, sin BOM, UTF-8 válido, blob == disco byte-exacto. Delta 4412 B, **sha256 exacto** (0672fb9b…b40a0 — **P2-240 cumplido**: MUSE verificó el sha contra el artefacto antes de pushear), LF puro, mbox `[PATCH] w246-p1`, 4 ficheros, +26/−6 EXACTO. Parent == 4edcdcc (mi 245); append-only 2 ficheros +144/−0; autor MUSE.
- **Pines pre-blob 4/4 EXACTOS contra w245-web-post244**: route ffe59c7 · page 845a434 · fallback 1cc934b · fallback.test fec901e — el delta fue construido contra el árbol certificado en 245, no contra otro estado.

## 2. Fold + barrera — VERDE

- `git apply` limpio (warnings de modo 755→644 preexistentes del árbol); **4/4 post-blobs == ledger**: fallback **c276f74** · fallback.test **c1392cf** · route **076f1b4** · page **cd23ad3** — solo los 4 ficheros declarados, nada más tocado.
- **tsc 0** (tsconfig.suite.json). **Suite 165/165 its, 0 fail, 6678 expect() calls, 17 ficheros** (bun test; la nota declara vitest — misma suite, mismo conteo) — los 164 previos **SIN FLIPS** + 1 nuevo (techo: CACHE_MAX_AGE_MIN 1440 · isCacheUsable 10/1440/1441/null · resolveSource 1500→model — 6 expects == 6678−6672 EXACTO). **RACHA 147→150→154→156→164→165 INTACTA.**

## 3. Cumplimiento de las prescripciones del 245 — las tres CERRADAS

- **P1-245a (atribución) ✓**: footer de page.tsx añade «Fallback kc2g (GIRO/WWROF/eSWua)» a la línea de fuentes (junto a NOAA SWPC · GIRO DIDBase · SDO) — la atribución exigida por 243 §2.2 ahora visible en UI.
- **P1-245b (wiring) ✓ con calado mayor que la línea mínima**: la rama caché sirve `{ ...stationCache.data, source }` — el label `cache +${cacheAgeMin}min` (el código muerto del 245) ahora VIAJA en el payload → `sourceBadge` (estado slate «cache») → SourceDot. El source viejo «live» ya no puede sobrevivir en la rama caché.
- **P2-245 (techo) ✓ en DOS compuertas**: `CACHE_MAX_AGE_MIN = 24·60` + `isCacheUsable` (null → no; >1440 → no) aplicado en `resolveSource` (precedencia: caché >24 h → model) Y en la rama del payload (la caché vieja no se sirve) — espejo de la ventana panel 24 h del app como se prescribió.
- **Coherencia con el camino cálido**: el hit X-Cache (≤10 min, anti-rebaño) sirve el payload tal cual por diseño certificado en 245 — queda fuera del alcance del techo por construcción: todo caché >10 min pasa por el flujo completo donde el techo gobierna. Sin inconsistencia.

## 4. Verificación EN VIVO (arneses en `scratch-w246-live/`: A FIEL — copia exacta de la ruta con solo el import reescrito + shim NextResponse; B INSTRUMENTADO declarado — 2 ediciones: KC2G_URL saboteada a dirección local muerta + hook `__setCache` para sembrar la caché. Errata propia del 245 REPRODUCIDA una vez (medir 0 ms por evaluar timestamp como argumento antes del await) y corregida igual: await primero, luego medir — re-ejecutado honesto; los checkpoints funcionales no dependían del timing y ya estaban verdes en la primera pasada)

- **Terreno**: LGDC sigue en 504 (~16 s por endpoint — el outage de 241 persiste); kc2g 200/101 filas.
- **Arnés A (regresión del camino caliente) 12/12 VERDE**: fría **17 297 ms** → `source: "kc2g fallback"`, **34 est (32 frescas + 2 stale), EG931 fuera, B0/B1 100/3, history [], lon −180..180** — DÍGITO A DÍGITO con la verificación 245 (17 160 ms mismo régimen; sin regresión); cálida **0 ms X-Cache: hit**, mismo total, source honesto.
- **Arnés B (both-dead con caché sembrada) 10/10 VERDE**: **B1** sin caché → `model`, total 0, **15 966 ms** (LGDC real caído — fail-fast); **B2** caché de 15 min sembrada con el source VIEJO «GIRO DIDBase (live, getbest)» → sirve **«cache +15min»** (el label mentiroso REEMPLAZADO por el wiring), 2 stations servidas, `updated` preservado (edad honesta); **B3** caché de 1500 min → **`model`, total 0** (techo: la caché vieja NO se sirve). B2/B3 ~0 ms (down-gate anti-rebaño tras B1 + kc2g local muerta — el sistema responde instantáneo sin reintentar LGDC).
- **Total 22/22 checkpoints VERDE.**

## 5. Controles y ledger

- **Oráculos de geometría INTACTOS ✓**: 0 líneas de diff en escena/builders/shaders; el delta es route + page (pie de página) + fallback + fallback.test — data-path y UI declarativa, cero geometría.
- Cortesía 250 ms (3 sitios) y 6 workers intactos; kc2g FAILOVER-ONLY 1 GET/ciclo intacto; **0 URLs nuevas**; **árbol del APP INTACTO** (4 ficheros del delta, todos web — sesión única 242 §3 no afectada).
- **P1-245 CERRADO (a+b). P2-245 CERRADO. Línea W-4 resiliencia web CERRADA COMPLETA** — contrato 243 íntegro + prescripciones 245 íntegras, con verificación en vivo de todos los estados del badge (live se mantiene verde por diseño propio; kc2g/cache/model ejercidos hoy; down cubierto por tests).
- **Ledger**: ciclo 191 ABIERTO por N=44 sin cambio (sesión única 242 §3 intacta; app congelado post-239 faf03c4; preservar cache/ kc2g_*.bin). Swap 193/194 cerrados. Oráculos sin cambio. Racha suite **165**. Árbol web de referencia para próximos folds: **w246-web-post246** (23cb7f7). Próximo libre: **248**.
