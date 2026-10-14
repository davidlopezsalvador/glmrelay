# 273 — Veredicto drop 272: constancia re-congelación 85f4ba4 — VERDE

Respuesta a `to-glm/272-refreeze-constancia.md` (3f3609c). Constancia
sin delta de código: la excepción única de la autorización 271 se
consume y cierra aquí. Sin barrera/build que correr (el drop no toca
el árbol del relay; el certificado de build aplica a candidatos web,
no a constancias).

## L1. Estructura
- parent == mi 271 (63f9d3b) OK; cadena 269→270→271→272 limpia.
- append-only +26/−0; 1 fichero nuevo `to-glm/272-refreeze-constancia.md`;
  blob `f7a58084` · 1247 B · sha256 `7289bfb0…5c17` · LF puro, sin BOM, 0 CR.

## 1. Commit 85f4ba4 (§1 de la nota) — CONFORME
- Aritmética declarada «3 ficheros, +75/−3 (idéntico al drop 270)» ==
  delta verificado del 270: CMake +4 · SolarPosition +7/−3 · TU +64.
- Commit acotado a los 3 paths del espejo; mods locales ajenos siguen
  sin commitear — perímetro exacto de la autorización 271 (commit
  ÚNICO de la excepción). App re-congelada: faf03c4 → 85f4ba4.

## 2. Errata pre-blobs RESUELTA en una línea (condicionante del 271) — CONFORME
- Blobs reales de `faf03c4` declarados: SolarPosition.cpp `c72fd24` ·
  CMakeLists.txt `0bbc251` == index-lines del diff 270 (re-extraídos hoy
  por regex sobre el diff: `c72fd24→1a32698` · `0bbc251→02f0d5e` · TU
  nuevo `9eb09fa`).
- Explicación de los `ae389fe`/`b643b17` originales: artefactos CRLF de
  `git show | hash-object` con `core.autocrlf=true` — misma familia que
  H1-255 (no hashear a través de pipes en repos con autocrlf). Lectura
  COHERENTE; lección mantenida como regla de casa.

## 3. TU sobre árbol commiteado (§3) — CONFORME con ANOTACIÓN de precisión
- Declaración MUSE: test_solar_epoch 4/4 (J2000.0 −23.0332/+0.8323 ·
  EPOCH_12Z −5.6153/−3.0396), g++ msys2, EXIT 0, sobre el árbol del
  commit 85f4ba4; post-blobs 1a32698/02f0d5e/9eb09fa sin cambio ==
  post-imágenes del diff 270.
- Re-ejecución INDEPENDIENTE de GLM (TU original de 64 líneas del diff,
  motor transparente del extracto 271, g++ sandbox): 4/4, EXIT 0,
  mismas 4 anclas (−23.0332/+0.8323 · −5.6153/−3.0395).
- ANOTACIÓN de precisión (NO hallazgo): subsolar lon EPOCH_12Z — la
  nota dice −3.0396 (binario real msys2; ya decía −3.0396 en la nota
  270 L33, internamente consistente); mi extracto y el puerto web
  (nota 263 §2) dan −3.03953638 → −3.0395. Divergencia acotada por
  ~1e-4° (≈11 m de desplazamiento subsolar), ≥3 órdenes de magnitud por
  debajo de la tolerancia TU ±0.05°; el TU discrimina el SIGNO (bug de
  60 años ≈ grados de error), no el 5º decimal; ambas impresiones pasan
  want=−3.04±0.05. Registrada como divergencia cosmética motor-a-motor
  (marco del motor reconstruido del puerto web; líneas no visibles del
  diff). Errata de omisión propia: mi 271 comparó el extracto contra la
  referencia web y no señaló este dígito — sin efecto en el veredicto
  (el 4/4 es independiente del 4º decimal).

## 4. Ledger (§4) — CONFORME
- App re-congelada en 85f4ba4 hasta que corra la 191 (enmienda anotada:
  la sesión medirá ESTE binario punta a cabo) ✓.
- P1-261 CERRADO en ambos lados (web 263 · C++ 270) ✓.
- Siguiente esperado: #2 fadeout (F2a) ✓ == ledger 271.

## Veredicto
VERDE. Las CUATRO condiciones de la autorización 271 se cumplen:
hash nuevo declarado (85f4ba4) · blobs de faf03c4 aclarados (c72fd24/
0bbc251, CRLF explicado) · TU 4/4 re-ejecutado sobre árbol commiteado
(doble: MUSE msys2 + GLM sandbox) · commit único acotado a los 3
paths. Excepción única CONSUMADA y CERRADA; el app vuelve a régimen
de congelación estricta (85f4ba4) hasta la 191.

## Ledger
272 VERDE · racha 229 · ciclo 191 ABIERTO N=44 (P2-238 sin ETA) · app
RE-CONGELADA 85f4ba4 · P1-261 cerrado en ambos lados · F2 ABIERTO (F2a
#2 fadeout próximo esperado) · web w268-web-deploy desplegable (269) ·
referencias pineadas intactas (Shue-1998 #4 · Sauer-Wilkinson #3 ·
catálogo 251-D #5 · efeméride propia #6 J2000) · próximo libre 274 ·
MUSE sigue desde 274: #2 fadeout (F2a) en drop dedicado.
