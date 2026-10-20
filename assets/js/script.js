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
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    var first = form.elements.first_name.value.trim();
    var last = form.elements.last_name.value.trim();
    var message = form.elements.message.value.trim();
    if (!first || !last || !message) {
      status.textContent = 'Please enter your name and message.';
      status.className = 'form-status error';
      return;
    }
    var draft = 'Hi Dominic! I’m ' + first + ' ' + last + '.\n\n' + message + '\n\nEmail: ' + form.elements.email.value.trim();
    if (form.elements.mobile.value.trim()) draft += '\nMobile: ' + form.elements.mobile.value.trim();
    try {
      await navigator.clipboard.writeText(draft);
      status.textContent = 'Message copied. Open LinkedIn or Instagram and paste it to send.';
      status.className = 'form-status success';
    } catch (error) {
      status.replaceChildren();
      status.className = 'form-status error';
      var label = document.createElement('label');
      label.htmlFor = 'message-draft';
      label.textContent = 'Copy your draft below, then send it on LinkedIn or Instagram.';
      var output = document.createElement('textarea');
      output.id = 'message-draft';
      output.value = draft;
      output.readOnly = true;
      output.rows = 7;
      output.style.width = '100%';
      status.append(label, output);
      output.focus();
      output.select();
    }
  });
})();
