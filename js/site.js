/* Caliber Media site — tiny helpers. No frameworks, no tracking. */

// Where the Engine installer lives. Change this one line when the release is published.
// GitHub Releases (a public repo): https://github.com/<user>/<repo>/releases/latest
var CALIBER = {
  downloadUrl: 'https://github.com/Caliber-Media-LLC/caliber-releases/releases/latest',
  version: null // filled from patchnotes.json
};

(function () {
  // footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // every element that wants the download link
  document.querySelectorAll('[data-download]').forEach(function (a) { a.href = CALIBER.downloadUrl; });

  // patch notes + version label
  var box = document.getElementById('patchnotes');
  var verEls = document.querySelectorAll('[data-version]');
  if (!box && !verEls.length) return;

  var load = (typeof CALIBER_PATCHNOTES !== 'undefined')
    ? Promise.resolve(CALIBER_PATCHNOTES)
    : fetch('patchnotes.json').then(function (r) { return r.json(); });
  load.then(function (d) {
    var rels = d.releases || [];
    if (!rels.length) return;
    CALIBER.version = rels[0].version;
    verEls.forEach(function (el) { el.textContent = 'v' + rels[0].version + (rels[0].label ? ' ' + rels[0].label : ''); });
    if (!box) return;

    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function render(list) {
      return list.map(function (r) {
        var secs = (r.sections || []).map(function (s) {
          var n = String(s.name || '').toUpperCase();
          var cls = n === 'NEW FEATURES' ? 'new' : (n === 'BUG FIXES' ? 'fix' : '');
          return '<h4 class="' + cls + '">' + esc(s.name) + '</h4><ul>' +
            (s.items || []).map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
        }).join('');
        return '<article class="rel"><h3>Version ' + esc(r.version) + (r.label ? ' ' + esc(r.label) : '') + '</h3>' +
          '<div class="date">' + esc(r.date || '') + '</div>' + secs + '</article>';
      }).join('');
    }
    box.innerHTML = render(rels);
  }).catch(function () {
    if (box) box.innerHTML = '<p class="sub">Patch notes could not be loaded. Please try again later.</p>';
  });
})();
