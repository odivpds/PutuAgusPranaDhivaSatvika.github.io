import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Business from './pages/Business';
import { useAudio } from './context/AudioContext';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const navbar = document.querySelector('.navbar');
          const offset = navbar ? navbar.offsetHeight : 72;
          window.scrollTo({
            top: element.offsetTop - offset - 10,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const AppContent = () => {
  const { startExperience, playClickSFX } = useAudio();
  const [experienceStarted, setExperienceStarted] = useState(
    sessionStorage.getItem('experience-started') === 'true'
  );

  useEffect(() => {
    if (experienceStarted) {
      document.body.classList.remove('locked');
    } else {
      document.body.classList.add('locked');
    }
  }, [experienceStarted]);

  useEffect(() => {
    // Add global click listener for SFX
    const handleClick = (e) => {
      const target = e.target.closest(
        'button, .btn, .nav-link, .pc-link, .ps-link-simple, ' +
        'a.btn-accent, a.btn-outline-accent, a.btn-outline-light, ' +
        '.btn-tab, .whatsapp-float, .navbar-brand'
      );
      if (target && target.id !== 'start-btn') {
        // We'll expose playClickSFX via context if needed, or window object
        // but for now let's just use window.playClickSFX injected by AudioContext if we wanted
        // Actually, it's better to just use the context directly on components.
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleStart = () => {
    startExperience();
    setExperienceStarted(true);
    sessionStorage.setItem('experience-started', 'true');
    document.body.classList.remove('locked');
  };

  return (
    <>
      <ScrollToTop />
      
      {!experienceStarted && (
        <div id="welcome-overlay" className="welcome-overlay">
          <div className="text-center">
            <h1 className="logo-text mb-4">AGUS <span className="text-accent">PRANA</span><span className="dot">.</span></h1>
            <div className="loader-line mb-4"></div>
            <button id="start-btn" className="btn-entrance" onClick={handleStart}>
              <span>ENTER EXPERIENCE</span>
            </button>
          </div>
        </div>
      )}

      {experienceStarted && (
        <div style={{ animation: 'fadeIn 1.5s ease-in-out' }}>
          <Navbar />
          <a href="https://wa.me/6282247250393?text=Halo%20Agus,%20saya%20melihat%20portfolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi." 
            className="whatsapp-float"  
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Hubungi saya di WhatsApp"
            onClick={() => playClickSFX()}>
            <i className="fab fa-whatsapp"></i>
            <span className="tooltip-text">Chat Saya</span>
          </a>
        </div>
      )}

      <div id="main-content" className={experienceStarted ? "reveal-site visible" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
