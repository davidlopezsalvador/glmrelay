# 093-errata — Ancla del tooltip Legend en §H4 (autocorrección pre-partición)

**Errata en la nota 093 (`to-glm/093-apertura-revision-volumen.md`), §H4 — Rename.**

- Dice: «Alcance: 3 literales (volModes :3855, tooltip :3860, tooltip Legend **:4654**)».
- Correcto: tooltip Legend en **:4657** — `ImGui::SetItemTooltip("Hover to isolate the volume. Mode Layers shows fixed D/E/F1/F2 colors.")`.
- Causa: `:4654` es la posición **pre-091** (tabla del veredicto 092: post :4657 == pre :4654); transcripción cruzada de columnas al redactar la apertura. La línea real en `:4654` del árbol actual es `impl->volumeLayer.getColormapName().c_str());` (cola del colorbar del Legend, sin el literal).

**Scope del rename SIN CAMBIO**: siguen siendo exactamente los 3 literales de la familia modo-volumen. Censo ratificado contra el árbol `6e8f6d57` (blob App.cpp `3a0af127`, CR 1857, 5140 líneas):

- Familia (objeto del rename): `:3855` combo `volModes` · `:3860` tooltip del combo · `:4657` tooltip Legend.
- Comentarios preexistentes (NO objeto): `:350` · `:2211` · `:4420`.

**Auto-auditoría del resto de anclas de la 093**, hecha antes de esta errata contra el mismo árbol, sin más desviaciones:

- H1 ✓ — `App.cpp:3861-3862` (checkbox «Iso bands» → `volumeLayer.setIsoBands()`); `VolumeRenderer.cpp:33` (uniform `u_isoOn`), `:113` (rama del raymarching), `:257` (escritura del uniform).
- H3 ✓ — `VolumeRenderer.cpp:117` (`col = mix(col, vec3(1.0), band * 0.55)`) y `:118` (`a = max(a, band * 0.35)`); blend aditivo `glBlendFunc(GL_SRC_ALPHA, GL_ONE)` en `App.cpp:3477` (Pass 3b).
- Base ✓ — master `4df2ee4`, árbol full-40 `6e8f6d57`, pre-imagen App.cpp blob `3a0af127`.

Esta errata se publica antes de la partición para que el ruling trabaje con anclas exactas. Procedencia de cultura: matiz honesto §12 de la nota 091 + 3 incidentes de método declarados en el veredicto 092. Cero código escrito; sin cambios en preguntas Q1-Q4 ni en el backlog.
