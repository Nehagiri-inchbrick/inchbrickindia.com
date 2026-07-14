/**
 * City page — full investment guide renderer
 */
(function () {
  const data = window.CITIES_DATA || {};
  const root = document.getElementById("cityRoot");
  const params = new URLSearchParams(window.location.search);
  const slugParam = params.get("city");
  const slug = slugParam ? slugParam.toLowerCase() : "";

  const LOCALITIES = {
    mumbai: [
      { slug: "bandra", name: "Bandra", tag: "Premium", img: "https://images.unsplash.com/photo-1568680400585-4c3a8a3a2a0e?auto=format&fit=crop&w=600&q=80", price: "₹ 45k+/sqft", listings: "180+" },
      { slug: "andheri", name: "Andheri", tag: "Metro Hub", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80", price: "₹ 28k/sqft", listings: "320+" },
      { slug: "powai", name: "Powai", tag: "Lake District", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", price: "₹ 32k/sqft", listings: "145+" },
      { slug: "navi-mumbai", name: "Navi Mumbai", tag: "Value", img: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=600&q=80", price: "₹ 14k/sqft", listings: "410+" }
    ],
    dubai: [
      { slug: "dubai-marina", name: "Dubai Marina", tag: "Waterfront", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80", price: "AED 1.5k/sqft", listings: "65+" },
      { slug: "downtown", name: "Downtown", tag: "Iconic", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80", price: "AED 1.8k/sqft", listings: "42+" },
      { slug: "palm", name: "Palm Jumeirah", tag: "Luxury", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80", price: "AED 2.2k/sqft", listings: "28+" },
      { slug: "jvc", name: "JVC", tag: "Affordable", img: "https://images.unsplash.com/photo-1582672060017-f1422d5c8a8d?auto=format&fit=crop&w=600&q=80", price: "AED 950/sqft", listings: "55+" }
    ],
    goa: [
      { slug: "candolim", name: "Candolim", tag: "Beach", img: "https://images.unsplash.com/photo-1519046909882-ff06b0f0a7b0?auto=format&fit=crop&w=600&q=80", price: "₹ 10.5k/sqft", listings: "85+" },
      { slug: "assagao", name: "Assagao", tag: "Villas", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80", price: "₹ 11k/sqft", listings: "52+" },
      { slug: "panjim", name: "Panjim", tag: "Capital", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80", price: "₹ 9k/sqft", listings: "68+" },
      { slug: "north-goa", name: "North Goa", tag: "Coastal", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80", price: "₹ 8.5k/sqft", listings: "120+" }
    ]
  };

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function normalizeCity(raw) {
    const c = { ...raw };
    const lastTrend = c.priceTrends[c.priceTrends.length - 1];
    const prevTrend = c.priceTrends[c.priceTrends.length - 2];

    c.shortDesc = c.shortDesc || c.about.slice(0, 110) + (c.about.length > 110 ? "…" : "");
    c.market = c.market || {
      avgPrice: lastTrend.avg,
      rentalYield: c.rentalYield || (c.slug === "dubai" ? "5–7%" : c.slug === "goa" ? "4–6%" : "3–4%"),
      appreciation: c.appreciation || "8–12% YoY",
      zones: c.highlights.slice(0, 4)
    };

    const projects = c.projects || [];
    c.featuredProjects = c.featuredProjects || {
      newLaunches: projects.map((p) => ({ ...p, status: "New Launch" })),
      readyToMove: projects.map((p) => ({ ...p, status: "Ready" })),
      luxury: projects.filter((p) => /luxury|villa|cr\+|m\+/i.test(p.type + p.price)),
      commercial: [
        { name: c.name + " Business Park", area: "CBD", price: c.slug === "dubai" ? "AED 1.8M+" : "₹ 1.2 Cr+", type: "Office Space", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80", status: "Ready" },
        { name: "Retail Hub " + c.name, area: "Central", price: c.slug === "dubai" ? "AED 2.5M+" : "₹ 85 L+", type: "Retail", img: "https://images.unsplash.com/photo-1449844908441-8829872d2602?auto=format&fit=crop&w=600&q=80", status: "New Launch" }
      ]
    };
    if (!c.featuredProjects.luxury.length) c.featuredProjects.luxury = projects.slice(0, 2);

    c.localities = c.localities || LOCALITIES[c.slug] || projects.map((p, i) => ({
      slug: p.area.toLowerCase().replace(/\s+/g, "-"),
      name: p.area,
      tag: i === 0 ? "Popular" : "Growth",
      img: p.img,
      price: lastTrend.avg,
      listings: "50+"
    }));

    c.lifestyle = c.lifestyle || {
      metro: (c.infrastructure || []).filter((x) => /metro|train/i.test(x.title)),
      airport: (c.infrastructure || []).filter((x) => /airport/i.test(x.title)),
      schools: c.schools || [],
      hospitals: c.hospitals || [],
      malls: [
        { name: "Premium Shopping District", dist: "2–4 km" },
        { name: "High Street Retail", dist: "1–3 km" }
      ],
      itparks: (c.infrastructure || []).filter((x) => /IT|tech|financial|business|BKC|park/i.test(x.title + x.desc))
    };

    c.mapData = c.mapData || {
      projects: projects.map((p, i) => ({
        name: p.name,
        left: 18 + i * 22,
        top: 35 + (i % 2) * 18
      })),
      landmarks: (c.infrastructure || []).slice(0, 3).map((item, i) => ({
        name: item.title,
        left: 55 + i * 12,
        top: 25 + i * 15
      })),
      transport: (c.infrastructure || []).filter((x) => /metro|airport|road|train/i.test(x.title)).slice(0, 3).map((item, i) => ({
        name: item.title,
        left: 25 + i * 20,
        top: 60 + i * 8
      }))
    };

    c.insights = c.insights || [
      { type: "Top Area", title: c.localities[0]?.name || "Prime Belt", desc: "Highest appreciation and rental liquidity in " + c.name + ".", roi: c.market.appreciation },
      { type: "Upcoming", title: (c.infrastructure[0] || {}).title || "Infrastructure", desc: (c.infrastructure[0] || {}).desc || "Major connectivity upgrade driving demand.", roi: "High potential" },
      { type: "ROI Pick", title: c.localities[c.localities.length - 1]?.name || "Growth Zone", desc: "Value entry with strong upside as infrastructure matures.", roi: c.market.rentalYield + " yield" }
    ];

    c.priceTrends = c.priceTrends.map((t, i) => ({
      ...t,
      growth: i === 0 ? "—" : "+" + Math.round(((i + 1) / c.priceTrends.length) * 8 + 2) + "%"
    }));

    return c;
  }

  function secHead(kicker, title, desc) {
    return (
      '<div class="city-sec-head">' +
      (kicker ? '<span class="city-sec-kicker">' + kicker + "</span>" : "") +
      "<h2>" + title + "</h2>" +
      (desc ? "<p>" + desc + "</p>" : "") +
      "</div>"
    );
  }

  function renderHero(c) {
    return (
      '<section class="city-hero city-hero--simple city-hero--attractive" id="city-hero" style="--city-banner-img:url(' + c.heroImg + ')">' +
      '<div class="city-hero-banner-bg" aria-hidden="true"></div>' +
      '<div class="city-hero-banner-pattern" aria-hidden="true"></div>' +
      '<div class="city-container city-hero-simple-inner">' +
      '<a href="city.html" class="city-back"><i class="fas fa-arrow-left"></i> All Cities</a>' +
      '<div class="city-hero-banner-card">' +
      '<span class="city-hero-label"><i class="fas ' + c.icon + '"></i> Real Estate Guide</span>' +
      "<h1>" + esc(c.name) + "</h1>" +
      '<span class="city-hero-accent" aria-hidden="true"></span>' +
      '<div class="city-search-wrap">' +
      '<div class="city-search">' +
      '<i class="fas fa-search" aria-hidden="true"></i>' +
      '<input type="search" id="citySearchInput" autocomplete="off" placeholder="Search another city…" aria-label="Search cities">' +
      '<button type="button" class="city-search-go" id="citySearchGo"><span>Search</span><i class="fas fa-arrow-right" aria-hidden="true"></i></button>' +
      "</div></div></div></div></section>"
    );
  }

  function renderHub() {
    const cities = window.CitySearch ? window.CitySearch.getCities() : [];
    document.title = "Explore Cities | Inchbrick Realty";

    root.innerHTML =
      '<section class="city-hero city-hero--simple city-hero--attractive city-hero--hub" id="city-hero">' +
      '<div class="city-hero-banner-pattern" aria-hidden="true"></div>' +
      '<div class="city-container city-hero-simple-inner">' +
      '<a href="index.html#localities" class="city-back"><i class="fas fa-arrow-left"></i> Home</a>' +
      '<div class="city-hero-banner-card">' +
      '<span class="city-hero-label"><i class="fas fa-globe-asia"></i> Explore Cities</span>' +
      "<h1>Find a City</h1>" +
      '<span class="city-hero-accent" aria-hidden="true"></span>' +
      '<div class="city-search-wrap">' +
      '<div class="city-search">' +
      '<i class="fas fa-search" aria-hidden="true"></i>' +
      '<input type="search" id="cityHubSearch" autocomplete="off" placeholder="Type city name — Mumbai, Dubai, Goa…" aria-label="Search cities">' +
      '<button type="button" class="city-search-go" id="cityHubGo"><span>Search</span><i class="fas fa-arrow-right" aria-hidden="true"></i></button>' +
      "</div></div></div></div></section>" +
      '<section class="city-hub-grid-section">' +
      '<div class="city-container">' +
      '<div class="city-sec-head city-sec-head--center">' +
      '<span class="city-sec-kicker"><i class="fas fa-city"></i> Popular destinations</span>' +
      "<h2>Explore All Cities</h2>" +
      "<p>Tap any city card to view market trends, localities, projects, and investment insights.</p>" +
      "</div>" +
      '<div class="city-hub-grid">' +
      cities.map((c) =>
        '<a href="city.html?city=' + c.slug + '" class="city-hub-card" style="--hub-img:url(' + c.heroImg + ')">' +
        '<div class="city-hub-card-bg"></div>' +
        '<div class="city-hub-card-body">' +
        '<span class="city-hub-card-tag"><i class="fas ' + c.icon + '"></i> ' + esc(c.tag) + "</span>" +
        "<h3>" + esc(c.name) + "</h3>" +
        "<p>" + esc(c.state) + "</p>" +
        '<div class="city-hub-card-meta">' +
        "<strong>" + esc(c.startingPrice) + "</strong>" +
        "<span>" + esc(c.listings) + " listings</span>" +
        "</div>" +
        '<span class="city-hub-card-link">View guide <i class="fas fa-arrow-right"></i></span>' +
        "</div></a>"
      ).join("") +
      "</div></div></section>";

    bindHubSearch();
  }

  function bindHubSearch() {
    const input = document.getElementById("cityHubSearch");
    const go = document.getElementById("cityHubGo");
    if (window.CitySearch && input) {
      window.CitySearch.initAutocomplete(input);
    }
    go?.addEventListener("click", () => {
      const slug = window.CitySearch?.resolveCity(input?.value || "");
      if (slug) window.CitySearch.navigateToCity(slug);
    });
  }

  function bindCitySearch() {
    const input = document.getElementById("citySearchInput");
    const go = document.getElementById("citySearchGo");
    if (window.CitySearch && input) {
      window.CitySearch.initAutocomplete(input);
    }
    go?.addEventListener("click", () => {
      const slug = window.CitySearch?.resolveCity(input?.value || "");
      if (slug) window.CitySearch.navigateToCity(slug);
    });
  }

  function renderJump() {
    return (
      '<nav class="city-jump" aria-label="City page sections">' +
      '<div class="city-container city-jump-inner">' +
      '<a href="#city-why">Why Invest</a>' +
      '<a href="#city-market">Market</a>' +
      '<a href="#city-projects">Projects</a>' +
      '<a href="#city-localities">Localities</a>' +
      '<a href="#city-trends">Price Trends</a>' +
      '<a href="#city-lifestyle">Lifestyle</a>' +
      '<a href="#city-map">City Map</a>' +
      '<a href="#city-insights">Insights</a>' +
      "</div></nav>"
    );
  }

  function renderWhy(c) {
    const cards = [
      { icon: "fa-arrow-trend-up", title: "Property Appreciation", value: c.market.appreciation, desc: "Steady capital growth in prime corridors and metro-linked belts." },
      { icon: "fa-house-chimney", title: "Rental Demand", value: c.market.rentalYield, desc: "Strong tenant pool from professionals, NRIs, and corporate relocations." },
      { icon: "fa-road", title: "Infrastructure Growth", value: (c.infrastructure[0] || {}).title || "Expanding", desc: (c.infrastructure[0] || {}).desc || "Major connectivity and civic upgrades underway." },
      { icon: "fa-briefcase", title: "Employment Opportunities", value: (c.infrastructure.find((x) => /IT|financial|business|park/i.test(x.title)) || {}).title || "Job hubs", desc: "Corporate and industrial clusters driving housing demand." }
    ];
    return (
      '<section class="city-section" id="city-why">' +
      '<div class="city-container">' +
      secHead('<i class="fas fa-lightbulb"></i> Investment case', "Why Invest in " + esc(c.name) + "?", "Key drivers that make " + esc(c.name) + " a compelling real estate market for buyers and investors.") +
      '<div class="city-why-grid">' +
      cards.map((card) =>
        '<article class="city-why-card">' +
        '<i class="fas ' + card.icon + '"></i>' +
        "<h3>" + esc(card.title) + "</h3>" +
        '<span class="city-why-val">' + esc(card.value) + "</span>" +
        "<p>" + esc(card.desc) + "</p></article>"
      ).join("") +
      "</div></div></section>"
    );
  }

  function renderMarket(c) {
    return (
      '<section class="city-section city-section--alt" id="city-market">' +
      '<div class="city-container">' +
      secHead('<i class="fas fa-chart-pie"></i> Snapshot', "Market Overview", "Indicative market metrics to help you compare zones and set a budget.") +
      '<div class="city-market-grid">' +
      '<div class="city-market-stat"><i class="fas fa-indian-rupee-sign"></i><strong>' + esc(c.market.avgPrice) + '</strong><span>Average property price</span></div>' +
      '<div class="city-market-stat"><i class="fas fa-percent"></i><strong>' + esc(c.market.rentalYield) + '</strong><span>Rental yield</span></div>' +
      '<div class="city-market-stat"><i class="fas fa-arrow-trend-up"></i><strong>' + esc(c.market.appreciation) + '</strong><span>Price appreciation</span></div>' +
      '<div class="city-market-zones"><h3>Best investment zones</h3><ul>' +
      c.market.zones.map((z) => "<li><i class=\"fas fa-map-pin\"></i> " + esc(z) + "</li>").join("") +
      "</ul></div></div></div></section>"
    );
  }

  function renderProjects(c) {
    const tabs = [
      { id: "new", label: "New Launches", items: c.featuredProjects.newLaunches },
      { id: "ready", label: "Ready to Move", items: c.featuredProjects.readyToMove },
      { id: "luxury", label: "Luxury Projects", items: c.featuredProjects.luxury },
      { id: "commercial", label: "Commercial", items: c.featuredProjects.commercial }
    ];
    return (
      '<section class="city-section" id="city-projects">' +
      '<div class="city-container">' +
      secHead('<i class="fas fa-building"></i> Curated picks', "Featured Projects", "Handpicked developments across segments — from new launches to ready homes.") +
      '<div class="city-proj-tabs" role="tablist">' +
      tabs.map((t, i) =>
        '<button type="button" class="city-proj-tab' + (i === 0 ? " is-active" : "") + '" data-tab="' + t.id + '" role="tab">' + t.label + "</button>"
      ).join("") +
      "</div>" +
      tabs.map((t, i) =>
        '<div class="city-proj-panel' + (i === 0 ? " is-active" : "") + '" data-panel="' + t.id + '">' +
        '<div class="city-projects-grid">' +
        t.items.slice(0, 3).map((p) =>
          '<a href="listing-detail.html" class="city-project-card">' +
          '<img src="' + p.img + '" alt="' + esc(p.name) + '">' +
          '<div class="city-project-body">' +
          '<span class="city-project-badge">' + esc(p.status || "Available") + "</span>" +
          "<strong>" + esc(p.name) + "</strong>" +
          '<span class="city-project-meta">' + esc(p.area) + " · " + esc(p.type) + "</span>" +
          '<em>' + esc(p.price) + "</em></div></a>"
        ).join("") +
        "</div></div>"
      ).join("") +
      '<a href="listings.html" class="city-link-btn">View all projects <i class="fas fa-arrow-right"></i></a>' +
      "</div></section>"
    );
  }

  function renderLocalities(c) {
    return (
      '<section class="city-section city-section--alt" id="city-localities">' +
      '<div class="city-container">' +
      secHead('<i class="fas fa-map-location-dot"></i> Neighbourhoods', "Popular Localities", "Explore micro-markets within " + esc(c.name) + " — each with distinct price points and buyer profiles.") +
      '<div class="city-loc-grid">' +
      c.localities.map((loc) => {
        const href = (window.LOCATIONS_DATA && window.LOCATIONS_DATA[loc.slug])
          ? "location-detail.html?location=" + loc.slug
          : "listings.html?q=" + encodeURIComponent(loc.name);
        return (
          '<a href="' + href + '" class="city-loc-card">' +
          '<img src="' + loc.img + '" alt="' + esc(loc.name) + '">' +
          '<div class="city-loc-overlay">' +
          '<span class="city-loc-tag">' + esc(loc.tag) + "</span>" +
          "<h3>" + esc(loc.name) + "</h3>" +
          '<span class="city-loc-meta">' + esc(loc.price) + " · " + esc(loc.listings) + " listings</span>" +
          '<span class="city-loc-arrow"><i class="fas fa-arrow-right"></i></span>' +
          "</div></a>"
        );
      }).join("") +
      "</div></div></section>"
    );
  }

  function renderTrends(c) {
    const max = Math.max(...c.priceTrends.map((_, i) => 55 + i * 11));
    const points = c.priceTrends.map((t, i) => {
      const x = 40 + i * (320 / (c.priceTrends.length - 1 || 1));
      const y = 180 - (55 + i * 11) * 1.2;
      return x + "," + y;
    }).join(" ");

    return (
      '<section class="city-section" id="city-trends">' +
      '<div class="city-container">' +
      secHead('<i class="fas fa-chart-line"></i> Historical data', "Price Trends", "Average residential price movement — hover chart points for yearly values.") +
      '<div class="city-trends-wrap">' +
      '<div class="city-trends-summary">' +
      c.priceTrends.map((t) =>
        '<div class="city-trends-pill"><span class="city-trends-year">' + esc(t.year) + '</span><strong>' + esc(t.avg) + '</strong><span class="city-trends-growth">' + esc(t.growth) + "</span></div>"
      ).join("") +
      "</div>" +
      '<div class="city-trends-chart-interactive">' +
      '<svg viewBox="0 0 400 200" class="city-trends-svg" aria-hidden="true">' +
      '<defs><linearGradient id="cityTrendGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c29a63" stop-opacity="0.35"/><stop offset="100%" stop-color="#c29a63" stop-opacity="0"/></linearGradient></defs>' +
      '<polyline fill="url(#cityTrendGrad)" stroke="none" points="' + points + ' 380,200 40,200"/>' +
      '<polyline fill="none" stroke="#c29a63" stroke-width="3" stroke-linecap="round" points="' + points + '"/>' +
      c.priceTrends.map((t, i) => {
        const x = 40 + i * (320 / (c.priceTrends.length - 1 || 1));
        const y = 180 - (55 + i * 11) * 1.2;
        return '<circle class="city-trend-dot" cx="' + x + '" cy="' + y + '" r="6" data-year="' + esc(t.year) + '" data-val="' + esc(t.avg) + '"><title>' + esc(t.year) + ": " + esc(t.avg) + "</title></circle>";
      }).join("") +
      "</svg>" +
      '<div class="city-trends-bars">' +
      c.priceTrends.map((t, i) =>
        '<div class="city-trend-bar"><div class="city-trend-fill" style="height:' + (55 + i * 11) + '%"></div><span>' + esc(t.year) + "</span><strong>" + esc(t.avg) + "</strong></div>"
      ).join("") +
      "</div></div></div></div></section>"
    );
  }

  function renderLifestyle(c) {
    const groups = [
      { key: "metro", icon: "fa-train-subway", label: "Metro connectivity" },
      { key: "airport", icon: "fa-plane", label: "Airport" },
      { key: "schools", icon: "fa-school", label: "Schools" },
      { key: "hospitals", icon: "fa-hospital", label: "Hospitals" },
      { key: "malls", icon: "fa-cart-shopping", label: "Shopping malls" },
      { key: "itparks", icon: "fa-laptop-code", label: "IT parks" }
    ];

    return (
      '<section class="city-section city-section--alt" id="city-lifestyle">' +
      '<div class="city-container">' +
      secHead('<i class="fas fa-city"></i> Liveability', "Lifestyle &amp; Infrastructure", "Schools, healthcare, transit, and lifestyle anchors that define quality of living.") +
      '<div class="city-life-grid">' +
      groups.map((g) => {
        const items = c.lifestyle[g.key] || [];
        return (
          '<div class="city-life-card">' +
          '<div class="city-life-head"><i class="fas ' + g.icon + '"></i><h3>' + g.label + "</h3></div>" +
          '<ul class="city-life-list">' +
          (items.length ? items.slice(0, 3).map((item) => {
            const name = item.name || item.title;
            const sub = item.dist || item.type || item.desc || "";
            return "<li><strong>" + esc(name) + "</strong><span>" + esc(sub) + "</span></li>";
          }).join("") : "<li><span>Data coming soon</span></li>") +
          "</ul></div>"
        );
      }).join("") +
      "</div></div></section>"
    );
  }

  function renderMap(c) {
    const layers = [
      { id: "projects", label: "Projects", items: c.mapData.projects, icon: "fa-building", cls: "city-map-pin--project" },
      { id: "landmarks", label: "Landmarks", items: c.mapData.landmarks, icon: "fa-landmark", cls: "city-map-pin--landmark" },
      { id: "transport", label: "Transport", items: c.mapData.transport, icon: "fa-train", cls: "city-map-pin--transport" }
    ];

    return (
      '<section class="city-section" id="city-map">' +
      '<div class="city-container">' +
      secHead('<i class="fas fa-map"></i> Explore', "Interactive City Map", "Toggle layers to view project locations, landmarks, and transportation hubs.") +
      '<div class="city-map-interactive">' +
      '<div class="city-map-layers">' +
      layers.map((l, i) =>
        '<button type="button" class="city-map-layer' + (i === 0 ? " is-active" : "") + '" data-layer="' + l.id + '"><i class="fas ' + l.icon + '"></i> ' + l.label + "</button>"
      ).join("") +
      "</div>" +
      '<div class="city-map-canvas">' +
      '<img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Map of ' + esc(c.name) + '">' +
      layers.map((l) =>
        '<div class="city-map-pins" data-pins="' + l.id + '"' + (l.id !== "projects" ? ' hidden' : "") + ">" +
        l.items.map((pin) =>
          '<button type="button" class="city-map-pin ' + l.cls + '" style="left:' + pin.left + '%;top:' + pin.top + '%" title="' + esc(pin.name) + '"><i class="fas ' + l.icon + '"></i><span>' + esc(pin.name) + "</span></button>"
        ).join("") +
        "</div>"
      ).join("") +
      "</div>" +
      '<a href="https://maps.google.com" target="_blank" rel="noopener" class="city-map-open">Open in Google Maps <i class="fas fa-external-link-alt"></i></a>' +
      "</div></div></section>"
    );
  }

  function renderInsights(c) {
    return (
      '<section class="city-section city-section--alt" id="city-insights">' +
      '<div class="city-container">' +
      secHead('<i class="fas fa-gem"></i> Advisory', "Investment Insights", "Top areas, upcoming developments, and ROI potential curated by Inchbrick advisors.") +
      '<div class="city-insights-grid">' +
      c.insights.map((ins) =>
        '<article class="city-insight-card">' +
        '<span class="city-insight-type">' + esc(ins.type) + "</span>" +
        "<h3>" + esc(ins.title) + "</h3>" +
        "<p>" + esc(ins.desc) + "</p>" +
        '<span class="city-insight-roi"><i class="fas fa-chart-line"></i> ' + esc(ins.roi) + "</span></article>"
      ).join("") +
      "</div></div></section>"
    );
  }

  function renderCta(c) {
    return (
      '<section class="city-cta">' +
      '<div class="city-container city-cta-inner">' +
      "<div><h2>Ready to invest in " + esc(c.name) + "?</h2>" +
      "<p>Get curated shortlists, locality comparisons, and expert guidance from Inchbrick Realty.</p></div>" +
      '<div class="city-cta-actions">' +
      '<a href="listings.html" class="city-btn city-btn--primary">Browse Listings</a>' +
      '<a href="contact.html#contactForm" class="city-btn city-btn--outline">Talk to Expert</a>' +
      '<a href="investment-opportunities.html" class="city-btn city-btn--gold">Investment Advisory</a>' +
      "</div></div></section>"
    );
  }

  function bindTabs() {
    root.querySelectorAll(".city-proj-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.tab;
        root.querySelectorAll(".city-proj-tab").forEach((b) => b.classList.remove("is-active"));
        root.querySelectorAll(".city-proj-panel").forEach((p) => p.classList.remove("is-active"));
        btn.classList.add("is-active");
        root.querySelector('[data-panel="' + id + '"]')?.classList.add("is-active");
      });
    });
  }

  function bindMapLayers() {
    root.querySelectorAll(".city-map-layer").forEach((btn) => {
      btn.addEventListener("click", () => {
        const layer = btn.dataset.layer;
        root.querySelectorAll(".city-map-layer").forEach((b) => b.classList.remove("is-active"));
        root.querySelectorAll(".city-map-pins").forEach((p) => { p.hidden = p.dataset.pins !== layer; });
        btn.classList.add("is-active");
      });
    });
  }

  function bindTrendDots() {
    const tooltip = document.createElement("div");
    tooltip.className = "city-trend-tooltip";
    tooltip.hidden = true;
    root.querySelector(".city-trends-chart-interactive")?.appendChild(tooltip);

    root.querySelectorAll(".city-trend-dot").forEach((dot) => {
      dot.addEventListener("mouseenter", () => {
        tooltip.textContent = dot.dataset.year + " · " + dot.dataset.val;
        tooltip.hidden = false;
      });
      dot.addEventListener("mouseleave", () => { tooltip.hidden = true; });
    });
  }

  function renderNotFound() {
    document.title = "City Not Found | Inchbrick Realty";
    root.innerHTML =
      '<div class="city-not-found"><h1>City not found</h1><p>Try Mumbai, Goa, Dubai, or Bangalore.</p><a href="city.html">Explore all cities</a></div>';
  }

  function render(c) {
    document.title = c.name + " Real Estate Guide | Inchbrick Realty";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = c.shortDesc;

    root.innerHTML =
      renderHero(c) +
      renderJump() +
      renderWhy(c) +
      renderMarket(c) +
      renderProjects(c) +
      renderLocalities(c) +
      renderTrends(c) +
      renderLifestyle(c) +
      renderMap(c) +
      renderInsights(c) +
      renderCta(c);

    bindTabs();
    bindMapLayers();
    bindTrendDots();
    bindCitySearch();
  }

  if (!root) return;

  if (!slugParam) {
    if (window.CitySearch) renderHub();
    else root.innerHTML = '<div class="city-loading">Loading cities…</div>';
    return;
  }

  const raw = data[slug];
  if (!raw) {
    renderNotFound();
    return;
  }
  render(normalizeCity(raw));
})();
