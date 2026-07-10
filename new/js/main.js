(function () {
  "use strict";

  /* ---- Header scroll shrink ---- */
  const header = document.getElementById("header");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 60);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  /* ---- Hero load animation ---- */
  const hero = document.querySelector(".hero");
  window.addEventListener("load", () => {
    setTimeout(() => hero?.classList.add("loaded"), 100);
  });

  /* ---- Scroll reveal (Intersection Observer) ---- */
  const animated = document.querySelectorAll("[data-animate]:not(.hero [data-animate])");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || "0", 10);
        setTimeout(() => el.classList.add("visible"), delay);
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  animated.forEach((el) => revealObserver.observe(el));

  /* ---- Counter animation ---- */
  const counters = document.querySelectorAll(".stat-num[data-count]");
  let countersStarted = false;

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }

    requestAnimationFrame(tick);
  }

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || countersStarted) return;
          countersStarted = true;
          counters.forEach((c) => animateCounter(c));
          statsObserver.disconnect();
        });
      },
      { threshold: 0.4 }
    );
    statsObserver.observe(statsSection);
  }

  /* ---- Search tabs ---- */
  document.querySelectorAll(".search-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".search-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  /* ---- Project carousel ---- */
  const carousel = document.getElementById("projectCarousel");
  const prevBtn = document.getElementById("projectPrev");
  const nextBtn = document.getElementById("projectNext");

  if (carousel && prevBtn && nextBtn) {
    let index = 0;

    function getVisible() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 1100) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, carousel.children.length - getVisible());
    }

    function updateCarousel() {
      const card = carousel.querySelector(".project-card");
      if (!card) return;
      const gap = 20;
      const offset = index * (card.offsetWidth + gap);
      carousel.style.transform = `translateX(-${offset}px)`;
    }

    prevBtn.addEventListener("click", () => {
      index = Math.max(0, index - 1);
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      index = Math.min(getMaxIndex(), index + 1);
      updateCarousel();
    });

    window.addEventListener("resize", () => {
      index = Math.min(index, getMaxIndex());
      updateCarousel();
    });
  }

  /* ---- Testimonial carousel ---- */
  const track = document.getElementById("testimonialTrack");
  const dotsContainer = document.getElementById("testimonialDots");
  const cards = track ? [...track.querySelectorAll(".testimonial-card")] : [];
  let currentTestimonial = 0;
  let testimonialTimer;

  function showTestimonial(i) {
    cards.forEach((c, idx) => c.classList.toggle("active", idx === i));
    dotsContainer?.querySelectorAll("button").forEach((d, idx) => {
      d.classList.toggle("active", idx === i);
    });
    currentTestimonial = i;
  }

  if (cards.length && dotsContainer) {
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Testimonial ${i + 1}`);
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        showTestimonial(i);
        resetTestimonialTimer();
      });
      dotsContainer.appendChild(dot);
    });

    function nextTestimonial() {
      showTestimonial((currentTestimonial + 1) % cards.length);
    }

    function resetTestimonialTimer() {
      clearInterval(testimonialTimer);
      testimonialTimer = setInterval(nextTestimonial, 5000);
    }

    resetTestimonialTimer();
  }

  /* ---- Smooth anchor offset for fixed header ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
