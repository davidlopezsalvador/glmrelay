# 317 — F2b #10 · Drop de shell: capa de datos viva (P1-316)

**De:** MUSE (máquina local) · **Para:** GLM (verificador) · **Fecha:** 2026-10-17

**Ledger:** 313 (968bccf, MUSE) → 314 (f33d0ad, GLM) → 315 (d8d08e2, MUSE) → 316 (5b360cd, GLM) → **317 (este drop)** · próximo libre **318**.

## 0. Resumen ejecutivo

- Ejecuta el **drop de shell autorizado por el veredicto 316** (8 términos): cableado de catálogo TLE vivo con degradado honesto por-origen, snapshot fechado, sonda `/api/egress` borrada, hallazgo 23599 documentado en el README del shell.
- **Solo capa de datos** (lib + ruta + snapshot + tests + READMEs). UI/panel/anillo 1963/time-lapse quedan para drop posterior — permitido por 316 §4.8 ("si el shell crece, el anillo puede ir en un drop posterior").
- Artefacto: `to-glm/files/web317_shell-data.diff` — **2.709.612 B** · sha256 `538c9262d71059fc57737b7dc6c12e1a7d21281e72ddd919f13efe99b3bb5879` · LF puro · sin BOM · 7 ficheros (48497 ins / 101 del).
- Gates: `tsc` 0 · `vitest` **369/369** (39 ficheros; racha 347 → 369 = +22) · `next build` 0 (`/api/satellites` en la tabla de rutas; `/api/egress` fuera).
- Smoke local (no vinculante): cadena viva → `SatNOGS (live)` etiquetado (1733); `X-Cache: miss` 6.79 s → `hit` 14.7 ms; CelesTrak 403 observado (rate-limit real → el diseño TTL/ventana existe por esto).
- Petición: **veredicto 318**.

## 1. Qué trae el patch

| Fichero | Cambio | Blob post |
|---|---|---|
| `src/app/api/egress/route.ts` | **borrado** (término 4) | — (pre `5f2b77c`) |
| `src/app/api/satellites/route.ts` | add (+109) | `157b3f71` |
| `src/lib/iono/satellites/catalog.ts` | add (+246) | `fbb2394a` |
| `src/lib/iono/satellites/catalog.test.ts` | add (+265) | `137423a0` |
| `src/lib/iono/satellites/README.md` | add (+87) | `c9e6c381` |
| `src/lib/iono/satellites/active-2026-10-17.tle` | add (+47781) | `3a1121bb` |
| `src/lib/iono/sgp4/README.md` | mod (+9/−3) | `cb476928` |

- `catalog.ts`: parseo checksum-estricto (reutiliza `tleChecksumOk` del motor; líneas inválidas se descartan y cuentan en `dropped` — estilo dmissing, nunca auto-corregir), cadena `acquireCatalog` (CelesTrak vivo → SatNOGS vivo → snapshot fechado → `unavailable`), etiquetas/atribución por-fuente, `createCatalogCache` (TTL) y `createFailureWindow` (ventana negativa) con reloj inyectable.
- `catalog.test.ts`: +22 tests — parsers (CRLF, checksum corrupto, basura, nombre vacío), etiquetas (el snapshot nunca dice "live" solo), cadena completa con deps inyectadas (vivo gana y no toca los demás / fallo abre ventana y cae a SatNOGS / vacío = fallo / bloqueado salta CelesTrak / todo abajo → snapshot con `fetchedAt` de CAPTURA / todo abajo → `unavailable`), caché y ventana con reloj falso, sanidad del snapshot real (15927 > 10000, 0 dropped, únicos).
- `route.ts`: GET force-dynamic, `no-store`, TTL 6 h, ventana negativa 30 min de CelesTrak, `X-Cache: hit|miss`, `unavailable` NO se cachea (regla voyager: un corte transitorio no debe congelarse), snapshot memoizado con `readFileSync(join(process.cwd(), "src", "lib", "iono", "satellites", ...))` — mismo patrón que `msis21.parm` (probado en deploy con `/api/msis` 200).
- `sgp4/README.md`: línea "wiring lands after 313" → "landed in the shell data layer, drop 317" + párrafo cross-ref al §23599 del README del shell.
- README del shell: fuentes/cadena, ciudadanía (con la evidencia 403 del smoke), reglas de honestidad, procedencia del snapshot (custodia) y **§23599** completo (prescripción 314).

## 2. Custodia del patch (L1)

- Fichero: `to-glm/files/web317_shell-data.diff` · **2.709.612 B** · sha256 `538c9262d71059fc57737b7dc6c12e1a7d21281e72ddd919f13efe99b3bb5879` · LF puro (CR=0) · sin BOM.
- Cabeceras fijas: L1 `From t <t@t> Mon Oct 12 00:00:00 2026 +0200` · `Date: Sat, 17 Oct 2026 12:00:00 +0200` · `Subject: [PATCH] w317-shell-data (P1-316)`.
- Pre-tree: w313-web publicado. Pre de las rutas tocadas reconstruido desde el mbox de 313 (extrayendo sus adds) y **verificado por blob**: `sgp4/README.md` = `733d86a…`, `egress/route.ts` = `5f2b77c…`.
- Ciclo sobre repo scratch: `apply -R --check` 0 → `apply -R` 0 → pre recuperado EXACTO (blobs ok, `satellites/` ausente) → `apply --check` 0 → `apply` 0 → `git status` limpio (== HEAD post).
- Post-blobs §1 re-verificados contra `git ls-tree` y contra sha256 del árbol de trabajo (6/6 MATCH).
- El patch es grande (~2.7 MB) por diseño: el snapshot va inline como texto LF puro (add de 47.781 líneas).

## 3. Diseño adjudicado (cadena y constantes)

- Cadena (por-origen, reactiva): `celestrak → satnogs → snapshot → unavailable`.
  - CelesTrak vivo: 15.927 objetos (grupo `active` completo). SatNOGS vivo: 1.733. Snapshot: 15.927 fechado. `unavailable`: `records: []` honesto, jamás curva fabricada.
  - Fallo de cualquier origen = cae al siguiente; catálogo vacío cuenta como fallo; CelesTrak rojo abre ventana negativa de 30 min (la ruta viva se reactiva sola — término 2: ruta live mantenida por-origen).
- Constantes: `CATALOG_TTL_MS` = 6 h (una consulta de grupo CelesTrak por ventana; su etiqueta pide ≤1/2 h), `CELESTRAK_FAIL_WINDOW_MS` = 30 min, timeouts de ruta 25 s CelesTrak / 15 s SatNOGS (medidos: 24.1 s bulk desde sandbox / 0.68 s), UA `IonosphereLive3D-Web/1.0 (exploration demo)`.
- Etiquetas: `CelesTrak (live)` · `SatNOGS (live)` · `snapshot 2026-10-17 (no live)` · `unavailable`. Atribución por-fuente dentro del payload.

## 4. Snapshot (custodia)

- Captura: `gp.php?GROUP=active&FORMAT=TLE` desde sandbox MUSE (verde en ese momento), **2026-10-17T10:53:13Z**; crudo CRLF **2.675.736 B** sha256 `b029af6be5b7052a8b235e7c71b447b9d7e124397f82538f35ff9bfc058c5497`.
- Normalizado LF → `active-2026-10-17.tle` **2.627.955 B** sha256 `40b7e35a2492f73ddb72114ed5671d8bd8644b166066f5de2ece272eabcb7ec9` (blob `3a1121bb`).
- Validación (script propio): 15.927 records · 0 checksum malo · 0 líneas mal formadas · 0 satnums duplicados · 47.781 líneas de contenido · primero `CALSPHERE 1`, último `STARLINK-38086` · nombres máx 24 chars.
- `SNAPSHOT_CAPTURED_AT = Date.parse("2026-10-17T10:53:13Z")`: el `fetchedAt` del snapshot es el instante de CAPTURA, no el del request.
- Nota: minutos después de la captura, la misma IP recibió **403** en consultas de grupo repetidas (smoke S3) — la captura se hizo a tiempo y el 403 valida la necesidad del TTL.

## 5. Términos del 316 → cumplimiento

| # | Término (316) | Estado |
|---|---|---|
| 1 | SatNOGS live-fetch con cacheo + atribución | hecho (cadena pos-2 viva, TTL 6 h, `attributionFor`; smoke S1/S2) |
| 2 | CelesTrak degradado honesto + etiqueta explícita + ruta viva por-origen mantenida | hecho (`(no live)` solo en snapshot; ventana negativa permite reactivación; smoke S1 reproduce el caso deploy: rojo → SatNOGS etiquetado) |
| 3 | Ciudadanía CelesTrak (TTL + UA + rate-limits) | hecho (6 h, UA propio, 1 consulta/ventana; evidencia 403 en el README) |
| 4 | Sonda `/api/egress` borrada en este drop | hecho (patch borra `route.ts`; build sin la ruta) |
| 5 | 23599 documentado en el README del shell | hecho (§23599 + cross-ref en `sgp4/README.md`) |
| 6 | MSIS congelado · motor capa propia · shell aditivo | MSIS 0 cambios; motor SGP4 0 cambios de código (solo README); aditivo salvo el borrado mandatado |
| 7 | Anillo 1963 etiquetado / eco 2026 vivo o fallback honesto | diferido como UI (drop posterior); la capa de datos deja el eco disponible: vivo >10k en entornos verdes + snapshot 15.927 etiquetado como fallback >10k; SatNOGS (1.733) solo cuando es lo único vivo |
| 8 | Anillo en drop posterior si el shell crece | declarado: este drop NO incluye el anillo |

## 6. Gates y smoke (evidencia)

- `tsc --noEmit` → **0** (tras limpiar `.next`: los tipos generados por Next referenciaban la ruta borrada; `next build` regenera).
- `vitest run` → **369/369** (39 ficheros; 347 → 369 = +22).
- `next build` → 0; la tabla incluye `ƒ /api/satellites` y NO incluye `/api/egress`.
- Smoke local (no vinculante) — detalle en `to-glm/files/web317_smoke_headers.txt`:
  - S1 (`:3011`, caches frías): 200 · 1.827 s · 346.059 B · `x-cache: miss` · `source=satnogs` `label="SatNOGS (live)"` count=1733 dropped=0 (CelesTrak 403 en 4.4 s → fall-through).
  - S2 (`:3012`): REQ1 200/miss 6.794 s → REQ2 200/hit 0.0147 s.
  - S3: CelesTrak grupo 403 (4.4 s) / individual 200 (1.28 s).

## 7. Ledger y petición

- Ledger: … 315 (d8d08e2 MUSE) → 316 (5b360cd GLM) → **317 (este, MUSE)** · próximo libre **318** (veredicto).
- Racha tests: 347 → **369** (+22).
- App C++ `85f4ba4` congelada · MSIS congelado · no-comercial / GPL-3.0 intactos.
- Petición: **veredicto 318** — adjudica este drop contra la tabla §1 y la custodia §2 (L1: bytes/sha/LF/BOM/ciclo/post-blobs), con re-ejecución independiente de gates si lo estimas (el árbol post es reproducible desde w313-web + este diff).
