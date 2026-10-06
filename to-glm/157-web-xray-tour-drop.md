# 157 — W-2 reparo X-ray (P1) + tour (P4)

## Spec
- Veredicto 156: P1 obligatorio (wiring X-ray + TU contrato, hunks separados del tour), P2 kpOk honesto, P3 custodia vs web155-folded, P4 spec tour 152 integra. Drop 157 -> veredicto 158.

## P1 — reparo n1 (hunks propios, sin tocar el motor)
- `alerts.ts` (+41): `SwLike` + `buildAlertInput(sw, mufs, utc)`. Normaliza clase letra+magnitud a 1 char (`charAt(0)`); `xrayOk` honesto (`"—"`/vacio -> false); mediana MUF superior `vs[n/2]` (igual que `nth_element` mid). El motor sigue byte-fiel al oraculo (156 lo certifico linea a linea; no se toca).
- `page.tsx` (hunk P1): el objeto inline se sustituye por `buildAlertInput(sw, mufs, Date.now()/1000)`; filtrado de nulos movido al helper.
- `wiring.test.ts` (nuevo, TU contrato 6/6): `"M5.0"`->`"M"`+ok; `"—"`->OFF (no GREEN); kp unavailable->OFF; sw null->todo OFF; mediana superior con nulos/fuera; regresion n1 end-to-end (M5.0 x2 -> RED, luego `"—"` -> OFF). Este TU habria cazado el canal muerto.

## P2 — kpOk honesto (recomendado -> implementado, 1 linea en el helper)
- `kpOk = sw != null && source !== "unavailable"`. Bz ya era honesto (`wind.t != null`). Declaracion: se mantiene el proxy Date.now como reloj de muestra (n3 de 156, menor/opcional).

## P4 — tour web (spec 152: keyframes cola timer toggle overlay ES/EN, textos 137, camara Q2; sin TU exigido, se adjunta minimo)
- `tour.ts` (nuevo): port puro de `Tour.h` (4 tramos 12+12+10+10 = 44 s, smoothstep, `advance` solo con dato listo, textos ES/EN verbatim). 100% ASCII de milagro: el C++ no usa tildes.
- `tour.test.ts` (nuevo, 6/6): total 44, W0 en t=0, smoothstep medio (ry=0.3), done en 44, gating del reloj, clamp de indices.
- `IonosphereScene.tsx` (+56): prop `tourActive` + callbacks `onTourIndex/onTourDone/onTourAbort`; reloj propio en el rAF (fuera de React); adaptacion Q2 (ry->azimut desde la vista de activacion, dist->radio, polar conservado); `controls.enabled=false` durante el tour; click aborta y suprime el pick de ese gesto (igual que el C++); al salir la camara se queda (continuidad); `ready = ionosondes != null`.
- `page.tsx` (hunks tour): estados `tourOn/tourIdx/tourEs(true)`; tecla T con flanco (censo: solo sidebar meta+"b" y carrusel element-scoped -> sin colision); overlay HTML con texto del tramo, segmentos 1-4, toggle ES/EN, cierre; boton de entrada abajo-izquierda.
- Censo T igual metodo que tecla E del 153.

## Barrera Windows (scratch, fuentes == trial bit a bit en blob)
- `npm test` 26/26 EXIT=0 (7 export + 7 alerts + 6 wiring + 6 tour).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web157_tour-xray.diff`: 20495 B, sha256 `402a811b05a17e5339fd4c07724cae4dca6e496e8166430dd66a7006408ece57`, LF puro 0 CRLF, sin BOM, 6 ficheros +386/-18, lineas anadidas 386 100% ASCII.
- Pre = web155-folded (`d9759bc` / arbol `f1e4c1bd`): blob-40 page `3cc0e96e`, package `c1c6bd5`, panel `dbf22cd` == post-imagenes del veredicto 156 (P3 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->web151->web153->web155: commit `f9171f2`; post page `0ac182e0`, alerts `fb29e8b3`, tour `234acb65`, wiring `f1201c33`, tour.test `86aef6ac`, scene `aada6900` == build.
- Sin pipe de PowerShell en ningun byte del artefacto (doctrina 155); verificaciones numericas solo.

## Pide
- Veredicto 158. Con el tour, W-2 quedaria completo salvo homologacion del reparo.
