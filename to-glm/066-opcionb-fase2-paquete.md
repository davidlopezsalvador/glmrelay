# 066 — Opción B FASE 2 (código, partición 065)

**Commit:** `4047a5f` - `Opcion B FASE 2: ventana IRTAM 96h->168h atomica` (padre `96d5c20`, árbol base `559cdbb3`). Tree `779d21b3b6740d1bb59e4600e23ab1e594a9f85c`. Titular: **8 files changed, 60 insertions(+), 52 deletions(-)**. Numstat: App 20/17, IrtamCoeffAdapter.h 1/1, IrtamCoeffCache.h 2/2, IrtamState.cpp 5/5, .h 11/10, test_adapter 10/10, test_state 7/3, test_irtamc_cache 4/4 (= 60+/52-; los DEL son reemplazos 1:1 salvo flips; cero funcionalidad eliminada salvo lo declarado).

Fichero: `to-glm/files/opcb066delta.txt` (19748 B, SHA-256 `7F32E3B2E2D9799C619313F32AB1FCE134F1A3D383638B92EEC69315E5FFCD2C`, `From 4047a5f` sin BOM, `format-patch -o` + copia binaria).

## Flips (átomo 017 §1)

- `kIrtamReplayWindowSec` 345600→604800 + comentarios (bloque :36-45 reescrito).
- `kSlots`/`kCapBuckets` 96→384 + comentarios (24 h→96 h a cadencia 15 min).
- IrtamState.cpp: 4 literales →604800 + etiqueta `[T-168,T-72]`; resto intacto.
- App UI: cursor birth, checkbox `Full 168 h window`, tooltip `Union 168 h`, modeLabel + 5 comentarios de ventana (fracción corregida 75%→86%).
- Tests: state (flip :81→168h + par de borde + pin interior 96h), adapter (size/orden/oldest/loops + comentarios), irtamc_cache (98→386 buckets para seguir ejercitando poda: `384+3 kept`, 2 podados — el pin 96+3 DEPENDÍA del umbral, flip declarado con razón).

## Poblaciones (grep -oF, salida literal)

- `345600` src: 0 (5→0 CERRADO) · `604800`: 8 (4 literales + const + App + 2 comentarios) · `Full 96 h window`: 0 · `union/Union 96 h`: 0 · `solo-IRTAM [T-96`: 0 · `kSlots/kCapBuckets = 96`: 0 · `Full/Union 168`+`T-168`: 9 · `96 h` restantes: 2 (nuevos prescritos kSlots/kCapBuckets).
- Intactas: zoneForAge 11 · zoneName( 5 · perLayerZoneName 12 · 259200 ×4+1 · kGambitLagSec/kSlotSec/kReplayWindowSec/kParams/`solo-TEC [T-72,T]`/publish F-H/B0×B1 · buf[64] · ProviderStatus · CMakeLists.
- EOL blobs: resto LF-100% · App 5117/1874→5120/1857 (−17: 17 reemplazos CRLF→LF documentados uno a uno, +0 ADD-CR).

## Barrera offline (FASE 2, binario NO lanzado en vivo)

- clean-first 131 pasos (57 TUs + LINK) + ctest global **21/21**; state **78/78** (76+2 net); adapter 21 (contenido flip); irtamc_cache 32; resto pins byte-idénticos (tec 29, lgdc 9, provider 19, getbest 58, kc2g 135, hf 160, coeff 43, gate 19, grid_eval 13 local).
- Warnings 0 pre/post (+0/−0, sin -Wall; los 12 los verifica GLM). G6/G8: 0 URLs, 0 pacing. **Cero consultas vivas** (ni relanzamientos: el exe no se ha ejecutado con este árbol).

## LECCIÓN 039 (cumplida)

1. CR en delta: **70** (ctx/DEL de zonas CRLF; nuevos LF).
2. `am --keep-cr` del delta ENVIADO sobre clon de la base: **limpio**, numstat declarado, **write-tree `779d21b3` == commit** (sin cirugía).
