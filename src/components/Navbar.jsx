import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isMusicPlaying, toggleMusic, playClickSFX } = useAudio();
  const location = useLocation();

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    playClickSFX();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isHome = location.pathname === '/';

  const handleScrollTo = (e, id) => {
    playClickSFX();
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

      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/" onClick={() => playClickSFX()}>
            <span className="text-accent">AGUS</span>PRANA
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {isHome ? <a className="nav-link" href="#home" onClick={(e) => handleScrollTo(e, 'home')}>Home</a> : <Link className="nav-link" to="/#home" onClick={() => playClickSFX()}>Home</Link>}
              </li>
              <li className="nav-item">
                {isHome ? <a className="nav-link" href="#about" onClick={(e) => handleScrollTo(e, 'about')}>About</a> : <Link className="nav-link" to="/#about" onClick={() => playClickSFX()}>About</Link>}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business" onClick={() => playClickSFX()}>Business</Link>
              </li>
              <li className="nav-item">
                {isHome ? <a className="nav-link" href="#projects" onClick={(e) => handleScrollTo(e, 'projects')}>Projects</a> : <Link className="nav-link" to="/#projects" onClick={() => playClickSFX()}>Projects</Link>}
              </li>
              <li className="nav-item">
                {isHome ? <a className="nav-link" href="#contact" onClick={(e) => handleScrollTo(e, 'contact')}>Contact</a> : <Link className="nav-link" to="/#contact" onClick={() => playClickSFX()}>Contact</Link>}
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://drive.google.com/drive/folders/1Gyw3-Gotec8eDSgS2hvTS1I_m2DBsFZ5?usp=sharing" target="_blank" rel="noreferrer" onClick={() => playClickSFX()}>Portofolio</a>
              </li>
              <li className="nav-item d-flex align-items-center">
                <button id="themeToggle" className="btn btn-link nav-link" aria-label="Toggle dark/light mode" onClick={toggleTheme} title="Toggle Theme">
                  <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
