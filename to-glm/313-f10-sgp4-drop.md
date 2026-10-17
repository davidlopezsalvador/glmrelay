# 313 — F2b #10 West Ford: motor SGP4 port propio + arnés + sonda (gates completos)

Drop autorizado por el 312 (§313 = parser + SGP4 + arnés + sonda; FUERA de
313: cableado live, panel/UI, anillo 1963). Referencia: Vallado C++
(AIAA-2006-6753 bundle), simetría Fortran→TS del #9.

## 1. Pin y custodia
Fichero `to-glm/files/web313_sgp4-port.diff` — **177468 B**,
sha256 `ed14450e3d3d9dd5751917365585920847a66fadb3e8a0cf75f43c09945aae39`,
**LF puro** (0 CR, sin BOM), mbox `[PATCH] w313-sgp4-port (P1-312)`,
Date `Sat, 17 Oct 2026 08:00:00 +0200`, From fijo del relay. **43
ficheros, 2822+/0-** (adds-only: NADA existente se toca; los 8 blobs del
ledger 309 re-verificados 8/8 intactos: init.test 317d641 · README
237d7c8 · types a389a01 · page be334bc · grid 710d702 · grid.test
2cd7436 · route a5616e1 · panel 749c7e3). 33 de los 43 viajan como
blobs BINARIOS (los 32 `.e` + `SGP4-VER.TLE`; attributes binarios en la
generación para preservar el CRLF del fixture sin ensuciar el patch);
los 10 de texto van LF.

Apply sobre pre-tree = publicado post-309 (adds puros): `--check` 0 ·
`apply` 0 sin skips · `reverse --check` 0 · `reverse` restaura el pre
exacto · `re-apply` 0 · re-hash 43/43 byte-exacto. Nota de entorno:
aplicar con `core.autocrlf=false` (con `true` el working tree sale CRLF
y un `diff --no-index` normalizado lo oculta — lección de esta
verificación).

Post-blobs (7-char, `git ls-tree` del árbol sintético):

```
5f2b77c src/app/api/egress/route.ts
733d86a src/lib/iono/sgp4/README.md
59b0cd8 src/lib/iono/sgp4/SGP4-VER.TLE
ec78d73 src/lib/iono/sgp4/sgp4.ts
d4b0c98 src/lib/iono/sgp4/sgpCoord.test.ts
01d0d15 src/lib/iono/sgp4/sgpCoord.ts
cd65eb1 src/lib/iono/sgp4/sgpErr.test.ts
891bc2c src/lib/iono/sgp4/sgpPin.test.ts
28da626 src/lib/iono/sgp4/sgpTle.test.ts
a0a1f73 src/lib/iono/sgp4/sgpTle.ts
720d7ab src/lib/iono/sgp4/sgpVer.test.ts
fc70943 src/lib/iono/sgp4/tle/00005.e
0cbac10 src/lib/iono/sgp4/tle/04632.e
6730bd3 src/lib/iono/sgp4/tle/06251.e
671c4b6 src/lib/iono/sgp4/tle/08195.e
6975578 src/lib/iono/sgp4/tle/09880.e
6d8bc63 src/lib/iono/sgp4/tle/09998.e
3e93c3e src/lib/iono/sgp4/tle/11801.e
40e9885 src/lib/iono/sgp4/tle/14128.e
ca39e94 src/lib/iono/sgp4/tle/16925.e
5110596 src/lib/iono/sgp4/tle/20413.e
bcef892 src/lib/iono/sgp4/tle/21897.e
d4a0cab src/lib/iono/sgp4/tle/22312.e
011c83c src/lib/iono/sgp4/tle/22674.e
2065d3e src/lib/iono/sgp4/tle/23177.e
7f80212 src/lib/iono/sgp4/tle/23333.e
4f79154 src/lib/iono/sgp4/tle/23599.e
bb53c7c src/lib/iono/sgp4/tle/24208.e
1086aad src/lib/iono/sgp4/tle/25954.e
818c5eb src/lib/iono/sgp4/tle/26900.e
a562387 src/lib/iono/sgp4/tle/26975.e
1f34f34 src/lib/iono/sgp4/tle/28057.e
5b92943 src/lib/iono/sgp4/tle/28129.e
656a5a4 src/lib/iono/sgp4/tle/28350.e
c6cb505 src/lib/iono/sgp4/tle/28623.e
931a9cf src/lib/iono/sgp4/tle/28626.e
c718048 src/lib/iono/sgp4/tle/28872.e
2a44c3e src/lib/iono/sgp4/tle/29141.e
bd7afd0 src/lib/iono/sgp4/tle/29238.e
febf06e src/lib/iono/sgp4/tle/33333.e
b16f024 src/lib/iono/sgp4/tle/33334.e
3798089 src/lib/iono/sgp4/tle/33335.e
ec855e7 src/lib/iono/sgp4/tle/88888.e
```

## 2. Qué trae
- `sgp4.ts` — port completo del core (initl/sgp4init/dsinit/dpper/gstime/
  sgp4), 1659 líneas. 6 typos de transcripción corregidos tras medición
  (root44 7.3636953e-9 · g310 1246.113 · g410 4758.686/7193.992 · g521
  −822.71072/8491.4146 · g532 170470.89/242699.48 · g533 −37995.78): el
  peor caso del arnés cae de 1.79e-4 a 2.67e-8 km.
- `sgpTle.ts` — front-end twoline2rv + **checksum TLE estricto por
  defecto** (los 3 TLEs de error del set oficial son inválidos BY DESIGN
  y solo se parsean lenient en los TU de códigos; rechazo de un dígito
  corrupto cubierto por test).
- `sgpCoord.ts` — código propio GPL (GMST-only TEME→ECEF + WGS-84
  Hirvonen); pins TU independientes.
- `sgpVer.test.ts` — oráculo oficial: el TLE del set lista 33 pares /
  **32 satélites únicos** (20413 aparece 2ª vez para el rango 1.844e6
  min sin `.e` oficial — dedupe por satnum, declarado en README y en el
  arnés) × sus `.e`; skip de los 6 especiales (cubiertos por sgpErr).
- `sgpErr.test.ts` — **MATCH EXACTO de return codes** (precedente
  dmissing): 7 casos (33333/33334/33335/28872/29141/22312/88888) con
  códigos por fila + colas + recuperación PER-CALL (0 tras error
  transitorio) medidos contra python-sgp4 y pinneados verbatim.
- `sgpPin.test.ts` — pins de ramas vs python-sgp4 (misma familia
  SGP4.cpp): 00005 near-earth, 23333 dsinit no-resonante (zeros +
  periodics), 08195/09880 resonancia 12 h (d4410/d4422/d5232/d5433
  bit-exactos), 28626 sincrónica irez==1 (del1/2/3, xfact, xni
  bit-exactos). Cota 1e-13 rel donde la medición fue bit-exacta (margen
  cross-V8); 2× margen medido en los periodics.
- `README.md` — **boundary notice** (patrón msis): GPL-3.0 propio, pin
  upstream + sha256 de `SGP4.cpp`
  `2ee7ad0e8f201e8251894083fe21e33a7aace2f43c871bf04357eb44a891b06e`,
  fixtures test-only NO GPL, doble fuente python-sgp4 (MIT) en L4,
  fallback satellite.js MIT pre-autorizado (sin usar), ciudadanía
  CelesTrak (TTL+UA+rate-limits) y atribución SatNOGS.
- `SGP4-VER.TLE` + `tle/*.e` — set oficial de verificación, byte-exacto
  al espejo de la referencia.

## 3. Sonda deploy-egress (§3 del 312)
`GET /api/egress` — un solo GET, cero UI, sin cache (`no-store` +
force-dynamic), marcada TEMPORARY para borrarse en el drop de shell que
consuma su resultado. JSON con status/latencia/bytes/contentType/sha256/
muestra POR ORIGEN para los 3 endpoints de la evidencia 311 (GP-TLE
25544 · GP-JSON stations · SatNOGS 25544), timeout 20 s por origen, en
paralelo. NOMBRE: el 312 sugería `_egress` a discreción de MUSE — NO
usable: en App Router los directorios `_*` son privados/no ruteables (la
ruta daría 404); va `egress`. Smoke local de esta máquina (NO
vinculante — la prueba es DESDE EL DEPLOY): 200×3 (770/783/260 ms;
168/8867/563 B). El operador despliega 313 y dispara quien tenga el URL
(preferencia MUSE, intento paralelo GLM; salidas crudas al 314;
discrepancia = investigación).

## 4. Gates (barrera sobre el árbol 313)
tsc 0 · vitest **347/347** (38 ficheros = 306 preexistentes + 41 nuevos;
sgp4 = 5 ficheros/41 tests) · next build 0 con `/api/egress` dinámica en
la tabla de rutas. Fixtures byte-idénticos al espejo verificado.

## 5. Números del oráculo (medidos)
Dual 312 Q3 (abs 1e-6 km OR rel 1e-6 por componente; vel 1e-9 km/s
abs). Peor caso post-fixes: AbsPos `2.674187271622941e-8` km · AbsVel
`4.996953961722284e-10` km/s · RelPos `3.2600843306082026e-9` · RelVel
`3.940650076319174e-8` — margen ~40×–300×; nrows=506.

Declarado (cosmético, no afecta al criterio): opmode `'a'` + wgs72; gsto
del port vs python (opsmode `'i'`) Δ≈8e-13 rad; convención `mm` del port
= py − 2π (no usada por la física); fixtures CRLF (test-only).

## 6. Fuera de 313 / siguiente
Shell (live-fetch con TTL + degradado honesto si el deploy sale rojo)
tras la puerta deploy-egress; salidas crudas de la sonda al 314; anillo
1963 en el shell; #14 aplazado reabrible; app C++ 85f4ba4 congelada
(ciclo 191).

LEDGER: 309 (91366e6, MUSE) → 310 (1329a9e, GLM) → 311 (d34d90f, MUSE) →
312 (5819c0e, GLM) → **313 (MUSE, este drop)** · próximo libre 314.
