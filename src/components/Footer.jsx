import React from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';

const Footer = () => {
  const { playClickSFX } = useAudio();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 g-lg-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <Link to="/" className="footer-logo" onClick={() => playClickSFX()}><span className="text-accent">AGUS</span>PRANA<span className="footer-dot">.</span></Link>
              <p className="footer-tagline">Full Stack Web Developer berfokus pada solusi digital yang presisi, bersih, dan fungsional.</p>
              <div className="footer-socials">
                <a href="https://github.com/odivpds" target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => playClickSFX()}><i className="fab fa-github"></i></a>
                <a href="https://wa.me/6282247250393" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" onClick={() => playClickSFX()}><i className="fab fa-whatsapp"></i></a>
                <a href="mailto:agusprana31@gmail.com" aria-label="Email" onClick={() => playClickSFX()}><i className="fas fa-envelope"></i></a>
                <a href="https://drive.google.com/drive/folders/1Gyw3-Gotec8eDSgS2hvTS1I_m2DBsFZ5?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="Portfolio" onClick={() => playClickSFX()}><i className="fas fa-folder-open"></i></a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-heading">Navigasi</h6>
            <ul className="footer-links">
              <li><Link to="/" onClick={() => playClickSFX()}>Home</Link></li>
              <li><Link to="/#about" onClick={() => playClickSFX()}>About</Link></li>
              <li><Link to="/#projects" onClick={() => playClickSFX()}>Projects</Link></li>
              <li><Link to="/#contact" onClick={() => playClickSFX()}>Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="footer-heading">Layanan</h6>
            <ul className="footer-links">
              <li><Link to="/business" onClick={() => playClickSFX()}>Landing Page</Link></li>
              <li><Link to="/business" onClick={() => playClickSFX()}>Company Profile</Link></li>
              <li><Link to="/business" onClick={() => playClickSFX()}>Web Toko Online</Link></li>
              <li><Link to="/business" onClick={() => playClickSFX()}>Web Travel & Tour</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Kontak</h6>
            <ul className="footer-contact list-unstyled">
              <li className="mb-2">
                <i className="fas fa-envelope me-2"></i>
                <a href="mailto:agusprana31@gmail.com">agusprana31@gmail.com</a>
              </li>
              <li className="mb-2">
                <i className="fab fa-whatsapp me-2"></i>
                <a href="https://wa.me/6282247250393" target="_blank" rel="noopener noreferrer">+62 822 4725 0393</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt me-2"></i>
                <span>Bali, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner d-flex justify-content-between align-items-center flex-wrap">
            <p className="footer-copyright mb-0">&copy; 2025 Putu Agus Prana Dhiva Satvika. All Rights Reserved.</p>
            <p className="footer-credit mb-0 mt-2 mt-md-0">Hand-Crafted with <i className="fas fa-heart text-danger"></i> in Bali</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
