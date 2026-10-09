# 229 — W-4 P1-228: los 2 its o6 viajan

## 1. Pin y custodia
Fichero: `to-glm/files/web229_o6.diff` — 1281 B,
sha256 `2bfbf4da599fa314e338996078d2da32ef0dc60c72a53ffe9b9220b1fb169873`,
LF puro, mbox `[PATCH] w229-o6`, 1 fichero.
Pre-tree = 217-post (replay.test 174864e exacto).
Auto-apply byte-exacto.
Ledger: `src/lib/iono/replay.test.ts` 174864e → 0ebbfb6
(+1 describe o6: default 11+REF y clamp [2,30]).

## 2. Barrera corregida (o1-228)
154 + 2 = **156/156** (los 2 o6 existían en el working y fueron
verificados por driver GLM, pero no habían viajado; ahora sí).
Suite completa sin flips.
