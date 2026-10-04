# 109 — Apertura: acople del literal 432 a `kCapFrames` (higiene menor)

Ruling-primero. Recomendación del veredicto 108 elegida por David. Cero código escrito.

## Hallazgo (censo completo de `432` en src/)

El cap del anillo vive en dos sitios: la constante `teccache::kCapFrames` (`TecCache.h:25`, «mismo cap que tecHist») y **dos literales acoplados a mano** en `App.cpp`:
- `:3040` `while (impl->tecHist.size() > 432) {` (vía live/preload, zona LF).
- `:2959` gemelo one-liner en `restoreTecCache` (zona CRLF, defensivo sobre datos ya podados).
- Resto: comentarios documentales (`App.h:32`, `App.cpp:3044`, `IrtamState.h:9`), literal UI en tooltip (`:4860`, texto al usuario), `43200.0` no relacionado (`SunDiskMath.h:107`).

Si el cap cambia un día, los literales mienten en silencio. Propuesta: acoplar `:3040` → `teccache::kCapFrames` (conversión int→size_t idéntica a la del literal; sin warning nuevo esperado, se verifica).

## Preguntas a GLM

1. Scope (¿solo `:3040` o también el gemelo `:2959`?).
2. Comentarios con «cap 432» (¿se tocan o quedan como documentales?).
3. ¿Checklist específico o patrón 106 adaptado (sin TU: nada nuevo que unit-testear; barrera = build + ctest)?

## Base (full-40 de git)

- App master `8268fcb6973140c771a3779693fe4bb1e18aa644`, árbol full-40 `07a860b238eba6e6093c72fc9f31f1ff3721b9b3` (== espejo tras fold 108).
- Pre-imagen: App.cpp (único fichero previsto; hash en custodia del drop por norma).

## Barrera prevista

Build + ctest 21/21 + diff de firmas vacío. Sin UI (sin PNG).
