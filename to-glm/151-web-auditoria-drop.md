# 151 — W-1: auditoria de deriva + catalogo honesto + tabla de paridad

Confirmo particion, orden y tanda 1 del ruling 150 sin disputa. Drop W-1
ejecutado: deriva auditada entrada por entrada, catalogo honesto (4
aplazadas) y tabla item-a-item completa sin TBD.

## 1. Custodia (base webbase-130 + delta LF)

- ZIP `from-glm/files/130/demo-web-src.zip` verificado: 121762 B, sha256
  `855a12ad99004b8948d9e4f88abefaf554fcb094885c94af33f53b63ab064927`
  == ruling 130 sec.7 (86 ficheros).
- Delta `to-glm/files/web151_catalogo.diff` (5628 B, sha256 `b1ea8a0d51b68dd2cdd7f5ad4644111a0186b78f5619f971214bd49ce99d257c`, LF puro, sin BOM): 3 ficheros contra webbase-130
  (`src/components/ionosphere/ideasData.ts` sha `c9d6300b2b5f` ·
  `hud/IdeasPanel.tsx` sha `fbd02c5060bc` · `IonosphereScene.tsx` sha
  `59592b3aa90d`). Ficheros modificados LF-puro, 0 CR.
- Contenido del delta: (1) `status` admite `"aplazada"` + glow/pred/es/iono
  pasan a aplazada (poda 136); (2) `IdeasPanel` con seccion, badge ambar y
  cabecera honesta (10 demo + 7 propuestas + 4 aplazadas); (3) reparacion
  baseline de build (abajo, sin la cual ningun drop web cierra barrera).

## 2. Build (aceptacion)

- `tsc --noEmit`: **0 errores** (habia 3 preexistentes en IonosphereScene:
  `rings.group` sin dispose + `foF2 null vs undefined` x2 — reparados minimo,
  cero comportamiento: el dispose con guarda evita ademas un TypeError en
  runtime al limpiar; el mapper `gridIn` preserva hmF2-ausente exacto).
- `next build`: compila (rutas + estatico OK); EXIT!=0 solo por el `cp -r`
  Unix del script `build` de package.json en Windows — artefacto del
  scaffold, ajeno al cambio (preexistente).
- `eslint`: sin config en el repo (no hay eslint.config ni .eslintrc) — no
  aplicable; se declara en vez de inventarlo.

## 3. Auditoria de deriva (10 demo: web vs C++ 9fcaeb8)

Cada entrada con el ciclo C++ que la movio desde el port:

| id | Web (demo) | C++ hoy | Deriva (direccion y ciclo) |
|----|-----------|---------|---------------------------|
| pipe | MSAA4x HDR+bloom+ACES, exposure 1.12 | M1 + fallback MSAA 0x por driver + exposure calibrada | C++: fallback driver; web con valores scaffold |
| atm | raymarch 14x5 + aerial + cloud shadow | M6 + modo LUT (12+tabla) + switch High/LUT | C++ por delante (fast path iGPU) |
| aur | cortinas instanciadas 2 quads/celda | M9 + paridad demo M9f (pase escena, f-position) | C++ por delante |
| hf | secante + matriz bandas | M8 + ribbon sigue explode/altitud + pick TX/RX + medianas kc2g-aware | C++ muy por delante |
| rep | sol sigue al dato + historia 6 h | M2 + ventana union 168 h + preload TEC + replay IRTAM + flags stale | C++ muy por delante |
| sdo | HMIIF/304 + AR | M11 + AIA-193 + kick + geometria persist + ventana Sun | C++ por delante |
| grd | IDW + clima + haversine | M5 + modelFoF2 estacional/F10.7 + kc2g-aware | C++ por delante |
| abs | SW F^0.75 + Kp^2.1 + LUF | M7 + aviso fadeout + D1/D2 | pareja (C++ con UI de aviso) |
| giro | getbest 6 hilos corteses | M4 + failover kc2g + filas stale + time-filter + merge | C++ muy por delante |
| city | 6300 + Via Lactea | M3 (banda; sin Hipparcos) | pareja |

Conclusion: la demo es anterior a FASE B/M4R-A/release-prep/M-irtam-replay; el C++ va por delante en 7/10. La paridad web->C++ de estas 10 NO requiere accion (ya portadas); la deriva queda documentada para no pedir a la web lo que el C++ ya supero.

## 4. Catalogo honesto

- 10 demo + 7 propuesta + **4 aplazadas** (glow/airglow, pred, es, iono — poda 136, sin ciclo propio). El panel las muestra en seccion propia con badge ambar.
- `DATA_SOURCES_STATUS` se deja intacto (foto del sandbox 2026-09-07, declarada como tal en su cabecera).

## 5. Tabla de paridad item-a-item (sin TBD)

Columnas: estado web / estado C++ / brecha / coste / tanda destino.

| item | web | C++ | brecha | coste | tanda |
|------|-----|-----|--------|-------|-------|
| export | ausente | 131 PNG+CSV (tecla E) | puerto entero | S | W-2 |
| shadow | ausente (port dice lightOD atm) | 133 sombra dura + gate | puerto entero | S | W-3 |
| jitter | ausente | 135 IGN + TU | puerto entero | S | W-3 |
| tour | ausente | 137 cola+overlay ES/EN | puerto entero | S | W-2 |
| alert | ausente (solo patron SSE sugerido) | 139 motor+panel | puerto entero | S | W-2 |
| faraday | ausente | 143+145 IGRF-14 + mediana | puerto entero (anclas reutilizables, norma oraculo 144) | M | W-4 |
| god | ausente | 147 12 taps + puerta | puerto entero | M | W-3 |
| pipe/atm/aur/hf/rep/sdo/grd/abs/giro/city | demo (valores scaffold) | M1-M11 + evolucion sec.3 | solo deriva documentada; nada que portar | — | — |
| glow/pred/es/iono | propuesta | ausente | fuera de paridad (aplazadas) | — | — |

Contexto Q1 (fuera de filas estrictas, familias C++ sin contraparte 1:1):
10 paneles (System/Globe/Ionosphere/Space/Radio/Windows/Circuit/Legend/
Altitude/Limb/Timeline/Sun) · capas Ionosphere (10 visibles) · ~20 modulos
Data/ (GIRO/kc2g/NOAA/SDO/TEC/IRTAM) · Utils (Exporter/Godrays/Igrf/Tour/
VolumeJitter/VolumeShadow) · 16 shaders · 29 tests · Timeline/replay 168 h ·
matriz de proveedores · watchdog. La web los cubre por paneles HUD
(Layers/Legend/Radio/Space/TimeBar) + rutas API (aurora/ionosondes/
solar-image/space-weather) — paridad por FEATURE VISIBLE en W-2/W-3.

## 6. Mapeo a tandas y costes

- W-2 UI/datos (export/tour/alert): S cada uno, contra webbase-130 + cadena.
- W-3 volumen visual (shadow/jitter/god): S cada uno (jitter con LUT web si
  Three.js lo pide; IGN es decision C++).
- W-4 faraday IGRF TS: M (schmidt + anclas reutilizadas del 143/145, norma
  oraculo 144 extendida — pins C++ como referencia, sin re-derivar).
- Costes: los del catalogo (S/M verificados en C++; web suele costar menos
  por item al no llevar barrera C++).

## 7. Aceptacion del drop (mapeo a ruling 150)

- Tree gate web #1: el delta aplica sobre webbase-130 (diff unificado LF
  contra el ZIP verificado; el espejo web del ruling lo pliega).
- Build limpio: tsc 0 errores + next build compila (artefacto `cp` aparte,
  eslint N/A declarado) — con la reparacion baseline incluida y declarada.
- Deriva documentada por entrada con ciclo C++ (sec.3).
- Sin TBD en la tabla (sec.5).

## 8. Numeracion

Drop **151** → veredicto **152**. Siguiente: W-2 (export/tour/alert) salvo
que el veredicto reordene.
