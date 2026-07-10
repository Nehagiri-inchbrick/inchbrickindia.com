(function () {
  var loanAmount = document.getElementById("loanAmount");
  var loanAmountRange = document.getElementById("loanAmountRange");
  var interestRate = document.getElementById("interestRate");
  var interestRateRange = document.getElementById("interestRateRange");
  var loanTenure = document.getElementById("loanTenure");
  var loanTenureRange = document.getElementById("loanTenureRange");

  var loanAmountVal = document.getElementById("loanAmountVal");
  var interestRateVal = document.getElementById("interestRateVal");
  var loanTenureVal = document.getElementById("loanTenureVal");

  var monthlyEmi = document.getElementById("monthlyEmi");
  var totalInterest = document.getElementById("totalInterest");
  var totalPayment = document.getElementById("totalPayment");
  var principalAmount = document.getElementById("principalAmount");
  var tenureMonths = document.getElementById("tenureMonths");
  var principalBar = document.getElementById("principalBar");
  var interestBar = document.getElementById("interestBar");
  var downloadReportBtn = document.getElementById("downloadReportBtn");

  var fmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

  function formatCurrency(value) {
    return "₹ " + fmt.format(Math.round(value));
  }

  function syncPair(input, range) {
    range.value = input.value;
    input.value = range.value;
  }

  function getValues() {
    return {
      principal: Number(loanAmount.value) || 0,
      rate: Number(interestRate.value) || 0,
      years: Number(loanTenure.value) || 0
    };
  }

  function calculate() {
    var v = getValues();
    var months = v.years * 12;
    var monthlyRate = v.rate / 1200;

    loanAmountVal.textContent = formatCurrency(v.principal);
    interestRateVal.textContent = v.rate.toFixed(1) + "%";
    loanTenureVal.textContent = v.years + (v.years === 1 ? " Year" : " Years");
    tenureMonths.textContent = months + " months";
    principalAmount.textContent = formatCurrency(v.principal);

    if (!v.principal || !v.rate || !months) {
      monthlyEmi.textContent = "₹ 0";
      totalInterest.textContent = "₹ 0";
      totalPayment.textContent = "₹ 0";
      return null;
    }

    var emi = (v.principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    var total = emi * months;
    var interest = total - v.principal;

    monthlyEmi.textContent = formatCurrency(emi);
    totalInterest.textContent = formatCurrency(interest);
    totalPayment.textContent = formatCurrency(total);

    var principalPct = (v.principal / total) * 100;
    var interestPct = (interest / total) * 100;
    principalBar.style.width = principalPct.toFixed(1) + "%";
    interestBar.style.width = interestPct.toFixed(1) + "%";

    return {
      principal: v.principal,
      rate: v.rate,
      years: v.years,
      months: months,
      emi: emi,
      total: total,
      interest: interest
    };
  }

  function bindInput(input, range) {
    input.addEventListener("input", function () {
      range.value = input.value;
      calculate();
    });
    range.addEventListener("input", function () {
      input.value = range.value;
      calculate();
    });
  }

  bindInput(loanAmount, loanAmountRange);
  bindInput(interestRate, interestRateRange);
  bindInput(loanTenure, loanTenureRange);

  document.querySelectorAll(".emi-quick").forEach(function (btn) {
    btn.addEventListener("click", function () {
      loanAmount.value = btn.dataset.amount;
      loanAmountRange.value = btn.dataset.amount;
      calculate();
    });
  });

  downloadReportBtn.addEventListener("click", function () {
    var data = calculate();
    if (!data) return;

    var date = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    var report = [
      "INCHBRICK REALTY — HOME LOAN EMI REPORT",
      "Generated on: " + date,
      "Website: inchbrickrealty.com",
      "",
      "LOAN DETAILS",
      "────────────────────────────────────",
      "Loan Amount      : " + formatCurrency(data.principal),
      "Interest Rate    : " + data.rate.toFixed(2) + "% per annum",
      "Loan Tenure      : " + data.years + " years (" + data.months + " months)",
      "",
      "EMI SUMMARY",
      "────────────────────────────────────",
      "Monthly EMI      : " + formatCurrency(data.emi),
      "Total Interest   : " + formatCurrency(data.interest),
      "Total Payment    : " + formatCurrency(data.total),
      "Principal Amount : " + formatCurrency(data.principal),
      "",
      "DISCLAIMER",
      "This is an indicative calculation for planning purposes only.",
      "Actual EMI may vary based on bank policies, processing fees,",
      "insurance, and other charges. Contact Inchbrick Realty advisors",
      "for personalized home loan assistance.",
      "",
      "Contact: support@inchbrickrealty.com | +91 98765 43210"
    ].join("\n");

    var blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "inchbrick-emi-report-" + Date.now() + ".txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });

  calculate();
})();
