# 073 — Opinión vía UI (drop 072): B RATIFICADA con 2 enmiendas + camino ligero + lista de preservación

**Respuesta formal a las 3 preguntas de `072-via-ui-opinion.md`.** Todo verificado contra el árbol `779d21b3` (espejo reconstruido esta sesión, ver §0). La opinión completa con razonamiento se entregó vía UI; esta nota la hace durable para cita del drop de mudanza.

## 0. Continuidad: incidente de entorno #15 declarado + espejo RECONSTRUIDO

- Entorno rodado de nuevo a era 038 (worklog truncado en ruling-038, espejo a `a711b58`/17 tags, paramiko desinstalado — reinstalado 5.0.0, scripts recon065 perdidos). Relay íntegro hasta `31ae46e` (triple verificado al sincronizar: local == SSH == HTTPS).
- Custodia 072 EXACTA: maqueta 33953 B sha256 `d2cfc95c…35f30b` == anunciado, blob `e491999f` == disco == árbol; nota blob `742e3b7b`, 1949 B, sin BOM, LF.
- Reconstrucción certificada (receta 065 + fold 067, scripts `recon073_cirugia.py` + `recon073_folds.sh` persistidos): cirugía v2 del zone039delta reproducida BYTE-EXACTA contra el target full-64 del veredicto 065 (mbox 8889 B, `a8ebe2c9…e1fb3`) — aritmética del daño re-verificada (3+2 mojibake CP850, 46 CRs = 12 ctx + 28 add + 6 del del cuerpo App.cpp, 8858−15+46 = 8889); cadena 6/6 tree gates FULL-40 EXACTOS `99da64a5` → 4e161f68 → dd985604 → a06215cc → f82d69fe → 559cdbb3 → **779d21b3**; 6 tags recreados con procedencia → **23 tags** == estado que el veredicto 071 declaró intacto.
- ERRATA DE MÉTODO propia registrada: la primera transcripción a mano del hash target decía `da6b7cc` (el real, extraído por grep del veredicto 065, es `da6d7cc`) — regla reforzada: los hashes se extraen por grep del relay, jamás se retranscriben (misma clase que la errata 025).

## 1. Pregunta 1 — ¿Ratifica B + este partido? **SÍ, con 2 enmiendas**

**B ratificada.** La maqueta evalúa honestamente el trade-off (A 48% / B 81% / C 94% globo visible; A conserva los solapes que motivan la reorganización; C paga 2 clics por ajuste en las pestañas de uso diario). B maximiza globo visible POR COLUMNA sin costo de interacción.

**El partido en 5 ratificado**: las 5 pestañas coinciden exactamente con los bloques naturales del código (verificado bloque a bloque contra `779d21b3`, `App.cpp:3663-4238`, panel plano de 576 líneas sin secciones anidadas): Vista = 3664-3694 (Earth…Sun, 9 filas) · Datos = 3696-3838 (incluye badge IRTAM 3705-3762, display-puro verificado) · Volumen = 3840-3906 · Estaciones = 3908-3974 (+ bloque de failover M4R-A) · Viento = 4086-4125. Presupuestos ≤18 ≪ techo ~36 filas/759 px — margen de 2×; la propiedad de diseño sobrevive a las enmiendas.

**Enmienda A — 4 bloques sin asignar (~11-12 filas)**: la tabla de la nota no asigna Faraday (4128-4150, 4 filas), Aurora (4151-4175, 2-3), HUD Sol (4177-4193, 1-2) ni estado TEC (4195-4237, 2-3). Sugerencia con criterio de cohesión funcional (decisión de David, solo exigir declararla): Faraday→Estaciones (vectores en estaciones; su tooltip ya remite al contexto de estación), Aurora→Viento (space weather: NOAA Ovation junto a RTSW), HUD Sol→Vista (estado visual solar), estado TEC→Datos (estado de la fuente junto a los controles de la variable). Peor caso tras absorber: 13/21/14/20/11 — todos ≪ 36.

**Enmienda B — posición de Labels/Explode**: la nota pone Labels en Vista, pero Labels (`:3861`) y Explode (`:3863`) viven HOY en mitad de la zona Volumétrica. Cualquiera de las dos ubicaciones vale (Vista con 11 = 9+Labels+Explode cuadra si ambos suben; Volumen se queda con 12); exigido: declarar en el delta qué filas cambian de posición — «verbatim» debe acotarse a texto byte-idéntico, no a posición.

## 2. Pregunta 2 — ¿Ciclo/partición o informal? **CAMINO LIGERO: nota + delta + barrera, sin ciclo formal**

No hace falta ruling/partición: el cambio es solo-UI, sin semántica de datos ni red (G6/G8 intactos por construcción, un grep de cortesía en el delta lo certifica). Pero NO informal puro — el drop de mudanza debe entrar al relay con custodia estándar:

- **Nota + delta (format-patch del commit de la app) + hash de commit/árbol**, como todos los drops de código del canal.
- GLM hace la verificación mecánica: diff = mudanza pura (texto movido byte-idéntico, tooltips incluidos), poblaciones de los literales pineados sin cambio, censo EOL de la zona (App.cpp es zona CRLF — lección 039), tree gate sobre el espejo.
- **Barrera: build + ctest 21/21 + visto bueno visual** (como propone la nota) — ningún test toca UI; 21/21 esperado sin flips.

Rationale: (1) el **ledger de anclas** — todos los veredictos desde 036 pinean líneas absolutas de App.cpp (`:4827 :4859 :4862 :4880 :4883 :4895`…); una mudanza de ~576 líneas los desplaza TODOS y el próximo ciclo necesita el re-pin reconciliable contra un delta custodiado, no contra memoria; (2) **incidentes #1-#15** — el relay es el único registro durable (esta misma sesión lo demostró: rollback #15, todo lo perdido se recuperó DEL relay); un cambio que solo vive en el repo de David + el chat está a un rollback de ser inverificable; (3) el costo son minutos con la herramienta que ya existe.

## 3. Pregunta 3 — ¿Qué preservar? Lista (ordenada por riesgo)

1. **CRÍTICO — bloque de interacción a IZCAR (no es display)**: `App.cpp:3975-4073` (~99 líneas) vive dentro del panel y tiene efectos por frame: `hitTest` + tooltip de globo (detalle de estación + sparkline foF2) + máquina de estados pin/RX-pick (click-no-drag) + `impl->hoveredStation = hitIdx` cada frame + `impl->mouseLeftPrev` cada frame. Si entra verbatim en la función de la pestaña Estaciones, **al desactivar la pestaña mueren el hover, el pin y el pick-RX sobre el globo**, y un `mouseLeftPrev` rancio dispara un pin espurio al reactivar la pestaña. Exigido: izcar el bloque a ejecución incondicional por frame (función propia o inline antes del tab bar); el bloque es autocontenido (io2/curMX/view/proj locales al bloque, la izca es limpia). Las «6 funciones» de la nota (5 pestañas + ésta).
2. **Verbatim = TODO el texto movido**, no solo tooltips: labels, literales, comentarios — el cuerpo byte-idéntico completo; más fácil de verificar mecánicamente que «tooltips».
3. **Orden interno por pestaña conservado** (memoria muscular + comparabilidad de capturas); orden del rail DECLARADO y congelado (Vista→Datos→Volumen→Estaciones→Viento, futuras pestañas solo se añaden al final).
4. **Pestaña por defecto en primer arranque declarada** (sugerencia: Datos — la de uso diario; Vista es la conservadora «arriba del panel viejo»; elige David, pero declararlo).
5. **Atajos 1-5 sin colisión** (verificado: los únicos handlers globales son ESC/C/H/± `:1765-1816`); si se implementan (la maqueta los muestra), declararlos en la nota.
6. **Estáticos locales**: los centinelas `kNoWind/kNoBz/kNoErr/kNoGrid` son `static const` — seguros con sus bloques; el patrón toggle (copia local → write-back solo en callback, p. ej. `showTEC/showGIRO/showSW`) es event-driven y seguro oculto; `bzVals` se construye por frame desde el adapter — la historia NO se acumula en el panel, ocultar la pestaña no pierde datos.
7. **EOL de la zona** (App.cpp CRLF): las líneas movidas conservan sus CRs; las líneas NUEVAS (rail/sideTab/tab bar) siguen la convención de la zona y se declaran en el censo del delta. Los `Separator()` inter-bloque que la partición deja sin objeto: contabilizarlos en el diff (algunos mueren, ninguno nuevo sin declarar).
8. **Nombre de ventana «Layers» intacto** (= clave de imgui.ini; la ventana M11 «Sun» y las demás no se tocan en fase 1) + **sideTab por saveSettings/loadSettings** (`:2327/:2404`) con default para clave ausente — sin bump de versión de settings.
9. **Timeline/Circuit/Bloom intactos en fase 1** (ya declarado) — la fusión futura (pestañas Tiempo/Radio/Sistema de la maqueta) que no colisione con los nombres de fase 1 es decisión de David para su momento.

## 4. Ledger

- Opción B (datos): CERRADA 071. Este drop 072 abre el hilo UI (fase 1 = partido Layers). Próximo paso esperado: **drop de mudanza** (nota + delta + barrera build/ctest/visual) → veredicto mecánico + re-pin del ledger de anclas sobre el árbol resultante.
- Backlog sin cambios (O-030a, buf[64] hecho en 042, 2 inconsistencias de escala documentales, política de retención disco tec_*.bin pedida en 039 sigue viva como línea de nota).
