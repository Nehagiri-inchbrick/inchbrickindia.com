/**
 * City page renderer
 */
(function () {
  const data = window.CITIES_DATA || {};
  const root = document.getElementById("cityRoot");
  const params = new URLSearchParams(window.location.search);
  const slug = (params.get("city") || "mumbai").toLowerCase();

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function section(id, title, icon, body, alt) {
    return (
      '<section class="city-section' +
      (alt ? " city-section--alt" : "") +
      '" id="' +
      id +
      '"><div class="city-container">' +
      '<div class="city-section-head"><i class="fas ' +
      icon +
      '"></i><h2>' +
      title +
      "</h2></div>" +
      body +
      "</div></section>"
    );
  }

  function renderHero(c) {
    return (
      '<section class="city-hero" style="background-image:linear-gradient(135deg,rgba(15,35,57,0.92),rgba(12,26,46,0.88)),url(' +
      c.heroImg +
      ')">' +
      '<div class="city-container city-hero-inner">' +
      '<a href="index.html#localities" class="city-back"><i class="fas fa-arrow-left"></i> All Cities</a>' +
      '<div class="city-hero-content">' +
      '<span class="city-hero-tag"><i class="fas ' +
      c.icon +
      '"></i> ' +
      esc(c.tag) +
      "</span>" +
      "<h1>" +
      esc(c.name) +
      "</h1>" +
      "<p>" +
      esc(c.state) +
      " · Real estate guide</p>" +
      '<div class="city-hero-stats">' +
      '<div><strong>' +
      esc(c.startingPrice) +
      "</strong><span>Starting price</span></div>" +
      '<div><strong>' +
      esc(c.listings) +
      "</strong><span>Active listings</span></div></div>" +
      '<a href="listings.html" class="city-hero-cta">Browse Properties in ' +
      esc(c.name) +
      ' <i class="fas fa-arrow-right"></i></a></div></div></section>'
    );
  }

  function renderAbout(c) {
    return section(
      "city-about",
      "About " + c.name,
      "fa-city",
      '<div class="city-about"><p>' +
        esc(c.about) +
        '</p><ul class="city-highlights">' +
        c.highlights.map((h) => "<li><i class=\"fas fa-check\"></i> " + esc(h) + "</li>").join("") +
        "</ul></div>"
    );
  }

  function renderProjects(c) {
    return section(
      "city-projects",
      "Top Projects",
      "fa-building",
      '<div class="city-projects-grid">' +
        c.projects
          .map(
            (p) =>
              '<article class="city-project"><img src="' +
              p.img +
              '" alt="' +
              esc(p.name) +
              '"><div><span class="city-project-area">' +
              esc(p.area) +
              "</span><strong>" +
              esc(p.name) +
              "</strong><span>" +
              esc(p.type) +
              ' · <em>' +
              esc(p.price) +
              "</em></span></div></article>"
          )
          .join("") +
        '</div><a href="listings.html" class="city-link-btn">View all projects <i class="fas fa-arrow-right"></i></a>',
      true
    );
  }

  function renderMap(c) {
    return section(
      "city-map",
      "Local Map",
      "fa-map-location-dot",
      '<div class="city-map-wrap">' +
        '<img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Map of ' +
        esc(c.name) +
        '">' +
        '<div class="city-map-pin"><i class="fas fa-location-dot"></i> ' +
        esc(c.name) +
        ", " +
        esc(c.state) +
        '</div><a href="https://maps.google.com" target="_blank" rel="noopener" class="city-map-link">Open in Google Maps</a></div>'
    );
  }

  function renderTrends(c) {
    const max = c.priceTrends.length - 1;
    return section(
      "city-trends",
      "Price Trends",
      "fa-chart-line",
      '<div class="city-trends">' +
        '<p class="city-trends-note">Average residential price movement (indicative)</p>' +
        '<div class="city-trends-chart">' +
        c.priceTrends
          .map(
            (t, i) =>
              '<div class="city-trend-bar"><div class="city-trend-fill" style="height:' +
              (55 + (i / max) * 45) +
              '%"></div><span class="city-trend-val">' +
              esc(t.avg) +
              '</span><span class="city-trend-year">' +
              esc(t.year) +
              "</span></div>"
          )
          .join("") +
        "</div></div>",
      true
    );
  }

  function renderInfra(c) {
    return section(
      "city-infra",
      "Infrastructure",
      "fa-road",
      '<div class="city-infra-grid">' +
        c.infrastructure
          .map(
            (item) =>
              '<div class="city-infra-item"><i class="fas ' +
              item.icon +
              '"></i><strong>' +
              esc(item.title) +
              "</strong><p>" +
              esc(item.desc) +
              "</p></div>"
          )
          .join("") +
        "</div>"
    );
  }

  function renderSchools(c) {
    return section(
      "city-schools",
      "Schools",
      "fa-school",
      '<div class="city-list-grid">' +
        c.schools
          .map(
            (s) =>
              '<div class="city-list-item"><i class="fas fa-graduation-cap"></i><div><strong>' +
              esc(s.name) +
              "</strong><span>" +
              esc(s.type) +
              " · " +
              esc(s.dist) +
              "</span></div></div>"
          )
          .join("") +
        "</div>",
      true
    );
  }

  function renderHospitals(c) {
    return section(
      "city-hospitals",
      "Hospitals",
      "fa-hospital",
      '<div class="city-list-grid">' +
        c.hospitals
          .map(
            (h) =>
              '<div class="city-list-item"><i class="fas fa-heart-pulse"></i><div><strong>' +
              esc(h.name) +
              "</strong><span>" +
              esc(h.type) +
              " · " +
              esc(h.dist) +
              "</span></div></div>"
          )
          .join("") +
        "</div>"
    );
  }

  function renderFaq(c) {
    return section(
      "city-faq",
      "FAQ",
      "fa-circle-question",
      '<div class="city-faq-list">' +
        c.faq
          .map(
            (f, i) =>
              '<div class="city-faq-item"><button type="button" class="city-faq-q" aria-expanded="false" data-faq="' +
              i +
              '">' +
              esc(f.q) +
              '<i class="fas fa-chevron-down"></i></button><div class="city-faq-a"><p>' +
              esc(f.a) +
              "</p></div></div>"
          )
          .join("") +
        "</div>",
      true
    );
  }

  function renderCta(c) {
    return (
      '<section class="city-cta"><div class="city-container city-cta-inner">' +
      "<div><h2>Ready to explore " +
      esc(c.name) +
      "?</h2><p>Get curated property shortlists and expert guidance from Inchbrick Realty.</p></div>" +
      '<div><a href="listings.html" class="city-btn city-btn--primary">View Listings</a>' +
      '<a href="contact.html#contactForm" class="city-btn city-btn--outline">Talk to Expert</a></div></div></section>'
    );
  }

  function bindFaq() {
    root.querySelectorAll(".city-faq-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".city-faq-item");
        const open = item.classList.contains("is-open");
        root.querySelectorAll(".city-faq-item").forEach((el) => {
          el.classList.remove("is-open");
          el.querySelector(".city-faq-q")?.setAttribute("aria-expanded", "false");
        });
        if (!open) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function renderNotFound() {
    document.title = "City Not Found | Inchbrick Realty";
    root.innerHTML =
      '<div class="city-not-found"><h1>City not found</h1><p>Try Mumbai, Goa, Dubai, or Bangalore.</p><a href="index.html#localities">Back to cities</a></div>';
  }

  function render(c) {
    document.title = c.name + " Property Guide | Inchbrick Realty";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = c.about.slice(0, 155);

    root.innerHTML =
      renderHero(c) +
      renderAbout(c) +
      renderProjects(c) +
      renderMap(c) +
      renderTrends(c) +
      renderInfra(c) +
      renderSchools(c) +
      renderHospitals(c) +
      renderFaq(c) +
      renderCta(c);

    bindFaq();
  }

  if (!root) return;
  const city = data[slug];
  if (!city) {
    renderNotFound();
    return;
  }
  render(city);
})();
