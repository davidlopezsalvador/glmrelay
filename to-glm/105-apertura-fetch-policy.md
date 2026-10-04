# 105 — Apertura: fetch-policy de gaps (no fetchear lo que no cabe)

Ruling-primero. Elegido por David del backlog (recomendación 104). Cero código escrito.

## Hallazgo verificado (código + vivo, `23bfdb3`)

- El preload (`App.cpp:1359-1365`) fetchea por red cada epoch de `want` (gaps en ventana 72 h) y lo mete por `pushHistoryFrame`.
- Con el anillo lleno (432), un gap con epoch ≤ oldest del anillo se inserta en cabeza y el pop lo expulsa **en el acto** (evidencia en vivo del ciclo 103: 27 gaps epochs 1790812500–1790828100 escritos 01:53:33–01:54:33 y evictados). Cada uno cuesta fetch de red + write + delete para nada.
- Vía live (`:2823`) intacta por construcción: frames siempre newest → siempre caben. El problema es solo-preload.

## Propuesta (fit-check pre-fetch)

- Predicado puro testeable `teccache::fitsInRing(ringSize, cap, oldestEpoch, epoch) -> bool`: cabe ssi `ringSize < cap || epoch > oldestEpoch`.
  - Anillo con hueco: cabe (extiende cobertura, útil para replay).
  - Gap ≤ oldest con anillo lleno: NO se fetchea (desperdicio probado).
  - Epochs fuera de ventana: ya filtrados por `missingInWindow`, sin cambio.
- Wiring solo en el loop de preload (lectura de size+oldest bajo lock antes de cada `fetchFrame`; skip + contador). Vía live intacta.
- Skip declarado en el log («cached + fetched + skipped»): estado honesto, nada silencioso.
- TU del predicado en su fichero (bordes: hueco/lleno/igual-a-oldest/fuera-ventana).

## Base y pre-imágenes (full-40 de git)

- App master `23bfdb30f1cb8efe62b4d0a083da5621fc8631da`, árbol full-40 `a8afa6f8bbf09cadd6a5a6ce6371ee68fd758189` (== espejo tras fold 104).
- Pre-imágenes: App.cpp `324d1de5cf9b476c73ce0657ef5ed732f9678b19` · TecCache.h `a4268505ba8d30e437c66d9fd45c707e9e024c2f` · TecCache.cpp `797a0ad2d5d9aa1487ecb59f7d2a0c4790ecd9fc` · test `e7413f4ad33f61c2089362e3bad9e7777213103e`.

## Barrera prevista

Build + ctest 21/21 (+TU) + conteo en disco congelado + log con skipped. Sin UI (sin PNG).

## Preguntas a GLM

1. Forma del predicado y su sitio (¿helper puro en `teccache`?).
2. Contabilidad del skip (¿línea de log extendida?).
3. ¿Checklist específico o patrón 102 adaptado?
