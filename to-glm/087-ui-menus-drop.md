# 087 — Menús con contenido ejecutados (código, 1 fichero)

Partición 086 ejecutada tal cual (§1.1-E1 + checklist 15). Commit app `a25879b..ccc1208` (solo `src/App.cpp`, 156+/182-).

## 1-3. Custodia + pre-imagen + tree gate (D3)

- Delta `to-glm/files/menu087_delta.txt` (21622 B, sha256 `0ddbfa7fdbc9a7af8aee9d0435cc8a507138d4eb579aeeedd96722e48699b6d2`, `From ccc1208fc6f9076d95b84b2aed6f4291b0036655` full-40, 1 fichero, sin BOM).
- Pre-imagen `App.cpp` == `df4217e8c264bc877090cb642538f9b9bdb455c9` (gate verificado antes de editar).
- **Árbol post-drop full-40: `a44cf6eb701862b3be7f3023910e01e40b016f94`** — el fold sobre `muse-base-085` debe cerrarlo EXACTO.
- Censo EOL: adds_CR 27 == dels_CR 27 (neto 0; pares movidos con CR interior, precedente hoist 083). Resto de adds LF en zona LF.

## 4-5. Censo + mudanza pura (E3)

Multiset verificado por script (no a ojo): removed no-blanco 174, added no-blanco 152.
- `only_removed` (38) == exactamente las estructurales: 4 wrappers + 4 `Begin(` + 4 `End();` + 4 `}` + 8 pos/size + 5 cabeceras + 2 comentarios UI-081 (flags + bar) + 4 MenuItem migrados + 3 decls viejas.
- `only_added` (16): 4 `if (BeginMenu` + 4 `EndMenu` + 4 `}` + 2 comentarios UI-087 + 2 decls nuevas.
- Resto (contenidos 142+474+63+134, pre-bloques 4+53, 6 items Ventana + bloque Sun) = pares movidos byte-idénticos (multiset 0).

## 6-8. Pre-bloques, izca, kick

- Space :pre-bloque y Radio :pre-bloque viajan inmediatamente ANTES de su `if (BeginMenu)`, dentro del span del bar, FUERA del if (E1). Sin `ImGui::` dentro (verificado por script). Self-healing `pinnedCode` intacto por construcción.
- Hoist :3689-3789 NI tocado NI movido (cero líneas suyas en el multiset).
- Kick original viajó dentro de Layers (par movido); réplica Ventana intacta; worker intacto.

## 9-11. Simetría, flags, persistencia

- `Begin(`/`End();` 11/11 → 7/7 (cinehint, loading, Circuit, Legend, Altitude, Limb, Timeline); `BeginMenu/EndMenu` 5/5; bar 1/1. Circuit ternaria/`hfOpen`/TX-RX intactos; Limb compuesta intacta; `drawSunPanel()` en flujo.
- Flags 9→5 (`showWin*` 28→16 ocurrencias); Ventana con 6 en orden §1.3 (probado en captura C).
- save/load/settings.cfg: cero líneas en el multiset. `sunVisible` M11 intacto.

## 12. Barrera

Build OK (App.cpp recompilado, 0 warnings en GCC UCRT64 local — baseline 12 firmas = sandbox GLM). ctest 21/21. TUs intactos (ningún fichero añadido/eliminado). Exe no ejecutado como prueba (nota: hubo que matar PID 10608 del operador para enlazar).

## 13. Smoke (operador, cero fricciones reportadas)

4 menús abiertos y legibles; Sun abierto con disco SDO/A304 en vivo (kick); Limb x3 abierto (lupa); Timeline en LIVE (432 frames); tabla providers con 14 filas. Sin reporte de cierres inesperados ni widgets rotos.

## 14. Capturas (3 PNG, sin tEXt/iTXt/zTXt)

- A `menu087_a_layers.png` (746499 B, sha256 `2636bc94ca3393bf1825ed8e11522d0f7ef1c853557e48e124bfa4f677c62082`): menú Layers desplegado, contenido largo + widgets. Limpio de origen (0 chunks texto).
- B `menu087_b_system.png` (395440 B, sha256 `55ef5fcef5268cd61e2fed7c7ef7882d5bfb99fb25f2dc08610206353efc1a16`): menú System + «Provider status (live)» expandido (14 filas). 1 chunk texto del operador, extirpado.
- C `menu087_c_ventana.png` (551718 B, sha256 `fe6127a2c0eb8571daa8ce00006961eb6a12206f8d4349508d7fd4558cdeb58d`): Ventana con los 6 checks en orden §1.3 + Sun/Limb/Timeline vivos. 1 chunk texto extirpado.
- Formato: 1360x768 fullscreen de operador (convención Leak: contenido manda; precedente D1 084).

## 15. Anclas (master `ccc1208`)

Bar :3493 · System :3495 · Ventana :4377 · decls :197 · pin-write :4515. Re-pin GLM post-fold.
