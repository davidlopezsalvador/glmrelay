#!/usr/bin/env bash
# ============================================================================
# Probe GLM 061-T — frontera criterio de muerte con param CORREGIDO (foF2)
#
# La app envia charName=foF2 (kParams IrtamCoeffAdapter.h:46, forma display);
# el servidor actual lo acepta (S3 200). El sondeo 058 uso fof2 (minusculas)
# — divergencia de instrumento, no outage. T-round mide la frontera con el
# param correcto:
#   T1 foF2 TOV 2026.09.21T17:15  (== sondeo #1, 5.25 d)  — primer eslabon
#   T2 foF2 TOV 2026.09.19T17:15  (== sondeo #3, 7.25 d)  — FRONTERA muerte (7 d)
#   T3 foF2 TOV 2026.07.28T17:15  (== sondeo #11, 60.25 d) — techo de la curva
# Diagnostico GLM (la serie formal de 12 req queda para el instrumento de Muse).
# ============================================================================
set -u
OUT=/home/z/my-project/scripts/probe_lgdc
BODIES="$OUT/bodies_061"
LOG="$OUT/probe_061t.log"
mkdir -p "$BODIES"
G="https://lgdc.uml.edu/rix/gambit-coeffs"

now() { date -u "+%Y-%m-%dT%H:%M:%S.%3NZ"; }

run_probe() {
  local name="$1" url="$2" body="$BODIES/$1.body"
  echo "[$(now)] $name REQ $url" >> "$LOG"
  local code size
  code=$(curl -sS --max-time 20 -A "IonosphereLive3D/1.0" -o "$body" \
       -w "%{http_code}" "$url" 2>>"$LOG") || code="CURL_ERR"
  size=$(wc -c < "$body" 2>/dev/null || echo 0)
  echo "[$(now)] $name RESULT http=$code bytes=$size" >> "$LOG"
  printf '%s %s http=%s bytes=%s\n' "$(now)" "$name" "$code" "$size"
}

: > "$LOG"
echo "[$(now)] probe_061T start — foF2 mayus-minus correcto a 5/7/60 d, espaciado 15 s" >> "$LOG"

run_probe T1_gambit_foF2_09.21T17.15 "$G?time=2026.09.21T17:15&charName=foF2"
sleep 15
run_probe T2_gambit_foF2_09.19T17.15 "$G?time=2026.09.19T17:15&charName=foF2"
sleep 15
run_probe T3_gambit_foF2_07.28T17.15 "$G?time=2026.07.28T17:15&charName=foF2"

echo "[$(now)] probe_061T done" >> "$LOG"
echo "=== LOG ==="
cat "$LOG"
echo "=== TOV servido (header) por probe ==="
for f in T1_gambit_foF2_09.21T17.15 T2_gambit_foF2_09.19T17.15 T3_gambit_foF2_07.28T17.15; do
  echo "--- $f:"; rg -o "Time of Validity [^ ]+|Ionospheric Characteristic: [^|]*" "$BODIES/$f.body" 2>/dev/null | head -2 || echo "(no header — ver cuerpo)"
done
