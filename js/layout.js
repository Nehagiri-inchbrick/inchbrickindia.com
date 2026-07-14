/**
 * Shared header & footer loader — edit partials/header.html & partials/footer.html
 * Styles: css/layout.css
 */
(function () {
  const FALLBACK = {
    header: "<header class=\"header\" id=\"header\">\n  <div class=\"container nav\">\n    <div class=\"nav-brand\">\n      <a href=\"index.html\" class=\"logo-brand\" aria-label=\"Inchbrick Realty Home\">\n        <span class=\"logo-mark\" aria-hidden=\"true\">\n          <svg width=\"38\" height=\"38\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect width=\"36\" height=\"36\" rx=\"10\" fill=\"rgba(201,36,43,0.08)\"/>\n            <path d=\"M6 30V14L18 6L30 14V30H6Z\" fill=\"#c9242b\"/>\n            <path d=\"M12 30V18H24V30H12Z\" fill=\"#fff\"/>\n            <path d=\"M15 30V22H21V30H15Z\" fill=\"#c9242b\"/>\n            <path d=\"M18 6L6 14H10L18 8.5L26 14H30L18 6Z\" fill=\"#a71d22\"/>\n          </svg>\n        </span>\n        <span class=\"logo-wordmark\">\n          <span class=\"logo-title\">INCHBRICK</span>\n          <span class=\"logo-subtitle\">REALTY</span>\n        </span>\n      </a>\n      <span class=\"nav-brand-divider\" aria-hidden=\"true\"></span>\n    </div>\n\n    <nav class=\"nav-links\" id=\"navLinks\">\n      <div class=\"nav-item nav-item--mega\" data-nav=\"listings\">\n        <a href=\"listings.html\" class=\"nav-trigger\">\n          Property Listing\n          <svg class=\"nav-chevron\" width=\"10\" height=\"10\" viewBox=\"0 0 12 12\" fill=\"none\" aria-hidden=\"true\">\n            <path d=\"M2.5 4.5L6 8L9.5 4.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        </a>\n        <div class=\"nav-dropdown nav-dropdown--mega\">\n          <div class=\"nav-dropdown-inner nav-mega\">\n            <div class=\"nav-mega-grid\">\n              <div class=\"nav-mega-col\">\n                <span class=\"nav-mega-label\">Buy Properties</span>\n                <a href=\"listings.html\">Flats &amp; Apartments</a>\n                <a href=\"listings.html\">Independent Houses</a>\n                <a href=\"listings.html\">Luxury Villas</a>\n                <a href=\"listings.html\">Penthouse &amp; Duplex</a>\n                <a href=\"listings.html\">Plots &amp; Land</a>\n              </div>\n              <div class=\"nav-mega-col\">\n                <span class=\"nav-mega-label\">Rent Properties</span>\n                <a href=\"listings.html\">Furnished Rentals</a>\n                <a href=\"listings.html\">Unfurnished Homes</a>\n                <a href=\"listings.html\">Co-living Spaces</a>\n                <a href=\"listings.html\">PG &amp; Hostels</a>\n                <a href=\"listings.html\">Commercial Lease</a>\n              </div>\n              <div class=\"nav-mega-col\">\n                <span class=\"nav-mega-label\">By Configuration</span>\n                <a href=\"listings.html\">1 BHK Flats</a>\n                <a href=\"listings.html\">2 BHK Flats</a>\n                <a href=\"listings.html\">3 BHK Flats</a>\n                <a href=\"listings.html\">4+ BHK Homes</a>\n                <a href=\"listings.html\">Studio Apartments</a>\n              </div>\n              <div class=\"nav-mega-col\">\n                <span class=\"nav-mega-label\">Popular Cities</span>\n                <a href=\"listings.html\">Mumbai</a>\n                <a href=\"listings.html\">Bangalore</a>\n                <a href=\"listings.html\">Pune</a>\n                <a href=\"listings.html\">Delhi NCR</a>\n                <a href=\"listings.html\">Hyderabad</a>\n              </div>\n            </div>\n            <aside class=\"nav-mega-feature\">\n              <span class=\"nav-mega-badge\">Verified Listings</span>\n              <strong>5,200+ Properties</strong>\n              <p>RERA-approved homes from India's most trusted developers. Zero brokerage on select listings.</p>\n              <a href=\"listings.html\" class=\"nav-mega-cta\">Browse All Properties →</a>\n            </aside>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"nav-item\" data-nav=\"nri\">\n        <a href=\"nri-corner.html\" class=\"nav-trigger\">\n          NRI Corner\n          <svg class=\"nav-chevron\" width=\"10\" height=\"10\" viewBox=\"0 0 12 12\" fill=\"none\" aria-hidden=\"true\">\n            <path d=\"M2.5 4.5L6 8L9.5 4.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        </a>\n        <div class=\"nav-dropdown\">\n          <div class=\"nav-dropdown-inner\">\n            <a href=\"nri-corner.html\">NRI Corner Home</a>\n            <a href=\"nri-corner.html#nri-why\">Why Invest in India</a>\n            <a href=\"nri-corner.html#nri-process\">Buying Process</a>\n            <a href=\"nri-corner.html#nri-docs\">Documentation</a>\n            <a href=\"nri-corner.html#nri-tax\">Taxation</a>\n            <a href=\"nri-corner.html#nri-currency\">Currency Guide</a>\n            <a href=\"nri-corner.html#nri-faq\">FAQs</a>\n            <a href=\"contact.html\" class=\"nav-dropdown-view\">Talk to NRI Advisor →</a>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"nav-item\" data-nav=\"blog\">\n        <a href=\"blog.html\" class=\"nav-trigger\">\n          Blog\n          <svg class=\"nav-chevron\" width=\"10\" height=\"10\" viewBox=\"0 0 12 12\" fill=\"none\" aria-hidden=\"true\">\n            <path d=\"M2.5 4.5L6 8L9.5 4.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        </a>\n        <div class=\"nav-dropdown\">\n          <div class=\"nav-dropdown-inner\">\n            <a href=\"blog.html\">Blog &amp; Articles</a>\n            <a href=\"market-insights.html\">Market Insights</a>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"nav-item\" data-nav=\"events\">\n        <a href=\"events-expo.html\" class=\"nav-trigger\">Events</a>\n      </div>\n\n      <div class=\"nav-item\" data-nav=\"services\">\n        <a href=\"contact.html\" class=\"nav-trigger\">\n          Service\n          <svg class=\"nav-chevron\" width=\"10\" height=\"10\" viewBox=\"0 0 12 12\" fill=\"none\" aria-hidden=\"true\">\n            <path d=\"M2.5 4.5L6 8L9.5 4.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        </a>\n        <div class=\"nav-dropdown\">\n          <div class=\"nav-dropdown-inner\">\n            <a href=\"contact.html\">Home Buying Assistance</a>\n            <a href=\"home-loan.html\">Home Loan Assistance</a>\n            <a href=\"emi-calculator.html\">EMI Calculator</a>\n            <a href=\"compare-properties.html\">Compare Properties</a>\n            <a href=\"saved-properties.html\">Saved Properties</a>\n            <a href=\"investment-opportunities.html\">Investment Advisory</a>\n            <a href=\"market-insights.html\">Market Insights</a>\n            <a href=\"design-your-house.html\">Design Your House</a>\n          </div>\n        </div>\n      </div>\n    </nav>\n\n    <div class=\"nav-actions\">\n      <div class=\"header-actions-group\">\n        <div class=\"header-voice-slot\" id=\"headerVoiceSlot\"></div>\n      </div>\n\n      <a href=\"contact.html\" class=\"header-cta-btn\">\n        <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\">\n          <path d=\"M4 14V11C4 7.13 7.13 4 11 4H13C16.87 4 20 7.13 20 11V14\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\"/>\n          <rect x=\"3\" y=\"13\" width=\"4\" height=\"6\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.75\"/>\n          <rect x=\"17\" y=\"13\" width=\"4\" height=\"6\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.75\"/>\n        </svg>\n        <span>Talk to Expert</span>\n        <svg class=\"header-cta-arrow\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\">\n          <path d=\"M5 12H19M19 12L13 6M19 12L13 18\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        </svg>\n      </a>\n\n      <button class=\"menu-btn\" type=\"button\" id=\"menuBtn\" aria-label=\"Open menu\">\n        <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\">\n          <path d=\"M4 7H20M4 12H20M4 17H20\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n        </svg>\n      </button>\n\n      <div class=\"header-more-menu\" id=\"headerMoreMenu\">\n        <a href=\"tel:+919876543210\">+91 98765 43210</a>\n        <a href=\"mailto:support@inchbrickrealty.com\">support@inchbrickrealty.com</a>\n        <a href=\"auth.html#login\">Login</a>\n        <a href=\"contact.html#contactForm\" class=\"header-menu-callback\">Get Callback</a>\n      </div>\n    </div>\n  </div>\n</header>\n",
    footer: "<footer class=\"site-footer\">\n  <div class=\"container\">\n    <div class=\"footer-top\">\n      <div class=\"footer-brand-row\">\n        <div>\n          <h2 class=\"footer-title\">Discover Verified Properties Across India</h2>\n          <p class=\"footer-subtitle\">Explore curated homes, premium projects, and investment opportunities across India's top cities.</p>\n        </div>\n        <div class=\"footer-search\">\n          <input type=\"text\" placeholder=\"Search city, project, builder\" aria-label=\"Search properties\" />\n          <button class=\"footer-search-btn\" type=\"button\">Search</button>\n        </div>\n      </div>\n\n      <div class=\"footer-grid\">\n        <div class=\"footer-block\">\n          <h4>Popular Cities</h4>\n          <div class=\"footer-links\">\n            <a href=\"explore.html\">Properties in Mumbai</a>\n            <a href=\"explore.html\">Properties in Pune</a>\n            <a href=\"explore.html\">Properties in Bangalore</a>\n            <a href=\"explore.html\">Properties in Hyderabad</a>\n            <a href=\"explore.html\">Properties in Gurugram</a>\n            <a href=\"projects.html\">Properties in Noida</a>\n          </div>\n        </div>\n\n        <div class=\"footer-block\">\n          <h4>Property Types</h4>\n          <div class=\"footer-links\">\n            <a href=\"projects.html\">2 BHK Apartments</a>\n            <a href=\"projects.html\">3 BHK Apartments</a>\n            <a href=\"projects.html\">Luxury Villas</a>\n            <a href=\"projects.html\">Ready to Move Homes</a>\n            <a href=\"projects.html\">New Launch Projects</a>\n            <a href=\"projects.html\">Commercial Spaces</a>\n          </div>\n        </div>\n\n        <div class=\"footer-block\">\n          <h4>Real Estate Services</h4>\n          <div class=\"footer-links\">\n            <a href=\"contact.html\">Home Buying Assistance</a>\n            <a href=\"home-loan.html\">Home Loan Assistance</a>\n            <a href=\"emi-calculator.html\">EMI Calculator</a>\n            <a href=\"investment-opportunities.html\">Investment Advisory</a>\n            <a href=\"market-insights.html\">Market Insights</a>\n            <a href=\"design-your-house.html\">Design Your House</a>\n            <a href=\"contact.html\">Property Legal Check</a>\n            <a href=\"contact.html\">Site Visit Booking</a>\n            <a href=\"contact.html\">NRI Property Services</a>\n          </div>\n        </div>\n\n        <div class=\"footer-block\">\n          <h4>Quick Access</h4>\n          <div class=\"footer-links\">\n            <a href=\"about.html\">About Us</a>\n            <a href=\"blog.html\">Blog</a>\n            <a href=\"careers.html\">Careers</a>\n            <a href=\"compare-properties.html\">Compare Properties</a>\n            <a href=\"developers.html\">Developers</a>\n            <a href=\"contact.html\">Contact Us</a>\n            <a href=\"privacy-policy.html\">Privacy Policy</a>\n            <a href=\"terms.html\">Terms &amp; Conditions</a>\n          </div>\n          <div class=\"footer-contact\">\n            <p><a href=\"tel:+919876543210\">+91 98765 43210</a></p>\n            <p><a href=\"mailto:support@inchbrickrealty.com\">support@inchbrickrealty.com</a></p>\n          </div>\n          <div class=\"footer-social\">\n            <a href=\"https://facebook.com\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Facebook\">f</a>\n            <a href=\"https://instagram.com\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Instagram\">ig</a>\n            <a href=\"https://youtube.com\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"YouTube\">yt</a>\n            <a href=\"https://linkedin.com\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"LinkedIn\">in</a>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"footer-seo-strip\">\n        <a href=\"projects.html\">Best Property Deals 2026</a>\n        <a href=\"developers.html\">Top Builders in India</a>\n        <a href=\"explore.html\">Buy Flats Near Metro</a>\n        <a href=\"explore.html\">High ROI Investment Zones</a>\n        <a href=\"projects.html\">RERA Approved Projects</a>\n        <a href=\"explore.html\">Affordable Homes in Tier 1 Cities</a>\n        <a href=\"projects.html\">Luxury Homes in India</a>\n        <a href=\"projects.html\">Upcoming Township Projects</a>\n      </div>\n    </div>\n\n    <div class=\"footer-bottom\">© 2026 Inchbrick Realty. All rights reserved.</div>\n  </div>\n</footer>\n"
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
    document.querySelectorAll(".nav-item[data-nav]").forEach((item) => {
      item.classList.toggle("active", item.dataset.nav === page);
    });
    if (location.hash === "#blog" && (page === "home" || page === "explore")) {
      document.querySelector('.nav-item[data-nav="blog"]')?.classList.remove("active");
    }
  }

  function initNavDropdowns(header) {
    const navItems = header.querySelectorAll(".nav-item");
    const mobileQuery = window.matchMedia("(max-width: 1024px)");

    function closeAll(except) {
      navItems.forEach((item) => {
        if (item !== except) item.classList.remove("open");
      });
    }

    navItems.forEach((item) => {
      const trigger = item.querySelector(".nav-trigger");
      if (!trigger) return;

      trigger.addEventListener("click", (event) => {
        if (!mobileQuery.matches) return;
        event.preventDefault();
        const willOpen = !item.classList.contains("open");
        closeAll(willOpen ? item : null);
        item.classList.toggle("open", willOpen);
      });
    });

    document.addEventListener("click", (event) => {
      if (!mobileQuery.matches) return;
      if (event.target.closest(".nav-item")) return;
      closeAll();
    });
  }

  function initHeader() {
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const headerMoreMenu = document.getElementById("headerMoreMenu");
    if (!header) return;

    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });

    menuBtn?.addEventListener("click", () => {
      navLinks?.classList.toggle("open");
      headerMoreMenu?.classList.toggle("open");
      menuBtn.classList.toggle("active", headerMoreMenu?.classList.contains("open") || navLinks?.classList.contains("open"));
    });

    document.addEventListener("click", (event) => {
      if (!headerMoreMenu?.classList.contains("open")) return;
      if (header.contains(event.target)) return;
      headerMoreMenu.classList.remove("open");
      navLinks?.classList.remove("open");
      menuBtn?.classList.remove("active");
    });

    initNavDropdowns(header);
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
