/**
 * Developers hub — hero + grid linking to detail pages
 */
(function () {
  const data = window.DEVELOPERS_DATA || [];
  const root = document.getElementById("developersRoot");
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  if (id) {
    window.location.replace("developer-detail.html");
    return;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function renderHero() {
    return (
      '<section class="dev-hero" aria-label="Developers">' +
      '<div class="dev-container dev-hero-inner">' +
      '<div class="dev-hero-main">' +
      '<span class="dev-kicker"><i class="fas fa-hard-hat"></i> Trusted Builders</span>' +
      "<h1>India's Top <span>Developers</span></h1>" +
      "<p>Explore RERA-verified builders — company profiles, project portfolios, awards, and buyer testimonials.</p>" +
      "</div>" +
      '<div class="dev-hero-stats">' +
      heroStat(data.length + "+", "Developers") +
      heroStat("1,500+", "Projects") +
      heroStat("4.8/5", "Avg. Rating") +
      "</div></div></section>"
    );
  }

  function heroStat(val, label) {
    return '<div class="dev-hero-stat"><strong>' + val + "</strong><span>" + label + "</span></div>";
  }

  function renderGrid(devs) {
    return (
      '<section class="dev-section" id="dev-grid">' +
      '<div class="dev-container">' +
      '<div class="dev-section-head">' +
      '<div><span class="dev-label">Browse</span><h2>Developer Grid</h2></div>' +
      "<p>Click a developer to view full company profile and project portfolio.</p></div>" +
      '<div class="dev-grid">' +
      devs
        .map(
          (d) =>
            '<a href="developer-detail.html" class="dev-card">' +
            '<span class="dev-card-logo">' +
            esc(d.short.slice(0, 2).toUpperCase()) +
            "</span>" +
            "<strong>" +
            esc(d.name) +
            "</strong>" +
            "<span>" +
            esc(d.tagline) +
            "</span>" +
            '<div class="dev-card-meta">' +
            '<em><i class="fas fa-star"></i> ' +
            d.rating +
            "</em>" +
            "<em>" +
            d.projects +
            "+ projects</em>" +
            '<em class="dev-card-link">View Profile <i class="fas fa-arrow-right"></i></em></div></a>'
        )
        .join("") +
      "</div></div></section>"
    );
  }

  if (!root || !data.length) {
    if (root) root.innerHTML = '<p class="dev-loading">No developers found.</p>';
    return;
  }

  document.title = "Developers | Inchbrick Realty";
  root.innerHTML = renderHero() + renderGrid(data);
})();
