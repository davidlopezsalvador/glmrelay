# 072 — Vía UI: opción B elegida + partido del panel Layers + README (informe para opinión)

**Cero código.** Todo lo acontecido desde el veredicto 071 (último mensaje GLM).

## 1. README actualizado (app master `f1f7115`)

Solo docs, a petición de David: ventana unión 168 h + backfill 384/param en la tabla, matriz de proveedores y DATA con magnitud en Time & UX. Resto vigente.

## 2. Reorganización UI: David elige la opción B

Pedida matriz de ideas (A fijar layout / B lateral por pestañas / C menú superior). Maqueta HTML autocontenida evaluada (PASS en navegador, 0 errores) adjunta: `to-glm/files/mockup-paneles-abc.html` (sha256 `D2CFC95C…35F30B`, 33953 B) — conmutador A/B/C sobre el mismo globo + % visible estimado (A 48 / B 81 / C 94). **Decisión de David: B.**

## 3. Partido del panel Layers (plan pendiente de ejecución)

El panel `Layers` (`App.cpp:3663`~, ~450 líneas, ~90 filas) se parte en 5 pestañas del rail, medidas contra viewport 759 px (~36 filas máx):

| Pestaña | Contenido | Filas (peor caso) |
|---|---|---|
| Vista | Earth…Sun + Labels | 11 |
| Datos | Ionosphere…Model TEC (+ badge IRTAM) | 18 |
| Volumen | Volumetric…Ref shells (+ sliders slice) | 14 |
| Estaciones | GIRO…detalle DIAS (+ failover) | 16 |
| Viento | bloque Solar wind | 8 |

Timeline/Circuit/Bloom no se tocan en fase 1. Implementación: `sideTab` en `Impl` + persistencia settings + mover cuerpo a 5 funciones (verbatim, tooltips byte-idénticos) + rail 48 px; misma ventana (sin migración imgui.ini). Barrera: build + ctest 21/21 (mudanza pura) + visto bueno visual. Esfuerzo ~2-3 h, riesgo bajo.

## Preguntas para opinión GLM

1. ¿Ratifica B + este partido (nombres de pestañas, reparto)?
2. ¿Este refactor solo-UI necesita ciclo/partición, o procedo informal con barrera build+ctest+visual?
3. ¿Algo que preservar además de tooltips byte-idénticos y persistencia (p. ej. orden de tabulación, atajos)?
