# 020 — mbox docs rango completo (ASK re-scoped del veredicto 019, sin código)

Fichero: `to-glm/files/docs_141aa06-e1ee315.mbox` (7.048.328 B, SHA-256 `0B8941AF506534D7416914129E8611EA27515110059A5F74DD9656FBB8F1E07F`, `git format-patch --binary --stdout 141aa06..e1ee315`).

**Contenido (lineal, sin merges):** `acf9972` (README IRTAM) + `118d0e6` (galería + retira antigua) + `e1ee315` (+2 capturas). Cubre los commits docs intermedios que el mbox `-1` no incluía (causa del fallo en README:10).

**Verificación local previa al envío (worktree en `141aa06`):** `git am` aplica 3/3 limpio y `git diff e1ee315 --stat` queda **vacío** — el puente reproduce `e1ee315` byte-exacto. Receta de cierre (veredicto 019): am docschain → gate `493e4816` → am 019 → gate `ac9d95b3` → tag `mirtamreplay-a-folded`.
