# 159 — W-3 arranque: errata pick-abort (P1) + espejo sombra (P4.1)

## Spec
- Veredicto 158 §5 (W-3) + §6: P1 errata documental obligatoria, P2 puntero gating (post-W-3, sin accion), P3 custodia vs web157-folded, P4 spec integra (un drop por sub-feature: sombra -> jitter -> god -> shells/colormaps). Drop 159 -> veredicto 160.

## P1 — errata n1 (1 hunk comentario, CERO cambio de codigo)
- `IonosphereScene.tsx` (+4/-2, solo comentario): la supresion del pick en el click abortante del tour NO es "igual que el C++" — el C++ aborta en press (App.cpp:1956-1975) pero pinea en el release del gesto abortante (4878-4910, sin guard). La supresion web queda declarada como adaptacion Q1 (mas conservadora); la camara se queda donde esta en ambos. Comportamiento ratificado, atribucion corregida.

## P4.1 — sombra del planeta (spec 158 §5.1, primer sub-feature W-3)
- `volumeShadow.ts` (nuevo): espejo puro de `Utils/VolumeShadow.h` (drop 133): `shadowed(px,py,pz,lx,ly,lz,innerR)` con la misma matematica rayo-esfera (b, c, disc) y `SHADOW_GUARD = 1e-4` nombrada (frontera = luz). Sin DOM, sin three — mismo genero que alerts.ts/tour.ts.
- `volumeShadow.test.ts` (nuevo, TU OBLIGATORIO 6/6 replicando `test_volume_shadow.cpp` pin a pin): subsolar iluminado, antisolar en sombra, limbo iluminado, frontera t0==0 -> luz, guarda 1e-4, mas monotonia dia->noche (una sola transicion en 37 muestras del ecuador solar). Marco identico: sol +X, `K_INNER = 1 + 60/6371`.
- Alcance declarado: SOLO espejo puro + TU. La web no tiene raymarch de volumen (el catalogo lo registra como salto pendiente: atmosphere de cascara constante), asi que no hay wiring visual ni VLM posible en este drop. VLM queda pendiente del drop que cablee la sombra al volumen (pares app<->web a igual epoch, protocolo 148). Declaracion Q2 previa del 158 en vigor (paridad = TU + visual, no identidad de shader).

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 32/32 EXIT=0 (7 export + 7 alerts + 6 wiring + 6 tour + 6 shadow).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web159_shadow-errata.diff`: 4595 B, sha256 `666564cec8d797ea5337027d3a0f720eca79132a5076af2784004d2ee0b62db3`, LF puro 0 CRLF, sin BOM, 3 ficheros +81/-2, lineas anadidas 81 100% ASCII.
- Pre = web157-folded (`6afcef8` / arbol `45b5c47d`): blob-40 page `0ac182e0`, scene `aada6900`, alerts `fb29e8b3` == post-imagenes del veredicto 158 (P3 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->web151->web153->web155->web157: commit `5d39cfe`; post shadow `cf20cc70`, shadow.test `cdc7bc94`, scene `ee3775f1` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 160. Siguiente sub-feature propuesto: jitter (135) con el mismo patron (espejo + TU, VLM pendiente).
