/* ============================================================
   portfolio.js  —  Purvik Prajapati Personal Portfolio
   ============================================================ */

/* Loader */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('done');
  }, 900);
});

/* Custom Cursor */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
})();

/* Navbar & Mobile Menu */
(function initNavbar() {
  const navbar       = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks     = document.getElementById('navLinks');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
})();

/* Scroll Spy Active Nav Links */
(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  function updateActiveLink() {
    let current = '';
    const scrollPos = window.scrollY;
    const windowH   = window.innerHeight;
    const docH      = document.documentElement.scrollHeight;

    if (scrollPos + windowH >= docH - 60) {
      current = 'contact';
    } else {
      sections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          current = sec.getAttribute('id');
        }
      });
    }

    links.forEach((a) => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

/* Skill Bars Filler */
(function initSkillBars() {
  const boxes = document.querySelectorAll('.skill-box');
  if (!boxes.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sk-fill').forEach((bar) => {
          bar.style.width = (bar.dataset.width || '0') + '%';
        });
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  boxes.forEach((b) => observer.observe(b));
})();

/* Hire Me Modal */
(function initModal() {
  const modal       = document.getElementById('hireModal');
  const openBtns    = document.querySelectorAll('#navHireBtn, #heroContactModal');
  const closeBtn   = document.getElementById('modalCloseBtn');
  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
})();

/* Contact Form */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('sendMessageBtn');
  if (!form || !btn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const originalText = btn.textContent;
    const name    = document.getElementById('contactName')?.value || '';
    const email   = document.getElementById('contactEmail')?.value || '';
    const message = document.getElementById('contactMessage')?.value || '';

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      // 1. Try sending to backend API
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: name, email: email, message: message })
      });

      if (res.ok) {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#22c55e';
        form.reset();
      } else {
        throw new Error('API unavailable');
      }
    } catch (err) {
      // 2. Fallback: Launch mailto email client
      const mailtoUrl = `mailto:sumritprajapati@gmail.com?subject=${encodeURIComponent('Inquiry from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
      window.location.href = mailtoUrl;

      btn.textContent = '✓ Opening Mail App...';
      btn.style.background = '#22c55e';
      form.reset();
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
})();
