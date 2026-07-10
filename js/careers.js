(function () {
  var form = document.getElementById("careersForm");
  var note = document.getElementById("crFormNote");
  var roleSelect = document.getElementById("crRole");

  function scrollToApply() {
    var target = document.getElementById("cr-apply");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setRole(role) {
    if (!roleSelect || !role) return;
    roleSelect.value = role;
  }

  document.querySelectorAll(".cr-job-apply").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setRole(btn.dataset.role);
      scrollToApply();
      if (roleSelect) roleSelect.focus();
    });
  });

  var params = new URLSearchParams(window.location.search);
  var roleParam = params.get("role");
  if (roleParam) {
    setRole(roleParam);
    if (location.hash === "#cr-apply") scrollToApply();
  }

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("crName");
    var phone = document.getElementById("crPhone");
    var email = document.getElementById("crEmail");

    if (!name.value.trim() || !phone.value.trim() || !email.value.trim() || !roleSelect.value) {
      note.textContent = "Please fill in all required fields.";
      note.classList.remove("is-success");
      return;
    }

    note.textContent = "Thank you! Our HR team will review your application and contact you within 5 business days.";
    note.classList.add("is-success");
    form.reset();
  });
})();
