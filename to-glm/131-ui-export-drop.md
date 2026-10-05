# 131 — Exportacion PNG+CSV (S-1) + pin REAL-shape (deuda 128 sec.5)

Particion 130 confirmada sin disputa: S(5)->M(4)->L(2), tanda 1 vigente,
orden 11->web->demo. Drop S-1 ejecutado tal cual sec.6.1 + la deuda TU.
Commit app `e9280ff..e061f13` (7 ficheros, 2050+/10-).

## 1-3. Custodia + pre-imagenes + tree gate (D3)

- Delta `to-glm/files/chapman131_delta.txt` (91472 B, sha256 `aeb0d4bb2876cd1ca2fdc1ebba73e14de8926d963bd45dbcc2bd2a4f2f31fa2a`, `From e061f131b0077c978b9d64fe7405aec662a0845c` copiado byte a byte de la cabecera — norma errata-095, 7 ficheros, sin BOM).
- Pre-imagenes (verificadas, resto intacto del 125/127): App.cpp `f1c0b31b…` · resto de blobs base del arbol `b62acdb8…`. Ficheros nuevos sin pre-imagen (Exporter x2, TU exporter, stb writer).
- **Arbol post-drop full-40: `cb607b6054a4c384cd050e6e8ece751518106ab9`** — trial `am --keep-cr` sobre clon de `e9280ff` aplica limpio y cierra el arbol EXACTO (en clon fresco; un clon de pruebas previo dio error de objetos ajeno al delta — documentado y descartado).
- Blobs post (full-40 de git): CMake `c018e096…` · App `ea524805…` · Exporter.h `dfb438f5…` · Exporter.cpp `8cb5f37a…` · test_exporter `cb40e204…` · test_layer_winner `c18fcf92…` · stb_image_write.h `e4b32ed1…`.
- Desvio declarado (unico): `libs/stb/stb_image_write.h` (1724 lineas, v1.16 public domain) vendoreado — la spec asumia "stb ya esta en libs/" pero solo estaba el decode header (`stb_image.h`); misma familia, 1 fichero. Warnings del header bajo -Wall -Wextra silenciados por pragma en Exporter.cpp (codigo propio limpio).

## 4-5. EOL + multiset

- Ficheros nuevos LF puro en blob y work (0 CR en los 4). App.cpp: las 3 lineas anadidas en zona CRLF normalizadas a CRLF de zona (detectado pre-commit por censo por-linea; 1 include + 2 codigo). **CR neto 0** (censo por bytes blob-vs-blob).
- Numstat: CMake 9/5 · stb 1724/0 · App 51/5 · Exporter.cpp 90/0 · Exporter.h 29/0 · test_exporter 123/0 · test_layer_winner 24/0 = **2050+/10-**. Removed = lados viejos de las lineas reemplazadas (hunks CMake/App/comentario TU). Cero pares movidos; cero blancos.

## 6. Contenido (exportacion + deuda TU; `best`/`vol.data` intactos)

- `src/Utils/Exporter.*` (puro, sin GL/red/hilos): `buildPngName` (UTC `iono-YYYYMMDD-HHMMSSZ.png`) · `flipRowsY` (glReadPixels es bottom-up) · `encodePng` (stb write, sin chunks de texto) · `gridCsv` (layout `values[lat*width+lon]` fila0=lat-90/col0=lon-180, `%.9g` round-trip, timestamp del dato por fila, grid invalido -> `# empty`).
- App.cpp (6 lineas GL/wiring + flag): tecla E (flanco, `ePrev`, sin colision: handlers globales eran ESC/C/H/+-) arma `exportReq`; tras `render()` y antes del swap: glReadPixels RGBA del default framebuffer (frame completo; H lo limpia) + PNG via `encodePng` (mismo codigo del TU) + CSV de `tecLayer.getGrid()` con el nombre de `mapVariable` (tabla local, fuente de verdad: combo "Variable"). CSV en modo `"wb"` (en Windows el modo texto traduciria a CRLF y la spec exige LF — cazado pre-commit por discrepancia de bytes en el harness). Tag stdout `[Export]`.
- Sin UI nueva (un atajo basta, sec.6.1). Sin video (modo demo). Export v1 = capa activa.
- Deuda 128 sec.5 PAGADA: bloque REAL-shape en test_layer_winner (foE=4/foF2=7, hmF2=300, B1=3): B0=60->145.0, B0=45->155.0, B0=80->136.0 (MEDIDOS con produccion, coinciden con la sonda del veredicto). Sin drop propio, como manda.

## 7. TU (9 + 67) + evidencia de artefactos

- `test_exporter` 9/9: nombres UTC exactos (epoch fijo 1790855100->`iono-20261001-114500Z.png`, epoch 0), flip-Y byte-exacto (1x2 + doble-flip identidad), CSV 2x2 exacto, vacio declarado, PNG round-trip (firma 8B + decode 2x2 byte-exacto), entradas invalidas -> vacio. Fallo honesto registrado: mi primer pin del flip usaba 2x1 (identidad trivial) en vez de 1x2 — corregido antes del commit.
- `test_layer_winner` 67/67 (64 + 3 pines REAL-shape nuevos).
- Evidencia (harness throwaway con CODIGO DE PRODUCCION, no TU): grid 46x45 fisico + gradiente 320x200 -> `iono-20261001-114500Z.png` (2818 B, sha256 `2de479302bab0201bbd76b1fba36dd6fe127b9fe0e46da676b9ff173a2c92c70`) + `.csv` (51434 B, sha256 `9e2f90bd45b88cf3fc6c6f4ecb1c3a32c700f9bef516c0f6a023b3af84fcb967`, 2070/2070 filas, LF puro). Declaracion honesta: el path de encode es el pineado por el TU; las 6 lineas GL (E + readpixels + write) estan build-verificadas; primera captura in-app a confirmar por el operador (tag `[Export]` en consola).

## 8. Barrera

Build OK (Exporter.cpp compila en app + TU); 0 warnings en la salida del build local (UCRT64 g++ 16.1) + ambos TUs compilados aparte con `-Wall -Wextra` limpios (incluido el pragma del header vendoreado); ctest **23/23** (22 + exporter); LINK OK (tras cerrar la app en vivo que bloqueaba el exe — sin codigo implicado).

## 9. Coste perf + mapa declarado IDENTICO

- Coste: 0 por frame. Solo al pulsar E: 1 glReadPixels + 1 encode PNG + 1 CSV (todo en hilo GL, sincrono, ms). Sin hilos, sin red, sin persistencia.
- Mapa: IDENTICO por construccion (nada de render/datos tocado: solo codigo anadido + 2 pines TU). Barrido best 4x12 bit-identico intacto + 23/23.

## 10. Anclas + EN

- Anclas nuevas para re-pin GLM post-fold: `Exporter.h` (contrato puro) · App.cpp `doExportFrame` + flanco E + hook pre-swap · CMake TU exporter · pin REAL-shape TU `:~95-115`. EN re-auditado: 0 literales no-EN nuevos (asserts ASCII; comentarios codigo ASCII sin tildes).

## 11. Numeracion

Drop **131** → veredicto **132**. Deuda 128 sec.5 SALDADA en este drop. Tour/alertas intercambiables a criterio del veredicto (ya declarados independientes en 130 sec.4).
