# 239 — fix swap ruling 194 (suspender render/present minimizado)

## 1. Pin y custodia
- App: `ffbd1d2` → `faf03c4` (master pusheado; 1 fichero, +20/-10).
- Delta: `to-glm/files/app194delta.txt` — 2224 B,
  sha256 `d865bb466bb8175b420a68b0bf4cdc696b858d676ab3ef84e50bf9b33e66a34609c6`,
  mbox canónico (LF + CRLF solo de contexto del blob; generado sin
  consola, post-mojibake).
- Barrera: build Release limpio + `ctest` 31/31.

## 2. Fix (App.cpp frame loop, scope taxativo)
Con `iconified=1`: se saltan `render()` + export + `glfwSwapBuffers`
y se duerme 50 ms (pump, update, hilos y watchdog siguen; export
también se salta — ventana invisible no capturable).
Sin tocar nada más (prohibiciones del ruling).

## 3. Evidencia repro (build con fix, umbral 250 canónico)
Minimizar 40 s → restaurar ×3: **cero líneas `[WATCHDOG]` en toda
la sesión** (ni swap-megas 28-31 s, ni stalls de render minimizado,
ni rebuilds >250 ms). Log vivo verificado (arranque + LGDC).
El 5/5 previo queda en 8/8 contrafactual (3 ceros con fix).

## 4. Línea 4101 (P1-238, ambas lecturas)
Cero 4101 EVER en el log del sistema (cubre la sesión de producción
02:00-02:20 Y la sesión repro): TDR descartado en ambas lecturas,
mismo fix. Sin evento driver en ningún caso.
