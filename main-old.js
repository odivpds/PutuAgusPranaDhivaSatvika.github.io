/**
 * Agus Prana Portfolio - Main JavaScript
 * Consolidated & Clean Version (Bug-Fixed)
 */
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function () {
  window.scrollTo(0, 0);

  const btnClickSFX = document.getElementById('btnClickSFX');
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const startBtn = document.getElementById('start-btn');
  const mainContent = document.getElementById('main-content');
  const bgMusic = document.getElementById('bgMusic');
  const swooshSFX = document.getElementById('swooshSFX');
  const musicToggle = document.getElementById('musicToggle');

  // ========== MUSIC HELPERS ==========

  /**
   * Fade in musik secara halus ke target volume.
   * @param {number} targetVol - Volume target (default 0.2)
   */
  function fadeInMusic(targetVol = 0.2) {
    if (!bgMusic) return;
    let vol = 0;
    bgMusic.volume = 0;
    const fadeIn = setInterval(() => {
      vol += 0.02;
      if (vol >= targetVol) {
        vol = targetVol; // Clamp agar tidak melebihi target (fix floating point)
        bgMusic.volume = vol;
        clearInterval(fadeIn);
      } else {
        bgMusic.volume = vol;
      }
    }, 150);
  }

  /**
   * Fade out musik secara halus lalu pause.
   */
  function fadeOutMusic() {
    if (!bgMusic) return;
    let vol = bgMusic.volume;
    const fadeOut = setInterval(() => {
      vol -= 0.02;
      if (vol <= 0) {
        vol = 0;
        bgMusic.volume = 0;
        bgMusic.pause();
        clearInterval(fadeOut);
      } else {
        bgMusic.volume = vol;
      }
    }, 100);
  }

  /**
   * Play SFX dengan safety (null-check + catch autoplay policy)
   */
  function playSFX(audioEl, volume = 0.4) {
    if (!audioEl) return;
    audioEl.currentTime = 0;
    audioEl.volume = volume;
    audioEl.play().catch(() => {});
  }

  /**
   * Update UI tombol music toggle sesuai state playing/paused.
   */
  function updateMusicUI(isPlaying) {
    if (!musicToggle) return;
    const icon = musicToggle.querySelector('i');
    const statusText = musicToggle.querySelector('.music-status');

    if (isPlaying) {
      musicToggle.classList.add('music-playing');
      if (icon) {
        icon.classList.remove('fa-volume-mute', 'fa-volume-off', 'fa-volume-xmark');
        icon.classList.add('fa-volume-up');
      }
      if (statusText) statusText.textContent = "ON";
    } else {
      musicToggle.classList.remove('music-playing');
      if (icon) {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
      }
      if (statusText) statusText.textContent = "OFF";
    }
  }

  /**
   * Lanjutkan musik dari posisi yang tersimpan di localStorage.
   * Digunakan saat navigasi antar halaman.
   */
  function playMusicFromStorage() {
    if (!bgMusic) return;

    const savedTime = localStorage.getItem('musicCurrentTime');
    const wasPlaying = localStorage.getItem('musicWasPlaying');

    if (wasPlaying === 'true') {
      const parsedTime = parseFloat(savedTime);
      if (!isNaN(parsedTime) && parsedTime > 0) {
        bgMusic.currentTime = parsedTime;
      }
      bgMusic.volume = 0;

      bgMusic.play().then(() => {
        updateMusicUI(true);
        fadeInMusic();
      }).catch(() => {
        console.log("Menunggu interaksi user untuk melanjutkan musik...");
        
        const resumeAction = () => {
          if (bgMusic.paused && localStorage.getItem('musicWasPlaying') === 'true') {
            bgMusic.play().then(() => {
              updateMusicUI(true);
              fadeInMusic();
              document.removeEventListener('click', resumeAction);
              document.removeEventListener('scroll', resumeAction);
              document.removeEventListener('touchstart', resumeAction);
            }).catch(() => {});
          }
        };

        document.addEventListener('click', resumeAction);
        document.addEventListener('scroll', resumeAction);
        document.addEventListener('touchstart', resumeAction);
      });
    }
  }

  /**
   * Play musik dari awal (pertama kali klik Enter Experience).
   */
  function playMusicFresh() {
    if (!bgMusic) return;
    bgMusic.currentTime = 0;
    bgMusic.volume = 0;

    bgMusic.play().then(() => {
      updateMusicUI(true);
      fadeInMusic();
    }).catch(() => {
      console.log("Menunggu interaksi user untuk memulai musik...");

      const startAction = () => {
        if (bgMusic.paused && localStorage.getItem('musicWasPlaying') === 'true') {
          bgMusic.play().then(() => {
            updateMusicUI(true);
            fadeInMusic();
            document.removeEventListener('click', startAction);
            document.removeEventListener('scroll', startAction);
            document.removeEventListener('touchstart', startAction);
          }).catch(() => {});
        }
      };

      document.addEventListener('click', startAction);
      document.addEventListener('scroll', startAction);
      document.addEventListener('touchstart', startAction);
    });
  }

  // ========== INITIALIZATION ==========

  if (sessionStorage.getItem('experience-started')) {
    // Sudah pernah "Enter Experience" — hapus overlay, lanjutkan musik
    if (welcomeOverlay) welcomeOverlay.remove();
    
    playMusicFromStorage(); 

    if (mainContent) {
      mainContent.style.transition = 'none';
      mainContent.classList.add('reveal-site');
    }
    window.scrollTo(0, 0);
    document.body.classList.remove('locked');

    setTimeout(() => {
      if (mainContent) mainContent.style.transition = '';
    }, 100);
  } else {
    document.body.classList.add('locked');
  }

  // ========== CLICK SFX GLOBAL ==========
  // Menangkap SEMUA klik pada elemen interaktif di seluruh website

  document.addEventListener('click', function(e) {
    const target = e.target.closest(
      'button, .btn, .nav-link, .pc-link, .ps-link-simple, ' +
      'a.btn-accent, a.btn-outline-accent, a.btn-outline-light, ' +
      '.btn-tab, .whatsapp-float, .navbar-brand'
    );
    
    // Exclude start-btn karena punya SFX sendiri (swoosh)
    if (target && target !== startBtn) {
      playSFX(btnClickSFX, 0.4);
    }
  });

  // ========== START BUTTON (Enter Experience) ==========

  if (startBtn) {
    startBtn.addEventListener('click', function() {
        // Play swoosh SFX
        playSFX(swooshSFX, 0.6);

        setTimeout(() => {
          sessionStorage.setItem('experience-started', 'true');
            if (welcomeOverlay) welcomeOverlay.classList.add('exit');
            if (mainContent) mainContent.classList.add('reveal-site');
            document.body.classList.remove('locked');

            // Mulai musik dari awal (bukan dari storage)
            if (bgMusic) {
                localStorage.setItem('musicWasPlaying', 'true');
                playMusicFresh();
            }
        }, 150);

        setTimeout(() => {
            if (welcomeOverlay) welcomeOverlay.remove();
        }, 2000);
    });
  }

  // ========== MUSIC TOGGLE ==========

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.volume = 0;
            bgMusic.play().then(() => {
              updateMusicUI(true);
              fadeInMusic();
            }).catch(() => {});
            localStorage.setItem('musicWasPlaying', 'true');
        } else {
            fadeOutMusic();
            localStorage.setItem('musicWasPlaying', 'false');
            updateMusicUI(false);
        }
    });
  }

  // ========== THEME TOGGLE ==========

  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) icon.className = 'fas fa-sun';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      const icon = themeToggle.querySelector('i');
      if (icon) icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    });
  }

  // ========== NAVBAR SCROLL EFFECT ==========

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) navbar.classList.add('nav-scrolled');
      else navbar.classList.remove('nav-scrolled');
    });
  }

  // ========== SMOOTH SCROLL ==========

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetId.length > 1 && targetEl) {
        e.preventDefault();
        const offset = (navbar ? navbar.offsetHeight : 72) || 72;
        window.scrollTo({
          top: targetEl.offsetTop - offset - 10,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== REVEAL ON SCROLL ==========

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // ========== PRICING TABS ==========

  const tabButtons = document.querySelectorAll('.btn-tab');
  const grids = document.querySelectorAll('.pricing-grid');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      grids.forEach(grid => {
        if (grid.id === targetId) {
          grid.classList.remove('d-none');
          
          const revealElements = grid.querySelectorAll('.reveal');
          revealElements.forEach(el => {
            setTimeout(() => {
              el.classList.add('visible');
            }, 100);
          });
        } else {
          grid.classList.add('d-none');
        }
      });
    });
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ========== CONTACT FORM ==========

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      playSFX(btnClickSFX, 0.4);
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      if (!btn) return;
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
      }).catch(() => {
        alert('Terjadi kesalahan jaringan.');
      }).finally(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      });
    });
  }

  // ========== MUSIC PERSISTENCE ==========

  if (bgMusic) {
    bgMusic.addEventListener('timeupdate', () => {
      if (!bgMusic.paused) {
        localStorage.setItem('musicCurrentTime', bgMusic.currentTime);
      }
    });
  }

  window.addEventListener('beforeunload', () => {
    if (bgMusic && !bgMusic.paused) {
      localStorage.setItem('musicCurrentTime', bgMusic.currentTime);
      localStorage.setItem('musicWasPlaying', 'true');
    }
  });

  setInterval(() => {
    if (bgMusic && !bgMusic.paused) {
      localStorage.setItem('musicCurrentTime', bgMusic.currentTime);
    }
  }, 1000);

});