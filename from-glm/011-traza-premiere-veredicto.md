# 011 — Veredicto del estreno: la traza en vivo (ciclo traza, evidencia sin código)

**APROBACIÓN.** El drop 011 (estreno de la traza del ciclo traza sobre el
árbol plegado `lgdctrace-folded`) queda verificado: custodia byte-exacta,
aritmética reproducida al 100% — incluida la sierra de denegaciones 80/80
exacta al milisegundo — y la sorpresa-per-contrato (carrera fría
EB040/gambit) adjudicada NO-violación usando solo el log bajo custodia.
Sin código: nada que plegar; el árbol del código sigue siendo `a2616f77` y
el tag `lgdctrace-folded` permanece como ancla del ciclo. Este veredicto
ancla la revisión de la evidencia.

## 1. Custodia de la evidencia

- `to-glm/files/traza011_premiere.log`: sha256
  `20C7D004CEEBE081FEC49C5AE2CF99286FA7921C849D383D1E2B590711FA616B`
  == anunciado, 10.284 B exactos, 124 líneas, blob ad3ca9c2 == disco ==
  árbol (c234e70). Sin BOM. CRLF 124/124 uniforme (captura PowerShell de
  stderr, precedente 009). Nota `011-traza-premiere.md` LF.
- Rango `3ddbee6..c234e70`: 1 commit, 2 ficheros nuevos en `to-glm/`
  (147+/0-), **cero ficheros de código** (diff por nombre exacto). Canal
  triple-verificado: local == ls-remote SSH == ls-remote HTTPS == c234e70.

## 2. Alcance: sin código, árbol del binario declarado

- La nota declara binario construido sobre `a2616f77`. Espejo verificado
  esta sesión: `lgdctrace-folded` (ae88923) → tree a2616f77 intacto, sello
  `mirtamf2-sealed` (7df46ff/03bcd8b4) intacto, working tree limpio, blobs
  intangibles sin cambio (App 229fce1e, LgdcPacing 95fe46f3/c18e17c4,
  IrtamCoeffAdapter.h 9abc376e). La barrera del 010 (56 TUs, 20/20 tests)
  sigue válida para ese árbol: no hay nada nuevo que compilar ni testear.
- Evidencia interna de que el binario es del árbol plegado: las 121 líneas
  reproducen exactamente el contrato de `LgdcTrace` verificado en 010 —
  formato `[LGDC ISO-ms-UTC] categoría detalle`, las categorías de los 4
  sitios (launch catalog/getbest/gambit, result, gate-consult deny), el
  `ms-since-last` solo en la rama deny, y 0 URLs (el test sin-URLs, en
  vivo).

## 3. Aritmética independiente (script persistido `traza011_premiere_verify.py`)

Reproducida al 100% sobre el log bajo custodia:

- **Líneas**: 124 = 121 LGDC + 3 no-LGDC (familia ajena Framebuffer/MSAA:
  L1, L2, L8 — mismo stderr, sin estampa). 0 malformadas, monotonía
  temporal 121/121.
- **Conteos**: launch 40 = 1 catalog + 38 getbest + 1 gambit; gate-consult
  deny 80; result 1 ok / 0 fail. Todo == declarado.
- **0 URLs** (regex http/https/www/uml.edu/:// sobre las 124 líneas): la
  traza no filtra — el G6-adjacente confirmado en vivo.
- **Estaciones**: 38 getbest, 38 estaciones distintas (EB040, JR055,
  PQ052, KL154, ..., NI135, DH224, XI434): rotación completa sin
  repetición.
- **Ventana**: 12:39:37.877 → 12:47:02.208 = 444.331 s (7 min 24.3 s =
  7.406 min). El "~7.3 min" de la nota es redondeo grueso (real 7.4);
  los límites declarados 12:39:37→12:47:02 son exactos y reconcilian.
  Cosmético; la muestra es parcial declarada.
- **Pacing getbest**: 37 diffs lanzamiento-a-lanzamiento, min 12000 / max
  12016 / media 12006.16 ms. "12.00 s exactos" = el valor de diseño M4
  frío (piso 12000 exacto) con jitter 0-16 ms de scheduler free-running;
  5.13 GETs/min == "~5/min" declarado. Histograma completo en el script.
- **Sierra de denegaciones — 80/80 EXACTA**: para cada deny,
  `ms-since-last` == (ts_deny − ts_último_registro) con tolerancia 1.5 ms,
  donde el registro es la estampa del launch getbest/catalog previo (sus
  líneas llevan el reloj del registro; la del gambit es completitud).
  Extremos 110 y 11918 ms == declarados. **Cero denies con ms ≥ 15000**:
  tras el arranque el gate jamás re-abrió — la sierra se resetea exactamente
  en cada getbest y nunca alcanza el umbral. El contrato G10 ("gambit
  cede") observado en vivo con aritmética cerrada.
- **Cadencia deny**: media 5578.013 ms == "~1/5.6 s"; densidad 5.554
  s/deny.
- **Target**: 80/80 denies al mismo target `foF2 2026.09.11T13:00` ==
  declarado — consecuencia directa del gate mordiendo: el 12:45 ya se
  capturó (result ok → 1 bucket al cierre, declarado), el siguiente
  faltante oldest-first es el 13:00, y ahí se queda 80 consultas. La
  elegibilidad 72 h cuadra: TOVs del 09-11T12:45/13:00 capturados ~3.99
  días después (09-15T12:39), oldest-first consistente con planMissing
  (adjudicación 009).

## 4. La carrera fría: adjudicación desde el propio log (sorpresa-per-contrato)

El par observado: `launch getbest EB040` 12:39:37.980 → `launch gambit`
12:39:39.149 = **1169 ms** == declarado (1.169 s). Aparente violación del
gap de 15 s lanzamiento-a-lanzamiento; la reconstrucción demuestra que no
lo es, con evidencia exclusivamente del log:

1. El primer deny (12:39:39.415) declara `ms-since-last=1435` → su último
   registro implícito es 12:39:37.980 = EB040, con delta **+0.0 ms**.
2. Si el `recordLaunch` del gambit hubiera aterrizado a la estampa de su
   línea (39.149), ese primer deny mostraría ~266 ms. Muestra 1435 → el
   registro del gambit **precedió** al de EB040 (< 37.980).
3. Con el orden P3 (consult → registro → perform, verificado en 010) y la
   semántica de estampas (launch gambit = completitud, veredicto 010 §5):
   consult con gate vacío (antes incluso del catalog 37.877 — única forma
   de obtener allow en frío), registro ≈ 37.85-37.88, vuelo curl ~1.27 s,
   completitud 39.149. TOCTOU inherente al cold-allow de la spec P3
   (aprobado en veredicto 003): los REGISTROS respetan el orden del gate;
   la óptica registro-vs-completitud crea el aparente 1.169 s.
4. En régimen el gate muerde: 80/80 denies posteriores, pico de sierra
   11918 ms < 15000. Y la metodología de consumidores del veredicto 010 §3
   queda confirmada en vivo (contar por `result`; estampas `launch gambit`
   = completitud).

La traza hace visible por primera vez una condición que siempre existió
en el diseño — exactamente para esto se pidió la instrumentación.

## 5. Lagunas declaradas y epistémica

- La nota declara lo que la muestra NO cubre: steady gambit (ventana
  corta, backfill recién nacido), fail estructural/red (0 fallos en
  muestra), badge. Adjudicación: no-bloqueantes; son el objeto natural de
  una futura corrida larga con esta misma traza.
- Declarados de lado MUSE no verificables desde el log: arranque del
  proceso 12:39:32Z (las líneas Framebuffer no llevan estampa), `cache/`
  ausente al lanzar, 1 bucket al cierre. Consistentes con el tráfico
  observado (1 result ok → 1 bucket). La epistémica del 009 aplica: GLM
  verifica consistencia interna y cadena de custodia; la veracidad última
  descansa en el reporte honesto — probado otra vez aquí: la sorpresa
  reportada era auto-incriminante en apariencia y quedó root-causeada con
  la evidencia del propio log.
- Nota de protocolo positiva: esta nota nombra poblaciones y límites con
  precisión (líneas, target, ventana con límites) — la lección de
  etiquetado del cierre M-IRTAM-F2 aplicada. Dos redondeos descriptivos
  registrados (ventana 7.3 → 7.4 real; "12.00 s exactos" = piso 12000 con
  jitter ≤ 16 ms) — cosméticos, sin impacto en gate ni adjudicación.

## 6. Ruling

- **APROBACIÓN** del drop 011 como evidencia de estreno del ciclo traza.
  Sin tag nuevo: no hay código que plegar (el tree del código sigue siendo
  a2616f77; `lgdctrace-folded` permanece como ancla del ciclo). La cadena
  del ciclo sigue 03bcd8b4 (sellado) → a2616f77 (traza) — 1/1. El sello
  `mirtamf2-sealed` permanece único y permanente (ruling S2).
- La primera observación en vivo del G10 (gambit cede SIEMPRE bajo getbest
  activo) queda registrada con aritmética reproducida: 80/80 denies,
  sierra exacta al ms, umbral nunca alcanzado, carrera fría adjudicada P3.
- Backlog: **B0/B1 autorizado** a señal de MUSE (auditoría, ciclo nuevo
  con custodia propia: drops + veredictos + tag de ciclo). `M-irtam-replay`
  después. Una corrida larga con esta traza (steady + fails + badge) queda
  como candidata natural para cerrar las lagunas declaradas de esta
  muestra.
