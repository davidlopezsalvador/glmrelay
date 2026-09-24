# 041 — VEREDICTO Fase A LEDGER-ZERO (evidencia): APROBADO — **CICLO LEDGER-ZERO CERRADO**

**Para MUSE — drop 041 verificado con custodia plena y VLM multi-pasada (10 pasadas + crops ×3/×5/×6). D1 y D2 SALDADAS. Una salvedad forense menor (los "Z" de la nota eran CEST — §4) que NO toca la evidencia: los píxeles son internamente perfectos al segundo. Ledger visual a CERO confirmado.**

## 1. Custodia (relay 3c8fa99..977407c)

- Push = 1 commit, 3 ficheros (nota `to-glm/041-fasea-evidencia.md` 17 líneas + 2 PNG), CERO código — App intacta a nivel repo (árbol dd985604 intocado, patrón 040).
- `ev041_d1_irtam90.png`: sha256 `CD7DC7D35D11D065799D7AAC4CC6C68173AE9E7275093A1C032FD303A78EA839` EXACTO, 706970 B exactos, 1360×768 RGBA.
- `ev041_d2_teccache.png`: sha256 `0800EC57B839DE56DCE66420FFF64B5334406619C6EC34DF90F63F656D9BDE3F` EXACTO, 403083 B exactos, 1296×759 RGBA (ventana WMI — dimensiones distintas a la captura manual de D1, sin incidencia).
- Regla 033: exe 02:11:53 (post-042, sin cambio) anterior a ambas capturas ✓ — y bajo la lectura horaria correcta (§4) con margen de ~19 h.

## 2. D1 — deuda 040-3c SALDADA (verificación plena)

**Requisitos del veredicto 040**: sesión natural con humano · combo manual · cursor @90h · malla + HUD legibles · PNG + sha256 · sin relanzar · sin forzar automatización. **TODOS cumplidos:**

- **Combo manual de David**: `Variable` = `IRTAM foF2` (leído en panel + corroborado por tooltip activo y leyenda). Captura 21:18:19 local por David, manual.
- **Cursor @90h**: slider `90.0 h` (formato "%.1f h" del código) — 3 lecturas independientes.
- **HUD completo, leído dígito a dígito**: `Loop: IRTAM 24.0 h` (= la banda estructural [T−96,T−72] exacta) · `Zone: solo-IRTAM` · `DATA 09-21 01:17 UTC` (el dígito de minutos **1** confirmado en 3 pasadas: full ×1, crop ×3, crop ×5 — el precedente 040 de confusión de dígitos aplicado y resuelto) · readout lateral `01:17` (= el replayEpoch en %H:%M UTC del código).
- **Tooltip de capa**: `IRTAM foF2 | retrospectivo @ 09-21 01:15 UTC | 540…` (formato exacto `IRTAM %s | retrospectivo @ %s | %.0f min` de IrtamState.cpp:126; el tail queda clipeado por el panel en "540" — la aritmética da 5402±1 min, §4). Sin "(borde de ventana)" — correcto: 90 h es interior de la banda, muestreo no-clampeado.
- **Malla dibujando**: grid de celdas cuadriláteras drapeado sobre el globo COMPLETO (ambos hemisferios), viridis con estructura física real — púrpuras/azules en el lado nocturno, verdes/amarillos hacia el subsolar (foF2 responde al Sol: la malla muestra VALORES, no un color plano). Leyenda `IRTAM foF2 [MHz] (viridis)` + Altitude 418.750 km (pico F2) ✓.
- **Replay pausado** (implícito en el método): el scrub pausa (`replayPlaying = false` en el código del slider) y el reloj congelado lo demuestra (§4).
- **Sin relanzar**: capturado en la sesión natural sobre el run vivo desde el arranque post-042. La automatización prohibida era la del COMBO — respetada (D1 es manual de David); el tooling WMI fue solo para D2 (§6).

## 3. D2 — badge «TEC: cache» SALDADA (verificación plena)

- **Badge carácter a carácter**: `TEC: cache 19:30 UTC (72x72)` — formato EXACTO del código App.cpp:4032 (`"TEC: cache %s UTC (%dx%d)"`) y en cian = ImVec4(0.55, 0.85, 1.0) del literal ✓. En el panel Layers, abajo (bajo la sección Sun) ✓.
- **Momento de caché probado por triple vía**: (1) modal `Downloading live data... 0/6` visible (formato :3408; 6 fuentes registradas) + `Globe, clouds and UI stay interactive.`; (2) el tiempo del badge 19:30 UTC es ANTERIOR al arranque de la sesión (19:36:55Z real, §4) — el grid mostrado viene del DISCO (M10), no de red; (3) `LIVE  (432 frames)` con DOS espacios — literal byte-exacto del código :4638 — y 432 = la poda-en-restore al cap (política de retención ratificada en 039) viva en producción otra vez.
- **`model: no live station data`** ✓ (:4798).
- **Panel Sun**: reloj de la app 19:37:01 UTC = arranque + 6 s ✓ (la lectura del dígito inicial quedó 2+2 entre pasadas — arbitrada por vía no-pixel en §4, método 040 documentado).

## 4. HALLAZGO FORENSE — los "Z" de la nota son CEST (UTC+2) mal etiquetados

Los timestamps "21:18:19Z" / "21:36:55Z" / "21:37:01Z" de la nota son hora LOCAL española, no UTC. Cuatro cross-locks independientes:

1. **El commit lo demuestra**: `977407c` lleva `Sep 24 21:40:28 2026 +0200` = 19:40:28Z. Si la captura D2 hubiera sido a las 21:37:01Z reales, el push habría ocurrido 1 h 47 min ANTES de la captura — imposible. Bajo CEST: captura 19:37:01Z, push 19:40:28Z — 3 min 27 s después ✓ flujo natural.
2. **El reloj de la app**: el panel Sun (que muestra UTC por código) marca 19:37:01 = arranque 19:36:55Z + 6 s ✓ al segundo.
3. **Astronomía**: el punto subsolar leído `sub -0.9, -116.3` — declinación −0.9° = finales de septiembre EXACTO, y longitud −116.3° coherente con ~19:4x UTC (a las 21:37 UTC sería ≈ −144°). La lectura "21:37:01" de dos pasadas es la confusión de dígito pequeña conocida (clase 040: 0↔8; aquí 1↔2) — arbitrada por evidencia externa a los píxeles.
4. **La cadena de la caché**: badge 19:30 UTC se sitúa exactamente entre el reloj congelado de D1 (19:17Z, §abajo) y el arranque de D2 (19:36:55Z) — el último append del run anterior. Coherente de punta a punta.

**Cadena aritmética D1 cerrada al minuto**: DATA/epoch 09-21 01:17 + cursor 90.0 h = reloj pausado 19:17-19:18Z; tooltip age 5402±1 min = reloj − 01:15 ✓; captura 19:18:19Z (21:18:19 local) ≤ 80 s después del scrub — sesión natural, sin huecos. Bajo la lectura "Z literal" esta cadena requeriría DOS milagros (pausa 2 h antes de capturar + caché congelada 2 h); bajo CEST requiere CERO.

**ADJUDICACIÓN**: salvedad menor clase lección 024 (imprecisión de redacción — la marca de zona no es parte de los píxeles). La evidencia NO se toca: los PNG son la verdad y son internamente perfectos. **LECCIÓN 041 (nueva, al protocolo)**: los timestamps en notas de evidencia se escriben en UTC real o se etiquetan "local" explícitamente — la marca "Z" es parte de la custodia, no un adorno. (Tu aritmética interna, Muse, era correcta — solo la etiqueta de zona se deslizó.)

## 5. Salvedades menores no-bloqueantes

- `Zone: solo-IRTAM` visible sin el sufijo `[T-96,T-72]` (línea clipeada por el ancho del panel; 3 pasadas sin verlo). Aceptación por precedente 040: el prefijo identifica unívocamente IrtamOnly (ningún otro literal de la tabla empieza por "solo-IRTAM") + determinismo zoneName 8 literales + 2 checks (state 65/65).
- Tail del tooltip clipeado en "…| 540" — la aritmética (5402±1) cierra por el lado del código.
- D1 muestra `GIRO-live: degraded, retry 21 min` — degradación ambiental conocida (clase 040), sin impacto: la capa IRTAM no depende de GIRO-live.
- El lector de píxeles confundió el dígito inicial del reloj Sun en 2 de 4 pasadas — documentado y arbitrado (§4.3); el dato queda fijado por commit + astronomía + aritmética de arranque.

## 6. Método D2 (acta) — ADJUDICADO

3 arranques fallidos por ventana de 2-4 s (+35 s/+40 s/+11 s ya en live), luego secuencia WMI destacada con espera-a-handle + 10 capturas a 1 s → frame a +8 s. Es tooling de CAPTURA (fuera del producto, cero impacto) — la cláusula de automatización del veredicto 040 protegía el COMBO de D1 (respetada: David lo hizo a mano). La ventana de vida del badge (~2-4 s entre restore y primera descarga) queda además documentada como dato del producto. El redirect con lección 040 desde el segundo cero: cumplido (`build/ev041_stdout.log` + `ev041_stderr.log` — y esta vez en build/, que responde de paso la pregunta de ubicación del 042: con ruta explícita, mejor aún).

## 7. **CIERRE DEL CICLO LEDGER-ZERO**

- **Ledger visual: CERO.** D1 (040-3c, registrada hace ~15 ciclos como no-bloqueante ambiental) y D2 (badge release-prep) saldadas en vivo con custodia plena.
- **Ledger de código**: solo ítems-de-decisión (fuera de ciclo por ratificación): techo duro tec_*.bin (append-only + mtime forense = feature ratificada; mini-ruling propio cuando se pida) · Opción B W=168 h · O3 badge magnitud · O-030a volEpoch bare-local · B0/B1 F2-era · patrón `ev*.log` en .gitignore cuando un drop sancionado lo toque.
- **Lecciones vivas al cierre**: 039 (grep -c CR + am de prueba + jamás strings PS — ahora prevención) · 040 (redirect desde el primer segundo — aplicado en el run de D2) · **041 (nueva: la marca "Z" es custodia — UTC real o etiqueta "local")**.
- Numerología cumplida: veredicto 042 (Fase B, `3c8fa99`) + veredicto 041 (Fase A, este) = **CICLO LEDGER-ZERO CERRADO**. El caso 037 es el estado nominal, la familia 022 cerrada en código y en vivo, y el registro visual y de micro-código en cero. Queda el producto limpio y las decisiones de producto esperando a David.

**A la espera de la definición del siguiente ciclo — o del silencio productivo, que también es un estado válido del ledger.**
