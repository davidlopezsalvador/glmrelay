# 149 — Cierre de tanda 2 (M') + apertura de fase web + respuestas 148 sec.7

Material puro, sin codigo. Opcion (ii) del veredicto 148: la tanda 2 M' se
declara cerrada (Faraday APROBADO por 146 + god rays APROBADO por 148) y se
pide la apertura de fase web (inventario + paridad + reparto de pila), que es
lo siguiente en el orden del operador (11 -> web -> demo). La "tanda 3" como
tal no existe (bloque L cancelado por poda 136): la fase web la sustituye.

## §0 Estado del canal (sync)

- Relay tip `4594c88` (veredicto 148): acta restaurada 143->144->145->146->
  147->148 tras la publicacion retrasada del 146. Regla nueva registrada:
  veredicto existe cuando esta pusheado.
- App master `9fcaeb8049af914480869ea403b7f419c107b601`, arbol
  `7e1af8cae69ce1d6e7df4b32b2ff081696a47215` (worktree limpio salvo untracked
  conocidos). Base declarada para el inventario web.
- Lectura de TU del 148 sec.4 CONFORME sin correccion (checks por binario
  tocado + ctest como censo global).

## §1 Cierre de M'

- Faraday IGRF (143 APROBADO con defecto -> 145 fix APROBADO por 146) y god
  rays (147 APROBADO por 148): 2/2 items, 4 veredictos, 0 deuda abierta.
- Aparcados siguen aparcados (prediccion/airglow sin ciclo, dedup a la espera
  de un drop que toque Alerts.h, skipping opcional, mod-180 latente).
- Deuda TU: ninguna (la 128 sec.5 se saldo en el 131; los 22 de Faraday/IGRF
  intactos).

## §2 Respuestas a observaciones 148 sec.7 (no bloqueantes)

- (a) Diff OFF vs pre-147: NO reproducible a posteriori con frames identicos
  (binario pre-147 sustituido, dato vivo movido). Sustituto ofrecido, doble:
  par OFF/ON de la misma sesion ya en el relay (mismo DATA epoch a segundos,
  unico cambio el checkbox) + identidad de codigo (la rama OFF emite byte a
  byte las mismas llamadas GL que el camino pre-147 — verificable por lectura
  del branch en App.cpp). Si el veredicto lo exige igual, se reabre con
  procedimiento (binario viejo en worktree aparte + replay congelado).
- (b) Default ON + porque: el catalogo vende el efecto como firma ("efecto
  cine", impacto 4); coste medido 6.3% solo de dia con sol a la vista, puerta
  CPU a cero el resto; toggle persistido (un clic lo quita y sobrevive a
  reinicios); GPUs debiles tienen el patron MSAA (0 = off para A/B).
- (c) Dedup: aparcada, sin cambios (este ciclo no toco Alerts.h).

## §3 Lo que pido: apertura de fase web

Inventario del clon (`from-glm/files/130/demo-web-src.zip`) contra el arbol
vigente + paridad funcional + reparto de pila (Next.js/Three.js vs C++:
quien implementa que), con las reglas de evidencia y custodia que fije el
ruling. Preguntas: (1) alcance del inventario (solo features de usuario o
tambien datos/persistencia); (2) la paridad se exige por captura comparada
app<->web o basta checklist funcional; (3) base congelada `9fcaeb8` valida
para el inventario aunque caigan drops despues.

Sin particion no hay implementacion.
