# 009 — Cierre-en-vivo (M-IRTAM-F2): contadores del gate en sesión real de producción

**Sin delta de código.** Árbol a sellar: `03bcd8b4` (commit `b6ee8b3`, verificado `git rev-parse HEAD^{tree}` antes de arrancar; binario `build/ionosphere-live-3d.exe` del mismo árbol). Evidencia: `to-glm/files/live009_irtamc_timeline.csv` (192 filas, 15.973 B, sha256 `51B024C47AB134E0098A6F5113B137787CEB346CBA109C108A5CEA9CC0135AE4`) + `to-glm/files/live009_stderr.log` (337 B, sha256 `D11287326DFBA630241291AA47CFA3407C65F4594277038B50BC00B9D7AE70B8`).

## 1. Sesión

- Inicio UTC 2026-09-15T01:10:39Z, fin 08:06:30Z → **6 h 56 min** (contrato: ≥75 min ✓ con margen).
- Arranque frío: `cache/` ausente al lanzar (verificado `Test-Path` False), PID desacoplado, proceso vivo toda la ventana.

## 2. Gate gambit (línea de tiempo de completitud = mtime de buckets)

- **192 lanzamientos con éxito**: 96 foF2 + 96 hmF2, 96 TOVs distintos paso 900 s, tamaños ~18 KB (dato real, no vacío).
- Gaps de completitud (167 intra-ráfaga): min **14.0 s**, medio 123.5 s, max 1002 s; **14 gaps <15 s** (todos en ráfagas backfill, min 14.0).
- **Metodología declarada**: son gaps de *completitud* (creación de fichero = lanzamiento + duración fetch 1-5 s), no de lanzamiento. Un gap 14.0 es consistente con lanzamiento ≥15 s + fetch más rápido el segundo. No hay instrumentación de instante-de-lanzamiento en esta build (stdout void, ver §5) — la adjudicación aritmética estricta queda en tus manos con el CSV crudo.
- **Denegaciones-espera**: silent by design (solo string para badge) → no contadas; acotadas por ritmo (reintento 5 s). **Laguna de instrumentación declarada** (propuesta futura: printf a stderr; requeriría delta + re-fold — tu decisión, no bloqueante propuesto).

## 3. Backfill

- 192 = 96 × 2, solo-faltantes (`planMissing`), en 2 ráfagas (01:29-01:52 ×71, 02:00-02:22 ×75) + steady. Retraso inicial 19 min + hueco 462 s: compatibles con 429-storm o sleep (ver §6); todo reintentado fail-soft hasta 192/192.

## 4. Steady

- **23 pares** (46 ficheros) 02:33→08:02, cadencia ~11-17 min (alternancia 667/999 s), **pair-gaps todos ≥15.7 s**. Cero re-burst (sin clusters rápidos en toda la ventana).

## 5. getbest — DECLARADO FALTANTE

- Tasa en régimen (~5/min M4) **no observable** en esta build: sus printf van a stdout (void en este runtime) y no dejan traza en disco. M4 intacto por código (blob `d50f1bca` verificado en folds). Propuesta: misma instrumentación stderr futura.

## 6. Fail-soft en vivo + contexto de la noche

- **Cero pérdidas**: 192/192 buckets + 192 sidecars, parse válido implícito (tamaños 18081-18094 B = ASC reales).
- Noche fragmentada en 25 ráfagas (tec: 66 gaps >120 s; `GloTEC vacio` repetido en stderr — familia ajena, preexistente). Causa sleep-vs-red **no adjudicable** desde los datos; el backfill completó fail-soft en ambos casos.
- **Sorpresa-per-contrato**: los 14 gaps <15 s de completitud (min 14.0). Sin instrumentación de lanzamiento no se convierten en violación; van con datos crudos para tu aritmética.

## 7. Estado final

- `cache/irtamc_*`: 192 .txt + 192 .meta. Ejemplos: `irtamc_fof2_1789114500.txt` (primero) … `irtamc_hmF2_1789200000.txt` (último).

## 8. Badge

- No capturado (ventana no traíble a primer plano sin disrumpir el escritorio; 2 intentos documentados). Lógica cubierta por `test_irtam_state` 11/11.

## 9. Tabla G10 final (números en vivo observados)

- Gambit: 192 backfill + 46 steady en 6.9 h, 1 req/≥15 s sancionado, resumable verificado (ventana deslizante con prune a cap 96).
- Getbest/catálogo: sin contadores en vivo (laguna §5); valores de diseño vigentes (getbest ~5/min, catálogo retry 3×1 s).
