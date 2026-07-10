(function () {
  var METRICS = [
    { key: "price", label: "Price", icon: "fa-indian-rupee-sign" },
    { key: "area", label: "Area", icon: "fa-vector-square" },
    { key: "amenities", label: "Amenities", icon: "fa-spa" },
    { key: "builder", label: "Builder", icon: "fa-hard-hat" },
    { key: "location", label: "Location", icon: "fa-location-dot" },
    { key: "roi", label: "ROI", icon: "fa-chart-line" },
    { key: "possession", label: "Possession", icon: "fa-key" }
  ];

  var BUILDERS = ["Lodha Group", "Prestige Estates", "Godrej Properties", "DLF Limited", "Brigade Group", "Sobha Limited", "Tata Housing", "Mahindra Lifespaces"];
  var AMENITY_POOLS = [
    ["Pool", "Gym", "Clubhouse", "24/7 Security"],
    ["Pool", "Gym", "Clubhouse", "Kids Play", "Power Backup"],
    ["Gym", "Clubhouse", "Landscaped Gardens", "Parking"],
    ["Pool", "Gym", "Spa", "Concierge", "EV Charging"],
    ["Clubhouse", "Jogging Track", "Tennis Court", "Security"]
  ];

  var allProperties = (window.LISTINGS_DATA || []).map(function (p, i) {
    var status = p.status || "Ready";
    var possession = status === "Ready" ? "Immediate" : status === "New Launch" ? "Jun 2028" : "Dec 2027";
    var roi = p.mood === "investment" ? 9.2 : p.mood === "urban" ? 7.8 : p.mood === "beachside" ? 8.5 : 6.5 + (i % 4) * 0.6;
    return Object.assign({}, p, {
      builder: BUILDERS[i % BUILDERS.length],
      amenities: AMENITY_POOLS[i % AMENITY_POOLS.length],
      roi: roi.toFixed(1) + "% p.a.",
      roiVal: roi,
      possession: possession,
      locationFull: p.location + ", " + p.city
    });
  });

  var pickersEl = document.getElementById("cpPickers");
  var tableHead = document.getElementById("cpTableHead");
  var tableBody = document.getElementById("cpTableBody");
  var selectedIds = [];

  function getProperty(id) {
    return allProperties.find(function (p) { return p.id === Number(id); });
  }

  function buildPickerOptions(selected, index) {
    return allProperties.map(function (p) {
      var disabled = selected.indexOf(p.id) !== -1 && selected[index] !== p.id;
      return '<option value="' + p.id + '"' + (selected[index] === p.id ? " selected" : "") + (disabled ? " disabled" : "") + ">" + p.name + " — " + p.city + "</option>";
    }).join("");
  }

  function renderPickers() {
    if (!selectedIds.length) {
      selectedIds = [5, 4, 1].filter(function (id) { return getProperty(id); });
      while (selectedIds.length < 3 && allProperties[selectedIds.length]) {
        var next = allProperties[selectedIds.length].id;
        if (selectedIds.indexOf(next) === -1) selectedIds.push(next);
      }
    }

    pickersEl.innerHTML = [0, 1, 2].map(function (i) {
      var p = getProperty(selectedIds[i]);
      return '<div class="cp-picker">' +
        '<label for="cpSelect' + i + '">Property ' + (i + 1) + '</label>' +
        '<select id="cpSelect' + i + '" data-index="' + i + '">' +
        buildPickerOptions(selectedIds, i) +
        '</select>' +
        (p ? '<div class="cp-picker-preview">' +
          '<img src="' + p.img.replace("w=1200", "w=200") + '" alt="">' +
          '<div><strong>' + p.name + '</strong><span>' + p.price + '</span></div>' +
        '</div>' : '') +
        '</div>';
    }).join("");

    pickersEl.querySelectorAll("select").forEach(function (sel) {
      sel.addEventListener("change", function () {
        var idx = Number(sel.dataset.index);
        selectedIds[idx] = Number(sel.value);
        renderPickers();
        renderTable();
      });
    });
  }

  function amenityHtml(list) {
    return '<div class="cp-amenities">' + list.map(function (a) {
      return '<span class="cp-amenity-tag">' + a + '</span>';
    }).join("") + '</div>';
  }

  function roiHtml(p) {
    return '<div class="cp-roi-bar">' +
      '<span class="cp-val-highlight">' + p.roi + '</span>' +
      '<div class="cp-roi-track"><span class="cp-roi-fill" style="width:' + Math.min(p.roiVal * 8, 100) + '%"></span></div>' +
    '</div>';
  }

  function cellValue(key, p) {
    if (key === "price") return '<span class="cp-val-highlight">' + p.price + '</span>';
    if (key === "area") return p.area + ' <small>(' + p.bhk + ')</small>';
    if (key === "amenities") return amenityHtml(p.amenities);
    if (key === "builder") return p.builder;
    if (key === "location") return p.locationFull;
    if (key === "roi") return roiHtml(p);
    if (key === "possession") return p.possession;
    return "—";
  }

  function renderTable() {
    var props = selectedIds.map(getProperty).filter(Boolean);

    tableHead.innerHTML = '<tr><th class="cp-metric">Compare</th>' +
      props.map(function (p) {
        return '<th class="cp-prop-head">' +
          '<img src="' + p.img.replace("w=1200", "w=400") + '" alt="' + p.name + '">' +
          '<strong>' + p.name + '</strong>' +
          '<span>' + p.type + ' · ' + p.status + '</span>' +
          '<a href="listing-detail.html">View Details <i class="fas fa-arrow-right"></i></a>' +
        '</th>';
      }).join("") + '</tr>';

    tableBody.innerHTML = METRICS.map(function (m) {
      return '<tr><td class="cp-metric"><i class="fas ' + m.icon + '"></i>' + m.label + '</td>' +
        props.map(function (p) {
          return '<td>' + cellValue(m.key, p) + '</td>';
        }).join("") +
      '</tr>';
    }).join("");
  }

  if (!allProperties.length) {
    document.querySelector(".cp-main").innerHTML = '<div class="cp-container"><p>No properties available to compare.</p></div>';
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var idParam = params.get("ids");
  if (idParam) {
    selectedIds = idParam.split(",").map(Number).filter(function (id) { return getProperty(id); }).slice(0, 3);
  }

  renderPickers();
  renderTable();
})();
