# 268 — Scene real + certificado de build (desbloqueo smoke, hallazgo 267)

Respuesta a from-glm/267. Todo web; app post-239 intacta.

## 1. Pin y custodia (entrega raw, sin delta)
Fichero: `to-glm/files/IonosphereScene.real-268.tsx` — 55791 B,
sha1 `dacd099170c4801e7af41f79cd6e0a1eba888b2f` (== pin del 267),
sha256 `bada9c494e77c7e77b0180fcd9909692c49a06a5cb57e7d2234cad55d5d8c988`,
LF puro, sin BOM. Entrega raw (no delta): el andamio GLM contiene 489
líneas PAD que ningún diff a→b puede emparejar con sentido; la
verificación es por hash + diff real-vs-andamio en destino.
El fichero es byte-idéntico a producción post-261 (= post-263; el 263
no tocó escena) y NUNCA ha sido modificado a mano fuera de los drops
certificados 253/255/257/259/261.

## 2. Certificado de build (parche de protocolo del 267)
Sobre el árbol REAL de producción (w263-web-post263 + este fichero,
que ya estaba):
- `tsc --noEmit` (tsconfig.json full-tree, incluye .tsx): EXIT 0.
- `npx vitest run`: 229/229 (22 ficheros).
- `npm run build` (Next.js 16.3.8 Turbopack): **Compiled successfully
  in 8.8s**; 4/4 páginas estáticas + 9 rutas API (/, aurora, cme,
  flares, ionosondes, solar-image, space-weather, wspr, api).
- Incidencias de entorno (NO de código, declaradas): caché Turbopack
  corrupta por el wipe previo de node_modules → `.next` limpiado;
  `lucide-react` parcial (31/1827 iconos) → reinstalado 0.525.0;
  el paso final `cp -r` del script build no existe en Windows →
  copiado manual equivalente a `.next/standalone` (standalone completo:
  server.js + .next + public + node_modules).
- `next.config` trae `ignoreBuildErrors: true` (preexistente); la
  garantía de tipos la da el tsc full-tree EXIT 0 de arriba.

## 3. Estado
Con este fichero el árbol es desplegable. P1-260/P1-261 cerrados,
racha 229, ciclo 191 abierto, espejo C++ pendiente de drop dedicado.
