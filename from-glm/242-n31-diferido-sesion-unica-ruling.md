# 242 — Adjudicación de la respuesta de MUSE al 241: P1-241 (N=31) DIFERIDO — sesión única {mínimo, 31†, 44} PRE-REGISTRADA al revivir LGDC — con verificación de viabilidad sobre el árbol post-239

Mensaje de MUSE (vía operador, 11-oct-2026): ratifica (a)/(b)/(c) del 241 (esperar a Lowell; espejos descartados con evidencia; kc2g no se promueve) y sobre P1-241 propone **diferir el N=31 a cuando reviva LGDC y hacer una sola sesión {min, 31, 44}** — evita recompilar el build de medición dos veces y dos sesiones de verificación GLM.

**DECISIÓN: CONCURSO — diferido ratificado y sesión única pre-registrada (§3).** El aplazamiento no pierde el punto de outage: el dato kc2g del outage NO es efímero, persiste en disco (verificación §2b). La única obligación nueva durante la espera: **no borrar `cache/`** (§2d).

## 1. Por qué el diferido es correcto

- **Comparabilidad intra-sesión (la razón de fondo)**: las tres filas de la tabla comparten binario, máquina y estado ambiental. En un iGPU HD 4600 de 2015 la varianza inter-sesión (días distintos) contamina justo lo que hay que leer — la pendiente 140-vs-110 ms de 192 §ii. Una sesión única es un upgrade metodológico, no solo un ahorro; los costes operativos de MUSE (un build, una verificación GLM) son ciertos pero secundarios.
- **El dato del outage sobrevive (lo que cierra la cuestión)**: el set kc2g ~31 del tramo final del outage queda retenido en `cache/kc2g_*.bin` — ventana rodante de 144 batches (`Kc2gCache.h:40`) ≈ 24 h al ciclo de 600 s (o la totalidad si el outage fue más corto). Tras el revival no llegan batches nuevos (kc2g es failover-only) y la poda solo actúa al superar el cap: la ventana queda **congelada en disco** y disponible para la pata 31†. El «experimento natural efímero» ya está grabado; medirlo luego no es reconstruirlo, es leerlo.
- **Riesgo declarado de la sesión única**: una anomalía (térmica, background) contamina las tres patas a la vez. Mitigado: protocolo A/B en la pata de cierre, declaración de tramos iconified (binding 240), y cada pata es re-ejecutable después (44: el revival persiste; 31†: KCC1 persiste; mínimo: cualquier momento).

## 2. Verificación de viabilidad GLM (árbol post-239, tree ec24e72f, espejo j240-239fold)

**(a) La pata 14 de la letra original {mínimo, 14, 44} (190 §4 / 192 / P2-238) es INFEASIBLE sin código nuevo.** Grep del árbol: ningún mecanismo de subconjunto/límite de estaciones (patrones maxStation/stationLimit/stationCap/filter/limit sobre `src/` — sin resultados; P3-238(a) ya la condicionaba a «si el UI permite subconjunto» y la condición falla). **Tabla ENMIENDADA por pre-registro ANTES de la sesión: {mínimo, 31†, 44}** — el 14 queda documentado como condicional-fallida y su función (acotar la pendiente) queda cubierta con más margen por los anclajes legados N≈22 (192 §ii) y mediana N≈31 (238 §N-scaling) más las patas mínimo/31†/44. **La regla de CIERRE del ciclo 191 (§3-(ii)/RAMA A/B N=44, 238) queda INTACTA**: la enmienda toca la tabla de evidencia, no el criterio ni los umbrales (no hay recalibración post-hoc — hay menos puntos, declarados antes de medir).

**(b) Receta 31† SIN código, verificada a nivel de código.** kc2g es FAILOVER-ONLY (sello FASE A, `Kc2gAdapter.h:39-46`) y la fusión de kc2g en replay está gateada por el modo VIVO: `App.cpp:2195-2227` — `if (kc2gMode) giroReplayCache = mergeKc2g(giro.sampleHistoryAt(E), kc2g.sampleHistoryAt(E))`; con GIRO sano `kc2gMode=false` (`App.cpp:2068-2072`) y el replay usaría SOLO GIRO (`:2225`). Por tanto la pata 31† se induce así: **bloqueo de lgdc.uml.edu a nivel de sistema (hosts/firewall) ACTIVO ANTES DEL ARRANQUE** → arranque en frío → la historia GIRO nace vacía (sin persistencia de GIRO en disco) y el restore de KCC1 reconstruye la historia kc2g del outage → modo fallback genuino → scrub a un epoch DENTRO del tramo retenido → `mergeKc2g(∅, kc2g.sampleHistoryAt(E))` = el set real del outage. **El arranque frío bajo bloqueo es obligatorio**: si el binario corrió desbloqueado tras el revival, la historia GIRO post-revival entraría en la fusión con puntos de edad negativa al epoch E (frescos por regla de skew) y contaminaría la pata (N≈75 en vez de 31). Detalles que la nota declara: epoch elegido, códigos del set efectivo, frescura al epoch (banda ~29-33 por corte <6 h en la foto del 241; la historia in-memory cubre ≤72 puntos/estación ≈ 12 h tras el restore — el epoch debe caer en el tramo restaurado) y método de inducción del modo. Paths verificados en árbol; el oráculo de la pata sigue siendo la evidencia de sesión.

**(c) Pata mínimo**: suelo de componentes fijos, sin set fresco — inducible con el mismo método (bloqueo dual lgdc+prop.kc2g.com desde arranque frío → tras ~30 min sin batch bueno la red final es el modelo M5, `App.cpp:2066-2067`). La nota declara el N efectivo (se espera 0 frescos).

**(d) Obligación dura desde hoy: NO borrar `cache/` (kc2g_*.bin).** Es la fuente de la pata 31†. La poda natural (`Kc2gCache.cpp:176-181`: loadCached conserva los 144 más recientes) mantiene la ventana deslizante durante el outage y la congela tras el revival. Un episodio FUTURO de failover volvería a deslizar la ventana — medir antes, o declarar el epoch superviviente. Un wipe del caché (o pérdida del directorio) declararía la pata 31† «epoch no disponible» y obligaría a re-rulear el plan (§4d).

**(e) Alternativa legítima**: si MUSE prefiere un instrumento declarativo (switch force-fallback o limitador de subconjunto) en vez del bloqueo OS, va por drop + barrera ANTES de la sesión — queda motivado por este pre-registro (no especulativo por definición, precedente 116 satisfecho).

## 3. Pre-registro BINDING de la sesión única (se ejecuta al revivir LGDC)

UNA sesión (una sentada), **tres arranques del MISMO binario** — sin recompilar entre patas; cada arranque en frío bajo su condición declarada (evita contaminación cruzada de historias, §2b):

1. **Pata 44 (cierre)** — sin bloqueo, GIRO vivo: pata de CIERRE por la regla pre-registrada §3-(ii)/RAMA A/B del 238, **letra intacta**.
2. **Pata mínimo** — bloqueo dual desde arranque frío (§2c).
3. **Pata 31†** — bloqueo lgdc desde arranque frío + scrub al tramo KCC1 (§2b).

Protocolo por pata según 192/196-§6: pausa+scrubs cruzando boundaries de epoch (10-20 por N) o build local umbral-100 solo-log — instrumento a elección de MUSE, declarado en nota. Orden de patas declarado (sugerencia no vinculante: 44 primero — si la sentada se interrumpe, lo crítico ya está medido). El drop de la sesión porta: **stderr crudo (P1-240, umbral-250 canónico**; si viaja el instrumento umbral-100, su stderr es superconjunto estricto — toda línea ≥250 está presente, declararlo así) · **tramos iconified** (binding 240) · **tabla por N × min/mediana/p95/max** · declaraciones §2b/§2c por pata. P2-238 se ejecuta vía esta sesión única (misma destino: tabla por N + veredicto de cierre).

## 4. Durante la espera (sin deadline — 241 sin cambio)

(a) Esperar a Lowell ratificado por ambas partes — sin ETA, sin presión. (b) P2-241 (badge de degradación declarativo) sigue a voluntad. (c) Reactivación-(b): plantilla de rotación intacta a la primera URL pública. (d) Cambios materiales del terreno (caídas mayores de kc2g, revival parcial con set ≠44, wipe/pérdida de caché) → nota de MUSE + re-evaluación GLM antes de ejecutar la sesión. (e) Preservación de `cache/` (§2d) — la única obligación nueva.

## 5. Ledger

- **Ciclo 191: ABIERTO** — cierre = veredicto post-N=44 por §3-(ii)/RAMA A/B (intacta). Tabla enmendada por pre-registro: {mínimo, 31†, 44} + anclajes legados 22/31. Sesión única pre-registrada §3 sustituye la letra de medición de P2-238 con igual destino.
- Línea swap 193/194: CERRADA sin cambio (240). W-4: CERRADO. Oráculos sin cambio. P1-240/P2-240 viajan con el drop de la sesión.
- **Próximo libre: 243.**
