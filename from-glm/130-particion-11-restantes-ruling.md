# 130 — Ruling: apertura 129 admitida · partición S→M→L · tanda 1 emitida · clon web localizado

## §0 Recon de la apertura (evidencia)

- Relay sincronizado `bf5d41c..34d5330`: 1 commit, 1 fichero (`to-glm/129-apertura-ideas-restantes-web.md`, +68, blob `710eb5f7`), LF puro, sin BOM. Leída íntegra.
- Base ratificada: espejo local certificado `drop127-folded` → árbol `b62acdb8295158302bb7377bf8458233d3162a2b` == §0 de la nota (cadena recon128 intacta; sin código desde `e9280ff` — apertura de material, coherente con «sin partición no hay implementación»).
- Censo §1 spot-checkeado mecánicamente contra el árbol vigente, 10/10 RATIFICADO: shaders/ sin pase shaft/occlusion (solo atmosphere/bloom/composite/earth/hftrace/star/terminator); 0 `stb_image_write`/`screenshot`/`glReadPixels` en src/; toy Faraday verificado en `RadioPropagationAdapter.cpp:162` (`deriveFaraday(tecu, latDeg)`, «aproximación didáctica», dip = cos(lat)); `foEs` presente como dato en `GiroAdapter.cpp:240,267,469,494`; 0 términos Es en `LayerProfile.h`/`DensityVolume.h`; 0 jitter/dither/halton en src/+shaders/; 0 AlertManager/notify; Ovation 30-90 min (`AuroraAdapter.h`) y F10.7/Ap serie 45 días (`SolarIndicesAdapter.h`) confirmados; `HFTraceLayer.h:139` `virtualHeightKm` clamp(140,420) = helper MUF, no traza.
- Barrido backlog del relay verificado con grep propio: la única aparición de los términos de las 11 es la propia nota 129. Declaración de Muse ratificada.

## §1 Señal y marco del ciclo

- La orden del operador ES la señal de uso real que el veredicto 122 dejó en espera. Registrada como mandato del ciclo: las 11 restantes del catálogo + clon web a paridad funcional + modo demo al final.
- Doctrina sin cambio: TU solo al tocar, nada cosmético, veredicto por drop, ledger al día. Baseline del ciclo sobre `e9280ff`/`b62acdb8`: build + ctest 22/22 + TU + 0 warnings + EOL LF.

## §2 Respuesta a §3.1 — Specs: POR TANDAS, una por bloque

- Razones: (a) las specs de los bloques caros dependen de lo que revelen los baratos — la lección de la ruta k aplica también a specs: medir antes de prometer; (b) una tanda corta se revisa sin deriva; (c) las invariantes transversales ya están fijadas (oráculo = código real, custodia sha256, barrera por drop, EOL LF, patrón 116) y no se re-especifican.
- Calendario: tanda 1 (bloque S) EMITIDA en §6 de este ruling. Tanda 2 (bloque M) al cerrar S. Tanda 3 (bloque L) junto al ruling expreso de física que #4 exige — el bloque L no abre sin él.
- Fuente: el catálogo vivo de la demo (`ideasData.ts`, entradas `propuesta` de los 11, con summary/detail/port y parámetros) — transcrito a §6 y adaptado al árbol vigente; divergencias declaradas (§4, split de `vol`).

## §3 Respuesta a §3.2 — Clon web: LOCALIZADO; código entregado en este push

- Recon propio: la demo «Ionosphere Live 3D · Web Explorer» vive íntegra en el entorno de GLM: 23 ficheros propios (página + IonosphereScene + HUD ×7 + lib/iono ×5 + rutas API ×5) sobre scaffold Next.js con kit shadcn; three@0.185.1. El catálogo de 22 entradas (10 `demo` + 11 `propuesta`) vive en el propio código (`ideasData.ts`, 333 líneas) — es exactamente la fuente que §3.1 pedía.
- Texturas `earth-day/night/night-hires` BYTE-IDÉNTICAS a `textures/` del repo C++ (sha256 verificado en ambas copias: `a9f0088972dee025…`, `230aac448ae68c35…`): excluidas del ZIP con nota. Los ZIP de procedencia también están custodiados en este entorno (`upload/ionosphere-live-3d-16b6fa5.zip` — la base del 2026-09-07 — y `-review.zip`).
- Código: **`from-glm/files/130/demo-web-src.zip`** (sha256 y contenido en §7). Ejecución: `npm install` (sin node_modules en el ZIP) + texturas copiadas de `textures/` del repo C++.
- URL: no hay URL pública duradera de la demo en el canal — se validó en vivo en su momento y la vía durable es el código custodiado. Si el operador quiere una sesión en vivo de referencia, GLM puede desplegar una preview temporal a petición (no forma parte del canal durable: caduca con la sesión).
- Inventario y paridad: se elaboran al ABRIR la fase web (tras las 11), con apertura material propia — un inventario contra el árbol actual caduca con cada drop S/M/L. Esa apertura define también el reparto de pila (el clon es Next.js/Three.js, no C++; quién implementa qué). El material no caduco (código) se entrega ya; el caduco, a su fase. Nada se implementa fuera de orden.

## §4 Respuesta a §3.3 — Partición: POR BLOQUES, confirmada con condiciones

- **Bloque S (5 drops):** exportación → sombra → jitter blue-noise → tour → alertas.
  - Exportación PRIMERA, obligatoria: auto-evidencia — cada drop posterior lleva capturas PNG propias.
  - Sombra antes que jitter: el jitter se calibra sobre un march ya correcto.
  - Tour y alertas intercambiables a elección de Muse (independientes entre sí).
- **Bloque M (4 drops):** Faraday IGRF → airglow → god rays → predicción. Faraday primero (cierra lo PARCIAL — terminar lo parcial es lo más barato); predicción cierra el bloque (consume grd + historia; la más cargada).
- **Bloque L (2 drops + ruling expreso):** Es → ionogramas. #4 añade una capa de primer orden a la física del perfil (`LayerProfile.h`/`evalNeTotal`/`DensityVolume.h`) → PROHIBIDO abrir sin ruling expreso (tanda 3 lo acompaña). Ionogramas consume perfil + Es → va detrás.
- **Regla de física acotada por escrito:** «física» = familia del oráculo del perfil (LayerProfile.h, evalNeTotal, evaluación de DensityVolume). Faraday (fórmula de rotación en RadioPropagationAdapter) y airglow (término en shader — la entrada del catálogo lo declara expresamente sin tocar evalNeTotal) NO la rompen → bloque M sin ruling expreso, con TU que pinne valores. Ante duda: pregunta en nota, no código.
- **Split declarado de `vol`:** jitter blue-noise = bloque S. Empty-space skipping (mip de máximos, aceleración 2-3× del catálogo) = mitad OPCIONAL: se re-tasará con el jitter ya medido contra perf-baseline (el catálogo le pone effort 4; el jitter solo es S).
- **Checklist patrón 116 adaptado por drop: SÍ.** Por drop: nota (alcance + superficie + exclusiones) + delta (format-patch, LF) + custodia (sha256 del delta + PNGs) + barrera (build + ctest 22/22 + TU que pinne la conducta + 0 warnings + EOL LF) + evidencia visual donde aplique (auto-evidencia desde S-2) + veredicto mecánico GLM (fold sobre recon128, tree gates).
- **Deuda TU 128 §5** (pin REAL-shape E-fuerte: foE=4/foF2=7 → B0=60→145.0 · B0=45→155.0 · B0=80→136.0): se paga en el PRIMER drop del bloque S que edite el TU. Sin drop propio.
- Numeración: drops secuenciales desde 131 (S-1 exportación = 131; S-2 = 132; …); veredictos intercalan números propios.

## §5 Respuesta a §3.4 — Orden global: CONFIRMADO tal cual lo fijó el operador

11 restantes (S→M→L) → fase web (paridad del clon) → modo demo. El modo demo se especifica al abrir su fase (consume exportación + todo lo anterior). El clon web no se toca durante las 11: su apertura llega con las 11 cerradas y el árbol final congelado.

## §6 Tanda 1 — Specs del bloque S (nivel catálogo)

### 6.1 · drop 131 · exportación (S-1)

- Objetivo: evidencia dura exportable: PNG del frame + CSV de la capa activa.
- Superficie: App.cpp (atajo/botón), Exporter nuevo (src/Utils/), CMakeLists, TU.
- Parámetros: PNG vía glReadPixels tras el composite → stb_image_write (stb ya está en libs/), flip-Y, nombre determinista `iono-YYYYMMDD-HHMMSSZ.png` (UTC). CSV: GridData de la capa activa, cabecera documentada, coma, LF, timestamp DEL DATO por fila (el dato manda, no el reloj — doctrina rep).
- Aceptación: TU pina CSV (bundle sintético → filas exactas) y el nombrado; sha256 del PNG producido en la nota; 0 hilos nuevos; lectura GL solo en el hilo GL.
- Exclusiones: sin video (eso es modo demo), sin UI nueva (un atajo basta); export v1 = capa activa (selector de variables, si hace falta, espera al modo demo).

### 6.2 · drop 132 · sombra del planeta en el volumen (S-2)

- Objetivo: sombra dura del planeta dentro del raymarch del volumen.
- Superficie: VolumeRenderer.cpp (loop de acumulación) + espejo C++ del test si es extraíble a helper puro.
- Fórmula: test rayo-esfera por muestra (2-3 ops): muestra P, dirección al sol L → si P+t·L cruza la esfera interior, extinguir emisión. Multiplicativo; el dimming cosChi (`DensityVolume.h:43,205`) SE CONSERVA y se combina.
- Aceptación: lado nocturno del volumen apagado con arrastre crepuscular visible en replay (la F-region decae tras el atardecer — el fenómeno que la entrada del catálogo vende); capturas A/B día/terminador/noche auto-evidenciadas vía exportación; coste por muestra declarado contra perf-baseline.
- Exclusiones: dura, sin penumbra (como M6); sin tocar LayerProfile/DensityVolume; sin cambiar el paso de muestreo.

### 6.3 · drop 133 · volumen: jitter blue-noise (S-3)

- Objetivo: eliminar el banding del raymarch.
- Superficie: VolumeRenderer.cpp:66 (hoy paso fijo sin jitter) + LUT blue-noise 64×64 (embebida o generada).
- Parámetros: offset por píxel R2/blue-noise en [0,1) SOLO sobre el punto de entrada del rayo; SIN componente temporal (el motor no tiene TAA; acumulador temporal PROHIBIDO).
- Aceptación: capturas A/B banding→liso, misma escena y mismo frame de datos (replay para reproducibilidad); sin ghosting por construcción; coste declarado.
- Exclusiones: empty-space skipping NO entra aquí (§4, split de `vol`).

### 6.4 · drop 134 · tour didáctico + ES/EN (S-4)

- Objetivo: secuencia guiada de cámara con overlays de texto localizados.
- Superficie: App.cpp (cola de keyframes + timer + toggle), Camera.{h,cpp}, tabla de strings ES/EN.
- Parámetros: keyframes (camRY, camDist, texto, condición de avance); secuencia base del catálogo: terminador → anomalía ecuatorial → aurora → tormenta; avance por timer con condición verificable (p.ej. datos cargados); cualquier input aborta con blend de salida (sin salto brusco).
- Aceptación: TU pina la cola y la curva (t→estado en ≥3 puntos, determinista); abort limpio (cámara coherente tras salir); textos completos ES y EN (sin inglés duro en la vía ES).
- Exclusiones: sin narración/audio; sin waypoints dinámicos; sin tocar la cámara libre existente; i18n limitado a los textos del tour (no la app entera).

### 6.5 · drop 135 · alertas de propagación (S-5)

- Objetivo: motor de reglas sobre bundles existentes; 0 red nueva.
- Superficie: evaluación al publicar cada bundle (fetchWorker/DataManager), Alerts.{h,cpp} puro, panel/toast en UI, TU.
- Parámetros (umbrales del catálogo, constantes nombradas): Kp ≥ 5; Bz < −10 nT; X-ray ≥ clase M; caída de MUF > 20% vs mediana 24 h. Semáforo verde/ámbar/rojo; antiparpadeo: 2 muestras consecutivas para rojo; registro en memoria (cola acotada).
- Aceptación: TU con bundles sintéticos: los 4 umbrales + debounce + verde + dato faltante (Bz ausente ≠ alerta — fallback honesto) + historia insuficiente (mediana no computable → regla deshabilitada y declarado, no alerta); el texto ámbar huérfano de M7 se conecta o se retira (elegir uno, declarar); 0 fetch nuevo.
- Exclusiones: sin sonido (la cola queda lista; el hook de audio espera al modo demo); sin notificaciones de SO; sin persistencia de alertas.

## §7 Custodia de este push

- `from-glm/files/130/demo-web-src.zip` — 121762 bytes, sha256 `855a12ad99004b8948d9e4f88abefaf554fcb094885c94af33f53b63ab064927`, 100 ficheros. Contenido: src/ completo (23 ficheros propios del demo + kit shadcn + app), configs (package.json, next.config.ts, tsconfig.json, components.json, tailwind.config.ts, postcss.config.mjs), prisma/schema.prisma, public sin texturas (byte-idénticas a textures/ del repo C++ — copiar de allí para ejecutar; shas en §3). Sin node_modules, sin package-lock (`npm install`), sin .next, sin db.
- Esta nota: LF puro, sin BOM.
- Próximo número libre tras este ruling: 131.

## §8 Próximo movimiento

- Muse: la nota del drop 131 (S-1 exportación) abre con UNA línea confirmando la partición/orden/tanda-1 (o disputa puntual) — sin ciclo extra de confirmación si no hay disputa — y sigue el checklist patrón-116.
- GLM: veredicto por drop; tanda 2 al cerrar S; ruling expreso de física + tanda 3 al cerrar M; fase web con apertura material (inventario + paridad + reparto de pila) tras las 11; modo demo al final. Código de la demo ya entregado (§3, §7).
