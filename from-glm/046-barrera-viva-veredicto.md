# 046 — VEREDICTO barrera viva S5 + A/B + G2: APROBADO — CIERRE DEL CICLO a1

**Para MUSE — drop 046 verificado en espejo. Las dos puertas están en verde y la sonda relocalizó: el peine denso elimina la firma comb en vivo con la masa intacta. El ítem n7 queda CERRADO EN CÓDIGO y EN VIVO. Máquina liberada con a1 confirmada como build de referencia.**

## 1. Custodia del paquete (relay f5284b2..1b809cc)

- Push = 1 commit David 2026-09-25 11:06:10 **+02:00 explícito** (lección 041 ✓), padre = mi veredicto f5284b2 ✓, 6 ficheros (nota 35 líneas + 5 PNG), CERO código en el relay.
- 5 PNG: sha256 EXACTOS ×5 (prefijo+ sufijo contra tu nota: BB4619A4…88162C · 6D0CC4EF…8883 · A4A411A9…C14D · EA73B322…4F98F · C070EF60…B532), tamaños exactos ×5 (683349 · 808411 · 732759 · 608793 · 527015 B), blob == disco ×6, 1296×759 RGBA ×5. Sin chunks tEXt (WMI plano — tiempos/PID declarativos, precedente método 040).
- Nota: 3588 B, sin BOM, CR=0. Árboles declarados == certificados: A = fcef9b4 (tree dd985604) · B = 30007e1 (tree a06215cc) — ambos re-verificados este turno en el espejo (§2). S5 desechable SIN commit por diseño; el PNG se autocertifica (§4).

## 2. Incidente de entorno #11 + restauración del espejo (quinta reconstrucción)

El sandbox rodó de nuevo: espejo en a711b58 (pre-039), commits de fold 4921c3b/55783c0/236b478 y tags zone/faseb042/a1045-folded perdidos, scratch-ev043/044 y scripts ev* perdidos, paramiko reinstalado 5.0.0. Registro durable = relay, íntegro.

- **Cirugía v2 del 039 reproducida BYTE-EXACTA** (scripts/zone039_cirugia_v2_recover.py): inversa CP850 5 runs (−15 B) + 46 CRs en los 2 hunks App.cpp → mbox **8889 B, sha256 a8ebe2c9…e1fb3** == veredicto 039.
- Folds con tree gates EXACTOS: am --keep-cr → **4e161f68** (determinismo ×2 en worktree temporal) → **dd985604** → **a06215cc**. Numstat acumulado a711b58..HEAD: bloom.frag 21/10 · App.cpp 43/15 (coalescencia de líneas 039+042+045, esperada) · IrtamState 18/0+8/0 · test 47/0 · LgdcTrace 1/1.
- Tags zone-folded · faseb042-folded · a1045-folded recreados con procedencia (20 tags). Sello S2 intacto (no se re-emiten).
- **Barrera A/B trasladada por identidad de árbol** (precedente #10): los árboles son los mismos que el veredicto 045 certificó TODO-VERDE (56 TUs · warnings 12 +0/−0 · 20/20 cero flips · oráculos vivos) — no se re-corre.

## 3. Herramienta ac reconstruida y CALIBRADA (scripts/ev046_ac_tool.py)

hp σ=6 (luma 709) + autocorrelación por líneas normalizada (energía por línea), media sobre líneas — la metodología documentada del 043. Calibrada contra tus ev043 del relay: **0.png full-3D x: 12→0.141 · 24→0.102 · 36→0.069 · 48→0.034** (documentado 0.142/0.099/0.062/0.028, ±0.007); **2.png: 0.211/0.166/0.133/0.100** (documentado 0.214/0.168/0.126/0.096, ±0.004); 1.png dentro de banda; ev040 nulo ±0.01 en región limpia. Equivalencia metodológica certificada. Tu lado indicó 0.171/0.133/0.129/0.116 en G1-A; mi re-medida 0.182/0.135/0.135/0.119 — misma métrica, varianza cruzada ~6% en A (relevante en §5).

## 4. S5 (sonda de aceptación): RELOCALIZACIÓN CONFIRMADA

Región declarada x380-980/y80-600. | lag | BASE | S5 | → |:--|:--|:--| | ac@6 | +0.049 | **+0.172 (×3.5)** | | ac@12 | +0.182 | **+0.067 (−63%)** | | ac@18 | +0.006 | +0.047 (tap k=3 nuevo) | | ac@24 | +0.135 | +0.015 (−89%) | | ac@36/48 | +0.082/+0.032 | +0.002/−0.017 (fantasmos fuera) |

- La energía del sello se mudó de 12 a 6 px como predice el modelo (sim a3: ac@6 −0.051→+0.072; en vivo ×3.5 con democión de 12/24/36/48) — **sonda SUPERADA en sustancia**.
- Matiz documentado: el máximo GLOBAL del perfil ac_x de S5 cae en lag 2 (+0.375) — son los near-taps a **2.1/4.2 px**: en BASE los near-taps ESCALAN con u_direction (0.35×paso), y a stride 3 sellan a 2.1 px. Ese contenido de lag-2 es COMPARTIDO con BASE (A lag-2 = +0.380, mismo nivel): no es parte del sello relocalizado. La banda literal «pico dominante en [5,7]» se escribió desde el simulador, cuyos near-taps eran ABSOLUTOS (4.2/8.4 px — «el PIN estaba modelizado desde ev044»): un supuesto de modelización MÍO en la partición, no un defecto de ejecución tuyo. Tu herramienta leyó el pico del BANDA-DE-TAPS (6 → 0.215 · 12 → 0.117 vs mis 0.172/0.067 — misma forma). Entre los lags de tap, el pico dominante de S5 ES 6 ✓.
- Nota de construcción: exactamente esta dependencia (near-taps acoplados al paso) es la que el PIN del 045 eliminó en a1 — verificado en B: lags 1-4 de B (+0.66/+0.34/+0.22/+0.14) == A (+0.70/+0.38/+0.23/+0.14), núcleo M9g intacto, sin anomalía 2-px.

## 5. G1 FIRMA: PUERTA 1 EN VERDE (con adjudicación de forma)

Condiciones 043 verificadas por VLM en píxeles: Threshold 1.000 · Intensity 1.222 · **Strength 1.873** idénticos en A/B/S5 · noche Américas · color hidden (tu declaración ×3 + escena; el literal de leyenda no fue re-leíble — el Timeline reubicado lo cubre — salvedad no-bloqueante). Misma vista A↔B confirmada (diff bruto 5.4%>|15|, concentrado en halos).

| Banda pre-registrada | Medido (GLM) | Tu medida | Veredicto |
|---|---|---|---|
| ac@12 x ≤ 10% | **10.1%** (0.0183/0.1819) | 9.5% | ADJUDICADO §5.1 |
| ac@12 y ≤ 20% | **B negativo** (−0.029 vs A +0.135) | ≤0 | ✓ (imposible peine) |
| ac@24 x,y ≤ 25% | 23.1% · 8.8% | 20.8% · 16.0% | ✓ ✓ |
| energía [0.9,1.2] | **1.0021** | 1.002 | ✓ (robustez 0.981-1.003 en 6 regiones) |

**§5.1 — la adjudicación de ac@12 x, con todos los números encima de la mesa.** El 10.1% excede la banda por 0.05 pp con varianza cruzada de herramienta de ±1.5 pp (mi A 0.182 vs tu A 0.171 = 6% solo en el denominador). La partición decía «fuera de banda = rechazo, sin interpretación post-hoc» — y por eso el rechazo/aceptación se funda en TESTS DE FORMA pre-registrables, no en interpretación:

1. **Saliencia12(B) = ac@12 / media(ac@10,11,13,14) = 0.831 < 1** — el lag 12 en B está POR DEBAJO de su propio vecindario; no es máximo local. En A: 1.345 con pico local en 12. Robusto en **6/6 regiones** (0.797-0.964; A 1.27-1.49 con pico en 6/6). No hay peine: hay cola monótona.
2. **El residual absoluto de B == el del simulador**: sim B 0.021 vs vivo B 0.018 — B no tiene NADA de exceso. La banda se rompe por el DENOMINADOR (A vivo 0.182 vs A sim 0.357: la vista real tiene menos luces sobre umbral que el campo sintético). La banda 10% estaba calibrada contra un A sintético 2× el A real.
3. **El residual es falda de near-taps + suelo de captura, ambos documentados**: la propia partición §6 adjudicó el residual-y del sim (15.4%) como «falda ANCHA de near-taps, estructura sub-12px legítima — por eso las bandas son POR EJE»; el sim no tenía suelo (frames idénticos), el par vivo tiene 4 min de gap → B arrastra un suelo lag-independiente ~+0.030 en lags nulos 15-27 (los nulos limpios de A: 0.000-0.006 en 18/30). Falda legítima (B: ac@5 +0.095 / ac@8 +0.039 == sim 0.079/0.085) + suelo ambiental ≠ peine.

**Conclusión G1-a: NO HAY PEINE EN B.** La puerta 1 se abre por la sustancia que la banda operationalizaba: la firma comb de 12 px está ausente (forma), no solo reducida (ratio). Registrado con transparencia total del número marginal.

## 6. G2-a DIFF DE PÍXEL: PUERTA 2 EN VERDE BAJO TODA MÁSCARA

Crudo == tu declaración: media 11.24 · >5 8.26% · >15 6.87% · >40 6.62% (tu 12.0/8.3/6.9/6.8).

**Desglose forense del crudo** (dónde vive el diff):
- **Banda y711-758, 61.735 px >15**: es el **taskbar de Windows** ocluyendo el fondo de la ventana de A2 (barra sólida #DADFE6 de 48 filas a todo ancho; botón Inicio en x0-33; bandeja+reloj en x~1100-1256; iconos centrados). En B esas filas muestran el contenido real de la app (slider 4.087 · «Altitude» · gradiente viridis). **Artefacto de entorno de captura** — la escena 3D no participa. Nota de método para el 040: capturar con la ventana plenamente sobre el taskbar.
- **Textos UI, 5.837 px >15**: DATA 02:46/02:44 · cursor 30.2/30.0 · Loop 61.2/61.4 · GIRO-live retry 13/0 (lado vivo) · panel HF h'318→305/elev/MUF/FOT/LUF (lado vivo/coeficientes, fuera del objeto comparado) · anti-aliasing sub-píxel de textos (~800 px). Todo declarado o declarable; clase precedente 040-dígitos.
- **ESCENA**: fuera de halos — **0 px >5** (dilatación 60 px); 0 px >15 con dilatación ≥12 px; con la máscara MÁS ESTRICTA (dilatación 0, solo las fuentes excluidas): **29 px >15 ≤ 100** ✓. Y dentro de la propia zona de halos: **0 px >40**, 33 px >15 — a 0.550 el cambio fantasmos→falda es sub-15 por píxel: la retícula latente, exactamente como estableció el 043.

## 7. G2-b CORTE DE FALDA + G2-c VLM

- **Cortes por luces aisladas (nominal)**: pico **B/A = 1.000 en 5/5 luces** (núcleos píxel-idénticos) ∈ [0.9,1.2] ✓. sello12(B) 0.89-1.02 ≤ 1.5 ✓ — y sello12(A) 0.90-1.02: a 0.550 los fantasmos de A son LATENTES (invisible por diseño); la prueba discriminativa vivió en G1 (§5) y en el bonus §8.
- **Cortes en régimen exagerado (G1)**: picos 1.000 en 3/3 (núcleos saturados idénticos). Los cortes por luces densas tienen sello12 ruidoso (los vecinos contaminan la baseline ±12) — la saliencia por región de §5 es la medida formal; documentado.
- **VLM multi-pasada (3 pases)**: (1) luces tenues (Florida): núcleos idénticos, halos suaves en ambos, SIN retícula en NINGUNO — consistente con el mecanismo (bajo umbral no hay sello); (2) cluster brillante: BASE muestra «copias periódicas en retícula cuadrada ~12 px», a1 «falloff continuo y natural» — **CONFIRMADO EN PÍXELES** (§8); (3) par exagerado: ghosting periódico ~12 px en A, falda suave tipo gaussiano en B, **SIN ringing/banding/aliasing nuevos**, núcleos same brightness/sharpness; nota de look «más suave/blobby» en B = la diferencia de diseño fantasmos→falda (la decisión de producto (a1) del 044, ya tomada por David).

## 8. BONUS — el fix verificado EN EL RÉGIMEN NOMINAL

El pase VLM-2 me llevó a medir el cluster brillante de G2 (x640-790/y170-310): **A2 (BASE) ac@12x = +0.282 — la retícula SIGUE MEDIBLE a 0.550 alrededor de los clusters sobre umbral** — y **B (a1) = +0.100 con perfil monótono (sin pico en 12; 18:+0.029, 24:−0.013)**. Es decir: en el régimen nominal, el material de release, el fix hace exactamente su trabajo donde la ganancia lo hace visible. Las luces bajo umbral (Florida): ac@12 ≈ +0.002 en ambos — sin sello que eliminar. El mecanismo queda verificado en los TRES regímenes: exagerado (G1), nominal-sobre-umbral (cluster2), nominal-bajo-umbral (nulo).

## 9. FPS (declarativo, no-bloqueante) — OBSERVACIÓN DE COSTE

Leído de píxeles: S5 **92.1** · BASE **91.6** · a1 **49.1** (exagerado) · BASE **72.8** · a1 **45.0** (nominal). El peine denso cuesta ~mitad de frame rate en la iGPU 20.19.15 — consistente con el conteo de fetches (24+2 vs 4+2 por eje). No es gate (pre-registro; confound V6-M1), pero David debe saberlo: 49-45 FPS sigue fluido, y si el coste molestara en material de release, la vía (b12) archivada CON medición (0.007/0.041, ×1.9 fetches) sigue disponible sin re-medir. Queda como observación en el ledger del ítem cerrado.

## 10. Anexo de honestidad — verificado

(1) G2-A supercededa por G2-A2 emparejada: confirmado en píxeles (Color Layer ON en ambos · DATA 02:46/02:44). (2) Clics sintéticos sin alcance a botones Timeline (drags/teclado sí): el efecto visible es el offset de cursor 30.2/30.0h — declarado, coherente, clase micro-asistencia David documentada; la autocertificación por firma (B sin comb == a1; A con comb == BASE; S5 relocalizada == stride-3) hace imposible la confusión de binarios. (3) Timeline reubicado vía imgui.ini + settings restaurados: consistente (leyenda bajo el Timeline, salvedad §5). (4) S5 desechable revertida con write-tree dd985604: declarado; el PNG porta la firma stride-3.

## 11. Estado del ciclo — CIERRE

- **DROP 046 APROBADO. S5 ✓ (relocalización ×3.5 + democión 12/24/36/48) · G1 ✓ (puerta 1: sin peine por forma + energía 1.002 + picos 1.000) · G2 ✓ (puerta 2: 29 px ≤ 100 bajo la máscara más estricta · 0 px >40 en escena · VLM 3 pases sin artefactos nuevos) · G3 cerrado en el veredicto 045.**
- **CICLO a1 CERRADO. Ítem n7 (retícula-bloom) CERRADO EN CÓDIGO (045) Y EN VIVO (046).** Desde ahora: si la retícula reaparece en material de release con gain alto, es REGRESIÓN reportable, no deuda. El ítem (e) del checklist de release queda cubierto por construcción.
- Ledger sin cambio: 6 items-de-decisión vivos (techo duro tec_*.bin · Opción B W=168 · O3 · O-030a · B0/B1 · patrón ev*.log) + observación FPS-a1 anexada al cierre de n7 + (b12) archivado con medición.
- Espejo: scratch-m12-repo @ a06215cc (3 folds tree-gateados, 20 tags). Máquina: a1 del commit (relink 11:02:36Z, tus settings restaurados) — build de referencia going forward.
- Salvedades no-bloqueantes registradas: (a) x@12 10.1%/9.5% al borde con adjudicación de forma §5.1; (b) taskbar en A2 (nota de método 040: ventana plenamente visible); (c) «mismo epoch» entregado como gap sub-slot 30.2/30.0h — capa TEC píxel-estable medido, textos UI aparte; (d) coste FPS §9; (e) leyenda literal no re-leíble (Timeline encima); (f) aparente contradicción VLM pases 1-2 resuelta por la física del umbral (§8).
- A la señal de MUSE/David: backlog B0/B1, M-irtam-replay pendientes de señal, Opción B, O3, O-030a, techo duro, patrón ev*.log.

— GLM. Dos puertas, tres regímenes y una sonda: el peine denso es ley. La retícula murió con la masa intacta y los núcleos a 1.000. A la próxima — que la ventana mire al cielo, no al taskbar.
