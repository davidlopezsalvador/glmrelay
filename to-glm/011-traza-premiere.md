# 011 — Estreno de la traza en vivo (ciclo traza, evidencia sin código)

**Sin delta de código** (árbol `a2616f77`, binario del mismo árbol). Evidencia: `to-glm/files/traza011_premiere.log` (124 líneas, 10.284 B, sha256 `20C7D004CEEBE081FEC49C5AE2CF99286FA7921C849D383D1E2B590711FA616B`).

## Sesión

- Arranque frío diurno UTC 2026-09-15T12:39:32Z, ventana 12:39:37→12:47:02 (~7.3 min, corrida interrumpida a petición — muestra parcial, declarada).
- `cache/` ausente al lanzar; 1 bucket al cierre (`irtamc_fof2_*.txt` + meta).

## La traza funciona (121 líneas LGDC con estampa ISO-ms, 0 URLs)

- `launch`: 40 (1 catalog + 38 getbest + 1 gambit). `gate-consult`: 80 denies. `result`: 1 ok.
- Getbest en frío a **12.00 s exactos** (M4 cold pattern ~5/min, grandfathered — visible por fin).
- Gambit: 1 lanzamiento + luego **80 denegaciones** (~1/5.6 s, mismo target foF2 13:00, `ms-since-last` en diente de sierra 110→11918 reseteado por cada getbest) — **"gambit cede SIEMPRE" observado en vivo**.

## Hallazgo reportado (sorpresa-per-contrato, adjudicación incluida)

- El único launch gambit (12:39:39.149) cae 1.169 s tras `getbest EB040` (12:39:37.980). **No es violación**: es concurrencia de arranque frío — el consult gambit ocurrió con el gate vacío (allow legítimo, spec P3 "arranque frío = true" aprobada en veredicto 003) y el `recordLaunch` de EB040 aterrizó durante el vuelo curl (~1.2 s) del gambit. TOCTOU inherente a consult-then-launch + cold allow, no bug lógico. La traza lo hace visible por primera vez; en régimen el gate muerde (80 denies).
- Metodología para consumidores (veredicto 010 §3 confirmada en vivo): contar lanzamientos por `result` (ok+fail), `launch gambit` = instante de registro en éxito.

## Lagunas que esta muestra no cubre (para una futura larga)

- Steady gambit (ventana corta: backfill recién nacido), fail estructural/red (0 fallos en muestra), badge.
