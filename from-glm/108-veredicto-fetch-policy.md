# 108 — Veredicto: fetch-policy de gaps (drop 107 fit-check fitsInRing)

Ciclo «fetch-policy de gaps» (105 apertura → 106 partición → 107 drop →
**este veredicto 108**). DROP 107 **APROBADO** y ciclo **CERRADO**.

## 1. Custodia D3 (veredicto108_custodia.py, 22/22 OK)

- Relay fetcheado `2557f94..c5f3bf3` fast-forward limpio (paramiko venv).
  Nota 107 (41 líneas, 12 puntos) + delta `menu107_delta.txt` (4486 B,
  sha256 `0d3ac380…e0ce31` EXACTO) — blobs == disco, append-only +137/−0,
  firma David Lopez Salvador.
- From de la nota §7 == cabecera del delta BYTE A BYTE (norma errata-095):
  `8268fcb6973140c771a3779693fe4bb1e18aa644` full-40. Sin BOM. Delta toca
  EXACTAMENTE los 4 ficheros adjudicados. CR del delta == 23 (12 añadidas +
  10 contexto + 1 removida) — aritmética cerrada.
- Pre-imágenes 4/4 == espejo drop103-fold @ `7b65521` (árbol `a8afa6f8`),
  worktree limpio. Index lines del delta coherentes 4/4.
- **Segunda nota consecutiva con cero erratas de hash** — la norma endurecida
  del 104 está asentada.

## 2. Fold y tree gate D3 (fold107.sh, 0 incidentes)

- Rama propia `drop105-fold` desde `7b65521`, guardas de pre-imagen 4/4,
  `am --keep-cr` limpio (warning quoted-CRLF benigno, patrón 103) → `6fb3372`.
- **TREE GATE EXACTO: `07a860b238eba6e6093c72fc9f31f1ff3721b9b3`** == anunciado
  en nota §1-3. Post-blobs git full-40 medidos: App `4d7f4e5f…` · TCH
  `b8ef57e6…` · TCC `9125570…` · TST `2b609940…` (== abreviaturas del delta).
  Numstat 12/1 + 5/0 + 5/0 + 11/0 == **33+/1−** == anunciado.
- Prefijos sha256-16 de la nota §10 verificados 4/4 contra los ficheros del
  fold (App `4bf84605…` · TCH `c6f37933…` · TCC `207fe1e4…` · TST `4821adc2…`).

## 3. Verificación mecánica (veredicto108_verify.py, 61/61 OK)

- **EOL**: CR neto App 1856 → **1867 (+11 EXACTO)**; mapa de la zona
  :1355-1377 TODO CRLF (11 líneas nuevas + printf reescrita conservando CRLF
  :1377); :1378+ LF sin cambio; TCH/TCC/TST LF-100 % (CR 0). Delta transporta
  23 CR — aritmética de custodia coherente.
- **Multiset** (bytes-fiel): App +12/−1 blancos 0 · TCH +5/−0 blancos 1 ·
  TCC +5/−0 blancos 1 · TST +11/−0 blancos 1 · movidos 0 · intersección
  added∩removed vacía. Total 33+/1− == numstat. La printf vieja sale como
  LÍNEA COMPLETA exacta y no vuelve (la nueva la contiene como prefijo —
  comparación por línea exacta, no substring).
- **Diff exacto estructural**: pre[1:1358] == post[1:1358] byte a byte (nada
  cambia antes de :1359); las 8 líneas base del loop sobreviven SIN reordenar;
  pre[1368:] == post[1379:] byte a byte (**desplazamiento +11 exacto** tras la
  zona — el cambio está ÍNTEGRO en el bloque adjudicado).
- **Propiedades a)-f) de la partición 106, todas medidas**:
  a) impl `fitsInRing` == 2 líneas puras (`if (ringSize < cap) return true;
  return epoch > oldestEpoch;`), sin I/O, sin estado, **sin 432 hardcodeado**
  (cap por parámetro, `kCapFrames` en el call-site — simétrico con
  missingInWindow);
  b) declaración en TCH DESPUÉS de missingInWindow (juntas, sus dos caras),
  comentario documenta la frontera fuera-de-ventana Y cita la partición 106;
  c) fitsInRing en App == 1 call-site (solo-preload); vía live intocada;
  d) dentro del scope del lock SOLO lecturas + rama (cero fetch/save/push bajo
  lock), re-lectura POR ITERACIÓN dentro del for tras el check de shutdown,
  `front().timestamp` como oldest con vacío→0.0, `continue` dentro del scope
  RAII (libera el lock antes de saltar);
  e) `++nSkipped` + `histDone.store` DENTRO de la rama skip (la barra de
  progreso no queda corta), `nSkipped = 0` declarado antes del loop;
  f) printf extendida con la resta `(int)want.size() - nSkipped` (fetched ==
  intentos) conservando CRLF :1377 — identidad `cached+fetched+skipped ==
  cached+want.size()` POR CONSTRUCCIÓN.
- **Anclas re-pin +11 todas exactas**: vía live `:2823→:2834` · loadCached
  `:2935→:2946` · dedup `:3010→:3021` · save `:3024→:3035` · insert
  `:3028→:3039` · pop `:3029→:3040` · delete `:3032→:3043` · `kCapFrames`
  TCH:25 INMÓVIL (el fit va al final :62+) · **cadena save-first intacta
  3035 < 3039 < 3040 < 3043** (el contrato del 104 no se toca).
- **Censos**: fitsInRing 1 call en App + 6 calls en TU + cero apariciones en
  cualquier otro fichero del árbol; nSkipped 4 (decl + ++ + 2 en printf);
  histDone 2 stores en las líneas del preload (:1368 skip + :1375 normal).
- **TU de 6 bordes exacto §2b**: hueco-true-aunque-epoch<oldest ·
  lleno+e>o true · lleno+e==o false · lleno+e<o false · vacío-true-oldest-0.0
  · sin-ventana-rige-oldest — con `const std::size_t C = 432` (cap por
  parámetro en los bordes).

## 4. Barrera 108 (barrier108.sh, VERDE, 0 incidentes)

- Entorno incremental certificado por tree gate (scratch-108-build desde
  scratch-104-build): **57/57 TUs**, 0 errores. TU2 (App.cpp) + TU32
  (TecCache.cpp) recompilados DE CERO (clausura TecCache.h medida en 104);
  55 base por tree gate.
- **BYTE-COMPARE: TU2 y TU32 AMBOS difieren de la base 104** (código real:
  wiring fit-check + predicado) — cero objetos stale.
- **Warnings 15 crudos / 13 firmas == baseline 104 con diff de firmas
  VACÍO**; TU2 == 10 del baseline; TU32 == 0 del baseline medido.
- **Prueba de frescura: misleading-indentation `:4385 → :4396` (+11 EXACTO)**
  — el +11 neto del wiring bajo :1359 desplaza todas las líneas posteriores;
  cadena de frescura 099 (neto 0) → 104 (+7) → 108 (+11).
- glad + LINK OK; exe no ejecutado (política 067).
- **21/21 tests RE-COMPILADOS de fuente** (patrón 090): **tec_cache 469 →
  475 OK/0 FAIL (+6 = los 6 bordes, exacto)** con bloque P1b presente en el
  log y bloque P1 retención del 103 AUSENTE-de-regresión (sigue pasando);
  resto conteos 067 EXACTOS cero flips.

## 5. Evidencia runtime RATIFICADA (norma 102 §0.4, binario final de MUSE)

- Log capturado en disco saturado (el escenario EXACTO del hallazgo):
  `[App] TEC cache: 432 restored, newest 00:39 UTC (pruned 0, dropped 0)` +
  `[App] History preload: 432 cached + 115 fetched + 62 skipped`.
- **Identidad cerrada EN VIVO**: 432+115+62 == 432+177 → 609 == 609
  (want.size()=177, fetched=177−62 por construcción). **skipped=62 > 0** con
  fetched reducido en la misma magnitud — el fix haciendo exactamente lo
  adjudicado: 62 fetch+write+delete evitados en el borde viejo.
- Disco **congelado en 432** durante todo el preload (los 115 fetches útiles
  desplazan el borde: save-first garantiza neto 0 por frame) con newest
  avanzando — coherente con la mecánica certificada.
- Fidelidad de formato: la línea restored coincide BYTE A BYTE con el printf
  `:2985` del código; la línea preload con el `:1377`. TU certifica el
  predicado, runtime certifica el wiring — ambas verdes.

## 6. Adjudicaciones

1. **DROP 107 APROBADO — ciclo «fetch-policy de gaps» CERRADO**
   (105→106→107→108). La «simetría de captación» de P1 queda completa: P1
   (103) cerró la fuga de disco en el pop; fitsInRing (107) cerró la fuga de
   red en el borde. El anillo ahora solo paga lo que conserva.
2. **Errata E1 de la nota 107 (prosa, no bloqueante)**: §5 declara «cero
   blancos» — real: **3 blancos separadores** (1 por fichero no-App: TCH,
   TCC, TST), estilo consistente con las secciones existentes del TU. Misma
   clase que E3 del 103. Corrección pre-declarada en la próxima nota si
   procede.
3. **Cambio de formato §10 declarado (no errata, con recordatorio normativo)**:
   los post-blobs pasan de git-sha1-full-40 (nota 103) a **prefijos
   sha256-16**. Verificados 4/4 — pero la norma endurecida del 104 («full-40
   SIEMPRE pegado de git») se interpreta para hashes DE GIT (From, árbol,
   pre/post-blobs como objetos). Próximas notas: post-blobs en git full-40
   (pegados de git) — el sha256-16 puede acompañar, no sustituir.
4. **Tag `fetchpolicy-folded` (anotado) @ `6fb3372`** → árbol `07a860b2`.
   31 tags. Sellos intactos. Cadena: 3d17d9c → a2fdaec9 → 78cf445 → 3f26438
   → 7b65521 → 6fb3372.
5. **Espejo certificado próximo ciclo: `drop105-fold @ 6fb3372`** (árbol
   `07a860b2`).

## 7. Incidentes de método propios (declarados, todos falsos FAIL corregidos)

1. **Pipeline /tmp roto en custodia §5** (aplicar el delta en copia temporal
   para pre-verificar los sha256 post): directorios inconsistentes + violación
   de la regla de rutas del proyecto. Corrección: los prefijos post se
   verifican contra los ficheros REALES del fold (§2-3 de este veredicto) —
   que es además lo correcto metodológicamente.
2. **`text=True` en subprocess (clase latin1-vs-UTF8, recurrente del veredicto
   100 §9-3)**: el guion largo «—» de los comentarios (3 bytes UTF-8) se
   funde a 1 char en el lado pre mientras el post iba por latin1 → 4 líneas
   de TCH y ~69 de App divergían artificialmente en el multiset (+80/−69
   espurio). Corrección: lectura bytes-fiel de blobs (`blob_lines`) con el
   MISMO tratamiento que el disco. Lección: jamás mezclar text-mode con
   comparaciones byte-fiel — la lección del 100 no estaba del todo
   institutionalizada para subprocess.
3. **Tres mini-bugs de needle/rango** (todos corregidos en verde): printf
   vieja comparada sin indentación por membresura de lista (la nueva la
   contiene como prefijo — comparación por línea exacta con strip); ancla
   kCapFrames :25 metida en la lista de App.cpp (vive en TecCache.h — file
   mix-up propio); rango de CARACTERES `app[1300:1400]` usado como si fuera
   de líneas. Ninguno tocó la adjudicación; los tres habrían sido falsos
   FAIL si el drop hubiera sido defectuoso en esas zonas.

## 8. Backlog y próximo ciclo

- **FETCH-POLICY SALE del backlog** (hecho). Quedan: **cap literal `432` en
  `:3040` acoplado a `kCapFrames` por comentario** (higiene menor, zona
  natural tras dos ciclos en TecCache — candidata recomendada) · B0/B1 ·
  M-irtam-replay · submenús Globe/Ionosphere · retiro header
  `Text("Ionosphere")` · D1-088 · D2-084 · O-030a · 2 inconsistencias de
  escala.
- Numeración: próxima **apertura 109** (elección de David) → partición 110.

— GLM (veredicto 108, commit de este documento en el canal)
