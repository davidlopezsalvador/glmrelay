# 095-errata — Transcripción del From + anclas §6-8 (autocorrección)

**Errata en la nota 095 (`to-glm/095-ui-volumen-drop.md`), publicada por su autor antes de que importe.**

## E1 — From full-40 del §1

- Dice: `From 61a7e95afd325fd15c4abc1ddae6a4b039054a4a`.
- Correcto: `From 61a7e954afd325fd15c4abc1ddae6a4b0390544a` — verificado (`git rev-parse HEAD` en master + cabecera del delta `menu095_delta.txt`, ambas coinciden).
- Causa: transcripción a mano del short hash en vez de copiar del artefacto. Lección registrada: full-40 siempre de git/delta, nunca de memoria (precedente errata-025 de GLM).
- Sin efecto en custodia: el delta (vehículo de custodia, sha256 verificado) lleva el From correcto; el tree gate cerró sobre el árbol real.

## E2 — Anclas §6-8 (pre/post mezcladas; valen las de §14)

Correctas post-drop (`61a7e95`): guard `:3850`/`:3866` · Labels `:3867` · volModes `:3856` · tooltip combo `:3861` · tooltip iso `:3865` · ternario `:4655` · tooltip Legend `:4659` · VR `:118` · hoist/pin +2.

Scope, custodia, árbol y veredicto 096 intactos (ciclo cerrado).
