# 311 — Petición mini-ruling #10 West Ford (precedente 299)

F2b #9 CERRADO (310). Siguiente en el orden 288: #10 West Ford,
supeditado a prueba CelesTrak (252 §6). Esta petición trae la prueba
de sandbox + propuesta de alcance/oráculo. Sin código (ruling-first).

## Q0. La precondición de sandbox YA NO SE CUMPLE (medido hoy)
252 §6 bloqueaba por "timeout en ambos dominios" desde el sandbox.
Sondeos de hoy (evidencia abajo): CelesTrak responde HTTP 200 en
~1-2.5 s tanto en GP-TLE como en GP-JSON. El bloqueo de entonces ha
desaparecido al menos desde aquí. **Lo que SIGUE pendiente es la prueba
DESDE EL DEPLOY** (puerta 252 §6 literal) — fuera de mi alcance:
pregunto quién la corre (¿GLM/operador directo, o la incluyo como
primer paso de aceptación del drop #10 con patrón voyager?).

Evidencia sandbox 2026-10-17 (íntegra, sin recortes):
- `gp.php?CATNR=25544&FORMAT=TLE` → HTTP 200, 168 B, 2.5 s:
  `ISS (ZARYA)` + líneas 1/2 TLE (`1 25544U 98067A ...`,
  `2 25544 51.6321 59.6041 ... 15.48895000590566`).
- `gp.php?GROUP=stations&FORMAT=JSON` → HTTP 200, 8852 B, 0.77 s:
  21 satélites, el primero `ISS (ZARYA) 25544`, con elementos
  keplerianos parseados (EPOCH, MEAN_MOTION, ECCENTRICITY,
  INCLINATION, RA_OF_ASC_NODE, ARG_OF_PERICENTER, MEAN_ANOMALY,
  BSTAR, drag) — sin TLE crudo pero con todo lo necesario para
  propagación.
- SatNOGS `db.satnogs.org/api/satellites/?norad_cat_id=25544` →
  HTTP 200, 563 B, 0.23 s: registro ISS real (`norad_cat_id 25544`,
  `status in orbit`). Fallback 252 §6 vigente y vivo.

## Q1. Alcance propuesto (catálogo 251 §10, sin cambios)
Historia 1963 declarada (anillo J2+presión-radiación determinista,
time-lapse honesto) + eco 2026 con TLE reales (>10 000 objetos;
fuente: CelesTrak, fallback SatNOGS). Pregunta: ¿se mantiene el
diseño 251 (anillo dorado + fundido a 2026) o se recorta (p.ej. solo
cinturón actual sin modo historia)?

## Q2. Adquisición y motor TLE (pieza nueva, sin precedente en el repo)
No hay SGP4/TLE en el árbol (verificado: solo three.js). Opciones:
(a) port propio mínimo (parse TLE + J2 secular analítico para el
anillo; SGP4 completo solo si el oráculo lo exige); (b) dependencia
`satellite.js` (MIT, probada); (c) solo-analítico sin SGP4 (los
objetos 2026 como puntos keplerianos de 2 cuerpos + J2). Pregunto
cuál autoriza el ruling y con qué oráculo (¿TLE checksum + efemérides
pymsis/sgp4 de contraste? ¿tolerancias?).

## Q3. Oráculo y criterios de aceptación
Propuesta: (i) prueba deploy-egress (patrón voyager: fetch servidor
con timeout + X-Cache miss como evidencia) como puerta PREVIA;
(ii) TLE checksum línea a línea (oráculo incorporado al formato);
(iii) propagación cruzada contra efemérides de referencia (¿pymsis/
skyfield del lado GLM?); (iv) cero curvas inventadas (anillo 1963
DECLARADO como reconstrucción, 2026 solo con dato vivo o fallback
honesto). ¿Se acepta o se ajusta?

## Q4. Licencia y datos
TLE CelesTrak (dominio público US gov), SatNOGS (atribución según su
API), reconstrucción 1963 declarada. Sin NRL-SOF niApellido comercial.
¿Alguna objeción o aviso adicional requerido?
