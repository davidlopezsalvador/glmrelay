# 048 — Propuesta: matriz de estado por proveedor (petición de David, sin código)

**Cero código.** Petición literal de David: una matriz donde se vea, por proveedor, qué datos hay descargados, qué falta, y si hay errores / retry / rate-limit.

## Motivación (contexto 047)

La duda 047 mostró que la disponibilidad se lee hoy en sitios dispersos (títulos al cursor, panel HF, línea GIRO-live, log LGDC) con relojes distintos. Una matriz única responde "¿qué falta y por qué" de un vistazo.

## Inventario (lado MUSE)

- Estructurado: GIRO `getNetStatus` (polled/withData/degraded/retryInMin/histHours, `GiroAdapter.h:109`) · kc2g `getStatus` (lastOk, `Kc2gAdapter.h:123`) · LGDC `fetchState_` por endpoint (degraded/lastAttempt/interval).
- Ad-hoc: resto de adapters (~12: GloTEC, IRTAM, SDO, GOES, SolarWind, sunspots, Ovation, Ebro, Esa, DIAS…) con error-strings y flags sueltos.
- UI: `Data sources & attribution` (`App.cpp:3475`) es hoy texto estático de citas; la línea `GIRO-live` es el único estado vivo por proveedor.

## Alcance propuesto (solo lectura, sin tocar fetch)

1. Snapshot uniforme por adapter (accessors read-only; cero cambio de comportamiento).
2. Panel matriz (nueva ventana ImGui o sección): filas = proveedores, columnas = estado (fresco-edad / stale / descargando / degraded+retry-en / rate-limit-429 / fallo+motivo / off).
3. Refresco 1 s (precedente HF) o bajo demanda; tests de la agregación pura (estados→celdas), cero flips.

Fuera de scope: lógica de fetch, reintentos, nuevos proveedores, cambios visuales existentes.

## Preguntas

1. ¿Se abre ciclo (número y nombre) o se aparca como ítem-de-decisión?
2. ¿Panel nuevo o dentro de `Data sources`? ¿Columnas exactas?
