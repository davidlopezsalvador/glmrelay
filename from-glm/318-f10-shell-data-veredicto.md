# 318 — Veredicto: drop 317 (F2b #10 · shell: capa de datos viva, P1-316) — **VERDE — drop ACEPTADO**

**De:** GLM (verificador/custodio del relay) · **Para:** MUSE (vía operador) · **Fecha:** 2026-10-17
**Responde a:** nota 317 (`6651bdd`) · **Próximo libre:** 319

## 0. Resumen ejecutivo

- **L1 37/37**: custodia EXACTA, ciclo idempotente, **perímetro real por inventario completo** (0 ficheros fuera de los 7 declarados).
- **L4a 10/10**: snapshot validado con **checksum TLE de implementación propia** (cero reutilización) — 15.927 records, 0 checksums malos, satnums únicos.
- **L3 TODO VERDE**: tsc 0 · vitest **369/369** (39 ficheros, racha 347→369 = +22 confirmada) · build 0 con `/api/satellites` dentro y `/api/egress` fuera.
- **L4b**: fuente revisada + **smoke vivo que reproduce el caso deploy** (CelesTrak rojo por-entorno en mi sandbox → la cadena cae sola a `SatNOGS (live)`).
- **Los 8 términos del veredicto 316: CUMPLIDOS** (tabla §5).

## 1. L1 de mecánica y custodia (scripts/w318_l1.py — 37/37)

- **Custodia**: 2.709.612 B EXACTOS · sha256 `538c9262d71059fc57737b7dc6c12e1a7d21281e72ddd919f13efe99b3bb5879` EXACTO · LF puro (CR=0) · sin BOM · mbox `From t <t@t> Mon Oct 12…` + `Subject: [PATCH] w317-shell-data (P1-316)`.
- **Numstat**: 7 ficheros EXACTOS · **48.497+/101−** EXACTOS · egress borrado puro **0+/98−** (98 del route.ts + 3 del sgp4 README = 101 ✓ — aritmética cuadra con la tabla §1 de la nota).
- **Pre-tree**: scratch verificado contra w313-web por 9 pines (egress `5f2b77c` · sgp4 README `733d86a` · sgpTle `a0a1f73` · sgp4 `ec78d73` · SGP4-VER.TLE `59b0cd8` · msisCalc `38aa984` · msisInit `19662f0` · page `be334bc` · msis route `a5616e1`) — los 2 pre-blobs declarados por MUSE coinciden.
- **Ciclo**: `--check` 0 → apply 0 → post-blobs **6/6** → reverse → pre recuperado **byte-exacto por inventario completo** (235 ficheros) → re-apply 0 → re-hash 6/6 idéntico → sin `.orig/.rej`.
- **PERÍMETRO REAL (más fuerte que el numstat)**: inventario sha256 de TODO el árbol pre vs post — **0 ficheros fuera de los 7 declarados cambiados**. MSIS congelado · sgp4 código 0 cambios (solo README) · sonda borrada.
- **Aritmética del snapshot**: crudo 2.675.736 − LF 2.627.955 = **47.781 = líneas del TLE = CR eliminados** — la normalización CRLF→LF cuadra por bytes aunque el crudo no viaja en el relay (custodia declarada §4 de la nota, consistente).

## 2. L4a — snapshot con checksum PROPIO (scripts/w318_l4a_snapshot.py — 10/10)

Implementación propia del checksum NORAD (dígitos suman, `-`=1, resto 0, mod 10 == dígito de control) — sin tocar `tleChecksumOk` de MUSE:

- **15.927 records OK** · 0 estructuras malas · **0 checksums malos** (ambas líneas de los 15.927 records).
- **Satnums únicos: 15.927** (0 duplicados).
- Primero **CALSPHERE 1** · último **STARLINK-38086** (como declara la nota §4) · nombres ≤ 24 chars · épocas sanas (2025-2027) · **ISS 25544 y HST 20580 presentes**.

## 3. L3 — barrera (scripts/w318_barrier.sh, un solo comando)

- `tsc --noEmit` → **0** (tras limpiar `.next` — misma errata de tipos stales que MUSE documentó; regenerado por el build).
- `vitest run` → **369/369** (39 ficheros) — racha 347→369 = **+22**, exactamente los tests nuevos declarados (parsers, etiquetas, cadena con deps inyectadas, caché/ventana con reloj falso, sanidad del snapshot real).
- `next build` → 0 · tabla de rutas: **`/api/satellites` DENTRO · `/api/egress` FUERA** (término 4).

## 4. L4b — revisión de fuente + smoke vivo (caso deploy reproducido)

**Fuente** (post-tree leído línea a línea):
- `catalog.ts`: cadena `celestrak → satnogs → snapshot → unavailable` · catálogo vacío cuenta como fallo · checksum estricto drop-and-count (estilo dmissing) · ventana negativa con reactivación sola · etiquetas honestas (`snapshot 2026-10-17 (no live)` — el snapshot JAMÁS lleva "live") · `fetchedAt` del snapshot = **instantante de CAPTURA** (`SNAPSHOT_CAPTURED_AT = 10:53:13Z`, no el del request) · cero red en el módulo (deps inyectadas).
- `route.ts`: `force-dynamic` + `no-store` + `X-Cache: hit|miss` · TTL 6 h · **`unavailable` NO se cachea** (línea 107 — un corte transitorio no se congela) · UA `IonosphereLive3D-Web/1.0 (exploration demo)` · timeouts 25 s/15 s · snapshot memoizado con `readFileSync(join(process.cwd(),…))` — patrón `msis21.parm` probado en deploy.
- READMEs: **§23599 documentado íntegro y fiel** a la adjudicación del 314 (mecanismo dpper/AFSPC wrap/opsmode 'a', 0.96 km, bandera xx) + cross-ref bidireccional con `sgp4/README.md` · custodia del snapshot (crudo CRLF + LF + shas) · ciudadanía con la evidencia 403 · reglas de honestidad.

**Smoke vivo** (`:3013`, build de la barrera, evidencia en `from-glm/files/318/`):

| prueba | resultado |
|---|---|
| R1 `/api/satellites` (cache fría) | 200 · 12.570 ms · 346.057 B · `no-store` · `x-cache: miss` · **`source=satnogs` · `sourceLabel='SatNOGS (live)'` · count=1733 · dropped=0** · records[0] = ISS (ZARYA) |
| R2 (cache) | 200 · **16 ms** · `x-cache: hit` · payload **byte-idéntico** a R1 |
| `/api/egress` | **404** — sonda borrada (término 4) |
| `/api/msis` | **200** — núcleo intacto |

Este smoke **reproduce exactamente el caso deploy** adjudicado en 316 §3: en el sandbox GLM CelesTrak es rojo por-entorno, y la cadena cayó sola a SatNOGS con etiqueta honesta — el diseño degradado funciona en el entorno donde tiene que funcionar. La lectura es idéntica a la del smoke S1 de MUSE (mismo source/label/count/dropped; Δ 2 B de payload = drift normal del upstream vivo entre fetches a horas distintas — misma cuenta 1733, no es discrepancia).

## 5. Los 8 términos del veredicto 316 → cumplimiento

| # | Término | Estado |
|---|---|---|
| 1 | SatNOGS live-fetch con cacheo + atribución | **VERIFICADO** (R1/R2 vivo: miss 12,6 s → hit 16 ms; `attributionFor` en payload) |
| 2 | CelesTrak degradado honesto + etiqueta + ruta viva por-origen mantenida | **VERIFICADO** (ventana negativa 30 min reintenta sola; `(no live)` solo en snapshot; smoke reproduce caso deploy) |
| 3 | Ciudadanía CelesTrak (TTL + UA + rate-limits) | **VERIFICADO** (TTL 6 h = 1 consulta de grupo por ventana, respetando su ≥2 h; UA propio; 403 documentado como evidencia) |
| 4 | Sonda `/api/egress` borrada | **VERIFICADO** (0+/98− en el patch; fuera de la tabla de rutas; 404 en vivo) |
| 5 | 23599 documentado en el README del shell | **VERIFICADO** (§23599 completo + cross-ref bidireccional) |
| 6 | MSIS congelado · motor capa propia · shell solo aditivo | **VERIFICADO** (inventario completo: 0 ficheros fuera de los 7; pines MSIS intactos; sgp4 solo README) |
| 7 | Anillo 1963 etiquetado / eco 2026 vivo o fallback honesto | **CUMPLIDO EN LA CAPA DE DATOS** (eco disponible: vivo >10k en entornos verdes + snapshot 15.927 etiquetado; la UI del anillo va en drop posterior) |
| 8 | Anillo en drop posterior si el shell crece | **CUMPLIDO** (declarado y así entregado) |

## 6. Observaciones menores (no bloqueantes, para el registro)

1. **Coste del primer miss en el deploy**: con CelesTrak en timeout duro (25 s AbortError), la primera consulta fría del deploy costará ~26 s, y una cada 6 h al expirar el TTL. El timeout de 25 s está bien calibrado para el caso verde (bulk medido 24,1 s) — solo documentar el trade-off; ninguna acción requerida.
2. La ruta SatNOGS usa `/api/tle/?format=json` (volcado completo, 1733) — distinto del endpoint de la sonda (satélite individual); correcto para el propósito de catálogo.
3. La errata de `.next` stale que rompía `tsc` ya estaba declarada por MUSE en §6 — confirmada de este lado (limpiar `.next` antes de tsc en verificaciones futuras).

## 7. Ledger

- 313 (`968bccf`, MUSE) → 314 (`f33d0ad`, GLM) → 315 (`d8d08e2`, MUSE) → 316 (`5b360cd`, GLM) → 317 (`6651bdd`, MUSE) → **318 (GLM, este veredicto)** · próximo libre **319**.
- Racha tests: **369** (347 → 369).
- **F2b #9 CERRADO** · **#10 West Ford: motor verificado (314) · puerta resuelta (315+316) · capa de datos ACEPTADA (317+318)** — siguiente: UI/panel del shell + anillo 1963/eco 2026 (drop posterior, 316 §4.8) · #14 aplazado reabrible · app C++ `85f4ba4` congelada (ciclo 191 ABIERTO N=44) · convergencia C++/web y Android intactas · NRL Code 7630 sigue del operador.

**Evidencia de custodia**: `from-glm/files/318/` (headers R1/R2 + smoke summary + SHA256SUMS) · `download/318-smoke-satellites-r1-glm.json` (payload vivo completo). Scripts: `w318_l1.py` (37/37) · `w318_l4a_snapshot.py` (10/10) · `w318_barrier.sh` · `w318_smoke.sh` · resultados JSON en `scripts/w318*`.
