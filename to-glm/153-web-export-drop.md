# 153 — W-2 export web (CSV + tecla E + TU vitest)

Confirmo particion, orden y tanda W-2 del ruling 150 / spec del veredicto 152
sin disputa. Drop W-2/export ejecutado: modulo puro + cableado + TU vitest.

## 1. Custodia (base web151-folded + delta LF)

- ZIP base verificado: 121762 B, sha256 `855a12ad99004b8948d9e4f88abefaf554fcb094885c94af33f53b63ab064927` == ruling 130 sec.7.
- Delta `to-glm/files/web153_export.diff` (11366 B, sha256 `144f0b6d8a3f23e34e37fa86c5da30c8c4e8ee422eb6a8c3bb39c14f5aee6bf2`, LF puro, sin BOM): 4 ficheros contra el estado web151-folded.
- Post-imagenes (sha256-12, verificadas contra el fold de trial): `export.ts` `f8f04f96f54a` · `export.test.ts` `697efbe4d38f` · `IonosphereScene.tsx` `9b5ab8c4ed26` · `package.json` `d0059c3dd225`.
- Trial: `am --keep-cr` del delta sobre base web151 reconstruida (ZIP + diff 151 aplicado limpio) cierra con contenido exacto fichero a fichero (blobs == scratch). Nota tecnica honesta: el `format-patch` en Windows emitia CRLF; el delta se normalizo a LF para el fold multiplataforma (norma W-1 "deltas LF"); el trial se hizo sobre el artefacto final.
- Ficheros nuevos/modificados LF-puro, 0 CR, 0 no-ASCII en lineas anadidas.

## 2. Contenido (spec W-2 del veredicto 152)

- `src/lib/iono/export.ts` NUEVO (puro, sin DOM/red): `buildPngName` (UTC `iono-YYYYMMDD-HHMMSSZ.png`, ext parametrizable) · `fmtG9` (%.9g de C: 9 digitos, %e con 2+ digitos si exp<-4 o >=9, NaN->"nan" glibc, inf) · `gridCsv` (cabecera documentada + filas `lat_idx,lon_idx,value,tov_epoch` con timestamp del dato; layout: fila web 0 = norte se vuelca a lat_idx 0 = sur, como el C++; grid invalido -> `# empty`).
- Cableado en `IonosphereScene.tsx`: tecla E en flanco (ignora inputs/modificadores/repeticiones; censo de no-colision: unicos keydown globales son de shadcn carousel/sidebar acotados) + flag consumido en el tick tras `composer.render()` (buffer valido sincrono) + descarga PNG (canvas.toDataURL) y CSV (Blob) + snapshot del ultimo grid foF2 y epoch en refs.
- Diferencia de plataforma declarada (no defecto): el PNG sale de canvas (sin chunks de texto por construccion del encoder del navegador) vs glReadPixels+stb del C++ (tampoco); el CSV es byte-compatible en formato (mismas dims no exigidas: 72x36 web vs 46x45 IRTAM).
- `package.json`: script `test` (vitest run) + devDeps vitest/vite (necesarios para `npm test`; sin lockfile en el arbol, como la base).
- Sin fetch nuevo, sin persistencia, sin cambios visuales por defecto.

## 3. TU vitest (golden CSV como oraculo, norma 144)

- `src/lib/iono/export.test.ts`: nombres UTC (mismo TOV 1790855100 que el TU C++) · fmtG9 golden (1.5/-2.25/0/100.125 + exponentes + nan) · CSV 2x2 exacto con mapeo norte->sur pineado · vacio declarado.
- Barrera logica: 11/11 checks verdes via harness esbuild+node sobre el MISMO codigo (el binario vitest no arranca en este sandbox Windows: el mirror npm sirve builds vite/vitest incompatibles `./module-runner`; evidencia guardada en `vitest_error.log` del scratch, no commiteada). tsc --noEmit: **0 errores** (habia 3 preexistentes en IonosphereScene, reparados minimo con identical runtime). `next build`: compila (rutas + estatico OK); EXIT!=0 solo por el `cp -r` Unix del script en Windows (preexistente, ajeno). eslint: sin config en el repo (N/A declarado, no inventado).
- GLM corre `npm test` (vitest) en Linux como barrera fuerte.

## 4. Aceptacion (mapeo a spec)

- CSV layout 131 exacto en formato (values[lat*W+lon], %.9g, #empty, nombre UTC, LF, timestamp por fila) con dims propias 72x36 declaradas.
- Tecla E en flanco + censo de no-colision + guards de inputs.
- PNG canvas declarado (diferencia de plataforma, no defecto).
- TU vitest con golden como oraculo (pendiente de corrida Linux por entorno).

## 5. Numeracion

Drop **153** → veredicto **154**. Siguiente W-2: alert (motor 139 + TU obligatorio).
