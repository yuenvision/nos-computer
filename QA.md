# NOS Computers — QA / Smoke-Test Plan

Run this before asking for local review on **any** change. Goal: catch
regressions before they reach the live site.

## Release workflow (REQUIRED order)

1. **Execute** the change locally (edit only; do not push).
2. **Smoke test** — run `bash scripts/smoke-test.sh` with the local server up.
3. **Manual QA** — walk the regression checklist below for anything the change
   could plausibly touch.
4. **Notify Paul** to review locally at http://localhost:8765/ — and **stop**.
5. **Wait for explicit green light.** Do not commit/push until Paul approves.
6. **Push live** — commit + `git push origin master`; Pages auto-deploys.
7. Verify the live URL reflects the change (assets 200, eyeball hero).

---

## Automated smoke test (`scripts/smoke-test.sh`)

Fast, scriptable checks that run in seconds:

- **Asset integrity** — every file under `assets/` returns HTTP 200 over the
  local server (catches broken/renamed asset links — the #1 regression risk).
- **Page loads** — `index.html` returns 200.
- **Critical content present** — phone `(520) 989-3700`, address
  `2860 West Ina Road`, and the hero `<video>` tag are in the served HTML.
- **Hero video sanity** — `hero-build.mp4` is served as `video/mp4` and is under
  8MB (guards against accidentally committing an un-compressed video).
- **Headless render** — captures a full-page screenshot to the scratchpad for a
  quick eyeball (and proves the page doesn't hard-crash on load).

---

## Manual regression checklist

Check the items relevant to the change; do a full pass before any larger release.

### Hero
- [ ] Video autoplays, loops, and is **muted** (no sound).
- [ ] **No double-image / ghost artifact** behind the video.
- [ ] Poster frame shows instantly (no empty/black hero before video buffers).
- [ ] Headline + CTAs are legible over the video (gradient overlay holding up).
- [ ] `prefers-reduced-motion` on → still image shows, no motion.

### Navigation
- [ ] Sticky top nav stays visible on scroll.
- [ ] Each nav link smooth-scrolls to the right section.
- [ ] Click-to-call button dials `(520) 989-3700`.

### Services
- [ ] Each service card opens its detail modal.
- [ ] Pricing in each modal is correct (Service $125 · Virus $145 · Diagnostic
      $0–$55 · OS Install $125 · OS+Migration $185 · Business Networking quote).
- [ ] Modal closes (X, overlay click, Esc).
- [ ] Removed services stay gone: no in-home/onsite $145/hr, no phone/tablet repair.

### PC Builds carousel
- [ ] Carousel advances/reverses; specs render for Entry/Mid/Turbo/Max.

### Gallery
- [ ] Thumbnail click opens full-size lightbox.
- [ ] Arrow-key nav moves between images; close works.

### Warranty / Video / Contact / Footer
- [ ] Warranty terms render.
- [ ] YouTube embed loads (`uQZBCWTXUak`).
- [ ] Google Maps embed loads; address correct.
- [ ] Footer: address, phone, hours, Facebook + YouTube links work.

### Cross-cutting
- [ ] Content is fully visible **with JS disabled** (scroll-reveal is
      progressive enhancement, must not hide content).
- [ ] No console errors in the browser devtools.
- [ ] Responsive: mobile / tablet / desktop layouts intact; tap targets large.
- [ ] **iOS Safari** specifically: hero video autoplays (requires `muted` +
      `playsinline`) — this is the most fragile cross-browser case.
- [ ] No broken images / 404s in the Network tab.
