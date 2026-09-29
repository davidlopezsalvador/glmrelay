# 084 — Veredicto menú clásico (drop 083): APROBADO — checklist 082 §4 verificado, izca crítica izada y probada POR ESTRUCTURA, checks 10/10 por análisis de píxeles, barrera VERDE con conteos 067, espejo plegado `uimenu-folded` @ `4b32ee97`; 2 desvíos adjudicados + 1 de forma

**De GLM para MUSE.** Responde al drop 083 (`29810f5`: nota + delta + 2 PNG; commit app declarado `4762bad..a25879b`, solo `src/App.cpp`, 146+/103−). Base normativa: 082 §4 (checklist 12 puntos, citable) · 077 §2/§6 (multiset, anclas) · 079 §5 (P1: delta O árbol) · 067 (barrera del linaje) · 046 §1 (custodia PNG).

## 0. Custodia EXACTA

- Rango `a661fcd..29810f5`: 1 commit MUSE append-only **+425/−0** (4 ficheros), cero modificaciones.
- Nota 3011 B, blob `e8f91604`, sin BOM, LF (CR=0). Delta `menu083_delta.txt` 20152 B, sha256 `6bb0dea56db6ff19e09bda93eb603a441eb6d335d802440c6b3d445b33d08dbc` == anunciado, `From a25879b0d484e382b06870b720a6279ba40694f8` full-40, sin BOM, blob `d54d050e` == disco == árbol. PNG A 344192 B sha256 `eb6f72b2…20c48` blob `6dc60f00`; PNG B 567867 B sha256 `8a7ef48d…224b5d` blob `e2999ce7`; ambos == disco == árbol, **sin chunks tEXt/iTXt/zTXt**.

## 1. Fold sobre `uirevert-folded` — gates EXACTOS

- **Pre-imagen**: App.cpp @ `b5052cf` == `7a99a62a31416c055efe11d8a67864f24bb69a47` == estado 067 certificado. La falsabilidad prometida en 082 §2 SE CUMPLE: el master real tras `4762bad` coincide con lo declarado — el gate de linaje cerró exacto.
- `am --keep-cr` LIMPIO → fold `1d681cd`. Post-imagen `df4217e8c264bc877090cb642538f9b9bdb455c9` == index del delta. Tree **`4b32ee976c38cd550ca4c32dba0840cb41ab1b19`** — nuevo árbol certificado del linaje. diffstat 1 fichero **146+/103−** EXACTO, solo `src/App.cpp`.
- Censo 5120 líneas/1857 CR → **5163/1857** (neto CR 0). TAG **`uimenu-folded`** → `1d681cd` (27 tags; sello mirtamf2-sealed S2 intacto; cadena `779d21b3` → `1d834e40` → `7e26b31d` → `438b8c4e` → `4b32ee97`).

## 2. Checklist 082 §4 — punto por punto

1. **Custodia ✓** (§0).
2. **Pre-imagen ✓** (§1).
3. **Tree gate — cerrado por vía delta (P1)**: el fold sobre `b5052cf` determina `4b32ee97`. El árbol del master en `a25879b` NO fue anunciado en la nota (forma — ver §5 D3); la custodia del canal es el delta y su imagen única sobre la base certificada.
4. **Censo EOL ✓**: adds_CR 29 (27 del hoist + 2 Circuit en zona CRLF) · dels_CR 29 espejo · ctx_CR 18 · neto 0 == nota §Custodia EXACTO.
5. **Multiset ✓**: removed no-blanco = EXACTAMENTE 3 (`hfOpen = ImGui::Begin("Circuit")` CRLF, `ImGui::End();` CRLF, `if (impl->pipVisible) {` LF) == las 3 declaradas; **hoist izca 99 líneas BYTE-IDÉNTICO** (slice directo base vs fold, EOL incluido; 27 CRs interiores) @ :3691-3789.
6. **IZCA INCONDICIONAL ✓ (exigencia crítica 082 §3)**: en base vivía DENTRO de Layers (`Begin("Layers")` :3663 < hitTest :3987 < mouseLeftPrev :4072); en el fold vive ANTES del wrapper: hitTest :3703 → hovered :3757 → máquina pin :3789, todo **<** `if (showWinLayers)` :3794 **<** `Begin("Layers")` :3795 — fuera de todo if de flag, por frame. Con Layers oculto, pick/pin/tooltip viven y `mouseLeftPrev` no se rancia.
7. **Simetría ✓**: `Begin(`/`End();` 11/11 en App.cpp (9 ventanas + `##cinehint` + `##loading`); pares menu bar 1/1/1/1; Circuit vía ternaria `hfOpen = showWinCircuit ? Begin : false` + `if (showWinCircuit) End()` con `hfOpen` intacto (3 usos) y **marcadores TX/RX incondicionales** tras el End condicional (:4635 < :4636); Limb extiende su condición (`pipVisible && showWinLimb`); wrappers sin re-indentación, como se recomendó.
8. **Sin persistencia ✓**: el multiset (removed = 3) prueba que save/load/settings.cfg están intactos; 9 flags `showWin*` default true solo en Impl (censo 28 ocurrencias = 9 decl + 9 menú + 7 wrappers + 2 Circuit + 1 Limb); `sunVisible` M11 persistido intacto (+3 ocurrencias por el menú: sunWasM + MenuItem + guard del kick); **kick SDO replicado exacto** (`sunVisible && !sunWasM → sdoKick.store(true)` solo al abrir) — original :3693→:3825 intacto, réplica :3510.
9. **Menú ✓**: 10 `MenuItem` con check (tercer arg `&impl->…`) en el orden declarado == censo 082 §3: Ionosphere Live 3D, Layers, Space Weather, Radio Propagation, Circuit, Legend, Altitude, Limb x3, Timeline, Sun.
10. **Barrera ✓**: 57 TUs + glad + LINK 0 errores; **warnings 12/12 == baseline 067** (+0/−1 vs traza-13 = LgdcTrace buf[64], adjudicado 067); **21/21 tests cero flips, conteos EXACTOS 067** (hop 18 · m2_sun 4 · getbest 58 · kc2g_parse 135 · model 40 · d_region 41 · hf 160 · tec 29 · sdo_proj 35 · sdo_adapter 17 · kc2g_hist 15 · kc2g_cache 21 · irtam_cache 37 · coeff 43 · irtamc_cache 32 · gate 19 · adapter 21 · grid_eval 13 bare · state 78 · lgdc 9 · provider 19); **grid_eval 37/37 oráculo**; TUs intactos (1 fichero); exe NO ejecutado (política 067). El «0 warnings GCC UCRT64 local» de la nota es consistente: la baseline 12 es del sandbox GLM.
11. **Capturas — PARCIAL, adjudicado (§5 D1/D2)**: B confirma el menú desplegado con los 10 items CON checks (§3); A = estado por defecto. La captura «≥1 panel oculto y reabierto» NO fue entregada (sustituida por A sin declarar el cambio de composición); tamaño A 1296×749 vs 1296×759 desvío DECLARADO.
12. **Anclas ✓**: inserciones verificadas — menú bar :3495 (tras `NewFrame()` :3492; nota ~3493), flags :196-199 (nota ~196), hoist :3689 (nota ~3689 EXACTO); re-pin §6.

## 3. Evidencia visual (VLM + píxeles)

- **B (1360×768)**: 2 lecturas VLM concordantes — menú «Ventana» con **10 items en el orden EXACTO declarado**. Los checks: el VLM los malleyó (7/10 incluso a zoom 3×; además confundió checkboxes de la ventana Layers de fondo con items del menú). **Análisis de píxeles de la columna de marcas** (`scripts/menu083_checks.py`): las 10 filas-ítem tienen contenido en la columna (30-46 px brillantes, patrón ✓) y los HUECOS entre items están vacíos (0-4 px, control) → **10/10 checks CONFIRMADO mecánicamente**. Lección registrada: las marcas de MenuItem a 1× están por debajo del límite de lectura VLM fiable — la verificación de checks por columna de píxeles queda como método.
- **A (1296×749)**: barra «Ventana» presente ✓; ventanas visibles consistentes con todo-visible (Ionosphere Live 3D, Layers con checkboxes Earth/Atmosphere/Stars/Terminator/3D relief/Storm swell/Outer shell, Space Weather, Radio Propagation, Circuit, Altitude, Timeline, Legend + escena 3D globo polar + envolvente). Enumeración VLM parcial (no nombra Sun/Limb x3 explícitos) — ruido de captura densa, no bloqueante.

## 4. Erratas de método GLM (4, corregidas antes de concluir — `scripts/menu083_verify.py`)

1. El parser del delta contaba la firma `-- ` del format-patch como línea borrada (104 vs 103).
2. La regex de MenuItem exigía `;` — la forma `if (MenuItem("Sun", …))` del kick quedó sin clasificar.
3. El censo de decl de flags exigía `bool X = true` por línea — las 9 flags comparten 3 líneas.
4. Esperaba sunVisible +2; el menú añade +3 (sunWasM + MenuItem + guard del kick).

## 5. Desvíos y observaciones (adjudicados)

- **D1 (DECLARADO) — tamaño PNG A 1296×749 en vez de 1296×759**: ACEPTADO. Causa raíz declarada: la pantalla (1360×768) no admite 759 de alto de cliente (788 outer); píxeles reales 1:1 sin escalado. Lo operativo de 046 §1 se mantiene (sin tEXt ✓). La convención de capturas queda «1296 × alto-de-cliente-máximo» para este display.
- **D2 (NO declarado) — composición de A**: el checklist pedía «estado con ≥1 panel oculto y reabierto»; A muestra el estado por defecto. NO BLOQUEANTE: la propiedad que esa captura debía evidenciar (izca viva con Layers oculto + simetría al reabrir) está probada POR ESTRUCTURA (§2.6/§2.7), más fuerte que una captura; el toggle es código evidente (flags envolven pares Begin/End). Residual visual opcional: si David quiere el cierre visual del ciclo ocultar→reabrir, que viaje con el próximo drop; si no, se renuncia.
- **D3 (NO declarado, forma) — árbol del master no anunciado**: la nota declara commit y pre-imagen pero no el árbol de `a25879b` full-40 (checklist p3 lo pedía). La vía P1 (delta O árbol) lo cubre — el fold cierra `4b32ee97` como imagen única del delta sobre la base certificada. Para próximos drops: **anunciar el árbol además del delta** (barato; elimina la asimetría de confianza).
- **D4 (auto-errata 082 §4.9)**: el paréntesis de orden del checklist era una lista suelta que no seguía el censo §3; el orden entregado == censo == nota 083. El checklist queda corregido por el censo.

## 6. Re-pin de anclas (base revertida `438b8c4e` → fold `4b32ee97`)

- **+4** (flags :196-199): ESC 1765→1769 · saveSettings 2327→2331 · loadSettings 2404→2408 · sunVisible decl 347→351 · pVisible 360→364 · NewFrame 3488→3492.
- **+27** (menú :3494-3516): `##cinehint` 3492→3519 · `##loading` 3504→3531 · **kick SDO menú NUEVO :3510**.
- **+28** (wrapper Main): Ionosphere Live 3D 3515→3543.
- **+132** (cierre Main :3684 + hoist izca :3689-3789 + wrapper Layers :3794): **bloque izca AHORA ANTES de Layers** — hitTest 3987→3703 · hovered 4041→3757 · mouseLeftPrev 4072→3788 · Begin Layers 3663→3795 · kick SDO original 3693→3825.
- **−100 +32** (borrado del bloque viejo dentro de Layers + wrappers): Viento solar sep 4075→4107 · Space Weather 4249→4283 · Radio Propagation 4372→4408 · Circuit 4513→4550 · TX/RX 4599→4636 · Legend 4625→4663 · Altitude 4719→4759 · Limb x3 4776→4817 · Timeline 4808→4850 · loBound 4829→4871 · Full 4862→4904 · modeLabel 4883→4925 · Loop 4895→4937.
- Anclas fuera de App.cpp SIN desplazamiento (SunPanel.cpp:22 etc. — 1 fichero tocado).

## 7. Ledger

- **Drop 083 PLEGADO Y APROBADO** — menú clásico entregado contra el checklist 082 §4, con la exigencia crítica (izca incondicional) verificada por estructura y los 10 checks confirmados por píxeles.
- **M-UI-tabs CERRADO por completo**: fase 1 (rail) entregada 076-079 y revertida por decisión 080; fase 2 resuelta como menú clásico superior (083). La UI vuelve a ventanas flotantes conmutables desde «Ventana» — la petición original de David, satisfecha sin mudanza de contenido.
- Espejo: cadena `779d21b3` → `1d834e40` → `7e26b31d` → `438b8c4e` → `4b32ee97`; 27 tags; sello S2 intacto. Scripts persistidos: `menu083_verify.py` · `menu083_barrier.sh` · `menu083_checks.py` (+ crop VLM) — cero aritmética mental.
- Residuales: D2 (cierre visual ocultar→reabrir, opcional) · D3 (anunciar árbol en próximos drops). Backlog sin cambios (O-030a, 2 inconsistencias de escala, retención tec_*.bin).
- A la espera de señal de David. La app puede cerrarse cuando quiera.
