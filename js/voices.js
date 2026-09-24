/* Voice page — builds the character cards + filter bar from CALIBER_VOICES (voices-data.js). */
(function () {
  var grid = document.getElementById('voices');
  var bar = document.getElementById('voice-filters');
  if (!grid || typeof CALIBER_VOICES === 'undefined') return;

  var RATINGS = ['G', 'PG', 'PG-13', 'R'];
  var ratingClass = { 'G': 'g', 'PG': 'pg', 'PG-13': 'pg13', 'R': 'r' };
  var state = { gender: null, rating: null, genre: null };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function card(v) {
    var tags = '<span class="tag hot">' + esc(v.gender) + '</span>' +
      v.genres.map(function (g) { return '<span class="tag">' + esc(g) + '</span>'; }).join('');
    var buy = (v.steam || v.store) ? '<div class="buy">' +
      (v.steam ? '<a class="btn primary" href="' + esc(v.steam) + '" rel="noopener">Steam</a>' : '') +
      (v.store ? '<a class="btn" href="' + esc(v.store) + '">CaliberSite</a>' : '') + '</div>' : '';
    return '<article class="char"><div class="pic">' +
      '<img src="assets/portraits/' + esc(v.img) + '" alt="Portrait of ' + esc(v.name) + '" loading="lazy">' +
      '<span class="rating ' + ratingClass[v.rating] + '" aria-label="Rated ' + esc(v.rating) + '">' + esc(v.rating) + '</span>' +
      ((v.steam || v.store) ? '' : '<span class="demo soon">Coming soon</span>') +
      '</div><div class="body"><h3>' + esc(v.name) + '</h3><p>' + esc(v.desc) + '</p>' +
      '<div class="tags">' + tags + '</div>' + buy + '</div></article>';
  }

  function matches(v) {
    return (!state.gender || v.gender === state.gender) &&
      (!state.rating || v.rating === state.rating) &&
      (!state.genre || v.genres.indexOf(state.genre) !== -1);
  }

  var count = document.getElementById('voice-count');
  function render() {
    var list = CALIBER_VOICES.filter(matches);
    grid.innerHTML = list.length ? list.map(card).join('') :
      '<p class="sub">No voices match yet. More are on the way.</p>';
    if (count) count.textContent = list.length + (list.length === 1 ? ' voice' : ' voices');
  }

  // filter bar — genres are collected from the data, so a new genre gets a button automatically
  function uniq(arr) { return arr.filter(function (x, i) { return arr.indexOf(x) === i; }); }
  var genders = uniq(CALIBER_VOICES.map(function (v) { return v.gender; }));
  var ratings = RATINGS.filter(function (r) { return CALIBER_VOICES.some(function (v) { return v.rating === r; }); });
  var genres = uniq([].concat.apply([], CALIBER_VOICES.map(function (v) { return v.genres; })));

  function group(key, label, values) {
    return '<div class="fgroup" role="group" aria-label="' + label + '"><span class="flabel">' + label + '</span>' +
      '<button type="button" class="chip" data-key="' + key + '" data-val="" aria-pressed="true">All</button>' +
      values.map(function (x) {
        return '<button type="button" class="chip" data-key="' + key + '" data-val="' + esc(x) + '" aria-pressed="false">' + esc(x) + '</button>';
      }).join('') + '</div>';
  }

  if (bar) {
    bar.innerHTML = group('gender', 'Voice', genders) + group('rating', 'Rating', ratings) + group('genre', 'Genre', genres);
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.chip');
      if (!b) return;
      var key = b.getAttribute('data-key');
      state[key] = b.getAttribute('data-val') || null;
      bar.querySelectorAll('.chip[data-key="' + key + '"]').forEach(function (c) {
        c.setAttribute('aria-pressed', c === b ? 'true' : 'false');
      });
      render();
    });
  }
  render();
})();
