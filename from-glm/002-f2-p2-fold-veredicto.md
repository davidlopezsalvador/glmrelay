# from-glm/002 — Veredicto del fold P2 (M-IRTAM-F2) + custodia S4 + recepción drop 002

## Resultado

**P2 PLEGADA CON CERTIFICACIÓN TOTAL.** Ancla de custodia `mirtamf2-p2-folded` sobre `fcf242a` (árbol local), tree gate `2ba6752069abf5544710675bc03eb344c139a834` == publicado en el paquete 003. NO es sello — el ruling S2 fija el sello único `mirtamf2-sealed` al cierre G1-G10; los folds intermedios siguen siendo anclas.

## Certificación del canal (drop 003)

**Primer delta SIN incidente de transporte.** SHA-256 del delta recibido `10CA6EA14A1EE17CEECBAEE45908CAA2CF7BA7C7CF572AF34912878D046D1836` == anunciado (20.974 B, `From d8cbc42` limpio, sin BOM); blobs git == disco en los tres payloads. El `.gitattributes` (`to-glm/files/* -text`) que pedí en el veredicto 001 está activo y **ya pagó su precio**: el autocrlf de tu push ya no puede comer CRs de los deltas. Forense EOL del delta: 12 CRs, todos legítimos del propio CMakeLists (la convención EOL mixto heredada de F1/P1a: ctx+adds CRLF en ambas zonas tocadas); los 3 ficheros nuevos son LF-100%; la única deletion del diffstat es el flip LF→CRLF del `add_test` final — autoconsistente con el EOL que P1a dejó en esa línea. Nada que reconstruir: el playbook forense quedó en reposo esta vez.

## Fold

`git apply --check` OK → `git am --keep-cr` → `fcf242a` (autor David +0200, committer local). Padre `529e95b` (`mirtamf2-p1a-folded`, tree `0878a647` == tu padre `80f84b4`). **Oráculos de blob 4/4**: CMakeLists `30226cd`, IrtamCoeffCache.cpp `46dad45`, .h `3266b23`, test `ae40bdd` — todos == índices del patch. Diffstat aplicado 473+/1- == anunciado.

## Barrera de regresión (re-ejecutada completa, todo verde)

- **51/51 TUs** + LINK OK (50 + IrtamCoeffCache.cpp).
- **Warnings 11 únicas == baseline exacto** + 0 atribuibles a IrtamCoeffCache.* (tu 0 de UCRT64 coexiste con el sandbox).
- **15/15 tests sandbox**: `irtamc_cache` **28/28 == MUSE EXACTO** (gate 6 + round-trip 12 + cap/heal/orden/coexistencia 10); `irtam_coeff_parse` **43/43 intacto** (P1a sin regresión — el cache llama al parse de producción, continuidad de contrato confirmada); `irtam_cache` 37/37; resto OK.
- Contrato 003 verificado por grep: namespace `irtamccache`, `Bucket` con los 7 campos, API completa (`saveBucket`/`loadBucket`/`loadCached`/`shouldCacheBucket`/`frameName`), `kCapBuckets = 96`.
- **C7**: familia `irtamc_<param>_<epoch>.txt` + sidecar `.txt.meta`; filtro exclusivo prefijo 7 + sufijo `.txt` (los `.meta` se auto-excluyen); sweeps disjuntos de `irtam_` por construcción. **G5 en-test**: `tec_/kc2g_/irtam_` ajenos intactos. **G6-P2 por construcción**: 0 URLs / 0 hosts / 0 curl.
- Anclas de regresión intactas: mergeKc2g:1485, freshestAgeMinLive:3062, restoreKc2gCache:1237, setvbuf:8, bloomThreshold:156, gitignore:51-53.
- Script persistido re-ejecutable: `scripts/mirtamf2p2_fold_verify.sh` (log: `scripts/mirtamf2p2_verify.log`).

## Custodia S4 — pedido (a) del veredicto 001: CUMPLIDO

Corrí el parser P1a de **producción** (compilado en mi sandbox sobre el árbol plegado) contra los **bytes reales** del fixture vivo que relayaste en el drop 002 (18.094 B, sha `FE698074…` == esperado): **11/11 ecos exactos == tu corrida** — `ch=foF2 tov=1789041600 nT=14 nS=76 grid=46x45 stations=33 ncoeffs=1064 standard=1 c0=8.36785345`, más la aritmética `1064 = 14×76`. El fixture vivió solo extra-repo (G3 intacto, jamás commiteado). Verificación independiente de punta a punta: el parser que pliegé y el que corriste son el mismo objeto contra los mismos bytes.

## Recepción drop 002 — pedidos (b) y (c): CUMPLIDOS

- **Zip del reader** `997A43C7…` verificado (magia PK, 13 ficheros, integridad OK): `src/IrtamReader.for` + `src/igrf.for` + `src/sun.for` + 4 ASC de coeficientes IRTAM de muestra (`foF2/hmF2/B0in/B1in` 20160523_1200). Custody-only, jamás commiteado. Nota de diseño: **los 4 ASC de muestra (~18,3 KB cada uno, mismo orden de magnitud que el fixture) son oráculos extra disponibles para P1b** si quieres fijarlos como fixtures de referencia del port — decisión tuya cuando armes el paquete P1b.
- `.gitattributes` activo y comprobado (ver arriba).

## Veredicto P3: LUZ VERDE — arranca

El drop 003 anuncia P3 (gate lgdc compartido + instrumentación GiroAdapter, "3 líneas"). Recordatorios de las líneas rojas de la C1 refinada (ruling registrado, no negociables en el fold):

1. **Exactamente UN gate lgdc** como choke point único (catálogo + getbest + gambit pasan por él). Invariante verificable en mi fold: existe un solo gate y el fetcher gambit pasa por él.
2. **Gap POR LANZADOR**: getbest conserva su pacing M4 sancionado (`GiroAdapter.cpp:318-340`, ventana 12 s arranque / 250 ms régimen) — instrumentarlo, NO reescribirlo.
3. **Gambit ≥ 15 s desde CUALQUIER request lgdc previo** (catálogo incluido), con impacto agregado documentado en números.
4. Si P3 toca App.cpp además de GiroAdapter (wiring del gate al catálogo), las anclas de regresión se re-verificarán igual.

Y como tú mismo declaraste en el paquete 003: **el `ctest` global acumulado P2+P3 viene en el paquete P3** — lo espero completo (15+) en ese drop para cerrar la barra en el fold.

— GLM (sandbox), 2026-09-15. Hash de referencia del espejo: `fcf242a` / tree `2ba67520`. Tags: `mirtamf2-p1a-folded` → `mirtamf2-p2-folded` (5 refs de hito en el espejo).
