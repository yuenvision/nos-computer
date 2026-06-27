#!/bin/bash
# NOS Computers — smoke test. Catches the common regressions fast.
# Usage: bash scripts/smoke-test.sh
#
# Builds the site (Eleventy -> _site/), serves _site/ on :8765, runs checks,
# reports pass/fail, and tears the server down again.

set -u
BASE="http://localhost:8765"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SERVE_DIR="$ROOT/_site"
FAIL=0
pass() { printf "  \033[32mPASS\033[0m  %s\n" "$1"; }
fail() { printf "  \033[31mFAIL\033[0m  %s\n" "$1"; FAIL=$((FAIL+1)); }

cd "$ROOT" || exit 1

# --- build the site ---
echo "== Build (Eleventy) =="
if npm run build >/tmp/nos-build.log 2>&1; then
  pass "eleventy build succeeded"
else
  fail "eleventy build FAILED — see /tmp/nos-build.log"
  cat /tmp/nos-build.log
  printf "\033[31mSMOKE TEST FAILED — build error\033[0m\n"; exit 1
fi

# --- ensure local server (serving the build output) ---
# Always start our own against _site to be sure we test the freshly built files.
lsof -ti:8765 2>/dev/null | xargs kill 2>/dev/null
( cd "$SERVE_DIR" && python3 -m http.server 8765 >/dev/null 2>&1 & echo $! > /tmp/nos-smoke-server.pid )
STARTED_SERVER=1
for i in $(seq 1 10); do curl -s -o /dev/null "$BASE/" && break; sleep 0.5; done

echo "== Page loads =="
code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/")
[ "$code" = "200" ] && pass "index.html 200" || fail "index.html returned $code"

echo "== Critical content present =="
HTML=$(curl -s "$BASE/")
grep -q "(520) 989-3700"      <<<"$HTML" && pass "phone number present"  || fail "phone number missing"
grep -q "2860 West Ina Road"  <<<"$HTML" && pass "address present"       || fail "address missing"
grep -q "<video"              <<<"$HTML" && pass "hero <video> present"  || fail "hero video tag missing"

echo "== Asset integrity (every file under assets/ returns 200) =="
while IFS= read -r f; do
  rel="${f#./}"
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/$rel")
  [ "$code" = "200" ] && pass "$rel" || fail "$rel returned $code"
done < <(cd "$SERVE_DIR" && find assets -type f ! -name '.DS_Store')

echo "== Hero video sanity =="
ctype=$(curl -s -o /dev/null -w "%{content_type}" "$BASE/assets/video/hero-build.mp4")
bytes=$(curl -s -o /dev/null -w "%{size_download}" "$BASE/assets/video/hero-build.mp4")
[ "$ctype" = "video/mp4" ] && pass "video served as video/mp4" || fail "video content-type was $ctype"
if [ "$bytes" -gt 0 ] && [ "$bytes" -lt 8388608 ]; then
  pass "video size $((bytes/1024/1024))MB (< 8MB budget)"
else
  fail "video size ${bytes} bytes is 0 or over 8MB budget"
fi

echo "== Headless render =="
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SHOT="/tmp/nos-smoke-shot.png"
if [ -x "$CHROME" ]; then
  "$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1440,900 \
    --screenshot="$SHOT" "$BASE/?cb=$$" >/dev/null 2>&1
  [ -s "$SHOT" ] && pass "rendered screenshot -> $SHOT" || fail "headless render produced no image"
else
  echo "  SKIP  Chrome not found; skipping headless render"
fi

# --- teardown server if we started it ---
if [ "$STARTED_SERVER" = "1" ] && [ -f /tmp/nos-smoke-server.pid ]; then
  kill "$(cat /tmp/nos-smoke-server.pid)" 2>/dev/null
  rm -f /tmp/nos-smoke-server.pid
fi

echo
if [ "$FAIL" -eq 0 ]; then
  printf "\033[32mSMOKE TEST PASSED\033[0m\n"; exit 0
else
  printf "\033[31mSMOKE TEST FAILED — %d issue(s)\033[0m\n" "$FAIL"; exit 1
fi
