# 139 — Motor de alertas de propagacion (S-5, cierra S)

Particion 130 sec.6.5 ejecutada tal cual (reglas sobre bundles existentes,
0 red nueva, semaforo con antiparpadeo, TU sintetico, M7 conectado; sin
sonido, sin notificaciones SO, sin persistencia). Commit app
`7021504..8cc4611` (4 ficheros, 398+/7-).

## 1-3. Custodia + pre-imagenes + tree gate (D3)

- Delta `to-glm/files/alerts139_delta.txt` (19365 B, sha256 `afd4b12ef04f6676617fad335a7177741f7b125689827a5b8e5715a61f9c7be8`, `From 8cc4611239ea3ef80d04d0b98423e46ac17b1366` copiado byte a byte de la cabecera — norma errata-095, 4 ficheros, sin BOM).
- Pre-imagenes (verificadas, resto intacto del 137): App.cpp + CMakeLists del arbol `4c68dd7f…`.
- **Arbol post-drop full-40: `ed49fcd71e6649e1d76d594026725590edcd04a4`** — trial `am --keep-cr` sobre clon de `7021504` aplica limpio y cierra el arbol EXACTO.
- Blobs post (full-40 de git): CMake `1543565f…` · App `4983b1ee…` · Alerts.h `299a39aa…` · test_alerts `cb4308f8…`.
- Captura (operador en vivo, exportacion 131): `alerts139_panel.png` (1337066 B, sha256 `309dde1506314a772072f7916e238da7e3f25e7ae6a7d9cd8a7f9a69bc48d426`) — panel con semaforo mixto EN VIVO (AMBER global, Kp GREEN, Bz GREEN, X-ray AMBER, MUF drop OFF) + log de transiciones (X-ray OFF->AMBER, Bz/Kp OFF->GREEN). Firma PNG verificada; sin chunks de texto por libreria.

## 4-5. EOL + multiset

- Ficheros nuevos LF puro en blob y work (0 CR). App.cpp/CMakeLists: 0 lineas LF en zona CRLF (censo por-linea). **CR neto 0** (esta vez si, global y por fichero).
- Numstat: CMake 3/0 · App 88/7 · Alerts.h 150/0 · test_alerts 157/0 = **398+/7-**. Removed = lados viejos de hunks reemplazados (cabecera consumeBundles + bloque xr re-emitidos con el hook). Cero pares movidos; cero blancos.

## 6. Contenido (motor puro + wiring fino + panel)

- `Data/Alerts.h` (puro, header-only, sin GL/red/hilos/persistencia/sonido): niveles GREEN/AMBER/RED/OFF (OFF = deshabilitada) · umbrales del catalogo con nombre (Kp 4/5, Bz -5/-10, X-ray C/M por rango, MUF -10%/-20% vs mediana 24 h) · rojo exige 2 muestras seguidas (mientras cuenta muestra ambar) · anillo MUF acotado (288 muestras, poda 24 h, mediana por nth_element; <6 muestras o <3 h de span -> OFF declarado, nunca alerta) · `!ok` -> OFF (dato ausente no alerta) · overall = peor regla sin OFF · cola de eventos acotada (32, con regla/from/to: ES la cola que un futuro hook de audio consumiria).
- Wiring (`consumeBundles`, hilo principal): snapshot de los 4 punteros antes/después; si alguno de indices/wind/radio/xray se publico, UNA evaluacion con los ultimos valores + utc (radio > xray > viento > indices). Sin red, sin hilos, sin persistencia. Punto de evaluacion declarado (equivale a evaluar al publicar para niveles y debounce; el debounce cuenta muestras de datos, no frames).
- Panel Radio (tras el bloque M7): `Alerts: <global>` + 4 filas por regla con tooltip de umbrales + ultimas 6 transiciones (`Regla from -> to`). M7 DECIDIDO: CONECTADO — el aviso ambar de flare se mantiene con su dB (trigger propio correcto `flareAbsorption>1.0`); la regla X del motor lee la misma fuente (rpFlux/XraySample) y el panel lleva el estado. Conectado por fuente de verdad, sin duplicar logica.
- Ambar propios (mitad del diseno, declarados): Kp 4, Bz -5, X-ray C, MUF -10% (el catalogo fija los rojos; el ambar es aviso intermedio).

## 7. TU (20 checks) + evidencia viva

- `test_alerts` 20/20: 4 umbrales (rojo tras 2 + verde) · antiparpadeo (1 muestra roja no latchea) · ambares · Bz ausente -> OFF con valor basura (no alerta) + global intacto · MUF sin historia/2 muestras -> OFF · cola (transicion registrada con regla/from/to + cota 32). Transparencia: 4 correcciones pre-commit (setRule simplificado tras redactado con rama inalcanzable, ventanas UTC del bloque MUF a <24 h por la poda, test de eventos reestructurado, cast enum Level).
- Evidencia viva (mas alla del TU): el panel en produccion evalua, transiciona OFF->color al publicar y registra (X-ray AMBER con 1 muestra = ambar inmediato correcto; MUF OFF con sesion recien arrancada = historia insuficiente correcto).

## 8. Barrera

Build OK; 0 warnings en la salida del build local (UCRT64 g++ 16.1) + TU compilado aparte con `-Wall -Wextra` limpio; ctest **27/27** (26 + alerts); LINK OK (app cerrada por el operador para el link; la 1a pasada fallo por bloqueo del exe en vivo — sin codigo implicado).

## 9. Coste perf + mapa declarado

- Coste: 0 por frame sin publicaciones; por publicacion: 1 evaluacion pura (4 reglas + mediana nth_element sobre <=288 + poda). Despreciable frente al fetch que la dispara.
- Comportamiento: sin bundles nuevos, identico por construccion (el motor solo corre al publicar). UI anadida no toca render/datos.

## 10. Anclas + EN

- Anclas nuevas para re-pin GLM post-fold: `Alerts.h` 1-150 (umbrales/engine), App `evalAlertRules` + hook consumeBundles + panel Radio, TU `test_alerts.cpp`, CMake (`add_executable` + include + `add_test`). EN re-auditado: 0 literales no-EN nuevos (asserts/UI/tooltips ASCII; comentarios codigo ASCII sin tildes).

## 11. Numeracion

Drop **139** → veredicto **140**. Bloque S CERRADO 5/5 (131 export + 133 sombra + 135 jitter + 137 tour + 139 alertas). Siguiente: tanda 2 (Faraday IGRF → god rays).
