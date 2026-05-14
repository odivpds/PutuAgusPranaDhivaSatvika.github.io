import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import agusPranaImg from '../assets/AgusPrana.jpg';

const Hero = () => {
  const { scrollY } = useScroll();
  // Image moves down at 50% speed of scroll for parallax
  const yImage = useTransform(scrollY, [0, 1000], [0, 500]);

  // Content fades out and moves slightly up
  const yContent = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityContent = useTransform(scrollY, [0, 600], [1, 0]);
  const blurContent = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(12px)"]);

  return (
    <header id="home" className="hero-section" style={{ position: 'relative', overflow: 'hidden', height: '100vh', backgroundColor: 'var(--primary)' }}>
      <div className="container h-100 position-relative" style={{ zIndex: 10 }}>
        <div className="row h-100 align-items-center">
          <motion.div
            className="col-lg-7 content-column"
            style={{ y: yContent, opacity: opacityContent, filter: blurContent }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h5 className="text-accent fw-bold mb-3">FULL STACK WEB DEVELOPER | IT ENTHUSIAST</h5>
            <h1 className="display-3 fw-800 text-white mb-4" style={{ fontWeight: 800 }}>Membangun Solusi Digital dengan Presisi.</h1>
            <p className="lead text-white mb-5 text-justify">Halo, saya Agus Prana. Berfokus pada pengembangan web menggunakan Laravel, ReactJS, dan NodeJS. Berkomitmen untuk menciptakan kode yang bersih dan fungsional.</p>
            <div className="d-flex gap-3">
              <a href="#projects" className="btn btn-accent px-4 py-2 fw-bold shadow">Lihat Project</a>
              <a href="#contact" className="btn btn-outline-light px-4 py-2 fw-bold">Hubungi Saya</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Parallax Background wrapped in framer-motion */}
      <motion.div
        className="hero-image-full d-lg-block"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          zIndex: 1,
          y: yImage
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="image-gradient-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '101%',
          height: '100%',
          zIndex: 2,
          background: 'linear-gradient(to right, var(--primary) 0%, var(--primary) 20%, transparent 100%)'
        }}></div>
        <img src={agusPranaImg} alt="Agus Prana" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      </motion.div>
    </header>
  );
};

export default Hero;
