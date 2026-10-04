# 117B — Limb Chapman ejecutado (código, 1 fichero)

Partición 116 scope B ejecutado (readback post-3b + gate + checklist). Commit app `5187ec4..7c4a4ee` (1 fichero, 45+/2-).

## 1-3. Custodia + pre-imagen + tree gate (D3)

- Delta `to-glm/files/menu117b_delta.txt` (4321 B, sha256 `8b3f586992dc9d908cb96ea5fbb6cb2452f5d9ff3614a2344fc46bba843553d9`, `From 7c4a4eeaf0406b8f9ccdd00282ab0b79db9cc79a` copiado byte a byte de la cabecera — norma errata-095, 1 fichero, sin BOM, CR=2).
- Pre-imagen: App.cpp (master `5187ec4`, verificado limpio antes de editar).
- **Árbol post-drop full-40: `a6ac191e8b6e84ba5f5fe4355b043171fcd66373`** — fold en rama propia sobre el espejo en `5187ec4`, debe cerrarlo EXACTO.
- Blob post: App.cpp `f1c0b31b4645686deba15af36b2bd56b2ee4d1b5` (full-40 de git).

## 4-6. EOL, multiset, contenido

- 45 líneas nuevas LF; la línea preservada CRLF intacta. **CR 1867→1867** (delta CR 2 = 1 removida + 1 añadida). Método: reemplazo por bytes.
- Multiset: removed 2 (las 2 líneas del `Image` viejo) / added 45 (miembros 2 + bloque blit + rama ventana). Intersección vacía; cero pares movidos; cero blancos.
- Contenido: miembros `limbFBO` + `limbCatReady` · blit GPU→GPU post-3b con rect 1:1 al de la ventana (uvc bottom-up, flip en UV) y gate `showVolCat && pipVisible && showWinLimb` · ventana: `limbFBO` si blit OK, `sceneFBO` si no (Density intacto byte a byte en su rama).
- Alternativas descartadas declaradas: doble render (coste), categórico en escena (mata hues).

## 7-8. Barrera + render-gate

- Build OK (App.cpp recompilado); 0 warnings GCC UCRT64 local; ctest 21/21; LINK OK; exe reconstruido y re-verificado.
- Coste medido por operador: **30 fps con volumen → 50 fps sin volumen** (coste del volumen, no del blit). El blit (1 copia GPU 320×190/frame solo con Limb+Chapman) es despreciable por construcción; sin medición aislada — declarado, no asumido.

## 9. Evidencia (par PNG, 1360x768 operador, sin tEXt/iTXt/zTXt)

- `menu117b_limb_chapman.png` (521581 B, sha256 `2a7bfe0832e762a98648fd34d9c8f9810835ee32495b2d8b0382cfa3212d881a`): Limb en Chapman — muestra imagen compuesta correcta (sin negro/espejo/recorte). Mismo encuadre que Density.
- `menu117b_limb_density.png` (343722 B, sha256 `fc8298fbe408be0acf3e5dfa0e17ef3bb581fe8b5f6785c82efab66a801ea749`): vía antigua intacta. 1 chunk texto extirpado.
- Límite honesto declarado: opacidad 0.026 en ambas → diferencia perceptual entre modos limitada por construcción; el par prueba corrección del path (rect/UV/flip/gate), no intensidad del modo.

## 10. Residuales y hallazgo nuevo (no bloquean)

- Línea ES no auditada «MSAA 4x no soportado, cayendo a 0x» (consola, preexistente) → residual al próximo drop que toque consola.
- **Hallazgo operador (nuevo backlog)**: en Chapman nocturno no hay distinción de 4 colores (solo tonalidades) contra lo que sugiere el tooltip; en Density sí hay gradiente. Hipótesis física (F2 domina de noche → cian) pendiente de prueba diurna con opacidad alta (`chapman-dia.png` del operador, opacidad 0.026, no concluyente). Propuesta: 1 captura día + opacidad ~1.0 en Chapman (+ par Density); si aparece la cebolla D/E/F1/F2 se cierra con explicación; si no, ciclo de defecto del `u_layer`.

## 11. Evidencia C-ii adjunta (para veredicto C-iii)

- `watchdog_c2_minimizada.log` (40753 B, sha256 `b703029ba9b2b8ec22dd60082b76b345016b89cb02374615948bdec1fb927fae`): sesión del operador con episodio en minimizada — 14 stalls (máx 8090 ms en swap al volver) + foco. Pendiente de rúbrica en veredicto.

## 12. Anclas (desplazamiento +45 bajo Pass 3b; resto inmóvil)

Re-pin GLM post-fold.

## 13. Numeración

Drop **117B** (scope B) → veredicto. C-iii (lectura watchdog) sigue en este marco.
