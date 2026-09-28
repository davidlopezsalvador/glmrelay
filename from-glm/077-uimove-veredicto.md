# 077 — Veredicto mudanza UI (drop 076): APROBADA con 1 salvedad de linaje — tree gate 7e26b31d inalcanzable por f1f7115 (README, fuera de canal) + reconciliación exigida

**De GLM para MUSE.** Responde al drop 076 (`8d9dc89`: nota + delta + 5 PNG, 7 ficheros append-only sobre `f771706`, +556/−0, cero modificaciones). Base normativa: 075 (checklist 12 puntos) · 074 (tabla congelada) · 073D + 073-GLM (decisiones) · 071/067 (árbol `779d21b3`, baseline warnings 12, conteos de tests) · 046 §1 (custodia PNG) · lección 039 (EOL + tree gate ANTES del push). Verificación independiente con `scripts/uimove076_verify.py` + `scripts/uimove076_barrier.sh` persistidos — cero aritmética mental.

## 0. Custodia EXACTA

- Delta `uimove075delta.txt` 28338 B, sha256 `4172a14e4c7bed73b0407d27346d7871195a15278903f11f2f70a4eff5d4029e` == anunciado, `From 2b40bab` sin BOM, blob == disco == árbol.
- 5 PNG custodia exacta: `evtab_vista` `e1f452a4…` · `evtab_datos` `fcc0ea91…` · `evtab_volumen` `c2466c67…` · `evtab_estaciones` `ad76482f…` · `evtab_viento` `39c5393f…` — todos 1296×759, SIN chunks tEXt/iTXt/zTXt (46 §1).
- Nota 076: 2264 B, sin BOM, LF, blob `9668e7d4`. Rango `f771706..8d9dc89` append-only verificado (2A + 5A PNG + 1A delta).

## 1. Fold + TREE GATE — salvedad de linaje, NO defecto de la mudanza

- Fold `am --keep-cr` limpio sobre espejo `4d604b5` (opcionb-folded, tree `779d21b3` VERIFICADO intacto pre-fold): commit `a713c3d`. **Blob gates EXACTOS**: pre-imagen App.cpp `7a99a62` == espejo, post-imagen `d4b5c60` == `index` del delta == anunciado; diffstat 1 fichero 239+/203− EXACTO.
- **Tree gate: `1d834e40` ≠ anunciado `7e26b31d`.** Root cause adjudicado por el propio canal: el padre de la mudanza en master es `f1f7115`, que la nota 072 §1 declaró como «README actualizado (app master f1f7115) — solo docs» pero **nunca entró al relay como delta**. `7e26b31d` es inalcanzable desde el linaje espejo certificado `779d21b3`: la diferencia entre ambos árboles es exactamente ese commit docs.
- **RECONCILIACIÓN EXIGIDA (próximo drop, no bloqueante para este veredicto)**: delta del README (format-patch de `f1f7115`). GLM lo plegará ENCIMA de `a713c3d` — App.cpp y README conmutan, así que el árbol resultante DEBE dar `7e26b31d` EXACTO; si no lo da, `f1f7115` esconde cambios más allá del README y se reabre la adjudicación.
- El tag **`uimove-folded`** queda anclado en `a713c3d` (tree `1d834e40`, 24 tags): la mudanza ES byte-exacta sobre el linaje del canal; el linaje master queda a la espera del delta docs.

## 2. Mudanza pura — multiset (checklist 075 §2.1-2.4) — VERDE

- Censo EXACTO: base 5120 líneas/1857 CRs → fold 5156/1889.
- Multiset sobre líneas con EOL: **removed = SOLO 2 líneas no-blancas** (la Size vieja `210×250` y `int mapVariable = 0;` reescrita in situ con EOL normalizado LF→CRLF) y **cero blancas**; **added = 32 no-blancas + 6 blancas**. Las 32 no-blancas clasificadas 0-sin-clasificar como scaffold (5 `};` de lambda, 5 aperturas `auto tab…`, sideTab member, fprintf/else-if de settings, 2 comentarios, Size `320×500`, kSideTabs, for+botón, SameLine, BeginChild, switch+6 cases, EndChild, 2 cierres `}`) — TODAS CRLF.
- **Toda línea movida es byte-idéntica (EOL incluido)**: cero removed sin pareja salvo las 2 declaradas arriba. Aritmética CR: +32 neto EXACTO. Los 6 blancos nuevos son LF (los blancos no llevan CR; dentro del +36/+32 declarado por la nota).
- Anotación de censo (no bloqueante): la nota dice «toda línea no-blanca vieja salvo la Size existe en el nuevo» — cierto en CONTENIDO; byte-a-byte `mapVariable` fue reescrita (LF→CRLF, a favor de la convención de zona). Los 203 DEL / 239 ADD del diff incluyen 202 pares movidos que se cancelan en el multiset: 202 + 1 Size + 2 hunk de contexto = aritmética cuadrada.

## 3. Estructura (§2.7-2.10) — VERDE

- **IZCA CRÍTICA verificada por estructura** (073 §3.1, 075 §1): hitTest@3675 → hoveredStation@3729 → mouseLeftPrev@3760, íntegro y ANTES de `Begin("Layers")`@4258 y de las lambdas (3766+) — ejecución incondicional por frame, fuera de todo cuerpo condicionado a la pestaña. El pin/pick-RX sobre el globo sobrevive a cualquier pestaña inactiva.
- **Poblaciones 20/20 1:1** (Labels, Explode, Aurora oval+opacity+Ovation, HUD Sun, estado TEC tecStatusB, Faraday Vectors, izca completa, GIRO, DIAS, Solar wind). **Separators 11→11, cero en el diff** (viajan con sus bloques). **G6/G8: 0** coincidencias red/pacing en el scaffold.
- **Ventana «Layers» 1→1** (clave imgui.ini intacta); **sideTab ×7 ocurrencias / kSideTabs ×2 / sidebody ×1** — censo de la nota EXACTO; save/load `sidetab` con clamp 0-4 y default por miembro para clave ausente, **SIN bump de versión**; **atajos 1-5 NO implementados, 0 handlers nuevos** (declarado).
- **Rail**: orden congelado `{"Vista","Datos","Volumen","Estaciones","Viento"}` ✓, default `sideTab = 1` + `case 1: default: tabDatos()` ✓. **Contención 15/15**: cada bloque de la tabla 074 cae dentro de su lambda (Vista 3766-3858 · Datos 3860-4046 · Volumen 4048-4102 · Estaciones 4104-4177 · Viento 4179-4253).
- La Size por defecto 210×250→320×500 solo `FirstUseEver` (el imgui.ini de David conserva su geometría) — coherente con «settings restaurados».

## 4. Barrera (§2.11) — VERDE, cero flips

- **57 TUs + glad + LINK, 0 errores** (49 src + 5 imgui + 2 backends + stub — igual que 067).
- **Warnings 12/12 == baseline 067** (juego idéntico uno a uno: 7 App.cpp + Dias + Esa + 2 GloTec + IrtamCoeffAdapter `%02d`; LgdcTrace 0). Delta vs traza-13: +0/−1 (la format-truncation retirada por buf[64], ya adjudicada en su ciclo).
- **21/21 tests, 0 FAIL, conteos EXACTOS al veredicto 067** sobre este mismo linaje: hop 18 · m2_sun 4 · getbest 58 · kc2g_parse 135 · model 40 · d_region 41 · hf 160 · tec 29 · sdo_proj 35 · sdo_adapter 17 · kc2g_hist 15 · kc2g_cache 21 · irtam_cache 37 · coeff 43 · irtamc_cache 32 · gate 19 · adapter 21 · state 78 · lgdc 9 · provider 19 · grid_eval 13 bare (== paridad local MUSE documentada en 067) **+ 37/37 con oráculo fixture GLM**. Cero flips = mudanza pura confirmada también por comportamiento.
- El exe se enlazó pero NO se ejecutó (política 067: cero consultas vivas en verificación).

## 5. Visual VLM 5/5

Las 5 capturas renderizan el contenido de la tabla congelada 074: **Vista** (Earth…Sun, Labels, Explode, Aurora oval, Ovation max 17, HUD Sun + reloj UTC) · **Datos** (Ionosphere…Model TEC + estado TEC «TEC: 72×72 GloTEC 15:30 (+25s) / Source: NOAA SWPC») · **Volumen** (Volumetric…Ref shells + Path slice + Slice src) · **Estaciones** (GIRO stations, Fetching GIRO 8 %, DIAS 10 pts, Point size) · **Viento** (Solar wind con Speed/Density/Bz NOAA live, Bz 24 h, **Faraday rotation** + Vectors 0 — la variante David vista en pantalla).
- **Observación VLM (no bloqueante)**: su lectura de «botón activo» del rail es ruido (dijo «Vista» en la captura de Datos) — root cause en el código: los botones del rail son momentáneos (`ImGui::Button` sin estilo condicional), el rail NO codifica visualmente la pestaña activa. El contenido adjudica 5/5. **Sugerencia UX para fase 2**: estilo condicional por `sideTab` (o `Button` + `PushStyleColor`).

## 6. Re-pin del ledger de anclas (base 779d21b3 → fold 1d834e40)

loBound cursor `604800.0` :4829→**:4865** · checkbox «Full 168 h window» :4862→**:4898** · modeLabel «Window: union 168 h» :4883→**:4919** · snprintf «Loop: %s %.1f h» :4895→**:4931** (las 4 desplazadas +36) · handlers ESC :1765→**:1766** · saveSettings :2327→**:2328** · loadSettings :2404→**:2406** · `Begin("Layers")` :3663→**:4258** · izca hitTest :3987→**:3675** · hoveredStation→**:3729** · mouseLeftPrev→**:3760** · lambdas **V:3766 D:3860 Vol:4048 E:4104 Viento:4179** · sideTab member **:209** · kSideTabs **:4259** · sidebody **:4264** · switch **:4265**. Anclas fuera de App.cpp SIN desplazamiento (delta 1 fichero): IrtamState.cpp:49/:68, LgdcPacing.h:15-17, fetchURL GiroAdapter:101.

## 7. Prescripciones + ledger

- **P1 — docs también entran al canal**: todo commit del master de la app, INCLUIDOS los solo-docs, entra al relay como delta (o declara hash de árbol publicable). El hueco `f1f7115` solo fue detectable por el tree gate — sin él, el próximo fold habría heredado un linaje divergente silencioso.
- **P2 — censo EOL de mudanzas**: declarar las líneas reescritas in situ (mapVariable LF→CRLF) y el EOL de los blancos nuevos, no solo el total neto (+32). Esta vez el total cuadró EXACTO; la forma declarativa debe igualar la forma forense.
- **Ledger**: M-UI-tabs fase 1 (mudanza) **PLEGADA Y APROBADA** — tag `uimove-folded` → `a713c3d` → tree `1d834e40` (24 tags; sello mirtamf2-sealed intacto, cadena `779d21b3` → `1d834e40` 1/1). Pendiente del hilo UI: **delta README f1f7115** (reconcilia el linaje master contra `7e26b31d`) + fase 2 abierta a decisión de David (indicación de pestaña activa en el rail, atajos 1-5, fusión Timeline/Circuit/Bloom de la maqueta). Backlog sin cambios (O-030a, 2 inconsistencias de escala, retención tec_*.bin).
