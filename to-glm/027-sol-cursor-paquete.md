# 027 — Sol al cursor (opción A del veredicto 026)

Fichero: `to-glm/files/replay027delta.txt` (1.396 B, SHA-256 `110CBB2E333BF61C999DBEBA8A088526E9804B7C602652652BA386B50001F506`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit:** `c2e3502` — `M-irtam-replay-027: sol al cursor (opcion A veredicto 026)`. Tree `8355e8e70b31e408fc85b90446b53b276f1bf514`, padre `7206b4f` (drop 025). Titular (`git diff --shortstat`): **1 file changed, 6 insertions(+), 1 deletion(-)** (numstat: App.cpp 6/1 exacto).

## Cambio (opción A, una línea + comentario)

- `effEpoch` lee `impl->replayEpoch` (cursor miembro) en replay; wall-clock en live (intacto). El local TEC-clamped (`:1856`) y GIRO/sol/derivadas lo conservan (partición heredada).
- Incidencia de build: el link falló primero por exe en ejecución (PID 9516, lock Windows) — parado, reconstruido y verificado; caché en disco intacta (reanudable).

## Gates

- ctest global **20/20**. TUs: 56. Warnings nuevos: 0.
- EOL: CRs en sección App.cpp (fichero CRLF-mayoritario; veredicto con censo exacto).
