(function (global) {
  var STORAGE_KEY = "inchbrick-saved-properties";
  var DEFAULT_IDS = [5, 4, 1, 9];

  function readRaw() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.map(Number).filter(Boolean) : null;
    } catch (e) {
      return null;
    }
  }

  function write(ids) {
    var unique = ids.filter(function (id, i) { return ids.indexOf(id) === i; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
    return unique;
  }

  function ensureSeed() {
    var ids = readRaw();
    if (ids && ids.length) return ids;
    return write(DEFAULT_IDS.slice());
  }

  global.SAVED_STORE = {
    key: STORAGE_KEY,
    getIds: function () {
      return ensureSeed();
    },
    isSaved: function (id) {
      return ensureSeed().indexOf(Number(id)) !== -1;
    },
    save: function (id) {
      id = Number(id);
      var ids = ensureSeed();
      if (ids.indexOf(id) === -1) ids.push(id);
      return write(ids);
    },
    remove: function (id) {
      id = Number(id);
      return write(ensureSeed().filter(function (x) { return x !== id; }));
    },
    toggle: function (id) {
      id = Number(id);
      if (this.isSaved(id)) return this.remove(id);
      return this.save(id);
    },
    clear: function () {
      return write([]);
    }
  };
})(window);
