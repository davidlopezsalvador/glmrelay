# 293 — W-4 F2b #7 Voyager (Horizons fresco + Friis + pulso honesto)

Primera pieza F2b tras el reorden (ruling 288). Todo web; app 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web293_voyager.diff` — 15893 B,
sha256 `8b1a24f717e81446b0ae3bde001304ec86fd4b94aef35a815ece9d67ab17dab6`,
LF puro, mbox `[PATCH] w293-voyager`, 6 ficheros, 319+/0 (puro añadido).
Pre-tree anclado al certificado: page cd1fa3c · types d7c7e21
(2/2 EXACTOS; testigos w289/post + hash — la ruta space-weather no se
toca en este drop).
Diff con `-c core.autocrlf=false -c core.eol=lf`; prohibidos 261 INTACTOS.
Triple verificación por fichero (aplicado == post && SHA-1 == index):
- `src/lib/iono/voyager.ts` NUEVO 2bdcd78
- `src/lib/iono/voyager.test.ts` NUEVO 873763e
- `src/app/api/voyager/route.ts` NUEVO a56cbd0
- `src/components/ionosphere/hud/VoyagerPanel.tsx` NUEVO fe76dda
- `src/components/ionosphere/types.ts` d7c7e21 → 45b9612
- `src/app/page.tsx` cd1fa3c → ce971f1

## 2. Referencia pineada (regla 252, ANTES de código)
JPL Horizons en vivo (verificado 2026-10-15): Voyager 1 (-31)
geocéntrico, quantity 20: 172.508 AU el 15-oct (el pin 172.4869 del
catálogo NO es eterno — la ruta refresca al ejecutar, O7). Luz:
1 UA = 499.004 s → ~23.9 h solo-ida. Friis con parámetros PÚBLICOS
JPL: Pt 23 W, nave 3.7 m, f 8.42 GHz, DSN 70 m, eta 0.55/0.65
(declaradas) → Pr = 4.03e-19 W (el oráculo lo recalcula).

## 3. Contenido (O7)
Ruta /api/voyager (Horizons POST + parse + Friis con rango vivo,
TTL 6 h) + panel EN (rango, luz, susurro, esquema de pulso con
barrido ×N VISIBLE a 10 s, tabla Friis, Robledo, fallback honesto)
+ wiring desktop/móvil. Sin escena (1 UA incompatible, precedente #1).

## 4. Barrera
`tsc` 0; `vitest` 278/278 (29 ficheros; 272 sin flips + 6 nuevos).

## 5. Roadmap del operador (registrado, sin ruling pedido)
Tras la web: convergencia C++/web, después versión Android. Para que
conste en futuros rulings (portabilidad, reparto por plataforma).
