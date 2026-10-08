# 201 — apertura W-4 (demo modo A): higiene 199 custodiada + checklist 6 clases aprobado

## 1. Resultado
Lote 5a05a9c absorbido (ff limpio sobre 8af81b8, 1 commit, 3 ficheros
+53.853). Higiene 199 CUSTODIADA: L1 exacto, 4/5 ficheros
fold-verificados byte-exacto (2 de ellos contra oráculo doble
webclone+espejo m12), page.tsx declarativo con divergencia documentada
(sec. 3). Checklist de 6 clases CROSS-LEÍDO Y APROBADO con anclas
verificadas contra el espejo m12 (sec. 4). W-4 QUEDA ABIERTO desde
este correlativo con las líneas rojas de la sec. 5. Ledger: 197
ruling previo (verbatim archivado), 199 higiene, 201 apertura (este);
193/194 siguen reservados (línea swap); 195/196 usados. Opción del
drop como delta corto propio (no dentro del arranque W-4) — tomada
bien: atribución limpia.

## 2. Custodia L1 del delta web199_higiene.diff
- Tamaño 3.600.303 B EXACTO == pin; sha256
b03c2fdb50377027cf8d2e82ecc24cd95b9ca203b5422f7d609e1ffa2e9f563c
EXACTO == pin (descarga íntegra).
- CR:0 ✓ (LF puro como declarado), sin BOM ✓, mbox bien formado
(From/Subject/[PATCH] w199-higiene), 5 secciones diff --git, diffstat
mbox +5/−2 == declarado (next.config +3; page 1+/1−; TimeBar 1+/1−;
2 binarios nuevos).
- Procedimiento post-mojibake CUMPLIDO: --output directo (cero
captura de consola), binarios --binary con literales embebidos,
blob-shas en las líneas index. Única línea no-ASCII: comentario
"producción" (UTF-8, benigna). Observación menor: fecha From nominal
Mon Oct 12 00:00:00 2026 +0200 (día-de-semana correcto) — la
custodia viaja por sha, no por fecha; sin consecuencias.
- Auto-custodia MUSE (apply --check + apply autocrlf=false +
am --keep-cr) declarada en el pin; verificación independiente GLM en
sec. 3.

## 3. Fold-verificación por fichero (apply aislado + hash-object)
- next.config.ts 0bd2f11 → fee18e8 BYTE-EXACTO (aplicado sobre copia
  de la base compartida; hash-object == index del parche). Contenido:
  allowedDevOrigins ["127.0.0.1"] + comentario de 2 líneas — == ruling
  197(d).2.
- TimeBar.tsx 2af4734 → 8297dfe BYTE-EXACTO (ídem).
  suppressHydrationWarning en el span del reloj — == 197(d).3-4.
- public/textures/earth-day.jpg: literal 2.566.770 B decodificado →
  blob 55b715d0 == index del parche == webclone local == espejo m12
  (sha256 a9f00889…) — "desde el repo app" VERIFICADO triple.
- public/textures/earth-night.jpg: literal 262.051 B → blob f94cd826
  == parche == local == m12 (sha256 1785ebc5…) — VERIFICADO triple.
  Nota: earth-night-hires.jpg (8,1 MB) queda fuera del drop —
  correcto, no es prerrequisito del init 3D; si W-4 clase A lo
  necesita, viajará por la misma vía.
- src/app/page.tsx: hunk 1+/1− leído exacto (suppressHydrationWarning
  en el span del now — == 197(d).3-4). Pre 782d043 → post 1a511a9
  DECLARADOS; la base del operador no existe en el sandbox, así que
  la custodia de este hunk queda a nivel declarativo+estructural
  (mínimo, quirúrgico, coherente). DIVERGENCIA DOCUMENTADA: el
  sandbox GLM tiene un page.tsx distinto (558e6e56 — subsolar por
  reloj de pared `subsolar(now)`, `°` literal, reloj a :165) vs la
  base del operador (782d043 — subsolar replay-aware
  `subsolar(new Date(effSec*1000))`, `{"\u00B0"}` escape, reloj a
  :207). El hunk NO aplica sobre la copia sandbox (contexto
  divergente) — NO es defecto del delta: la línea W-4 es la del
  operador. Nadie sincronice el sandbox a ciegas.

## 4. Cross-read del checklist 6 clases (nota 199 sec. 4)
- Estructura: A init 3D/globo ✓; B enlaces HF ✓ (ABSORBE los paneles
  MUF/FOT/LUF de mi enumeración 197(b) — cobertura íntegra, estructura
  más limpia); C replay ✓; D alertas ✓; E grid ionosondas ✓; F
  shell/volumen — clase NUEVA fuera de la enumeración 197: APROBADA.
  Mi enumeración salió del piso verificado vivo (mínimo, no techo); F
  es contenido de nivel app ausente hoy en el webclone — exactamente
  lo que el refresh debe añadir. Mejor explícito que implícito.
- Anclas verificadas contra el espejo m12 (custodia):
  (a) Alertas: KP_AMBER 4.0/KP_RED 5.0, BZ −5/−10, XRAY rank 2(C)/3(M),
  MUF_DROP 0.10/0.20 vs mediana 24 h, DEBOUNCE_N 2, enum
  GREEN/AMBER/RED/OFF — TODO == Alerts.h:13-22 del app. El checklist
  cita las anclas exactas.
  (b) God-rays "12 taps" == godrays.frag:2 del app (literal).
  (c) Replay pausa-estática (D187 lado web) — semántica ya certificada
  en el fold j191 (replay pausado fijo → skip); se exige equivalencia,
  no reinvención.
- Spot-checks del webclone (lado vivo): anisotropy "hoy 8/4" ==
  IonosphereScene.tsx:109-110 (day 8/night 4) ✓; fondo #02040a
  presente (layout.tsx:28, page.tsx:133) ✓; pipeline ACES+exposure
  1.12+MSAA4 HDR documentado en el catálogo del app (ideasData) ✓.
- Piso §3 APROBADO COMO PISO MEDIBLE: coincide con la lista verificada
  viva del operador y la enriquece con valores anclados (MUF
  11.2/FOT 9.5/LUF 3.1; Kp 0.67/F10.7 118/viento 372/X-ray C1.0;
  60 fps HUD; latencias DATA +177/+305 s). Los valores concretos son
  la referencia de re-verificación, no solo el "verde".
- Cierre por clase: checklist verde + smoke operador en navegador +
  piso §3 intacto; modo A cierra 6/6 + piso — == ruling 197(b). OK.

## 5. Apertura W-4 — orden de marcha y líneas rojas
La tanda avanza por clases (deltas por clase = partición interna,
197(c)); el orden lo elige MUSE. Cada delta de clase declara:
(a) clase + ítems del checklist que cierra; (b) blob-shas base por
fichero tocado (pre) y post; (c) smoke del operador con piso §3
re-verificado completo; (d) transporte --output + encoding en adenda.
Líneas rojas (heredadas + nuevas):
1. Un delta por clase (o partición declarada DENTRO de la clase); sin
   mezclar clases en un delta.
2. Ledger de blobs obligatorio (línea roja nueva, nace del page.tsx
   de este drop): la sec. 3(b) cierra byte-exacto lo que hoy quedó
   declarativo.
3. Piso §3 intocable entre clases: cada smoke re-verifica la lista
   completa contra los valores anclados.
4. Semántica D187 lado web: pausa replay = volumen estático; scrub →
   rebuild único.
5. Umbrales de alertas == Alerts.h del app (anclas ya verificadas en
   sec. 4); sin umbrales inventados ni "mejoras" silenciosas.
6. Binarios: patrón 199 (--binary embebido + blob-sha en index) o
   copia verificada por sha con origen declarado.
7. Paridad se mide contra el repo app (fuente de verdad), no contra
   la muestra ni contra el sandbox GLM (copia divergente, sec. 3).

## 6. Observaciones y pedidos
- (o1) Divergencia sandbox/operador en page.tsx documentada (sec. 3):
  irrelevante para la custodia mientras el sandbox no se use como
  base de nada. Si en algún momento se quiere alinear, pasa por
  decisión explícita de ambos, no por sync silencioso.
- (o2) mode bits: los ficheros del sandbox viajan 755 y el parche
  declara 644 — warning benigno del apply, solo cosmético.
- (p1) Primer delta de clase que cierre: el que MUSE elija; con el
  ledger de blobs (línea roja 2) desde el primero.
- Mi lado: deuda del 191 CERRADA (veredicto 196); los diferidos
  N-scaling/p95 siguen siendo cargo del ciclo 191, no de W-4. Nada
  bloquea la tanda.
