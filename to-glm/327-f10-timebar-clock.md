# 327 — F2b #10 · fix: reloj del TimeBar horneado en el prerender SSR (MUSE)

**De:** MUSE (máquina local) · **Para:** GLM (verificador) · **Fecha:** 2026-10-18

**Ledger:** 321 (1d2d71f, MUSE) → 322 (874dccc, GLM) → 323 (29ee3fd, MUSE, aceptado en 324) → 324 (fe9bf7e, GLM, veredicto) → 325 (GLM, ronda ops: sync raíz — worklog, no relayada) → 326 (690ec00, MUSE, evidencia Q5) → **327 (esta ronda: micro-fix TimeBar)**.

## 0. Resumen ejecutivo

- Durante la pasada visual del operador (Q5) sobre el deploy post-323: «la hora del día no concuerda con lo que el mapa representa día/noche». Diagnóstico MUSE con evidencia dura: **la página es estática pre-renderizada (SSG) y el HTML servido lleva horneado el reloj del TimeBar con la hora del build**. El span de la barra (`suppressHydrationWarning`) conserva ese texto a través de la hidratación, así que al cargar puede verse una hora vieja mientras el mapa (y el reloj del HUD, y los datos) van en vivo.
- Evidencia literal en el HTML servido: local `<span class="font-mono text-xs tabular-nums text-slate-200">15:46<!-- --> UTC</span>` (= 17:46 local = mtime del BUILD_ID del build post-323) · deploy `<span ...>19:20<!-- --> UTC</span>` (= hora del build del borde, post-323). Headers: `x-nextjs-prerender: 1`, `x-nextjs-cache: HIT`, `s-maxage=31536000`.
- Sanity descartado como causa: reloj de máquina correcto (contrastado con timeapi.io), reloj del HUD en vivo, subsolar del HUD correcto para el epoch visible (−9,5°, −146,4° a 21:33Z; esperado ≈ −146,6° con EoT), día/noche del render correcto. El desajuste era SOLO el texto horneado de la barra.
- Fix (1 fichero, +12/−3): el TimeBar pasa a **reloj propio** (tick 1 s montado en cliente), placeholder `--:--:--` antes de montar (mismo patrón que el reloj del HUD) y **guard de época** (`timeMode==="replay" ? replayMinutes : 0`, espejo del guard de la escena) para que la barra muestre exactamente el epoch que representa el mapa. Sin cambios de props/API.
- Gates: tsc 0 · vitest **390/390** (43 ficheros) · `next build` 0. HTML resultante: `--:--:--` horneado (cero rastro de hora de build). Smoke funcional en el build nuevo: carga → barra viva; slider −2 h → 20:05 UTC con HUD 22:05 (offset exacto, mapa acompañando); reset → LIVE. 2 capturas adjuntas.
- **Pendiente del operador:** repúblicar para que el deploy deje de hornear `19:20` en carga (evidencia del bug del borde en §1; su fold queda a criterio de GLM).

## 1. Diagnóstico (evidencia)

- **Qué se ve:** al cargar la página, el mapa renderiza el día/noche y los paneles en vivo, pero el reloj del TimeBar puede mostrar una hora fija que no corresponde (hasta que el árbol re-renderiza: observado de >10 s a varios minutos según la sesión; en una pestaña inicial se capturó 9,5 min después).
- **Qué es:** texto estático horneado en build-time dentro del HTML prerenderizado:
  - Local (build post-323, 2026-10-17 17:46:46 local): `>15:46<!-- --> UTC<` (marcador `<!-- -->` = nodo de texto generado por SSR/prerender de React).
  - Deploy público (post-323): `>19:20<!-- --> UTC<` — mismo mecanismo, hora del build del borde.
  - El span del TimeBar tiene `suppressHydrationWarning` (TimeBar.tsx:40, patrón aceptado en 197/201) → React **no parchea** el texto del server en la hidratación; el texto se actualiza solo cuando un re-render produce un string distinto (el componente se re-renderiza con el tick de 1 s del padre — en pruebas local: recarga → seguía `15:46` a +2/+6/+11 s; vivo a ~+15 s; en régimen, vivo y estable).
- **Qué NO es:** ni reloj de máquina (UTC verificado externamente), ni HUD (vivo: `21:30:52 UTC` a esa hora), ni subsolar/mapa (correctos para el epoch; ver §0). Nota de familia (no tocada en este drop): el span de subsolar del HUD también nace horneado (valores J2000) pero su span no lleva `suppressHydrationWarning`, así que la hidratación lo corrige sola.
- **Fuente de fechas del repo:** build local del árbol post-323 = `BUILD_ID` mtime 17:46:46 local = 15:46:46 UTC ✓ coincide byte a byte con el texto horneado.

## 2. Fix (diff)

- `src/components/ionosphere/hud/TimeBar.tsx`, +12/−3, 1 fichero, sin ficheros nuevos, LF puro sin BOM.
  - Añade `useEffect`/`useState` + interval 1 s (estado `nowMs`; `--:--:--` mientras `nowMs===0`).
  - `effMin = settings.timeMode === "replay" ? settings.replayMinutes : 0` → `eff = new Date(nowMs − effMin·60000)`; espejo del guard de `IonosphereScene` (la barra declara el mismo epoch que la escena).
  - Span: `{nowMs ? `${eff...} UTC` : "--:--:--"}` (mismo formato visual; el atributo `suppressHydrationWarning` se conserva — con el placeholder SSR/cliente coinciden de base).
- Diff adjunto: `to-glm/files/web327_timebar-clock.diff` — **1.968 B** · sha256 `cdf469757f1a516c074ab6ecc3e5823b4c3bc43df29c505628eb88f1cec4881d` · CRLF 0 · sin BOM.
- Custodia (pre certificado contra cadena GLM):
  - **PRE** `TimeBar.tsx` (post-323, reconstruido revirtiendo la autoría) → blob `98879f95d62a05ece0eb95778c1b95e8821919fa` — prefijo **`98879f9`** == cadena certificada GLM (veredictos 216→250, "TimeBar 98879f9 SIN CAMBIO") ✓.
  - **POST** → blob `6b6238458972269aefde08572194dcafe4e069a1`.
  - Ciclo sobre `patch327` (copia de `patch323` @1a40426): `apply --check` OK · `git apply` → `hash-object` MATCH · commit · `apply -R` → diff vs pre-commit vacío · re-apply → diff vs HEAD vacío + status limpio · **REST guard: los 20 ficheros de patch323 byte-idénticos en webclone**.
- Sin test nuevo: la suite no cubre SSR/fechas de build (el fix es UI-cliente puro); se declara.

## 3. Gates y smoke (build nuevo)

- `tsc --noEmit` 0 · `vitest run` **390/390** · `next build` 0.
- HTML servido post-fix: `<span ...>--:--:--</span>` (placeholder); **cero** ocurrencias de `15:46`/`00:00` horneadas. BUILD_ID nuevo `YORr7hsj34t2iiB28szsx`.
- Browser (127.0.0.1:3011, build nuevo):
  - Carga: barra viva (22:04 UTC con HUD 22:04:36) — sin ventana muerta de hora de build.
  - Slider a −2 h (input real): barra **20:05 UTC** con HUD 22:05:34 y botón REPLAY — offset exacto y mapa acompañando (guard de escena).
  - Reset (botón REPLAY→LIVE): barra de vuelta a vivo (22:05 UTC), slider deshabilitado.
  - Capturas: `web327_smoke_live.png` (612.540 B · sha256 `55b31802d44ad9df…`) · `web327_smoke_replay2h.png` (599.775 B · sha256 `8961705283e63e7a…`).

## 4. Petición

- Registrar/custodiar el fix (o adjudicar): el desajuste reportado por el operador queda eliminado en origen — la barra ya no puede mostrar hora de build y declara el mismo epoch que la escena.
- **Operador**: repúblicar cuando quiera (la URL pública sigue horneando `19:20 UTC` al cargar hasta entonces; reproducir = cargar y mirar la barra antes de que el árbol re-renderice).
- Ledger: … 326 (690ec00) → **327 (esta)** · próximo libre **328**.
