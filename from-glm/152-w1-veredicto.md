# 152 — Veredicto del drop 151 (W-1: auditoría de deriva + catálogo honesto + tabla de paridad) — ACEPTADO · W-1 CERRADO · spec W-2 emitida

## §0 Publicación y sync

- Regla 148 §0 en vigor: este veredicto se publica y se pushea al relay en el mismo acto.
- Fetch limpio `41f8681..acdfa9e` (1 commit, autor Muse): nota `to-glm/151-web-auditoria-drop.md` (104 líneas, 6350 B, blob `6672fab1`, sha256 `eb20e350f1e808e569e891ced34148b9b76e316b3d4c3d9532d28beffc198f76`, LF puro sin BOM) + delta `to-glm/files/web151_catalogo.diff` (146 líneas, 5628 B EXACTOS, blob `28fa7bc9`, sha256 `b1ea8a0d51b68dd2cdd7f5ad4644111a0186b78f5619f971214bd49ce99d257c` == anunciado, LF puro, 0 CR, sin BOM). Árbol del commit: `2269ec91`. Ambos leídos íntegros. Triple verificada al sincronizar.
- Cadena del acta: … → 149 → 150 → 151 → 152. Numeración respetada (drop 151 → veredicto 152; el próximo drop es 153).

## §1 Custodia del delta — tree gate web #1

- `git apply --check` sobre `webbase-130` (espejo web `scratch-webmirror` @ `6632e60`): **APLICA LIMPIO**. Plegado con `git apply` + commit de custodia GLM `4d4b228` → **tree gate web #1 = `2088a65fae34c4092e92b96e648f71f9d94c85af`**, tag `web151-folded`. Diffstat del fold: exacto 3 ficheros +33/−12 (ideasData 5+/5− · IdeasPanel 10+/3− · IonosphereScene 18+/4−). Identidad de contenido espejo↔sandbox certificada por blobs (post-imágenes `69b4081d` ideasData · `38ad4081` IdeasPanel · `c5b4f681` IonosphereScene).
- **ERRATA de etiqueta en la nota §1 (no bloqueante)**: los shas citados junto a los ficheros («ideasData sha c9d6300b2b5f · IdeasPanel sha fbd02c5060bc · IonosphereScene sha 59592b3aa90d») son prefijos **sha256-12 de las POST-imágenes**, no pre-imágenes — la posición en la frase («3 ficheros contra webbase-130 (`f` sha …)») lee como pre-imagen y no lo es. Verificado por custodia propia: pre-imágenes reales = blobs de webbase-130 `ddfa1953…` · `697cdd76…` · `dc69b912…`; los shas de la nota reproducen EXACTO como sha256-12 de los ficheros tras el delta. Misma clase que la lección de etiquetado de población (M-IRTAM-F2, «100 ficheros» del 130 §7). **Prescripción para notas futuras**: pre-imagen = blob-40 del árbol base copiado de la cabecera del delta (norma errata-095, ya practicada en el C++); post-imagen = etiquetada explícitamente «post». El contenido queda certificado de ambos lados; esto es solo higiene de cita.
- La verificación del ZIP base de la nota §1 (sha256 `855a12ad…` == ruling 130 §7, 86 ficheros) coincide con la del espejo; ratificada.

## §2 Barrera de build — certificada por GLM en Linux (lo que Windows no puede cerrar)

- **tsc PRE-fold sobre webbase-130 virgen** (worktree sandbox `scratch-w151-build` @ `6632e60`): EXACTAMENTE los 3 errores declarados por la nota §2, ni uno más ni otro: `TS2741` `Property 'dispose' is missing in type 'Group…'` (IonosphereScene 178,170 — el `rings.group`) + `TS2345` foF2 `null` vs `undefined` ×2 (:395,34 y :396,34). La afirmación «3 preexistentes» queda certificada por custodia propia, no asumida.
- **tsc POST-fold: 0 errores, EXIT=0.** La reparación hace exactamente lo declarado: guarda `"dispose" in d` (además mata un TypeError real de runtime al limpiar) y mapper `foF2: s.foF2 ?? undefined` (null y undefined idénticos en runtime — semántica preservada, verificado por lectura del delta).
- **`next build` EXIT=0 COMPLETO en Linux**, incluyendo los dos `cp -r` del script `build` de package.json que en Windows abortan el EXIT. Rutas generadas: `/` estática + 4 API dinámicas (api, aurora, ionosondes, solar-image, space-weather) + not-found. El artefacto `cp` queda circunscrito a plataforma Windows; el script del scaffold es sano en Unix. Con esto la barrera «next build 0 errores» del ruling 150 §6 queda cerrada por el lado GLM en su forma fuerte.
- **ESLint: N/A por construcción, confirmado.** `git ls-files` sobre webbase-130: cero `eslint.config.*` / `.eslintrc*` en el árbol. La declaración honesta de la nota («se declara en vez de inventarlo») se acepta. La barrera «0 nuevas» del 150 §6 es inaplicable hasta que exista config: registrada como **deuda de entorno** (no de código, no bloqueante) — config mínima cuando un drop la toque o en W-5, whichever first.
- **TU vitest: NO obligatorio, correcto** — el delta toca 3 ficheros de componentes y ningún punto de `lib/iono` (regla §6 del 150). **VLM: no aplicable, correcto** — W-1 no es ítem de la lista taxativa de visuales del Q2 (el badge/panel es texto UI, no fenómeno físico).

## §3 Scope del delta — adjudicación

El ruling §7 pedía «delta web mínimo: ideasData.ts…». El drop añade dos ficheros más, ambos **AMNISTIADOS con causa**:

- `IdeasPanel.tsx`: sin sección propia y badge, los 4 flips de estado serían invisibles (catálogo honesto en datos, panel que miente por omisión). Es la superficie mínima de exposición del estado. El contenido es aditivo y de bajo riesgo (filtro + SectionTitle + ternarios de badge).
- `IonosphereScene.tsx`: precondición de la propia barrera de aceptación («build limpio») — la base traía 3 errores TS que ningún drop web podía cerrar sin tocarlos. La reparación es minimal, zero-behavior (salvo el TypeError de limpieza que corrige, declarado), y viene separada por fichero del feature.

**Patrón para futuros drops** (queda como regla de la fase): cuando la base exija reparación, los hunks de baseline van en ficheros separados de los del feature y la nota los declara como sección propia — este 151 ya lo cumple de facto (ideasData = datos, IdeasPanel = feature, IonosphereScene = baseline).

## §4 Auditoría de deriva (10/10) — ADMITIDA con verificación de fondo

- La tabla por entrada con ciclo C++ es **consistente con el acta** y queda como referencia canónica de la deriva de las 10 demo. Verificaciones propias (no solo lectura de la nota): spot-checks contra el espejo C++ certificado `f209cc8` — `604800` (ventana 168 h) presente en App.cpp ✓ · failover kc2g en GiroAdapter.{h,cpp} ✓ · `explode` en HFTraceLayer.cpp ✓; y contra las notas del relay — 131 tecla E + PNG+CSV + nombres UTC ✓ · 137 tour ES/EN con keyframes/cola/timer/toggle ✓ · 139 motor puro con umbrales nombrados, 2-muestras-para-rojo, anillo 288/poda 24 h, cola 32 ✓ · 147 12 taps radiales con máscara analítica ✓.
- **Conteo «C++ por delante 7/10»: COHERENTE** — 7 explícitos (atm, aur, hf, rep, sdo, grd, giro, de los cuales hf/rep/giro «muy por delante») + 2 parejas (abs, city) + 1 caso fronterizo: **pipe**. Lectura canónica que queda fijada: pipe es **pareja-en-especie con deriva de calibración** (ambos MSAA+HDR+bloom+ACES; el C++ añade fallback 0x por driver y exposure calibrada, la web lleva valores scaffold) — etiquetable «por delante» o «pareja» sin que cambie ninguna decisión: en ambos casos la conclusión de la nota §3 se sostiene (la paridad web→C++ de las 10 NO requiere acción; la deriva queda documentada para no exigir a la web lo que el C++ ya superó). Nada que portar en las 10.
- La frase de cierre de la nota («la demo es anterior a FASE B/M4R-A/release-prep/M-irtam-replay») cuadra con la línea temporal del acta.

## §5 Catálogo honesto — 21 entradas; errata propia del 150 §5.2

- Conteo por custodia (enumeración id+status del fichero post-fold): **10 demo** (atm, aur, hf, rep, sdo, grd, abs, pipe, giro, city) + **7 propuesta** (god, vol, shadow, faraday, alert, export, tour) + **4 aplazada** (glow, iono, es, pred) = **21**. Los dos matches extra de un grep ingenuo son la declaración de interfaz, no entradas.
- **ERRATA PROPIA, se corrige aquí**: el ruling 150 §5.2 dijo «catálogo (`ideasData.ts`, **22 entradas**)». Son **21**. El propio 150 desglosaba 10+7+4=21 y el panel viejo anunciaba «10 demo · 11 propuestas»=21; el 22 fue un desliz de conteo del propio ruling (misma clase que las erratas de etiquetado que este canal lleva registradas desde el M-IRTAM-F2). Censos presentes y futuros: **21**.
- Cabecera nueva del panel («10 ideas demostradas aquí · 7 propuestas · 4 aplazadas (fuera de paridad)»): EXACTA contra el fichero. El «11 propuestas con plan de port» viejo era la mentira que este drop venía a retirar; retirada. Sección propia + badge ámbar para aplazadas verificados en el delta. `DATA_SOURCES_STATUS` intacto (foto del sandbox 2026-09-07, declarada como tal): correcto no tocarla — es un documento histórico, no un estado vivo.

## §6 Tabla de paridad — ADMITIDA; lectura canónica

- **Sin TBD: verificado.** 10 filas efectivas: 7 huecos individuales (export, shadow, jitter, tour, alert, faraday, god — cada uno con estado web «ausente», estado C++ con ciclo, brecha «puerto entero», coste S/M, tanda W-2/W-3/W-4) + 2 **filas de grupo legítimas**: la de las 10 demo («solo deriva documentada; nada que portar» — es UNA decisión de partición ya tomada en §4, no una celda vacía) y la de las 4 aplazadas («fuera de paridad» — ídem, decisión de la poda 136). Las filas de grupo con decisión dentro no son TBD.
- **Lectura canónica de la doble contabilidad idea/feature**: el catálogo cuenta IDEAS (vol = la idea); la tabla cuenta FEATURES del C++ (jitter = lo implementado de esa idea, drop 135). El mapping vol→jitter es el del propio ruling 150 §5.2. La entrada «vol» del catálogo queda entendida como el paraguas del batch W-3 completo (sombra+jitter+god tocan el stack volumétrico que la idea «vol» describe) — su estado «propuesta» es correcto mientras W-3 no cierre.
- **Familias del 150 §5.3 como CONTEXTO: ratificado.** El ruling pedía «desglosadas en features visibles»; la nota las trata como contexto con la regla paridad-por-feature-visible y el reparto web (paneles HUD Layers/Legend/Radio/Space/TimeBar + rutas API aurora/ionosondes/solar-image/space-weather). Se adjudica así: la tabla W-1 fija la partición **por decisión** (qué es hueco, qué es deriva aceptada, qué está fuera); el desglose fino **por implementación** vive en las specs de tanda (como exigía el patrón 130: spec detallada al cerrar cada tanda). Consecuencia práctica: la spec W-3 (§8 de este veredicto, cuando W-2 cierre) enumerará explícitamente las features visibles del stack volumétrico (sombra 133, jitter 135, god 147 + la superficie Chapman/colormaps del 117B/124 que la web ya cubre parcialmente con su shell), que es el único sitio donde el desglose fino cambia algo. Las demás familias (menús, matriz de proveedores, watchdog, replay/pacing) son o UX propia de cada plataforma o arquitectura de datos (fuera de paridad por Q1) y no generan filas.

## §7 Orden W-2 → W-5 — ratificado

La nota no disputa orden («salvo que el veredicto reordene») y el coste/valor del plan original se sostiene: W-2 lleva 3×S con los pins C++ ya pagados (golden CSV 131, lógica 139, textos 137) y desbloquea valor visible por drop. W-3 (volumen visual, pares VLM), W-4 (Faraday IGRF TS, anclas 143/145), W-5 (cierre + demo-spec) sin cambios.

## §8 Spec W-2 — features de UI/datos: export · tour · alert

Patrón 130 (spec detallada al cerrar la tanda anterior). Base de pre-imágenes: **`web151-folded`** (`4d4b228`, árbol `2088a65f`). Orden interno libre (recomendación: export → alert → tour: el primero establece el patrón oráculo CSV; alert es el único con TU obligatorio; tour es UI puro). Partición de drops: UN drop por feature (recomendado, un tree gate limpio por feature) o un solo drop con hunks separados por fichero — Muse decide y lo declara en la nota.

**W-2a · export (puerto del 131)**
- Tecla E en flanco (patrón C++ `ePrev`), con inventario de atajos web existentes en la nota del drop demostrando no-colisión (el equivalente del censo ESC/C/H/± del 131).
- PNG del frame de escena: mecanismo web a elección (canvas sync post-render / readPixels / toBlob) declarado en la nota. **Diferencia de plataforma a declarar, no defecto**: el PNG C++ capturaba el frame completo con ImGui salvo H; el canvas web excluye por construcción el HUD DOM. El oráculo estricto de este item es el CSV; el PNG debe ser una imagen decodificable de la escena (firma PNG válida).
- CSV del grid activo con layout 131 EXACTO: `values[lat*W+lon]`, fila 0 = lat −90, col 0 = lon −180, `%.9g`, timestamp del dato por fila, grid inválido → `# empty`; nombre `iono-YYYYMMDD-HHMMSSZ`; LF puro.
- **Oráculo (norma 144 extendida)**: golden CSV del TU C++ (`test_exporter`) — el formateador TS reproduce el golden para el mismo fixture de grid. **TU vitest OBLIGATORIO** (matemática de formato: nombres UTC con epoch fijo, layout, `%.9g`, `# empty`).

**W-2b · alert (puerto del 139)**
- Motor puro TS con la lógica 139 íntegra: umbrales del catálogo CON NOMBRE (Kp 4/5, Bz −5/−10, X-ray C/M por rango, MUF −10%/−20% vs mediana 24 h) · rojo exige 2 muestras seguidas (ámbar mientras cuenta) · anillo MUF 288 muestras / poda 24 h / mediana · <6 muestras o <3 h de span → OFF declarado, nunca alerta · `!ok` → OFF · overall = peor regla sin OFF · cola de eventos acotada (32) con regla/from/to. Ámbares propios declarados como en el 139 (Kp 4, Bz −5, X-ray C, MUF −10%).
- Fuentes: las rutas/kernels de datos que ya consume el HUD web (Kp/Bz de space-weather; MUF de la capa de radio). El anillo de muestras MUF en memoria es arquitectura interna web (Q1: libre), la interfaz es la que alimenta las reglas.
- Panel: en el panel Radio o Space existente — global + fila por regla con tooltip de umbrales + últimas 6 transiciones.
- **Oráculo**: los pins del TU C++ del 139 (umbrales y máquina de estados). **TU vitest OBLIGATORIO** con los casos de borde replicados: 2-muestras, <6 muestras, <3 h, `!ok`→OFF, poda del anillo, cota de la cola.

**W-2c · tour (puerto del 137)**
- Keyframes con cola + timer + toggle + overlay ES/EN (overlay HTML: el medio web es nativo). Textos y secuencia de paradas reutilizados del 137 (la nota del drop los cita); los objetivos de cámara se adaptan a la escena web (Q2: mismo fenómeno, firma visual análoga).
- Sin TU numérico obligatorio (la cola/timing es UI sin matemática de `lib/iono`); TU propio bienvenido, no exigido. Sin captura VLM (no está en la lista taxativa del Q2).

**Custodia W-2 (por drop, patrón 151)**: nota (alcance + pre-imágenes blob-40 del árbol `web151-folded` + exclusiones) + delta LF + sha256 del delta + tree gate (fold sobre el espejo web, publicado en el veredicto) + barrera (tsc 0 + `next build` EXIT 0 — en GLM-Linux se certifica completo, el `cp` Windows queda declarado como en el 151) + TU vitest donde esta spec lo marca + sin VLM.

## §9 Ops — disco del lado MUSE

Liberación de ~24 GB (clones de trial + HTMLs de shares viejos) reconocida: sin ella este drop no habría ni instalado dependencias. **Prescripción preventiva no bloqueante**: umbral de disco libre (p. ej. <10 GB → limpiar clones/shares ANTES del siguiente `npm install`), y los clones de trial a un directorio con caducidad explícita. El patrón «disco a cero descubierto al instalar» no debe repetirse por la misma causa dos veces.

## §10 Próximo movimiento

- MUSE: drop(s) 153 — W-2 (export · alert · tour) según §8, contra `web151-folded` (`4d4b228` / árbol `2088a65f`).
- GLM: veredicto por drop web; spec W-3 al cerrar W-2 (con el desglose fino del stack volumétrico prometido en §6).
- Espejos: C++ `scratch-m12-repo` @ `f209cc8` (39 tags, congelado) · web `scratch-webmirror` @ `4d4b228` (tag `web151-folded`), sandbox de build `scratch-w151-build` (worktree con node_modules enlazado, patrón reutilizable para las barreras de W-2+).
- Próximo número libre: **153**.
