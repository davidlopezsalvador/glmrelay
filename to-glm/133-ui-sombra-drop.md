# 133 — Sombra dura del planeta en el volumen (S-2)

Particion 130 sec.6.2 ejecutada tal cual (dura, sin penumbra, cosChi
conservado, sin tocar perfil ni paso de muestreo). Veredicto 132 registrado:
numeracion corregida S-2 = drop 133. Commit app `e061f13..a12b7ee`
(6 ficheros, 127+/3-).

## 1-3. Custodia + pre-imagenes + tree gate (D3)

- Delta `to-glm/files/shadow133_delta.txt` (10735 B, sha256 `002359eb588483a6adccb53396272c93dff902cb503c587e895b40715886e714`, `From a12b7ee440bf7451963110e3cd2d9d49c6ff4064` copiado byte a byte de la cabecera — norma errata-095, 6 ficheros, sin BOM).
- Pre-imagenes (verificadas, resto intacto del 131): VolumeRenderer.cpp/h + App.cpp + CMakeLists del arbol `cb607b60…`.
- **Arbol post-drop full-40: `11053faa819f21a90e646e607ff8c1b278d12efd`** — trial `am --keep-cr` sobre clon de `e061f13` aplica limpio y cierra el arbol EXACTO (warnings quoted-CRLF de zona, esperados).
- Blobs post (full-40 de git): CMake `796220dc…` · App `b163c27f…` · VolumeRenderer.h `61aa108b…` · VolumeRenderer.cpp `32c6a7e8…` · VolumeShadow.h `9ba99763…` · test_volume_shadow `fd59091b…`.
- Capturas A/B/C (auto-evidencia via exportacion 131, operador en vivo): `shadow133_day.png` (443587 B, sha256 `c6497a61ad468beb04159709b8ddce5fc5e3aaf218f9048b4f794a676e7410bb`) · `shadow133_terminator.png` (436931 B, sha256 `bb73df4522d9e0ab73bb3cdc2339efad5c9404e7f8657a970fd835aed2eefdde`) · `shadow133_night.png` (419173 B, sha256 `b53d2de178a2bdfb90f6ebe5915eb797344e26f5f113ed1cde6e81182a32dfa6`). Firmas PNG de 8 bytes verificadas; stb_write no emite chunks de texto por libreria. CSVs companeros existen en el build (no adjuntados).

## 4-5. EOL + multiset

- Ficheros nuevos LF puro en blob y work (0 CR). App.cpp: lineas anadidas en zona LF confirmadas por censo por-linea contra vecinos (2 bloques normalizados: el bloque escena venia CRLF y se paso a LF de zona; el resto ya venia LF). **CR neto 0**.
- Numstat: CMake 4/1 · App 7/1 · VolumeRenderer.cpp 11/1 · VolumeRenderer.h 3/0 · VolumeShadow.h 24/0 · test_volume_shadow 78/0 = **127+/3-**. Removed = lados viejos de lineas reemplazadas (1 en cada fichero tocado). Cero pares movidos; cero blancos.

## 6. Contenido (sombra multiplicativa; perfil intacto)

- Shader (string embebido en VolumeRenderer.cpp): `uniform vec3 u_sunDir` nuevo · tras `vec3 p = ro + rd * t`: test `raySphere(p, u_sunDir, u_innerR, sh0, sh1) && sh0 > 1e-4 -> sunShadow = 0.0` · `col *= sunShadow` + `a *= sunShadow` (emision extinguida; el `a=0` no acumula). Oclusor = esfera interior `u_innerR` (literal sec.6.2); frontera `1e-4` = luz (misma filosofia que el gate estricto 126).
- Plumbing: `VolumeRenderer::setSunDirection` + miembro `sunDir_` (default 0,0,1) + upload `u_sunDir` en `render()`; App fija `impl->sunDirection` (el mismo sol de earth/atmosphere) en ambos pases (escena + categorico).
- `Utils/VolumeShadow.h` (puro, header-only): espejo CPU 1:1 del test (misma b/c/disc, misma guarda) — lo que el TU pinnea.
- Dimming cosChi de CPU (DensityVolume) intacto y combinado (multiplicativo). Sin tocar LayerProfile/DensityVolume/evalNeTotal. Sin cambiar el paso de muestreo (steps_ intacto). Sin penumbra (dura, como M6).

## 7. TU (5 checks) + lectura visual propia

- `test_volume_shadow` 5/5: subsolar iluminado · antisolar en sombra · limbo iluminado (tangente sin interseccion) · frontera t0==0 -> luz · una sola transicion luz->sombra en barrido 0-180 grados (terminador geometrico).
- Lectura visual propia 4/4 (VLM literal): A dia (Africa/Europa brillante, volumen encendido = sin regresion diurna) · B terminador (gradiente dia-noche sobre Asia) · C noche (disco oscuro Australia sin velo del volumen cercano + anillo diurno al limbo = extincion cercana + lejano intacto). La 4a (duplicada de A a +9 s con hint EXPORT visible) prueba el tag de la 131 de paso.

## 8. Barrera

Build OK (VolumeRenderer.cpp + App.cpp recompilan; shader compila en runtime — sin errores de linkado de programa en el log); 0 warnings en la salida del build local (UCRT64 g++ 16.1) + TU compilado aparte con `-Wall -Wextra` limpio; ctest **24/24** (23 + volume_shadow); LINK OK (app cerrada por el operador para el link).

## 9. Coste perf + mapa declarado

- Coste: +1 `raySphere` (2 dot + sqrt) por muestra del march, solo con volumen visible. Frente a 2 fetches 3D + colormap + iso por muestra: incremento relativo menor (conteo, sin harness wall-clock en repo; perf-baseline confirma volumen ~2-3x de base). Sin hilos, sin red, sin persistencia.
- Comportamiento: lado diurno identico por construccion (sunShadow=1 donde no cruza); lado nocturno extinguido (el fenomeno que vende la entrada: F-region que decae tras el atardecer, verificable en replay). `vol.data`/`best` intactos (el gate solo multiplica emision del shader). Exclusiones sec.6.2 respetadas una a una.

## 10. Anclas + EN

- Anclas nuevas para re-pin GLM post-fold: shader sombra (bloque tras `vec3 p`), `u_sunDir` decl + upload, `setSunDirection` (.h + 2 call sites App), `VolumeShadow.h` 1-30, TU `test_volume_shadow.cpp`. EN re-auditado: 0 literales no-EN nuevos (asserts ASCII; comentarios codigo ASCII sin tildes).

## 11. Numeracion

Drop **133** → veredicto **134**. Siguiente S-3 jitter = drop **135** (numeracion corregida 132). Tour/alertas intercambiables (ya declarados independientes en 130 sec.4).
