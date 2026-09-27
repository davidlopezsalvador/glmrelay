import datetime
import hashlib
import os
import subprocess
import sys
import time

UA = "IonosphereLive3D/1.0"
BASE = "https://lgdc.uml.edu/rix/gambit-coeffs"
OUTDIR = "C:/Users/unknown/AppData/Local/Temp/opencode/sondeoQ2f"
os.makedirs(OUTDIR, exist_ok=True)
LOG = os.path.join(OUTDIR, "sondeoQ2formal.log")
DEPTHS = [5, 7, 14, 21, 30, 60]


def slot(ts):
    return (int(ts) // 900) * 900


def fmt(ts):
    return datetime.datetime.fromtimestamp(ts, tz=datetime.timezone.utc).strftime(
        "%Y.%m.%dT%H:%M"
    )


def log(line):
    ts = datetime.datetime.now(datetime.timezone.utc).strftime(
        "%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
    with open(LOG, "a") as f:
        f.write("[LGDC %s] %s\n" % (ts, line))
    print("[LGDC %s] %s" % (ts, line), flush=True)


def one_req(dlabel, tov, idx):
    tstr = fmt(tov)
    url = "%s?time=%s&charName=foF2" % (BASE, tstr)
    body = os.path.join(OUTDIR, "q2f_%s_%d.bin" % (dlabel, idx))
    log("launch gambit-foF2 depth=%s TOV=%s" % (dlabel, tstr))
    try:
        r = subprocess.run(
            [
                "curl.exe", "-sS", "-A", UA, "--max-time", "20",
                "-o", body, "-w", "%{http_code} %{size_download} %{time_total}",
                url,
            ],
            capture_output=True,
            text=True,
            timeout=30,
        )
        parts = r.stdout.strip().split()
        code = parts[0] if parts else "curl-fail"
        size = int(parts[1]) if len(parts) > 1 and parts[1].isdigit() else 0
        h = ""
        if os.path.exists(body) and size > 0:
            with open(body, "rb") as f:
                h = hashlib.sha256(f.read()).hexdigest()[:16]
        if code == "200" and size > 1000:
            log("result ok gambit-foF2 depth=%s TOV=%s size=%d sha=%s" % (dlabel, tstr, size, h))
        elif code == "200":
            log("result EMPTY gambit-foF2 depth=%s TOV=%s size=%d sha=%s" % (dlabel, tstr, size, h))
        else:
            log("result FAIL gambit-foF2 depth=%s TOV=%s http=%s size=%d sha=%s err=%s" % (dlabel, tstr, code, size, h, r.stderr.strip()[:80]))
        return code, size
    except Exception as e:
        log("result EXC gambit-foF2 depth=%s TOV=%s %s" % (dlabel, tstr, str(e)[:80]))
        return "exc", 0


if len(sys.argv) > 1 and sys.argv[1] == "preflight":
    now = time.time()
    tov = slot(now - 3.5 * 86400)
    log("pre-flight Q2formal: 1 req foF2 banda [72,96]h")
    code, size = one_req("3.5d", tov, 0)
    print("PREFLIGHT_RESULT=%s:%d" % (code, size))
elif len(sys.argv) > 1 and sys.argv[1] == "series":
    now = time.time()
    jobs = []
    for d in DEPTHS:
        s = slot(now - d * 86400)
        jobs.append((d, s))
        jobs.append((d, s - 900))
    log("sondeo Q2formal start: 12 req foF2, depths {5,7,14,21,30,60}d x 2 TOVs, 1req/15s")
    t_next = time.time()
    for idx, (d, tov) in enumerate(jobs):
        while time.time() < t_next:
            time.sleep(0.2)
        t_next += 15.0
        one_req("%dd" % d, tov, idx % 2)
    log("sondeo Q2formal done")
else:
    print("usage: preflight|series")
