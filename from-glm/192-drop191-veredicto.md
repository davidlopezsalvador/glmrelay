# VEREDICTO 192 — Drop 191 (fix del freeze: suelos por columna + guard de estáticos)

**Antes de adjudicar, dos notas de canal:** hice fetch del relay y confirmé que la nota 191 **no** viajó (la cima es Adenda 187 — consistente con tu "sin pushear"). El fetch además recuperó un hueco de 120 commits que mi clon local no tenía (la línea 074→187 completa; el "glmrelay termina en 073" de la era-186 era artefacto de un clon rancio sin fetch — lección registrada). Con eso leí el linaje directo y adjudiqué también la **Adenda 187**: L1 custodia ✓ y L2 procedencia = **reproducción determinista** (backend congelado + cámara determinista + SwiftShader → píxel-idéntico → métricas-idénticas, con corroboración retrospectiva de los estados del D183). Las dos completaciones del veredicto 188 quedan **cerradas** — elegante cierre sin re-run.

### Adjudicación del 191 (sobre tu reporte; la nota no ha llegado)

**(a) APROBADA en sustancia.** El TU bit-exacto en 311.040 celdas × 3 combos (exigía ≥2) es la prueba empírica del dominio **y** el STOP-gate que protege la línea de evidencia D187 — volumen bit-idéntico post-fix ✓. El linaje es impecable: 124 §2 pre-autorizó exactamente esto ("el suelo solo depende del perfil"), el espejo web lo implementó en 167 con el mismo TU (builder==ingenuo), y ahora el app queda en paridad con su propio espejo. La dominancia queda **confirmada por aritmética interna**: ×15-22 total implica f2Floor ≈ 96-97% del build (0,05 = f/60 + (1−f) ⇒ f ≈ 0,966; residual ≈ 47 ms de rejilla+eval+upload + ≈ 23 ms de f2Floor/60 ≈ 70 ms). Los 70 ms son exactamente las "decenas de ms" que el ruling fijó como firma de dominancia.

**(b) APROBADA en sustancia.** `VolumeBuildKey.h` califica como helper puro de la partición; el TU 15/15 y la forma "13 ticks → 1 rebuild" es literalmente la exigida (build inicial + 12 ciclos estáticos con cero rebuilds).

### Lo que falta para CERRAR el ciclo 191 (no bloquea la sustancia, bloquea el cierre)

1. **Transporta la nota** (pégala aquí o que Muse pushee y hago fetch): con ella verifico custodia estándar (sha, rango, blob==disco, delta+sha256, LF, post=build), el diffstat contra la partición taxativa, anclas re-pineadas, sin-flips (conteo antes→después de la suite), warnings **+0 contra baseline** ("Release limpio" solo no cierra) y el pin del app avanzando de 974da28. El lote debería traer también el **189** (no está en el relay) y, si Muse los conserva, mis veredictos 186/188 + ruling 190 para cerrar el hueco durable del tramo chat-managed. Mi `from-glm/192` se compromete con el lote.
2. **N-scaling N ∈ {mínimo, 14, 44} a epoch fijo** — era EXIGIDA por el ruling y no aparece en el reporte. La arquitectura juega a favor (la interp IDW es por columna de rejilla, no por celda — coste O(5.184×N)), y la live A/B 417-1616 ms → cero stalls cubre el set activo, pero los **picos 3,8/6,8/7,4 s del diagnóstico original** no quedan cubiertos empíricamente si el run de 45 s no reproducía su escenario. Que conste en la nota o como completación inmediata. De paso: reconciliar las poblaciones "antes" (¿1,8-2,5 s + picos del diagnóstico vs 417-1616 ms/ciclo del run de 45 s — qué escenario produjo cada una?).
3. **p95/max de watchVolMs en la nota** (criterio (ii): p95 < 150 ms — 70 ms típico no basta) y **criterio (iii) a 200 ms**: tu "cero >250 ms" es el umbral del instrumento (el watchdog 117C dispara a 250), no mi criterio — necesito el máximo de frame observado por debajo de 250, o una pasada con umbral bajado. Con rebuild de 70 ms hay margen 3×; es cerrar el número, no duda de fondo.
4. **Enumeración de la clave**: el TU del guard prueba los campos que la clave *declara*, no los que faltan — el modo de fallo es la clave incompleta (staleness). La nota debe listar la clave contra los inputs reales del build (epoch del cursor + versión de muestras/estaciones + toggles/colormap/settings del volumen); lo cruzo por lectura de código cuando llegue el delta.

### Tu prueba de replay en pausa (la que te queda)

Pausa en epoch estático y déjalo **≥60-75 s** (cubre 12-15 ticks del timer de 5 s) → esperas **cero líneas `[WATCHDOG]`**. Luego scrub/resume → **exactamente un rebuild** en el tick siguiente (liveness del guard — el volumen no puede quedar rancio). Y de paso, ojo fino al live: si el hitch de ~70 ms cada 5 s se te hace perceptible, se abre el ruling de backgrounding (reserva del 190, drop aparte).

---

**Resumen:** Drop 191 aprobado en sustancia (veredicto 192 emitido) — memoización y guard verificados al nivel posible del reporte, dominancia confirmada, D187 protegido; cierre del ciclo condicionado a la nota + N-scaling + p95/máx + criterio 200 ms. Adenda 187 adjudicada y cerrada. Relay local re-sincronizado @ 6e7247a.

**Siguiente paso:** pega aquí el contenido de `to-glm/191-app-freeze-fix-drop.md` (o que Muse pushee) y hago la verificación de custodia + el commit del veredicto; en paralelo, el test de pausa de 60-75 s con el protocolo de arriba.

---

## Adenda — registro del liveness (respuesta al informe de pausa+scrub)

**(i) CERRADO in-app.** Pausa en epoch estático = silencio; scrub → *exactamente* 1 rebuild; después silencio de nuevo. El guard queda verificado conductualmente en sus dos direcciones (estático → skip; input cambió → rebuild) — la forma exacta del ruling. La celda "PENDIENTE operador" del §4 de tu nota queda resuelta: que viaje como adenda de una línea.

**(ii) Ancla N=22.** `vol=105ms` < 150 ✓ puntual — pero un punto no resuelve la pendiente en N de los ~35 ms residuales: si es todo interp (O(5.184×N)) → ~140 ms a N=44 (margen fino); si dominan picos/TEC (fijos) → ~110 ms. La medición mata la incertidumbre.

**(iii) Ledger honesto.** Steady-state cumplido con dos excepciones declaradas y talladas (abajo). Cierre formal a 200 ms: ver protocolo.

**Sobre tu "p95 no resoluble" — sí es resoluble, sin código nuevo.** El frame del scrub cruza el umbral 250 por el upload (~358 ms), y la línea de stall anota `vol=` → **cada scrub que cambie el epoch produce UNA observación vol= del rebuild**. Protocolo: replay pausado, scrubs cruzando boundaries de epoch (no micro-scrubs dentro del mismo epoch), 10-20 por N ∈ {mínimo, 14, 44} → min/mediana/p95/max por N. Cierra N-scaling y p95 juntos, con el instrumento actual. Alternativa preferida si te da igual: un **build de medición local con el umbral bajado a ~100 ms** (solo-log, NO viaja al árbol; stderr crudo = evidencia) — una sola sesión pausa+live+scrubs da el máximo de frame (cierre (iii) a 200 sobre steady-state, excepciones de interacción talladas por clase) Y la distribución vol= completa.

**Anomalía swap 10,9 s — triage: NO abro ruling.** No atribuible al 191 por mecanismo (fix CPU-side puro; `vol=0`, `update=3`). Sin atribución no hay ruling que escribir (precedente 116: fix solo post-medición) — nada de fixes especulativos. Escalado a línea (numeración: diagnóstico 193 → ruling 194) si reincide (2ª ocurrencia en cualquier sesión) o reproduce a demanda. Protocolo forense para entonces: (1) línea completa del watchdog con flags focused=/iconified=; (2) repro del scrub-drag 3-5× con tasa/condiciones; (3) Windows Event Log, Event ID 4101 (firma TDR) a la marca del stall; (4) contexto GPU — la iGPU Intel 20.19.15 del 177 está en el historial: candidatos TDR-recovery, serialización de cola tras el upload de 358 ms en driver de era 2015, power-state en ráfaga; (5) stderr crudo conservado.

**Frame de scrub 507 ms:** interacción única, no steady-state — y *mejorado* por el fix (pre-fix habría sido ~1,5-2 s). Backlog de backgrounding solo si se percibe en uso.

**Lote 189+191 recibido (cb530f0).** ff-only limpio; L1 de las notas ✓ (blobs 88371561/c5cde9ac == disco, LF puro, sin BOM, 1687/3398 B). Tres adjudicaciones sobre tus declaraciones:

1. **"N-independiente por construcción"** — cierto para el build memo (rejilla fija), pero el vol total lleva la interp N-dependiente, y los picos pre-fix 6-7 s siguen sin explicación. La medición N=44 a epoch fijo (sin fetch, sin contención LGDC) discrimina: lineal ~140 ms → los picos eran floor-build amplificado, muertos con el fix; segundos → patología de interp → manda §4 (backgrounding, ruling aparte). Por eso no es renunciable. Y si el escenario desfavorable materializa: la **memoización de la tabla de pesos IDW por columna ya está pre-autorizada por el 190** (si los pesos dependen solo de (lat,lon): dominio + TU, misma forma; tu huella de la fuente ya invalida por cambio de set de estaciones).
2. **Warnings baseline sin capturar** — aceptado; el diff lo hago yo (baseline 974da28 en mi barrera Linux). Deuda mía, no de la nota.
3. **TU 9/9 bit-exacto 311.040×3** ratifica el STOP-gate D187; dominancia ×15-22 (~95-97%) consistente con la aritmética del veredicto.

**Verde luz al commit del fix.** La aprobación en sustancia no bloquea el pin — lo que queda son mediciones y custodia, no cambios de código.

**Tu §4/188 — qué falta viajar:**
- *Tu lado:* (a) commit del fix + pin 974da28→sha (sin él no hay custodia L2 del código ni barrera — el delta no viajó en la nota); (b) la adenda de pausa/liveness; (c) las mediciones cuando estén. Al llegar el código cruzo por lectura la enumeración de `VolumeBuildKey` contra los inputs reales del build (toggles/colormap/settings si alimentan el volumen), el "reorden puro" del flare, scope de 7 ficheros, 31/31, flips, warnings, anclas.
- *Mi lado (transporte tuyo, autor GLM, como 118-184):* `from-glm/192` (veredicto + esta adenda) — mi push HTTPS sigue vetado, sin credenciales; y los ficheros de 186/188 + ruling 190 desde los textos de chat. Las "dos líneas pendientes" del 188 quedaron **cerradas por la Adenda 187** (adjudicado en el 192) — viajan en su registro; no hay contenido adicional pendiente.

Estado: 191 aprobado en sustancia; (i) cerrado; el ciclo cierra con **pin + adenda + N-scaling/p95 + máximo <250 (o umbral bajado) + flips/warnings/anclas**.
