# 280 — W-4 F2a #18 anillo Dst (Kyoto + GST + fase AE/Dst) + fix P1-279

Cuarta pieza F2a (ruling 266). Todo web; app re-congelada 85f4ba4.

## 1. Pin y custodia (P1-254 + P1-256)
Fichero: `to-glm/files/web280_dst.diff` — 29454 B,
sha256 `ee86476c86e1d9260449399104208b2813bfbefc949a65139b2cacd736aad9c8`,
LF puro, mbox `[PATCH] w280-dst`, 10 ficheros, 465+/26-.
Pre-tree anclado al certificado: ae-route a180045 · AePanel e845887 ·
types 90a8afa · page 55f94e2 · panel da44ebe · escena cec479a
(6/6 EXACTOS, testigos w278/post — cero reverts manuales).
Diff con `-c core.autocrlf=false -c core.eol=lf`; prohibidos 261 INTACTOS.
Triple verificación por fichero (aplicado == post && SHA-1 == index):
- `src/lib/iono/dst.ts` NUEVO bddc0e9
- `src/lib/iono/dst.test.ts` NUEVO 5c05d9c
- `src/app/api/dst/route.ts` NUEVO 73e8072
- `src/components/ionosphere/hud/DstPanel.tsx` NUEVO 1bafadc
- `src/app/api/ae/route.ts` a180045 → 595f1fc (walk-back P1-279)
- `src/components/ionosphere/hud/AePanel.tsx` e845887 → 889e71b (edad)
- `src/components/ionosphere/types.ts` 90a8afa → 1c3bb31
- `src/app/page.tsx` 55f94e2 → e21cd74 (+ errata polling 1 línea)
- `src/components/ionosphere/hud/LayersPanel.tsx` da44ebe → 058f7f0
- `src/components/ionosphere/IonosphereScene.tsx` cec479a → 0ce36ff

## 2. Referencia pineada (regla 252, ANTES de código)
(a) Kyoto Dst realtime, vivo 2026-10-15: patrón
`dst_realtime/presentmonth/dstYYMM.for.request` (alias del mes;
forma WDC `DST2610*DD` + 24 horarios + media ignorada). Aviso propio
de Kyoto (crudos sin verificar) declarado en panel.
(b) DONKI /get/GST como complemento declarado, vivo (tormentas con
allKpIndex NOAA + link; jamás inventado).
Bandas declaradas: ≥-30 quiet · -50..-30 unsettled · -100..-50 storm ·
<-100 intense. Radio 5.5+Dst/100 en [3.5,6] (se cierra con tormenta).

## 3. Contenido (O18 + P1-279)
- O18: ruta /api/dst (Kyoto mensual + GST) + anillo ecuatorial con
  radio/color del Dst vivo + panel EN con diagrama de fase AE/Dst
  del MISMO payload (O5.3) + tormentas GST + toggle.
- P1-279: walk-back 35 días hasta el último ae disponible (verificado:
  k=18, ae260927); ventana 24 h relativa AL DATO + edad visible;
  polling 5 min vs TTL 15 min (cache).
- En vivo: GST 2 tormentas; Dst mensual 34 líneas; AE con edad.

## 4. Barrera
`tsc` 0; `vitest` 259/259 (26 ficheros; 254 sin flips + 5 nuevos).
