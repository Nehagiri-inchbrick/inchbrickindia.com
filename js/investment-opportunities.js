(function () {
  'use strict';

  function formatINR(n) {
    return '₹ ' + Math.round(n).toLocaleString('en-IN');
  }

  function formatPct(n) {
    return n.toFixed(1) + '%';
  }

  /* ROI Calculator */
  function calcRoi() {
    var purchase = parseFloat(document.getElementById('invPurchase').value) || 0;
    var downPct = parseFloat(document.getElementById('invDownRange').value) || 20;
    var appRate = parseFloat(document.getElementById('invAppRange').value) || 8;
    var monthlyRent = parseFloat(document.getElementById('invRental').value) || 0;
    var years = parseInt(document.getElementById('invYearsRange').value, 10) || 7;

    document.getElementById('invDownVal').textContent = downPct + '%';
    document.getElementById('invAppVal').textContent = appRate + '%';
    document.getElementById('invYearsVal').textContent = years + ' year' + (years > 1 ? 's' : '');

    var invested = purchase * (downPct / 100);
    var futureVal = purchase * Math.pow(1 + appRate / 100, years);
    var capGain = futureVal - purchase;
    var rentTotal = monthlyRent * 12 * years;
    var totalReturn = capGain + rentTotal;
    var roiPct = invested > 0 ? (totalReturn / invested) * 100 : 0;
    var annualRoi = invested > 0 ? (Math.pow(1 + totalReturn / invested, 1 / years) - 1) * 100 : 0;

    document.getElementById('invTotalRoi').textContent = formatPct(roiPct);
    document.getElementById('invFutureVal').textContent = formatINR(futureVal);
    document.getElementById('invRentTotal').textContent = formatINR(rentTotal);
    document.getElementById('invCapGain').textContent = formatINR(capGain);
    document.getElementById('invAnnualRoi').textContent = formatPct(annualRoi);
  }

  /* Rental Yield Calculator */
  function calcRental() {
    var price = parseFloat(document.getElementById('rentPrice').value) || 0;
    var monthly = parseFloat(document.getElementById('rentMonthly').value) || 0;
    var costs = parseFloat(document.getElementById('rentCosts').value) || 0;

    var annualRent = monthly * 12;
    var netAnnual = annualRent - costs;
    var grossYield = price > 0 ? (annualRent / price) * 100 : 0;
    var netYield = price > 0 ? (netAnnual / price) * 100 : 0;

    document.getElementById('rentGross').textContent = formatPct(grossYield);
    document.getElementById('rentNet').textContent = formatPct(netYield);
    document.getElementById('rentAnnual').textContent = formatINR(annualRent);
    document.getElementById('rentNetAnnual').textContent = formatINR(netAnnual);
  }

  function bindRange(id, fn) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', fn);
  }

  function bindInput(id, fn) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', fn);
  }

  bindInput('invPurchase', calcRoi);
  bindRange('invDownRange', calcRoi);
  bindRange('invAppRange', calcRoi);
  bindInput('invRental', calcRoi);
  bindRange('invYearsRange', calcRoi);

  bindInput('rentPrice', calcRental);
  bindInput('rentMonthly', calcRental);
  bindInput('rentCosts', calcRental);

  calcRoi();
  calcRental();
})();
