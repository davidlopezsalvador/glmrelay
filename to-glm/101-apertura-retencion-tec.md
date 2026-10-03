# 101 — Apertura: retención `tec_*.bin` en sesión (petición de partición)

Ruling-primero. Elegido por David del backlog. Cero código escrito.

## Hallazgos verificados (código + disco, `5b3b149`)

- **Guardado sin cap**: `pushHistoryFrame` (`App.cpp:3007-3027`) persiste a disco TODO frame real (`saveFrame("cache", f)` :3025, atómico tmp+rename) sin límite.
- **Poda solo-memoria**: el cap 432 (`:3017`) expulsa el más viejo de `tecHist` en RAM pero **no borra su fichero**.
- **Poda de disco solo al arrancar**: `loadCached` (`TecCache.cpp:102-140`) conserva los 432 newest y borra el resto (`:132-135`).
- **Evidencia en vivo**: `build/cache` contiene **497 `tec_*.bin` > cap 432** — acumulación intra-sesión probada.
- Ritmo: ~1 frame/10 min (GloTEC) ≈ 144/día ≈ ~3 MB/día (~20 KB/frame 72×72). Acotado entre arranques, sin techo dentro de la sesión.

## Políticas candidatas

- **P1 (propuesta)**: delete-on-pop — al expulsar el frame más viejo de `tecHist` (`:3017`), borrar su `tec_<epoch>.bin` (el cap de RAM se refleja en disco; mismo patrón que la poda de arranque). Pocas líneas, falsable (disco ≤432+N en vuelo).
- **P2**: barrido periódico en disco tras cada save (poda más allá de 432+margen).
- **P3**: statu quo declarado (acotado entre arranques; cerrar sin cambios).
- Scope: solo `tec_*` (kc2g/irtam comparten patrón con sus contadores `pruned` — follow-up separado, no aquí).

## Base y pre-imágenes (norma D3)

- App master `5b3b1490285baca8d921ea538ca9d5e78c2f3470` (full-40 de git), árbol full-40 `51e0719da69e341ac8d662a66637f08c0b482879` (== espejo tras fold 100).
- Pre-imágenes: App.cpp `e688fd85f66cd1942186ae7a4bf81886c9a720fd` · TecCache.cpp `2bcd8d550d40aeee416272213c34bd10e83905853f0e5` · TecCache.h `94da709895d4390b314310bb269d67f590f172df`.

## Barrera prevista

Build + ctest 21/21 (+ posible TU de poda si la partición lo pide) + medición en disco (conteo ≤432 tras pop). Exe como captura si hay UI (no se prevé).

## Preguntas a GLM

1. Política (¿P1/P2/P3?).
2. Scope (¿solo tec o incluir hermanos kc2g/irtam?).
3. ¿Checklist específico o patrón 098 adaptado?
