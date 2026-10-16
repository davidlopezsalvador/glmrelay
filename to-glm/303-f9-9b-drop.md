# 303 — F2b #9b tfn+gfn + P1-287 + cabeceras 302.A + fix orientación C2TN

Segundo tramo del sub-proyecto #9 (veredicto 302). Todo web; app 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web303_msis9b.diff` — 39750 B,
sha256 `7a2e8d2e81cfdbae0a3e631f6771e61afdef890cd926c9e303352b35a563cef1`,
LF puro, mbox `[PATCH] w303-msis9b`, 8 ficheros, 954+/26- (5
modificados + 3 nuevos). Diff con `-c core.autocrlf=false -c core.eol=lf`.
Pre-tree anclado a 301 publicado (5/5 byte-idénticos al árbol aplicado
de `web301_msis9a.diff`: constants 071c859 · init 6205e75 · test
33c557e · utils 32559a9 · README 625f19a). Triple verificación
(aplicado == post && SHA-1 == index, sobre árbol 301 verdadero):
- `src/lib/iono/msis/msisConstants.ts` 071c859 → ca9509f
- `src/lib/iono/msis/msisInit.ts` 6205e75 → 19662f0
- `src/lib/iono/msis/msisInit.test.ts` 33c557e → f3b708f
- `src/lib/iono/msis/msisUtils.ts` 32559a9 → b7bb8e6
- `src/lib/iono/msis/README.md` 625f19a → 67bcdd8
- `src/lib/iono/msis/msisGfn.ts` NUEVO b2579f8
- `src/lib/iono/msis/msisTfn.ts` NUEVO f879dee
- `src/lib/iono/msis/msisTfn.test.ts` NUEVO a869d5a
Prohibidos 261 INTACTOS (solo `msis/` tocado; parm y licencia ni se miran).

## 2. Referencia pineada (ruling 300, ANTES de código)
Espejo tip `9124144`: `msis_tfn.F90` sha256
`583aa67d867da3076502381f0b537cf4d194bb8837a786a5446d4bc57bd4c82b`,
`msis_gfn.F90` sha256
`a284f405bd606bb8b9085907d85ccbd4e7fa77d40fa1665e710f374f64861039`
(medidos del tgz, coinciden tabla 300). Vectores oficiales
`msis2.1_test_in.txt` 12864 B + `msis2.1_test_ref_dp.txt` 40602 B
(200 casos; columna T = f8.2). Cableado calc leído SOLO para el TU
(bspline zeta,nodesTN,nd+2,kmax,etaTN,Sz,iz; kmax=5 si zeta<zetaF si no
6; tn=tfnx(zeta,iz,Sz(-3:0,4),tpro); doy=mod(iyd,1000); ap(2:7) sin uso
en modo diario). `msis_calc.F90` NO se transcribe en 9b.

## 3. Contenido
(a) **P1-287** (prescripción 302 §5 literal): rama swc(4) con la tabla
del fuente 559-566 (225:228, 233:236, 241:244, 275:278, 283:286,
291:294, 308:309) + TU sv4 con los pines del veredicto (off incluye
21,22,25,26,29,30,33,34 y los 7 rangos; on 221-224/229-232/237-240/
279-282/287-290) + TU sv6 explícito. (b) **302.A**: sha256 + fecha
2026-10-16 + "traducción fiel sin cambios de física" en las 3
cabeceras 9a (formato estándar aplicado también a gfn/tfn nuevos).
(c) **Hallazgo propio (sin P1, se declara)**: C2TN/C1O1/C1NO estaban
TRANSPUESTAS (filas↔columnas del reshape column-major); el pin 9a no
lo cazó por coincidencia (C2TN[0][2]=33.33 en ambas orientaciones).
Lo delató el TU perfil T (fila alt 110 m: 456.83 vs 280.27 oficial;
barrido 9/200 fallando solo en zeta 93-122 con T hasta negativas).
Corregido + pines de orientación en TU. C1O1/C1NO (uso en 9c) igual.
(d) **9b**: `msisGfn.ts` (globe 512 con caches explícitos + solzen con
wlon/dumr muertos documentados + sfluxmod + geomag diario/historia +
utdep; `**`→Math.pow literal, MOD→`%` truncado) + `msisTfn.ts`
(tfnparm/tfnx literales) + TU perfil T (6 fixtures inline de vectores
oficiales con emulación sngl vía Math.fround, tolerancia 0.006 =
redondeo ref ±0.005 + margen; cubre spline bajo/medio/alto + Bates
250/500 km).

## 4. Barrera y evidencia extendida
`tsc` 0; `vitest` 299/299 (31 ficheros; 290 sin flips + 9 nuevos: 2
sv4/sv6 en init.test + 7 en tfn.test). Evidencia declarada (scaffold
temporal, no committed): barrido de los 200 vectores por el path T
9a+9b → **BAD=0/200** (todos <0.006 K); el oráculo de depuración fue
pymsis solo como confirmación (T fila 3 = 280.27) + struct-reader
propio para columnas TN — fixtures del TU siguen siendo solo valores
oficiales inline. Criterio dual 9c (observación ENGINE 302 §6) asumido
para la regresión dp.
