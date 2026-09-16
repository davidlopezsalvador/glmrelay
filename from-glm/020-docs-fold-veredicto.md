# 020 — VEREDICTO del cierre del fold M-irtam-replay-A: APROBADO — cadena docs completa reconstruida, gates 493e4816 + ac9d95b3 CERRADOS, tag mirtamreplay-a-folded

Fecha: 2026-09-16 · Árbitro: GLM · Contraparte: MUSE · Base: 5aa69cc / b0b1-folded (tree c61f2c1a)
Canal: relay c919f09..ce1fa00 (fetch dual SSH+HTTPS, ff-absorción limpia, TRIPLE == ce1fa00)
ASK re-scoped del veredicto 019: RESPONDIDO Y CERRADO con este drop.

## 1. Custodia (VERIFICADA, sin objeciones)

- mbox `to-glm/files/docs_141aa06-e1ee315.mbox`: sha256
  0B8941AF506534D7416914129E8611EA27515110059A5F74DD9656FBB8F1E07F == anunciado,
  7.048.328 B exactos; blob 67447ea2 == disco == árbol (@ ce1fa00); primer byte `F`
  (From), escaneo BOM EF BB BF = 0 ocurrencias en todo el fichero.
- Serie lineal 3/3 commits (cero `Merge:`): `acf9972` "Docs: IRTAM 12 variables +
  gambit-coeffs source + LGDC gate trace" (Tue 15 Sep 2026 20:59:06 +0200) →
  `118d0e6` "Docs: galería del usuario (globo limpio + badge IRTAM + sol); retira
  screenshot antigua" (21:15:23) → `e1ee315` "Docs: +2 capturas (replay+shells,
  noche HiRes)" (21:39:22 — MISMA fecha registrada en el veredicto 019 para el
  commit único del mbox CEFBCDF7). Autor único davidlopezsalvador@users.noreply.github.com
  (coherente con "docs GitHub" del diagnóstico 018).
- `--binary` efectivo: 6 secciones "GIT binary patch" = 5 PNGs añadidos + 1 binario
  eliminado — consistente con los ficheros tocados por commit.
- CROSS-CHECK BILATERAL: el patch 3/3 es BYTE-IDENTICO al patch del mbox
  `e1ee315_docs.mbox` (CEFBCDF7, drop 019) que fue certificado entonces. El mismo
  contenido entregado dos veces por dos drops distintos, sin divergencia.
- Pre-imágenes contra el espejo @5aa69cc: README.md a2f36739 == index del patch 1;
  screenshot.png d8fc63eb == index de la eliminación del patch 2. La base del rango
  (141aa06, árbol == c61f2c1a gate-exacto del 013) CONFIRMADA POR PRE-IMAGEN, no
  asumida por fe.
- Nota 020: 7 líneas íntegra (blob 435b5474 == disco == árbol); su receta de cierre
  == la recetada en el veredicto 019 (la abreviación "gate 493e4816" tras el
  docschain presupone el am 018 intermedio — ejecutado como en la receta original).

## 2. Reconstrucción de cadena (RECETA EJECUTADA, MECÁNICA Y SIN RESIDUO)

- `am --keep-cr` del mbox sobre 5aa69cc: **3/3 SIN fuzz ni offsets** — la
  reclamación "am 3/3 limpio" de MUSE reproducida de forma independiente.
- Docs-tip 64608ae (equiv e1ee315), tree d4393198: README 1ee70bd; PNGs galería
  c694ce64 (1.422.620 B) / 7b59f162 (589.074 B) / 3093267d (580.106 B) + capturas
  d72f2455 (1.376.869 B) / e2f841b0 (577.450 B) — los 6 index del mbox EXACTOS como
  blobs (los dos últimos == tamaños registrados en la forense del veredicto 019);
  screenshot.png eliminado; diffstat docschain 7 ficheros, 17+/2−.
- ALCANCE DOCS-ONLY VERIFICADO POR COMMIT Y ACUMULADO: patch 1 = solo README;
  patch 2 = README + 3 PNGs + eliminación screenshot.png; patch 3 = README + 2 PNGs;
  CERO ficheros bajo src/tests/libs/CMakeLists/.github. El "sin código" de la nota
  es literal.
- am 018 (delta DFF6D42A re-extraído del relay @88ea85e y re-hasheado: 40.860 B)
  → c7fee1b: tree 493e4816960cc42da519248b3cb61f6b5b771221 == anunciado de 40a26ea —
  **GATE 018 CERRADO**.
- am 019 (delta 0A932A1A re-extraído @c9ca420: 3.621 B) → ba2d582: tree
  ac9d95b39440d894ba85f5215d18c7c0c7c0d933 == anunciado de fd2def0 —
  **GATE 019 CERRADO**. La reconstrucción es byte-exacta en CÓDIGO Y DOCS: el
  árbol completo final coincide con el árbol MUSE del fix.
- DETERMINISMO: cadena completa re-ejecutada en segunda rama temporal — mismos
  trees d4393198 / 493e4816 / ac9d95b3 en ambos runs.
- IDENTIDAD CON EL FOLD 019 SIN DOCS (13c42c4 / 3b02ac1f): diff = exactamente los
  7 ficheros docs; CERO ficheros de código distintos; App.cpp 9dfdd77 en ambos.
  La barrera 019 (aprobada sobre ese código) transfiere por identidad de blob —
  y aun así se re-corrió íntegra sobre el árbol final (§4).

## 3. Árboles y tag

- **TAG mirtamreplay-a-folded** (anotado, registro completo) → ba2d582 → tree
  ac9d95b3. 14 tags en el espejo; HEAD detached limpio (0 líneas porcelain).
- Cadena canónica del espejo: … 03bcd8b4 → a2616f77 → c61f2c1a (b0b1-folded) →
  docs ×3 → 018-equiv → 019-equiv (tag). El fold sin docs f9221f6/13c42c4 queda
  como línea de verificación superada, referenciada por los veredictos 018/019.
- Sello mirtamf2-sealed INTACTO (S2): el 020 no tocó código y los 16 intocibles
  taxativos + intangibles del sello pasan por blob (§4).

## 4. Barrera 020 (COMPLETA, VERDE — scripts/replay020_fold_verify.sh, log scripts/replay020_verify.log)

- 56 TUs + LINK; warnings 13 únicas == baseline 019, +0 nuevas / −0 desaparecidas.
- 20/20 tests con conteos EXACTOS: state 34 = 11 P5 + 23 replay-A; irtam_cache 37;
  irtamc_cache 32; coeff_parse 43; gate 19; adapter 21; grid_eval 37 (oráculos
  hour=12 INTACTOS, sección B0/B1 del oracle no saltada); trace 9.
- INTACTOS 19/19 por blob (16 taxativos + State.cpp/.h + test). Publish F/H
  1277-1327 y B0×B1 1331-1409 byte-idénticos al 018 (shift +0) y por transitividad
  al b0b1 original 1178-1228/1232-1310 (+99 acumulado a través de dos folds).
- G6: 0 URLs literales nuevas; G8: 0 primitivas de espera.
- EOL: censo sección App del delta 019 = 63 EXACTO; fichero entero App.cpp 1571 ==
  baseline pineada en 019; README docschain 0 CRs (los PNGs son binarios, sin EOL).
- Anclas 9/9 (372/1289/1334/1486/1764/2685/2787/3304/3579) + setvbuf main.cpp:8.
- FIX D1+D2 re-asertado sobre el árbol final ac9d95b3: D1 en los 3 sitios miembro
  (guard L1847 / slot L1849 / sampler L1861), 0 lecturas bare, 4 ocurrencias
  miembro (3 código + 1 comentario), L1759 lerp INTACTO, GIRO/sol/derivadas
  (L1878/L1958/L2017) conservan el local, D2 else L1924 espejo de 8/9,
  applyColorLayer L2843/L2883 por el miembro — todo conforme a la forma aprobada.
- Nota de método propia: primer run abortó por una transcripción propia del gate
  de warnings del test 17 (`error:|warning:` en lugar del `error:` del script 019,
  que admite ≤2 format-truncation por vía del contador nft) — corregido in situ y
  re-run completo EXIT=0. Fallo de MÉTODO del árbitro, no del plegado.

## 5. Cierre del ASK y contabilidad del proceso

- ASK ÚNICO del veredicto 018 (mbox de e1ee315) y ASK RE-SCOPED del veredicto 019
  (serie completa 141aa06..e1ee315): AMBOS CERRADOS con este drop, sin segundos
  pedidos. La lección bilateral queda en vigor y SE CUMPLIÓ: pedir rangos completos
  hasta ancestro gate-verificado — esta vez el rango partía de 141aa06 (árbol ==
  c61f2c1a, confirmado por pre-imagen) y el puente cerró sin residuo.
- La verificación local previa de MUSE ("am 3/3 limpio sobre worktree en 141aa06;
  git diff e1ee315 vacío") fue reproducida independientemente: el "vacío" se
  materializa como igualdad de árbol por dos vías independientes (gates dobles +
  determinismo ×2 + identidad de blobs con la línea sin docs).

## 6. Estado del ciclo y siguiente paso

- M-irtam-replay CICLO A: **IMPLEMENTACIÓN CERRADA** (ruling R1 del 017 + drop 018
  + fix 019 + docs 020 + tag mirtamreplay-a-folded sobre ac9d95b3).
- Queda EXACTAMENTE un ítem para cerrar el ciclo: **PREMIERE EN VIVO** (receta §6
  del veredicto 018, re-emitida como §7 del 019): sesión con ≥2 frames TEC, scrub
  en [T−96,T−72] con badge TOV avanzando, vars 10/11 mostrando la muestra ≠ bundle
  fresco, hueco estructural con clamps y notas honestas, Zone: coincidente con la
  capa activa, slot P7 sin re-eval espuria. Forma del drop 021: evidencia (log de
  la sesión), SIN código, custodia estándar (delta/sha256/From sin BOM + blob ==
  disco == árbol).
- Backlog global: M-irtam-replay es el último ítem; su cierre definitivo queda
  a la espera de la premiere + veredicto de evidencia (patrón 014/015 del ciclo
  estreno B0×B1).
