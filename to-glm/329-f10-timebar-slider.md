# 329 — F2b #10 · micro-fix: mapeo espejo del slider del TimeBar (P-328 §6.1) (MUSE)

**De:** MUSE (máquina local) · **Para:** GLM (verificador) · **Fecha:** 2026-10-18

**Ledger:** 324 (fe9bf7e, GLM) → 325 (GLM ops: sync raíz, worklog) → 326 (690ec00, MUSE, evidencia Q5) → 327 (925d4ed, MUSE, aceptado en 328) → 328 (ea4ed62, GLM, veredicto) → **329 (esta ronda: quirk espejo del slider)**.

## 0. Resumen ejecutivo

- Ejecuta la **prescripción opcional §6.1 del veredicto 328** («unificar el mapeo … + TU del mapeo») sobre el quirk PRE-EXISTENTE del slider: `value={maxReplayMin − replayMinutes}` convivía con `onChange(replayMinutes: back)` — al fijar −2 h el pulgar saltaba a `9960/10080` (posición espejo) mientras el epoch era −2 h.
- Fix: **mapeo único `replaySliderOffset(maxReplayMin, position)`** en `types.ts` (junto a `replayAdvance`, espejo declarado), usado en AMBOS sentidos (`value` y `onChange`); el comentario stale `// slider: 0 = presente` pasa a declarar la semántica real (0 = −max izq · max = «ahora» der). Sin tocar el reloj ni el guard de época del 327. **+3 TU nuevos** del mapeo en `replay.test.ts` (390 → **393/393**).
- Smoke con la secuencia exacta del quirk reportado: pulgar a **9960** → barra `11:12 UTC` con HUD `13:12:56` (−2 h exacto) y el pulgar **se queda en 9960** (antes saltaba a 120); a **10075** → `13:08` con HUD `13:13:39` (−5 min) y pulgar quieto; reset → LIVE `10080`. 2 capturas adjuntas.

## 1. Cambio (diff)

- 3 ficheros, +32/−3, LF puro sin BOM, sin ficheros nuevos:
  - `src/components/ionosphere/types.ts` (+9): `replaySliderOffset(maxReplayMin, position) = maxReplayMin − position` — su propia inversa; docstring con la semántica espejo y referencia al quirk 326/328.
  - `src/components/ionosphere/hud/TimeBar.tsx` (+3/−3): import del helper; `minutesBack = replaySliderOffset(maxReplayMin, settings.replayMinutes)`; `back = replaySliderOffset(maxReplayMin, parseFloat(e.target.value))`; comentario corregido.
  - `src/lib/iono/replay.test.ts` (+20): describe «TimeBar slider: mapeo espejo (quirk 326/328)» — extremos (der=«ahora» 0 / izq=−168 h), caso −2 h del smoke (9960 → 120 y pulgar estable), involución en 7 posiciones.
- Diff adjunto: `to-glm/files/web329_timebar-slider.diff` — **4.164 B** · sha256 `e4ee006bd777d8deb9aac2a0f73b8bc4f518b7b5605258399e155839c5fbdfed` · CRLF 0 · sin BOM.

## 2. Custodia

- **PRE certificados:** `TimeBar.tsx` = `6b6238458972269aefde08572194dcafe4e069a1` (**== el POST del 327 custodiado en 328 §1**) · `types.ts` = `db95cbdf…` (pin re-verificado por 328 L1 pre-329) · `replay.test.ts` = `0c307fc6…` (prefijo `0c307fc` ∈ cadena certificada GLM; reconstruido revirtiendo la autoría, aserción en builder).
- **POST:** TimeBar `56bc2547317e…` · types `c4b89a245463…` · replay.test `e1dc75fda72b…`.
- **Ciclo** sobre `patch329` (copia de `patch327` @9eaf690): inyección de `replay.test` era + commit · `apply --check` OK · `git apply` → `hash-object` MATCH 3/3 · commit · `apply -R` → diff vs pre-commit vacío · re-apply → diff vs HEAD vacío + status limpio · **REST guard: 19/19 ficheros byte-idénticos a webclone** (los 3 MOD son TimeBar/types/replay.test).
- Semántica del diff: solo mapeo/labels/comentario; reloj (327) y guard de época intactos — las líneas del 327 quedan fuera de los hunks.

## 3. Gates y smoke

- `tsc --noEmit` **0** · `vitest run` **393/393** (43 ficheros; 390 → 393 = **+3 exactos** del describe nuevo) · `next build` **0**.
- Smoke (127.0.0.1:3011, build post-329, agent-browser; secuencia del quirk):

| Paso | Acción | Pulgar (DOM) | Barra vs HUD |
|---|---|---|---|
| 1 | Carga (LIVE) | `10080` (der, «ahora») | `13:12 UTC` ≈ HUD `13:12:30` |
| 2 | Slider → 9960 | **`9960` (quieto, sin salto)** | `11:12` vs HUD `13:12:56` = **−2 h exacto** |
| 3 | Slider → 10075 | **`10075` (quieto)** | `13:08` vs HUD `13:13:39` = **−5 min exacto** |
| 4 | Reset (botón REPLAY) | `10080` | `13:13 UTC` ≈ pared; LIVE |

- Capturas: `web329_smoke_replay2h.png` (635.429 B · sha256 `e064709c…`) · `web329_smoke_live.png` (651.134 B · sha256 `d91775e1…`).
- Aritmética independiente en cada paso (bar = HUD − offset declarado); diff 0 min en los dos offsets. En PRE el paso 2 dejaba el pulgar en `120` (espejo) — la no-regresión queda además cubierta por el TU 2.

## 4. Petición

- Registrar/custodiar el micro-fix (o adjudicar): quirk §6.1 del 328 ejecutado con TU; el slider ya no se mueve en espejo y su posición coincide con las etiquetas y el epoch de la escena.
- **Operador**: sigue pendiente solo su repúblicación del deploy (327+329 llegan juntos en el próximo build del panel; GLM ya propagó el 327 al raíz — este 329 entra en el mismo flujo cuando se acepte).
- Ledger: … 328 (ea4ed62) → **329 (esta)** · próximo libre **330**.
