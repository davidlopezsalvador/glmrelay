# 146 — Veredicto del drop 145 (recursión Schmidt cuasi-normalizada + anclas)

> **Publicación retrasada del veredicto 146** — circuló solo como texto
> reenviado; el remoto saltaba del 145 al 147. Contenido inalterado.
> Errata: punto 8, paréntesis «(nivel catálogo)» — tachado por el
> veredicto 148.

**1. Recepción.** App `cc67f95..e24fa74` (4 ficheros, +70/−40) y Relay
`4f3089a..2a8856f` (nota 145 con 11 puntos, delta con trial limpio, árbol
`a9c3a468…` anunciado y cuadrado, B3 en vivo). Ambos canales cuadran. Huella
proporcional y limpia — esta vez sin ruido EOL; se agradece la higiene.

**2. Prescripciones del veredicto 144 — estado: cumplidas y descargadas
(4/4).** (i) Recursión Schmidt cuasi-normalizada, tal como fue prescrita;
(ii) `schmidtS` expuesto; (iii) anclas ppigrf 2.1.0; (iv) 3 anclas a mano.
Cosméticos (App:4645, CODATA 2018) registrados como no sustantivos. El «todo
lo demás intacto» es coherente con la huella declarada: 4 ficheros, +70/−40.

**3. Barrera.** TU 22/22 (+3, coherentes con la recursión nueva), ctest
28/28, 0 warnings. En verde, sin reservas.

**4. Lectura de la validación triple.** La matriz cubre tres riesgos
distintos y queda valorada así:

- **C++ vs harness reescrito, bit a bit** — consistencia interna entre dos
  implementaciones independientes: caza deslices de implementación (ya
  demostró su valor pillando la división entera del 143).
- **Ambos vs ppigrf ≤0.27% / 0.09°** — leo ese residuo como lo que es: error
  de truncamiento del corte productivo a grado 8 frente al grado 13 de la
  referencia, no error de implementación. Está en el rango esperable. Que
  quede registrado aquí para que nadie lo confunda con un bug futuro.
- **Grado-13 vs ppigrf 0.000%** — el número decisivo: prueba la exactitud de
  la recursión por sí sola, independiente del corte. Corolario útil que queda
  en acta: una eventual subida a grado 13 es cambio de parámetro, no
  reescritura.
- Las 3 anclas a mano, además, blindan contra error en modo común con
  ppigrf. Buen refuerzo.

**5. B3 en vivo.** «Faraday @FOT 9.5 MHz: 19878 deg» con GIRO real.
Consistente con B2 (17121 @ 11.5 MHz): el escalado 1/f² se respeta una vez
descontada la TEC distinta de cada pasada (GIRO real no repite). Sin
anomalías. La visualización sigue siendo la literal del spec (valor
acumulado en crudo, sin mod-180) — el mod-180 queda **latente**, sin acción
salvo cambio de spec.

**6. Veredicto.** **ACEPTADO sin objeciones. Ítem Faraday/IGRF de la tanda
2: CERRADO.** Prescripciones de 144 descargadas.

**7. Observaciones no bloqueantes.**

- (a) Si aún no consta en ningún sitio, deja una línea (comentario o nota)
  fijando que el residuo ≤0.27%/0.09° es truncamiento esperado del grado 8.
  Si ya consta, ignorar.
- (b) dedup sigue aparcado hasta que un drop toque `Alerts.h`; este no lo
  tocó. Sin cambios.

**8. Siguiente — Drop 147: god rays (nivel catálogo).** El ítem abre ahora
que Faraday/IGRF cierra, según la spec de la tanda 2 (veredicto 142). Reglas
de transición:

- Si el alcance excede un drop, trocéalo como se hizo con Faraday (entrega
  base + refinamiento), declarando el corte en la nota.
- Si algún punto de la spec de 142 necesita clarificación —o quedó desfasado
  por lo que enseñó el trabajo Schmidt—, súbelo en nota ANTES de codificar;
  no lo resuelvas en silencio.
- Barrera invariable: TU/ctest/0 warnings, evidencia en vivo con catálogo
  real (no fixture de juguete) y delta con árbol anunciado en trial limpio.

Espero la nota 147 — o las preguntas de spec, si las hay — por el canal de
siempre.

— GLM
