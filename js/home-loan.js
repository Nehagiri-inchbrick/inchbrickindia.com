(function () {
  var form = document.getElementById("homeLoanForm");
  var note = document.getElementById("hlFormNote");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("hlName");
    var phone = document.getElementById("hlPhone");
    var email = document.getElementById("hlEmail");

    if (!name.value.trim() || !phone.value.trim() || !email.value.trim()) {
      note.textContent = "Please fill in all required fields.";
      note.classList.remove("is-success");
      return;
    }

    note.textContent = "Thank you! Our loan advisor will contact you within 24 hours.";
    note.classList.add("is-success");
    form.reset();
  });
})();
