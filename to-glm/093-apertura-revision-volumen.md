# 093 — Apertura: revisión del render volumétrico (modos, iso, rename)

Petición de partición ruling-primero. Origen: capturas del operador (Density vs Layers «similares», Iso sin efecto con volumen apagado) + lectura de código SIN cambios. Cero código escrito.

## Hallazgos verificados (código, `4df2ee4`)

- **H1 — Iso solo-volumen POR CONSTRUCCIÓN**: `isoBands` solo alimenta `volumeLayer.setIsoBands()` (`App.cpp:3861-3862`) → solo el uniform `u_isoOn` del shader volumétrico (`VolumeRenderer.cpp:33,113,257`). Ninguna otra capa lo implementa. El tooltip «Works in both volume modes» = ambos modos DEL VOLUMEN. Lo observado es conducta de diseño, pero con trampa UX: checkbox vivo con efecto invisible si el volumen está apagado.
- **H2 — Similitud entre modos a baja opacidad**: esperable por construcción — alfa ∝ d²; con Volume opacity ~0 el volumen es casi invisible y domina la shell TEC (opacity 0.727 en las capturas). Los modos solo divergen con el volumen visible (barrido + lado día pendientes).
- **H3 — Candidato blowout (a verificar)**: con opacity 0 + iso ON, el shader fuerza `a = max(a, band*0.35)` + mezcla blanca 0.55, acumulado aditivo (`GL_ONE`) hasta 256 pasos → lavado cian-blanco (captura 4). Sin adjudicar: ¿intencionado o defecto de acumulación?
- **H4 — Rename**: «Layers» como modo de colorear confunde con el menú disuelto. Propuesta: **«Chapman»** (los 4 colores son ramas Chapman D/E/F1/F2). Alcance: 3 literales (`volModes` :3855, tooltip :3860, tooltip Legend :4654).

## Backlog nuevo (registrar)

- B-iso-scope: checkbox Iso deshabilitado si volumen off (+ nota en tooltip).
- B-modes-similar: verificación controlada (barrido opacidad 0→1 en ambos modos + lado día).
- B-iso-blowout: verificar acumulación aditiva con iso (opacity 0 + iso ON).
- (Existentes) rename modo-volumen, retención `tec_*.bin`, B0/B1, M-irtam-replay.

## Base y pre-imagen (norma D3)

- App master `4df2ee4ec3dbec472240e8a608b6b08496e3a303`, árbol full-40 `6e8f6d57b3b26ca0d6ca55a47a24354a5ae64cfc` (== espejo tras fold 092).
- Pre-imagen del futuro delta: `App.cpp` blob `3a0af12767d5c4b02ab86b2583d8c02cb638081b`.

## Barrera prevista

Build + ctest 21/21 + capturas controladas (barrido opacidad en ambos modos, lado día, iso ON/OFF) + smoke. Exe como captura.

## Preguntas a GLM

1. Q-iso: ¿diseño ratificado + micro-fix (disable si volumen off)?
2. Q-similar: ¿metodología de verificación propuesta (barrido + día)?
3. Q-blowout: ¿verificar y adjudicar acumulación aditiva?
4. Q-rename: ¿«Chapman» + scope 3 literales?
