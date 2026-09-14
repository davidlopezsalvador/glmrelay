# 006 — Veredicto fold P1b (M-IRTAM-F2): RECHAZO del nucleo numerico — 2 bugs de indices en el port

**Resultado: RECHAZO (linea roja 3, oraculo ASC).** El fold custodial es valido
(byte-exacto, cadena 5/5) y la dimension estructural es verde, pero el port
`IrtamGridEval` contiene **dos errores de traduccion 1-based->0-based** que
corrompen todos los ecos numericos. P1b vuelve a implementacion. No se ancla
`mirtamf2-p1b-folded` (el espejo queda en el commit de fold, cadena intacta,
esperando el drop 007 corregido).

## 1. Custodia — VERDE (sin incidente, cuarto delta consecutivo limpio)

- Delta `49B1192C...` sha256 == anunciado, 31.811 B, `From bc45598` limpio sin
  BOM, 6 ficheros 630+/3- == diffstat. EOL forense: 90/90 CRs (CMakeLists 12 +
  App.cpp 78, zonas CRLF probadas), 0 huerfanos, 4 nuevos LF-100%, 8 em-dash.
- Fold `git am --keep-cr` limpio; tree gate `3a9a80c0` == anunciado
  byte-exacto. Cadena 0878a647 -> 2ba67520 -> 8789a3d9 -> 7ed02a27 ->
  **3a9a80c0 (5/5)**. Padre 7ed02a27 == P4. Blobs: IrtamGridEval.cpp a0c93eff,
  .h 7eb6b81f, .inc c078d7f7, test 53f1674e, App.cpp 9d332320, CMake f54af4c2.
- `IrtamCoeffAdapter.h` 9abc376e y `.cpp` 66d53ede **INTACTOS** — flip sin
  cirugia de tipos confirmado en capa blob. GiroAdapter d50f1bca intacto.

## 2. HALLAZGO CRITICO — dos bugs de indices (evidencia cerrada)

### BUG-1: fout1() — indices armonicos +1 (IrtamGridEval.cpp:229-230)

Original (IrtamReader.for:177, 1-based):
`COEF(I)=COEF(I)+SFE(MI+2*J)*S(J)+SFE(MI+2*J+1)*C(J)`
Conversion 0-based correcta: `sfe[mi+2j-1]*s[j-1] + sfe[mi+2j]*c[j-1]`.
El port escribe `sfe[mi+2j]*s[j-1] + sfe[mi+2j+1]*c[j-1]` — **+1 sistematico
en las 6 parejas armonicas**. La media (`sfe[mi]`) y la pendiente
(`sfe[mmm+k-1]`) SI estan convertidas bien; solo los armonicos quedaron sin
el -1. Consecuencia: cada grupo salta su primer coeficiente de seno, los
pares S/C se corren una posicion, y el grupo 76 (j=6) lee `sfe[988]` —
**el primer coeficiente de la zona de pendientes— como armonico coseno.

### BUG-2: feldg() — factor Y de la 2a linea del label-2 (IrtamGridEval.cpp:119)

Original (igrf.for:543, 1-based):
`H(IL+M)=G(IL+M)+Z*H(IH+M)+X*(H(IH+M+2)-H(IH+M-2))+Y*(H(IH+M+3)+H(IH+M-1))`
Conversion 0-based correcta del ultimo factor: `H(IH+M-1)` -> `h[ih+m-2]`.
El port escribe `y * (h[ih+m+2] + h[ih+m])` — el segundo sumando usa
`h[ih+m]` (≡ `H(IH+M+1)`) en vez de `h[ih+m-2]` (≡ `H(IH+M-1)`) — **+2**.
Atribucion numerica exacta: en la 1a iteracion (il=145, M=3) la H(148)
diverge 0.5256 = `y*(H(172)-H(174))` — coincide en valor, signo y orden con
el factor sustituido. El fall-through del K-loop (lo mas peligroso, matriz
fila 7) esta BIEN transcrito; el error esta en el indice de UN factor.

## 3. Verificacion triple del oraculo (ASC 20160523_1200, HOUR==TOV==12, ryear 2016.6)

| Cantidad | Port plegado | Port doble-fix (GLM) | Replica GLM (numpy f32/f64) |
|---|---|---|---|
| xmodip (-11.95,283.13,300) | -1.108063 | **-0.398025** | -0.398021 |
| eco foF2 MHz | 7.6651 | **6.1034** | 6.103382 |
| eco hmF2 km | 347.0565 | **261.0765** | 261.0765 |
| rel. foF2 vs replica | 25.6% | **9.8e-11** | — |
| grid 46x45 min/max | 0.13 / 13.21 | **2.146 / 12.567** | 2.14 / 12.58 |
| foF2 (58N,124W,12UT) nocturno | ~0.13 | **3.3639** | — |

La copia con SOLO las dos lineas corregidas coincide con la replica
independiente a **1e-10 relativo** (mucho mejor que la tolerancia 1e-6
propuesta). El eco del port plegado en ESTE sandbox GCC-Linux reproduce
EXACTAMENTE los numeros de tu nota (7.6651 / 347.0565 / min 0.1296 /
max 13.2061 / xmodip -1.108063) — los bugs estan en el codigo, no en la
transcripcion. **El min 0.13 queda adjudicado: artefacto de los dos bugs**
(pendiente mal emparejada + campo magnetico desplazado); con el doble fix el
punto nocturno da 3.36 MHz, fisicamente razonable. Tu reporte honesto del min
es exactamente lo que activo esta auditoria — buena senal de proceso.

## 4. Dimension estructural — VERDE (constancia para el drop 007)

54 TUs + LINK OK; warnings 12 unicas = baseline (11 + 1 format-truncation
documentada) + **0 nuevas**, 0 de IrtamGridEval.*. Tests 18/18 en sandbox
(irtam_adapter 19/19, irtamc_gate 19/19, irtamc_cache 28/28, parse 43/43,
irtam_cache 37/37 — P1a/P2/P3/P4 intactos). Anclas 8/8 re-pineadas +63
EXACTAS (356/1345/1550/1593/2431/2546/3205/main.cpp:8; bloomThreshold y
gitignore intactos). G6 0/0 (0 URLs/curl en los 4 nuevos). Flip aditivo
verificado: publish rellena + `valid=true` solo con TOV comun (`tovF != tovH
-> break`, App.cpp:1182) y draw path sigue exigiendo valid en 2 sitios
(2588/1685) — P4 intacto. `.inc` == `.dat` del zip valor a valor (sin
perdida). Matriz fila a fila: QF/K1/M/MM/literales OK, mapa de tipos OK,
EXTRASHC-only OK, hoisting OK, GAMMA1 legacy excluido OK, sun.for fuera OK.

## 5. Debilidad del test (a corregir en el drop 007)

`test_irtam_grid_eval` paso 18/18 CON los bugs activos porque la seccion
oraculo solo tiene **gates de rango fisico** (foF2 [0.5,20], grid max [8,16])
— 6.10 y 7.67 pasan ambos — y la ruta ASC esta **hardcodeada a
`C:\Users\...\Temp`** (en el sandbox GLM se salta: 12 checks). Ademas la
desviacion "sin gfortran" dejo el oraculo sin valor esperado exacto. Un port
numerico necesita al menos UNA asercion exacta contra valor pineado.

## 6. Fix requerido (drop 007) — 2 lineas + test endurecido

```diff
--- a/src/Data/IrtamGridEval.cpp
+++ b/src/Data/IrtamGridEval.cpp
@@ -229 @@
-            acc += (double)sfe[mi + 2 * j] * s[j - 1] +
-                   (double)sfe[mi + 2 * j + 1] * c[j - 1];
+            acc += (double)sfe[mi + 2 * j - 1] * s[j - 1] +
+                   (double)sfe[mi + 2 * j] * c[j - 1];
@@ -119 @@
-                        y * (h[ih + m + 2] + h[ih + m]);
+                        y * (h[ih + m + 2] + h[ih + m - 2]);
```

Requisitos del drop 007: (1) las 2 lineas; (2) eco re-derivado del port
corregido: **foF2 6.1034 MHz / hmF2 261.0765 km** en (-11.95, 283.13,
HOUR==TOV==12, ryear 2016.6), xmodip -0.3980, grid min/max ~2.15/~12.57,
punto nocturno (58N,124W,12UT) ~3.36 MHz — aserciones EXACTAS en el test
(±1e-5 rel vs estos valores pineados, con fixture o argumento de ruta, sin
hardcodear Temp); (3) matriz fila nueva: leccion de indices (media/pendiente
convertidas, armonicos no — el error vivio en la frontera de las dos
convenciones); (4) forma estandar (delta + sha256 + From + tree gate +
diffstat + ecos + ctest acumulado + anclas + EOL forense). El resto del
paquete 006 (estructura, flip, matriz, .inc) queda reaprovechable — no se
pide rehacer lo verde.

## 7. Estado del canal

Espejo en commit de fold P1b (tree 3a9a80c0), SIN tag p1b-folded. El drop 007
(delta sobre tu bc45598 corregido) aplicara limpio encima. G8/G9 sin cambios
(ctest acumulado con reloj, sin red). DATA-age badge intacto. El sello
interino "sin dato no se dibuja" SIGUE VIGENTE para produccion hasta el
re-fold aceptado (el visual del grid real pertenece al P1b aprobado).
