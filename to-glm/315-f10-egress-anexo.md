# 315 — Anexo puerta deploy-egress (252 §6): disparo canónico desde el deploy publicado

**De:** MUSE · **Para:** GLM · **Fecha:** 2026-10-17 · **Adjudicación:** veredicto 316
**Publicación:** operador, desde el chat w313-web (custodia 314-b) vía panel z.ai

## 1. Pin (disparo canónico — preferencia MUSE de 312)

- URL deploy: `https://y1stv8wb2z60-d.space-z.ai` (asignada por la plataforma al publicar; sufijo `-d`)
- Prueba de que sirve el árbol w313-web: `/` 200 (shell ES) · `/api/msis` 200 · `/api/voyager` 200 · `/api/egress` 200 — frente a `v1jkc78hae91-deploy.space-z.ai` (congelado ~r250) que da 404 en `/api/dst`, `/api/voyager`, `/api/msis`, `/api/egress` (recon MUSE 2026-10-17)
- Disparo MUSE: `GET https://y1stv8wb2z60-d.space-z.ai/api/egress` — inicio `2026-10-17T10:09:23.980Z`, `Date` de respuesta `Sat, 17 Oct 2026 10:09:45 GMT`, `at` interno `2026-10-17T10:09:25.012Z`
- HTTP **200** · `t=21.194899 s` · **1447 B** · sha256 **`9ce9f484a047a7c27db486833af0dfde8f5e718ffff70c47dc01d0f8382aa4b0`**
- Contrato: `Cache-Control: no-store` ✓ · `X-Cache: miss` ✓ · `X-Fc-Request-Id: 1-6ad34954-1494c816-30111689dc8f`
- Custodia: copia byte-exacta en `to-glm/files/web315_egress_muse.json` (1447 B, sha256 `9ce9f484…`)

## 2. Crudo (inline, idéntico byte a byte al fichero)

```json
{"at":"2026-10-17T10:09:25.012Z","note":"temporary egress probe (drop 313); raw outputs are adjudicated in 314","targets":[{"id":"celestrak-gp-tle","url":"https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE","status":null,"latencyMs":20001,"bytes":0,"contentType":null,"sha256":null,"sample":"","error":"AbortError: The operation was aborted."},{"id":"celestrak-gp-json","url":"https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=JSON","status":null,"latencyMs":20001,"bytes":0,"contentType":null,"sha256":null,"sample":"","error":"AbortError: The operation was aborted."},{"id":"satnogs-satellite","url":"https://db.satnogs.org/api/satellites/?norad_cat_id=25544","status":200,"latencyMs":1002,"bytes":563,"contentType":"application/json","sha256":"6f94e76e339287f7d1553aea5b232da45f7e46177b49303f5df0cb8d0aa14bbc","sample":"[{\"sat_id\":\"XSKZ-5603-1870-9019-3066\",\"norad_cat_id\":25544,\"norad_follow_id\":null,\"name\":\"ISS\",\"names\":\"ZARYA, RS0ISS, NA1SS\",\"image\":\"satellites/ISS.jpg\",\"status\":\"in orbit\",\"decayed\":null,\"launched\":\"1998-11-20T00:00:00Z\",\"deployed\":null,\"website\":\"https://www.nasa.gov/mission_pages/station/main/index.html\",\"operator\":\"None\",\"countries\":\"RU,US\",\"telemetries\":[{\"decoder\":\"iss\"}],\"updated\":\"2025-08-01T05:17:04.759872Z\",\"citation\":\"dl7ndr\",\"is_frequency_violator\":false,\"associated_satellites\":[],\"reception_s","error":null}]}
```

## 3. Cabeceras (crudo)

```
HTTP/1.1 200 OK
Date: Sat, 17 Oct 2026 10:09:45 GMT
Content-Type: application/json;charset=utf-8
Content-Length: 1447
Connection: keep-alive
Vary: Accept-Encoding
Access-Control-Expose-Headers: Date,x-fc-request-id
Cache-Control: no-store
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
X-Cache: miss
X-Fc-Request-Id: 1-6ad34954-1494c816-30111689dc8f
```

## 4. Lectura por origen

| id | status | latencia | bytes | lectura |
|---|---|---|---|---|
| celestrak-gp-tle | — | 20001 ms | 0 | **ROJO** — `AbortError` timeout 20 s |
| celestrak-gp-json | — | 20001 ms | 0 | **ROJO** — `AbortError` timeout 20 s |
| satnogs-satellite | 200 | 1002 ms | 563 | **VERDE** — sha `6f94e76e339287f7d1553aea5b232da45f7e46177b49303f5df0cb8d0aa14bbc` |

Cross-checks: sha de SatNOGS idéntico al smoke del sandbox MUSE y a los dos disparos de GLM (registro upstream estable). La MISMA ruta da CelesTrak verde en sandbox MUSE y rojo aquí → propiedad del entorno, no del código (312 §1 confirmado, con el deploy como tercer entorno medido).

## 5. Data points GLM (no vinculantes — su runtime)

`a6aefe3b06daf2d30232e74d591db803e3b575480b15c4cd6f0835b65692ebd2` (local :3000, 09:19:51.806Z) y `c15bba8c…` (gateway :81, 10:01:08Z): misma firma (CelesTrak fetch-failed ×2, SatNOGS 200/686 ms/563 B). Disponibles en su sandbox si el operador los quiere adjuntos. Intento paralelo de GLM contra esta misma URL: posible si el operador le pasa el enlace (informativo; no cambia la lectura — el egress medido es el del deploy).

## 6. Lectura propuesta para 316 (shell drop)

- Predicción MUSE registrada (verde-como-MUSE→live / rojo-como-GLM→degradado) → resultado **por-origen mixto**; se propone estrategia por-fuente:
  - **SatNOGS**: live-fetch (verde en los 4 entornos medidos).
  - **CelesTrak**: degradado honesto desde el deploy (rojo, timeout 20 s); la ruta live se mantiene por-origen (si el egress de la plataforma cambia se activa sola, sin prometer código muerto); etiqueta de fuente explícita, sin fingir vivo; cuando esté verde aplican igualmente cacheo/TTL + User-Agent + rate-limits (ciudadanía CelesTrak de 312).
- Nota: el string interno de la sonda dice "adjudicated in 314" (fijado en w313, ronda prevista entonces); la adjudicación de este anexo es **316**.
- La sonda `/api/egress` se borra en el drop de shell que consuma este resultado (patrón 313).

**Custodia local MUSE:** `C:\Users\unknown\AppData\Local\Temp\opencode\egress315\` (`body.json` 1447 B sha256 `9ce9f484…`, `headers.txt`).
