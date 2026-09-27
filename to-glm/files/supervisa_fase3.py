"""Supervision FASE 3 (Opcion B backfill) — drop 070.
Uso: python3 supervisa_fase3.py <run.log> [cache_dir]
Lee el log combinado y reporta: conteos LGDC por categoria/parametro,
rachas de fails (reglas de pausa a/b), techo gambit 1800, pacing
launch-a-launch, getbest/catalog, censo de disco irtamc_*.
Solo lee; no toca la app ni la red.
"""
import os
import re
import sys
from datetime import datetime, timezone

log_path = sys.argv[1]
cache_dir = sys.argv[2] if len(sys.argv) > 2 else None

TS = re.compile(r"\[LGDC (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z)\]")


def ts(line):
    m = TS.search(line)
    if not m:
        return None
    return datetime.fromisoformat(m.group(1).replace("Z", "+00:00")).timestamp()


launches = []  # (ts, line)
results_ok = 0
results_fail = 0
per_param_ok = {}
per_param_fail = {}
consec_fail = 0
max_consec_fail = 0
getbest = 0
catalog = 0
denies = []
other = 0
with open(log_path, errors="replace") as f:
    for line in f:
        if "[LGDC " not in line:
            continue
        t = ts(line)
        low = line.lower()
        if "launch gambit" in low or "launch getbest" in low or "launch catalog" in low:
            launches.append((t, line.strip()))
            if "getbest" in low:
                getbest += 1
            if "catalog" in low:
                catalog += 1
        elif "result ok" in low and "gambit" in low:
            results_ok += 1
            consec_fail = 0
            m = re.search(r"gambit (\w+)", low)
            if m:
                per_param_ok[m.group(1)] = per_param_ok.get(m.group(1), 0) + 1
        elif ("result fail" in low or "result error" in low) and "gambit" in low:
            results_fail += 1
            consec_fail += 1
            max_consec_fail = max(max_consec_fail, consec_fail)
            m = re.search(r"gambit (\w+)", low)
            if m:
                per_param_fail[m.group(1)] = per_param_fail.get(m.group(1), 0) + 1
        elif "deny" in low or "ms-since-last" in low:
            m = re.search(r"ms-since-last=(\d+)", line)
            if m:
                denies.append(int(m.group(1)))
        else:
            other += 1

gambit_launches = sum(
    1 for _, l in launches if "gambit" in l.lower()
)
print("launches totales: %d (gambit %d, getbest %d, catalog %d)" % (
    len(launches), gambit_launches, getbest, catalog))
print("gambit ok=%d fail=%d" % (results_ok, results_fail))
print("ok por param: %s" % per_param_ok)
print("fail por param: %s" % per_param_fail)
print("max fails consecutivos: %d" % max_consec_fail)
print("TECHO gambit 1800: %d usados" % gambit_launches)
ts_l = [t for t, l in launches if t is not None]
if len(ts_l) >= 2:
    gaps = [b - a for a, b in zip(ts_l, ts_l[1:])]
    print("pacing gaps: min=%.2f max=%.2f media=%.2f n=%d" % (
        min(gaps), max(gaps), sum(gaps) / len(gaps), len(gaps)))
    print("gaps < 15 s: %d" % sum(1 for g in gaps if g < 15.0))
if denies:
    print("denies: n=%d min=%d max=%d" % (len(denies), min(denies), max(denies)))
print("otras lineas LGDC: %d" % other)
if cache_dir and os.path.isdir(cache_dir):
    n = 0
    sz = 0
    for dp, dn, fn in os.walk(cache_dir):
        for f in fn:
            if f.startswith("irtamc_") and f.endswith(".txt"):
                n += 1
                try:
                    sz += os.path.getsize(os.path.join(dp, f))
                except OSError:
                    pass
    print("disco irtamc_*.txt: %d ficheros, %.1f MB" % (n, sz / 1048576.0))
