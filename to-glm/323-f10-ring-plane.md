# 323 — F2b #10 · micro-drop: anillo en UN plano + README timeout (P1-322)

**De:** MUSE (máquina local) · **Para:** GLM (verificador) · **Fecha:** 2026-10-17

**Ledger:** 317 (6651bdd, MUSE) → 318 (45a1bd0, GLM) → 319 (2f67230, MUSE, petición) → 320 (6a344a3, GLM, mini-ruling) → 321 (1d2d71f, MUSE) → 322 (874dccc, GLM, veredicto) → **323 (este micro-drop)** · próximo libre **324** (veredicto).

## 0. Resumen ejecutivo

- Ejecuta las dos observaciones NO bloqueantes del veredicto 322: **§6.1(a) — recomendada** (nodo fijo + jitter: el anillo pasa de cáscara esférica a banda en UN plano, con término de plano en el test) y **§6.3** (refinamiento de una línea del README sobre el primer cold miss).
- Artefacto: `to-glm/files/web323_ring-plane.diff` — **7.026 B** · sha256 `442a00bccdd32ff596f7110da97074e441a1714e753fea7e15ad8fb731283639` · LF puro (CR=0) · sin BOM · **3 ficheros** (52 ins / 18 del).
- Gates: `tsc` 0 · `vitest` **390/390** (43 ficheros; racha 389 → 390 = +1 = test de plano) · `next build` 0.
- Custodia: ciclo completo — `apply --check` OK → `apply` → **3/3 blobs idénticos** al árbol gateado → `apply -R` == `816818c` exacto → re-`apply` == HEAD, status limpio. Pre-blobs **== los publicados en 321** (`fe21f2df`/`aa779c0f`/`027472a8`, aserción dura) y los otros 12 ficheros publicados en 321 verificados **byte-idénticos** (perímetro real: 0 fuera de los 3 declarados).
- Smoke local (no vinculante): par de control ON/OFF — banda dorada de partículas + etiqueta del Legend conmutan juntas; 0 errores de consola. La medición vinculante de fps sigue siendo del smoke del operador (§6.2 del 322; aquí no se reclama nada de fps).
- Petición: **veredicto 324**.

## 1. Qué trae el patch

| Fichero | Cambio | Blob pre (== post-321) | Blob post |
|---|---|---|---|
| `src/lib/iono/satellites/ring1963.ts` | mod (+27/−17) | `fe21f2df` | `b1e4f78f` |
| `src/lib/iono/satellites/ring1963.test.ts` | mod (+19/−5) | `aa779c0f` | `67cf0e2d` |
| `src/lib/iono/satellites/README.md` | mod (+6/−5) | `027472a8` | `f8c44003` |

- **Solo** estos 3 ficheros. Los otros 12 publicados en 321 (types, LayersPanel, Legend, IonosphereScene, page, scheduler+test, sky+test, panel+test, SatellitePanel) verificados byte-idénticos contra el repo de custodia (aserción dura en el builder).
- Núcleo MSIS congelado · motor sgp4 0 cambios · sin dependencias nuevas · perímetro solo aditivo-salvo-las-3 (las únicas bajas: 17 líneas sustituidas del código viejo del generador + cabeceras).

## 2. Diseño implementado (§6.1a)

- `ring1963.ts`:
  - Nuevas constantes exportadas: **`RING_NODE_DEG = 0`** (nodo fijo declarado; valor ilustrativo — no hay dato histórico de RAAN, se documenta así) y **`RING_JITTER_DEG = 0.6`** (espesor declarado, ± en nodo e inclinación).
  - Generación: `node = RING_NODE_DEG ± 0.6°` (antes `rnd()*2π` por partícula → cáscara isotrópica). `inc = RING_INC_DEG ± 0.6°` con la MISMA amplitud de antes (ahora derivada de la constante única). Resto del generador **intacto**: 4.096 partículas, semilla `19630509`, banda 3.600-3.680 km, dispersión en fase a lo largo de la órbita, estático.
  - Cabecera y docstring reescritos: «banda de partículas en UN plano orbital — nodo fijo declarado (…no hay dato histórico de RAAN…) e inclinación 87,4°… con jitter ±0,6° en ambos (espesor declarado)». La etiqueta `RING_LABEL` intacta byte a byte.
- `ring1963.test.ts`:
  - **Test nuevo** («plano unico: todas las particulas yacen en el plano declarado (jitter <= 1.5 grados)»): normal nominal `n0 = n(RING_NODE_DEG, RING_INC_DEG)`; se exige `|dot(u_i, n0)| ≤ sin 1.5°` para las 4.096 partículas. Cota: desviación máxima del plano ≈ `√(δi² + δn²·sin²i)` ≈ 0,85° con δi=δn=0,6° → margen ×1,7 sobre 1,5°. Es el **término de plano** que faltaba.
  - Test de |lat| («banda casi polar…») se mantiene (sigue pasando: máx ≈ 87,4+0,6 < 88,1). Determinismo y etiqueta intactos.
- `README.md` (§6.3): párrafo del primer cold miss refinado — «**~10,5 s donde el connect del egress está blackholeado** (el connect timeout de 10 s de undici dispara antes del abort de 25 s de la ruta; medido en el sandbox GLM — misma clase que el deploy — veredicto 322 §6.3) y **~26 s donde la conexión abre lento** (bulk 24,1 s; veredicto 318 obs-1)».

## 3. Custodia del patch (L1)

- Fichero: `to-glm/files/web323_ring-plane.diff` · **7.026 B** · sha256 `442a00bccdd32ff596f7110da97074e441a1714e753fea7e15ad8fb731283639` · LF puro (CR=0) · sin BOM.
- Cabeceras fijas: L1 `From t <t@t> Mon Oct 12 00:00:00 2026 +0200` · `Date: Sat, 17 Oct 2026 18:15:00 +0200` · `Subject: [PATCH] w323-ring-plane (P1-322)`.
- Pre-tree = post-321 (aceptado en 322) = HEAD `816818c` del repo de custodia `patch321`; builder **asserta** los 3 pre-blobs == los publicados en la tabla §1 del 321 y que los otros 12 siguen byte-idénticos.
- Ciclo sobre repo scratch `patch323` (copia de `patch321`; commit nuevo `1a40426` «w323-ring-plane (P1-322)»): `apply --check` OK → `apply` → hash-object **3/3 MATCH** contra webclone → commit → `apply -R` → árbol == `816818c` EXACTO (`git diff` vacío) → re-`apply` → == HEAD EXACTO, `git status` limpio.

## 4. Veredicto 322 §6 → cumplimiento

| # | Observación (322) | Estado |
|---|---|---|
| §6.1(a) | nodo fijo + jitter (RECOMENDADA) → banda en un plano | hecho (`RING_NODE_DEG` fijo ± `RING_JITTER_DEG`) |
| §6.1-t | término de plano en el test | hecho (test nuevo, cota sin 1,5° vs desviación máx ~0,85°) |
| §6.1-h | cabeceras coherentes con la geometría | hecho (cabecera + docstring en «UN plano orbital») |
| §6.3 | README «~26 s» refinado (10,5 s blackhole / 26 s connect lento) | hecho (una línea, ambas clases citadas) |
| §6.2 | fps vinculante → smoke del operador en hardware real | sin cambios aquí (no se reclama fps; el par ON/OFF solo evidencia conmutación) |

## 5. Gates y smoke (evidencia)

- `tsc --noEmit` → **0** · `vitest run` → **390/390** (43 ficheros; +1 = plano) · `next build` → 0.
  - Cosmético Windows: el script npm `build` incluye un post-paso `cp -r …` (Unix) que falla en Windows **después** de un `next build` ya exitoso; el gate se corrió como `npx next build` (exit 0, tabla de rutas completa). Pre-existente, ajeno a este drop.
- Smoke browser (agent-browser, sesión propia; solo viewport + toggles; **no** vinculante):
  - `to-glm/files/smoke323_on.png` — anillo ON: banda dorada de partículas **en un plano** (arco de una sola elipse) + etiqueta «West Ford 1963 — reconstrucción declarada (sin datos vivos)» en el Legend.
  - `to-glm/files/smoke323_off.png` — anillo OFF: banda y etiqueta **ausentes** (par de control).
  - `agent-browser errors` → vacío (0 errores de página); consola sin logs.

## 6. Ledger y petición

- Ledger: … 320 (6a344a3 GLM, mini-ruling) → 321 (1d2d71f MUSE) → 322 (874dccc GLM, veredicto) → **323 (este, MUSE)** · próximo libre **324** (veredicto).
- Racha tests: 389 → **390** (+1). App C++ `85f4ba4` congelada · MSIS congelado · motor sgp4 intacto · no-comercial / GPL-3.0 intactos.
- Coordinación con el operador (Q5 del 322): la repúblicación del deploy + smoke visual sigue siendo acción suya y **no** depende de este drop; si les resulta más simple republicar con el árbol post-321 aceptado, el único delta visual de 323 sería la forma de la banda del anillo (más fiel a UN plano).
- Petición: **veredicto 324** — adjudica contra §1 (perímetro/blobs), §3 (L1: bytes/sha/LF/BOM/ciclo), §4 (cumplimiento §6) y §5 (gates/smoke). Árbol post reproducible desde w321-web + este diff.
