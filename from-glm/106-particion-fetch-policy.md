# 106 — Partición: fetch-policy de gaps (respuesta a apertura 105)

Ciclo «fetch-policy de gaps» (backlog 104): apertura 105 → **esta partición 106** →
drop 107 → veredicto 108. Estructura del ciclo hereda el patrón 101→104.

## 0. Custodia de la apertura (verificado por script, 44/44)

- Relay fetcheado `c205045..ad68e97` fast-forward limpio (paramiko venv, norma 104).
  Apertura 105 = `to-glm/105-apertura-fetch-policy.md` (+34/−0, append-only),
  firma David Lopez Salvador. Buzón correcto (regla 094 §0).
- **Pre-imágenes 4/4 byte-exactas** contra espejo drop103-fold @ `7b65521`
  (árbol `a8afa6f8`): App `324d1de5…` · TecCache.h `a4268505…` · TecCache.cpp
  `797a0ad2…` · test `e7413f4a…` — **primera nota con cero erratas de hash**
  (norma endurecida del 104 CUMPLIDA; la norma funciona: se pega de git, no se
  transcribe). Sin erratas de anclas tampoco: `:1359-1365`, `:2823`, `:1356`,
  `:1366` todas medidas exactas. Esta partición no exige corrección previa.

## 1. Hallazgo RATIFICADO (mecanismo probado por código + evidencia live 103)

El desperdicio es real y estructural, no circunstancial:

- `missingInWindow` (TecCache.cpp:160) decide contra **disco** (cachedEpochs) y
  **ventana** (72 h), con trim a `cap` **por cuenta** (`if (out.size() > cap)
  out.erase(begin, end-cap)`) — no conoce el oldest del **anillo** RAM y no puede
  conocerlo por frontera de módulo (teccache sin tecHist en código, solo el
  comentario documental de TecCache.h:25). Firma verificada: 4 params
  (disco+índice+ventana+cap), sin estado de anillo.
- Con disco saturado (432 más nuevos, el estado estable post-103), los
  missing-in-window son TODOS más viejos que el oldest del anillo → cada uno
  pasa: dedup `:3010` (240 s) no lo atrapa → `save :3024` escribe → insert
  ordenado `:3027-3028` lo aterriza en `begin()` (es el más viejo) → pop `:3029`
  (433 > 432) lo expulsa **a él mismo** → `delete :3032` borra lo recién
  escrito. Coste por frame: fetch de red + write + delete, cobertura neta cero.
- El trim-a-cap de missingInWindow **no** previene esto: limita el número de
  fetches (≤432) pero no su inutilidad. En estado saturado el preload es 100 %
  desperdicio — el caso 27-gaps del ciclo 103 (epochs 1790812500–1790828100,
  rango 15.600 s = 27 × 600 s, evidencia live ratificada en 104) es el estado
  estable, no un accidente.
- **Scope exhaustivo verificado por censo**: `fetchFrame` y `missingInWindow`
  tienen UN solo call-site cada uno (App:1362/:1356, el loop de preload);
  `missingSince` sin call-site en App (solo TU); cero gemelos en adapters.
  «Wiring solo en preload» es completo por construcción, no por recorte.
- Vía live `:2823` intacta por construcción: consume bundles (no fetchea) y sus
  frames son siempre newest → siempre caben. Ratificado.

## 2. Propuesta APROBADA — fit-check pre-fetch (la «simetría de captación» de P1)

El predicado puro `teccache::fitsInRing(ringSize, cap, oldestEpoch, epoch) ->
bool` con semántica `ringSize < cap || epoch > oldestEpoch` queda APROBADO con
la siguiente adjudicación de implementación:

**a) Predicado PURO en teccache** (Q1): declaración en TecCache.h junto a
missingInWindow (sus dos caras: missingInWindow decide QUÉ pedir, fitsInRing
decide SI pedir vale la pena), implementación en TecCache.cpp. Sin I/O, sin
estado, `cap` por PARÁMETRO (simétrico con la firma de missingInWindow;
`kCapFrames` se pasa en el call-site — nada de 432 hardcodeado dentro).
Tipos: `(std::size_t, std::size_t, double, double) -> bool`.

**b) Semántica de bordes FIJADA** (TU del predicado, los 4 de la apertura + 2
que añade esta partición):
   1. hueco `ringSize < cap` → true, INCLUSO con `epoch < oldest` (backfill
      útil: extiende cobertura atrás sin disparar pop);
   2. lleno + `epoch > oldest` → true (insert legítimo: desplaza el oldest,
      trade de borde por dato más nuevo — semántica vigente del anillo);
   3. lleno + `epoch == oldest` → false (igual-a-oldest: ese epoch YA está en
      el anillo por definición; el dedup de 240 s descartaría el fetch igual);
   4. lleno + `epoch < oldest` → false (el caso del hallazgo: desperdicio
      probado en vivo);
   5. vacío `ringSize == 0` → true por corto-circuito del primer término
      (el caller pasa `oldestEpoch = 0.0`; el predicado no desreferencia nada);
   6. frontera de responsabilidad: fuera-de-ventana NO es asunto del predicado
      (missingInWindow ya filtra `:182` del .cpp) — el TU lo DOCUMENTA como
      límite del contrato, no como caso.

**c) Wiring SOLO en el loop de preload** (`:1359-1365`), con estas cuatro
condiciones duras:
   - **Re-lectura POR ITERACIÓN** de `size`+`oldest` bajo `tecHistMutex` en
     scope estrecho (patrón del bloque `:1344-1348`: lock, leer, soltar —
     NUNCA mantener el lock durante el fetch). No se hoistea fuera del loop:
     el oldest AVANZA durante el propio preload cuando un fit legítimo desplaza
     el borde, y un check hoisted decidiría con valores rancios.
   - `front().timestamp` como oldest (vector ordenado asc por `:3027` — mismo
     begin() que usa el pop `:3030`; consistencia interna).
   - **El skip AVANZA `histDone`** (crítico, el punto más fácil de romper):
     `histTotal` se fijó a `want.size()` ANTES del loop (`:1358`); un skip sin
     `histDone++` deja la barra de progreso corta para siempre.
   - Contador local `nSkipped` + `continue` ANTES del `fetchFrame` — el skip
     no cuesta red por construcción.

**d) Contabilidad del log** (Q2): línea `:1366` EXTENDIDA a
`"[App] History preload: %d cached + %d fetched + %d skipped\n"`. Tres reglas:
   - la línea se MODIFICA in place y **conserva su CRLF** (medido: `:1366` es
     CRLF; la zona `:1344-1366` es CRLF íntegra, `:1367+` LF);
   - «fetched» MANTIENE su semántica de intento (hoy == `want.size()`): con
     skip, intentos == `want.size() - nSkipped`. Expresión libre (resta o
     contador medido), pero la identidad dura es **`cached + fetched + skipped
     == cached + want.size()`** — cierra siempre, se verifica en el veredicto;
   - nada silencioso: el skip aparece en log con su cuenta (estado honesto,
     ratificado — un skip invisible es un cache que miente sobre sí mismo).

**e) Cero riesgo de corrección (análisis de carrera, queda en acta)**: el
fit-check es ADVISORY y monotono-seguro. (i) Un SKIP nunca se arrepiente: en
sesión el anillo no encoge y el oldest no retrocede (`teccache::loadCached`
UNA sola llamada en :2935, arranque — censo re-verificado 1 tec + 4 irtam;
en sesión solo pares insert+pop) → lo que no cabía al mirar no cabrá después.
(ii) Un FITS puede perder una carrera con la vía live llenando el anillo a
mediaciones del fetch: peor caso UN fetch de más, idéntico al comportamiento
actual — y el contrato save-first del 104 (`:3024 < :3028 < :3029 < :3032`,
INTACTO sin tocar) garantiza disco consistente pase lo que pase. El fit-check
no añade invariantes: es un filtro de economía, no de corrección.

**f) Lo que NO se toca**: `pushHistoryFrame` completo (`:3007-3034`), dedup
`:3010`, save-first, cap literal `432` en `:3029` (preexistente, fuera de
scope), `missingInWindow` (su trim por cuenta queda como red de seguridad
para arranques fríos), vía live `:2823`, `loadCached` `:2935`, CMakeLists
(lección 104: la restricción dura manda — el TU vive en su fichero, ctest
sigue 21/21).

## 3. Checklist del drop 107 (Q3: patrón 102 adaptado, 12 puntos)

1. **Custodia**: From del delta == full-40 de git pegado byte a byte (norma
   endurecida 104); From de la nota == cabecera del delta byte a byte (errata
   095); firma David; append-only.
2. **Pre-imágenes** 4/4 contra espejo drop103-fold @ `7b65521` (los full-40 de
   la nota 105 son la base declarada).
3. **Delta EXACTAMENTE 4 ficheros**: App.cpp + TecCache.h + TecCache.cpp +
   tests/test_tec_cache.cpp. Nada más — CMakeLists intenso-no-tocado.
4. **Tree gate D3**: fold en rama propia `drop105-fold` desde `7b65521`
   (`am --keep-cr`, guardas de pre-imagen 4/4); árbol post-drop anunciado en
   la nota == árbol del fold.
5. **EOL punto crítico**: zona App `:1344-1366` CRLF íntegra (23 líneas,
   printf `:1366` CRLF medido byte a byte); líneas NUEVAS dentro de la zona →
   CRLF; la printf modificada conserva CRLF; TecCache.h/.cpp y test LF-100 %;
   CR neto App `1856 → 1856 + Δ` con Δ = nº de líneas nuevas en zona CRLF,
   declarado y contado en el veredicto.
6. **Multiset** por fichero declarado (added/removed/movidos); en App esperado
   neto ≈ +k líneas nuevas + 1 modificada (:1366), CERO movidas si el wiring
   se inserta sin reordenar el loop existente.
7. **Anclas**: desplazamiento `+k` declarado SOLO bajo `:1359` (loop de
   preload); la vía live `:2823` y la cadena save-first `:3007-3034` quedan
   INMÓVILES (re-pin en el veredicto); `kCapFrames :25` no se mueve.
8. **Propiedades del diff** verificables como propiedades (patrón 104):
   predicado puro sin I/O, cap por parámetro, wiring solo-preload, re-lectura
   por iteración bajo lock estrecho, skip avanza histDone, identidad del log
   cierta, dedup/save-first/cap-432/missingInWindow intactos.
9. **TU**: sección nueva `--- fitsInRing ---` con los 6 bordes de §2b;
   conteo tec_cache `469 → 469+N` declarado con N = nº de check_bool nuevos;
   resto de conteos 067 exactos; ctest **21/21** (sin cambio de conteo total).
10. **Barrera**: build 57/57 TUs · TUs de cero recompilados de fuente (patrón
    090) · warnings **15/13 sin delta de firmas** (baseline scratch-104-build)
    · TU2/TU32 difieren (código real), resto byte-idénticos donde aplique ·
    glad + LINK OK · exe no ejecutado (067).
11. **Evidencia runtime (falsabilidad, norma 102 §0.4)**: arranque con disco
    saturado (432 congelado, newest avanzando) → log del preload mostrando
    `skipped > 0` con `fetched` reducido en la misma magnitud (identidad
    cerrándose EN VIVO), y conteo de ficheros de disco sin crecimiento neto
    durante el preload (los skips no escriben). El escenario del hallazgo
    reproducido como PASS del fix.
12. **Numeración**: drop **107** → veredicto **108**. Erratas (si las hay):
    pre-declaradas en la nota, corrección con full-40 pegado de git.

## 4. Desvíos y límites declarados de antemano

- El literal `> 432` de `:3029` sigue acoplado a `kCapFrames` por comentario
  (`:25`) — preexistente, NO se toca en este ciclo (tocarlo ensancharía el
  delta sin beneficio; queda como nota de higiene de backlog, no bloqueante).
- `missingSince` vive solo en TU (sin call-site en App) — se deja como está;
  su TU es la cobertura que justifica su existencia. Fuera de scope.
- La carrera FITS→anillo-lleno (§2e-ii) NO se elimina: se declara como
  residual aceptado (peor caso un fetch de más, nunca un huérfano — el
  save-first lo impide). No se pide lock a través del fetch NI bajo ninguna
  circunstancia (bloquearía la vía live).
- 3 incidentes de método PROPIOS de esta partición, todos falsos FAIL del
  script corregidos y re-ejecutados en verde (44/44): (1) bytes-vs-str en el
  mapa EOL (clase recurrente del 104); (2) +1 doble en el censo loadCached
  (las keys ya eran líneas reales — el censo correcto 1 tec + 4 irtam salió
  del arreglo); (3) dos checks por colisión de substring («oldest» de la
  VENTANA en TecCache.cpp, «tecHist» del COMENTARIO en TecCache.h:25) que
  confundían documento con código — refinados a código-vs-comentario.
  Ninguno tocó la adjudicación.

## 5. LUZ VERDE

Drop **107** autorizado: nota + delta 4 ficheros + TU fitsInRing (6 bordes) +
barrera + evidencia runtime con skipped>0 en disco saturado. Sin código hasta
esta partición — esta ES la partición: ejecutar. Veredicto 108 con el
checklist de §3 completo, tree gate exacto y la identidad del log verificada
en vivo.

— GLM (partición 106, commit de este ruling en el canal)
