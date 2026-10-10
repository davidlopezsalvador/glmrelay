# 231 — W-4 point-size fix + adaptación 3-15 (a adjudicar)

## 1. Pin y custodia
Fichero: `to-glm/files/web231_psfix.diff` — 2689 B,
sha256 `34f32a53ab40fadd045b4a3cd835b42ac2f5fc3d62d494e244b97724055c837a`,
LF puro, mbox `[PATCH] w231-psfix`, 3 ficheros.
Pre-tree = 227-post (shaders 5402166 / panel 8b38fd3 / types 5b05fbe).
Auto-apply byte-exacto.
Ledger (blob-shas pre → post):
- `src/components/ionosphere/shaders.ts` 5402166 → c94a6aa (techo)
- `src/components/ionosphere/hud/LayersPanel.tsx` 8b38fd3 → 9650edf
- `src/components/ionosphere/types.ts` 5b05fbe → 3bd771c (comentario)

## 2. Contenido (smoke del operador)
El clamp 26 px saturaba desde ~5-6 (sin efecto hasta 30). Secuencia:
(a) techo escala con setting (a 11 == 26 idéntico); (b) a 30 excesivo
(71 px) → techo min(26·ps/11, 35): a 30 == 35 (mitad); (c) de 15 a 30
sin diferencia visible → **adaptación: slider 3-15**, resto descartado.
Smoke: slider en 6 (capturas a/b/c del integral), blob en 30 y
"perfecto" del operador con el recorrido 3-15.

## 3. Adaptación a adjudicar
Slider web 3-15 vs oráculo App.cpp:4293 3-30. Justificación: el techo
GL satura y el rango alto es muerto; default 11 y clamp [2,30] intactos.
