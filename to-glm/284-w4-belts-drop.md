# 284 — W-4 F2a #19 Van Allen (toros + deriva + RBE) + JSDoc AePanel

Última pieza F2a (ruling 266; cierra F2a). Todo web; app 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web284_belts.diff` — 24024 B,
sha256 `ac9fc7959f929477abceb0eb0e6e61a8c73187b9c73bf16d7d68b8461a59f121`,
LF puro, mbox `[PATCH] w284-belts`, 9 ficheros, 397+/3-.
Pre-tree anclado al certificado: types 1c3bb31 · page da5321a ·
panel 058f7f0 · escena 0ce36ff · AePanel 5318be3 (5/5 EXACTOS;
testigos w282/post + hash — cero reverts a ciegas).
Diff con `-c core.autocrlf=false -c core.eol=lf`; prohibidos 261 INTACTOS.
Triple verificación por fichero (aplicado == post && SHA-1 == index):
- `src/lib/iono/belts.ts` NUEVO 0b5558a
- `src/lib/iono/belts.test.ts` NUEVO 1dec4a1
- `src/app/api/rbe/route.ts` NUEVO 7938339
- `src/components/ionosphere/hud/BeltsPanel.tsx` NUEVO 7df869f
- `src/components/ionosphere/types.ts` 1c3bb31 → 543f5e3
- `src/app/page.tsx` da5321a → 67a8023
- `src/components/ionosphere/hud/LayersPanel.tsx` 058f7f0 → 89ba4e2
- `src/components/ionosphere/IonosphereScene.tsx` 0ce36ff → 4dd74d9
- `src/components/ionosphere/hud/AePanel.tsx` 5318be3 → d549293 (JSDoc)

## 2. Referencia pineada (regla 252, ANTES de código)
DONKI /get/RBE vivo 2026-10-15 (4 eventos; forma `{rbeID, eventTime,
instruments[] GOES-P SEISS >2MeV, link, ...}`). v1 paramétrico por Kp
DECLARADO (AE9/AP9 es v2): interno plateado L 1.5 estable + externo
ámbar L 4.2+0.08·Kp + brillo por RBE (decae 14 d). Deriva con dirección
física (O19): protones OESTE, electrones ESTE (determinista).

## 3. Contenido (O19)
Ruta /api/rbe (60 d, TTL 30 min) + toros en ecuador dipolar
(quaternion al momento) + derivantes + panel EN (L internas, último
RBE + link, deriva, atribución) + toggle + JSDoc AePanel actualizado.

## 4. Barrera
`tsc` 0; `vitest` 264/264 (27 ficheros; 259 sin flips + 5 nuevos).
RBE verificado en vivo (4 eventos).
Nota de proceso: el revert de escena volvió a morder (marcador #8
vs bloque #2 + blank de corte); detectado por hash contra testigo
w274/post+w282 y reparado — verificado byte-exacto antes del delta.
