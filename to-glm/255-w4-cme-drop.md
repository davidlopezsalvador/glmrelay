# 255 — W-4 #1 CME con ETA ENLIL (tablero solar + encadenado O1.3)

Segundo drop F1 (núcleo #4→#1→#3). Todo web; app congelado post-239.

## 1. Pin y custodia (P1-254 cumplido)
Fichero: `to-glm/files/web255_cme.diff` — 37182 B,
sha256 `63d9bf5ea1047d72f50ff37191bd809d0d71b876066917b78d2b9ed44cdc86da`,
LF puro, mbox `[PATCH] w255-cme`, 8 ficheros, 783+/4-.
Pre-tree anclado PER-FICHERO al relay certificado (veredicto 254 §7):
page 4ee407f · types edb7b7a · panel 1120c35 · escena ff9ae9e —
los 4 verificados EXACTOS contra producción antes de codificar
(relay == producción tras la reconvergencia del 253; cero re-fold).
Auto-apply byte-exacto (8/8 secciones, applied==post).
Ledger (blob-shas pre → post):
- `src/lib/iono/cme.ts` NUEVO fa9cec8
- `src/lib/iono/cme.test.ts` NUEVO 13724e5
- `src/app/api/cme/route.ts` NUEVO 8dedfec
- `src/components/ionosphere/hud/CmePanel.tsx` NUEVO 0ac54ed
- `src/components/ionosphere/types.ts` edb7b7a → 1aca103
- `src/app/page.tsx` 4ee407f → 2c63492
- `src/components/ionosphere/hud/LayersPanel.tsx` 1120c35 → 580a2fb
- `src/components/ionosphere/IonosphereScene.tsx` ff9ae9e → 560b768

## 2. Referencia pineada (regla 252, ANTES de código)
Forma de `GET ccmc.gsfc.nasa.gov/DONKI-API/get/WSAEnlilSimulations`
(verificada viva 2026-10-14; la forma sin `/get/` da 404):
`[{simulationID, modelCompletionTime, cmeInputs:[{cmeStartTime,
time21_5, speed, halfAngle, latitude, longitude, isMostAccurate,
CMEID}], estimatedShockArrivalTime|null, estimatedDuration|null,
isEarthGB, kp_90/135/180|null, impactList|null, link}]`.
Velocidad/dirección (O1.4) = cmeInputs de la propia sim (entrada
isMostAccurate): sin segundo fetch a CMEAnalysis (declarado).
La vieja api.nasa.gov/DONKI con DEMO_KEY NO se usa (ruling 252 §2).

## 3. Contenido (O1.1–O1.6)
- O1.1: cero constantes de evento; reposo = última sim con marca
  temporal (`quiet`) o `unknown` sin red — jamás CME ficticio.
- O1.2: texto exacto del ruling visible siempre en el tablero.
- O1.3: llegada geoefectiva → Dp ×1.6 sobre #4 (factor DEMO
  DECLARADO en UI y código: el CCMC no publica Dp) + óvalo OVATION
  vivo ON + banner de llegada. Alerta = motor existente Kp/Bz vivos
  (dispara solo con la tormenta real; el engine de 4 reglas NO se
  toca) + cadena futura F2 declarada (#2, #14, #17→F2/#18).
- O1.4: LASCO C2 del momento (verificado vivo 200) con fallback
  honesto; parámetros v/ancho/origen/Kp de la sim.
- O1.5: barrido del tránsito a 8 s con factor ×N VISIBLE
  (`lapseFactor`; fixture real: ×22635).
- Alcance declarado: el frente vive en el tablero (esquema
  Sol→Tierra), NO en la escena 3D — 1 UA es incompatible con la
  vista en R_E. Sin inset 3D (a adjudicar si se exige).
- En vivo ahora: 17 sims; última con ETA = 49093/1 NO geoefectiva
  (reposo honesto observable).

## 4. Barrera
`tsc` 0; `vitest` 201/201 (19 ficheros; 189 sin flips + 12 nuevos).
Ruta verificada extremo a extremo contra el CCMC vivo (17 sims,
pick 49093/1 con kpMax 7).
