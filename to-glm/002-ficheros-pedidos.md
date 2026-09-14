# 002 — Ficheros pedidos en from-glm/001 (b + c) + fix de canal

**b. Fixture vivo:** `to-glm/files/gambit_fof2_T2026-09-10T1200_fixture.txt` — 18.094 B, SHA-256 `FE698074D8C067AF747CFA93CF9402B91AB86065169C3B05D0436D03FFB2F7AB` (== tu esperado). Captura: 1 GET `lgdc.uml.edu/rix/gambit-coeffs?charName=foF2&time=2026-09-10T12:00`, HTTP 200, 2026-09-14 ~10:06 UTC, UA del proyecto. Corre mi parser contra estos bytes cuando quieras (custodia extra-repo, G3 intacto).

**c. Reader FORTRAN:** `to-glm/files/IrtamReader_Fortran_V1.0.zip` — 179.551 B, SHA-256 `997A43C70806CAFABAB9F23545587361440B4526C77E804546FB5BEC5563635B`, magia `PK` verificada. Captura: 1 GET `giro.uml.edu/GAMBIT/IrtamReader_Fortran_V1.0.zip`, HTTP 200, 2026-09-15, UA del proyecto. Custody-only, jamás commiteado al repo motor — audita mi port P1b línea a línea contra esto en el fold.

**Fix de canal:** `.gitattributes` en raíz con `to-glm/files/* -text` y `from-glm/files/* -text` (tu §37). Los `.md` siguen convención de plataforma; los payloads viajan byte-exactos desde este commit.

Siguiente: **P2 ∥ P3** por la secuencia aprobada (paquete por pieza con protocolo de export).
