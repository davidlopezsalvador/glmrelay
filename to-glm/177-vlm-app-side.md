# VLM addendum 177 — lado app archivado + lado web pendiente de renderer

## Lado app (operador, EN MANO)
- `to-glm/files/vlm177_app-shell.png` (903 KB) + `vlm177_app-TEC.csv` (TEC 72x72, `tov_epoch` 1791376310 = DATA 12:31:50Z; captura 12:35:04Z).
- Observado: volumen logNe viridis + glow calido a la derecha (lado diurno ESE) + aurora + estaciones + link HF; "GIRO-live: degraded"; god-rays evidently ON (criterio: glow presente).
- Pasa a ser COMPARABLE (ruling 176): bumps reubicados por diseno + fondo invariante.

## Lado web (pendiente de renderer capaz)
- Bloqueo raiz CAZADO en este ciclo: el sandbox NO hidrata React (0 claves fiber en h1, 0 elementos canvas, 0 requests de texturas, UI SSR viva sin errores, estados siempre null). Sin hidratacion no hay efectos/fetch/canvas: ningun pixel es capturable aqui (loader eterno explicado al completo).
- Añadido: el ZIP demo no trae `public/textures` (escena sin montar jamas aqui; throwaway locales usados y borrados, nunca shipeados).
- Procedimiento vigente: ventana tranquila LGDC + texturas presentes + 1 tab + before/after en misma ventana de cache; init-script descartado (rompe navegacion en agent-browser 0.38.2).
- Criterio 177 (nota del drop) intacto y sin mover: geometria + OFF==pre-177 estructural + velo por diseno + tolerancia 8-bit pre-declarada.
