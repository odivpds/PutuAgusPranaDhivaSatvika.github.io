import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import agusPranaImg from '../assets/AgusPrana.jpg';

const Hero = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Image moves down at 50% speed of scroll for parallax on desktop
  const yImage = useTransform(scrollY, [0, 1000], [0, 500]);
  // Image moves sideways for parallax on mobile
  const xImage = useTransform(scrollY, [0, 1000], [0, 150]);

  // Content fades out and moves slightly up (disabled via inline styles in JSX)
  const yContent = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityContent = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <header id="home" className="hero-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', backgroundColor: 'var(--nb-bg)' }}>
      <div className="container h-100 position-relative pt-5 pt-lg-0" style={{ zIndex: 10 }}>
        <div className="row h-100 align-items-center flex-column-reverse flex-lg-row text-center text-lg-start mt-5 mt-lg-0">
          <motion.div
            className="col-lg-7 content-column mb-5 mb-lg-0"
          >
            <motion.div
              initial={{ y: 80, opacity: 0, rotate: -2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 18, delay: 0.1 }}
            >
              <h5 className="text-accent fw-bold mb-3 mt-5 mt-lg-0" style={{ letterSpacing: '1px' }}>FULL STACK WEB DEVELOPER</h5>
              <h1 className="display-5 display-lg-3 text-nb-dark mb-4" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px' }}>Membangun Solusi Digital dengan Presisi.</h1>
              <p className="lead text-nb-muted mb-5 px-2 px-lg-0" style={{ fontWeight: 500 }}>Halo, saya Agus Prana. Berfokus pada pengembangan web menggunakan Laravel, ReactJS, dan NodeJS. Berkomitmen untuk menciptakan kode yang bersih dan fungsional.</p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
                <a href="#projects" className="btn btn-accent px-4 py-3 fw-bold w-sm-100">Lihat Project</a>
                <a href="#contact" className="btn btn-outline-accent px-4 py-3 fw-bold bg-white w-sm-100">Hubungi Saya</a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="col-lg-5"
            style={{ 
              y: isMobile ? 0 : yImage,
              x: isMobile ? xImage : 0
            }}
          >
            <motion.div
              initial={{ x: 100, y: 50, opacity: 0, rotate: 15, scale: 0.5 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 5, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
              whileHover={{ rotate: 0, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
              className="mt-0 mt-lg-0"
            >
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: 'clamp(220px, 60vw, 350px)',
                margin: '0 auto',
                marginBottom: '2rem'
              }}>
                {/* Decorative Tape */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(-5deg)',
                  width: '100px',
                  height: '35px',
                  background: 'rgba(255,255,255,0.8)',
                  border: 'var(--nb-border-sm)',
                  boxShadow: 'var(--nb-shadow)',
                  zIndex: 2
                }}></div>

                {/* Polaroid Frame */}
                <div style={{
                  border: 'var(--nb-border)',
                  boxShadow: '10px 10px 0px var(--nb-accent)',
                  borderRadius: '0',
                  overflow: 'hidden',
                  aspectRatio: '1',
                  background: '#fff',
                  padding: '15px 15px 40px 15px',
                  position: 'relative'
                }}>
                  <img src={agusPranaImg} alt="Agus Prana" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'contrast(1.1) saturate(1.1)', border: 'var(--nb-border-sm)' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
