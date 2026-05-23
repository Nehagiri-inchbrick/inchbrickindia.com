/**
 * Property listing detail — luxury layout
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

  const HIGHLIGHTS = [
    "Chef's kitchen with premium appliances",
    "Primary suite with walk-in closet",
    "Smart home automation throughout",
    "Resort-style pool and outdoor lounge",
    "Home office with built-in cabinetry",
    "Energy-efficient design and solar ready"
  ];

  const FEATURES = [
    { icon: "fa-mountain-sun", title: "Premium Views", text: "Unobstructed skyline or green belt views from key rooms." },
    { icon: "fa-kitchen-set", title: "Designer Kitchen", text: "Modular fittings, stone counters, and ample storage." },
    { icon: "fa-tree", title: "Private Outdoor Space", text: "Balcony, terrace, or garden for relaxed living." },
    { icon: "fa-shield-halved", title: "Gated Community", text: "24/7 security with controlled access and CCTV." }
  ];

  const CITY_LIFESTYLE = {
    Mumbai: { blurb: "India's financial capital with iconic dining, retail, and sea-facing neighbourhoods.", a: "15 Min to BKC", b: "20 Min to Airport", c: "10 Min to High Street" },
    Gurgaon: { blurb: "Corporate hubs, golf courses, and premium malls define everyday convenience.", a: "10 Min to Cyber City", b: "25 Min to Airport", c: "8 Min to Ambience Mall" },
    Bangalore: { blurb: "Garden city living with tech corridors, cafes, and pleasant weather year-round.", a: "12 Min to ORR", b: "45 Min to Airport", c: "15 Min to Indiranagar" },
    default: { blurb: "Prime location with excellent connectivity, schools, and lifestyle amenities nearby.", a: "10 Min to City Center", b: "30 Min to Airport", c: "5 Min to Main Road" }
  };

  function enrich(p) {
    const gallery = [p.img.replace("w=1200", "w=1600")];
    for (let i = 0; gallery.length < 4; i++) {
      const url = GALLERY_POOL[(p.id + i) % GALLERY_POOL.length];
      if (!gallery.includes(url)) gallery.push(url);
    }
    const baths = p.bhkNum >= 4 ? "4.5" : p.bhkNum >= 3 ? "3" : "2";
    const garage = p.bhkNum >= 3 ? "2" : "1";
    const lifestyle = CITY_LIFESTYLE[p.city] || CITY_LIFESTYLE.default;
    return {
      ...p,
      gallery,
      photoCount: 18 + (p.id % 12),
      baths,
      garage,
      lifestyle,
      aboutTitle: p.type === "Villa" ? "Modern Luxury with Timeless Elegance" : "Contemporary Living, Elevated Comfort",
      description1:
        p.name +
        " offers " +
        p.area +
        " of refined living in " +
        p.location +
        ", " +
        p.city +
        ". Designed for discerning buyers, the residence blends open layouts, natural light, and premium finishes throughout.",
      description2:
        "RERA-registered and presented by Inchbrick Realty, this " +
        p.status.toLowerCase() +
        " home is ideal for " +
        (moodLabels[p.mood] || "quality living").toLowerCase() +
        ". Schedule a private tour to experience the space firsthand."
    };
  }

  function renderNotFound() {
    document.title = "Property Not Found | Inchbrick Realty";
    root.innerHTML =
      '<div class="detail-not-found"><h1>Property not found</h1><p>This listing may have been removed.</p><a href="listings.html">Back to listings</a></div>';
  }

  function render(p) {
    const prop = enrich(p);
    const waText = encodeURIComponent("Hi, I'm interested in " + prop.name + " (" + prop.price + ")");

    document.title = prop.name + " | Inchbrick Realty";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = prop.description1.slice(0, 155);

    root.innerHTML =
      '<section class="ld-hero">' +
      '<a href="listings.html" class="ld-back" aria-label="Back to listings"><i class="fas fa-arrow-left"></i></a>' +
      '<img class="ld-hero-img" id="detailMainImg" src="' + prop.gallery[0] + '" alt="' + prop.name + '">' +
      '<div class="ld-gallery-bar">' +
      '<button type="button" class="ld-photo-count"><i class="fas fa-camera"></i> ' + prop.photoCount + "</button>" +
      '<div class="ld-thumbs" id="detailThumbs">' +
      prop.gallery
        .map(
          (url, i) =>
            '<button type="button" class="ld-thumb' +
            (i === 0 ? " is-active" : "") +
            '" data-img="' +
            url +
            '"><img src="' +
            url +
            '" alt="Photo ' +
            (i + 1) +
            '"></button>'
        )
        .join("") +
      "</div></div>" +
      '<aside class="ld-float-card">' +
      '<p class="ld-sale-label">For Sale</p>' +
      '<p class="ld-price">' + prop.price + "</p>" +
      '<p class="ld-address">' + prop.location + ", " + prop.city + "</p>" +
      '<div class="ld-stats-row">' +
      statCell("fa-bed", prop.bhk.replace(" BHK", ""), "Beds") +
      statCell("fa-bath", prop.baths, "Baths") +
      statCell("fa-expand", prop.area.replace(" sqft", ""), "Sq. Ft.") +
      statCell("fa-car", prop.garage, "Garage") +
      "</div>" +
      '<a href="contact.html#contactForm" class="ld-btn ld-btn-primary"><i class="far fa-calendar"></i> Schedule a Visit</a>' +
      '<a href="contact.html#contactForm" class="ld-btn ld-btn-outline"><i class="fas fa-circle-info"></i> Request More Info</a>' +
      '<div class="ld-agent">' +
      '<div class="ld-agent-placeholder">PS</div>' +
      "<div><strong>Priya Sharma</strong><span>Luxury Property Specialist</span><br>" +
      '<a href="tel:+919876543210">+91 98765 43210</a></div></div></aside></section>' +
      '<section class="ld-content"><div class="ld-container ld-content-grid">' +
      '<div class="ld-content-left">' +
      '<div class="ld-about">' +
      '<p class="ld-kicker">About This Property</p>' +
      "<h2>" + prop.aboutTitle + "</h2>" +
      '<p class="ld-about-text">' + prop.description1 + "</p>" +
      '<p class="ld-about-text">' + prop.description2 + "</p>" +
      "</div>" +
      '<div class="ld-features-grid">' +
      FEATURES.map((f) => featureBlock(f)).join("") +
      "</div>" +
      '<div class="ld-tour-wrap">' +
      '<img src="' + (prop.gallery[1] || prop.gallery[0]) + '" alt="Interior tour">' +
      '<button type="button" class="ld-tour-play" aria-label="Play virtual tour"><span><i class="fas fa-play"></i></span></button>' +
      '<button type="button" class="ld-tour-badge"><i class="fas fa-vr-cardboard"></i> Take a Virtual Tour</button></div>' +
      "</div>" +
      '<div class="ld-content-right">' +
      '<div class="ld-map-card">' +
      '<img class="ld-map-img" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Map location">' +
      '<div class="ld-map-pin"><i class="fas fa-location-dot"></i></div>' +
      '<div class="ld-map-footer"><p>' + prop.location + ", " + prop.city + '</p>' +
      '<a href="https://maps.google.com" target="_blank" rel="noopener" class="ld-map-link">View on Map <i class="fas fa-arrow-right"></i></a></div></div>' +
      '<div class="ld-highlights-panel">' +
      '<p class="ld-kicker">Property Highlights</p>' +
      '<ul class="ld-highlight-list">' +
      HIGHLIGHTS.map((h) => '<li><i class="fas fa-check"></i> ' + h + "</li>").join("") +
      "</ul></div></div></div></section>" +
      '<section class="ld-contact-band"><div class="ld-container">' +
      '<div class="ld-contact-inner">' +
      '<div class="ld-lifestyle">' +
      '<i class="fas fa-sun ld-lifestyle-icon"></i>' +
      "<h2>Live the " + prop.city + " Lifestyle</h2>" +
      "<p>" + prop.lifestyle.blurb + "</p>" +
      '<div class="ld-area-stats">' +
      areaStat("fa-location-dot", prop.lifestyle.a, "Drive time") +
      areaStat("fa-bag-shopping", prop.lifestyle.b, "Drive time") +
      areaStat("fa-plane", prop.lifestyle.c, "Drive time") +
      "</div></div>" +
      '<div class="ld-form-wrap">' +
      "<h3>Interested in this property?</h3>" +
      '<p class="ld-form-sub">Get in touch with us for more information.</p>' +
      '<form class="ld-form" id="detailContactForm">' +
      '<div class="ld-form-row"><input type="text" name="name" placeholder="Your Name" required>' +
      '<input type="email" name="email" placeholder="Email Address" required></div>' +
      '<input type="tel" name="phone" placeholder="Phone Number">' +
      '<textarea name="message" placeholder="Message">I would like to know more about ' + prop.name + ".</textarea>" +
      '<button type="submit" class="ld-btn-gold"><i class="fas fa-paper-plane"></i> Send Message</button></form></div></div></div></section>';

    bindEvents(prop);
  }

  function statCell(icon, val, label) {
    return (
      '<div class="ld-stat"><i class="fas ' + icon + '"></i><strong>' + val + "</strong><span>" + label + "</span></div>"
    );
  }

  function featureBlock(f) {
    return (
      '<div class="ld-feature-item">' +
      '<div class="ld-feature-icon"><i class="fas ' + f.icon + '"></i></div>' +
      "<strong>" + f.title + "</strong><p>" + f.text + "</p></div>"
    );
  }

  function areaStat(icon, title, sub) {
    return (
      '<div class="ld-area-stat"><i class="fas ' + icon + '"></i><strong>' + title + "</strong><span>" + sub + "</span></div>"
    );
  }

  function bindEvents(prop) {
    document.getElementById("detailThumbs")?.querySelectorAll(".ld-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        const img = btn.dataset.img;
        const main = document.getElementById("detailMainImg");
        if (main && img) main.src = img;
        document.querySelectorAll(".ld-thumb").forEach((t) => t.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });

    document.querySelector(".ld-tour-play")?.addEventListener("click", () => {
      alert("Virtual tour coming soon. Book a site visit for a live walkthrough.");
    });

    document.querySelector(".ld-tour-badge")?.addEventListener("click", () => {
      document.querySelector(".ld-tour-play")?.click();
    });

    document.getElementById("detailContactForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "contact.html#contactForm";
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
