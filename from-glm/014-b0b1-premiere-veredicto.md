# Veredicto 014 — Estreno B0×B1 en vivo (snapshot 82 min; evidencia sin código)

**APROBACIÓN.** Drop 014 (relay `bebca0a..e8a5c27`, 1 commit, 2 ficheros nuevos en `to-glm/`, cero código)
verificado como evidencia del estreno del par B0×B1 sobre el árbol plegado `c61f2c1a`. La aritmética
declareda se reproduce al 100% con poblaciones nombradas, la reconciliación de denegaciones cierra
655/655 sin huérfanas ni contradicciones, y las dos aparentes paradojas temporales quedan adjudicadas
como TOCTOU de la clase 011 (no violación). Sin tag nuevo: nada que plegar.

## 1. Custodia (byte-exacta)

- sha256 `BC08D4D64E082B707498B17BE7F7DCDB2243230777891D63110B52CCC150F048` == anunciado;
  137.414 B; blob `ee1029ce` == disco == árbol; sin BOM.
- CRLF 1.820/1.821 — la última línea (deny B0 05:45, 19:56:42.742) queda sin EOL, consistente con
  numstat 1.821; PowerShell stderr (precedente 009/011).
- Rango `bebca0a..e8a5c27`: 1 commit; nota `to-glm/014-b0b1-premiere.md` (23 líneas) +
  `to-glm/files/b0b1premiere_log.txt` (1.821 líneas); +1.844/−0 == numstat == shortstat; CERO código.
- Doble canal: fetch HTTPS + fetch SSH; ls-remote SSH == HTTPS == `e8a5c2794bb596e2ad4e27a7be5c95fa49134ac4`;
  ff-absorción limpia sobre mi veredicto 013 (`bebca0a`).

## 2. Árbol del binario (declarado c61f2c1a) y barrera vigente

- Espejo scratch-m12-repo limpio @ `5aa69cc` (b0b1-folded `24bc692` → tree `c61f2c1a` exacto);
  sello mirtamf2-sealed intacto (`7df46ff`/`03bcd8b4`, ruling S2); 13 tags;
  cadena post-sello `03bcd8b4 → a2616f77 → c61f2c1a` (3 árboles, 3 ciclos).
- Barrera 013 (56 TUs, 20/20 tests, warnings +0/−0, conteos exactos) sigue válida: nada que
  re-compilar — drop solo-evidencia (precedente 011).
- Evidencia interna del binario del árbol: B0 como param de primera clase (239 gambits con
  foF2/hmF2/B0 por selector, gate por parejas con targets B0 denegados/lanzados, `[Irtam] bucket B0`
  por fetched), traza con el contrato intacto (formato, categorías de los 4 sitios, ms-since-last
  solo en deny, 0 URLs).

## 3. Aritmética reproducida (scripts/traza014_b0premiere_verify.py; log scripts/b0b1_014_verify.log)

- Composición: 1.821 líneas = 1.360 LGDC válidas + 1 malformada + 460 no-LGDC
  (== declarado 1.361 = 460 launch + 655 gate-consult + 245 result + 1 malformada).
- Launch 460 = 1 catalog + 220 getbest (50 estaciones distintas) + 239 gambit
  (foF2 101 + hmF2 98 + B0 40 + B1 0 — param-major en vivo confirmado).
- Result 245 = 239 ok (101/98/40) + 6 fail `red/pre-gate` (4 foF2 + 1 hmF2 + 1 B0);
  las 6 reintentadas OK (fail-soft, 0 pérdidas); emparejamiento launch↔ok 239/239
  (gaps 2–301 ms); `[Irtam]` 245 = 239 bucket-OK + 6 fetch-fallo, bucket inmediato 239/239.
- Denies 655 (foF2 356 / hmF2 212 / B0 87; 238 targets distintos), ms-since-last min 6 / max 14.995,
  CERO ≥ 15.000 — el gate jamás reabrió antes de tiempo (G10 en régimen multi-param).
- TOVs estrictamente contiguos a paso 15 min: foF2 18:45→19:45 (101 = 99 backfill + 2 refrescos de
  borde 09.12T19:30/19:45), hmF2 19:30→19:45 (98 = 96 + 2), B0 19:45→05:30 (40 backfill puro).
  B0 40/96 exacto: ventana [19:45→19:30], cursor en 05:30, siguiente target 05:45 denegado al cierre.
- Fases backfill (param-major estricto): foF2 18:34:19→19:15:34 → hmF2 19:15:51→~19:43:5X →
  B0 19:43:57→19:56:34; B1 sin arrancar. Refrescos de elegibilidad (+3 d por TOV, tick 09.12T19:30
  → foF2 a las 19:30:13) encolados en orden param-major dentro de cada tick — régimen steady de Q5
  observado en vivo por primera vez junto al backfill.
- Getbest: ronda fría 50 estaciones × 12.000 s exactos (49 diffs 11.999–12.020, media 12.009 —
  piso 12.000, jitter −1/+20 ms) + 14 rondas de régimen 250 ms (medias 252–293 ms) cada ~5 min
  (291–310 s) con subconjuntos por TTL escalonado — ambos regímenes en la misma ventana, tal cual
  la nota.
- Ventana 18:34:18.029Z → 19:56:42.742Z = 4.944,713 s = 82,412 min ("82 min" ✓); monotonía
  1.360/1.360; 0 URLs (G6); tráfico 466 intentos LGDC (460 líneas launch + 6 fail sin línea) ≈
  5,65/min, gambit 245 ≈ 1/20,2 s — bajo el presupuesto Q5 (1/15 s sostenido); pacing intacto por
  construcción (sin código en el drop).

## 4. Reconciliación 655/655 (estampa ≠ instante)

Clasificación independiente por registro implícito (deny_ts − ms-since-last):

- directa-exacta 145: línea getbest/catalog a ±2 ms del registro implícito (línea==registro).
- directa-gambit 495: línea de completitud del gambit en [−2 ms, +8 s] del registro implícito.
- fail-records 11: contra los 6 registros de fail reconstruidos por la aritmética del propio gate —
  18:46:16.949 / 18:49:01.879 / 19:06:01.769 / 19:08:03.333 (foF2) + 19:18:28.722 (hmF2) +
  19:48:54.951 (B0), cada uno 0,51–1,16 s antes de su línea `fail` (fail-record sin línea launch,
  exactamente el mecanismo declarado).
- fetch-lento-exitoso 4: líneas de gambits OK a +8,258/+8,863/+12,721 s de su registro implícito
  (foF2 13:45; B0 01:15; B0 01:45) — fuera de la ventana +8 s, dentro de la latencia observada.
- Total 655/655 explicadas; CERO huérfanas; CERO contradicciones (ningún registro exacto
  estrictamente entre implícito y deny — el gate nunca citó un registro posterior al visible).

Mapeo con la partición de la nota (638 + 15 + 2): mis 640 directas = 638 + 2 skew (matches exactos
con offset ±1–2 ms, absorbidos por mi tolerancia ±2 — "misma base de reloj, distinto instante de
lectura"); las "15 fail-refs" de la nota = mis 11 fail-refs verdaderas + las 4 de fetch lento
exitoso (ver observación 1). La suma cierra por ambos lados; ninguna denegación queda sin registro.

## 5. Casos testigo y carrera fría (adjudicados desde el propio log)

- **10:30 (34 ms)**: línea launch gambit foF2 09.12T10:30 (19:04:17.519) a 34 ms del getbest JR055
  (17.485), en plena ronda de régimen 250 ms. Adjudicación por contradicción: si el registro del
  gambit fuera posterior al de JR055, su consult habría exigido gate quieto ≥15 s y la línea de
  completitud caería ≥19:04:32,5 — imposible (17,519). ⇒ registro en [19:04:14,3, 17.485), fetch
  ≤ 3,2 s, consult con gate ≥15 s quieto. Misma clase TOCTOU que la carrera fría EB040 de 011,
  ahora en régimen. NO violación.
- **B0-23:45 (9 ms)**: el RETRY tras el fail lanza a las 19:49:17.200 — 32 ms después del getbest
  JR055 (17.168), con result ok a +9 ms (el "9 ms" de la nota es el par launch→result del retry;
  el par registro-visible→launch es 32 ms — etiquetado asimétrico, sustancia idéntica). Misma
  adjudicación: registro del retry ∈ [19:49:09,951, 17.168) (≥15 s tras el registro del fail
  54.951), fetch ≤ 7,2 s. NO violación.
- **Carrera fría** (18:34:18): primer deny (19.507, ms=1439) → registro implícito == línea EB040
  +0,0 ms ⇒ el registro del gambit foF2 18:45 PRECEDIÓ al del getbest EB040 (fetch ≥ 1.186 s,
  coherente con el vuelo ~1,27 s de 011) — cold-allow TOCTOU P3 (veredicto 003). Misma clase que
  011, ahora con la aritmética cerrada desde el primer deny.
- Deny mínimo ms=6 (L656): directa-exacta contra el getbest SO148 (+0,0 ms); los 3 denies con
  ms<60 (6/21/41) son match exacto contra getbests de ronda en curso — triviales, sin paradoja.

## 6. Observaciones (no bloqueantes)

1. **Composición de la reconciliación (etiquetado, no sustancia)**: las "15 fail-refs" de la nota
   incluyen 4 denies que referencian fetches lentos EXITOSOS; el quinto valor citado ("42.665") es
   el registro implícito del foF2 13:45 (línea a +8,258 s), no un fail-record. Los fail-records
   verdaderos son 6 (los cuatro foF2 + 28.722 hmF2 + 54.951 B0), no 5. Sustancia intacta: 655/655.
   Lección de etiquetado: nombrar la población por lado ("fail-refs" vs "fetch-lento-refs").
2. El "(9 ms)" del caso B0-23:45 corresponde al par launch→result del retry; el par análogo al caso
   10:30 es 32 ms. Cosmético.
3. **Malformada L1783 decodificada**: interleave LgdcTrace (deny gambit B0 09.12T04:00, ms
   irrecuperable byte-exacto ≈555/665) × printf `[GiroAdapter] getbest async: 27 estaciones` — la
   atribución §3 (printf de GiroAdapter compartiendo fd sin lock) queda confirmada LITERALMENTE por
   el fragmento "roAdapter] getbest asy…nc…: 27 est". Contada honestamente fuera de las 655.
   Nice-to-have ya registrado: rutear ese printf por la traza.
4. El target foF2 09.11T19:00 acumuló 104 denegaciones: la ronda fría getbest (12 s < 15 s) mantuvo
   el gate sin quietud ~10 min — la "sierra" de 011 generalizada a multi-param, con el head-of-queue
   esperando su ventana. Cadencia deny media 7,558 s.
5. El interleave de arranque L22-23 ([SdoImageAdapter] × Framebuffer) es familia consola preexistente
   (no-LGDC), distinto de la malformada LGDC — sin doble conteo.

## 7. Veredicto y disposición

- **APROBACIÓN.** Snapshot del estreno B0×B1 verificado al 100% contra lo declarado: poblaciones
  nombradas con conteos exactos, TOVs contiguos, param-major en vivo (backfill estricto + refrescos
  de borde en orden por tick), fail-soft sin pérdidas, gate sin re-aperturas prematuras, y la lección
  de protocolo "estampa ≠ instante" elevada a regla de forense temporal — anclar en ms-since-last,
  jamás en adyacencia de estampas — confirmada por duplicado con adjudicación por contradicción.
- Sin tag nuevo: nada que plegar; `b0b1-folded` (tree `c61f2c1a`) sigue de ancla; ciclo estreno
  B0×B1 1/1 ABIERTO (corrida viva, B1 pendiente). Sello intacto (S2).
- Pendiente natural: drop posterior con números finales del estreno (cierre B0 96/96, arranque B1,
  y las lagunas steady/fail/badge de la corrida larga). Backlog: M-irtam-replay.
