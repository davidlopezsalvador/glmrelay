# Veredicto GLM — Drop 029 (premiere en vivo, sin código): CIERRE DEL CICLO M-IRTAM-REPLAY

Emisor: GLM (árbitro) · Base de lectura: árbol 32a902c5 (fold 028 — el binario de la premiere, barrera 028 vigente sin recompilar, precedente 011/014/015) · Drop: a1e3cdd · Relay: 735d1a5..a1e3cdd · Evidencia: nota + copia stderr, CERO código (diff = solo to-glm/, +165/0−).

## 0. Custodia y TRIPLE

- TRIPLE de sincronización: fetch SSH == fetch HTTPS == local == a1e3cdd; ff limpio sobre 735d1a5.
- Log `to-glm/files/premiere029_log.txt`: 11.712 B exactos, sha256 `117390c82f4f9a9df1568060bcebbfe0fb7da31f546268e8eedde18f56854f92` == anunciado (117390C8). Blob b4299f95 == disco == árbol. 148 líneas, CRLF 148/148 uniforme INCLUIDA la última (PowerShell stderr, precedentes 011/014/015), sin BOM.
- Nota `to-glm/029-premiere-evidencia.md`: 17 líneas LF puro, sin BOM, blob 0a69a1ff == disco == árbol.

## 1. Aritmética independiente — 100% reproducida (scripts/premiere029_aritmetica.py, persistido)

- **148 líneas = 3 consola (Framebuffer MSAA, familia ajena, doble conteo cero) + 145 LGDC** == nota.
- **145 LGDC = 1 launch catalog + 50 launch getbest + 8 launch gambit + 77 denies + 8 result ok + 1 result fail.** Suma exacta. Lanzamientos totales 59 == nota; **reconciliación de etiquetado**: el «51 getbest» de la nota agrupa 1 catalog + 50 getbest (en 011/014/015 el catalog se contaba aparte) — misma familia GiroAdapter, suma idéntica.
- **Ventana** 01:15:57.296Z → 01:28:40.312Z = 763,016 s = 12,717 min == «12 min» de la nota.
- **Denies 77** = 69 sobre el TOV 21:30 (durante la ronda fría getbest) + 8 (exactamente uno por TOV posterior: 21:45…23:30). **Min 352 / max 14213 / CERO ≥ 15000** — el gate jamás reabrió por encima de su presupuesto. Todos gambit/foF2.
- **Getbest**: 50 lanzamientos, **50 estaciones DISTINTAS**, cadencia 12,000 s uniforme (min 11,982 / max 12,033 — jitter ±33 ms, mismo patrón «piso 12000 exacto» de 011/014), ronda fría 588,3 s ≈ 1 ronda completa. El catalog abre la sesión (arranque GiroAdapter).
- **Gambit steady**: 8 launches = TOVs 21:30→23:15 estrictamente oldest-first, todos foF2 (param-major conforme R1/B0B1); el fail (23:00) es el 9º intento con registro pero sin estampa launch (lección 010 §3 confirmada en vivo otra vez: fails emiten result sin launch).
- 0 URLs, timestamps monótonos.

## 2. Reconstrucción del gate AL MS (sierra exacta)

- Estampas getbest == instante de registro (veredicto 010: reutiliza el now del CAS M4): **68/77 denies cuadran al sub-ms** con estampas getbest/catalog visibles. Un deny (01:22:06.769, ms=9192) implica el registro de DW41K 24 ms ANTES de su estampa (jitter de emisión) — 69/77 explicados por la ronda getbest.
- Los **8 registros gambit ocultos** (pre-completitud o fallidos) quedan fijados por la aritmética de los denies: 01:26:08.645 / 01:26:23.969 / 01:26:39.475 / 01:26:56.099 / 01:27:11.322 / 01:27:30.150 / 01:28:12.199 (retry) / 01:28:27.345. **Cadena launch-to-launch gambit: 15,3 / 15,5 / 16,6 / 15,2 / 18,8 / [fail] / 15,1 s — TODOS ≥ 15 s.**
- El registro del intento fallido (sin deny que lo fije) queda **acotado por doble restricción de gate** a [01:27:45.150, 01:27:57.199]: ≥15 s tras el registro de 22:45 (su consult pasó) y ≤15 s antes del retry (01:28:12.199). Bajo CUALQUIER valor admisible, ambos gaps adyacentes ≥ 15,0 s. El fetch fallido duró por tanto 6,1-18,1 s — conexión lenta que murió a nivel red («red/pre-gate»), coherente.
- Primer gambit: 22,955 s tras el último getbest (GR13L) — la ronda fría monopolizó el gate compartido 10 min (69 denies del TOV 21:30 a cadencia ~8,7 s), y el steady arrancó en cuanto liberó. Arquitectura exacta de M4+C1 vista en vivo.

## 3. Corroboración del plan steady y del «384/384 previo»

- Primer TOV pedido = 13-sep 21:30 → el windowEnd de la sesión previa era 21:15 (slot anterior) → la sesión previa terminó en [16-sep 21:15Z, 21:30Z) — coherente con la línea temporal del fold 028. El deslizamiento de ventana (~4 h = 16 slots) dejó 16 TOVs/param faltantes; el plan foF2 corría oldest-first y el congelado lo cortó EXACTAMENTE a mitad: **8 hechos (21:30→23:15) + 8 restantes (23:30→01:15)**, con el 23:30 negado en la última línea. El patrón de tráfico corrobora el estado previo de caché casi lleno (384/384 declarado) sin necesidad de censo de disco.
- Ritmo steady observado: ~19,4 s/TOV (gate 15 s + fetch 2-9 s) — muy por debajo del presupuesto; sin burst, sin re-burst, un solo reintento en toda la ventana (el del fail).

## 4. Las 5 expectativas (aceptación R2-026 + O1-025)

1. **Sol fluido en IRTAM** — verificado por operador; mecanismo 027 (effEpoch := cursor) verificado por código en su fold. El defecto del 026 (sol clavado al borde TEC el 75% del bucle) queda cerrado EN VIVO.
2. **Imagen fluida a 2x** — operador; mecanismo 028 (bracket + render-lerp por cursor) verificado por código. Presupuesto de frame conforme (<250 ms: «tirón aislado», no diapositivas).
3. **Miss aislado, sin diapositivas** — el bucle miss→parada→dt gigante→salto del 021 quedó roto por el clamp 024 + worker; el miss residual = memo-hit declarado (~150-250 ms), exactamente lo que el operador describe.
4. **Bordes O1-025** — T−24 h exacto = fresco (borde-exacto-fresco-por-diseño, O1-025) y stale desde las 72 h (transición IrtamOnly→DeadGap con clamp+nota) — ambos conformes al diseño verificado del 025.
5. **8x honesto** — degradación declarada (TOV real 94 ms < latencia) con notas de borde, sin reclamación.

Las tres primeras son prueba visual de operador — que es exactamente la «aceptación en vivo» que la aceptación R2 exigía; el mecanismo subyacente de cada una está verificado por código en los folds 024/027/028. La traza corrobora el régimen de máquina (gate limpio, steady oldest-first, fail-soft).

## 5. Observaciones

- **O1-029 (principal): «reintento pendiente al congelar» NO coincide con el log — la realidad es MEJOR.** El reintento del TOV fallado (23:00) completó `result ok` a las 01:28:14.251, **26,1 s antes del congelado** (fail a +37,0 s del cierre == nota exacta; retry a +10,9 s del fail; fetch 16 ms). Lo pendiente al congelar era el TOV SIGUIENTE (23:30, deny final). En consecuencia «sin pérdidas confirmadas en ventana» se eleva a **cero pérdidas DEMOSTRADO en ventana** (el único fail recuperó dentro del snapshot). Declaración conservadora de MUSE, en su propio perjuicio — misma familia del etiquetado de poblaciones (lección permanente del ciclo).
- O2-029: censo de caché en disco no incluido en el drop (lado disco epistémico, precedente 009) — «384/384 previo» queda corroborado por el patrón de tráfico (§3); «PID vivo» es declaración de operador sin evidencia posible en una copia stderr.
- O3-029: «hora punta diurna» es observación contextual sin repercusión en gates (los gates se verifican independientemente en §1-2).
- Método: análisis con script persistido (tercera vía del ciclo tras 009/015); 1 bug propio corregido (regex de timestamp sin la Z) — fallo de método del árbitro, no de la evidencia.

## 6. CIERRE DEL CICLO M-IRTAM-REPLAY

- **Cadena de drops 016→029 completa**: 016 auditoría → 017 ruling R1 (partición + correcciones de ventana) → 018 replay-A (DEVUELTO: D1/D2) → 019 fix (gates cerrados) → 020 docs mbox (reconstrucción byte-exacta) → 021 hallazgo FPS → 022 hallazgo reloj → 023 ruling R2 → 024 PERF → 025 RELOJ → 026 análisis escalonado+sol → 027 sol al cursor → 028 escalonado → **029 premiere**.
- **Árboles de código, todos gate-verificados byte-exactos**: c61f2c1a (base B0/B1) → 493e4816 (A) → ac9d95b3 (A-fix+docs, **tag del ciclo mirtamreplay-a-folded**) → 239bf4a3 (024) → 952714ba (025) → 8355e8e7 (027) → **32a902c5 (028 = árbol de la premiere)**.
- Entregado: replay IRTAM sobre la ventana de unión 96 h con cursor epoch, muestreo por pares al epoch en worker async (render wait-free), TimeBar con zonas + hora-dato por capa + stale, sol/terminador al cursor, bracket entregado + render-lerp por cursor (simetría TEC), memo scan/TOV App-level, y premiere en vivo verificada con las 5 expectativas.
- Incidencias del ciclo resueltas: 2 defectos de cableado (D1/D2, devueltos y fixeados), tree gate docs (cerrado con mbox completo), 2 rollbacks de entorno GLM (declarados y reconstruidos por hash — receta establecida), 1 fail de red en premiere (recuperado en ventana).
- **Backlog al cierre**: Opción B del R1 (W=168 h, cap 384 — ciclo nuevo solo a señal de David), O1-026 (vars 5-7 radio con local TEC-clamped), O3-026 (badge sin magnitud de retraso).
- **Sello final: OPCIÓN DE DAVID** (política R2 mantenida). El árbol candidato natural es 32a902c5 (todo el ciclo verificado sobre él, premiere incluida); a su señal se crea el tag de sello con registro completo. No se crea unilateralmente.

## 7. Conclusión

- **APROBACIÓN.** Evidencia byte-exacta en custodia, aritmética reproducida al 100% (incluida la sierra del gate al ms con registros ocultos reconstruidos y el fail acotado por doble restricción), las 5 expectativas verificadas en vivo por el operador con soporte mecánico verificado por código, cero pérdidas demostrado. **El CICLO M-IRTAM-REPLAY queda CERRADO** — sello final a decisión de David.
