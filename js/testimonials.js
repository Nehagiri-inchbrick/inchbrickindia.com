(function () {
  var REVIEWS = [
    { name: "Josh M.", meta: "2 weeks ago · Mumbai", avatar: "J", color: "", text: "Professional team and smooth property shortlisting. They understood our budget and only showed verified RERA projects." },
    { name: "Sarah T.", meta: "Verified buyer · Pune", avatar: "S", color: "green", text: "Transparent service from first call to site visit. No hidden charges and honest advice on every project." },
    { name: "Neha K.", meta: "Mumbai · 3 BHK", avatar: "N", color: "rose", text: "Honest advice — we shortlisted in two days. The advisor coordinated three site visits in one weekend." },
    { name: "Rahul P.", meta: "Bangalore · NRI buyer", avatar: "R", color: "blue", text: "Great support for NRI buyers — virtual tours worked well. Closed on our apartment while living in Singapore." },
    { name: "Ananya S.", meta: "Hyderabad · Investor", avatar: "A", color: "amber", text: "Helped us compare ROI across three micro-markets. We picked a pre-leased asset with strong rental yield." },
    { name: "Vikram D.", meta: "Gurgaon · Ready home", avatar: "V", color: "", text: "Fast documentation support and loan coordination. Inchbrick stayed involved until registration was complete." },
    { name: "Priya M.", meta: "Noida · First home", avatar: "P", color: "green", text: "As first-time buyers we had many questions. The team was patient and never pushed us toward the wrong project." },
    { name: "Arjun K.", meta: "Chennai · 2 BHK", avatar: "A", color: "blue", text: "Excellent locality insights. They explained connectivity, schools, and resale potential before we committed." },
    { name: "Meera J.", meta: "Goa · Holiday home", avatar: "M", color: "rose", text: "Found our coastal villa within budget. Virtual walkthroughs saved us multiple trips from Delhi." }
  ];

  var VIDEOS = [
    { src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", tag: "Mumbai · 2 BHK", quote: "Simple and trustworthy.", meta: "Josh M. · Verified buyer" },
    { src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", tag: "Pune · Ready home", quote: "Clear options, quick visits.", meta: "Sarah T. · Verified buyer" },
    { src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", tag: "NRI · Virtual tour", quote: "Transparent pricing.", meta: "Ananya S. · NRI buyer" },
    { src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", tag: "Bangalore · 3 BHK", quote: "Seamless NRI buying.", meta: "Rahul P. · Verified buyer" },
    { src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", tag: "Noida · First home", quote: "Guided us end to end.", meta: "Priya M. · First-time buyer" },
    { src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", tag: "Gurgaon · Investment", quote: "Smart ROI advice.", meta: "Ananya S. · Investor" }
  ];

  var STORIES = [
    {
      title: "From 12 Projects to One Perfect 3 BHK",
      sub: "The Mehta Family · Mumbai · Bandra West",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      badge: "Family Home",
      challenge: "Overwhelmed by options and unclear on RERA status across 12 shortlisted projects.",
      solution: "Inchbrick filtered to 4 verified projects, arranged weekend site visits, and negotiated builder incentives.",
      outcome: "Booked Skyline Towers 3 BHK with ₹ 8L savings and possession in 90 days.",
      quote: "They treated our search like their own family’s — honest, fast, and completely transparent."
    },
    {
      title: "NRI Couple Closes from Singapore",
      sub: "Rahul & Priya · Bangalore · Whitefield",
      img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
      badge: "NRI Desk",
      challenge: "Could not visit India frequently; needed trusted virtual tours and legal verification.",
      solution: "Live video walkthroughs, POA support, and loan pre-approval with partner banks before travel.",
      outcome: "Registered Harmony Heights 2 BHK on a single 5-day India trip.",
      quote: "Virtual tours felt like being there. Inchbrick handled every document while we were overseas."
    },
    {
      title: "First Rental Yield Investment in Noida",
      sub: "Ananya Sharma · Noida · Expressway",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      badge: "Investment",
      challenge: "Wanted 8%+ rental yield but lacked local market knowledge in NCR.",
      solution: "Micro-market analysis, tenant demand data, and comparison of 6 pre-leased vs under-construction options.",
      outcome: "Acquired Capital Growth Suites with tenant in place — 8.2% annual yield from month one.",
      quote: "The ROI breakdown was clear. No guesswork — just data-backed recommendations."
    },
    {
      title: "Downsizing to a Ready Pune Home",
      sub: "Sarah Thomas · Pune · Baner",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      badge: "Ready to Move",
      challenge: "Needed a smaller, maintenance-free home close to healthcare within 6 weeks.",
      solution: "Shortlisted ready-to-move 2 BHK options, coordinated inspections, and fast-tracked loan processing.",
      outcome: "Moved into Maple Grove Homes in 45 days with zero construction wait.",
      quote: "Every step was coordinated — visits, loan, registration. We just showed up with our bags."
    }
  ];

  var reviewGrid = document.getElementById("tsReviewGrid");
  var videoGrid = document.getElementById("tsVideoGrid");
  var storiesEl = document.getElementById("tsStories");

  function renderReviews() {
    if (!reviewGrid) return;
    reviewGrid.innerHTML = REVIEWS.map(function (r) {
      return (
        '<article class="ts-review">' +
        '<div class="ts-review-top">' +
        '<div class="ts-review-user">' +
        '<span class="ts-avatar' + (r.color ? " " + r.color : "") + '">' + r.avatar + "</span>" +
        "<div><strong>" + r.name + "</strong><span>" + r.meta + "</span></div></div>" +
        '<span class="ts-google-mark">G</span></div>' +
        '<div class="ts-review-stars">★★★★★</div>' +
        '<p class="ts-review-text">' + r.text + "</p></article>"
      );
    }).join("");
  }

  function renderVideos() {
    if (!videoGrid) return;
    videoGrid.innerHTML = VIDEOS.map(function (v, i) {
      return (
        '<article class="ts-video" data-video="' + i + '">' +
        '<div class="ts-video-media">' +
        '<span class="ts-video-play"><i class="fas fa-play"></i></span>' +
        '<video muted loop playsinline preload="metadata" src="' + v.src + '"></video></div>' +
        '<div class="ts-video-body">' +
        '<span class="ts-video-tag">' + v.tag + "</span>" +
        "<h3>\u201C" + v.quote + "\u201D</h3>" +
        '<span class="ts-video-meta">' + v.meta + "</span></div></article>"
      );
    }).join("");

    videoGrid.querySelectorAll(".ts-video-media").forEach(function (media) {
      media.addEventListener("click", function () {
        var card = media.closest(".ts-video");
        var video = media.querySelector("video");
        if (!video) return;

        videoGrid.querySelectorAll(".ts-video").forEach(function (other) {
          if (other !== card) {
            other.classList.remove("is-playing");
            var v = other.querySelector("video");
            if (v) { v.pause(); v.currentTime = 0; }
          }
        });

        if (video.paused) {
          video.play();
          card.classList.add("is-playing");
        } else {
          video.pause();
          card.classList.remove("is-playing");
        }
      });
    });
  }

  function renderStories() {
    if (!storiesEl) return;
    storiesEl.innerHTML = STORIES.map(function (s) {
      return (
        '<article class="ts-story">' +
        '<div class="ts-story-media">' +
        '<img src="' + s.img + '" alt="' + s.title + '">' +
        '<span class="ts-story-badge">' + s.badge + "</span></div>" +
        '<div class="ts-story-body">' +
        "<h3>" + s.title + "</h3>" +
        '<p class="ts-story-sub">' + s.sub + "</p>" +
        '<div class="ts-story-points">' +
        '<div class="ts-story-point"><strong>Challenge</strong><p>' + s.challenge + "</p></div>" +
        '<div class="ts-story-point"><strong>Solution</strong><p>' + s.solution + "</p></div>" +
        '<div class="ts-story-point"><strong>Outcome</strong><p>' + s.outcome + "</p></div></div>" +
        '<p class="ts-story-quote">\u201C' + s.quote + '\u201D</p></div></article>'
      );
    }).join("");
  }

  renderReviews();
  renderVideos();
  renderStories();
})();
