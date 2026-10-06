# 169 — W-3 rejilla de perfiles IDW + P5 cabecera (P1/P5 del 168)

## Spec
- Veredicto 168: P1 rejilla IDW con relacion DECLARADA (idw/greatCircle de era vs oraculo IDW+havDeg: reutilizar declarando o portar con TU) + wiring un drop por sub-feature; P2 VLM con wiring vivo; P3 custodia vs web167-folded; P4 spec integra; P5 cabecera densityVolume.ts. Drop 169 -> veredicto 170.

## P1 — profileGrid.ts (port de interpLayerProfiles App.cpp:676-766 + havDeg/modelos de LayerProfile.h:153-224)
- Estructura 1:1: fondo mediana por campo (solo >0, mediana SUPERIOR), wBg 0.004 sembrado, maxDist 50 grados, peso 1/(d*d+0.5), haversine doble, nearDeg contra TODAS, mezcla modelo SOLO foF2/hmF2 con wG = smoothstep(55,25,nearDeg), cosChi via densityDir (marco del motor), hmF1 = max(150, 0.8*hmF2), sanitize, flags por >0.
- CONVENCION replicada con su quirk: la rejilla usa ESQUINAS (sin +0.5) mientras el builder consume centros (desfase media celda presente en produccion C++; fidelidad sobre correccion, pineado por la celda-esquina exacta).
- Relacion con era previa DECLARADA (no se reutiliza idwInterpolate/greatCircleDeg: valor unico + mediana estandar + nucleo por verificar): se portean havDeg + medOf con TU; SI se reutilizan smoothstep de ionomath (mismas aristas incl. 55->25) y densityDir certificado.
- dayOfYearUtc port aparte con HALLAZGO: el dayOfYear de ionomath devuelve 0..365 (off-by-one contra gmtime+1 1..366 del oraculo; desfase estacional ~1 grado, fisicamente irrelevante pero real). La rejilla usa el del oraculo y lo pinea; ionomath no se toca (divergencia legacy declarada).
- Modelos: nucleo modelFoF2Core/modelHmF2Core porteados con firma del oraculo (cosChi precalculado por el caller, patron P1-corregido-por-MUSE); el wrapper web (solarZenith propio) queda para sus caminos.
- Deuda de datos declarada: IonosondeStation web solo trae foF2 (+muf3000); foE/foF1/hmF2/B0/B1 viajan con la extension de /api/ionosondes. La funcion acepta muestras completas (forma del oraculo); lo ausente entra por puertas >0 = fondo (exactamente como el C++).

## TU profileGrid.test.ts (7/7)
- havDeg 0/90/180, dayOfYear 1/365/366 (bisiesto incluido), foF2 subsolar medido 12.6531942 + noche 4.454 + escala f107, hmF2 250/300 exactos, vacio/stale apagado, celda-esquina casi-exacta (rel 1e-12; caza la convencion), celda lejana = modelo puro bit-exacto.

## P5 — cabecera densityVolume.ts actualizada (solo comentario)
- La frase "buildDensityVolume inexistente" caduco en 167: ahora dice donde vive (layerProfile.ts). Cero cambio de codigo.

## Alcance
- SOLO rejilla pura + TU + P5 (sin escena, sin VLM posible aun; deuda intacta). Siguiente tramo propuesto: extension de /api/ionosondes (foE/foF1/hmF2/B0/B1) + primer wiring visual (shells derivadas via extractPeakGrids).

## Barrera Windows (scratch, fuentes == trial en blob)
- `npm test` 88/88 EXIT=0 (81 + 7).
- `tsc --noEmit` 0 EXIT=0.
- `next build` compila (tabla de rutas OK); solo falla el `cp -r` Unix en Windows (preexistente, sano en GLM-Linux).

## Custodia
- Delta `to-glm/files/web169_profile-grid.diff`: 13268 B, sha256 `f82e2597cb81927b81fcd15f66c0d00892c8687671300ee240a475b2d4caec4e`, LF puro 0 CRLF, sin BOM, 3 ficheros +299/-5, lineas anadidas 299 100% ASCII.
- Pre = web167-folded (`d39343d` / arbol `9505106a`): profileGrid + test NUEVOS (pre 0000000); densityVolume modificado P5 (pre `45e51d8d` == post del 168); ref layerProfile `4184bdb1` == post del 168 (P3 cumplida).
- Trial `am --keep-cr` LIMPIO sobre cadena base130->...->web167: commit `f12d469`; post profileGrid `d006349b`, profileGrid.test `022ec495`, densityVolume `1d916684` == build.
- Sin pipe de PowerShell en ningun byte del artefacto; verificaciones numericas solo.

## Pide
- Veredicto 170.
