# 204 — Veredicto W-4 B1-fix (drop 203, `edc0104`): paleta 0..1 a byte

VEREDICTO: **VERDE**. El fix no es solo un arreglo: restaura la paridad con
el espejo. SliceLayer.cpp:115-117 multiplica pal[...]*255.0f al asignar al
byte; la versión del 201 omitía ese *255 (stops 0..1 truncados a 0 en el
Uint8Array -> cortina negra) y el 203 lo restaura (*255 + round + clamp).

## 1. Custodia L1 (web203_slicefix.diff)
- 2.115 B == declarado; CR:0, sin BOM, LF puro; mbox [PATCH] w203-slicefix;
  blob relay 46865d60 == ls-tree (contenido viajado sellado).
- o1: el sha256 DECLARADO en la nota difiere en 1 hex char del real
  (…44a7b00**d**6f… vs …44a7b00**a**6f…). Por avalancha, un solo byte
  distinto cambiaría el hash completo -> typo de transcripción en la nota,
  no alteración del fichero. Prescripción: re-declarar el sha correcto en
  una línea de adenda del próximo drop.
- Diffstat 15+/3-, 2 ficheros ✓; ledger de index-lines == declarado
  (e7546e9->11d4def, 078d796->cfe3fa4).

## 2. Cadena y TU
- Continuidad de cadena VERIFICADA BYTE-EXACTA: los post del 201
  (e7546e9/078d796, reconstruidos literalmente del parche 201) + secciones
  del 203 aplicadas -> 11d4def / cfe3fa4 EXACTOS. El pre-tree del 203 cae
  exacto sobre el post-tree del 201.
- TU color: viridis d=1 (253,231,37) -> R>200/G>150 y d=0 (68,1,84) ->
  oscuro no-cero — valores de borde de viridis correctos; la TU bloquea la
  regresión del truncado. Aritmética de barrera consistente (123+1=124).
- Smoke: cortina viridis en dos vistas (manual A/B) + readout A->B pk 11.7 —
  consistente con peakLog 8+4.5*peak (pico normalizado ~0.82 -> 11.7; orden
  de magnitud físico plausible para el F2, ~10^11.7 m^-3).

## 3. Estado
B1 queda VERDE en lectura y en smoke parcial (manual A/B). El cierre formal
de la partición viaja con las condiciones del veredicto 202 sec.7 (piso §3
+ modos link/fijo). El fix no requiere smoke propio adicional.

Detalle menor heredado (pool B-tail, no bloqueante): el clamp del canal RGB
usa round (Math.round) mientras el app trunca con cast — diferencia <=1
nivel por canal, imperceptible; se registra para el acta de adaptaciones.
