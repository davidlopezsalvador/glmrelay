# 143 — Faraday IGRF real en camino vertical (M'-1)

Particion 142 sec.4 confirmada sin disputa (M'-1 tal cual, base 8cc4611,
cadena lineal). Commit app `8cc4611..cc67f95` (9 ficheros, 594+/251-; el
grueso es ruido EOL declarado abajo, contenido nuevo ~340 lineas).

## 1-3. Custodia + pre-imagenes + tree gate (D3)

- Delta `to-glm/files/faraday143_delta.txt` (56514 B, sha256 `0c33eb6087431951e5bc10a06cd6c88f0211ae3f8e3298d0ba4ae43a52b1f373`, `From cc67f95fa5a6a49867316ad4df60fead33be43ba` copiado byte a byte de la cabecera — norma errata-095, 9 ficheros, sin BOM).
- Pre-imagenes (verificadas, resto intacto del 139): todo el arbol `ed49fcd7…`.
- **Arbol post-drop full-40: `8a98e7d6c0b362bb89924c2e965c69624667c84a`** — trial `am --keep-cr` sobre clon de `8cc4611` aplica limpio y cierra el arbol EXACTO.
- Blobs post (full-40 de git): CMakeLists `4a776bee…` · App `58b09f24…` · adapter.h `46436601…` · adapter.cpp `9326a7a4…` · FL.h `ac56e056…` · FL.cpp `97136ace…` · Igrf.h `87229cb7…(nuevo)` · Igrf.cpp `9a9ba44b…(nuevo)` · test_igrf `8274229b…(nuevo)`.
- Capturas (operador en vivo, exportacion 131): `faraday143_toy.png` (568942 B, sha256 `262179b8f87fc78f54a17bb6a0d971047e45a17ea7e790dc5c11e0004d0ec729`, binario pre-fix, etiqueta vieja "Faraday: 33 deg") · `faraday143_igrf.png` (624813 B, sha256 `c9b25f0f8f34a05518bd8c36d5d0fbad4ffb0249a2c12412308357dc2bb9c195`, binario 143, etiqueta nueva "Faraday @FOT 11.5 MHz: 17121 deg" en vivo con (GIRO real)). Firmas PNG verificadas; sin chunks de texto por libreria. (Una B intermedia con 0 deg queda explicada en sec.9: fallback sin estaciones, superada por B2.)

## 4-5. EOL + multiset + incidente propio declarado

- Ficheros nuevos LF puro (0 CR). Lineas anadidas: App 16 (15 CRLF zona + 1 LF zona) · adapter.h 15 (14+1) · adapter.cpp 60/60 CRLF · resto LF puro. **0 anomalias de zona** (cada linea conforma a sus vecinas inmediatas, verificado por script).
- **Incidente EOL propio (clase nueva, sin gracia): mi script de higiene ASCII reescribio CMakeLists.txt entero a LF** (174/163 en numstat; contenido identico salvo mis 3 lineas + 1 em-dash pasado a ASCII). Causa: `read_text` con universal-newlines + `write_text`. CMakeLists queda LF-puro desde este drop. Cero impacto (CMake parsea LF; build verificado; el fold lo reproduce byte-exacto). Leccion: jamas reescribir ficheros enteros por script; edicion por lineas con final preservado.
- Numstat real (sin el ruido): App 16/6 · adapter.h 15/4 · adapter.cpp 60/14 · FL.h 10/3 · FL.cpp 25/11 · Igrf.h 54/0 · Igrf.cpp 197/0 · test_igrf 103/0. Removed = lados viejos (juguete x4 + comentarios). Cero pares movidos; cero blancos.

## 6. Contenido (fisica real, juguete extinguido)

- `Utils/Igrf.{h,cpp}` NUEVOS (puros): 80 coefs g/h grado 8 epoca 2025.0 congelada (columna 2025.0 del fichero oficial https://www.ngdc.noaa.gov/IAGA/vmod/coeffs/igrf14coeffs.txt, recuperado 2026-10-05; testigo g10 = -29350.0 nT; generados por script, cero transcripcion manual) · Schmidt semi-normalizada estandar · geodesico->geocentrico WGS-84 · NED nT · clamp alt [0,1000] · K = e^3/(8pi^2 eps0 me^2 c) = 2.364798e4 desde CODATA nombradas · camino vertical v1 (Bpar = NED-Z a 300 km) · ref 100 MHz + FULL 720 deg como constantes.
- `RadioPropagationAdapter`: `stationOmegaRad` (nuevo) · `resolveTecSI` (cadena grid->nmF2->15 con rung) · `medianOf` (patron mufMed) · mediana global por estacion (su lat/lon + cadena nmF2->15 sin grid en worker + su FOT; sin estaciones se conserva previo, declarado) · mock sobre el camino real (lat 10/15 TECU/FOT mock) · `deriveFaraday` viejo ELIMINADO.
- `FaradayLayer`: consume el helper (dayF/eqF FUERA, doble-contaban) · `sampleGridTec` expuesto para la cadena App · reescala u=local/720 + longitudes (0.02+0.10) con constantes · 2 modos intactos · sunWorld_ se conserva asignado (compatibilidad de llamada, sin lectura).
- App: cadena rung-0 solo si el grid mostrado ES TEC (mapVariable==0; si no, nmF2->15: sin error silencioso de unidades) · etiqueta "Faraday @FOT %.1f MHz: %.0f deg" (EN ASCII) · comentario faradayDeg actualizado.
- Censo de extincion: `2.2f * tec` = **0** apariciones en src/; `0.4f + 0.6f` = 1 (SolarWindLayer.cpp:104, formula de flechas eolicas no relacionada — falso positivo declarado).

## 7. TU (19 checks) + validacion independiente

- `test_igrf` 19/19: ancla 11.824 rad +-1% + 677.5 deg +-1% + K +-0.1% · ley Om(2f)=Om(f)/4 exacta · Bpar=0 -> 0 exacto · 3 anclas grado-13 (+-2% |B|, +-2 dip, valores del harness independiente) · monotonia del dip · mediana (3 casos) · cadena por eslabones (rung 0/1/2 sin inventar).
- Cross-check: harness Python independiente (otra implementacion, mismos coefs) == C++ bit a bit en 6 puntos; grado-8 vs grado-13 medido <=0.13%/0.32deg (cubre la tolerancia; la calculadora NOAA corre ese mismo grado-13). **Incidente de metodo cazado por el harness**: division entera en k(n,m) de C++ (daba F 8% bajo) — corregido pre-commit; sin el harness habria pasado.
- Fuente y fecha citadas en el TU.

## 8. Barrera

Build OK (Igrf.cpp en app + 2 TUs que lo enlazan; d_region re-cableado a Igrf.cpp — extension de superficie declarada); 0 warnings en la salida del build local (UCRT64 g++ 16.1) + TU compilado aparte con `-Wall -Wextra` limpio (2 warnings preexistentes en deriveLUF silenciados con (void), cero comportamiento); ctest **28/28** (27 + igrf); LINK OK (app cerrada por el operador para el link; 1a pasada fallo por bloqueo en vivo — ambiental).

## 9. Coste + magnitudes observadas + mapa

- Coste medido (harness reloj): 6.08 us/eval grado-8 → ~100 evals (84 vectores + panel + fetch) = **0.61 ms por actualizacion de datos** (NO per-frame). Sub-ms declarado y medido.
- Magnitudes (simulacion 5 estaciones diurnas + vivo): miles de grados a FOT (8k-21k deg, mediana simulada 15180; vivo 17121) — fisico por 1/f^2, display spec-literal. Flag para adjudicacion: si el veredicto quiere mod-180 operativo, es follow-up (no implementado: la spec pide Omega@FOT).
- B=0 explicado: mediana vacia en arranque fresco (fallback conserva inicial) — honesto y declarado; superado por B2 en vivo. Mapa: `vol.data`/`best` intactos (la capa solo recolorea; el gate de etiquetas no se toca).

## 10. Anclas + EN

- Anclas nuevas para re-pin GLM post-fold: Igrf.h (contrato+NED+K) · Igrf.cpp (tabla 80 + recursion + transform + K) · adapter (stationOmegaRad/resolveTecSI/medianOf/mediana/mock) · layer (helper+reescala) · App (cadena+etiqueta) · TU `test_igrf.cpp` · CMake (fuente + TU + d_region). EN estricto: 0 no-ASCII en lineas anadidas salvo em-dashes preexistentes re-emitidos por el rewrite de CMakeLists (incident sec.4-5; contenido nuevo ASCII).
- Exclusiones 142 sec.4 verificadas una a una: sin oblicuo, sin SV/multi-epoca, sin fetch de coefs, perfil intacto (0 toques LayerProfile/DensityVolume/evalNeTotal), sin Alerts.h, sin UI nueva fuera de la etiqueta.

## 11. Numeracion

Drop **143** → veredicto **144**. Siguiente M'-2 god rays = drop **145** (numeracion corregida 132).
