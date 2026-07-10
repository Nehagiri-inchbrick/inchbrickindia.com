(function () {
  var FAQS = [
    {
      q: "Can NRIs buy any type of property in India?",
      a: "NRIs and OCIs can purchase residential and commercial properties freely. Agricultural land, farmhouses, and plantation property cannot be acquired without RBI special permission."
    },
    {
      q: "Do I need to visit India to complete the purchase?",
      a: "Not necessarily. Many NRIs complete bookings and registration via a notarised and apostilled Power of Attorney. Inchbrick coordinates virtual tours, legal checks, and POA execution."
    },
    {
      q: "Which bank account should I use for payment?",
      a: "Payments must be made from your NRE or NRO account in India. Funds remitted from abroad should be credited to these accounts first, in compliance with FEMA regulations."
    },
    {
      q: "Can I get a home loan as an NRI?",
      a: "Yes. Major Indian banks offer NRI home loans based on overseas income. EMI can be serviced from NRE/NRO accounts. Loan eligibility varies by country of employment and income proof."
    },
    {
      q: "How is TDS handled when I sell property?",
      a: "The buyer deducts TDS under Section 195 (typically 20% plus surcharge) before paying the NRI seller. You can claim credit or refund by filing an Indian income tax return."
    },
    {
      q: "Can I repatriate sale proceeds abroad?",
      a: "Yes, up to the amount originally remitted from abroad for that property. Additional repatriation may be possible under the USD 1 million scheme per financial year, subject to RBI norms."
    },
    {
      q: "Is PAN mandatory for NRI property buyers?",
      a: "Yes. PAN is required for property registration, TDS compliance, and income tax filing on rental income or capital gains in India."
    },
    {
      q: "What documents are needed for Power of Attorney?",
      a: "POA must be executed on stamp paper, notarised in your country of residence, and apostilled (or consularised). The attorney in India should be a trusted family member or legal representative."
    }
  ];

  var faqList = document.getElementById("nriFaqList");
  if (!faqList) return;

  faqList.innerHTML = FAQS.map(function (item, i) {
    return (
      '<article class="nri-faq-item' + (i === 0 ? " is-open" : "") + '">' +
      '<button type="button" class="nri-faq-q" aria-expanded="' + (i === 0 ? "true" : "false") + '">' +
      item.q + '<i class="fas fa-chevron-down"></i></button>' +
      '<div class="nri-faq-a">' + item.a + "</div></article>"
    );
  }).join("");

  faqList.querySelectorAll(".nri-faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".nri-faq-item");
      var isOpen = item.classList.contains("is-open");

      faqList.querySelectorAll(".nri-faq-item").forEach(function (el) {
        el.classList.remove("is-open");
        el.querySelector(".nri-faq-q").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
