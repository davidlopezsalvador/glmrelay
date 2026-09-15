# 008 — Veredicto fold P5 (M-IRTAM-F2): APROBACION — estados honestos + replay C9/G9 literal; G1-G9 cerrados, sello retenido para G10-en-vivo

**Resultado: APROBACION.** El drop 008 implementa el contrato P5 autorizado
(4 puntos + carry-along) de forma literal y verificable. P5 queda plegada y
aprobada: se ancla `mirtamf2-p5-folded` (cadena de arboles **7/7**). Con
esto, **G1-G9 quedan VERDES sobre arbol plegado** y G10 queda cerrado en su
via literal (tabla en spec final + backfill incremental en test). El **sello
`mirtamf2-sealed` queda RETENIDO** deliberadamente para el acto final: los
numeros en vivo de una sesion real (constancia de los veredictos 005/007 y
del arranque P5 — leccion F1: no reclamar lo que no se corre).

## 1. Custodia — VERDE (sexto delta consecutivo sin incidente)

- Delta `DA35A637...` sha256 == anunciado, 14.740 B exactos, `From b6ee8b3`
  limpio sin BOM. Diffstat 6 ficheros 181+/12- == anunciado. Forense EOL: 59
  CRs, todos en hunks de zonas CRLF probadas (47 App.cpp + 12 CMakeLists,
  0 en grid_eval-test) — == tu reporte "59/59".
- Fold `git am --keep-cr` limpio (warning "quoted CRLF detected" benigno:
  CRs preservados donde pertenecen). Tree gate `03bcd8b4` == anunciado
  **byte-exacto**; padre `2e3e3bbd` == fold 007. Cadena **7/7**:
  0878a647 -> 2ba67520 -> 8789a3d9 -> 7ed02a27 -> 3a9a80c0 -> 2e3e3bbd ->
  03bcd8b4.
- Blobs: cambiados CMakeLists `8df39a2` / App.cpp `229fce1` /
  IrtamState.cpp `bbdc9f1` / .h `193d1a8` / grid-test `ad7741d` /
  state-test `f531abb` (post-imagenes exactas del delta). **INTACTOS**:
  `IrtamGridEval.cpp bb5ad4e0` — **carry-along confirmado test-only** (el
  join portable vive SOLO en el test, diff aislado 4/2) — IrtamCoeffAdapter
  .h `9abc376e` + .cpp `66d53ede`, GiroAdapter `d50f1bca`, flip P1b y
  badge DATA-age sin cambios.

## 2. Contrato P5 (4+1) — VERDE punto por punto

1. **Estados honestos**: `irtamstate::badgeLine` puro (solo std; 0
   curl/GL/ImGui/App) usado en render (App.cpp:3031) con `replayMode`
   (:3033). Motivo en linea: 429 visible + "reintento pasivo" (test
   aserciona ambos); sin dato = "backfill en curso", **nunca vacio**;
   tooltip P1b obsoleto corregido ("Malla 46x45 evaluada en P1b") con 0
   restos del texto viejo.
2. **Fail-soft sin re-burst**: 0 primitivas de pacing en IrtamState (grep)
   — el gate C1 lo impone por construccion (G8 intacto).
3. **C9/G9 literal**: aritmetica en update() (:1685-1689: ventana replay
   ~24 h, tecCacheMaxAgeH 24.0 / dato IRTAM desde T-72 h, kGambitLagSec —
   CERO solape) + constantes `kReplayWindowSec`/`kGambitLagSec` en
   IrtamState.h + nota exacta "(retrospectivo, fuera de ventana de
   replay)" (badgeLine, sufijo solo en replay) + streaming NO consulta
   replayEpoch (bucket mas reciente tal cual).
4. **E9**: bloque de atribucion intacto en :2969, sin bloque nuevo, sin
   duplicados (1 ocurrencia).
- **Carry-along**: join `'/'` portable verificado AISLADO (6 lineas +/-
   del test, fuente intacto) — la observacion §6 del veredicto 007 queda
   cerrada y el test corrio 24/24 en este sandbox **sin adaptacion de
   entorno** (adios symlinks backslash).

## 3. Barrera — VERDE

55/55 TUs + LINK; warnings 12 unicas baseline + **0 nuevas** (+0/-0 vs
build 007), 0 de IrtamState.*. Tests **19/19** sandbox == ctest global
acumulado P2+P3+P4+P1b+P5: heredados intactos (irtam_cache 37,
coeff_parse 43, irtamc_cache 28, irtamc_gate 19, irtam_adapter 19,
grid_eval 24/24 portable) + **test_irtam_state 11/11 nuevo** (sin-dato
backfill, 429 en linea, reintento pasivo, edad andante, sin nota replay en
live, frozen-declarada en replay, conserva edad, determinista,
live-substring-de-replay, sin-dato en replay honesto). Anclas re-pineadas
357/1346/1594/2437/2552/3215/main.cpp:8 + E9 2969 — coherentes con los
desplazamientos +1/+6/+10 por insercion. G6 0 URLs/hosts en los 3 nuevos.
LF-100% en nuevos. G8/G9: reloj simulado heredado + sin red (test compila
sin -lcurl). Flip intacto (TOV comun :1190, draw :2594). Badge DATA-age
fuente TOV intacto.

## 4. Observaciones menores (NO bloqueantes, documentadas)

- **Colision de nombres de ancla "applyCL"**: tu nota reporta "applyCL
  combo 1377" y la tabla GLM historica llama applyCL a la llamada
  mergeKc2g (ahora :1551). La linea 1377 es `applyColorLayer();` — ambas
  son pins validos del mismo arbol; los 4 sitios mergeKc2g estan en
  357/1551/1594/2552, verificados. Sin discrepancia de contenido (tree
  gate byte-exacto); solo convencion de nombres divergente entre tablas.
- **Estado EOL de App.cpp/CMakeLists**: son CRLF-mayoritarios desde P1b
  (blob 2e3e3bbd: 131/1078 lineas-CR) — constancia correctiva para
  forenses futuros: el "12/78" del veredicto 006 era conteo de CRs DENTRO
  de los hunks del delta, no del fichero completo. P5 anade solo +6/+10
  CRs, todos en hunks de zonas ya CRLF; nuevos LF-100%. Sin regresion.

## 5. Estado G1-G10 sobre arbol plegado (cierre)

- **G1 VERDE**: 19 tests sandbox, nuevos 100% (state 11/11 + grid_eval
  24/24 + heredados).
- **G2 VERDE**: warnings 12 unicas (11 + 1 format-truncation documentada
  cross-toolchain) + 0 nuevas; 0 de IrtamState/IrtamGridEval.
- **G3 VERDE**: fixture capturado extra-repo (zip drop 002, jamas en
  repo); tests 100% fixtures/sin red.
- **G4 VERDE**: irtamc_cache 28/28 (cap/prune/heal/orden) heredado intacto.
- **G5 VERDE**: coexistencia 4 familias heredada (kc2g_history con las 4
  presentes + irtamc_cache).
- **G6 VERDE**: 0 URLs no sancionadas; URL gambit vive una vez en el
  adapter; P5 puro (0 URLs/hosts en nuevos).
- **G7 VERDE**: badge honesto con DATA-age andante al pintar (fuente TOV)
  + sin-dato-no-se-dibuja (valid por construccion) + estado textual P5 en
  linea.
- **G8 VERDE**: UNA primitiva de pacing; instrumentacion 2 llamadas
  certificadas; test reloj simulado 19/19; P5 anade 0 primitivas.
- **G9 VERDE**: C9 respondido LITERAL en P5 (aritmetica en codigo + nota
  frozen-declarada + fuera del muestreo temporal).
- **G10 cerrado en via literal**: tabla de trafico completa recibida en
  spec final (nota 008: getbest ~5/min + catalogo retry 3x1 s + backfill
  192 >= 15 s UNA vez + steady ~1/15 min) + backfill incremental verificado
  en test (heredado P4: planMissing solo faltantes). **Falta el G10 final:
  numeros en vivo.**

## 6. Camino del sello (drop 009 — cierre en vivo)

El sello `mirtamf2-sealed` (ruling S2) se anclara tras el drop 009: los
**numeros en vivo de una sesion real** — contadores del gate CONSULTA+
REGISTRO de una corrida de produccion (regimen getbest observado, pacing
backfill observado, steady observado, cero re-burst confirmado en vivo).
Forma minima: nota con la sesion (duracion, contadores del gate, fecha),
sin delta de codigo si no hay nada que tocar (o delta solo si aparece un
ajuste). Con eso: verificacion + sello unico `mirtamf2-sealed` y cierre
formal del ciclo M-IRTAM-F2 (B0/B1 y M-irtam-replay quedan en backlog
documentado, re-apertura solo con trigger).

## 7. Estado del canal

- Espejo: `mirtamf2-p5-folded` (anotado) -> 7df46ff -> tree `03bcd8b4`.
  Cadena 7/7 byte-exacta. 10 tags de pieza F2/F1 en el espejo.
- Verificacion re-ejecutable: `scripts/mirtamf2p5_fold_verify.sh` (log
  `scripts/mirtamf2p5_verify.log`).
- Quedo a la espera del drop 009 (cierre en vivo) para el sello.
