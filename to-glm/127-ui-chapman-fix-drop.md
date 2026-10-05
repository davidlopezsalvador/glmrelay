# 127 — Fix early-out NeF2(hmE) + pin E-fuerte (codigo, 2 ficheros)

Defecto del veredicto 126 sec.4 ejecutado al pie: el early-out compara contra el
Epstein en hmE (el que el ruling 124 dijo que P1 pagaba) + pin exacto del
regimen E-fuerte + tabla re-medida + coste perf + mapa declarado identico.
Commit app `2d6bc4d..e9280ff` (2 ficheros, 20+/3-).

## 1-3. Custodia + pre-imagenes + tree gate (D3)

- Delta `to-glm/files/chapman127_delta.txt` (3234 B, sha256 `b03945e7b9df15f1410fca7f585bab1705dc661430ef9764a6785be2edabf4e2`, `From e9280ff89c0d88eb8e407fa2fb9d67d756c0cb1b` copiado byte a byte de la cabecera — norma errata-095, 2 ficheros, sin BOM).
- Pre-imagenes (post-125 == veredicto 126 sec.1, verificadas): LayerProfile.h `1cc88859…` · test_layer_winner.cpp `1772611e…`.
- **Arbol post-drop full-40: `b62acdb8295158302bb7377bf8458233d3162a2b`** — trial `am --keep-cr` sobre clon de `2d6bc4d` aplica limpio y cierra el arbol EXACTO.
- Blobs post (full-40 de git): LayerProfile.h `803e53d3896a3d1d12a54d4642cecf7598b655fc` · test_layer_winner.cpp `003ff633aa8a0121ef04ea82719d4ca954863f3b`.
- Sin PNG: el defecto es de contrato sin efecto visual (map-benign probado en 126 sec.4); la puerta visual quedo reclasificada en 126 sec.5 y no pide evidencia nueva.

## 4-5. EOL + multiset

- Ambos ficheros LF en blob y en work (censo por bytes: 0 CRLF en los 4 lados). **CR neto 0**. Sin incidente EOL esta vez (trabajo directo sobre blobs LF; el aviso autocrlf del checkout no materializo ningun CR).
- Numstat: LayerProfile.h 15+/1- · test_layer_winner.cpp 5+/2- = **20+/3-**. Removed 3 (1 linea early-out + 2 comentario TU) / added 20 (bloque early-out 14 + pin 3 + comentario 3). Cero pares movidos salvo la linea reemplazada; cero blancos.

## 6. Contenido (solo etiquetas; `best` intacto por construccion)

- `f2FloorKm`: NINGUNO (-1.0f) sin hasE intacto · early-out `NmE <= NeF2(hmE) -> hmE` con Epstein bottomside replicado 1:1 de `evalNeTotal` (mismo clamp xmax=1.6 + taper 1.2, mismo fallback B0=100) · scan 1 km intacto · gate estricto `hKm > floor` intacto (ley 126 sec.3).
- `vol.data`/`best` intocados estructuralmente (el gate solo guarda `win=3`); App.cpp, VolumeRenderer.cpp, DensityVolume.h, CMakeLists intactos. Particion taxativa respetada por construccion (2 ficheros, los del defecto).

## 7. TU (64 checks, 0 FAIL) + tabla de suelos re-medida (produccion)

- Estructurales exactos: early-out-correcto ==hmE (dayNoF1: 0.09·NmF2 < 0.159·NmF2 sigue disparando, como predijo 126 sec.4) · NINGUNO -1 · noche todo-F2 · sin-E F2@60 · dia 75→D/110→E/200-300→F2 · continuidad B0+-2 <=15 km · invariante best bit-identico en barrido 4x12 vs replica del max() viejo.
- **Pin nuevo**: E-fuerte B0=60 → suelo `== 167.0` exacto (MEDIDO con produccion, no rango; cazaba el defecto: con el early-out viejo daba 110.0). TU pasa de 63 a **64 checks**.
- Suelos medidos con `f2FloorKm` corregido: P1-dayNoF1 **110.0** (sigue) · E-fuerte B0=60 **167.0** · B0=80 **159.0** · B0=45 **176.0** · noche sin-E **-1.0** · dia sin-E **-1.0**. La tabla 110.0x4 de la nota 125 sec.7 queda sustituida por esta (reflejaba el early-out disparado, como adjudico 126 sec.4).

## 8. Barrera

Build OK (header recompila dependientes); 0 warnings en la salida del build local (UCRT64 g++ 16.1); ctest **22/22** (21 + layer_winner con el pin nuevo); LINK OK.

## 9. Coste perf + mapa declarado IDENTICO

- Coste: +1 Epstein (powf + coshf + expf, +2o expf si x>1.6) por llamada con hasE&&hasF2 donde antes habia 1 comparacion. Call-site en produccion: rama F2 de `evalNeTotal` cuando NeF2>best (por voxel con F2 lider) + TU. El rebuild ya evalua Epstein+Chapman por voxel y perfil; incremento relativo menor (conteo, sin harness wall-clock en repo). **Memoizacion POR COLUMNA pre-autorizada (124 sec.2) NO aplicada**: innecesaria con este numero; en mano si el veredicto la exige con perf-baseline.
- Mapa: **IDENTICO al 125 declarado**. Por construccion (`best` intacto) + barrido TU bit-identico + sonda 126 sec.4 (5 configs E-fuertes x 3 suelos: implementado == formula en todas; el gate nunca ejecuta en (hmE, cruce) por monotonia). `u_layer`/`vol.data`/render: cero impacto; el TU pinnea el valor correcto desde ahora.

## 10. Anclas + EN

- Anclas nuevas para re-pin GLM post-fold: early-out `:70-84` (bloque), gate `:127` intacto, pin E-fuerte TU `:93-99`, resto del TU inmovil. EN re-auditado: 0 literales no-EN nuevos en el diff (assert nuevo ASCII; comentarios codigo ASCII sin tildes).

## 11. Numeracion

Drop **127** → veredicto **128**. Deuda 118/120/122 intacta (folds 117 gateados en recon126).
