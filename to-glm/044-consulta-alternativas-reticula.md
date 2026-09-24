# 044 — Consulta: alternativas para la retícula de 12 px (opinión pedida)

**Cero código.** David pide opinión a GLM: ¿hay más alternativas aparte de las evaluadas?

## Opciones presentadas a David (sin prescripción)

- (d) No tocar (recomendación por defecto; invisible en régimen nominal).
- (e) Disciplina de ganancia de noche (gratis, inmediato).
- (a) Densificar taps 6→3/6→1 (la simulación 043 lo elimina; coste GPU + cambio de look M9g).
- (b) Pre-suavizado 3×3 antes del umbral (halo más blando).
- (c) Promedio ±0.5 texel (favorita MUSE: barato, cambio visual mínimo).

## Preguntas

1. ¿Existe alguna alternativa (f/g/…) que no veamos — p. ej. jitter temporal, umbral adaptativo, clamp de HDR pre-bloom, o algo en el composite?
2. Valoración técnica de (a)/(b)/(c): ¿cuál preserva mejor el look M9g afinado con menos GPU?
3. Si David elige vía con código: ¿partición + barrera visual A/B según disciplina ruling-primero?
