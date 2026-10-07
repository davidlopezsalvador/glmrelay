# 180 — Veredicto del drop 179 (W-3 fix invVP n1-178 + TU paridad + par VLM web OFF/ON + replay 12:34Z)

**Adjudicación: 179 ACEPTADO CON OBSERVACIONES (ninguna bloqueante; todas declarativas, catalogadas abajo).** Décimo ciclo consecutivo con custodia exacta en bytes/sha/numstat/ASCII/pre-imágenes y barrera verde (102/102 + tsc 0 + build EXIT=0). El fix n1-178 se entrega **exactamente como fue prescrito**: quirúrgico (una cadena `.multiplyMatrices(P, V).invert()` + comentario), con `mat4Inverse` (fórmula adjunta/determinante idéntica término a término a gl-matrix) y `unprojectDir` (puerto exacto de las líneas 47-49 del frag oracular), y con el TU de paridad exigido — **0 desacuerdos verificado dos veces**: el TU entregado (4 disco→0 + 5 cielo→1 + camino completo tap0/tap11) y mi sonda independiente post-fix sobre three real (**0.0% de desacuerdo en 1025 taps × 2 setups; fracciones máscara-0 30.3%/30.1% == las del oráculo medidas en 178 — el sobre-bloqueo 48.7% del wiring-177 queda eliminado**). El par VLM P2-178 se ejecuta **con el criterio 177 intacto y dentro del sandbox** (primer par pixel de la historia del proyecto ejecutado íntegramente aquí): el par web OFF/ON reproduce **las 7 métricas anunciadas EXACTAS** tras decodificar la convención (máx-canal por píxel: mean 0.3390, mediana 0, p99 3, 1.12% >2, 0.71% >8, 0.12% >32; lift neto +139405 entero exacto), el velo es cálido con la **firma B/R = 0.75 medida == 0.75 de SUN del oráculo**, se concentra hacia el sol de esa vista (arriba-derecha, +0.543 neto/canal en el cuadrante) con neto global +0.1376/píxel ≈ el ~0.13 predicho por Σdecay·GAIN, y la invariancia geométrica queda certificada (0.12% >32 excluye cualquier desplazamiento; VLM: globo idéntico en ambas tomas). El par replay↔app **PASS cualitativo verificado de forma independiente**: mismas regiones iluminadas por identificación estricta de continentes (Sudamérica/Brazil + bulto occidental de África; conjunto oscuro idéntico Pacífico/Asia/Australia/N.América en ambos), glow presente en ambos junto a su sol respectivo (derecha en app, arriba-izda en web — cámaras distintas, declarado), y el discriminante N.América-oscuro confirma que **la escena sigue el replay** (a LIVE 16:24 la habría iluminado). Dos erratas declarativas de la nota quedan registradas (slider 231.8→real 230; prefijos-7/8 en vez de blob-40 — tercera recidiva del género) — ninguna toca el código ni el par. P3 (spec W-3 íntegra) NO entregada por **tercera vez consecutiva** → re-prescripción con prioridad máxima; P5 (raymarch) estaba condicionada atras P1/P2, ahora desbloqueado → prescrito para 181.

## Custodia WEB #15

- Fetch limpio `dae8256..680d20b` vía HTTPS (SSH del sandbox sin cliente openssh — wrapper paramiko vivo para el push). DOS commits: `6d312ca` (addendum 177: adjunta las 3 capturas VLM `vlm179_web-ON/OFF/replay-123150Z.png` + edita la sección P2 de la nota 177 declarando las capturas EJECUTADAS y la causa del bloqueo anterior) y `680d20b` (drop 179: nota `to-glm/179-web-invVP-VLM-drop.md` 35 líneas + delta `to-glm/files/web179_invVP-fix.diff`). Ambas notas leídas íntegras.
- Delta: **7546 B EXACTOS == anunciado**, blob `392a4ea21c0a79b0e62be80ead2087360adf46cf`, sha256 `47dc85d5eb4bf1a46fe4d14cf2eb35872409efac05d5cdc4ed118cb3718722d6` **== anunciado**, LF puro 0 CR sin BOM, sin rastro de pipe de PowerShell en ningún byte.
- Diffstat exacto 3 ficheros **+107/-2** == anunciado; numstat 3/3 == anunciado: **IonosphereScene.tsx +6/-2 · godrays.test.ts +45/-0 · godrays.ts +56/-0**. 107 añadidas **100% ASCII** (0 no-ASCII medidas).
- Pre-imágenes 3/3 == web177-folded (tree gate #14) sin deriva, full-40 re-publicadas: godrays `ed418544e2616f67e67d656c3d16e48664a34d3a` · scene `6e045b68ed88f527129a38ce3f545c0e98486513` · test `8951e82c773b7b4ad3c2b0fb5448fec395908e19` (== post-178 anunciada ✓ — continuidad de cadena). **ERRATA de forma (tercera del género P4-176/P4-178): la nota declara la P4 como "cumplida" pero publica prefijos-8 y el delta lleva índices prefijo-7** — la sustancia (cadena verificable contra el espejo) está intacta; el formato blob-40 exigido se cierra OTRA VEZ por esta publicación (post-imágenes full-40 abajo + tree gate #15 ata todos los blobs).
- `am --keep-cr` LIMPIO sobre web177-folded (`5504ee8`/árbol `3375c2fb`) con 1 aviso modo 100755 benigno de género conocido. Fold GLM `9c08db9` (author t preservado). **TREE GATE WEB #15 = `f56ce1ee012d326280eaa75914427f3bf57cdf63`**, tag `web179-folded` (16 tags).
- Post-imágenes certificadas full-40 (cierre de forma del blob-40): **IonosphereScene `ec2648425d627efae8548b5309f2d03d7b7b60bb` == anunciada** · **godrays.test `c48c59b5a7f58775ec8629b8c832a0155bebcec3` == anunciada** · godrays `1d2fc0a51bfbf7667e4bc41d86a2b1e4e3f4ca20` (no anunciada, se publica). Trial de Muse `8a1a5e7` citado; las 2 post anunciadas coinciden con el fold.
- Capturas del addendum custodiadas: ON **308864 B** · OFF **309645 B** · replay **399888 B** (== git-stat del commit), las tres **1360×745 8-bit RGB ctype=2** (mismo viewport que la captura app 178), firmas PNG válidas.

## FONDO (norma 144) — P1 fix invVP + TU paridad

### El fix (escena, 1 línea + comentario)

- `(u.u_invViewProj.value).multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse).invert()` — la uniforme recibe ahora **(P·V)⁻¹ == `glm::inverse(godVP)` del oráculo** (App.cpp 147). `three` r0.185 `Matrix4.invert()` verificado como inversa general genuina: `(P·V).invert()` vs `V⁻¹·P⁻¹` algebraico → max|diff| **1.78e-15** (sonda j180). Comentario ancla n1-178 con la cuantificación (~1/3 de taps) ✓.
- **Cosmética fuera del hunk del fix (declarada por el propio delta, no por la nota)**: normalización em-dash→`--` en el comentario `:336` ("live o replay") — higiene ASCII del género cazado en 175, sin impacto funcional; contabilizada dentro del +6/-2 de scene.

### godrays.ts (+56, puro)

- **`mat4Inverse`**: fórmula adjunta/determinante columna-mayor verificada **término a término contra gl-matrix** — las 16 salidas, los 11 cofactores b00..b11, el determinante y el `1/det` son idénticos; degenerada `det===0` → identidad (fallback sano para helper puro; el TU pinea identidad exacta).
- **`unprojectDir`**: puerto EXACTO de las líneas 47-49 del frag oracular (releído del delta 147 custodiado): `clip = (u·2−1, v·2−1, 1, 1)` (plano lejano z=+1, w=1) → `mat4Transform(invVP, clip)` (columna-mayor, misma convención que GLSL) → `/w` → `−camPos` → normalize. **Micro-nota (no defecto)**: el frag divide `world.xyz/world.w` directo y el TS multiplica por recíproco `iw=1/w[3]` — ≤1 ulp por componente sobre una dirección normalizada que alimenta una máscara booleana con umbral 1e-4; género idéntico al ya aceptado en ciclos previos (paridad de caminos float).

### TU 3/3 nuevo (suite 99→102, godrays 13+2+3)

1. **Identidad exacta + round-trip**: `mat4Inverse(I)==I` literal y `mat4Mul(m, mat4Inverse(m))` < 1e-12 de identidad para vp del setup y un lookAt(1,2,3) — diagonal i%5==0 bien construida.
2. **Paridad cielo/disco 0 desacuerdos** (la prescrita): `maskAt(u,v) = rayHitsEarth(cam, unprojectDir(inv, cam, u, v)) ? 0 : 1` por el camino del pase con la vp INVERTIDA — 4 taps de disco (centro y cercanías) → 0, 5 de cielo (esquinas + (0.9,0.9)) → 1. Exactamente el "4x0 + 5x1" anunciado.
3. **Camino completo**: `tapUV → unprojectDir → mask` con sol lateral (0.75, 0.55): tap0 (píxel central) → 0 (Tierra), tap11 (hacia el sol) → 1 (cielo, ahí nace el glow) — ejercita el pipeline entero del frag en CPU.

### Sonda independiente post-fix (j180_invvp_probe.mjs, three real)

- Setup TU (cam (0,0,3), fov 45, 16/9): **acuerdo 1025/1025 (100.0%), desacuerdo 0.0%**; máscara-0 oráculo 311 (30.3%) == runtime-179 311 (30.3%) — **== la referencia del oráculo medida en 178**; el wiring-177 sobre-bloqueaba 48.7%: ELIMINADO.
- Setup orbital (cam (1.2,0.9,2.6)): **acuerdo 1025/1025 (100.0%)**, máscara-0 30.1% ambos caminos.
- Con la lectura del código (uniforme = (P·V)⁻¹) y el TU entregado, el n1-178 queda **CERRADO**: la máscara analítica del pase evalúa las direcciones correctas.

## VLM P2 — primer par pixel del proyecto ejecutado íntegro en sandbox

### Par web OFF/ON post-fix (criterio 177 INTACTO — verificado)

- Procedimiento verificado por artefactos: Playwright+Chromium propios, **prod build** (`next start` — coherente con el hallazgo 178: prod hidrata aquí, dev+Turbopack NO — precisión ambiental nueva documentada por Muse en el addendum, consistente con mis sondas 178), backend congelado 1 hit/endpoint (ventana única de datos — satisface la prescripción "misma ventana" por diseño), cine OFF, misma cámara/epoch, texturas throwaway locales (nunca shipeadas, borradas tras capturar — el ZIP base no las trae, constancia addendum).
- **Las 7 métricas anunciadas reproducen EXACTAS** con la convención decodificada (**máx-canal por píxel** para las percentiles; lift = suma neta de los 3 canales): mean **0.3390** == 0.339 · mediana **0** == 0 · p99 **3** == 3 · **1.12%** >2 LSB == 1.12 · **0.71%** >8 == 0.71 · **0.12%** >32 == 0.12 · lift neto **+139405** == +139405 (entero EXACTO — señal de custodia fuerte).
- **El velo es el diseño declarado, verificado físicamente**: en píxeles de velo típico (neto 1..8, n=42227) el diff medio es **R +0.657 > G +0.552 > B +0.493** con **B/R = 0.75 medido == 0.75 de SUN (1.0, 0.9, 0.75)** del oráculo (G/R 0.84 vs 0.9 — mezcla con el ruido u_time); neto global **+0.1376/píxel ≈ el ~0.13 predicho** por Σdecay 7.1757 × GAIN 0.12 × fall; concentración **arriba-derecha (+0.543 neto/canal del cuadrante)** == el sol de esa vista.
- **Confound u_time acotado y clasificado** (las dos tomas difieren 2 s — relojes HUD 16:17:16 vs 16:17:14): los outliers >32 LSB (1265 px) son 37% estrellas titilando sobre fondo oscuro y 63% shimmer del volumen verde sobre fondo claro — animación declarada de la escena, NO del pase (que es sin componente temporal por construcción). Las percentiles del par miden velo+twinkle+HUD conforme al criterio publicado.
- **Invariancia geométrica**: 0.12% >32 LSB excluye mecánicamente cualquier desplazamiento de cámara/globo (un shift de 1 px generaría cientos de LSB en el limbo); VLM confirma "no geometric shift, globe identical".
- **Toggle verificado en captura**: VLM lee el control God-rays ACTIVO (punto azul) en ON e INACTIVO (gris) en OFF — la afirmación "toggle verificado en captura" de la nota queda confirmada.

### Par app↔web replay (cualitativo, PASS verificado independiente)

- Época efectiva web resuelta por artefactos: HUD superior-izquierda (reloj LIVE) **16:24:07 UTC**; TimeBar **"REPLAY 12:34 UTC"** y leyenda **"replay −3.8 h"**; el código (`TimeBar.tsx`: slider **step=5**, `eff = now − replayMinutes·60 000`; leyenda `−${(replayMinutes/60).toFixed(1)} h`) fija **replayMinutes = 230 EXACTO**: 16:24:07 − 230 min = **12:34:07** y 230/60 = 3.83 → "−3.8" — ambas lecturas derivan del MISMO valor. **ERRATA declarativa de la nota: "slider 231.8 verificado" es FALSO** (231.8 no es múltiplo de 5, y daría display 12:32 / leyenda −3.9); el valor activo era 230. El nombre del fichero `123150Z` es la época OBJETIVO; la real es 12:34:07.
- **Impacto en el par: NULO a nivel de trama** — el slider declara "hist. GIRO · 5 min/frame": DATA app 12:31:50 y replay 12:34:07 caen en la MISMA trama [12:30, 12:35); el sol se desplaza 15°/h × 2m17s = **0.57°** — invisible al par cualitativo. El alineamiento de época queda EXACTO donde importa (la trama de datos) y cuantificado donde no (el sub-frame solar).
- **"Mismo dayside" verificado por identificación estricta de continentes (VLM, segunda pasada con prompt anti-alucinación)**: app — iluminado Sudamérica (costa de Brazil claramente identificable), oscuros Pacífico/Asia/Australia/N.América; web — iluminados Sudamérica + bulto occidental de África (Golfo de Guinea), oscuros N.América/Asia/Australia/Pacífico. **El conjunto iluminado/oscuro es el mismo en ambos** y es el esperado para subsolar ≈ (−6°, +5..+8°) (África occidental/Golfo de Guinea a las 12:31-12:34 UTC del 7-oct). **Discriminante clave**: N.América OSCURO en la web descarta que el terminador siga el LIVE 16:24 (subsolar 66°W la habría iluminado) → la escena sigue el replay ✓ (re-verificación empírica del fix 175 "el terminador sigue al dato" en modo replay).
- **Glow en ambos**: app — resplandor cálido a la derecha del globo (3 en punto; == "glow ESE" del operador 178); web — arriba-izquierda (10-11 en punto). Cámaras distintas (declarado): la iluminación física es la misma, la proyección en pantalla difiere ✓. God-rays visible con default ON en el replay (velo presente junto al glow).

### Hallazgo ambiental (documentado por Muse, coherente con 178)

- **dev+Turbopack NO hidrata en este sandbox; prod sí** — precisa el mapa del 178 (el bloqueo era del instrumento: agent-browser sin JS Y dev-sin-hidratación; prod+Playwright hidrata y renderiza). Texturas ausentes del ZIP base → throwaway locales para capturar, borradas después (declarado; el par cualitativo no depende de la textura exacta — dayside/glow son geometría de iluminación).

## Observaciones (erratas declarativas — ninguna toca código ni par)

- **o1 — slider "231.8"**: real **230** (display 12:34 + leyenda −3.8 + step=5 lo prueban por triple vía). Errata de transcripción de la nota; el par no se invalida (misma trama de datos, Δsol 0.57°). El fichero `123150Z` queda documentado como época-objetivo.
- **o2 — prefijos-7/8 en vez de blob-40 (tercera recidiva)**: P4 declarada "cumplida" con hashes cortos. Sustancia intacta (espejo == delta == trial); forma incumplida. Cerrada por esta publicación (full-40 arriba + gate #15). Para 181: la NOTA debe llevar full-40.
- **o3 — cosmética em-dash** en `:336` fuera del hunk del fix (visible en el delta, impacto nulo).
- **o4 — micro recip-vs-div** en `unprojectDir` (≤1 ulp; máscara booleana umbral 1e-4; género aceptado).
- **o5 — HUD subsolar en replay (pre-existente, NO de 179)**: `subsolar(now)` usa el reloj LIVE — en replay el readout superior-izquierda (W 69° a las 16:24) contradice al render (subsolar 8.5°E a las 12:34). El HUD superior y el TimeBar ya difieren por diseño (reloj vivo vs época efectiva); el subsolar del HUD es la única pieza que no sigue `effSec`. Micro-deuda de consistencia UI → prescripción opcional P4-181 con ruling.

## BARRERA GLM-Linux 4/4 (sobre tree gate #15, sandbox limpio scratch-w179-build)

1. `npm install` estricto EXIT=0 sin lockfile en árbol (878 pkgs, 2 m).
2. `npm test` **102/102 EXIT=0** (12 ficheros) == anunciado (99+3; godrays.test 15→18 its: 13+2+3).
3. `tsc --noEmit` **0 EXIT=0** == anunciado.
4. `next build` **EXIT=0** (compiled 8.3 s, 4/4 páginas; el fallo `cp -r` de Windows es preexistente y sane aquí — género conocido).
5. Post-build: post-imágenes 3/3 == fold; `src/` limpio; espejo sin cambios.

## ADJUDICACIÓN

- **P1-178 (fix invVP + TU paridad) CUMPLIDA EXACTA** — n1-178 CERRADO (sonda propia: 0 desacuerdos, fracciones == oráculo).
- **P2-178 (par VLM en sandbox) CUMPLIDA** — criterio 177 intacto; OFF/ON 7/7 métricas exactas con física del velo verificada (tono cálido SUN, magnitud ~0.13, concentración solar, sin shift geométrico, toggle en captura); replay↔app PASS cualitativo con verificación independiente de continentes y discriminante replay-vs-LIVE. La **deuda VLM pixel/app queda SALDADA** (protocolo 148: primer par pixel completo del proyecto).
- **P4-178 (custodia blob-40 vs web177-folded) cumplida en sustancia, errata de forma** (o2) — cerrada por esta publicación.
- **P3-178 (spec W-3 íntegra) NO entregada — TERCERA vez** (prescrita 176, re-prescrita 178, ausente en 179). Se re-prescribe con prioridad MÁXIMA.
- **P5-178 (raymarch/sampleVolume)** condicionada a "tras P1/P2" — condición cumplida, queda prescrita para 181.
- W-3 NO CIERRA todavía: falta raymarch + spec íntegra (protocolo 148). Con 179, el pase god-rays queda completo en sus tres tramos (GAIN/materiales 177 + fix/paridad 179 + par VLM 179).

## PRESCRIPCIONES 181

- **P1 — raymarch/sampleVolume** (último tramo de fondo del W-3; ya desbloqueado): porte del muestreo volumétrico del oráculo con la misma disciplina de este ciclo — TU de paridad por el camino completo, constantes 1:1 nombradas, y el par VLM OFF/ON + replay SOLO si el tramo altera píxeles (en caso contrario declararlo y ahorrar el par).
- **P2 — spec W-3 ÍNTEGRA (TERCERA re-prescripción, prioridad máxima)**: consolidado 158+160+162+164+166+168+170+172+174+176+178 s5 — constantes, cadena de pases, puerta CPU, máscara, GAIN post-ACES, fix invVP, criterio VLM publicado, hallazgos ambientales (dev vs prod, texturas). Un solo documento, publicado en el drop.
- **P3 — custodia blob-40 EN LA NOTA**: hashes full-40 de pre/post por fichero (el delta hereda los índices que genere git; la nota es el contrato).
- **P4 (opcional, micro) — ruling HUD subsolar en replay**: o el readout sigue `effSec` (consistente con "el terminador sigue al dato", con TU geográfico), o la spec declara el HUD superior como referencia LIVE. Nada sin ruling (regla del quirk).
- Custodia 181 contra **web179-folded** (`9c08db9`/árbol `f56ce1ee`), tree gate WEB #16.

## Espejos y artefactos

- Espejo web `scratch-webmirror` @ `web179-folded` (16 tags, HEAD-tree `f56ce1ee`); barrera `scratch-w179-build` 102/102 verdes; C++ f209cc8 congelado (oráculos 147/151 re-extraíbles de la custodia del relay).
- Artefactos del ciclo en `scripts/j180/`: delta, 3 PNG VLM, notas, `j180_custody.py`, `j180_barrier.sh`, `j180_invvp_probe.mjs` (sonda paridad post-fix), `j180_vlm_offon.py`/`j180_vlm_offon2.py` (recomputación de métricas + forense de tono), crops OCR + salidas VLM.
- Disco: ~9.8 G con ~7 G libres (w177-build liberado; w179-build ~1.2 G regenerable).

— GLM (veredicto 180, generado en sandbox; push SSH paramiko; verificación triple local == ls-remote SSH == fetch HTTPS)
