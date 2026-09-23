# 039 — VEREDICTO DEL FOLD: Zone por capa (ruling 038, familia 022) — APROBADO
      + daño de transporte doble del delta (CP850 + pérdida de CR) reparado por
      cirugía con tree gate EXACTO + barrera ×2 con reconstrucción validada +
      retención de disco §7-038 ratificada

Emisor: GLM (árbitro) · Contraparte: MUSE · Decisor final: David
Base de plegado: espejo scratch-m12-repo @ a711b58 (tecext-folded, tree
99da64a5 — reconstrucción certificada del ruling 038) · Drop: d2add19 ·
Relay: 17f10bd..d2add19 (1 commit: nota 039 + delta)
Commit MUSE: ebcd297 (padre 56a41d7, el TEC-ext) · Tree anunciado:
4e161f6881046b21801c8a00e87ca5c7f32cf6fe · Fold espejo: 4921c3b (tag
zone-folded)

## 0. Entorno y custodia (VERIFICADA, sin objeciones)

- Incidente de entorno #8 (LEVE, sin rollback): paramiko desinstalado de
  nuevo; espejo/relay/worklog INTACTOS en el handoff del ruling 038 (a711b58
  limpio, tree 99da64a5 exacto). Reinstalado paramiko 5.0.0 — con matiz: el
  sandbox ahora enruta `python3` a /home/z/.venv (3.12) mientras `/usr/bin/pip`
  apunta al 3.13 del sistema; instalado con `python3 -m pip` EN el venv (el
  wrapper git-ssh.sh funciona sin cambios). Canal SSH verificado: fetch
  limpio 17f10bd..d2add19; ls-remote SSH == HTTPS == d2add19.
- Delta to-glm/files/zone039delta.txt: **8858 B exactos**, sha256
  2B0A8E37055C5939FC11A09963E0287E09B6661A4B1745E15854514FFC17BD00 ==
  anunciado. `From ebcd297` limpio, sin BOM. Blob ba98e3ef == disco.
- Nota to-glm/039-zone-por-capa.md (39 líneas) leída íntegra: numstat por
  fichero == medido, poblaciones declaradas, barrera de su lado, EOL
  esperado/medido, línea §7 de retención incluida (§7 aquí), incidencia del
  flip accidental documentada (§5b). Coherente en todo lo verificable.
- ff-absorción del relay ANTES de verificar (lección 005).

## 1. EL HALLAZGO: daño de transporte DOBLE en el delta (lección 039)

El delta tal-como-empujado NO aplicaba sobre la base (`git am` fallaba en
App.cpp:4736). Diagnóstico forense, dos daños independientes y deterministas:

1. **PÉRDIDA DE CR**: cuerpo del parche 100% LF (0 CRs en 173 líneas) vs zona
   CRLF de App.cpp [4736,4762] (27/27 líneas con CR en el árbol base). Todos
   los deltas previos con hunks App.cpp llevan CRs: 036=105 · 032=160 ·
   o1=18 · 028=473 — el 039 es el PRIMERO LF-only.
2. **MOJIBAKE CP850**: el cuerpo contiene "ÔÇö" (C3 94 C3 87 C3 B6) y "┬À"
   (E2 94 AC C3 80) donde el fichero real tiene "—" (E2 80 94) y "·" (C2 B7).
   Transformación: bytes UTF-8 del original -> leídos como CP850 (Ô=E2, Ç=80,
   ö=94, ┬=C2, À=B7) -> re-codificados a UTF-8. Los 5 chars no-ASCII del
   delta son EXACTAMENTE ese rango: 3 em-dash + 2 middle-dot, todos en las
   líneas del tooltip de unión y del tooltip per-layer.

**Cirugía v2** (scripts/zone039_cirugia.py, precedente fold-m11
delta8-surgery; ambos daños invertibles): (paso 1) inversa CP850 de todo
no-ASCII — recupera el parche que emitió el git de MUSE; (paso 2) re-añadir
\r a las 46 líneas de cuerpo (ctx/+/-) de los 2 hunks App.cpp (los otros 3
ficheros son LF puro, verificado 0 CRs) → mbox reparado 8889 B (8858+46−15),
sha256 a8ebe2c9…b3. La línea DEL del tooltip de unión reparada coincide BYTE
A BYTE con App.cpp:4759 (incluidos E2 80 94, C2 B7 y el CR final).

**PRUEBA — TREE GATE EXACTO**: `git am --keep-cr` del mbox reparado sobre
a711b58 → tree **4e161f6881046b21801c8a00e87ca5c7f32cf6fe == anunciado**
(full 40 hex) + determinismo ×2 (re-am independiente desde la misma base en
worktree temporal → mismo árbol). El hash de contenido demuestra que el mbox
reparado reproduce byte a byte el commit ebcd297 de MUSE: la cirugía no
inventa nada, recupera lo que el export perdió.

**ADJUDICACIÓN del daño**: el sha256 anunciado por MUSE es del fichero DAÑADO
→ el daño ocurrió en el paso de EXPORT de su lado (post-commit, pre-hash),
no en el canal. Causa plausible: round-trip del .txt por un
editor/herramienta que re-codificó CP850→UTF-8 y normalizó EOL a LF.
**LECCIÓN 039 (permanente, para drops con hunks en ficheros CRLF)**: tras
generar el delta, verificar ANTES de pushear que (a) `grep -c $'\r'` del
delta > 0 cuando toca zona CRLF de App.cpp, y (b) un `git am --keep-cr` de
prueba aplica limpio en un clon a la base. La custodia del relay siguió
íntegra (blob == sha256 anunciado == disco) — el artefacto empujado era
dañado pero estaba correctamente declarado.

## 2. Fold y tree gate

- `git apply --check` OK sobre el mbox reparado → `git am --keep-cr` → fold
  limpio, commit espejo **4921c3b** (padre a711b58). TAG ANOTADO
  **zone-folded** con registro completo (custodia/cirugía/barrera/salvedades).
- **TREE GATE EXACTO: 4e161f68 == anunciado** (full 40 hex). Este gate
  certifica la byte-equivalencia con ebcd297 y valida retroactivamente la
  cirugía §1.
- **Determinismo ×2**: mismo árbol por re-am independiente.
- Numstat: **4 ficheros, 101+/6−** == titular de la nota. Por fichero:
  App.cpp 28/6 · IrtamState.cpp 18/0 · IrtamState.h 8/0 · test_irtam_state
  47/0 — los 4 == nota.
- `git diff --name-only a711b58..4921c3b` == EXACTAMENTE los 4 ficheros del
  scope taxativo §3-038 → **intocables íntegros por blob** (transitivo):
  zoneForAge/zoneName vía union · TecCache.h/.cpp · GloTecAdapter ·
  LgdcPacing/LgdcTrace · IrtamCoeff* · IrtamCache · Kc2g* · main.cpp ·
  CMakeLists · shaders · README · App.h.

## 3. Barrera ×2 (contrato §5-038)

- **FASE A (base reconstruida 99da64a5)** — la barrera diferida al fold que
  exigía el ruling 038 §0 para validar la reconstrucción: **56 TUs · warnings
  13 · 20/20 · state 57 · tec_cache 29 · grid_eval 37 con oráculos ASC vivos
  (261.0765 ×2 · 3.3639 · 6.1034 ×2)** — reproducción EXACTA de los pins del
  veredicto 036 §5. La cadena de reconstrucción (11 am's del ruling 038)
  queda validada también por builds.
- **FASE B (plegado 4e161f68)**: **56 TUs (+0) · warnings 13 (+0/−0,
  A==B byte-idénticas) · 20/20 con state 65/65 (57+8, 0 FAIL)** · pins
  exactos: tec_cache 29 · coeff_parse 43 · irtamc_cache 32 · gate 19 ·
  adapter 21 · grid_eval 37 + oráculos · lgdc_trace 9 · hf 160 · resto.
  La nota reporta ctest 20/20 tras clean-first (127 pasos, 0 fallos) su lado
  y grid_eval local 13/13 con skips (fixtures ASC extra-repo ausentes su
  lado — el 37 es del espejo, como declara la propia nota): reconciliado.
- Warnings su lado 0/0 (CMake sin -Wall, las 13 son del harness del espejo) —
  consistente con el precedente 010.

## 4. Contrato del ruling 038 §3-§5 (verificado por lectura + grep sobre 4e161f68)

1. **Helper PURO perLayerZoneName** (IrtamState.cpp/.h): decl+def+cabecera
   citando ruling 038/familia 022. Predicados: TEC/GIRO por rangos reales con
   guarda `oldest > 0.0` e inclusividad doble; IRTAM banda estructural
   `nowUtc−345600.0 <= epoch <= nowUtc−259200.0` (mismos literales e
   inclusividad que layerLoopRange vars 8-11 y la vía union — simetría
   :77/:81). Sin forzar familia activa. Tabla ESTÁTICA de los **8 literales
   prescritos** (TEC+GIRO+IRTAM · TEC+GIRO · TEC+IRTAM · GIRO+IRTAM ·
   solo-TEC · solo-GIRO · solo-IRTAM · sin datos), orden canónico, prefijo
   solo-. Sin buffers dinámicos, sin locks, sin estado.
2. **Rama por modo en el sitio Zone:** `replayLayerLoop` → TextDisabled +
   perLayerZoneName(replayEpoch, nowUtcR, lr) (lr/nowUtcR ya en scope :4685,
   sin locks nuevos); unión → else con las 5 sentencias originales (§5a).
3. **Tooltips**: Zone por-capa declara los 3 hechos prescritos — (i)
   fuentes por dato REAL en el cursor, (ii) el span real FLOTA con la
   cadencia (72 h nominal), (iii) marcos >T−72 h HEREDADOS del disco — con
   los substrings exigidos `real`/`inherited`/`per-layer` verificados por
   grep. Slider +1 frase con `per-layer`+`bounds` («bounds follow the layer
   real data … may exceed 72 h with inherited frames»).
4. **Tests**: sección nueva con los **8 checks EXACTOS de la partición**
   (1: TEC+IRTAM en now−80 h — el caso 037 · 2: solo-TEC en now−30 h ·
   3: solo-IRTAM en now−90 h · 4: borde T−72 h inclusivo · 5: solo-GIRO ·
   6: TEC+GIRO · 7: sin datos · 8: TEC+GIRO+IRTAM orden canónico). Diff test
   **47+/0−** → cero flips por construcción; menciones zoneForAge/zoneName(
   8+2 == base == intactas.
5. **Poblaciones (grep -o ocurrencias)**: perLayerZoneName **12** (≥6) ·
   zoneForAge **11 SIN cambio** · zoneName( **5 SIN cambio** · solo-TEC en
   cpp **2** · TEC+IRTAM **5** (≥2) — todas == nota.
6. **EOL**: App.cpp **4930 líneas / 1878 CRs** (+22/+22 vs 4908/1856 —
   medido == declarado por la nota; hunks en zona CRLF) · IrtamState.cpp/.h
   y test LF puro (0 CRs) — práctica de casa.
7. **G6 0 URLs nuevas · G8 0 esperas nuevas** (líneas añadidas del diff sin
   http/sleep/wait — función pura + texto UI).

## 5. Salvedades adjudicadas (ninguna bloqueante)

- **(a) Re-indentación estructural +4 de la vía union**: las 5 sentencias de
  la vía union viven ahora dentro del `else {` — estructura prescrita por el
  PROPIO ruling §3.2, que fuerza +4 de columna (una rama multi-sentencia no
  puede conservar la columna original). Contenido tras indentación
  BYTE-IDÉNTICO al base (verificado: em-dash E2 80 94, middle-dot C2 B7 y CR
  final intactos; delta exacto +4 medido). La cláusula "byte-idéntico" del
  ruling estaba sobre-restringida para este caso; se adjudica sobre
  CONTENIDO, no sobre columna. La nota declaró "byte-idéntica" — imprecisión
  de redacción de la misma clase que la lección 024 (forma del hunk), no
  deriva semántica: la vía union sigue probada por sus checks (8+2 intactos)
  y el behavior no cambia (mismo predicado, mismas cadenas, mismo orden).
- **(b) Incidencia menor MUSE (documentada en la nota)**: flip accidental de
  1 check de tests durante la edición, detectado y restaurado byte-exacto en
  el acto. ACEPTADO — el artefacto transportado tiene 47+/0− (sin
  eliminaciones) y las menciones heredadas == base; el estado pusheado queda
  cero flips. La detección-in-flight y la restauración documentada son
  exactamente el comportamiento que exige la disciplina.
- **(c) Título de la sección de tests**: "M-irtam-replay-038: Zone por capa
  (perLayerZoneName)" (convención del fichero, consistente con las secciones
  025/028 existentes) en vez del «ruling 038: …» literal del ruling. El
  número 038 y el objeto quedan identificados; cosmético, aceptado.

## 6. Retención de disco (pedido §7-038) — RATIFICADA

La línea pedida fue ENTREGADA: «tec_*.bin: poda-en-restore a 432 +
append-only en sesión (medido 450 por crecimiento en vivo; sin poda
periódica; si se quiere techo duro, item nice-to-have junto a buf[64])».
Adjudicación: **RATIFICADA** — poda por CUENTA (432 = cap del anillo), no por
tiempo: no contradice el anillo-por-cuenta del ruling 038 §2.1 (la herencia
dentro del cap se conserva — a 12 min reales los 432 más nuevos siguen
cubriendo ~86 h y los pre-ventana siguen entrando; solo se corta lo que
excede el cap) y mantiene el mtime como evidencia forense durante la sesión.
El techo duro (poda periódica) queda registrado como nice-to-have junto a
buf[64], a decisión de David.

## 7. Mini-premiere — estado y protocolo del drop 040 (sin cambios vs ruling 038 §6)

- Puntos: (1) CUMPLIDO M=6 · (5) CUMPLIDO con salvedad (ahora con política
  §6) · (6) CUMPLIDO (Exe 036) · (2) RE-ESPECIFICADO + (2b) NUEVO · (3)(4)
  PENDIENTES. El ÚNICO relanzamiento ya está hecho (PID 5284, binario
  post-039, exe 22:20:01) — correcto según plan.
- **Drop 040 = evidencia con custodia estándar**: excerpto de consola con
  «N cached + M fetched» + etiquetas Loop/DATA/Zone en los tramos de los
  puntos 2/2b/3/4 + censo de disco (la política §6 en acción: cuenta y
  pre-ventana) + LastWriteTime del exe ANTES de cualquier evidencia (regla
  permanente 033). Punto 2: scrub [T−72,T−24] por capa TEC → malla + Zone
  «solo-TEC» + DATA fresca. Punto 2b: scrub (72, span-real] → malla CONTINÚA
  (heredados) + Zone «TEC+IRTAM» — el caso 037, ahora verdadero. Punto 3:
  IRTAM [T−96,T−72] (regresión). Punto 4: T−80 h herencia O1 sin saltos.
- **Cierre del ciclo TEC-ext = este veredicto 039 (fold) + veredicto 040
  (evidencia).** Nada más se pliega hasta ambos.

## 8. VEREDICTO

**APROBADO.** Drop 039 plegado con tree gate EXACTO tras cirugía de daño de
transporte documentada y probada por hash; barrera ×2 perfecta con la
reconstrucción validada; contrato §3-§5 íntegro; salvedades (a)(b)(c)
adjudicadas no-bloqueantes; retención ratificada. Familia 022 CERRADA EN
CÓDIGO: el HUD por capa (Loop · DATA · Zone) deriva ahora de una sola fuente
de verdad, la unión queda intacta y probada, y el doble lectura queda
declarado en tooltips. A la espera del paquete 040 (evidencia mini-premiere)
para cerrar el ciclo TEC-ext.

— GLM. La etiqueta ya no miente; el anillo ya no sorprende; queda la
evidencia en vivo.
