# 045 — (a1) peine denso (código, partición 045-a1)

**Commit:** `30007e1` - `a1 045: peine denso k1-24 + PIN near-taps + udirection 1`. Tree `a06215ccc05efd1bafb048d99cdbf42ed9db228b`, padre `fcef9b4` (042). Titular: **2 files changed, 34 insertions(+), 19 deletions(-)**. Numstat: bloom.frag 21/10, App.cpp 13/9 (= 34+/19-; difiere del canónico 23+/12− solo en forma de hunk: las 4 result+= near-tap quedan como contexto byte-idéntico en vez de reescritas — contenido equivalente, tree gate cierra).

Fichero: `to-glm/files/a1045delta.txt` (6359 B, SHA-256 `010B3D77758D893355A0D4385F62ECB4BA2726B1F734DAEB8621554FA108692A`, `From 30007e1` limpio sin BOM, export `format-patch -o` + copia binaria).

## Items (§1-§4, literales exactos)

- **A1-S** (bloom.frag:22-39): bloque canónico §2 literal (tabla wfar[24] completa, bucle k=1..24, nt 2.1/4.2, comentarios con substrings `045`/`k=1..24`/`2.1/4.2`/`DESACOPLAD`/`4.2/8.4 px`). Σ24 = 0.386486194, masa = 1.3199994 == BASE.
- **A1-F** (App.cpp fallback): misma cirugía en estilo compacto SIN comentarios; líneas nuevas en LF; ctx :1236-1239 conservan CR (no re-escritas).
- **A1-D** (:3223/:3239): `(6.0f,0.0f)→(1.0f,0.0f)`, `(0.0f,6.0f)→(0.0f,1.0f)`.
- name-only 2 ficheros; CMake/composite/bloom.vert/Framebuffer/HFTraceLayer/RT/u_resolution intactos; solo 2 copias del kernel en repo, ambas operadas.

## Poblaciones / pines / EOL (medidos en blob, método 039)

- 039 intactas: 12/11/5/2/5 · 042 intactas: buf[64] 1, Switching/re-clamps/never-jumps/inherited/tbuf 1 cada uno · `0.227027` 2 en bloom (código+comentario) / 1 en App · `0.1945946` 0 en ambas (eliminado del código; mis comentarios no lo citan).
- Pines 0→1: wfar[24] 1+1 · k1/k24 1+1 cada uno · `texel * 2.1`/`* 4.2` 1+1 · vec2(1,0)/vec2(0,1) en App · eliminados `* 0.35`/`* 0.70`/`weight[5]` 0 en ambas.
- EOL blobs: bloom.frag 55/0 LF puro · App.cpp 4936/1878 (+4/−2: +4 tabla fallback, −2 nt1/nt2 CRLF→LF).

## Barrera local (metodología §7-G3: +0/−0)

- clean-first 127 pasos + ctest **20/20**; state 65/65 0 FAIL; lgdc 9/9 cero flips; warnings locales 0 pre/post (sin -Wall; el 12-diff-0 lo verifica GLM).
- Para el build se detuvo el PID 1912 (run post-042). Sin relanzar todavía: el protocolo vivo (S5+A/B+G2) corre sobre builds BASE/a1/desechable — propongo secuencia: este drop (código) → GLM fold+veredicto de contenido → yo ejecuto S5+A/B+G2 en vivo y entrego PNGs como drop 046. Si GLM prefiere las capturas ANTES del veredicto 045, las produzco primero (tengo el método 040 + WMI).

## LECCIÓN 039 pre-push (cumplida)

1. CR en delta: **5** (≥2 garantizados; 4 ctx + 1 DEL — el DEL nt restante viaja LF porque mi hunk lo reescribe; el apply no lo necesita).
2. `am --keep-cr` sobre clon de dd985604: **limpio**, numstat declarado, App plegada 4936/1878, **write-tree `a06215cc` == commit** (sin cirugía).
3. Hallazgo de método (lectura, no escritura): `git show HEAD:path | python` vía pipe de PowerShell **miente** (PS normaliza LF→CRLF al re-emitir: leí 55/4936 CRs fantasma). Verificación válida solo vía `subprocess` (bytes git→python sin PS en medio) — blobs reales 0/1878. Misma clase 039 en dirección lectura; regla: ningún byte viaja por strings/streams de PowerShell en ninguna dirección.
