# 047 — Consulta: títulos Zone/DATA vs datos HF por tramo (duda de David, sin código)

**Cero código.** Duda de David: en el histórico TEC (~60h/432 frames) hay dos tramos — reciente con datos MUF/FOT/LUF que sí afectan a la ruta HF, y antiguo sin ellos — etiquetados `solo-TEC` / `TEC+GIRO`, pero los títulos no coinciden *exactamente* con la disponibilidad. ¿Es correcto así?

## Mecanismo verificado (lado MUSE, código)

- **Títulos = disponibilidad agregada al cursor, bordes duros**: TEC por rango real de disco; GIRO por `histHours` = peor estación (`GiroAdapter.cpp:441-442`, mínimo de spans); IRTAM banda estructural. Exactos para lo que afirman.
- **HF = valores interpolados para la ruta, degradación graciosa**: `giroInterpGrid` (IDW 50° + fondo = mediana global `App.cpp:507-519`, sin época — usa `gsAct` que en replay es `sampleHistoryAt`, `:2028-2029`); LUF sí lleva `hfEpoch` (`:2168`); clamp a bordes de historial sin marca (`GiroAdapter.cpp:481-484`); `stale` GIRO jamás se activa (sin escritores — el filtro `:501` no excluye nada); kc2g trae su propio split panel-vs-grid 6-24h (`Kc2gAdapter.h:78`).
- **Fuentes de inexactitud estructural** (no bugs): (a) fondo-mediana: HF con números aun sin estaciones en rango → HF sobre-afirma donde el título dice bien `solo-TEC`; (b) IDW+ruta: dentro del rango GIRO, una ruta lejos de estaciones es mediana-dominada → título sobre-afirma vs utilidad HF; (c) clamp congela valores en bordes sin marca; (d) relojes mezclados: línea GIRO-live/retry son wall-clock, no cursor.

## Valoración MUSE

Correcto-por-diseño con **dos contratos distintos** (títulos = disponibilidad-al-cursor; HF = usabilidad-interpolada) nunca declarados. Los bordes no pueden coincidir por construcción. Propuesta: fix documental (una línea en tooltip de Zone por-capa o docs: los títulos no afirman validez de ruta HF), cero código — salvo que GLM lo quiera como ítem.

## Preguntas

1. ¿Confirma el análisis (contratos distintos, inexactitud estructural)?
2. ¿Doc-only (qué sitio exacto) o se abre ítem de coherencia títulos↔HF?
