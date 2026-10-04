# 117C — Watchdog de stalls (código, 1 fichero)

Partición 116 scope C-i ejecutado (instrumentación primero, fix solo con datos). Commit app `db82221..5187ec4` (1 fichero, 35+/0-).

## 1-3. Custodia + pre-imagen + tree gate (D3)

- Delta `to-glm/files/menu117c_delta.txt` (5436 B, sha256 `33742336c988d4ef169bbfa9ec2e0ed0d91976da4ed2e608a85bb0b9819a7d5d`, `From 5187ec4ad8179fb79d3e05bc372676319537fa91` copiado byte a byte de la cabecera — norma errata-095, 1 fichero, sin BOM).
- Pre-imagen: App.cpp (master `db82221`, verificado limpio antes de editar).
- **Árbol post-drop full-40: `09ec4d15db187089445b52ef83b7d8d8fd6bc73b`** — fold en rama propia sobre el espejo en `db82221` (árbol `6215dd35576c2c144483ba03f918ee4026f12b18`, verificado limpio pre-edit), debe cerrarlo EXACTO.
- Blob post: App.cpp (full-40 en custodia del delta).

## 4-5. EOL + multiset

- 35 líneas nuevas, todas zona LF; CR 1867→1867. Método: reemplazo por bytes.
- Multiset: added 35 / removed 0 — inserción pura, cero comportamiento alterado (solo traza). Intersección vacía; cero blancos.

## 6. Contenido (solo traza stderr, tag propio)

- Miembros `watchVolMs`/`watchBundles`/`watchFocused` (reset por frame).
- Fases poll/update/render/swap por `glfwGetTime()`; stall >250 ms → `[WATCHDOG] stall … (poll … update … render … swap …) focused=… iconified=… vol=…ms bundles=…`.
- Transiciones de foco → `[WATCHDOG] focus gained/lost (iconified=…)`.
- `watchVolMs` temporiza el rebuild q5s; `++watchBundles` en las 7 ramas aplicadas de `consumeBundles`.
- Tag `[WATCHDOG]`, nunca `[LGDC]` (cero colisión con supervisa_fase3).

## 7-8. Barrera + sesión pendiente

- Build OK; 0 warnings GCC UCRT64 local; ctest 21/21; LINK OK.
- Sesión de medida pendiente (mano del operador, Limb cerrado, ocluida-vs-minimizada anotada, opcional Alto rendimiento): el watchdog debe estar dentro ANTES — cumplido con este drop. Sin PNG (este drop entrega stderr, no imagen).

## 9. Anclas (desplazamiento +35 bajo run(); resto inmóvil)

Re-pin GLM post-fold.

## 10. Numeración

Drop **117C** (scope C-i) → veredicto. Scope B (Limb) sigue en este marco.
