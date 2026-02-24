/**
 * Agus Prana Portfolio - Main JavaScript
 * Consolidated & Clean Version
 */

document.addEventListener('DOMContentLoaded', function () {

  // === 0. THEME TOGGLE (Moon/Sun) ===
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // === 1. NAVBAR SCROLL EFFECT ===
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('nav-scrolled');
    else navbar.classList.remove('nav-scrolled');
  });

  // === 2. SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetId.length > 1 && targetEl) {
        e.preventDefault();
        const offset = navbar.offsetHeight || 72;
        window.scrollTo({
          top: targetEl.offsetTop - offset - 10,
          behavior: 'smooth'
        });
      }
    });
  });

  // === 3. REVEAL ANIMATION ===
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // === 4. CONTACT FORM (AJAX) ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      btn.disabled = true;

      fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      }).then(res => {
        if (res.ok) {
          alert('Pesan terkirim!');
          this.reset();
        } else alert('Gagal mengirim.');
      }).finally(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      });
    });
  }
});