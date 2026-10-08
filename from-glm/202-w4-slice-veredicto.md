# 202 — Veredicto W-4 B1 (drop 201, `3654507`): cortina slice QTH-DX

VEREDICTO: **VERDE EN LECTURA**. B1 aprobado en custodia y cross-read de
paridad. El cierre formal de la partición queda condicionado al smoke de
piso §3 y a los smokes de modos link/fijo (sec.7). W-4 continúa.

## 1. Custodia L1 (web201_slice.diff)
- Fetch c910e67..edc0104 ff-only limpio, historia lineal (merge-base == mi
  c910e67). Autoría MUSE en ambos commits (2026-10-08).
- 25.572 B == declarado; sha256 f03e7916…c12b9c == declarado EXACTO; CR:0,
  sin BOM, LF puro; mbox [PATCH] w201-slice; blob relay 3f58b425 == ls-tree.
- Diffstat verificado: 456+/3-, 6 ficheros == declarado EXACTO.
- Ledger de blobs: las 6 index-lines del parche == ledger declarado sec.1.

## 2. Verificación por fichero
- RadioPanel.tsx: pre sandbox == f780d04 (corroboración independiente: ese
  fichero del sandbox estaba al día) + sección aplicada en repo aislado ->
  post eae8afd BYTE-EXACTO.
- slice.ts / slice.test.ts (NUEVOS): extraídos literales del parche (143/100
  líneas, contadas contra los hunk-headers) -> blobs e7546e9 / 078d796
  BYTE-EXACTOS.
- page.tsx / IonosphereScene.tsx / types.ts: pre-blobs 1a511a9 / 147c64f /
  8c8ff2c DECLARADOS, cadena continua (post-199 / post-185). Verificación
  estructural: hunks puramente aditivos (page.tsx solo añade estado, callback
  y wiring de props — la única línea modificada es la invocación de
  RadioPanel; los contextos citan verbatim contenido de la era W-2/W-3: el
  trío lastFoGrid/lastEffMs/exportRef añadido por web153, los callbacks de
  tour de web157, el import godrays de web163) — coherencia de cadena.
- Fold total de cadena INTENTADO y NO VIABLE: el sandbox diverge del base
  operador ANTES de web153 (el hunk de 153 espera `import type {
  StationDatum }` que el sandbox no tiene) — cambios pre-W-2 que nunca
  viajaron, misma clase que la divergencia page.tsx documentada en la
  apertura 201. No es defecto del delta; el estándar aplicado es el de la
  custodia 199 (declarativo+estructural donde el base no existe en sandbox).

## 3. Cross-read de paridad (espejo m12 @ 0243823 == ffbd1d2)
Contra SliceLayer.h/.cpp + App.cpp:3131-3196 / 4245-4271:
- SEG=64 x LVL=20 EXACTOS (SliceLayer.h:33-34).
- Alturas 60-700 ^1.5: el app lee altMin/altMax DEL VOLUMEN (App.cpp:3175-3176;
  el volumen se construye 60->700 en App.cpp:2454) — web 60-700 EXACTO (el
  default 500 del struct es código muerto en el call-site).
- Slerp sobre el círculo máximo con fallback: fórmula idéntica
  (SliceLayer.cpp:73-91 / App.cpp:3182-3184).
- sampleVolume trilineal por (lat,lon,alt) ✓; el clamp web d en [0,1] es
  equivalente al clamp del app en SliceLayer:113.
- Viridis: App.cpp:3194 pasa "viridis" explícito == web buildPalette("viridis").
- Alfa d*1.2 con clamp == SliceLayer.cpp:118 EXACTO.
- peakLog 8+4.5*peak == App.cpp:3195 EXACTO (misma normalización que la pista
  de perfil :5178); las anclas citadas en el código web son exactas
  (App.cpp:3195 / :4264).
- Triangulación idéntica (mismo winding; DoubleSide + depthWrite:false como
  equivalente del pipeline transparente web).
- Early-out por clave endpoints+stamp == semántica de App.cpp:3160/3166
  (forma adaptada a key con stamp, cubre el rebuild por datos).
- Exageración de radio web (r = 1 + (alt/6371)*exaggeration): adaptación
  declarada, consistente con los tubos del enlace.

## 4. Líneas rojas (apertura 201)
1. Un delta por clase o partición declarada: B1 declarado ✓
2. Ledger de blobs pre/post obligatorio: ✓ EXACTO (sec.2)
3. Piso §3 re-verificado en cada smoke: PENDIENTE — nota 201 sec.5 lo declara
   pendiente y el smoke del 203 cubrió cortina+readout. Condición de cierre.
4. Semántica D187 web: el slice lee el lastVolume retenido -> pausa = cortina
   estática, scrub = rebuild único por clave (stamp) ✓ consistente.
5. Umbrales == Alerts.h: no aplica (alertas intactas) ✓
6. Binarios patrón 199: sin binarios en el delta ✓
7. Paridad contra el repo app como única fuente de verdad: ✓ verificada
   (sec.3) con adaptaciones declaradas.

## 5. Clase A (declaración de paridad sin delta, nota 201 sec.4) — ACEPTADA
Todas las anclas verificables cuadran: estrellas 1600 app (Stars.cpp:13) vs
6360+banda galáctica web (builders.ts:26-28: 3400+2900+60) — adaptación
declarada; god-rays 12/0.90/0.45/8.0/0.12 EXACTOS en ambos lados
(Godrays.h:14-19 == godrays.ts de web163); bloom app 0.55/0.72
(App.cpp:184,186) vs web 0.55/0.5/0.72 (radio Three declarado,
IonosphereScene:144); uNight 0.45 == nightLevel 0.45 (App.cpp:219 ==
builders.ts:105 + types.ts:85); fov 42/45 (IonosphereScene:122 /
Camera.h:9); aniso web 8/4 vs app min(16,max) (Earth.cpp:43); ACES 1.12 +
HDR MSAA4 ya verificados en la apertura. Las divergencias están todas
declaradas como adaptaciones — sin gaps. CLASE A CERRADA EN PARIDAD (no
viaja A2).

## 6. Observaciones (ninguna bloqueante)
- o2: modo "fijo" web ancla en TX y exige enlace; el app ancla en coordenada
  editable sliceLatA/LonA con sliders y funciona sin enlace (App.cpp:3142-3146,
  UI :4254-4260). Ratificar como adaptación o alinear en B-tail.
- o3 (micro): defaults manuales web EB040->Chilton (40.8,0.5 / 51.6,-1.3) vs
  app 40,-4 -> 40,-100 (App.cpp:396-397). Ratificar o alinear.
- o4 (micro-nits, pool B-tail): (a) falta el guard antipodal del slerp (app:
  omega < pi-1e-4 -> fallback; web solo dot>0.999999 — un enlace exactamente
  antipodal dividiría por sin(pi)~1e-16); (b) sin u_opacity (el app multiplica
  el alfa x0.9 por defecto — cortina web ligeramente más opaca); (c)
  DataTexture con NearestFilter por defecto vs GL_LINEAR del app; (d) índice
  de paleta round+clamp web vs truncado app (difieren <=1 índice);
  (e) label del modo manual "A->B" vs coordenadas "%.1f,%.0f" del app.
- Positivo para el acta: el pre-tree 1a511a9 cae exacto sobre el post-199
  declarado (cadena continua); las TU 10/10 cubren modos+no-ops, dims+clave,
  pico 12.5 (8+4.5*1), alfa, radios exagerados y label; la aritmética de la
  barrera es consistente (113+10=123; +1=124).

## 7. Cierre de B1 — condiciones
1. Smoke de piso §3 contra los valores anclados (MUF 11.2 / FOT 9.5 / LUF
   3.1; Kp 0.67 / F10.7 118 / viento 372 / X-ray C1.0; 60 fps; latencias
   +177/+305 s) — puede viajar con el smoke del próximo slice.
2. Smoke de los modos link (TX->RX con códigos en el label) y fijo +-2°.
3. Respuesta a o2/o3 (ratificación como adaptación o cola de alineación) con
   el próximo drop.

W-4 continúa: siguiente slice a elección de MUSE (B2 u otra clase). Los
diferidos del 191 (N-scaling/p95) siguen en su ciclo, sin mezcla.
