# 014 — Estreno B0×B1 en vivo (snapshot; la corrida continúa, B1 pendiente)

**Sin delta de código** (árbol `c61f2c1a`, binario del mismo árbol). Evidencia: `to-glm/files/b0b1premiere_log.txt` (copia de `log irtam.txt` de consola, 137.414 B, sha256 `BC08D4D64E082B707498B17BE7F7DCDB2243230777891D63110B52CCC150F048`). Ventana LGDC 18:34:18Z→19:56:42Z (82 min, 1821 líneas consola).

## Conteos (poblaciones nombradas, script `ev014.py`)

- Líneas LGDC: **1361** = 460 launch + 655 gate-consult + 245 result + 1 malformada.
- Launch (población: líneas `launch`): 1 catalog + **220 getbest** (50 estaciones distintas) + **239 gambit** (foF2 101 + hmF2 98 + B0 40; B1 aún no arranca — param-major en vivo confirmado).
- Denies (población: líneas `gate-consult`): **655**, `ms-since-last` min 6 / max 14995, **cero ≥15000** — el gate jamás reabrió antes de tiempo.
- Results (población: líneas `result`): 239 ok + **6 fail** `red/pre-gate`, los 6 reintentados OK después (fail-soft, 0 pérdidas).
- Getbest frío 12.00 s + régimen 250 ms, ambos visibles en la misma ventana.
- 1 línea malformada (población: 1361): entrelazado stderr de dos hilos en la misma fd (cosmético, ver §3).

## Reconciliación de aparentes paradojas (lección de protocolo)

- **Estampa ≠ instante**: la estampa `launch gambit` se computa tras perform+parse+save; el record ocurre al inicio del fetch. Latencias LGDC observadas 0.01–15 s (timeout 20 s nunca alcanzado en un ok). Toda forense temporal debe anclarse en `ms-since-last` (record-anchored), jamás en adyacencia de estampas.
- **Cadenas deny 655/655 explicadas** (población: denies): 638 directas (último lanzamiento visible en [last−2 ms, last+8 s]) + 15 que referencian **fail-records** (el record precede al perform fallido y no deja línea `launch`; lasts 16.949/01.879/01.769/03.333/42.665, cada una <20 s antes de su `fail`) + 2 por skew ±1 ms estampa-vs-display (misma base de reloj, distinto instante de lectura).
- **Casos 10:30 (34 ms) y B0-23:45 (9 ms)**: records ~2–15 s antes de su estampa (fetch lento), consult con gate ≥15 s quieto, TOCTOU documentado en 011 (misma clase que la race fría EB040, ahora en régimen). No violación.
- **Línea entrelazada** (§1): `LgdcTrace` muta su formato pero `printf` de GiroAdapter comparte fd sin lock — nice-to-have futuro (rutear por la traza), no bloqueante.

## Snapshot

B0 40/96 al cierre del log; B1 pendiente; la corrida sigue. Números finales del estreno en drop posterior.
