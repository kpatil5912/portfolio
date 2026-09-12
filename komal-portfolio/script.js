/* ============================================================
   Komal Patil — Portfolio interactivity
   ============================================================ */
(function () {
  "use strict";

  /* -----------------------------------------------------------
     0. CONFIG — set your real public LinkedIn URL here.
     The Teams chat link you shared is private and won't work
     as a public profile. Paste your linkedin.com/in/... URL:
  ----------------------------------------------------------- */
  var LINKEDIN_URL = "https://www.linkedin.com/in/komal-rohit-p-23a782262"; // <-- update to your real handle

  document.querySelectorAll("[data-linkedin]").forEach(function (el) {
    el.setAttribute("href", LINKEDIN_URL);
  });

  /* -----------------------------------------------------------
     1. Navbar: scrolled state + mobile menu toggle
  ----------------------------------------------------------- */
  var navbar = document.getElementById("navbar");
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  /* -----------------------------------------------------------
     2. Scroll progress bar
  ----------------------------------------------------------- */
  var progress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", function () {
    var h = document.documentElement;
    var scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = scrolled + "%";
  });

  /* -----------------------------------------------------------
     3. Reveal-on-scroll (IntersectionObserver)
  ----------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el, i) {
      // slight stagger for elements in the same viewport
      el.style.transitionDelay = (i % 5) * 0.06 + "s";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* -----------------------------------------------------------
     4. Hero typed effect
  ----------------------------------------------------------- */
  var typedEl = document.getElementById("typed");
  var phrases = [
    "scalable backends.",
    "Spring Boot microservices.",
    "reliable REST APIs.",
    "clean low-level designs.",
    "production-grade systems.",
  ];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typedEl) {
    if (reduceMotion) {
      typedEl.textContent = phrases[0];
    } else {
      var pi = 0, ci = 0, deleting = false;
      (function type() {
        var current = phrases[pi];
        typedEl.textContent = current.substring(0, ci);
        if (!deleting && ci < current.length) {
          ci++;
          setTimeout(type, 70);
        } else if (deleting && ci > 0) {
          ci--;
          setTimeout(type, 35);
        } else {
          if (!deleting) {
            deleting = true;
            setTimeout(type, 1400);
          } else {
            deleting = false;
            pi = (pi + 1) % phrases.length;
            setTimeout(type, 250);
          }
        }
      })();
    }
  }

  /* -----------------------------------------------------------
     5. Animated stat counters
  ----------------------------------------------------------- */
  var counters = document.querySelectorAll(".stat-num[data-target]");
  if ("IntersectionObserver" in window && counters.length) {
    var counterIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute("data-target"), 10);
          var suffix = el.getAttribute("data-suffix") || "";
          var dur = 1400, start = null;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          counterIO.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) { counterIO.observe(c); });
  } else {
    counters.forEach(function (c) {
      c.textContent = c.getAttribute("data-target") + (c.getAttribute("data-suffix") || "");
    });
  }

  /* -----------------------------------------------------------
     6. Project cover media fallback
        Priority: real VIDEO (assets/*.mp4) > real IMAGE (assets/*.png)
        > animated holographic scene. Missing/broken files are
        ignored so the animated scene always remains as a fallback.
  ----------------------------------------------------------- */
  document.querySelectorAll(".project-cover").forEach(function (cover) {
    var video = cover.querySelector(".project-video");
    var img = cover.querySelector(".project-img");
    var scene = cover.querySelector(".holo-scene");

    function hideScene() { if (scene) scene.style.display = "none"; }

    // --- Video (preferred) ---
    if (video) {
      video.addEventListener("loadeddata", function () {
        if (video.readyState >= 2 && video.videoWidth > 0) {
          video.style.display = "block";
          if (img) img.style.display = "none";
          hideScene();
          video.play().catch(function () {});
        }
      });
      video.addEventListener("error", function () {
        video.style.display = "none"; // fall through to image/scene
      });
      // A <video> with only a missing source fires 'error' on the source,
      // so we also guard with a short check.
      try { video.load(); } catch (e) {}
    }

    // --- Image (fallback if no video) ---
    if (img) {
      function showImage() {
        // don't override a working video
        if (video && video.style.display === "block") return;
        if (img.complete && img.naturalWidth > 0) {
          img.style.display = "block";
          hideScene();
        }
      }
      img.addEventListener("load", showImage);
      img.addEventListener("error", function () { img.style.display = "none"; });
      showImage();
    }
  });

  /* -----------------------------------------------------------
     7. Active nav link highlight based on section in view
  ----------------------------------------------------------- */
  var sections = document.querySelectorAll("section[id]");
  var navMap = {};
  navLinks.querySelectorAll("a").forEach(function (a) {
    navMap[a.getAttribute("href").slice(1)] = a;
  });
  if ("IntersectionObserver" in window) {
    var navIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = navMap[entry.target.id];
          if (link && entry.isIntersecting) {
            navLinks.querySelectorAll("a").forEach(function (a) {
              a.style.color = "";
            });
            link.style.color = "var(--accent)";
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* -----------------------------------------------------------
     8. Lightweight background particles
  ----------------------------------------------------------- */
  var canvas = document.getElementById("bg-particles");
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    var count = Math.min(60, Math.floor(window.innerWidth / 24));
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 211, 238, 0.4)";
        ctx.fill();

        // connect nearby particles
        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(59, 130, 246, " + (0.14 * (1 - dist / 120)) + ")";
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* -----------------------------------------------------------
     9. Contact form -> opens email client via mailto
        (works on static hosting; no backend needed)
  ----------------------------------------------------------- */
  var CONTACT_EMAIL = "kpatil5912@gmail.com";
  var form = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cf-name").value.trim();
      var email = document.getElementById("cf-email").value.trim();
      var subject = document.getElementById("cf-subject").value.trim();
      var message = document.getElementById("cf-message").value.trim();

      if (!name || !email || !message) {
        showStatus("Please fill in your name, email, and message.", false);
        return;
      }
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        showStatus("Please enter a valid email address.", false);
        return;
      }

      var mailSubject = subject || ("Portfolio message from " + name);
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        message;

      var mailto =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(mailSubject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
      showStatus("Opening your email app… if nothing happens, email me at " + CONTACT_EMAIL, true);
      form.reset();
    });
  }

  function showStatus(msg, ok) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.style.color = ok ? "var(--accent)" : "#ff8080";
  }

  /* -----------------------------------------------------------
     10. Footer: current year
  ----------------------------------------------------------- */
  var footerYear = document.getElementById("footerYear");
  if (footerYear) footerYear.textContent = new Date().getFullYear();
})();
