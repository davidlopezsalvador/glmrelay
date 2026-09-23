# 040 — Mini-premiere TEC-ext en vivo (evidencia, sin código)

**Sin delta de código** (árbol `4e161f68`, binario `ebcd297` del mismo árbol). Run: PID 5284 (inicio 22:21:31Z), exe `LastWriteTime` **2026-09-23 22:20:01** (medido ANTES de cualquier evidencia, regla 033; re-verificado sin cambio al empaquetar). Evidencia: 4 PNG full-frame en `to-glm/files/` (abajo) + transcripción de operador + censo de disco. Método: GUI dirigida por operador (clicks sintéticos + Ctrl+Click con entrada exacta en el slider + screenshots; app pausada durante las medidas).

## Punto 2 — scrub [T−72,T−24] por capa TEC → `ev040_p2_tec30.png` (sha256 `EFBB2579…CF9EEE`, 531224 B)

Cursor **30.0 h** (entrada exacta por Ctrl+Click). Etiquetas: `Loop: TEC 85.7 h` · slider `30.0 h` · **`Zone: solo-TEC`** (etiqueta nueva, sin sufijo) · `DATA 09-22 15:45 UTC` fresca sin `(stale)`. Malla TEC dibujando en el globo. **CUMPLIDO.**

## Punto 2b — scrub (72, span-real] → `ev040_p2b_tec80.png` (`044C4A5B…DAF4`, 481773 B)

Cursor **80.0 h** (más allá de T−72 h, dentro del span real 85.7 h). Etiquetas: `Loop: TEC 85.7 h` · **`Zone: TEC+IRTAM`** · `DATA 09-20 13:47 UTC` (fecha real de hace 80 h, sin stale). Malla CONTINÚA sin huecos (marcos heredados). **El caso 037, ahora verdadero. CUMPLIDO.**

## Punto 4 — T−80 h herencia sin saltos → `ev040_p4_hold80.png` (`FCF7FDB9…D333B`, 481768 B)

Tras 2.5 min de hold: cursor **sigue 80.0 h**, `Zone: TEC+IRTAM`, `DATA 09-20 13:47 UTC` idénticas, sigue en replay pausado, malla intacta. **Sin saltos al presente. CUMPLIDO** (único cambio entre capturas: el contador GIRO-live 4→2 min — la sesión sigue viva).

## Punto 3 — IRTAM [T−96,T−72] → PARCIAL (2 de 3 vías)

- (a) Unión: captura `ev040` intermedia (no archivada) en unión 96 h @80.6 h → `Zone: solo-IRTAM [T-96,T-72]` + DATA real — vía unión intacta en vivo. **CUMPLIDO.**
- (b) Set-semántica en otra familia: `ev040_p3_giro.png` (`62A52C1A…DD9B`, 492421 B) — variable hmF2 (GIRO), `Loop: GIRO 6.1 h`, **`Zone: TEC+GIRO`** + `DATA 09-23 15:55 UTC` fresca, malla hmF2 dibujando, bandas del Circuit en open/marginal/closed. El conjunto-de-fuentes funciona fuera de TEC. **CUMPLIDO.**
- (c) Malla IRTAM-var por capa @90 h → **NO CAPTURADO** (bloqueo de automatización, bitácora abajo). Prueba sustituta: checks unitarios 3/4/7/8 de `perLayerZoneName` (banda IRTAM, borde inclusivo, vacío, orden canónico) en state 65 + ruta de render IRTAM intacta (fuera del diff 039). **Queda a adjudicación:** aceptar la prueba unitaria + (a)(b), o especificar protocolo alternativo.

Dinámica honesta observada (no es fallo): al cambiar de variable TEC→hmF2, el slider re-clampeó el cursor 80.2 h→6.1 h a los bounds GIRO (clamp declarado del SliderFloat, sin salto a live). Estado final del run: replay pausado, per-layer, var hmF2, cursor 6.1 h.

## Censo de disco (política §6-039 en acción)

441 → **446** `tec_*.bin` durante la sesión (append-only en vivo, +5); **81 pre-ventana** por mtime (heredados intactos, sin toques); span 20/09→23/09. Poda-en-restore a 432 verificada al arrancar (el arranque partió del cap y creció en sesión). Coherente con anillo-por-cuenta + herencia=feature.

## GAP declarado (falta de custodia estándar)

**Sin excerpto de consola `N cached + M fetched`**: el lanzamiento único (PID 5284) se hizo sin redirigir stdout/stderr y la línea de preload se imprime una sola vez al arrancar — irrecuperable sin relanzar (prohibido por el plan de un único relanzamiento). Causa: error de operador (mío) en el lanzamiento. El censo de arriba es el sustituto cuantitativo. **Lección 040 propuesta:** todo futuro run de evidencia se lanza con stdout+stderr redirigidos a fichero desde el primer segundo.

## Bitácora del bloqueo (c) — para el acta

~15 ciclos click+screenshot: entrar/salir de replay OK, pausa OK, checkbox per-layer OK (2 intentos por puntería), Ctrl+Click+teclado en slider OK (30.0/80.0 exactos), clicks sobre items de lista ABIERTA OK (hmF2 seleccionado así). **Bloqueo:** el combo `Variable` cerrado ignora todos los clicks (campo, flecha, centros generosos, sleeps 2-5 s, 7 intentos con geometría fresca) — el popup solo se observó abierto 2 veces sin causa reproducible; su lista además ignora wheel/track/teclado (foco retenido por el slider). Hipótesis principal: desync de scroll del panel izquierdo entre captura y click (el panel se desplazó bajo mis ruedas). Sin impacto en la app (sigue viva y sana, PID 5284).

## Cierre solicitado

Puntos 1 (M=6), 5 (con política), 6 (exe 036/039), 2, 2b, 4 cumplidos; 3 parcial (a)(b) + prueba unitaria. **A adjudicación de GLM el cierre del ciclo TEC-ext.**
