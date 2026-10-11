# 243 — Ruling pedido de MUSE (vía operador, 12-oct-2026): (a) resiliencia web CONCEDIDA — render degradado honesto, espejo del sello kc2g-fallback FASE A, con correcciones de caché y timeout verificadas; (b) explode/alturas — SOLO explode: el Altitude del app mueve capas PLANAS que el web no tiene

Mensaje de MUSE: con LGDC caído, `/api/ionosondes` cuelga y la página queda en «Conectando» (`dataOk` exige las 3 APIs; `fetchJson`→null no renderiza); pide ruling para render degradado honesto (caché/fallback + badge de fuente, espejo del kc2g-fallback del app). Además: ¿añadir control de altura de capas al web, o solo explode?

**DECISIÓN: (a) CONCEDIDO con contrato §3 (drop 244) — el defecto es real, está VIVO ahora y el fix es la traducción web de un contrato ya sellado en el app (no diseño nuevo). (b) SOLO explode — §5.**

## 1. Verificación de las afirmaciones (árbol web certificado w240-web-post231; el despliegue vivo muestra el mismo patrón)

- **La compuerta**: `page.tsx:182` `dataOk = !!(sw && aurora && ionos)` — AND de las 3 APIs; el overlay `:382-398` (spinner + «Conectando con NOAA SWPC · GIRO · SDO…» + 3 chips `:393-395`) bloquea TODO el render mientras falte cualquiera. sw y aurora viven (NOAA/SWO sanas) pero quedan rehenas del gate.
- **La ruta** (`api/ionosondes/route.ts`): catálogo timeout 20 s (`:99`), getbest 12 s (`:181`,`:209`), 6 workers + 250 ms de cortesía (`:253-256`), fase extra de 60 jobs (`:260-286`) que corre SIEMPRE que el TTL venza — no mira el resultado de la ronda (`:260`). Con LGDC en 504 ~16 s (medido 1ª mano en 241): catálogo ~16 s → []; ronda 50 est / 6 workers × (12 s abort + 0,25) ≈ 110 s; extras 60/6 × 12,25 ≈ 122 s → **respuesta en ~240-250 s** con `stations: []`, catalogSize 0.
- **El síntoma exacto depende de la latencia del 504**: con 16 s medidos, el timeout cliente de 120 s (`page.tsx:123`) < 240 s del server → null garantizado en frío; retry cada 600 s (`:127`) → a los ~10 min el cache-hit vacío (truthy) levanta el overlay con **globo vacío silencioso**. Un 504 rápido daría el globo vacío a los ~45 s. Ambos caminos terminan en el mismo defecto: **estado vacío sin declarar**. El «para siempre» de MUSE es la letra del caso presente; la sustancia queda ratificada.
- **Dos bugs de honestidad además del gate**: (i) la respuesta vacía se cachea 10 min como si fuese buena (`:321-323` — incondicional si !wantFull); (ii) `source: "GIRO DIDBase (live, getbest)"` es una CONSTANTE (`:317`) — con cero estaciones el badge SourceDot muestra «live» verde pulsante (SpaceWeatherPanel.tsx:253-264 decide por substring «live»). El sistema MIENTE en degradado.
- **La escena YA tolera null**: `IonosphereScene.tsx:65` declara `ionosondes: IonosondeData | null` y sus efectos hacen guard (`:579`, `:454`). La compuerta vive SOLO en page.tsx — el render parcial es barato de verdad.
- **(b) paridad verificada**: web «Exageración alt.» 1–5 step 0,1 (`LayersPanel.tsx:89-98`) == app «Explode» 1,0–5,0 (`App.cpp:4247`, sello `:384` «vista explotada x1..x5») — EXACTO. El app además tiene «Altitude (km)» 100–800 (`App.cpp:4176`, clamp `:4177` + `:2659`).

## 2. (a) Qué se autoriza — la traducción web del contrato del app

La asimetría es el argumento central: 241 certificó que el APP degrada con honestidad (badge «GIRO-live»/«kc2g-fallback»/«model», matriz por proveedor, fallback vivo) — y el MISMO evento expone al web colgado y mintiendo. El app ya hizo este trabajo; el web hereda el contrato, no lo inventa.

**(2.1) Render parcial — muere el AND de 3.** Overlay solo para «nada cargado todavía»; al primer dato disponible el globo renderiza con lo que haya (la escena ya lo tolera). Los chips por fuente permanecen visibles en degradado, con estado por fuente — no binario ok/rojo: **live / fallback / caché / model / abajo** (espejo del triplete del app + caché).

**(2.2) Fallback kc2g — espejo del sello FASE A, FAILOVER-ONLY** (Kc2gAdapter.h:39-59, reglas selladas a reproducir): 1 GET por ciclo a prop.kc2g.com/api/stations.json SOLO cuando la ronda LGDC falla (jamás always-on; 241 ratificado — kc2g no se promueve: el nowcast kc2g con LGDC caído pierde el ingrediente GIRO y una promoción maquillaría procedencia). lon 0-360 → −180..180 EN PARSE. Time-filter por fila (kc2g trae `time` ISO por fila): grids ≤ 6 h; panel ≤ 24 h marcada stale — el web ya tiene la semántica (`STALE_AFTER_MS` 6 h, profileGrid.ts:79; `isStaleSample` :83-89 — hoy sin history considera viva: la edad honesta viene del `time` de la fila). EG931 excluida de grids (feed NOAA congelado 2024-08-22, regla explícita del app). B0/B1 ausentes → sanitize 100/3 (el web ya lo hace: sanitizeB0/B1 aguas abajo). `history: []` — kc2g no trae serie: replay en fallback degradado o deshabilitado, decisión de MUSE DECLARADA en nota. El schema está verificado en vivo (101 filas, 2026-09-09, Kc2gAdapter.h:10-37): fof2/hmf2/foe/fof1/mufd cubren TODO lo que el shell necesita (foTex + hmTex + extras) — el mapping estación-web es completo sin campos nuevos. Atribución GIRO/WWROF/eSWua en UI como el app (redistribución kc2g sancionada por GIRO); cortesía 1 GET/ciclo.

**(2.3) Caché honesto.** Prohibido cachear la respuesta vacía/degradada como buena (`:321-323` hoy lo hace). Last-good retenida y servida con edad declarada («caché de hace N min»). Precedencia explícita: live > kc2g > caché > model, declarada EN EL PAYLOAD (el `source` deja de ser constante `:317` y pasa a ser estado real) para que el badge sea data-driven. SourceDot se extiende a los 5 estados de §2.1. La nota declara los TTL de cada caché (stationCache 10 min hoy; catalogCache hoy NO expira nunca — `:95-96` — declararlo).

**(2.4) Fail-fast y aritmética de timeouts.** Con LGDC caído la ruta NO puede quemar ~4 min de fetches condenados: aborto temprano de la ronda (p.ej. catálogo caído + primera ola de 6 con cero aciertos → declarar down), extras NO corren si la ronda dio cero, respuesta en segundos. Anti-rebaño: el estado down se retiene un TTL declarado para no quemar una ola por visitante. Con el fail-fast, el timeout cliente 120 s queda holgado. Mecanismo exacto a elección de MUSE, declarado en nota.

## 3. Contrato del drop 244 (web)

- **Nota**: estados y transiciones (live/fallback/caché/model), tiempos de respuesta en frío MEDIDOS con LGDC caído (el outage presente hace esto verificable en vivo), atribución kc2g, tramos del outage ejercitados, decisión replay-en-fallback, TTLs declarados.
- **Delta + hash pineado** (P2-240 vigente: verificar sha contra artefacto antes de pushear).
- **Barrera**: suite 156→N/N its con racha intacta, tsc 0, build OK. Tests NUEVOS: parse kc2g (fixture web mínimo o el del app si porta), time-filter por fila, EG931, lon normalize, precedencia de caché, estados del badge.
- **Oráculos de geometría INTACTOS** — el fix es data-path + UI: no toca builders/shaders/escena. Grep de control: cortesía LGDC 250 ms/6 workers intacta, kc2g 1 GET/ciclo, CERO URLs nuevas (solo la del app).
- **El árbol del APP queda INTACTO** (post-239 faf03c4): nada del drop toca el C++ — la sesión única pre-registrada (242 §3) NO se afecta y viaja cuando Lowell reviva.

## 4. Prohibiciones

- kc2g JAMÁS primario ni always-on (241 ratificado). Sin estados vacíos-sin-declarar: cero estaciones sin badge es incumplimiento de contrato, no un estado aceptable. Cortesía LGDC/kc2g intactas; sin URLs nuevas. Oráculos/geometría intocables. El fondo de modelo solo con badge «model».

## 5. (b) SOLO explode — el Altitude del app no tiene portador en el web

- **Qué mueve el slider del app**: `applyAltitudes()` (App.cpp:2539-2543) desplaza DOS capas PLANAS — tecLayer (mapa GloTEC) y shellLayer (shell foF2 plana a altKm+0,025) — y el ápice HF lo sigue (M9fix `:2413-2414`, apexOffsetKm = altKm−300). Es un control de «a qué altura flota mi superficie plana de datos» — herencia de que el app pinta mapas 2D flotando a altura elegida.
- **El web no tiene esas capas**: su shell foF2 está desplazada por hmF2 REAL por texel (builders.ts:205 «desplazado por hmF2 en el shader» + updateShellTextures foTex/hmTex), sus ref shells a alturas reales E110/F1-max(150,0,8·mh)/F2-mh (refshells.ts:24-31), su volumen a altitudes reales muestreadas (volumeMarch.ts:84) y su ápice HF ya sigue al hmF2 real del punto medio (hf.ts:65, clamp 140-420). Un slider de altura no tendría NADA que mover sin geometría nueva — y crearla importaría la metáfora «capa plana flotante» que el web deliberadamente superó: su shell ES la geometría hm-real que el app esconde por defecto (peakShell, App.cpp:1699 «manda la geometría (hm real)»).
- **Paridad ya completa** en el control que sí corresponde: exageración 1-5 == explode 1-5 (§1). **Reapertura pre-registrada**: si el web algún día añade una capa plana (p.ej. mapa TEC GloTEC como el app), el control de altitud reaparece con ella — a registrar entonces, no ahora.

## 6. Ledger

- **Drop 244 de MUSE = resiliencia web** (nota + delta + hash + barrera §3). El «drop 243» que el ledger del 242 anticipaba para la sesión de medición se re-numera: la numeración es secuencial compartida, no reservable; la sesión viaja cuando Lowell reviva con el número libre que toque.
- Ciclo 191: ABIERTO sin cambio (cierre = veredicto post-N=44; sesión única 242 §3 intacta; app congelado en post-239 faf03c4; preservar cache/ kc2g_*.bin — 242 §2d). P1-240/P2-240 viajan con el drop de la sesión.
- Línea swap 193/194, W-4: CERRADOS sin cambio. Oráculos sin cambio. P2-241 (badge app) intacto — el app no se toca; este contrato es su espejo web.
- Próximo libre: **244**.
