(function () {
  'use strict';

  var data = window.EVENTS_DATA || [];
  var root = document.getElementById('eventDetailRoot');
  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug') || '';

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function statusClass(status) {
    if (status === 'live') return 'evd-status--live';
    if (status === 'past') return 'evd-status--past';
    return 'evd-status--upcoming';
  }

  function relatedEvents(current) {
    return data
      .filter(function (e) { return e.slug !== current.slug && e.status !== 'past'; })
      .slice(0, 3);
  }

  function renderNotFound() {
    document.title = 'Event Not Found | Inchbrick Realty';
    root.innerHTML =
      '<div class="evd-not-found evd-wrap">' +
      '<h1>Event not found</h1>' +
      '<p>This expo may have been removed or the link is incorrect.</p>' +
      '<a href="events-expo.html"><i class="fas fa-arrow-left"></i> Back to Events</a>' +
      '</div>';
  }

  function renderSchedule(items) {
    if (!items || !items.length) {
      return '<p style="color:#64748b;font-size:.88rem;margin:0">Schedule will be announced soon.</p>';
    }
    return '<div class="evd-schedule">' +
      items.map(function (s) {
        return '<div class="evd-sched-item">' +
          '<span class="evd-sched-time">' + esc(s.time) + '</span>' +
          '<div><strong>' + esc(s.title) + '</strong><p>' + esc(s.desc) + '</p></div>' +
          '</div>';
      }).join('') +
      '</div>';
  }

  function renderDevelopers(devs) {
    if (!devs || !devs.length) return '';
    return '<section class="evd-section" id="evd-developers">' +
      '<h2><i class="fas fa-building"></i> Participating Developers</h2>' +
      '<div class="evd-dev-grid">' +
      devs.map(function (d) {
        return '<a href="developers.html" class="evd-dev-card">' +
          '<img src="' + esc(d.logo) + '" alt="' + esc(d.name) + '">' +
          '<span>' + esc(d.name) + '</span></a>';
      }).join('') +
      '</div></section>';
  }

  function renderGallery(images) {
    if (!images || !images.length) return '';
    return '<section class="evd-section" id="evd-gallery">' +
      '<h2><i class="fas fa-images"></i> Gallery</h2>' +
      '<div class="evd-gallery">' +
      images.map(function (src) {
        return '<img src="' + esc(src) + '" alt="Expo gallery">';
      }).join('') +
      '</div></section>';
  }

  function renderPassInvitation(evt) {
    var isPast = evt.status === 'past';
    var passId = 'IB-' + evt.slug.toUpperCase().replace(/-/g, '').slice(0, 8);

    if (isPast) {
      return '<section class="evd-section evd-pass-block" id="evd-pass">' +
        '<h2><i class="fas fa-ticket"></i> Event Pass &amp; Invitation</h2>' +
        '<p class="evd-pass-note">This event has concluded. Download the official invitation card for your records.</p>' +
        '<div class="evd-pass-grid evd-pass-grid--single">' +
        renderInvitePreview(evt, passId) +
        '</div>' +
        '<div class="evd-pass-actions">' +
        '<button type="button" class="evd-btn evd-btn--gold" id="evdDownloadInvite"><i class="fas fa-download"></i> Download Invitation</button>' +
        '</div></section>';
    }

    return '<section class="evd-section evd-pass-block" id="evd-pass">' +
      '<h2><i class="fas fa-ticket"></i> Download Pass &amp; Invitation</h2>' +
      '<p class="evd-pass-note">Generate your free e-pass and share the official event invitation with friends and family.</p>' +
      '<div class="evd-fi evd-fi--light"><label for="evdPassName">Name on pass</label>' +
      '<input type="text" id="evdPassName" placeholder="Enter your full name"></div>' +
      '<div class="evd-pass-grid">' +
      renderPassPreview(evt, passId) +
      renderInvitePreview(evt, passId) +
      '</div>' +
      '<div class="evd-pass-actions">' +
      '<button type="button" class="evd-btn evd-btn--red" id="evdDownloadPass"><i class="fas fa-download"></i> Download E-Pass</button>' +
      '<button type="button" class="evd-btn evd-btn--gold" id="evdDownloadInvite"><i class="fas fa-download"></i> Download Invitation</button>' +
      '<button type="button" class="evd-btn evd-btn--outline" id="evdShareInvite"><i class="fas fa-share-nodes"></i> Share Invitation</button>' +
      '</div>' +
      '<p class="evd-pass-hint" id="evdPassHint"></p>' +
      '</section>';
  }

  function renderPassPreview(evt, passId) {
    return '<div class="evd-pass-card" id="evdPassPreview">' +
      '<div class="evd-pass-card-top">' +
      '<span class="evd-pass-brand">INCHBRICK EXPO</span>' +
      '<span class="evd-pass-type">E-PASS</span></div>' +
      '<div class="evd-pass-card-body">' +
      '<strong class="evd-pass-event">' + esc(evt.name) + '</strong>' +
      '<span class="evd-pass-guest" id="evdPassGuestName">Guest Name</span>' +
      '<div class="evd-pass-meta">' +
      '<span><i class="far fa-calendar"></i> ' + esc(evt.dateLabel) + '</span>' +
      '<span><i class="far fa-clock"></i> ' + esc(evt.time) + '</span>' +
      '<span><i class="fas fa-location-dot"></i> ' + esc(evt.venue) + '</span>' +
      '</div></div>' +
      '<div class="evd-pass-card-foot">' +
      '<div class="evd-pass-qr" aria-hidden="true"><i class="fas fa-qrcode"></i></div>' +
      '<div class="evd-pass-id"><small>Pass ID</small><strong>' + esc(passId) + '</strong></div>' +
      '</div></div>';
  }

  function renderInvitePreview(evt, passId) {
    return '<div class="evd-invite-card" id="evdInvitePreview">' +
      '<div class="evd-invite-img"><img src="' + esc(evt.img) + '" alt=""></div>' +
      '<div class="evd-invite-overlay"></div>' +
      '<div class="evd-invite-body">' +
      '<span class="evd-invite-kicker">You\'re Invited</span>' +
      '<h3>' + esc(evt.name) + '</h3>' +
      '<p class="evd-invite-date">' + esc(evt.dateLabel) + ' · ' + esc(evt.time) + '</p>' +
      '<p class="evd-invite-venue"><i class="fas fa-location-dot"></i> ' + esc(evt.venue) + ', ' + esc(evt.city) + '</p>' +
      '<p class="evd-invite-tagline">Premium projects · Top developers · Free entry</p>' +
      '<span class="evd-invite-ref">Ref: ' + esc(passId) + '</span>' +
      '</div></div>';
  }

  function getPassName() {
    var regName = (document.getElementById('evdName') || {}).value;
    var passName = (document.getElementById('evdPassName') || {}).value;
    var name = (passName || regName || '').trim();
    return name || 'Guest';
  }

  function updatePassPreviewName() {
    var el = document.getElementById('evdPassGuestName');
    if (el) el.textContent = getPassName();
  }

  function drawPassCanvas(evt, passId, name) {
    var canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 420;
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0f2339';
    ctx.fillRect(0, 0, 720, 420);
    ctx.strokeStyle = '#c29a63';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, 696, 396);

    ctx.fillStyle = '#c29a63';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('INCHBRICK EXPO', 36, 52);
    ctx.fillStyle = '#c9242b';
    ctx.fillRect(580, 32, 100, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('E-PASS', 598, 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px serif';
    wrapText(ctx, evt.name, 36, 100, 640, 32);

    ctx.fillStyle = '#f2d6a2';
    ctx.font = '600 18px sans-serif';
    ctx.fillText(name, 36, 175);

    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.font = '14px sans-serif';
    ctx.fillText(evt.dateLabel + '  ·  ' + evt.time, 36, 215);
    wrapText(ctx, evt.venue + ', ' + evt.city, 36, 245, 480, 22);

    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(36, 300, 80, 80);
    ctx.fillStyle = '#c29a63';
    ctx.font = '10px sans-serif';
    ctx.fillText('SCAN', 58, 348);

    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '12px sans-serif';
    ctx.fillText('Pass ID: ' + passId, 140, 335);
    ctx.fillText('Show at entrance · Free entry', 140, 358);

    return canvas;
  }

  function drawInviteCanvas(evt, passId) {
    var canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 480;
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0f2339';
    ctx.fillRect(0, 0, 720, 480);

    ctx.fillStyle = 'rgba(201,36,43,0.25)';
    ctx.fillRect(0, 0, 720, 480);

    ctx.fillStyle = '#c29a63';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('YOU\'RE INVITED', 36, 48);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px serif';
    wrapText(ctx, evt.name, 36, 95, 640, 38);

    ctx.fillStyle = '#f2d6a2';
    ctx.font = '600 16px sans-serif';
    ctx.fillText(evt.dateLabel + '  ·  ' + evt.time, 36, 175);

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '15px sans-serif';
    wrapText(ctx, evt.venue + ', ' + evt.city + ', ' + evt.country, 36, 210, 640, 24);

    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = '14px sans-serif';
    ctx.fillText('Premium projects · Top developers · Free entry', 36, 280);

    ctx.strokeStyle = '#c29a63';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 320, 648, 120);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('INCHBRICK REALTY', 56, 365);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '13px sans-serif';
    ctx.fillText('Register free at inchbrickrealty.com', 56, 395);
    ctx.fillText('Ref: ' + passId, 56, 420);

    return canvas;
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    var yy = y;
    for (var i = 0; i < words.length; i++) {
      var test = line + words[i] + ' ';
      if (ctx.measureText(test).width > maxWidth && i > 0) {
        ctx.fillText(line.trim(), x, yy);
        line = words[i] + ' ';
        yy += lineHeight;
      } else {
        line = test;
      }
    }
    ctx.fillText(line.trim(), x, yy);
  }

  function downloadCanvas(canvas, filename) {
    canvas.toBlob(function (blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  function bindPassInvitation(evt) {
    var passId = 'IB-' + evt.slug.toUpperCase().replace(/-/g, '').slice(0, 8);
    var passNameInput = document.getElementById('evdPassName');
    var hint = document.getElementById('evdPassHint');

    updatePassPreviewName();
    if (passNameInput) {
      passNameInput.addEventListener('input', updatePassPreviewName);
    }

    var regName = document.getElementById('evdName');
    if (regName) {
      regName.addEventListener('input', updatePassPreviewName);
    }

    var btnPass = document.getElementById('evdDownloadPass');
    if (btnPass) {
      btnPass.addEventListener('click', function () {
        var name = getPassName();
        if (name === 'Guest' && hint) {
          hint.textContent = 'Tip: Enter your name above for a personalised pass.';
        } else if (hint) {
          hint.textContent = '';
        }
        downloadCanvas(drawPassCanvas(evt, passId, name), evt.slug + '-epass.png');
      });
    }

    var btnInvite = document.getElementById('evdDownloadInvite');
    if (btnInvite) {
      btnInvite.addEventListener('click', function () {
        downloadCanvas(drawInviteCanvas(evt, passId), evt.slug + '-invitation.png');
        if (hint) hint.textContent = '';
      });
    }

    var btnShare = document.getElementById('evdShareInvite');
    if (btnShare) {
      btnShare.addEventListener('click', function () {
        var shareText = 'You\'re invited to ' + evt.name + ' — ' + evt.dateLabel + ' at ' + evt.venue + ', ' + evt.city + '. Register free!';
        var shareUrl = window.location.href;
        if (navigator.share) {
          navigator.share({ title: evt.name, text: shareText, url: shareUrl }).catch(function () {});
        } else {
          var wa = 'https://wa.me/?text=' + encodeURIComponent(shareText + ' ' + shareUrl);
          window.open(wa, '_blank');
        }
      });
    }
  }

  function renderSidebar(evt) {
    var isPast = evt.status === 'past';
    var related = relatedEvents(evt);

    var sidebar =
      '<aside class="evd-sidebar">' +
      '<div class="evd-register">';

    if (isPast) {
      sidebar +=
        '<h3>Event Concluded</h3>' +
        '<div class="evd-past-note">This edition has ended. Browse upcoming expos or register for the next one in this city. <a href="events-expo.html">View all events</a></div>';
    } else {
      sidebar +=
        '<h3>Free Registration</h3>' +
        '<p>Reserve your e-pass for priority entry and builder meetings.</p>' +
        '<form id="evdRegisterForm" novalidate>' +
        '<div class="evd-fi"><label for="evdName">Name *</label><input type="text" id="evdName" required placeholder="Full name"></div>' +
        '<div class="evd-fi"><label for="evdPhone">Phone *</label><input type="tel" id="evdPhone" required placeholder="+91 99999 99999"></div>' +
        '<div class="evd-fi"><label for="evdEmail">Email *</label><input type="email" id="evdEmail" required placeholder="you@email.com"></div>' +
        '<input type="hidden" id="evdEventSlug" value="' + esc(evt.slug) + '">' +
        '<button type="submit" class="evd-form-submit"><i class="fas fa-ticket"></i> Confirm Registration</button>' +
        '<p class="evd-form-msg" id="evdFormNote"></p>' +
        '</form>';
    }

    sidebar += '</div>';

    if (related.length) {
      sidebar +=
        '<div class="evd-related">' +
        '<h3>Other Events</h3>' +
        '<div class="evd-related-list">' +
        related.map(function (r) {
          return '<a href="event-detail.html?slug=' + esc(r.slug) + '" class="evd-related-item">' +
            '<img src="' + esc(r.img) + '" alt="">' +
            '<div><strong>' + esc(r.city) + '</strong><span>' + esc(r.dateLabel) + '</span></div></a>';
        }).join('') +
        '</div></div>';
    }

    sidebar += '</aside>';
    return sidebar;
  }

  function bindForm(evt) {
    var form = document.getElementById('evdRegisterForm');
    var noteEl = document.getElementById('evdFormNote');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('evdName') || {}).value.trim();
      var phone = (document.getElementById('evdPhone') || {}).value.trim();
      var email = (document.getElementById('evdEmail') || {}).value.trim();

      if (!name || !phone || !email) {
        noteEl.textContent = 'Please fill all required fields.';
        noteEl.className = 'evd-form-msg';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        noteEl.textContent = 'Enter a valid email.';
        noteEl.className = 'evd-form-msg';
        return;
      }

      noteEl.textContent = 'Registered for ' + evt.city + '! Download your e-pass below.';
      noteEl.className = 'evd-form-msg ok';
      var passName = document.getElementById('evdPassName');
      if (passName) passName.value = name;
      updatePassPreviewName();
      var passSection = document.getElementById('evd-pass');
      if (passSection) passSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function render(evt) {
    document.title = evt.name + ' | Inchbrick Realty Events';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = evt.excerpt.slice(0, 155);

    var liveDot = evt.status === 'live' ? '<span class="evd-dot-live"></span>' : '';

    root.innerHTML =
      '<article class="evd-page-inner">' +
      '<header class="evd-hero">' +
      '<div class="evd-hero-img"><img src="' + esc(evt.img) + '" alt="' + esc(evt.name) + '"></div>' +
      '<div class="evd-hero-shade"></div>' +
      '<div class="evd-wrap evd-hero-body">' +
      '<a href="events-expo.html" class="evd-back"><i class="fas fa-arrow-left"></i> All Events</a>' +
      '<span class="evd-status ' + statusClass(evt.status) + '">' + liveDot + esc(evt.statusLabel) + '</span>' +
      '<h1>' + esc(evt.name) + '</h1>' +
      '<div class="evd-hero-meta">' +
      '<span><i class="far fa-calendar"></i> ' + esc(evt.dateLabel) + '</span>' +
      '<span><i class="far fa-clock"></i> ' + esc(evt.time) + '</span>' +
      '<span><i class="fas fa-location-dot"></i> ' + esc(evt.city) + ', ' + esc(evt.country) + '</span>' +
      '</div></div></header>' +

      '<div class="evd-stats"><div class="evd-wrap evd-stats-inner">' +
      '<div class="evd-stat"><strong>' + esc(evt.stats.projects) + '</strong><span>Projects</span></div>' +
      '<div class="evd-stat"><strong>' + esc(evt.stats.developers) + '</strong><span>Developers</span></div>' +
      '<div class="evd-stat"><strong>' + esc(evt.stats.visitors) + '</strong><span>Expected Visitors</span></div>' +
      '<div class="evd-stat"><strong>' + esc(evt.stats.booths) + '</strong><span>Booths</span></div>' +
      '</div></div>' +

      '<div class="evd-wrap evd-layout">' +
      '<div class="evd-main">' +

      '<section class="evd-section" id="evd-about">' +
      '<h2><i class="fas fa-circle-info"></i> About This Expo</h2>' +
      '<p class="evd-lead">' + esc(evt.excerpt) + '</p>' +
      evt.description.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      '</section>' +

      '<section class="evd-section" id="evd-highlights">' +
      '<h2><i class="fas fa-star"></i> Highlights</h2>' +
      '<ul class="evd-highlights">' +
      evt.highlights.map(function (h) {
        return '<li><i class="fas fa-check"></i> ' + esc(h) + '</li>';
      }).join('') +
      '</ul></section>' +

      renderDevelopers(evt.developers) +

      '<section class="evd-section" id="evd-schedule">' +
      '<h2><i class="fas fa-calendar-days"></i> Schedule</h2>' +
      renderSchedule(evt.schedule) +
      '</section>' +

      renderGallery(evt.gallery) +

      renderPassInvitation(evt) +

      '<section class="evd-section evd-venue" id="evd-venue">' +
      '<h2><i class="fas fa-map-pin"></i> Venue</h2>' +
      '<p><i class="fas fa-building"></i> <strong>' + esc(evt.venue) + '</strong></p>' +
      '<p><i class="fas fa-location-dot"></i> ' + esc(evt.address) + '</p>' +
      '</section>' +

      '</div>' +
      renderSidebar(evt) +
      '</div></article>';

    bindForm(evt);
    bindPassInvitation(evt);
  }

  var found = data.find(function (e) { return e.slug === slug; });
  if (!found) {
    renderNotFound();
  } else {
    render(found);
  }
})();
