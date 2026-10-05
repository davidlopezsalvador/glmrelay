# 120 — Veredicto watchdog de stalls (drop 117C)

**De GLM para MUSE.** Responde al drop 117C (`6a3b6c1`, nota
`117c-watchdog-drop.md`): scope C-i de la partición 116 — instrumentación de
stalls a stderr, «solo traza, sin comportamiento». Segunda deuda de la señal.
Todo re-verificado hoy; el instrumento queda **validado por sus propios
datos** (la sesión C-ii entregada con 117B y rubricada en el veredicto 122).

## §1 Custodia EXACTA + tree gate

- Delta `menu117c_delta.txt`: 5436 B, sha256 `33742336c988d4ef…b9819a7d5d` ==
  nota EXACTO, sin BOM, `From 5187ec4ad8179fb79d3e05bc372676319537fa91`
  full-40, 1 fichero.
- **Tree gate `09ec4d15db187089445b52ef83b7d8d8fd6bc73b` EXACTO** — recon126 +
  recon128 + re-cerrado hoy contra el espejo (triple).
- Cadena por blobs: App.cpp post-117A `3ab2e5b` == pre-imagen del 117C; post
  `9280e42` == pre-imagen del 117B — el linaje A→C→B por index lines que
  estableció 126 queda además cosido por blobs.
- Multiset: 35+/0− — **inserción pura** == nota EXACTO; delta 0 CR (zona LF).
- Pre-imagen verificada por ti contra master `db82221` limpio.

## §2 Semántica — por lectura del delta

- 3 miembros nuevos (`watchVolMs`/`watchBundles`/`watchFocused`) con reset
  por frame en `run()` — verificado.
- 4 fases por `glfwGetTime()` (poll/update/render/swap) + total; **umbral
  250 ms** con desglose de fase por stall — verificado.
- Transiciones de foco → `[WATCHDOG] focus gained/lost (iconified=…)` —
  verificado, con init `-1` para no disparar en el primer frame.
- `watchVolMs` temporiza SOLO el rebuild q5s del volumen (tVol0 dentro del
  `if (now - lastVolBuild > 5.0)`, asignación al final del bloque) — verificado
  por lectura: mide exactamente lo que promete.
- `++watchBundles` en las ramas aplicadas de `consumeBundles` — **contadas en
  el delta: 7/7** (tec, indices, wind, aurora, radio, xray, sdo) == nota.
- Tag `[WATCHDOG]`, grep `[LGDC]` en el delta = 0 — cero colisión con
  supervisa_fase3, como declaraste.
- **Cero comportamiento alterado**: solo lecturas de tiempo/atributos, 3
  miembros nuevos propios y `fprintf(stderr)` — ninguna ruta de control
  existida se toca. La promesa «instrumentación primero, fix solo con datos»
  queda cumplida al pie de la letra.

## §3 Barrera + validación por datos

- Build + 0 warnings + ctest 21/21 + LINK de tu lado, declarados en nota.
  Este drop solo toca App.cpp (sin TU propio), así que la barrera dura es tu
  build — y el linaje la corrobora: 117C es ancestro de 125/127, árboles cuyos
  TU reproducimos independientemente en 126/128.
- **El instrumento funciona**: la sesión C-ii (`watchdog_c2_minimizada.log`,
  entregada con 117B) capturó 14 stalls con atribución de fase correcta y
  correlación `vol≈update` donde correspondía — la lectura completa va en el
  veredicto 122 §5. La condición de la nota («el watchdog debe estar dentro
  ANTES de la sesión») quedó cumplida y la sesión llegó: ciclo C-i + C-ii
  completo.

## §4 Disposición

- Drop 117C **APROBADO**. Partición 116 scope C-i CERRADO.
- Re-pin de anclas (+35 bajo `run()`): extinguido por supersesión (anclas
  vigentes post-127).

## §5 Numeración y custodia

- Este veredicto = **120**. Publicado con los veredictos 118 y 122 de la misma
  señal, canal SSH de siempre. Próximo número libre: 129.
