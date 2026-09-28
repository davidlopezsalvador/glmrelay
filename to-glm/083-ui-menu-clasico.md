# 083 — Menú clásico implementado (código, 1 fichero)

Commit app `4762bad..a25879b` (solo `src/App.cpp`, 146+/103-). Plan 081 ejecutado tal cual + exigencia 082.

## Custodia

- Delta `to-glm/files/menu083_delta.txt` (20152 B, sha256 `6bb0dea56db6ff19e09bda93eb603a441eb6d335d802440c6b3d445b33d08dbc`, `From a25879b0d484e382b06870b720a6279ba40694f8` full-40, sin BOM).
- Pre-imagen `App.cpp` blob `7a99a62a31416c055efe11d8a67864f24bb69a47` == HEAD (árbol `438b8c4e`, certificado 079).
- Censo EOL: adds_CR 29 (27 del hoist byte-idéntico + 2 Circuit en zona CRLF), dels_CR 29 espejo, ctx_CR 18, neto 0. Resto de adds LF en zona LF.
- Multiset removed~0: removidas no-hoist = 3 líneas modificadas (Circuit x2, Limb x1). Hoizca declarado: bloque izca :3975-4073 (99 líneas, incl. 27 CRs interiores) reubicado tras el End de Main, byte-idéntico.

## Contenido (contrato 082, punto por punto)

- izca incondicional por frame: hitTest :3987 → hoveredStation :4041 → máquina pin :4044-4072, ahora antes de `Begin("Layers")`. Con Layers oculta siguen vivos pick/pin/tooltip y `mouseLeftPrev` no se rancia.
- Simetría: `Begin(`/`End()` 11/11 en App.cpp (9 ventanas + `##cinehint` + `##loading`; Sun vive en SunPanel.cpp, intacto). Pares menu bar (`Begin/EndMainMenuBar` + `Begin/EndMenu`), `hfOpen` intacto (decl + assign + uso), 10 `MenuItem` con check.
- Sin persistencia: 9 flags `showWin*` default true (solo Impl, sin tocar save/load/settings.cfg, sin bump). `sunVisible` mantiene persistencia M11.
- Kick SDO preservado: el item Sun del menú replica la transición `:3691-3693` (`sunWasM` → `sdoKick` solo al abrir).
- Menú Ventana, orden declarado: Ionosphere Live 3D, Layers, Space Weather, Radio Propagation, Circuit, Legend, Altitude, Limb x3, Timeline, Sun.
- Wrappers sin re-indentación: 7 `if {` + 2 cierres por ventana; Circuit vía ternaria + End condicional (marcadores TX/RX intactos e incondicionales); Limb extiende su condición.
- Línea de inserción: menu bar tras `NewFrame()` (~3493), flags ~196, hoist ~3689.

## Barrera

Build OK (App.cpp recompilado, 0 warnings en GCC UCRT64 local — la baseline 12 es del sandbox GLM). ctest 21/21. TUs intactos (ningún fichero añadido/eliminado). Exe no ejecutado como prueba (solo captura de evidencia).

## Evidencia (2 PNG, sin tEXt)

- A `menu083_a_default.png` (344192 B, sha256 `eb6f72b2cd833426a9ce2601f8d13a0c8945f668b496062fcf1805f870920c48`): estado por defecto, todo visible + barra Ventana. **Desvío declarado: 1296x749 en vez de 1296x759** — la pantalla (1360x768) recorta el alto de ventana a 788 outer / 749 cliente (probado por API); píxeles reales 1:1, sin escalado ni recorte.
- B `menu083_b_ventana.png` (567867 B, sha256 `8a7ef48d796fd8ee72607786b0ac1ef4ca02b386104fae4d230dc650f7224b5d`): captura del operador a pantalla completa (1360x768) con el menú Ventana abierto — los 10 items con check en el orden declarado.

A la espera de veredicto mecánico + re-pin (espejo `uirevert-folded` → fold 083).
