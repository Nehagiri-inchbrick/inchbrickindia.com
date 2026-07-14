/**
 * City search & autocomplete — shared across homepage and city pages
 */
(function () {
  const ALIASES = {
    mumbai: ["mumbai", "bombay"],
    bangalore: ["bangalore", "bengaluru", "blr"],
    pune: ["pune"],
    delhi: ["delhi", "delhi ncr", "ncr", "noida", "gurgaon", "gurugram", "greater noida"],
    hyderabad: ["hyderabad", "hyd"],
    chennai: ["chennai", "madras"],
    kolkata: ["kolkata", "calcutta"],
    ahmedabad: ["ahmedabad", "amdavad"],
    goa: ["goa", "north goa", "south goa"],
    dubai: ["dubai", "uae", "emirates"]
  };

  function getCities() {
    const data = window.CITIES_DATA || {};
    return Object.keys(data).map((slug) => {
      const c = data[slug];
      return {
        slug,
        name: c.name,
        state: c.state,
        tag: c.tag,
        icon: c.icon,
        heroImg: c.heroImg,
        startingPrice: c.startingPrice,
        listings: c.listings,
        keywords: (ALIASES[slug] || [slug]).concat([c.name, c.state, slug]).map((s) => s.toLowerCase())
      };
    });
  }

  function scoreCity(city, q) {
    const query = q.toLowerCase().trim();
    if (!query) return 0;
    if (city.slug === query) return 100;
    if (city.name.toLowerCase() === query) return 95;
    if (city.keywords.some((k) => k === query)) return 90;
    if (city.name.toLowerCase().startsWith(query)) return 80;
    if (city.keywords.some((k) => k.startsWith(query))) return 75;
    if (city.name.toLowerCase().includes(query)) return 60;
    if (city.keywords.some((k) => k.includes(query))) return 55;
    if (city.state.toLowerCase().includes(query)) return 40;
    return 0;
  }

  function matchCities(query, limit) {
    if (!query || !query.trim()) return getCities().slice(0, limit || 8);
    return getCities()
      .map((c) => ({ city: c, score: scoreCity(c, query) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit || 8)
      .map((x) => x.city);
  }

  function resolveCity(query) {
    const matches = matchCities(query, 1);
    if (!matches.length) return null;
    const top = matches[0];
    const q = query.toLowerCase().trim();
    if (scoreCity(top, q) >= 55) return top.slug;
    return null;
  }

  function cityUrl(slug) {
    const base = window.location.pathname.includes("/") ? "city.html" : "city.html";
    return base + "?city=" + encodeURIComponent(slug);
  }

  function navigateToCity(slug) {
    window.location.href = cityUrl(slug);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function renderDropdownItem(city) {
    return (
      '<button type="button" class="city-ac-item" data-slug="' + esc(city.slug) + '" role="option">' +
      '<span class="city-ac-icon"><i class="fas ' + esc(city.icon) + '"></i></span>' +
      '<span class="city-ac-body">' +
      "<strong>" + esc(city.name) + "</strong>" +
      "<span>" + esc(city.state) + " · " + esc(city.startingPrice) + "</span>" +
      "</span>" +
      '<span class="city-ac-tag">' + esc(city.tag) + "</span>" +
      '<i class="fas fa-arrow-right city-ac-arrow"></i>' +
      "</button>"
    );
  }

  function initAutocomplete(input, options) {
    if (!input || input.dataset.citySearchInit) return;
    input.dataset.citySearchInit = "1";

    const opts = options || {};
    const wrap = input.closest(".city-search-wrap") || input.parentElement;
    if (!wrap) return;

    wrap.classList.add("city-search-wrap");
    let list = wrap.querySelector(".city-ac-list");
    if (!list) {
      list = document.createElement("div");
      list.className = "city-ac-list";
      list.setAttribute("role", "listbox");
      list.hidden = true;
      wrap.appendChild(list);
    }

    let activeIndex = -1;

    function show(matches) {
      if (!matches.length) {
        list.hidden = true;
        list.innerHTML = "";
        activeIndex = -1;
        return;
      }
      list.innerHTML = matches.map(renderDropdownItem).join("");
      list.hidden = false;
      activeIndex = 0;
      highlight();
    }

    function highlight() {
      list.querySelectorAll(".city-ac-item").forEach((el, i) => {
        el.classList.toggle("is-active", i === activeIndex);
      });
    }

    function selectSlug(slug) {
      if (opts.onSelect) opts.onSelect(slug);
      else navigateToCity(slug);
    }

    function handleInput() {
      show(matchCities(input.value, opts.limit || 6));
    }

    input.addEventListener("input", handleInput);
    input.addEventListener("focus", () => {
      show(matchCities(input.value, opts.limit || 6));
    });

    input.addEventListener("keydown", (e) => {
      const items = list.querySelectorAll(".city-ac-item");
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!items.length) return;
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        highlight();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        highlight();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && items[activeIndex]) {
          selectSlug(items[activeIndex].dataset.slug);
          return;
        }
        const slug = resolveCity(input.value);
        if (slug) selectSlug(slug);
        else if (opts.onSubmit) opts.onSubmit(input.value);
      } else if (e.key === "Escape") {
        list.hidden = true;
      }
    });

    list.addEventListener("click", (e) => {
      const btn = e.target.closest(".city-ac-item");
      if (btn) selectSlug(btn.dataset.slug);
    });

    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) list.hidden = true;
    });
  }

  window.CitySearch = {
    getCities,
    matchCities,
    resolveCity,
    navigateToCity,
    cityUrl,
    initAutocomplete
  };
})();
