/**
 * Location / locality detail page
 */
(function () {
  const data = window.LOCATIONS_DATA || {};
  const root = document.getElementById("locationRoot");
  const params = new URLSearchParams(window.location.search);
  const slug = (params.get("location") || "").toLowerCase();

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function render(loc) {
    document.title = loc.name + ", " + loc.cityName + " | Inchbrick Realty";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = loc.about.slice(0, 155);

    root.innerHTML =
      '<section class="loc-hero" style="background-image:url(' + loc.heroImg + ')">' +
      '<div class="loc-container loc-hero-inner">' +
      '<a href="city.html?city=' + loc.city + '" class="loc-back"><i class="fas fa-arrow-left"></i> Back to ' + esc(loc.cityName) + "</a>" +
      '<span class="loc-hero-tag">' + esc(loc.tag) + "</span>" +
      "<h1>" + esc(loc.name) + "</h1>" +
      '<p class="loc-hero-city">' + esc(loc.cityName) + " · Locality guide</p>" +
      '<div class="loc-hero-stats">' +
      '<div><strong>' + esc(loc.avgPrice) + '</strong><span>Avg. price</span></div>' +
      '<div><strong>' + esc(loc.rentalYield) + '</strong><span>Rental yield</span></div>' +
      '<div><strong>' + esc(loc.appreciation) + '</strong><span>Appreciation</span></div>' +
      "</div></div></section>" +
      '<div class="loc-main"><div class="loc-container"><div class="loc-grid">' +
      '<div class="loc-card"><h2>About ' + esc(loc.name) + "</h2>" +
      "<p>" + esc(loc.about) + "</p>" +
      '<ul class="loc-highlights">' +
      loc.highlights.map((h) => '<li><i class="fas fa-check"></i> ' + esc(h) + "</li>").join("") +
      "</ul></div>" +
      '<div class="loc-card"><h2>Projects in ' + esc(loc.name) + "</h2>" +
      '<div class="loc-projects">' +
      loc.projects.map((p) =>
        '<div class="loc-project"><strong>' + esc(p.name) + "</strong>" +
        "<span>" + esc(p.type) + " · " + esc(p.status) + "</span>" +
        "<em>" + esc(p.price) + "</em></div>"
      ).join("") +
      "</div>" +
      '<div class="loc-cta">' +
      '<a href="listings.html?q=' + encodeURIComponent(loc.name) + '" class="loc-btn loc-btn--primary">View Listings</a>' +
      '<a href="contact.html#contactForm" class="loc-btn loc-btn--outline">Talk to Expert</a>' +
      "</div></div></div></div></div>";
  }

  function renderNotFound() {
    document.title = "Location Not Found | Inchbrick Realty";
    root.innerHTML =
      '<div class="loc-not-found"><h1>Location not found</h1><p>Try Bandra, Powai, Dubai Marina, or Candolim.</p><a href="index.html#localities">Back to cities</a></div>';
  }

  if (!root) return;
  const loc = data[slug];
  if (!loc) {
    renderNotFound();
    return;
  }
  render(loc);
})();
