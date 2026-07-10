/**
 * One-time generator: static HTML detail pages from existing datasets.
 * Run: node scripts/generate-static-details.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");

function loadData(file, globalName) {
  const code = fs.readFileSync(path.join(root, "js", file), "utf8");
  const ctx = { window: {} };
  vm.runInNewContext(code, ctx);
  return ctx.window[globalName];
}

const LISTINGS = loadData("listings-data.js", "LISTINGS_DATA");
const MOOD_LABELS = loadData("listings-data.js", "MOOD_LABELS");
const BLOG = loadData("blog-data.js", "BLOG_DATA");
const DEVELOPERS = loadData("developers-data.js", "DEVELOPERS_DATA");
const CITIES = loadData("cities-data.js", "CITIES_DATA");

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function pageHead(title, desc, css) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/theme.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/${css}">
</head>`;
}

function pageFoot() {
  return `  <div id="site-footer"></div>
</body>
</html>`;
}

const GALLERY_POOL = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=92",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=92",
  "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=1400&q=92",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=92"
];

const AMENITIES = [
  "Swimming Pool", "Clubhouse", "Gymnasium", "Landscaped Gardens", "Kids Play Area",
  "24/7 Security", "Power Backup", "Covered Parking", "Jogging Track", "Indoor Games",
  "Visitor Parking", "Lift Access"
];

function enrichListing(p) {
  const gallery = [p.img.replace("w=1200", "w=1600")];
  for (let i = 0; gallery.length < 5; i++) {
    const url = GALLERY_POOL[(p.id + i) % GALLERY_POOL.length];
    if (!gallery.includes(url)) gallery.push(url);
  }
  const baths = p.bhkNum >= 4 ? "4" : p.bhkNum >= 3 ? "3" : "2";
  const progress = p.status === "Ready" ? 100 : p.status === "Under Construction" ? 45 + (p.id % 40) : 15 + (p.id % 25);
  return {
    ...p,
    gallery,
    baths,
    progress,
    rera: "UPRERAPRJ" + (10000 + p.id),
    possession: p.status === "Ready" ? "Immediate" : p.status === "Under Construction" ? "Dec 2027" : "Mar 2028",
    booking: "₹ 14.3 L",
    emi: "₹ 2,45,000",
    description:
      p.name +
      " is a verified " + p.bhk + " " + p.type.toLowerCase() + " in " + p.location + ", " + p.city +
      ". Spread across " + p.area + ", this " + p.status.toLowerCase() + " residence is ideal for " +
      (MOOD_LABELS[p.mood] || "quality living").toLowerCase() + ".",
    highlights: [
      p.bhk + " " + p.type + " with premium fittings",
      p.area + " super built-up area",
      p.status + " — possession " + (p.status === "Ready" ? "ready" : "as per schedule"),
      "RERA registered project",
      (MOOD_LABELS[p.mood] || "Quality") + " focused community",
      "High rental yield potential in " + p.city
    ],
    landmarks: [
      { icon: "fa-train-subway", name: "Metro Station", dist: "1.2 km" },
      { icon: "fa-school", name: "International School", dist: "800 m" },
      { icon: "fa-hospital", name: "Multi-specialty Hospital", dist: "2.5 km" },
      { icon: "fa-cart-shopping", name: "Shopping Mall", dist: "1.8 km" },
      { icon: "fa-plane", name: "Airport", dist: "45 min" },
      { icon: "fa-briefcase", name: "Business District", dist: "20 min" }
    ],
    paymentPlan: [
      { stage: "Booking Amount", pct: "10%", note: "On booking confirmation" },
      { stage: "Within 30 Days", pct: "20%", note: "Agreement to sale" },
      { stage: "On Possession", pct: "70%", note: "Balance via home loan or self fund" }
    ]
  };
}

function ldSection(id, title, icon, body) {
  return `<section class="ld-section" id="${id}">
  <div class="ld-section-head"><i class="fas ${icon}"></i><h2>${title}</h2></div>
  <div class="ld-section-body">${body}</div>
</section>`;
}

function generateListingDetail(p) {
  const similar = LISTINGS.filter((x) => x.id !== p.id).slice(0, 3);
  const nav = [
    ["ld-gallery", "Gallery"], ["ld-overview", "Overview"], ["ld-price", "Price"],
    ["ld-highlights", "Highlights"], ["ld-amenities", "Amenities"], ["ld-floorplan", "Floor Plan"],
    ["ld-masterplan", "Master Plan"], ["ld-map", "Map"], ["ld-landmarks", "Landmarks"],
    ["ld-builder", "Builder"], ["ld-progress", "Progress"], ["ld-emi", "EMI"], ["ld-inquiry", "Inquiry"]
  ];

  const galleryHead = `<div class="ld-section-head"><h1 class="ld-project-name">${esc(p.name)}</h1></div>`;
  const galleryBody = `<div class="ld-gallery">
  <div class="ld-gallery-main"><img src="${p.gallery[0]}" alt="${esc(p.name)}"></div>
  <div class="ld-gallery-grid">
    ${p.gallery.slice(1, 5).map((url, i) => `<div class="ld-gallery-thumb"><img src="${url}" alt="Gallery ${i + 2}"></div>`).join("\n    ")}
    <div class="ld-gallery-more"><i class="fas fa-images"></i> +12 Photos</div>
  </div>
</div>`;

  const gallerySection = `<section class="ld-section" id="ld-gallery">${galleryHead}<div class="ld-section-body">${galleryBody}</div></section>`;

  const overview = `<div class="ld-overview-grid">
  <div class="ld-overview-main">
    <p class="ld-location"><i class="fas fa-location-dot"></i> ${esc(p.location)}, ${esc(p.city)}</p>
    <div class="ld-badges">
      <span class="ld-badge">${esc(p.status)}</span>
      <span class="ld-badge">${esc(p.type)}</span>
      <span class="ld-badge">RERA Verified</span>
    </div>
    <p class="ld-overview-text">${esc(p.description)}</p>
  </div>
  <div class="ld-overview-meta">
    <div class="ld-meta-item"><i class="fas fa-bed"></i><span>${esc(p.bhk)}</span></div>
    <div class="ld-meta-item"><i class="fas fa-bath"></i><span>${p.baths} Bath</span></div>
    <div class="ld-meta-item"><i class="fas fa-vector-square"></i><span>${esc(p.area)}</span></div>
    <div class="ld-meta-item"><i class="fas fa-key"></i><span>${esc(p.possession)}</span></div>
  </div>
</div>`;

  const price = `<div class="ld-price-block">
  <div class="ld-price-main"><span class="ld-price-label">Total Price</span><strong>${esc(p.price)}</strong></div>
  <div class="ld-price-grid">
    <div class="ld-price-row"><span>Booking Amount</span><strong>${esc(p.booking)}</strong></div>
    <div class="ld-price-row"><span>Possession</span><strong>${esc(p.possession)}</strong></div>
    <div class="ld-price-row"><span>RERA ID</span><strong>${esc(p.rera)}</strong></div>
  </div>
  <div class="ld-payment-plan"><h3>Payment Plan</h3><div class="ld-plan-steps">
    ${p.paymentPlan.map((s, i) => `<div class="ld-plan-step"><span class="ld-plan-num">${i + 1}</span><div><strong>${esc(s.stage)} <em>${esc(s.pct)}</em></strong><p>${esc(s.note)}</p></div></div>`).join("\n    ")}
  </div></div>
</div>`;

  const highlights = `<ul class="ld-highlight-grid">${p.highlights.map((h) => `<li><i class="fas fa-check"></i> ${esc(h)}</li>`).join("\n  ")}</ul>`;
  const amenities = `<div class="ld-amenities-grid">${AMENITIES.map((a) => `<span class="ld-amenity"><i class="fas fa-check-circle"></i> ${esc(a)}</span>`).join("\n  ")}</div>`;
  const floorPlan = `<div class="ld-plan-card ld-plan-single"><img src="${p.gallery[1]}" alt="Floor plan"><div class="ld-plan-caption"><strong>Typical Floor Plan</strong><span>${esc(p.bhk)} layout — ${esc(p.area)}</span></div></div>`;
  const masterPlan = `<div class="ld-plan-card ld-plan-single"><img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" alt="Master plan"><div class="ld-plan-caption"><strong>Master Plan</strong><span>Site layout, towers, green zones &amp; amenity blocks</span></div></div>`;
  const map = `<div class="ld-map-wrap"><img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Location map"><div class="ld-map-overlay"><i class="fas fa-location-dot"></i> ${esc(p.location)}, ${esc(p.city)}</div><a href="https://maps.google.com" target="_blank" rel="noopener" class="ld-map-open">Open in Google Maps <i class="fas fa-external-link-alt"></i></a></div>`;
  const landmarks = `<div class="ld-landmarks-grid">${p.landmarks.map((l) => `<div class="ld-landmark"><i class="fas ${l.icon}"></i><div><strong>${esc(l.name)}</strong><span>${esc(l.dist)}</span></div></div>`).join("\n  ")}</div>`;
  const builder = `<div class="ld-builder-card"><div class="ld-builder-logo">IN</div><div><h3>Inchbrick Premier Developers</h3><p>Trusted developer with a track record of on-time delivery and quality construction across premium residential projects.</p><div class="ld-builder-stats"><div><strong>2008</strong><span>Since</span></div><div><strong>24+</strong><span>Projects</span></div><div><strong>4.8/5</strong><span>Rating</span></div></div><a href="developer-detail.html" class="ld-builder-link"><i class="fas fa-arrow-right"></i> View Developer Profile</a></div></div>`;
  const phases = [["Foundation", 25], ["Structure", 55], ["Finishing", 80], ["Handover", 100]];
  const progress = `<div class="ld-progress-wrap"><div class="ld-progress-head"><span>Overall Progress</span><strong>${p.progress}%</strong></div><div class="ld-progress-bar"><div class="ld-progress-fill" style="width:${p.progress}%"></div></div><div class="ld-progress-phases">${phases.map(([n, t]) => `<div class="ld-phase${p.progress >= t ? " is-done" : ""}"><i class="fas fa-${p.progress >= t ? "check-circle" : "circle"}"></i> ${n}</div>`).join("\n  ")}</div></div>`;
  const emi = `<div class="ld-emi"><div class="ld-emi-result"><span>Estimated EMI</span><strong>${esc(p.emi)} / month</strong><p class="ld-emi-note">Based on 80% loan at 8.5% for 20 years. Indicative only.</p></div></div>`;
  const brochure = `<div class="ld-brochure"><div class="ld-brochure-icon"><i class="fas fa-file-pdf"></i></div><div><h3>Download Brochure</h3><p>Get floor plans, payment schedule, and amenity details for ${esc(p.name)}.</p></div><a href="contact.html#contactForm" class="ld-btn ld-btn-primary"><i class="fas fa-download"></i> Request Brochure</a></div>`;
  const similarHtml = `<div class="ld-similar-grid">${similar.map((s) => `<a href="listing-detail.html" class="ld-similar-card"><img src="${s.img}" alt="${esc(s.name)}"><div><strong>${esc(s.name)}</strong><span>${esc(s.location)}, ${esc(s.city)}</span><em>${esc(s.price)} · ${esc(s.bhk)}</em></div></a>`).join("\n  ")}</div>`;
  const inquiry = `<form class="ld-inquiry" action="contact.html#contactForm"><div class="ld-inquiry-grid"><input type="text" name="name" placeholder="Your Name" required><input type="tel" name="phone" placeholder="Phone Number" required><input type="email" name="email" placeholder="Email Address" required><select name="interest"><option>Schedule Site Visit</option><option>Request Callback</option><option>Get Price Details</option></select></div><textarea name="message" placeholder="Your message">I am interested in ${esc(p.name)}.</textarea><button type="submit" class="ld-btn ld-btn-primary"><i class="fas fa-paper-plane"></i> Submit Inquiry</button></form>`;

  const sidebar = `<aside class="ld-sidebar"><div class="ld-sidebar-card"><div class="ld-sidebar-hero"><div class="ld-sidebar-hero-glow"></div><div class="ld-sidebar-badges"><span class="ld-sidebar-badge">For Sale</span><span class="ld-sidebar-rera"><i class="fas fa-shield-halved"></i> RERA Verified</span></div><p class="ld-sidebar-label">Starting Price</p><p class="ld-sidebar-price">${esc(p.price)}</p><p class="ld-sidebar-emi">EMI from <strong>${esc(p.emi)}</strong> / month</p><p class="ld-sidebar-loc"><i class="fas fa-location-dot"></i> ${esc(p.location)}, ${esc(p.city)}</p></div><div class="ld-sidebar-body"><div class="ld-sidebar-stats"><div class="ld-sidebar-stat"><i class="fas fa-bed"></i><div><span>Configuration</span><strong>${esc(p.bhk)}</strong></div></div><div class="ld-sidebar-stat"><i class="fas fa-vector-square"></i><div><span>Area</span><strong>${esc(p.area)}</strong></div></div><div class="ld-sidebar-stat"><i class="fas fa-key"></i><div><span>Status</span><strong>${esc(p.status)}</strong></div></div></div><div class="ld-sidebar-actions"><a href="#ld-inquiry" class="ld-btn ld-btn-primary ld-btn-glow"><i class="fas fa-calendar-check"></i> Book Site Visit</a><div class="ld-sidebar-action-row"><a href="tel:+919876543210" class="ld-btn ld-btn-outline"><i class="fas fa-phone"></i> Call</a><a href="contact.html#contactForm" class="ld-btn ld-btn-outline"><i class="fas fa-download"></i> Brochure</a></div></div></div></div><div class="ld-sidebar-news"><div class="ld-sidebar-news-head"><h3><i class="fas fa-newspaper"></i> News &amp; Articles</h3><a href="blog.html">View all</a></div><div class="ld-news-list"><a href="blog-detail.html" class="ld-news-item"><img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80" alt=""><div class="ld-news-body"><span class="ld-news-tag ld-news-tag--news">News</span><strong>Top Localities to Invest in ${esc(p.city)} in 2026</strong><time>Mar 5, 2026</time></div></a><a href="blog-detail.html" class="ld-news-item"><img src="https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=400&q=80" alt=""><div class="ld-news-body"><span class="ld-news-tag ld-news-tag--article">Article</span><strong>Home Loan Tips: Reduce EMI Without Stress</strong><time>Feb 15, 2026</time></div></a></div></div></aside>`;

  return `${pageHead(p.name + " | Inchbrick Realty", p.description.slice(0, 155), "listing-detail.css")}
<body class="detail-page" data-page="listings">
  <script src="js/layout.js"></script>
  <div id="site-header" data-page="listings"></div>

  <div class="ld-page">
    <div class="ld-topbar ld-container"><a href="listings.html" class="ld-back"><i class="fas fa-arrow-left"></i> Back to Listings</a></div>
    <div class="ld-jump-sticky"><div class="ld-container"><nav class="ld-jump-nav" aria-label="Page sections">${nav.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}</nav></div></div>
    <div class="ld-layout ld-container">
      <div class="ld-main">
        ${gallerySection}
        ${ldSection("ld-overview", "Property Overview", "fa-building", overview)}
        ${ldSection("ld-price", "Price & Payment Plan", "fa-indian-rupee-sign", price)}
        ${ldSection("ld-highlights", "Key Highlights", "fa-star", highlights)}
        ${ldSection("ld-amenities", "Amenities", "fa-concierge-bell", amenities)}
        ${ldSection("ld-floorplan", "Floor Plans", "fa-layer-group", floorPlan)}
        ${ldSection("ld-masterplan", "Master Plan", "fa-map", masterPlan)}
        ${ldSection("ld-map", "Location Map", "fa-map-location-dot", map)}
        ${ldSection("ld-landmarks", "Nearby Landmarks", "fa-location-arrow", landmarks)}
        ${ldSection("ld-builder", "Builder Information", "fa-hard-hat", builder)}
        ${ldSection("ld-progress", "Construction Progress", "fa-chart-line", progress)}
        ${ldSection("ld-emi", "EMI Calculator", "fa-calculator", emi)}
        ${ldSection("ld-brochure", "Brochure Download", "fa-file-pdf", brochure)}
        ${ldSection("ld-similar", "Similar Properties", "fa-clone", similarHtml)}
        ${ldSection("ld-inquiry", "Inquiry Form", "fa-envelope", inquiry)}
      </div>
      ${sidebar}
    </div>
  </div>

${pageFoot()}`;
}

function tagClass(tag) {
  return "bd-tag bd-tag--" + (tag || "navy");
}

function generateBlogDetail(a, related) {
  const initials = a.author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const href = () => "blog-detail.html";

  return `${pageHead(a.title + " | Inchbrick Realty Blog", a.excerpt.slice(0, 155), "blog-detail.css")}
<body class="blog-detail-page" data-page="blog">
  <script src="js/layout.js"></script>
  <div id="site-header" data-page="blog"></div>

  <article class="bd-page">
    <div class="bd-container"><a href="blog.html" class="bd-back"><i class="fas fa-arrow-left"></i> Back to Blog</a></div>
    <header class="bd-hero">
      <div class="bd-container bd-hero-inner">
        <span class="${tagClass(a.tagClass)}">${esc(a.categoryLabel)}</span>
        <h1>${esc(a.title)}</h1>
        <div class="bd-meta">
          <span><i class="far fa-calendar"></i> ${esc(a.date)}</span>
          <span><i class="far fa-clock"></i> ${esc(a.readTime)} read</span>
          <span><i class="far fa-user"></i> ${esc(a.author)}</span>
        </div>
      </div>
      <div class="bd-hero-img"><img src="${a.img}" alt="${esc(a.title)}"></div>
    </header>
    <div class="bd-layout bd-container">
      <div class="bd-main">
        <p class="bd-lead">${esc(a.excerpt)}</p>
        ${a.content.map((p) => `<p>${esc(p)}</p>`).join("\n        ")}
        <aside class="bd-takeaways"><h3><i class="fas fa-lightbulb"></i> Key Takeaways</h3><ul>${a.takeaways.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></aside>
        <div class="bd-share"><span>Share:</span><a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a><a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a><a href="#" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a></div>
      </div>
      <aside class="bd-sidebar">
        <div class="bd-author"><div class="bd-author-avatar">${initials}</div><div><strong>${esc(a.author)}</strong><span>${esc(a.authorRole)}</span><p>Contributing writer at Inchbrick Realty with expertise in ${esc(a.categoryLabel.toLowerCase())} insights.</p></div></div>
        <div class="bd-related"><h3>Related Articles</h3>
          ${related.map((r) => `<a href="${href()}" class="bd-related-item"><img src="${r.img}" alt=""><div><span class="${tagClass(r.tagClass)}">${esc(r.categoryLabel)}</span><strong>${esc(r.title)}</strong></div></a>`).join("\n          ")}
        </div>
        <div class="bd-sidebar-cta"><h3>Looking for a home?</h3><p>Browse verified listings or talk to our experts.</p><a href="listings.html" class="bd-btn bd-btn--primary">View Properties</a><a href="contact.html#contactForm" class="bd-btn bd-btn--outline">Contact Us</a></div>
      </aside>
    </div>
    <section class="bd-newsletter"><div class="bd-container bd-newsletter-inner"><div><h3>Weekly Market Pulse</h3><p>Curated launches, price movements, and guides — one email per week.</p></div><form class="bd-newsletter-form" action="contact.html#contactForm"><input type="email" required placeholder="you@email.com" aria-label="Email"><button type="submit">Subscribe</button></form></div></section>
  </article>

${pageFoot()}`;
}

function stars(n) {
  let html = "";
  for (let i = 1; i <= 5; i++) html += `<i class="fas fa-star${i <= n ? "" : " dd-star-dim"}"></i>`;
  return html;
}

function enrichDeveloper(d) {
  const start = parseInt(d.since, 10);
  const years = new Date().getFullYear() - start;
  const span = Math.max(2026 - start, 1);
  const timeline = [
    { year: d.since, title: "Company Founded", text: d.name + " established headquarters in " + d.hq + "." },
    { year: String(start + Math.round(span * 0.25)), title: "Regional Growth", text: "Expanded operations across major cities and launched signature residential projects." },
    { year: String(start + Math.round(span * 0.5)), title: "Landmark Deliveries", text: "Completed large-scale townships and premium towers with strong buyer trust." },
    { year: "2026", title: "Industry Leader", text: d.projects + "+ projects delivered across " + d.cities + "+ cities." }
  ];
  const portfolio = [
    ...d.completed.map((p) => ({ ...p, status: "Completed", label: p.year, cls: "done" })),
    ...d.ongoing.map((p) => ({ ...p, status: "Ongoing", label: p.status, cls: "live" })),
    ...d.upcoming.map((p) => ({ ...p, status: "Upcoming", label: p.launch, cls: "new" }))
  ];
  return { ...d, years, timeline, portfolio };
}

const PORTFOLIO_IMGS = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
];

function ddSection(id, title, icon, body, alt) {
  return `<section class="dd-section${alt ? " dd-section--alt" : ""}" id="${id}"><div class="dd-container"><div class="dd-section-head"><i class="fas ${icon}"></i><h2>${title}</h2></div><div class="dd-section-body">${body}</div></div></section>`;
}

function generateDeveloperDetail(d) {
  const dev = enrichDeveloper(d);
  const href = d.id === 1 ? "developer-detail.html" : `developer-detail-${d.id}.html`;

  const banner = `<section class="dd-banner"><div class="dd-container dd-banner-inner"><a href="developers.html" class="dd-back"><i class="fas fa-arrow-left"></i> All Developers</a><div class="dd-banner-content"><span class="dd-banner-logo">${esc(dev.short.slice(0, 2).toUpperCase())}</span><div><h1>${esc(dev.name)}</h1><p>${esc(dev.tagline)}</p><div class="dd-banner-meta"><span><i class="fas fa-location-dot"></i> ${esc(dev.hq)}</span><span><i class="fas fa-star"></i> ${dev.rating} Rating</span><span><i class="fas fa-shield-halved"></i> RERA Verified</span></div></div></div></div></section>`;

  const profile = `<div class="dd-profile"><div class="dd-profile-img"><img src="${dev.img}" alt="${esc(dev.name)}"></div><div class="dd-profile-text"><p>${esc(dev.overview)}</p><ul class="dd-highlights">${dev.highlights.map((h) => `<li><i class="fas fa-check"></i> ${esc(h)}</li>`).join("")}</ul></div></div>`;

  const experience = `<div class="dd-experience"><div class="dd-exp-main"><span class="dd-exp-num">${dev.years}+</span><strong>Years of Experience</strong><p>Building trusted communities since ${esc(dev.since)}</p></div><div class="dd-exp-grid"><div class="dd-exp-stat"><i class="fas fa-building"></i><strong>${dev.projects}+</strong><span>Projects Delivered</span></div><div class="dd-exp-stat"><i class="fas fa-map-location-dot"></i><strong>${dev.cities}+</strong><span>Cities Presence</span></div><div class="dd-exp-stat"><i class="fas fa-star"></i><strong>${dev.rating}/5</strong><span>Customer Rating</span></div><div class="dd-exp-stat"><i class="fas fa-calendar"></i><strong>${esc(dev.since)}</strong><span>Established</span></div></div></div>`;

  const timeline = `<div class="dd-timeline">${dev.timeline.map((t, i) => `<div class="dd-timeline-item"><span class="dd-timeline-dot">${i + 1}</span><div class="dd-timeline-body"><time>${esc(t.year)}</time><strong>${esc(t.title)}</strong><p>${esc(t.text)}</p></div></div>`).join("")}</div>`;

  const portfolio = `<div class="dd-portfolio"><div class="dd-portfolio-grid">${dev.portfolio.map((p, i) => `<article class="dd-portfolio-card"><img src="${PORTFOLIO_IMGS[i % PORTFOLIO_IMGS.length]}" alt="${esc(p.name)}"><div class="dd-portfolio-body"><span class="dd-tag dd-tag--${p.cls}">${esc(p.status)}</span><strong>${esc(p.name)}</strong><span>${esc(p.city)} · ${esc(p.type)}</span><em>${esc(p.label)}</em></div></article>`).join("")}</div></div>`;

  const awards = `<div class="dd-awards-grid">${dev.awards.map((a) => `<article class="dd-award"><span class="dd-award-year">${esc(a.year)}</span><div class="dd-award-icon"><i class="fas fa-trophy"></i></div><strong>${esc(a.title)}</strong><span>${esc(a.org)}</span></article>`).join("")}</div>`;

  const testimonials = `<div class="dd-testimonials"><div class="dd-testimonials-summary"><strong>${dev.rating}</strong><div class="dd-stars">${stars(Math.round(dev.rating))}</div><span>Based on verified buyer feedback</span></div><div class="dd-testimonials-grid">${dev.reviews.map((r) => `<article class="dd-testimonial"><div class="dd-stars">${stars(r.rating)}</div><p>"${esc(r.text)}"</p><footer><strong>${esc(r.name)}</strong><span>${esc(r.city)}</span></footer></article>`).join("")}</div></div>`;

  const contact = `<div class="dd-contact"><div class="dd-contact-info"><h3>Connect with Inchbrick Realty</h3><p>Interested in ${esc(dev.name)} projects? Our advisors will share curated options, payment plans, and site visit slots.</p><ul><li><i class="fas fa-phone"></i> <a href="tel:+919876543210">+91 98765 43210</a></li><li><i class="fas fa-envelope"></i> <a href="mailto:support@inchbrickrealty.com">support@inchbrickrealty.com</a></li><li><i class="fas fa-clock"></i> Mon–Sat, 9 AM – 7 PM IST</li></ul></div><form class="dd-contact-form" action="contact.html#contactForm"><input type="hidden" name="developer" value="${esc(dev.name)}"><div class="dd-form-row"><input type="text" name="name" placeholder="Your Name" required><input type="tel" name="phone" placeholder="Phone Number" required></div><input type="email" name="email" placeholder="Email Address" required><select name="interest"><option>Project Information</option><option>Schedule Site Visit</option><option>Investment Advisory</option></select><textarea name="message" placeholder="Your message">I would like to know more about ${esc(dev.name)} projects.</textarea><button type="submit" class="dd-btn dd-btn--primary"><i class="fas fa-paper-plane"></i> Send Inquiry</button></form></div>`;

  return `${pageHead(dev.name + " | Developer Profile | Inchbrick Realty", dev.overview.slice(0, 155), "developer-detail.css")}
<body class="developer-detail-page" data-page="home">
  <script src="js/layout.js"></script>
  <div id="site-header" data-page="home"></div>

  ${banner}
  ${ddSection("dd-profile", "Company Profile", "fa-building", profile)}
  ${ddSection("dd-experience", "Years of Experience", "fa-chart-line", experience, true)}
  ${ddSection("dd-timeline", "Timeline", "fa-clock-rotate-left", timeline)}
  ${ddSection("dd-portfolio", "Project Portfolio", "fa-layer-group", portfolio, true)}
  ${ddSection("dd-awards", "Awards", "fa-trophy", awards)}
  ${ddSection("dd-testimonials", "Customer Testimonials", "fa-quote-left", testimonials, true)}
  ${ddSection("dd-contact", "Contact Section", "fa-envelope", contact)}

${pageFoot()}`;
}

function citySection(id, title, icon, body, alt) {
  return `<section class="city-section${alt ? " city-section--alt" : ""}" id="${id}"><div class="city-container"><div class="city-section-head"><i class="fas ${icon}"></i><h2>${title}</h2></div>${body}</div></section>`;
}

function generateCityPage(c, filename) {
  const max = c.priceTrends.length - 1;
  const hero = `<section class="city-hero" style="background-image:linear-gradient(135deg,rgba(15,35,57,0.92),rgba(12,26,46,0.88)),url(${c.heroImg})"><div class="city-container city-hero-inner"><a href="index.html#localities" class="city-back"><i class="fas fa-arrow-left"></i> All Cities</a><div class="city-hero-content"><span class="city-hero-tag"><i class="fas ${c.icon}"></i> ${esc(c.tag)}</span><h1>${esc(c.name)}</h1><p>${esc(c.state)} · Real estate guide</p><div class="city-hero-stats"><div><strong>${esc(c.startingPrice)}</strong><span>Starting price</span></div><div><strong>${esc(c.listings)}</strong><span>Active listings</span></div></div><a href="listings.html" class="city-hero-cta">Browse Properties in ${esc(c.name)} <i class="fas fa-arrow-right"></i></a></div></div></section>`;

  const about = citySection("city-about", "About " + c.name, "fa-city", `<div class="city-about"><p>${esc(c.about)}</p><ul class="city-highlights">${c.highlights.map((h) => `<li><i class="fas fa-check"></i> ${esc(h)}</li>`).join("")}</ul></div>`);

  const projects = citySection("city-projects", "Top Projects", "fa-building", `<div class="city-projects-grid">${c.projects.map((p) => `<article class="city-project"><img src="${p.img}" alt="${esc(p.name)}"><div><span class="city-project-area">${esc(p.area)}</span><strong>${esc(p.name)}</strong><span>${esc(p.type)} · <em>${esc(p.price)}</em></span></div></article>`).join("")}</div><a href="listings.html" class="city-link-btn">View all projects <i class="fas fa-arrow-right"></i></a>`, true);

  const map = citySection("city-map", "Local Map", "fa-map-location-dot", `<div class="city-map-wrap"><img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Map of ${esc(c.name)}"><div class="city-map-pin"><i class="fas fa-location-dot"></i> ${esc(c.name)}, ${esc(c.state)}</div><a href="https://maps.google.com" target="_blank" rel="noopener" class="city-map-link">Open in Google Maps</a></div>`);

  const trends = citySection("city-trends", "Price Trends", "fa-chart-line", `<div class="city-trends"><p class="city-trends-note">Average residential price movement (indicative)</p><div class="city-trends-chart">${c.priceTrends.map((t, i) => `<div class="city-trend-bar"><div class="city-trend-fill" style="height:${55 + (i / max) * 45}%"></div><span class="city-trend-val">${esc(t.avg)}</span><span class="city-trend-year">${esc(t.year)}</span></div>`).join("")}</div></div>`, true);

  const infra = citySection("city-infra", "Infrastructure", "fa-road", `<div class="city-infra-grid">${c.infrastructure.map((item) => `<div class="city-infra-item"><i class="fas ${item.icon}"></i><strong>${esc(item.title)}</strong><p>${esc(item.desc)}</p></div>`).join("")}</div>`);

  const schools = citySection("city-schools", "Schools", "fa-school", `<div class="city-list-grid">${c.schools.map((s) => `<div class="city-list-item"><i class="fas fa-graduation-cap"></i><div><strong>${esc(s.name)}</strong><span>${esc(s.type)} · ${esc(s.dist)}</span></div></div>`).join("")}</div>`, true);

  const hospitals = citySection("city-hospitals", "Hospitals", "fa-hospital", `<div class="city-list-grid">${c.hospitals.map((h) => `<div class="city-list-item"><i class="fas fa-heart-pulse"></i><div><strong>${esc(h.name)}</strong><span>${esc(h.type)} · ${esc(h.dist)}</span></div></div>`).join("")}</div>`);

  const faq = citySection("city-faq", "FAQ", "fa-circle-question", `<div class="city-faq-list">${c.faq.map((f) => `<details class="city-faq-item"><summary class="city-faq-q">${esc(f.q)}<i class="fas fa-chevron-down"></i></summary><div class="city-faq-a"><p>${esc(f.a)}</p></div></details>`).join("")}</div>`, true);

  const cta = `<section class="city-cta"><div class="city-container city-cta-inner"><div><h2>Ready to explore ${esc(c.name)}?</h2><p>Get curated property shortlists and expert guidance from Inchbrick Realty.</p></div><div><a href="listings.html" class="city-btn city-btn--primary">View Listings</a><a href="contact.html#contactForm" class="city-btn city-btn--outline">Talk to Expert</a></div></div></section>`;

  return `${pageHead(c.name + " Property Guide | Inchbrick Realty", c.about.slice(0, 155), "city.css")}
<body class="city-page" data-page="explore">
  <script src="js/layout.js"></script>
  <div id="site-header" data-page="explore"></div>

  ${hero}
  ${about}
  ${projects}
  ${map}
  ${trends}
  ${infra}
  ${schools}
  ${hospitals}
  ${faq}
  ${cta}

${pageFoot()}`;
}

// Generate single detail pages only
const listing = enrichListing(LISTINGS.find((p) => p.id === 5) || LISTINGS[0]);
fs.writeFileSync(path.join(root, "listing-detail.html"), generateListingDetail(listing));

const blogArticle = BLOG[0];
const blogRelated = BLOG.filter((x) => x.id !== blogArticle.id).slice(0, 3);
fs.writeFileSync(path.join(root, "blog-detail.html"), generateBlogDetail(blogArticle, blogRelated));

const developer = DEVELOPERS[0];
fs.writeFileSync(path.join(root, "developer-detail.html"), generateDeveloperDetail(developer));

const city = CITIES.mumbai || Object.values(CITIES)[0];
fs.writeFileSync(path.join(root, "city.html"), generateCityPage(city, "city.html"));

console.log("Generated static detail pages:");
console.log("- listing-detail.html");
console.log("- blog-detail.html");
console.log("- developer-detail.html");
console.log("- city.html");
