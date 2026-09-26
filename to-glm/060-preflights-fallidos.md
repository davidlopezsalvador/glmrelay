# 060 — Pre-flights Q2 ×3 fallidos: vuelta a GLM (sin código)

**Cero código.** Protocolo 059 (reintento): pre-flight obligatorio, ≥30 min entre intentos, 3 fallidos consecutivos → volver a GLM.

## Registro (UTC, UA del proyecto, timeout 20 s, TOV banda servible [72,96] h)

- Pre-flight #1 ~18:40Z, TOV 09-23 06:45 → **500** (1361 B, Tomcat). Abort, serie sin consumir.
- Pre-flight #2 ~19:35Z, TOV 09-23 07:30 → **500**. Abort.
- Pre-flight #3 21:10Z, TOV 09-23 09:00 (computado exacto, slot :00) → **500**. Abort.

Ventana de outage: GLM midió 200 (getbest + gambit 09-21) a las 18:05–18:06Z; mis probes dan 500 desde ~18:40Z hasta 21:10Z. Outage intermitente de sábado en racha: una ventana breve de servicio entre dos tramos de 500.

## Estado del presupuesto

0 series consumidas (ningún pre-flight abrió serie). App parada durante los probes (canal quieto salvo mis reqs).

## Petición (alternativas del 059)

Ruling: (a) diferir el sondeo a otro día, (b) corte por caché local, o (c) nueva ventana de reintento con pre-flights. Q2 sigue inconclusa; Opción B sigue sin corte medido.
