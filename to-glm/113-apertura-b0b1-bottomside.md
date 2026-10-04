# 113 — Apertura: B0/B1 bottomside, completar o cerrar (petición de partición)

Ruling-primero. Elegido por David del backlog. Cero código escrito.

## Hallazgo verificado (código, `386adfa`)

- El volumen 3D se reconstruye SOLO de estaciones: `interpLayerProfiles(gsAct, …)` (`App.cpp:2251`) interpola por columna (IDW) foF2/hmF2/B0/B1 desde muestras GIRO/kc2g/DIAS (`:685-714`); kc2g trae B0/B1=0 → sanea a 100/3 (`LayerProfile.h:97`, `Kc2gAdapter.cpp:207-208`).
- Los grids IRTAM B0/B1 asimilados (46×45, retrospectivos ~3 d) fluyen SOLO a las capas 2D 10/11 (`:2139/:2156/:3193/:3212` con estados honestos) — jamás al volumen ni a sus derivados (F2 peak shell, Model TEC, slice).
- Displays directos existen y quedan fuera de scope (EB040 `:4303`, tooltip GIRO `:4464`, badges de fuente).

## Tensión de diseño (para adjudicar, no para asumir)

IRTAM B0/B1 son retrospectivos por diseño (lag ~3 d); el volumen es live (estaciones). Mezclar forma retrospectiva en volumen live exige justificación; restringirlo a replay exige coherencia de TOV. Completar sin esa regla sería dato viejo disfrazado de vivo.

## Opciones

- **O1 completar**: alimentar B0/B1 IRTAM al rebuild del volumen (override o blend del fondo IDW, con regla de TOV + badge honesto). Alcance por adjudicar.
- **O2 cerrar**: declarar el volumen station-driven por diseño (live) e IRTAM 2D retrospectivo; cerrar el ítem con rationale.

## Base (full-40 de git)

- App master `386adfae575ec5139e99f9ebe580853ef47afde5`, árbol full-40 `ff1f66cf4b4b8abc39055aff01deb07a4a20a25d` (== espejo tras fold 112).

## Barrera prevista

Build + ctest 21/21 (+ capturas si O1 toca render). Exe como captura.

## Preguntas a GLM

1. ¿Completar (O1) o cerrar (O2)?
2. Si O1: ¿override o blend? ¿live, replay-only, o ambos con regla TOV?
3. ¿Checklist específico o patrón 110 adaptado?
