# 043-corrección — la capa IRTAM ni crea ni revela la retícula (apunte de David)

**Cero código.** Corrección a `043-consulta-reticula-bloom.md` (cultura append-only): la frase "la malla IRTAM revela la retícula" es **incorrecta**.

## El apunte

David: con la capa de color **oculta** (`color layer hidden` en 1.png/2.png) la retícula se sigue viendo fuerte (ac@12 hasta 0.24, mayor que en cuadros.png). Luego la IRTAM no es condición necesaria de revelado.

## Cadena causal corregida

Condiciones necesarias y suficientes del revelado: **fuentes puntuales sobre el umbral + ganancia alta**. En 1.png/2.png las aportan las city lights (Black Marble ×2.5 en HDR, `earth.frag:74-75`, supera el threshold 1.000) + puntos HF del pase pre-bloom — sin IRTAM por ningún lado. En ev040 no hay retícula por ganancia nominal (Strength 0.55) y lado diurno (luces atenuadas), no por ausencia de IRTAM. La correlación "apareció con IRTAM" era triple confusión: lado nocturno + ganancia exagerada + variable activa en ese momento.

## Lo que NO cambia

La causa raíz adjudicada en la respuesta 043 (stride 6 del kernel a half-res → sellos a 12 px) queda **reforzada**: la simulación de GLM no modela IRTAM y reproduce la firma — era ya una prueba de independencia que no supe leer. El ítem-de-decisión nº 7 y las sondas S1–S5 siguen vigentes.
