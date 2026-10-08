# REGISTRO 186/188 — veredictos chat-managed (reconstrucción desde el worklog de GLM)

Marca de procedencia: los veredictos 186 y 188 se emitieron en canal de chat
(arco web-replay D185→D187); los textos originales no se conservaron (declarado
por MUSE). Este fichero es RECONSTRUCCIÓN del contenido sustantivo desde el
worklog durable de GLM; los números y estados citados son verificables contra
el relay (linaje D183/D185, Adenda 187, veredicto 192).

## VEREDICTO 186 (Drop 185 — fix 2 líneas shader VOL + cierre spec §2) = APROBADO
- P1 CUMPLIDA: fix de 2 líneas (fuera glslVersion; vec3(u_volRes) − 1 → − 1.0),
  wiring puro sin TU nuevo — correcto: la matemática CPU-visible no cambió y la
  suite 113 intacta es la barrera que corresponde a un cambio de cableado. La
  validación real del fix = consola limpia del trial prod (exigencia nueva del
  veredicto 184 CUMPLIDA: cero errores de shader, solo #418 preexistente).
- P2 CUMPLIDA EXACTA: spec §2 raymarch CERRADA; §3 ledger actualizado; fila
  March 72×36 pineada como baseline auditable.
- VLM: fuente correcta (prod, no dev); OFF/ON con estados verificados por
  clase. Métricas D183→D185 (mean 0,46→0,68; mediana 0; >2 LSB 3,0%→6,3%;
  lift +8,9k→+65k) leídas ENTONCES como firma del fix — ver ERRATA del 188.
  Límite epistémico declarado: OFF/ON prueba que el volumen dibuja con consola
  limpia, NO que lo dibujado corresponda al app (eso queda para D187).
- Barrera aceptada por protocolo: 113/113, tsc 0, build OK; delta 2305 B LF
  puro; blob-40 completos; post = build.
- Drop 187 asignado: contraste app↔web Volumen ON, epochs alineados, métricas
  estándar + cualitativo por clase. Ledger: seam P3 declarado-abierto; cableado
  CPU volumeMarch (spec, no bloqueante); #418 tolerado; default del toggle OFF
  ratificado hasta evidencia de paridad.

## VEREDICTO 188 (Drop 187 — contraste app↔web Volumen ON) = APROBADO, con errata al 186 + 2 completaciones
- ARCO ORIGINAL CUMPLIDO: par app (00:00:03Z, DATA 23:54:08Z) ↔ web en replay
  al DATA del app, 14/44 estaciones, Volumen ON verificado por clase; PASS
  cualitativo con cámaras distintas DECLARADAS (sin cámaras emparejadas no hay
  paridad de píxeles que reclamar).
- Baseline OFF/ON CERTIFICADA bajo protocolo riguroso (controles: estados
  verificados + backend congelado + cine/aurora OFF): mean 0,46 / mediana 0 /
  3% >2 LSB / lift +8,9k. Protocolo resultante OBLIGATORIO para toda medición
  OFF/ON futura de la línea.
- ERRATA AL 186: el lift +65k de D185 contenía varianza no controlada (backend
  vivo y/o capas animadas y/o encuadre), NO atribuible al volumen. Efecto real
  del fix de 2 líneas: higiene de consola + corrección de muestreo (trunc −1.0).
  La 186 no se reescribe (disciplina append-only); esta errata la supera.
- Completaciones de protocolo (no bloqueantes): (1) línea de custodia de D187;
  (2) procedencia de la coincidencia métrica D183==D187. AMBAS CERRADAS por la
  Adenda 187 (adjudicada en el veredicto 192: L1 custodia ✓; L2 = reproducción
  determinista — backend congelado + cámara determinista + SwiftShader →
  píxel-idéntico → métricas-idénticas).
- Causas raíz de los loaders cerradas como documentación: (1) dev+Turbopack no
  hidrata en este entorno (prod sí); (2) texturas ausentes del ZIP. Protocolo:
  capturas SIEMPRE desde prod.
- Backlog declarado: seam P3; cableado CPU volumeMarch; #418; texturas ZIP.
  Decisión cierre/extensión del arco en manos de David (cierre por defecto).

## Estado
Los dos veredictos quedan así registrados en durable. El hueco chat-managed del
tramo 186→190 queda cerrado con: este registro + from-glm/190 (ruling) +
from-glm/192 (veredicto con la adjudicación de la Adenda 187).
