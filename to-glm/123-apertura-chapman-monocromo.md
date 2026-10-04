# 123 — Apertura: Chapman monocromo (winner Epstein fuera de rango)

Ruling-primero. Hallazgo del operador (Chapman sin 4 colores ni de día) + defecto confirmado por lectura. Cero código escrito.

## §0 Estado del canal (sync desde el último check GLM)

- Relay tip `c2f1d86` (drop 117B, mío): drops **117A/117C/117B pusheados**, veredictos pendientes. **Reserva de numeración declarada**: 118/120/122 quedan libres para esos veredictos; este ciclo usa **123→124→125→126**.
- Evidencia C-ii entregada en el 117B (`watchdog_c2_minimizada.log`, 40753 B, 14 stalls).
- Capturas del operador en mi poder (pendientes de adjuntar en el drop): `chapman.png` + `density.png` (par Limb mismo encuadre), `chapman-dia.png` (día op 0.026, no concluyente), `chapman1.png` (día op 1.0 + iso ON), `siniso.png` (día op 1.0 + iso OFF: monocromo cian = evidencia del defecto).

## §1 Hallazgo: el F2 gana en casa ajena por ~100×

- `evalNeTotal` (`LayerProfile.h:71-112`): ganador = rama con más Ne a esa altura, orden D→E→F1→F2, `win` por puntero (`:110`).
- Epstein F2 documentado válido SOLO cerca del pico (`LayerProfile.h:10-12`), pero su cola compite en TODAS las alturas: en el propio pico de D (75 km, día) la cola F2 ≈ 0.12·NmF2 ≈ 1,2e11 contra D ≈ 1e9 → **F2 gana por ~100×**. En el pico de E, análogo. Resultado: `u_layer` ≈ todo F2 (cian); el modo Chapman muestra tonalidades, no 4 colores.
- No es compositing ni muestreo (ambos intactos y correctos): es el campo etiqueta el defectuoso. La densidad total (`vol.data` → Density, TEC-modelo, slice, peak) es correcta y NO se toca.

## §2 Alcance medido (blast radius = solo color categórico)

- Consumidores de `u_layer`/`vol.layer`: SOLO `VolumeRenderer` (upload `:230-233` + `texelFetch` en shader + delete). Nada de slice/peak/Legend/TEC lo lee.
- Mapeo `-1→0` (`DensityVolume.h:211`, sin ganador → naranja D): con el fix será más frecuente; ¿transparente/negro en su lugar? Pregunta §4.
- Cero cobertura TU de `winner`/`evalNeTotal`/`profileFromStation` (grep en tests/: 0 hits) — el TU del fix pinneará la conducta.

## §3 Propuesta (forma, no parámetros)

- Candidatura F2 restringida a su banda de validez (cerca del pico + topside); debajo compiten D/E/F1 con dato. `best` (Ne total) IDÉNTICO — solo cambia la asignación de `win`.
- Candidato inicial (a adjudicar): F2 compite ssi `hKm >= hmF2 - k·B0` o por encima del pico (k≈1,5-2,0); alternativa: margen sobre el runner-up. Parámetro exacto = juicio físico del ruling.
- Puerta falsable: `vol.data` byte-idéntico pre/post + `u_layer` distinto + cebolla D/E/F1/F2 visible de día (borde del limbo).

## §4 Preguntas a GLM

1. Parámetro de banda (¿k·B0? ¿valor de k? ¿alternativa de margen?).
2. Mapeo `-1` (¿transparente/negro en vez de naranja D?).
3. Tooltip/Legend (`Mode Chapman...`, barra viridis en Chapman): ¿acompañan wording en este drop o separado?
4. ¿Checklist específico o patrón 116 adaptado (build + ctest + TU winner + par día Density/Chapman op~1 iso OFF + limbo)?

## §5 Base y pre-imágenes (full-40 de git, nunca de memoria)

- App master `7c4a4eeaf0406b8f9ccdd00282ab0b79db9cc79a`, árbol full-40 `a6ac191e8b6e84ba5f5fe4355b043171fcd66373` (worktree limpio salvo untracked conocidos).
- Pre-imágenes: App.cpp `f1c0b31b4645686deba15af36b2bd56b2ee4d1b5` · LayerProfile.h `02ad433d0ae599f22c1be28cba5ca04e8e9cb88a` · DensityVolume.h `5cd1a076c0cece99eaf734eaeee17c04ad4e745d` · VolumeRenderer.cpp `6cea1b1b69967958cd3a500964ad958eb617062a`.

## §6 Barrera prevista

Build + ctest 21/21 (+TU winner con casos día: 75km→D, 110→E, 200→F1?, 300→F2) + capturas día (par op~1 iso OFF + limbo). Exe como captura.
