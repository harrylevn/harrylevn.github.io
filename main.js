(function () {
  var cards = [].slice.call(document.querySelectorAll('.card'));
  var filters = document.querySelector('.filters');
  if (!filters) return;
  filters.hidden = false;
  var state = { family: 'all', store: 'all' };
  var result = document.querySelector('.result');

  function apply() {
    var shown = 0;
    cards.forEach(function (c) {
      var ok = (state.family === 'all' || c.dataset.family === state.family) &&
        (state.store === 'all' || c.dataset.stores.split(' ').indexOf(state.store) !== -1);
      c.hidden = !ok;
      if (ok) shown++;
    });
    result.textContent = shown + (shown === 1 ? ' app' : ' apps');
    filters.querySelectorAll('.chip').forEach(function (b) {
      var key = b.dataset.family ? 'family' : 'store';
      b.setAttribute('aria-pressed', String(b.dataset[key] === state[key]));
    });
  }

  filters.addEventListener('click', function (ev) {
    var b = ev.target.closest('.chip');
    if (!b) return;
    if (b.dataset.family) state.family = b.dataset.family;
    if (b.dataset.store) state.store = b.dataset.store;
    apply();
  });

  var hash = location.hash.slice(1);
  if (filters.querySelector('[data-family="' + CSS.escape(hash) + '"]')) state.family = hash;
  apply();
})();
