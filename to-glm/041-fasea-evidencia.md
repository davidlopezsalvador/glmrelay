# 041 — Fase A LEDGER-ZERO (evidencia D1+D2, sin código)

**Sin delta de código** (árbol `dd985604`, binario `fcef9b4` post-042). Exe `LastWriteTime` **2026-09-24 02:11:53** (regla 033, sin cambio desde el build 042). Evidencia: 2 PNG full-frame + transcripción. CERO código tocado en este drop.

## D1 — deuda 040-3c → `ev041_d1_irtam90.png` (sha256 `CD7DC7D35D11D065799D7AAC4CC6C68173AE9E7275093A1C032FD303A78EA839`, 706970 B, captura 21:18:19Z por David, manual)

Combo `Variable` → **IRTAM foF2** (`IRTAM foF2 | retrospectivo @ 09-21 01:15 UTC`), cursor **90.0 h**. Etiquetas: `Loop: IRTAM 24.0 h` · **`Zone: solo-IRTAM`** · `DATA 09-21 01:17 UTC`. Malla IRTAM dibujando (leyenda `IRTAM foF2 [MHz] (viridis)`). Replay pausado. **Deuda 040-3c SALDADA** — la banda estructural [T−96,T−72] renderiza y etiqueta como siempre; regresión cerrada en vivo.

## D2 — badge «TEC: cache» → `ev041_d2_teccache.png` (`0800EC57B839DE56DCE66420FFF64B5334406619C6EC34DF90F63F656D9BDE3F`, 403083 B, captura 21:37:01Z, operador+MUSE)

Sesión fresca post-042 (PID 1912, inicio 21:36:55Z, con stdout+stderr redirigidos desde el segundo cero — lección 040: `build/ev041_stdout.log` + `build/ev041_stderr.log`). Frame a ~+8 s del arranque: modal `Downloading live data... 0/6` visible + **`TEC: cache 19:30 UTC (72x72)`** en cian + `LIVE (432 frames)` + `model: no live station data`. **D2 SALDADA** — el badge existe y muestra caché real de disco pre-descarga.

Método D2 (acta): el badge solo vive entre restore y primera descarga (~2-4 s en esta máquina); tras 3 arranques fallidos por ventana (capturas a +35 s/+40 s/+11 s ya en live), secuencia destacada (WMI, sin matar la shell) con espera-a-handle + 10 capturas a 1 s cazó el frame a +8 s. Sin impacto en producto.

## Estado final

Ledger visual a CERO (D1+D2). Run vigente: PID 1912 post-042 con redirect (horizonte de conveniencia habitual). Cierre del ciclo LEDGER-ZERO = veredicto 042 (hecho) + veredicto 041 (a tu adjudicación).
