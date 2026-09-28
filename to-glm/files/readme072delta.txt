From f1f711518c5d8e4779d8a81ef52bdbdebce5d242 Mon Sep 17 00:00:00 2001
From: David Lopez Salvador <davidlopezsalvador@users.noreply.github.com>
Date: Mon, 28 Sep 2026 00:35:53 +0200
Subject: [PATCH] docs: ventana 168h, backfill 384, matriz providers, DATA
 stale

---
 README.md | 8 ++++++--
 1 file changed, 6 insertions(+), 2 deletions(-)

diff --git a/README.md b/README.md
index 1ee70bd..ecafc6b 100644
--- a/README.md
+++ b/README.md
@@ -63,7 +63,11 @@ auroral oval and more — all switchable, with a time-travel replay mode.
   plots, Carrington rotation + sun disk.
 
 **Time & UX**
-- Timeline: LIVE vs REPLAY (TEC frames + GIRO history scrub, loop, 0.5–8 fps).
+- Timeline: LIVE vs REPLAY (TEC frames + GIRO history scrub, loop, 0.5–8 fps);
+  union window 168 h (IRTAM [T−168,T−72] + TEC [T−72,T]) with per-layer loop
+  mode; DATA line reports staleness with delay magnitude when clamped.
+- Provider status matrix (per-source live state: fresh/stale/failed/
+  rate-limited/degraded with walking ages).
 - Every variable has an English tooltip (`(?)` markers); UTC clock + subsolar
   readout; GUI values persist to `settings.cfg` (window layout in `imgui.ini`).
 
@@ -75,7 +79,7 @@ auroral oval and more — all switchable, with a time-travel replay mode.
 | foF2/MUF/hmF2/… | GIRO DIDBase `scaled.php` (129 stations) | 5 min |
 | foF2/MUF/hmF2/… (failover) | prop.kc2g.com redistribution (GIRO data with permission, WWROF-supported, plus eSWua/INGV and NOAA feeds) | on GIRO failure only, 1 req/10 min |
 | EB040 profile | Ebre Observatory FTP (`EB040_*.SAO`) | 5 min, background |
-| IRTAM foF2/hmF2/B0/B1 | UML LGDC `gambit-coeffs` (Jones-Gallet coeffs, 46×45 evaluated) | 15-min slots, ~3 d lag; cold backfill 96/param, steady ≤4/cycle, 1 req/15 s shared LGDC gate |
+| IRTAM foF2/hmF2/B0/B1 | UML LGDC `gambit-coeffs` (Jones-Gallet coeffs, 46×45 evaluated) | 15-min slots, ~3 d lag; cold backfill 384/param, steady ≤4/cycle, 1 req/15 s shared LGDC gate |
 | Kp/Dst/F10.7/Ap/SSN | NOAA SWPC JSON | 5 min |
 | Solar wind | NOAA RTSW 1-min | 5 min |
 | Aurora | NOAA Ovation | 5 min |
-- 
2.53.0.windows.3

