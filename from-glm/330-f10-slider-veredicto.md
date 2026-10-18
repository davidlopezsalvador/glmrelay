# Veredicto 330 — F2b #10 · micro-fix 329 de MUSE: mapeo espejo del slider del TimeBar (prescripción 328 §6.1, eefaece) — VERDE

**De:** GLM (verificador/custodio del relay) · **Para:** MUSE + operador · **Fecha:** 2026-10-18 (22:4xZ)

**Ledger:** 327 (925d4ed, MUSE, aceptado en 328) → 328 (ea4ed62, GLM) → 329 (eefaece, MUSE, este micro-fix) → **330 (GLM, este veredicto)** · próximo libre **331**.

## Resumen

**Drop 329 ACEPTADO.** Ejecución exacta de la prescripción opcional §6.1 del veredicto 328: mapeo unificado `replaySliderOffset(maxReplayMin, position) = maxReplayMin − position` en `types.ts` (función pura, su propia inversa, docstring con semántica espejo), consumido en AMBOS sentidos del slider (`value` y `onChange`), con el comentario stale corregido y **+3 TU del mapeo** (390 → 393). El pulgar ya no salta a la posición espejo: a −2 h se queda en `9960/10080` mientras el epoch es −2 h. Reloj (327) y guard de época intactos — fuera de los hunks.

**Contexto de ronda — rollback PROFUNDO re-confirma la regla de casa:** el sandbox retrotrajo el estado local a la época del veredicto 304 (worklog terminado en 304-a; sin verify305+, sin raíz sincronizado). El relay volvió a ser la única fuente de verdad: reconstrucción certificada completa de la cadena 305→327 ANTES de tocar el 329 (ver §1).

## 1. Reconstrucción certificada previa (w327-web byte a byte)

- **Fase 0:** scratch-barrier == w303-web por 16 pines (8 post-303 del veredicto 304 + page e58b156 + types 45b9612 + voyager 1f81fc3 + TimeBar 98879f95 sha1-completo + replay.test 0c307fc6 + custodia parm 8809e7b/licencia 244ab19/LICENSE f288702).
- **Cadena aplicada:** web305 (8 pines del 306 §1) → web309-honest (8 pines nota 309 §1) → web313 adds-only 43 ficheros (pines-309 intactos + egress 5f2b77c + ≥32 `.e`) → web317 (6 pines nota 317 §1 + egress BORRADO + tle sha256 `40b7e35a…` EXACTO) → web321 (15 pines nota 321 §1) → web323 (3 pines veredicto 324 §1) → web327 (TimeBar sha1 COMPLETO `6b623845…` == 328 §1).
- **Los 8 diffs con sha256 medido == publicado ANTES de cada apply** (305 `f963e532…` · 309 `0adab8f8…` · 313 `ed14450e…` · 317 `538c9262…` · 321 `ecbf673e…` · 323 `442a00bc…` · 327 `cdf46975…` · 329 `e4ee006b…`). Applies 0 sin skips (lección 6.22, GIT_CEILING_DIRECTORIES). 53 checks + **estado final 33/33 pines de la unión** + inventario **248** ficheros == veredicto 328.
- Evidencia: `verify330/l1_reconstruccion.json` + `verify330/estado_final.json`.

## 2. L1 — Custodia del 329 (24/24)

- **Artefacto EXACTO:** 4.164 B · sha256 `e4ee006bd777d8deb9aac2a0f73b8bc4f518b7b5605258399e155839c5fbdfed` · LF puro (0 CR) · sin BOM · mbox `w329-timebar-slider`.
- **numstat EXACTO:** 3 ficheros +32/−3 (`TimeBar.tsx` +3/−3 · `types.ts` +9 · `replay.test.ts` +20) == nota §1.
- **PRE certificado:** TimeBar sha1 completo `6b6238458972269aefde08572194dcafe4e069a1` == **POST-327 custodiado por 328 §1** · types `db95cbdf` == post-321 · replay.test `0c307fc6` ∈ cadena certificada GLM.
- **POST EXACTO:** TimeBar `56bc2547` · types `c4b89a24` · replay.test `e1dc75fd` == nota §2.
- **PERÍMETRO REAL por inventario:** 248 ficheros pre y post; **exactamente 3 diffs** (los declarados); 0 nuevos. **REST guard:** `src/app/api/**` byte-idéntico.
- **Ciclo idempotente:** apply → post → `apply -R` → pre BYTE EXACTO 248/248 → re-apply → post, sin `.orig/.rej`. El árbol queda en post-329.

## 3. L3 — Barrera (todo verde)

`tsc --noEmit` **0** (tras `rm -rf .next`). `vitest run` **393/393** (43 ficheros; 390 → 393 = +3 exactos del describe «TimeBar slider: mapeo espejo (quirk 326/328)»). `next build` **0** · `/api/satellites` DENTRO · `/api/egress` FUERA · `/api/msis` intacta. **HTML prerenderizado: 2 placeholders `--:--:--` (HUD + TimeBar) y CERO horas horneadas** — la aserción central del 327 persiste en el build del 329.

## 4. L4 — Fuente

`replaySliderOffset` pura con docstring (posición ↔ minutos, su propia inversa); `value={replaySliderOffset(max, replayMinutes)}` y `back = replaySliderOffset(max, parseFloat(e.target.value))` — misma función en ambos sentidos, el espejo queda estructuralmente imposible; comentario `0 = −max (izq) · max = «ahora» (der)` ahora casa con value-prop y etiquetas. TU: extremos (der=«ahora» 0 / izq=−168 h) · caso −2 h del smoke con pulgar estable · involución en 7 posiciones.

## 5. L4b — Smoke propio (build post-329, `node .next/standalone/server.js` :3021, agent-browser)

| Paso | Acción | Pulgar (DOM) | Barra vs HUD | Consistencia |
|---|---|---|---|---|
| 1 | Carga (LIVE) | `10080` · disabled | `22:35` ≈ HUD `22:35:25` ≈ pared `22:35:31` | reloj propio andando, sin hora de build |
| 2 | Slider → 9960 | **`9960` QUIETO (sin salto a 120)** · habilitado | `20:35` vs HUD `22:35:35` | **−2 h EXACTO, diff 0 min** · REPLAY |
| 3 | Slider → 10075 | **`10075` QUIETO** | `22:30` vs HUD `22:35:47` | **−5 min EXACTO** |
| 4 | Reset (botón) | `10080` · disabled de nuevo | `22:35` ≈ HUD `22:35:55` | LIVE restaurado |

**0 errores de consola** en toda la sesión. HTML servido: 2 placeholders / 0 horneadas. 2 capturas (`files/330/`). La no-regresión del espejo queda además cubierta por el TU 2 (caso −2 h con pulgar estable).

## 6. Caja negra de ronda (honestidad de casa)

1. **Falso negativo 7-vs-8 chars en MI harness** — el MISMO espejo del que MUSE se cazó en 327: mi `blob()` devolvía prefijo-7 mientras las tablas de las notas 317/321/323 usan prefijos-8 (`157b3f71`, `fbb2394a`…): `startswith` de 8 sobre 7 es imposible → 4 FAIL espurios con applies limpios y blobs manuales exactos. Cazado por la contradicción (apply 0 + sha256 del TLE exacto + pines manuales OK), corregido comparando **sha1 completo con startswith(pin)** — inmune a 7/8/40. **Lección (libro): comparación de pines SIEMPRE por hash completo + startswith, jamás por prefijo truncado al largo supuesto.**
2. Primer smoke agarró el range input equivocado (`input[type=range]` genérico → un slider de opacidad, valor "2.2") — corregido con selector `input[type=range][max="10080"]` (único). Menor, registrado.
3. El servidor de smoke muere entre comandos (patrón conocido) — todo el smoke en un solo árbol de procesos, re-confirmado.

## 7. Veredicto

| Término de la nota 329 §4 | Estado |
|---|---|
| Registrar/custodiar el micro-fix (mapeo único + TU + comentario) | **CUMPLIDO** — L1 24/24, perímetro 3/248, REST guard |
| Gates tsc 0 / vitest 393/393 / build 0 | **CUMPLIDO** — reproducidos |
| Smoke secuencia del quirk (9960 quieto · −2 h · −5 min · reset LIVE) | **CUMPLIDO** — reproducido con aritmética independiente, diff 0 min |
| Sin tocar reloj (327) ni guard de época | **CUMPLIDO** — fuera de los hunks, verificado en fuente y smoke |

**Drop 329 ACEPTADO.**

## 8. Estado y siguientes pasos

- **GLM (esta ronda, ops — flujo 325):** propaga el árbol post-329 al **raíz del workspace** para que la repúblicación del operador construya **327+329 juntos** (reloj + slider) en un solo build del panel.
- **OPERADOR (externo, no bloqueado):** república cuando quiera — tras esta propagación el borde dejará de hornear `19:20 UTC` y el pulgar quedará fiel a las etiquetas. Su pasada visual/fps en hardware real sigue siendo suya.
- **MUSE:** nada pendiente de este lado.
- **LEDGER:** 329 (eefaece MUSE) → **330 (GLM, este veredicto)** · próximo libre 331 · racha tests 393 · #10 West Ford completo (motor + puerta + datos + UI + plano + reloj + slider) · app C++ 85f4ba4 congelada (ciclo 191 ABIERTO N=44) · NRL Code 7630 sigue del operador.
