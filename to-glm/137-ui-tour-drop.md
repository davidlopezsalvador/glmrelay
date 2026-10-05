# 137 — Tour didactico con overlays ES/EN (S-4)

Particion 130 sec.6.4 ejecutada tal cual (keyframe cola + timer + toggle,
sin narracion, sin waypoints dinamicos, camara libre intacta, i18n solo
tour). Commit app `b5dbad4..7021504` (4 ficheros, 252+/1-).

## 1-3. Custodia + pre-imagenes + tree gate (D3)

- Delta `to-glm/files/tour137_delta.txt` (14576 B, sha256 `11cd83045593f2323d2cf1c293bb8c4fab76ac4e9ff0056e1850a025f25cd3c3`, `From 7021504269b11a024f12e485a07b58dfe9928f7a` copiado byte a byte de la cabecera — norma errata-095, 4 ficheros, sin BOM).
- Pre-imagenes (verificadas, resto intacto del 135): App.cpp + CMakeLists del arbol `ef9e9f44…`.
- **Arbol post-drop full-40: `4c68dd7fad15ed610c277387f52dc711f339b002`** — trial `am --keep-cr` sobre clon de `b5dbad4` aplica limpio y cierra el arbol EXACTO.
- Blobs post (full-40 de git): CMake `b1337bfa…` · App `2183b1bd…` · Tour.h `25634e5d…` · test_tour `4a67d407…`.
- Capturas (operador en vivo, exportacion 131): `tour137_stop2.png` (670874 B, sha256 `8242c0d39cb9ec5c3c4d2c81e91ef43460b4180fbffe64b8e64d5bc683f3d4d1`, overlay ES Stop 2/4 + camara movida) · `tour137_menu.png` (694230 B, sha256 `e433ea0ed9b43d460d273385047db8863e8cd4b7531b03a3dc388f2c01449260`, checkboxes + tooltip) · `tour137_stop1_en.png` (577565 B, sha256 `998f328014c9b8875d32a5e399dfcd8c1fb5ebc75c9fc902d7d64b3fee32952c`, overlay EN Stop 1/4). Firmas PNG verificadas; sin chunks de texto por libreria.

## 4-5. EOL + multiset

- Ficheros nuevos LF puro en blob y work (0 CR). App.cpp: 0 lineas LF en zona CRLF (censo por-linea: todo lo anadido lleva CRLF de zona); resto de zonas intactas. **CR neto 0**.
- Numstat: CMake 3/0 · App 62/1 · Tour.h 73/0 · test_tour 114/0 = **252+/1-**. Removed = 1 lado viejo (include). Cero pares movidos; cero blancos.

## 6. Contenido (cola pura + wiring fino)

- `Utils/Tour.h` (puro, header-only, sin GL/red/estado): cola de 4 tramos con waypoints continuos (terminador 12 s -> anomalia 12 s -> aurora 10 s -> tormenta 10 s; total 44 s) · `eval(t)` con suavizado smoothstep intra-tramo · `advance(reloj, dt, listo)` (solo suma con dato listo) · textos ES/EN completos por tramo (i18n limitado al tour).
- App.cpp: campos `tourOn/tourSpanish(true)/tourT/tPrev` · tecla T (flanco, sin colision: globales eran C/H/E/+-) con reinicio a t=0 + hint · abort por click L/R/M fuera de UI (la camara se queda donde esta: salida sin salto por continuidad; smoke del operador: "la camara no salta") · drive por frame (`advance` con `tecLayer.getGrid().valid` + `eval` -> rotateY/distance; rotateX del usuario intacto) · auto-salida al completar (hint "TOUR COMPLETE", camara coherente) · overlay "Guided tour" (Stop i/4 + texto segun idioma + salida) · checkboxes System ("Guided tour (T)", "Tour en espanol" default ON). Sin persistencia (sesion, como cinema). Arranque con snap a W0 declarado (el spec solo exige salida sin salto).
- Sin tocar la camara libre existente (solo se escribe rotateY/distance mientras corre). Sin narracion/audio. Sin waypoints dinamicos.

## 7. TU (24 checks) + smoke del operador

- `test_tour` 24/24: cola (4 tramos, 44 s, durs) · curva en 5 puntos (t=0/t=6 smoothstep 0.5/t=12 frontera/t=44/t=99 done) · pausa sin dato · 8 textos exactos (ES completos sin ingles + EN espejo).
- Smoke operador: tour arranca con T (overlay Stop 1/4) · avanza solo (Stop 2/4 a ~25 s) · abort por click sin salto · overlay EN verificado visualmente (Stop 1/4 en ingles).

## 8. Barrera

Build OK; 0 warnings en la salida del build local (UCRT64 g++ 16.1) + TU compilado aparte con `-Wall -Wextra` limpio; ctest **26/26** (25 + tour); LINK OK (app cerrada por el operador para el link).

## 9. Coste perf + mapa declarado

- Coste: 0 por frame sin tour; con tour: 1 `eval` (~10 flops + 4 punteros a texto) + 1 ventana ImGui pequena. Despreciable.
- Comportamiento: sin tour, identico por construccion (todo el codigo nuevo esta tras `if (tourOn)` salvo 2 checkboxes de menu). Camara libre intacta fuera del tour.

## 10. Anclas + EN

- Anclas nuevas para re-pin GLM post-fold: `Tour.h` 1-60 (cola/curva/avance), App campos + flanco T + abort/drive + overlay + checkboxes, TU `test_tour.cpp`, CMake (`add_executable` + include + `add_test`). EN re-auditado: 0 literales no-EN nuevos salvo los 4 textos ES intencionales (i18n del tour por spec; ASCII sin tildes, estilo de comentarios existentes). Literales EN y asserts ASCII.

## 11. Numeracion

Drop **137** → veredicto **138**. Siguiente S-5 alertas = drop **139** (numeracion corregida 132). Tour/alertas intercambiables ya ejercido (tour primero).
