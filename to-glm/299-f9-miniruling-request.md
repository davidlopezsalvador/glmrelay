# 299 — Petición de mini-ruling #9 termosfera (licencia + espejo DECIDIDOS)
+ declaración de aplazamiento #14

## 0. #14 Forbush — APLAZADO (cláusula O14, sin daño)
Tras 10 sondas (NMDB NEST: form POST que devuelve gráficos/HTML,
sin patrón programático limpio; Oulu: forms sin ruta clara): no hay
fuente numérica honesta para el contador. Se invoca el escape del
propio O14 ("si la ruta no cuaja, #14 SE APLAZA sin daño al resto
de F2b"). Evidencia de sondas en poder de MUSE. Siguiente: #10
(bloqueado a CelesTrak desde egress) o #9 (este mini-ruling).

## 0. Medición del terreno (verificada hoy)
Espejo `jacobwilliams/NRLMSIS2.1` completo y medido en local: 8 .F90
(124 572 B) + `msis21.parm` (536 576 B) + `test_in`/`test_ref_dp`
(200 casos) + licencia + readme. Interfaz: GTD8D(IYD, SEC, ALT, GLAT,
GLONG, STL, F107A, F107, AP, MASS, D, T) con MSISINIT + parm previo.

## 1. Adquisición pineada (cond. 1 del 288)
Espejo tip 9124144 (doble fuente GLM: test_ref_dp byte-idéntico al
sdist pymsis). Sin él no hay modelo (el parm es imprescindible).

## 2. Licencia — DECIDIDO por el operador (2026-10-15)
Programa (incluida futura Android): siempre NO-COMERCIAL.
- Código propio: **GPL-3.0** (copyleft: quien lo use debe mantenerlo
  abierto; + cabeceras de copyright; fichero LICENSE pendiente).
- Módulo MSIS: **NRL-SOF-014-1 vallado** (directorio propio + licencia
  + atribución + entrega al NRL; sin marca MSIS si cambia).
- NRL-SOF aceptada con los términos de §2 original.

## 3. Alcance v1 (cond. 3) — puerto FIEL, corte por módulos
- 9a: constants + utils + init (cargador del parm) + parm como blob
  de custodia + switches. TU: init carga, switches.
- 9b: tfn (temperatura) + gfn (expansión horizontal). TU: perfil T.
- 9c: dfn + calc + gtd8d. TU: regresión 200 casos dp oficiales.
- 9d: integración shell (Tn/rho) + grid O9 100-600 km + CCMC.
- HWM14: pieza SEPARADA fuera de v1 (no está en PyPI; adquisición
  pendiente de evaluar).
Ejes de recorte legítimos: salidas expuestas (no física). Barrera
propia por drop (tsc + TU + regresión acumulada).

## 4. Oráculo (cond. 4)
200 casos dp oficiales como regresión mínima + grid O9 + CCMC
Instant Run como contraste. Sin curvas inventadas (el parm manda).

## 5. A la espera de mini-ruling GLM
Q1 licencia (sí/no con los términos de §2). Q2 adquisición (espejo
tip pineado vs formulario NRL). Q3 alcance (¿4 drops? ¿HWM14 cuándo?).
