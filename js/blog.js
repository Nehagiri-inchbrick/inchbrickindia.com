/**
 * Blog page — category filter & search
 */
(function () {
  const grid = document.getElementById("blogGrid");
  const searchInput = document.getElementById("blogSearch");
  const searchHero = document.getElementById("blogSearchHero");
  const empty = document.getElementById("blogEmpty");
  const filterBtns = document.querySelectorAll(".blog-filter-btn");
  const cards = grid ? Array.from(grid.querySelectorAll(".blog-card")) : [];

  if (!grid) return;

  let activeFilter = "all";

  function normalize(str) {
    return (str || "").toLowerCase().trim();
  }

  function cardMatches(card) {
    const cat = card.dataset.category || "";
    const title = card.querySelector("h3")?.textContent || "";
    const text = card.querySelector("p")?.textContent || "";
    const q = normalize(searchInput?.value || searchHero?.value || "");

    if (activeFilter !== "all" && cat !== activeFilter) return false;
    if (!q) return true;
    return normalize(title + " " + text + " " + cat).includes(q);
  }

  function applyFilters() {
    let visible = 0;
    cards.forEach((card) => {
      const show = cardMatches(card);
      card.dataset.hidden = show ? "false" : "true";
      if (show) visible++;
    });
    if (empty) empty.classList.toggle("is-visible", visible === 0);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter || "all";
      filterBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      applyFilters();
    });
  });

  function onSearch() {
    if (searchInput && searchHero && document.activeElement === searchHero) {
      searchInput.value = searchHero.value;
    }
    if (searchHero && searchInput && document.activeElement === searchInput) {
      searchHero.value = searchInput.value;
    }
    applyFilters();
  }

  searchInput?.addEventListener("input", onSearch);
  searchHero?.addEventListener("input", onSearch);

  document.getElementById("blogSearchForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    onSearch();
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("blogNewsletter")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input[type=email]")?.value?.trim();
    if (!email) return;
    const t = document.createElement("div");
    t.style.cssText =
      "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:9999;background:#0f2339;color:#fff;border:1px solid #c29a63;border-radius:14px;padding:12px 20px;font:600 13px Plus Jakarta Sans,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.2)";
    t.innerHTML =
      '<i class="fas fa-check-circle" style="color:#c29a63;margin-right:8px"></i> Subscribed! Watch your inbox.';
    document.body.appendChild(t);
    e.target.reset();
    setTimeout(() => t.remove(), 3500);
  });

  document.querySelectorAll(".blog-topic-tags a").forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      const topic = tag.dataset.topic || tag.textContent.replace("#", "");
      const q = topic.replace(/-/g, " ");
      if (searchInput) searchInput.value = q;
      if (searchHero) searchHero.value = q;
      activeFilter = "all";
      filterBtns.forEach((b) =>
        b.classList.toggle("is-active", b.dataset.filter === "all")
      );
      applyFilters();
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
