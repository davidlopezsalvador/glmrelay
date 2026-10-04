# 117A — Higiene UI ejecutada (código, 8 ficheros)

Partición 116 scope A ejecutado (A1+A2+A3). Commit app `386adfa..db82221` (8 ficheros).

## 1-3. Custodia + pre-imagen + tree gate (D3)

- Delta `to-glm/files/menu117a_delta.txt` (15042 B, sha256 `d5582110b90b243e2f42f8ef3435ad922ca8a4ae3baf20b7e8b403171d3905af`, `From db82221c7ff04fc8ea62eb62e5517f2cc0eb1f2d` copiado byte a byte de la cabecera — norma errata-095, 8 ficheros, sin BOM).
- Pre-imagen: App.cpp `7e0b7cd1c1df246833a453a4156e41d54e741082` (verificada antes de editar; resto de ficheros intactos en `386adfa` salvo lo anunciado).
- **Árbol post-drop full-40: `6215dd35576c2c144483ba03f918ee4026f12b18`** — fold en rama propia sobre `drop111-fold` @ `ac758b82`, debe cerrarlo EXACTO.
- Blobs post (full-40 de git): App.cpp `3ab2e5bc49a9f69d85d7bc0703312d136edb9a97` · DiasAdapter.cpp `2eff03da01796a6aba7cb36ad10427209a35e5d2` · GiroAdapter.cpp `da25b1c900e5a5698d4f90121299cb2a04cb8372` · GloTecAdapter.cpp `c80d10517163bce652b93ec5bbf1ac3f3a5408e8` · IrtamState.cpp `ec90a01dbba4a2a54af6a414c95ee65a1f206ce3` · Kc2gAdapter.cpp `f070bc0dda941eb3988e517bafca7bd72fc10219` · SolarWindAdapter.cpp `4fa59b2217d7c874bd89ccb1c46b85d5e3e06f3e` · test_irtam_state.cpp `000d94315190b26fb0732b4d6be80633f4aac021`.

## 4-5. EOL + multiset

- EOL por línea preservado (reemplazos sin `\n` en patrones; verificado por censo): CR App 1867→1867 · resto sin cambio salvo normalización declarada abajo.
- **Incidente EOL detectado pre-push y reparado**: `IrtamState.cpp` y `test_irtam_state.cpp` estaban en worktree con CRLF íntegro (conversión de checkout) contra blobs LF; el stage con `-c core.autocrlf=false` lo habría congelado en diff 279/279 y 365/365 espurios. Normalizados a convención LF del blob (cero líneas de contenido afectadas); diff final exacto a lo intencionado. Causa habitacional, no de edición (los mismos scripts sobre otros 6 ficheros no alteraron ningún EOL).
- Multiset final: App 12/13 · Dias 1/1 · Giro 4/4 · GloTec 1/1 · IrtamState 5/5 · Kc2g 1/1 · SolarWind 1/1 · test 6/6. Intersección vacía; cero pares movidos; cero blancos. Neto App −1 (ESC), resto 0.

## 6. Contenido (A1+A2+A3)

- **A1**: menú `Ventana`→`Windows` + 2 comentarios; barrido EN: 4 literales UI (tooltip IRTAM, label Loop —con byte Latin-1 `ó` heredado eliminado—, tooltip zonetime, texto DATA) + 15 líneas consola (kc2g/GIRO/DIAS/solar-wind/kc2g/GloTec) + 6 asserts TU a los literales intencionados (precedente 054). Auditoría post: 0 restos (1 falso positivo inglés). Excluidos con causa: 2 comentarios `Kc2gAdapter.h` (no-UI, time-windows) y test-names (convención de comentarios).
- **A2**: fuera `:1779-1780` (ESC quit sin debounce). Cierre solo con X.
- **A3**: `ImGui_ImplGlfw_ScrollCallback` reenviado en el callback propio (causa raíz: lo reemplazaba y `io.MouseWheel` valía 0 siempre); gate zoom-vs-scroll intacto en `WantCaptureMouse`.

## 7-8. Barrera + smoke

- Build OK (todos los TUs tocados recompilados); 0 warnings GCC UCRT64 local (baseline 15/13 = sandbox GLM); ctest **21/21** (TU actualizado incluido); LINK OK; exe reconstruido post-amend y re-verificado.
- Smoke operador: ESC no cierra ✓ · rueda sobre menú scrollea ✓ · rueda sobre globo zoom ✓ («todo funciona correctamente»).

## 9. Evidencia (1 PNG, sin tEXt/iTXt/zTXt, 1360x768)

- `menu117a_bar.png` (965955 B, sha256 `0aff05e6531af1095ed395b32cc7844079505fed4c2267cbf01ba6cb470ce208`): barra con «Windows» desplegado (6 checks) + Legend «Volume [chapman] (fixed)» — binario NUEVO.

## 10. Anclas (desplazamiento −1 bajo `:1779` en App; resto inmóvil)

Re-pin GLM post-fold.

## 11. Numeración

Drop **117A** (scope A de la 116) → veredicto **118**. Scopes B (Limb) y C-i (watchdog) pendientes en este mismo marco.
