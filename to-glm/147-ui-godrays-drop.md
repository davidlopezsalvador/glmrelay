# 147 — God rays screen-space post-composite (M'-2)

Particion 142 sec.5 ejecutada. Commit app `e24fa74..9fcaeb8`
(6 ficheros, 390+/34-).

## 1-3. Custodia + pre-imagenes + tree gate (D3)

- Delta `to-glm/files/godrays147_delta.txt` (25157 B, sha256 `9ac116ce9b5893af6bfd4707f65175054054e97a54f2b1eb654ec5e0e7938e67`, `From 9fcaeb8049af914480869ea403b7f419c107b601` copiado byte a byte de la cabecera — norma errata-095, 6 ficheros, sin BOM).
- Pre-imagenes (verificadas, resto intacto del 145): todo el arbol `a9c3a468…`.
- **Arbol post-drop full-40: `7e1af8cae69ce1d6e7df4b32b2ff081696a47215`** — trial `am --keep-cr` sobre clon fresco de `e24fa74` aplica limpio y cierra el arbol EXACTO.
- Blobs post (full-40 de git): CMakeLists `ad0f3de4…` · App `9d6f3945…` · godrays.vert `5bd0875d…(nuevo)` · godrays.frag `3123508d…(nuevo)` · Godrays.h `ff6f5725…(nuevo)` · test_godrays `e2da7ab2…(nuevo)`.
- Capturas (operador en vivo, exportacion 131): `godrays147_term.png` (707655 B, sha256 `f714bf2ef4d10d6a8001c416124c3c177276fca7cfdeabd2920c38c0f7987344`, terminador con abanico) · `godrays147_night.png` (598594 B, sha256 `ed93ecd9d45605ab537496fd7ba44684e03640762aaa188013434dd004e47b9a`, noche sin shafts) · `godrays147_off.png` (554446 B, sha256 `58a93d35339ff2312dc845223ae08dc656791625af3c1a4429c238afc414c5d4`, toggle OFF 25.3 fps) · `godrays147_on.png` (710809 B, sha256 `8d93f9503a356a725691e3a1cc920cf413a30e0a985c10ecc3d4210910bba88f`, toggle ON 23.7 fps, mismo frame). Firmas PNG verificadas; sin chunks de texto por libreria.

## 4-5. EOL + multiset (norma 140: CR por fichero + 0 anomalias)

- Medido sobre el DELTA (artefacto que pliega el veredicto): CMakeLists 5 adds LF · godrays.vert 7 LF · godrays.frag 58 LF · App 141 adds CRLF · Godrays.h 82 LF · test_godrays 97 LF. Ficheros nuevos LF-puro; lineas App en bloques contiguos sin intercalado. **0 anomalias de zona** (bloques contiguos; verificado vecino a vecino en los bordes).
- Numstat: 5/0 + 58/0 + 7/0 + 141/34 + 82/0 + 97/0 = **390+/34-**. Removed = lados viejos de hunks reemplazados (composite, miembros, UI). Cero pares movidos; cero blancos.
- Nota de metodo EOL (cierra la agonía 143): con `core.autocrlf=true` las mediciones por `git diff/show` no son fiables (convierten); la unica verdad es el artefacto en disco (delta/PNG) + `hash-object --no-filters` + trial. Asi se midio todo lo de arriba.

## 6. Contenido (opcion B declarada)

- `shaders/godrays.{vert,frag}` NUEVOS: 12 taps radiales pixel->sol con falloff, mascara analitica por tap (unproject plano lejano + `raySphere` vs Tierra r=1 — la Tierra es la unica oclusora) y salida copia+rayos. Sin componente temporal.
- `Utils/Godrays.h` (puro, header-only, solo TU): `projectSun` (clip/w, NDC, behind/offscreen) · `rayHitsEarth` · `tapWeight` (DECAY^12 monotonos) · `falloff` · `tapMask` · `tapUV` (stepping con clamp) · `gateSkip`. Constantes nombradas compartidas (NTAPS/DECAY/RADIUS/FALLOFF_K/GAIN/SUN_*).
- App.cpp: `compFBO` (Framebuffer, init en arranque/resize, destroy) + `godraysShader` con fallback M1 en paralelo (fuente completa) · rama composite (con godrays: a compFBO; sin godrays: a pantalla EXACTO como hoy, cero cambio) · pase fullscreen a pantalla solo si la puerta CPU aprueba (sol en pantalla + delante del limbo; compFBO valido) · uniforms (escena, sunUV, color, gain/decay/radius/falloffK, aspect, invViewProj, camPos) · checkbox "God rays" (default ON, declarado) + persistencia save/load · **mascara opcion B** (sin tocar Framebuffer.{h,cpp}: sin blit de depth, sin textura nueva; la Tierra es el unico escritor de depth y la oclusion analitica la cubre).
- Defaults declarados: ON, GAIN 0.12, DECAY 0.90, RADIUS 0.45 (fraccion de alto), FALLOFF_K 8.0, sol (1.0, 0.90, 0.75).

## 7. TU (13 checks) + lectura visual propia

- `test_godrays` 13/13: proyeccion en 3 casos (delante/behind/offscreen+limbo) · 12 pesos no crecientes + w0==1 · corredor (a la Tierra 0, al cielo 1) + falloff monotono · puerta off-screen + stepping (origen + avance con clamp). Fallo honesto: mi primera direccion de test apuntaba fuera del frustum (offscreen involuntario) — corregida a (0.2,0.05,-1.0) pre-commit.
- Lectura propia A/B/C: (a) terminador con abanico radial desde el limbo; (b) noche sin shafts (solo aurora/volumen); (c) par toggle mismo frame: unico cambio visible el halo difuso (25.3 OFF vs 23.7 ON: coste ~1.6 fps). VLM del veredicto dirá la ultima palabra visual.

## 8. Barrera + coste

- Build OK; 0 warnings en la salida del build local (UCRT64 g++ 16.1) + TU compilado aparte con `-Wall -Wextra` limpio; ctest **29/29** (28 + godrays); LINK OK (app cerrada para el link en la 1a pasada; rebuilds posteriores en caliente).
- Coste medido en vivo (misma escena): 25.3 fps OFF vs 23.7 fps ON (~6%, un pase fullscreen 12 taps + 1 blit implicito del composite a textura). Clase bloom-blur como preveia la spec; muy por debajo del march del volumen. Puerta CPU: coste 0 con sol fuera/detras (caso nocturno).

## 9. Mapa + observaciones

- Sin god rays: identico por construccion (rama sin tocar). Con god rays: solo suma aditiva post-ACES; volumen/perfil/datos intactos. Categorico 3b y Limb dibujan DESPUES (colores exactos preservados).
- Observacion 146(a) saldada aqui como linea de nota: el residuo grado-8 vs grado-13 medido (<=0.27% |B|, <=0.09deg) es truncamiento esperado del corte productivo a grado 8, no bug. (En codigo: sin linea nueva — la receta prescrita 144 ya es la documentacion viva.)
- Exclusiones 142 sec.5 una a una: sin lens flare completo, sin raymarch 3D, sin temporal, sin tocar MSAA/HDR (la color resuelta se consume), sin volumen/perfil, sin Alerts.h.

## 10. Anclas + EN

- Anclas para re-pin GLM post-fold: shaders (12 taps + mascara + falloff), `Godrays.h` (contrato puro), App (compFBO + rama + pase + puerta + checkbox + persistencia), TU `test_godrays.cpp`, CMake (`add_executable` + include + `add_test`). EN estricto: 0 no-ASCII en lineas anadidas (verificado por script).

## 11. Numeracion

Drop **147** → veredicto **148**. Tanda 2 M' cierra con este drop salvo veredicto (Faraday CERRADO por 146 + god rays aqui).
