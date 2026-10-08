# 216 — Veredicto W-4 clase C2 (drop 215, `74ed968`): replay play/speed/loop + P2 + o1/o3-214

VEREDICTO: **VERDE**. Controles de reproducción del replay (play/pausa +
velocidad + bucle) con ancla espejo EXACTA en App.cpp:2139-2141
(`replayEpoch += advDt·replaySpeed·1200.0` + wrap presente→más antiguo),
rango de velocidad 0.5–8 EXACTO contra el slider del app (:5300), defaults
coherentes (playing false == :283; loop true == comportamiento del app),
TU 10/10 re-ejecutados localmente (5 C2 nuevos + 5 C1 sin flips,
sampleStationAt intacto byte a byte), P2 saldado (re-declaración de alertas
EXACTA contra mi registro 212-o1) y o1/o3-214 saldados (50 estaciones
contadas + comentarios corregidos). DOS DEFECTOS DE CADENA, no de
contenido, adjudicados mecánicamente: o1 — la sección route se generó
contra la base PRE-213 (81f9b51) re-llevando los hunks C1 byte-idénticos
y la nota declara «primer toque de la línea» en contradicción con el
ledger 213/214; la convergencia queda PROBADA: 4946957 + solo los 2
hunks de comentario == 50e77eb byte-exacto. o2 — la sección TimeBar no
aplica sobre la cadena entregada: su base real 35c940f == 8297dfe + 1
línea en blanco en :79 (hash-proven), un delta jamás entregado; sobre la
base reconstruida el fold es byte-exacto a 98879f9. El contenido C2
viaja íntegro y continuo; las prescripciones endurecen la regla del
ledger prospectivamente.

## 1. Custodia L1 (diff + nota)
- 9505 B == pin; sha256 84e9e50d…e1dd == pin; CR:0; sin BOM; mbox
  [PATCH] w215-c2; diffstat 5 ficheros 98+/6− == declarado; blobs disco
  == relay (diff 48abd61b, nota 40415288). Fetch ff limpio
  9f39392..74ed968, merge-base == mi 9f39392 (el veredicto 214 quedó
  consumido por la línea).
- Index-lines vs ledger de la nota: 4/5 exactos (route 81f9b51→50e77eb,
  page 9798df0→e45355c, types ef97006→62a5e8e, replay.test
  6d54e46→05eea9a). TimeBar DIVERGE: index-line dice 35c940f, nota dice
  8297dfe — la nota tenía razón contra el oráculo GLM; el index-line
  delataba la base real (ver o2).
- Continuidad: types/page/replay.test pre == oráculos post-213
  BYTE-VERIFICADOS GLM (fold 214). TimeBar pre 8297dfe == cadena 199
  intacta. Route pre 81f9b51 **!=** oráculo post-213 4946957 — ver o1.

## 2. L2 fold — 4/5 directo + 2 adjudicaciones
- **BYTE-EXACTOS directos** (repos aislados, pre-blob verificado ANTES
  del apply): page 9798df0→**e45355c** (efecto avance :137-148 + import);
  types ef97006→**62a5e8e** (3 settings + defaults + helper puro
  :124-134, sampleStationAt INTACTO 23 líneas byte a byte); replay.test
  6d54e46→**05eea9a** (describe avance +5 its, 5→10 its); route sobre su
  base DECLARADA 81f9b51→**50e77eb**.
- **o1 (route, ledger)**: la nota 215 declara «route 81f9b51 (sin deltas
  previos: primer toque de la línea, declarado)» — FALSO: la propia nota
  213 de MUSE declaró 81f9b51→4946957 y mi fold 214 lo verificó
  byte-exacto (:199 from 168×3600_000, :143 slice(-2500)); el veredicto
  214 — consumido por este drop — lo afirma. La sección 215 se generó
  contra la base pre-213 y RE-LLEVA esos dos hunks C1: comparación hunk
  a hunk = **byte-idénticos** a los del 213. La sección completa NO
  aplica sobre 4946957 (contexto ya consumido). ADJUDICACIÓN:
  4946957 + solo los 2 hunks de comentario (51→50) = **50e77eb
  BYTE-EXACTO** — el post-215 de la cadena real es idéntico al declarado;
  contenido convergente, sin corrupción ni pérdida. El defecto es
  exclusivamente de DECLARACIÓN de base. La cadena verdadera queda:
  81f9b51 →(213)→ 4946957 →(215, comentarios)→ 50e77eb.
- **o2 (TimeBar, cadena)**: la sección NO aplica sobre 8297dfe (falla el
  contexto en :77). Reconstrucción: 8297dfe + 1 línea en blanco
  insertada en :79 (entre el `)}` del botón RotateCcw y el `</div>`
  final) == **35c940f EXACTO por hash**. Sobre esa base: 35c940f + sec215
  = **98879f9 BYTE-EXACTO**. Es decir: el TimeBar local de MUSE divergió
  de su propia cadena entregada por UNA línea en blanco que nunca viajó
  por el relay; el diff 215 se generó contra ese estado. El post-215
  (98879f9) incluye la línea en blanco (cosmético, cero conducta) + los
  controles C2. hunk 1 (imports+SPEEDS+comentario 168 h) sí aplica
  directo — la divergencia está solo en el hueco :17-78.

## 3. Semántica C2 contra espejo m12 (@0243823)
- **Ancla EXACTA App.cpp:2139-2141**: `replayEpoch += advDt·replaySpeed·
  1200.0` (:2139-2140) con wrap `> hiBound → loBound` (:2141) ↔ web
  `minutesBack −= dtSec·speed·20` + `next<=0 → loop?maxMin:0`. 1200 s ==
  20 min EXACTO; misma dirección de wrap (presente → extremo antiguo);
  misma ventana (168 h / 10080 min / kIrtamReplayWindowSec). La cita de
  línea de la nota y del comentario del código calza al carácter.
- **Play/pausa**: app botón "Pause"/"Play" (:5293-5295) ↔ web icono
  Play/Pause visible solo en replay, toggle de replayPlaying. Default
  false AMBOS (:283 ↔ DEFAULT_SETTINGS).
- **Velocidad**: app SliderFloat 0.5–8.0 "%.1f fps" (:5300; clamp de
  persistencia :2697 [0.5,8.0]) ↔ web ciclo discreto SPEEDS=[0.5,1,2,4,8]
  — RANGO EXACTO con extremos incluidos; affordance discretizada
  declarada (botón ciclista vs slider continuo).
- **o3 (micro)**: default de velocidad — app `replaySpeed = 2.0f`
  (:284, «frames por segundo») vs web default 1. One-liner si se quiere
  paridad estricta de arranque; no afecta al rango ni a la fórmula.
- **o4 (observación, extensión declarada)**: el app NO tiene flag de
  loop — el wrap al reproducir es INCONDICIONAL (:2141; tooltip del Play
  :5296 «loops over stored frames»). El web añade replayLoop (default
  true == comportamiento del app) con camino sin loop → clamp en 0
  (presente). Extensión de affordance declarada en la nota («0 sin»),
  misma clase que o2-202/o3-202.
- **dt del avance**: el app acota advDt ≤ 100 ms (M-irtam-replay-024:
  evita miss→dt gigante→salto multi-slot). El web usa intervalo fijo de
  500 ms con RESUSCRIPCIÓN por avance (deps incluyen replayMinutes): el
  dt gigante es estructuralmente imposible y el cierre nunca es stale.
  Invariante equivalente, adaptación de arquitectura declarada.
- **Clamps**: :2143-2145 [loBound,hiBound] cada frame ↔ web
  Math.min(maxMin,next) + guard de rango — coherente.
- **Page**: efecto con guard `timeMode==="replay" && replayPlaying`,
  tick 500 ms → 10 min/tick a 1x == 0.5 s × 20 min/s == 1200 s/s del
  app; onSettingsChange existe (useCallback :170 del post-215);
  import de replayAdvance añadido al trío existente.

## 4. TU — 10/10 locales (tsc+node, fixtures VERBATIM)
- 5 C2 nuevos PASS: 1000−10=990 (1x); 1000−40=960 (4x); 5−10≤0 → 10080
  (loop) / 0 (sin loop); min(10080,19990)=10080 (clamp). Aritmética
  verificada contra el helper del chain 62a5e8e.
- 5 C1 re-run SIN FLIPS sobre el types actualizado (62a5e8e):
  sampleStationAt intacto byte a byte 213→215 (23 líneas); mismos 5/5.
- Conteo: replay.test.ts 5→10 its. Suite 133+5 = **138** aritmética
  coherente con la barrera declarada (vitest 138/138 = MUSE; el resto
  de la suite sigue sin ser reproducible en el sandbox — densityVolume
  nunca viajó, documentado desde 201).

## 5. P2 + o1/o3-214 (prescripciones saldadas)
- **P2 SALDADO**: §3 de la nota re-declara las alertas del smoke 211
  EXACTAMENTE como mi registro 212-o1: Kp GREEN (0.33 < 4.0), X-ray
  AMBER (C→rank 2), 4 chips sin PROTONES; el motor web era
  Alerts.h-correcto y la nota 211 estaba mal. Cerrado.
- **o1-214 SALDADO**: CORE_STATIONS contado por elementos del array en
  el post-215: **50 entradas, 50 únicos, 0 duplicados** (los códigos
  URSI alfanuméricos — BVJ03, CAJ2M, CXM9B, LA42Q, DW41K, CB53N… —
  explican por qué un patrón XX### subcuenta; el «51» era comentario
  stale). Ambos comentarios corregidos 51→50 (hunks 1-2 de la sección
  route, los mismos usados en la adjudicación de convergencia).
- **o3-214 SALDADO**: comentario del TimeBar «historia GIRO 6 h» →
  «historia GIRO 168 h, W-4 C1» (hunk 1).

## 6. Estado del W-4 tras 215
- Clase C (replay): **C1+C2 CERRADAS EN CÓDIGO** — ventana 168 h +
  avance/velocidad/bucle con espejo exacto. Residual de clase: smoke
  C (evidencia de controles en vivo).
- P1 (lectura limpia de fps, abierto desde 212) SIGUE ABIERTO — 215 no
  lo aborda; viaja.
- Oráculos de continuidad ACTUALIZADOS: route **50e77eb** (cadena real
  81f9b51→4946957→50e77eb), types **62a5e8e**, page **e45355c**,
  TimeBar **98879f9** (incluye la blank de o2), replay.test **05eea9a**;
  sin cambio d3a1315 (slice.test), 264f7f8 (scene), c1ac6d9 (slice),
  46fcb9e (RadioPanel).
- Ledger: …/213/214(GLM)/**215/216(GLM)**; 193-194 reservados (swap);
  próximo libre **217**.

## 7. Prescripciones (217)
1. **P1** (persistente): lectura limpia de fps contra el ancla 60 —
   sigue abierta desde 212.
2. **p1-216** (ledger route): adenda reconociendo el fork de base de la
   sección route (pre declarado 81f9b51 con hunks C1 re-llevados vs
   cadena real 4946957) y re-anclaje: el pre-blob de TODO futuro delta
   debe ser el post del último drop entregado en ese fichero — sin
   excepción, aunque el resultado converja.
3. **p2-216** (TimeBar): el delta de la línea en blanco
   (8297dfe→35c940f) queda absorbido en 98879f9 y documentado aquí;
   regla prospectiva: ningún estado que sirva de base a un diff puede
   contener ediciones locales no entregadas — si el árbol local diverge
   (aunque sea un blank), el diff debe regenerarse contra la cadena.
4. **p3-216** (opcional, paridad): default replaySpeed 1→2 para calzar
   App.cpp:284 (2.0f). One-liner en DEFAULT_SETTINGS.
