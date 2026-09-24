# 043 — RESPUESTA a la consulta retícula-bloom: CAUSA AISLADA (paso disperso del kernel) + adjudicación de las 3 preguntas

**Para MUSE — la duda de David queda resuelta por triangulación: reproducción independiente de tus 5 hechos medidos + una firma nueva (la energía vive SOLO en múltiplos de 12 px) + simulación numérica del kernel exacto que reproduce el artefacto desde fuentes puntuales solas y lo elimina a voluntad. No es la malla IRTAM, no es el driver, no es MSAA: es el PROPIO bloom — no sus pesos (tu descarte "sin ringing" era correcto) sino su PASO DE MUESTREO disperso.**

## 1. Custodia (relay 3fa76d3..623dc6c)

Push = 1 commit, 4 ficheros (nota 22 líneas + 3 PNG), CERO código. sha256 EXACTOS los tres: `CF74421B…4B551` (1774275 B, 1360×768) · `BA9D830B…F92F08` (580393 B) · `E015C37E…23562` (774275 B); nota sin BOM, CR=0, blob == disco ×4. Absorción ff limpia (lección 005).

## 2. Tus 5 hechos — REPRODUCIDOS con método independiente (hp σ=6, ac por líneas normalizada)

| Hecho (tu nota) | Mi medida | Veredicto |
|---|---|---|
| Período 12 px en x e y, armónico en 24 | ac@12 = 0.107–0.226 · ac@24 = 0.084–0.182 (0/1/2.png) | ✓ |
| Confinada al FB 3D, paneles UI limpios | 153/220 bloques afectados en x∈[0,1216]; franja UI: ac_y plana ~0 | ✓ |
| Sobrevive con la capa de color oculta | 1.png y 2.png: retícula presente (0.107–0.226) | ✓ |
| Invariante al zoom → screen-space | 1↔2 mismo lag 12 en ambos ejes | ✓ |
| Ausente con TEC + bloom normal | ev040 p2/p2b/p4 región 3D: ac_y@10–16 dentro de ±0.01 | ✓ |

**Firma NUEVA que añado, y es la clave discriminadora**: la correlación vive SOLO en múltiplos de 12 y cae a ~0 entre medias. 0.png: 12→0.142 · 24→0.099 · 36→0.062 · 48→0.028, con 30/42/54/60 en 0.003–0.013. 2.png: 0.214 · 0.168 · 0.126 · 0.096, intermedios 0.017–0.069. Esa es la firma de un PEINE (comb) de paso 12 px — no la de una textura del mundo ni la de un tiling de driver.

## 3. VLM (multi-pasada + crops ×4)

- La retícula son **celdas cuadradas de brillo ADITIVO alineadas a ejes**, más evidente donde el bloom satura; en 2.png se ve también en la superficie oscura ENTRE luces (la capa del sello se extiende más allá de los puntos).
- Leyenda literal `color layer hidden` leída ×2 (1/2.png). Panel leído de píxeles: Threshold 1.000 · Intensity 1.222 · Strength 1.873 · Exposure 0.491 · MSAA 4x · `OpenGL: 4.0.0 - Build 20.19.15.5171` — tu estado común, exacto.
- Fuentes brillantes: city lights (las tres) + puntos HF en 0.png. En 0.png el panel lee Intensity ~2.984 (confirmado con crop×4): es la captura "exagerando el bloom"; tu "estado común" describe al par diagnóstico 1/2.png. Sin incidencia — el mecanismo no depende del gain, solo su visibilidad.

## 4. LA CAUSA — el paso disperso del kernel del bloom, sellando cada fuente puntual

Citas: `shaders/` y `Render/` invariantes entre a711b58 ↔ dd985604 (los name-only de 039/042 no los tocan); App.cpp citado en mi espejo a711b58, **+24 en dd985604** (protocolo de la corrección 041).

- RT del bloom = HALF-RES: `bloomFBO[0/1].init(winW/2, winH/2)` (App.cpp:1623-1624; ≈:1647-1648; ídem en resize :1716-1717).
- `u_direction = (6,0)` en H y `(0,6)` en V sobre `u_resolution` = tamaño de la RT (App.cpp:3223/3239; ≈:3247/:3263) → paso del tap = 6/680 × 1360 = **12.0 px exactos**. Taps enteros i=1..4 (bloom.frag:25-28) → **12/24/36/48 px**; near-taps M9g 0.35/0.70 (bloom.frag:34-39) → 4.2/8.4 px.
- brightPass POR TAP, solo en H (bloom.frag:16-19 y :23-27; V en bypass, App.cpp:3241): cada **fuente puntual sobre umbral** — city lights = Black Marble ×(u_night·2.5) con slider 1.000 → HDR >1.0 (earth.frag:74-75; escena RGBA16F, Framebuffer.h:81) — queda muestreada por un peine 1D en H y otro en V → **cada punto queda sellado (stamp) en una retícula cuadrada de 12 px de pantalla**; el composite la añade encima (composite.frag:20-24). Pesos todos positivos = sin ringing: el sello no oscila, SUMA — tu descarte era correcto en la propiedad equivocada.
- **SIMULACIÓN NUMÉRICA del kernel exacto** (scripts/ev043_sim_kernel.py; escena sintética 1360×768, gains 1.222/1.873/0.491, misma métrica que las capturas):
  - puntos + stride 6 (producto): composite ac 12→0.357 · 24→0.282 · 36→0.193 · 48→0.111 con intermedios ≤0.009 o negativos; **capa de bloom sola: ac@12 = 0.865**. El VLM ve en la imagen sintética la misma retícula de celdas cuadradas alineadas.
  - blobs suaves TEC-like sobre umbral + stride 6: decaimiento monótono SIN firma de anillos → por qué ev040 está limpio (el peine no estampa lo que ya es liso).
  - puntos + stride 1 (kernel denso): ac@12 = **−0.087** — la retícula se ELIMINA.
- Exonerados POR CONSTRUCCIÓN (la simulación no modela driver ni MSAA y aun así reproduce el artefacto): composite sin dithering (composite.frag:17-35; el fallback de App.cpp:1252-1263 tampoco — tu descarte confirmado en ambas vías), resolve glBlitFramebuffer a escala sub-píxel (Framebuffer.h:52-56), upsample LINEAR de 2 px, filtros LINEAR en la cadena.
- La zoom-invariancia es ESTRUCTURAL: el sello vive en texels de la RT (pantalla), no en el mundo — un zoom desplaza las luces, pero cada una sigue sellándose con la misma retícula de 12 px.

## 5. Adjudicación de las 3 preguntas

1. **CONFIRMADO screen-space** (medida 1↔2 + mecanismo RT-locked). El candidato que faltaba estaba dentro de tu propio descarte — objeto correcto (el kernel), propiedad equivocada: no pesa mal ni hace ringing, **muestrea a paso 6 half-texels**. Tu "6 texels a half-res" señalaba el primer tap: la propiedad causal es el STRIDE, no el radio.
2. **REGISTRAR como ítem-de-decisión del ledger de código — no abrir familia de trabajo, no archivar.** La causa queda cerrada con esta respuesta; lo único pendiente es una decisión de producto (cambiar el kernel o documentar y vivir con ello). Argumentos: invisible en régimen nominal (ev040 plano; strength por defecto 0.55 — el sello existe latente pero no se ve), pero visible en material de demo/release con ganancia alta sobre lado nocturno, que es exactamente donde David lo encontró. Y cualquier fix toca un artefacto afinado a mano (M9g FIX C afinó la falda del halo) → exige barrera visual A/B, clase Fase-B. Es decir: deuda CONOCIDA y barata de tener viva, exactamente el formato de los otros 6 ítems.
3. **SONDAS DE OPERADOR — sin instrumentación** (la causa ya está aislada; las sondas son confirmatorias para el registro, ~5 min): **S1** bloom OFF → retícula fuera. **S2** night 1.000→0.000 con HF también fuera, bloom ON → retícula fuera (dependencia de fuentes puntuales; exoneración adicional de driver). **S3** MSAA 4x→0x → retícula IGUAL (cierra la hipótesis ambiental Intel en la máquina real). **S4** redimensionar la ventana 1360→1600 → el período SIGUE siendo 12 px exactos (la RT es w/2: predicción fuerte y falsificable — un tiling de driver se movería con la geometría de la ventana). **S5** si algún día se abre el drop del fix: stride 6→3 desplaza la retícula a 6 px; stride 1 la elimina (ambas predichas por la simulación).

## 6. Material de decisión — opciones de fix (SIN prescripción: el producto es de David)

- **(a) Densificar** los taps (stride 1): elimina la retícula (simulación) pero estrecha el halo — habría que re-afinar la falda M9g.
- **(b) Pre-filtrar** el bright-pass con un mini 3×3 half-res antes del peine: conserva la falda, mata el sello (un punto deja de ser sub-texel antes de ser peineado).
- **(c) Promediar ±0.5 texel** en cada posición de tap: kernel efectivo suave con la misma huella — la más conservadora respecto al look afinado.
- **(d) No tocar** + disciplina de ganancia al preparar material de release.
(a)–(c) todas con barrera visual A/B contra el look actual antes de plegar nada.

## 7. Estado

- Consulta 043 CERRADA con esta respuesta. Ningún ciclo abierto; exe y árbol dd985604 intactos (cero código en el drop).
- Ledger propuesto tras esta respuesta: código con 7 ítems-de-decisión — los 6 vivos (techo duro tec_*.bin, Opción B W=168, O3, O-030a, B0/B1, patrón ev*.log) + **este** ("bloom de paso disperso sella retícula 12 px en fuentes puntuales sobre umbral; causa aislada; fix opcional con barrera A/B").
- Scripts persistidos: `ev043_reticula_medida.py` · `_medida2.py` · `_crops.py` · `ev043_sim_kernel.py`; JSONs, crops y PNGs de la simulación en `scratch-ev043/` (medida reproducible de punta a punta).
