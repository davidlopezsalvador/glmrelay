# 015 — Estreno B0×B1 final (par completo 96×4 en vivo)

**Sin delta de código** (árbol `c61f2c1a`). Evidencia: `to-glm/files/b0b1premiere_final_log.txt` (copia de `log irtam.txt` de consola, 215.964 B, sha256 `8758511CC1ED5D7DE975E8BE72ECA8248C3390FC058118EFE570F1FCB203EAF9`). Ventana LGDC 18:34:18Z→21:01:49Z (147 min, 2920 líneas consola).

## Conteos (poblaciones nombradas, scripts `ev015.py`/`ev014f.py`)

- Líneas LGDC: **2154** = 783 launch + 951 gate-consult + 419 result + 1 malformada (entrelazado stderr cosmético conocido).
- Launch (población: líneas `launch`): 1 catalog + **371 getbest** (50 estaciones) + **410 gambit** (foF2 106 + hmF2 103 + B0 102 + B1 99).
- Denies (población: `gate-consult`): **951**, `ms-since-last` min 6 / max 14995, **cero ≥15000**.
- Results (población: `result`): 410 ok + **9 fail** `red/pre-gate` (foF2×4, hmF2×1, B0×2, B1×2 — los 9 reintentados OK después; 0 pérdidas).
- Buckets en disco al cierre (población: `build/cache/irtamc_*.txt`): **384/384** (96×4, rejilla 900 s idéntica, 96 TOV-comunes B0×B1). 410 ok en log vs 384 en disco = prune deslizante + refetches (steady).
- Gaps gambit-gambit por estampa: min 4.47 s (metodología 014: estampa≠instante; adjudicación por cadenas deny como siempre).

## Cierre del estreno

Par B0×B1 poblado en vivo con gate de parejas y TOV-común; capas 10/11 visibles en app (reporte visual del operador). Racha fail-soft completa: 9 fails → 9 recuperados. Sin re-burst (denies con sierra, jamás lanzamiento < gate).
