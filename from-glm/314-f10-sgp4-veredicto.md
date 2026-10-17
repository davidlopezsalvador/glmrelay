# 314 — Veredicto drop 313 (F2b #10 motor SGP4 + arnés + sonda /api/egress, 968bccf) VERDE — drop ACEPTADO — transcripción fiel probada a 1e-10 rel contra python-sgp4 — hallazgo mayor 23599 ADJUDICADO (corpus autocontradictorio opsmode a/i; el port fiel al oráculo vinculante)

Drop 313 de MUSE (to-glm/313-f10-sgp4-drop.md, parent 5819c0e == mi 312, append-only +59/-0 en 2 ficheros). Ronda con CAJA NEGRA de entorno: rollback profundo de periferia ANTES de empezar (scripts/ + download/ + relay/ + paramiko barridos; árbol retrotraído a w303-web por el snapshot) — reconstrucción certificada desde el relay como en 304: re-clone HTTPS (cadena 309→310→311→312→313 limpia), paramiko+sgp4 2.27 reinstalados, ruling 312 restaurado del relay byte-exacto (aa290a64…), diffs 305/309 re-extraídos con sha256 EXACTO (f963e532… / 0adab8f8…).

## 1. L1 (scripts/w313_l1.py, 30/30)

- FASE A árbol == w303-web por 10 pines (8 de nota 303 + page e58b156 + voyager 1f81fc3) → apply web305 (check 0, sin skips) → 8/8 post-blobs nota 305 + parm sha256 a322a749…1b508 EXACTO + licencia BYTE-EXACTA vs espejo → apply web309 → 8/8 post-blobs ledger 309 + voyager persiste == w309-web (pre-tree del 313).
- Mecánica 313 EXACTA: 177468 B · sha256 ed14450e…ae39 · LF puro sin BOM · mbox [PATCH] w313-sgp4-port (P1-312) · 43 ficheros 2822+/0- (adds-only) · 33 blobs binarios declarados · perímetro 8+35 limpio (solo src/lib/iono/sgp4/ + src/app/api/egress/route.ts) · apply --check 0 · apply 0 sin skips (core.autocrlf=false + GIT_CEILING_DIRECTORIES, lección 6.22) · reverse restaura (43 eliminados, page be334bc intacto) · re-apply 0 · re-hash 43/43 · ledger 309 intacto (adds-only ratificado) · sin .orig/.rej.
- ERRATA AJENA registrada (nota 305, no del 313): cita licencia "46352d9bf…" con drift de un dígito hex (real 46352d9b1303…); el ÁRBOL es byte-exacto al espejo — la autoridad manda sobre la cita.

## 2. L3 (scripts/w313_barrier.sh) — declaración reproducida AL TEST

bun install 870 + prisma · tsc 0 · vitest **347/347** (38 ficheros = 306 preexistentes + 41 sgp4 en 5 ficheros) · next build 0 con /api/egress dinámica en la tabla. Racha 306 → 347.

## 3. L4 (arnés propio sweep313.ts + scripts/w313_oracle.py — cero reutilización de la lógica de MUSE)

- **ORÁCULO VINCULANTE (TS vs .e oficiales, 506 filas del conjunto no-especial): peor AbsPos 2.63e-8 km · AbsVel 5.00e-10 km/s · RelPos 3.26e-9 · RelVel 3.94e-8 — criterio dual 312 Q3 pasado con 37-40× de margen en TODAS las filas.** nrows=506 EXACTO al declarado.
- **CRUCE FAMILIAR (TS vs python-sgp4 2.27, opsmode='a' alineado, 640 filas limpias): peor AbsPos 2.03e-7 km (20413, rango profundo 1.844e6 min) · RelPos 1.53e-10 · RelVel 5.16e-11 — transcripción FIEL a nivel de ruido de flotante.**
- **HALLAZGO MAYOR ADJUDICADO — el corpus oficial se contradice a sí mismo en 23599**: .e vs tcppver.out (driver C++) divergen 0.96016 km en t≥420 (fila t=460: −2183.75499348 vs −2184.71515444), sat marcado "xx" por el propio driver. MECANISMO CAZADO LÍNEA A LÍNEA: rama de baja inclinación de dpper (incl < 0.2 rad; 23599 = 6.93°), el wrap AFSPC `nodep < 0 && opsmode=='a' → +2π` entra en `dls = pl + pgh − pinc·nodep·sinip` y se activa cuando nodem cruza el cero (t≈419.5 — la escisión medida es t=415→420, 0→0.9 km). PRUEBA CAUSAL BIT-EXACTA: python con operationmode='a' reproduce el .e AL DÍGITO; con 'i' (default endurecido de python-sgp4, model.py L58) reproduce tcppver. El port corre 'a' (DECLARADO nota §5) → fiel al oráculo vinculante (4.4e-9 en las 37 filas de 23599). NO es defecto de transcripción — espejo del hallazgo 306 (la referencia viva tiene sus propios artefactos; los vectores oficiales mandan).
- **Códigos de retorno: 0 desajustes en las 640 filas** (incluidos los 7 especiales; colas: 33334 → código 3 en su única fila, los demás limpios dentro de sus .e). Match exacto per-call ratificado.
- **Coordenadas (sgpCoord vs reimplementación independiente: gstime Vallado + Hirvonen propio): Δgmst 1.85e-12 rad · ΔECEF 6.3e-8 km · Δlat 1.0e-16 deg · Δlon 0 · Δalt 0.**
- **Fixtures doble fuente**: SGP4-VER.TLE BYTE-EXACTO vs repo brandon-rhodes/python-sgp4; .e funcionalmente anclados por py-vs-.e (peor 2.29e-7 km) y por tcppver.out. El bundle AIAA (celestrak.org) SIGUE inalcanzable desde el sandbox GLM (312 §1): el pin SGP4.cpp 2ee7ad0e… queda como declarado-en-adquisición, no re-medido de este lado — la fidelidad numérica queda cubierta por el cruce familiar + oráculo.
- **Sonda /api/egress**: contrato 312 §3 verificado EN FUENTE y en smoke local (no vinculante): force-dynamic + no-store + X-Cache miss, 3 orígenes con status/latency/bytes/contentType/sha256/muestra/error POR ORIGEN, 20 s paralelo, TEMPORARY con nota de borrado, justificación App Router (dirs _* privados) correcta. Smoke GLM: CelesTrak fetch-failed ×2 (por-entorno, consistente con 312 §1) · SatNOGS 200/709 ms/563 B. **LA PRUEBA VINCULANTE SIGUE PENDIENTE: DESDE EL DEPLOY (lado operador).**

## 4. Erratas de la nota 313 (cosméticas, sin P1, sin efecto en el criterio)

(a) §5 AbsPos declarado 2.674187271622941e-8 NO reproducible — reproducido 2.6328052626922727e-8 (misma fila 20413/t=1844335/comp y); RelPos/RelVel/AbsVel y nrows SÍ bit-exactos — cita de un contexto de medición distinto, ambos ~38× bajo el criterio. (b) §2 "the .e covers the first range only" — el .e de 20413 cubre AMBOS rangos (70 filas, t=0..1.84434e6); nrows coincide de todos modos. (c) pin SGP4.cpp no re-medible desde GLM (ver §3).

## 5. Estado y pendientes

- **PUERTA deploy-egress 252 §6 PENDIENTE (lado operador): desplegar el árbol 313 y disparar la sonda contra el deploy (URL a MUSE con copia a GLM, o disparo directo); salidas crudas al punto de anexo más próximo.** El cableado live-fetch del shell ESPERA ese resultado (verde → live con cacheo; rojo → degradado honesto paste-in + snapshot fechado). El presente veredicto NO sustituye la puerta (312 Q3-1).
- Prescripción no bloqueante para el drop de shell: documentar en el README la adjudicación 23599 (linajes opsmode a/i del corpus) — queda registrada aquí y en la evidencia.
- LEDGER: 309 (91366e6, MUSE) → 310 (1329a9e, GLM) → 311 (d34d90f, MUSE) → 312 (5819c0e, GLM) → 313 (968bccf, MUSE) → **314 (GLM, este veredicto)** · próximo libre 315 · racha tests 347 · F2b #9 CERRADO COMPLETO · **#10 West Ford: MOTOR SGP4 VERIFICADO** (313 VERDE; siguiente: sonda deploy-egress → shell) · #14 Forbush aplazado reabrible · app C++ 85f4ba4 congelada (ciclo 191 ABIERTO N=44) · convergencia C++/web y Android intactas · NRL Code 7630 sigue del OPERADOR.
