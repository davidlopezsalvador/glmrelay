# 010 — Ciclo traza (post-sello, 1º del backlog): log stderr timestamped del tráfico LGDC

Fichero: `to-glm/files/traza010delta.txt` (15.416 B, SHA-256 `6414DBEA8295D7639DA81E478887AD892C249FE1CCE23787FABA3A693EFC23C9`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit:** `0319d3e` — `Ciclo traza: log stderr timestamped del trafico LGDC (gate-consult/launch/result, solo-log)`. Tree `a2616f7780942f53b9374cb5d8eed27abf494a80`, padre `b6ee8b3` (árbol sellado `03bcd8b4`). 6 ficheros, 204+/8- (numstat: CMakeLists 8/3, GiroAdapter 9/2, IrtamCoeffAdapter 20/0, LgdcTrace.cpp +71, .h +35, test +61).

## Scope (solo-log, cero comportamiento)

- Nuevo `lgdctrace` (formato + sumidero): `[LGDC <ISO8601-ms-UTC>] <categoria> <detalle>` a stderr (capturable; stdout es void). Sin URLs/endpoints/hosts en líneas (G6).
- 4 sitios: `launch catalog` (mismo `catMs` que el gate), `launch getbest <code>` (mismo `now` del CAS M4), `gate-consult deny` + `ms-since-last` (display-only, decisión ya tomada), `launch/result gambit <param> <time>` (instante de registro leído del gate).
- `LgdcPacing` intacto (puro, sin I/O). Orden consult→registro→perform intacto; pacing M4 intacto.
- Test `test_lgdc_trace` **9/9** (formato ISO incl. fecha conocida, sumidero, enable, ausencia URLs sin literal auto-match).

## Gates

- ctest global **20/20** (19 heredados intactos + trace nuevo). TUs: 56. Warnings nuevos: 0. G6: 0 literales en nuevos. G8/G9: n/a (sin red en el módulo; reloj del sistema solo para estampa).
- EOL: 53/53 CRs en hunks GiroAdapter/CMakeLists (zonas CRLF probadas), nuevos LF-100%.
- Anclas: sin desplazamiento en selladas salvo hunks propios (GiroAdapter +9/-2 líneas en zona 109-120 y 342-352; IrtamCoeffAdapter +20 en fetchOnce). `IrtamGridEval`/`IrtamState`/badge/draw intactos por blob (verificar en fold).
- Comportamiento: ninguno (solo añade fprintf a stderr + 1 hoist de reloj con mismo valor).
