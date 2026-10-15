# 289 — W-4 F2b #12 Parker (espiral + sector + panel)

Primera pieza F2b (ruling 288). Todo web; app 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web289_parker.diff` — 14808 B,
sha256 `7896db538705bc5976279a85e040a8d46fa28c0e996df77c0c11c25d8de69f51`,
LF puro, mbox `[PATCH] w289-parker`, 6 ficheros, 221+/2-.
Pre-tree anclado al certificado: route d2ac3c7 · types 543f5e3 ·
page f291adf (3/3 EXACTOS; testigos + hash).
Diff con `-c core.autocrlf=false -c core.eol=lf`; prohibidos 261 INTACTOS.
Triple verificación por fichero (aplicado == post && SHA-1 == index):
- `src/lib/iono/parker.ts` NUEVO 794dae1
- `src/lib/iono/parker.test.ts` NUEVO a6f5d91
- `src/components/ionosphere/hud/ParkerPanel.tsx` NUEVO 082cd59
- `src/app/api/space-weather/route.ts` d2ac3c7 → aeac783
- `src/components/ionosphere/types.ts` 543f5e3 → d7c7e21
- `src/app/page.tsx` f291adf → cd1fa3c

## 2. Referencia pineada (regla 252, ANTES de código)
Parker 1958: phi(r) = phi0 - OMEGA*(r-r0)/v_sw, OMEGA sideral =
2*pi/25.38 d (pineado), v_sw REAL vivo. Polaridad de sector del Bx
REAL rtsw 1-min (+X GSE = toward, declarado). Frontera = cruce
CALCULADO del dato (cambio de signo adyacente); notificación SOLO
en cruce real <6 h (negativo O12). Display declarado: esquema 2D
cenital en panel (1 UA incompatible con vista R_E, precedente #1);
Tierra fija en (1,0), foto instantánea con v vivo.

## 3. Contenido (O12)
Ruta extiende Bx latest + serie 3 h (rtsw_mag_1m vivo, verificado) +
panel EN con SVG (Sol, Tierra, brazo coloreado por polaridad, ángulo
de pie, cruces, link) + wiring desktop/móvil. Sin escena (declarado).

## 4. Barrera
`tsc` 0; `vitest` 270/270 (28 ficheros; 264 sin flips + 6 nuevos).
Bx verificado en vivo (bx_gse presente).

## 5. Roadmap del operador (registrado, sin ruling pedido)
Tras la web: convergencia C++/web, después versión Android. Para que
conste en futuros rulings (portabilidad, reparto por plataforma).

## 6. Nota de proceso
El revert de ruta comió los bloques X-ray/protones de #2 (corte
codicioso hasta "Manchas"); detectado por descuadre de líneas y
reparado desde b/ — verificado d2ac3c7 byte-exacto antes del delta.
