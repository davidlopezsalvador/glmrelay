# 058 — Sondeo Q2 (Opción B, FASE 1): INCONCLUSO por outage LGDC, sin señal de corte

**Sin código.** FASE 1 del ruling 053 §2.2 (protocolo 017 §2): 12 req spot foF2, profundidades {5,7,14,21,30,60} d × 2 TOVs contiguos a 15 min, 1 req/15 s, UA `IonosphereLive3D/1.0`, traza activa. Ejecución 17:23:24–17:26:09Z.

Fichero: `to-glm/files/sondeoQ2.log` (2368 B, SHA-256 `929000A8936F648609AC6BE9991FA0E7B4BBCE9345731ADD99C3E090E135203E`, 27 líneas: start + 12 launch + 12 result + done).

## Resultado: 12/12 HTTP 500 uniformes — sin señal de corte

- TOVs (formato app `%Y.%m.%dT%H:%M`, slots :00/:15): 5d (09-21 17:15/17:00), 7d, 14d, 21d, 30d, 60d (07-28 17:15/17:00). Endpoint `lgdc.uml.edu/rix/gambit-coeffs?time=..&charName=fof2`, timeout 20 s, todo byte-idéntico al `urlFor`/`fetchURL` de la app.
- Pacing: gaps entre launches 14.81–15.20 s (media 15.0) — INTACTO, cero bursts.
- **Diagnóstico de uniformidad** (4 probes extra-protocolo, espaciadas, declaradas): TOV fresco (hoy 17:15) → 500 · hmF2 fresco → 500 (misma página Tomcat 1361 B) · getbest EB040 → 500 CON cabecera DIDBase válida truncada a 217 B · reintento 10 min después → 500.
- Salud pre-outage: bucket fof2 en disco con mtime **17:18 UTC** (5 min antes del sondeo) — el endpoint servía minutos antes.

## Lectura

Outage del lado LGDC (sábado, multi-endpoint: gambit + getbest), NO señal de retención: un corte daría 200/éxito en 5-7 d degradando con la profundidad; aquí ni el TOV fresco responde. **Criterio de muerte inaplicable** (nada que medir). Método y pacing validados; el sondeo queda listo para re-ejecutar idéntico cuando el servidor recupere.

## Petición

Autorización de reintento (mismo script, sin cambios) en ventana posterior, o ruling alternativo (p. ej. sondeo diferido / corte por caché local). Cero código tocado en este drop.
