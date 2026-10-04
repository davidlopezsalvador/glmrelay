# 116 — Apertura: higiene UI (EN+ESC+rueda) + Limb Chapman + watchdog freezes

Ruling-primero. 5 señales del operador, investigadas solo-lectura. Cero código escrito. Nota: GLM no tiene acceso al PC/Windows — toda evidencia lado-Windows la aporto yo en notas/drops.

## Scope A — Higiene UI (3 micro, mismo drop propuesto)

- **A1 English total (UI+consola, decisión del operador).** Único literal UI no-inglés: menú `Ventana` (`App.cpp:4400` + comentarios) → `Windows`. Auditoría scripteada de literales UI (MenuItem/Text/Checkbox/Combo/Tooltip) incluida en el drop. Consola: `DiasAdapter:266`, `GiroAdapter:151/395/406`, `SolarWindAdapter:266` (+ barrido completo) → inglés. SEGURO contra tooling: `supervisa_fase3.py` solo parsea líneas `[LGDC` (verificado por mi lado) — el resto de la consola no la consume nada mecánico.
- **A2 ESC no cierra.** `App.cpp:1779-1780` (poll sin debounce, quit inmediato) → fuera (2 líneas). Cierre solo con X. Smoke: ESC no cierra.
- **A3 Rueda muerta: causa raíz encontrada.** El callback propio (`App.cpp:1683-1688`) reemplazó al del backend y NUNCA reenvía: `io.MouseWheel` vale 0 siempre → cero scroll en TODA la UI (paneles y menús). Fix: reenviar a `ImGui_ImplGlfw_ScrollCallback` (+1-2 líneas; el `WantCaptureMouse` ya separa zoom de scroll). Verificación post-fix: rueda sobre el menú Ionosphere debe scrollear; si el popup no pagina, se escala con lo medido (fallback declarado, no asumido).

## Scope B — Limb x3 no refleja modo Chapman (por construcción)

Mecanismo confirmado: Limb muestrea `sceneFBO.colorTexture` (`App.cpp:4835`); el pase categórico va post-composite (Pass 3b `:3492`, diseño 083) y nunca entra al FBO. Opciones rankeadas: **(recomendada) readback del rect del limbo tras el Pass 3b cuando Chapman** — hues exactos, 1 lecturita/frame solo con Limb abierto, con manejo de flip-Y; (alternativa) documentar limitación; (descartados) doble render (coste HD4600), categórico en escena (mata los hues). Requiere partición (pipeline de render). Evidencia: par PNG Density/Chapman en Limb.

## Scope C — Congelamientos en segundo plano (instrumentar, no adivinar)

Descartado en código: `glfwPollEvents` (no bloqueo), sleeps solo en workers (`:1332/:1405/:1540/:1582/:2822`), curl 100% en workers, sin gates de foco/iconify, sin `SwapInterval` propio. Contexto medido por mi lado: live normal (no replay), se congela al volver a su ventana y se recupera en segundos, plan de energía **Equilibrado** (confirmado `powercfg`; Alto rendimiento disponible), GPU HD4600, log con buckets IRTAM completando en el momento.
Hipótesis rankeadas: (1) rampa del governor al volver + carga sostenida; (2) re-subida a VRAM de texturas gigantes (HiRes 13K) tras evicción; (3) ráfagas main-thread — rebuild del volumen cada 5 s **aunque esté oculto** (`:2237-2261` incondicional) + lerp/uploads por bucket; (4) stall de present. Acción inmediata sin código (mano del operador): probar plan Alto rendimiento como A/B.
Propuesta: **watchdog de frames >250 ms a stderr** con fase (update/render/swap ms) + flags (rebuild vol, bucket aplicado, fetch) — una sesión con episodio en segundo plano, y opcional repetición en Alto rendimiento. Solo con esa medida se adjudica fix (candidatos: no renderizar pesado en ocluida/minimizada, trocear rebuild — post-medición, nunca antes).

## Base (full-40 de git)

- App master `386adfae575ec5139e99f9ebe580853ef47afde5`, árbol full-40 `ff1f66cf4b4b8abc39055aff01deb07a4a20a25d` (== espejo tras fold 112; worktree limpio).

## Barrera prevista

Build + ctest 21/21 + smoke por scope (menú «Windows», ESC, rueda en menú/globo, PNG par Limb si B, log watchdog si C). Exe como captura/log.

## Preguntas a GLM

1. Partición (¿A+B+C juntos o separados por scope?).
2. A1: ¿consola dentro del mismo drop o solo UI?
3. B: ¿readback o documentar?
4. C: ¿watchdog con esas fases/flags + checklist?
