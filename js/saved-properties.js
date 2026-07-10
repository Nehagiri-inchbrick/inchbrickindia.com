(function () {
  var store = window.SAVED_STORE;
  var allProperties = window.LISTINGS_DATA || [];
  var gridEl = document.getElementById("spGrid");
  var emptyEl = document.getElementById("spEmpty");
  var countEl = document.getElementById("spCount");
  var compareBtn = document.getElementById("spCompareBtn");
  var toastEl = document.getElementById("spToast");
  var selectedIds = [];

  function getProperty(id) {
    return allProperties.find(function (p) { return p.id === Number(id); });
  }

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 2400);
  }

  function updateToolbar(count) {
    if (countEl) countEl.textContent = count + (count === 1 ? " saved" : " saved");
    if (compareBtn) compareBtn.disabled = selectedIds.length < 2;
  }

  function shareProperty(p) {
    var text = p.name + " — " + p.price + " | " + p.location + ", " + p.city;
    var url = location.origin + location.pathname.replace(/[^/]+$/, "") + "listing-detail.html?id=" + p.id;

    if (navigator.share) {
      navigator.share({ title: p.name, text: text, url: url }).catch(function () {});
      return;
    }

    var wa = "https://wa.me/?text=" + encodeURIComponent(text + "\n" + url);
    window.open(wa, "_blank", "noopener");
    showToast("Opening share options…");
  }

  function render() {
    var ids = store.getIds();
    var properties = ids.map(getProperty).filter(Boolean);

    selectedIds = selectedIds.filter(function (id) {
      return ids.indexOf(id) !== -1;
    });

    if (!properties.length) {
      gridEl.innerHTML = "";
      emptyEl.hidden = false;
      updateToolbar(0);
      return;
    }

    emptyEl.hidden = true;
    updateToolbar(properties.length);

    gridEl.innerHTML = properties.map(function (p) {
      var isSelected = selectedIds.indexOf(p.id) !== -1;
      var isSaved = store.isSaved(p.id);
      return (
        '<article class="sp-card' + (isSelected ? " is-selected" : "") + '" data-id="' + p.id + '">' +
        '<a href="listing-detail.html?id=' + p.id + '" class="sp-card-media">' +
        '<img src="' + p.img.replace("w=1200", "w=600") + '" alt="' + p.name + '">' +
        '<span class="sp-card-badge">' + p.status + "</span>" +
        '<label class="sp-card-select" title="Select for compare">' +
        '<input type="checkbox" data-action="select"' + (isSelected ? " checked" : "") + ">" +
        "</label></a>" +
        '<div class="sp-card-body">' +
        "<h3><a href=\"listing-detail.html?id=" + p.id + '">' + p.name + "</a></h3>" +
        '<p class="sp-card-loc"><i class="fas fa-map-marker-alt"></i> ' + p.location + ", " + p.city + "</p>" +
        '<div class="sp-card-meta">' +
        "<span><i class=\"fas fa-bed\"></i> " + p.bhk + "</span>" +
        "<span><i class=\"fas fa-expand\"></i> " + p.area + "</span>" +
        "<span><i class=\"fas fa-building\"></i> " + p.type + "</span>" +
        "</div>" +
        '<p class="sp-card-price">' + p.price + "</p>" +
        "</div>" +
        '<div class="sp-card-actions">' +
        '<button type="button" class="sp-card-action' + (isSaved ? " is-active" : "") + '" data-action="wishlist" title="Wishlist">' +
        '<i class="' + (isSaved ? "fas" : "far") + ' fa-heart"></i><span>Wishlist</span></button>' +
        '<button type="button" class="sp-card-action" data-action="compare" title="Compare">' +
        '<i class="fas fa-scale-balanced"></i><span>Compare</span></button>' +
        '<button type="button" class="sp-card-action" data-action="share" title="Share">' +
        '<i class="fas fa-share-nodes"></i><span>Share</span></button>' +
        '<button type="button" class="sp-card-action sp-card-action--remove" data-action="remove" title="Remove">' +
        '<i class="fas fa-trash-can"></i><span>Remove</span></button>' +
        "</div></article>"
      );
    }).join("");

    bindCardActions();
  }

  function bindCardActions() {
    gridEl.querySelectorAll(".sp-card").forEach(function (card) {
      var id = Number(card.dataset.id);
      var property = getProperty(id);
      if (!property) return;

      card.querySelectorAll("[data-action]").forEach(function (el) {
        el.addEventListener("click", function (e) {
          var action = el.dataset.action;

          if (action === "select") {
            e.stopPropagation();
            if (el.checked) {
              if (selectedIds.indexOf(id) === -1) selectedIds.push(id);
            } else {
              selectedIds = selectedIds.filter(function (x) { return x !== id; });
            }
            card.classList.toggle("is-selected", el.checked);
            updateToolbar(store.getIds().length);
            return;
          }

          e.preventDefault();
          e.stopPropagation();

          if (action === "wishlist") {
            var saved = store.isSaved(id);
            if (saved) {
              store.remove(id);
              showToast("Removed from wishlist");
            } else {
              store.save(id);
              showToast("Added to wishlist");
            }
            render();
            return;
          }

          if (action === "compare") {
            var compareIds = selectedIds.length >= 2 ? selectedIds.slice(0, 3) : [id];
            if (compareIds.length === 1) {
              var others = store.getIds().filter(function (x) { return x !== id; }).slice(0, 2);
              compareIds = [id].concat(others);
            }
            location.href = "compare-properties.html?ids=" + compareIds.slice(0, 3).join(",");
            return;
          }

          if (action === "share") {
            shareProperty(property);
            return;
          }

          if (action === "remove") {
            store.remove(id);
            selectedIds = selectedIds.filter(function (x) { return x !== id; });
            showToast("Property removed");
            render();
          }
        });
      });

      var selectInput = card.querySelector('[data-action="select"]');
      if (selectInput) {
        selectInput.addEventListener("click", function (e) { e.stopPropagation(); });
      }
    });
  }

  if (compareBtn) {
    compareBtn.addEventListener("click", function () {
      if (selectedIds.length < 2) return;
      location.href = "compare-properties.html?ids=" + selectedIds.slice(0, 3).join(",");
    });
  }

  render();
})();
