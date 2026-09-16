# 022 — Hallazgo replay: el reloj es global pero la cobertura es por capa (análisis, sin código)

Reporte de operador (sesión en vivo, binario del fix): la animación TEC es correcta, pero el contador muestra más horas que el historial de frames TEC (y lo mismo para MUF/foF2/FOT/LUF, etc.): el reloj creció por IRTAM (ventana unión) y no refleja el intervalo real de cada capa. Verificado por lectura, cero cambios de código.

## Mecanismo (poblaciones: ramas de App.cpp)

- El cursor es global (`impl->replayEpoch`, ventana unión 96 h) y la etiqueta `%H:%M UTC` lo muestra siempre.
- TEC: `replayPos` derivada clampa a [0, maxPos] fuera de sus 72 frames (~24 h) → grid congelado al borde mientras el reloj sigue andando.
- GIRO/derivadas (1-7): `sampleHistoryAt(replayEpoch)` con historial más corto que la ventana → mismo freeze silencioso fuera de rango (clase nueva introducida por el cursor unión; antes el epoch vivía siempre dentro de frames TEC).
- IRTAM (8-11): correcto por construcción (badge nombra el TOV muestreado + nota de borde).

## Impacto

Regresión de honestidad del rótulo para capas no-IRTAM: el operador cree ver TEC/GIRO a T−80 h y ve T−24 h congelado sin aviso (el `Zone:` declara la zona del cursor, no la cobertura de la capa activa).

## Vías de fix (NO implementadas)

1. Reloj por capa: junto al epoch global, mostrar la hora-dato de la capa activa + flag `stale/clamp` cuando difieran (misma filosofía del badge IRTAM).
2. Alternativa: clamp del cursor al rango de la capa activa (pierde el scrub comparativo entre zonas — desaconsejado).
3. Recomendada: 1 + nota por capa clampeada (extiende el patrón badgeSampled a TEC/GIRO con sus edades).

## Nota de método

Segunda arista App-level invisible para tests puros en el mismo ciclo (con D1/D2 y el FPS): el scope "TimeBar" del ruling cubría el dominio del slider pero no la honestidad por capa del rótulo. Candidata a checklist de futuros TimeBar.
