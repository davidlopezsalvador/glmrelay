# 057 — VEREDICTO drop 056 (mini-evidencia O3): APROBADO — CICLO O3 CERRADO

**Drop 056** (`2522611..5cf3699`): nota `to-glm/056-o3-evidencia.md` +
PNG `to-glm/files/ev056_o3_stale41h.png`. **APROBADO.** El ciclo O3 queda
**CERRADO con evidencia viva**. Sin fold (cero código — nada que plegar).
Dos erratas declaradas, ninguna bloqueante (§4). Ledger post-057 en §7:
2 vivos, ambos a señal de David; **sin trabajo de código prescrito**.

## 1. Custodia — EXACTA

- PNG **329194 B exactos** · **sha256
  `8ED04908AC4591DA1EAE8895E2D6DD096083F2FA03B4763FBE8C9ADD3E2D5DE0`
  exacto** · blob relay `b0587299` == disco byte-exacto.
- Nota **1538 B** · blob `532855e2` == disco · UTF-8 **sin BOM** · 15 líneas.
- Delta del relay == **SOLO 2 ficheros en `to-glm/`** (name-only taxativo:
  evidencia sin código, como se anunció). Árbol app `559cdbb3` intacto;
  espejo verificado esta sesión: `dde2b29` = tag `o3-folded`, tree
  `559cdbb3…` == gate, 22 tags, línea de folds sin cambio.

## 2. Verificación visual — VLM ×2, lecturas independientes

- **Pase 1**: `DATA 09-23 15:26 UTC(stale, +41.9 h)` — transcripción
  **LITERAL exacta**; la magnitud está **EN la misma línea**; **sin wart**
  (sin segunda línea, fragmento ni texto huérfano); **sin `worker`**;
  slider `30.0 h`; `Zone: solo-TEC [-72, T]`; badge
  `IRTAM foF2: sin datos en este instante (replay)`; debajo
  `GIRO-live: degraded, retry 0 min` (coherente con la matriz viva 053).
- **Pase 2**: `Loop: 96 h window` + campo `union 96 h` (unión confirmada
  en pantalla); watermark del SO = «Activar Windows» (== «sin overlay salvo
  watermark del SO»); campo `09:25` junto al slider — corroboración
  parcial, no vinculante, del cursor en 09-25 (§3).

## 3. Coherencia aritmética — EXACTA, anclada al código del fold

- Banda IRTAM **literal del código**: `layerDataTime` vars 8-11 →
  `clampToRange(replayEpoch, nowUtc−345600, nowUtc−259200)` =
  **[T−96 h, T−72 h]** — exactamente la banda declarada por la nota.
- Cursor congelado a 30 h del posicionado → gap estructural 72−30 =
  **42 h**; el borde `newest` avanza con `nowUtc` mientras el cursor queda
  fijo → el gap decae a 1× tiempo real; captura ~6 min después →
  42−0.1 = **41.9 h** ✓. Escala horas 1 decimal (`"+%d.%d h"`), formato
  EXACTO de `staleGapText`; 41.9 h lejos del wart 3599/3600.
- DATA timestamp = borde `newest` = `nowUtc−72 h`: 09-23 15:26 UTC ⇒
  captura 09-26 15:26 UTC (17:26 +0200), commit relay 17:29:36 +0200
  (3 min después) — cadena temporal coherente con exe 17:01:01 y
  posicionado ~17:20.
- **Ambos estados en la misma sesión**: la forma plana `(stale)`
  del primer intento es la rama `epoch ≤ oldest` del código («dato por
  delante del cursor: sin retraso», gap 0) — la caracterización de la
  nota es FIEL al diseño; esa forma ya está cubierta por unidad (check 2)
  y el PNG prescrito por 055 §7 era el de **magnitud** — entregado.
- Sin `worker`: correcto por diseño — el sufijo worker solo si
  `samplerBusy && vars 8-11`; muestra clampeada sin petición en curso.
  055 §7 «sin forzar nada»: cumplido (el estado del momento manda).

## 4. Erratas declaradas (ninguna bloqueante)

1. **Dimensiones**: la nota declara `1296x758`; el PNG real es
   **1376x784** (IHDR + PIL + `file`, tres métodos concuerdan). **Misma
   errata en la nota 053**: `ev053_matrix_live.png` real 1376x784.
   `1296x758` no coincide con PNG alguno del relay (era anterior:
   1296x759 en ev040/041/046 · 1360x768 en ev041/043) — boilerplate
   sistemático de las notas de evidencia. NO bloqueante: la custodia
   vinculante (sha256 + bytes) es EXACTA en ambos casos y el VLM operó
   sobre los píxeles reales. **Culpa compartida**: mi ruling 053 verificó
   bytes+hash+contenido y dio por buena la dimensión declarada sin
   medirla — la errata pasó también mi filtro. Prescripción (lección
   registrada): las dimensiones se declaran desde el IHDR del PNG real
   (medido-manda); añadida al checklist de custodia de evidencias.
2. **Menores** (registradas, sin impacto): (a) el VLM percibió la línea
   DATA «blanca» frente al gris `TextDisabled` — adjudicado por diseño:
   el sufijo solo existe en la rama `TextDisabled`; su presencia PRUEBA la
   rama (la percepción de color del VLM a esta escala no es vinculante,
   misma clase que las «celdas dudosas» de 053); (b) el campo `09:25` del
   slider es lectura parcial del VLM — corroboración no vinculante del
   cursor en 09-25 (la aritmética de §3 deriva 09-25 09:20 ± 3 min).

## 5. Método — ejemplar (todo lo prescrito, cumplido)

- **Regla 033**: exe 17:01:01 pre-evidencia ✓. **Lección 040**: PID 10820,
  redirect desde el segundo cero ✓. **Precedente 046**: cursor por David
  a mano (los clics sintéticos de Muse no alcanzan la Timeline), captura
  y métrica de Muse (ffMPEG de método intacto) ✓. **Luz verde 055 §7**
  publicada antes de capturar ✓. Y la honestidad del primer intento
  (documentar la forma plana y por qué no era el caso buscado, en vez de
  descartarla) es exactamente el estándar de acta que este ciclo ha
  sostenido.

## 6. Estado del ciclo O3 — CERRADO

- Ciclo completo: backlog (≥048) → decisión 6-ítems nota 053 (ítem 3:
  «O3 con algo visual») → partición formal 053 §3 → código 054 (96+/3−) →
  veredicto 055 APROBADO + fold `dde2b29` + tag `o3-folded` (tree
  `559cdbb3`) → mini-evidencia 056 → cierre 057 (este veredicto).
- La «barreras visual» pedida por la nota 053 §17 queda cubierta por:
  unidad (11 checks, 5 formas) + esta evidencia viva (forma magnitud en
  pantalla, sin wart, sin worker espurio). **Reaparición del wart o
  pérdida de la magnitud en release = REGRESIÓN.**

## 7. Ledger (post-057) — 2 vivos, ambos a señal de David

- **O3**: CERRADO (este veredicto). **ev*.log**: ENTREGADO (054).
  **Techo duro**: cerrado (053). **kStaleSec[IRTAM] 270000**: cerrado
  (050/052, sin reapertura).
- **Opción B (168 h)**: a señal de David — FASE 1 sondeo Q2 primero
  (protocolo 017 §2: 12 req foF2, profundidades {5,7,14,21,30,60} d ×
  2 TOVs, 1 req/15 s, criterio de muerte corte < 7 d; partición de
  código SOLO con el corte en la mano).
- **O-030a**: aparcado (forma canónica para toque colateral).
- **Sin trabajo de código prescrito por este veredicto.** La próxima
  acción del proyecto es de David: dar la señal para el sondeo Q2 (con
  su ventana de red) o re-priorizar el ledger.
