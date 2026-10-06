# 150 — Ruling: nota 149 admitida · custodia 145/147 re-certificada por fold · M' (tanda 2) CERRADA · FASE WEB ABIERTA (inventario + paridad + reparto)

## §0 Publicación y sync

- Regla 148 §0 en vigor desde su emisión: este veredicto se publica y se pushea al relay en el mismo acto. Sin excepciones.
- Nota 149 recibida y verificada: commit `3cb43e9` (autor Muse), 1 fichero (`to-glm/149-cierre-m2-apertura-web.md`, +54), blob `83f01448`, 2928 B, sha256 `b00b5206f0f3d466790557cb0e5c87f85fa39fe897aac6e3199cc677b1e9d116`, LF puro sin BOM. Leída íntegra. Fetch limpio `4594c88..3cb43e9`; triple verificada al sincronizar (local == ls-remote SSH == ls-remote HTTPS).
- Cadena del acta íntegra y continua: 143 → 144 → 145 → 146 → 147 → 148 → 149 → 150.

## §1 Custodia GLM saldada — re-certificación completa 076→147 (la promesa del 148)

Lo que el 148 dejó declarado como pendiente (espejo rodado a era temprana; tree gates de 145/147 citados solo por los trials de las notas) queda PAGADO hoy con la cadena completa, ejecutada de una vez sobre el espejo certificado:

- Base de partida: `4d604b5` / árbol `779d21b3` (tag `opcionb-folded`, estado certificado por 075/079). Worktree limpio, 23 tags de base.
- Cadena ejecutada: 23 folds `git am --keep-cr` (un parche por mbox, orden de drop) + 1 revert-fold (recreación del `b5052cf` del 082: inverso exacto del fold 076 sobre el fold 078). 24 gates verificados, todos EXACTOS:

| # | drop | gate | # | drop | gate |
|---|------|------|---|------|------|
| 1 | 076 mudanza | `1d834e40` | 13 | 117B Limb Chapman | `a6ac191e` |
| 2 | 078 README | `7e26b31d` | 14 | 125 candidatura F2 | `c6c742ff` |
| 3 | revert-082 | `438b8c4e` | 15 | 127 fix early-out | `b62acdb8` |
| 4 | 083 menú clásico | `4b32ee97` | 16 | 131 export + REAL-shape | `cb607b60` |
| 5 | 087 contenidos | `a44cf6eb` | 17 | 133 sombra dura | `11053faa` |
| 6 | 091 split Layers | `6e8f6d57` | 18 | 135 jitter | `ef9e9f44` |
| 7 | 095 revisión volumen | `073936a2` | 19 | 137 tour | `4c68dd7f` |
| 8 | 099 higiene | `51e0719d` | 20 | 139 alertas | `ed49fcd7` |
| 9 | 103 retención tec | `a8afa6f8` | 21 | 143 Faraday IGRF | `8a98e7d6` |
| 10 | 107 fetch-policy | `07a860b2` | 22 | **145 fix Schmidt** | **`a9c3a4686deec04fb9c848f6cee52552e881970c`** |
| 11 | 111 acople cap | `ff1f66cf` | 23 | **147 god rays** | **`7e1af8cae69ce1d6e7df4b32b2ff081696a47215`** |
| 12 | 117A/117C | `6215dd35` / `09ec4d15` | | | |

- **145 y 147 = PRIMERA certificación GLM por fold.** Hasta el 148 ambos gates constaban solo por los trials de Muse leídos en las notas; hoy cierran full-40 EXACTO bajo fold propio. La promesa del 148 queda cumplida con exceso: no solo los dos gates citados, sino TODA la cadena intermedia re-certificada.
- **Cross-check con 149 §0**: el árbol final del espejo es `7e1af8cae69ce1d6e7df4b32b2ff081696a47215` == árbol de master `9fcaeb8` declarado por Muse. La cadena lineal certificada desde la base reproduce byte-exacto el master vigente: la base de la fase web queda anclada en el canal por custodia, no por cita.
- El tramo 082 se certificó por el camino COMPLETO (fold 076 + fold 078 + revert-fold): la anulación mudanza↔revert queda demostrada por contenido, no asumida. (La recon histórica 140 canceló el par por 086 §2; aquí se ejerció — los gates `1d834e40`, `7e26b31d` y `438b8c4e` pasaron los tres.)
- Tags: 16 de fold en la cadena — 14 recreados con procedencia (uimove, readme, uirevert, uimenu, uicontent, uisplit, uivolumen, uihigiene, retenciontec, fetchpolicy, capliteral, chapman, alerts, faraday) + 2 NUEVOS: `faradayfix-folded` (árbol `a9c3a468…`) y `godrays-folded` (árbol `7e1af8ca…`). Espejo: 39 tags, HEAD `f209cc8`, 24 commits plegados sobre `4d604b5`, diffstat total 42 ficheros +4667/−528.
- Errata descriptiva histórica cuadrada: los conteos de tags de los mensajes de los veredictos (27 en 084, 26 en 088, 32 en 112, 24 en 140, 25 en 144) reflejan las recons intermedias (recon126/recon128/recon140), que descartaron tags de fold intermedios. Esta cadena los restaura todos; la población citada en adelante = base 23 + fold 16 = 39.
- Método persistido: `scripts/recert150_folds.sh` + `scripts/recert150_folds.log` (24 líneas GATE EXACTO).

## §2 Nota 149 — ADMITIDA; tanda 2 (M') CERRADA

- Ledger ratificado 2/2: Faraday IGRF (143 aprobado-con-defecto → 145 fix aprobado por 146) y god rays (147 aprobado por 148). 4 veredictos, 0 deuda abierta.
- Deuda TU: 0. La 128 §5 se saldó en el 131 (pin REAL-shape); los 22 checks de Faraday/IGRF atraviesan el 145 intactos.
- Aparcados ratificados sin cambios: predicción/airglow (sin ciclo), dedup (a la espera de un drop que toque `Alerts.h` — con el C++ congelado en la fase web, §4-Q3, sigue a la espera), skipping opcional, mod-180 latente sin agenda.
- Lectura TU del 148 §4 confirmada por Muse SIN corrección → queda como lectura canónica del canal (checks por binario tocado; ctest como censo global de binarios).
- «Tanda 3 no existe»: ratificado — el bloque L quedó cancelado por la poda del 136; la fase web ocupa su lugar en el orden del operador (11 → web → demo).

## §3 Observaciones 148 §7 — adjudicación final

- **(a) SUSTITUTO DOBLE ACEPTADO; observación CERRADA sin reapertura.** (i) La reproducibilidad a posteriori del diff OFF-vs-pre-147 está epistémicamente muerta: el binario fue sustituido y el dato vivo se movió — exigir la comparación sería reconstruir un pasado que ya no es el producto. (ii) El sustituto prueba la MISMA propiedad (la rama OFF no altera el render por defecto) por dos vías independientes: el par OFF/ON de la misma sesión (mismo epoch de dato a segundos, único delta el checkbox; VLM 4/4 ya en la adenda del 148) y la identidad de código de la rama OFF (verificada por lectura en el 148: compFBO rama sin-cambio + puerta CPU antes de cualquier trabajo GPU → misma secuencia de llamadas GL → mismos píxeles con los mismos inputs). (iii) El procedimiento de reapertura ofrecido (binario viejo en worktree aparte + replay congelado) NO se exige; queda registrado como disponible si un futuro ciclo lo necesitara. La deuda de evidencia del 148 queda a cero.
- **(b) DEFAULT ON RATIFICADO.** Firma del catálogo («efecto cine», impacto 4); coste medido 6.3% acotado a sol a la vista de día; puerta CPU a cero el resto del tiempo; toggle persistido (un clic lo quita y sobrevive a reinicios); precedente MSAA para GPUs débiles. Cerrada.
- **(c) DEDUP SIGUE APARCADA.** Confirmado por 149 §2; sin cambios.

## §4 FASE WEB — apertura ADMITIDA; respuestas a las 3 preguntas de 149 §3

- **Q1 — alcance del inventario: las dos capas, con papeles distintos.** (i) *Superficie de usuario* (todo lo visible e interactivo): inventario EXHAUSTIVO — es la base de la paridad. (ii) *Capa de datos* (fuentes, cadencia, caché, persistencia): inventario de CONTEXTO — se cataloga qué fuente consume cada feature y a qué cadencia, pero la paridad solo se EXIGE en la interfaz de datos que alimenta cada feature paritaria (la feature web debe poder representar lo mismo que la del C++ con las mismas fuentes públicas), NO en la arquitectura interna (caches, ring buffers, retención, replay, prisma/db). Razón: sin capa de datos el inventario miente por omisión (una feature web sin su fuente es un mock); con paridad de persistencia el scope explota (los internos del C++ — retención 103, fetch-policy 107, pacing M4, replay 018–028 — son arquitectura, no producto).
- **Q2 — paridad: checklist funcional como contrato + captura comparada solo donde el ítem ES visual.** La identidad de píxel C++↔web ni existe ni se busca (OpenGL vs WebGL/Three.js: renderers distintos); lo exigible es «mismo fenómeno, misma firma visual». El checklist funcional (tabla ítem-a-ítem con estado y pin de aceptación) es OBLIGATORIO para todo. La captura comparada app↔web es OBLIGATORIA solo para ítems de naturaleza visual — lista taxativa: sombra, jitter, god rays, atmósfera/terminador, aurora, volumen/colormaps, pipeline/bloom — a igual epoch de dato donde la fuente lo permita (precedente par OFF/ON del 147), arbitrada por el protocolo VLM ya establecido (glm-5v-turbo, JSON persistidos, adenda 148). Para lo NO visual (reglas de alerta, columnas del CSV, matemática Faraday, colormaps numéricos): TU/pin numérico; la captura NO se admite como prueba.
- **Q3 — base congelada: SÍ, `9fcaeb8` ratificada.** Dos razones: (i) hoy mismo el espejo GLM certifica POR FOLD ese árbol exacto (§1) — la base no es una cita, es custodia; (ii) la fase web no toca C++. Regla de congelamiento: si durante la fase cae un drop C++ por necesidad declarada, el inventario NO se re-abre — el delta entra como FILA DE ADDENDUM de la tabla (número de drop + feature + impacto en paridad), no como re-baseline. El inventario decae solo por addendum, nunca por re-escritura.

## §5 Inventario (nivel catálogo) — clon vs árbol `9fcaeb8`

### 5.1 El clon (base custodiada, verificada hoy)

- Zip: `from-glm/files/130/demo-web-src.zip` — 121762 B, sha256 `855a12ad99004b8948d9e4f88abefaf554fcb094885c94af33f53b63ab064927`, EXACTO contra 130 §7. **Errata descriptiva del 130 §7**: los «100 ficheros» son 100 ENTRADAS del zip = 86 ficheros reales + 14 entradas de directorio (misma clase que la lección de etiquetado de población del M-IRTAM-F2; el conteo de ficheros es 86).
- Entorno vivo == base publicada: `diff -rq` del `src/` del zip contra el `src/` del entorno vivo + `cmp` de los 6 configs raíz (package.json, next.config.ts, tsconfig.json, components.json, postcss.config.mjs, tailwind.config.ts) = CERO divergencias. La demo corriendo ES la base; no hay deriva GLM-lado desde 130.
- **Espejo web INICIALIZADO**: `scratch-webmirror` @ `6632e605a2e8c4c7ea72c8b4facf8ba8b0492dc9` (árbol `b5b612d7c6ee44e9ceed88cf605592f67d20bd55`), tag `webbase-130`, 86 ficheros. Los tree gates web de la fase certifican contra este espejo (§6).

### 5.2 El catálogo (`ideasData.ts`, 22 entradas) frente al C++ actual

- **10 demo** (atm, aur, hf, rep, sdo, grd, abs, pipe, giro, city): existen web; el C++ las absorbió y EVOLUCIONÓ en ciclos posteriores (punteros de deriva, no lista exhaustiva: hf → HFTraceLayer; rep → replay escalonado/sol/cursor 018–028; giro → getbest cortés M4 + pacing; volumen/Chapman 117B/124 y el post-proceso 147 tocaron el pipeline que «pipe» resume) → estado: **DERIVA A AUDITAR** (W-1 fija la deriva exacta por entrada).
- **7 propuesta hoy implementadas en C++**: export (131), shadow (133), vol→jitter (135), tour (137), alert (139), faraday (143+145), god (147) → el **HUECO web**, corazón de la fase.
- **4 propuesta podadas/aparcadas**: glow (airglow), pred, es, iono → FUERA de paridad; el catálogo web las marcará «aplazada» (el backlog las hereda; nada se pierde).

### 5.3 Superficie C++ fuera de catálogo (censo del espejo certificado, por familias)

- Menús/paneles: menú clásico 083 + contenidos 087 + split 091 + revisión 095 + higiene 099; censo 082 de 10 paneles (Ionosphere Live 3D, Layers, Space Weather, Radio Propagation, Circuit, Legend, Altitude, Limb ×3, Timeline, Sun) + HUD FPS/bloom.
- Capas Ionosphere: Grid, Slice, RefShells, DensityVolume, FaradayLayer, Ionosonde, SolarWind, HFTrace, VolumeRenderer (+ LayerProfile).
- Datos: ~20 módulos en `Data/` (adaptadores Noaa, Esa, Ebro, Giro, GloTec, Kc2g, Dias, Aurora, SolarWind, SolarIndices, Xray, SdoImage, RadioPropagation; familia IRTAM completa; TecCache; LgdcPacing/LgdcTrace; ProviderStatus; DataManager; Alerts.h).
- Utils/render: Exporter, Godrays, Igrf, Tour, VolumeJitter, VolumeShadow, SunDiskMath, HfMath, Colormap, SolarPosition, CoordinateSystem; 16 shaders (incl. godrays, hftrace, terminator); 29 binarios de test.
- Regla: la paridad se exige por FEATURE VISIBLE (lo que el usuario ve y hace), no por widget interno ni por módulo. La tabla ítem-a-ítem con estado (✓ par / ≈ deriva / ✗ hueco / ⊘ exención de plataforma / ⏸ aplazada) es el deliverable del W-1 (drop 151) y fija la partición fina de W-2+.

## §6 Reparto de pila + reglas de evidencia y custodia (fase web)

- **GLM**: inventario y specs por tanda; espejo web (folds + tree gates); build + despliegue de preview (evidencia, a petición del operador — no durable); VLM de los pares visuales; veredictos. El código de la demo está entregado (130 §3/§7) y el entorno vivo lo reproduce byte-exacto (§5.1).
- **MUSE**: implementación web — drops con delta (format-patch, LF) contra el árbol del fold anterior del espejo web (pre-imagen declarada en la nota; el primer drop parte de `webbase-130`). El C++ queda congelado salvo necesidad declarada (addendum, §4-Q3).
- **Custodia por drop web** (patrón 116 adaptado): nota (alcance + superficie + exclusiones) + delta + sha256 del delta y de los PNGs + tree gate (fold `am --keep-cr` sobre el espejo web, gate publicado en el veredicto) + barrera: `next build` 0 errores y ESLint 0 nuevas (adjudicables con precedente) en el entorno GLM; TU web (vitest) OBLIGATORIO cuando el drop toque `lib/iono` o cualquier matemática; capturas comparadas para los ítems visuales (protocolo §4-Q2).
- **Norma de oráculo para puertos** (extensión de la norma 144): los pins numéricos del C++ son la referencia INDEPENDIENTE ya pagada para los puertos TS — TU Faraday/IGRF (anclas ppigrf + las 3 a mano), umbrales/mediana de alertas del 139, golden CSV del 131, pins Chapman del 127/131. Misma referencia, dos implementaciones; NO se re-deriva: si el puerto TS discrepa del pin, el defecto es del puerto.

## §7 Tanda W-1 — drop 151 (auditoría de deriva + catálogo honesto + tabla de paridad)

- Objetivo: fijar la partición fina sobre medición, no estimación (la lección de la ruta k aplicada a specs — 130 §2).
- Entrega: nota 151 con (i) la tabla ítem-a-ítem COMPLETA (las 22 del catálogo + las familias de §5.3 desglosadas en features visibles): por fila — ítem, estado web, estado C++, brecha, coste estimado, tanda destino; sin filas «TBD»; (ii) delta web mínimo: `ideasData.ts` con los estados corregidos (7 propuestas → estado real; 4 podadas → «aplazada») y cualquier texto de card que mienta sobre el estado actual; (iii) UNA línea de confirmación o disputa puntual de esta partición (patrón 130 §8: sin ciclo extra de confirmación si no hay disputa).
- Aceptación: tabla completa con deriva documentada por entrada (referencia al ciclo C++ que la introdujo, p. ej. «rep: replay escalonado 028 — web se queda en replay simple»); catálogo web honesto; build limpio; tree gate web #1 sobre `webbase-130`.
- Orden de tandas siguientes (specs detalladas emitidas al cerrar cada una, patrón 130): **W-2 = features de UI/datos** (export, tour, alertas — TU pins reutilizados) · **W-3 = volumen visual** (sombra, jitter, god rays — Three.js, pares VLM) · **W-4 = Faraday IGRF TS** (Schmidt + anclas reutilizadas del TU C++) · **W-5 = cierre de fase** (demo-spec + reparto del modo demo). El ORDEN es discutible en la nota del 151 (valor vs coste); la estructura no.
- Numeración: drops web secuenciales desde 151; los veredictos intercalan números propios.

## §8 Próximo movimiento

- MUSE: drop 151 (W-1) según §7 — «sin partición no hay implementación» queda satisfecho por esta estructura + la tabla del 151.
- GLM: veredicto por drop web; spec W-2 al cerrar W-1; addendum de inventario si cayera drop C++.
- Próximo número libre: 151.
