/**
 * Property listing detail — full section layout
 */
(function () {
  const data = window.LISTINGS_DATA || [];
  const moodLabels = window.MOOD_LABELS || {};
  const root = document.getElementById("detailRoot");
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  const GALLERY_POOL = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=92",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=92",
    "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=1400&q=92",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=92",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=92",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=92"
  ];

  const AMENITIES = [
    "Swimming Pool", "Clubhouse", "Gymnasium", "Landscaped Gardens", "Kids Play Area",
    "24/7 Security", "Power Backup", "Covered Parking", "Jogging Track", "Indoor Games",
    "Visitor Parking", "Lift Access"
  ];

  const BUILDERS = {
    default: { name: "Inchbrick Premier Developers", since: "2008", projects: "24+", rating: "4.8" }
  };

  const ARTICLES = [
    {
      type: "News",
      title: "RERA Updates: What Buyers Should Know in 2026",
      date: "Mar 12, 2026",
      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80",
      href: "blog-detail.html?id=9"
    },
    {
      type: "Article",
      title: "How to Evaluate Luxury Projects Before You Buy",
      date: "Feb 28, 2026",
      img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=400&q=80",
      href: "blog-detail.html?id=5"
    },
    {
      type: "Article",
      title: "Home Loan Tips: Reduce EMI Without Stress",
      date: "Feb 15, 2026",
      img: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=400&q=80",
      href: "blog-detail.html?id=2"
    },
    {
      type: "News",
      title: "Metro Expansion Boosts Property Demand in Key Corridors",
      date: "Jan 30, 2026",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
      href: "blog-detail.html?id=4"
    }
  ];

  function articlesForCity(city) {
    const cityArticle = {
      type: "News",
      title: "Top Localities to Invest in " + city + " in 2026",
      date: "Mar 5, 2026",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
      href: "blog-detail.html?id=1"
    };
    return [cityArticle, ...ARTICLES.slice(0, 3)];
  }

  function enrich(p) {
    const gallery = [p.img.replace("w=1200", "w=1600")];
    for (let i = 0; gallery.length < 5; i++) {
      const url = GALLERY_POOL[(p.id + i) % GALLERY_POOL.length];
      if (!gallery.includes(url)) gallery.push(url);
    }
    const baths = p.bhkNum >= 4 ? "4" : p.bhkNum >= 3 ? "3" : "2";
    const builder = BUILDERS.default;
    const progress = p.status === "Ready" ? 100 : p.status === "Under Construction" ? 45 + (p.id % 40) : 15 + (p.id % 25);

    return {
      ...p,
      gallery,
      videoPoster: gallery[0],
      baths,
      builder,
      progress,
      rera: "UPRERAPRJ" + (10000 + p.id),
      possession: p.status === "Ready" ? "Immediate" : p.status === "Under Construction" ? "Dec 2027" : "Mar 2028",
      booking: "₹ " + Math.round(p.priceVal * (p.priceVal >= 100 ? 0.05 : 0.1) * (p.priceVal >= 100 ? 100 : 1) / 10) * 10 + " K",
      highlights: [
        p.bhk + " " + p.type + " with premium fittings",
        p.area + " super built-up area",
        p.status + " — possession " + (p.status === "Ready" ? "ready" : "as per schedule"),
        "RERA registered project",
        moodLabels[p.mood] + " focused community",
        "High rental yield potential in " + p.city
      ],
      landmarks: [
        { icon: "fa-train-subway", name: "Metro Station", dist: "1.2 km" },
        { icon: "fa-school", name: "International School", dist: "800 m" },
        { icon: "fa-hospital", name: "Multi-specialty Hospital", dist: "2.5 km" },
        { icon: "fa-cart-shopping", name: "Shopping Mall", dist: "1.8 km" },
        { icon: "fa-plane", name: "Airport", dist: p.city === "Mumbai" ? "45 min" : "35 min" },
        { icon: "fa-briefcase", name: "Business District", dist: "20 min" }
      ],
      paymentPlan: [
        { stage: "Booking Amount", pct: "10%", note: "On booking confirmation" },
        { stage: "Within 30 Days", pct: "20%", note: "Agreement to sale" },
        { stage: "On Possession", pct: "70%", note: "Balance via home loan or self fund" }
      ],
      description:
        p.name +
        " is a verified " +
        p.bhk +
        " " +
        p.type.toLowerCase() +
        " in " +
        p.location +
        ", " +
        p.city +
        ". Spread across " +
        p.area +
        ", this " +
        p.status.toLowerCase() +
        " residence is ideal for " +
        (moodLabels[p.mood] || "quality living").toLowerCase() +
        "."
    };
  }

  function similarProperties(current) {
    return data
      .filter((x) => x.id !== current.id && (x.city === current.city || x.type === current.type))
      .slice(0, 3);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function section(id, title, icon, body) {
    return (
      '<section class="ld-section" id="' + id + '">' +
      '<div class="ld-section-head"><i class="fas ' + icon + '"></i><h2>' + title + "</h2></div>" +
      '<div class="ld-section-body">' + body + "</div></section>"
    );
  }

  function renderNotFound() {
    document.title = "Property Not Found | Inchbrick Realty";
    root.innerHTML =
      '<div class="detail-not-found"><h1>Property not found</h1><p>This listing may have been removed.</p><a href="listings.html">Back to listings</a></div>';
  }

  function renderGallery(prop) {
    const main = prop.gallery[0];
    const thumbs = prop.gallery.slice(1, 5);
    return (
      '<div class="ld-gallery">' +
      '<div class="ld-gallery-main">' +
      '<img id="detailMainImg" src="' + main + '" alt="' + esc(prop.name) + '">' +
      '<button type="button" class="ld-video-btn" id="ldVideoBtn"><i class="fas fa-play"></i> Watch Video</button>' +
      "</div>" +
      '<div class="ld-gallery-grid">' +
      thumbs
        .map(
          (url, i) =>
            '<button type="button" class="ld-gallery-thumb' +
            (i === 0 ? "" : "") +
            '" data-img="' +
            url +
            '"><img src="' +
            url +
            '" alt="Gallery ' +
            (i + 2) +
            '"></button>'
        )
        .join("") +
      '<button type="button" class="ld-gallery-more" id="ldGalleryMore"><i class="fas fa-images"></i> +' +
      (prop.gallery.length + 8) +
      " Photos</button></div></div>"
    );
  }

  function renderOverview(prop) {
    return (
      '<div class="ld-overview-grid">' +
      '<div class="ld-overview-main">' +
      "<h1>" + esc(prop.name) + "</h1>" +
      '<p class="ld-location"><i class="fas fa-location-dot"></i> ' + esc(prop.location) + ", " + esc(prop.city) + "</p>" +
      '<div class="ld-badges">' +
      badge(prop.status) +
      badge(prop.type) +
      badge("RERA Verified") +
      "</div>" +
      '<p class="ld-overview-text">' + esc(prop.description) + "</p>" +
      "</div>" +
      '<div class="ld-overview-meta">' +
      metaItem("fa-bed", prop.bhk) +
      metaItem("fa-bath", bathsLabel(prop)) +
      metaItem("fa-vector-square", prop.area) +
      metaItem("fa-key", prop.possession) +
      "</div></div>"
    );
  }

  function bathsLabel(p) {
    return p.baths + " Bath";
  }

  function badge(text) {
    return '<span class="ld-badge">' + esc(text) + "</span>";
  }

  function metaItem(icon, text) {
    return '<div class="ld-meta-item"><i class="fas ' + icon + '"></i><span>' + esc(text) + "</span></div>";
  }

  function renderPrice(prop) {
    return (
      '<div class="ld-price-block">' +
      '<div class="ld-price-main"><span class="ld-price-label">Total Price</span><strong>' + esc(prop.price) + "</strong></div>" +
      '<div class="ld-price-grid">' +
      priceRow("Booking Amount", prop.booking) +
      priceRow("Price per sq.ft", "₹ " + Math.round((prop.priceVal >= 100 ? prop.priceVal * 100 : prop.priceVal) * 10000 / parseInt(prop.area.replace(/,/g, ""), 10)).toLocaleString("en-IN")) +
      priceRow("Possession", prop.possession) +
      priceRow("RERA ID", prop.rera) +
      "</div>" +
      '<div class="ld-payment-plan"><h3>Payment Plan</h3><div class="ld-plan-steps">' +
      prop.paymentPlan
        .map(
          (step, i) =>
            '<div class="ld-plan-step"><span class="ld-plan-num">' +
            (i + 1) +
            '</span><div><strong>' +
            esc(step.stage) +
            ' <em>' +
            esc(step.pct) +
            "</em></strong><p>" +
            esc(step.note) +
            "</p></div></div>"
        )
        .join("") +
      "</div></div>"
    );
  }

  function priceRow(label, val) {
    return '<div class="ld-price-row"><span>' + esc(label) + "</span><strong>" + esc(val) + "</strong></div>";
  }

  function renderHighlights(prop) {
    return (
      '<ul class="ld-highlight-grid">' +
      prop.highlights.map((h) => '<li><i class="fas fa-check"></i> ' + esc(h) + "</li>").join("") +
      "</ul>"
    );
  }

  function renderAmenities() {
    return (
      '<div class="ld-amenities-grid">' +
      AMENITIES.map((a) => '<span class="ld-amenity"><i class="fas fa-check-circle"></i> ' + esc(a) + "</span>").join("") +
      "</div>"
    );
  }

  function renderFloorPlan(prop) {
    return (
      '<div class="ld-plan-card ld-plan-single">' +
      '<img src="' +
      prop.gallery[1] +
      '" alt="Floor plan">' +
      '<div class="ld-plan-caption"><strong>Typical Floor Plan</strong><span>' +
      esc(prop.bhk) +
      " layout — " +
      esc(prop.area) +
      "</span></div></div>"
    );
  }

  function renderMasterPlan() {
    return (
      '<div class="ld-plan-card ld-plan-single">' +
      '<img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" alt="Master plan">' +
      '<div class="ld-plan-caption"><strong>Master Plan</strong><span>Site layout, towers, green zones &amp; amenity blocks</span></div></div>'
    );
  }

  function renderMap(prop) {
    return (
      '<div class="ld-map-wrap">' +
      '<img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Location map">' +
      '<div class="ld-map-overlay"><i class="fas fa-location-dot"></i> ' +
      esc(prop.location) +
      ", " +
      esc(prop.city) +
      '</div><a href="https://maps.google.com" target="_blank" rel="noopener" class="ld-map-open">Open in Google Maps <i class="fas fa-external-link-alt"></i></a></div>'
    );
  }

  function renderLandmarks(prop) {
    return (
      '<div class="ld-landmarks-grid">' +
      prop.landmarks
        .map(
          (l) =>
            '<div class="ld-landmark"><i class="fas ' +
            l.icon +
            '"></i><div><strong>' +
            esc(l.name) +
            "</strong><span>" +
            esc(l.dist) +
            "</span></div></div>"
        )
        .join("") +
      "</div>"
    );
  }

  function renderBuilder(prop) {
    const b = prop.builder;
    return (
      '<div class="ld-builder-card">' +
      '<div class="ld-builder-logo">' +
      b.name.split(" ")[0].slice(0, 2).toUpperCase() +
      "</div>" +
      "<div><h3>" +
      esc(b.name) +
      "</h3><p>Trusted developer with a track record of on-time delivery and quality construction across premium residential projects.</p>" +
      '<div class="ld-builder-stats">' +
      '<div><strong>' +
      b.since +
      "</strong><span>Since</span></div>" +
      '<div><strong>' +
      b.projects +
      "</strong><span>Projects</span></div>" +
      '<div><strong>' +
      b.rating +
      '/5</strong><span>Rating</span></div></div>' +
      '<a href="developer-detail.html?id=' +
      ((prop.id % 6) + 1) +
      '" class="ld-builder-link"><i class="fas fa-arrow-right"></i> View Developer Profile</a></div></div>'
    );
  }

  function renderProgress(prop) {
    return (
      '<div class="ld-progress-wrap">' +
      '<div class="ld-progress-head"><span>Overall Progress</span><strong>' +
      prop.progress +
      "%</strong></div>" +
      '<div class="ld-progress-bar"><div class="ld-progress-fill" style="width:' +
      prop.progress +
      '%"></div></div>' +
      '<div class="ld-progress-phases">' +
      phase("Foundation", prop.progress >= 25) +
      phase("Structure", prop.progress >= 55) +
      phase("Finishing", prop.progress >= 80) +
      phase("Handover", prop.progress >= 100) +
      "</div></div>"
    );
  }

  function phase(name, done) {
    return (
      '<div class="ld-phase' +
      (done ? " is-done" : "") +
      '"><i class="fas fa-' +
      (done ? "check-circle" : "circle") +
      '"></i> ' +
      esc(name) +
      "</div>"
    );
  }

  function renderEmi(prop) {
    const defaultLoan = prop.priceVal >= 100 ? prop.priceVal * 80 : prop.priceVal * 0.8 * 100;
    return (
      '<div class="ld-emi">' +
      '<div class="ld-emi-fields">' +
      field("emiLoan", "Loan Amount (₹ Lakhs)", defaultLoan.toFixed(1), "number") +
      field("emiRate", "Interest Rate (% p.a.)", "8.5", "number") +
      field("emiTenure", "Tenure (Years)", "20", "number") +
      "</div>" +
      '<div class="ld-emi-result"><span>Estimated EMI</span><strong id="emiResult">₹ —</strong><p class="ld-emi-note">Indicative only. Actual EMI depends on bank approval.</p></div></div>'
    );
  }

  function field(id, label, val, type) {
    return (
      '<label class="ld-field"><span>' +
      esc(label) +
      '</span><input type="' +
      type +
      '" id="' +
      id +
      '" value="' +
      val +
      '"></label>'
    );
  }

  function renderBrochure(prop) {
    return (
      '<div class="ld-brochure">' +
      '<div class="ld-brochure-icon"><i class="fas fa-file-pdf"></i></div>' +
      "<div><h3>Download Brochure</h3><p>Get floor plans, payment schedule, and amenity details for " +
      esc(prop.name) +
      ".</p></div>" +
      '<button type="button" class="ld-btn ld-btn-primary" id="ldBrochureBtn"><i class="fas fa-download"></i> Download PDF</button></div>'
    );
  }

  function renderSimilar(list) {
    if (!list.length) return "<p class=\"ld-empty\">No similar listings found.</p>";
    return (
      '<div class="ld-similar-grid">' +
      list
        .map(
          (p) =>
            '<a href="listing-detail.html?id=' +
            p.id +
            '" class="ld-similar-card">' +
            '<img src="' +
            p.img +
            '" alt="' +
            esc(p.name) +
            '">' +
            "<div><strong>" +
            esc(p.name) +
            "</strong><span>" +
            esc(p.location) +
            ", " +
            esc(p.city) +
            "</span><em>" +
            esc(p.price) +
            " · " +
            esc(p.bhk) +
            "</em></div></a>"
        )
        .join("") +
      "</div>"
    );
  }

  function renderInquiry(prop) {
    return (
      '<form class="ld-inquiry" id="detailContactForm">' +
      '<div class="ld-inquiry-grid">' +
      '<input type="text" name="name" placeholder="Your Name" required>' +
      '<input type="tel" name="phone" placeholder="Phone Number" required>' +
      '<input type="email" name="email" placeholder="Email Address" required>' +
      '<select name="interest"><option>Schedule Site Visit</option><option>Request Callback</option><option>Get Price Details</option></select>' +
      "</div>" +
      '<textarea name="message" placeholder="Your message">I am interested in ' +
      esc(prop.name) +
      ".</textarea>" +
      '<button type="submit" class="ld-btn ld-btn-primary"><i class="fas fa-paper-plane"></i> Submit Inquiry</button></form>'
    );
  }

  function renderSidebar(prop) {
    const emi = estimateEmi(prop.priceVal);
    return (
      '<aside class="ld-sidebar">' +
      '<div class="ld-sidebar-card">' +
      '<div class="ld-sidebar-hero">' +
      '<div class="ld-sidebar-hero-glow"></div>' +
      '<div class="ld-sidebar-badges">' +
      '<span class="ld-sidebar-badge">For Sale</span>' +
      '<span class="ld-sidebar-rera"><i class="fas fa-shield-halved"></i> RERA Verified</span>' +
      "</div>" +
      '<p class="ld-sidebar-label">Starting Price</p>' +
      '<p class="ld-sidebar-price">' +
      esc(prop.price) +
      "</p>" +
      '<p class="ld-sidebar-emi">EMI from <strong id="sidebarEmi">' +
      emi +
      "</strong> / month</p>" +
      '<p class="ld-sidebar-loc"><i class="fas fa-location-dot"></i> ' +
      esc(prop.location) +
      ", " +
      esc(prop.city) +
      "</p>" +
      "</div>" +
      '<div class="ld-sidebar-body">' +
      '<div class="ld-sidebar-stats">' +
      sidebarStat("fa-bed", "Configuration", prop.bhk) +
      sidebarStat("fa-vector-square", "Area", prop.area) +
      sidebarStat("fa-key", "Status", prop.status) +
      "</div>" +
      '<div class="ld-sidebar-actions">' +
      '<a href="#ld-inquiry" class="ld-btn ld-btn-primary ld-btn-glow"><i class="fas fa-calendar-check"></i> Book Site Visit</a>' +
      '<div class="ld-sidebar-action-row">' +
      '<a href="tel:+919876543210" class="ld-btn ld-btn-outline"><i class="fas fa-phone"></i> Call</a>' +
      '<button type="button" class="ld-btn ld-btn-outline" id="ldSidebarBrochure"><i class="fas fa-download"></i> Brochure</button>' +
      "</div></div></div></div>" +
      renderNewsArticles(prop) +
      "</aside>"
    );
  }

  function estimateEmi(priceVal) {
    const loan = priceVal >= 100 ? priceVal * 80 : priceVal * 0.8 * 100;
    const P = loan * 100000;
    const r = 8.5 / 12 / 100;
    const n = 20 * 12;
    if (!P) return "₹ —";
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return "₹ " + Math.round(emi).toLocaleString("en-IN");
  }

  function renderNewsArticles(prop) {
    const items = articlesForCity(prop.city);
    return (
      '<div class="ld-sidebar-news">' +
      '<div class="ld-sidebar-news-head">' +
      '<h3><i class="fas fa-newspaper"></i> News &amp; Articles</h3>' +
      '<a href="blog.html">View all</a>' +
      "</div>" +
      '<div class="ld-news-list">' +
      items
        .map(
          (a) =>
            '<a href="' +
            a.href +
            '" class="ld-news-item">' +
            '<img src="' +
            a.img +
            '" alt="">' +
            '<div class="ld-news-body">' +
            '<span class="ld-news-tag ld-news-tag--' +
            a.type.toLowerCase() +
            '">' +
            esc(a.type) +
            "</span>" +
            "<strong>" +
            esc(a.title) +
            "</strong>" +
            '<time datetime="' +
            a.date +
            '">' +
            esc(a.date) +
            "</time></div></a>"
        )
        .join("") +
      "</div></div>"
    );
  }

  function sidebarStat(icon, label, val) {
    return (
      '<div class="ld-sidebar-stat"><i class="fas ' +
      icon +
      '"></i><div><span>' +
      esc(label) +
      "</span><strong>" +
      esc(val) +
      "</strong></div></div>"
    );
  }

  function renderNav() {
    const links = [
      ["ld-gallery", "Gallery"],
      ["ld-overview", "Overview"],
      ["ld-price", "Price"],
      ["ld-highlights", "Highlights"],
      ["ld-amenities", "Amenities"],
      ["ld-floorplan", "Floor Plan"],
      ["ld-masterplan", "Master Plan"],
      ["ld-map", "Map"],
      ["ld-landmarks", "Landmarks"],
      ["ld-builder", "Builder"],
      ["ld-progress", "Progress"],
      ["ld-emi", "EMI"],
      ["ld-inquiry", "Inquiry"]
    ];
    return (
      '<nav class="ld-jump-nav" aria-label="Page sections">' +
      links.map(([id, label]) => '<a href="#' + id + '">' + label + "</a>").join("") +
      "</nav>"
    );
  }

  function render(p) {
    const prop = enrich(p);
    const similar = similarProperties(prop);

    document.title = prop.name + " | Inchbrick Realty";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = prop.description.slice(0, 155);

    root.innerHTML =
      '<div class="ld-page">' +
      '<div class="ld-topbar ld-container">' +
      '<a href="listings.html" class="ld-back"><i class="fas fa-arrow-left"></i> Back to Listings</a>' +
      "</div>" +
      '<div class="ld-jump-sticky">' +
      '<div class="ld-container">' +
      renderNav() +
      "</div></div>" +
      '<div class="ld-layout ld-container">' +
      '<div class="ld-main">' +
      section("ld-gallery", "Image & Video Gallery", "fa-images", renderGallery(prop)) +
      section("ld-overview", "Property Overview", "fa-building", renderOverview(prop)) +
      section("ld-price", "Price & Payment Plan", "fa-indian-rupee-sign", renderPrice(prop)) +
      section("ld-highlights", "Key Highlights", "fa-star", renderHighlights(prop)) +
      section("ld-amenities", "Amenities", "fa-concierge-bell", renderAmenities()) +
      section("ld-floorplan", "Floor Plans", "fa-layer-group", renderFloorPlan(prop)) +
      section("ld-masterplan", "Master Plan", "fa-map", renderMasterPlan()) +
      section("ld-map", "Location Map", "fa-map-location-dot", renderMap(prop)) +
      section("ld-landmarks", "Nearby Landmarks", "fa-location-arrow", renderLandmarks(prop)) +
      section("ld-builder", "Builder Information", "fa-hard-hat", renderBuilder(prop)) +
      section("ld-progress", "Construction Progress", "fa-chart-line", renderProgress(prop)) +
      section("ld-emi", "EMI Calculator", "fa-calculator", renderEmi(prop)) +
      section("ld-brochure", "Brochure Download", "fa-file-pdf", renderBrochure(prop)) +
      section("ld-similar", "Similar Properties", "fa-clone", renderSimilar(similar)) +
      section("ld-inquiry", "Inquiry Form", "fa-envelope", renderInquiry(prop)) +
      "</div>" +
      renderSidebar(prop) +
      "</div></div>";

    bindEvents(prop);
    calcEmi();
    initStickyJumpNav();
  }

  function calcEmi() {
    const loanEl = document.getElementById("emiLoan");
    const rateEl = document.getElementById("emiRate");
    const tenureEl = document.getElementById("emiTenure");
    const out = document.getElementById("emiResult");
    if (!loanEl || !rateEl || !tenureEl || !out) return;

    function run() {
      const P = parseFloat(loanEl.value) * 100000 || 0;
      const r = parseFloat(rateEl.value) / 12 / 100 || 0;
      const n = parseFloat(tenureEl.value) * 12 || 0;
      if (!P || !r || !n) {
        out.textContent = "₹ —";
        return;
      }
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      out.textContent = "₹ " + Math.round(emi).toLocaleString("en-IN") + " /mo";
      const sidebarEmi = document.getElementById("sidebarEmi");
      if (sidebarEmi) sidebarEmi.textContent = "₹ " + Math.round(emi).toLocaleString("en-IN");
    }

    [loanEl, rateEl, tenureEl].forEach((el) => el.addEventListener("input", run));
    run();
  }

  function initStickyJumpNav() {
    const sticky = document.querySelector(".ld-jump-sticky");
    const topbar = document.querySelector(".ld-topbar");
    if (!sticky || !topbar || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        sticky.classList.toggle("is-stuck", !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(topbar);
  }

  function bindEvents(prop) {
    document.querySelectorAll(".ld-gallery-thumb, .ld-gallery-more").forEach((btn) => {
      btn.addEventListener("click", () => {
        const img = btn.dataset.img || prop.gallery[0];
        const main = document.getElementById("detailMainImg");
        if (main && img) main.src = img;
      });
    });

    document.getElementById("ldVideoBtn")?.addEventListener("click", () => {
      alert("Video tour coming soon. Book a site visit for a live walkthrough.");
    });

    function brochureClick() {
      alert("Brochure download will be sent to your email after inquiry submission.");
    }
    document.getElementById("ldBrochureBtn")?.addEventListener("click", brochureClick);
    document.getElementById("ldSidebarBrochure")?.addEventListener("click", brochureClick);

    document.getElementById("detailContactForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "contact.html#contactForm";
    });

    document.querySelectorAll(".ld-jump-nav a").forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href?.startsWith("#")) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  if (!root) return;
  const property = data.find((p) => p.id === id);
  if (!property) {
    renderNotFound();
    return;
  }
  render(property);
})();
