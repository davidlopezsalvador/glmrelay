# SPEC W-3 INTEGRA (consolidado 158..180 §5, drop 181 P2)

Documento vivo de la fase W-3 (volumen visual web): oraculos, pines,
arquitectura de espejos, estado por item con evidencia y deudas abiertas.
emil: las §5 de 150/152/158/160/162/164/166/168/170/172/174/176/178/180.

## 0. Objeto y criterio de cierre

Portar el pipeline volumetrico C++ (f209cc8) a la web por espejos puros
certificados + wiring declarado + VLM. W-3 CIERRA cuando: (a) todos los
espejos con TU, (b) todo wiring con VLM arbitrado, (c) cero deudas sin
dueno. Paridad exigible = TU de espejos + paridad VISUAL a igual epoch
(NO identidad de shader: declaracion Q2 fijada en 158).

## 1. Espejos puros (lib/iono) — TODOS CERRADOS

| # | Oraculo C++ | Espejo TS | TU | Pins | Drop/Verd |
|---|-------------|-----------|----|------|-----------|
| S-2 sombra | VolumeShadow.h: shadowed + guarda 1e-4 | volumeShadow.ts | 6/6 | subsolar/antisolar/limbo/frontera-t0/mono | 159/160 |
| S-3 jitter | VolumeJitter.h: IGN 3 consts, sin tiempo | volumeJitter.ts (fround/op) | 4/4 | 3 valores bit-exactos + barrido 64² | 161/162 |
| M-2 godrays | Godrays.h: 12 taps, DECAY .90, R .45, K 8, GAIN .12, sol calido | godrays.ts (+mat4/perspective/lookAt) | 13/13 + 2 gate + 3 inv/mask | proyeccion 3 casos, taps, mascara B, puertas, stepping, consts | 163/164, 177/178, 179/180 |
| Colormaps | Colormap.h: buildPalette 5 paletas | colormaps.ts era + buildPalette | 5/5 propios (no hay TU C++) | extremos/default/consistencia <1e-9 | 165/166 |
| Density | DensityVolume.h puro: layout, alt ^1.5, dir, daynight, peaks, TEC, sample | densityVolume.ts | 11/11 propios | 72x72x48, 2/27, Lagrange, TEC 0.0044 | 165/166 |
| Perfil | LayerProfile.h: chapman, sanitize, profileFromFo, f2Floor, evalNeTotal+winner | layerProfile.ts (+memo 124§2) | 16/16 (= test_layer_winner) | 110/-1/167, REAL 145/155/136, winners, invariante | 167/168 |
| Rejilla | App.cpp:676 interpLayerProfiles + havDeg/modelos | profileGrid.ts (+mapper, livePeaks) | 7/7 + 2 + 2 | haversine, day 12.65, esquina, mapper, antipoda | 169/170, 173/174 |
| March | VolumeRenderer.cpp:48 loop (entry/jitter/shadow/geo/sample/colormap/iso/acum) | volumeMarch.ts (reusa 4 espejos) | 7/7 + 2 (convencion z) | consts, raySphere, descartes, saturacion, dia/noche, determinismo, capas, iso + texelAltKm (gz=r*A-0.5, n1-182) | 181/182, 183/184 |

## 2. Wiring (escena/datos) — CERRADO salvo raymarch visual

| Pieza | Estado | Evidencia |
|-------|--------|-----------|
| Rejilla viva (stations->samples->interp->builder->peaks) | CERRADA | 173/174, TU norte/antipoda |
| Shell derivada (pin 158 s5.4, norte-primero) | CERRADA | 173/174, par datos corr 0.974 |
| LUT shell via buildPalette (bit-identica) | CERRADA | 171/172, 0/256 |
| GAIN post-ACES + materiales (pase 12 taps + toggle) | CERRADA | 177/178, OFF/ON + replay/app |
| invVP + puerta CPU + uSunDir intacto | CERRADA | 179/180, 0 desacuerdos |
| Ruling doble espejo + HUD unificado + zenith motor | CERRADA | 175/176 |
| applyDayNight en cadena + dims 60/60/700 | CERRADA | 175/176 |
| API extra (12 anclas, TTL 60) + mapper | CERRADA | 171/172 |
| Raymarch VISUAL (marchRay a escena/GLSL) | ABIERTA | espejo 181; P5-180 la aplaza tras P1/P2 |
| sampleVolume directo a visual | ABIERTA | vive dentro del march; sin uso propio |
| buildPalette a aurora/materiales extra | ABIERTA | shell+LUT hechos; resto diferido declarado |
| RefShells | NO-ESPEJABLE | clase GL pura; web tiene buildRefRings |

## 3. VLM (protocolo 148) — ledger

| Par | Estado | Evidencia |
|-----|--------|-----------|
| LUT before/after | SALDADO | 0/256 bit-identico (171/172) |
| Era vs derivada (datos, mismo epoch) | SALDADO | bias .17/RMSE .38/corr .974 (173/174) |
| Invariancia espejo (mecanico) | SALDADO | fondo bit-exacto + reubico -170/+15 (175/176) |
| God-rays OFF/ON web | SALDADO | 7 metricas exactas + lift +139405 (177/179/180) |
| Replay 12:34Z <-> app 12:35:04Z | SALDADO | cualitativo, discriminante N.America (179/180) |
| Raymarch visual | PENDIENTE | con su wiring |
| Shell app<->web camaras igualadas | PENDIENTE | cualitativo hecho; exacto opcional |

## 4. Decisiones Q1/Q2 registradas (vinculantes)

- D1 neTotal<->evalNeTotal: conviven por camino (radio/UI vs volumen); 5 divergencias listadas (167/168).
- D2 sanitizeB0 default 100 oraculo vs 90 legacy: builder usa 100 (borde invalido).
- D3 rejilla en ESQUINAS (quirk replicado, NO corregir sin ruling).
- D4 dayOfYear: equivalencia 1..366 certificada (supuesto off-by-one refutado 170).
- D5 day grid corners vs builder centers: medio-celda en C++ tambien (fidelidad).
- D6 uSunDir intacto motor (invariancia; alumbado latente declarado).
- D7 layer SOLO diagnostico (no cablear a visual).
- D8 memo suelo por perfil (124§2, bit-invisible certificada doble).
- D9 API extra: 12 anclas fijas + TTL 60 + best-effort (429 verificado).
- D10 VLM: TU espejos + visual a igual epoch (NO identidad shader).
- D11 flare web = formula neD (declarada); B0/B1 ausentes -> 100/3 via puertas.
- D12 invVP: three .invert() == glm::inverse (verificado V^-1P^-1 1.78e-15).

## 5. Deudas con dueno

- V1 VLM raymarch (con su wiring). V2 app<->web camaras igualadas (opcional).
- V3 RefShells-GL sin espejo (declarado, sin accion). V4 n3-178 #418 HUD (pre-existente).
- V5 micro-deudas cerradas en notas (whitespace, em-dash, prefijos-7/8): no reabrir.

## 6. Cierre W-3

W-3 cierra con: raymarch visual + su VLM + cero deudas V1-V2 o su traspaso
formal a W-4. Este documento es la referencia de conformidad desde 181.
