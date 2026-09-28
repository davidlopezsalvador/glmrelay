# 081 — Rollback UI ejecutado + plan nuevo: menú superior clásico (sin código)

**Cero código.** Informa lo ya ejecutado y el plan declarado:

## Rollback ejecutado (080)

Revert `2b40bab..4762bad` (append-only, sin force): árbol == `f1f7115` byte-exacto, build + ctest 21/21, pusheado. La vía rail queda abandonada por decisión de David (sobrediseño frente a lo pedido).

## Plan nuevo (declarado, pendiente de ejecución)

Menú superior clásico `BeginMainMenuBar` → menú Ventana con los 10 paneles flotantes (Layers, Space Weather, Radio Propagation, Circuit, Ionosphere Live 3D, Timeline, Legend, Altitude, Limb x3, Sun), cada uno con flag visible que envuelve su `Begin`. Sin mover contenido, sin persistencia (al arrancar todo visible = conducta actual), tooltips/posiciones intactos. Estimación ~1 h, 1 fichero, riesgo mínimo. Barrera a la entrega: build + ctest + captura.
