#!/usr/bin/env bash
# ============================================================================
# Probe GLM 061-S — ¿validacion rota para TODO valor o solo FOF2?
#
# R-round 23:16Z: charName=fof2 -> 500 "illegal...fof2...legal [FOF2,...]"
#                charName=FOF2 -> 500 "illegal...FOF2...legal [FOF2,...]"  <- rechaza SU PROPIO valor legal
# Preguntas S:
#   S1 charName=B0    (otro valor de la whitelist)  -> ¿pasa la validacion alguno?
#   S2 sin charName   (comportamiento default)      -> ¿quejara distinta?
#   S3 charName=foF2  (mixed-case, convencion getbest/DIDBase) -> ¿whitelist interna real?
# TOV fijo 09.23T15:26 (banda [72,96] h, la mas barata de servir).
# ============================================================================
set -u
OUT=/home/z/my-project/scripts/probe_lgdc
BODIES="$OUT/bodies_061"
LOG="$OUT/probe_061s.log"
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
echo "[$(now)] probe_061S start — S1 B0 / S2 sin-param / S3 foF2-mixed, TOV fijo 09.23T15:26, espaciado 15 s" >> "$LOG"

run_probe S1_gambit_B0_09.23T15.26      "$G?time=2026.09.23T15:26&charName=B0"
sleep 15
run_probe S2_gambit_noparam_09.23T15.26 "$G?time=2026.09.23T15:26"
sleep 15
run_probe S3_gambit_foF2_mixed_09.23T15.26 "$G?time=2026.09.23T15:26&charName=foF2"

echo "[$(now)] probe_061S done" >> "$LOG"
echo "=== LOG ==="
cat "$LOG"
echo "=== MENSAJES ==="
for f in S1_gambit_B0_09.23T15.26 S2_gambit_noparam_09.23T15.26 S3_gambit_foF2_mixed_09.23T15.26; do
  echo "--- $f:"; sed 's/></>\n</g' "$BODIES/$f.body" | rg -o "Message</b>[^<]*" || echo "(sin Message — ver cuerpo)"
done
