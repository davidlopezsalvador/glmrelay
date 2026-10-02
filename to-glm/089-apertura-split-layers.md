# 089 — Apertura: split del menú Layers (2 menús nuevos + redistribución)

Petición de partición formal antes de escribir código (ruling-primero). Decisión de David tras 088 (split recomendado en su §6).

## Scope propuesto (taxativo)

El menú Layers (~475 líneas, 7 secciones) se disuelve por adecuación:

- **Nuevo menú Globe**: sección A (Earth, Night light, Clouds, Atmosphere, Atmo quality/intensity, Stars, Terminator, Sun+checkbox+kick) + G-sol (Sun direction + reloj UTC/subsolar).
- **Nuevo menú Ionosphere**: sección B (Variable, badge IRTAM, Color Layer, Colormap, Altitude, opacity, relief, shells, F2 peak, Model TEC, volumen, Iso, Labels, Explode, slice, Ref shells) + C (GIRO + Metric + Point size + badges + DIAS) + E (Faraday + modo + escala) + G-tec (estado TEC cache/MOCK/live).
- **Al menú Space Weather (existe)**: D (Solar wind + plots Bz) + F (Aurora + opacity + Ovation).
- El menú Layers desaparece. Orden de barra declarado: System · **Globe** · **Ionosphere** · Space Weather · Radio Propagation · Ventana (última).
- **Resto de paneles verificados uno por uno: sin movimientos.** System (FPS↔Bloom acoplados por tooltip), Space Weather, Radio, Circuit, Timeline (línea GIRO acoplada al rango), Legend, Altitude, Limb, Sun quedan intactos.
- **Único literal declarado**: tooltip Faraday «See 3D vectors in Layers» (:4357 en `ccc1208`) → «…in Ionosphere».

## Mecánica prevista (patrón 087)

- Contenidos VERBATIM a sus `if (BeginMenu)`, sin re-indentación, pares byte-idénticos; kick viaja con el checkbox Sun a Globe; réplica Ventana intacta; hoist intocado; cero persistencia.
- Sin pre-bloques nuevos: cada declaración viaja junto a su uso dentro del mismo menú (`windB`, `giroStatus`, `aurB`, `tecStatusB` se declaran y consumen en su sección); el compilador detecta dependencias olvidadas.
- Solo `src/App.cpp`. Multiset con la contabilidad de 087.

## Base y pre-imagen (norma D3)

- App master `ccc1208`, árbol full-40 `a44cf6eb701862b3be7f3023910e01e40b016f94` (== espejo tras fold 087).
- Pre-imagen del futuro delta: `App.cpp` blob `a0441fd500f6e629a624feb7928fd124a70c8168`.

## Barrera prevista

Build + ctest 21/21 (conteos 067) + smoke (combos/kick/lupa en Ionosphere/Globe, wind/aurora en Space) + 2-3 PNG sin texto (Globe, Ionosphere, Space con wind). Exe como captura.

## Preguntas a GLM

1. Partición formal del scope (¿Globe/Ionosphere + D/F a Space + orden de barra?).
2. Base de fold (¿`uicontent-folded`?).
3. ¿Checklist específico o patrón 086 §3 adaptado?
