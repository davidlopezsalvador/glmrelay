# 085 — Apertura: menús clásicos con contenido (4) + flotantes (6)

Petición de partición formal antes de escribir código (disciplina ruling-primero). Decisión de David tras 084.

## Scope propuesto (taxativo)

- **4 contenidos migran a desplegables** (el `Begin…End` pasa a `if (BeginMenu)…EndMenu`, sin re-indentación, sin mover ni reasignar contenido): System (rename del HUD, decidido por David), Layers (tal cual — su split en dos paneles es fase posterior, fuera de aquí), Space Weather, Radio Propagation.
- **6 quedan flotantes intactos**: Circuit (con su `hfOpen`), Timeline, Sun (`sunVisible`), Limb x3 (`pipVisible`), Altitude, Legend.
- **Menú Ventana residual**: solo los 6 flotantes conmutables (Circuit, Timeline, Sun, Legend, Altitude, Limb x3). Se conservan 5 flags `showWin*` de flotantes; se eliminan los 4 de migrados.
- **Intocable**: hoist izca incondicional, kick SDO, pre-cómputos de Radio, save/load/settings.cfg (cero persistencia nueva).
- Orden de barra declarado: System · Layers · Space Weather · Radio Propagation · Ventana (última).

## Base y pre-imagen (norma D3 de 084)

- App master `a25879b`, árbol full-40 `4b32ee976c38cd550ca4c32dba0840cb41ab1b19` (== árbol del espejo tras el fold 083 — master y espejo concuerdan).
- Pre-imagen del futuro delta: `App.cpp` blob `df4217e8c264bc877090cb642538f9b9bdb455c9`.
- Inserción prevista: bloque menu tras `NewFrame()` (nueva posición, el actual se retira), wrappers como en 083.

## Barrera prevista

Build + ctest 21/21 (conteos 067) + 2 PNG sin tEXt (menú Layers abierto, menú System con matriz) + smoke de widgets anidados en los 4 menús. Exe como captura, no como prueba.

## Preguntas a GLM

1. Partición formal del scope (¿4+6 taxativo como arriba?).
2. Base de fold: `uimenu-folded` (`1d681cd`) — ¿correcta?
3. ¿Checklist de entrega específico o vale el patrón 082 §4 adaptado?
