# 007 — Veredicto fold P1b-fix (M-IRTAM-F2): APROBACION — doble-fix literal + oraculo triple verde

**Resultado: APROBACION.** El drop 007 aplica el fix del verdicto 006 §6
**literalmente** (identidad byte-a-byte con la copia doble-fix GLM que
sustento la adjudicacion), los ecos re-derivados coinciden con el oraculo
triple en las tres patas, y el test endurecido cierra la debilidad §5.
P1b queda plegada y aprobada funcionalmente: se ancla
`mirtamf2-p1b-folded` (el tag certifica aprobacion funcional — esta vez si)
y el sello interino "sin dato no se dibuja" del F2 queda CANJEADO por el
visual del grid real 46x45.

## 1. Custodia — VERDE (quinto delta consecutivo sin incidente)

- Delta `0168129C...` sha256 == anunciado, 6.640 B exactos, `From af16482`
  limpio sin BOM, 0 CRs totales (hunks solo LF). Diffstat 2 ficheros 40+/17-
  == anunciado (IrtamGridEval.cpp 3/3, test 37/14).
- Fold `git am --keep-cr` limpio sobre 6538359 (fold 006). Tree gate
  `2e3e3bbd` == anunciado **byte-exacto**; padre `3a9a80c0` == fold 006.
  Cadena certificada **6/6**: 0878a647 -> 2ba67520 -> 8789a3d9 -> 7ed02a27
  -> 3a9a80c0 -> 2e3e3bbd.
- Blobs: cambiados IrtamGridEval.cpp `bb5ad4e0` / test `abca2146`
  (post-imagenes exactas del delta; pre-imagenes == blobs pinados del 006
  a0c93eff/53f1674e — el fix cae sobre el blob exacto adjudicado).
  INTACTOS: .h `7eb6b81f`, .inc `c078d7f7`, App.cpp `9d332320`, CMake
  `f54af4c2`, IrtamCoeffAdapter .h `9abc376e` + .cpp `66d53ede`, GiroAdapter
  `d50f1bca` — "no se pide rehacer lo verde" respetado: solo 2 ficheros.
- EOL forense: 0 CRs en delta y en ambos ficheros plegados (LF-100%); las
  zonas CRLF probadas (CMakeLists/App.cpp) quedan intactas por igualdad de
  blob — sin desplazamiento de lineas.

## 2. Literalidad del fix — maxima posible: IDENTIDAD BYTE-A-BYTE

El `IrtamGridEval.cpp` plegado es **el mismo fichero** que la copia
doble-fix GLM persistida durante la adjudicacion del verdicto 006
(`scripts/p1b_IrtamGridEval_fixed.cpp`, diff vacio). Las 2 correcciones
caen exactamente en los sitios citados: armónicos `sfe[mi+2j-1]/[mi+2j]`
(:230-231, vs IrtamReader.for:177) y factor Y `h[ih+m-2]` (:119, vs
igrf.for:543). No hay ninguna linea mas ni menos: 40+/17- del test
endurecido completo el diff.

## 3. Oraculo triple — VERDE (ASC 20160523_1200, HOUR==TOV==12, ryear 2016.6)

| Cantidad | Port plegado 007 (GCC-Linux) | MUSE UCRT64 | Replica GLM (numpy) |
|---|---|---|---|
| xmodip (-11.95,283.13,300) | -0.398025 (drv -0.398024589) | -0.398025 ✓ | -0.398021 (dif 9.8e-6, ULP) |
| eco foF2 MHz | 6.1034 | 6.1034 ✓ | 6.103382 (**9.76e-11 rel**) |
| eco hmF2 km | 261.0765 | 261.0765 ✓ | 261.0765 (**3.29e-10 rel**) |
| grid 46x45 min/max | 2.1464 / 12.5672 | 2.15 / 12.57 ✓ | 2.14 / 12.58 |
| nocturno (58N,124W,12UT) | 3.3639 | 3.3639 ✓ | — (adjudicado) |

Coincidencia **exacta cross-toolchain a precision de pantalla** en las 5
magnitudes, y 1e-10 rel vs la replica independiente (tolerancia exigida
1e-6 — margen de 4 ordenes). El min 0.13 del drop 006 queda cerrado como
artefacto de los 2 bugs, con el punto nocturno en 3.36 MHz fisicamente
razonable. La xmodip difiere de la replica a nivel ULP (sinf/cosf), dentro
del gate ±1e-3 del test y del precedente cross-toolchain del canal.

## 4. Test endurecido — VERDE (debilidad §5 del 006 CERRADA)

- `test_irtam_grid_eval` **24/24** con la seccion ASC-oracle **ACTIVA en
  este sandbox** (argv[1] + adaptacion de entorno, ver §6). Los 6 asserts
  exactos nuevos pasan: xmodip -0.3980 (±1e-3), foF2 6.1034 (±1e-5 rel),
  hmF2 261.0765 (±1e-5 rel), grid min [1.5,3.0], grid max [11.5,13.5],
  nocturno 3.36 (±10%).
- Con los bugs del 006 activos, 5 de los 6 asserts habrian FALLADO (xmodip
  -1.108, foF2 7.6651, hmF2 347.0565, min 0.1296, nocturno ~0.13) — el
  test ya no deja pasar un port numerico roto. Un port numerico con
  asercion exacta: exigencia cumplida.
- Matriz: fila leccion de indices presente en la nota ✓ — media y pendiente
  convertidas con -1, los 6 pares armonicos sin -1 (el error vivio en la
  frontera 1-based/0-based); regla pinada: toda indexacion Fortran 1-based
  lleva su -1 explicito con cita de linea original.

## 5. Dimension estructural — VERDE (herencia 006 intacta, re-verificada)

54 TUs + LINK OK; warnings 12 unicas = baseline (11 + 1 format-truncation
documentada) + **0 nuevas**, +0/-0 vs build del fold 006, 0 de
IrtamGridEval.*. Tests **18/18** sandbox == ctest global acumulado
P2+P3+P4+P1b (irtam_cache 37, coeff_parse 43, irtamc_cache 28,
irtamc_gate 19, irtam_adapter 19 — intactos; sin red: G9; reloj simulado:
G8). Anclas 8/8 **sin desplazamiento** (App.cpp intacto, blob 9d332320:
356/1345/1550/1593/2431/2546/3205/main.cpp:8; bloomThreshold y gitignore
intactos). Flip aditivo intacto: puerta TOV comun (`tovF != tovH` ->
break, :1189), publish rellena (:1218/1223/1225), draw path exige valid en
:1685/:2588 — P4 intacto. G6 0 URLs/curl en los ficheros cambiados. Badge
DATA-age desde TOV intacto. `.inc` == `.dat` del zip sin cambios (blob).

## 6. Observacion menor (NO bloqueante, documentada)

El join de ruta del test usa `'\\'` (semantica Windows): en POSIX,
`argv[1]` solo resuelve si el nombre lleva backslash literal. Este sandbox
ADAPTO EL ENTORNO (symlinks `IrtamReader\IRTAM_*.ASC` en
scratch-p1b-audit — el codigo no se toca) y la seccion ASC-oracle corrio
completa. Sugerencia para un futuro endurecimiento menor (no exigida, no
bloquea nada): join condicional por plataforma o separador parametrizable.

## 7. Estado del canal y siguiente paso

- Espejo: `mirtamf2-p1b-folded` (anotado) -> a38b585 -> tree `2e3e3bbd`.
  Cadena de arboles 6/6 byte-exactos. El tag certifica la aprobacion
  funcional que el 006 retuvo a proposito.
- Sello interino "sin dato no se dibuja" del F2: **CANJEADO** — el visual
  del grid real 46x45 via IrtamGridEval (valid=true solo con TOV comun) es
  el estado P1b aprobado para produccion.
- Siguiente: **P5** y cierre G1-G10 con el sello unico `mirtamf2-sealed`
  (ruling S2). B0/B1 siguen diferidos y documentados. G10 final seguira
  exigiendo numeros en vivo.
- Verificacion re-ejecutable: `scripts/mirtamf2p1bfix_fold_verify.sh`
  (log `scripts/mirtamf2p1bfix_verify.log`; driver fullchain
  `p1b_fullchain_folded` + replica persistida con sha256).
