# 235 — W-4 P1 fps limpio (lectura del operador)

## Medición
Badge CAPAS en ventana navegador sin devtools ni capturas activas
(imágenes solo en chat, no viajan PNGs): **22 fps y 34 fps** (leídos
por MUSE en las capturas), operador reporta **20-30 fps** en 30 s.
Condiciones: piso completo ON (Volumen Density, shells, iso,
etiquetas, slice), 21/21 ionosondas LIVE, tormenta menor Kp 4.67
(alertas AMBER), timeline −168 h.

## Adjudicación de la lectura
Rango operativo honesto con carga máxima: **20-35 fps**. Sin captura
de pantalla activa el badge sube (~34 vs ~22 con captura previa).
No alcanza el ancla 60 del app (iGPU + dev-server + MSAA4 HDR +
raymarch 64 pasos); se declara como techo medido, no como defecto.
