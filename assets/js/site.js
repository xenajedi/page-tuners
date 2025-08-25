(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Characters disclosure
  const btn = document.querySelector('.nav__button');
  const sub = document.getElementById('nav-characters');
  if (btn && sub) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      sub.hidden = expanded;
      const caret = btn.querySelector('.nav__caret');
      if (caret) caret.textContent = expanded ? '►' : '▾';
    });
  }

  // Smooth scroll for in-page anchors
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const opts = prefersReduced ? {behavior: 'auto'} : {behavior: 'smooth'};
    target.focus({preventScroll: true});
    target.scrollIntoView(opts);
    history.replaceState(null, '', `#${id}`);
  }, {capture: true});

  // Scrollspy (IntersectionObserver)
  const sections = document.querySelectorAll('.section[id]');
  const links = new Map();
  document.querySelectorAll('.nav__link').forEach(link => {
    const hash = link.getAttribute('href');
    links.set(hash, link);
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = links.get(`#${id}`);
      if (!link) return;
      if (entry.isIntersecting) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }, {rootMargin: '-40% 0px -55% 0px', threshold: 0.01});
  sections.forEach(s => observer.observe(s));

  // Episodes filter chips
  const chips = document.querySelectorAll('.subnav .chip');
  const grid = document.getElementById('episodes-grid');
  if (chips && grid) {
    chips.forEach(chip => chip.addEventListener('click', () => {
      chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
      const filter = chip.dataset.filter;
      grid.querySelectorAll('.episode').forEach(card => {
        const tags = (card.dataset.tags || '').split(';').map(s => s.trim().toLowerCase());
        const show = filter === 'all' || tags.includes(filter);
        card.style.display = show ? '' : 'none';
      });
    }));
  }
})();