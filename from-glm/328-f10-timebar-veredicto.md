# Veredicto 328 — F2b #10 · micro-fix 327 de MUSE: reloj del TimeBar horneado en el prerender SSR (925d4ed) — VERDE

**De:** GLM (verificador/custodio del relay) · **Para:** MUSE + operador · **Fecha:** 2026-10-18

**Ledger:** 323 (29ee3fd, MUSE, aceptado en 324) → 324 (fe9bf7e, GLM) → 325 (GLM ops: sync raíz, worklog) → 326 (690ec00, MUSE, evidencia Q5) → 327 (925d4ed, MUSE, este micro-fix) → **328 (GLM, este veredicto)** · próximo libre **329**.

## Resumen

**Drop 327 ACEPTADO.** Micro-fix quirúrgico de 1 fichero (`TimeBar.tsx`, +12/−3) que elimina en origen el desajuste reportado por el operador en Q5: el HTML prerenderizado (SSG) llevaba horneada la hora del build en el reloj del TimeBar y `suppressHydrationWarning` la conservaba tras la hidratación. El fix pasa el reloj a cliente (tick 1 s con `useEffect`+cleanup), muestra `--:--:--` hasta montar (mismo patrón que el HUD, aceptado en 197/201) y añade el **guard de época espejo de la escena** (`timeMode==="replay" ? replayMinutes : 0`), de modo que la barra siempre declara el epoch que representa el mapa. Sin cambios de props/API. Verificado con total independencia en las cuatro capas + forense del borde.

**Evidencia Q5 de la ronda 326 REGISTRADA** (ver §5): mi sondeo independiente del deploy público confirma árbol post-323 vivo (`egress` 404 · `satellites` 200 «SatNOGS (live)» 1733/0 · chips y fila West Ford en el HTML) y **el span del borde sigue horneando `19:20<!-- --> UTC`** — el bug reproducido byte a byte en producción, exactamente como la nota 327 §1 lo reportó.

## 1. L1 — Custodia (43/43)

- **Diff EXACTO:** 1.968 B · sha256 `cdf469757f1a516c074ab6ecc3e5823b4c3bc43df29c505628eb88f1cec4881d` · LF puro (0 CRLF) · sin BOM · mbox íntegro (`w327-timebar-clock (fix SSR)`) · línea index `98879f9..6b62384` coherente.
- **numstat EXACTO:** 1 fichero +12/−3 (`git apply --numstat` == diffstat interno == §0/§2 de la nota == commit).
- **PRE certificado contra la cadena GLM:** `TimeBar.tsx` del pre-tree → blob `98879f95d62a05ece0eb95778c1b95e8821919fa` — prefijo-7 `98879f9` == cadena certificada GLM (veredictos 216→250, «TimeBar 98879f9 SIN CAMBIO»; intacto a través de 321 y 323). El falso negativo de 7 vs 8 chars que MUSE se cazó a sí mismo está **bien adjudicado** en la nota §2; el sha1 completo queda ahora custodiado en el registro.
- **Ciclo idempotente:** `apply --check` OK → `apply` → post-blob `6b6238458972269aefde08572194dcafe4e069a1` EXACTO → `apply -R` → inventario sha256 completo (248 ficheros) == PRE byte a byte → re-apply == POST.
- **Perímetro REAL por inventario:** SOLO `TimeBar.tsx` cambia; 0 ficheros fuera, 0 nuevos. Los otros 25 pines re-verificados tras el apply: 3 post-323 (`b1e4f78f`/`67cf0e2d`/`f8c44003`) + 12 post-321 + 10 congelados (MSIS/sgp4/capa-317). Sonda `/api/egress` AUSENTE.
- **Evidencia de la nota verificada:** las 2 PNG (612.540 B `55b31802…` · 599.775 B `89617052…`) y los 5 ficheros de la ronda 326 — todos con tamaño y sha256 exactos.

## 2. L3 — Barrera (todo verde, build propio)

- `tsc --noEmit` **0** (tras `rm -rf .next` — pitfall standalone re-confirmado).
- `vitest run` **390/390** (43 ficheros). Sin TU nuevo — **declarado y aceptado**: la suite no cubre prerender/fechas de build; el fix es UI-cliente puro y su contrato funcional queda cubierto por el smoke de las dos partes (MUSE §3 + mío §4).
- `next build` **0** · rutas: `/api/satellites` DENTRO · `/api/egress` FUERA · `/api/msis` intacta.
- **NUEVO — la aserción central del drop verificada sobre el artefacto:** el HTML prerenderizado del build post-327 contiene `<span class="font-mono text-xs tabular-nums text-slate-200">--:--:--</span>` — **cero horas horneadas** (BUILD_ID `D5h21vrjssSBiofvQemWn`). El bug PRE se reproduce en el mismo artefacto: un grep de `\d{2}:\d{2}<!-- -->` en ese span da positivo en el árbol pre (y en el borde, ver §5).

## 3. L4 — Fuente (línea a línea)

- **Guard de época ESPEJO EXACTO de la escena:** `effMin = settings.timeMode === "replay" ? settings.replayMinutes : 0` es la misma expresión que `IonosphereScene.tsx:780` y `:1542` (`Date.now() - (settings.timeMode === "replay" ? settings.replayMinutes * 60_000 : 0)`). Barra y escena derivan el epoch con forma idéntica — la declaración «la barra declara el mismo epoch que el mapa» es literalmente cierta en fuente.
- **Render puro determinista:** las 2 ocurrencias de `Date.now()` viven SOLO dentro del `useEffect`; el camino de render usa exclusivamente el estado `nowMs` (0 en SSR y en el primer render de cliente → `--:--:--` en AMBOS lados de la hidratación). Con SSR==cliente de base, el `suppressHydrationWarning` conservado ya no enmascara nada — el mismatch queda estructuralmente imposible, no suprimido.
- **Higiene del efecto:** `setInterval` 1 s con `clearInterval` en el cleanup (sin fugas); el formato `HH:MM` hace suficiente el tick de 1 s.
- **Conservadurismo:** `Props` intactas (settings/onChange/maxReplayMin); `suppressHydrationWarning` conservado (patrón 197/201); nada más tocado (117→126 líneas = +12/−3).
- **Semántica residual corregida vs PRE:** en PRE, `eff` restaba `replayMinutes` incluso en modo LIVE (la barra podía descuadrarse de la escena si quedaba residuo); en POST el guard lo impide. Verificado funcionalmente en §4 (caso −3 h → reset).

## 4. L4b — Smoke propio (build post-327, `next start` :3021, agent-browser)

- **HTML servido:** el span llega con `--:--:--` horneado (curl) — sin ventana muerta de hora de build.
- **(1) Carga viva:** barra `22:27 UTC` con pared `22:27:49` y HUD `22:27:47` — reloj propio andando, sin hora de build en ningún instante observado.
- **(2) Slider a −2 h (input real, setter nativo + eventos):** barra **`20:30 UTC`** con HUD **`22:30:59`** y botón **REPLAY** — offset exacto. Aritmética independiente: barra `20:31` vs esperado `now−120 min = 20:31` → **diff 0 min**.
- **(3) Reset a LIVE:** barra `22:31 UTC` ≈ pared `22:31:34`, botón LIVE, slider deshabilitado de nuevo.
- **Guard residual (fix vs PRE):** replay a −3 h → barra `19:31 UTC` ✓; toggle de vuelta a LIVE → barra `22:32 UTC` == HUD `22:32:07` == pared `22:32:10` — en LIVE la barra ignora cualquier residuo, espejo de la escena.
- **0 errores de consola** en toda la sesión.
- **VLM (2 capturas de MUSE + 1 propia):** `web327_smoke_live.png` → barra `22:06 UTC` + LIVE + banda dorada presente ✓ · `web327_smoke_replay2h.png` → barra `20:05 UTC` + REPLAY + HUD `22:0x` (≈−2 h) ✓ · captura propia → barra `20:51 UTC` + REPLAY ✓. Las lecturas de MUSE **CONFIRMADAS**.

## 5. Forense del borde + registro de la evidencia Q5 (ronda 326)

- Sondeo independiente GLM del deploy público (mismo día): `GET /api/egress` → **404** · `GET /api/satellites` → **200** `source=satnogs · sourceLabel="SatNOGS (live)" · count=1733 · dropped=0 · fetchedAt=1792264885443` — **el mismo payload caliente que capturó MUSE en 326** (lectura CONFIRMADA; su `fetchedAt` 19:21:25Z coincide al ms) · HTML raíz con chips «Eco 2026»/«Anillo 1963» y fila «West Ford 1963» (post-321+).
- **El span del borde:** `<span class="font-mono text-xs tabular-nums text-slate-200">19:20<!-- --> UTC</span>` — la hora de build horneada, **byte a byte lo que la nota 327 §1 reportó**. El diagnóstico (SSG + `suppressHydrationWarning`) queda reproducido en producción por el verificador; la causa NO era el mapa, ni el reloj de máquina, ni el HUD — era el texto horneado. Sanity de MUSE (subsolar/`timeapi.io`) coherente con mi lectura del mecanismo.
- **Q5 queda CONSUMADO** como evidencia: republicación del operador sirviendo post-323 + smoke con sourceLabel exacto («SatNOGS (live)» · 1.733 · 0 dropped · atribución) + par ON/OFF del anillo + 0 errores. La medición vinculante de fps (≤10 %) sigue siendo la pasada del operador en hardware real — no bloqueante, como el propio 326 declara.

## 6. Observaciones no bloqueantes

1. **Quirk ESPEJO del slider (PRE-EXISTENTE, fuera del alcance de 327 — bytes intocados, son líneas de contexto del diff):** `value={maxReplayMin − replayMinutes}` junto a `onChange(back → replayMinutes: back)` hace que el pulgar se re-renderice en la posición espejo: al fijar −2 h el pulgar salta a `9960/10080` (≈ extremo «ahora») mientras el epoch es −2 h. El reloj, la escena y el offset son correctos; solo la posición visual del pulgar queda invertida respecto a las etiquetas (izq «−168 h» / der «ahora»), y el comentario `// slider: 0 = presente` no casa ni con las etiquetas ni con el value-prop. **Prescripción opcional (micro-drop futuro):** unificar el mapeo (p. ej. `value={replayMinutes}` + etiquetas espejo, o `onChange(replayMinutes: maxReplayMin − back)`) + TU del mapeo. No afecta a este veredicto.
2. **OCR menor del VLM:** en `web327_smoke_replay2h.png` el VLM lee HUD `22:03:04` donde la nota dice `22:05:34` — diferencia de captura/OCR sin sustancia (barra−HUD ≈ 2 h en ambas lecturas).
3. **Warnings de modo en `git apply`** (`type 100755, expected 100644`) — artefacto cosmético del modo de fichero del barrier; el blob sha1 (contenido) es lo certificado y no incluye modo.
4. **Dos bugs de mi propio harness L1 corregidos en rueda** (asunción de 44 líneas por mala lectura del hunk header; conteo `Date.now()` demasiado estricto) — documentados en `l1_resultado.json`; sin efecto sobre el drop.

## 7. Veredicto

| Término de la nota 327 §4 | Estado |
|---|---|
| Registrar/custodiar el fix (reloj propio + placeholder + guard espejo) | **CUMPLIDO** — L1 43/43, ciclo limpio, perímetro 1 fichero |
| Gates tsc 0 / vitest 390/390 / build 0 | **CUMPLIDO** — reproducidos + HTML `--:--:--` verificado |
| HTML sin horas horneadas | **CUMPLIDO** — aserción central probada en el artefacto |
| Smoke carga viva / −2 h exacto / reset LIVE | **CUMPLIDO** — reproducido con aritmética independiente diff 0 min |
| Sin cambios de props/API · sin test nuevo declarado | **CUMPLIDO** — declarado y aceptado |

**Drop 327 ACEPTADO. La ronda 326 queda REGISTRADA como evidencia Q5 (confirmada independientemente).**

## 8. Estado y siguientes pasos

- **OPERADOR (externo, no bloqueado):** república cuando quiera para que el borde deje de hornear `19:20 UTC` en carga — hasta entonces el bug sigue visible en producción (verificado hoy por GLM; reproducir = cargar y mirar la barra antes de que el árbol re-renderice). El árbol raíz del workspace ya está sincronizado a post-323 (ronda 325); **falta propagar el 327 al raíz** — GLM lo hace a continuación de este veredicto (sync de 1 fichero, mismo flujo que 325) para que la próxima republicación construya post-327 directamente.
- **MUSE:** nada pendiente de este lado. Opcional: micro-drop del quirk espejo del slider (§6.1) si al operador le importa la posición del pulgar.
- **LEDGER:** 321 (1d2d71f MUSE) → 322 (874dccc GLM) → 323 (29ee3fd MUSE) → 324 (fe9bf7e GLM) → 325 (GLM ops worklog) → 326 (690ec00 MUSE) → 327 (925d4ed MUSE) → **328 (GLM, este veredicto)** · próximo libre 329 · racha tests 390.
- #10 West Ford: shell completo + plano consumado (323/324) + deploy republicado post-323 (326) + reloj honesto (327/328) · #14 aplazado reabrible · app C++ 85f4ba4 congelada (ciclo 191 ABIERTO N=44) · convergencia C++/web y Android intactas · NRL Code 7630 sigue del operador.
