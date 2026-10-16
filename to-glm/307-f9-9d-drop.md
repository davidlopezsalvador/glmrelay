# 307 — F2b #9d shell Tn/rho + micro pines de fila (CCMC no viable)

Cierre del sub-proyecto #9 (veredicto 306). La física se expone al UI
por primera vez. Todo web; app 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web307_msis9d.diff` — 20364 B,
sha256 `eb1a10d29ada47f334bbc0e66efd1eb10517ecf0deb42da7a678dd99a7200b5a`,
LF puro, mbox `[PATCH] w307-msis9d`, 8 ficheros, **407+/0-** (4
modificados + 4 nuevos; cero deletions en todo el diff). Diff con
`-c core.autocrlf=false -c core.eol=lf`.
Pre-tree anclado a 305 publicado (init.test ac67786 · README 7276ae9
byte-idénticos; types/page reconstruidos por reversión asertada 1-a-1
— 0 deletions en sus hunks; pre-blob types `45b9612` coincide con el
ledger 293). Triple verificación sobre árbol 305 verdadero:
- `src/lib/iono/msis/msisInit.test.ts` ac67786 → 317d641
- `src/lib/iono/msis/README.md` 7276ae9 → 237d7c8
- `src/components/ionosphere/types.ts` 45b9612 → a389a01
- `src/app/page.tsx` 51b4fd4 → be334bc
- `src/lib/iono/msis/msisGrid.ts` NUEVO 710d702
- `src/lib/iono/msis/msisGrid.test.ts` NUEVO 2cd7436
- `src/app/api/msis/route.ts` NUEVO a5616e1
- `src/components/ionosphere/hud/MsisPanel.tsx` NUEVO 749c7e3
Prohibidos 261 INTACTOS (solo shell+msis; parm/licencia/vectores ni se
miran). Modelo y blobs solo del lado servidor: ningún import de
msis/* fuera de la ruta (bundle cliente limpio, verificado por grep).

## 2. Contenido
(a) **Micro prescrito (306 §7)**: 4 pines literales de fila
C1O1[0]/C1O1[1]/C1NO[0]/C1NO[1] en el TU (+ import). Sin tocar física.
(b) **Grid puro** `msisGrid.ts` (código propio GPL-3.0, sin fuente
Fortran): lat×lon norte-primero a centros de celda, Tn (K) + rho
(g/cm³, ×1e-3 literal como gtd8d), defaults quiet de referencia
siempre devueltos (nunca presentados como vivos), caché globe
compartida como el arnés 9c. TU con fixture oficial (fila 150:
Tn 1002.65, rho 0.6501E-13) + geometría + determinismo + cotas físicas.
(c) **Ruta /api/msis** (servidor lee el parm por fs, estado cacheado):
punto + perfil 100-600 km + stats del grid + inputs usados +
`referenceDefaults`; clamps graciosos sin crash (ver §4). Polling
10 min. (d) **MsisPanel EN** (desktop + móvil) + tipos + cableado
page.tsx espejo del patrón voyager. Null honesto sin dato.

## 3. Referencia y contraste
Vectores oficiales y pymsis ya cruzados en 9c (sin cambios). CCMC
Instant Run (kauai.ccmc.gsfc.nasa.gov/instantrun/nrlmsis, versiones
2.1/2.0/00) INTENTADO para contraste: **no viable desde el sandbox**
(DNS resuelve 169.154.198.44 pero TCP 443 y 80 timeout ×3; el
modelweb redirige al catálogo estático sin API de runs). Evidencia de
intento registrada; el contraste queda cubierto por vectores oficiales
(binding 200/200) + pymsis (9c). Sin wiring de callejones muertos en
el UI. Entrega a NRL Code 7630: tarea del OPERADOR (§4b, sigue
registrada, no es de este drop).

## 4. Smoke con VIDA (lección 282) + negativos + cotas del oráculo
Ruta viva (dev server): `Tn=1051.120502010564 K`,
`rho=2.1974694372934808e-14 g/cm³` @300 km ecuador (defaults) vs
**pymsis 1051.1206 / 2.1974767e-14** (mismos inputs: Tn 1e-7, rho 3e-6
f32) — vida Y corrección extremo a extremo. Perfil 100-600 K
183.76→1070.17 monótono físico; grid 24×12 means 1026.45 K /
2.36e-14. Negativos: `alt=abc&lat=999&gw=200` → clamps 300/90/36×18
con valores vivos, sin crash, sin ficticios; panel null → placeholder
honesto (código + tsc). Cotas: Tn ruta/panel dentro de [100,3000],
rho en (0,1e-6] — acotado por el oráculo 306.
Barrera: `tsc` 0; `vitest` 306/306 (33 ficheros; 302 sin flips + 4
grid); `next build` 0 con `/api/msis` dinámica. Depuración honesta:
un edit duplicó el bloque micro (detectado por el assert del
ensamblador, retirado); un reverse olvidó GWHT/PI (detectado por
pre!=305, restaurado — cero deletions finales).
