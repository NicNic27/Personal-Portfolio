var typed = new Typed(".multi-text", {
    strings: ["Web Developer", " Graphic Animator", "Programmer"],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
});

(function () {
    var form = document.getElementById('contact-form');
    var status = document.getElementById('form-status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Clear previous messages.
        status.textContent = '';
        status.className = '';

        // Gather values (trim whitespace for validation).
        var first = document.getElementById('firstname').value.trim();
        var last = document.getElementById('lastname').value.trim();
        var email = document.getElementById('email').value.trim();
        var mobile = document.getElementById('mobile').value.trim();
        var message = document.querySelector('textarea[name="message"]').value.trim();

        // Validate manually so the feedback shows even with novalidate.
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var valid = first !== '' && last !== '' && email !== '' &&
            emailPattern.test(email) && mobile !== '' && message !== '';

        if (!valid) {
            status.textContent = 'Please fill in all fields correctly (including a valid email).';
            status.className = 'error';
            return;
        }

        // NOTE: GitHub Pages is static and cannot run a server.
        // Replace the endpoint below with a real endpoint (Formspree/Netlify/Vercel)
        // if you want submissions to reach an email inbox.
        status.textContent = 'Sending… (work in progress — no backend yet).';
        status.className = 'loading';

        // Placeholder for the real async call; keep it here so the form behaves
        // consistently once an endpoint is supplied.
        setTimeout(function () {
            status.textContent = 'Thanks, ' + first + '! Your message has been sent.';
            status.className = 'success';
            form.reset();
        }, 900);
    });
})();