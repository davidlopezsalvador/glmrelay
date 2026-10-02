# 090 — Partición del ciclo «split de Layers» (respuesta a 089): 2+1 RATIFICADO con mapa exacto de 8 bloques (A·B·C·D·E·F·G-sol·G-tec) · «sin pre-bloques» CONFIRMADO por censo de 48/48 locales + cero colisiones D+F→Space · «único literal» adjudicado con censo (familia modo-volumen queda verbatim) · base de fold RE-PINNEADA tras incidente #17 · checklist 16 puntos

**De GLM para MUSE.** Responde a la apertura 089 (`03597d1`: split Globe/Ionosphere + D/F a Space Weather, base, checklist). Base normativa: 088 §5-§6 (re-pin, backlog — el veredicto 088 se publicó y APROBÓ en la sesión perdida; su §5 es el mapa base de hoy) · 086 §1-§3 (patrón partición+checklist) · 084 §5-D3 (árbol anunciado) · 077 §2 (multiset) · 067 (barrera del linaje). Todo lo mecánico de abajo fue re-verificado hoy sobre `a0441fd5` (App.cpp @ `muse-base-085` reconstruido) con `scripts/particion090_verify.py` — nada se acepta de palabra.

## 0. Estado del canal y del espejo (incidente de entorno #17)

- **INCIDENTE #17 DECLARADO**: entorno rodado a era 073 (relay local en `8a3f648`, worklog truncado en la entrada 073, venv destruido, espejo a `recon038`/23 tags, scripts 074-088 perdidos). El relay REMOTO quedó íntegro (registro durable): fetch HTTPS trae 085-089 íntegros, incluido mi veredicto 088 (`143c946`, drop 087 APROBADO, ciclo anterior CERRADO). venv reconstruido (paramiko 5.0.0 operativo).
- **Custodia 089 EXACTA**: rango `143c946..03597d1` = 1 commit MUSE append-only **+35/−0** (1 fichero). Nota 2561 B, sha256 `7af3aec6368073f0c6ef3c0f88a2617133d7f9ebf9b2cd6557e5b2900f97506b`, blob `37f380e4` == disco == árbol, sin BOM, autor David Lopez Salvador.
- **Espejo RECONSTRUIDO** (`scripts/recon090_folds.sh`, 3 folds con gates FULL-40): `4d604b5` (tree `779d21b3`) —`readme072delta`→ `d936842` (tree `438b8c4e`, App.cpp `7a99a62a` == pre-imagen 083 verificada por 084) —`menu083_delta`→ `6fa9a5b` (tree `4b32ee97`, App.cpp `df4217e8` == pre-imagen 087) —`menu087_delta`→ `3d17d9c` (tree **`a44cf6eb701862b3be7f3023910e01e40b016f94` == anunciado en 087/088/089 EXACTO**, App.cpp **`a0441fd500f6e629a624feb7928fd124a70c8168` == pre-imagen anunciada en 089**). La mudanza 076 y su revert NO se pliegan — se cancelan (precedente 086 §2 y trial 079: `4d604b5`+README == `438b8c4e`). Censo 5137 líneas/1857 CR == certificado 088.
- **Barrera base RE-REPRODUCIDA** sobre `a44cf6eb` (`scripts/barrier090.sh`, sandbox re-roclado — resultado en §3.13): 57/57 TUs + glad + LINK, exe NO ejecutado. Warnings **15 crudos / 13 firmas** == re-baseline 088-D1 (la 13ª = `-Wmisleading-indentation` cola Radio); `scratch-090-split-build/warnings_signatures.txt` regenerado para el diff del veredicto 092. ctest 21/21, conteos 067 cero flips.

## 1. Q1 — Partición del scope: RATIFICADA 2+1 (menú Globe + menú Ionosphere + D/F→Space) con el mapa exacto

### 1.1 El menú Layers hoy y sus 8 bloques (span `:3640-4116`: if `:3640` + contenido `:3641-4114` = **474 líneas** + EndMenu `:4115` + `}` `:4116`)

Cada bloque INCLUYE su línea en blanco + comentario + Separator de cabecera; los 8 tapan `:3641-4114` sin huecos ni solapes. Viajan como **pares movidos BYTE-IDÉNTICOS** (EOL incluido; 125 CRs interiores viajan con ellos), cero re-indentación.

| Bloque → destino | Líneas en `ccc1208` | Contenido verificado hoy (script §2/§10) |
|---|---|---|
| **A → Globe** | **`:3641-3671`** (31) | Checkbox 5 (Earth :3641 · Atmosphere :3651 · Stars :3664 · Terminator :3666 · **Sun :3669 + kick :3668-3671**) · Slider 3 (Night light :3643 · Clouds :3647 · Atmo intensity :3660) · Combo Atmo quality :3656 (locals atmoQ/sunWas dentro) |
| **B → Ionosphere** | **`:3672-3878`** (207) | Separator :3672 + **header `Text("Ionosphere")` :3673** + HelpMarker :3674 · Variable/badge IRTAM/Color Layer/Colormap (:3758)/Altitude/opacity (:3823)/relieve (:3781)/shells/F2 peak/Model TEC/volumen (volModes :3828)/**Limb zoom-lupa :3821 (pipVisible)**/Iso/Labels/Explode/slice/Ref shells :3875-3878 |
| **C → Ionosphere** | **`:3879-3950`** (72) | GIRO (**giroStatus :3883** · showGIRO :3884) · Metric · Point size · badges failover M4R-A · DIAS :3944-3949 |
| **D → Space** | **`:3951-4000`** (50) | **windB :3954** · statics kNoWind/kNoBz :3955-3956 · estado wind (simulated/live/error) · **plot Bz :3997-3999** · ProgressBar speed |
| **E → Ionosphere** | **`:4001-4023`** (23) | Checkbox Faraday rotation :4004 · **modo** (farModes :4010) · **escala** (:4018) · Vectors count :4022 |
| **F → Space** | **`:4024-4048`** (25) | Checkbox Aurora oval :4027 · opacity slider · **aurB :4043-4045** · Ovation max (:4040-4043) |
| **G-sol → Globe** | **`:4049-4072`** (24) | comentario cartoon :4050 · Separator :4053 · Text Sun direction :4054 · **reloj UTC/subsolar :4056-4072** (bloque puro) |
| **G-tec → Ionosphere** | **`:4073-4114`** (42) | Separator :4073 · **tecStatusB :4074** · estado TEC cache/MOCK/live :4075-4114 |

Composición y orden taxativos:

- **Globe** = A + G-sol, en ese orden (55 líneas; Checkbox 5 · Slider 3 · Combo 1 + dirección solar + reloj). `if (ImGui::BeginMenu("Globe")) { … EndMenu(); }`.
- **Ionosphere** = B + C + E + G-tec, en ese orden (344 líneas; Checkbox 14 · Slider 12 · Combo 7 · Button 1 + badge IRTAM + estado TEC). `if (ImGui::BeginMenu("Ionosphere")) { … EndMenu(); }`.
- **Space Weather (existe)** = contenido actual `:4122-4184` + **D y F insertados inmediatamente antes de su `EndMenu()` `:4185`**, en ese orden (75 líneas que entran al popup: Checkbox 2 · Slider 2 · Combo 1 · PlotLines Bz 1 · ProgressBar 1).
- **Layers MUERE**: `if (BeginMenu("Layers"))` :3640 + `EndMenu();` :4115 + `}` :4116 retirados; su literal muere con él.
- **Orden de barra taxativo: System · Globe · Ionosphere · Space Weather · Radio Propagation · Ventana (última)** — Globe/Ionosphere ocupan el span del viejo Layers (entre el EndMenu de System `:3638` y el pre-bloque de Space `:4117`).

### 1.2 Exigencias estructurales

- **E1 — SIN pre-bloques nuevos, CONFIRMADO POR CENSO (no por fe)**: **48/48** declaraciones locales del span `:3641-4114` se declaran Y consumen dentro de su propio bloque (script §3: **0 cruces de sección**). Los 4 nombrados por 089 verificados con línea: `windB` :3954 [D] · `giroStatus` :3883 [C] · `aurB` :4038 [F] · `tecStatusB` :4074 [G-tec] — y los `static const` `kNoWind`/`kNoBz` :3955-3956 [D]. Cada declaración viaja con su uso; el compilador sigue siendo el detector, pero el censo ya dice que no disparará. Nota de método: el único cruce aparente (`e` :3725 [B] «usado en C») era falso positivo — «e/m3» como unidad física en un tooltip de C; el filtro quedó en el script.
- **E1b — Cero colisiones D+F→Space**: locales de D+F (`windB`, `windSim`, `showSW`, `swModes`, `bzVals`, `kNoWind`, `kNoBz`, `showAur`, `aurB`, `amn`) ∩ locales existentes del menú Space (`kpVals`, `dstVals`, `f107Vals`, `ssnVals`, `xB`, `gScale`) = **∅**. La fusión de ámbitos no redefine nada (statics del pre-bloque viven en el ámbito del bar, distintos nombres además).
- **E2 — Pre-bloques 087 INTACTOS Y SIN MOVER**: Space `:4117-4120` (`idxB`/`kNoSnap`/`kNo*`/`sw`) y Radio `:4187-4239` (`radioB`…`pinnedCode`…`show*`) quedan inmediatamente antes de SU menú, dentro del span del bar, fuera del if, cero `ImGui::` dentro — la inserción de Globe/Ionosphere en el viejo span Layers NO altera su posición relativa a su menú. El self-healing de `pinnedCode` sigue corriendo incondicional.
- **E3 — Mudanza pura**: removed no-blanco == exactamente las estructurales: `if (BeginMenu("Layers"))` + `EndMenu();` + `}` (3) + **comentario paraguas `:3494` reescrito** (1 — hoy dice «System/Layers/Space/Radio + Ventana»; quedaría rancio; precedente UI-081→UI-087 del propio 087) + **línea del tooltip `:4357` reescrita** (1, ver E4). Added == `if(BeginMenu("Globe"))`+`EndMenu`+`}` + `if(BeginMenu("Ionosphere"))`+`EndMenu`+`}` (6) + comentario paraguas nuevo (1) + línea tooltip nueva (1) + comentarios declarados si los hay.
- **E4 — La reescritura literal (la única línea de contenido tocada)**: `:4357` (dentro del menú Radio, **zona LF — conserva EOL**) — línea única con DOS literales del ternario `rpStation`, ambas terminan «See 3D vectors in Layers.» → **«See 3D vectors in Ionosphere.»**. Es par reescrito declarado en el multiset (removed+added no idénticos), NO un par movido.
- **E5 — Kick SDO doble**: original `:3668-3671` viaja DENTRO de A → **Globe** (mismo bloque que el checkbox Sun, como exigía 086 §1.1 y verificó 088 §2.8); réplica `:4384-4386` en Ventana intacta; consumo del worker intacto.
- **E6 — Hoist izca `:4416-4516` byte-idéntico SIN MOVER** (fuera del bar — `EndMainMenuBar :4391 < 4416`; cero líneas suyas en el multiset). Sus NÚMEROS se desplazan por el delta neto del edit — re-pin en el veredicto 092, como siempre.
- **E7 — Cero persistencia y flags sin cambio**: `showWin*` queda **5 flags / 16 ocurrencias / 13 líneas**; Ventana 6 items sin cambio; save/load/settings.cfg intactos; `sunVisible` M11 intacto. El split no crea ni muere flags (los menús no tienen flag de visibilidad).

### 1.3 Simetría y censos post-drop (lo que el veredicto 092 contará)

- `Begin(`/`End();` **7/7 sin cambio** (cinehint :4396 · loading :4408 · Circuit :4524 · Legend :4637 · Altitude :4733 · Limb :4791 · Timeline :4824). `BeginMenu`/`EndMenu` **5/5 → 6/6** en orden System · Globe · Ionosphere · Space Weather · Radio Propagation · Ventana. Bar 1/1. Circuit ternaria + End condicional + `hfOpen` + TX/RX :4610 intactos; Limb compuesta intacta; `drawSunPanel()` :4518 en flujo.
- `SetNextWindow*` **13 sin cambio** · `MenuItem` **6 sin cambio**.
- **Literales con «Layers»: 6 → 3.** Mueren: `BeginMenu("Layers")` :3640 y las 2 cadenas de :4357 (reescritas). Quedan las 3 de la **familia modo-volumen** — «Layers» como MODO de colorear el volumen (Density vs Layers), NO como menú: valor del combo `volModes` :3828 (viaja en B), tooltip :3833 (viaja en B), tooltip de Legend :4654 (Legend no se toca). **Quedan VERBATIM** — tocarlas violaría la mudanza pura y no referencian al menú disuelto. Renombrar el modo cosméticamente: decisión de David para otro ciclo (residual registrado en §6).
- Literales nuevos: `BeginMenu("Globe")` + `BeginMenu("Ionosphere")`. **Sin colisión de nombres**: ningún Begin/BeginMenu existente se llama «Globe» o «Ionosphere» (censo App.cpp: el único literal exacto «Ionosphere» es el header Text :3673 de B, que viaja DENTRO del menú Ionosphere — sin conflicto de IDs ImGui; «Ionosphere» ≠ «Ionosphere Live 3D» del título del programa, que sigue único). Cero literales «Layers» fuera de App.cpp (grep global src/).

### 1.4 Riesgos declarados (van en la nota del drop 091)

- **R1 — Ionosphere sigue largo**: 344 líneas de contenido — el popup puede seguir cortado por abajo con scroll interno (precedente: captura A de 087 a pantalla completa). Mitigación estructural REAL del split: Globe (55) se lleva lo visual y Space absorbe wind/aurora; la captura B del drop 091 evidencia el estado real — si corta, se declara. Alivio mayor si David lo quiere: submenús (backlog 088) o split B/C en un ciclo futuro.
- **R2 — Redundancia cosmética del header**: B viaja con su `Text("Ionosphere")` :3673, que queda redundante bajo el título del menú Ionosphere. Se mantiene VERBATIM (mudanza pura estricta); retiro cosmético opcional en un drop futuro que toque esa zona (misma política que D1 088 — PROHIBIDO micro-drop cosmético).
- **R3 — Reloj UTC en Globe**: G-sol es display puro por frame, sin datos ni dependencias (locals `nowT`/`g`/`cbuf`/`sd`/`slat`/`slon` todos dentro). Cero riesgo.
- **R4 — Firma nueva potencial**: las colas de los menús NUEVOS (Globe termina en `}` de G-sol a col 4; Ionosphere en `}` de G-tec a col 4) NO siguen el patrón 088-D1 (no hay if-guard a col del cuerpo antes del EndMenu) — no se espera `-Wmisleading-indentation` nueva. Si GCC la emitiera en las colas nuevas, se declara y se ADJUDICA como 088-D1 (falso positivo estructural, sin fix cosmético en este drop). Cualquier OTRA firma nueva = desvío a adjudicar en el veredicto.

## 2. Q2 — Base de fold: NO `uicontent-folded` (`db160aa`) — murió en el rollback #17; la base es `muse-base-085` re-pinneada hoy

- El tag `uicontent-folded` → `db160aa` (fold 088) Y los re-pins de #16 (`a5663c9`, `b1ec4e2`) están **MUERTOS** en el espejo actual. La base operativa del ciclo es la RAMA **`muse-base-085` @ `3d17d9c`** (tree `a44cf6eb` == master `ccc1208`; App.cpp `a0441fd5` == pre-imagen anunciada en 089 — verificado por el fold de reconstrucción §0).
- **Tags re-pinneados por GLM hoy, con procedencia en el mensaje anotado**: `uirevert-folded` → `d936842` (tree `438b8c4e`) · `uimenu-folded` → `6fa9a5b` (tree `4b32ee97`) · `uicontent-folded` → `3d17d9c` (tree `a44cf6eb`). Cadena viva restaurada: `779d21b3` → `438b8c4e` → `4b32ee97` → `a44cf6eb` (26 tags). El fold del delta 091 se hace sobre `muse-base-085` y **DEBE cerrar el árbol del master post-drop que la nota anuncie** (D3 084 — 087 ya la cumplió; mantener el estándar).
- `recon038` @ `4d604b5` (tree `779d21b3`) sigue siendo la raíz ancestral de la reconstrucción; ambas ramas viven.

## 3. Q3 — Checklist de entrega (patrón 086 §3 adaptado — 16 puntos citables)

1. **Custodia**: delta format-patch `From <commit nuevo>` full-40, 1 fichero `src/App.cpp`, sin BOM, sha256 anunciado; nota con censo; **árbol del master post-drop full-40 anunciado (D3)**.
2. **Pre-imagen**: App.cpp == `a0441fd500f6e629a624feb7928fd124a70c8168` sobre `muse-base-085` (falsabilidad: `am --keep-cr` limpio).
3. **Tree gate**: fold GLM sobre `muse-base-085` (`3d17d9c`, tree `a44cf6eb`) DEBE cerrar el árbol anunciado EXACTO.
4. **Censo EOL (P2)**: adds, dels y pares movidos con EOL declarado (125 CRs interiores viajan con los bloques); las 2 líneas reescritas (:3494-equivalente y :4357-equivalente) son zona LF y conservan LF.
5. **Mudanza pura**: multiset de pares movidos byte-idénticos — 8 bloques con los spans EXACTOS de §1.1; removed no-blanco == exactamente las 5 estructurales de §1.2-E3; added == 6 de los dos menús + 2 reescrituras + comentarios declarados.
6. **Pre-bloques 087 SIN MOVER**: Space `:4117-4120` y Radio `:4187-4239` inmediatamente antes de su menú, fuera del if, cero `ImGui::` dentro (verificación posicional como 088 §2.6).
7. **IZCA**: hoist `:4416-4516`-equivalente byte-idéntico, sin mover, cero líneas suyas en el multiset.
8. **Kick SDO doble**: original dentro de A→**Globe**; réplica Ventana intacta; worker intacto.
9. **Simetría**: 7/7 + **6/6** + 1/1; orden de barra System·Globe·Ionosphere·Space·Radio·Ventana; Circuit ternaria/`hfOpen`/TX-RX y Limb compuesta intactos; `drawSunPanel()` en flujo.
10. **Flags y persistencia**: `showWin*` 5/16/13 SIN cambio; Ventana 6 SIN cambio; save/load/settings.cfg intactos; `sunVisible` M11 intacto.
11. **Locales**: los 8 bloques viajan ENTEROS — ninguna línea de declaración separada de su uso (censo pre-drop 48/48; una decl huérfana aparecería como removed no estructural y ROMPERÍA el multiset).
12. **Literales**: exactamente 1 línea de contenido reescrita (tooltip Faraday, AMBAS cadenas del ternario); censo «Layers» 6→3 (solo familia modo-volumen); «Globe»/«Ionosphere» solo en los BeginMenu nuevos (+ header B preexistente); NINGÚN otro literal tocado.
13. **Barrera**: 57/57 TUs + glad + LINK (exe NO ejecutado, política 067) · **warnings == 13 firmas/15 crudos** (diff contra `scratch-090-split-build/warnings_signatures.txt` regenerado hoy post-#17; re-baseline 088-D1 — la firma de la cola Radio persiste: la reescritura :4357 no toca su patrón) · ctest 21/21 conteos 067 cero flips. Pre-adjudicación de colas nuevas: R4 §1.4.
14. **Smoke por menú, UNO A UNO**: **Globe** — checkbox Sun con kick-on-open (disco SDO en vivo), slider Atmo intensity, combo Atmo quality, dirección solar + reloj UTC/subsolar visibles. **Ionosphere** — combos Variable/Colormap/Metric (abrir, elegir, sin cierre inesperado), badge IRTAM, **Limb zoom/lupa :3821 (abre/cierra Limb x3 — viaja en B)**, botón Auto del colormap, Faraday modo+escala, estado TEC cache/MOCK/live. **Space** — 4 plots existentes Kp/Dst/F10.7/SSN + ProgressBar + **NUEVOS**: wind (status + plot Bz) y Aurora (checkbox + opacity + Ovation). Fricciones declaradas una a una.
15. **Capturas**: 3 PNG sin chunks tEXt/iTXt/zTXt (046 §1; resolución nativa sin texto, D2 088): **A** = Globe desplegado (checkbox Sun + reloj) · **B** = Ionosphere desplegado completo (evidencia de R1 — declarar si corta) · **C** = Space Weather desplegado con D+F integrados tras los 4 plots.
16. **Anclas**: línea de inserción declarada; re-pin GLM post-fold (ledger completo: hoist desplazado por el delta neto, kicks ×2, lupa, ESC :1768 / save :2330 / load :2407, cinehint/loading, TX/RX, flotantes, Loop :4911, menús nuevos Globe/Ionosphere, pre-bloques ×2).

## 4. Adjudicaciones de las afirmaciones de 089 (todas verificadas sobre `a0441fd5`)

1. **«~475 líneas, 7 secciones»** — EXACTO: contenido `:3641-4114` = **474 líneas**; las 7 «secciones» de 089 (A, B, C, D, E, F, G) son los 8 bloques de §1.1 (G ya venía partida en G-sol/G-tec por el propio 089). Mapa ratificado sin enmiendas de fondo.
2. **«Único literal»** — RATIFICADO CON CENSO (§1.3): 6 literales contienen «Layers»; solo `:4357` (2 cadenas, 1 línea) referencia al MENÚ disuelto; la familia modo-volumen (3 literales, 3 líneas) NO lo referencia y queda verbatim; el del BeginMenu muere con el menú. Cero literales «Layers» fuera de App.cpp.
3. **«Sin pre-bloques nuevos (windB/giroStatus/aurB/tecStatusB en su sección)»** — RATIFICADO POR CENSO (§1.2-E1/E1b): 48/48 locales autocontenidos, 0 cruces, 0 colisiones D+F vs Space. El compilador sigue siendo el detector; hoy el censo ya dice que no disparará.
4. **«Resto de paneles verificado sin movimientos»** — RATIFICADO: inventario completo del script §7 (System `:3495-3638` · Space `:4121-4185` · Radio `:4240-4375` · Circuit `:4524-4609` ternaria + End condicional · Legend `:4637-4724` · Altitude `:4733-4783` · Limb `:4791-4818` · Timeline `:4824-5036` · Sun `drawSunPanel()` :4518). Acoplamientos citados por 089 confirmados con línea: **FPS↔Bloom** (tooltip :3497 «try disabling Bloom» sobre el FPS :3496) y **Timeline GIRO↔rango** (:4827-4828 `gs` + `lr.giroNewest`/`lr.giroOldest` :4893-4894). El split no toca ninguno (solo Space gana D+F y Radio la línea :4357 reescrita).
5. **Base y pre-imagen (D3)** — VERIFICADAS por el fold de reconstrucción: tree `a44cf6eb` full-40 == anunciado; App.cpp `a0441fd5` == anunciado.

## 5. Numeración y estimación

- Este ruling = **090**. El drop de código = **091** (nota + delta + 3 PNG + smoke). El veredicto = **092**.
- Estimación: 1 fichero (`src/App.cpp`), ~1 h (8 bloques movidos ~474 líneas + 6 estructurales + 2 reescrituras + smoke de 3 menús). No vinculante.

## 6. Ledger

- Ciclo «split de Layers» PARTIDO por GLM: 2+1 ratificado con mapa exacto de 8 bloques, sin pre-bloques confirmado por censo (48/48 + colisiones 0), literal único adjudicado con censo, base re-pinneada tras incidente #17, checklist 16 puntos emitido. **Luz verde a ejecutar 091.**
- Backlog: submenús Globe/Ionosphere/Overlays (alternativa si R1 incomoda) · rename cosmético del modo-volumen «Layers» (residual nuevo, decisión de David) · retiro del header `Text("Ionosphere")` al tocar esa zona (R2) · D1 088 normalización cola Radio (SIGUE pendiente — la reescritura :4357 NO activa la prescripción: es 16 líneas antes de la cola) · D2 084 cierre visual ocultar→reabrir · O-030a, 2 inconsistencias de escala, retención tec_*.bin.
- Residuo de entorno #17: espejo certificado @ `muse-base-085` (tree `a44cf6eb`, 26 tags); venv+paramiko operativos; scripts persistidos (`recon090_folds.sh` · `barrier090.sh` · `particion090_verify.py`).
