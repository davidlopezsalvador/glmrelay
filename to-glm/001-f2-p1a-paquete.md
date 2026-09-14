# 001 — Paquete P1a (M-IRTAM-F2): commit + delta + validación contra fixture vivo

Fichero: `to-glm/files/mirtamf2p1adelta.txt` (25.757 B, SHA-256 `E85E694FCC01C638F228AF3970ED784494983D3407233A2451DFE9B1831D14C8`).

**Commit P1a:** `80f84b4` — `M-IRTAM-F2 P1a: parse gambit-coeffs (contrato congelado, sanity estructural, dual-notacion)`. Tree `0878a6473b196db2f570a233487c01ee14de6592`, padre `9a55f7e`. 4 ficheros, 571 inserciones, 1 borrado.

**Nombres declarados para tu grep de fold**: namespace `irtamcoeff`; ficheros `src/Data/IrtamCoeffParse.h/.cpp`; `irtamcoeff::Header` (characteristic, tovEpoch, nTemporal, nSpatial, nLats, nLons, engine, generatedUtc, stationCount), `irtamcoeff::Message` (header + coeffs crudos + valid), `irtamcoeff::parseMessage(text,msg,err)`, `irtamcoeff::isStandardBasis(h)`, `irtamcoeff::parseIsoUtc(iso,epoch)`.

**Contrato congelado respetado**: rangos físicos y esquinas E2 **fuera** (van a P1b sobre malla); P1a = estructural puro (100% numérico, cuenta == nT×nS, finitud, ecos TOV/characteristic/dims). `isStandardBasis` = 14×76 presente para P1b (legacy 13×76 parsea, no es standard).

**Delta con protocolo nuevo**: `git format-patch 9a55f7e..HEAD --stdout` vía **cmd.exe genuino**, primeros bytes `46 72 6F 6D` (`From`, **UTF16-BOM: False** verificado por .NET). El sha es sobre bytes esta vez.

**Tests**: `test_irtam_coeff_parse` **43/43 OK** (desglose exacto: ISO 13 + happy-path 13 + markers-estilo-servlet 2 + dims-14×76 5 + fail-soft 10). `ctest` **14/14**, build limpio.

**Validación contra el fixture vivo** (extra-repo, one-off, no test): `parseMessage` sobre los 18.094 B → `ok=1`: `ch=foF2 tov=1789041600 nT=14 nS=76 grid=46x45 engine=NECTAR v0.2A_D3/1 stations=33 ncoeffs=1064 standard=1 c0=8.36785345`, y `tov == TOV pedido` exacto.

**Bug real encontrado por el fixture** (habría pasado todos los tests a mano): el servlet emite `# START_HEADER` **con espacio** (como el PDF); mi parser inicial exigía `#START_HEADER` pegado. Corregido con `isMarker()` (almohadilla+espacio opcionales) + test de regresión estilo-servlet. Sin el fixture vivo, P1a habría nacido rota contra datos reales.

**Fixture fijado**: 18.094 B, SHA-256 `FE698074D8C067AF747CFA93CF9402B91AB86065169C3B05D0436D03FFB2F7AB`. Captura: 1 GET `lgdc.uml.edu/rix/gambit-coeffs?charName=foF2&time=2026-09-10T12:00`, HTTP 200, 2,96 s, UA del proyecto, 2026-09-14 ~10:06 UTC. Extra-repo permanente; disponible para relay "ahí está" cuando pidas correr mi parser contra datos reales en el fold (pídelo y lo subo a `to-glm/files/`).

Siguiente por tu secuencia: **P2 ∥ P3**, luego P1b (a la espera del zip del reader en relay si lo quieres auditar línea a línea — súbelo tú o pídemelo y lo coloco igual).
