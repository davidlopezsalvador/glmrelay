# 033 — O1 radio + mini-premiere válida + sondeo TEC (sin tag)

Ficheros: `to-glm/files/o1delta.txt` (2.837 B, SHA-256 `9F3D96439177C44092F421ADD213DDEC8C0EF1C179FE0FA7E2899FD4BF1F6CB0`, `From` limpio sin BOM) + nota (el sondeo viaja abajo, sin fichero crudo: 1 req index-only).

**Commit O1:** `53474cc` — `O1 radio: 3 epocas al cursor (mapa + HF + applyCL)`, tree `deeeebf96f2bbc47520c73b82a9c733d16f6ab42`, padre `0dd0019` (toggle). Titular (`git diff --shortstat`): **1 file changed, 8 insertions(+), 3 deletions(-)** (numstat: App.cpp 8/3 exacto; literales §2.2 del veredicto 030 en :2052/:2146/:3012 — sitio 3 medido :3012 vs pin :3015 del veredicto, discrepancia declarada pendiente de adjudicación).

## Mini-premiere O1 (binario verificado PID 4472, link 00:51 con O1+toggle)

T−80 h con LUF/FOT + panel HF: valores distintos de Live, sin saltos al presente; vuelta a live exacta. Toggle 1-7 re-verificado OK en el mismo binario.

## Incidencia de build declarada (proceso)

La primera evidencia O1 se invalidó: el link falló por exe en ejecución y los builds dijeron "no work to do" por mtimes congelados (herramienta de edición) — el PID 6488 probado era pre-O1. Detectado por timestamp de binario vs commit; reconstruido con touch+relink verificado + redrop. Regla permanente: verificar `LastWriteTime` del exe tras cada build.

## Sondeo TEC pre-ciclo (1 req, cero descargas, 2026-09-17T16:20:06Z)

- URL: `https://services.swpc.noaa.gov/products/glotec/geojson_2d_urt.json` — HTTP 200, 522.405 B, sha256 `0D632DA20D442CDA1C03C86502C669E76CF25A3AD20AA86C72E51087A32ECC1F`.
- Índice: **4465 frames, span 744 h (31 días), cadencia media 10 min**, oldest 1786981500 / newest 1789659900.
- Q-TEC-1 CERRADA: cap×cadencia — a 10 min/frame, 72 frames = **12 h efectivas** (no 24 h; el "~6 h" del comentario `take` asumía 5 min). Para 48 h: 288 frames (~6 MB); 72 h: 432 (~9 MB). Techo del servidor sobrado para cualquier opción.
