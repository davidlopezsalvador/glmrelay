# 125 — Candidatura F2 ejecutada (código, 3 ficheros)

Partición 124 ejecutada tal cual (cruce analítico + checklist). Commit app `7c4a4ee..2d6bc4d` (3 ficheros, 213+/1-).

## 1-3. Custodia + pre-imágenes + tree gate (D3)

- Delta `to-glm/files/menu125_delta.txt` (10758 B, sha256 `eda8082c4a1e741a47c1f6b40a2392be43336566c345e5e1897d4c790e984bd4`, `From 2d6bc4d23115c0756ec4cd85bcefdddf9f368341` copiado byte a byte de la cabecera — norma errata-095, 3 ficheros, sin BOM).
- Pre-imágenes (de la apertura, verificadas por GLM): App.cpp `f1c0b31b…` · LayerProfile.h `02ad433d…` · DensityVolume.h `5cd1a076…` · VolumeRenderer.cpp `6cea1b1b…`.
- **Árbol post-drop full-40: `c6c742ff731695661e2ff154d6f584eb8b4ae0ee`** — fold en rama propia sobre `muse-base-085` @ `3d17d9c`, debe cerrarlo EXACTO.
- Blobs post (full-40 de git): LayerProfile.h `1cc88859048f7e9ddfa2411d0e3a6b5ddc1f8a0e` · test_layer_winner.cpp `1772611e6d0bc1812eb97cf609f9623c852664b4` · CMakeLists.txt `ceb239b851c3040e6fd24f5ab083b04ea67043bc`.

## 4-5. EOL + multiset (+ incidente detectado pre-push)

- Helper y gate en zona CRLF con CRLF; TU nuevo y CMakeLists LF en zonas LF. **CR neto 0** (verificado por fichero contra blobs).
- **Incidente EOL detectado y reparado pre-push** (misma clase que 117A): el stage inicial congeló CRLF de checkout en `LayerProfile.h` (diff espurio 211/192). Normalizado a convención LF del blob; diff final exacto: LayerProfile.h 20/1 · test 190/0 · CMakeLists 3/0. Causa habitacional, no de edición (los mismos scripts no alteraron ningún otro EOL).
- Multiset: removed 1 (línea gate) / added 20 (helper 19 + gate); test y CMake puros añadidos. Cero pares movidos salvo el gate; cero blancos.

## 6. Contenido (solo etiquetas; `best` intacto por construcción)

- `f2FloorKm(p)`: NINGUNO (-1.0f) sin hasE · early-out `NmE ≤ NmF2 → hmE` (NeF2(hmE)≡NmF2 exacto, cero cómputo) · scan 1 km con `max()` para el sup · Epstein replicado 1:1 con comentario de sincronía.
- Gate estricto `hKm > floor` (no `>=`): E gana su propio voxel pico — exigido por los pines 110→E del ruling.
- `vol.data`/`best` intocados estructuralmente (el gate solo guarda `win=3`); DensityVolume/VolumeRenderer/App intactos.

## 7. TU (63 checks, 0 FAIL) + tabla de suelos (producción)

- Estructurales exactos: early-out ==hmE, NINGUNO -1, noche todo-F2, sin-E F2@60, día 75→D/110→E/260→F2/300→F2, continuidad B0±2 ≤15 km, invariante best bit-idéntico en barrido 4×12 vs réplica del max() viejo.
- Suelos medidos con `f2FloorKm` real: P1 110.0 · P2 110.0 · P3 110.0 · P4 -1.0 · P5 110.0. Mapas post: P1 `001333…` · P2/P3 `0011333…` · P4 `333…` idéntico · P5 `00113333233…` (sliver F1 intacto).

## 8. Barrera

Build OK (header recompila dependientes); 0 warnings GCC UCRT64 local (baseline 15/13 = sandbox GLM); ctest **22/22** (21 + layer_winner); LINK OK; exe reconstruido post-amend y re-verificado.

## 9. Evidencia visual (4 PNG, 1360x768 operador, sin tEXt/iTXt/zTXt) + declaración parcial honesta

- `menu125_pre_chapman.png` (306046 B, sha256 `ad1a351741d645c771fddd3e3e9957232568b4e258958ac5799043ad1767f594`): ANTES — día, Chapman, op 1.0, iso OFF, monocromo (binario pre-fix).
- `menu125_day_chapman.png` (203461 B, sha256 `3abf0ff3465b928f353d9431e8d7dfa1a8d8de8cdd882d47cc3df5c1ef408eb4`): DESPUÉS — día, Chapman, op 1.0, iso OFF (binario con fix).
- `menu125_day_density.png` (261242 B, sha256 `6749f85e11046a9e064be63d55138ab628714a568c8d4c8b639599dd94077983`): control Density mismo encuadre.
- `menu125_night_consistency.png` (330476 B, sha256 `e585dc7da942873f206c2cfe8aaee07988ab53c9fbf55c3df2759608deced763`): noche + aurora OFF sin verde (consistencia: o era aurora, o noche correcta).
- **Declaración parcial**: las etiquetas están probadas (código+TU+mapas+byte-gates); la cebolla nítida NO se distingue en estas capturas — el alfa ∝ d² suprime D/E tenues y a opacidad alta todo satura (análisis con números en el hilo). Follow-up propuesto (nuevo ciclo, a adjudicar): diseño de alfa por capa o retoque de wording; la puerta visual queda pendiente y declarada, no asumida.

## 10. Anclas (desplazamiento +19 bajo chapmanAlpha; resto inmóvil)

Re-pin GLM post-fold. EN re-auditado: 0 literales no-EN nuevos en el diff.

## 11. Numeración

Drop **125** → veredicto **126**. Reserva 118/120/122 intacta para veredictos 117A/C/B.
