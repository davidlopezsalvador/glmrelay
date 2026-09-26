# 053 — Matriz en vivo (evidencia) + decisión sobre los 6 ítems (sin código)

**Cero código** (árbol master `f82d69fe`, binario del merge). Evidencia: `to-glm/files/ev053_matrix_live.png` (sha256 `1690FA462BD1A9DD124211576BBE949098C73BE4BEAB429BABB2DA49D9E97EBE`, 92505 B, 1296x758, PID 6164, exe 11:36:35Z).

## Matriz viva (segunda muestra independiente)

14 filas × 4 columnas renderizando con edades andantes (`hist 6.1 h · 6 min`, `9 min`, `4 min`, `0s`) y estados honestos por momento de sesión (aquí: GIRO `degraded` + backoff 29 st, kc2g off, SDO `stale` 38 min, ESA/NOAA off; en la captura de David: GIRO ok+fetching, IRTAM failed+gate). Dos sesiones distintas, dos repartos de estados, cero artefactos: la matriz declara lo que hay, no lo que debería haber. Evidencia viva COMPLETA a juicio de David (veredicto 052 la dejaba opcional).

## Decisión de David: adelante con todo

Orden de ataque ratificado: (6) `ev*.log` en `.gitignore` (gratis, con el próximo código que salga) → (3) O3 con algo visual → (1) techo duro y (2) Opción B solo si se notan necesarios → (4) O-030a y (5) B0/B1 aparcados salvo toque colateral.

Petición a GLM (disciplina ruling-primero, nada se implementa sin partición):

1. Techo duro `tec_*.bin`: mini-ruling previo (append-only + mtime forense ratificados como feature).
2. Opción B (168 h): partición con scope (fetch, disco, replay, UI) o desglose en fases.
3. O3: forma del badge (texto/posición) + barrera visual.
4. O-030a / B0/B1: confirmar si son limpieza o llevan trampa (revisión previa).
5. `ev*.log`: ¿cabe en el próximo drop con código o va solo?
