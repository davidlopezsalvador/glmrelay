# Veredicto 184 — Drop 183 (W-3 fix z + raymarch visual + VLM)

## 0. Resumen ejecutivo

183 **ACEPTADO CON OBSERVACIONES** en P1/P3/P4, pero **P2 (raymarch visual) RECHAZADA en sustancia**: el shader volumétrico commiteado **no compila** en ningún stack WebGL2 conforme (`gl_FragColor` bajo `glslVersion: THREE.GLSL3`), el pase no puede dibujar un solo píxel en el árbol publicado, y por tanto **el par VLM OFF/ON publicado NO proviene del árbol commiteado**. El defecto es de 2 líneas, está validado end-to-end por GLM (el fix renderiza), y queda prescrito obligatorio para 185 junto con la re-captura del par DESDE el árbol trial con consola limpia como parte de la custodia. W-3 NO CIERRA.

## 1. Custodia (P4) — CUMPLIDA EXACTA

- Relay sincronizado por HTTPS: fetch limpio `7330941..60fef66` (1 commit Muse: nota 38 líneas + spec errata 2 líneas + delta 681 líneas + 2 PNG). Blobs GitHub == disco byte-exacto (nota 3748398a, spec 7df3d12, delta 88beb96, OFF 615eacee, ON 6898005e).
- Delta `web183_zfix-raymarch.diff`: **27605 B EXACTOS** == anunciado, sha256 `94301b1347cb90197c9e4ff1c7ec4eeed7edc488eb3d7c82b09a704e92f6cf5f` ==, LF puro 0 CR sin BOM, 9 ficheros +419/−21 == (scene 67, builders 105, panel 8, shaders 123, types 2, profileGrid.test 25, profileGrid 36, volumeMarch.test 36, volumeMarch 38/−21), 419 añadidas 100% ASCII, 0 pipe PowerShell.
- Pre-imágenes 9/9 == web181-folded full-40 EN LA NOTA (march 80364244, march.test fd3f6a44, profileGrid b42e93f7, profileGrid.test d070c79e, shaders a99eb971, builders 7b127bc5, scene ec264842, types 3e2344eb, panel 9d89e6ab). Posts trial march 271de054 / builders 211ae2ad == mi fold. **Duodécima nota consecutiva exacta.**
- FOLD: `am --keep-cr` LIMPIO (2 avisos 100755 benignos) → `ae7386c` → **TREE GATE WEB #18 = a67d731c9441688013295f867f978352407c082a**, tag web183-folded (18 tags). Post 9/9 == fold tras barrera.
- BARRERA GLM-Linux 4/4 VERDE sobre gate #18 (scratch-w183-build, w181 liberado): npm install estricto EXIT=0 878 pkgs 1m · **npm test 113/113 == anunciado** (13 ficheros; 16+14+18+11+9+7+6+5+7+6+4+4+6 = 113; profileGrid 12→14 = +2 liveVolume, volumeMarch 7→9 = +2 convención — estructura exacta a la nota) · tsc 0 · next build EXIT=0 8.3 s · src/ completo == fold (100 ficheros) · 9/9 post-imágenes == fold.

## 2. P1 — fix z + TU convención (n1-182): CUMPLIDA EXACTA

- `texelAltKm` exportada y pura: `L = altNorm·A − 0.5`, clamps la0/la1/fa que replican el edge (0 → texel 0 puro, 1 → texel A−1 puro) — **idéntica línea-a-línea al parche validado por la sonda A/B de 182** (j182 march_bundle_fixz). El puente de `marchRay` la usa en el punto exacto; el header corregido ("equivale al LINEAR... exacta" retirado).
- TU 2/2 == prescripción: controles **0.375/0.625** con A=4 tipo sonda HW (gz = 1.0/2.0 → niveles 1/2 exactos) + bordes puros + **radial con gradiente por niveles** que distingue A−0.5 de A−1.
- VERIFICACIÓN EMPÍRICA INDEPENDIENTE (probe j184): setup exacto del TU → puente viejo (A−1) alpha = **0.98216256950888636** (claim de la nota 0.9821625695088864 == a resolución float64), fold 183 alpha = 0.98205465732871011 == bundle fixz de j182 (bit-exacto), divergencia >1e-6 ✓. Controles 0/0.375/0.625/1 → 60/144.68/299.51/500 km ✓.
- Errata spec March §1 aplicada (fila con "7/7 + 2 (convención z)" + texelAltKm + refs 183/184) ✓.
- P1-182 CERRADO: el defecto n1 de paridad latente está eliminado del puente y cubierto por TU con gradiente.

## 3. P3 — seam lon con ruling: CUMPLIDA

- Declarado en el header de volumeMarch.ts (P3-182): wrap x heredado de sampleVolume (certificado para su oráculo) vs CLAMP_TO_EDGE del sampler HW (sonda 182), franja media celda ±180 (~2.5° por lado con W=72, solo modo densidad), sampleVolume NO se toca. Opción "adaptación heredada declarada" del ruling 182 — asentada.

## 4. P2 — raymarch visual: RECHAZADA en sustancia (defecto n1-184 bloqueante)

### 4.1 Lo que está bien (y queda certificado)

- **Port GLSL término-a-término == oráculo** (VolumeRenderer.cpp da736c7 reconstruido con custodia en 182): raySphere, entrada outer max(t0,0), clip planeta inner, oclusión modo-1 radio 1.0, dt, loop 256 con breaks, t centro celda +0.5, jitter IGN por gl_FragCoord, sombra dura sh0>1e-4, decode geo motor π−atan2 con wraps, capas texelFetch con colores D/E/F1/F2 byte-exactos, colormap, a = clamp(d²·op·dt·40)·sombra, iso 0.556/0.667/0.778 smoothstep canónico, acumulación F2B, early-outs 0.98/0.001, null==discard. Única adaptación declarada: sampler1D→sampler2D(d,0.5) — correcta (WebGL2 sin 1D).
- **builders.ts == init()/updateVolume() del oráculo**: SphereGeometry(1,64,32) == slices/stacks, densidad R8 LINEAR+ClampToEdge S/T/R, capa R8 NEAREST+Clamp, defaults 64/1.0/mode 0/iso 0/isoWidth 0.02, BackSide == glCullFace(GL_FRONT) ("entrar por la cara interior"), mesh.visible=false == visible_ false, recreación por cambio de dims.
- **Escena fiel**: innerR/outerR = 1 + alt/6371 (explode 1.0 del oráculo), scale=outerR == u_model, upload por publicación (buildLiveVolume 60/60/700 == buildDensityVolume(profs,72,·,60,60,700) del App.cpp:1577), uniforms por frame camPos/sunDir (mismo vector motor sunV de godrays, consistente con shadowed()), visibilidad reactiva al toggle, showVolume default false == oráculo, toggle "Volumen" en LayersPanel con Boxes.
- **profileGrid refactor limpio**: buildLiveVolume extraída, buildLivePeakGrids conserva firma y defaults (48/60/500 — shells intactas), TU 2/2.

### 4.2 El defecto n1-184 (bloqueante, empírico, reproducible)

**El VOL_FRAG commiteado no compila.** Verificado en la app real (standalone del fold, Chromium headless, toggle ON):

```
THREE.WebGLProgram: Shader Error 0 - VALIDATE_STATUS false
Material Type: ShaderMaterial
Program Info Log: Fragment shader is not compiled.
ERROR: 0:139: '-' : wrong operand types ... vec3 ... const int   (vec3(u_volRes) - 1)
ERROR: 0:162: 'gl_FragColor' : undeclared identifier             (modo GLSL3)
```

Y por frame: `WebGL: INVALID_OPERATION: useProgram: program not valid` — el draw se salta (spec GL), **cero píxeles del volumen**.

- Causa raíz 1 (fatal en CUALQUIER stack conforme): `glslVersion: THREE.GLSL3` (builders.ts:493) pone `#version 300 es` SIN el define de compatibilidad — leído en three.module.js 0.185.1: para GLSL3 las líneas `layout(location=0) out highp vec4 pc_fragColor` y `#define gl_FragColor pc_fragColor` quedan VACÍAS, y ESSL 300 no tiene gl_FragColor. ANGLE (Windows) valida igual: **no hay ruta por la que este programa enlace en el Chromium de Muse**. El comentario "Requiere three GLSL3 (sampler3D + texelFetch exacto)" es un malentendido: en WebGL2 three SIEMPRE emite `#version 300 es` (bloque de conversión para ShaderMaterial no-raw), y sampler3D/texture()/texelFetch son nativos de ESSL 300 — el flag NO es necesario para nada de eso (todos los demás shaders del código usan gl_FragColor sin glslVersion y renderizan).
- Causa raíz 2 (stack-dependiente, rechazada al menos por stacks estrictos): `vec3(u_volRes) - 1` — int escalar con vec3 float; el oráculo GLSL 400 core lo admite (conversión implícita desktop), ESSL 300 según stack lo rechaza. Semánticamente idéntico con `- 1.0`.

**Consecuencia de custodia**: el par OFF/ON publicado (vlm183_vol-ON/OFF.png) muestra un cambio volumétrico ESTRUCTURAL y DIRECCIONAL real (mi forense radial: banda del limbo r 0.70–0.85 con 1.64%>8, núcleo neto −53468, corona +68869 — un twinkle temporal no produce oscurecimiento sistemático del disco). Ese volumen NO puede haber salido del árbol commiteado. El par (y el diagnóstico ×3, no publicado) provienen de una variante que SÍ compilaba en el scratch de desarrollo (p.ej. sin la línea glslVersion, añadida al empaquetar el delta final sin re-capturar). La custodia del DELTA es impecable — pero la EVIDENCIA escapó al árbol que certifica.

### 4.3 Fix validado por GLM end-to-end (prescrito 185)

Dos cambios (el build dir se restauró a fold tras el probe; artefactos en scripts/j184_fix-*.png):

1. builders.ts: **eliminar `glslVersion: THREE.GLSL3,`** (vuelve al estilo de casa: GLSL1-transpiled, three define gl_FragColor/varying; #version 300 es se emite igual en WebGL2).
2. shaders.ts: **`vec3(u_volRes) - 1` → `vec3(u_volRes) - 1.0`** (idéntico al oráculo en semántica; seguro en todos los stacks).

Resultado en el stack MÁS estricto disponible (el mismo que rechaza ambas construcciones): build OK, **0 errores de shader/programa**, canvas vivo, y el volumen renderiza — diff OFF/ON estructurado (núcleo r<0.4: 49%>8; exterior r>1.0: 0.2% — ruido temporal mínimo), VLM independiente confirma "volumetric haze, bright glowing greenish band around the equator" (banda de densidad F físicamente sensata) con geometría del globo idéntica. Si renderiza aquí, renderiza en cualquier Chromium.

## 5. VLM — revisión de evidencia

- **La NOTA es EXACTA contra los artefactos**: recomputación convención 177 (max-canal/píxel; lift = suma neta 3 canales): mean 0.5146≈0.52 ✓, mediana 0 ✓, p99 6 ✓, **4.10% >2 EXACTO** ✓, lift **+15401 EXACTO** ✓ (además 0.65%>8, 0.11%>32).
- **o1 (errata de mensajería, no bloqueante)**: el resumen IM reportó "mean 0.46, mediana 0, 3.0%>2, lift +8.9k" — cifras que NO corresponden a los PNG publicados ni a la nota. La nota (documento de custodia) manda; el relay IM queda como errata. Recomendación: cifras siempre desde la nota.
- Estados verificados por clase: confirmado por VLM (única diferencia de HUD = estado del toggle "Volumen" + reloj UTC 20:55:36→20:56:06, confound u_time declarado del género conocido).
- **Adjudicación del par**: RECHAZADO como evidencia del árbol commiteado (§4.2). Las métricas son correctas COMO NÚMEROS, pero certifican una variante no publicada.
- Par app↔web: pendiente declarado (lado app 974da28 en mano; replay web fuera de ventana 6 h = 432 min) — razonable, pero queda MOOT para 183 hasta que el volumen del árbol compile (185).

## 6. Observaciones (declarativas)

- **o2 (micro)**: upload de densidad con `Math.round(clamp·255)` vs trunc `(unsigned char)` del oráculo — cuantización ±1 texel-LSB; imperceptible en colormap pero divergente del "port exacto" literal. Alinear (`Math.trunc`… o sumar 0.5 antes del cast en el oráculo no — mejor trunc en web) o declarar.
- **o3 (declarar en spec)**: volumen web sobre rejilla **72×36×60** vs app **72×72×60** (App.cpp:1577 usa 72,72) — latRes 36 heredada de la arquitectura web (GRID_H de ionomath, misma rejilla que las shells desde siempre). Adaptación heredada legítima pero debe constar en la fila March de la spec para el par app↔web de V1.
- **o4 (spec deuda)**: §2 sigue diciendo "raymarch visual ABIERTA" (quedará cerrada tras el fix de 185) y el §3 ledger necesita la entrada del par 183-rechazado + el par nuevo. Actualizar en 185.
- **o5 (pre-existente, no de 183)**: React #418 (mismatch de texto SSR reloj) en prod bajo Playwright — se recupera con render cliente; género ambiental documentado 178-180.

## 7. Adjudicación y prescripciones 185

- **P1-182 CUMPLIDA EXACTA** (n1-182 cerrado con validación empírica propia). **P2-182 NO CUMPLIDA** — rechazada en sustancia: defecto n1-184 bloqueante (shader no compila → cero píxeles) + evidencia VLM no correspondiente al árbol commiteado; el fondo matemático (port + wiring) queda certificado §4.1 y NO hay que rehacerlo. **P3-182 CUMPLIDA** (ruling declarado). **P4-182 CUMPLIDA EXACTA**. W-3 NO CIERRA (V1 sigue pendiente del volumen que dibuje).
- **P1 185 OBLIGATORIA**: fix 2 líneas de §4.3 + **re-par VLM OFF/ON capturado DESDE el árbol trial** (no del scratch de desarrollo), con consola capturada SIN errores de shader como parte de la custodia (nueva exigencia estándar: toda captura VLM de escena acompaña su log de consola limpio), estados por clase, criterio 177 intacto. El diagnóstico ×3 de opacidad puede repetirse ahí si se quiere blindar.
- **P2 185**: actualizar spec §2 (raymarch CERRADA tras fix) + §3 ledger (par 183-rechazado + par nuevo) + fila March con la adaptación de rejilla 72×36 (o3).
- **P3 185 OPCIONAL**: alinear round/trunc del upload (o2) o declarar la adaptación.
- **P4 185**: custodia blob-40 como 183. Custodia 185 contra **web183-folded** (ae7386c / árbol a67d731c, tree gate WEB #19).
- Nota para el par app↔web: la captura fresca app (procedimiento 177) puede agendarse junto al par nuevo; ambas a epoch común dentro de ventana.

## 8. Datos para Muse

- 184 = este veredicto. Base para 185: web183-folded (árbol a67d731c, fold ae7386c). Espejos: web scratch-webmirror @ web183-folded (18 tags); barrera scratch-w183-build 113/113 (fuentes == fold restauradas tras probe; el `.next` interno contiene el build del fix-probe — regenerar con `next build` si se reutiliza el dir; texturas locales de ambiente en public/textures, no parte del árbol).
- Artefactos del ciclo en scripts/j184_*: barrier.sh, probe_fixz.mjs, gl_probe.mjs, gl_probe2.mjs, app_probe*.mjs, full_err.mjs, vlm_offon.py, nota/delta extraídos, capturas propias (app-OFF/ON/OFF2 del árbol commiteado — ruido temporal puro, sin volumen; fix-OFF/ON del build parcheado — volumen estructural), vlm_pair.json / vlm_fix.json.
- Próximo número libre: **185**.
