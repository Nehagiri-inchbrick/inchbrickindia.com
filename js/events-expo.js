(function () {
  'use strict';

  var EXPO_DATE = new Date('2026-08-15T10:00:00+05:30');

  /* Carousel */
  var slider = document.getElementById('pastExposSlider');
  var btnPrev = document.getElementById('slidePrevBtn');
  var btnNext = document.getElementById('slideNextBtn');

  function getStep() {
    var card = slider && slider.querySelector('.ex-pcard');
    if (!card) return 332;
    var gap = parseFloat(window.getComputedStyle(slider).gap) || 16;
    return card.offsetWidth + gap;
  }

  if (slider && btnPrev && btnNext) {
    btnNext.addEventListener('click', function () {
      slider.scrollBy({ left: getStep(), behavior: 'smooth' });
    });
    btnPrev.addEventListener('click', function () {
      slider.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
  }

  /* Countdown */
  function updateCountdown() {
    var box = document.getElementById('exCountdown');
    if (!box) return;
    var diff = Math.max(0, EXPO_DATE - Date.now());
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var d = box.querySelector('[data-unit="days"]');
    var h = box.querySelector('[data-unit="hours"]');
    var m = box.querySelector('[data-unit="mins"]');
    if (d) d.textContent = days;
    if (h) h.textContent = hours;
    if (m) m.textContent = mins;
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);

  /* Modal */
  var modal = document.getElementById('expoRegisterModal');
  var closeBtn = document.getElementById('closeModalBtn');
  var evtSelect = document.getElementById('exEvent');

  function openModal(eventValue) {
    if (!modal) return;
    modal.style.display = 'flex';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { modal.classList.add('ex-open'); });
    });
    document.body.style.overflow = 'hidden';
    if (eventValue && evtSelect) evtSelect.value = eventValue;
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('ex-open');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!modal.classList.contains('ex-open')) modal.style.display = 'none';
    }, 320);
  }

  function bindRegister(el) {
    el.addEventListener('click', function () {
      openModal(el.getAttribute('data-event') || '');
    });
    if (el.getAttribute('tabindex') === '0') {
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(el.getAttribute('data-event') || '');
        }
      });
    }
  }

  document.querySelectorAll('.openRegisterModalBtn').forEach(bindRegister);

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('ex-open')) closeModal();
  });

  /* Form */
  var form = document.getElementById('expoRegisterForm');
  var noteEl = document.getElementById('exFormNote');

  function setNote(msg, ok) {
    if (!noteEl) return;
    noteEl.textContent = msg;
    noteEl.className = 'ex-form-msg' + (ok ? ' ok' : '');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('exName') || {}).value.trim();
      var phone = (document.getElementById('exPhone') || {}).value.trim();
      var email = (document.getElementById('exEmail') || {}).value.trim();
      var evt = (evtSelect || {}).value;

      if (!name || !phone || !email || !evt) {
        setNote('Please fill all required fields.', false);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setNote('Enter a valid email.', false);
        return;
      }

      setNote('Registered! Check your email for your e-pass.', true);
      form.reset();
      setTimeout(function () {
        closeModal();
        setTimeout(function () { setNote('', false); }, 400);
      }, 2200);
    });
  }
})();
