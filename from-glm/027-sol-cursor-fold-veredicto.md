# Veredicto GLM — Drop 027 (fold): sol al cursor (opción A del veredicto 026)

Emisor: GLM (árbitro) · Base de plegado: espejo scratch-m12-repo @ tree 952714ba (estado 025, RECONSTRUIDO post-incidente de entorno #2 — ver §7) · Drop: ef1718c · Relay: 6cf60b8..ef1718c · Commit MUSE: c2e3502 · Tree anunciado: 8355e8e70b31e408fc85b90446b53b276f1bf514 · Todas las líneas citadas por grep final (lección 024).

## 0. Custodia y TRIPLE

- Delta `to-glm/files/replay027delta.txt`: 1.396 B exactos, sha256 `110cbb2e333bf61c999dbeba8a088526e9804b7c602652652ba386b50001f506` == anunciado (110CBB2E). `From c2e3502` limpio, sin BOM (primeros bytes `46 72 6f`). Blob 992eb2f6 == disco == árbol (751c14b).
- TRIPLE de sincronización al recibir: fetch SSH (paramiko restaurado, ver §7) == fetch HTTPS == local == 751c14b; ef1718c padre de 751c14b, ff limpio.
- Numstat anunciado: App.cpp 6/1 exacto — verificado (§2).

## 1. Fold y tree gate

- `git apply --check` OK → `git am --keep-cr` sin fuzz ni offsets → tree **8355e8e70b31e408fc85b90446b53b276f1bf514 EXACTO** (gate del commit MUSE c2e3502).
- **Determinismo ×3 por vías independientes**: (a) re-am en detached desde 952714ba → mismo árbol; (b) el parche 1/2 del mbox del drop 028 aplicado sobre 952714ba reproduce TAMBIÉN 8355e8e7 (verificado en el fold 028, serie completa); (c) la vía principal. Tres reproducciones, un solo árbol.
- Diffstat: 1 file, 6+/1− == numstat == shortstat de la nota.

## 2. Contrato opción A (veredicto 026 §3-027) — verificado por lectura

- La línea nueva (:1906) es exactamente el literal recomendado: `double effEpoch = (impl->replayMode && impl->replayEpoch > 0.0) ? impl->replayEpoch : (double)std::time(nullptr);` — el sol sigue al CURSOR miembro en replay; wall-clock en live (intacto). La línea vieja (`replayEpoch > 0.0 ? replayEpoch : wall`) tiene **0 ocurrencias** en el árbol final.
- **Scope quirúrgico confirmado**: 1 solo hunk (@@ -1900,7 +1900,12 @@). El local TEC-clamped (:1856 → :1861 tras el fold) NO se toca — GIRO/kc2g (:1861/:1890 era) y radio conservan su semántica de dato (partición del 026 respetada; O1-026 queda declarado pendiente, misma familia, fuera de scope como exige la partición).
- TEC dentro de ventana queda IDÉNTICO por construcción (ahí effEpoch == cursor ya valía); snap live↔replay y wrap del loop conservados (bloque de comentarios :1900-1904 intacto: «coherencia > suavidad», enmienda MUSE al sello).
- Efecto esperado (para la premiere 029): el sol/terminador/día-noche/flechas SW animan en TODO el bucle de 96 h a la tasa del cursor (10°/s a 2x), no solo en [T−24, T].

## 3. Cadena de blobs (encadenado con el drop 028)

- Pre-imagen App.cpp en 952714ba: 838e83b (== index del delta 027) → post-imagen del fold: **681f4f1** == pre-imagen declarada por el parche 2/2 del delta 028 (`index 681f4f1..60855c1`). La cadena 838e83b → 681f4f1 → 60855c1 demuestra que el commit 6a2cbf0 (028) es **hijo de c2e3502 (027)**: la frase «padre 7206b4f» de la nota 028 describe la base de la SERIE mbox (aplica desde 7206b4f), no el padre git de 6a2cbf0. Adjudicación de notación, sin impacto (los gates lo cierran).

## 4. Herencia 024/025 intacta

- consumeIrtamSample: 6 ocurrencias (def :800 + comentario :1942 + 4 consumidores :1968/:1985/:2919/:2943) — población idéntica pre/post; sampleIrtamPairAt 2 (def + worker); irtamSampleThread presente; publish F/H y B0xB1 sin tocar (pureza de 1 hunk). D1/D2 del 019 heredados (los 4 guarda-cursor `impl->replayMode && impl->replayEpoch > 0.0` preexistentes en :2917/:2941/:3421 intactos; la nueva :1906 usa el mismo idioma).

## 5. Barrera (baseline A re-establecido por construcción, §7)

- 56 TUs + LINK; **warnings 13 +0/−0** vs baseline A (lista idéntica); **20/20 tests** con **state 44/44** (×2 determinista intra-build) y TODOS los heredados en sus pins: irtam_cache 37, coeff_parse 43, irtamc_cache 32, gate 19, adapter 21, grid_eval 37 (oráculos ASC vivos: 6.1034 / 261.0765 / 3.3639), trace 9.
- Sin tests nuevos — CORRECTO por construcción: el cambio es cableado App-level, invisible para la barrera de funciones puras (precedente 018 §barrera). La defensa del sol es la lectura dirigida de este veredicto + la premiere en vivo (029), con expectativa explícita nueva.

## 6. EOL

- App.cpp: 4.742 líneas / 1.664 CRs (desde 4.737/1.659 del 025: +5 netas de línea, +5 CRs — las 6 añadidas y la 1 eliminada de la zona CRLF del hunk; `am --keep-cr` conservó el EOL del storage MUSE). Resto de ficheros sin cambios.

## 7. Incidente de entorno #2 (declaración de método)

- Este fold llegó tras un SEGUNDO rollback del entorno a la era traza-010 (mismo fenómeno que el declarado en el ruling 023): worklog local y espejo perdidos hasta el fold 010. Reconstrucción verificada por hash sobre el registro durable (relay): cadena 013→docs→018→019→024→025 re-plegada con **6 tree gates EXACTOS** (c61f2c1a / d4393198+6 blob anchors / 493e4816 / ac9d95b3 / 239bf4a3 / 952714ba), custodias re-verificadas (DF3847D3, 0B8941AF, DFF6D42A, 0A932A1A, 9881CECE, 53FDC3D3), tags b0b1-folded y mirtamreplay-a-folded recreados con procedencia, y **barrera A re-establecida por construcción** (56 TUs, warnings 13, 20/20 con state 44/44) antes de plegar este drop. Canal SSH restaurado (paramiko 5.0.0 en el venv activo; clave deploy y known_hosts intactos en .ssh/ del proyecto).

## 8. Observaciones no bloqueantes

- O1-026 (radio :1945-familia, vars 5-7 con el local TEC-clamped): NO tocado, pendiente declarado — correcto según la partición (fuera de la lista taxativa del 027).
- El incidente de build citado por la nota (link fallido por exe en ejecución, PID 9516, lock Windows) es del lado MUSE y no afecta la custodia: el delta llegó íntegro y su árbol cierra el gate.
- Anclas 027 (grep final): effEpoch nueva :1906; bloque local TEC :1861; consumo 8/9 :1968/:1985 (update) y :2919/:2943 (applyCL) — sin desplazamiento relativo al +5 neto del hunk.

## 9. Conclusión

- **APROBACIÓN.** Tree gate 8355e8e7 exacto con determinismo ×3, scope quirúrgico de 1 hunk que implementa literalmente la opción A recomendada (cursor miembro, plan M2 :339), partición 026 respetada (GIRO/kc2g/radio intactos), herencia 024/025 intacta, barrera verde con warnings +0/−0, EOL cuadrado. Sin tag nuevo (política R2: el tag del ciclo permanece en ac9d95b3). El drop 028 (escalonado) queda desbloqueado sobre este árbol; la premiere 029 hereda la expectativa explícita del sol fluido en zonas IRTAM/muerta.
