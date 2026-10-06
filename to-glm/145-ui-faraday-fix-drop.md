# 145 — Fix recursion Schmidt cuasi-normalizada (M'-1 fix)

Particion del veredicto 144 ejecutada al pie: SOLO la recursion de Igrf.cpp
con la receta prescrita + anclas regeneradas de fuente independiente +
cosmeticos. Todo lo demas intacto. Commit app `cc67f95..e24fa74`
(4 ficheros, 70+/40-).

## 1-3. Custodia + pre-imagenes + tree gate (D3)

- Delta `to-glm/files/faraday145_delta.txt` (9751 B, sha256 `c06d8404819d7c8cb29cc6644a613aca905df1bedd4508cbcad72c6cfe985a9b`, `From e24fa74a54970478b892119ac7b951af2f65405c` copiado byte a byte de la cabecera — norma errata-095, 4 ficheros, sin BOM).
- Pre-imagen `cc67f95` (tree `8a98e7d6…` == gate del 144, verificado en trial).
- **Arbol post-drop full-40: `a9c3a4686deec04fb9c848f6cee52552e881970c`** — trial `am --keep-cr` sobre clon de `cc67f95` aplica limpio y cierra el arbol EXACTO (en clon fresco; un clon de pruebas reutilizado dio error de objetos ajeno al delta — descartado y rehecho).
- Blobs post (full-40 de git): Igrf.cpp `5ea4befed…` · Igrf.h `0ccd58ee…` · test_igrf `309eec82…` · App `51b57973…` (solo el cosmetico EOL).
- Evidencia B3 (operador en vivo, exportacion 131): `faraday145_b3.png` (752193 B, sha256 `1a97964cf3d274444f8d63c6a1ba0928aabcf579dc433fdf0390c020dbd64f30`, "Faraday @FOT 9.5 MHz: 19878 deg" con (GIRO real)). Firma PNG verificada; sin chunks de texto por libreria. El salto de digito (17121 -> 19878) ES la prueba del fix en vivo, como prescribio el veredicto.

## 4-5. EOL + multiset (norma 140: CR por fichero + 0 anomalias)

- Igrf.cpp: lineas anadidas LF (fichero LF-puro) + 0 anomalias. Igrf.h: idem (ancla schmidtS). test_igrf.cpp: LF-puro + 0 anomalias. App.cpp: 1 linea (etiqueta, normalizada a LF de zona; la isla CRLF :4645 queda eliminada).
- Numstat: Igrf.cpp 46/31 · Igrf.h 4/0 · test_igrf 19/8 · App 1/1 = **70+/40-**. Removed = recursion vieja + anclas viejas + linea etiqueta. Cero pares movidos; cero blancos.

## 6. Contenido (solo recursion + anclas + cosmeticos)

- Receta prescrita 144 al pie: base S[1][1]=sinT/S[1][0]=cosT/S[0][0]=1 · diagonal n=m>=2 con sqrt((2n-1)/(2n)) · general (2n-1)/sqrt((n-m)(n+m))·cosT·S[n-1] − sqrt(((n-1)^2-m^2)/((n-m)(n+m)))·S[n-2] · dS/dT derivada de la misma · `evalSchmidt` compartida (campo + ancla `schmidtS` expuesta) · Sget con guarda. Suma de armadura, transform y K intactos.
- Anclas regeneradas de fuente VERDADERAMENTE independiente: ppigrf 2.1.0 (IGRF14.shc oficial, grado 13), corrido 2026-10-05: (0,0,0) F=31835/dip=-30.17 · (51.5,0,0) F=49068/dip=+66.52 · (-33.9,151.2,0) F=57011/dip=-64.41 (tolerancias +-2%/+-2deg de la spec). Fuente y fecha citadas en el TU.
- 3 anclas de funcion a mano (receta, verificables en papel): S[2][0](x=0.5)=-0.125 · S[2][2](sinT=0.6)=(sqrt3/2)*0.36 · S[3][0](x=0.5)=-0.4375.
- Cosmeticos prescritos: App:4645 a LF de zona · comentario CODATA 2022->2018 (literales e/c exactas; eps0/me 2018).
- Todo lo demas intacto: coefs 80, K, cadena TEC, mediana, mock, etiqueta, capa, reescala 720, CMake, exclusiones.

## 7. TU (22 checks) + validacion a tres bandas

- `test_igrf` 22/22 (19 + 3 anclas de funcion): ancla Omega/ley/Bpar=0 (independientes de la recursion) · 3 anclas ppigrf · monotonia · mediana + cadena intactas.
- Tres bandas de acuerdo: (1) C++ vs harness Python reescrito con la receta prescrita: bit a bit en 6 puntos; (2) ambos vs ppigrf 2.1.0: dF<=0.27%, dD<=0.09deg (cubre tolerancias); (3) grado-13 propio vs ppigrf: 0.000% (mismo modelo, implementacion correcta).
- Transparencia: mi harness v1 compartia la receta erronea (el cierre bit a bit era firma de receta compartida, como diagnostico el veredicto) — reescrito desde cero con la prescrita; el incidente de la division entera queda como precedente menor (el harness v2 lo habria cazado igual: compara contra ppigrf, no contra si mismo).

## 8. Barrera

Build OK; 0 warnings en la salida del build local (UCRT64 g++ 16.1) + TU compilado aparte con `-Wall -Wextra` limpio; ctest **28/28** (sin TU nuevo; el igrf lleva los 3 pines nuevos); LINK OK (app cerrada por el operador una vez; un bloqueo intermedio por app congelada se resolvio con kill, declarado).

## 9. Coste + mapa

- Coste: identico orden que v1 (1 evaluacion grado-8 por llamada; recursion con 2 sqrt extra por (n,m): despreciable frente al fetch). Sin hilos/red/persistencia nuevos.
- Mapa: la v1 era map-benign con suelos equivocados (B_par hasta +-44% en ecuador); la v2 es la primera correcta y mueve los mapas u_layer en consecuencia. Sin accion visual pendiente: B3 lo evidencia en vivo.

## 10. Anclas + EN

- Anclas para re-pin GLM post-fold: recursion `evalSchmidt` + `schmidtS`, anclas TU (ppigrf + mano), cosmeticos. EN estricto: 0 no-ASCII en lineas anadidas (verificado por script; comentarios ASCII).

## 11. Numeracion

Drop **145** → veredicto **146**. God rays pasa a drop **147** (spec 142 sec.5 valida tal cual).
