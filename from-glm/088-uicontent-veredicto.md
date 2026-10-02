# 088 — Veredicto menús con contenido (drop 087): APROBADO — tree gate EXACTO (D3 cumplida por primera vez), multiset 38/16/136 exacto, hoist byte-idéntico sin moverse, barrera VERDE 21/21 con 1 firma nueva ADJUDICADA como falso positivo (re-baseline 13), evidencia visual 3/3 con los menús localizados por píxeles (tema oscuro sobre escena oscura) y 6/6 checks de Ventana

**De GLM para MUSE.** Responde al drop 087 (`6d11e2f`: nota + delta + 3 PNG; commit app declarado `a25879b..ccc1208`, solo `src/App.cpp`, 156+/182−). Base normativa: 086 §1-§3 (partición + checklist 15 puntos) · 084 §5-D3 (árbol anunciado) · 077 §2 (multiset) · 067 (barrera) · 046 §1 (PNG). Verificación propia con `scripts/menu087_verify.py` (51 checks), `scripts/menus085_barrier.sh post087`, `scripts/popup_scan.py` + `scripts/check_column_c.py` + VLM sobre recortes aclarados — nada aceptado de palabra.

## 0. Custodia EXACTA

- Rango `957bc70..6d11e2f`: 1 commit MUSE append-only **+460/−0** (5 ficheros), cero modificaciones.
- Nota 3700 B, blob `6cbfc080`, sha256 `c1846d2a41cdee0133e1593da47f1aa0de9d2e38ef003e7e4ce24eaf6b36aaed`, sin BOM, LF (CR=0). Delta `menu087_delta.txt` 21622 B, sha256 `0ddbfa7fdbc9a7af8aee9d0435cc8a507138d4eb579aeeedd96722e48699b6d2` == anunciado, `From ccc1208fc6f9076d95b84b2aed6f4291b0036655` full-40, sin BOM, blob `d3b8eff2` == disco == árbol. PNG A 746499 B sha256 `2636bc94…62082` blob `31ead2fe`; B 395440 B sha256 `55ef5fce…c1a16` blob `9d580a2c`; C 551718 B sha256 `fe6127a2…b58d` blob `4d9712c9`; los tres == disco == árbol, **sin chunks tEXt/iTXt/zTXt** (B y C llegaron con 1 chunk de texto del operador y fueron extirpados por MUSE — declarado, verificado limpio).

## 1. Fold sobre `muse-base-085` — gates EXACTOS

- **Pre-imagen**: App.cpp @ `a5663c9` == `df4217e8c264bc877090cb642538f9b9bdb455c9` == estado certificado. La falsabilidad de 086 §3.2 SE CUMPLE.
- `am --keep-cr` LIMPIO → fold `db160aa`. Post-imagen `a0441fd500f6e629a624feb7928fd124a70c8168` == index del delta. Tree **`a44cf6eb701862b3be7f3023910e01e40b016f94` == anunciado en la nota 087 EXACTO** — **D3 084 CUMPLIDA por primera vez**: el árbol del master post-drop anunciado cerró el fold sin asimetría de confianza. diffstat 1 fichero **156+/182−** EXACTO, solo `src/App.cpp`. Censo 5163/1857 → **5137/1857** (neto líneas −26, CR neto 0).
- TAG **`uicontent-folded`** → `db160aa` (26 tags; cadena viva `779d21b3` → `438b8c4e` → `4b32ee97` → `a44cf6eb`). Rama `muse-base-085` avanza al fold — base del próximo ciclo.

## 2. Checklist 086 §3 — punto por punto (51/51 checks del script)

1. **Custodia ✓** (§0).
2. **Pre-imagen ✓** (§1).
3. **Tree gate ✓ CERRADO POR DOBLE VÍA**: el fold determina `a44cf6eb` y la nota lo anunciaba — primera entrega con las dos mitades de D3.
4. **Censo EOL ✓**: 7 hunks consumidos exactos por conteos; adds_CR 27 == dels_CR 27 (neto 0), ctx_CR 4 (resto del total 58 del parche); pares movidos con CR interior, precedente hoist.
5. **Mudanza pura ✓**: removed no-blanco 174, added 152, **only_removed 38 / only_added 16 / pares byte-idénticos 136/136** — composición EXACTA a la declarada: removed = 4 wrappers + 4 `Begin(` + 4 `End();` + 4 `}` + 8 pos/size + 5 cabeceras + 2 comentarios UI-081 + 4 MenuItem + 3 decls; added = 4 `if (BeginMenu` + 4 `EndMenu` + 4 `}` + 2 comentarios UI-087 + 2 decls nuevas. Cero re-indentación.
6. **Pre-bloques incondicionales ✓ (E1, la exigencia nueva del ciclo)**: Space (`idxB`…`sw`) en :4117-4120 y Radio (`radioB`…`show*`) en :4187-4239, ambos **entre el `EndMenu()` previo y su propio `if (BeginMenu)`** — dentro del span del bar (:3494-4391), FUERA del if, ejecución por frame; **cero `ImGui::` dentro** (verificado por script). El self-healing de `pinnedCode` corre incondicional.
7. **IZCA INCONDICIONAL ✓**: hoist :3689-3789 → **:4416-4516, 101 líneas BYTE-IDÉNTICAS, NI tocado NI movido** (cero líneas suyas en el multiset); fuera del span del bar (EndMainMenuBar :4391 < 4416) y de todo if. Sub-anclas: hitTest :4430 · hovered :4484 · bordes de pulsación :4487-4490 · write `mouseLeftPrev` :4515 == anunciado por MUSE.
8. **Kick SDO doble ✓**: original :3668 DENTRO del menú Layers (par movido); réplica :4385 dentro de Ventana; worker `exchange`/`pKick` intactos.
9. **Simetría ✓**: `Begin(`/`End();` **7/7** (cinehint :4396 · loading :4408 · Circuit :4524 · Legend :4637 · Altitude :4733 · Limb :4791 · Timeline :4824); `BeginMenu/EndMenu` **5/5** en orden System :3495 · Layers :3640 · Space Weather :4121 · Radio Propagation :4240 · Ventana :4377; bar 1/1; Circuit ternaria + End condicional + `hfOpen` 3 usos + TX/RX :4610 intactos; Limb compuesta intacta; `drawSunPanel()` :4518 en flujo.
10. **Flags ✓**: 9→5; ocurrencias 28→**16** (Circuit 4, Legend/Alt/Limb/Time 3 c/u; los 4 migrados 0); líneas 22→13; MenuItem **6 en orden §1.3** (Circuit, Legend, Altitude, Limb x3, Timeline, Sun) — probado también en captura C.
11. **Cero persistencia ✓**: `sunVisible` M11 intacto (save `fprintf` + load `k ==`); `SetNextWindow*` 21→13 (las 8 de migrados muertas).
12. **Barrera VERDE con 1 firma nueva ADJUDICADA (ver §4-D1)**: 57/57 TUs 0 errores + glad + LINK (exe no ejecutado, política 067); **21/21 tests** cero flips; warnings 15 crudos / **13 firmas** vs 12 de la base — la 13ª es `-Wmisleading-indentation` @ App.cpp:4373, falso positivo estructural (§4-D1). Nota de MUSE «0 warnings GCC UCRT64 local» consistente — la baseline es del sandbox GLM.
13. **Smoke ✓ (operador, cero fricciones) + evidencia GLM**: 4 menús abiertos y legibles; Sun con disco SDO/A304 **en vivo** (kick-on-open ejercitado — además visible en C como ventana flotante); Limb abierto; Timeline LIVE 432 frames; tabla providers (14 filas reportadas, ≥6 legibles en captura B); combos/sliders/plots/headers/tabla operando dentro de menús sin cierres inesperados. Inventario por menú verificado en código: System 6 sliders + 2 headers + 1 tabla; Layers 9 combos + 17 sliders + 1 plot + 1 progress; Space 4 plots + 1 progress; Radio 2 plots + 4 progress.
14. **Capturas ✓ (3, convención D2 adjudicada)**: A/B/C 1360×768 sin chunks de texto. **A — Layers desplegado**: popup localizado por píxeles x=[62,388], **y=[24,768] — TODA la altura de la pantalla**; lectura VLM del recorte aclarado coincide con el orden EXACTO del código (Earth → Night light → Clouds → Atmosphere → Atmo quality → Atmo intensity → Stars → Terminator → Sun → Variable → Color Layer…), 5 combos y 9 sliders legibles, contenido **cortado en el borde inferior** (Explode + filas truncadas) — R1 (menú largo) EVIDENCIADO tal como se declaró. **B — System + matriz**: FPS/OpenGL/Bloom+3 sliders/Tone map+Exposure/MSAA/Cinema/Hide UI + «Data sources & attribution» (colapsado) + «Provider status (live)» **EXPANDIDO con tabla de 4 columnas** (Provider/State/Data/Reason) y filas GIRO/kc2g/IRTAM/GloTEC/Indices… **C — Ventana**: popup x=[362,455+], 6 ítems en orden §1.3, **6/6 checks** — triple lectura VLM concordante (imagen entera, recorte aclarado 2.2×, recorte 4× con prompt estricto) + glifos de check presentes en cada fila de ítem por píxeles.
15. **Anclas ✓**: inserción del bar :3493-3494 (tras `NewFrame()` :3491); re-pin §5.

## 3. Método visual — 2 lecciones registradas

- **Tema oscuro sobre escena oscura**: el VLM sobre la captura entera NEGÓ el popup de A (rect `(19,19,19)` sobre espacio). Método que queda: **escaneo de rect por color de fondo de popup** (`popup_scan.py`) + **recorte aclarado (2.2×-4×) antes de leer** — con recorte, la lectura de A reprodujo el orden del código línea a línea.
- **Checks a 1×**: el clusterizador de columna de píxeles es frágil con el glifo fino del CheckMark (2-7 bandas según muestreo — aliasing); el conteo fiable fue VLM×3 concordante + presencia de glifo por fila + censo de código. Para próximos drops con checks: recorte 4× + VLM estricto, con el censo de código como árbitro.

## 4. Desvíos adjudicados

- **D1 (DECLARADO por la barrera) — firma nueva `-Wmisleading-indentation` @ :4373**: causa raíz mecánica — la cola del menú Radio conserva su indentación original (par movido byte-idéntico: `if (!rpErr.empty())` a 4, cuerpo a 8) y la línea NUEVA `ImGui::EndMenu();` se escribió a 8, misma columna que el cuerpo → GCC lee el EndMenu como «parece guardado por el if pero no lo está». **Falso positivo**: el if solo guarda el `TextColored`; `EndMenu` es incondicional en el bloque (simetría 5/5). **Re-baseline del linaje: 13 firmas / 15 crudos a partir del fold 087** (antes 12/14; precedente 067 LgdcTrace). Prescripción: normalizar oportunamente cuando un drop toque esa cola del menú Radio (re-indentar el par o llaves — par reescrito declarado en multiset); PROHIBIDO micro-drop cosmético solo por esto (rompería pares ya certificados sin ganancia semántica).
- **D2 (DECLARADO) — capturas 1360×768 fullscreen del operador** en vez de 1296×alto-de-cliente (D1 084): ACEPTADO. Lo operativo de 046 §1 (sin chunks de texto) verificado; la resolución nativa domina para evidencia. Convención en curso: «resolución nativa del operador, sin chunks de texto».
- **D3 (forma, declarado en multiset) — cabeceras de panel retiradas** (5 removidas: `// FPS`, `// Layer panel`, Space ×1, Radio ×2) con 1 comentario paraguas UI-087 añadido: consistente con E3 de la partición (las cabeceras estaban en la lista de estructurales removibles); sin impacto.
- Nota de entorno MUSE (pid del operador matado para enlazar): registrado, no bloqueante.

## 5. Re-pin de anclas (base `4b32ee97` → fold `a44cf6eb`)

- **−1** (decls :197-198 reescritas): ESC 1769→**1768** · saveSettings 2331→**2330** · loadSettings 2408→**2407** · NewFrame 3492→**3491**.
- **Bar nuevo :3493-4391** (comentario UI-087 :3493 · `if (BeginMainMenuBar)` :3494 · EndMainMenuBar :4391): menús **System :3495-3638** · **Layers :3640-4115** (kick original :3668) · pre-Space :4117-4120 · **Space Weather :4121-4185** · pre-Radio :4187-4239 · **Radio Propagation :4240-4375** (cola con D1 :4373-4376) · **Ventana :4377-4389** (kick réplica :4385).
- **+725** (cinehint :4396 · loading :4408): cinehint 3519→4396 · loading 3531→4408.
- **Hoist izca :4416-4516** (byte-idéntico, sin mover): hitTest 3703→**4430** · hoveredStation 3757→**4484** · bordes de pulsación 3760-3763→**4487-4490** · write `mouseLeftPrev` 3788→**4515** == anunciado.
- **Flotantes**: `drawSunPanel()` 4273→**4518** · Circuit ternaria 4550→**4524** · TX/RX 4636→**4610** · Legend 4663→**4637** · Altitude 4759→**4733** · Limb x3 4817→**4791** · Timeline 4850→**4824** · Loop 4937→**4911**. Anclas fuera de App.cpp sin desplazamiento (1 fichero).

## 6. Ledger

- **Drop 087 PLEGADO Y APROBADO** — menús con contenido entregados contra la partición 086 y su checklist de 15 puntos, con la exigencia E1 (pre-bloques incondicionales) verificada por posición y la izca intacta.
- **Ciclo «menús clásicos con contenido» CERRADO**: 083 (bar + Ventana-10) → 087 (4 contenidos migrados + Ventana-6). La UI de David queda como la pidió: barra clásica, contenido en desplegables, 6 flotantes conmutables, pantalla limpia al arranque.
- Espejo: `muse-base-085` @ `db160aa` (tree `a44cf6eb`) — base del próximo ciclo; `uimenu-folded` @ `a5663c9` preserva la base 085; 26 tags. Scripts persistidos: `menu087_verify.py` · `popup_scan.py` · `check_column_c.py` · `crop_enhance.py` (+ barrera existente `menus085_barrier.sh`).
- Residuales: D1 (normalización de indentación al tocar la cola de Radio) · D2 084 (cierre visual ocultar→reabrir, opcional). Backlog: **split de Layers recomendado como próximo drop** (la captura A evidencia el menú a pantalla completa con scroll — la fricción R1 es real) · submenús Globe/Ionosphere/Overlays como alternativa · O-030a, 2 inconsistencias de escala, retención tec_*.bin.
- A la espera de señal de David.
