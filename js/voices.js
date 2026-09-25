/* Voice page — builds the character cards + filter bar from CALIBER_VOICES (voices-data.js). */
(function () {
  var grid = document.getElementById('voices');
  var bar = document.getElementById('voice-filters');
  if (!grid || typeof CALIBER_VOICES === 'undefined') return;

  var RATINGS = ['G', 'PG', 'PG-13', 'R'];
  var ratingClass = { 'G': 'g', 'PG': 'pg', 'PG-13': 'pg13', 'R': 'r' };
  var state = { gender: null, rating: null, genre: null, game: null };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function card(v) {
    var tags = '<span class="tag hot">' + esc(v.gender) + '</span>' +
      abc(v.genres).map(function (g) { return '<span class="tag">' + esc(g) + '</span>'; }).join('');
    var buy = (v.steam || v.store) ? '<div class="buy">' +
      (v.steam ? '<a class="btn primary" href="' + esc(v.steam) + '" rel="noopener">Steam</a>' : '') +
      (v.store ? '<a class="btn" href="' + esc(v.store) + '">CaliberSite</a>' : '') + '</div>' : '';
    var play = v.samples && v.samples.length ?
      '<button type="button" class="play" data-voice="' + CALIBER_VOICES.indexOf(v) + '" aria-label="Hear ' + esc(v.name) + '"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg></button>' : '';
    return '<article class="char' + (play ? ' has-sample' : '') + '"><div class="pic">' +
      '<img src="assets/portraits/' + esc(v.img) + '" alt="Portrait of ' + esc(v.name) + '" loading="lazy">' + play +
      '<span class="rating ' + ratingClass[v.rating] + '" aria-label="Rated ' + esc(v.rating) + '">' + esc(v.rating) + '</span>' +
      ((v.steam || v.store) ? '' : '<span class="demo soon">Coming soon</span>') +
      '</div><div class="body"><h3>' + esc(v.name) + '</h3><p>' + esc(v.desc) + '</p>' +
      games(v) + '<div class="tags">' + tags + '</div>' + buy + '</div></article>';
  }

  // game packs line — first few always visible, the rest behind a "+N more" toggle
  var GAMES_SHOWN = 5;
  function abc(arr) { return arr.slice().sort(function (a, b) { return a.localeCompare(b, 'en', { sensitivity: 'base' }); }); }

  function games(v) {
    if (!v.games || !v.games.length) return '';
    var list = abc(v.games);
    var shown = list.slice(0, GAMES_SHOWN), rest = list.slice(GAMES_SHOWN);
    return '<p class="games"><span class="glabel">Games</span> ' + shown.map(esc).join(' · ') +
      (rest.length ? '<span class="grest" hidden> · ' + rest.map(esc).join(' · ') + '</span> ' +
        '<button type="button" class="more" aria-expanded="false" data-label="+' + rest.length + ' more">+' + rest.length + ' more</button>' : '') + '</p>';
  }

  function matches(v) {
    return (!state.gender || v.gender === state.gender) &&
      (!state.rating || v.rating === state.rating) &&
      (!state.genre || v.genres.indexOf(state.genre) !== -1) &&
      (!state.game || (v.games || []).indexOf(state.game) !== -1);
  }

  var count = document.getElementById('voice-count');
  function render() {
    var list = CALIBER_VOICES.filter(matches);
    grid.innerHTML = list.length ? list.map(card).join('') :
      '<p class="sub">No voices match yet. More are on the way.</p>';
    if (count) count.textContent = list.length + (list.length === 1 ? ' voice' : ' voices');
  }

  // voice samples — click a card (or its speaker button) to hear a random line; one clip at a time
  var audio = new Audio(), lastClip = null, playingCard = null;
  function stopped() { if (!audio.paused) return; if (playingCard) playingCard.classList.remove('playing'); playingCard = null; }
  audio.addEventListener('ended', stopped);
  audio.addEventListener('pause', stopped);
  grid.addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    var more = e.target.closest('.more');
    if (more) {
      var open = more.getAttribute('aria-expanded') !== 'true';
      more.previousElementSibling.hidden = !open;
      more.setAttribute('aria-expanded', open);
      more.textContent = open ? 'less' : more.getAttribute('data-label');
      return;
    }
    var cardEl = e.target.closest('.char.has-sample');
    if (!cardEl) return;
    var v = CALIBER_VOICES[+cardEl.querySelector('.play').getAttribute('data-voice')];
    var pool = v.samples.length > 1 ? v.samples.filter(function (s) { return s !== lastClip; }) : v.samples;
    var clip = pool[Math.floor(Math.random() * pool.length)];
    audio.pause();
    if (playingCard) playingCard.classList.remove('playing');
    playingCard = null;
    lastClip = clip;
    audio.src = 'assets/voice-samples/' + clip;
    audio.play().then(function () { playingCard = cardEl; cardEl.classList.add('playing'); }, function () {});
  });

  // filter bar — genres are collected from the data, so a new genre gets a button automatically
  function uniq(arr) { return arr.filter(function (x, i) { return arr.indexOf(x) === i; }); }
  var genders = uniq(CALIBER_VOICES.map(function (v) { return v.gender; }));
  var ratings = RATINGS.filter(function (r) { return CALIBER_VOICES.some(function (v) { return v.rating === r; }); });
  var genres = abc(uniq([].concat.apply([], CALIBER_VOICES.map(function (v) { return v.genres; }))));
  var gameList = abc(uniq([].concat.apply([], CALIBER_VOICES.map(function (v) { return v.games || []; }))));

  function group(key, label, values) {
    return '<div class="fgroup" role="group" aria-label="' + label + '"><span class="flabel">' + label + '</span>' +
      '<button type="button" class="chip" data-key="' + key + '" data-val="" aria-pressed="true">All</button>' +
      values.map(function (x) {
        return '<button type="button" class="chip" data-key="' + key + '" data-val="' + esc(x) + '" aria-pressed="false">' + esc(x) + '</button>';
      }).join('') + '</div>';
  }

  // games get a dropdown — too many for a row of buttons
  function dropdown(key, label, values) {
    return '<div class="fgroup"><label class="flabel" for="f-' + key + '">' + label + '</label>' +
      '<select id="f-' + key + '" class="fselect" data-key="' + key + '"><option value="">All games</option>' +
      values.map(function (x) { return '<option value="' + esc(x) + '">' + esc(x) + '</option>'; }).join('') + '</select></div>';
  }

  if (bar) {
    bar.innerHTML = group('gender', 'Voice', genders) + group('rating', 'Rating', ratings) + group('genre', 'Genre', genres) + dropdown('game', 'Game', gameList);
    bar.addEventListener('change', function (e) {
      var sel = e.target.closest('.fselect');
      if (!sel) return;
      state[sel.getAttribute('data-key')] = sel.value || null;
      sel.classList.toggle('on', !!sel.value);
      render();
    });
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
