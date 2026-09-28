# 075 — Vía UI: conformidad con el cierre (073D + 074) + checklist del drop de mudanza

**Cero código.** Respuesta a `073-ui-decisiones-david.md` (ddfbec6) y `074-ui-cierre-decisiones.md` (42a9db1). Todo conforme; ninguna decisión queda pendiente. Esta nota registra la conformidad duraderamente y deja el checklist del drop de mudanza citable en una sola pieza.

## 0. Continuidad y custodia

- Incidente de entorno #16 declarado: paramiko desaparecido del venv de nuevo (patrón conocido de los #7/#15), reinstalado 5.0.0; canal SSH re-verificado en el acto. Relay sincronizado por fetch HTTPS + ff limpio: rango 8a3f648..42a9db1 append-only EXACTO (2 ficheros nuevos, +18/−0, cero modificaciones, cero borrados). TRIPLE: local == SSH (paramiko) == HTTPS == 42a9db1.
- Custodia de ambas notas: 073D 794 B / 9 líneas / blob `985e3946` == disco == árbol; 074 784 B / 9 líneas / blob `a35eb3a6` == disco == árbol; las dos UTF-8 sin BOM, LF puro.
- Espejo intacto y listo para el fold de la mudanza: HEAD == opcionb-folded (tag objeto 67482f8f → commit 4d604b5), tree `779d21b3`, 23 tags, working tree limpio.

## 1. Cierre ACEPTADO — variante David de la enmienda A, conforme

- **Enmienda A**: la 073 exigía declarar la asignación de los 4 bloques (decisión de David, criterio suyo). Declarada en 073D con variante propia: Faraday→**Viento**, Aurora→**Vista** (mi sugerencia era Faraday→Estaciones, Aurora→Viento; la cohesión alternativa es igual de defendible — Faraday son vectores de campo impulsados por el viento solar, Aurora es estado visual del cielo). **ACEPTADA.** Re-cuadre mecánico con las cuentas publicadas en 073: Vista 9+Labels+Explode+Aurora(2-3)+HUD Sol(1-2) = **14-16** · Datos **21** (inalterado) · Volumen **12** · Estaciones **16** (−Faraday) · Viento **12-13** (−Aurora +Faraday). Único >18 sigue siendo Datos (21, preexistente y ya adjudicado ≪36 en 073); margen >2× contra el techo ~36 filas/759 px. La propiedad de diseño sobrevive a la variante.
- **Enmienda B**: Labels→Vista y Explode→Vista confirmados. El delta de la mudanza deberá listar las filas que cambian de posición — las **6 poblaciones**: Labels, Explode, Aurora, HUD Sol, Faraday, estado TEC.
- **CRÍTICO satisfecho en papel**: la tabla congelada de 074 incluye «interacción izada» — el bloque `App.cpp:3975-4073` a ejecución incondicional por frame. GLM verificará en el delta que la izca es REAL (el bloque fuera de todo cuerpo condicionado a la pestaña activa) y que `hoveredStation`/`mouseLeftPrev` siguen escribiéndose por frame como hoy.
- Pestaña por defecto **Datos** (sugerencia 073 ratificada por David). Rail congelado **Vista→Datos→Volumen→Estaciones→Viento** (== 073 §3.3; futuras pestañas solo se añaden al final). Radio Propagation (circuito HF), Timeline, Circuit, Bloom/Sistema, Space Weather, Legend, Altitude, Limb x3 y Sun **intactos** (== 073 §3.9, fase 1 = solo Layers).

## 2. Checklist del drop de mudanza (camino ligero 073 §2, re-pinneado para cita)

Custodia estándar de canal: **nota + delta (format-patch del commit de la app) + hash de commit/árbol**. La verificación mecánica de GLM cubrirá:

1. Mudanza pura: TODO el texto movido byte-idéntico (labels, tooltips, literales, comentarios); poblaciones de literales pineadas sin cambio.
2. Filas que cambian de posición declaradas (las 6 poblaciones de §1).
3. Censo EOL de la zona (App.cpp = CRLF): líneas movidas conservan sus CRs; líneas nuevas (rail/tab bar/funciones de pestaña) siguen la convención de la zona y se declaran en el censo del delta.
4. `Separator()` inter-bloque contabilizados: los que mueren por la partición, ninguno nuevo sin declarar.
5. Grep de cortesía G6/G8 (cambio solo-UI: sin semántica de datos ni red).
6. Tree gate sobre el espejo (fold del delta → hash de árbol publicable).
7. Ventana «Layers» intacta (clave de imgui.ini) + sideTab en saveSettings/loadSettings (anclas 073: `:2327`/`:2404`) con default para clave ausente, SIN bump de versión de settings.
8. Atajos 1-5, si se implementan, declarados en la nota (sin colisión — verificado en 073: únicos handlers globales ESC/C/H/± `:1765-1816`).
9. Pestaña por defecto Datos en primer arranque; orden del rail == tabla congelada de 074.
10. Izca del bloque de interacción verificada por estructura (crítico de §1).
11. Barrera: build + ctest 21/21 (ningún test toca UI — esperado sin flips) + visto bueno visual con capturas del panel con pestañas.
12. Post-veredicto: re-pin del ledger de anclas (`:4827 :4859 :4862 :4880 :4883 :4895`…) sobre el árbol resultante — lo hace GLM en el veredicto.

## 3. Ledger

- Decisiones UI fase 1: **CERRADAS** — 073-GLM (8a3f648, opinión) → 073D (ddfbec6, decisiones David) → 074 (42a9db1, tabla congelada + luz verde) → 075 (esta conformidad). La doble numeración 073 queda registrada para citas: **073-GLM** vs **073D**.
- Próximo paso esperado: **drop de mudanza** (nota + delta + barrera) → veredicto mecánico + re-pin del ledger de anclas.
- Backlog sin cambios (O-030a aparcado, 2 inconsistencias de escala documentales, política de retención de disco tec_*.bin viva como línea de nota).
