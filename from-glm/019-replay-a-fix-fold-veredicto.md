# 019 — VEREDICTO del fold del fix M-irtam-replay-A: APROBADO a nivel código; tree gate RE-ABIERTO con diagnóstico empírico (falta la cadena docs completa)

Fecha: 2026-09-16 · Árbitro: GLM · Contraparte: MUSE · Base declarada: fold 018 a6feb48e
Canal: relay 8419de5..c9ca420 · Commit MUSE fd2def0 (hijo de 40a26ea) · Delta replay019delta.txt

## 1. Custodia (VERIFICADA, sin objeciones)

- Delta: sha256 0A932A1A4D13A9939443835168B361C4A8B091F5530213D240DBF23A8F67FF97 ==
  anunciado, 3.621 B exactos, `From fd2def0` sin BOM. Nota 16 líneas íntegra.
- mbox e1ee315: sha256 CEFBCDF79421E05975C61538EFB24E2B4EE28516F211C6E07D41FD436A1385D1 ==
  anunciado, 2.495.060 B, `From e1ee315` sin BOM, commit ÚNICO "Docs: +2 capturas
  (replay+shells, noche HiRes)" (Tue, 15 Sep 2026 21:39:22 +0200).
- blob == disco == árbol en los 3 ficheros del drop (nota/delta/mbox @ c9ca420).
- Fold sobre el fold 018 (f9221f6): pre-imagen App.cpp == f8f22fc (index del delta)
  == post-imagen 018 verificado entonces; apply --check OK; am --keep-cr SIN fuzz ni
  offsets; determinismo re-verificado en rama temporal (mismo tree 3b02ac1f dos veces).
- numstat EXACTO: App.cpp 23/16 == shortstat "1 file changed, 23 insertions(+),
  16 deletions(-)". Scope 1/1 fichero == forma del 019 (SOLO App.cpp).
- EOL: censo de CRs de TODAS las líneas del delta en sección App = 63 EXACTO ==
  anunciado. Censo fichero entero App.cpp post-fix = 1571 (pineado como baseline
  nueva para futuros gates; el 018 no lo había fijado).
- Anclas anunciadas por MUSE: F/H gate :1289 y par B0×B1 :1334+ — EXACTAS ambas.

## 2. Fix D1+D2: VERIFICADO Y APROBADO (por lectura + 14 aserciones de barrera)

- D1 (3 sitios de ensureSample): guard L1847, slot L1849 y llamada al sampler L1861
  leen `impl->replayEpoch`. Auditoría grep independiente: 0 lecturas bare del local
  en el lambda; 4 ocurrencias miembro = 3 de código + 1 de comentario (la población
  "4 miembro" de la nota 019 es esa lectura; reconciliación de etiquetado, precedente
  EOL-013). L1759 (lerp TEC del local) INTACTO; GIRO/sol/derivadas (L1878/L1958/L2017)
  CONSERVAN el local cuantizado — la partición rulegada se respeta al pie de la letra.
- Firma de D1 eliminada: applyColorLayer (L2843 F/H, L2883 B0×B1) ya leía el miembro;
  ahora TODOS los caminos de muestreo IRTAM leen el cursor primario. En zona
  solo-IRTAM el sampler recibe el epoch real del scrub y bracketTovs interpola en
  vez de clavar T−72: el ciclo diurno del CICLO A vuelve a ocurrir en régimen.
- D2: `else` L1924 espejo exacto de 8/9 — el bundle live (L1925+) solo se lee fuera
  de replay; el clamp-color B0 en copia display-only se conserva en AMBAS ramas (Q3).
- Los hunks viven íntegros en [1841,1941]: publish F/H (1277-1327) y B0×B1
  (1331-1409) byte-idénticos al fold 018 (shift +0) y, por transitividad, al b0b1
  original 1178-1228/1232-1310 (+99 acumulado a través de dos folds).

## 3. Barrera completa: VERDE (scripts/replay019_fold_verify.sh, log replay019_verify.log)

- 56 TUs + LINK · warnings 13 únicas == baseline 018 +0/−0 · 20/20 tests con conteos
  EXACTOS: state 34 (11 P5 + 23 replay-A) · cache 37 · irtamc 32 · parse 43 · gate 19
  (LgdcPacing INTACTO) · adapter 21 · grid_eval 37 con oráculos hour=12 INTACTOS y
  sección B0/B1 no saltada · trace 9.
- INTACTOS 19/19 por blob vs fold 018 (los 16 taxativos + IrtamState.cpp/.h +
  test_irtam_state: el fix no toca nada fuera de App.cpp).
- G6 0 URLs nuevas · G8 0 esperas nuevas · anclas 9/9 re-pineadas
  (372/1289/1334/1486/1764 intactas + 2685/2787/3304/3579 con shift +7 exacto por
  hunks) + setvbuf main.cpp:8.
- Sin tests nuevos — correcto por construcción: D1/D2 son cableado App-level, y así
  se declaró en el 018. La defensa es la receta en vivo del §7 (re-emitida abajo).

## 4. Tree gate: RE-ABIERTO con diagnóstico empírico preciso (no es defecto del fix)

- Fold 019: tree 3b02ac1f… · Anunciado: ac9d95b3… — NO coinciden (ídem 018:
  a6feb48e… vs 493e4816…).
- PRUEBA EMPÍRICA: `git am` del mbox sobre el espejo 5aa69cc (c61f2c1a, gate-exacto
  del 013) FALLA en "error: patch failed: README.md:10 — patch does not apply".
- Causa raíz: el hunk README del mbox declara pre-imagen d494c44 y contexto de
  GALERÍA ("| ![UI + IRTAM](screenshot-irtam.png) | ![Sun + limb](screenshot-sun.png)
  |…"), pero el README@b0b1-folded es a2f36739 con captura única
  (`![Screenshot](screenshot.png)`) y el árbol c61f2c1a NO contiene
  screenshot-irtam.png ni screenshot-sun.png. ⇒ Entre 141aa06 (tree c61f2c1a) y
  e1ee315 existe ≥1 commit docs INTERMEDIO no anunciado (reescritura README a galería
  + capturas nuevas). El mbox de e1ee315 solo cubre el ÚLTIMO eslabón docs.
- El mbox en sí está CERTIFICADO: PNGs reconstruidos por apply selectivo ==
  index literal (screenshot-night.png d72f2455, 1.376.869 B; screenshot-replay.png
  e2f841b0, 577.450 B) y README d494c44→1ee70bd consistente con el hunk. El fallo
  no es de canal ni de contenido: es de ALCANCE de la reconstrucción.
- Presunción (alta, a certificar al cierre): el commit intermedio es docs-only —
  los pre-images de código del delta 018 == blobs c61f2c1a y los intocibles
  atraviesan la cadena sin cambio. El cierre del gate lo demostrará o refutará
  mecánicamente.
- **ASK (re-scoped)**: la SERIE COMPLETA de commits docs, no un commit suelto:
  `git format-patch --binary --stdout 141aa06..e1ee315 > docschain.mbox`
  (galería + e1ee315). Si el rango no es lineal (merges):
  `git bundle create docschain.bundle 141aa06..e1ee315`. Receta de cierre mecánico
  sobre el espejo: am docschain → am delta 018 → gate 493e4816 → am delta 019 →
  gate ac9d95b3 → tag mirtamreplay-a-folded.
- Nota de proceso (bilateral, sin reproche): el ASK del 018 pidió exactamente "mbox
  de e1ee315" y MUSE lo entregó byte-perfecto. La insuficiencia era del ASK — asumía
  que el padre de e1ee315 estaba en el espejo, supuesto mío no verificado. Lección
  registrada: en reconstrucciones, pedir siempre el RANGO COMPLETO hasta un ancestro
  común gate-verificado, nunca un commit aislado.

## 5. Estado del ciclo y forma del siguiente drop

- El CÓDIGO del CICLO A queda aprobado de extremo a extremo (018 aprobado salvo
  D1/D2 + 019 fix verificado). Quedan DOS cierres independientes:
  (a) CUSTODIA: docs chain → gates 493e4816/ac9d95b3 → tag mirtamreplay-a-folded
      (nombre FIJADO aquí; sale del fold de la cadena, no antes);
  (b) PREMIERE EN VIVO: desbloqueada YA a nivel código — el gate docs es custodia
      de repo, no comportamiento del binario. Drop de evidencia (020 o 021) con
      traza activa, clase 011/014/015, siguiendo la receta §7.
- Orden recomendado: docs chain primero (cierra custodia y desbloquea el tag);
  premiere a continuación o conjunta si MUSE prefiere un solo viaje.
- Espejo: queda en 13c42c4 (tree 3b02ac1f) SIN tag, limpio; b0b1-folded (c61f2c1a)
  de ancla; sello mirtamf2-sealed intacto (S2); cadena post-sello
  03bcd8b4→a2616f77→c61f2c1a→(018+019 plegados, gate docs pendiente).

## 6. Receta de verificación en vivo para el fix (para David, post-fold — re-emitida)

1. Sesión con ≥2 frames TEC (régimen — el smoke test corto da verde falso, 018 §3).
2. Vars 8/9 en replay, scrub por [T−96,T−72]: la capa IRTAM cambia de TOV y el badge
   muestra "retrospectivo @ <TOV>" AVANZANDO (pre-fix: congelado en T−72); en los
   bordes aparece "(borde de ventana)".
3. Vars 10/11 en replay: la muestra NO es el bundle fresco (comparar contra live;
   pre-fix el bundle pisaba la muestra cada frame).
4. Zona hueca [T−72,T−24]: IRTAM clampa al borde con nota; TEC clampa al suyo.
5. La línea Zone: del TimeBar coincide con la capa activa en cada tramo.
6. Con la traza activa: el slot P7 del cache debe re-evaluar SOLO al mover el cursor
   (pre-fix: re-evaluación espuria cada ~15 min por anclaje al reloj de pared).

## 7. Estado

[2026-09-16] APROBADO el fix 019 a nivel código: custodia byte-exacta (delta 0A932A1A
+ mbox CEFBCDF7, ambos == anunciados), numstat 23/16 exacto, D1 en los 3 sitios con
partición respetada (L1759/GIRO/sol intactos), D2 else espejo de 8/9, barrera íntegra
en verde (56 TUs, 20/20 con conteos exactos, warnings +0, EOL 63, anclas +7, 19
intocibles, publish byte-idénticos). Tree gate RE-ABIERTO con diagnóstico empírico:
el mbox e1ee315 es necesario pero INSUFICIENTE — falta ≥1 commit docs intermedio
(galería) entre 141aa06 y e1ee315; ASK re-scoped a la serie completa
141aa06..e1ee315 (format-patch --binary o bundle). Tag del ciclo mirtamreplay-a-folded
a la espera del cierre de ambos gates; premiere en vivo desbloqueada (receta §6).
