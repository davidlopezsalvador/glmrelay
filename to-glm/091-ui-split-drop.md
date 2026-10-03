# 091 — Split Layers ejecutado (código, 1 fichero)

Partición 090 ejecutada tal cual (mapa 8 bloques + E1-E7 + checklist 16). Commit app `ccc1208..4df2ee4` (solo `src/App.cpp`, 105+/102-).

## 1-3. Custodia + pre-imagen + tree gate (D3)

- Delta `to-glm/files/menu091_delta.txt` (16249 B, sha256 `1256f92d4e0563f886e6439fc6fdcc937e8d00b019e2309c7b3d76279133dc23`, `From 4df2ee4ec3dbec472240e8a608b6b08496e3a303` full-40, 1 fichero, sin BOM).
- Pre-imagen verificada antes de editar: `ccc1208:src/App.cpp` == `a0441fd500f6e629a624feb7928fd124a70c8168`.
- **Árbol post-drop full-40: `6e8f6d57b3b26ca0d6ca55a47a24354a5ae64cfc`** — el fold sobre `muse-base-085` debe cerrarlo EXACTO.
- Censo EOL: **adds_CR 0 / dels_CR 0 en el patch** Y **125 CRs viajando en pares movidos** (A 14 + B 77 + C 34; D/E/F/Gs/Gt 0) — el diff los alinea como contexto; probado por pares byte-idénticos bloque a bloque (script, posiciones únicas). Total CR 1857→1857 intacto. Las 2 reescritas (paraguas, tooltip) zona LF conservan LF.

## 4-5. Censo + mudanza pura

Multiset verificado por script: removed no-blanco 97, added no-blanco 100.
- `only_removed` (3): `if (BeginMenu("Layers"))` + paraguas UI-087 + línea tooltip Faraday (2 cadenas).
- `only_added` (6): 2 `if (BeginMenu` (Globe/Ionosphere) + 2 `EndMenu` + 2 `}` + paraguas UI-091 + línea tooltip reescrita. (El otro EndMenu/} empareja como contexto.)
- Resto = 8 bloques byte-idénticos en posiciones únicas (A→3641, B→3699, C→3906, D→4113, E→3978, F→4163, Gs→3672, Gt→4001) + 6 items Ventana + bloque Sun.

## 6-8. Pre-bloques, izca, kick

- Pre-bloques 087 (Space/Radio) SIN MOVER: cero líneas suyas en el multiset; D/F insertados tras el contenido de Space, antes de su EndMenu.
- Hoist byte-idéntico sin mover (cero líneas en multiset; pin-write :4515→:4518 por desplazamiento neto +3).
- Kick original en A→Globe (par movido); réplica Ventana intacta; worker intacto.

## 9-11. Simetría, flags, locales

- `Begin(`/`End();` 7/7 · `BeginMenu/EndMenu` 5/5→6/6 · bar 1/1. Orden: System·Globe·Ionosphere·Space·Radio·Ventana. Circuit/Limb/`drawSunPanel()` intactos.
- `showWin*` 5/16/13 SIN cambio; Ventana 6 SIN cambio; save/load/settings.cfg: cero líneas; `sunVisible` M11.
- 8 bloques enteros (decl+uso juntos); compilador como detector — build OK.

## 12. Literales (matiz al censo 6→3 de 090 §1.3)

Mueren: `BeginMenu("Layers")` + 2 cadenas tooltip :4357 (→Ionosphere). Quedan 3 familia modo-volumen VERBATIM + **3 comentarios preexistentes que el censo no incluía** (`:350` toggle Layers, `:2211` Layers/Explode, `:4420` dentro de Layers): no referencian al menú como menú (históricos); no tocados. «Globe»/«Ionosphere» solo en los BeginMenu nuevos (+ header B preexistente, sin conflicto de IDs).

## 13. Barrera

Build OK (App.cpp recompilado, 0 warnings GCC UCRT64 local — baseline 13/15 = sandbox GLM; colas nuevas sin patrón D1 por R4). ctest 21/21. TUs intactos. Exe no ejecutado como prueba.

## 14. Smoke (operador, cero fricciones reportadas)

Globe (Sun+kick con disco SDO en vivo, Atmo, reloj), Ionosphere (combos, badge, lupa→Limb, Faraday, TEC), Space (4 plots + wind + Aurora). Sin cierres inesperados.

## 15. Capturas (3 PNG, sin tEXt/iTXt/zTXt)

- A `menu091_a_globe.png` (627467 B, sha256 `f12201abed9232399f060580ec6af48f45ea526747ce002df3910b34dbeccdc2`): Globe con Sun + reloj. Limpio de origen.
- B `menu091_b_ionosphere.png` (426528 B, sha256 `e03ed5314addb9a6680b8417bcd73eec03d7813aafbf064cdd364234082dd24f`): Ionosphere hasta DIAS; **Faraday + estado TEC quedan bajo el corte — R1 evidenciado**. 1 chunk texto extirpado.
- C `menu091_c_space.png` (445137 B, sha256 `0d5d2c6b6b8e592f3fea56322ca5bdd3464db9dd8e72e49c8d9770dda54db5f7`): Space con wind (status + Bz) + Aurora tras los 4 plots. 1 chunk extirpado.
- Formato 1360x768 fullscreen operador (D2 088).

## 16. Anclas (`4df2ee4`)

Bar :3493 · Globe :3640 · Ionosphere :3698 · pin-write :4518. Re-pin GLM post-fold.
