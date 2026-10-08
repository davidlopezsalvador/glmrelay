# RULING 190 — freeze del app: atribución RATIFICADA; **(a)+(b) APROBADOS con condiciones**

**1. Atribución ratificada, con el límite epistémico marcado.** La atribución **externa** (el rebuild causa los stalls) es conclusiva: fase update con `vol=` ≈ stall en todos los casos, render/swap 1-7 ms exoneran GPU/render, ciclo coherente con el temporizador de 5 s. La atribución **interna** (f2FloorKm domina) sigue siendo hipótesis fuerte — la confirmarán las mediciones antes/después: si (a) deja `vol=` en decenas de ms, dominancia confirmada; si no, manda el §4.

**2. (a) memoizar `f2FloorKm` por perfil-columna — APROBADO (espejo de 124 §2), tres condiciones:**
- **Dominio**: la nota del fix cita el análisis de dominio de 124 §2 y confirma que la firma C++ no tiene ningún input por-celda (radial/altitud). Cualquier input por-celda = **STOP** y vuelta a ruling.
- **Pureza**: reuso puro del valor — misma función, mismas entradas, valor copiado. Bit-idéntico por construcción; sin cambios de matemática ni de orden.
- **Forma prescrita**: tabla **por-rebuild** de 5184 entradas, calculada al inicio del build y descartada al terminar — **no** caché persistente entre builds (el guard vive solo en (b); así (a) no tiene riesgo de staleness).
- **TU de equivalencia OBLIGATORIO**: naive vs memoizado, comparación celda a celda **exacta** (sin epsilon — no bit-exacto = wiring bug), en ≥2 combinaciones epoch/set-de-estaciones. Ese TU *es* la prueba empírica del dominio: una dependencia radial oculta la delataría. Efecto esperado ~60× (311.040 → 5.184 evaluaciones).

**3. (b) saltar el rebuild con estáticos — APROBADO.** La clave del guard va **enumerada en la nota**: epoch del cursor + versión de muestras/estaciones + cualquier otro input del build (toggles/colormap/settings que alimenten el volumen). El modo de fallo es staleness por clave incompleta. **TU del guard OBLIGATORIO**: cada input variado → rebuild dispara; todo estático → cero rebuilds en ≥12 ciclos del timer. Bonus declarado: (b) extiende el protocolo D187 al lado app — replay en pausa = volumen estático = frames deterministas; la vía de evidencia gana.

**4. Escala con estaciones: medición EXIGIDA, no opcional.** (a) no cubre necesariamente los picos 3.8/6.8/7.4 s — si la interp de estaciones es por-celda, los picos sobreviven a (a). Medir `vol=` con N ∈ {mínimo, 14, 44} a epoch fijo, antes y después. Si los pesos de estación dependen solo de (lat,lon): el mismo memoizado por columna queda **autorizado de antemano** (mismas condiciones + TU). Si dependen de radial: NO memoizar — volver con ruling y los números.

**5. Protocolo antes/después (`watchVolMs`): ratificado.** Mismo escenario pre/post (replay pausado + avanzando, misma ventana, mismo N, mismo hardware), tabla en la nota. Criterios: (i) pausado post-(b): **cero rebuilds, cero stalls**; (ii) rebuilds vivos post-(a): `vol=` **p95 < 150 ms** objetivo (recalibrable solo si el §4 muestra coste residual legítimo por-celda no memoizable); (iii) ningún stall de UI > 200 ms. **No autorizado en este drop**: backgrounding del build — si post-(a) los rebuilds vivos siguen perceptibles, se abre ruling aparte; el drop se mantiene mínimo.

**6. Partición del drop de fix:** scope taxativo `App.cpp` (rebuild `:2420-2472` + guard + tabla memo) + TUs nuevos (+ helper puro solo si procede), nada más. Barrera: suite completa sin flips + build + warnings baseline sin crecimiento. Ledger de anclas de `App.cpp` re-pineado. Custodia estándar. **Protección de evidencia**: el TU de equivalencia protege el baseline D187 — volumen post-fix **bit-idéntico o STOP antes de merge**; el pin del app avanza de `974da28` al fix drop, declarado.

**7. Nota de paridad web (no bloqueante):** verificar si el lado web tiene rebuild por timer análogo en pausa; si existe, el guard (b) aplicará en un drop posterior de esa línea.

---

Numeración: el ruling toma el 190; el fix viaja en el próximo drop impar (191 si tu nota diagnóstica ya es la 189 — acláralo en la nota del fix, junto con las dos líneas pendientes del §4 del veredicto 188 si aún no viajaron). Queda relay a Muse: dominio verificado → implementar (a)+(b) → medir → drop con la tabla antes/después y los TUs.
