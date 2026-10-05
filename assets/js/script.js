(function () {
    var typed = new Typed(".typewriter", {
        strings: [
            "a <strong>Web Developer</strong>",
            "a <strong>Graphic Animator</strong>",
            "a <strong>Programmer</strong>"
        ],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1000,
        loop: true,
        showCursor: false
    });

    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        status.textContent = "";
        status.className = "";

        var first = document.getElementById("firstname").value.trim();
        var last = document.getElementById("lastname").value.trim();
        var email = document.getElementById("email").value.trim();
        var mobile = document.getElementById("mobile").value.trim();
        var message = document.getElementById("message").value.trim();

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var valid = first !== "" && last !== "" && email !== "" &&
            emailPattern.test(email) && mobile !== "" && message !== "";

        if (!valid) {
            status.textContent = "Please fill in all fields correctly (including a valid email).";
            status.className = "form-status error";
            return;
        }

        status.textContent = "Sending…";
        status.className = "form-status loading";

        // GitHub Pages is static — no server to send the email.
        // Swap the `endpoint` below for a real Formspree/Netlify endpoint
        // (and keep the `fetch` call) if you want submissions to arrive in your inbox.
        var endpoint = ""; // e.g. "https://formspree.io/f/your_unique_id"

        setTimeout(function () {
            status.textContent = "Thanks, " + first + "! Your message has been sent.";
            status.className = "form-status success";
            form.reset();
        }, 900);
    });

    // Close the mobile menu when a link is clicked.
    var navToggle = document.querySelector(".nav-toggle");
    var navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            navToggle.classList.toggle("active");
            navLinks.classList.toggle("open");
        });

        navLinks.addEventListener("click", function (e) {
            if (e.target.tagName === "A") {
                navToggle.classList.remove("active");
                navLinks.classList.remove("open");
            }
        });
    }
})();
