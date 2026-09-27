#!/bin/sh
# Probes GLM 063 — confirmacion A/B del drop 062 (sondeo Q2 formal).
# 3 reqs spot contra los TOVs LITERALES del log 062:
#   V1 = pre-flight 2026.09.23T12:45 (esperado 200 / 18095 B / sha16 8df1f9ee0c1814ab)
#   V2 = 5d primero 2026.09.22T00:45 (esperado 200 / 18101 B / sha16 6c03ae614a0ac3d6)
#   V3 = 60d ultimo  2026.07.29T00:30 (esperado 200 / 18089 B / sha16 28a5ddd8ebf1d38e)
# Disciplina: UA proyecto, timeout 20, espaciado 15 s, timestamp UTC por probe
# (prescripcion 059), cuerpos conservados. NUNCA una serie: probes spot 1-req.
set -u
OUT=/home/z/my-project/scripts/probe063
mkdir -p "$OUT"
LOG="$OUT/probe_063_ab.log"
UA="IonosphereLive3D/1.0"
BASE="https://lgdc.uml.edu/rix/gambit-coeffs"

log() {
  ts=$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)
  echo "[$ts] $1" | tee -a "$LOG"
}

probe() {
  name="$1"; tov="$2"; expsize="$3"; expsha="$4"
  body="$OUT/${name}_foF2.bin"
  log "$name start: gambit foF2 TOV=$tov (esperado 062: 200/$expsize B/sha16=$expsha)"
  t0=$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)
  meta=$(curl -sS -A "$UA" --max-time 20 -o "$body" \
    -w "%{http_code} %{size_download} %{time_total}" \
    "$BASE?time=$tov&charName=foF2" 2>"$OUT/${name}.curlerr")
  rc=$?
  t1=$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)
  code=$(echo "$meta" | awk '{print $1}')
  size=$(echo "$meta" | awk '{print $2}')
  tt=$(echo "$meta" | awk '{print $3}')
  if [ "$rc" -eq 0 ] && [ -s "$body" ]; then
    sha=$(sha256sum "$body" | cut -c1-16)
    full=$(sha256sum "$body" | awk '{print $1}')
  else
    sha="-"; full="-"
  fi
  log "$name done: t0=$t0 t1=$t1 curl_rc=$rc http=$code size=$size time=${tt}s sha16=$sha"
  log "$name veredicto-local: size $size vs $expsize | sha16 $sha vs $expsha"
  echo "$full  ${name}_foF2.bin" >> "$OUT/SHA256SUMS.bodies"
}

: > "$LOG"
log "PROBES GLM 063 — confirmacion A/B drop 062 (3 reqs spot, UA proyecto, timeout 20, espaciado 15 s)"
log "host: lgdc.uml.edu (DNS: $(getent hosts lgdc.uml.edu | awk '{print $1}' | head -1))"
probe V1 "2026.09.23T12:45" 18095 "8df1f9ee0c1814ab"
sleep 15
probe V2 "2026.09.22T00:45" 18101 "6c03ae614a0ac3d6"
sleep 15
probe V3 "2026.07.29T00:30" 18089 "28a5ddd8ebf1d38e"
log "PROBES GLM 063 fin"
