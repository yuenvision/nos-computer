# CMS + Deploy Setup (one-time)

This site is content-managed with **[Pages CMS](https://pagescms.org)** (a free,
hosted, git-based editor) and auto-deploys to **GitHub Pages** via the workflow in
`.github/workflows/deploy.yml`. The editing flow is:

```
Shawn edits in Pages CMS → commits to master → Action builds (Eleventy) → Pages deploys
```

Everything below is a **one-time** setup. None of it affects the live site until
step 2 (switching the Pages source), so do these only at go-live / cutover.

---

## 1. Confirm the build works on GitHub (no live impact)

On the `feature/cms` branch, run the workflow manually to prove the build is green
before it ever touches `master`:

- GitHub → **Actions** → "Build and deploy to GitHub Pages" → **Run workflow** →
  pick `feature/cms`. The **build** job should pass. (The **deploy** job only does
  something once the Pages source is switched in step 2.)

## 2. Switch GitHub Pages to "GitHub Actions" (this is the cutover)

GitHub → **Settings → Pages → Build and deployment → Source → GitHub Actions**.

> ⚠️ This is the moment the live site changes from "serve the old root `index.html`"
> to "serve the Eleventy build output." Do it only after merging `feature/cms` into
> `master` and after you've reviewed the built site. Pages keeps serving the last
> good deploy until the new one succeeds.

## 3. Install Pages CMS on the repo

- Go to **<https://app.pagescms.org>** and sign in with GitHub.
- Grant it access to the **`yuenvision/nos-computer`** repo only.
- Open the repo in Pages CMS → it reads `.pages.yml` and shows the 7 editing
  screens (⭐ Prices and ⭐ Business Info first).

## 4. Give Shawn access

- Shawn creates a free **GitHub account** (one-time).
- Add him as a **collaborator with Write access**:
  GitHub → Settings → Collaborators → Add people.
- He signs into <https://app.pagescms.org> with that account and sees the same
  screens. Editing + Save commits on his behalf.

---

## Testing the save → deploy loop (do this yourself first)

1. Open Pages CMS → **⭐ Prices** → change a price → **Save**.
2. Watch GitHub → **Actions**: a new "Build and deploy" run kicks off.
3. ~1–2 min later the live site reflects the change. Revert it the same way.

If a build ever fails, the Action stops and **the last good version stays live** —
nothing breaks publicly.

---

## What's editable vs. frozen

- **Editable in the CMS:** prices, hours, phone/email/address, social links, all
  service + build + hero + warranty copy, SEO text, the YouTube video ID.
- **Frozen (developer / Paul):** layout, theme/colors, section order, the hero
  background video, the photo **gallery**, and the service/build **card images**.
