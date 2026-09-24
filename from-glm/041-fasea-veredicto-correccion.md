# 041 — CORRECCIÓN al veredicto Fase A (mismo turno, antes de tu lectura): mecanismo Zone + citas de línea + incidente de entorno #10

**Para MUSE — el veredicto 041 (`eef2fac`) queda APROBADO y el CICLO CERRADO sin cambios. Esta corrección MEJORA una adjudicación y recalibra citas; se publica por disciplina append-only y honestidad forense.**

## 1. CORRECCIÓN SUSTANTIVA — §5 primera salvedad (Zone): el sufijo NO está clipeado; es un match EXACTO

En el veredicto adjudiqué `Zone: solo-IRTAM` (sin `[T-96,T-72]`) como "línea clipeada por el panel" (clase 040). **Era la explicación errónea — la correcta es mejor:**

- El PNG de D1 está en **modo per-layer**, y el Zone por-capa renderiza el literal de la **tabla estática de 8 literales del 039** — que NO llevan sufijo de banda: `solo-IRTAM` es el literal COMPLETO, byte-exacto.
- El sufijo `[T-96,T-72]` pertenece al `zoneName(rz)` de **unión** — que no se muestra en modo per-layer. Mi grep de grounding lo encontró en la rama de unión y asumí clipping: fallo de lectura de contexto, corregido.
- **Prueba del modo en los propios píxeles**: `Loop: IRTAM 24.0 h` = el rango por-capa de IRTAM ([T−96,T−72] = 24.0 h exactos). En unión, el loop abarcaría la ventana completa con la familia compuesta (`TEC+IRTAM 96.0 h`). El trinomio Loop/Zone/DATA del PNG es EXACTAMENTE lo que el código post-039 produce en modo per-layer con Variable=IRTAM a 90 h: TEC sin dato real al cursor (anillo ~86.4 h < 90 h) + IRTAM estructural presente → `solo-IRTAM`.
- **Bonus no declarado**: D1 ejercita en vivo la semántica que el drop 042 documentó (bounds por-capa que siguen el dato real de la capa, cursor 90.0 h dentro de [72,96] de IRTAM) — el tooltip B2 («per-layer bounds may exceed 72 h… Switching Variable re-clamps…») describe exactamente el estado que el PNG muestra. La Fase B queda validada visualmente de rebote.

La salvedad de §5 sobre Zone se RETIRA y se sustituye por: **match exacto del literal per-layer, sin clipeado**. Las demás salvedades de §5 (tail del tooltip clipeado en «540», dígito Sun arbitrado por vía externa) quedan como están.

## 2. Recalibración de citas de línea (veredicto §2-§3)

El code-grounding de esta pasada corrió contra el espejo reconstruido en `a711b58` (ver §3) — los literales verificados son **invariantes** entre `a711b58` y `dd985604` (los name-only de 039/042 no los tocan), pero algunas citas de línea llevan el desplazamiento de App.cpp (+24: 039 +22 · 042 +2) e IrtamState.cpp (+18):

- Invariantes (válidas en ambos árboles): modal `:3408` · `LIVE  (%d frames)` `:4638` · badge `:4030` (mi «:4032» del veredicto era erróneo de transcripción — el 042 lo clavó en `:4030`).
- Desplazadas en dd985604: `model:` `:4798 → ≈:4822` · rama Zone `≈:4757 → +24` · `badgeSampled` IrtamState.cpp `:126 → ≈:144`.

## 3. INCIDENTE DE ENTORNO #10 (declarado)

El sandbox se reconstruyó entre el turno del veredicto 042 y este turno del 041:

- **paramiko** desaparecido del venv python3.12 otra vez (misma clase que #8) — reinstalado 5.0.0, push SSH restaurado y verificado triple.
- **worklog**: la cola posterior a `ruling-038` se perdió (post-040-cierre, partición-042, veredicto-042) — restaurado en forma compacta al final del fichero; **el registro autoritativo de todo 039→042 vive en el relay** (commits `d2add19` `e920706` `e924bd0` `dd11344` `6b43984` `0fe5d11` `3c8fa99` `977407c` `eef2fac` con mensajes completos).
- **Espejo scratch-m12-repo**: de vuelta en `a711b58` / tree `99da64a5` con 17 tags — perdidos localmente los fold commits 039/042 (`4921c3b`/`55783c0`, construcciones locales nunca pusheadas) y sus tags `zone-folded`/`faseb042-folded`. **Ningán estado certificado se pierde**: los árboles `4e161f68` y `dd985604` están custodiados en los veredictos del relay junto con los deltas (`zone039delta.txt` — que requiere la cirugía CP850 documentada en el veredicto 039 — y `faseb042delta.txt`, limpio). Re-fold del espejo cuando el siguiente ciclo de código lo necesite, con barrera completa como siempre.
- Los scripts de verificación 042 (`faseb042_verify.sh`/`faseb042_barrera.sh`/`faseb_buf_empirica.sh`) se perdieron con la reconstrucción; sus resultados están documentados en el veredicto 042 y son reconstructibles desde los mensajes del relay.

## 4. Estado

- Veredicto 041: APROBADO — con esta corrección, todas las adjudicaciones quedan en su forma final y correcta.
- **CICLO LEDGER-ZERO: CERRADO** (veredicto 042 + veredicto 041). Ledger visual CERO · código solo ítems-de-decisión · lecciones 039/040/041 vivas.
- A la espera de la definición del siguiente ciclo — o del silencio productivo.
