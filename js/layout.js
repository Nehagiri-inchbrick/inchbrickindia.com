/**
 * Shared header & footer loader — edit partials/header.html & partials/footer.html
 * Styles: css/layout.css
 */
(function () {
  const FALLBACK = {
    header: "<header class=\"header\" id=\"header\">\n  <div class=\"container nav\">\n    <a href=\"index.html\" class=\"logo\">Inchbrick <span>Realty</span></a>\n    <nav class=\"nav-links\" id=\"navLinks\">\n      <a href=\"index.html\" data-nav=\"home\">Home</a>\n      <a href=\"projects.html\" data-nav=\"projects\">Projects</a>\n      <a href=\"explore.html\" data-nav=\"explore\">Explore</a>\n      <a href=\"blog.html\" data-nav=\"blog\">Blog</a>\n      <a href=\"contact.html\" data-nav=\"contact\">Contact</a>\n    </nav>\n    <div class=\"nav-actions\">\n      <div class=\"header-contact\">\n        <a href=\"tel:+919876543210\">+91 98765 43210</a>\n        <a href=\"mailto:support@inchbrickrealty.com\">support@inchbrickrealty.com</a>\n      </div>\n      <a href=\"auth.html#login\" class=\"header-auth-link\">Login</a>\n      <a href=\"contact.html#contactForm\" class=\"btn btn-callback\">Get Callback</a>\n      <button class=\"btn menu-btn\" type=\"button\" id=\"menuBtn\" aria-label=\"Open menu\">☰</button>\n    </div>\n  </div>\n</header>\n",
    footer: "<footer class=\"site-footer\">\n  <div class=\"container\">\n    <div class=\"footer-top\">\n      <div class=\"footer-brand-row\">\n        <div>\n          <h2 class=\"footer-title\">Discover Verified Properties Across India</h2>\n          <p class=\"footer-subtitle\">Explore curated homes, premium projects, and investment opportunities across India's top cities.</p>\n        </div>\n        <div class=\"footer-search\">\n          <input type=\"text\" placeholder=\"Search city, project, builder\" aria-label=\"Search properties\" />\n          <button class=\"footer-search-btn\" type=\"button\">Search</button>\n        </div>\n      </div>\n\n      <div class=\"footer-grid\">\n        <div class=\"footer-block\">\n          <h4>Popular Cities</h4>\n          <div class=\"footer-links\">\n            <a href=\"explore.html\">Properties in Mumbai</a>\n            <a href=\"explore.html\">Properties in Pune</a>\n            <a href=\"explore.html\">Properties in Bangalore</a>\n            <a href=\"explore.html\">Properties in Hyderabad</a>\n            <a href=\"explore.html\">Properties in Gurugram</a>\n            <a href=\"projects.html\">Properties in Noida</a>\n          </div>\n        </div>\n\n        <div class=\"footer-block\">\n          <h4>Property Types</h4>\n          <div class=\"footer-links\">\n            <a href=\"projects.html\">2 BHK Apartments</a>\n            <a href=\"projects.html\">3 BHK Apartments</a>\n            <a href=\"projects.html\">Luxury Villas</a>\n            <a href=\"projects.html\">Ready to Move Homes</a>\n            <a href=\"projects.html\">New Launch Projects</a>\n            <a href=\"projects.html\">Commercial Spaces</a>\n          </div>\n        </div>\n\n        <div class=\"footer-block\">\n          <h4>Real Estate Services</h4>\n          <div class=\"footer-links\">\n            <a href=\"contact.html\">Home Buying Assistance</a>\n            <a href=\"contact.html\">Home Loan Support</a>\n            <a href=\"contact.html\">Investment Advisory</a>\n            <a href=\"contact.html\">Property Legal Check</a>\n            <a href=\"contact.html\">Site Visit Booking</a>\n            <a href=\"contact.html\">NRI Property Services</a>\n          </div>\n        </div>\n\n        <div class=\"footer-block\">\n          <h4>Quick Access</h4>\n          <div class=\"footer-links\">\n            <a href=\"about.html\">About Us</a>\n            <a href=\"contact.html\">Contact Us</a>\n            <a href=\"#\">RERA Disclaimer</a>\n            <a href=\"privacy-policy.html\">Privacy Policy</a>\n            <a href=\"terms.html\">Terms &amp; Conditions</a>\n            <a href=\"#\">Sitemap</a>\n          </div>\n          <div class=\"footer-contact\">\n            <p><a href=\"tel:+919876543210\">+91 98765 43210</a></p>\n            <p><a href=\"mailto:support@inchbrickrealty.com\">support@inchbrickrealty.com</a></p>\n          </div>\n          <div class=\"footer-social\">\n            <a href=\"#\" aria-label=\"Facebook\">f</a>\n            <a href=\"#\" aria-label=\"Instagram\">ig</a>\n            <a href=\"#\" aria-label=\"YouTube\">yt</a>\n            <a href=\"#\" aria-label=\"LinkedIn\">in</a>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"footer-seo-strip\">\n        <a href=\"projects.html\">Best Property Deals 2026</a>\n        <a href=\"projects.html\">Top Builders in India</a>\n        <a href=\"explore.html\">Buy Flats Near Metro</a>\n        <a href=\"explore.html\">High ROI Investment Zones</a>\n        <a href=\"projects.html\">RERA Approved Projects</a>\n        <a href=\"explore.html\">Affordable Homes in Tier 1 Cities</a>\n        <a href=\"projects.html\">Luxury Homes in India</a>\n        <a href=\"projects.html\">Upcoming Township Projects</a>\n      </div>\n    </div>\n\n    <div class=\"footer-bottom\">© 2026 Inchbrick Realty. All rights reserved.</div>\n  </div>\n</footer>\n"
  };

  const BASE = document.currentScript?.src.replace(/\/js\/layout\.js.*$/, "/") || "";

  function partialUrl(file) {
    try {
      return new URL("partials/" + file, BASE).href;
    } catch {
      return "partials/" + file;
    }
  }

  async function loadPartial(targetId, file, fallbackHtml) {
    const el = document.getElementById(targetId);
    if (!el) return false;
    try {
      const res = await fetch(partialUrl(file));
      if (!res.ok) throw new Error(res.status);
      el.innerHTML = await res.text();
      return true;
    } catch (err) {
      if (fallbackHtml) {
        el.innerHTML = fallbackHtml;
        return true;
      }
      console.warn("[layout] Could not load " + file, err);
      return false;
    }
  }

  function setActiveNav() {
    const root = document.getElementById("site-header");
    const page = root?.dataset.page || document.body.dataset.page || "";
    if (!page) return;
    document.querySelectorAll(".nav-links a[data-nav]").forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === page);
    });
    if (location.hash === "#blog" && (page === "home" || page === "explore")) {
      document.querySelector('.nav-links a[data-nav="blog"]')?.classList.remove("active");
    }
  }

  function initHeader() {
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    if (!header) return;

    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });

    menuBtn?.addEventListener("click", () => {
      navLinks?.classList.toggle("open");
    });
  }

  async function init() {
    await Promise.all([
      loadPartial("site-header", "header.html", FALLBACK.header),
      loadPartial("site-footer", "footer.html", FALLBACK.footer)
    ]);
    setActiveNav();
    initHeader();
    document.dispatchEvent(new CustomEvent("layout-ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
