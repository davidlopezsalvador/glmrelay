#!/usr/bin/env bash
# ============================================================================
# Probe GLM 061-R — verificacion del cambio de contrato charName en gambit
#
# Hallazgo Q-round 23:14Z: gambit 500 uniforme NO es outage — es validacion
# de parametro: illegal charName "fof2", legal [FOF2, B0, TAU, VTEC, MUF3000,
# NMF2, HMF2, B1] (GambitCoefficients.doGet:68, Tomcat/9.0.113).
#
# R-round responde 3 preguntas:
#   R0 gambit fof2 (minusculas, control)  TOV 09.23T15:26  -> confirma rechazo consistente
#   R1 gambit FOF2 (MAYUSCULAS)           TOV 09.23T15:26  -> banda [72,96] h ¿sirve?
#   R2 gambit FOF2                        TOV 09.21T17:15  -> profundidad 5 d ¿sirve?
#   R3 gambit FOF2                        TOV 09.19T17:15  -> FRONTERA 7 d (muerte de Opcion B)
#
# Formato de respuesta R1-R3 comparable con P3/P4 del 059 (~18 kB coeffs validos).
# ============================================================================
set -u
OUT=/home/z/my-project/scripts/probe_lgdc
BODIES="$OUT/bodies_061"
LOG="$OUT/probe_061r.log"
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
echo "[$(now)] probe_061R start — R0 minusculas control + R1-R3 FOF2 mayusculas, espaciado 15 s" >> "$LOG"

run_probe R0_gambit_fof2_lower_09.23T15.26 "$G?time=2026.09.23T15:26&charName=fof2"
sleep 15
run_probe R1_gambit_FOF2_upper_09.23T15.26 "$G?time=2026.09.23T15:26&charName=FOF2"
sleep 15
run_probe R2_gambit_FOF2_upper_09.21T17.15 "$G?time=2026.09.21T17:15&charName=FOF2"
sleep 15
run_probe R3_gambit_FOF2_upper_09.19T17.15 "$G?time=2026.09.19T17:15&charName=FOF2"

echo "[$(now)] probe_061R done" >> "$LOG"
echo "=== LOG ==="
cat "$LOG"
