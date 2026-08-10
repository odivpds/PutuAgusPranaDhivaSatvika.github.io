import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isMusicPlaying, toggleMusic, playClickSFX } = useAudio();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="container">
          <Link className="navbar-brand fw-bold text-nb-dark" to="/" onClick={() => playClickSFX()}>
            <span className="text-accent">AGUS</span>PRANA
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {isHome ? <a className="nav-link text-nb-dark" href="#home" onClick={(e) => handleScrollTo(e, 'home')}>Home</a> : <Link className="nav-link text-nb-dark" to="/#home" onClick={() => playClickSFX()}>Home</Link>}
              </li>
              <li className="nav-item">
                {isHome ? <a className="nav-link text-nb-dark" href="#about" onClick={(e) => handleScrollTo(e, 'about')}>About</a> : <Link className="nav-link text-nb-dark" to="/#about" onClick={() => playClickSFX()}>About</Link>}
              </li>
              <li className="nav-item">
                <Link className="nav-link text-nb-dark" to="/business" onClick={() => playClickSFX()}>Business</Link>
              </li>
              <li className="nav-item">
                {isHome ? <a className="nav-link text-nb-dark" href="#projects" onClick={(e) => handleScrollTo(e, 'projects')}>Projects</a> : <Link className="nav-link text-nb-dark" to="/#projects" onClick={() => playClickSFX()}>Projects</Link>}
              </li>
              <li className="nav-item">
                {isHome ? <a className="nav-link text-nb-dark" href="#contact" onClick={(e) => handleScrollTo(e, 'contact')}>Contact</a> : <Link className="nav-link text-nb-dark" to="/#contact" onClick={() => playClickSFX()}>Contact</Link>}
              </li>
              <li className="nav-item">
                <a className="nav-link text-nb-dark" href="https://drive.google.com/drive/folders/1Gyw3-Gotec8eDSgS2hvTS1I_m2DBsFZ5?usp=sharing" target="_blank" rel="noreferrer" onClick={() => playClickSFX()}>Portofolio</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
