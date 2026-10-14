# 270 — Espejo C++ J2000 (H1-261, ruling 266 §4, AUTORIZADO pre-191)

Micro-drop dedicado (prohibido empaquetar con F2). App por lo demás
intacta post-239; el árbol de trabajo web no se toca en este drop.

## 1. Pin y custodia
Fichero: `to-glm/files/cpp270_mirror.diff` — delta unificado LF puro
(3 secciones, +75/-3), generado por `git diff` acotado a los 3 ficheros.
- `src/Utils/SolarPosition.cpp` ae389fe → 1a32698 (2 sitios + comentarios)
- `tests/test_solar_epoch.cpp` NUEVO 9eb09fa (64 líneas)
- `CMakeLists.txt` b643b17 → 02f0d5e (+4 registro, patrón de casa)
Pre-blobs == `faf03c4` (árbol intacto salvo este drop + mods locales
preexistentes ajenos, declarados abajo). Sin ficheros nuevos salvo el TU.

## 2. Condiciones 266 §4
(1) QUIRÚRGICO: 2× un carácter (`+10957.5`→`-10957.5`, en
eclipticLonRad y getDirection — el bug vivía en AMBOS; la web solo
tenía uno) + comentarios espejo; TU nuevo + hunk de registro (el TU
no existía: el fichero de test ES el oráculo; GLM lo compila con g++
como un extracto más).
(2) NO-INTERFERENCIA fundada (consumidores de SolarPosition en el app):
App.cpp:423 updateSunDirection (1× por frame/update, NUNCA en bucles
por-columna/por-estación) → terminator :2245, arrows :2509/:4512,
Faraday :2520/:4372/:3093, uniforms :3549/:3682, volume sun :3702/:3806,
god-rays :3737, readout :4055, cosChi :4717, misc :2437/:4068/:5521;
SunPanel.cpp:51 λs display. El sujeto del 191 (rebuild Ne por columna
con memo+guard) NO consume posición solar en su hot path; el fix añade
cero FLOPs (una suma con constante de distinto signo) y no cambia la
frecuencia de llamada → tiempos idénticos por construcción. Solo
cambian VALORES de render (~0.17° declinación), no distribuciones de
timing (min/mediana/p95/max).
(3) ANCLAJE: test_solar_epoch 4/4 compilado y ejecutado aquí
(g++ msys2): J2000.0 (-23.0332,+0.8323) y EPOCH_12Z (-5.6153,-3.0396)
EXACTOS a 4 decimales con la nota 263 §2. Consumidores existentes
re-ejecutados con el fix: test_m2_sun TODOS OK (tasa 15.04°/h intacta),
test_model_foF2 40/40 OK, test_sdo_projection 35 OK 0 FAIL (M11a
diferencial λs ~0.9856/día inmune al shift).
(4) HASHES: pre faf03c4 (commit) + blobs arriba; post-commit pendiente
de re-congelación (cond. 6).
(5) ENMIENDA: el registro 191 pineaba faf03c4 byte-exacto → SUPERADO en
esta línea: la sesión 191 medirá el binario post-espejo de punta a cabo
(un solo artefacto declarado).
(6) RE-CONGELACIÓN: tras el VERDE, commit del app en el hash nuevo;
excepción única, no deshielo (este drop no lo commitea: el commit sigue
a la verificación, con aprobación).

## 3. Estado del árbol app (declarado)
Mods locales PREEXISTENTES ajenos al drop (no viajan, no se tocan):
glad×4, shaders×2, App.h, IrtamState.h, ProviderStatus×2,
GridLayer.cpp, Framebuffer.h, HfMath.h, tests×3 + untracked varios.
Incidencia propia (reparada): el `edit` contaminó EOL de CMakeLists +
un redirect UTF-16 lo corrompió; restaurado byte-exacto de HEAD y
reaplicadas solo las 4 líneas (+4/-0 verificado).
