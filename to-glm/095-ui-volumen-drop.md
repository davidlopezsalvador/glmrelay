# 095 — Revisión volumen ejecutada (código, 2 ficheros)

Partición 094 ejecutada tal cual (H1-H4 + guard + fix + rename + checklist 14). Commit app `4df2ee4..61a7e95` (2 ficheros, 8+/6-).

## 1-3. Custodia + pre-imágenes + tree gate (D3)

- Delta `to-glm/files/menu095_delta.txt` (4445 B, sha256 `2a69616966609c0f7849788e307ecd34544199cd1f5f23c2286d667a2bfeac1f`, `From 61a7e95afd325fd15c4abc1ddae6a4b039054a4a` full-40, 2 ficheros, sin BOM).
- Pre-imágenes verificadas antes de editar: App.cpp `3a0af12767d5c4b02ab86b2583d8c02cb638081b` · VolumeRenderer.cpp `b681dad9a7fa43b8aa95d4412acd87f9fe123935` (completa).
- **Árbol post-drop full-40: `073936a2f6b862a1e2e2c2c56944dc1e5b716209`** — el fold sobre `muse-base-085` debe cerrarlo EXACTO.
- Blobs post: App.cpp `37f3a7e119bcaead06ed24bc642ee244c7979277` · VR.cpp `6cea1b1b69967958cd3a500964ad958eb617062a`.

## 4-5. EOL + multiset

- 6 reescritas + 2 añadidas, todas zona LF (App 3850-3866, 4653, 4657; VR CR 0). **CR 1857→1857** (App), VR 0→0.
- Multiset verificado: removed 5 (App: volModes, tooltip combo, iso tooltip, ternario Legend, tooltip Legend) + 1 (VR:118); added 7 (App: 2 guard + 5 reescritas) + 1 (VR). **Cero pares movidos**, cero blancos tocados. Neto App 5140→5142, VR 295→295.

## 6-8. Guard, rename, persistencia

- Guard: `BeginDisabled(!volumeVisible)` :3850 (tras tooltip Limb) · slider+combo+iso dentro · `EndDisabled()` :3866 · Labels :3867 FUERA y vivo · Volumetric :3844 y Limb FUERA y vivos.
- Rename: «Chapman» en 4 sitios (:3856 volModes, :3861 tooltip combo, :4653 ternario «chapman», :4657 tooltip); «Layers» 3 (solo comentarios); «Chapman» total 5 (3+2 físicos); persistencia int sin hunks.
- save/load/settings.cfg: cero líneas. Guard no resetea valores.

## 9. Shader

`VR:118` → `a = max(a, min(band * 0.35, u_opacityScale));`. Sin uniforms nuevos. Gate: idéntico para opacity ≥ 0.35.

## 10-11. Barrera + gate GLSL

Build OK (2 TUs recompilados, 0 warnings GCC UCRT64 local — baseline 13/15 = sandbox GLM). ctest 21/21. TUs intactos. Exe no ejecutado como prueba.
Gate GLSL por capturas (compila en runtime): volumen visible y coloreado en A/C/D/F (shader OK); B con volumen OFF (gate N/A, compilación ya probada por las demás del mismo binario).

## 12. Smoke (operador, cero fricciones reportadas)

OFF→3 griseados+Labels vivo (B); ON→3 vivos; combo Density/Chapman seleccionables (A/C/D); iso toggle ON (E/F); slider opacity responde (barridos 0/0.05/1.0).

## 13. Capturas (6 PNG, sin tEXt/iTXt/zTXt, 1360x768 operador)

- A `menu095_a_combo.png` (448949 B, sha256 `ad06db053d4ef19c1fb6e99474772843e4d02d361bb7101215b398d557814df7`): combo desplegado Density/Chapman, controles vivos.
- B `menu095_b_disabled.png` (490626 B, sha256 `6fbf8682fec2e8d2c4ff16d23b8dbcb7c74c9dac5a7497b03714e332eabb24fa`): volumen OFF, 3 griseados, Labels vivo.
- C `menu095_c_density.png` (458118 B, sha256 `0601e117cace52440882b9244b48baf22ec18745657af7a0412ab41d1bf51429`): Density 1.0 día iso OFF.
- D `menu095_d_chapman.png` (331590 B, sha256 `7d4a2686942e25b181352d53bb9cb69122d633fa012fcd25f0e8d3921534491b`): Chapman mismo encuadre que C (viridis→cian).
- E `menu095_e_iso0.png` (561073 B, sha256 `3ac6265b04ab58cccd252dd0173d158a44ebae0fe217a13258408481471f198f`): opacity 0 + iso ON post-fix — **sin lavado, shell limpia** (fix probado).
- F `menu095_f_iso1.png` (445368 B, sha256 `1eee8b948c97a05cf20ced890adc10383cf77cd996fd70b1beb862ed337520a1`): opacity 1.0 + iso ON — saturación idéntica pre/post por gate (no-regresión).

## 14. Anclas (`61a7e95`)

Guard :3850/:3866 · Labels :3867 · volModes :3856 · tooltip combo :3861 · tooltip iso :3865 · ternario :4653→:4655 · tooltip Legend :4657→:4659 · VR:118 · hoist/pin +2. Re-pin GLM post-fold.
