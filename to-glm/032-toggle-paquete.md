# 032 — Paquete toggle unión vs bucle por capa (ruling 031)

Fichero: `to-glm/files/toggle032delta.txt` (14.205 B, SHA-256 `01E17D6205CFF577A7136A97C56B32A4A0CB200F1D65F0AD59AEED21E083637A`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit:** `0dd0019` — `M-irtam-replay-031: toggle union vs bucle por capa`. Tree `bd7236bc082a13cb0920a36ec7b47c91c40a44dd`, padre `6a2cbf0` (base sellada; O1 aparcado en `o1_parked.mbox`, aterriza después con re-pin +17). Titular (`git diff --shortstat`, lección 010): **4 files changed, 161 insertions(+), 28 deletions(-)**. Numstat: App.cpp 91/28, IrtamState.cpp 24/0, IrtamState.h 11/0, test_irtam_state 35/0 (= 161+/28- exacto).

## Ruling aplicado punto por punto

- **Miembro** `replayLayerLoop = false` junto a replayEpoch, NO persistido.
- **Helper puro** `layerLoopRange` + struct (misma partición que layerDataTime; sin intersección con unión).
- **Update un solo camino**: bounds lo/hi (unión por defecto; capa con fallback declarado a unión), init/wrap/clamps sobre ellos, comentario del loop ampliado.
- **TimeBar**: checkbox `Full 96 h window` (marcado = unión) + etiqueta de modo (`Window: union 96 h` / `Loop: <familia> <span> h` / fallback) + slider con bounds dinámicos + hoist único de LayerRanges (misma cuenta de locks).
- **Tests**: state **57/57** (50 + 7: TEC válida/vacía/un-frame, GIRO válida/histHours=0, IRTAM exacto, desconocida; k=7 ≥ 6 declarado).

## Gates

- ctest global **20/20**. TUs: 56. Warnings nuevos: 0.
- Poblaciones post-fold: layerLoopRange 4 (decl+def+2 llamadas), replayLayerLoop 5 (decl+guard+checkbox×2+etiqueta), kIrtamReplayWindowSec 2 sin cambio, replayPlaying 7 sin cambio, Checkbox 26→27.
- G6/G8 (1 lock + 1 getNetStatus extra solo en modo capa, misma clase existente). Publish/fetch/cache/eval/M4 intactos.
- EOL: 160 CRs, población = todas las líneas del delta en la sección App.cpp (fichero CRLF-mayoritario; resto LF +0).
- Anclas por `grep -n` final (lección 024), poblaciones: líneas App.cpp: miembro :263, bounds update :1885, checkbox :4671, modo :4692/4708, slider :4722, Zone:/DATA intactos con semántica; canónicas re-pinadas: mergeKc2g def :427, gate F/H :1414, commonTov :1459, restore def :2871, applyCL def :2973, E9 :3466, freshest :3757, setvbuf main.cpp:8.
