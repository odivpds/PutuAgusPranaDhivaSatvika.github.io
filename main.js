/**
 * Agus Prana Portfolio - Main JavaScript
 * Consolidated & Clean Version
 */

document.addEventListener('DOMContentLoaded', function () {
  
  // === 1. NAVBAR & SCROLL BEHAVIOR ===
  const navbar = document.querySelector('.navbar');
  const offset = navbar?.offsetHeight || 72;

  // Efek ganti warna navbar saat scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  });

  // Smooth Scroll untuk navigasi anchor
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetId.length > 1 && targetElement) {
        e.preventDefault();
        const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset - 10;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });
      }
    });
  });

  // Tutup navbar mobile otomatis saat link diklik
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const menuToggle = document.getElementById('navbarNav');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) { // Hanya di tampilan mobile
        const bsCollapse = bootstrap.Collapse.getInstance(menuToggle);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });


  // === 2. ANIMASI REVEAL (INTERSECTION OBSERVER) ===
  // Menggunakan cara yang lebih modern dan ringan daripada scroll event biasa
  const reveals = document.querySelectorAll('.reveal');
  const revealOptions = { threshold: 0.15 };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Hanya animasi sekali
      }
    });
  }, revealOptions);

  reveals.forEach(el => revealObserver.observe(el));


  // === 3. CONTACT FORM HANDLER (AJAX) ===
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          alert('Terima kasih! Pesan Anda telah berhasil terkirim.');
          contactForm.reset();
        } else {
          alert('Oops! Terjadi kesalahan, silakan coba lagi nanti.');
        }
      })
      .catch(() => alert('Terjadi kesalahan koneksi.'))
      .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }


  // === 4. BACK TO TOP BUTTON (OPSIONAL) ===
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) backBtn.classList.add('show');
      else backBtn.classList.remove('show');
    });
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // === 5. PROJECT CAROUSEL LOGIC ===
  const track = document.getElementById('projectTrack');
  const slides = document.querySelectorAll('.project-slide');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtnMob = document.getElementById('nextBtnMob');
  const prevBtnMob = document.getElementById('prevBtnMob');

  let currentIndex = 0;
  let autoSlideInterval;

  function updateSlider() {
    const slideWidth = slides[0].getBoundingClientRect().width + 20; // width + gap
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function nextSlide() {
    const itemsPerView = window.innerWidth < 992 ? 1 : 2;
    const maxIndex = slides.length - itemsPerView;
    
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // Balik ke awal
    }
    updateSlider();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      const itemsPerView = window.innerWidth < 992 ? 1 : 2;
      currentIndex = slides.length - itemsPerView; // Balik ke akhir
    }
    updateSlider();
  }

  // Event Listeners Tombol
  if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
  if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
  if(nextBtnMob) nextBtnMob.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
  if(prevBtnMob) prevBtnMob.addEventListener('click', () => { prevSlide(); startAutoSlide(); });

  // Auto Slide
  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000); // Geser tiap 5 detik
  }

  // Berhenti auto slide saat mouse di atas slider
  if(track) {
      track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
      track.addEventListener('mouseleave', startAutoSlide);
  }

  // Inisialisasi
  if (slides.length > 0) {
    startAutoSlide();
    window.addEventListener('resize', updateSlider); // Jaga posisi saat layar di-resize
  }

  // Lightbox sederhana untuk gambar
  (function initLightbox() {
    const images = document.querySelectorAll('.lightbox-source');
    if (!images.length) return;

    // Buat overlay jika ada gambar lightbox
    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.innerHTML = `<div class="lb-content"><img src="" alt=""><span class="lb-close">&times;</span></div>`;
    document.body.appendChild(overlay);

    images.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        overlay.querySelector('img').src = img.src;
        overlay.classList.add('visible');
      });
    });

    overlay.addEventListener('click', () => overlay.classList.remove('visible'));
  })();

});