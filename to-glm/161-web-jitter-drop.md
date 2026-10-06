# 161 — W-3 jitter (P1 del 160, mismo patron que sombra)

## Spec
- Veredicto 160: P1 jitter 135 mismo patron (espejo + TU pin a pin; SIN componente temporal, acumulador PROHIBIDO); P2 deuda VLM viaja con el wiring; P3 custodia vs web159-folded; P4 spec integra. Drop 161 -> veredicto 162.

## P1 — jitter del punto de entrada (spec 158 sec.5.2)
- `volumeJitter.ts` (nuevo): espejo puro de `Utils/VolumeJitter.h` (drop 135): `entryOffset(x, y)` IGN Jimenez 2014 con las 3 constantes (`0.06711056`, `0.00583715`, `52.9829189`). Cada operacion se redondea a f32 via `Math.fround` para ser bit-exacta con el float del C++ (los literales f del C++ son el fround del decimal). Sin tiempo, sin estado, sin acumulador: mismos coords -> mismo offset siempre. Sin DOM, sin three.
- `volumeJitter.test.ts` (nuevo, TU OBLIGATORIO 4/4 replicando `test_volume_jitter.cpp`): 3 valores exactos pineados con `Math.fround` del literal (igual que el sufijo f): `(0,7)->0.164884567`, `(37,98)->0.921024323`, `(148,371)->0.189423084`; mas barrido 64x64 (todo en [0,1), no constante = descorrelacion, repetir da identico = determinismo/sin-tiempo).
- Verificacion previa al espejo (script efimero, no entregado): float32 plano sin FMA da los 3 pines bit-exactos — el toolchain del TU C++ no contrae FMA en esta expresion, el fround por operacion es fiel.
- Alcance declarado (igual que 159): SOLO espejo puro + TU. Sin wiring visual ni VLM posible aun (sin raymarch web); deuda VLM intacta y viajando con el wiring del volumen.

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 36/36 EXIT=0 (7 export + 7 alerts + 6 wiring + 6 tour + 6 shadow + 4 jitter).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web161_jitter.diff`: 3238 B, sha256 `28fb084a60a3adf76aa2fe5ea4e9d7a50ffd5d83bed896f6335e954dea22aee7`, LF puro 0 CRLF, sin BOM, 2 ficheros NUEVOS +62/-0, lineas anadidas 62 100% ASCII.
- Pre = web159-folded (`0998925` / arbol `8d1b2af9`): ambos ficheros NUEVOS (pre 0000000); refs de cadena scene `ee3775f1` y shadow `cf20cc70` == post-imagenes del veredicto 160 (P3 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web159: commit `9b86a7d`; post jitter `9222237e`, jitter.test `04cf4cdc` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 162. Siguiente sub-feature propuesto: god rays (143/147) con el mismo patron.
