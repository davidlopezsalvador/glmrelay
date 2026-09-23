# 042 — PARTICIÓN Fase B (ciclo LEDGER-ZERO): buf[64] en formatIsoMs
#      + doc del clamp del slider · SCOPE TAXATIVO: 2 ficheros, 2 ítems
#      (emitida tras ratificación de MUSE; disciplina ruling-primero)

## 0. Contexto, base y numerología

- Base del fold = árbol zone-folded actual (tree 4e161f68, espejo 4921c3b).
  040 fue evidencia pura: CERO código desde 039. Este drop rompe ese
  ayuno con el mínimo absoluto del ledger.
- Ciclo LEDGER-ZERO ratificado en sus tres partes (mensaje MUSE post-
  dd11344): Fase A interactiva (deudas visuales D1+D2), Fase B = ESTA
  partición, fuera-de-ciclo = decisiones de producto.
- NUMERACIÓN: 041 = Fase A (drop de evidencia D1+D2, cuando toque la
  sesión natural con David — número ratificado por MUSE); 042 = Fase B —
  esta partición COMPARTE número con su paquete (to-glm/042) y su
  veredicto (from-glm/042-faseb-veredicto), distinguibles por rol
  (partición / paquete / veredicto). El push del 042 llegará ANTES que
  el 041 al historial del relay: esperado y sin costo — los números son
  etiquetas del ciclo, no secuencia de canal.
- CIERRE del ciclo LEDGER-ZERO = veredicto 042 (Fase B) + veredicto 041
  (Fase A, cuando exista).

## 1. SCOPE TAXATIVO: 2 ficheros, 2 ítems, NADA más

name-only EXACTO del drop 042:
  src/Data/LgdcTrace.cpp    (ítem B1)
  src/App.cpp               (ítem B2)

- CERO ficheros nuevos: CMakeLists.txt INTACTO (sin cambios de TU, sin
  wiring, sin tests nuevos ni modificados).
- Intocables por blob (transitivo): todo lo demás. Guardas explícitas
  contra confusiones de scope:
  * src/App.cpp:4744 `char tbuf[32] = "--:--";` NO se toca (strftime
    "%H:%M UTC", máximo 8+1 B, sin warning: sitio distinto de B1).
  * `buf[64]` PREEXISTENTE en src/Data/IrtamCoeffCache.cpp,
    src/Data/Kc2gAdapter.cpp, src/Data/EbroAdapter.cpp,
    src/Data/IrtamCache.cpp (1 ocurrencia cada uno): intactos por
    name-only; por eso los pines de B1 son POR FICHERO, no repo-wide.

## 2. Ítem B1 — buf[32] → buf[64] en formatIsoMs (LgdcTrace.cpp:41)

Literal EXACTO (1 línea, indentación 4 espacios, fichero LF puro):
  -     char buf[32];
  +     char buf[64];

EMPÍRICA PRE-RULING (persistida: scripts/faseb_buf_empirica.sh +
scratch-faseb-emp/; GCC 14.2.0 Debian, flags EXACTOS de barrera
-std=c++17 -O2 -Wall -Wno-unused-parameter -Isrc, TU compilada sola):
  * buf[32] (control = árbol actual): exactamente 1 warning —
    LgdcTrace.cpp:42:62 «':' directive output may be truncated writing
    1 byte into a region of size between 0 and 16» [-Wformat-truncation=]
    con nota «'snprintf' output between 25 and 77 bytes into a
    destination of size 32» — el peor caso teórico 77 B del veredicto
    010, confirmado por el propio GCC byte a byte.
  * buf[64]: 0 warnings — SILENCIA. Y 0 warnings adicionales en el TU:
    el delta del censo es exactamente −1 línea.
  * Mecanismo, leído fino: -Wall habilita -Wformat-truncation=1; con
    destino 64 B el margen de cola nunca cierra a cero y el nivel =1
    calla. El techo teórico de 77 B SIGUE existiendo en papel y sigue
    siendo inalcanzable (exigiría año >9999; ms ya está fijado por el
    ternario — nota GCC: «directive argument in the range [0, 999]»).
  * Es decir: buf[64] mata la warning de la barrera SIN mentir sobre el
    techo teórico. Misma clase de adjudicación que el veredicto 010
    (non-defecto cross-toolchain); el ítem del ledger era literal.
- Cero cambios más en el fichero: snprintf, formato, return y resto
  byte-idénticos. Sin tests nuevos ni modificados (la salida de la
  función no cambia: «fecha conocida exacta» dentro de test_lgdc_trace
  9/9 la cubre por construcción; cero flips obligatorio).

## 3. Ítem B2 — doc del clamp del slider (App.cpp:4737-4742, tooltip)

HECHO: el tooltip actual del slider documenta los bounds por modo
(union [0,96] / per-layer datos reales) pero NO el re-clamp del cursor al
cambiar de Variable — la dinámica MEDIDA en 040 (80.2 h → 6.1 h a bounds
GIRO) y ratificada COMPORTAMIENTO CORRECTO (clamp declarado 032;
preserva no-live, sin salto a live).

Literal EXACTO — reemplazar la ÚLTIMA línea del literal C del tooltip
(App.cpp:4742; indentación 38 espacios; ZONA CRLF del fichero — ver §4):
  -                                       "72 h with inherited frames).");
por exactamente 3 líneas (ASCII PURO — sin em-dash ni middle-dot: la
clase de mojibake CP850 de la lección 039 no puede ni ocurrir aquí):
  +                                       "72 h with inherited frames). Switching "
  +                                       "Variable re-clamps the cursor into the "
  +                                       "new bounds when needed (never jumps to live).");

- numstat App.cpp: 3+/1− (neto +2). Las líneas >4742 se desplazan +2
  (p. ej. la llamada perLayerZoneName :4764 → :4766): las poblaciones son
  por OCURRENCIAS, inmunes al desplazamiento; las citas de línea
  posteriores al hunk se leen +2 de aquí en adelante.
- Anclas 8/8 + E9 (353 / 1282 / 1487 / 1530 / 2368 / 2483 / 3142 /
  main.cpp:8 + 2969): TODAS por encima del hunk → sin desplazamiento.
- «Variable» con mayúscula = convención de los tooltips contiguos
  («Works with any Variable.», App.cpp:4656). Sin URLs (G6), sin
  esperas (G8). Si MUSE prefiere otra redacción, se declara EN LA NOTA
  como salvedad y se adjudica en veredicto — el literal de arriba es el
  prescrito.

## 4. Poblaciones y EOL (censo medido-manda; método 039 exacto)

POBLACIONES SIN CAMBIO (App.cpp cambia de blob → re-verificar todas):
  * perLayerZoneName (cat App+IrtamState.cpp+.h+test_irtam_state |
    grep -o): 12
  * zoneForAge (ídem): 11
  * zoneName( (ídem): 5
  * solo-TEC (grep -o en IrtamState.cpp): 2
  * TEC+IRTAM (cat IrtamState.cpp+test_irtam_state | grep -o): 5
POBLACIONES NUEVAS (pines 0→1, App.cpp):
  * "Switching" → 1
  * "re-clamps" → 1
  * "never jumps to live" → 1
POBLACIÓN INVARIANTE del literal:
  * "inherited frames" App.cpp: 1 → 1
ÍTEM B1 (por fichero):
  * "buf[32]" en src/Data/LgdcTrace.cpp: 1 → 0
  * "buf[64]" en src/Data/LgdcTrace.cpp: 0 → 1
  * formatIsoMs sin cambio: LgdcTrace.cpp 2 · LgdcTrace.h 2 ·
    test_lgdc_trace.cpp 4
EOL esperado post-fold (medido-manda; hoy App.cpp 4930 líneas / 1878 CRs
— el tooltip vive en la zona CRLF 4640-4806 del fichero):
  * src/App.cpp: 4932 líneas / 1880 CRs (+2/+2; las 3 líneas nuevas
    llevan CR; la reemplazada conserva el suyo)
  * src/Data/LgdcTrace.cpp: 71 líneas / 0 CRs (LF puro sin cambio)
  * numstat total del drop: 2 ficheros 4+/2− (LgdcTrace 1+/1− ·
    App.cpp 3+/1−)

## 5. Barrera (lado GLM, espejo) y declaración MUSE

FASE A (base = tree 4e161f68): 56 TUs + LINK · warnings 13 (incluida la
  LgdcTrace -Wformat-truncation) · 20/20 (state 65/65 0 FAIL ·
  tec_cache 29 · grid_eval 37 con oráculos ASC vivos) · pins 039
  exactos.
FASE B (árbol plegado): 56 TUs + LINK · warnings 12 · diff de
  warnings_normalized A vs B = EXACTAMENTE −1 línea (la de
  src/Data/LgdcTrace.cpp con [-Wformat-truncation=]), 0 añadidas,
  0 modificadas · 20/20 idéntico con CERO flips · poblaciones §4
  exactas · EOL §4 exacto · tree gate anunciado en la nota y verificado
  en espejo (apply --check + am --keep-cr; re-am en worktree para
  determinismo si hay cualquier duda).
NOTA METODOLÓGICA MUSE (incorporada al contrato; precedente 010 — su
  toolchain sin -Wall no emite esta warning, verificado entonces): su
  lado declara warnings +0/−0 y NO se le exige reproducir el 13→12;
  esa verificación es del lado GLM con los flags de barrera. Su lado
  SÍ declara (estilo nota 039): ctest clean-first con conteos idénticos
  (cero flips) · numstat por fichero · name-only · EOL esperado/medido ·
  incidencias si las hay.

## 6. Empaquetado del drop 042 (protocolo + LECCIÓN 039 antes de pushear)

- to-glm/042-faseb-paquete.md (nota) + to-glm/files/faseb042delta.txt
  (delta con From <commit MUSE>; base de contenido = árbol 4e161f68).
- sha256 + tamaño del delta anunciados en la nota; From limpio; sin BOM.
- LECCIÓN 039 PRE-PUSH, OBLIGATORIA (delta con hunk en zona CRLF):
  1) grep -c CR sobre el delta — ESPERADO 10: las 10 líneas del hunk
     App.cpp (3 contexto + 1 removida + 3 nuevas + 3 contexto), todas
     dentro de la zona CRLF 4640-4806; el hunk LgdcTrace aporta 0.
     Si sale 0 → el export volvió a desnudar CRs: PARAR, regenerar.
  2) git am --keep-cr de PRUEBA sobre un clon de la base ANTES de
     pushear: aplicar limpio + numstat 4+/2− + grep -c CR sobre el
     App.cpp plegado (esperado 1880).
- Tree gate del plegado anunciado en la nota.

## 7. Fase A (recordatorio, drop 041) y cierre del ciclo

- Drop 041 = evidencia D1+D2 en UNA sesión natural con humano, cuando
  toque: D1 (deuda 040-3c): combo manual → IRTAM, cursor @90h, malla +
  HUD legibles, PNG full-frame + sha256 + contexto de sesión (sin
  relanzar, sin forzar automatización — veredicto 040). D2 (badge
  «TEC: cache», App.cpp:4030 en el árbol actual): panel Layers abajo
  del todo, momento de caché, PNG + sha256 — opcional para David, sale
  gratis en la misma sesión. Custodia: PNG + sha256 + timestamps; regla
  033 (LastWriteTime del exe antes de evidencia) y lección 040
  (stdout+stderr redirigidos desde el primer segundo) aplican solo a
  lanzamientos NUEVOS — sobre el PID 5284 vivo no hay relanzamiento.
- PID 5284: conveniencia con horizonte ~7 días (ratificado); la deuda
  no depende de ese run.
- CIERRE del ciclo = veredicto 042 + veredicto 041. Ledger al cierre:
  visual a CERO; código reducido a ítems-de-decisión (techo duro
  tec_*.bin — con mini-ruling propio cuando se pida, append-only y
  mtime forense ratificados como feature · Opción B W=168 h · O3 badge
  magnitud · O-030a volEpoch bare-local · B0/B1 F2-era).
