# 040 — VEREDICTO MINI-PREMIERE TEC-ext (evidencia en vivo, sin código):
      puntos 2/2b/4 CUMPLIDOS, 3 parcial aceptado — APROBADO · CIERRE DEL CICLO TEC-EXT
      Verificación cuádruple: custodia sha256 4/4 + aritmética edades/bandas +
      inspección visual VLM (3 pasadas, crops ampliados) + diff de píxel p2b↔p4
      (24 px = un dígito) · deuda 040-3c registrada · lección 040 adoptada

Emisor: GLM (árbitro) · Contraparte: MUSE · Decisor final: David
Drop: e924bd0 (autor DLS, 2026-09-24 00:05:55 +0200) · Relay: e920706..e924bd0
(1 commit: nota 040 de 39 líneas + 4 PNG full-frame 1296×759 RGBA) · Padre:
e920706 (veredicto 039)
Run verificado: PID 5284 · binario post-039 del árbol 4e161f68 (ebcd297) ·
exe LastWriteTime 2026-09-23 22:20:01, medido ANTES de cualquier evidencia y
re-verificado al empaquetar (regla 033)
Inspector visual: VLM glm-5v-turbo, 3 pasadas (full-frame · crops
panel/globo/diff ×2–×4 · crop HUD ×3); artefactos en scripts/vlm{,2,3}_ev040_*
.json + scripts/ev040_crops/

## 0. Entorno y custodia (VERIFICADA, sin objeciones)

- Fetch HTTPS limpio e920706..e924bd0; ls-remote SSH == HTTPS == local ==
  e924bd0e0dde5a33b21a82cebccff318483a1f55 (triple); ff-absorción ANTES de
  verificar (lección 005). Worktree limpio.
- Range = 1 commit, 5 ficheros: nota + 4 PNG. CERO ficheros de código →
  «App intacta» confirmada a nivel repo: el árbol sigue en 4e161f68 y el
  binario en ejecución no pudo cambiar desde el 039.
- Custodia PNG 4/4 EXACTA (prefijo y cola del sha256 + tamaño):
  ev040_p2_tec30.png EFBB2579…CF9EEE · 531224 B — ev040_p2b_tec80.png
  044C4A5B…DAF4 · 481773 B — ev040_p4_hold80.png FCF7FDB9…D333B · 481768 B
  — ev040_p3_giro.png 62A52C1A…DD9B · 492421 B. Blob == disco 4/4
  (hash-object == rev-parse). Cuatro PNG coherentes 1296×759 RGBA.
- Nota 040 leída íntegra: coherente en todo lo verificable; el gap de consola
  y el bloqueo (c) declarados sin atenuar.
- El método declarado (GUI dirigida por operador, app pausada) se corrobora
  visualmente: botones «Back to Live»/«Play» y estado «Manual override ON»
  visibles en los frames, junto al selector Variable (TEC/TEC/TEC/hmF2).

## 1. Punto 2 — scrub [T−72,T−24] por capa TEC @30.0 h — CUMPLIDO

Etiquetas (VLM ×3 sobre crop HUD): `Loop: TEC 85.7 h` · `Zone: solo-TEC`
(etiqueta nueva, sin sufijo) · `DATA 09-22 15:45 UTC` sin `(stale)` · slider
`30.0 h` · Variable TEC.

- Aritmética del predicado por-capa (ruling 038 §1): edad 30.0 → TEC ✓
  (30.0 ≤ 85.7, dato real) · IRTAM ✗ (30.0 < 72, banda estructural
  [T−96,T−72]) · GIRO ✗ (30.0 > 6.1, span real) ⇒ conjunto = {TEC} ⇒
  «solo-TEC» EXACTO.
- DATA = ahora − 30.0 h = 09-22 15:45 UTC ✓ (captura ≈ 09-23 21:45Z; §8a).
- Malla: crop del globo ×2 — rejilla curva continua sobre la superficie +
  capa volumétrica de datos presente.
- Constancia de método (fallo propio, corregido en el acto): la pasada VLM 1
  a resolución completa leyó el slider «38.0 h» (confusión 0↔8 en texto
  pequeño); la pasada 3 con crop ×3 del HUD lee «30.0 h», y la aritmética
  DATA ya excluía 38.0. Ambos json quedan de constancia.

## 2. Punto 2b — scrub (72, span-real] @80.0 h — CUMPLIDO — EL CASO 037, AHORA VERDADERO

Etiquetas (VLM ×3): `Loop: TEC 85.7 h` · `Zone: TEC+IRTAM` · `DATA 09-20
13:47 UTC` (fecha real de hace 80 h, sin stale) · slider `80.0 h`.

- Aritmética: 72 ≤ 80.0 ≤ 96 (IRTAM estructural ✓) y 80.0 ≤ 85.7 (TEC real
  ✓) · GIRO ✗ ⇒ conjunto = {TEC, IRTAM} ⇒ «TEC+IRTAM» EXACTO.
- La contradicción del 037 (Zone incondicional vs DATA por-dato-real) ha
  desaparecido EN VIVO a las 80 h: etiqueta y dato dicen ahora lo mismo, de
  la misma fuente de verdad.
- Malla CONTINÚA más allá de T−72 h (marcos heredados): VLM sobre crop del
  globo — continua sobre toda la superficie visible, sin zonas donde falte
  o se interrumpa, con la capa de datos renderizando.

## 3. Punto 4 — hold T−80 h 2,5 min, herencia O1 sin saltos — CUMPLIDO, VERIFICADO A NIVEL DE PÍXEL

- Diff p2b↔p4 (RGB directo, PNG sin pérdida): **24 píxeles de 983.664
  (0,0024 %)**, todos dentro de una caja de 6×8 en (1172,624) — un solo
  glifo de texto.
- VLM sobre crops ×4 de esa caja: p2b «…retry 4 min» vs p4 «…retry 2 min» —
  el ÚNICO cambio es el dígito del contador GIRO-live, exactamente el
  «único cambio 4→2» que declaró la nota.
- Globo, malla, HUD y slider son píxel-idénticos durante el hold: sin
  saltos al presente, sin drift, sin re-render espurio. La afirmación
  «sin saltos» queda MEDIDA, no asertada — la verificación más fuerte
  posible sin vídeo.

## 4. Punto 3 — IRTAM [T−96,T−72] — PARCIAL, adjudicado

**(a) Unión @80.6 h → `Zone: solo-IRTAM [T-96,T-72]` — ACEPTADA con
salvedad de custodia**: la captura intermedia no se archivó; queda la
transcripción del operador. Corroboración: esa etiqueta es determinista en
la vía unión (zoneName intacto, banda [72,96], probada por los checks 8+2
del fold 039) y la observación coincide con esa determinación. Para el
acta: observaciones citadas como evidencia deberían archivar su PNG (el
costo era un screenshot más; no relanzar por ello).

**(b) Set-semántica en otra familia (hmF2/GIRO) @6.1 h — CUMPLIDO**: PNG
custodiado + VLM ×3: `Loop: GIRO 6.1 h` · `Zone: TEC+GIRO` · `DATA 09-23
15:55 UTC` · Variable hmF2 · malla y capa de datos presentes. Aritmética:
6.1 ≤ 85.7 (TEC ✓, con la capa Model TEC activa en el panel) · 6.1 = borde
EXACTO del span GIRO (el re-clamp dejó el cursor en el bound) ⇒ GIRO
incluido por la inclusividad del helper — el borde inclusivo :77/:81
ejercido en producción, no sólo en tests. El bonus es REAL: el predicado
de conjunto funciona fuera de TEC — la solución del 038 no es un parche
TEC-específico.

**(c) Malla IRTAM-var @90 h NO capturada — SUSTITUTO ACEPTADO + DEUDA
REGISTRADA.** La prueba sustituta (checks 3/4/7/8 de perLayerZoneName —
banda IRTAM, borde inclusivo, vacío, orden canónico — dentro del state
65/65 con 0 FAIL, que este árbitro ejecutó en la barrera 039 FASE B; más
la ruta de render IRTAM fuera del diff 039, acreditado por name-only
exacto de 4 ficheros con intocables íntegros por blob) CUBRE el riesgo
residual de la combinación no capturada. Fundamentos: (i) la lógica de
etiquetas queda probada en unitario para todas las familias y en vivo en 3
variantes (solo-TEC · TEC+IRTAM · TEC+GIRO); (ii) la malla está verificada
en vivo en 3 estados y su continuidad en el caso límite 80 h; (iii) el
bloqueo es de la AUTOMATIZACIÓN (combo Variable cerrado ignora clicks
sintéticos; bitácora de ~15 ciclos, 7 geometrías frescas, sleeps 2–5 s;
app viva y sana) — no hay evidencia de defecto del producto, y parchear
la app para agradar al driver violaría la disciplina de no-forzar;
(iv) una carrera dedicada exigiría relanzar, prohibido por el plan de
relanzamiento único.

**DEUDA 040-3c (no bloqueante)**: en la próxima sesión interactiva natural
con humano delante — abrir el combo Variable manualmente, seleccionar la
variable de fuente IRTAM, cursor @90 h (Ctrl+Click), 1 screenshot
full-frame con sha256 + transcripción de Zone/DATA. Adjuntable a cualquier
drop futuro; sin drop dedicado, sin relanzamiento, sin automatización
forzada.

## 5. Censo de disco — política §6/§7-039 EN ACCIÓN, RATIFICADA

- 441 → 446 `tec_*.bin` en la ventana de evidencia (+5 ≈ cadencia real
  ~12 min ✓), append-only: sólo añadidos, 81 pre-ventana con mtime intacto
  (≈ el tramo de herencia que el cap 432 conserva sobre la ventana de 72 h;
  orden de magnitud cuadra con span ~86 h → 20/09–23/09).
- Arranque desde el cap 432 (aserción del operador): crecimiento total +14
  en ~1 h 44 min, coherente con ráfaga de catch-up post-restore + cadencia
  de régimen — la poda-en-restore por CUENTA funcionó como está especificada.
- Nota de alcance: el censo verifica el RESULTADO en disco; la aritmética
  exacta del preload («N cached + M fetched») queda sin prueba esta sesión
  (§6).

## 6. Gap de consola — SUSTITUTO ACEPTADO · LECCIÓN 040 ADOPTADA

- El excerpto de consola era parte del contrato §7-039; su función era
  probar el preload. El censo prueba el resultado en disco (append-only ·
  pre-ventana intacto · arranque desde cap); la mecánica fetch-append ya
  tiene custodia previa en el relay (live009_stderr.log, era 009).
  Recuperar la línea exigía relanzar — prohibido por el plan de
  relanzamiento único. **SUSTITUTO ACEPTADO para este cierre.**
- Causa: error de operador, declarado por MUSE sin atenuar y con propuesta
  de lección — exactamente la conducta que la disciplina exige. Sin
  sanción procedimental; el coste ya lo pagó la evidencia.
- **LECCIÓN 040 (permanente, ADOPTADA)**: todo run de evidencia se lanza
  con stdout+stderr redirigidos a fichero desde el primer segundo. Coste
  de cumplimiento: cero. Elimina la clase entera de gaps de custodia.

## 7. Dinámica honesta — re-clamp del cursor 80.2 → 6.1 h — COMPORTAMIENTO CORRECTO (no fallo)

Al cambiar TEC→hmF2, el slider re-clampeó el cursor al bound del span real
GIRO, sin salto a live. Es el clamp declarado del SliderFloat aplicado a
bounds por-capa (032): preserva la intención no-live del usuario y acota
defensivamente al rango real de la capa nueva. Colateral benévolo: dejó el
cursor EXACTO en el borde y ejerció la inclusividad del helper en vivo
(§4b). Queda registrado como comportamiento observado; opcional y no
bloqueante: una línea en docs si algún día se documenta la interacción del
slider.

## 8. Salvedades menores (no bloqueantes)

- **(a) «inicio 22:21:31Z»**: el sufijo Z es inconsistente con la aritmética
  DATA (capturas ≈ 21:45–22:01 UTC; commit 22:05:55 UTC) — el inicio no
  puede ser posterior a las capturas. Lectura coherente: hora local (+0200)
  = 20:21:31 UTC, con el exe 22:20:01 local 80 s antes. Imprecisión de
  redacción (clase lección 024); la regla 033 queda satisfecha igualmente
  (exe < inicio < evidencia). Para el acta: horas de operador con zona
  explícita y consistente en notas futuras.
- **(b) P3a sin PNG** (§4a).
- **(c) GIRO-live «degraded, retry N min»** durante toda la sesión
  (5→4→2→19 min, ciclando) — visible en los propios PNG y coherente con el
  span corto GIRO (6.1 h). No afecta a ningún punto adjudicado (p3b usa el
  dato real a 15:55Z EN el cursor, no frescura live); consta para el acta.

## 9. VEREDICTO — CIERRE DEL CICLO TEC-EXT

**APROBADO.** Evidencia verificada por cuatro vías independientes: custodia
(sha256 + tamaño + blob, 4/4 exactos), aritmética (las 4 etiquetas Zone ==
el predicado por-capa sobre los spans declarados, sin excepción),
inspección visual (VLM ×3 pasadas con crops ampliados; slider releído
dígito a dígito) y medición de píxel (24 px de 983.664 = un dígito del
contador en 2,5 min de hold). Puntos 2, 2b y 4 CUMPLIDOS; punto 3 parcial
con (a)(b) cumplidos y (c) aceptado por sustituto con deuda no bloqueante;
gap de consola aceptado con sustituto cuantitativo; lección 040 adoptada.
Los puntos 1 (M=6), 5 (con política §6) y 6 (exe 036/039) ya quedaron
cumplidos y adjudicados en el veredicto 039 §7 — con este veredicto el
marco completo de la mini-premiere queda cubierto.

**EL CICLO TEC-ext QUEDA CERRADO**: análisis 037 → ruling 038 (vía (a)+(b),
unión intacta, anillo-por-cuenta ratificado) → fold 039 (familia 022
cerrada en código, tree gate exacto, barrera ×2) → evidencia 040 (familia
022 cerrada en vivo). El caso 037 — la etiqueta que mentía a las 80 h
mientras el dato decía la verdad — es ahora el estado nominal de la app:
una sola fuente de verdad alimenta Loop/DATA/Zone por capa, la unión
conserva sus bandas como verdad del dibujo, y el doble lectura queda
declarado en tooltips.

**Ledger residual** (no bloquea el cierre; a decisión de David):
- DEUDA 040-3c — malla IRTAM-var @90 h en vivo: captura oportunista en la
  próxima sesión natural (§4c).
- LECCIÓN 040 en protocolo permanente (§6).
- Nice-to-haves pre-existentes: techo duro de disco tec_*.bin · buf[64].
- (Opcional) línea de docs sobre el clamp del slider al cambiar de
  variable.

— GLM. Veinticuatro píxeles de novecientos ochenta y tres mil
seiscientos sesenta y cuatro: ni uno saltó al presente. La etiqueta dice
la verdad, el anillo hereda sin sorprender, y el ciclo TEC-ext queda
cerrado.
