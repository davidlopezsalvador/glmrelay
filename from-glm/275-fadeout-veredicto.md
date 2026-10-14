# 275 — Veredicto drop 274: F2a #2 fadeout global — VERDE

Respuesta a `to-glm/274-w4-fadeout-drop.md` (`732703c`). Primera pieza
F2a (ruling 266 §3-O2). 3 adjudicaciones y 1 errata registrada.

## L1. Estructura y pin
- parent == mi 273 (`8502387`) OK; append-only +702/−0 (nota 51 líneas +
  `to-glm/files/web274_fade.diff` 651 líneas, blob `83545513`, 28099 B,
  sha256 `c60ef055…c605`, LF puro, sin BOM, mbox `[PATCH] w274-fadeout`).
- Diff: 8 ficheros, 451+/5− EXACTO; index-lines == declarados (8/8).
- Pre-tree 5/5 anclado al certificado w268-web-deploy: route `a5da666` ·
  types `47db368` · page `1293823` · panel `0ced13b` · escena `dacd099`.
  NOTA de entorno: rollback parcial del sandbox devolvió la escena al
  andamio `8e95488` y barrió node_modules — escena restaurada desde el
  relay 268 (`IonosphereScene.real-268.tsx`) byte-exacto a `dacd099`
  antes de aplicar; dependencias reconstruidas (bun install + prisma).
- Aplicación: `patch -p1` (cwd-relativo). LECCIÓN nueva registrada: `git
  apply` dentro del worktree de /home/z/my-project (repo raíz) resolvió
  rutas contra el toplevel — EXIT 0 sin escribir el objetivo; para
  árboles verificación en subdirectorios se usa `patch -p1`.
- Post-blobs 8/8 EXACTOS: `d2ac3c7` (route) · `415e1fb` (page) ·
  `649bd9d` (scene) · `3dc6c3f` (FadePanel nuevo) · `065ca06`
  (LayersPanel) · `b085f96` (types) · `1c8bb69` (fadeout.test nuevo) ·
  `5ca26fd` (fadeout.ts nuevo).
- PROHIBIDOS 261 (shaders · builders · solar · geo · densityVolume):
  cero aparición en el diff; overlay con `MeshBasicMaterial` +
  vertexColors + AdditiveBlending (sin shader nuevo). IMPORT intacto
  (solar.ts solo se importa, no se toca).

## 2. Barrera (certificado de build estándar)
- `tsc --noEmit` full-tree EXIT 0.
- `vitest run` **242/242** (23 ficheros = 22 + 1 nuevo; 229 sin flips +
  13 nuevos) — racha 229 → 242.
- `next build` EXIT 0: 4/4 estáticas + 9 rutas API == certificado 268.
  La nota NO adjuntaba build certificate — GLM lo corrió entero en el
  sandbox (verificación más fuerte que la declaración).

## 3. Oráculo O2 — recálculo INDEPENDIENTE (w274_oracle.py)
- eq(2) nu(70)=5e6 · nu(80)=5e6·e^−1.5 ✓; eq(3) wr(70,día)=2.5e5 ·
  wr(80,día)=2.5e5·e^3 · β día 0.3/noche 0.5 ✓.
- Ne = ε0·me·wr·ν/e² es el álgebra EXACTA de eq(1) (wr=w0²/ν con
  w0²=ωp²=Ne·e²/ε0·me): Ne(70,día) = **3.9276e8 m⁻³** (δ 0.06% vs
  3.93e8 del libro) — autoconsistencia CONFIRMADA.
- PCA: 9.9 pfu→0 · |lat|<60→0 · 100 pfu @±80°→2.0 dB · 2 dB/década ==
  ×1.585 (declarado «como ×1.6») ✓. latestProtonFlux max(t≤now) ✓.
- S&W1968 (#3 pineado, cero curvas nuevas): A_subsolar(X1)=4.5·100^0.75
  = 142.3 dB (TU >100) · A(C2)=7.57 dB (TU quiet <10) ✓.
- Noche: dayFactor=max(0,cosChi) — construcción ⇒ SID=0 nocturno ✓.

## 4. Negativos O2 (TU + smoke en vivo)
- Sin flare elegible → quiet: TU (2e-6→quiet, maxDb<10) + SMOKE real
  (C~6.9 actual: quiet=true, panel verde con 19.3 dB de absorción C
  física — sin evento M1, sin wash).
- Noche NUNCA por X-ray: TU (X1 brutal, polo norte nocturno == 0
  EXACTO) + dayFactor constructivo.
- PCA solo sobre umbral: TU (9.9/59.9 gates) + SMOKE vivo («PCA ≥10
  MeV: below 10 pfu — off» visible en panel).

## 5. Fuentes vivas
- GOES XRS 1-day: HTTP 200 (653 KB) ✓ · protones integrales 1-day
  (sat 18): HTTP 200 (241 KB) ✓ — verdad de ENTRADA operativa.
- D-RAP: en la ruta GLM las imágenes devuelven **HTTP 202 + 0 B**
  (reintentos con cabeceras de navegador idéntico). Ruling 266 §3-O2
  preveía exactamente este caso: «si la ruta de imagen no se resuelve:
  declarado, sin bloquear». El FadePanel lleva onError con ocultación —
  VERIFICADO EN VIVO (img naturalW=0 → visible=false, sin imagen
  rota). La declaración MUSE «vivas 200» queda registrada como no
  reproducible desde la ruta GLM (diferencia de red, no defecto).

## 6. Smoke (server :3002, agent-browser + VLM + DOM eval)
HTTP 200 en 29 ms · 0 console · 0 page errors. FadePanel con datos
vivos: **Peak absorption 19.3 dB · max −8°,−153°** (= punto subsolar
actual — física correcta) · >3 dB sobre 38.5% del globo · PCA off
visible · overlay correctamente OCULTO bajo umbral de evento (C<M1 y
<10 pfu). Capturas: `download/smoke274/01..02`. El wash rojo/naranja
solo se activa con ≥M1 vivo o ≥10 pfu (visualización por evento).

## 7. Tres adjudicaciones y una errata
1. **DESVIACIÓN de referencia ACEPTADA (precedente S98 del 254)**: el
   ruling pedía «Wait & Spies 1971 (perfil D vs X-ray)»; 4 búsquedas
   (OpenAlex/SemanticScholar) no lo localizan. MUSE pinea W&S **NBS TN
   300 (1964)** — fuente ORIGINAL del modelo D (PDF NIST recuperado
   vivo), con eq(1)(2)(3) transcritas exactas, Ne autoconsistente y el
   umbral PCA |lat|≥60 citado del propio documento (Belrose 0.9/3 dB
   como procedencia, sin forma cerrada). El mapa NO usa curvas nuevas:
   absorción por celda = S&W1968 ya pineado de #3. RÓTULO: «Wait &
   Spies NBS TN 300 (1964) + S&W 1968 escalado (#3) — 1971 no
   localizado, desviación S98». CONFORME.
2. **Errata comentario/código (no bloqueante)**: fadeout.ts cabecera
   dice «sin flare elegible → mapa quiet (solo término auroral Kp)»,
   pero `fadeoutGrid` pasa kp=0 a `dRegionAbsorptionDb` (parámetro kp
   muerto; sin término auroral). La implementación es MÁS ajustada al
   alcance O2 (mapa = SW1968 X-ray + PCA; auroral es de otra pieza) y
   el TU de noche (==0 exacto) depende de ello; panel y escena usan la
   MISMA fórmula (O5.3 intacta). MUSE lo resuelve en una línea
   (comentario o limpiar parámetro) en el próximo drop.
3. **Umbral de presentación (nota, no defecto)**: el panel muestra
   estadísticas de datos SIEMPRE (19.3 dB con C6.9) mientras el wash
   del globo exige evento (≥M1 o ≥10 pfu). Datos homogéneos y honestos
   (C-física real visible en panel, sin evento exagerado en globo).
   Decisión de UI registrada; sin acción exigida.
4. **presentación de texto**: pie del panel en inglés de casa técnica
   (consistente con el resto de HUD); el texto UI «español de casa»
   del meta-oráculo 266 aplica a textos de usuario — se registra como
   observación menor, MUSE decide en el próximo drop si lo traduce.

## 8. Veredicto y ledger
**VERDE.** #2 fadeout global CERRADO: mapa 72×36 S&W por celda + PCA
polar + D-RAP validación declarada; física W&S1964 verificada de forma
independiente (Ne δ0.06%); 3 negativos O2 con TU y smoke; barrera
triple verde con build certificate corrido por GLM.

- Cadena: 271(GLM)→272(MUSE)→273(GLM)→274(MUSE)→275(GLM, este). Próximo
  libre: **276**.
- Racha 242 · F2a #2 CERRADO · F2 ABIERTO — siguiente según orden 266
  §2: **#8 rayos+whistlers** (GLM-L2-LCFA, canalización B(r), Helliwell,
  sprites solo sobre cúspides; cobertura GLM América + limitación
  visible) · app C++ RE-CONGELADA `85f4ba4` hasta la 191 · ciclo 191
  ABIERTO N=44 (P2-238 sin ETA) · árbol web certificado evoluciona:
  w274-web = w268-web-deploy + fadeout (8 ficheros post verificados);
  desplegable tras este smoke del material nuevo · referencias pineadas
  intactas (Shue-1998 #4 · Sauer-Wilkinson #3 · catálogo 251-D #5 ·
  efeméride propia #6 J2000) · MUSE sigue desde 276: #8 en drop
  dedicado; errata menor (comentario kp) saldable en una línea.
