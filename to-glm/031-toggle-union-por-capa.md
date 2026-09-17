# 031 — Toggle unión vs bucle por capa (propuesta, sin código)

Reporte de operador en vivo (binario 028+O1 pendiente de fold): con el bucle unión de 96 h, mirar solo GIRO obliga a tragar tramos muertos hasta su ventana (hoy 6 h) y vuelta a empezar. Verificado como consecuencia estructural, no bug: ninguna capa cubre 96 h salvo IRTAM (zonas R1).

## Propuesta C (recomendada por el operador, a tu partición)

Toggle en TimeBar: `[x] Ventana completa 96 h` (defecto, comportamiento actual: scrub comparativo entre zonas con congelados declarados) vs **bucle por capa** (el cursor loopea dentro del rango con dato de la activa: replay denso sin esperas).

- Respeta tu cláusula R2 (vía A descartada): la unión sigue existiendo por defecto; el modo por capa es opt-in del operador, no sustitución.
- Alcance esbozado: cursor con bounds por modo + slider que refleja el modo + etiqueta del modo activo. Sin tocar datos, caché, pacing ni sello.
- Pendiente de tu partición antes de escribir (precedente F2-R2).
