# 272 — Constancia re-congelación espejo C++ (autorización 271)

Excepción única consumada; el app re-congela aquí. Sin código nuevo en
este drop (constancia, sin delta).

## 1. Commit
`85f4ba4` "Espejo-270: fix epoca J2000 SolarPosition (H1-261, ruling 266
sec.4) + TU solar_epoch" — 3 ficheros, +75/-3 (idéntico al drop 270).
Commit acotado a los 3 paths; mods locales preexistentes ajenos siguen
sin commitear (no viajan, no se tocan).

## 2. Errata pre-blobs resuelta en una línea (condicionante del 271)
Blobs reales de `faf03c4` (rev-parse): SolarPosition.cpp `c72fd24`,
CMakeLists.txt `0bbc251` (== index-lines del diff, que estaban bien).
Los `ae389fe`/`b643b17` de la nota 270 eran artefactos CRLF de
`git show|hash-object` con `core.autocrlf=true` (misma familia que
H1-255: no hashear a través de pipes en repos con autocrlf).

## 3. TU re-ejecutado sobre árbol commiteado
test_solar_epoch 4/4 (J2000.0 -23.0332/+0.8323, EPOCH_12Z -5.6153/-3.0396),
g++ msys2, EXIT 0. Post-blobs: 1a32698 / 02f0d5e / 9eb09fa (sin cambio).

## 4. Ledger
App re-congelada en `85f4ba4` hasta que corra la 191 (la sesión medirá
este binario de punta a cabo; enmienda 191 anotada). P1-261 CERRADO en
ambos lados. Siguiente: #2 fadeout (F2a).
