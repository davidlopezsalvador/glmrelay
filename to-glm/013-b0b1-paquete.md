# 013 — Paquete B0/B1 (F2-B0B1-R1): par B0×B1 aditivo + visual 10/11 + oráculos

Fichero: `to-glm/files/b0b1delta.txt` (32.147 B, SHA-256 `DF3847D3A541A8DF2FA538E3D25D769296A3F464B558ED2A1AA7A9B89AD9C4A7`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit:** `141aa06` — `F2-B0B1-R1: par B0xB1 (kParams x4 + bundle aditivo + gate parejas + selector 10/11 + oraculos)`. Tree `c61f2c1a68b8fb53d733230c451ef382830dc37f`, padre `0319d3e` (ciclo traza). Titular (`git diff --shortstat`, lección 010): **11 files changed, 318 insertions(+), 29 deletions(-)**. Numstat: CMakeLists 1/1, App.cpp 104/14, Adapter.cpp 4/2, Adapter.h 12/5, Cache.cpp 16/0, Cache.h 7/0, Eval.cpp 26/0, Eval.h 12/0, test_adapter 17/5, test_grid_eval 96/2, test_cache 23/0 (= 318+/29- exacto).

## Ruling aplicado punto por punto (con 2 correcciones aceptadas)

- **Corrección 1**: coeffs con signo en nota — B0 **[−4894, +4613]**, B1 **[−299, +368]** (poblaciones: 1064 coeffs ASC por lado).
- **Corrección 2**: tripwires **B0 [−100, +400] km, B1 [−1, +8]** (población: ecos físicos; la envolvente del ruling queda citada, no re-derivada).
- **Q1**: `b0`/`b1` GridData al final del bundle; `valid`/`dataEpoch` solo F/H (cero escritura en foF2/hmF2).
- **Q2**: parejas — bloque F/H byte-idéntico (gate 1190 intacto); bloque B0×B1 mismo shape con `commonTovEpoch` (nuevo helper puro, testeado) + `evalPairGrids` (testeado incl. TOV desigual y basis no-standard). Fallo del par = b0/b1 ausentes, bundle publica con F/H.
- **Q3**: selector 10/11 ("IRTAM B0"/"IRTAM B1"), colormaps propios (B0=inferno, B1=plasma), B0 clamp-a-0 en copia display-only (crudo intacto), B1 lineal "[]", draw exige valid + presente. E9 intacto. G6: 0 literales nuevas (única URL en diff: `urlFor` sancionada preexistente).
- **Q4**: oráculos exactos cross-anchored con réplica GLM (población: punto ejemplo HOUR==TOV==12, ryear 2016.6): **B0 84.5733871 / B1 2.4862359** (±1e-5 rel, 7 dígitos iguales); grids **[43.249, 199.194] / [0.392, 5.708]** == rebanada hour=12 del ruling.
- **Q5**: kParams×4 param-major (foF2, hmF2, B0, B1); pacing intacto; tabla G10 del `.h` (384 req ≈ 96 min).

## Gates

- ctest global **20/20** (grid_eval 37/37: 13 checks B0/B1 nuevos; adapter 21/21: 384 + orden + b0/b1 vacíos; cache 32/32: 4 checks commonTov). TUs: 56. Warnings nuevos: 0 (App: solo baseline `-Wunused-parameter` GLFW preexistente).
- EOL: 152 CRs = App 144 + CMake 8 (ficheros CRLF-mayoritarios; ficheros LF +0). Sin ficheros nuevos en el drop.
- Anclas re-pineadas (solo desplazamientos +0/+41/+59/+79/+90 por inserción, poblaciones: líneas App.cpp): mergeKc2g def 357, restore call 1387, applyCL combo 1418, replay 1635, restore def 2496, applyCL def 2598, E9 3048, freshest 3305, setvbuf main.cpp:8. bloomThreshold/gitignore intactos.
- Tráfico: red idéntica salvo 2 params más por el mismo gate (cero primitivas nuevas).
