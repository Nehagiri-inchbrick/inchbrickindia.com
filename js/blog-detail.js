/**
 * Blog article detail page
 */
(function () {
  const data = window.BLOG_DATA || [];
  const root = document.getElementById("blogDetailRoot");
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function tagClass(tag) {
    return "bd-tag bd-tag--" + (tag || "navy");
  }

  function relatedArticles(current) {
    return data
      .filter((a) => a.id !== current.id && a.category === current.category)
      .slice(0, 3)
      .concat(data.filter((a) => a.id !== current.id && a.category !== current.category))
      .slice(0, 3);
  }

  function renderNotFound() {
    document.title = "Article Not Found | Inchbrick Realty";
    root.innerHTML =
      '<div class="bd-not-found"><h1>Article not found</h1><p>This post may have been removed.</p><a href="blog.html">Back to blog</a></div>';
  }

  function render(a) {
    document.title = a.title + " | Inchbrick Realty Blog";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = a.excerpt.slice(0, 155);

    const related = relatedArticles(a);

    root.innerHTML =
      '<article class="bd-page">' +
      '<div class="bd-container">' +
      '<a href="blog.html" class="bd-back"><i class="fas fa-arrow-left"></i> Back to Blog</a>' +
      "</div>" +
      '<header class="bd-hero">' +
      '<div class="bd-container bd-hero-inner">' +
      '<span class="' +
      tagClass(a.tagClass) +
      '">' +
      esc(a.categoryLabel) +
      "</span>" +
      "<h1>" +
      esc(a.title) +
      "</h1>" +
      '<div class="bd-meta">' +
      metaItem("far fa-calendar", a.date) +
      metaItem("far fa-clock", a.readTime + " read") +
      metaItem("far fa-user", a.author) +
      "</div></div>" +
      '<div class="bd-hero-img"><img src="' +
      a.img +
      '" alt="' +
      esc(a.title) +
      '"></div></header>' +
      '<div class="bd-layout bd-container">' +
      '<div class="bd-main">' +
      '<p class="bd-lead">' +
      esc(a.excerpt) +
      "</p>" +
      a.content.map((p) => "<p>" + esc(p) + "</p>").join("") +
      '<aside class="bd-takeaways"><h3><i class="fas fa-lightbulb"></i> Key Takeaways</h3><ul>' +
      a.takeaways.map((t) => "<li>" + esc(t) + "</li>").join("") +
      "</ul></aside>" +
      '<div class="bd-share">' +
      "<span>Share:</span>" +
      '<a href="#" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></a>' +
      '<a href="#" aria-label="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></a>' +
      '<a href="#" aria-label="Share on Twitter"><i class="fab fa-x-twitter"></i></a>' +
      "</div></div>" +
      '<aside class="bd-sidebar">' +
      '<div class="bd-author">' +
      '<div class="bd-author-avatar">' +
      a.author
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() +
      "</div>" +
      "<div><strong>" +
      esc(a.author) +
      "</strong><span>" +
      esc(a.authorRole) +
      "</span><p>Contributing writer at Inchbrick Realty with expertise in " +
      esc(a.categoryLabel.toLowerCase()) +
      " insights.</p></div></div>" +
      (related.length
        ? '<div class="bd-related"><h3>Related Articles</h3>' +
          related
            .map(
              (r) =>
                '<a href="blog-detail.html?id=' +
                r.id +
                '" class="bd-related-item">' +
                '<img src="' +
                r.img +
                '" alt="">' +
                "<div><span class=\"" +
                tagClass(r.tagClass) +
                '">' +
                esc(r.categoryLabel) +
                "</span><strong>" +
                esc(r.title) +
                "</strong></div></a>"
            )
            .join("") +
          "</div>"
        : "") +
      '<div class="bd-sidebar-cta">' +
      "<h3>Looking for a home?</h3>" +
      "<p>Browse verified listings or talk to our experts.</p>" +
      '<a href="listings.html" class="bd-btn bd-btn--primary">View Properties</a>' +
      '<a href="contact.html#contactForm" class="bd-btn bd-btn--outline">Contact Us</a>' +
      "</div></aside></div>" +
      '<section class="bd-newsletter">' +
      '<div class="bd-container bd-newsletter-inner">' +
      "<div><h3>Weekly Market Pulse</h3><p>Curated launches, price movements, and guides — one email per week.</p></div>" +
      '<form class="bd-newsletter-form" id="bdNewsletter">' +
      '<input type="email" required placeholder="you@email.com" aria-label="Email">' +
      '<button type="submit">Subscribe</button></form></div></section></article>';

    document.getElementById("bdNewsletter")?.addEventListener("submit", (e) => {
      e.preventDefault();
      e.target.reset();
      alert("Thanks for subscribing!");
    });
  }

  function metaItem(icon, text) {
    return '<span><i class="' + icon + '"></i> ' + esc(text) + "</span>";
  }

  if (!root) return;
  const article = data.find((a) => a.id === id);
  if (!article) {
    renderNotFound();
    return;
  }
  render(article);
})();
