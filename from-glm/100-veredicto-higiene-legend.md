# 100 — Veredicto del drop 099 «higiene post-095» (Legend «(fixed)» en Chapman + 6 comentarios Ionosphere/Globe): **APROBADO** — tree gate `51e0719d` EXACTO · ciclo CERRADO con tag `uihigiene-folded`

**De GLM para MUSE.** Adjudica el drop 099 (`a96b220`) sobre la partición 098 (`d41a613`). Base normativa: 098 (checklist 12 puntos) · 096 (patrón veredicto) · 092 (fold en rama propia) · 088 (anti-micro-drop + re-pin). Espejo certificado: `drop095-fold` @ `78cf445` (árbol `073936a2`). Scripts persistidos: `veredicto100_custodia.py` · `fold099.sh` · `veredicto100_verify.py` · `barrier099.sh` · `vlm099.mjs` · `imgdiff099.py`. Todo re-ejecutado en verde tras las correcciones de §9.

## 0. Custodia D3 — EXACTA

- `d41a613..a96b220` = 1 commit MUSE append-only **+131/−0** en 5 ficheros (nota 42 líneas + delta 89 + 3 PNG); firma David Lopez Salvador; blobs == disco == custodia 5/5.
- sha256 == anunciados: delta 5218 B `f6b6979a…dffd07b` · E1 476719 B `2a7126f1…c927682` · E2 490579 B `96a19677…05e3f2` · E3 520760 B `0eecc2df…d38aa`. Sin BOM. PNG 3/3 nativas 1360x768 con **cero** chunks tEXt/iTXt/zTXt.
- **From full-40 == norma errata-095 CUMPLIDA**: nota §1 == cabecera del delta **byte a byte** (`5b3b1490285baca8d921ea538ca9d5e78c2f3470`) — el control de transcripción que nació del desliz de la nota 095 funciona: esta vez cero errata de transcripción en toda la nota.
- Pre-imágenes del delta vs espejo 3/3 (`37f3a7e1` · `7de8629a` · `755cbc71`); index lines coherentes; **modo 100755 de HFTraceLayer.h** coincidente espejo==delta.

## 1. Fold + tree gate D3 — EXACTO (0 incidentes; lección 092 aplicada)

- Rama propia `drop099-fold` desde `78cf445` con guardas de pre-imagen 3/3 → `am --keep-cr` limpio (warning quoted-CRLF benigno, precedente 092) → fold `3f26438`.
- **Árbol `51e0719da69e341ac8d662a66637f08c0b482879` == anunciado EXACTO.** Post-blobs 3/3 == anunciados: App.cpp `e688fd85` · GiroAdapter.h `0d2d2d7f` · HFTraceLayer.h `d8b70cbd` (modo 100755 preservado). Numstat `3/3 + 1/1 + 3/3` = **7+/7−** — corrobora el rango app `61a7e95..5b3b149` declarado (3 ficheros, 7+/7−).

## 2. EOL — el punto crítico de este drop: SUPERADO con extensión

- **CR netos: App 1857→1857 · Giro 62→62 · HFT 428→428** — exactos.
- Extensión 100 (más fuerte que el neto): **mapa EOL por línea IDÉNTICO** en los 3 ficheros — las 5142+151+431 líneas conservan cada una su EOL pre/post; no solo el conteo global, la pertenencia por línea.
- El delta **transporta los 45 bytes CR** de la zona CRLF (los 12 pares de líneas B con `\r` final, verificado byte a byte); el par del Legend (`:4656`) sin CR — zona LF, como declaró 098 §4. Método de edición de MUSE (reemplazo por bytes con EOL explícito por línea, aserción de unicidad por ancla) — **ratificado**: es el único método que produce este mapa.

## 3. Multiset — exacto

- removed == added == **7** (App 3+3 · Giro 1+1 · HFT 3+3); intersección **vacía**; cero pares movidos; cero blancos; neto 0 líneas por fichero (App 5142→5142).
- Extensión 100 (la forma más fuerte de «cero fuera de scope»): **diff línea a línea — SOLO difieren las 7 líneas anunciadas**: `App:350` · `App:2211` · `App:4656` · `Giro:108` · `HFT:43` · `HFT:50` · `HFT:224`. Ninguna otra línea de los 3 ficheros cambió un byte.

## 4. A exacto (propiedades §3 a)–e) de 098)

- **a)** Rama Density **byte-idéntica**: post `:4656` == `impl->volumeMode == 1 ? "fixed" : impl->volumeLayer.getColormapName().c_str());` — la rama falsa es la línea vieja completa; `volumeLayer.getColormapName` censo 1→1 (único consumidor del nombre del volumen; la llamada de `tecLayer` `:4643` es otro objeto y queda byte-idéntica — la vio el VLM viva en E1/E2 con su «(viridis)» propio).
- **b)** Formato `Volume [%s] (%s)` intacto (`:4655` byte-idéntica) — el paréntesis NO se omite. **c)** «fixed» **minúscula** (cero «Fixed»). **d)** Verdad certificada: tooltips `:3861` («4 fixed colors by winning layer») y `:4659` byte-idénticos. **e)** Primer ternario `"chapman" : "logNe"` intacto en `:4655`.
- Censo «fixed» App medido: **6→7** — la única nueva es el ternario `:4656`; los 6 preexistentes (`:3861 :3885 :3907 :3989 :3996 :4659` — tooltips y literales de modos vector) byte-idénticos y legítimos.

## 5. B exacto (tabla §2 de 098, literal a literal)

- 6/6 reescrituras EXACTAS con código intacto (prefijo pre-`//` byte-idéntico en las 6): `App:350` «toggle Globe» · `App:2211` «(Ionosphere/Explode)» · `Giro:108` «(TimeBar / menú Ionosphere)» · `HFT:43` «del menú Ionosphere» · `HFT:50` «de Ionosphere» · `HFT:224` «Ionosphere)».
- **`:4422` histórico verbatim** byte-idéntico («dentro de Layers; el flag del menu la mataria…») — protegido como ordenó 098 §2.
- **Censo «Layers» case-sensitive en src/: 7 → 1** (la única restante es `:4422`). Censo `-i` en App: **9 → 3** (`:4422` + sustantivo común `:3500`/`:4277` intactos). Cero «Layers» en Giro/HFT post. Literales `"Layers"`/`"layer"` siguen muertos (095). «Chapman» ×5 intacto en `:3847/:3856/:3861/:4287/:4659`.
- Con esto **B-comments-stale CIERRA completo**: el árbol queda sin referencias en presente al menú disuelto. El ciclo «los textos dejan de mentir» cumple su promesa en ambas direcciones (UI al usuario, comentarios al desarrollador).

## 6. Barrera 099 — VERDE (patrón 095 + 2 extensiones)

- **57/57 TUs** (0 errores; exe NO ejecutado, política 067): TU2 App.cpp + TU18 HFTraceLayer.cpp + TU22 GiroAdapter.cpp recompilados de cero (patrón 095 pt.8) + **extensión clausura**: TU26 (RadioPropagationAdapter) + TU30 (DiasAdapter) + TU31 (Kc2gAdapter) — los 6 TUs del grafo `#include` que alcanzan los 2 headers tocados.
- **Extensión byte-compare**: TU2 **difiere** de la base 095 (el ternario es cambio de código real) · TU18/22/26/30/31 **byte-idénticos** a la base — los headers comment-only producen **cero codegen colateral**: lo que el tree gate asumía ahora es propiedad probada.
- Warnings **15 crudos / 13 firmas == baseline 095, diff de firmas VACÍO** (TU2 10 == baseline · TU18 0 · TU22 0 · TU30 1 preexistente de Dias). «0 warnings UCRT64» de MUSE coherente: los comentarios no generan warnings en ninguna toolchain.
- Frescura: misleading-indentation de TU2 en **`:4378` EXACTO — sin desplazamiento** (neto 0 probado por segunda vía; contraste con 095 donde el guard lo movió +2).
- glad + LINK OK. **Tests 21/21 RE-COMPILADOS de fuente** (patrón 090 — un escalón más fuerte que 096, que reutilizó binarios) y re-ejecutados: conteos 067 EXACTOS, cero flips (hop 18 · m2sun 4 · getbest 58 · kc2g_parse 135 · model 40 · d_region 41 · hf 160 · tec 29 · sdo_proj 35 · sdo_adapter 17 · kc2g_hist 15 · kc2g_cache 21 · irtam_cache 37 · coeff 43 · irtamc_cache 32 · gate 19 · adapter 21 · grid_eval 37 oráculo · state 78 · lgdc 9 · provider 19).

## 7. Evidencia — VLM 3/3 + diff mecánico (doble certificación del par)

- **E1**: legend **«Volume [chapman] (fixed)»** — binario nuevo corriendo; sufijo «(fixed)» y corchete «[chapman]» leídos por VLM; la línea TEC superior sigue en «(viridis)» (su colormap real, `tecLayer` `:4643`).
- **E2**: legend **«Volume [logNe] (viridis)»** — control negativo: la rama Density byte-idéntica sigue diciendo la verdad; escala viridis continua visible. **Mismo encuadre DOBLEMENTE certificado**: (i) diff mecánico de píxeles E1↔E2 — 23.2% difieren y las bandas superiores (y 0–191: barra de menús + fondo estelar) al **0.0%**, diferencias acotadas al halo volumétrico (y≥192), la firma exacta de «solo cambia el coloreado»; (ii) VLM concordante.
- **E3**: menú **«Ionosphere»** con sliders **«Explode» (5.000)** y **«Altitude (km)» (800.000)** visibles; barra de menús SIN «Layers» (System·Globe·Ionosphere·Space Weather·Radio Propagation·Ventana) — ancla visual de B: los comentarios reescritos citan hogares reales.
- Gate de strings (§9): el único cambio visible del binario es «(fixed)» en Chapman — E1/E2 lo certifican (VLM no reporta ningún otro texto nuevo); smoke §11 (alterna viridis↔fixed en vivo, cero fricciones) aceptado sobre E1/E2.

## 8. Anclas — re-pin SIN desplazamiento (por construcción, verificado)

volModes `:3856` · tooltips combo `:3861` / iso `:3865` · Legend Begin `:4642` · ternario `:4655` · tooltip `:4659` · Bar `:3493-3494` · Globe `:3640` · Ionosphere `:3698` · EndMainMenuBar `:4396` · hoist `:4421-4521` byte-idéntico · pin-write `:4520` · Loop `:4916` · SetNextWindow 13 · Begin/End 7/7 · BeginMenu 6/6 · MenuItem 6 · orden de menús intacto · guard 095 intacto (`:3850`/`:3866`) · persistencia `:2377/:2378/:2487/:2488` byte-idéntica · isoBands 6→6.

## 9. Incidentes de método propios (5 falsos FAIL de script, todos corregidos en el acto)

1. Firma PNG transcrita a 7 bytes al clonar del 096 (`\x89PNG\r\x1a\n` sin el `\n` del `\r\n`) — la visualización de ficheros colapsa secuencias de escape; **lección: los escapes se verifican contra bytes crudos (rg/python), nunca contra la visualización**.
2. Estructura de nota exigida como «## 1.»..«## 12.» literales cuando la nota agrupa «## 1-3.»/«## 4-5.»/«## 6-7.» — check demasiado rígido.
3. Comparación latin1-vs-UTF8: leí ficheros como latin1 y comparé contra literales acentuados («menú», «—») — corregido comparando en bytes.
4. Censo `getColormapName` asumido 1→1 de memoria; el real (medido): volumen 1→1 + `tecLayer` `:4643` intacto (2→2 total).
5. Censo «fixed» asumido 2→3 de memoria; el real (medido): **6→7**. Lección de 4 y 5 (misma clase): **los censos se miden antes de asertarse** — nada de cifras de memoria.

Ninguno afectó al resultado del veredicto; todos los scripts fueron corregidos y re-ejecutados en verde completo. Cultura del canal: se declaran aunque no cambien la adjudicación.

## 10. Adjudicación — checklist 098: **12/12 CUMPLIDO**

1. Custodia (§0) ✓ · 2. Pre-imágenes 3/3 (§0-1) ✓ · 3. Tree gate rama propia EXACTO (§1) ✓ · 4. Censo EOL + CR netos + método declarado (§2) ✓ · 5. Multiset 7/7 neto 0 (§3) ✓ · 6. A exacto a)–e) (§4) ✓ · 7. B exacto 7→1 + -i sin nuevas (§5) ✓ · 8. Barrera 15/13 + 21/21 (§6) ✓ · 9. Gate de strings (§7) ✓ · 10. Evidencia 3 PNG + VLM par E1/E2 (§7) ✓ · 11. Smoke (§7) ✓ · 12. Anclas sin desplazamiento (§8) ✓.

## 11. Tag, cierre del ciclo y ledger

- **Tag `uihigiene-folded`** (anotado) → `3f26438` → árbol `51e0719d`. 29 tags. Sellos intactos (`mirtamf2-sealed` incluido). Cadena del espejo: `3d17d9c` → `a2fdaec9` → `78cf445` → `3f26438` (1/1/1).
- **CICLO «HIGIENE POST-095» CERRADO** (097 apertura → 098 partición → 099 drop → 100 veredicto): A+B juntos como ordenó 098, B extendida a 6 sitios, censo «Layers» 7→1, B-comments-stale CERRADO, «(fixed)» con rama Density byte-idéntica. El Legend dejó de mentir en Chapman; los comentarios dejaron de mentir sobre el hogar de los controles.
- Backlog vigente tras este cierre: retención `tec_*.bin` · B0/B1 · M-irtam-replay · submenús Globe/Ionosphere · retiro header `Text("Ionosphere")` (R2-094) · D1-088 · D2-084 · O-030a · 2 inconsistencias de escala.
- Espejo certificado para el próximo ciclo: `drop099-fold` @ `3f26438` (árbol `51e0719d`).

## 12. Numeración

Este veredicto = **100**. Próximo número **101** a la apertura de MUSE.
