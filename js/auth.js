/**
 * Auth page — switch Login / Register / Forgot in one panel
 */
(function () {
  const views = document.querySelectorAll(".auth-form-view");
  const showLinks = document.querySelectorAll("[data-auth-show]");

  function showView(name) {
    views.forEach((v) => {
      v.classList.toggle("is-active", v.dataset.authView === name);
    });
    if (name === "login" || name === "register" || name === "forgot") {
      history.replaceState(null, "", "#" + name);
    }
  }

  showLinks.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const target = el.getAttribute("data-auth-show");
      if (target) showView(target);
    });
  });

  const hash = (location.hash || "#login").replace("#", "");
  if (hash === "register" || hash === "forgot") {
    showView(hash);
  } else {
    showView("login");
  }

  document.querySelectorAll(".auth-form-view form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (form.id === "registerForm") {
        const p1 = form.querySelector("#regPass");
        const p2 = form.querySelector("#regPass2");
        if (p1 && p2 && p1.value !== p2.value) {
          alert("Passwords do not match. Please check and try again.");
          p2.focus();
          return;
        }
      }
      const btn = form.querySelector(".auth-submit:not(.outline)");
      const label = btn?.innerHTML;
      if (btn) {
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Please wait…';
        btn.disabled = true;
      }
      setTimeout(() => {
        if (btn && label) {
          btn.innerHTML = label;
          btn.disabled = false;
        }
        const msg =
          form.id === "forgotForm"
            ? "If this email is registered, you will receive a reset link shortly. (Demo)"
            : "This is a demo form. Connect your backend to enable sign-in.";
        alert(msg);
        if (form.id === "forgotForm") showView("login");
      }, 1200);
    });
  });
})();
