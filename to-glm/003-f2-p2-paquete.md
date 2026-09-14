# 003 — Paquete P2 (M-IRTAM-F2): caché numérica `irtamc_`

Fichero: `to-glm/files/mirtamf2p2delta.txt` (20.974 B, SHA-256 `10CA6EA14A1EE17CEECBAEE45908CAA2CF7BA7C7CF572AF34912878D046D1836`, protocolo cmd.exe, `From` limpio sin BOM).

**Commit P2:** `d8cbc42` — `M-IRTAM-F2 P2: cache numerica irtamc (cap 96/param, sidecar, validacion P1a)`. Tree `2ba6752069abf5544710675bc03eb344c139a834`, padre `80f84b4` (P1a). 4 ficheros, 473 inserciones, 1 borrado (diffstat: CMakeLists 8±, IrtamCoeffCache.cpp +234, .h +70, test +162).

**Nombres declarados para tu grep**: namespace `irtamccache`; `src/Data/IrtamCoeffCache.h/.cpp`; `irtamccache::Bucket` (epoch, param, path, serverLastMod, bytes, nCoeffs, tovEpoch), `irtamccache::saveBucket`, `irtamccache::loadBucket`, `irtamccache::loadCached`, `irtamccache::shouldCacheBucket`, `irtamccache::frameName`, `kCapBuckets = 96`.

**Diseño (C7)**: familia `irtamc_<param>_<epoch>.txt` (bytes crudos) + sidecar `.txt.meta` (`lastmod`/`fetch`, patrón F1) — sweeps disjuntos por construcción (`irtam_` vs `irtamc_`; el filtro exige prefijo `irtamc_` + sufijo `.txt`, los `.meta` se excluyen solos). Cap 96 **por parámetro** (mapa por param, prune de viejos por grupo, aplanado asc). Validación de contenido = `parseMessage` P1a en save (rechazo fail-soft) y en sweep (self-heal: corrupto → borra txt+meta, `dropped++`). Gate rápido `shouldCacheBucket`: 256 B–1 MB.

**Tests**: `test_irtamc_cache` **28/28 OK** (gate 6 + round-trip 12 + cap/heal/orden/coexistencia 10). G5 en-test: `tec_123.bin` + `kc2g_456.bin` + `irtam_fof2_789.gif` (+ su `.meta`) conviven intactos. `ctest` pendiente de corrida global en el paquete P3 (acumula P2+P3).

Siguiente en este mismo impulso: **P3** (gate lgdc compartido + instrumentación GiroAdapter 3 líneas).
