# 018 — Paquete M-irtam-replay-A (ruling R1): cursor epoch + muestreo + TimeBar 96 h

Fichero: `to-glm/files/replay018delta.txt` (40.860 B, SHA-256 `DFF6D42AB5DAA737B41BCDA0FC71896CA7F9A893A0C95797770C021A9FE2C886`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit:** `40a26ea` — `M-irtam-replay-A: cursor epoch + muestreo pares al epoch + TimeBar union 96h + zonas`. Tree `493e4816960cc42da519248b3cb61f6b5b771221`, padre `e1ee315` (docs GitHub; base de código = `c61f2c1a` + docs). Titular (`git diff --shortstat`, lección 010): **4 files changed, 616 insertions(+), 107 deletions(-)**. Numstat: App.cpp 401/107, IrtamState.cpp 94/0, IrtamState.h 38/0, test_irtam_state 83/0 (= 616+/107- exacto). Sin ficheros nuevos (CMakeLists intacto).

## Ruling aplicado (CICLO A, con 2 correcciones aceptadas)

- **Corrección 1**: cap 96 intacto, cero tráfico/fetching/sondeo; IRTAM se mueve [T−96,T−72].
- **Corrección 2**: zonas [T−96,T−72] solo-IRTAM / [T−72,T−24] muerto 48 h / [T−24,T] solo-TEC; solape 24 h.
- **Q5**: cursor epoch continuo (avance 1x = 1200 s/s, loop en ventana unión); replayPos derivada del epoch (inversión mecánica; TEC idéntico a frames uniformes); pares muestreados al epoch con bracket+lerp sobre TOVs comunes; par ausente = ausente; nota 'retrospectivo @ <TOV>' nombrando lo mostrado; badge DATA-age al TOV muestreado; literal C9/G9 re-escrito.
- **Q6**: slider Frame→horas [0,96] + etiqueta %H:%M UTC del epoch + línea `Zone:` declarada; scrubbing-pauses y Play/speed intactos; stub NO revivido; pair-grid cacheado por slot 900 s con invalidación (P7).
- **Q7**: 23 checks nuevos en `test_irtam_state` (zonas/bordes, bracket mid/edge/empty/singleton, lerp, badge muestreado, par-fallido); oráculos hour=12 intactos.
- Etiquetado (ruling §8): cifras de disco/RAM por lado — n/a en A (sin cambios de caché).

## Gates

- ctest global **20/20** (state 34/34: 11 P5 + 23 replay-A; 19 heredados intactos). TUs: 56. Warnings nuevos: 0 (App: baseline GLFW + tooltips preexistentes).
- G6: 0 literales URL en añadidas. G8: sin red en lo nuevo.
- EOL: 454 CRs, población = todas las líneas del delta en la sección App.cpp (fichero CRLF-mayoritario; State/test LF +0).
- Anclas re-pineadas (solo desplazamientos por inserción, poblaciones: líneas App.cpp): mergeKc2g def 372 (+15 miembros), gate F/H 1289 (+99 sampler), commonTov 1334 (+99), restore call 1486 (+99), replay 1764 (+129), restore def 2678 (+182), applyCL def 2780 (+182), E9 3297 (+249), freshest 3305→3572 (+267), setvbuf main.cpp:8. Publish F/H 1178-1228 y B0×B1 1232+ byte-idénticos (cero hunks). M4/GiroAdapter intactos.
- Intocables respetados (poblaciones: `git diff --name-only`): solo App.cpp + IrtamState.h/.cpp + test_irtam_state.cpp.
