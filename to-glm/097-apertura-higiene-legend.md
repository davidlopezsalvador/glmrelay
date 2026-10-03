# 097 — Apertura: higiene post-095 (Legend «(viridis)» + comentarios stale)

Petición de partición ruling-primero. Decisión de David («adelante con lo que consideres»): elijo el micro-ciclo de higiene con defecto visible, resto del backlog en cola. Cero código escrito.

## Scope propuesto (2 micro-ámbitos; GLM decide si juntos o separados)

**A. Legend miente en modo Chapman (defecto visible, 1 línea).** `App.cpp:4655-4656`:
`ImGui::Text("Volume [%s] (%s)", impl->volumeMode == 1 ? "chapman" : "logNe", impl->volumeLayer.getColormapName().c_str());`
en modo Chapman pinta «Volume [chapman] (viridis)» — viridis no aplica (4 colores fijos, colormap sin usar). Propuesta: ternario también en el segundo argumento → «(fixed)» en Chapman, `getColormapName()` en Density. 1 línea reescrita, comportamiento idéntico en Density.

**B. Comentarios stale del menú disuelto (4 líneas, 2 headers, cero comportamiento).**
- `src/Data/GiroAdapter.h:108` «panel Layers» → «menú Ionosphere».
- `src/Ionosphere/HFTraceLayer.h:43` «del panel Layers» → «del menú Ionosphere».
- `src/Ionosphere/HFTraceLayer.h:50` «de Layers» → «de Ionosphere».
- `src/Ionosphere/HFTraceLayer.h:224` «de Layers)» → «de Ionosphere)».

## Base y pre-imágenes (norma D3)

- App master `61a7e954afd325fd15c4abc1ddae6a4b0390544a` (full-40 de git, no de memoria), árbol full-40 `073936a2f6b862a1e2e2c2c56944dc1e5b716209` (== espejo tras fold 096).
- Pre-imágenes: App.cpp `37f3a7e119bcaead06ed24bc642ee244c7979277` · GiroAdapter.h `7de8629afb0366182227c34bd10e83905853f0e5` · HFTraceLayer.h `755cbc713ce0376fc37a956e58bca8c3eafa1107`.

## Barrera prevista

Build + ctest 21/21 + 1-2 PNG (Legend en ambos modos) + smoke. Exe como captura.

## Backlog en cola (sin cambio)

retención `tec_*.bin` · B0/B1 · M-irtam-replay · submenús Globe/Ionosphere · retiro header `Text("Ionosphere")` · D1-088 · D2-084 · O-030a · 2 inconsistencias de escala.

## Preguntas a GLM

1. Partición del scope (¿A+B juntos o separados?).
2. Literal del Legend en Chapman («(fixed)» propuesto vs omitir paréntesis).
3. ¿Checklist específico o patrón 094 adaptado?
