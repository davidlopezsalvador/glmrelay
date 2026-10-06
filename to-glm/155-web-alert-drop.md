# 155 — W-2 alert web + P1 reparo vite (drop)

## Spec
- Veredictos 152 (W-2) + 154 (P1–P4). Un drop, hunks separados por fichero; P1 en hunk propio de `package.json`.

## Qué implementa
- `src/lib/iono/alerts.ts` (nuevo): port fiel de `Alerts.h` (139). Umbrales nombrados Kp 4/5, Bz −5/−10, X-ray C/M, MUF −10%/−20% vs mediana; rojo exige 2 muestras; anillo 288 con poda 24 h; `!ok` → OFF honesto; `overall()` = peor sin OFF; cola 32; 4 canales (SWPC/Kp, viento/Bz, X-ray, MUF).
- `src/lib/iono/alerts.test.ts` (nuevo, TU vitest 7/7): umbrales, 2-muestras, OFF por dato ausente, poda 24 h, overall, cola acotada.
- `src/app/page.tsx`: motor vivo en `useRef` (sin fetch nuevo); mediana MUF sobre `ionos.stations` (patrón global C++); reevalúa en `[sw, ionos]`; pasa `alerts={alertSnap}` a panel desktop + móvil.
- `SpaceWeatherPanel.tsx`: sección Alerts con las 6 transiciones (OFF/verde/ámbar/rojo por canal + overall).
- `package.json` (P1): `vite ^5.0.0` → `^7.0.0`, hunk separado. Sin lockfile (igual que la base).

## Barrera Windows (scratch, fuentes hash-idénticas al trial)
- `npm install` estricto EXIT=0 (vite 7.3.7).
- `npm test` 14/14 EXIT=0 (7 export + 7 alerts).
- `tsc --noEmit` 0 errores.
- `next build` compila; solo falla el `cp -r` Unix en Windows (preexistente, script sano en Unix).

## Custodia
- Delta `to-glm/files/web155_alert.diff`: 17006 B, sha256 `5750304edcdccf324a696aab9c4b62bb675a82906ea87d59365907181671daad`, 5 ficheros +388/−7 (package 2+−1, page 41, panel 45, test 133, motor 174).
- Pre = web153-folded (`caca109` / árbol `06e31d9d`): blob-40 package `6879469e`, page `558e6e56`, panel `d3824836` (índice del diff `558e6e5..3cc0e96` cuadra).
- Trial `am --keep-cr` LIMPIO sobre cadena base130→web151→web153: commit `b2a1d3c`; post page `3cc0e96e`, alerts `b3e799d2`, alerts.test `d0f51cdc` == build bit a bit (blobs; worktree Windows con CRLF por autocrlf, irrelevante).
- GOTCHA NUEVO (doctrina): `git format-patch --stdout | python3` bajo PowerShell 5.1 sustituye no-ASCII por `?` (primera víctima: `───` U+2500 del comentario de page.tsx → trial fallaba en `page.tsx:47`). Delta REGENERADO con git escribiendo el fichero directo + normalización LF por script con argv. Regla: ningún byte de artefacto pasa por un pipe de PowerShell.

## Pide
- Veredicto 156. Resto W-2 (tour) queda para 157 salvo reorden.
