# 024 — Paquete M-irtam-replay PERF (ruling R2): worker async + dt clamp

Fichero: `to-glm/files/replay024delta.txt` (17.969 B, SHA-256 `9881CECEA648F14F4284A5753A1FBA589EBA222AD9E06E2AECCD918A11E4977B`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit:** `70f4bd4` — `M-irtam-replay-024: worker async muestreo + dt clamp + render consume-only`. Tree `239bf4a375af44242c290c003d9535eed9bb5517`, padre `fd2def0` (fix 019). Titular (`git diff --shortstat`, lección 010): **2 files changed, 148 insertions(+), 95 deletions(-)**. Numstat: App.cpp 144/95, App.h 4/0 (= 148+/95- exacto).

## Ruling aplicado (024 PERF)

- **dt clamp**: avance del epoch con `advDt ≤ 100 ms` solo para el avance (dt global intacto) — rompe la amplificación.
- **Worker asíncrono** (`irtamSampleThread`, patrón backfill P4/M0.2 + join en shutdown): dueño ÚNICO de `sampleIrtamPairAt` (aserción estructural: 2 ocurrencias en `git grep` — definición + worker; cero en camino de render).
- **Render consume-only**: `App::consumeIrtamSample` (nuevo, App.h) postea petición idempotente + copia bajo handoff corto; en miss pinta lo anterior (stale autodeclarado por el badge, que ya nombra el TOV). Badge bajo lock (carrera worker/render cerrada).
- **G8 render-path wait-free**: en añadidas del camino per-frame solo `lock_guard` de handoff (sancionado) — cero sleeps/joins/waits (el `sleep_for` vive en el worker, permitido M11/P4); joins solo en `shutdown()`.
- **Memo del scan: NO aplicado** (medir-primero): el miss dominante es eval (509 ms medidos sin loadCached) frente a scan+parse; un memo no cerraría el gap 10x a speed 8, y el stale honesto es el comportamiento diseñado. IrtamCoeffCache intacto.

## Gates

- ctest global **20/20** (sin cambios en tests; cableado App-level verificado por lectura + grep). TUs: 56. Warnings: clases idénticas al baseline HEAD (+0).
- G6: 0 literales URL en añadidas. Publish F/H y B0×B1 byte-idénticos (cero hunks). Intocables R1 íntegros.
- EOL: 292 CRs, población = todas las líneas del delta en la sección App.cpp (fichero CRLF-mayoritario; App.h LF +0).
- Anclas re-pineadas (solo desplazamientos por inserción, poblaciones: líneas App.cpp): mergeKc2g def 386, gate F/H 1327, commonTov 1372, restore call 1579, restore def 2753, applyCL def 2855, E9 3397, freshest 3627, setvbuf main.cpp:8.
- Re-medición del miss: antes ≈ 0,5-1 s en hilo de render (509 ms test + loadCached encima); después = handoff ~µs en render (worker paga el coste fuera del frame). Prueba viva del presupuesto en premiere 026.
