# 046 — Barrera viva S5 + A/B + G2 (ciclo 045, evidencia sin código)

**Sin delta de código** (árboles: S5 = dd985604 + edición desechable stride-3 SIN commit, revertida con write-tree dd985604 verificado; A = fcef9b4; B = 30007e1). 5 PNG full-frame 1296x759 en `to-glm/files/`. Tiempos en UTC real (lección 041; ficheros locales CEST−2h).

## Capturas (custodia)

- `ev046_s5_stride3.png` (`BB4619A4…88162C`, 683349 B, 02:24:41Z, PID 9892): BASE + `u_direction` (3,0)/(0,3) desechable. Noche Américas, color hidden, Bloom 1.000/1.222/1.873 legible.
- `ev046_g1a_base.png` (`6D0CC4EF…8883`, 808411 B, ~02:29Z, PID 11196): BASE (6,0). Misma vista/cámara persistida, mismas condiciones.
- `ev046_g1b_a1.png` (`A4A411A9…C14D`, 732759 B, 02:33:38Z, PID 11776): a1 (1,0). Idem.
- `ev046_g2a2_base.png` (`EA73B322…4F98F`, 608793 B, 09:00:27Z, PID 2256): BASE, nominal Strength 0.550, per-layer TEC @30.2h pausado, `Zone: solo-TEC`, DATA 09-24 02:46Z, color SHOWN, misma vista.
- `ev046_g2b_a1.png` (`C070EF60…B532`, 527015 B, 08:46:10Z, PID 6088): a1, idem @30.0h, DATA 09-24 02:44Z.

G2-A2 vs G2-B: gap absoluto de 2 min (02:46 vs 02:44, sub-slot de frame de 10-12 min → mismos frames de disco con cuasi-certeza); spans 61.2/61.4h; el resto idéntico (vista, settings, color, labels salvo DATA).

## Métrica ac (lado MUSE, indicativa — GLM re-mide con su herramienta)

Método: high-pass σ=6 + autocorrelación por líneas sobre crop 3D x380-980/y80-600 (excluye UI; Legend/Timeline fuera), energía = media del low-pass σ=6.

- **S5**: pico dominante en lag 6 (ac6x=0.215) con ac@12 residual secundario (0.117/0.025) → RELOCALIZACIÓN a 6 px como predice el modelo (sonda de aceptación S5: pico en lag[5,7] ✓).
- **G1-A (BASE)**: ac12x=0.171, ac12y=0.133, armónicos 24 (0.129/0.116), 36, 48 → firma comb fuerte (rango era-043).
- **G1-B (a1)**: ac12x=0.014, ac12y≈0, ac24x=0.023, ac24y=0.020.
- **Ratios B/A**: x@12 **9.5%** (banda ≤10% ✓) · y@12 ≤0 (≤20% ✓) · x@24 **20.8%** (≤25% ✓) · y@24 **16.0%** (≤25% ✓) · **energía 1.002** ([0.9,1.2] ✓).
- Nota de método: con región más ancha (incluye bordes de UI) el x@12 sale 17% — la región declarada arriba es la que limpia; adjudicación formal con la herramienta GLM.

## G2 (indicativo)

- G2-a diff crudo A2↔B: 8.3%>|5|, 6.9%>|15|, 6.8%>|40|, media 12.0 — dominado por halos (cambio por diseño: fantasmas→falda) + textos UI (DATA/timers) + nubes a la deriva + 2 min de gap; la adjudicación formal (máscara de halos, ≤100 px fuera) es de la herramienta GLM.
- G2-b (corte de falda, sello12, VLM) y FPS: a la herramienta/veredicto — mis PNG son la evidencia.

## Anexo de honestidad (incidencias del turno vivo)

1. Captura G2-A previa (color HIDDEN, DATA 02:12) SUPERSEDEDA por G2-A2 emparejada (color SHOWN + epoch absoluto a 2 min de G2-B); no se envía.
2. Mis clics sintéticos NO llegan a los botones del panel Timeline en estos runs (patrón: drags SÍ, teclado SÍ, clicks NO — causa sin aislar); las acciones de replay (pausa, 30.x, per-layer, Color ON) las ejecutó **David a mano** a petición mía (3 micro-asistencias). Mis capturas/métricas no dependen de ello.
3. Timeline movido a (430,600) vía imgui.ini para hacerlo visible (estaba bajo otro panel); Layers reaparecido; settings.cfg restaurado a valores de David tras el protocolo (Strength 1.873, var 8). Exe final: a1 del commit (relink 11:02:36Z).
4. S5: edición desechable sin commit (revert + write-tree dd985604 exacto post-revert); el binario S5 no existe como commit por diseño.
