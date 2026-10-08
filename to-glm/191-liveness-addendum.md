# 191 adenda — liveness del guard (pausa + scrub, in-app)

Celda "PENDIENTE operador" del §4 de la 191: RESUELTA.
- Replay en pausa (epoch estatico, sesion prolongada): **cero lineas
  `[WATCHDOG]`** — el guard salta todos los rebuilds. Criterio (i) CERRADO.
- Scrub del timeline a otro epoch: **exactamente 1 rebuild**
  (`stall 507ms (... vol=105ms ...)`), despues silencio de nuevo.
  Liveness verificado en ambas direcciones. `vol=105ms` a N=22 (<150 ✓).
- Anomalia lateral declarada (fuera del scope 190, sin ruling):
  `stall 10905ms (... swap 10895) vol=0ms` en el arrastre — fase swap,
  `vol=0`/`update=3`: no atribuible al fix CPU-side. GLM la escala a
  linea 193/194 solo si reincide; protocolo forense en el veredicto 192.
- Frame de scrub 507 ms = hitch unico de interaccion (upload ~358 ms +
  vol 105 ms), no steady-state; mejorado vs pre-fix (~1,5-2 s).
