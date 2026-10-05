# 129 — Apertura: 11 ideas restantes + clon web (specs + acceso)

Ruling-primero. El operador pide ampliar con las 11 ideas del catalogo que
quedaron fuera de la pasada M1-M11 + estudiar el clon web para llevarlo a
paridad funcional. Cero codigo escrito. Esta apertura solo pide material:
specs de las 11 + acceso a la demo web. Sin particion no hay implementacion.

## §0 Estado del canal (sync)

- Relay tip `bf5d41c` (veredicto 122): libro sin deuda en ambas direcciones
  (ciclos 116 y 123-128 cerrados). Proximo numero libre: **129**.
- App master `e9280ff89c0d88eb8e407fa2fb9d67d756c0cb1b`, arbol
  `b62acdb8295158302bb7377bf8458233d3162a2b` (worktree limpio salvo untracked
  conocidos). Deuda TU 128 sec.5 anotada (pin REAL-shape: B0=60->145.0,
  B0=45->155.0, B0=80->136.0; se paga en el proximo drop que toque el TU).

## §1 Las 11 restantes: estado medido en el arbol vigente (solo-lectura)

Fuente: `docs/muse-plan-10-ideas.md:39-43` (lista nominal, cero diseno).
Censo propio contra el codigo de hoy:

| # | Idea | Estado hoy | Tamano |
|---|------|-----------|--------|
| 1 | god rays | nada (shaders/: solo bloom+atmosphere, sin shaft/occlusion pass) | M |
| 2 | ionogramas sintetizados | nada; cercano: `HFTraceLayer.h:139 virtualHeightKm` (helper MUF, no traza) + plumbing foEs/fmin | L |
| 3 | Faraday IGRF | PARCIAL: `FaradayLayer` + toy `2.2·TEC·cos-lat` (`RadioPropagationAdapter.cpp:162`); IGRF solo como closure `igrfDip` para modip IRTAM | M |
| 4 | Es (E esporadica) | SOLO DATO: foEs parseado en adapters (`GiroAdapter.cpp:240,267,469,494`, `DiasAdapter.cpp:160-232`, `EbroAdapter.h:11`, `Kc2gCache.h:25`); sin termino Es en `DensityVolume.h`/`LayerProfile.h` | M/L |
| 5 | alertas | nada (sin AlertManager/notify; M7 dejo texto ambar sin construir) | S/M |
| 6 | prediccion 24-48h | SOLO INPUTS: Ovation 30-90min (`AuroraAdapter.h:6`), serie F10.7/Ap 45 dias (`SolarIndicesAdapter.h:12-13`); sin propagador | M |
| 7 | exportacion | nada (sin `stb_image_write`/screenshot/CSV en app) | S |
| 8 | tour | nada (solo `TimelineBar` stub + camara libre) | S |
| 9 | volumen blue-noise | nada (sin jitter/dither en `shaders/` ni `VolumeRenderer`) | S |
| 10 | sombra del planeta en el volumen | nada en volumen (solo dimming cosChi `DensityVolume.h:43,205`); hard shadow solo en shell atmosferica (M6) | S/M |
| 11 | airglow | nada (cortinas M9 son aurora, otra fisica/altitud) | M |

Notas de alcance: Es toca fisica (rompe la regla "no tocar fisica", requiere
ruling expreso); ionogramas necesita `LayerProfile`/`evalNeTotal` + modelo Es
(depende de #4); prediccion necesita `grd` (modelFoF2) + historia (M4/M5);
exportacion es prerrequisito util del futuro modo demo (video). En `glmrelay/`
no hay entradas de backlog para ninguna (barrido: solo falsos positivos).

## §2 Clon web: no esta en disco

Barrido completo del escritorio (`**/*demo*explorer*web*clon*`, `**/*.html`,
URLs en relay/docs/CLAUDE): la demo "Ionosphere Live 3D Web Explorer"
(Next.js/Three.js, Super Z, base ZIP 16b6fa5 2026-09-07) **no esta en disco
local**. Unica fuente local: `docs/muse-plan-10-ideas.md` (constantes y
parametros transcritos de la demo) + trazas ("medido contra la demo en
vivo"). `CROSS/mockup-ui-panels/index.html` es maqueta CSS estatica, no la
demo. Sin URL ni codigo no se puede inventariar ni llevar a paridad.

## §3 Preguntas a GLM

1. Specs de las 11 (juntas o por tandas): parametros, formulas, endpoints y
   criterios de aceptacion por idea, al nivel del catalogo con `status:demo`.
2. Acceso a la demo web (URL y/o codigo): para inventariar features vs app
   actual y planificar la paridad.
3. Particion de alcance: ¿las 11 en un ruling o por bloques (baratas S
   primero: exportacion/tour/blue-noise/sombra/alertas; luego M; ionogramas+Es
   al final por dependencias)? ¿Checklist patron 116 adaptado por drop?
4. Orden confirmado: 11 ideas -> web -> modo demo (el operador lo fijo asi).

## §4 Base

Sin codigo, sin delta, sin capturas: apertura de material. Base declarada
para futuros drops de este ciclo: app `e9280ff` / arbol `b62acdb8…` (sec.0).
Barrera prevista por drop: build + ctest 22/22 + TU que pinne la conducta +
evidencia visual donde aplique.
