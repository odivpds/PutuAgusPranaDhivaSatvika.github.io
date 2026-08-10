import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Business from './pages/Business';
import { useAudio } from './context/AudioContext';
import LottieModule from 'lottie-react';
const Lottie = LottieModule.default || LottieModule;

import computerAnimation from './context/computer.json';
import starAnimation from './context/star.json';

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
  // splashStep: 0 = Splash, 1 = Slide Up, 2 = Open Doors, 3 = Done
  const [splashStep, setSplashStep] = useState(
    sessionStorage.getItem('experience-started') === 'true' ? 3 : 0
  );
  const experienceStarted = splashStep === 3;

  useEffect(() => {
    if (experienceStarted) {
      document.body.classList.remove('locked');
      sessionStorage.setItem('experience-started', 'true');
    } else {
      document.body.classList.add('locked');
    }
  }, [experienceStarted]);

  useEffect(() => {
    let timer;
    if (splashStep === 1) {
      // Tunggu pintu naik (0.8s) + Teks muncul (0.5s) + Baca (0.8s)
      timer = setTimeout(() => {
        setSplashStep(2);
      }, 2100);
    } else if (splashStep === 2) {
      // Tunggu pintu terbuka (1s)
      timer = setTimeout(() => {
        setSplashStep(3);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [splashStep]);

  useEffect(() => {
    // Add global click listener for SFX
    const handleClick = (e) => {
      const target = e.target.closest(
        'button, .btn, .nav-link, .pc-link, .ps-link-simple, ' +
        'a.btn-accent, a.btn-outline-accent, a.btn-outline-light, ' +
        '.btn-tab, .whatsapp-float, .navbar-brand'
      );
      if (target && target.id !== 'start-btn') {
        // playClickSFX is available via context
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleStart = () => {
    startExperience();
    setSplashStep(1);
  };

  return (
    <>
      <ScrollToTop />
      
      <AnimatePresence>
        {splashStep === 0 && (
          <motion.div 
            key="splash"
            exit={{ y: '-100vh' }}
            transition={{ duration: 0.8, ease: "anticipate" }} 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'var(--nb-yellow)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              borderBottom: 'var(--nb-border)'
            }}
          >
            {/* Decorative Lottie Animations */}
            <motion.div 
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 10 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              style={{ position: 'absolute', top: '15%', left: '15%', width: '150px' }}
            >
              <Lottie animationData={starAnimation} loop={true} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0, rotate: 45 }}
              animate={{ opacity: 1, scale: 1, rotate: -10 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              style={{ position: 'absolute', bottom: '15%', right: '15%', width: '180px' }}
            >
              <Lottie animationData={computerAnimation} loop={true} />
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: -3 }}
              transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 }}
              style={{
                background: '#ffffff',
                border: 'var(--nb-border)',
                boxShadow: 'var(--nb-shadow-lg)',
                padding: '2rem 4rem',
                textAlign: 'center',
                marginBottom: '3rem'
              }}
            >
              <h1 className="display-4 fw-bold text-nb-dark mb-0" style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>Agus Prana</h1>
              <p className="text-nb-dark fw-bold mt-2 mb-0" style={{ fontSize: '1.2rem' }}>PORTFOLIO EXPERIENCE</p>
            </motion.div>
            
            <motion.button 
              id="start-btn"
              className="btn btn-accent px-5 py-3 fw-bold"
              style={{ fontSize: '1.2rem', boxShadow: 'var(--nb-shadow-lg)', borderRadius: '8px' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              onClick={handleStart}
              whileHover={{ scale: 1.05, rotate: 2, backgroundColor: '#ffffff', color: 'var(--nb-dark)' }}
              whileTap={{ scale: 0.95 }}
            >
              ENTER NOW <i className="fas fa-arrow-right ms-2"></i>
            </motion.button>
          </motion.div>
        )}

        {(splashStep === 1 || splashStep === 2) && (
          <motion.div 
            key="welcome-sequence"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              pointerEvents: 'none'
            }}
          >
            {/* Left Door */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ 
                x: splashStep === 2 ? '-50vw' : 0 
              }}
              transition={{ 
                x: { duration: 1, ease: "easeInOut" }
              }}
              style={{
                width: '50vw',
                height: '100vh',
                backgroundColor: 'var(--nb-dark)'
              }}
            />
            {/* Right Door */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ 
                x: splashStep === 2 ? '50vw' : 0 
              }}
              transition={{ 
                x: { duration: 1, ease: "easeInOut" }
              }}
              style={{
                width: '50vw',
                height: '100vh',
                backgroundColor: 'var(--nb-dark)'
              }}
            />
            {/* WELCOME Text */}
            <motion.h1
              initial={{ opacity: 0, scale: 3, rotate: -15, x: '-50%', y: '-50%' }}
              animate={{ 
                opacity: splashStep === 1 ? 1 : 0, 
                scale: splashStep === 1 ? 1 : 1.5,
                rotate: splashStep === 1 ? -3 : 5,
                x: '-50%', y: '-50%' 
              }}
              transition={{ 
                opacity: { delay: splashStep === 1 ? 0.4 : 0, duration: splashStep === 1 ? 0.2 : 0.3 },
                scale: { delay: splashStep === 1 ? 0.4 : 0, type: 'spring', stiffness: 300, damping: 12 },
                rotate: { delay: splashStep === 1 ? 0.4 : 0, type: 'spring', stiffness: 250, damping: 10 }
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                color: '#ffffff',
                fontSize: 'clamp(3rem, 10vw, 5rem)',
                fontWeight: 900,
                letterSpacing: 'clamp(2px, 2vw, 8px)',
                zIndex: 10000,
                textShadow: '4px 4px 0px var(--nb-accent)'
              }}
            >
              WELCOME
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {experienceStarted && (
        <div>
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

      {experienceStarted && (
        <div id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/business" element={<Business />} />
          </Routes>
          <Footer />
        </div>
      )}
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
