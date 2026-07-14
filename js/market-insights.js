(function () {
  'use strict';

  var trendsData = {
    mumbai: {
      label: 'Mumbai',
      residential: [18500, 19200, 20100, 20800, 21500, 22100, 22800],
      commercial: [14200, 14800, 15100, 15600, 15900, 16200, 16500],
      avgPrice: '₹ 22,800',
      yoy: '+6.2%',
      yoyClass: 'up',
      volume: '+4.1% QoQ',
      volumeClass: 'up'
    },
    bangalore: {
      label: 'Bangalore',
      residential: [8200, 8600, 9100, 9500, 9800, 10200, 10600],
      commercial: [6800, 7100, 7400, 7700, 7900, 8100, 8300],
      avgPrice: '₹ 10,600',
      yoy: '+7.8%',
      yoyClass: 'up',
      volume: '+8.3% QoQ',
      volumeClass: 'up'
    },
    delhi: {
      label: 'Delhi NCR',
      residential: [7200, 7500, 7800, 8100, 8400, 8700, 9000],
      commercial: [5500, 5700, 5900, 6100, 6300, 6500, 6700],
      avgPrice: '₹ 9,000',
      yoy: '+5.4%',
      yoyClass: 'up',
      volume: '+3.2% QoQ',
      volumeClass: 'up'
    },
    pune: {
      label: 'Pune',
      residential: [6800, 7100, 7400, 7700, 7900, 8100, 8300],
      commercial: [5200, 5400, 5600, 5800, 5900, 6000, 6100],
      avgPrice: '₹ 8,300',
      yoy: '+4.9%',
      yoyClass: 'up',
      volume: '+2.8% QoQ',
      volumeClass: 'up'
    },
    hyderabad: {
      label: 'Hyderabad',
      residential: [6400, 6700, 7000, 7300, 7600, 7900, 8200],
      commercial: [4800, 5000, 5200, 5400, 5600, 5800, 6000],
      avgPrice: '₹ 8,200',
      yoy: '+8.1%',
      yoyClass: 'up',
      volume: '+6.5% QoQ',
      volumeClass: 'up'
    }
  };

  var years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
  var canvas = document.getElementById('miTrendsChart');
  var tabs = document.querySelectorAll('.mi-trends-tab');
  var statPrice = document.getElementById('miStatPrice');
  var statYoy = document.getElementById('miStatYoy');
  var statVolume = document.getElementById('miStatVolume');

  function drawChart(cityKey) {
    if (!canvas) return;
    var data = trendsData[cityKey] || trendsData.mumbai;
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    var w = rect.width;
    var h = rect.height;
    var pad = { top: 16, right: 16, bottom: 32, left: 48 };
    var chartW = w - pad.left - pad.right;
    var chartH = h - pad.top - pad.bottom;

    var allVals = data.residential.concat(data.commercial);
    var min = Math.min.apply(null, allVals) * 0.95;
    var max = Math.max.apply(null, allVals) * 1.05;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (var g = 0; g <= 4; g++) {
      var gy = pad.top + (chartH / 4) * g;
      ctx.beginPath();
      ctx.moveTo(pad.left, gy);
      ctx.lineTo(w - pad.right, gy);
      ctx.stroke();
    }

    ctx.fillStyle = '#64748b';
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'right';
    for (var t = 0; t <= 4; t++) {
      var val = max - ((max - min) / 4) * t;
      var ty = pad.top + (chartH / 4) * t + 3;
      ctx.fillText('₹' + Math.round(val).toLocaleString('en-IN'), pad.left - 6, ty);
    }

    var stepX = chartW / (years.length - 1);

    function plotLine(values, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      values.forEach(function (v, i) {
        var x = pad.left + stepX * i;
        var y = pad.top + chartH - ((v - min) / (max - min)) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      values.forEach(function (v, i) {
        var x = pad.left + stepX * i;
        var y = pad.top + chartH - ((v - min) / (max - min)) * chartH;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    plotLine(data.residential, '#c29a63');
    plotLine(data.commercial, '#0f2339');

    ctx.textAlign = 'center';
    years.forEach(function (yr, i) {
      ctx.fillText(yr, pad.left + stepX * i, h - 10);
    });

    if (statPrice) statPrice.textContent = data.avgPrice + ' / sq.ft';
    if (statYoy) {
      statYoy.textContent = data.yoy + ' YoY';
      statYoy.className = data.yoyClass;
    }
    if (statVolume) {
      statVolume.textContent = data.volume;
      statVolume.className = data.volumeClass;
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      drawChart(tab.getAttribute('data-city'));
    });
  });

  drawChart('mumbai');

  window.addEventListener('resize', function () {
    var active = document.querySelector('.mi-trends-tab.is-active');
    drawChart(active ? active.getAttribute('data-city') : 'mumbai');
  });

  /* Sticky jump nav highlight */
  var jumpLinks = document.querySelectorAll('.mi-jump-inner a');
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
})();
