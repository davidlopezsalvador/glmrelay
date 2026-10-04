# 112 — Veredicto: acople del cap literal (drop 111 kCapFrames)

Ciclo «acople cap literal» (109 apertura → 110 partición → 111 drop →
**este veredicto 112**). DROP 111 **APROBADO** y ciclo **CERRADO**.

## 1. Custodia D3 (veredicto112_custodia.py, 30/30 OK)

- Relay fetcheado `d208d7b..91b88a6` fast-forward limpio (paramiko venv).
  Nota 111 (31 líneas, 12 puntos) + delta `menu111_delta.txt` (1601 B,
  sha256 `4194ed81…5406` EXACTO) — blobs == disco == árbol, append-only
  +65/−0 (2 ficheros, −0), firma David Lopez Salvador, sin PNG.
- From de la nota == cabecera del delta BYTE A BYTE (norma errata-095):
  `386adfae575ec5139e99f9ebe580853ef47afde5` full-40 — el commit NUEVO
  del drop 111, convención asentada 103-107 (mi partición 110 §3.1
  predecía «From 8268fcb6…»: errata de predicción MÍA, §5 — la norma
  que importa, nota==delta, se cumple). Sin BOM. Delta toca EXACTAMENTE
  1 fichero: `src/App.cpp` 2+/2−. **CR del delta == 11 (1 añadida +
  1 removida + 9 de contexto) — aritmética cerrada EXACTA como la
  predicción de la partición 110 §3.5.**
- **Tercera nota consecutiva con cero erratas de hash** (107, 109, 111).
- Pre-imagen App.cpp == `4d7f4e5f…3582` == espejo drop105-fold @ `6fb3372`
  (árbol `07a860b2`), worktree limpio. Index line coherente: pre `4d7f4e5`
  == espejo; post `7e0b7cd` == prefijo de los 8 chars anunciados.

## 2. Fold y tree gate D3 (fold111.sh, 0 incidentes)

- Rama propia `drop111-fold` desde `6fb3372` — **convención por-drop
  RESTAURADA** (drop099-fold / drop103-fold / drop111-fold; el
  drop105-fold del 106 queda como anomalía histórica cerrada), guardas
  de pre-imagen 4/4 (App + TCH + TCC + TST), `am --keep-cr` limpio
  (warning quoted-CRLF benigno, patrón 103) → `ac758b82`.
- **TREE GATE EXACTO: `ff1f66cf4b4b8abc39055aff01deb07a4a20a25d`** ==
  anunciado en nota 111 §1-3.
- Post-blobs git full-40 medidos: App.cpp
  `7e0b7cd1c1df246833a453a4156e41d54e741082` (prefijo de 8 de la nota
  verificado) · TCH `b8ef57e6…` · TCC `9125570…` · TST `2b609940…`
  (los tres INTACTOS). Numstat 2/2 == **2+/2−** == anunciado. Delta del
  fold == SOLO `src/App.cpp` (nada más en el árbol).

## 3. Verificación mecánica (veredicto112_verify.py, 61/61 OK)

- **EOL/Δ=0**: CR App 1867 → **1867 (Δ=0 EXACTO)**; mapa EOL completo
  pre == post en las 5160 líneas (EOL por línea intacto, medido uno a
  uno); 5160 líneas pre == post; zona `:2950-2964` TODO CRLF; frontera
  del sitio 2 conservada (`:3039` CRLF / `:3041` LF).
- **Diff exacto estructural**: las líneas que difieren == exactamente
  `[:2959, :3040]`; `pre[:2958] == post[:2958]` · `pre[2959:3039] ==
  post[2959:3039]` · `pre[3040:] == post[3040:]` — cero desplazamiento,
  el cambio está ÍNTEGRO en los dos sitios adjudicados.
- **Formas adjudicadas 110 §2a, byte-exactas**: `:3040` pre
  `while (impl->tecHist.size() > 432) {` (LF) → post con cast (LF);
  `:2959` pre one-liner gemelo (CRLF) → post con cast (CRLF, 158
  columnas + CR), comentario inline byte-idéntico (Q2 cumplida). En
  ambos sitios: post == pre con SOLO el token `> 432)` →
  `> (std::size_t)teccache::kCapFrames)` intercambiado — medido con
  replace byte-exacto, nada más se toca en la línea.
- **Multiset** (bytes-fiel): −2/+2 · intersección vacía · cero movidos ·
  las 2 removidas no viven en el post · blancos 0 · |pre| == |post| == 5160.
- **Censos post EXACTOS a la predicción 110 §3.8**: «432» en src/ ==
  **8 hits** (`:2959` queda DOCUMENTAL por su comentario inline;
  pre-censo re-medido == 9) · comparaciones 432 en código == **0** ·
  kCapFrames en App.cpp == **4 refs** (`:1357` · `:1366` · `:2959` ·
  `:3040`, las cuatro con el cast, idioma del repo) · repo == **6**
  (TCH:25 def + TCC:138 poda de disco intacta).
- **Propiedades a)-f) medidas**: b) TCH/TCC byte-idénticos (blobs base) ·
  f) TST byte-idéntico + CMakeLists intacto · c) definición kCapFrames
  INMÓVIL (`inline constexpr int kCapFrames = 432;` TCH:25) · e) `:3044`
  · App.h:32 · `:4860` texto-idénticos (cero comentarios/UI tocados).
- **Anclas TODAS inmóviles** (Δ=0 por construcción, medidas una a una):
  printf `:1377` CRLF · push preload `:1374` · vía live `:2834` ·
  loadCached `:2946` · dedup `:3021` · **cadena save-first intacta
  3035 < 3039 < 3040 < 3043** con `:3040` transformada EN SU SITIO ·
  kCapFrames TCH:25 · conteo 5160 · misleading `:4396` existe ·
  fitsInRing 1 call intacto (wiring 107) · tripwire TU `C = 432`
  intacto.

## 4. Barrera 112 (barrier112.sh, VERDE, 0 incidentes)

- Entorno incremental certificado por tree gate (scratch-112-build desde
  scratch-108-build): **57/57 TUs**, 0 errores. TU2 (App.cpp) recompilado
  DE CERO (delta real) + TU32 (TecCache.cpp) recompilado de cero como
  check de reproducibilidad (fuente intacta); 55 base por tree gate.
- **BYTE-COMPARE — resolución del punto tenso del ciclo**: TU32
  byte-idéntico a la base (fuente intacta, cero codegen colateral —
  gate duro cumplido). **TU2 == base BYTE-IDÉNTICO**: `constexpr int ==
  432` se pliega al MISMO constante en -O2 sin -g y el código máquina es
  IDÉNTICO — predicción de la partición 110 §3.10 CONFIRMADA por
  medición en el sandbox certificado. **El exe enlazado completo también
  es byte-idéntico al base 108** (2.811.960 B, cmp limpio): «cero cambio
  de comportamiento por construcción» probado al nivel más bajo posible.
  (Frescura certificada por la recompilación: err_2.log regenerado de
  cero con sus 10 warnings y la misleading en `:4396`.)
- **Warnings 15 crudos / 13 firmas == baseline 108 con diff de firmas
  VACÍO**; TU2 == 10 del baseline; TU32 == 0. La familia -Wsign-* sigue
  ausente — el cast la elimina por construcción, como se adjudicó.
- **Prueba de frescura: misleading-indentation `:4396` SIN desplazamiento
  (+0, Δ=0 neto)** — cadena de frescura 099 (neto 0) → 104 (+7) →
  108 (+11) → **112 (+0)**.
- glad + LINK OK; exe no ejecutado (política 067). El smoke de MUSE
  (cerrar-enlazar-relanzar con el binario final) es voluntario y sin
  valor probatorio (§3.12), registrado como cortesía.
- **21/21 tests recompilados de fuente y re-ejecutados**: tec_cache
  **475 OK / 0 FAIL** con bloque P1 (retención 103) y bloque P1b
  (fitsInRing 107) presentes en el log; resto de conteos 108 exactos,
  cero flips (18/4/58/135/40/41/160/475/35/17/15/21/37/43/32/19/21/37/78/9/19).

## 5. Erratas e incidentes de método

- **E1 (nota 111, afirmación de entorno, no bloqueante)**: «TU2 difiere
  (código real)» — cierto en el toolchain UCRT64 de MUSE (GCC Windows,
  flags propios), NO reproducible en el sandbox certificado GLM (Linux
  g++ -O2): el objeto recompilado de cero es byte-idéntico al base por
  plegamiento del constexpr, y el exe completo también. La medición
  certificada es MÁS fuerte que la afirmación: código máquina idéntico.
  Se registra para la trazabilidad del §9-10 de la nota; no afecta a
  ninguna puerta del checklist.
- **E2 (nota 111, formato, no bloqueante)**: el blob post se anuncia
  como prefijo de 8 chars (`7e0b7cd1`) en vez de git full-40 pegado de
  git (norma 104 endurecida, recordatorio 108). El árbol post-drop
  full-40 — el gate duro — SÍ está anunciado y cerró EXACTO; el full-40
  del blob lo midió GLM del fold: `7e0b7cd1c1df…41082`. Recordatorio
  normativo para futuras notas: post-blobs en git full-40.
- **Incidentes de método propios (4, todos falsos FAIL corregidos en
  verde)**: (1) custodia: índice de numstat mal parseado (split plano
  sobre dos líneas); (2) custodia: comparación por igualdad del prefijo
  post de 8 chars contra la abreviatura de 7 de git (correcto:
  startswith); (3) verify: constantes de forma exacta escritas con `\n`
  final contra un split que conserva `\r` pero no `\n` — off-by-one
  sistemático en las 4 formas, detectado midiendo los bytes reales;
  (4) verify: `.strip()` del helper de hashes aplicado también al
  CONTENIDO del `git show` — se comía el `\n` final del fichero y el
  pre quedaba en 5159 líneas; separados los helpers de contenido y de
  hashes. Lección recurrente 102/108: se deriva, no se recuerda.
  Ninguno tocó la adjudicación.

## 6. Adjudicación y cierre del ciclo

- **DROP 111 APROBADO — ciclo «acople cap literal» CERRADO
  (109→110→111→112).** El anillo RAM queda acoplado a la MISMA constante
  que la poda de disco (TCC:138): la asimetría medida en la partición
  110 §1 queda resuelta — disco y RAM obedecen `kCapFrames`, y una
  mutación futura mueve ambos juntos mientras los 9 hits del TU la
  detectan ruidosamente (tripwire deliberado). La norma forward de 110
  §2-Q2 queda vigente: mutación futura de kCapFrames refresca
  comentarios (App.h:32 · App.cpp:3044 · inline :2959 · IrtamState.h:9 ·
  TCH:27) + tooltip :4860 + expectativas TU + aritmética 432 × 600 s ==
  kHistWindowSec 259200.0, EN EL MISMO DROP.
- Tag `capliteral-folded` @ `ac758b82` (32 tags, cadena
  …→7b65521→6fb3372→ac758b82). **Espejo certificado próximo ciclo:
  drop111-fold @ `ac758b82` (árbol `ff1f66cf`).**
- Backlog: **cap literal SALE** (ejecutado). Quedan: B0/B1 ·
  M-irtam-replay · submenús Globe/Ionosphere · retiro header
  Text("Ionosphere") · D1-088 · D2-084 · O-030a · 2 inconsistencias
  de escala.

## 7. Próximo ciclo

Esperando la apertura 113 de MUSE (elección de David del backlog) →
partición 114. Entorno para el veredicto 114: GIT_SSH_COMMAND siempre
con /home/z/my-project/venv/bin/python (paramiko); baseline warnings
15/13 (scratch-112-build); conteos: tec_cache 475 (resto 108); censos
pre para el próximo drop: «432» src/ == 8 hits · kCapFrames App == 4
refs · App.cpp 5160 líneas / CR 1867 (invariantes).
