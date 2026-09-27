#!/usr/bin/env bash
# ============================================================================
# Probe GLM 061-U — RECONSTRUIDO (2026-09-27) a partir de probe_061u.log
#
# El script original de esta tanda NO se persistió antes del fin de contexto
# de la sesión (solo quedo el log). Esta reconstruccion reproduce las 2
# peticiones registradas en el log (URLs byte-exactas, espaciado ~18.5 s,
# UA proyecto, timeout 20 s). LA EVIDENCIA PRIMARIA ES EL LOG, no este
# script. proposito: cubrir la custodia del paquete from-glm/files/061/.
#
# Log original (2 lineas, 278 B):
#   [2026-09-26T23:32:04.578Z] U_hmF2 REQ https://lgdc.uml.edu/rix/gambit-coeffs?time=2026.09.23T15:26&charName=hmF2 RESULT http=200 bytes=18088
#   [2026-09-26T23:32:23.066Z] U_B1 REQ https://lgdc.uml.edu/rix/gambit-coeffs?time=2026.09.23T15:26&charName=B1 RESULT http=200 bytes=18040
# ============================================================================
set -u
OUT=/home/z/my-project/scripts/probe_lgdc
BODIES="$OUT/bodies_061"
LOG="$OUT/probe_061u.log"
mkdir -p "$BODIES"
G="https://lgdc.uml.edu/rix/gambit-coeffs"

now() { date -u "+%Y-%m-%dT%H:%M:%S.%3NZ"; }

run_probe() {
  local name="$1" url="$2" body="$BODIES/$1.body"
  local code size ts
  ts=$(now)
  code=$(curl -sS --max-time 20 -A "IonosphereLive3D/1.0" -o "$body" \
       -w "%{http_code}" "$url" 2>/dev/null) || code="CURL_ERR"
  size=$(wc -c < "$body" 2>/dev/null || echo 0)
  echo "[$ts] $name REQ $url RESULT http=$code bytes=$size" >> "$LOG"
  printf '%s %s http=%s bytes=%s\n' "$ts" "$name" "$code" "$size"
}

run_probe U_hmF2 "$G?time=2026.09.23T15:26&charName=hmF2"
sleep 15
run_probe U_B1 "$G?time=2026.09.23T15:26&charName=B1"
