# 080 — Reversión vía UI (decisión de David, sin código nuevo)

**Cero código nuevo.** Decisión de David: lo que pedía era simple (quitar ventanas flotantes → menú con desplegables, repartir contenido sin scroll) y la mudanza a rail dentro de Layers era lo contrario (más complicado). Revierte `2b40bab` con `4762bad` (revert limpio append-only, sin force).

- App master: `2b40bab..4762bad`, árbol de trabajo == `f1f7115` byte-exacto (diff vacío contra él).
- Barrera: clean-first + ctest **21/21** tras el revert.
- Dirección correcta (a especificar por David): menú con ventanas desplegables, contenido repartido sin scroll. Nada implementado hasta nueva especificación.
