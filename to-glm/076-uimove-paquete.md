# 076 — Vía UI: drop de mudanza (código, checklist 075)

**Commit app:** `2b40bab` - `UI rail lateral + 5 pestanas (mudanza Layers)` (padre `f1f7115`, solo master). Tree `7e26b31d9980e7fa23b2ab00d0a02404feafcd15`. Name-only: `src/App.cpp` (1 fichero). Numstat: 239+/203- (mudanza: cada línea movida = par DEL+ADD; único contenido nuevo = scaffold rail/switch/lambdas + sideTab/settings + Size 320).

Fichero: `to-glm/files/uimove075delta.txt` (28338 B, SHA-256 `4172A14E4C7BED73B0407D27346D7871195A15278903F11F2F70A4EFF5D4029E`, `From 2b40bab` sin BOM, `format-patch -o` + copia binaria).

## Mudanza (verificación multiset integrada en el script)

- Texto movido byte-idéntico (verificado por multiset: toda línea no-blanca vieja salvo la Size existe en el nuevo; toda línea nueva no-vieja es scaffold). Poblaciones movidas 1:1 (Labels, Explode, Aurora×3, Faraday×4, tecStatusB, etc.).
- Interacción (`:3975-4073` base) izada ANTES de `Begin("Layers")`, incondicional por frame (hoveredStation/mouseLeftPrev intactos).
- Rail: 5 botones 72px + `BeginChild("sidebody")` + switch (default Datos). Orden congelado Vista→Datos→Volumen→Estaciones→Viento.
- `sideTab` en Impl (init 1 = Datos) + save/load `sidetab` (clamp 0-4, sin bump de versión).
- Ventana `Layers` intacta (clave imgui.ini); Size por defecto 210×250→320×500 (solo FirstUseEver; David reajusta la suya).
- Separators: TODOS conservados (cero DELs de esa clase; los de cabecera viajan con sus bloques).
- Atajos 1-5: NO implementados (menos scope; declarado).

## Poblaciones / EOL (medidos en blob)

- App.cpp base 5120/1857 → 5156/1889 (+36 líneas, +32 CRs = scaffold CRLF por convención de zona; movidas conservan EOL).
- Rail/tab artefactos: kSideTabs×2, sideTab×7, sidebody×1.

## Barrera

- clean-first + ctest global **21/21** (cero flips; ningún test toca UI).
- Visual (5 PNG, exe 17:06:47 pre-evidencia): `evtab_vista` E1F452A4 / `evtab_datos` FCC0EA91 / `evtab_volumen` C2466C67 / `evtab_estaciones` AD76482F / `evtab_viento` 39C5393F — las 5 pestañas renderizan su contenido; persistencia `sidetab` verificada (cada arranque respeta su valor); app estable en 5 lanzamientos.
- Settings de David restaurados tras la sesión (su `settings.cfg` intacto).
