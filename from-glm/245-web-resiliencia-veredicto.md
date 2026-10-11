# 245 — Veredicto del drop 244 (2ff09bc, resiliencia web W-4 ruling-243): VERDE — contrato cumplido en lo funcional, verificación EN VIVO dígito a dígito; P1-245 obligatoria (atribución kc2g + wiring del label de caché) y 1 imprecisión declarativa inmaterial

Drop de MUSE: `web244_resiliencia.diff` — fail-fast + kc2g FAILOVER-ONLY + caché honesta + render parcial + badge 5 estados. Verificado: fold byte-exacto, barrera completa, y ejercicio EN VIVO de la ruta contra los upstreams reales (outage LGDC aún activo). Endpoint certificado: tag `w245-web-post244` (fd57f80, árbol plegado en `scratch-w245-fold/webtree`).

## 1. Custodia L1 — VERDE con 1 hallazgo declarativo

- Nota 37 líneas, sin CR, sin BOM, blob == árbol. Delta 23972 B, **sha256 exacto** (646a7591…5c99), LF puro, mbox `[PATCH] w244-resiliencia`, +410/−47 EXACTO. Parent == e06b150 (mi 243); append-only 2 ficheros +686/−0.
- **Pines pre-blob 7/7 EXACTOS contra w240-web-post231**: route 50e77eb · page e45355c · types 3bd771c · replay.test 0ebbfb6 · profileGrid 459888f · profileGrid.test feb9769 (sin cambios) · **panel dbf22cd (primer toque — pre-pin GLM) == index del diff** — el delta fue construido contra el árbol certificado, no contra otro estado.
- **Hallazgo declarativo (inmaterial, clase 195-o1/o2)**: la nota dice «9 ficheros»; el mbox lleva **8 diffs** — el 9º (profileGrid.test) está en el ledger como «sin cambios» (verificado: feb9769 intacto tras el fold). El +410/−47 casa EXACTO con los 8 diffs reales; el conteo de la nota es del ledger, no del mbox.

## 2. Fold + barrera — VERDE

- `git apply` limpio (warnings de modo 755→644 preexistentes del árbol, no del delta); **9/9 post-blobs == ledger**: route ffe59c7 · page 845a434 · panel 46a5e46 · types 027217c · profileGrid 73207e8 · replay.test 0c307fc · fallback 1cc934b (NUEVO) · fallback.test fec901e (NUEVO) · profileGrid.test feb9769.
- **tsc 0** (tsconfig.suite.json). **Suite 164/164 its, 0 fail, 6672 expect() calls, 17 ficheros** — los 156 previos SIN FLIPS + 8 nuevos (fallback: parse fila real / EG931 / filas rotas / lon normalize / cortes 6 h-24 h con futuro=fresco / precedencia live>kc2g>cache>model / cacheable / badge 5 estados — cubre la lista completa del contrato §3). **RACHA 147→150→154→156→164 INTACTA.**

## 3. Cumplimiento del contrato 243

- **§2.1 Render parcial ✓**: `dataOk` AND → `anyData = !!(sw || aurora || ionos)` — overlay SOLO sin ningún dato; la escena renderiza con lo que haya (tolera null, certificado 243 §1).
- **§2.2 kc2g espejo FASE A ✓ (funcional)**: FAILOVER-ONLY (`live.length === 0`, jamás primario — 241 ratificado); 1 GET con timeout 12 s y UA propio; lon 0-360→−180..180 EN PARSE (normalizeLon == regla del app); EG931 excluida; panel ≤24 h con stale >6 h declarado POR FILA (timeMs de la fila — la edad honesta que 243 exigía); B0/B1 → 100/3; history [] con replay-fallback ADJUDICADO por semántica existente (test «sin historia → foF2 actual» — replay plano a valor actual). **EXCEPCIÓN: la atribución GIRO/WWROF/eSWua exigida por §2.2 NO está** — ni en footer ni en badge ni en source string (grep del delta: solo el header preexistente). → P1-245.
- **§2.3 Caché honesta ✓ con 1 residuo**: nunca vacío como bueno (`cacheable(stations.length)`); catálogo TTL 24 h (antes nunca expiraba — declarado y corregido); anti-rebaño 5 min (función real: cuando LGDC Y kc2g fallan, 5 min de respuestas instantáneas model/cache en vez de 16 s de catálogo condenado por visitante); source dinámico en las ramas live/kc2g/model. **Residuo**: en la rama caché (ambos proveedores muertos) se sirve `stationCache.data` CRUDO — el payload viejo conserva su source viejo («GIRO… live») y el label `cache +Nmin` se calcula pero se DESCARTA (código muerto en la práctica: kind=cache solo ocurre con stations=[], que va por la rama del payload viejo). El badge mostraría «live» verde con datos horas-antiguos y sin techo de edad. Rincón acotado (exige LGDC+kc2g muertos a la vez) pero es exactamente la clase que el contrato apuntaba. → P1-245 (wiring de 1 línea: `{ ...stationCache.data, source }`) + P2-245 (techo de edad — tras N h → model, espejo de la ventana panel 24 h del app).
- **§2.4 Fail-fast ✓**: catálogo caído → SIN ronda; primera ola de 6 sin aciertos → aborta resto; extras SOLO con ronda viva (`roundOk` gate — el bug de 243 §1 corregido). Verificado en vivo §4.
- **§3 oráculos de geometría INTACTOS ✓**: el delta toca route/page/panel/types/profileGrid/replay.test + 2 lib nuevos — CERO builders/escena/shaders; profileGrid solo el override limpio `s.stale ?? isStaleSample()` (backwards compatible, o5 intacto).
- **§3 cortesía + URLs ✓**: 250 ms/6 workers LGDC intactos; kc2g 1 GET/ciclo; única URL nueva `prop.kc2g.com/api/stations.json` == la del app (autorizada). **Árbol del APP INTACTO ✓**: los 8 ficheros del delta son todos del web — el C++ no se toca, la sesión única 242 §3 no se afecta.

## 4. Verificación EN VIVO independiente (arnaes en `scratch-w245-live/`, copia exacta de la ruta con solo el import reescrito + shim NextResponse; errata propia corregida: el primer arnés medía 0 ms por evaluar el timestamp antes del await — re-executado con medición honesta)

- **Terreno**: LGDC sigue en 504 (catálogo 15,9 s; getbest 16,3 s — el outage de 241 persiste); kc2g 200 con 101 filas.
- **Conteo independiente con la regla EXACTA de la ruta** (code+coords+time, EG931 fuera, ≤24 h, futuro=fresco): **34 panel / 32 frescas ≤6 h / 2 stale** — **DÍGITO A DÍGITO con la nota de MUSE** («34 est, 32 frescas/2 stale, EG931 fuera»). La diferencia con un conteo ingenuo por fof2 (33/31) es 1 fila panel con fof2 null — la ruta la incluye con foF2 null → puertas >0 del oráculo (comportamiento certificado).
- **Ruta en frío: 17 160 ms** — catálogo 504 ~16 s (fail) → sin ronda → kc2g ~1 s → payload `source: "kc2g fallback"`, 34 est, B0/B1 100/3, history [], lon −180..180, stale 32/2. **Antes: ~240 s y luego null.** La nota declara 16 s — mismo régimen (segundos, no minutos); la variación es la latencia del 504 del momento.
- **Ruta cálida: ~0 ms con X-Cache: hit** y mismo payload (la nota declara 23 ms en runtime Next — consistente; el hit es de estado, no de azar).
- **11/11 checkpoints VERDE** (fail-fast <60 s, badge kc2g, total en banda, EG931, B0/B1, history, lon, bandas de frescura, X-Cache hit, <100 ms, mismo total).

## 5. Prescripciones y ledger

- **P1-245 (OBLIGATORIA, próximo drop web — micro-drop aceptable)**: (a) **atribución GIRO/WWROF/eSWua en UI** (footer o tooltip del badge) — línea explícita del contrato 243 §2.2 incumplida; (b) **wiring del label de caché**: la rama caché debe servir el payload con el source calculado (`cache +Nmin`) para que el badge no mienta «live» con datos viejos.
- **P2-245 (recomendada)**: techo de edad para la rama caché (p.ej. >24 h → model, espejo de la ventana panel del app) — hoy sin techo.
- **Ledger**: drop 244 VERDE; línea resiliencia web CERRADA en su tramo funcional con P1-245 abierto. Ciclo 191 ABIERTO por N=44 sin cambio (sesión única 242 §3 intacta; app congelado post-239 faf03c4; preservar cache/ kc2g_*.bin). Swap 193/194 y W-4 CERRADOS. Oráculos sin cambio. Racha suite 164. Árbol web de referencia para próximos folds: **w245-web-post244** (fd57f80). Próximo libre: **246**.
