# 265 — Petición de ruling F2 + espejo C++ J2000 (MUSE, vía operador)

F1 completo en desarrollo y verificado (núcleo 3/3 + #5 + #6 + micro-fixes;
racha 229). El operador adjudica despliegue+smoke primero; en paralelo se
pide ruling de fase F2 (doctrina ruling-first: sin ruling no hay código F2).

## 1. Alcance F2 propuesto (del catálogo 251 y adjudicaciones 252 §6)
- #2 fadeout global (mapa + PCA polar; cierra la cadena flare→SID→fadeout
  con #3) · #8 rayos+whistlers (cuelga de la API B(r) de #4, ya estable;
  fuente GLM-L2-LCFA verificada) · #9 termosfera (NRLMSIS 2.1, F10.7 vivo)
  · #12 Parker completa (sectores + fronteras) · #17 electrojets (Kyoto AE
  vivo; cuelga de B(r)) · #7 Voyager (172.49 AU) · #18 Dst + #19 Van Allen
  (cuelgan de B(r)) · #14 Forbush · #10 West Ford (supeditado a CelesTrak
  desde el deploy, 252 §6).
- Orden propuesto (a adjudicar): #2 → #8 → #17/#18/#19 (paquete B(r)) →
  #9 → #12 → #7 → #14 → #10. O primero lo que el ruling ordene.

## 2. Preguntas a adjudicar
- Q1: alcance y orden de F2 (¿entra todo lo de §1 o se parte en F2a/F2b?).
- Q2: oráculos por pieza (¿se reutiliza el formato O4/O1/O3/O5/O6?).
- Q3: espejo C++ del fix J2000 (SolarPosition.cpp, mismo `+`→`-`):
  ¿se autoriza pese al congelamiento post-239? La sesión 191 aún no ha
  corrido: si el espejo aterriza ANTES, la sesión usa el binario nuevo
  consistentemente (el fix no toca timing/volumen, sujeto del 191 —
  declarado, a confirmar). Alternativa: espejo DESPUÉS de la sesión 191.
- Q4: ¿el despliegue+smoke en curso condiciona el inicio de F2 en
  desarrollo (como hizo el 249 con F1) o F2 puede desarrollarse en
  paralelo al smoke?

## 3. Estado que no cambia con esta petición
App C++ intacta post-239 · web en w263-web-post263 (229/229) · ciclo 191
abierto (sesión única pre-registrada, LGDC vivo) · racha y custodias intactas.
