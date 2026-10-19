# Ops 331 — República: reconstrucción certificada post-329 + propagación al raíz del workspace (GLM ops, flujo 325)

**De:** GLM (verificador/custodio del relay) · **Para:** MUSE + operador · **Fecha:** 2026-10-19

**Ledger:** 330 (092d51b, GLM, veredicto 329 ACEPTADO) → **331 (GLM ops, esta nota)** · próximo libre **332** · racha tests **393**.

## 0. Trigger

El operador intenta república desde el panel lateral del chat → **SIN salida, proyecto incompleto en el panel**. Petición directa: república.

## 1. Causa raíz

**Rollback PROFUNDO #3 del sandbox** (patrón de las rondas 304/330): último auto-commit del repo raíz del workspace = 17-oct 07:09Z (época del drop 303), worklog en disco terminado en 304-a, sin verify305+, y **sin app en el raíz** — la propagación del flujo 325 (post-323 al raíz) vivió solo en disco y el rollback se la comió. El panel se quedó sin nada construible → publish silenciosamente vacío. El relay volvió a ser la única fuente de verdad.

## 2. Reconstrucción certificada (w331_recon.py → verify331/l1_reconstruccion.json)

- **Fase 0:** scratch-barrier == w303-web por 16/16 pines (parm 8809e7b · licencia 244ab19 · LICENSE f288702 · TimeBar sha1 completo 98879f95… · page e58b156 · types 45b9612 · voyager 1f81fc3 · replay.test 0c307fc6 + 8 post-303 del veredicto 304).
- **Cadena 305→309→313→317→321→323→327→329** con sha256 de cada diff medido == publicado ANTES del apply (f963e532 · 0adab8f8 · ed14450e · 538c9262 · ecbf673e · 442a00bc · cdf46975 · e4ee006b), GIT_CEILING_DIRECTORIES + aserción «Skipped» ausente (lección 6.22) y post-blobs tras CADA apply comparados por sha1 COMPLETO con startswith (lección 330 §6.1): 305 8/8 · 309 8/8 · 313 adds-only 43 (egress 5f2b77c · ≥32 `.e` · pines-309 intactos) · 317 6/6 (+ tle sha256 40b7e35a… EXACTO + egress BORRADO) · 321 15/15 · 323 3/3 · 327 TimeBar 6b623845… (completo) · 329 TimeBar 56bc2547 · types c4b89a24 · replay.test e1dc75fd.
- **Estado final:** 32/32 pines de la unión (estado_final de la ronda 330 con las 3 sustituciones post-329) + inventario 248 + reverse-check 329 OK. **134 PASS · 1 FAIL espurio propio** documentado: mi check «327 reverse --check» no puede aplicar sobre un árbol post-329 (invertir 327 exigiría el TimeBar post-327 puro) — errata de diseño del check, el árbol queda certificado por pines + reverse-329.

## 3. Barrera (scratch-barrier, verify331/barrier331.log)

bun install 870 · tsc --noEmit **0** · vitest **393/393** (43 ficheros) · next build **0** con /api/satellites DENTRO · /api/egress FUERA · /api/msis intacta · HTML prerender **2× `--:--:--` (HUD+TimeBar) y CERO horas horneadas**.

## 4. Propagación al raíz + verificación del build que hará el panel

- **w331_propaga.py:** 242 ficheros app al raíz del workspace (src · public · prisma · package.json · bun.lock · configs · LICENSE · next-env.d.ts; EXCLUYENDO node_modules/.next/tsbuildinfo/.scene_scaffold_*), **sha256 de CADA fichero == fuente (242/242, 0 errores)**; scratch-barrier INTACTO como árbol de verificación; .gitignore raíz += `.next/` · `*.tsbuildinfo` · `dev.log` · `server.log`.
- **Build raíz:** bun install 870 · prisma generate v6.19.3 · next build **0** (misma tabla de rutas) · prerender raíz 2× placeholders · 0 horneadas.
- **Smoke standalone :3021** (un solo árbol de procesos): `GET /` 200 · `GET /api/satellites` 200 (vivo) · `GET /api/egress` 404.
- **Smoke interactivo raíz (w331_smoke.py, chromium swiftshader): 11/11** — reloj HUD anda (segundos avanzan) · barra == pared · LIVE slider 10080 disabled · REPLAY habilita · **slider→9960 pulgar QUIETO en 9960 con barra −2 h EXACTO (120 min) vs HUD** · slider→10075 quieto (−5 min EXACTO) · reset LIVE 10080 disabled · 0 errores de consola. Erratas de arnés propias cazadas en rueda: (1) check de reloj comparaba HH:MM dentro del mismo minuto (falso fallo) → HUD HH:MM:SS; (2) mi flag `--disable-webgl2` mataba el contexto WebGL (el error THREE del renderer era MÍO) → retirado; (3) click del reset interceptado por el panel West Ford a 800 px → clicks por JS. **Lección:** en smokes DOM con overlays posicionados absolutos, clicks por JS; pruebas de vida con granularidad de segundos.

## 5. Estado

El **raíz del workspace queda como app post-329 construible** — 327 (reloj client-only) + 329 (mapeo espejo del slider) **JUNTOS**, como mandaba el veredicto 330 §8. El borde público seguirá horneando `19:20 UTC` hasta la república; tras ella: reloj `--:--:--` al cargar y luego hora real andando; pulgar fiel a las etiquetas (a −2 h, pulgar en 9960/10080 cerca de «ahora», SIN salto al espejo).

**OPERADOR:** república desde el panel (ya hay app construible en el raíz). Q5 (fps/pasada visual en hardware real) sigue siendo suya. **MUSE:** nada pendiente. **LEDGER:** 331 (esta ops) · próximo libre 332 · #10 West Ford completo · app C++ 85f4ba4 congelada (ciclo 191 ABIERTO N=44) · NRL Code 7630 sigue del operador.
