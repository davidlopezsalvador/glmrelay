# 103 — P1 delete-on-pop ejecutado (código, 4 ficheros)

Partición 102 ejecutada (helper + wiring + TU + checklist 12). Commit app `5b3b149..23bfdb3` (4 ficheros, 39+/5-).

## 1-3. Custodia + errata + pre-imágenes + tree gate (D3)

- Delta `to-glm/files/menu103_delta.txt` (4743 B, sha256 `205c3667e17bab5f23c06a80632ac646b26d73be5a7d45ad1a506afb4175b3e0`, `From 23bfdb30f1cb8efe62b4d0a083da5621fc8631da` copiado byte a byte de la cabecera — norma errata-095, 4 ficheros, sin BOM).
- Errata 101 pre-declarada: TecCache.cpp `2bcd8d550d40aeee416272213c34b191906f17da` (la apertura declaró 45 chars).
- Pre-imágenes: App.cpp `e688fd85f66cd1942186ae7a4bf81886c9a720fd` · TecCache.cpp `2bcd8d550d40aeee416272213c34b191906f17da` · TecCache.h `94da7098f6f8e2b8d0f6c54f12a35cc787a5f9d` · test `fd756cdd0206ea00bb50240b71615944c38c4696`.
- **Árbol post-drop full-40: `a8afa6f8bbf09cadd6a5a6ce6371ee68fd758189`** — fold en rama propia sobre `drop099-fold` @ `3f26438`, debe cerrarlo EXACTO.
- Blobs post: App.cpp `324d1de5cf9b476c73ce0657ef5ed732f9678b19` · TecCache.cpp `797a0ad2d5d9aa1487ecb59f7d2a0c4790ecd9fc` · TecCache.h `a4268505ba8d30e437c66d9fd45c707e9e024c2f` · test `e7413f4ad33f61c2089362e3bad9e7777213103e`.

## 4-5. EOL + multiset

- Zona `App:3007-3031` ajedrezada (medida línea a línea); ancla while LF; líneas nuevas LF. **CR App 1857→1856 (-1 con causa)**: cae el comentario CRLF `:3022` superado por el bloque nuevo (4 líneas LF que lo sustituyen) — swap declarado, único delta de CR del drop. TecCache.cpp/h y test LF-100%, CR 0→0. Método: reemplazo por bytes con EOL explícito.
- Multiset: App 12/5 (expansión del while + movimiento del bloque save (9 líneas pares idénticos) + 4 comentarios − 1 comentario) · TecCache.cpp 7/0 · TecCache.h 1/0 · test 19/0. Intersección vacía; cero blancos; neto por fichero declarado.

## 6. Hallazgo de orden EN VIVO (corrige mi wiring inicial)

Con el wiring ingenuo (delete-tras-pop, save después), la medición en vivo dio **459 = 432 + 27**: los 27 son gaps viejos de preload (epochs 1790812500–1790828100, escritos 01:53:33–01:54:33) — al insertarse más viejos que todo el anillo, el pop los expulsa **en el acto** y mi delete corría ANTES del save (fichero aún inexistente → no-op), con el save recreándolo después. **Fix aplicado en este mismo drop (save-first)**: guardar ANTES del pop; el pop+delete alcanza al expulsado sea nuevo o viejo. Neto en disco 0 por frame en ambos casos; semántica de memoria idéntica; gate/dedup/orden/cap intactos.
- Observación para backlog (fuera de P1): esos gaps viejos se fetchean para ser evictados al instante (política de fetch, no de retención).

## 7-9. Comportamiento, TU, barrera

- Propiedades §1 a)–f) como propiedades del diff + orden save-first (§6). `loadCached`/`shouldCacheFrame`/dedup intactos.
- TU retención en su fichero (sin tocar CMakeLists): save 435 + removeFrame 3 viejos → **432 en disco** + removeFrame false sin fichero. **ctest se mantiene en 21** (desvío declarado del «21→22»: la misma partición prohíbe 5º fichero/CMakeLists — la restricción dura manda; el TU vive en el binario `tec_cache`, 469 OK / 0 FAIL).
- Build OK (TUs afectados de cero); 0 warnings GCC UCRT64 local (baseline 15/13 = sandbox GLM); ctest 21/21 cero flips; exe solo para evidencia en disco (sin UI en este ciclo).

## 10. Evidencia en disco (falsable, binario con fix)

- Arranque con exceso: **497→459** (poda −65) y tras el fix **459→432** en el relanzamiento (residuo + 27 gaps autoprunados).
- Wiring en vivo: conteo **congelado en 432** con newest avanzando (02:10:59, saves live en curso) — pops+deletes al día.

## 11. Anclas (desplazamiento +7 bajo `:3007`; resto intacto)

Re-pin GLM post-fold (`kCapFrames :25` inmóvil; guard/tooltips/pin/hoist/Loop corren +7).

## 12. Numeración

Drop **103** → veredicto **104**.
