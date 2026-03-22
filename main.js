/**
 * Agus Prana Portfolio - Main JavaScript
 * Consolidated & Clean Version
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

  function playMusicFromStorage() {
    if (!bgMusic) return;

    const savedTime = localStorage.getItem('musicCurrentTime');
    const wasPlaying = localStorage.getItem('musicWasPlaying');

    if (wasPlaying === 'true') {
      if (savedTime) bgMusic.currentTime = parseFloat(savedTime);
      bgMusic.volume = 0;

      bgMusic.play().then(() => {
        updateMusicUI(true);
        fadeInMusic();
      }).catch(() => {
        console.log("Menunggu klik user untuk melanjutkan musik...");
        
        const resumeAction = () => {
          if (bgMusic.paused && localStorage.getItem('musicWasPlaying') === 'true') {
            bgMusic.play().then(() => {
              updateMusicUI(true);
              fadeInMusic();
              document.removeEventListener('click', resumeAction);
              document.removeEventListener('scroll', resumeAction);
              document.removeEventListener('touchstart', resumeAction);
            });
          }
        };

        document.addEventListener('click', resumeAction);
        document.addEventListener('scroll', resumeAction);
        document.addEventListener('touchstart', resumeAction);
      });
    }
  }

  function fadeInMusic() {
    let vol = 0;
    bgMusic.volume = 0;
    const fadeIn = setInterval(() => {
      if (vol < 0.2) {
        vol += 0.02;
        bgMusic.volume = vol;
      } else {
        clearInterval(fadeIn);
      }
    }, 150);
  }

  if (sessionStorage.getItem('experience-started')) {
    if (welcomeOverlay) welcomeOverlay.remove();
    
    playMusicFromStorage(); 

    mainContent.style.transition = 'none';
    mainContent.classList.add('reveal-site');
    window.scrollTo(0, 0);
    document.body.classList.remove('locked');

    setTimeout(() => {
      mainContent.style.transition = '';
    }, 100);
  } else {
    document.body.classList.add('locked');
  }

  document.addEventListener('click', function(e) {
    const target = e.target.closest('button, .btn, .nav-link, .pc-link, .ps-link-simple');
    
    if (target && target !== startBtn && btnClickSFX) {
      btnClickSFX.currentTime = 0;
      btnClickSFX.volume = 0.4;
      btnClickSFX.play().catch(() => {}); 
    }
  });

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

  if (startBtn) {
    startBtn.addEventListener('click', function() {
        if(swooshSFX) {
          swooshSFX.volume = 0.6;
          swooshSFX.play().catch(() => {});
        }

        setTimeout(() => {
          sessionStorage.setItem('experience-started', 'true');
            if (welcomeOverlay) welcomeOverlay.classList.add('exit');
            if (mainContent) mainContent.classList.add('reveal-site');
            document.body.classList.remove('locked');

            if(bgMusic) {
                localStorage.setItem('musicWasPlaying', 'true');
                playMusicFromStorage();
            }
        }, 150);

        setTimeout(() => {
            if (welcomeOverlay) welcomeOverlay.remove();
        }, 2000);
    });
  }

  if(musicToggle) {
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            localStorage.setItem('musicWasPlaying', 'true');
            updateMusicUI(true);
        } else {
            bgMusic.pause();
            localStorage.setItem('musicWasPlaying', 'false');
            updateMusicUI(false);
        }
    });
  }

  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.querySelector('i').className = 'fas fa-sun';
  }
  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    // Hanya ganti class icon saja
    themeToggle.querySelector('i').className = isLight ? 'fas fa-sun' : 'fas fa-moon';
  });

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('nav-scrolled');
    else navbar.classList.remove('nav-scrolled');
  });

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

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

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

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      btnClickSFX.play();
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