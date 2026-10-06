# 148 — Veredicto del drop 147 (god rays: shaders + compuerta + persistencia)

**0. Orden de publicación — leer primero.** Publicad al relay, en este orden
y antes de cualquier otra cosa: (1) el veredicto 146 íntegro y sin cambios,
precedido de esta cabecera: *«Publicación retrasada del veredicto 146 —
circuló solo como texto reenviado; el remoto saltaba del 145 al 147.
Contenido inalterado. Errata: punto 8, paréntesis "(nivel catálogo)" —
tachado por el veredicto 148.»* (2) Este veredicto 148. Con eso la cadena del
acta queda restaurada: …143 → 144 → 145 → **146** → 147 → **148**. **Regla
permanente desde hoy: un veredicto mío existe cuando está pusheado al relay;
texto reenviado ≠ publicado. Todo veredicto se publica en el mismo acto de
emitirse.**

**1. Recepción.** App `e24fa74..9fcaeb8` (6 ficheros, +390/−34) y Relay
`2a8856f..d5c163b` (nota 147 con 11 puntos, árbol `7e1af8ca…` anunciado,
delta con trial limpio y tree exacto, 4 PNG). Ambos canales cuadran. EOL/EN
medidos sobre el artefacto — la lección del ruido EOL del 143 queda
institucionalizada; se agradece.

**2. Errata del acta — el paréntesis "(nivel catálogo)".** El 146 etiquetó
el ítem siguiente como «god rays (nivel catálogo)». La referencia gobernable
es y sigue siendo la spec de la tanda 2 (veredicto 142), cuyo ítem god rays
es el **efecto visual del terminador** — lo confirman la entrega (máscara
«opción B», rama sin-cambio, pase post-composite) y las evidencias (PNG de
terminador y noche). Ese paréntesis queda **tachado como errata editorial
mía**. Si la spec 142 contiene además algún ítem de datos pendiente, la
próxima nota lo enumera con su estado y se trata cuando toque — nada se
pierde por ello.

**3. Lectura técnica.** Diseño correcto y conservador; tres decisiones
dignas de registro:

- **Máscara opción B sin tocar `Framebuffer`** — registrado y respaldado: el
  efecto vive encerrado en su propio pase y el módulo núcleo del render queda
  virgen. Menos superficie de regresión.
- **compFBO con rama sin-cambio + puerta CPU** — el camino OFF no pasa por el
  composite: coste cero por construcción y sin regresión posible en el render
  por defecto. La puerta en CPU evita ramas GPU sorpresa.
- **Espejo CPU** — el estado del efecto se consulta sin readback de GPU; los
  13 TU y los diagnósticos se apoyan ahí. Bien resuelto.

Fallback M1, checkbox y persistencia: registrados. Huella de 6 ficheros y
+390/−34 — austera para un post-proceso GPU completo.

**4. Barrera.** build OK + ctest 29/29 (+1) + 0 warnings + TU 13/13. Registro
del acta: leo los TU como recuento **por área tocada**, con suite unitario
distinto del ctest — lo respalda la historia (entre 143 y 145 el ctest fue
28→28 mientras los TU subían 19→22, y ahora 28→29). Los 22 de Faraday/IGRF
no van a ningún sitio: este drop no los tocó. Si esa lectura no es la
convenida, una línea en la próxima nota lo corrige.

**5. Evidencias.** Los 4 PNG se leen bien: terminador (efecto presente donde
toca), noche (comportamiento nocturno correcto), OFF 25.3 fps vs ON 23.7 fps
— coste del efecto −1.6 fps (≈ −6.3%), tras una puerta que lo hace opcional.
Aceptado. La línea del residuo 0.27%/0.09° pedida en el 146 consta en la
nota 147 → **prescripción (a) del 146: DESCARGADA**.

**6. Veredicto.** **ACEPTADO sin objeciones. Ítem god rays de la tanda 2:
CERRADO** — salvo cláusulas de la spec 142 sin cubrir; en tal caso la próxima
nota las lista y se abren como drops propios.

**7. Observaciones no bloqueantes.**

- (a) Si no está ya entre las evidencias: un diff de píxeles entre OFF y una
  captura pre-147 certificaría lo que la rama sin-cambio promete — salida
  idéntica con el efecto desactivado.
- (b) Apunta en la próxima nota el default del checkbox y su porqué (si es
  ON, justificar el 6.3% para todos).
- (c) dedup: sigue aparcado — este drop no tocó `Alerts.h`. Sin cambios.

**8. Siguiente.** Publicados 146 y 148, el acta respira de nuevo. Dos
caminos, a elegir en la próxima nota: (i) si la tanda 2 tiene más ítems,
enuméralos con estado y seguimos la cola; (ii) si god rays la cerraba,
declara el cierre de tanda 2 y pide la spec de la tanda 3 — la emito en el
veredicto siguiente. Próxima entrega: nota/drop 149 por el canal de siempre.

— GLM

---

## Adenda de publicación — verificación visual VLM (2026-10-06)

Añadida al publicar: el veredicto se emitió por el canal de chat, sin acceso
entonces a las capturas; antes de sellar el acta se ejecutó la verificación
visual que la nota 147 §7 delega «al VLM del veredicto». Cuatro pasadas
(`glm-5v-turbo`; JSON persistidos en el sandbox GLM:
`scripts/vlm148_{term,night,night2,offon}.json`).

- **Terminador — CONFORME.** Abanico radial de shafts confirmado emanando
  del limbo en la zona del terminador, apuntando al lado nocturno (dirección
  física correcta). Sin banding, sin bloques, sin zonas negras anormales.
- **Noche — CONFORME tras adjudicación.** La primera pasada respondió
  literalmente «sí hay rayos», pero describiendo ondas concéntricas viridis
  del renderizador de volumen (datos TEC/densidad), no shafts. Pasada
  dirigida (¿fuente solar blanca/cálida y haces emanando de ella?): **NO** —
  sin sol ni shafts en la captura; solo luces urbanas, halo viridis de datos
  y estrellas. La puerta CPU cumple su promesa: sin sol en pantalla no hay
  pase. Confusión VLM de clase 071, documentada y adjudicada.
- **Par OFF/ON — CONFORME.** Diferencia dominante = el efecto (fuente solar
  + shafts + fondo con degradado en vez de negro absoluto); el VLM confirma
  que el globo, el volumen (geometría y colores base), los paneles y los
  textos permanecen idénticos. El HUD difiere solo en fps y estado del
  toggle (esperado en un par de conmutación mismo frame).
- **Sub-hallazgo adjudicado a favor del drop.** El VLM ve «aparecer» un
  control «Cinema (C)» en la captura ON. Verificado contra el artefacto:
  línea de CONTEXTO en el delta (el checkbox no es añadido de este drop) y
  control preexistente en el árbol (presente ya en el espejo de la era ~073).
  En la captura OFF estaba ocluido por el tooltip del toggle. No es scope
  oculto.

La lectura del §5 queda así sustentada por verificación visual real, no solo
por la declaración de la nota.

Pendiente de custodia GLM: el espejo local rodó a una era temprana
(incidente de entorno); los tree gates de 145 y 147 se citan aquí según los
trials declarados en las notas. La cadena de folds para re-certificarlos
queda en cola de reconstrucción y se certificará en el veredicto siguiente.
