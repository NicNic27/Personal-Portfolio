(function () {
  var typed = new Typed('.typewriter', {
    strings: [
      '<strong>Web Developer</strong>',
      '<strong>Graphic Animator</strong>',
      '<strong>Student Developer</strong>'
    ],
    typeSpeed: 55,
    backSpeed: 55,
    backDelay: 1100,
    loop: true,
    showCursor: false
  });

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      status.textContent = '';
      status.className = 'form-status';

      var first = document.getElementById('firstname').value.trim();
      var last = document.getElementById('lastname').value.trim();
      var email = document.getElementById('email').value.trim();
      var mobile = document.getElementById('mobile').value.trim();
      var message = document.getElementById('message').value.trim();

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var valid = first !== '' && last !== '' && email !== '' &&
        emailPattern.test(email) && mobile !== '' && message !== '';

      if (!valid) {
        status.textContent = 'Please fill in all fields correctly, including a valid email.';
        status.className = 'form-status error';
        return;
      }

      status.textContent = 'Sending…';
      status.className = 'form-status loading';

      // This is a static site, so the contact form cannot send email.
      // It only validates the fields and shows a status message here.
      // To receive real submissions, connect a form backend later
      // such as Formspree, Netlify Forms, or your own endpoint.

      setTimeout(function () {
        status.textContent = 'Thanks, ' + first + '! Your message was received here.';
        status.className = 'form-status success';
        form.reset();
      }, 900);
    });
  }

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }
})();
