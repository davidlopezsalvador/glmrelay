# 099 — Higiene ejecutada (código, 3 ficheros)

Partición 098 ejecutada tal cual (A+B juntos, B extendida, checklist 12). Commit app `61a7e95..5b3b149` (3 ficheros, 7+/7-).

## 1-3. Custodia + pre-imágenes + tree gate (D3)

- Delta `to-glm/files/menu099_delta.txt` (5218 B, sha256 `f6b6979ad4c9a75243365c3ad8655dface52d7dfce3ccec5304401b43dffd07b`, `From 5b3b1490285baca8d921ea538ca9d5e78c2f3470` full-40 copiado byte a byte de la cabecera del delta — norma errata-095, 3 ficheros, sin BOM).
- Pre-imágenes (de git, verificadas por GLM contra espejo): App.cpp `37f3a7e119bcaead06ed24bc642ee244c7979277` · GiroAdapter.h `7de8629afb0366182227c34bd10e83905853f0e5` · HFTraceLayer.h `755cbc713ce0376fc37a956e58bca8c3eafa1107`.
- **Árbol post-drop full-40: `51e0719da69e341ac8d662a66637f08c0b482879`** — el fold en rama propia debe cerrarlo EXACTO.
- Blobs post: App.cpp `e688fd85f66cd1942186ae7a4bf81886c9a720fd` · GiroAdapter.h `0d2d2d7f7adb5e51cc5d617dba5a6e9e38f937d5` · HFTraceLayer.h `d8b70cbd8712356ac6e550f342ca55636e672132`.

## 4-5. EOL + multiset

- 7 líneas reescritas: 6 zona CRLF (`App:350`, `App:2211`, `Giro:108`, `HFT:43/:50/:224`) + 1 LF (`:4656`). Método: reemplazo por bytes con EOL explícito por línea (script, aserción de unicidad por ancla). **CR neto App 1857→1857 · Giro 62→62 · HFT 428→428.**
- Multiset verificado: removed 7 / added 7 (App 3+3, Giro 1+1, HFT 3+3); intersección vacía; cero pares movidos; cero blancos. Neto 0 líneas por fichero.

## 6-7. A + B exactos

- A: hunk único `:4656` — solo el segundo argumento del `Text` (`getColormapName()` → ternario con `"fixed"`); rama Density byte-idéntica; propiedades §3 a)–e) de 098 intactas.
- B: tabla §2 literal a literal (6 reescritas); `:4422` verbatim; cero cambios fuera de comentarios; `-i` sin ocurrencias nuevas (`:3500`/`:4277` intactos por construcción).

## 8. Barrera (patrón 095)

TUs afectados de cero (App.cpp + GiroAdapter.cpp + HFTraceLayer.cpp recompilados) + resto + LINK; warnings 0 en GCC UCRT64 local (baseline 15/13 = sandbox GLM; los comentarios no generan warnings); ctest 21/21. Exe solo para capturas (puerta GLSL por imagen).

## 9. Gate de strings

El único cambio visible del binario es «(fixed)» en Chapman (E1); cualquier otra diferencia de UI es regresión.

## 10. Evidencia (3 PNG, 1360x768 operador, sin tEXt/iTXt/zTXt)

- E1 `menu099_e1_fixed.png` (476719 B, sha256 `2a7126f15ffbb6ee98bdea13d635cc95ce7b95be213be0ec6e4da8b83c927682`): Legend «Volume [chapman] (fixed)» — binario NUEVO.
- E2 `menu099_e2_viridis.png` (490579 B, sha256 `96a196770425893db52c21ebbb75367e87761a59391ad81a7f4033697305e3f2`): mismo encuadre «Volume [logNe] (viridis)» — control negativo.
- E3 `menu099_e3_ionosphere.png` (520760 B, sha256 `0eecc2df69ece88bb87f4d32d8fcc578c714808c5393cc991d07e9f8a00d38aa`): menú Ionosphere con Explode/Altitude visibles.

## 11. Smoke

Densidad↔Chapman en vivo con Legend alternando «(viridis)»↔«(fixed)» (E1/E2 lo prueban). Cero fricciones reportadas.

## 12. Anclas (`5b3b149`, sin desplazamiento por construcción)

Ternario `:4655` · hoist/pin/Loop/Legend intactos en sus posiciones 095. Re-pin GLM post-fold.
