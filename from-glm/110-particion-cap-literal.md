# 110 — Partición: acople del literal 432 a kCapFrames (respuesta a 109)

Ruling-primero. Censo de la apertura ratificado por medición independiente (61/61); 1 errata de censo de la apertura declarada (E1, no bloqueante). Cero código escrito por GLM.

## §0 Custodia

- Relay `dcf5970..9f9fcf7` (fetch limpio, lineal): nota 109 en `to-glm/109-apertura-cap-literal.md` — 27 líneas / 1555 B / LF-100% / sin BOM / +27/−0 solo la nota / sin PNG / autor David.
- Base declarada == certificada: App master `8268fcb6973140c771a3779693fe4bb1e18aa644` (full-40 == registros 107/108) · árbol `07a860b238eba6e6093c72fc9f31f1ff3721b9b3` == espejo drop105-fold @ `6fb3372` medido.
- Blobs base 4/4 contra el espejo: App.cpp `4d7f4e5f…3582` (pre-imagen del drop) · TCH `b8ef57e6…` · TCC `9125570…` · TST `2b609940…`.
- Verificación mecánica: `scripts/particion110_verify.py` **61/61 OK** — censo repo-completo bytes-fiel, EOL medidos de los dos sitios y sus zonas, tipos/conversión, anclas con los needles del 108. Incidentes propios en §4.

## §1 Censo ratificado (medición independiente, bytes-fiel, repo completo)

El censo de src/ da **9 hits** medidos; la apertura enumeró 8 y omitió `TecCache.h:27` (errata E1, §4). La afirmación central queda medida y CONFIRMADA: **solo `:3040` y `:2959` acoplan el cap** — el escaneo de comparaciones contra literales 4xx en código (App/TCC/TCH, sin comentarios) da exactamente esas dos y ninguna más.

- **Acoplan (2)**:
  - `App.cpp:3040` `while (impl->tecHist.size() > 432) {` — pushHistoryFrame, la única vía de admisión (live `:2834` + preload `:1374`). **LF medido**; `:3040` es línea-frontera de EOL: `:3039` y arriba CRLF, `:3041` y abajo LF.
  - `App.cpp:2959` `while (impl->tecHist.size() > 432) impl->tecHist.erase(impl->tecHist.begin());   // TEC-ext 034: cap 432 = 72 h @ 10 min` — gemelo one-liner en restoreTecCache, defensivo sobre el scan de loadCached (datos ya podados en disco). **CRLF medido**; zona `:2950-2964` toda CRLF.
- **Documentales (5)**: `App.cpp:3044` «cap 432 = 72 h @ 10 min» (LF) · `App.h:32` «anillo ordenado, dedup, cap 432 + write-through M10» · `IrtamState.h:9` «tecHist cap 432, tecCacheMaxAgeH 72.0» · `TecCache.h:25` (comentario de la propia definición) · `TecCache.h:27` «72 h — 432 x 10 min (sondeo Q-TEC-1, 0D632DA2)» ← omitido por la apertura (E1).
- **UI (1)**: `App.cpp:4860` tooltip «…up to 432…» — texto al usuario, fuera de alcance del ciclo.
- **No relacionado (1)**: `src/Utils/SunDiskMath.h:107` `kCarlonPreferAgeS = 43200.0` (12 h) — substring, no cap.
- **Definición canónica (1)**: `TecCache.h:25` `inline constexpr int kCapFrames = 432;  // mismo cap que tecHist (TEC-ext 034)`.

**La asimetría que justifica el acople, medida**: `TecCache.cpp:138` — la poda de disco de loadCached YA obedece `size_t keep = items.size() > (size_t)kCapFrames ? items.size() - kCapFrames : 0;`. El disco está acoplado a la constante; el anillo RAM no. Una mutación futura de kCapFrames dejaría disco y RAM divergiendo en silencio — exactamente el «mienten en silencio» de la apertura, con la variante de que una de las dos caras ya dice la verdad.

**kCapFrames pre-drop, repo == 4 refs**: TCH:25 (def) · `App.cpp:1357` `(std::size_t)teccache::kCapFrames` (missingInWindow del preload) · `App.cpp:1366` (fitsInRing, wiring 107) · TCC:138 (poda de disco). Las tres call-sites usan cast explícito.

**Fuera de src/ (23 hits, cero producción)**: tests/ y libs/ — TU del tec (9 hits: dato `const std::size_t C = 432` + 4 datos de missingInWindow + expectativas de retención «432 kept»/«quedan 432» + etiqueta M10a), `4320 min` (= 72 h en minutos, badges irtam), `43200` (12 h), substring `4321` en comentario de imgui, fixture kc2g. Los 9 del TU **pinnan el valor de producción a propósito**: si kCapFrames cambia, el TU falla ruidosamente — esa es su función de tripwire. No se tocan.

## §2 Respuesta a las tres preguntas + implementación adjudicada

**Q1 — Scope: los DOS sitios (`:3040` Y el gemelo `:2959`).** El gemelo no es un primo lejano: es el MISMO invariante (anillo RAM ≤ cap) aplicado en la otra vía de reconstrucción (restauración desde disco). Acoplar solo `:3040` deja el defecto a medias: una mutación futura de kCapFrames movería el anillo hot-path al cap nuevo y dejaría el restaurado en 432 — divergencia silenciosa en el peor sitio posible, el arranque. El coste marginal es una línea más con la misma transformación; el riesgo marginal es cero (RAM-only; el 104 ya caracterizó el gemelo como benigno). Higiene a medias es defecto a medias.

**Q2 — Comentarios: quedan todos, incluidos el inline de `:2959` y el de `:3044`.** Hoy son ciertos (el cap ES 432) y son documentales del valor, no del mecanismo. Tocarlos expandiría el delta a App.h e IrtamState.h — dos ficheros más por cero beneficio de comportamiento y más superficie EOL. **Norma forward adjunta a este ciclo**: toda futura mutación de `kCapFrames` debe, EN EL MISMO DROP, (i) refrescar los comentarios documentales (App.h:32 · App.cpp:3044 · inline de :2959 · IrtamState.h:9 · TecCache.h:27), (ii) revisar el tooltip `:4860`, (iii) actualizar las expectativas TU (fallarán ruidosamente — su función), y (iv) re-visitar la aritmética acoplada: 432 × 600 s == `kHistWindowSec` 259200.0 — cap y ventana codifican el MISMO intervalo de 72 h @ 10 min; mover uno sin el otro es un bug latente.

**Q3 — Checklist: el específico de §3, NO el reducido «build + ctest».** «Sin TU» es correcto en el sentido de sin TU NUEVO (nada que unit-testear en un swap de constante de igual valor), pero la barrera se corre COMPLETA (patrón 090) porque este cambio promete CERO colateral — headers intactos, Δ=0 líneas netas — y la barrera es la falsación mecánica más barata de esa promesa: TU2/TU32 == base, misleading :4396 sin desplazamiento, firmas de warnings VACÍO.

**Implementación adjudicada (propiedades del diff):**

- a) **Forma exacta del token**: `432` → `(std::size_t)teccache::kCapFrames` en los dos while. El cast explícito es el idioma MEDIDO de este repo para esta constante — 3/3 call-sites existentes lo usan (`:1357` y `:1366` con `std::size_t`; TCC:138 con `size_t` dentro del namespace). La conversión explícita hace exactamente lo que hacía la implícita del literal (usual arithmetic conversions, int→size_t, mismo valor) y elimina por construcción la familia -Wsign-*. La propuesta de la apertura citaba la forma sin cast; se eleva al idioma del repo. Líneas adjudicadas (solo el token intercambiado; indentación, comentario y EOL intactos):
  - `:3040` → `while (impl->tecHist.size() > (std::size_t)teccache::kCapFrames) {`
  - `:2959` → `while (impl->tecHist.size() > (std::size_t)teccache::kCapFrames) impl->tecHist.erase(impl->tecHist.begin());   // TEC-ext 034: cap 432 = 72 h @ 10 min` (:2959 queda a ~153 columnas — dentro del estilo existente, p. ej. :4860)
- b) **TecCache.h queda INTACTO byte-identico** (kCapFrames no se redefine: mismo nombre, tipo `int`, valor 432, línea :25). El delta es App.cpp y SOLO App.cpp.
- c) **Cero cambio de comportamiento por construcción**: `constexpr int == 432` hoy; ningún observable de runtime distingue pre de post. La falsabilidad del ciclo es build limpio + TU + barrera (§3.10), no evidencia runtime.
- d) **Cero warning nuevo**: diff de firmas VACÍO contra baseline 15/13 (scratch-108-build). El cast hace la conversión visible para el compilador y para el lector.
- e) **Sin comentarios ni UI tocados** (Q2): `:3044` · inline de `:2959` · `App.h:32` · `IrtamState.h:9` · `:4860` quedan texto-identicos.
- f) **Sin TU ni CMakeLists tocados**: los 9 hits «432» del TU son datos/expectativas/etiquetas que pinnan el valor de producción (tripwire deliberado, §1).

## §3 Checklist del drop 111 (patrón 102/106 adaptado, 12 puntos)

1. **Custodia**: nota 111 + delta en `to-glm/files/` · From `8268fcb6…aa644` full-40 pegado de git · nota==delta byte a byte · **post-blobs git full-40 pegado de git** (norma 104 endurecida; recordatorio 108: prefijos sha256-16 pueden acompañar, no sustituir) · sin PNG.
2. **Pre-imagen**: App.cpp == `4d7f4e5fe20c75fa93b0aa45eb18dd6670723582` (medido por GLM en el espejo) · delta EXACTAMENTE 1 fichero (App.cpp; ni TecCache.h, ni tests, ni App.h, ni IrtamState.h, ni CMakeLists).
3. **Tree gate D3**: rama propia `drop111-fold` desde `6fb3372` — se restaura la convención por-número-de-drop (drop099-fold / drop103-fold; el drop105-fold del 106 fue anomalía histórica declarada) · guardas de pre-imagen 1/1 · `am --keep-cr` limpio · árbol post-drop full-40 anunciado en la nota.
4. **Diff exacto**: EXACTAMENTE 2 líneas modificadas (2+/2−) · cero desplazamiento neto (App.cpp 5160 líneas pre == post) · las dos líneas == los dos sitios de §2a con SOLO el token intercambiado · todo lo demás byte-identico.
5. **EOL**: `:3040` removida y añadida ambas LF · `:2959` removida y añadida ambas CRLF (el delta transporta el `\r` en ambas) · CR neto App 1867 → 1867 (Δ=0) · CR del delta con aritmética cerrada (predicción con contexto-3: 1 removida + 1 añadida + 9 de contexto = 11).
6. **Multiset**: App.cpp −2/+2 · intersección neta vacía · cero movidos · blancos 0.
7. **Propiedades a)–f) de §2 como propiedades del diff**, medidas una a una por el veredicto.
8. **Censos post-drop**: «432» en src/ == **8 hits** exactos (`:2959` QUEDA como hit documental — su comentario inline conserva «cap 432»; `:3040` desaparece; `:3044` · `:4860` · App.h:32 · IrtamState.h:9 · TCH:25 · TCH:27 · SunDiskMath.h:107) · comparaciones 432 en código (sin comentarios, App/TCC/TCH) == **0** · kCapFrames en App.cpp == **4 refs** (`:1357` · `:1366` · `:3040` · `:2959`), repo == 6 (con TCH:25 + TCC:138).
9. **TU/ctest**: tests/test_tec_cache.cpp INTACTO byte-identico (blob `2b609940…`) · CMakeLists intacto · ctest 21/21 recompilado de fuente · tec_cache 475 OK/0 FAIL con conteos idénticos, resto de conteos 067 sin flips.
10. **Barrera COMPLETA patrón 090** (57/57): TU2/TU32 de cero con predicción **== base** (TecCache.h intacto → cero codegen colateral; cualquier delta = investigación antes de firmar el veredicto) · warnings 15/13 diff firmas VACÍO — el riesgo técnico del ciclo vive aquí y el cast lo cierra por construcción · misleading **:4396 sin desplazamiento** (+0; cadena de frescura 099→104→108→112) · glad + LINK OK · exe no ejecutado (067).
11. **Anclas TODAS inmóviles por construcción** (Δ=0): printf `:1377` (CRLF) · push preload `:1374` · vía live `:2834` · loadCached `:2946` · dedup `:3021` · cadena save-first `:3035<:3039<:3040<:3043` (con `:3040` y `:2959` transformadas EN SU SITIO) · kCapFrames TCH:25 · conteo App.cpp 5160 idéntico.
12. **Evidencia runtime NO exigida** (swap compile-time neutro en valor: ninguna observación de runtime distingue pre/post; la falsabilidad es §3.10; smoke voluntario aceptado sin valor probatorio) · **numeración**: drop 111, veredicto 112.

## §4 Erratas e incidentes de método

- **E1 (apertura 109, errata de censo, no bloqueante)**: la enumeración del «resto» omite `TecCache.h:27` («// 72 h — 432 x 10 min (sondeo Q-TEC-1, 0D632DA2)»). Clase documental, no acopla nada: la afirmación central —solo `:3040` y `:2959` acoplan— SIGUE EN PIE (medida por escaneo independiente de comparaciones 4xx en código). Se registra por la norma de censos-medidos (lección 100/104, que vale para los dos lados del relay).
- **Incidentes propios (4, todos falsos FAIL corregidos en verde 61/61)**: (1) needle de TCH:25 sobre-estricto (igualdad `strip()` exacta) que ignoraba que el comentario «mismo cap que tecHist» vive en la MISMA línea :25 que la definición; (2) ruta de SunDiskMath.h asumida de memoria (`src/Data/`) — real `src/Utils/` (la apertura no declaraba directorio; el error fue mío; lección recurrente: las rutas se miden); (3) expectativa «kCapFrames en App == 1 ref» transcrita de memoria, conflando el censo fitsInRing del 108 («1 call-site») con las refs de la constante — real 2 (`:1357` missingInWindow + `:1366` fitsInRing); (4) constante de conteo «App.cpp == 4709» adivinada y asertada antes de medir — eliminada y sustituida por pin medido (5160). Misma lección de 102/108: se deriva, no se recuerda. Ninguno tocó la adjudicación.

## §5 Luz verde

**LUZ VERDE a drop 111** con el §2 como contrato y el §3 como checklist. Fold `drop111-fold` desde `6fb3372` con guardas de pre-imagen. Drop 111 → veredicto 112. Ejecutar.
