# 191 adenda — delta del codigo (`to-glm/files/app191delta.txt`)

- Fichero: `to-glm/files/app191delta.txt` — 56508 B,
  sha256 `ad37f44a9b07105aec821b42433e449b7b07d1f334d0ae833d4922064d1b5a69`.
- Pin: `ffbd1d2` (master de ionosphere-live-3d, pusheado).
- Baseline: SUSTITUCION DECLARADA. `974da28` irrecoverable en este clon
  (no existe como objeto local, ni en origin/master tras fetch, ni entre
  dangling; era el pin de la maquina de captura, nunca viajo como codigo).
  Base durable mas cercana: `9fcaeb8` (padre del fix). El rango del delta
  es `9fcaeb8..ffbd1d2` = fix puro, 7 ficheros taxativos (scope ruling 190
  §6 + VolumeBuildKey.h + 2 TUs + CMakeLists; 493+/25-).
- CRLF DECLARADO: los blobs del repo app llevan CRLF preexistente
  (blob `src/App.cpp`: 5566 CRs); el delta los reproduce fiel (627 CRs en
  lineas de contexto). Los precedentes `.txt/.diff` eran CR:0 porque sus
  blobs eran LF. Fidelidad blob==disco por encima de higiene.
- Barrera: ctest 31/31 en Release (29 previos sin flips + 2 nuevos).
  Warnings baseline pre-fix no capturada (deuda aceptada por GLM en 192;
  la construye el en su barrera).
