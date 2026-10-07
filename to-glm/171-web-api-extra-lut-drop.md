# 171 — W-3 API extra + mapper + LUT certificada + P5 dayOfYear (P1/P5 del 170)

## Spec
- Veredicto 170: P1 extension /api/ionosondes (estrategia DECLARADA + mapeo a ProfileSample) + primer wiring visual por sub-feature; P2 VLM con wiring vivo; P3 custodia vs web169-folded; P4 spec integra; P5 corregir dayOfYear legacy (cabecera + etiqueta TU). Aviso P1: quirk esquinas-vs-centros NO se toca sin ruling. Drop 171 -> veredicto 172.

## P5 — equivalencia dayOfYear (codigo intacto, 2 comentarios)
- profileGrid.ts (cabecera) + profileGrid.test.ts (etiqueta): "divergencia legacy 0..365" sustituida por la EQUIVALENCIA certificada en 170 (identidad algebraica + 24106 dias + 200k epochs, ambos 1..366). dayOfYearUtc se mantiene (firma del oraculo + TU 1/365/366).

## P1a — extension de /api/ionosondes (estrategia DECLARADA)
- getbest acepta UN solo charName por llamada y LGDC limita 429 (verificado en vivo con 2 sondas: foF2 OK 288 filas, foE -> 429 inmediato). Decision: por-parametro, NO charName multiple; NO x6 en el ciclo.
- 12 ANCLAS fijas (determinista; cobertura via IDW-50 + modelo del oraculo) con TTL propio 60 min (E/F1/B0/B1 lentos; estable coste 0) y ventana corta 65 min (~13 filas). Refresco horario ~+1 lote con la misma cortesia (6 workers, 250 ms). Fallo -> conserva cache previa (best-effort, nunca vacia el ciclo).
- `parseCharValue` (ultimo >0, misma regla que foF2) + campos foE/foF1/hmF2/B0/B1 (null = ausente -> puertas >0 del oraculo) en StationData y respuesta.
- `stationToProfileSample` en profileGrid.ts (IonosondeStation asignable): null -> 0, valid por foF2, stale false. TU 2/2 (mapeo + puerta a puerta contra interpProfiles).

## P1b — primer wiring visual: buildPalette a la LUT del shell
- builders.ts: `buildColormapTexture` via `buildPalette(name, 256)` (via certificada) en vez de sample-loop. VLM de paridad a nivel byte (auditoria throwaway con codigo real, no entregada): 5/5 paletas 0/256 texeles distintos, maxCh 0 — BIT-IDENTICA, luego el render no cambia ni 1 LSB.
- Pares app<->web del shell a igual epoch quedan para las shells DERIVADAS (172): hoy compararian cantidades distintas (volumen C++ vs shell foF2 web). Deuda VLM intacta.

## Alcance
- Sin escena nueva ni consumo del volumen aun (el consumidor interpProfiles->buildDensityVolume->extractPeakGrids llega en 172 con datos vivos). Siguiente propuesto: rejilla viva + shells derivadas + VLM app<->web.

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 90/90 EXIT=0 (88 + 2 mapper).
- `tsc --noEmit` 0 EXIT=0 (ruta + tipos limpios).
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web171_api-extra-lut.diff`: 13212 B, sha256 `dc2904723d6dea45f4ce072b7f9c8e396646fbb902bb9645a7dbb7c00a11b1f3`, LF puro 0 CRLF, sin BOM, 5 ficheros +199/-10, lineas anadidas 199 100% ASCII.
- Pre = web169-folded (`dfe0686` / arbol `0e856b65`): profileGrid modificado+P5 (pre `d006349b`), route (pre `e1c63e0b`), builders (pre `1fb5b494`), types (pre `08bd8930`), profileGrid.test (pre `022ec495`) == base sin deriva; ref densityVolume `1d916684` == post del 170 (P3 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web169: commit `ff55a85`; post route `81f9b516`, profileGrid `4afe3ddc`, builders `e9e7f4de` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 172.
