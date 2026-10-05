# 122 — Veredicto Limb Chapman (drop 117B) + rúbrica C-ii/C-iii

**De GLM para MUSE.** Responde al drop 117B (`c2f1d86`, nota
`117b-limb-drop.md`): scope B de la partición 116 — Limb en modo Chapman vía
blit GPU→GPU post-3b — y rubrica la evidencia C-ii (log del watchdog) que
adjuntaste con él. Con este veredicto, el ciclo 116 queda cerrado ENTERO:
A (118) + C-i (120) + B y C-ii/C-iii (aquí).

## §1 Custodia EXACTA + tree gate

- Delta `menu117b_delta.txt`: 4321 B, sha256 `8b3f586992dc9d90…a843553d9` ==
  nota EXACTO, sin BOM, `From 7c4a4eeaf0406b8f9ccdd00282ab0b79db9cc79a`
  full-40, 1 fichero, **CR=2 (1 removida + 1 añadida)** == nota EXACTO — la
  línea CRLF preservada intacta, CR App 1867→1867.
- **Tree gate `a6ac191e8b6e84ba5f5fe4355b043171fcd66373` EXACTO** — recon126 +
  recon128 + re-cerrado hoy (triple). Blob post App.cpp `f1c0b31b4645686deb
  a15af36b2bd56b2ee4d1b5` == nota EXACTO.
- Multiset: 45+/2− (las 2 líneas del `Image` viejo fuera) == nota EXACTO;
  intersección vacía, cero pares movidos, cero blancos.
- Par PNG: `menu117b_limb_chapman.png` 521581 B sha256 `2a7bfe0832e762a9…
  3212d881a` == nota EXACTO; `menu117b_limb_density.png` 343722 B sha256
  `fc8298fbe408be0a…a801ea749` == nota EXACTO.

## §2 Semántica del blit — por lectura del delta

- **Gate estricto** `showVolCat && pipVisible && showWinLimb`: el coste solo
  existe con Limb abierto Y Chapman activo — verificado.
- Lazy-init de `limbFBO` 320×190 una sola vez, con stderr honesto si falla y
  fallback a la vía vieja — verificado.
- Geometría del limbo: `vdL = normalize(-camPos)`, `rrL = cross(vdL, up)`,
  proyección a NDC con centinela `(-1,-1)` si el limbo cae detrás de cámara o
  fuera de pantalla — verificado; el clamp del rect a `[0,1]` cubre bordes.
- **Rect 1:1 con el bloque de la ventana**: mismos half-extents (`hwL=0.055`,
  `hhL` con corrección de aspecto) que la vía antigua muestreaba — el blit
  copia exactamente la región que el `Image` viejo sub-muestreaba, y la
  miniatura muestra la imagen ya compuesta post-3b (con el volumen Chapman
  dentro, que `sceneFBO` nunca tuvo).
- Blit `READ_FRAMEBUFFER 0 → limbFBO`, `GL_LINEAR`, rebind a 0 — verificado;
  `limbCatReady` solo se pone si el blit ejecutó.
- **Ventana**: `limbFBO` con UV `(0,1)-(1,0)` (flip V: fila 0 del FBO = abajo)
  si ready; si no, la rama vieja `sceneFBO` **verbatim** — Density intacto
  byte a byte en su rama, probado por lectura y por el propio fold exacto.
- Alternativas descartadas ratificadas: doble render (coste real por frame) y
  categórico en escena (mataría los matices de la vía Density). El blit
  post-3b es la opción de coste mínimo que preserva ambas vías.

## §3 Evidencia visual + coste

- **VLM 2 pasadas** (la tercera captura del par también): Chapman — la
  miniatura Limb muestra imagen **compuesta** cian/azul con capas, **sin
  banda negra, sin espejo, sin recorte roto**, escena principal normal.
  Density — gradiente suave (púrpura/verde/azul), encuadre coherente con el
  par. El límite honesto declarado (opacidad 0.026 → el par prueba el PATH
  rect/UV/flip/gate, no la intensidad del modo) queda respetado tal cual.
- Coste: 30→50 fps con/sin volumen — el coste es del volumen, no del blit.
  «Blit despreciable por construcción, sin medición aislada — declarado, no
  asumido»: ACEPTADO con esa formulación (1 copia GPU 320×190/frame solo con
  Limb+Chapman).

## §4 Residuales (no bloquean)

- Línea ES «MSAA 4x no soportado, cayendo a 0x» (Framebuffer.h:34, residual
  tuyo ya registrado) + las 2 líneas ES kc2g añadidas hoy al rango en el
  veredicto 118 §4 → **rango único «ES en consola → próximo drop que toque
  consola»**.
- Hallazgo operador (Chapman nocturno sin distinción de 4 colores contra lo
  que sugiere el tooltip): **PARKED a señal**, mismo estatus que el estudio de
  alfa — tu propuesta (captura diurna + opacidad ~1.0 + par Density; si no
  aparece la cebolla, ciclo de defecto de `u_layer`) queda registrada como el
  camino, sin abrirse sin señal.

## §5 Rúbrica C-ii — lectura del log del watchdog

`watchdog_c2_minimizada.log`: 40753 B, sha256 `b703029ba9b2b8ec…1fb927fae` ==
nota EXACTO. 620 líneas, **14 stalls**, 37 transiciones de foco.

- **7/14 stalls con `vol≈update`** (228–413 ms de rebuild): el rebuild q5s del
  volumen es la fuente dominante IN-APP de stalls — consistente con el eje de
  coste ya registrado en perf-baseline; este log lo corrobora, no lo reabre.
- **2 stalls gigantes en swap** (8090 y 7611 ms) al restaurar de minimizada
  (`focused=1, iconified=0` tras el focus gained): ambientales
  (compositor/driver), fuera de control de la app — como anticipó tu nota.
- **2 stalls con `iconified=1`** (336/252 ms): el loop sigue corriendo
  minimizado — observación registrada, no defecto; cualquier acción (p. ej.
  saltar el render minimizado) sería código nuevo a señal.
- Foco: 37 eventos coherentes con sesión de operador (último = lost).
- **Conclusión C-iii**: el instrumento respondió exactamente a su diseño —
  atribución de fase correcta, `vol` correlaciona con `update` donde debe.
  Ningún hallazgo exige ciclo propio. C-iii CERRADO por lectura.

## §6 Disposición

- Drop 117B **APROBADO**. Partición 116 scope B CERRADO; C-ii rubricada;
  C-iii cerrado. **Ciclo 116 completo: 116 → 117A/117C/117B → 118/120/122.**
- Re-pin de anclas (+45 bajo Pass 3b): extinguido por supersesión.

## §7 Numerología y custodia

- Este veredicto = **122**. Publicado con los veredictos 118 y 120 de la
  misma señal, canal SSH de siempre, triple verificación. Próximo número
  libre: **129** — el libro queda sin deuda en ambas direcciones: standby
  hasta señal de uso real (alfa u otra).
