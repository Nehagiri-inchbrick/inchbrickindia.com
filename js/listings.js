/**
 * Property listings — filter sidebar + property list
 */
(function () {
  const allProperties = window.LISTINGS_DATA || [];
  const moodLabels = window.MOOD_LABELS || {};

  const params = new URLSearchParams(window.location.search);

  const form = document.getElementById("listingsFilterForm");
  const filterCity = document.getElementById("filterCity");
  const filterType = document.getElementById("filterType");
  const filterBhk = document.getElementById("filterBhk");
  const filterPrice = document.getElementById("filterPrice");
  const filterStatus = document.getElementById("filterStatus");
  const filterMood = document.getElementById("filterMood");
  const filterSearch = document.getElementById("filterSearch");
  const filterReset = document.getElementById("filterReset");
  const sortSelect = document.getElementById("listingsSort");
  const listEl = document.getElementById("listingsList");
  const countEl = document.getElementById("listingsCount");
  const tagsEl = document.getElementById("listingsActiveTags");

  let filters = {
    city: "",
    type: "",
    bhk: "",
    priceMax: "",
    status: "",
    mood: params.get("mood") || "",
    q: ""
  };

  function initCityOptions() {
    if (!filterCity) return;
    const cities = [...new Set(allProperties.map((p) => p.city))].sort();
    cities.forEach((city) => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      filterCity.appendChild(opt);
    });
  }

  function readForm() {
    filters.city = filterCity?.value || "";
    filters.type = filterType?.value || "";
    filters.bhk = filterBhk?.value || "";
    filters.priceMax = filterPrice?.value || "";
    filters.status = filterStatus?.value || "";
    filters.mood = filterMood?.value || "";
    filters.q = (filterSearch?.value || "").trim().toLowerCase();
  }

  function applyFormToUI() {
    if (filterCity) filterCity.value = filters.city;
    if (filterType) filterType.value = filters.type;
    if (filterBhk) filterBhk.value = filters.bhk;
    if (filterPrice) filterPrice.value = filters.priceMax;
    if (filterStatus) filterStatus.value = filters.status;
    if (filterMood) filterMood.value = filters.mood;
    if (filterSearch) filterSearch.value = filters.q;
  }

  function filterProperties() {
    return allProperties.filter((p) => {
      if (filters.city && p.city !== filters.city) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.bhk !== "" && String(p.bhkNum) !== filters.bhk) return false;
      if (filters.priceMax && p.priceVal > Number(filters.priceMax)) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.mood && p.mood !== filters.mood) return false;
      if (filters.q) {
        const hay = (p.name + " " + p.location + " " + p.city + " " + p.type).toLowerCase();
        if (!hay.includes(filters.q)) return false;
      }
      return true;
    });
  }

  function sortList(list) {
    const mode = sortSelect?.value || "featured";
    const sorted = list.slice();
    if (mode === "price-low") sorted.sort((a, b) => a.priceVal - b.priceVal);
    else if (mode === "price-high") sorted.sort((a, b) => b.priceVal - a.priceVal);
    else if (mode === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }

  function statusClass(status) {
    if (status === "Ready") return "ready";
    if (status === "New Launch") return "new";
    return "";
  }

  function sharpImageMarkup(src, alt) {
    const hd = src.replace(/w=\d+/, "w=1200").replace(/q=\d+/, "q=92");
    const md = src.replace(/w=\d+/, "w=800").replace(/q=\d+/, "q=90");
    return (
      '<img src="' + hd + '" srcset="' + md + " 800w, " + hd + ' 1200w" sizes="(max-width: 640px) 100vw, 300px" alt="' + alt + '" loading="lazy" decoding="async" width="600" height="400">'
    );
  }

  function renderActiveTags() {
    if (!tagsEl) return;
    const tags = [];
    if (filters.city) tags.push({ key: "city", label: filters.city });
    if (filters.type) tags.push({ key: "type", label: filters.type });
    if (filters.bhk !== "") tags.push({ key: "bhk", label: filters.bhk === "0" ? "Plot" : filters.bhk + " BHK" });
    if (filters.priceMax) tags.push({ key: "priceMax", label: "Up to ₹ " + (Number(filters.priceMax) >= 100 ? Number(filters.priceMax) / 100 + " Cr" : filters.priceMax + " L") });
    if (filters.status) tags.push({ key: "status", label: filters.status });
    if (filters.mood && moodLabels[filters.mood]) tags.push({ key: "mood", label: moodLabels[filters.mood] });
    if (filters.q) tags.push({ key: "q", label: '"' + filters.q + '"' });

    if (!tags.length) {
      tagsEl.innerHTML = "";
      return;
    }

    tagsEl.innerHTML = tags
      .map(
        (t) =>
          '<span class="listings-tag">' +
          t.label +
          ' <button type="button" data-clear="' +
          t.key +
          '" aria-label="Remove filter">×</button></span>'
      )
      .join("");

    tagsEl.querySelectorAll("button[data-clear]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.clear;
        if (key === "city") filters.city = "";
        else if (key === "type") filters.type = "";
        else if (key === "bhk") filters.bhk = "";
        else if (key === "priceMax") filters.priceMax = "";
        else if (key === "status") filters.status = "";
        else if (key === "mood") filters.mood = "";
        else if (key === "q") filters.q = "";
        applyFormToUI();
        render();
      });
    });
  }

  function renderList(properties) {
    if (!listEl) return;

    if (!properties.length) {
      listEl.innerHTML =
        '<div class="listings-empty">' +
        '<i class="fas fa-building-circle-xmark"></i>' +
        "<h3>No properties match your filters</h3>" +
        "<p>Try changing city, budget, or reset filters to see more listings.</p>" +
        "</div>";
      return;
    }

    listEl.innerHTML = properties
      .map((p, i) => {
        const moodLabel = moodLabels[p.mood] || "";
        const badgeCls = statusClass(p.status);
        const photoCount = 8 + (i % 6);
        const featured = i % 4 === 0;
        const shareText = encodeURIComponent(p.name + " — " + p.price + " | Inchbrick Realty");
        const waText = encodeURIComponent("Hi, I'm interested in " + p.name + " (" + p.price + ")");
        const detailHref = "listing-detail.html?id=" + p.id;
        return (
          '<article class="prop-list-item" data-id="' + p.id + '">' +
          '<a href="' + detailHref + '" class="prop-list-img">' +
          '<span class="prop-list-badge ' + badgeCls + '">' + p.status + "</span>" +
          (featured ? '<span class="prop-list-featured">Featured</span>' : "") +
          sharpImageMarkup(p.img, p.name) +
          '<span class="prop-list-photo-count"><i class="fas fa-images"></i> ' + photoCount + " Photos</span>" +
          '<button type="button" class="prop-list-wish" aria-label="Save property"><i class="far fa-heart"></i></button>' +
          "</a>" +
          '<div class="prop-list-main">' +
          '<div class="prop-list-details">' +
          '<h3><a href="' + detailHref + '">' + p.name + "</a></h3>" +
          '<p class="prop-list-loc"><i class="fas fa-map-marker-alt"></i> ' + p.location + ", " + p.city + "</p>" +
          '<div class="prop-list-specs">' +
          '<span><i class="fas fa-bed"></i> ' + p.bhk + "</span>" +
          '<span><i class="fas fa-expand"></i> ' + p.area + "</span>" +
          '<span><i class="fas fa-building"></i> ' + p.type + "</span>" +
          "</div>" +
          '<div class="prop-list-tags">' +
          '<span class="prop-list-tag rera">RERA Verified</span>' +
          (moodLabel ? '<span class="prop-list-tag">' + moodLabel + "</span>" : "") +
          "</div></div>" +
          '<div class="prop-list-options">' +
          '<a href="tel:+919876543210" class="prop-list-opt"><i class="fas fa-phone"></i> Call</a>' +
          '<a href="https://wa.me/919876543210?text=' + waText + '" class="prop-list-opt" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> WhatsApp</a>' +
          '<button type="button" class="prop-list-opt" data-action="share" data-share="' + shareText + '"><i class="fas fa-share-nodes"></i> Share</button>' +
          '<button type="button" class="prop-list-opt" data-action="brochure"><i class="fas fa-file-pdf"></i> Brochure</button>' +
          '<button type="button" class="prop-list-opt" data-action="tour"><i class="fas fa-vr-cardboard"></i> Tour</button>' +
          '<button type="button" class="prop-list-opt" data-action="compare"><i class="fas fa-scale-balanced"></i> Compare</button>' +
          "</div></div>" +
          '<div class="prop-list-aside">' +
          '<div class="prop-list-price-block">' +
          '<p class="prop-list-price">' + p.price + "</p>" +
          '<p class="prop-list-price-note">All inclusive*</p></div>' +
          '<div class="prop-list-actions">' +
          '<a href="contact.html#contactForm" class="prop-list-btn prop-list-btn-primary">Book site visit</a>' +
          '<a href="' + detailHref + '" class="prop-list-btn prop-list-btn-outline">View details</a>' +
          '<button type="button" class="prop-list-btn prop-list-btn-outline" data-action="callback">Request callback</button>' +
          "</div></div></article>"
        );
      })
      .join("");

    bindListInteractions();
  }

  function bindListInteractions() {
    if (!listEl) return;

    listEl.querySelectorAll(".prop-list-wish").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle("is-active");
        const icon = btn.querySelector("i");
        if (icon) {
          icon.classList.toggle("far", !btn.classList.contains("is-active"));
          icon.classList.toggle("fas", btn.classList.contains("is-active"));
        }
      });
    });

    listEl.querySelectorAll('[data-action="share"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = decodeURIComponent(btn.dataset.share || "");
        if (navigator.share) {
          navigator.share({ title: "Inchbrick Realty", text: text }).catch(() => {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => alert("Property link copied!"));
        }
      });
    });

    listEl.querySelectorAll('[data-action="brochure"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.href = "contact.html#contactForm";
      });
    });

    listEl.querySelectorAll('[data-action="tour"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        alert("Virtual tour will open soon. Book a site visit for a live walkthrough.");
      });
    });

    listEl.querySelectorAll('[data-action="compare"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("is-active");
        btn.innerHTML = btn.classList.contains("is-active")
          ? '<i class="fas fa-check"></i> Added'
          : '<i class="fas fa-scale-balanced"></i> Compare';
      });
    });

    listEl.querySelectorAll('[data-action="callback"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.href = "contact.html#contactForm";
      });
    });
  }

  function render() {
    readForm();
    const filtered = sortList(filterProperties());
    if (countEl) countEl.innerHTML = "<strong>" + filtered.length + "</strong> properties found";
    renderActiveTags();
    renderList(filtered);
  }

  function resetFilters() {
    filters = { city: "", type: "", bhk: "", priceMax: "", status: "", mood: "", q: "" };
    applyFormToUI();
    if (sortSelect) sortSelect.value = "featured";
    history.replaceState(null, "", "listings.html");
    render();
  }

  initCityOptions();
  applyFormToUI();
  if (filters.mood && filterMood) filterMood.value = filters.mood;

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    render();
  });

  [filterCity, filterType, filterBhk, filterPrice, filterStatus, filterMood].forEach((el) => {
    el?.addEventListener("change", render);
  });

  filterSearch?.addEventListener("input", () => {
    clearTimeout(filterSearch._timer);
    filterSearch._timer = setTimeout(render, 350);
  });

  sortSelect?.addEventListener("change", render);
  filterReset?.addEventListener("click", resetFilters);

  render();
})();
