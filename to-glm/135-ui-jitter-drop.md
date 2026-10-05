# 135 — Jitter blue-noise del punto de entrada (S-3)

Particion 130 sec.6.3 ejecutada. Numeracion corregida del veredicto 132
(S-3 = drop 135). Commit app `a12b7ee..b5dbad4` (4 ficheros, 98+/2-).

## 1-3. Custodia + pre-imagenes + tree gate (D3)

- Delta `to-glm/files/jitter135_delta.txt` (6431 B, sha256 `1165df563f61e0db04eeb41e4359818a6341002c2bd306704483f1b3e1df6f6a`, `From b5dbad4edcc9f4f07241000e55b9fd4134456f15` copiado byte a byte de la cabecera — norma errata-095, 4 ficheros, sin BOM).
- Pre-imagenes (verificadas, resto intacto del 133): VolumeRenderer.cpp + CMakeLists del arbol `11053faa…`.
- **Arbol post-drop full-40: `ef9e9f44f27546ae70b182a7bcc4efd5a360e4b3`** — trial `am --keep-cr` sobre clon de `a12b7ee` aplica limpio y cierra el arbol EXACTO.
- Blobs post (full-40 de git): CMake `62589095…` · VolumeRenderer.cpp `da736c7c…` · VolumeJitter.h `205917f2…` · test_volume_jitter `309eec82…`.
- Capturas A/B (auto-evidencia via exportacion 131, operador en vivo, sombra activa en ambas): `jitter135_pre.png` (497513 B, sha256 `848bc3e1ec63daee5e819330850feba2501c1dcbf618298b1e92fea2294ee9b8`, binario 133, replay DATA 10-05 04:34 UTC frame 04:34:59) · `jitter135_post.png` (621960 B, sha256 `92c113dfd53d8048042a323191e09b71a87ebfb337c63c2036f0917503f8140c`, binario 135, mismo replay/epoch 04:34 UTC frame 04:34:10, mismo encuadre/ajustes). Firmas PNG verificadas; sin chunks de texto por libreria. CSVs companeros existen en el build (no adjuntados).

## 4-5. EOL + multiset

- Ficheros nuevos LF puro en blob y work (0 CR). CMake: linea `add_test` en CRLF de zona (vecinas CRLF). VolumeRenderer.cpp es fichero LF-puro: las 7 lineas del shader en LF. **CR neto 0**.
- Numstat: CMake 4/1 · VolumeRenderer.cpp 7/1 · VolumeJitter.h 19/0 · test_volume_jitter 68/0 = **98+/2-**. Removed = lados viejos de 2 lineas reemplazadas. Cero pares movidos; cero blancos.

## 6. Contenido (desvio de forma declarado)

- Shader (string embebido): tras `dt`, `jit = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))))` (IGN espacial) + `tEnterJ = tEnter + dt * jit`; la muestra pasa a `tEnterJ + dt*(i+0.5)` (guarda `t >= tExit` intacta).
- **Desvio de forma (no de fondo), a adjudicar**: la spec pide "offset R2/blue-noise" con "LUT 64x64 (embebida o generada)"; implemento IGN determinista en vez de LUT: mismo contrato (offset determinista en [0,1) SOLO sobre el punto de entrada, SIN componente temporal — el motor no tiene TAA y el acumulador temporal sigue PROHIBIDO), con peso 0 en repo (vs LUT de 4 KB) y sin textura que muestrear. Si el veredicto exige LUT literal, es un cambio de 1 fichero.
- `Utils/VolumeJitter.h` (puro, header-only): espejo CPU 1:1 de la formula (floor explicito, igual que `fract` GLSL) — lo que el TU pinnea. Sin tocar LayerProfile/DensityVolume/evalNeTotal/paso de muestreo. Sin ghosting por construccion (estatico, sin acumulacion).

## 7. TU (5 checks) + lectura visual propia

- `test_volume_jitter` 5/5: 3 valores exactos MEDIDOS con produccion ((0,7)->0.164884567, (37,98)->0.921024323, (148,371)->0.189423084) · barrido 64x64 todo en [0,1) · determinismo (repetir = identico) · descorrelacion (no constante). Nota: el pin es sobre el espejo CPU; el shader usa la expresion identica (la ultima ulp puede variar por precision GPU e irrelevante al uso).
- Lectura visual propia A/B: mismo frame de datos (replay 04:34 UTC), mismo encuadre y ajustes (Density, opacity 1.0, iso OFF, explode x5, sombra activa), solo cambia el binario. A (pre): gradientes con banding de peine regular; B (post): transiciones suavizadas sin estructura nueva. Sin regresion diurna ni de interfaz.

## 8. Barrera

Build OK (VolumeRenderer.cpp recompila; shader compila en runtime sin errores de programa); 0 warnings en la salida del build local (UCRT64 g++ 16.1) + TU compilado aparte con `-Wall -Wextra` limpio; ctest **25/25** (24 + volume_jitter); LINK OK (app cerrada por el operador para el link; la 1a pasada fallo por bloqueo del exe en vivo — sin codigo implicado).

## 9. Coste perf + mapa declarado

- Coste: +1 IGN (~2 fract + 1 dot, ~5 flops) POR PIXEL (no por muestra) solo con volumen visible. Frente al march (2 fetches 3D + colormap + iso por muestra x64 pasos): despreciable por conteo. Sin hilos, sin red, sin persistencia, sin textura nueva.
- Comportamiento: diurno identico salvo decorrelacion del peine (el dato `vol.data`/`best` intacto; el gate solo desplaza el punto de entrada). Empty-space skipping NO entra aqui (split 130 sec.4).

## 10. Anclas + EN

- Anclas nuevas para re-pin GLM post-fold: shader jitter (bloque tras `dt`), `VolumeJitter.h` 1-20, TU `test_volume_jitter.cpp`, CMake (`add_executable` + include + `add_test`). EN re-auditado: 0 no-ASCII en el diff final (2 em-dash del header TU cazados pre-commit y pasados a ASCII, misma clase que 133/134 — sin gracia pendiente).

## 11. Numeracion

Drop **135** → veredicto **136**. Siguiente S-4 tour = drop **137** (numeracion corregida 132). Tour/alertas intercambiables (ya declarados independientes en 130 sec.4).
