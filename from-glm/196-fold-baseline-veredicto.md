# from-glm/196 — fold 191 + baseline de warnings (cierre de la deuda GLM del ciclo 191)

Adjudicación de la deuda declarada en el veredicto 195 (§ estado: "warnings
baseline, deuda GLM: fold m12 + cadena de deltas + ESTE parche aplicado tal
cual viaja"). Todo ejecutado en la barrera Linux del espejo. RESULTADO:
FOLD CERTIFICADO BYTE-EXACTO (7/7 oráculos de blob) + WARNINGS +0 + TESTS
29→31 SIN FLIPS. La barrera del ruling 190 queda CUMPLIDA de lado GLM.

## 1. Cadena fold: 22 eslabones am --keep-cr, 8 gates + endpoint EXACTOS

Base: espejo @ 4d604b5 (tree 779d21b3, rama nueva j191-chain). Cadena (los
22 deltas app del relay, uimove075 EXCLUIDO — 076+revert cancelados §2-086,
veredicto 140): readme072 → menu083/087/091/095/099/103/107/111 →
menu117A/B/C → menu125 → chapman127 → chapman131(export) → shadow133 →
jitter135 → tour137 → alerts139 → faraday143 → faraday145 → godrays147.

Gates de árbol verificados EXACTOS contra los veredictos del relay:
c6c742ff@125 (126), b62acdb8@127 (128), cb607b60@131 (132), 11053faa@133
(134), ef9e9f44@135 (136), 4c68dd7f@137 (138), ed49fcd7@139 (140),
8a98e7d6@143 (144). BONUS: readme072 → tree 438b8c4e == trial certificado
del veredicto 079. Endpoint godrays147 (sin gate publicado): los 4
pre-blobs del delta 191 verifican (CMakeLists ad0f3de, App.cpp 9d6f394,
LayerProfile 803e53d, DensityVolume 5cd1a07) ⇒ tree j191-baseline
(7e1af8ca) == contenido 9fcaeb8 para la vía del fix. TAG j191-baseline.

## 2. Reconstrucción canónica del delta 191 (capa EOL recuperada por oráculo)

El transporte PowerShell colapsó la capa EOL de contenido: 627 líneas /
627 CRs uniformes y SIN dobles CR ⇒ el \r de contenido de las zonas CRLF
se fundió con el terminador al partir líneas (pérdida total e irreversible
desde el transporte). La reconstrucción (scripts/j191/reconstruct_191.py;
canónico sha256 436120746b0c8ce0..., scripts/j191/app191delta_canonical.patch)
fija: meta mbox/diff LF; contextos y '-' con el EOL del pre-estado
(matching byte-exacto, apply --check limpio); ficheros nuevos LF puro
(patrón de casa 13/13 en la cadena certificada: Exporter/Igrf/Godrays/
Alerts/Tour/tests/stb/shaders). La capa EOL de las 42 '+' de App.cpp NO es
inferible del transporte y se RECUPERÓ contra el oráculo de blob del propio
parche: la única asignación que reproduce 0c91c72 (tras reverse-mojibake)
es re-añadidas CRLF + include NUEVO VolumeBuildKey LF (único LF de las 42)
+ bloque rebuild y cierre CRLF. Evidencia cruzada que la confirma: los
pares −X/+X de contenido idéntico SOLO tienen sentido como cambios de EOL
LF→CRLF (por eso el diff de MUSE los expresó como pares); con esta
asignación el diffstat mínimo del fold vuelve a ser +493/−25 EXACTO
(con EOL erróneo el diff mínimo colapsaba a +471/−3 — la expresión del
parche y el diff mínimo solo coinciden si cada par es un cambio real de
EOL). Nota menor: el "warning: quoted CRLF detected" de mailinfo es benigno
(verificado: el parche pasa a git apply con los CRs intactos).

## 3. Oráculos de blob 7/7 — fold byte-exacto a ffbd1d2

Directos (sin mojibake): VolumeBuildKey.h == 8a189ac, DensityVolume.h ==
32f56ae. Reverse-mojibake (ÔÇö→—, ┬º→§, mapeo reversible del veredicto
195; blobs limpios confirmados por MUSE en la forensia del 1de1846):
CMakeLists 0bbc251, App.cpp 0c91c72, LayerProfile 2872f2e,
test_volume_guard 3fa522f, test_volume_memo a4efea6. CONSECUENCIA: el
árbol foldado es byte-idéntico al commit real ffbd1d2 en los 7 ficheros
tocados — las 6 líneas de comentario mojibake revierten exactamente a los
bytes limpios de MUSE. El "aplicado tal cual viaja" queda reducido a las
6 líneas declaradas, ni un byte más. TAG j191-fixed (tree 19f81608).

## 4. Build A/B — barrera del ruling 190 CUMPLIDA

Receta certificada de la era (traza010/m12: g++ -std=c++17 -O2 -Wall
-Wno-unused-parameter, fake-glm + fake-glfw stub, link -pthread -lcurl):
- A (j191-baseline, pre-fix): motor 59 TUs (51 src + 8 libs) + LINK OK;
  tests 29/29 OK == ctest 29/29 del veredicto 148.
- B (j191-fixed, post-fix): motor 59 TUs (el fix NO añade TU de motor) +
  LINK OK; tests 31/31 OK == ctest 31/31 de la nota 191; +2 exactos
  (volume_memo 9/9, volume_guard 15/15). CERO FLIPS.
- WARNINGS A/B (normalización de casa, sin prefijo TU, fuera
  unused-parameter): motor 16 → 16 con NUEVAS=0 y DESAPARECIDAS=0; tests
  3 → 3 con NUEVAS=0 y DESAPARECIDAS=0. Los 2 TUs nuevos del 191 compilan
  SIN warnings. La barrera "warnings baseline sin crecimiento" queda
  CUMPLIDA en barrera Linux. Las 16/3 pre-existentes son de la era
  (familia -Wformat de App.cpp + format-truncation Dias/IrtamCoeff/
  Exporter — misma clase adjudicada, precedente 005/era P4); ninguna
  procede de ficheros del 191.

## 5. Evidencia lateral reproducida de los TU (barrera Linux)

test_volume_memo: naive 475-478 ms vs memo 26 ms = ×18.1-18.3 — la
dominancia ×15-22 del veredicto 192 reproducida de forma independiente;
memo 26 ms a la par del ~70 ms reportado en vivo (vía de construcción
diferente). test_volume_guard: 15/15 con la forma exacta exigida por el
ruling 190(b) — 13 ticks estáticos → 1 solo rebuild, y cada input de la
clave dispara rebuild por enumeración completa.

## 6. Ledger del ciclo 191 (post-cierre de deuda GLM)

CERRADO de lado GLM: pin ffbd1d2, liveness (adenda 1a094b6), registro
186/188 (87aab37), delta + cross-read (veredicto 195), fold + warnings
baseline (ESTE veredicto). PENDIENTE, solo lado MUSE (diferidas, protocolo
del veredicto 192 en pie): (1) N-scaling ∈ {mínimo,14,44} a epoch fijo o
equivalente (scrubs cruzando boundaries / umbral bajado ~100 ms solo-log);
(2) p95/max de watchVolMs; (3) máximo de frame <250 para el cierre formal
del criterio (iii) a 200 ms. Anomalía swap 10,9 s: SIGUE en vigilancia,
193/194 reservados para la 2ª ocurrencia o reproducción (protocolo
forense del 192-seguimiento en pie). Prescripción de transporte RATIFICADA
por este fold: format-patch --output=fichero + encoding declarado — la
capa EOL perdida por el redirect SOLO fue recuperable porque el parche
traía index lines completos como oráculo; sin ellos, la reconstrucción
hubiera quedado en "funcionalmente equivalente" en vez de byte-exacta.

Artefactos: scripts/j191/{fold_chain.sh,reconstruct_191.py,fold_191.sh,
build_ab.sh}, builds scratch-j191-{base,post}-build (warnings_normalized
warn_motor.txt/warn_tests.txt por lado), espejo rama j191-chain con tags
j191-baseline/j191-fixed.
