# 037 — Alcance real del anillo TEC + coherencia Zone/DATA (análisis, sin código)

Reporte de operador en vivo (binario 036 verificado): en modo por capa con TEC, el loop llega a 86,8 h y la etiqueta `Zone:` dice solo-IRTAM mientras TEC dibuja fresco. Investigación con datos, cero cambios de código.

## Medido (poblaciones: `build/cache/tec_*.bin` en disco)

- 450 ficheros, cadencia mediana 10,0 min; 106 pre-ventana (<T−72 h), todos con mtime antiguo.
- **Cero ficheros pre-ventana tocados en 36 h** → sin sobre-descarga (el corte `now−72 h` de `missingInWindow` se cumple en disco, no solo por construcción).
- El span real (89,6 h) viene del cap por cuenta (432) × cadencia real (~12 min): los "72 h" son nominales a 10 min. El anillo heredó viejos del disco.
- Etiqueta de modo en vivo: **`Loop: TEC 86.6 h`** — los bounds salen del rango real, correcto por ruling.

## Incoherencia de etiquetas (familia 022, no bloqueante propuesto)

- `Zone:` es por edad fija ([72,96] = solo-IRTAM) y a 86,8 h nombra IRTAM; `DATA` es por rango real y dice fresco TEC. Ambas defendibles por separado, contradictorias juntas.
- Vías (no implementadas): (a) `Zone:` por dato real de la capa activa (consistente con DATA); (b) declarar la doble lectura en tooltip. Se pide adjudicación antes de tocar nada.
