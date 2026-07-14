(function () {
  'use strict';

  var styles = {
    modern: {
      title: 'Modern Minimalist',
      tag: 'Clean Lines',
      desc: 'Open floor plans, floor-to-ceiling glass, flat roofs, and a neutral palette with bold accent materials like steel and concrete.',
      features: ['Flat roof', 'Glass facades', 'Open plan', 'Smart home ready'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    },
    contemporary: {
      title: 'Contemporary',
      tag: 'Bold & Current',
      desc: 'Asymmetrical forms, mixed materials, and dynamic volumes that blend indoor-outdoor living with cutting-edge aesthetics.',
      features: ['Mixed materials', 'Cantilever design', 'Large windows', 'Landscape integration'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    traditional: {
      title: 'Traditional Indian',
      tag: 'Timeless Heritage',
      desc: 'Courtyards, jaali work, sloped terracotta roofs, and warm stone finishes inspired by regional Indian architecture.',
      features: ['Central courtyard', 'Jaali screens', 'Terracotta roof', 'Verandah spaces'],
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cd4e?auto=format&fit=crop&w=1200&q=80'
    },
    mediterranean: {
      title: 'Mediterranean Villa',
      tag: 'Resort Living',
      desc: 'Stucco walls, arched doorways, terracotta tiles, and lush courtyard gardens for a relaxed, vacation-home feel.',
      features: ['Arched entry', 'Courtyard pool', 'Stucco finish', 'Wrought iron details'],
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    },
    farmhouse: {
      title: 'Modern Farmhouse',
      tag: 'Rustic Charm',
      desc: 'Board-and-batten siding, gabled roofs, wraparound porches, and warm wood interiors with industrial accents.',
      features: ['Gabled roof', 'Wrap porch', 'Shiplap walls', 'Barn doors'],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
    },
    luxury: {
      title: 'Luxury Estate',
      tag: 'Grand Living',
      desc: 'Double-height foyers, premium stone cladding, home theatre, wine cellar, and landscaped gardens for discerning buyers.',
      features: ['Double height', 'Home theatre', 'Wine cellar', 'Landscaped gardens'],
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    },
    eco: {
      title: 'Eco Green Home',
      tag: 'Sustainable',
      desc: 'Solar-ready roofs, rainwater harvesting, natural ventilation, and locally sourced materials for eco-conscious living.',
      features: ['Solar panels', 'Rainwater harvest', 'Natural light', 'Green roof'],
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad4cdcf3?auto=format&fit=crop&w=1200&q=80'
    },
    colonial: {
      title: 'Colonial Classic',
      tag: 'Elegant Heritage',
      desc: 'Symmetrical facades, columned porticos, high ceilings, and timeless proportions inspired by colonial architecture.',
      features: ['Columned portico', 'High ceilings', 'Symmetrical facade', 'Grand staircase'],
      image: 'https://images.unsplash.com/photo-1605276374101-dea6bf5a0a2a?auto=format&fit=crop&w=1200&q=80'
    }
  };

  var previewPanel = document.getElementById('dyhStylePreview');
  var previewImg = document.getElementById('dyhPreviewImg');
  var previewTag = document.getElementById('dyhPreviewTag');
  var previewTitle = document.getElementById('dyhPreviewTitle');
  var previewDesc = document.getElementById('dyhPreviewDesc');
  var previewFeatures = document.getElementById('dyhPreviewFeatures');
  var styleCards = document.querySelectorAll('.dyh-style-card');
  var styleFilters = document.querySelectorAll('.dyh-style-filter');
  var stylePills = document.querySelectorAll('.dyh-style-pill');

  function setStyle(key) {
    var data = styles[key];
    if (!data) return;

    styleCards.forEach(function (card) {
      var match = card.dataset.style === key;
      card.classList.toggle('is-active', match);
      card.setAttribute('aria-pressed', match ? 'true' : 'false');
    });

    stylePills.forEach(function (pill) {
      pill.classList.toggle('is-selected', pill.dataset.style === key);
    });

    if (previewPanel) previewPanel.classList.add('is-open');
    if (previewImg) previewImg.src = data.image;
    if (previewImg) previewImg.alt = data.title;
    if (previewTag) previewTag.textContent = data.tag;
    if (previewTitle) previewTitle.textContent = data.title;
    if (previewDesc) previewDesc.textContent = data.desc;
    if (previewFeatures) {
      previewFeatures.innerHTML = data.features.map(function (f) {
        return '<span>' + f + '</span>';
      }).join('');
    }
  }

  styleCards.forEach(function (card) {
    card.addEventListener('click', function () {
      setStyle(card.dataset.style);
    });
  });

  stylePills.forEach(function (pill) {
    pill.addEventListener('click', function (e) {
      e.preventDefault();
      setStyle(pill.dataset.style);
      var stylesSection = document.getElementById('dyh-styles');
      if (stylesSection) stylesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  styleFilters.forEach(function (filter) {
    filter.addEventListener('click', function () {
      var cat = filter.dataset.filter;
      styleFilters.forEach(function (f) { f.classList.toggle('is-active', f === filter); });
      styleCards.forEach(function (card) {
        var show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
        card.style.opacity = show ? '1' : '0';
        card.style.transform = show ? '' : 'scale(0.95)';
      });
    });
  });

  setStyle('modern');

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.dyh-reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Sticky jump nav */
  var jumpLinks = document.querySelectorAll('.dyh-jump-inner a');
  var sections = [];
  jumpLinks.forEach(function (link) {
    var id = link.getAttribute('href');
    if (id && id.charAt(0) === '#') {
      var el = document.querySelector(id);
      if (el) sections.push({ link: link, el: el });
    }
  });

  function updateJumpNav() {
    var scrollY = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.el.offsetTop <= scrollY) current = s;
    });
    jumpLinks.forEach(function (l) { l.classList.remove('is-active'); });
    if (current) current.link.classList.add('is-active');
  }

  window.addEventListener('scroll', updateJumpNav, { passive: true });
  updateJumpNav();

  /* Hero counter */
  document.querySelectorAll('[data-count]').forEach(function (counter) {
    var target = parseInt(counter.dataset.count, 10);
    var suffix = counter.dataset.suffix || '';
    var started = false;

    function animate(ts, start) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / 1600, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(function (t) { animate(t, start); });
    }

    if ('IntersectionObserver' in window) {
      var cObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !started) {
          started = true;
          requestAnimationFrame(animate);
          cObs.disconnect();
        }
      }, { threshold: 0.5 });
      cObs.observe(counter);
    }
  });

  /* Consultation form */
  var form = document.getElementById('dyhConsultForm');
  var success = document.getElementById('dyhFormSuccess');

  form?.addEventListener('submit', function (e) {
    e.preventDefault();
    if (success) {
      success.classList.add('is-show');
      form.reset();
      stylePills.forEach(function (p) { p.classList.remove('is-selected'); });
      document.querySelector('.dyh-style-pill[data-style="modern"]')?.classList.add('is-selected');
      setTimeout(function () { success.classList.remove('is-show'); }, 5000);
    }
  });

  /* Plan view buttons scroll to consult */
  document.querySelectorAll('.dyh-plan-view').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.getElementById('dyh-consult')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
