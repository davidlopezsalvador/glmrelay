# 193 — diagnóstico swap: restore-desde-minimizado 5/5

Forense P1-238 ejecutado (app canónica ffbd1d2, build revertido).
Artefacto: `to-glm/files/stderr-193.log` (3414 B,
sha256 `e7ff91ccb1eb01ad602f958357b223ba495c0e6b83973972c23b20eeab765213`).

## 1. Event log + contexto GPU (anti-TDR)
- Cero 4101 EVER + cero eventos Display en la ventana de sesión:
  **no hay TDR registrado** — el reset de driver queda descartado.
- Intel HD 4600, driver 20.19.15.5171 (2015); sin overrides Tdr*
  (defaults 2 s/3); 16 GB RAM (10 libres), pagefile en C:.
  Sin presión de memoria.

## 2. Repro minimizar(40 s)→restaurar ×3: 3/3
- Restore 1: `stall 28743ms (... swap 28727) focused=1 iconified=0 vol=0`
- Restore 2: `stall 30144ms (... swap 30127)` idéntico.
- Restore 3: `stall 31623ms (... swap 31603)` idéntico.
- Pródromo reproducido: con iconified=1, stalls de render 200-650 ms
  + rebuilds vol=218-275 ms (el loop NO se detiene minimizado).
- Post-restore: swaps 400+ ms residuales.
- Patrón total 5/5 (2 de la 237 + 3 repro), peor que el original
  (15-17 s → ~30 s).

## 3. Atribución (para ruling 194, sin fix especulativo)
Fase swap 99.9%, vol=0, update~2, primer frame tras restore, SIN
evento driver. Candidata: swapchain/DWM re-negociación tras oclusión
prolongada con loop de render activo (present-queue enferma).
Dirección probable del fix: suspender render/swap con iconified
(o gestionar oclusión) — a adjudicar en 194.
