# NOS Computers — Website

A modern, dark-themed, single-page marketing site for **NOS Computers**, a computer sales, service, and repair shop in Tucson, AZ.

🔗 **Reference / original site:** https://noscomputerstucson.com/

The site is a fully static, self-contained build — no frameworks, no build step. Just open `index.html`.

---

## Highlights

- **Single long-form page** with smooth-scroll navigation (Services · PC Builds · Gallery · Warranty · Contact).
- **Dark, modern aesthetic** — electric-cyan primary accent with a warm amber secondary (a nod to the NOS chrome/flame logo).
- **Service detail modals** — each service card opens a modal with full descriptions and pricing.
- **PC Builds carousel** — Entry / Mid / Turbo / Max tiers with full specs, on real build photos.
- **Gallery lightbox** — click any photo for a full-size view with keyboard (←/→) and on-screen navigation.
- **Warranty breakdown**, embedded **YouTube intro video**, and a **Google Maps** embed in the contact section.
- **Accessibility-minded for an older client base** — larger base font, high contrast, big tap targets, prominent click-to-call.
- **Fully responsive**, with a mobile menu. Scroll-reveal animations are a progressive enhancement (content is fully visible without JS).

---

## Project structure

```
.
├── index.html              # The page
├── assets/
│   ├── css/styles.css      # All styling (CSS custom properties / theme tokens at top)
│   ├── js/main.js          # Nav, modals, gallery lightbox, builds carousel, scroll reveal
│   └── img/
│       ├── brand/          # Logo
│       ├── services/       # Service card imagery
│       └── gallery/        # Build & repair photos (also used in the builds carousel)
└── README.md
```

All images are stored locally so the site is fully self-contained.

---

## Running locally

It's static, so any static file server works. For example:

```bash
# from the project root
python3 -m http.server 8765
# then open http://localhost:8765/
```

(Opening `index.html` directly via `file://` mostly works, but a local server is recommended so relative paths and the embeds behave like production.)

---

## Content notes

Content was sourced from the original noscomputerstucson.com site, then updated:

- **Removed** the *Onsite / In-Home Technician* service and references to **house calls / in-home residential visits**.
- **Removed** phone / mobile / tablet repair references; services now focus on desktop and laptop computers (Apple and Windows PCs).
- **Networking** is framed as a **commercial / business** service (companies and organizations), not residential.

### Business details
- **Address:** 2860 West Ina Road, Suite #112, Tucson, AZ 85741
- **Phone:** (520) 989-3700
- **Email:** info@noscomputerstucson.com
- **Hours:** Mon–Fri 9:00am–5:30pm · Sat 10:00am–2:00pm

---

## Editing quick reference

- **Theme colors / spacing:** CSS custom properties at the top of `assets/css/styles.css` (`:root`).
- **Service modal copy & pricing:** the `SERVICES` object in `assets/js/main.js`.
- **PC build specs:** the build cards in `index.html` (`#builds` section).
- **Gallery images:** the `GALLERY` array in `assets/js/main.js`.
- **YouTube video:** the embed `src` in the `#video` section of `index.html`.
- **Map / address:** the `#contact` section of `index.html`.
