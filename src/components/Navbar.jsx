import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [kebabOpen, setKebabOpen] = useState(false);
  const { isMusicPlaying, toggleMusic, playClickSFX } = useAudio();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const kebabRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close kebab on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target)) {
        setKebabOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHome = location.pathname === '/';

  const closeNavbar = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.click();
    }
  };

  const handleScrollTo = (e, id) => {
    playClickSFX();
    closeNavbar();
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const navbar = document.querySelector('.navbar');
        const offset = navbar ? navbar.offsetHeight : 72;
        window.scrollTo({
          top: element.offsetTop - offset - 10,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  const handleThemeToggle = () => {
    playClickSFX();
    toggleTheme();
    setKebabOpen(false);
  };

  return (
    <>
      <button 
        id="musicToggle" 
        className={`music-float ${isMusicPlaying ? 'music-playing' : ''}`} 
        aria-label="Toggle Music"
        onClick={() => { playClickSFX(); toggleMusic(); }}
      >
        <i className={`fas ${isMusicPlaying ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
        <span className="music-status">{isMusicPlaying ? 'ON' : 'OFF'}</span>
      </button>

      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/" onClick={() => { playClickSFX(); closeNavbar(); }}>
            <span className="text-accent">AGUS</span>PRANA
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {isHome ? <a className="nav-link" href="#home" onClick={(e) => handleScrollTo(e, 'home')}>Home</a> : <Link className="nav-link" to="/#home" onClick={() => { playClickSFX(); closeNavbar(); }}>Home</Link>}
              </li>
              <li className="nav-item">
                {isHome ? <a className="nav-link" href="#about" onClick={(e) => handleScrollTo(e, 'about')}>About</a> : <Link className="nav-link" to="/#about" onClick={() => { playClickSFX(); closeNavbar(); }}>About</Link>}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business" onClick={() => { playClickSFX(); closeNavbar(); }}>Business</Link>
              </li>
              <li className="nav-item">
                {isHome ? <a className="nav-link" href="#projects" onClick={(e) => handleScrollTo(e, 'projects')}>Projects</a> : <Link className="nav-link" to="/#projects" onClick={() => { playClickSFX(); closeNavbar(); }}>Projects</Link>}
              </li>
              <li className="nav-item">
                {isHome ? <a className="nav-link" href="#contact" onClick={(e) => handleScrollTo(e, 'contact')}>Contact</a> : <Link className="nav-link" to="/#contact" onClick={() => { playClickSFX(); closeNavbar(); }}>Contact</Link>}
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://drive.google.com/drive/folders/1Gyw3-Gotec8eDSgS2hvTS1I_m2DBsFZ5?usp=sharing" target="_blank" rel="noreferrer" onClick={() => { playClickSFX(); closeNavbar(); }}>Portofolio</a>
              </li>
              <li className="nav-item d-lg-none mt-2">
                <button 
                  className="nav-link btn btn-link text-start w-100 fw-bold" 
                  onClick={(e) => { e.preventDefault(); handleThemeToggle(); closeNavbar(); }} 
                  style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                >
                  <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} me-2`}></i>
                  {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
              </li>
            </ul>
          </div>

          {/* Kebab Menu (Three Dots) - Desktop Only */}
          <div className="kebab-menu d-none d-lg-block" ref={kebabRef}>
            <button 
              className="kebab-btn"
              onClick={() => { playClickSFX(); setKebabOpen(!kebabOpen); }}
              aria-label="Menu options"
            >
              <span className="kebab-dot"></span>
              <span className="kebab-dot"></span>
              <span className="kebab-dot"></span>
            </button>

            {kebabOpen && (
              <div className="kebab-dropdown">
                <button className="kebab-dropdown-item" onClick={handleThemeToggle}>
                  <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
