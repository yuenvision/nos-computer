/* ===========================================================
   NOS Computers — interactions
   =========================================================== */
(function () {
  "use strict";

  /* progressive enhancement: only hide reveal elements once JS runs */
  document.documentElement.classList.add("js");

  var check = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- Builds carousel arrows ---------- */
  var track = document.getElementById("buildsTrack");
  function scrollBuilds(dir) {
    var card = track.querySelector(".build-card");
    var amount = card ? card.offsetWidth + 26 : 340;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  }
  document.getElementById("buildPrev").addEventListener("click", function () { scrollBuilds(-1); });
  document.getElementById("buildNext").addEventListener("click", function () { scrollBuilds(1); });

  /* =========================================================
     Service modal content
     ========================================================= */
  var SERVICES = {
    repair: {
      tag: "Repair & Diagnostics",
      title: "Repair & Diagnostics",
      price: "",
      intro: "Is your computer running slowly? Are you seeing suspicious pop-ups on the desktop or when using the internet? Our technicians work with you to identify what your computer needs, then perform the service to remove junk files, malware, and corrupted operating systems. When you get it back — same or next business day — it will be working like new.",
      list: [
        "Replacing malfunctioning or damaged hardware",
        "Remove all viruses, spyware, and malware",
        "Repair error messages",
        "Update your software and drivers",
        "Data recovery",
        "Laptop & monitor screen replacements"
      ],
      pricing: [
        { name: "Service", meta: "0–1 business days", amt: "$125" },
        { name: "Virus Removal", meta: "0–1 business days", amt: "$145" },
        { name: "Diagnostic", meta: "$55 due upon declination of repairs", amt: "$0–$55" }
      ]
    },
    builds: {
      tag: "Custom PC Builds",
      title: "Custom PC Builds",
      price: "",
      intro: "We hand-build and test custom PCs in-store to fit exactly how you use your computer — from simple email machines to high-end gaming and video-editing rigs. Choose one of our four starting tiers and we'll tailor it to your needs and budget.",
      list: [
        "NOS Entry Build — Intel i3 · 8GB RAM · 256GB NVMe · Windows 11 (Email & Web)",
        "NOS Mid Build — Intel i5 · 16GB RAM · 512GB NVMe · Windows 11 (Office Use)",
        "NOS Turbo Build — Intel i7 · 32GB RAM · 1TB NVMe · RTX 40 (optional) (1080p Gaming)",
        "NOS Max Build — Intel i9 · 64GB RAM · 1TB NVMe · Nvidia GPU (4K / Video Editing)"
      ],
      pricing: [
        { name: "Custom builds", meta: "Tailored to your needs", amt: "Call for a quote" }
      ]
    },
    install: {
      tag: "Installation Services",
      title: "Installation Services",
      price: "",
      intro: "Ensure your computer works right from the start. Whether you purchased equipment on your own or from NOS, our certified technicians assist with installation and networking solutions, setting up and installing all hardware and making sure everything works properly before it leaves the shop. 100% satisfaction guaranteed.",
      list: [
        "Clean installation of Windows, macOS, or Linux",
        "Full format of the operating-system drive",
        "Installation of system device drivers & back-end software",
        "Security updates and appropriate BIOS updates applied",
        "Optional data migration — pictures, documents, photos, videos & bookmarks",
        "Free antivirus software installed"
      ],
      pricing: [
        { name: "Operating System Install", meta: "0–1 business days", amt: "$125" },
        { name: "OS Install with Data Migration", meta: "0–1 business days", amt: "$185" },
        { name: "Business Networking", meta: "Network setup & support for companies and organizations — call for pricing", amt: "Custom Quote" }
      ]
    }
  };

  var svcModal = document.getElementById("serviceModal");
  var svcTag = document.getElementById("svcTag");
  var svcTitle = document.getElementById("svcTitle");
  var svcPrice = document.getElementById("svcPrice");
  var svcBody = document.getElementById("svcBody");

  function openService(key) {
    var d = SERVICES[key];
    if (!d) return;
    svcTag.textContent = d.tag;
    svcTitle.textContent = d.title;
    svcPrice.textContent = d.price || "";

    var html = "<p>" + d.intro + "</p>";
    if (d.list && d.list.length) {
      html += '<ul class="modal-list">';
      d.list.forEach(function (item) { html += "<li>" + check + "<span>" + item + "</span></li>"; });
      html += "</ul>";
    }
    if (d.pricing && d.pricing.length) {
      html += '<div class="modal-pricelist">';
      d.pricing.forEach(function (p) {
        html += '<div class="row"><div><div class="name">' + p.name + '</div><div class="meta">' + p.meta + '</div></div><div class="amt">' + p.amt + "</div></div>";
      });
      html += "</div>";
    }
    html += '<div class="modal-cta"><a href="tel:+15209893700" class="btn btn-primary">📞 Call (520) 989-3700</a><a href="#contact" class="btn btn-ghost" data-close>Visit the shop</a></div>';
    svcBody.innerHTML = html;
    openModal(svcModal);
  }

  document.querySelectorAll("[data-modal]").forEach(function (el) {
    el.addEventListener("click", function () { openService(el.getAttribute("data-modal")); });
  });

  /* =========================================================
     Gallery + lightbox
     ========================================================= */
  var GALLERY = [
    { src: "assets/img/gallery/build-02.jpg", cls: "tall", alt: "Custom PC build with blue RGB lighting" },
    { src: "assets/img/gallery/build-04.jpg", cls: "", alt: "Custom build with RTX graphics card" },
    { src: "assets/img/gallery/build-03.jpg", cls: "", alt: "Custom PC build interior" },
    { src: "assets/img/gallery/fb-01.jpg", cls: "", alt: "Completed computer build" },
    { src: "assets/img/gallery/fb-02.jpg", cls: "", alt: "Completed computer build" },
    { src: "assets/img/gallery/build-06.jpg", cls: "", alt: "Custom PC build" },
    { src: "assets/img/gallery/fb-03.jpg", cls: "", alt: "Completed computer build" },
    { src: "assets/img/gallery/build-07.jpg", cls: "", alt: "Custom PC build" },
    { src: "assets/img/gallery/fb-04.jpg", cls: "", alt: "Completed computer build" },
    { src: "assets/img/gallery/build-08.jpg", cls: "", alt: "Custom PC build" },
    { src: "assets/img/gallery/fb-06.jpg", cls: "", alt: "Completed computer build" },
    { src: "assets/img/gallery/build-09.jpg", cls: "", alt: "Custom PC build" },
    { src: "assets/img/gallery/fb-07.jpg", cls: "", alt: "Completed computer build" },
    { src: "assets/img/gallery/build-10.jpg", cls: "", alt: "Custom PC build" },
    { src: "assets/img/gallery/fb-08.jpg", cls: "", alt: "Workbench repair" },
    { src: "assets/img/gallery/fb-09.jpg", cls: "", alt: "Workbench repair" }
  ];

  var grid = document.getElementById("galleryGrid");
  GALLERY.forEach(function (item, i) {
    var fig = document.createElement("div");
    fig.className = "gallery-item " + item.cls;
    fig.setAttribute("data-index", i);
    fig.innerHTML = '<img src="' + item.src + '" alt="' + item.alt + '" loading="lazy" />';
    fig.addEventListener("click", function () { openLightbox(i); });
    grid.appendChild(fig);
  });

  var lightbox = document.getElementById("lightbox");
  var lbImage = document.getElementById("lbImage");
  var lbIndex = 0;

  function showLb(i) {
    lbIndex = (i + GALLERY.length) % GALLERY.length;
    lbImage.src = GALLERY[lbIndex].src;
    lbImage.alt = GALLERY[lbIndex].alt;
  }
  function openLightbox(i) { showLb(i); openModal(lightbox); }
  document.getElementById("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); showLb(lbIndex - 1); });
  document.getElementById("lbNext").addEventListener("click", function (e) { e.stopPropagation(); showLb(lbIndex + 1); });

  /* =========================================================
     Modal open/close machinery
     ========================================================= */
  var activeModal = null;
  function openModal(m) {
    activeModal = m;
    m.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!activeModal) return;
    activeModal.classList.remove("open");
    activeModal = null;
    document.body.style.overflow = "";
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
    if (activeModal === lightbox) {
      if (e.key === "ArrowLeft") showLb(lbIndex - 1);
      if (e.key === "ArrowRight") showLb(lbIndex + 1);
    }
  });
})();
