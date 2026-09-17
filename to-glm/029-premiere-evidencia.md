# 029 — Premiere M-irtam-replay en vivo (evidencia, sin código)

**Sin delta de código** (árbol `32a902c5`, binario del mismo árbol). Evidencia: `to-glm/files/premiere029_log.txt` (copia stderr, 148 líneas, 12 min) + reporte de operador abajo. Sesión 01:15:57Z→01:28:40Z, PID vivo, caché 384/384 previo.

## Verificación operador de las 5 expectativas (ruling 026 + O1 025)

1. **Sol fluido en IRTAM**: SÍ (fix 027 verificado en vivo).
2. **Imagen fluida a 2x**: SÍ (bracket + render-lerp 028).
3. **Miss**: tirón aislado ocasional, sin diapositivas.
4. **Bordes O1**: TEC en T−24h exacto fresco; **stale desde las 72 h** reportado por operador (transición IrtamOnly→DeadGap con clamp+nota, conforme).
5. **8x honesto**: con notas de borde (sin reclamación en contra).

## Traza (poblaciones: líneas LGDC, script `ev029.py`)

- 145 LGDC = 59 launch (51 getbest + 8 gambit) + 77 denies (min/max en rango, **cero ≥15000**) + 9 results (8 ok + 1 fail).
- Fail `foF2 2026.09.13T23:00 red/pre-gate` a 37 s del cierre del snapshot: reintento pendiente al congelar (fail-soft; caché intacto 384/384). Sin pérdidas confirmadas en ventana.
- Tráfico steady en hora punta diurna, gate respetado en todo el tramo.
