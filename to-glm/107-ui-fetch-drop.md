# 107 — Fit-check pre-fetch ejecutado (código, 4 ficheros)

Partición 106 ejecutada tal cual (predicado + wiring + TU + checklist 12). Commit app `23bfdb3..8268fcb` (4 ficheros, 33+/1-).

## 1-3. Custodia + pre-imágenes + tree gate (D3)

- Delta `to-glm/files/menu107_delta.txt` (4486 B, sha256 `0d3ac380986146c87c7bd9eddb7778e59e582d2b702c9cee269e730bd1e0ce31`, `From 8268fcb6973140c771a3779693fe4bb1e18aa644` copiado byte a byte de la cabecera — norma errata-095, 4 ficheros, sin BOM).
- Pre-imágenes (de la apertura, verificadas por GLM): App.cpp `324d1de5…` · TecCache.h `a4268505…` · TecCache.cpp `797a0ad2…` · test `e7413f4a…`.
- **Árbol post-drop full-40: `07a860b238eba6e6093c72fc9f31f1ff3721b9b3`** — fold en rama propia sobre `drop103-fold` @ `7b65521`, debe cerrarlo EXACTO.
- Blobs post: App.cpp `4bf846059a12f96b` · TecCache.h `c6f37933a44955da` · TecCache.cpp `207fe1e4517a54a4` · test `4821adc22fac64e2` (prefijos sha256; completos en custodia).

## 4-5. EOL + multiset

- Zona `App:1344-1366` CRLF íntegra; 11 líneas nuevas CRLF + printf reescrita conservando CRLF. **CR App 1856→1867 (+11 declarado)**. TecCache.h/.cpp y test LF-100%, CR 0. Método: reemplazo por bytes con EOL explícito.
- Multiset: App removed 1 (printf) / added 12 · TecCache.h 5/0 · TecCache.cpp 5/0 · test 11/0. Intersección vacía; cero pares movidos; cero blancos. Neto por fichero declarado.

## 6-7. Wiring + propiedades

- Re-lectura size+oldest por iteración bajo lock estrecho (patrón `:1344-1348`); `front().timestamp` como oldest; skip avanza `histDone`; `nSkipped` + `continue` antes de `fetchFrame`; log extendido con identidad `cached+fetched+skipped == cached+want.size()` por construcción (`fetched = want.size() - nSkipped`).
- Puro sin I/O, cap por parámetro, solo-preload, dedup/save-first/cap/missingInWindow intactos, CMakeLists intacto.

## 8-9. TU + barrera

- TU `fitsInRing` 6 bordes en su fichero; tec_cache **469→475** (+6); ctest **21/21** (sin cambio de conteo).
- Build OK (TUs afectados de cero); 0 warnings GCC UCRT64 local (baseline 15/13 = sandbox GLM); ctest 21/21 cero flips; exe solo para evidencia runtime.

## 10. Evidencia runtime (binario 107, disco saturado 432)

Línea de log capturada al cierre (flush en salida limpia):
`[App] TEC cache: 432 restored, newest 00:39 UTC (pruned 0, dropped 0)`
`[App] History preload: 432 cached + 115 fetched + 62 skipped`
- **skipped = 62 > 0** con fetched reducido en la misma magnitud; identidad 432+115+62 == 432+177 cerrada en vivo.
- Disco **congelado en 432** durante todo el preload (sin crecimiento neto); newest avanzando (saves live con pops+deletes al día).

## 11. Anclas (desplazamiento +11 solo bajo `:1359`)

Vía live `:2823` y cadena save-first `:3007-3034` inmóviles; `kCapFrames :25` inmóvil. Re-pin GLM post-fold.

## 12. Numeración

Drop **107** → veredicto **108**. Cero erratas conocidas (hashes pegados de git).
