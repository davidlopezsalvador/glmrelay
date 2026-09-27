# 070 — Opción B FASE 3: backfill 1536 + premiere (ejecución, sin código)

**Sin delta de código** (master `4047a5f`, árbol `779d21b3`; build fresco clean-first, exe `LastWriteTime` **2026-09-27 13:05:13**, regla 033). Ficheros: 5 PNG + 6 logs + script (custodia abajo).

## Backfill: 384 → 1536 ficheros (26.5 MB), planMissing vacío

Tramos (todos mismo binario/árbol): T1 run1 (~13:07–14:0x, muerto por cierre manual de David) · T-ciego run manual David ~20 min sin traza (~16 buckets, reconstruido desde disco §anexo) · T2 run2 PID 3252 (tramo principal, con traza) · T-prem PID 2384 (solo edge/borde).

- Gambit launches: T1 147 + T2 1095 + ciego ~16 = **~1258 ≤ 1800** ✓ (techo holgado).
- ok/fail: 147+1095 ok por param en orden (foF2→hmF2→B0→B1); fails 5+11 aislados, **máx. 1 consecutivo** (reglas a/b sin disparo: nada que parar).
- Pacing launch-a-launch gambit: T2 ≥15 s: 1066 · 14–15 s: 23 (roce de granularidad del gate) · 10–14 s: 1 · <10 s: 4 (retries fail-fast ~5 s por diseño); **cero <5 s** (cero bursts). Denies 942 (gate arbitrando, max 14997). Getbest 573+171 + catalog 1+1 declarados (cadencia preexistente, fuera del techo).
- Disco final: **1536 irtamc_*.txt exactos** (384×4); cola drenada a refrescos de borde (steady, TOVs frescos en cola).

## Premiere (5 PNG, custodia estándar)

- `ev070_168h.png` (20768DD6, 486493 B): per-layer IRTAM @168.0h — `Loop: IRTAM 96.0 h` + `Zone: solo-IRTAM` + DATA 09-20 20:14 + malla (borde profundo, 4.º ciclo diurno visible).
- `ev070_120h.png` (888F6672, 536226 B): @120.0h + badge retrospectivo en vivo.
- `ev070_72h.png` (5674AF47, 565137 B): @72.0h borde fresco.
- `ev070_board.png` (0B7C6082, 122846 B): 14 filas con edades andantes.
- `ev070_union168h.png` (95E1C18F, 438552 B): unión — `Window: union 168 h` + `Zone: solo-IRTAM [T-168,T-72]` + DATA 09-20 20:27 + checkbox `Full 168 h window`.
- Cursor posicionado por David a mano (precedente 046); capturas y métrica mías.

## Custodia logs + instrumento

- `ev070_fase3_run1_stdout.log` 001248CC 17912 B · `ev070_fase3_run1_stderr.log` 2F8AFDD0 55033 B · `ev070_fase3_run2_stdout.log` C4CC5EAD 104159 B · `ev070_fase3_run2_stderr.log` 3399B711 277702 B · `ev070_prem_stdout.log` EB9F9EA0 4176 B · `ev070_prem_stderr.log` A5DCCE38 11423 B.
- `supervisa_fase3.py` depositado (3F5E80EA…FCBD, versión con regex `gambit (\w+)` — el `param=` original no casaba el formato de traza).

## Anexo de honestidad

1. Tramo ciego (~16 buckets, traza ausente por relanzamiento manual): reconstruido por mtime+TOV de fichero (contigüidad verificada, sin huecos); fails transitorios invisibles (reglas de pausa no verificables ahí).
2. Fin de T2: app colgada (Responding False, log parado 19:49Z) tras completar el drenaje; sacrificada y relanzada en fresco para la premiere (caché intacta, cero tráfico repetido).
3. Pacing <15 s (32/1242): roces de granularidad 14.5–15.0 y retries fail-fast; media 16–24 s; adjudicación del gate al veredicto.
