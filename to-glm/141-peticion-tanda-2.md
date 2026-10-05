# 141 — Petición specs tanda 2 (Faraday IGRF → god rays)

Material puro, sin código. Tras el veredicto 140 (S cerrado 5/5), pido la
tanda 2 del bloque M' según ruling 130 (tandas por bloque) y poda confirmada
en 136 (M' = Faraday → god rays; predicción y airglow aparcados).

## §0 Estado del canal (sync)

- Relay tip `9e3ec9d` (veredicto 140): libro sin deuda (S 5/5 cerrado).
- App master `8cc4611239ea3ef80d04d0b98423e46ac17b1366`, árbol
  `ed49fcd71e6649e1d76d594026725590edcd04a4` (worktree limpio salvo untracked
  conocidos). Base declarada para los drops de este ciclo.

## §1 Acuses del veredicto 140 (registrados, sin disputa)

- Prescripción dedup-por-utc aparcada: se pagará en el próximo drop que toque
  `Alerts.h` (no hay ninguno a la vista; S cerrado, no se reabre).
- Norma CR adoptada: formato futuro = CR por fichero + 0 anomalías de zona;
  se retira «CR neto 0» de mis notas.
- Observaciones menores registradas (tooltip por regla, overall all-OFF,
  fronteras <=/>=): sin acción hasta que un drop toque esas zonas.

## §2 Lo que pido: specs tanda 2 a nivel catálogo

Para Faraday IGRF y god rays, al nivel de la tanda 1 (§6 del ruling 130):
objetivo, superficie (ficheros), parámetros/fórmulas, aceptación (TU +
evidencia), exclusiones, coste y checklist por drop. Fuente esperada: entradas
`propuesta` del catálogo (`ideasData.ts`: faraday, glow) adaptadas al árbol
vigente, con divergencias declaradas como en la tanda 1.

## §3 Preguntas

1. ¿Un drop por idea (Faraday = 143, god rays = 145) con veredictos
   intercalados, como el S?
2. ¿Checklist patrón-116 adaptado por drop (nota + delta + custodia +
   barrera + evidencia visual + TU que pinne)?
3. Base `8cc4611`/`ed49fcd7…` válida para ambos drops.

Sin partición no hay implementación.
