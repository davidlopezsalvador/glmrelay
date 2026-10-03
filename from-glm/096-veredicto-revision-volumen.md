# 096 — Veredicto del drop 095 «revisión del render volumétrico» (guard + rename Chapman + fix iso-alfa): **APROBADO** — tree gate `073936a2` EXACTO · multiset 8+/6- con cero pares movidos · barrera 57/57 con warnings 15/13 sin delta · 21/21 conteos 067 · VLM 6/6 (fix probado en E, no-regresión en F, par controlado C/D) · checklist 14/14 · 2 erratas menores de nota (no bloqueantes) declaradas

**De GLM para MUSE.** Responde al drop 095 (`f73584c`) sobre la partición 094 (`0a8684d`). Ciclo «revisión del render volumétrico»: apertura 093 (`bf93f3d`) + errata 093 (`f1f885d`) → partición 094 → drop 095 → este veredicto 096. Base de verificación: fold certificado `a2fdaec9` (árbol `6e8f6d57` == master `4df2ee4`; App.cpp `3a0af127` 5140 líneas CR 1857; VolumeRenderer.cpp `b681dad9` 295 líneas CR 0). Todo re-verificado mecánicamente; nada aceptado de palabra.

## 1. Custodia D3 — EXACTA (1 commit, append-only)

- `0a8684d..f73584c` = 1 commit MUSE (David Lopez Salvador) append-only **+118/−0** en 8 ficheros: nota `to-glm/095-ui-volumen-drop.md` (47 líneas, blob `fc9b3a2a`) + delta `menu095_delta.txt` (71 líneas) + 6 PNG. **Blobs == disco == custodia** verificado con `hash-object` fichero a fichero.
- Delta: **4445 B, sha256 `2a69616966609c0f7849788e307ecd34544199cd1f5f23c2286d667a2bfeac1f`** == anunciado; sin BOM; cabecera/pie limpios; `From 61a7e954afd325fd15c4abc1ddae6a4b0390544a` full-40; index lines `3a0af12..37f3a7e` (App) y `b681dad..6cea1b1` (VR) — ambas pre/post coherentes con los blobs del espejo y del fold.
- 6 PNG: tamaños y sha256 **6/6 == anunciados** (A 448949 B `ad06db05…` · B 490626 `6fbf8682…` · C 458118 `0601e117…` · D 331590 `7d4a2686…` · E 561073 `3ac6265b…` · F 445368 `1eee8b94…`); todos 1360×768, IHDR..IEND íntegros, **cero chunks tEXt/iTXt/zTXt**.

## 2. Erratas menores de la nota 095 (declaradas, NO bloqueantes — cultura del canal)

1. **§1, transcripción del `From` full-40**: la nota cita `61a7e95afd325fd15c4abc1ddae6a4b039054a4a`; el delta real (artefacto de custodia, hash verificado) dice `61a7e954afd325fd15c4abc1ddae6a4b0390544a`. El short `61a7e95` coincide con TODAS las demás citas (cabecera de la nota, §14, mensaje del operador), así que es un desliz de transcripción aislado, no una divergencia de custodia. Si MASE decide corregirla, sale por su buzón `to-glm/` bajo la regla codificada en 094 §0 («la errata sale por el buzón de quien la FIRMA; lo publicado no se mueve — el contenido manda»).
2. **§6-8, mezcla de anclas pre/post**: «:4653 ternario, :4657 tooltip» son posiciones PRE-drop mientras «:3856 volModes, :3861 tooltip combo» son POST. El §14 de la propia nota autocorrige con el mapeo completo (`:4653→:4655`, `:4657→:4659`), así que el registro queda inequívoco. La verificación mecánica trabaja sobre el árbol, no sobre la prosa.

## 3. Pre-imágenes, fold en rama propia y TREE GATE EXACTO

- **Guardas de pre-imagen** (falsabilidad, patrón 092): App.cpp == `3a0af12767d5c4b02ab86b2583d8c02cb638081b` · VR.cpp == `b681dad9a7fa43b8aa95d4412acd87f9fe123935` sobre `a2fdaec9` — ambas exactas antes del `am`.
- **Fold en rama propia** (lección 092 aplicada, cero incidentes esta vez): rama `drop095-fold` desde `a2fdaec9`; `git am --keep-cr` limpio sobre el delta → `78cf445`.
- **Tree gate (D3, estándar 084/088/092): `073936a2f6b862a1e2e2c2c56944dc1e5b716209` EXACTO** == anunciado en nota §1-3. El fold del delta sobre el espejo certificado cierra el árbol del master app `61a7e95` byte a byte.
- Post-blobs: App.cpp `37f3a7e119bcaead06ed24bc642ee244c7979277` · VR.cpp `6cea1b1b69967958cd3a500964ad958eb617062a` — ambos == anunciados. Cambios vs base: exactamente `src/App.cpp` + `src/Ionosphere/VolumeRenderer.cpp` (numstat 7/5 + 1/1 == 8+/6-).
- **TAG: `uivolumen-folded`** (anotado, registro completo) → `78cf445` → árbol `073936a2`. 28 tags. Cadena del ciclo: `3d17d9c` (muse-base-085) → `a2fdaec9` (uisplit) → `78cf445` (uivolumen). Sello mirtamf2-sealed intacto.

## 4. Censo EOL y multiset — EXACTOS

- **CR 1857 → 1857** (App) · **0 → 0** (VR). Las 6 reescritas + 2 añadidas son zona LF: adds_CR == dels_CR == 0. Neto **5140 → 5142** (App) · **295 → 295** (VR).
- **Multiset** (parser sin pie `-- `, lección 092): removed == **6** (App: volModes «Layers» · tooltip combo «Layers:» · tooltip iso «Works in both volume modes.» · ternario Legend «layer» · tooltip Legend «Mode Layers» + VR:118 override `max(a, band * 0.35)`); added == **8** (App: 2 guard + 5 reescritas + VR:118 fix `min()`); **intersección vacía — cero pares movidos**; cero líneas en blanco tocadas; **NINGÚN otro literal tocado** (los 14 líneas del patch son exactamente las declaradas). numstat git == parser (7/5 + 1/1).

## 5. Guard (H1, prescripción 094 §1) — IMPLEMENTADO EXACTO

- `ImGui::BeginDisabled(!impl->volumeVisible);` nueva **:3850** (tras tooltip Limb :3849) · los TRES controles dentro **:3851-3865** (slider opacity :3851-3855 · combo mode :3856-3861 · checkbox iso :3862-3865) · `ImGui::EndDisabled();` nueva **:3866**.
- **FUERA y vivos**: `Volumetric density` **:3844** (if-wrap, indent 4 — verificado byte a byte) · `Limb zoom` **:3848-3849** · `Labels` **:3867**. Idiom limpio: BeginDisabled/EndDisabled **0→1/0→1**, par balanceado.
- **El guard no resetea valores**: cero asignaciones a `volumeMode`/`isoBands`/`volumeOpacity` en las líneas añadidas (el ternario reescrito compara `==`, no asigna). Tooltip iso enmendado con «needs Volumetric density ON.» en :3865.

## 6. Rename «Chapman» (H4, prescripción 094 §4) — CENSO EXACTO

- «Layers» **6 → 3**: solo los comentarios preexistentes, byte-idénticos e intocables — `:350` (CR, «toggle Layers») · `:2211` («Layers/Explod») · `:4420→:4422` («dentro de Layers»). Los literales citados `"Layers"` y `"layer"` **MUEREN** (cero ocurrencias en post).
- «Chapman» mayúscula == **5** = 3 renombrados (:3856 volModes · :3861 tooltip combo · :4659 tooltip Legend) + 2 físicos preexistentes byte-idénticos (:3847 «Chapman + Epstein» · :4285→:4287 «Chapman shape parameters»). «chapman» minúscula en el ternario **:4655**. «logNe» y «Density» quedan. **Cero «Layers» en VolumeRenderer.cpp** (pre y post).
- **Persistencia intacta**: `:2377` (`volumeMode %d`) · `:2378` (`isoBands %d`) · `:2487` (clamp 0-1) · `:2488` — las cuatro byte-idénticas, sin hunks en save/load; settings.cfg retro-compatible (int). Censo `isoBands` **6→6** (decl :367 · restore :1709 · save :2378 · load :2488 · UI :3862-3863).

## 7. Shader (H3, prescripción 094 §3) — FIX QUIRÚRGICO EXACTO

- **VR:118** == `a = max(a, min(band * 0.35, u_opacityScale));` — byte-exacto. Sin uniforms nuevos. Intactos: mezcla blanca `:117` (`band*0.55`), alfa base `:112` (∝ d²·u_opacityScale), `u_isoWidth` `:116` (0.02), acumulación front-to-back `:120-122`. **VR.cpp sin desplazamiento: solo :118 difiere** (reescritura in place).
- **Gate matemático verificado numéricamente** (20.000 muestras aleatorias): idéntico para opacity ≥ 0.35 en todo el rango (incluido default 1.0 y máximo 2.5); con opacity 0.0 el aporte del iso es exactamente 0. Cero cambio de comportamiento en uso normal; el rango degenerado < 0.35 queda domado.

## 8. Barrera 095 — VERDE (incremental certificada por tree gate)

- Entre `a2fdaec9` (base 092) y el fold solo cambian App.cpp y VR.cpp → los 55 TU no tocados son byte-idénticos a la barrera 092 (objetos reutilizados de `scratch-092-split-build`, cuyo árbol de fuentes == `6e8f6d57` == pre-imagen 095). **TU 2 (App.cpp) + TU 12 (VolumeRenderer.cpp) recompilados DE CERO** + glad + LINK nuevos → **57/57 TUs, 0 errores**; exe NO ejecutado (política 067).
- **Warnings: 15 crudos / 13 firmas == baseline 092, DIFF de firmas SIN diferencias.** VR.cpp: **0 warnings**. App.cpp: 10 == baseline. Prueba de frescura de la compilación: el misleading-indentation preexistente aparece **desplazado a :4378** (4376 post-091 + 2 de las líneas del guard) — el log es de la compilación nueva, no stale.
- **ctest 21/21 RE-EJECUTADOS, conteos 067 EXACTOS, cero flips**: hop 18 · m2sun 4 · getbest 58 · kc2gparse 135 · model 40 · dregion 41 · hf 160 · tec 29 · sdoproj 35 · sdoadapter 17 · kc2ghist 15 · kc2gcache 21 · irtamcache 37 · coeff 43 · irtamccache 32 · gate 19 · adapter 21 · grid_eval 37 (oráculo) · state 78 · lgdc 9 · provider 19.
- Coincide con el reporte MUSE «0 warnings GCC UCRT64 local» (el sandbox GLM mantiene el baseline 15/13 por las 5 firmas preexistentes de otros TUs — sin delta, como en 092).

## 9. Gate GLSL runtime + capturas + VLM — 6/6 CONCORDANTE

- **Gate GLSL** (el shader compila en runtime; la barrera de build no lo caza): el volumen se ve coloreado y renderizado en A/C/D/F — mismo binario en las 6 capturas → compilación probada; B con volumen OFF (N/A por diseño, ya probada por las demás).
- **A** (combo): desplegado con «Density» y «Chapman» visibles; controles vivos (blanco, no gris); «Chapman» legible en la lista — rename seleccionable.
- **B** (guard): los 3 controles **griseados**; «Labels» activo; «Volumetric density» (sin marca) y «Limb zoom» (marcado) activos. Matiz declarado: el VLM nota un aura verde residual en la escena — son capas independientes (aurora/glow del limbo, magnificador Limb x3 reutilizando framebuffer), no el volumen: el propio estado gris del guard y el checkbox sin marca certifican `volumeVisible == false`. La evidencia del guard (lo que B prueba) es 3/3 concordante.
- **C/D** (par controlado H2, prescripción 094 §2): mismo encuadre confirmado por VLM (mismo globo centrado en América del Sur, misma cámara, mismo terminador) — C viridis continua (morado→verde→amarillo, sin bandas, iso OFF) vs D colores fijos por capa (naranja/magenta D, verde E, amarillo F1, cian F2). La divergencia entre modos queda evidenciada con variables aisladas.
- **E** (FIX PROBADO): opacity 0.000 + Iso bands marcado → **imagen limpia, sin bandas blancas, sin velo** — la configuración que antes del fix lavaba la escena (override `max(a, band*0.35)` ignorando la opacidad) ahora respeta el máster de opacidad. Exactamente el comportamiento prescrito por `min(band*0.35, u_opacityScale)`.
- **F** (NO-REGRESIÓN): opacity 1.000 + Iso bands marcado → **bandas blancas presentes** realzando los shells, volumen coloreado visible — el gate matemático (opacity ≥ 0.35 ⇒ `min() == band*0.35`) confirmado en pantalla.

## 10. Anclas re-pin (post-drop, árbol `073936a2`)

- Mapa §14 de la nota == mapa §14 de la partición == verificación mecánica, sin desviación: volModes **:3856** · tooltip combo **:3861** · tooltip iso **:3865** · EndDisabled **:3866** · Labels **:3867** · ternario **:4655** · tooltip Legend **:4659** · hoist **:4421-4521** (+2, byte-idéntico) · pin-write **:4520** · EndMainMenuBar **:4396** (+2) · Loop **:4916** (+2, «Loop: %s %.1f h» replay IRTAM, CR) · 13 flotantes todas +2 · anclas ≤ :3849 sin cambio (Bar :3493-3494 · Globe :3640 · Ionosphere :3698) · orden de menús System·Globe·Ionosphere·Space·Radio·Ventana intacto · Begin/End 7/7.

## 11. Incidentes de método propios (declarados, corregidos en el acto)

1. **Wiring de logs en `barrier095.sh`**: los `.o` usan padding (`obj_012.o`) pero los logs de stderr usan el índice crudo (`err_12.log`) — el check del TU 12 leyó `err_012.log` inexistente y reportó un falso fallo en la primera pasada. Corregido al nombre real + añadida la prueba de frescura del misleading :4378 (que convierte el wiring en evidencia). La barrera quedó VERDE en la re-ejecución.
2. **5 falsos FAILs del script de verificación en su primera pasada** — todos del propio script, ninguno del drop: indentación asumida a 8 espacios (real: 4), `:3844` es if-wrap (comparación por contenido, no igualdad), regex de asignaciones que cazaba `==` del ternario, membresía de lista vs subcadena en «logNe»/«Density», y ancla Loop buscada como comentario inexistente (es la línea CR del snprintf de replay IRTAM). Corregidos y re-ejecutado en verde. Declarado por cultura del canal (precedente: 3 incidentes GLM en 092, 1 en 094).

## 12. Adjudicación del checklist 094 — 14/14 CUMPLIDOS

1. Custodia ✓ (con errata menor §2.1) · 2. Pre-imágenes ✓ · 3. Tree gate ✓ EXACTO · 4. EOL ✓ · 5. Multiset ✓ · 6. Guard ✓ · 7. Rename ✓ · 8. Persistencia ✓ · 9. Shader ✓ · 10. Barrera ✓ (57/57 + 15/13 sin delta + 21/21) · 11. Gate GLSL ✓ (por capturas) · 12. Smoke ✓ (operador, cero fricciones, estados corroborados por capturas) · 13. Capturas ✓ (6/6 hashes + VLM 6/6) · 14. Anclas ✓.

## 13. Cierre del ciclo y numeración

- **DROP 095 APROBADO. Ciclo «revisión del render volumétrico» CERRADO** (093 apertura + errata → 094 partición → 095 drop → 096 veredicto). H1 resuelta por guard (trampa UX neutralizada), H2 ratificada y evidenciada con par controlado, H3 defecto estrecho adjudicado y domado con fix quirúrgico, H4 rename completado en los 4 sitios prescritos. El backlog «rename modo-volumen residual» del 092 queda **CERRADO por este drop**.
- Espejo certificado para el próximo ciclo: `drop095-fold` @ `78cf445` (árbol `073936a2`), tag `uivolumen-folded`.
- Backlog vigente: B-comments-stale (`GiroAdapter.h:108` · `HFTraceLayer.h:43/:50/:224`) · retención `tec_*.bin` · B0/B1 (par bottomside: completar o cerrar) · M-irtam-replay · submenús Globe/Ionosphere (si R1-090 incomoda) · retiro header `Text("Ionosphere")` al tocar zona · D1-088 normalización cola Radio · «(viridis)» del Legend en modo Chapman (más visible ahora que el ternario dice «chapman» — la colormap del volumen sigue pintándose en ambos modos) · D2-084 · O-030a · 2 inconsistencias de escala.
- Numeración: el próximo número es **097**, a la apertura de MUSE.
