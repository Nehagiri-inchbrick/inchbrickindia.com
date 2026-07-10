/**
 * Developer detail page
 */
(function () {
  const data = window.DEVELOPERS_DATA || [];
  const root = document.getElementById("developerDetailRoot");
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  const PORTFOLIO_IMGS = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
  ];

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function stars(n) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += '<i class="fas fa-star' + (i <= n ? "" : " dd-star-dim") + '"></i>';
    }
    return html;
  }

  function enrich(d) {
    const start = parseInt(d.since, 10);
    const years = new Date().getFullYear() - start;
    const span = Math.max(2026 - start, 1);
    const timeline = d.timeline || [
      { year: d.since, title: "Company Founded", text: d.name + " established headquarters in " + d.hq + "." },
      { year: String(start + Math.round(span * 0.25)), title: "Regional Growth", text: "Expanded operations across major Indian cities and launched signature residential projects." },
      { year: String(start + Math.round(span * 0.5)), title: "Landmark Deliveries", text: "Completed large-scale townships and premium towers with strong buyer trust." },
      { year: String(start + Math.round(span * 0.75)), title: "Premium Portfolio", text: "Entered luxury segment with RERA-compliant, amenity-rich developments." },
      { year: "2026", title: "Industry Leader", text: d.projects + "+ projects delivered across " + d.cities + "+ cities with " + d.rating + "/5 buyer rating." }
    ];
    const portfolio = [
      ...d.completed.map((p) => ({ ...p, status: "Completed", label: p.year, cls: "done" })),
      ...d.ongoing.map((p) => ({ ...p, status: "Ongoing", label: p.status, cls: "live" })),
      ...d.upcoming.map((p) => ({ ...p, status: "Upcoming", label: p.launch, cls: "new" }))
    ];
    return { ...d, years, timeline, portfolio };
  }

  function section(id, title, icon, body, alt) {
    return (
      '<section class="dd-section' +
      (alt ? " dd-section--alt" : "") +
      '" id="' +
      id +
      '">' +
      '<div class="dd-container">' +
      '<div class="dd-section-head"><i class="fas ' +
      icon +
      '"></i><h2>' +
      title +
      "</h2></div>" +
      '<div class="dd-section-body">' +
      body +
      "</div></div></section>"
    );
  }

  function renderNotFound() {
    document.title = "Developer Not Found | Inchbrick Realty";
    root.innerHTML =
      '<div class="dd-not-found"><h1>Developer not found</h1><p>This profile may have been removed.</p><a href="developers.html">Back to developers</a></div>';
  }

  function renderBanner(d) {
    return (
      '<section class="dd-banner">' +
      '<div class="dd-container dd-banner-inner">' +
      '<a href="developers.html" class="dd-back"><i class="fas fa-arrow-left"></i> All Developers</a>' +
      '<div class="dd-banner-content">' +
      '<span class="dd-banner-logo">' +
      esc(d.short.slice(0, 2).toUpperCase()) +
      "</span>" +
      "<div><h1>" +
      esc(d.name) +
      "</h1><p>" +
      esc(d.tagline) +
      '</p><div class="dd-banner-meta">' +
      '<span><i class="fas fa-location-dot"></i> ' +
      esc(d.hq) +
      "</span>" +
      '<span><i class="fas fa-star"></i> ' +
      d.rating +
      " Rating</span>" +
      '<span><i class="fas fa-shield-halved"></i> RERA Verified</span></div></div></div></div></section>'
    );
  }

  function renderProfile(d) {
    return (
      '<div class="dd-profile">' +
      '<div class="dd-profile-img"><img src="' +
      d.img +
      '" alt="' +
      esc(d.name) +
      '"></div>' +
      '<div class="dd-profile-text">' +
      "<p>" +
      esc(d.overview) +
      "</p>" +
      '<ul class="dd-highlights">' +
      d.highlights.map((h) => '<li><i class="fas fa-check"></i> ' + esc(h) + "</li>").join("") +
      "</ul></div></div>"
    );
  }

  function renderExperience(d) {
    return (
      '<div class="dd-experience">' +
      '<div class="dd-exp-main">' +
      '<span class="dd-exp-num">' +
      d.years +
      "+</span>" +
      "<strong>Years of Experience</strong>" +
      "<p>Building trusted communities since " +
      esc(d.since) +
      "</p></div>" +
      '<div class="dd-exp-grid">' +
      expStat(d.projects + "+", "Projects Delivered", "fa-building") +
      expStat(d.cities + "+", "Cities Presence", "fa-map-location-dot") +
      expStat(d.rating + "/5", "Customer Rating", "fa-star") +
      expStat(d.since, "Established", "fa-calendar") +
      "</div></div>"
    );
  }

  function expStat(val, label, icon) {
    return (
      '<div class="dd-exp-stat"><i class="fas ' +
      icon +
      '"></i><strong>' +
      esc(val) +
      "</strong><span>" +
      esc(label) +
      "</span></div>"
    );
  }

  function renderTimeline(d) {
    return (
      '<div class="dd-timeline">' +
      d.timeline
        .map(
          (t, i) =>
            '<div class="dd-timeline-item">' +
            '<span class="dd-timeline-dot">' +
            (i + 1) +
            "</span>" +
            '<div class="dd-timeline-body"><time>' +
            esc(t.year) +
            "</time><strong>" +
            esc(t.title) +
            "</strong><p>" +
            esc(t.text) +
            "</p></div></div>"
        )
        .join("") +
      "</div>"
    );
  }

  function renderPortfolio(d) {
    const cards = d.portfolio
      .map(
        (p, i) =>
          '<article class="dd-portfolio-card" data-status="' +
          p.status +
          '">' +
          '<img src="' +
          PORTFOLIO_IMGS[i % PORTFOLIO_IMGS.length] +
          '" alt="' +
          esc(p.name) +
          '">' +
          '<div class="dd-portfolio-body">' +
          '<span class="dd-tag dd-tag--' +
          p.cls +
          '">' +
          esc(p.status) +
          "</span>" +
          "<strong>" +
          esc(p.name) +
          "</strong>" +
          "<span>" +
          esc(p.city) +
          " · " +
          esc(p.type) +
          "</span>" +
          '<em>' +
          esc(p.label) +
          "</em></div></article>"
      )
      .join("");

    return (
      '<div class="dd-portfolio">' +
      '<div class="dd-portfolio-tabs">' +
      '<button type="button" class="dd-tab is-active" data-filter="all">All Projects</button>' +
      '<button type="button" class="dd-tab" data-filter="Completed">Completed</button>' +
      '<button type="button" class="dd-tab" data-filter="Ongoing">Ongoing</button>' +
      '<button type="button" class="dd-tab" data-filter="Upcoming">Upcoming</button>' +
      "</div>" +
      '<div class="dd-portfolio-grid" id="portfolioGrid">' +
      cards +
      "</div></div>"
    );
  }

  function renderAwards(d) {
    return (
      '<div class="dd-awards-grid">' +
      d.awards
        .map(
          (a) =>
            '<article class="dd-award">' +
            '<span class="dd-award-year">' +
            esc(a.year) +
            "</span>" +
            '<div class="dd-award-icon"><i class="fas fa-trophy"></i></div>' +
            "<strong>" +
            esc(a.title) +
            "</strong>" +
            "<span>" +
            esc(a.org) +
            "</span></article>"
        )
        .join("") +
      "</div>"
    );
  }

  function renderTestimonials(d) {
    return (
      '<div class="dd-testimonials">' +
      '<div class="dd-testimonials-summary">' +
      "<strong>" +
      d.rating +
      '</strong><div class="dd-stars">' +
      stars(Math.round(d.rating)) +
      "</div><span>Based on verified buyer feedback</span></div>" +
      '<div class="dd-testimonials-grid">' +
      d.reviews
        .map(
          (r) =>
            '<article class="dd-testimonial">' +
            '<div class="dd-stars">' +
            stars(r.rating) +
            "</div>" +
            "<p>\"" +
            esc(r.text) +
            '"</p>' +
            "<footer><strong>" +
            esc(r.name) +
            "</strong><span>" +
            esc(r.city) +
            "</span></footer></article>"
        )
        .join("") +
      "</div></div>"
    );
  }

  function renderContact(d) {
    return (
      '<div class="dd-contact">' +
      '<div class="dd-contact-info">' +
      "<h3>Connect with Inchbrick Realty</h3>" +
      "<p>Interested in " +
      esc(d.name) +
      " projects? Our advisors will share curated options, payment plans, and site visit slots.</p>" +
      '<ul>' +
      '<li><i class="fas fa-phone"></i> <a href="tel:+919876543210">+91 98765 43210</a></li>' +
      '<li><i class="fas fa-envelope"></i> <a href="mailto:support@inchbrickrealty.com">support@inchbrickrealty.com</a></li>' +
      '<li><i class="fas fa-clock"></i> Mon–Sat, 9 AM – 7 PM IST</li></ul></div>' +
      '<form class="dd-contact-form" id="developerContactForm">' +
      '<input type="hidden" name="developer" value="' +
      esc(d.name) +
      '">' +
      '<div class="dd-form-row">' +
      '<input type="text" name="name" placeholder="Your Name" required>' +
      '<input type="tel" name="phone" placeholder="Phone Number" required>' +
      "</div>" +
      '<input type="email" name="email" placeholder="Email Address" required>' +
      '<select name="interest"><option>Project Information</option><option>Schedule Site Visit</option><option>Investment Advisory</option><option>Request Callback</option></select>' +
      '<textarea name="message" placeholder="Your message">I would like to know more about ' +
      esc(d.name) +
      " projects.</textarea>" +
      '<button type="submit" class="dd-btn dd-btn--primary"><i class="fas fa-paper-plane"></i> Send Inquiry</button></form></div>'
    );
  }

  function render(d) {
    const dev = enrich(d);
    document.title = dev.name + " | Developer Profile | Inchbrick Realty";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = dev.overview.slice(0, 155);

    root.innerHTML =
      renderBanner(dev) +
      section("dd-profile", "Company Profile", "fa-building", renderProfile(dev)) +
      section("dd-experience", "Years of Experience", "fa-chart-line", renderExperience(dev), true) +
      section("dd-timeline", "Timeline", "fa-clock-rotate-left", renderTimeline(dev)) +
      section("dd-portfolio", "Project Portfolio", "fa-layer-group", renderPortfolio(dev), true) +
      section("dd-awards", "Awards", "fa-trophy", renderAwards(dev)) +
      section("dd-testimonials", "Customer Testimonials", "fa-quote-left", renderTestimonials(dev), true) +
      section("dd-contact", "Contact Section", "fa-envelope", renderContact(dev));

    bindEvents(dev);
  }

  function bindEvents(dev) {
    root.querySelectorAll(".dd-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        root.querySelectorAll(".dd-tab").forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        const filter = tab.dataset.filter;
        root.querySelectorAll(".dd-portfolio-card").forEach((card) => {
          const show = filter === "all" || card.dataset.status === filter;
          card.style.display = show ? "" : "none";
        });
      });
    });

    document.getElementById("developerContactForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "contact.html#contactForm";
    });
  }

  if (!root) return;
  const developer = data.find((d) => d.id === id);
  if (!developer) {
    renderNotFound();
    return;
  }
  render(developer);
})();
