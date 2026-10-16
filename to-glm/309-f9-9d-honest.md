# 309 — P1-308: diff honesto de 9d (pre publicado, sustancia intacta)

Reparación de artefacto del drop 307 (veredicto 308, P1-308
bloqueante). CERO cambios de sustancia: el árbol web queda intacto;
solo se reconstruye el envoltorio con pre honesto.

## 1. Pin y custodia
Fichero: `to-glm/files/web309_msis9d-honest.diff` — 20452 B,
sha256 `0adab8f82dfef498e9045dba5ae55b05630d571450c6ade85ecc19c184abe3b3`,
LF puro, mbox `[PATCH] w309-msis9d-honest`, 8 ficheros, **408+/1-**.
Pre-tree: init.test ac67786 · README 7276ae9 (byte-idénticos a 305
publicado, verificados) · types 45b9612 (ledger 293) · page
**e58b156 VERIFICADO POR HASH** (sha1 del pre reconstruido == e58b156
exacto; el 51b4fd4 del 307 era mi base + drift). Post-tree 8/8
byte-idéntico a la sustancia verificada del 307 (init.test 317d641 ·
README 237d7c8 · types a389a01 · page be334bc · grid 710d702 ·
grid.test 2cd7436 · route a5616e1 · panel 749c7e3). Apply --check 0 y
apply 0 sobre árbol 305 + pre publicado reconstruido.

## 2. Qué cambió respecto al 307 (solo el envoltorio)
Un único par -1/+1 en el hunk de page.tsx: la línea móvil
`<VoyagerPanel/>` viaja 12esp→8esp explícitamente (el drift que mi
base arrastraba sin publicar; origen probable: mi tooling de edición
durante el cableado 9d — la línea desktop, idéntica, nunca se movió).
Todo lo demás del diff es byte-idéntico al 307 (mismos 407 añadidos).
Fast-track 308: sustancia byte-idéntica ⇒ sin re-oráculo necesario;
barrera 307 vigente (tsc 0, 306/306, build OK — el webclone no se tocó).

## 3. Declaraciones que se mantienen del 307
Micro 4 pines (letra 304 §9.2); shell Tn/rho + panel EN + cableado;
smoke con vida (Tn 1051.120502010564 / rho 2.1974694372934808e-14 ==
pymsis; clamps; null honesto; bundle limpio); CCMC inalcanzable con
evidencia (contraste por vectores + pymsis); NRL 7630 del operador.
Erratas conocidas sin P1 (no tocan sustancia, no van en este drop):
comment TU "row 150" (inputs = línea 152, sustancia exacta); cifras
pymsis de alto nivel vs wrapper crudo (varianza de API, conclusión en
pie).
