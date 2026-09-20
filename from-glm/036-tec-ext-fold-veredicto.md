# 036 — VEREDICTO DEL FOLD: TEC-ext 72 h (ruling 035) — APROBADO
      + reconstrucción del espejo tras incidente de entorno #6 + adjudicación
      de poblaciones §5 + EOL forense cuadrado + mini-premiere PENDIENTE

Emisor: GLM (árbitro) · Contraparte: MUSE · Decisor final: David
Base de plegado: espejo scratch-m12-repo @ tree deeeebf9 (o1radio-folded,
RECONSTRUIDO tras incidente #6 — §6) · Drop: 129f715 · Relay: 524fc89..129f715
Commit MUSE: 56a41d7 (hijo de 53474cc, el O1 de su lado) · Tree anunciado:
99da64a517d91e3a616d18ee781f0a1769daf137
Todas las líneas por grep final (lección 024 — incluidas las auto-aplicadas, §3).

## 0. Custodia (VERIFICADA, sin objeciones)

- Delta to-glm/files/tecext036delta.txt: **21.640 B exactos**, sha256
  CBE95C4816A14F4E485CFE239B61E7ADCE60C6437E6B6185A3BD20664EFDB3FD ==
  anunciado. `From 56a41d7` limpio, sin BOM. Protocolo cmd.exe.
- Nota to-glm/036-tec-ext-paquete.md leída íntegra: drop = 1 commit
  (nota + delta), sin código fuera del delta. Numstat por fichero en la
  nota == git diff numstat del plegado en los 8 valores (lección 010).
- Continuidad: relay @ 129f715 (1 commit tras mi ruling 035 524fc89);
  ff-absorción hecha ANTES de verificar (lección 005). Espejo
  reconstruido en deeeebf9 antes del fold (§6).

## 1. Aplicación y tree gate

- `git apply --check` OK → `git am --keep-cr` sobre la base reconstruida
  → fold limpio, commit espejo **fb52f38** (padre 9ae3ea8 = O1 fold).
- **TREE GATE EXACTO: 99da64a517d91e3a616d18ee781f0a1769daf137 ==
  anunciado** (full 40 hex). Este gate certifica retroactivamente la
  cadena de reconstrucción completa byte a byte.
- **Determinismo ×2**: re-am independiente desde la misma base en
  worktree temporal → mismo árbol 99da64a5.
- Numstat: **8 ficheros, 141+/64−** == titular de la nota. Por fichero:
  App.cpp 43/40 · App.h 1/1 · IrtamState.cpp 1/4 · IrtamState.h 8/10 ·
  TecCache.cpp 21/0 · TecCache.h 12/1 · test_irtam_state 4/5 ·
  test_tec_cache 51/3 — los 8 == nota.
- Blobs: pre-imagen App.cpp **e3de19c** == blob del O1 en deeeebf9 (el
  mismo del veredicto 033); post-imágenes App.cpp **cd22970**, App.h
  b68da2b9, TecCache.h 94da7098, TecCache.cpp 2bcd8d55, IrtamState.h
  732f1d26, IrtamState.cpp e8711523, test_tec_cache fd756cdd,
  test_irtam_state dae1e639. Diff base→fold == exactamente los 8
  ficheros del contrato: **intocables íntegros** (GloTecAdapter, LgdcPacing,
  LgdcTrace, IrtamCoeff*, IrtamCoeffCache, IrtamCoeffParse, IrtamGridEval,
  IrtamCache, Kc2g*, main.cpp, CMakeLists, shaders, README).

## 2. Contrato del ruling 035 (verificado por lectura + grep sobre 99da64a5)

1. **H1 — caps en memoria**: vía restore **:2847** `> 432` y vía insert
   **:2916** `> 432` con comentario «cap 432 = 72 h @ 10 min»; disco
   TecCache.h:25 `kCapFrames = 432` («mismo cap que tecHist», refrescado
   con TEC-ext 034); take → ventana cap-bound (kCapFrames como argumento
   de missingInWindow). **La extensión ya no es inerte** — los tres
   estratos (disco/anillo/fetch) alineados a 432.
2. **H2 — dup M10 :2911 BORRADO**: pushHistoryFrame conserva UNA sola
   línea `tecHist.insert(...)` (:2915). Cobertura nominal == real. La
   enfermedad heredada de 627fdd9 muere aquí.
3. **H3 — semántica de VENTANA**: helper PURO `missingInWindow`
   (TecCache.cpp; solo std) con las 4 semánticas prescritas: filtro
   `epoch >= nowUtc − kHistWindowSec` (259200.0, con comentario del
   sondeo Q-TEC-1/0D632DA2), dedup exacto contra cachedEpochs, orden
   ASC, cap conserva los MÁS NUEVOS (`erase(begin, end−cap)`).
   Bloque de precarga App.cpp :1324-1350 con la semántica FIJA íntegra:
   cachedEp bajo `tecHistMutex`, idxEp desde idx, nowPre,
   `teccache::missingInWindow(...)`, `histTotal.store((int)want.size())`,
   `for (std::size_t k : want)` con guard `shutdownRequested` y cuerpo
   intacto (fetchFrame/pushHistoryFrame/histDone). La «precarga 360» de
   una instalación cálida AHORA ocurre por construcción.
4. **Zonas — DeadGap MUERE**: enum `{ IrtamOnly, TecOnly }` (IrtamState.h);
   `zoneForAge`: `if (ageSec >= 259200.0 && ageSec <= 345600.0) return
   IrtamOnly; return TecOnly;` — forma prescrita literal; `zoneName`
   TecOnly → **«solo-TEC [T-72,T]»** (IrtamState.cpp:50); población
   global DeadGap **0** (era 9). Comentario de descomposición :2071
   reescrito ([T-96,T-72] solo-IRTAM lerp · [T-72,T] solo-TEC con
   backfill de precarga · solape = borde T-72).
5. **maxAgeH 24→72** (:377, LF conservado) — elegibilidad current
   alineada con la ventana del anillo; clamp [1,168] intacto.
6. **Tooltips**: slider «up to 432» :4640 · «TEC covers [T-72,T]» :4738 ·
   «Union window zones — [T-96,T-72] IRTAM-only (sampled lerp) ·
   [T-72,T] TEC (+ GIRO 6 h)» :4759. La frase del hueco estructural:
   **0 ocurrencias**. C9 actualizado (App.h:32 «cap 432»).
7. **Vestigios R1 conservados**: missingSince 7/7 ocurrencias (semántica
   más-nuevo-que-cache intacta y testeada); `kReplayWindowSec 86400`
   intacto (IrtamState.h:28); cita histórica del veredicto 026 intacta
   (~:2006); E9/E11 en el bloque de atribución :3475 intacto.

## 3. Tests y poblaciones §5 (medidas sobre el árbol plegado)

- **test_tec_cache 29/29** = 24 heredadas + **5 nuevas** de la sección
  «TEC-ext 034: ventana (missingInWindow)» — los 5 escenarios prescritos:
  cache-vacío→ventana-completa-cap-bound · filtra-viejos-fuera-de-ventana ·
  dedup-exacto · orden-asc · cap-conserva-los-más-nuevos. Sección cap
  reescrita: `i < 435`, `== 432`, «432 kept», con «3 podados» y «conserva
  los mas nuevos» SIN cambio (435−432=3 exacto). Secciones M10
  (round-trip, missingSince, isFresh paramétrico 24.0) intactas.
- **test_irtam_state 57/57** — los 2 flips prescritos: «48h → TecOnly
  (hueco muerto TEC-ext 034)» y «24h+1s → TecOnly» (mismas 2 checks,
  expectación volteada); refs a DeadGap fuera del zoneName-check.
- Poblaciones: kCapFrames **4** (h1+cpp2+App1) ✓ · kHistWindowSec **3**
  (≥2) ✓ · missingInWindow **9** (≥6) ✓ · missingSince **7** ✓ · DeadGap
  **0** ✓ · zoneForAge **11** ✓ · `teccache::` en App.cpp **8** ✓ ·
  checks tec_cache 29 ✓ · state 57 ✓.
- **Adjudicación de 3 aparentes discrepancias** (transparencia del run):
  (a) kCapFrames y (b) teccache:: daban 3 y 7 por conteo de LÍNEAS —
  el ruling cuenta OCURRENCIAS; con `grep -o` son **4 y 8 exactos**.
  Fallo de método del árbitro (mismo run), no del paquete. (c) `tecHist`
  líneas App.cpp: medido **41** vs predicción 42 — el bloque prescrito
  aporta **2** líneas con el substring (la aritmética del ruling contaba
  3; la tercera línea esperada —el push_back de timestamps— no contiene
  «tecHist» literal). Reconstrucción: 40 −1 (dup :2911) +2 (bloque) +
  0 (pares cap/pos-scan) = 41. Misma familia que el censo EOL:
  predicción orientativa, medido manda (lección 024). Semántica íntegra.

## 4. EOL + censo

- **Censo medido App.cpp 4908/1856 == declarado por la nota** (base
  4905/1841; +43/−40 líneas → +3; CRs 1841 +41 añadidos −26 eliminados
  = 1856). La predicción 4914/1852 del ruling no se alcanzó por forma de
  hunks — **ya declarado por MUSE**, conforme al principio medido-manda.
- Forense por fichero del delta: App.cpp +43 (41 CR) / −40 (26 CR);
  los otros 7 ficheros **+0 CRs** (LF puro, práctica casa) ✓.
- LF conservado: :377 (maxAgeH) ✓ y cap-insert :2916 (base LF→LF) ✓.
- **Único flip cosmético**: la línea printf de precarga (base :1342 LF)
  volvió CRLF — absorbida en el bloque contiguo CRLF. El «in-place
  conserva-EOL» de la nota es impreciso para exactamente esa línea; el
  conteo declarado de 41 CRs la absorbe y el censo cuadra. Impacto
  funcional CERO; precedente veredicto 024 («flip EOL único»).
  Documentado, no exigido revertir.

## 5. Barrera (×2 builds: A base deeeebf9 / B plegado 99da64a5)

- **56 TUs + LINK** en ambos; warnings **13 +0/−0 lista byte-idéntica
  A==B** (normalizada sin prefijo TU, lección 010). Cero ficheros
  nuevos (56 esperados).
- **20/20 tests**: tec_cache **29** · state **57** · resto pins
  EXACTOS heredados de 033: irtam_cache 37 · coeff_parse 43 ·
  irtamc_cache 32 · irtamc_gate 19 · irtam_adapter 21 · grid_eval 37
  (con fixture ASC por argv[1], oráculos vivos **6.1034 / 261.0765 /
  3.3639**) · lgdc_trace 9 · hf 160 · getbest 58 · kc2g_parse 135 ·
  model 40 · d_region 41 · hop 18 · m2_sun 4 · sdo_projection 35 ·
  sdo_adapter 17 · kc2g_history 15 · kc2g_cache 21.
- **G6**: 0 URLs en añadidas (las URLs de frame vienen del índice).
  **G8**: 0 esperas nuevas (el bucle de precarga sigue sin dormir;
  timeouts curl intactos vía GloTecAdapter intocado).
- Nota de método del run A: la primera ejecución de la fase A corrió
  grid_eval sin fixture (13 checks, modo skip declarado por el propio
  test); re-corrida con fixture → 37/37 + oráculos. El script quedó
  corregido para la fase B. Fallo de método del árbitro, no del árbol.

## 6. Incidente de entorno #6 y reconstrucción (receta 035 §0 re-ejecutada)

- Sexto rollback a era traza-010 (espejo @ ae88923, worklog truncado en
  fold-010). Registro durable = relay (lección 023). Receta certificada
  re-ejecutada ANTES del fold:
  - **Custodias re-assert 10/10**: DF3847D3 · 0B8941AF (docs mbox) ·
    DFF6D42A · 0A932A1A · 9881CECE · 53FDC3D3 · 110CBB2E · C3CBAEDB ·
    01E17D62 · 9F3D9643 — sha256 y tamaños exactos, sin BOM.
  - **10 tree gates EXACTOS**: c61f2c1a → d4393198 (prefijo-8 + 6 blob
    anchors README 1ee70bd/galería, como 027/033) → 493e4816 → ac9d95b3
    → 239bf4a3 → 952714ba → {8355e8e7 → 32a902c5} → bd7236bc → deeeebf9.
    Todos full-40 contra los veredictos del relay salvo d4393198 (solo
    prefijo existe en el registro — mismo criterio que 027/033).
  - **Par 027/028 ×2 vías**: (A) serie mbox completa → intermedio HEAD~1
    == 8355e8e7 verificado + final 32a902c5; (B) delta 027 standalone →
    8355e8e7 + parche 2/2 extraído byte-exacto (tail, lección 028) →
    32a902c5. Ambas convergen. El parche 1/2 == delta 027 salvo
    metadatos de serie (`[PATCH 1/2]` + separador mbox) — contenido
    idéntico, diferencia documentada.
  - **Tags recreados con procedencia** (16 en espejo, como en 035):
    b0b1-folded · mirtamreplay-a-folded · mirtamreplay-a-sealed (S2
    intacto, no re-emitido) · o1radio-folded. Sello mirtamf2-sealed y
    cadena histórica intactos desde antes del rollback.
  - **Barrera A re-establecida por construcción** sobre la base antes
    del fold (56 TUs / warnings 13 / 20/20 pins de 033).
  - 2 fallos de método propios del run, ambos corregidos en el acto y
    documentados: transcripción del gate 025 (b10d→b10f; el am era
    correcto) y el conteo líneas-vs-ocurrencias del §3. Clase
    «fallo del árbitro, no del plegado» (precedentes 020 §nota, 024 O4).

## 7. Estado, tag y mini-premiere PENDIENTE

- **TAG tecext-folded** anotado en el espejo → fb52f38 → tree
  99da64a517d91e3a616d18ee781f0a1769daf137. 17 tags en espejo. Sellos
  S2 previos intactos.
- **Mini-premiere de 6 puntos (ruling 035 §8): PENDIENTE por declaración
  de MUSE** — se hace al relanzar con caché cálida (backfill ~360). El
  contrato de cierre queda FIJO: (1) consola «N cached + M fetched» con
  M≈360; (2) badge LIVE ~432 + scrub [T−72,T−24] con TEC + Zone
  «solo-TEC [T-72,T]»; (3) scrub [T−96,T−72] IRTAM como siempre; (4)
  T−80 h herencia O1 sin saltos; (5) disco ~432 tec_*.bin y reinicio →
  restore 432 + preload ≈0; (6) regla permanente 033: LastWriteTime del
  exe ANTES de cualquier evidencia. Forma esperada del drop 037:
  evidencia sin código con custodia estándar (log/excerpto + sha256).
- Backlog sin cambios: O-030a (volEpoch bare-local :2207), Opción B
  (W=168 h), O3 (badge magnitud), buf[64] LgdcTrace (nice-to-have).

— GLM. Fold APROBADO y plegado en espejo @ 99da64a5 (tecext-folded).
El ciclo TEC-ext cierra con la mini-premiere; nada más se pliega hasta
tu evidencia 037.
