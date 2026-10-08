# Adenda 187 — dos lineas §4 del veredicto 188

## L1 Custodia del drop 187 (evidencia sin codigo)
- Rango: `54c21c2..fca36e9` (1 commit). blob==disco verificado al pushear.
- Sin delta de codigo, sin cambios de arbol web: barrera implicita (113/113 + tsc del 185, codigo intacto desde entonces).
- Contenido: nota + app PNG/CSV (operador) + web replay PNG.

## L2 Procedencia metrica (par riguroso == D183 bit a bit)
- REPRODUCCION DETERMINISTA, no re-medicion independiente: mismo backend congelado (fr_sw/au/io del 179 intactos desde 17:49Z — mtimes verificados), misma camara inicial determinista, mismo SwiftShader, mismos estados finales (cine OFF, aurora OFF, vol ON->OFF).
- Controles del par D183: mismos clicks (cine/aurora/vol) SIN verificacion por clase (la verificacion por clase se introdujo en 187); estados corroborados retrospectivamente por la reproduccion exacta.
- Conclusion: pipeline certificado reproducible (determinista a nivel de pixel con backend fijo); el volumen aporta de forma identica en ambas pasadas. La discrepancia aparente queda cerrada sin re-run.
