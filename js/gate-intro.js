/**
 * Home: scroll past hero → gate zone pins scroll → animation → then page continues.
 */
(function () {
  const overlay = document.getElementById("gateOverlay");
  const scrollZone = document.getElementById("gateScrollZone");
  const moodSection = document.querySelector(".mood-lifestyle-section");
  if (!overlay || !scrollZone) return;

  try {
    localStorage.removeItem("inchbrick-gate-skipped");
  } catch (e) {}

  const panelL = document.getElementById("gatePanelLeft");
  const panelR = document.getElementById("gatePanelRight");
  const brandInner = document.getElementById("gateBrandInner");
  const tagline = document.getElementById("gateTagline");
  const hint = document.getElementById("gateHint");
  const progressBar = document.getElementById("gateProgressBar");
  const skipBtn = document.getElementById("gateSkipBtn");
  const video = overlay.querySelector("video");

  let scrollHandler = null;
  let resizeHandler = null;
  let introRemoved = false;
  let videoPlaying = false;
  let zoneStartY = 0;
  let zoneEndY = 0;
  let scrollRange = 680;

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /** Fixed document positions — does not drift while user scrolls */
  function measureScrollZone() {
    scrollRange = scrollZone.offsetHeight || 680;
    const triggerLine = window.innerHeight * 0.75;
    zoneStartY = scrollZone.offsetTop - triggerLine;
    zoneEndY = zoneStartY + scrollRange;
  }

  function scrollToMood() {
    if (!moodSection) return;
    const headerOffset = 92;
    const top =
      moodSection.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  function removeGateIntro(scrollToContent) {
    if (introRemoved) return;
    introRemoved = true;

    document.body.classList.add("gate-intro-skipped");
    document.documentElement.classList.remove("gate-scroll-locked");
    document.body.classList.remove("gate-video-active", "gate-scroll-locked");

    if (scrollHandler) {
      window.removeEventListener("scroll", scrollHandler);
      scrollHandler = null;
    }
    if (resizeHandler) {
      window.removeEventListener("resize", resizeHandler);
      resizeHandler = null;
    }

    skipBtn?.removeEventListener("click", skipVideo);

    if (scrollZone && scrollZone.parentNode) {
      scrollZone.parentNode.removeChild(scrollZone);
    }

    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }

    if (scrollToContent) {
      scrollToMood();
    }
  }

  function setVideoPlayback(shouldPlay) {
    if (!video) return;
    if (shouldPlay && !videoPlaying) {
      videoPlaying = true;
      video.play().catch(function () {});
    } else if (!shouldPlay && videoPlaying) {
      videoPlaying = false;
      video.pause();
    }
  }

  function applyProgress(p) {
    const progress = clamp(p, 0, 1);

    let open = 0;
    if (progress <= 0.08) {
      open = 0;
    } else if (progress <= 0.36) {
      open = easeOutCubic((progress - 0.08) / 0.28);
    } else if (progress <= 0.86) {
      open = 1;
    } else {
      open = 1 - (progress - 0.86) / 0.14;
    }

    const openPct = open * 105;
    if (panelL) panelL.style.transform = "translateX(-" + openPct + "%)";
    if (panelR) panelR.style.transform = "translateX(" + openPct + "%)";
    if (progressBar) progressBar.style.width = open * 100 + "%";

    let brandScale = 0.35;
    let brandOpacity = 0;
    let taglineOpacity = 0;

    if (progress >= 0.36 && progress < 0.52) {
      const t = easeOutCubic((progress - 0.36) / 0.16);
      brandScale = 0.35 + t * 0.65;
      brandOpacity = t;
    } else if (progress >= 0.52 && progress < 0.64) {
      brandScale = 1;
      brandOpacity = 1;
      taglineOpacity = easeOutCubic((progress - 0.52) / 0.08);
    } else if (progress >= 0.64 && progress < 0.74) {
      const t = (progress - 0.64) / 0.1;
      brandOpacity = 1 - t;
      brandScale = 1 + t * 0.12;
      taglineOpacity = 1 - t;
    }

    if (brandInner) {
      brandInner.style.opacity = String(brandOpacity);
      brandInner.style.transform = "scale(" + brandScale + ")";
    }
    if (tagline) tagline.style.opacity = String(taglineOpacity);

    let videoOpacity = 0;
    if (progress >= 0.64 && progress < 0.74) {
      videoOpacity = easeOutCubic((progress - 0.64) / 0.1);
    } else if (progress >= 0.74 && progress < 0.86) {
      videoOpacity = 1;
    } else if (progress >= 0.86) {
      videoOpacity = Math.max(0, 1 - (progress - 0.86) / 0.14);
    }

    if (video) {
      video.style.opacity = String(videoOpacity);
    }
    setVideoPlayback(videoOpacity > 0.25);

    if (hint) {
      const hintOpacity =
        progress < 0.32 ? 1 : Math.max(0, 1 - (progress - 0.32) / 0.1);
      hint.style.opacity = String(hintOpacity);
    }

    return progress;
  }

  function clampScrollToZone() {
    const y = window.scrollY;
    if (y > zoneEndY) {
      window.scrollTo(0, zoneEndY);
    }
  }

  function update() {
    if (introRemoved) return;

    measureScrollZone();

    const scrollY = window.scrollY;

    if (scrollY < zoneStartY) {
      overlay.classList.remove("is-visible");
      document.documentElement.classList.remove("gate-scroll-locked");
    document.body.classList.remove("gate-video-active", "gate-scroll-locked");
      applyProgress(0);
      return;
    }

    if (scrollY >= zoneEndY) {
      overlay.classList.remove("is-visible");
      document.documentElement.classList.remove("gate-scroll-locked");
    document.body.classList.remove("gate-video-active", "gate-scroll-locked");
      applyProgress(0);
      return;
    }

    clampScrollToZone();

    overlay.classList.add("is-visible");
    document.documentElement.classList.add("gate-scroll-locked");
    document.body.classList.add("gate-video-active", "gate-scroll-locked");

    const p = (scrollY - zoneStartY) / scrollRange;
    applyProgress(p);
  }

  function skipVideo() {
    removeGateIntro(true);
  }

  let ticking = false;
  scrollHandler = function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        update();
        ticking = false;
      });
    }
  };
  resizeHandler = scrollHandler;

  window.addEventListener("scroll", scrollHandler, { passive: true });
  window.addEventListener("resize", resizeHandler);
  skipBtn?.addEventListener("click", skipVideo);
  measureScrollZone();
  update();
})();
