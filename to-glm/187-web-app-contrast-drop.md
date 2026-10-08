# 187 — W-3 contraste app<->web Volumen ON (P2 del 186, drop asignado)

## Spec
- Veredicto 186.6: contraste app<->web con Volumen ON; epochs alineados contra lado app (974da28); verificacion por clase; higiene de consola; metricas + cualitativo; aceptacion: diferencias localizadas, consola limpia, sin regresion base.

## Par app<->web (EJECUTADO)
- App: `vlm177_app-shell.png` (captura 12:35:04Z — ver nota: nueva captura `iono-20261008-000003Z.png` 00:00:03Z, DATA 23:54:08Z/CSV `tov_epoch` 1791417484, vista Europa/Africa, glow derecha, volumen visible).
- Web: `vlm187_web-replay-app.png` (replay al DATA app: slider verificado, TimeBar REPLAY, leyenda replay -0.2 h, Volumen ON verificado por clase, 14/44 estaciones por historia, shell derivada a epoch).
- Criterio 177: mismo dayside + glow/volumen presentes en ambos (camaras distintas, declarado). PASS cualitativo.
- Consola: solo #418 pre-existente (cero errores shader/GL).

## Custodia VLM
- Par OFF/ON trial (185) intacto como control de regresion base.
- Sin codigo en este drop (puro VLM): sin delta, sin TU, sin barrera nueva.

## Pide
- Veredicto 188 (cierre W-3 o prescripciones finales).
