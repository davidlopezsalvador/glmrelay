# 111 — Acople del cap ejecutado (código, 1 fichero)

Partición 110 ejecutada tal cual (2 sitios + checklist 12). Commit app `8268fcb..386adfa` (1 fichero, 2+/2-).

## 1-3. Custodia + pre-imagen + tree gate (D3)

- Delta `to-glm/files/menu111_delta.txt` (1601 B, sha256 `4194ed81f23556dc94995aca2f3b23c111092497e0e8fac1aadffa7be7ed5406`, `From 386adfae575ec5139e99f9ebe580853ef47afde5` copiado byte a byte de la cabecera — norma errata-095, 1 fichero, sin BOM).
- Pre-imagen: App.cpp `4d7f4e5fe20c75fa93b0aa45eb18dd6670723582` (verificada antes de editar).
- **Árbol post-drop full-40: `ff1f66cf4b4b8abc39055aff01deb07a4a20a25d`** — fold en rama propia `drop111-fold` desde `6fb3372`, debe cerrarlo EXACTO.
- Blob post: App.cpp (prefijo `7e0b7cd1`, completo en custodia del delta).

## 4-6. Diff, EOL, multiset

- EXACTAMENTE 2 líneas modificadas (2+/2-), cero desplazamiento neto (5160 líneas).
- `:3040` removida/añadida LF · `:2959` removida/añadida CRLF (delta transporta el `\r` en ambas). **CR 1867→1867** (delta CR 11 = 1+1+9 de contexto, aritmética cerrada).
- Multiset: −2/+2, intersección vacía, cero movidos, blancos 0. Solo el token intercambiado; indentación, comentario y EOL intactos.

## 7-8. Propiedades + censos post

- a)–f) de 110 §2 como propiedades del diff (cast explícito idioma del repo, TecCache.h intacto, cero comportamiento, cero warnings, sin TU/CMakeLists/tests/comentarios/UI).
- «432» en src/ == **8 hits** exactos (`:2959` documental por su inline, `:3044`, `:4860`, App.h:32, IrtamState.h:9, TCH:25, TCH:27, SunDiskMath 43200.0 no relacionado). Comparaciones 432 en código == **0**. kCapFrames en App.cpp == **4** (`:1357`, `:1366`, `:2959`, `:3040`), repo 6 con TCH:25 + TCC:138.

## 9-10. TU + barrera

- test_tec_cache.cpp y CMakeLists intactos byte-idénticos; ctest **21/21** recompilado de fuente, tec_cache con conteos idénticos, resto 067 sin flips.
- Build OK; 0 warnings GCC UCRT64 local (baseline 15/13 = sandbox GLM); misleading `:4396` +0; TU2 difiere (código real), TU32 byte-idéntico (fuente intacta); LINK OK; exe no ejecutado.

## 11-12. Anclas + numeración

- Todas inmóviles por construcción (Δ=0 neto). Re-pin GLM post-fold.
- Drop **111** → veredicto **112**. Cero erratas conocidas (hashes pegados de git).
