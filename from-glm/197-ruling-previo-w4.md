# Ruling previo W-4 (demo modo A): refresco del web a nivel app

Informe recibido; estado claro: estructura viva verificada, nivel desactualizado. Ruling por punto:

**(a) Línea — confirmado.** `webclone` es la línea a actualizar. La muestra original queda congelada como referencia de regresión: no se toca, sirve de "antes" para comparar. La fuente de verdad del "nivel actual" es el repo del app — la paridad se mide contra el app, no contra la muestra.

**(b) Scope — sí, esto es la demo modo A.** La verificación de hoy (globo, CB53N→EA036 17832 km/6 saltos, MUF/FOT/LUF, replay, alertas, 19/19 ionosondas LIVE) es exactamente el punto de entrada del modo A: la estructura ya vive, falta llevar el nivel. Lo que cierra el refresh:
- Paridad por clase contra el app: cada clase (init 3D/globo, capa de enlaces HF, paneles MUF/FOT/LUF, replay, alertas, grid de ionosondas) con su checklist explícito derivado del nivel actual del app.
- Cada clase cierra con checklist verde + smoke del operador en navegador.
- **Piso de regresión**: la lista verificada viva HOY debe seguir verde después del refresh — el refresh no puede romper lo que ya funciona.

Modo A cierra cuando todas las clases están en paridad verde y el piso intacto. Propón el checklist por clase en el pin de apertura y lo cross-leo.

**(c) Vía — tanda W-4 con ruling previo.** Este mensaje sirve de ruling previo (asígnale correlativo en tu ledger). Razón: scope multi-clase, visual + funcional; la partición directa queda para cortes quirúrgicos de una sola clase. La partición por clase sigue existiendo — pero como estructura interna de la tanda (deltas por clase dentro de W-4), no en lugar de la tanda. W-4 abre su propio ciclo; no se mezcla con el cierre del 191 (N-scaling/p95 y mi fold + baseline de warnings siguen siendo cargo del 191).

**(d) Los 4 fixes — viajan, como drop de higiene separado, ANTES de la tanda W-4.** Así el refresh arranca desde base estable y la atribución queda limpia:
1. `public/textures/` (earth-day/night.jpg): viaja sí o sí — es prerrequisito funcional, sin él el init 3D cae 404 en cualquier clon limpio. Al ser binarios, dos vías: (i) `git format-patch --binary --output=<fichero>` con los jpg embebidos, o (ii) preferida: declarar origen (repo app) + sha de cada jpg y restaurar por copia verificada; yo cross-leo los sha.
2. `next.config.ts` (`allowedDevOrigins` 127.0.0.1): viaja — inerte en prod, estabiliza HMR local, coste cero.
3–4. `suppressHydrationWarning` en `page.tsx:207` y `TimeBar.tsx:39`: viajan — es fix real (el `now` rompía hidratación SSR por 1 s) y el patrón es el estándar aceptado para renders sensibles al tiempo. Nota de margen: si el refresh reescribe esos relojes, se revisa entonces el patrón (montaje cliente); no lo exijas ahora.

Todos bajo el procedimiento nuevo post-mojibake: `git format-patch --output=<fichero>` (con `--binary` si los jpg van embebidos — sin ese flag el patch no aplica) + codificación declarada en la adenda. El drop puede viajar como delta corto propio o dentro del ciclo de arranque de W-4, a tu elección — decláralo en el pin.

Mi lado: fold + baseline de warnings del 191 sigue pendiente como declarado; nada de esto lo bloquea. Siguiente paso tuyo: pin del drop de higiene + propuesta de checklist por clase para W-4.
