document.addEventListener('DOMContentLoaded', function () {
  const offset = document.querySelector('.navbar')?.offsetHeight || 72;
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        const top = document.querySelector(targetId).getBoundingClientRect().top + window.scrollY - offset - 10;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => ro.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('visible'));
  }

  const backBtn = document.getElementById('backToTop');
  function toggleBackBtn() {
    if (!backBtn) return;
    if (window.scrollY > 350) backBtn.style.display = 'flex'; else backBtn.style.display = 'none';
  }
  toggleBackBtn();
  window.addEventListener('scroll', toggleBackBtn);
  if (backBtn) backBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  const navCollapse = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
  navLinks.forEach(l => l.addEventListener('click', () => {
    if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
      const bs = bootstrap.Collapse.getOrCreateInstance(navCollapse);
      bs.hide();
    }
  }));

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      if (!contactForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }
      e.preventDefault();
      const name = contactForm.querySelector('[name="nama"]').value || 'Pengguna';
      alert('Terima kasih, ' + name + '. Pesan Anda telah diterima (demo).');
      contactForm.reset();
    });
  }

  const projectCards = document.querySelectorAll('.project-card');
  const projectModalEl = document.getElementById('projectModal');
  if (projectModalEl && projectCards.length) {
    const modal = new bootstrap.Modal(projectModalEl);
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title') || '';
        const desc = card.getAttribute('data-desc') || '';
        const img = card.getAttribute('data-img') || '';
        const label = projectModalEl.querySelector('#projectModalLabel');
        const imgEl = projectModalEl.querySelector('#projectModalImg');
        const descEl = projectModalEl.querySelector('#projectModalDesc');
        if (label) label.textContent = title;
        if (imgEl) { imgEl.src = img; imgEl.alt = title; }
        if (descEl) descEl.textContent = desc;
        modal.show();
      });
    });
  }

  const portfolioCarousel = document.getElementById('portfolioCarousel');
  if (portfolioCarousel) {
    portfolioCarousel.addEventListener('mouseenter', () => {
      const c = bootstrap.Carousel.getInstance(portfolioCarousel) || new bootstrap.Carousel(portfolioCarousel, { interval: 5000 });
      c.pause();
    });
    portfolioCarousel.addEventListener('mouseleave', () => {
      const c = bootstrap.Carousel.getInstance(portfolioCarousel) || new bootstrap.Carousel(portfolioCarousel, { interval: 5000 });
      c.cycle();
    });
  }

  (function () {
    const sources = Array.from(document.querySelectorAll('.lightbox-source'));
    if (!sources.length) return;

    const overlay = document.createElement('div'); overlay.className = 'lb-overlay';
    overlay.innerHTML = `
      <div class="lb-content">
        <button class="lb-close" aria-label="Close">&times;</button>
        <button class="lb-prev" aria-label="Previous">&#10094;</button>
        <img class="lb-img" src="" alt="">
        <button class="lb-next" aria-label="Next">&#10095;</button>
        <div class="lb-caption"></div>
      </div>`;
    document.body.appendChild(overlay);

    const imgEl = overlay.querySelector('.lb-img');
    const captionEl = overlay.querySelector('.lb-caption');
    const btnClose = overlay.querySelector('.lb-close');
    const btnPrev = overlay.querySelector('.lb-prev');
    const btnNext = overlay.querySelector('.lb-next');

    let currentIndex = 0;

    function showIndex(i) {
      currentIndex = (i + sources.length) % sources.length;
      const src = sources[currentIndex].getAttribute('src') || sources[currentIndex].dataset.src;
      const caption = sources[currentIndex].dataset.caption || sources[currentIndex].getAttribute('alt') || '';
      imgEl.src = src;
      imgEl.alt = caption || '';
      captionEl.textContent = caption;
      overlay.classList.add('visible');
    }

    function hide() { overlay.classList.remove('visible'); }

    sources.forEach((s, idx) => {
      s.style.cursor = 'zoom-in';
      s.addEventListener('click', function (e) {
        e.stopPropagation();
        showIndex(idx);
      });
    });

    btnClose.addEventListener('click', hide);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) hide(); });
    btnPrev.addEventListener('click', function (e) { e.stopPropagation(); showIndex(currentIndex - 1); });
    btnNext.addEventListener('click', function (e) { e.stopPropagation(); showIndex(currentIndex + 1); });

    window.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('visible')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') showIndex(currentIndex - 1);
      if (e.key === 'ArrowRight') showIndex(currentIndex + 1);
    });
  })();
});
