# 305 — F2b #9c dfn+calc+gtd8d + regresión 200 dp vinculante

Tercer tramo del sub-proyecto #9 (veredicto 304). Todo web; app 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web305_msis9c.diff` — 89895 B,
sha256 `f963e5323fd597e857d7711c5ca0ab32b79b25968f9a933c9725eaa5ae5571fb`,
LF puro, mbox `[PATCH] w305-msis9c`, 8 ficheros, 1340+/1- (2
modificados + 6 nuevos: 4 código/test + 2 vectores). Diff con
`-c core.autocrlf=false -c core.eol=lf`.
Pre-tree anclado a 303 publicado (2/2 byte-idénticos al árbol aplicado
de `web303_msis9b.diff`: init.test f3b708f · README 67bcdd8). Triple
verificación (sobre árbol 303 verdadero reconstruido del relay):
- `src/lib/iono/msis/msisInit.test.ts` f3b708f → ac67786
- `src/lib/iono/msis/README.md` 67bcdd8 → 7276ae9
- `src/lib/iono/msis/msisDfn.ts` NUEVO e00806b
- `src/lib/iono/msis/msisCalc.ts` NUEVO 38aa984
- `src/lib/iono/msis/msisGtd8d.ts` NUEVO 6af2bfd
- `src/lib/iono/msis/msisRegression.test.ts` NUEVO 509321a
- `src/lib/iono/msis/msis2.1_test_in.txt` NUEVO fa611a5 (file sha256
  `1fb1948a…`, 12864 B == espejo)
- `src/lib/iono/msis/msis2.1_test_ref_dp.txt` NUEVO 0ed522b (file
  sha256 `59210a44…` == espejo == sdist pymsis, 40602 B)
Prohibidos 261 INTACTOS (solo `msis/`; parm/licencia ni se miran).
Hashes completos sha256 del contenido (no colas): parm
`a322a749f368e73117dd20f3fdcf7389dabc5509f4c27073cc5580999381b508`,
licencia `46352d9bf…`, vectores arriba (lección errata 304 §(a)).

## 2. Referencia pineada (ruling 300, ANTES de código)
Espejo tip `9124144` (re-medidos del tgz): `msis_dfn.F90` sha256
`a77a2e2bd186d985d0ee40efc2ad2565f60ec98e2f3254c1a9334eee751142b2`
(23104 B), `msis_calc.F90` sha256
`be5ee7e90e9610f72b5db96aefade89601007ccd4a2c86b545e12102cfcbee55`
(9093 B), `msis_gtd8d.F90` sha256
`5c54e3d2ca0d7a7b85a0b66608e2496f18ba47368ff0a966bfd8e97429dbb219`
(6181 B). Vectores: 200 filas, ap(1) diario, T=t(2). Cableado calc
verificado en fuente (nota 303, sin cambios).

## 3. Contenido
(a) `msisDfn.ts` (dfnparm/dfnx/pwmp literales: 9 bloques de especie con
sus dots/singles/sfluxmod/geomag/utdep exactos por especie — N2 dot,
O2/HE/AR mixtos, H1 zetaC dot, N1 lndref+sfluxmod(0), OA early-return,
NO beta(0,0)==0 early-return; perfil de masa Mi/zetaMi/aMi/WMi/XMi con
rama spline/analítica; Izref por igualdad exacta de zref; C1 O1/NO con
C1O1/C1NO filas-como-filas ya corregidas en 9b; dfnx con ramas
zmin/OA/NO/ccor/zhyd/hidrostatica; lndtotz NaN documentado nunca
observado). (b) `msisCalc.ts` (msiscalc sin memoización SAVE —
observacionalmente idéntico, documentado; initflag ausente = throw
explícito en vez de auto-init con fichero CWD). (c) `msisGtd8d.ts`
(wrapper legacy: xday=mod(iyd,1000), conversiones ×1e-6 luego ×1e3 en
orden literal, reorden d(1..10), stl/mass ignorados; sngl como doubles
con redondeo declarado). (d) Cabeceras 302.A en los 3 ficheros nuevos.
(e) TU switches storm (sw9=-1: master false/true, diarias off,
storm 417-429 on, mixtas storm on) + all-off (solo término global en
bandas con switch) — todos los escenarios que el código distingue.

## 4. Criterio dual DECLARADO + regresión vinculante
TU `msisRegression.test.ts` (200 filas, caché globe compartido,
entradas real(4) vía Math.fround): BINDING densidades 1e-3 relativo /
T 0.01 K absoluto / dmissing exacto; DESIRED bit-exact (no vinculante,
motores libm 1-ulp, 302 §6). Fundamento MEDIDO (no postulado):
cuanto de impresión 5e-5 (6 cifras) / 0.005 (f8.2); techo medido
referencia-vs-código 4.85e-4 / 0.00496 K, sistemático suave en todas
las celdas; código-vs-código (este puerto vs Fortran oficial compilado
vía pymsis, mismo parm, 200 filas) peor 4e-5 (cola Chapman de OA,
mal condicionada) y típico <=1e-6 con T a 1e-7 — luego el suelo 5e-4
es ARTEFACTO DEL LADO REFERENCIA (hipótesis principal: recalibración
del parm posterior a los vectores; causa indeterminada pero externa a
toda transcripción). Binding a 2x del techo; toda clase de defecto de
transcripción conocida lo excede 10x o más.
Barrera: `tsc` 0; `vitest` 302/302 (32 ficheros; 299 sin flips + 3
nuevos: regresión + storm + all-off). Depuración honesta registrada:
un "10x en O2 polo" intermedio fue typo de transcripción manual en un
script de comparación (no del código); el "misterio WMi" fue bug del
oráculo propio (range Python 0..19 vs fuente 0..20); ambos retirados,
evidencia final toda programática.
