(function () {
  'use strict';
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav-links');
  function closeMenu() {
    toggle.classList.remove('active');
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.classList.toggle('active', open);
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.navbar')) closeMenu();
  });
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        nav.querySelectorAll('a').forEach(function (link) {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (section) { observer.observe(section); });
  }
  window.matchMedia('(min-width: 861px)').addEventListener('change', closeMenu);
})();
