// w320 — Bench INDEPENDIENTE GLM de las mediciones de la nota 319 §Recon:
//   (1) twoline2rv (parse+unidades+jd+sgp4init) x15.927 == "sgp4init x15927" de MUSE
//       declarado 457,5 ms / 28,7 us/sat / 0 errores
//   (2) barrido sgp4 completo en caliente == declarado 31,8-40,0 ms / 2,0-2,5 us/sat / 0 errores
//       a tsince 0, +30 y -30 min
//   (3) derivados de diseno: sats por rodaja de 3 ms; staleness km y unidades de escena
//       (1 u. escena = 1 R_T = 6.371 km, convencion latLonToVec3(1 + alt/6371))
// Motor: Node V8 (bundle con bun build --target=node) — misma clase de motor que MUSE.
// Cero reutilizacion: MUSE no adjunto bench; la orquestacion (lectura, emparejado 3-linea,
// fases, cronometraje) es propia y solo llama a las primitivas verificadas en 314.
import { twoline2rv } from "./src/lib/iono/sgp4/sgpTle";
import { sgp4 } from "./src/lib/iono/sgp4/sgp4";
import { readFileSync } from "node:fs";

const SNAPSHOT =
  "/home/z/my-project/verify253/scratch-barrier/src/lib/iono/satellites/active-2026-10-17.tle";

// ---- carga y emparejado 3-linea (nombre + TLE1 + TLE2) — propio ----
const raw = readFileSync(SNAPSHOT, "utf8");
const lines = raw.split("\n").filter((l) => l.length > 0);
if (lines.length % 3 !== 0) {
  console.error(`FATAL: ${lines.length} lineas no multiplo de 3`);
  process.exit(1);
}
const n = lines.length / 3;
const l1s: string[] = [];
const l2s: string[] = [];
for (let i = 0; i < n; i++) {
  l1s.push(lines[3 * i + 1]);
  l2s.push(lines[3 * i + 2]);
}
console.log(`records: ${n} (lineas ${lines.length})`);

// ---- fase A: init en frio (unico, como hara el cliente) ----
type Sat = ReturnType<typeof twoline2rv>["satrec"];
const satrecs: Sat[] = [];
let initErr = 0;
const errs: string[] = [];
const tA0 = performance.now();
for (let i = 0; i < n; i++) {
  try {
    satrecs.push(twoline2rv(l1s[i], l2s[i], "wgs72", "a", { strict: true }).satrec);
  } catch (e) {
    initErr++;
    if (errs.length < 5) errs.push(`${i}: ${(e as Error).message}`);
  }
}
const tA = performance.now() - tA0;
console.log(
  `init FRIO: ${tA.toFixed(1)} ms total = ${(tA * 1000 / n).toFixed(1)} us/sat (errores ${initErr}/${n})`,
);

// ---- fase A2: init en caliente (re-init completo, codigo ya JIT) ----
const tA2_0 = performance.now();
for (let i = 0; i < n; i++) {
  try {
    twoline2rv(l1s[i], l2s[i], "wgs72", "a", { strict: true });
  } catch {
    /* contado arriba */
  }
}
const tA2 = performance.now() - tA2_0;
console.log(
  `init CALIENTE: ${tA2.toFixed(1)} ms total = ${(tA2 * 1000 / n).toFixed(1)} us/sat`,
);

// ---- fase B: barridos sgp4 completos a tsince 0, +30, -30 min ----
const r = [0, 0, 0];
const v = [0, 0, 0];
function sweep(tsince: number): { ms: number; err: number; maxSpeed: number } {
  let err = 0;
  let maxSpeed = 0;
  const t0 = performance.now();
  for (let i = 0; i < satrecs.length; i++) {
    const ok = sgp4(satrecs[i], tsince, r, v);
    if (!ok) err++;
    else if (v[0] * v[0] + v[1] * v[1] + v[2] * v[2] > maxSpeed)
      maxSpeed = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
  }
  return { ms: performance.now() - t0, err, maxSpeed: Math.sqrt(maxSpeed) };
}
// calentamiento: 2 barridos descartados
sweep(0);
sweep(0);
const first = sweep(0); // primer barrido contado (post-calentamiento ligero)
const results: { ts: number; ms: number; err: number }[] = [];
for (let k = 0; k < 10; k++) {
  for (const ts of [0, 30, -30]) {
    const s = sweep(ts);
    results.push({ ts, ms: s.ms, err: s.err });
  }
}
const warm = results.map((x) => x.ms).sort((a, b) => a - b);
const totErr = results.reduce((a, x) => a + x.err, 0);
console.log(
  `barrido PRIMERO (post-2 warmup): ${first.ms.toFixed(1)} ms (err ${first.err})`,
);
console.log(
  `barridos CALIENTES x30 (10x {0,+30,-30}): min ${warm[0].toFixed(1)} / med ${warm[15].toFixed(1)} / max ${warm[29].toFixed(1)} ms — errores totales ${totErr}`,
);
const usPerSat = (warm[15] * 1000) / n;
console.log(`  => mediana ${(usPerSat).toFixed(2)} us/sat`);

// ---- fase C: derivados de diseno (aritmetica del ruling) ----
// v del port en km/s (314: AbsVel verificada vs corpus .e en km/s)
const satsPerSlice = Math.floor(3000 / usPerSat);
const sweepFrames = Math.ceil(n / satsPerSlice);
const sweepWall = (sweepFrames * 16.67) / 1000; // s a 60 fps
const maxSpeedKmS = Math.max(
  sweep(0).maxSpeed,
  sweep(30).maxSpeed,
  sweep(-30).maxSpeed,
); // km/s — SIN /60 (314 verifico km/s)
const staleKm = sweepWall * maxSpeedKmS;
const staleUnits = staleKm / 6371;
console.log(
  `staleness barrido continuo: ${staleKm.toFixed(2)} km = ${staleUnits.toFixed(5)} u. escena = ${(staleUnits * 300).toFixed(2)} px a 300 px/R_T (MUSE decl <=2 km ~0,0003 u.)`,
);
const cadKm = 0.535 * maxSpeedKmS;
console.log(
  `staleness con cadencia >=0,5 s (ruling): ${cadKm.toFixed(1)} km = ${(cadKm / 6371).toFixed(5)} u. = ${((cadKm / 6371) * 300).toFixed(2)} px`,
);
console.log("--- derivados ---");
console.log(`sats por rodaja de 3 ms: ~${satsPerSlice} (MUSE decl ~1200)`);
console.log(
  `barrido completo: ${sweepFrames} frames ~= ${sweepWall.toFixed(2)} s a 60 fps (MUSE decl 0,2-0,3 s)`,
);
console.log(
  `vel max observada: ${maxSpeedKmS.toFixed(2)} km/s (esperada ~7,7 LEO / ~9,6-10 GTO perigeo)`,
);

// ---- fase D: sanidad ISS (25544) — |r| TEME independiente del marco ----
const issIdx = l1s.findIndex((l) => l.substring(2, 7) === "25544");
if (issIdx >= 0) {
  const ok = sgp4(satrecs[issIdx], 0, r, v);
  const alt = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]) - 6371;
  console.log(`sanidad ISS 25544: sgp4 ok=${ok} alt geocentrica ${alt.toFixed(1)} km (esperada ~380-470)`);
} else {
  console.log("sanidad ISS: NO ENCONTRADO");
}
console.log("BENCH320 OK");
