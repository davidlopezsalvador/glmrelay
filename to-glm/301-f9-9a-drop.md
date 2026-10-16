# 301 — F2b #9a NRLMSIS constants + utils + init (transcripción pineada)

Primera pieza del sub-proyecto #9 (mini-ruling 300). Todo web; app 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web301_msis9a.diff` — 136712 B,
sha256 `0486dacceba072a8e165c7a0f5e3c09c17a7fb858c269fa8e3f4b309154a2457`,
LF puro, mbox `[PATCH] w301-msis9a`, 8 ficheros, 2057+/0 (7 texto nuevo +
1 binario). Diff con `-c core.autocrlf=false -c core.eol=lf`.
Triple verificación por fichero (aplicado == post && SHA-1 == index,
`git apply --check` 0 + byte-exacto en árbol limpio):
- `src/lib/iono/msis/msisConstants.ts` NUEVO 071c859
- `src/lib/iono/msis/msisUtils.ts` NUEVO 32559a9
- `src/lib/iono/msis/msisInit.ts` NUEVO 6205e75
- `src/lib/iono/msis/msisInit.test.ts` NUEVO 33c557e
- `src/lib/iono/msis/README.md` NUEVO 625f19a
- `LICENSE` (raíz web, GPL-3.0, 35149 B) NUEVO f288702
- `src/lib/iono/msis/nrlmsis2.1_license.txt` (4444 B, byte-exacto espejo
  sha256 `46352d9b…b39b71`) NUEVO 244ab19
- `src/lib/iono/msis/msis21.parm` (536576 B, byte-exacto espejo sha256
  `a322a749…3803f5f`, stanza GIT binary patch) NUEVO blob 8809e7b
Pre-tree: 8/8 ficheros nuevos, ningún testigo previo tocado (prohibidos
261 INTACTOS). Trailing-whitespace warnings del apply son del texto
verbatim de la licencia (bytes del espejo, se conservan).

## 2. Referencia pineada (ruling 300, ANTES de código)
Espejo `jacobwilliams/NRLMSIS2.1` tip `9124144`: 8×.F90 124572 B +
`msis21.parm` 536576 B + 200 casos + interfaz GTD8D. Licencia NRL-SOF
leída (traducción §4b/§4c). GPL-3.0 traído de gnu.org (35149 B exactos).
TU con pines INDEPENDIENTES (lector Python struct LE column-major +
evaluación cerrada de expresiones, no round-trip del TS): TN.beta pins
bit-exactos, suma abs 0.007525866823450319, nonzero total 3605,
MBAR/G0DIVKB/MBARG0DIVKB/HOA, etaTN/etaO1/etaNO, HRfacts.
Correcciones durante transcripción (el pin evitó 3 errores reales):
nodos TN/O1/NO verdaderos (no MSISE-00), Mbar literal, g0divkB ×1e3 sin
RP, alt2gph WGS84 real (no Bates), bspline/dilog reales (sin tablas S
— no existen en 2.1), specmass/lnvmr 1-based, eta bounds exactos.

## 3. Contenido (9a: constants + utils + init, sin evaluación)
`msisConstants.ts` (msis_constants.F90 196 líneas íntegro: dims con
expresiones originales amaxn/tmaxl/pmaxm, nodos, C2TN/C1O1/C1NO
column-major, S5/S6/WGHTAXDZ de referencia) + `msisUtils.ts`
(msis_utils.F90 282 líneas: alt2gph WGS84, gph2alt Newton, bspline
(x,nodes,nd,kmax,eta,S,i), dilog [0,1) Ginsberg-Zaborowski) +
`msisInit.ts` (msis_init.F90 635 líneas: initparmspace, loadparmset
DataView LE + smod + pressparm, tselec 25→512 literal, tretrv,
msisinit con parmBytes). Fidelidad: DBLE = double JS mismo ancho;
arrays 1-based emulados (índice 0 NaN, fail-fast); file-I/O Fortran →
host-concern (el navegador pasa bytes; documentado). §4b: avisos de
cambio en cada cabecera; §4c verbatim + link en README; entrega a
Code 7630 registrada como pendiente del proyecto.

## 4. Barrera
`tsc` 0; `vitest` 290/290 (30 ficheros; 280 sin flips + 10 nuevos 9a:
4 constantes + 2 parmspace + 2 carga + 1 switches + 1 utils-smoke;
round-trip gph2alt/alt2gph + partición de unidad bspline incluidos).
