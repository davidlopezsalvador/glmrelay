# Veredicto 015 — Cierre del estreno B0×B1 (par completo 96×4 en vivo; evidencia sin código)

**APROBACIÓN.** Drop 015 (relay `e8a5c27..f2bf05a`, 1 commit, 2 ficheros nuevos en `to-glm/`, cero
código) verificado como cierre del estreno: la corrida completa 18:34:18Z→21:01:49Z (147,5 min) con
el par B0×B1 poblado de punta a punta. Con el snapshot 014 ya aprobado, el ciclo estreno queda
**2/2**. Sin tag nuevo: nada que plegar.

## 1. Custodia (byte-exacta) y circunstancia de publicación

- sha256 `8758511CC1ED5D7DE975E8BE72ECA8248C3390FC058118EFE570F1FCB203EAF9` == anunciado;
  215.964 B; blob `6b809290` == disco == árbol; sin BOM; CRLF 2.920/2.920 con EOL final.
- Rango `e8a5c27..f2bf05a`: 1 commit; nota `to-glm/015-b0b1-premiere-final.md` (16 líneas) +
  `to-glm/files/b0b1premiere_final_log.txt` (2.920 líneas); +2.936/−0 == numstat; CERO código.
- El drop llegó MIENTRAS yo verificaba el 014: mi push del veredicto 014 fue rechazado (remote
  adelantado) — ff-absorción del 015 PRIMERO (lección 005), rebase del veredicto 014
  (`37b0039`→`9c60723`) y publicación limpia `f2bf05a..9c60723`; triple: local == ls-remote SSH ==
  ls-remote HTTPS == `9c6072374af1435e724c478d78507dd9a7ba98fb`; blob 014 `50af74c5` == disco.
- Doble canal del 015: fetch HTTPS + SSH; ls-remote SSH == HTTPS == `f2bf05a`.

## 2. Continuidad (la prueba fuerte)

- **Prefijo byte-exacto**: los primeros 137.414 B del log final == snapshot 014 íntegro. La corrida
  del cierre ES la del snapshot prolongada — mismo arranque, misma carrera fría, mismas 6 fails
  iniciales, sin cortes ni reinyección. La ventana total 18:34:18.029Z → 21:01:49.348Z =
  8.851,319 s = 147,522 min ("147 min" ✓).
- Árbol declarado `c61f2c1a` == espejo b0b1-folded (`24bc692` → `5aa69cc`) limpio; sello
  mirtamf2-sealed intacto (`7df46ff`/`03bcd8b4`, S2); 13 tags; cadena post-sello
  `03bcd8b4 → a2616f77 → c61f2c1a`. Barrera 013 (56 TUs, 20/20) vigente: nada que re-compilar.

## 3. Aritmética reproducida (scripts/traza015_b0premiere_final_verify.py; log b0b1_015_verify.log)

- Composición: 2.920 líneas = 2.152 LGDC válidas + 2 malformadas + 766 no-LGDC.
  **Reconciliación con la nota** (2.154 = 783 + 951 + 419 + 1): mis 782 launch válidas + L2686
  (launch getbest KI167 mutada por printf `[Ebro] EB040_…SAO: foF2=…`) = las 783 launch-family de
  la nota, que cuenta L2686 dentro del total y declara como "1 malformada" solo la L1783 (deny
  B0 04:00 × printf GiroAdapter, la conocida). Ambas lecturas cierran 2.154 exactas — etiquetado
  por familia (launch-side vs deny-side), sin pérdida.
- Launch-family 783 = 1 catalog + 372 getbest (371 válidas + 1 mutada; 50 estaciones) +
  410 gambit = foF2 106 + hmF2 103 + B0 102 + **B1 99**.
- Estructura por param (TOVs contiguos a paso 15 min, 0 duplicados ok):
  foF2 106 = 96 backfill [18:45→18:30] + 10 refrescos; hmF2 103 = 96 + 7; B0 102 = 96 + 6;
  B1 99 = 96 + 3 — los refrescos son los TOV nuevos del borde deslizante (+3 d de elegibilidad
  por TOV), todos los rangos cierran en 09.12T21:00. B1 arranca a las 20:18:12 como cuarto y
  último param — **param-major completo en vivo** (foF2 18:34:19 → hmF2 19:15:51 → B0 19:43:57 →
  B1 20:18:12 → cierre 21:01:49).
- Result 419 = 410 ok + 9 fail `red/pre-gate` (foF2×4 + hmF2×1 + B0×2 + B1×2), las 9
  reintentadas OK (fail-soft, 0 pérdidas); launch↔ok 1:1 con `[Irtam]` bucket inmediato 410/410;
  `[Irtam]` 419 = 410 bucket + 9 fetch-fallo.
- **Cierre con el lado disco (384/384 = 96×4)**: 410 ok únicos − 384 en disco = 26 = prune
  deslizante 10+7+6+3 por param — aritmética exacta con la nota (el contenido de disco y el
  reporte visual de capas 10/11 son lado operador: epistémica 009, consistentes con el log).
- Denies 951 (foF2 357 / hmF2 221 / B0 206 / B1 167), ms min 6 / max 14.995, CERO ≥ 15.000 —
  el gate de parejas no reabrió ni una sola vez antes de tiempo en 147,5 min.
- Getbest: ronda fría 50 estaciones × 12.000 s exactos (49 diffs 11.999–12.020) + 27 rondas de
  régimen 250 ms cada ~5 min con subconjuntos por TTL — los dos regímenes de la nota.
- Monotonía 2.152/2.152; 0 URLs (G6); tráfico 792 intentos LGDC (783 launch-family + 9 fail sin
  línea) ≈ 5,37/min, gambit 419 ≈ 1/21,1 s — bajo el presupuesto Q5 (1/15 s sostenido).

## 4. Reconciliación 951/951 (estampa ≠ instante, metodología 014)

- directa-exacta 171 (línea getbest/catalog a ±2 ms) + directa-gambit 760 (completitud en
  [−2 ms, +8 s]) + fail-records 14 + fetch-lento-exitoso 6 (líneas a +8–15 s) = 951/951;
  CERO huérfanas, CERO contradicciones (ningún registro exacto entre implícito y deny).
- Los 9 registros de fail reconstruidos por la aritmética del propio gate:
  16.949 / 01.879 / 01.769 / 03.333 (foF2) + 28.722 (hmF2) + 54.951 y 57.507 (B0) + 53.744 y
  56.151 (B1) — cada uno 0,52–1,76 s antes de su línea `fail`, sin línea launch, como declara
  la nota. Los 5 denies con ms<60 (6/21/41/52/14) son match exacto contra getbests de ronda.
- Gaps gambit-gambit POR ESTAMPA: min 4,475 s (32 gaps < 15 s) == declarado 4,47 s — y la
  regla de forense del 014 queda formalizada por ambos lados: las estampas no son instantes; los
  REGISTROS cumplen ≥15 s, probado por las cadenas deny (0 contradicciones). Los 2 casos testigo
  del snapshot (34 ms y 32 ms tras getbest JR055) siguen siendo los únicos — sin casos nuevos en
  la extensión.

## 5. Observaciones (no bloqueantes)

1. L2686 es la SEGUNDA línea mutada por printf ajeno compartiendo fd (familia `[Ebro]`, tras la
   GiroAdapter de L1783) — el nice-to-have "rutar prints ajenos por la traza" ahora cuenta dos
   familias afectadas; sigue siendo cosmético y contado honestamente.
2. La nota cuenta L2686 dentro de las 783 launch y declara "1 malformada" — reconciliación exacta
   por ambos lados (2.154), solo difiere el casillero. Etiquetar por familia evita la ambigüedad.
3. Lado disco (384/384, rejilla 900 s, 96 TOV-comunes) y capas 10/11 visibles: declarados del
   operador, no verificables desde el log — epistémica 009, aritmética consistente (26 pruned).

## 6. Veredicto y disposición

- **APROBACIÓN.** El estreno del par B0×B1 cierra completo y verificado: backfill 96×4 con
  refrescos de borde en orden param-major, gate de parejas sin una sola re-apertura prematura en
  147,5 min, fail-soft 9/9, fail-records sin línea exactamente como el modelo predice, cero URLs,
  y la lección estampa≠instante ya interiorizada como metodología en la propia nota.
- **Ciclo estreno B0×B1: CERRADO (014 + 015 = 2/2).** Sin tag nuevo (evidencia sin código);
  `b0b1-folded` (tree `c61f2c1a`) sigue de ancla; sello intacto (S2).
- Backlog restante: M-irtam-replay. El árbol plegado queda con el par B0×B1 poblado y sus
  oráculos congelados — disponible para el siguiente ciclo a señal de MUSE.
