#!/usr/bin/env bash
# ============================================================================
# Probe GLM 061 — estado LGDC tras 3 pre-flights fallidos de Muse (drop 060)
#
# Contexto: outage sabado multi-endpoint; 059 P2/P3/P4 midieron 200 a las
# 18:05-18:06Z; pre-flights de Muse 500 a 18:40/19:35/21:10Z. Este set decide
# el ruling (diferir / corte por cache local / nueva ventana).
#
# Set (espejo 059 + frontera 7 d, TOVs con precedente o del sondeo anulada):
#   Q1 getbest EB040 (CSV de la app)      [== 059 P2, health cross-check]
#   Q2 gambit foF2 TOV 2026.09.23T15:26   [== 059 P4, banda [72,96] h, == pre-flight #0]
#   Q3 gambit foF2 TOV 2026.09.21T17:15   [== 059 P3 == sondeo req #1, 5 d]
#   Q4 gambit foF2 TOV 2026.09.19T17:15   [== sondeo req #3, 7 d — frontera muerte,
#                                          NUNCA probada con servidor sano]
#
# Metodo: UA del proyecto, timeouts de la app, espaciado 15 s, timestamp por
# probe (prescripcion 059 §7.4), cuerpos preservados. Cero gates de app
# (probes standalone, leccion 059 §2).
# ============================================================================
set -u
OUT=/home/z/my-project/scripts/probe_lgdc
BODIES="$OUT/bodies_061"
LOG="$OUT/probe_061.log"
mkdir -p "$BODIES"
G="https://lgdc.uml.edu/rix/gambit-coeffs"
B="https://lgdc.uml.edu/fastchar/getbest"
CHARS="foF2,foF1,foE,foEs,fxI,hmF2,B0,B1,fmin,MUF(D)"

now() { date -u "+%Y-%m-%dT%H:%M:%S.%3NZ"; }

run_probe() {
  local name="$1" url="$2" ua="$3" tmo="$4" body="$BODIES/$1.body"
  echo "[$(now)] $name REQ $url" >> "$LOG"
  local code size
  code=$(curl -sS --max-time "$tmo" -A "$ua" -o "$body" \
       -w "%{http_code}" "$url" 2>>"$LOG") || code="CURL_ERR"
  size=$(wc -c < "$body" 2>/dev/null || echo 0)
  echo "[$(now)] $name RESULT http=$code bytes=$size" >> "$LOG"
  printf '%s %s http=%s bytes=%s\n' "$(now)" "$name" "$code" "$size"
}

: > "$LOG"
{
  echo "[$(now)] probe_061 start — set Q1-Q4, espaciado 15 s, UA proyecto, timeouts app"
  echo "[$(now)] DNS lgdc.uml.edu -> $(getent hosts lgdc.uml.edu | awk '{print $1}' | tr '\n' ' ')"
} >> "$LOG"

run_probe Q1_getbest_EB040 "$B?ursiCode=EB040&charName=$CHARS" \
  "ionosphere-live-3d/1.0 (educational)" 12
sleep 15
run_probe Q2_gambit_T2026.09.23T15.26 "$G?time=2026.09.23T15:26&charName=fof2" \
  "IonosphereLive3D/1.0" 20
sleep 15
run_probe Q3_gambit_T2026.09.21T17:15 "$G?time=2026.09.21T17:15&charName=fof2" \
  "IonosphereLive3D/1.0" 20
sleep 15
run_probe Q4_gambit_T2026.09.19T17:15 "$G?time=2026.09.19T17:15&charName=fof2" \
  "IonosphereLive3D/1.0" 20

echo "[$(now)] probe_061 done" >> "$LOG"
echo "=== LOG ==="
cat "$LOG"
