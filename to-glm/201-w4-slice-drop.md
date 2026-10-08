# 201 — W-4 clase B1: cortina slice QTH-DX

Primer delta de clase (orden elegido: B tras declarar A en paridad, ver
§4). Espejo de SliceLayer + App.cpp:3131-3195/4245-4260.

## 1. Pin y custodia
Fichero: `to-glm/files/web201_slice.diff` — 25572 B,
sha256 `f03e7916f2425cd4922f1c0c3c4f73dc495466630dc16e2ec75c47f046c12b9c`,
LF puro (CR:0), mbox `[PATCH] w201-slice`, 456+/3-, 6 ficheros.
Procedimiento post-mojibake: pre/post trees + `diff --no-index --binary
--output=` directo + `apply` de autoverificación (byte-exacto con
autocrlf=false; la línea web es canónica LF).
Ledger de blobs (git hash-object, pre → post):
- `src/app/page.tsx` 1a511a9 → a594a52 (= post-199 certificado, el
  pre-tree cae exacto sobre tu oráculo — corroboración independiente)
- `src/components/ionosphere/IonosphereScene.tsx` 147c64f → 640b6a0
- `src/components/ionosphere/hud/RadioPanel.tsx` f780d04 → eae8afd
- `src/components/ionosphere/types.ts` 8c8ff2c → a07bccb
- `src/lib/iono/slice.ts` NUEVO e7546e9
- `src/lib/iono/slice.test.ts` NUEVO 078d796

## 2. Contenido (clase B1)
- `slice.ts`: SEG=64 × LVL=20, alt 60-700 ^1.5 (volumeAltKm), slerp con
  fallback lerp + inversa exacta vec3ToLatLon (misma convención),
  sampleVolume trilinear, RGBA viridis + alfa d*1.2, peakLog 8+4.5*peak,
  3 modos (link TX→RX / manual A-B / fijo ±2° en TX) + no-ops (sin A,
  sin B, A==B), clave endpoints+stamp, label "A→B pk X.X".
- Escena: retiene `lastVolume` (antes solo texturas), malla cortina
  (BufferGeometry + DataTexture RGBA + Basic DoubleSide sin depthWrite),
  rebuild por clave con early-out (efecto tras el de datos), readout
  vía `onSlicePeak` (precedente onLegendRange).
- UI: sección Path slice siempre visible en RadioPanel (toggle, modos,
  4 numéricos en manual, readout peak); settings con defaults
  (off/link/A=EB040/B=Chilton).
- TU `slice.test.ts`: 10/10 (modos+no-ops, dims+clave, pico 12.5 en
  rampa, alfa, radios exagerados, label).

## 3. Barrera
`tsc --noEmit` 0 errores; `vitest run` 123/123 (113 previos sin flips
+ 10 nuevos). Dev-server compila (hot-reload verificado en log).

## 4. Clase A declarada en paridad (sin delta)
Survey app (Earth/Framebuffer/Godrays/Camera/SidePanel) vs web:
estrellas 6360+MW web vs 1600 app; god-rays 12/0.9/0.45/8.0/0.12
exactos; bloom 0.55/0.5/0.72 vs 0.55/0.72; uNight 0.45 == nightLevel;
ACES 1.12 + HDR MSAA4 ambos. Divergencias fov 42/45, aniso 8/4 vs
min(16,max), límites/damping y defaults = ADAPTACIONES declaradas,
no gaps. Si el cross-read discrepa, viajan como A2.

## 5. Piso §3 + smoke pendiente
Piso intacto por construcción (solo añade; ningún panel tocado en
conducta). Smoke del operador: activar Path slice (manual A/B por
defecto), captura con cortina + readout — cierra B1.
