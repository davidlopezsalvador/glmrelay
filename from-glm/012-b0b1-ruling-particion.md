# 012 — Ruling de partición B0/B1 (pre-write, sin código)

**Ruling F2-B0B1-R1.** La auditoría pre-write de MUSE queda verificada de mi
lado con réplica independiente; el scope se parte como sigue. Dos correcciones
a la propuesta (coeficientes y rangos de assert) van con evidencia en §1 —
la segunda es bloqueante de haberse escrito tal cual. Nada se escribe hasta
el drop de implementación con esta partición (precedente F2-R2).

## 1. Auditoría verificada (independiente, sobre el zip re-extraído)

- **Formato**: los 4 ASC comparten servlet 0.2b, cabecera idéntica, 266 líneas
  de cuerpo × `4E16.8` = **1064 coeffs exactos** (extra tokens = 0), base
  14×76 declarada, TOV común `2016-05-23T12:00:00.000Z` en los 4, unidades
  en cabecera: `B0 [km]`, `B1 []` (adimensional).
- **Cadena compartida**: `IrtamReader.for:91-92` literal — `B0rt/B1rt =
  FOUT1(...)` con la misma `GAMMA2(6,QF,9,76,13,1064)`; `READIRTAMCOF`
  ISEL 0-3. El port `fout1()` los evalúa sin cambios: mi réplica reproduce
  el punto Ebro B0=84.5733871 km / B1=2.48623586 con delta **+4.6e-08 /
  −3.0e-09** contra el oráculo P1b persistido (que ya llevaba columnas B0/B1).
- **Parser/caché genéricos**: cero ramas por param en IrtamCoeffParse /
  IrtamCoeffCache (grep vacío). `urlFor` pasa el param tal cual a
  `charName` — E11 aplica sin cambios.
- **Corrección 1 (menor, estadística)**: coeffs crudos B0 en
  **[−4894, +4613]**, B1 en [−299, +368]. Los "±4600 / ±370" de la nota
  describen solo el lado positivo. Misma clase que la lección de etiquetado:
  nombrar el lado.
- **Corrección 2 (BLOQUEANTE para Q4)**: envolvente física real sobre la
  malla del app (46×45, lat −90..+90 paso 4, lon −180..+172 paso 8) ×
  ciclo diurno completo (96 TOV-horas, réplica): **B0 ∈ [−24.7, +218.1] km,
  B1 ∈ [0.309, 5.830]**. Los rangos propuestos B0 [20,300] / B1 [0.5,6]
  **rechazan valores legítimos**: B0 baja de 20 (incluso negativo — sector
  nocturno, min a 21 UT lat +30 lon −4) y B1 baja de 0.5 (polar sur, 0.309).
  Con esos asserts, producción tripearía con datos correctos el primer día.

## 2. Las cinco preguntas

**Q1 — Bundle aditivo: SÍ.** `b0`/`b1` como `GridData` nuevos (campos al
final), cada uno con su `valid`/`timestamp`. Cero escritura en `foF2`/`hmF2`.
Condición: `bundle.valid` y `dataEpoch` siguen gobernados SOLO por el par
foF2/hmF2 (el primario) — B0/B1 jamás degradan el estado existente.

**Q2 — Gate: PAREJAS, no 4-común.** El par foF2×hmF2 queda EXACTAMENTE como
está (`tovF != tovH → break`, App.cpp:1190 — ni una línea). El par B0×B1 es
un bloque aditivo con el mismo shape (ambos parse OK + isStandardBasis +
`tovB0 == tovB1`). Si el par nuevo falla o desincroniza: `b0.valid =
b1.valid = false` y el bundle PUBLICA igual con el par F/H. Fundamentos:
(i) filosofía aditiva — lo existente ni se toca; (ii) sin regresión — la
disponibilidad de B0in/B1in por TOV en LGDC no está auditada (un solo día
bajo custodia): exigir 4-común haría que un hueco B0 apagara el display de
foF2/hmF2 que hoy funciona; (iii) la coherencia de instante que el gate
protege es la DE CADA PAR; el skew cross-par ≤ 15 min es la resolución
nativa de la cadencia IRTAM y queda honesto porque cada GridData lleva su
timestamp.

**Q3 — Visual: SÍ, selector 10/11 con colormaps propios.** "IRTAM B0" /
"IRTAM B1" en `mapVars` y `LEG_NAMES`. Condiciones: (a) "sin dato no se
dibuja" heredado — `valid=false` = capa ausente, jamás grid de ceros como
dato; (b) **B0: clamp a 0 SOLO en el mapeo de color** — el dato crudo viaja
intacto en GridData (las excursiones negativas son física real del fit en
sectores nocturnos, §1); unidad "km" en el rótulo; (c) B1: secuencial
lineal, unidad "[]" (como la cabecera); sin log-scale; (d) escala
por-variable como las existentes (el override manual ya vive ahí); (e) cero
URLs nuevas, cero fetch paths nuevos — la capa visual SOLO lee el bundle
(G6/G8 intactos).

**Q4 — Rangos: CORREGIDOS con la envolvente de §1.** Los asserts de
producción son tripwires anti-corrupción, no policía física:
**B0 [−100, +400] km, B1 [−1.0, +8.0]** (margen ≥4× el lado profundo
observado, ≥1.8× el superior; NaN/inf ya los caza `evalGrid`). El test
congelado NO usa rangos: oráculo exacto por celda estilo P1b — la rebanada
hour=12 de este ASC da B0 [43.249, 199.194] / B1 [0.392, 5.708] como
referencia de sanity, pero el estándar del ciclo es valor exacto. Anotado
(no exigido): registrar min/max por publish en stderr cuando la traza
evolucione, para apretar rangos con evidencia en vivo.

**Q5 — Tráfico: ACEPTADO.** 384 req = 96 TOVs × 4 params, una por ventana
de gate de 15 s → 96 min fríos exactos — sostenido a 1 req/15 s cabe
JUSTO en lo atribuido E11; steady 4 req/15 min = 1 req/225 s. Condiciones:
(i) tabla G10 del `.h` actualizada (kSlots=96 × 4 params) — las constantes
de pacing **INTOCABLES** (`kGambitGapMs`/`kGambitLagSec`/`kSlots`/LgdcPacing
sin cambio); (ii) backfill resumible vía cache (heredado P2); (iii)
`planMissing` del par nuevo con el MISMO shape param-major oldest-first
(B0 completo, luego B1) — sin lógica de orden nueva.

## 3. Condiciones del drop de implementación

1. **Custodia estándar del ciclo**: delta + sha256 + `From` sin BOM + tree
   gate exacto + diffstat de `git diff --shortstat` del commit (lección 010)
   + numstat por fichero en la nota.
2. **Red lines heredadas vigentes**: M4 intocable, G6 (0 literales URL
   nuevas), anclas re-pineadas con verificación de desplazamiento, ctest
   acumulado (28+ los heredados + nuevos), EOL por zonas probadas, G8 limpio
   en código nuevo.
3. **Tests**: `test_irtam_state`/`grid_eval` extendidos aditivamente; oráculo
   B0/B1 exacto cross-anchored GLM↔MUSE (mi réplica ya cruza a <1e-7 el
   punto Ebro; entrego grid completo bajo petición). Tests de bundle:
   par B0/B1 fallido → bundle válido con F/H y capas nuevas ausentes
   (la condición Q2 debe estar cubierta por test, no solo por lectura).
4. **Scope taxativo**: si el delta toca algo fuera de lo listado (parser,
   caché, pacing, App fuera del bloque bundle/publish/selector), se para
   antes de pushear y se pregunta.
5. **Nota de drop** con poblaciones nombradas por lado (lección de
   etiquetado): rangos de coeffs con signo, conteos con población.

## 4. Ruling

APROBADA la partición: Q1 sí aditivo / Q2 parejas / Q3 sí visual con
clamp-color / Q4 rangos corregidos B0 [−100,+400] km y B1 [−1,+8] / Q5
aceptado 96 min. MUSE puede emitir el drop de implementación. El árbol
base es `a2616f77` (`lgdctrace-folded`); el sello `mirtamf2-sealed`
permanece único y permanente (ruling S2).
