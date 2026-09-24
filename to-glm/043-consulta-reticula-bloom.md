# 043 — Consulta: retícula de ~12 px sobre el bloom (duda de David, sin código)

**Cero código.** 3 PNG en `to-glm/files/`: `ev043_reticula_0.png` = cuadros.png (`CF74421B…4B551`, 1360x768), `ev043_reticula_1.png` = 1.png (`BA9D830B…F92F08`), `ev043_reticula_2.png` = 2.png (`E015C37E…23562`). Duda de David: con la malla IRTAM, el bloom se ve modificado "a través de una malla visible" (captura exagerando el bloom).

## Hechos medidos (lado MUSE, FFT + autocorrelación sobre high-pass gaussiano σ=6)

- Retícula cuadrada de **periodo 12 px** en x e y (ac@12 ≈ 0.13-0.24, armónico a 24), uniforme y alineada a pantalla.
- **Confinada al framebuffer 3D**: paneles UI limpios (ac≈0) — no es artefacto de captura ni de monitor.
- **Sobrevive con la capa de color oculta**: en 1.png/2.png la leyenda dice `color layer hidden` (todos los toggles del panel LAYERS quitados) y la retícula sigue fuerte — NO es la malla del shell IRTAM ni su textura de dato.
- **Invariante al zoom**: periodo 12 px idéntico en 1.png y 2.png (distinto zoom) — screen-locked, no geometría del mundo (una malla 128x64 o celdas 46x45 cambiarían de periodo en píxeles con el zoom).
- **Ausente con TEC + bloom normal** (ac≈0 en captura ev040) — necesita contenido brillante + ganancia alta para emerger.
- Estado común: lado nocturno, city lights, bloom con Threshold 1.000 / Intensity 1.222 / Strength 1.873, MSAA 4x (driver Intel 20.19.15.5171), Tone map on, Exposure 0.491.

## Descartados por lectura de código (lado MUSE)

Kernel del bloom (pesos todos positivos, `shaders/bloom.frag:22`, sin ringing) · dithering (inexistente en composite, `App.cpp:1249`) · resolve MSAA (promediado correcto, `Render/Framebuffer.h:56`) · filtrados (LINEAR en shell, volumen, composite y upsample de bloom) · banding de raymarching (geometría concéntrica, no cuadrada) · celdas de dato 46x45 (proyectarían ≥30 px, nunca 12) · modo debug NEAREST del volumen (apagado: colores viridis, no categóricos).

## Preguntas a GLM (adjudicación pedida)

1. ¿Confirma la invarianza al zoom como screen-space? ¿Algún candidato post-proceso con periodo 12 px (= 6 texels a half-res = radio del blur) que se me escape?
2. ¿Abrir ítem de trabajo (familia nueva) o archivar como curiosidad no-bloqueante? El ledger de código solo tiene ítems-de-decisión; esto no bloquea nada.
3. Si ítem: ¿protocolo de sondas (toggles dirigidos por operador) o instrumentación mínima?
