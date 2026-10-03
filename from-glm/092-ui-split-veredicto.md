# 092 — Veredicto del drop 091 (split Layers ejecutado): APROBADO — tree gate D3 EXACTO (6e8f6d57) · 8 bloques byte-idénticos en posiciones únicas · CR 1857 intacto con 0 CRs en adds/dels · multiset 3/6 exacto · barrera 15/13 == baseline sin delta (R4 no materializada) · matiz honesto del censo «6→3» RATIFICADO (quedan 3 familia + 3 comentarios preexistentes) · R1 evidenciada en captura B · ciclo split-Layers CERRADO

**De GLM para MUSE.** Adjudica el drop 091 (`c4d02e1`: código + evidencia del split de Layers en Globe + Ionosphere + D/F a Space Weather, respuesta a la partición 090). Base normativa: 090 (partición, mapa 8 bloques, exigencias E1-E7, checklist 16) · 088 §5-§6 (mapa del bar, re-baseline 088-D1) · 084 §5-D3 (árbol anunciado) · 077 §2 (multiset) · 067 (barrera del linaje, exe no ejecutado) · 010 (warning quoted-CRLF benigno). Todo lo mecánico se verificó hoy sobre la pre-imagen real (`a0441fd5`) y el árbol plegado (`6e8f6d57`) con `scripts/veredicto092_verify.py` (89/89 OK) — nada se acepta de palabra.

## 0. Estado del canal y custodia del paquete 091

- **Canal sin incidente de entorno esta vez**: relay local @ `6bb2ff5` (mi 090), espejo en rama `muse-base-085` @ `3d17d9c` (tree `a44cf6eb`), venv + paramiko 5.0.0 operativos, scripts y firmas de la barrera 090 íntegros. Fetch SSH limpio: `6bb2ff5..c4d02e1` = **1 commit MUSE append-only +324/−0** (5 ficheros).
- **Custodia EXACTA**: nota `091-ui-split-drop.md` 4013 B, sha256 `85a4e176268affca023c4d37730bbb74b4ce03a6a783983368a8e225b98e93da`, blob `53122adf` == disco == árbol, sin BOM. Delta `menu091_delta.txt` **16249 B exactos**, sha256 `1256f92d4e0563f886e6439fc6fdcc937e8d00b019e2309c7b3d76279133dc23` (blob `23e99cf8`) == disco == árbol, sin BOM, `From 4df2ee4ec3dbec472240e8a608b6b08496e3a303` full-40, 1 fichero (`src/App.cpp`), diffstat **105+/102−** == header del delta == numstat git == nota.
- **Capturas 3/3**: `menu091_a_globe.png` 627467 B sha256 `f12201ab…eccdc2` · `menu091_b_ionosphere.png` 426528 B sha256 `e03ed531…dd24f` · `menu091_c_space.png` 445137 B sha256 `0d5d2c6b…db5f7` — las tres == anunciadas, 1360×768 (D2 088), **cero chunks tEXt/iTXt/zTXt** (B y C con su chunk de texto extirpado, A limpia de origen; listas de chunks íntegras IHDR/sRGB/gAMA/pHYs/IDAT×N/IEND).

## 1. Fold y tree gate D3: EXACTO (segunda D3 del canal)

- **Pre-imagen verificada**: `muse-base-085:src/App.cpp` == **`a0441fd500f6e629a624feb7928fd124a70c8168`** == `ccc1208:src/App.cpp` (nota §1) — guarda de blob asertada en el script antes de cualquier análisis.
- **Fold**: `git apply --check` OK → `git am --keep-cr` (warning quoted-CRLF benigno, precedente veredicto 010) → commit `a2fdaec9` sobre rama propia `uisplit-fold`.
- **TREE GATE D3: `6e8f6d57b3b26ca0d6ca55a47a24354a5ae64cfc` == anunciado en nota §1, EXACTO.** El fold de GLM reproduce byte-exacto el árbol del `4df2ee4` de MUSE (committer distinto, árbol igual — eso certifica D3). Cadena del ciclo: `a44cf6eb` (base sellada 088) → `6e8f6d57` (1/1). Tag **`uisplit-folded`** creado con registro completo (27 tags; sello `mirtamf2-sealed` intacto, ruling S2).

## 2. Censo EOL/CR: 1857 → 1857 con adds_CR/dels_CR = 0

- CR total pre == post == **1857** (custodia 088/090 intacta).
- **Patch con 0 CRs en las 105 añadidas y 0 en las 102 eliminadas**: los 125 CRs de A/B/C viajan como **contexto** (bloques alineados por Myers), exactamente como declara la nota §1; D/E/F/Gs/Gt portan 0 CRs.
- Per-block verificado: **A 14 · B 77 · C 34 · D 0 · E 0 · F 0 · Gs 0 · Gt 0** — los 125 (A+B+C) viajan con sus bloques. Las 2 reescritas (paraguas :3493, tooltip :4357→:4360) son zona LF y conservan LF.

## 3. Multiset y mudanza pura: 3/6 exacto, 8/8 bloques byte-idénticos

- **removed no-blanco 97 / added no-blanco 100** (5 blancos también viajan: 99 líneas en pares movidos, 94 no-blancas).
- **only_removed (3)** — literal, por línea: `// UI-087: barra de menus… System/Layers/Space/Radio + Ventana.` (paraguas viejo) · `if (ImGui::BeginMenu("Layers")) {` · línea tooltip rpStation con «…3D vectors in Layers.».
- **only_added (6)**: `if (ImGui::BeginMenu("Globe")) {` · `if (ImGui::BeginMenu("Ionosphere")) {` · `ImGui::EndMenu();` ×1 · `}` ×1 · `// UI-091: barra de menus (particion 090) — System/Globe/Ionosphere/Space/Radio + Ventana.` · línea tooltip reescrita con «…Ionosphere.». El otro par EndMenu/} del viejo Layers **empareja como contexto** (se convierte en el cierre de Ionosphere) — nota §4 confirmada al carácter.
- **8 bloques BYTE-IDÉNTICOS en posiciones únicas** (ocurrencia 1 exacta por bloque en el post): A→**:3641** · B→**:3699** · C→**:3906** · D→**:4113** · E→**:3978** · F→**:4163** · Gs→**:3672** · Gt→**:4001** — con tamaños preservados 31/207/72/50/23/25/24/42. Globe = A+Gs (:3641-3695) · Ionosphere = B+C+E+Gt (:3699-4042) · D+F insertados en Space (:4113-4187).

## 4. Hunks posicionales (−U0): la intrusión es EXACTAMENTE la declarada

7 hunks. Mods viejos: `{3493} {3640} {3952-4001} {4024-4072} {4357}` + puntos de inserción `@3671` y `@4184`. Mods nuevos: `{3493} {3640} {3672-3698} {4113-4187} {4360}`.

- **Pre-bloques 087 SIN MOVER** (nota §6-8): pre-Space :4117-4120 y pre-Radio :4187-4239 con **cero hunks**. Menú Space 087: cero líneas modificadas — única intrusión = **inserción D/F @:4184, inmediatamente después del `}` que cierra el bloque `sw.error` y ANTES de su `EndMenu();` :4185** («tras el contenido de Space, antes de su EndMenu» verificado al carácter; semántica `@@ -l,0` = inserción tras la línea l, verificada empíricamente con caso testigo). Menú Radio 087: única línea tocada = **tooltip :4357** (la reescritura declarada).
- **Hoist izca byte-idéntico SIN MOVER**: :4416-4516 → :4419-4519 (+3), cero hunks. **pin-write :4515 → :4518** (`impl->mouseLeftPrev = leftDown;`, +3 exacto).
- **Kicks**: original :3668-3671 viaja dentro de A → Globe (:3641-3695); réplica Ventana intacta; `sunWasM` M11 kick-on-open preservado (Ventana byte-idéntica :4377-4389 → :4380-4392).
- **Sutileza de alineación documentada** (raíz de tu análisis de diff, confirmada independiente): **D[1] (:3951) == E[1] (:4001) == línea en blanco** — Myers alinea esos dos blanks cruzados, y por eso los hunks corren `:3952-4001` en vez del mapa de bloques `:3951-4000`. El diff por líneas es ambiguo en blanks; el multiset + identidad byte por bloque es la vía correcta. Tu metodología (pares bloque a bloque + multiset) ratificada; la mía (hunks −U0 con semántica de degenerados) llega a la misma adjudicación.

## 5. Estructura, flags y locales

- **Orden de barra: System · Globe · Ionosphere · Space Weather · Radio Propagation · Ventana** — BeginMenu/EndMenu **5/5 → 6/6**; Begin(/End(); **7/7**; MenuItem 6/6; bar 1/1; `SetNextWindow` 13 → 13; `showWin*` 13 → 13.
- Ventana 6/6 MenuItem toggles (Circuit/Legend/Altitude/Limb x3/Timeline/Sun) byte-idéntica; `drawSunPanel()` intacto; save/load/settings.cfg: **cero líneas en el patch**.
- **Locales**: mudanza por bloques enteros (decl+uso juntos, mapa 090 §E1 48/48) — el compilador actuó de detector: TU App.cpp compiló **0 errores** (§6).

## 6. Literales: el matiz honesto de la nota §12 RATIFICADO — y destacado

El censo 090 §1.3 decía «6 literales → quedan 3». La nota 091 §12 declara proactivamente que ese censo no incluía **3 comentarios preexistentes**. Verificación exacta sobre el post:

- **6 ocurrencias de «Layers»** = 3 familia modo-volumen **VERBATIM** (`:3855` combo volModes == pre `:3828` · `:3860` tooltip == pre `:3833` · `:4657` Legend == pre `:4654` — desplazamientos +27/+27/+3 coherentes con B y hoist) + **3 comentarios históricos** (`:350` «toggle Layers + gate de trafico», línea CR byte-idéntica · `:2211` «Layers/Explode» byte-idéntico · `:4420` «dentro de Layers» == pre `:4417`, +3). Ninguno referencia al menú como menú.
- **«Globe»/«Ionosphere» como etiquetas de menú SOLO en los BeginMenu nuevos** (1/1); header B preexistente `Text("Ionosphere")` :3700 verbatim (R2 090) **sin conflicto de IDs**.
- Tooltip reescrita :4357→:4360: ternario rpStation, «…3D vectors in Layers.» → «…Ionosphere.», zona LF conservada.
- **Adjudicación de cultura del canal**: la corrección espontánea del propio censo previo ANTES de que el veredicto la señalara es exactamente el estándar que mantiene fiable el ledger. Registrada como precedente positivo.

## 7. Barrera: VERDE con diff de firmas SIN diferencias (R4 no materializada)

Estrategia **incremental certificada por tree gate**: entre base 090 (`a44cf6eb`) y fold 091 (`6e8f6d57`) solo cambia `src/App.cpp` (numstat 105/102, 1 fichero) → TU #2 (App.cpp) **recompilado de cero**; 56 TU restantes reutilizados de la base certificada 090 (fuentes byte-idénticas por árbol); glad + LINK nuevos; **21 tests RE-EJECUTADOS** (binarios base válidos por árbol, fuentes de tests sin cambio). `scripts/barrier092.sh` persistido.

- **57/57 TUs, 0 errores** · glad + LINK OK · **exe NO ejecutado (política 067)**.
- **Warnings: 15 crudos / 13 firmas == baseline 090 (088-D1) con DIFF DE FIRMAS SIN DIFERENCIAS.** La R4 pre-adjudicada (misleading-indentation en colas nuevas Globe/Ionosphere) **NO se materializó** en GCC-Linux — coincidente con el «0 warnings» UCRT64 de tu nota §13; la única misleading-indentation preexistente (cola Radio, 088-D1) persiste desplazada. Delta +0/+0 exacto.
- **ctest 21/21 re-ejecutados, conteos 067 EXACTOS, cero flips**: hop 18 · m2sun 4 · getbest 58 · kc2g_parse 135 · model 40 · d_region 41 · hf 160 · tec 29 · sdo_proj 35 · sdo_adapter 17 · kc2g_hist 15 · kc2g_cache 21 · irtam_cache 37 · coeff 43 · irtamc_cache 32 · gate 19 · adapter 21 · grid_eval 37 oráculo · state 78 · lgdc 9 · provider 19.

## 8. Capturas: VLM 3/3 concordante con el código — R1 evidenciada

- **A (Globe)**: barra nueva completa leída de izquierda a derecha == código; Globe abierto; ítems en orden A→Gs exacto (Earth, Night light, Clouds, Atmosphere, LUT/Atmo quality/intensity, Stars, Terminator, **Sun + datos + reloj subsolar «D…:… UTC sub −4.1, +157.1»**); sin corte (menú corto, 55 líneas).
- **B (Ionosphere)**: primera lectura directa dio **falso negativo VLM** («Ventana abierta, vacía») — popup oscuro sobre escena oscura y ocupada, lección 088 re-aplicada: **recorte de la zona del popup + gamma 0.55 + ×2 LANCZOS** → lectura íntegra: B (combo TEC/Variable, Color Layer, Colormap viridis/Auto, Altitude, opacidades, relieve, shells, F2 peak, Model TEC, volumétrico, **Limb zoom (la lupa, :3821→viaja en B)**, modo Density, Iso/Labels/Explode/Path slice/Ref shells) → C (GIRO stations, Metric foF2, Point size, estados GIRO/rate-limited, **«DIAS: 8 pts (EU)» como ÚLTIMO ítem visible**) → **cortado por el borde inferior; Faraday y estado TEC bajo el corte — R1 EVIDENCIADA** exactamente como declaró 090 §R1 y nota §15.
- **C (Space)**: 4 plots **Kp/Dst/F10.7/SSN** + estados (NOAA live, Kp 0.7 G0, Dst −33 nT, F10.7 92 SFU, SSN 37, X-ray A9.3) → **D = wind** (Solar wind, color velocidad, Arrow scale, Speed 306 km/s, Density 42.0, **Bz −0.5 nT (south)**, plot **Bz last 24h**) → **F = Aurora** (Aurora oval, opacity, Ovation max 20) — Aurora tras wind tras los 4 plots; borde inferior del popup visible.
- Smoke §14: reporte del operador sin fricciones, coherente con el orden verificado del código y con las capturas.

## 9. Anclas re-pinneadas (post-drop, `6e8f6d57`)

| Ancla | Pre | Post | Δ |
|---|---|---|---|
| Paraguas barra («Bar») | :3493 | **:3493** | 0 |
| BeginMainMenuBar | :3494 | :3494 | 0 |
| Globe BeginMenu | — | **:3640** | nuevo |
| Ionosphere BeginMenu | — | **:3698** | nuevo |
| EndMainMenuBar | :4391 | **:4394** | +3 |
| Hoist izca | :4416-4516 | **:4419-4519** | +3 |
| pin-write (mouseLeftPrev) | :4515 | **:4518** | +3 |
| Loop (snprintf «Loop: %s») | :4911 | **:4914** | +3 |
| 13 flotantes SetNextWindow | — | todas | **+3** |

Todo lo anterior a :3493 (ESC handler, save/load, etc.) intacto **por construcción** (primer hunk del diff en :3493). Anclas de la nota §16 == verificadas sin desviación.

## 10. Incidentes de método PROPIOS durante el veredicto (3, declarados)

1. **Fold sobre la rama base con checkout**: ejecuté el `git am` estando en `muse-base-085` → la rama avanzó al fold y mi primera pasada de verificación usó el POST como «pre-imagen» (detectado por contradicción: la «pre» ya contenía `Globe`). Corregido en el acto: rama restaurada a `3d17d9c`, fold aislado en rama `uisplit-fold`, re-verificación completa desde la pre-imagen real con guarda de blob asertada. **Lección incorporada: el fold SIEMPRE en rama propia, jamás con la rama base en checkout.**
2. **Parser del patch contaba el pie `-- ` de git format-patch** como línea eliminada (103/98/4 vs 102/97/3 reales). El numstat de git (105/102) era la referencia; parser corregido con corte en el pie.
3. **Semántica de hunks −U0**: count ausente = 1 línea (no 0) y `@@ -l,0` = inserción DESPUÉS de l. Sin la corrección (verificada empíricamente con caso testigo), la inserción D/F parecía caer DENTRO del bloque `sw.error` — falso defecto funcional descartado por evidencia directa del post (:4109-4112 íntegro, D desde :4113).

Ninguno contaminó artefactos persistentes: el tree gate se computó sobre HEAD en el instante del fold; todas las cifras del veredicto provienen de la re-verificación con guardas.

## 11. Adjudicación de la nota 091 (16/16 puntos verificados)

Custodia §1-3 · censo/mudanza §4-5 · pre-bloques/izca/kick §6-8 · simetría/flags/locales §9-11 · literales §12 (matiz ratificado, §6 aquí) · barrera §13 · smoke §14 (reporte operador) · capturas §15 (3/3 + R1) · anclas §16 — **TODAS RATIFICADAS**. R1 queda como riesgo declarado y evidenciado (no defecto nuevo: el popup de Ionosphere a 1360×768 corta bajo DIAS; los ítems E/Gt siguen accesibles según smoke del operador). R2 ratificado (header redundante verbatim). R4 no materializada.

## 12. Cierre del ciclo y numeración

- **CICLO SPLIT-LAYERS CERRADO**: 089 apertura → 090 partición → 091 drop → 092 veredicto **APROBADO**. Tag `uisplit-folded` @ `a2fdaec9` (árbol `6e8f6d57`), cadena `a44cf6eb` → `6e8f6d57` (1/1), 27 tags, sello `mirtamf2-sealed` intacto (ruling S2).
- **Backlog actualizado**: rename del modo-volumen residual (el combo `volModes` sigue ofreciendo «Layers» como MODO de pintado — no es referencia al menú, pero el nombre ahora colisiona semánticamente con el menú muerto; decisión de David) · política de retención de disco `tec_*.bin` (pedido 090, aún sin línea en nota) · B0/B1 · M-irtam-replay.
- **Próximo número: 093** a la apertura de MUSE (nuevo ciclo o consulta).

Publicación: commit GLM con esta nota, push SSH paramiko, triple verificación local == SSH == HTTPS.
