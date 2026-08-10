import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5, scale: 0.9 },
    visible: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } }
  };

  return (
    <>
      <section id="about" className="py-5 bg-darker" style={{ borderTop: 'var(--nb-border)', borderBottom: 'var(--nb-border)' }}>
        <div className="container">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h6 className="text-accent fw-bold uppercase" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>MAIN TECH STACK</h6>
            <h4 className="text-nb-dark fw-bold h5">Teknologi & Bahasa Pemrograman</h4>
          </motion.div>
          <div className="marquee-wrapper" style={{ maskImage: 'none', WebkitMaskImage: 'none' }}>
            <div className="marquee-track">
              {/* Repeated for marquee effect */}
              {[...Array(3)].map((_, i) => (
                <React.Fragment key={i}>
                  <motion.div className="marquee-item" whileHover={{ scale: 1.2, rotate: 5, y: -10, transition: { type: 'spring', stiffness: 300 } }}><i className="fab fa-laravel fa-2x mb-2 text-nb-dark"></i><p className="small text-nb-dark fw-bold">Laravel</p></motion.div>
                  <motion.div className="marquee-item" whileHover={{ scale: 1.2, rotate: 5, y: -10, transition: { type: 'spring', stiffness: 300 } }}><i className="fab fa-react fa-2x mb-2 text-nb-dark"></i><p className="small text-nb-dark fw-bold">ReactJS</p></motion.div>
                  <motion.div className="marquee-item" whileHover={{ scale: 1.2, rotate: 5, y: -10, transition: { type: 'spring', stiffness: 300 } }}><i className="fab fa-node-js fa-2x mb-2 text-nb-dark"></i><p className="small text-nb-dark fw-bold">NodeJS</p></motion.div>
                  <motion.div className="marquee-item" whileHover={{ scale: 1.2, rotate: 5, y: -10, transition: { type: 'spring', stiffness: 300 } }}><i className="fab fa-js fa-2x mb-2 text-nb-dark"></i><p className="small text-nb-dark fw-bold">JavaScript</p></motion.div>
                  <motion.div className="marquee-item" whileHover={{ scale: 1.2, rotate: 5, y: -10, transition: { type: 'spring', stiffness: 300 } }}><i className="fab fa-php fa-2x mb-2 text-nb-dark"></i><p className="small text-nb-dark fw-bold">PHP</p></motion.div>
                  <motion.div className="marquee-item" whileHover={{ scale: 1.2, rotate: 5, y: -10, transition: { type: 'spring', stiffness: 300 } }}><i className="fa-solid fa-database fa-2x mb-2 text-nb-dark"></i><p className="small text-nb-dark fw-bold">MySQL</p></motion.div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding position-relative" ref={ref} style={{ overflow: 'hidden' }}>
        {/* Floating Background SVG 1 */}
        <motion.div style={{ position: 'absolute', top: '10%', left: '5%', y: y1, rotate: rotate1, zIndex: 0, opacity: 0.1 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61.2257 38.7743L100 50L61.2257 61.2257L50 100L38.7743 61.2257L0 50L38.7743 38.7743L50 0Z" fill="var(--nb-dark)"/>
          </svg>
        </motion.div>
        
        {/* Floating Background SVG 2 */}
        <motion.div style={{ position: 'absolute', bottom: '15%', right: '8%', y: y2, rotate: rotate2, zIndex: 0, opacity: 0.1 }}>
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61.2257 38.7743L100 50L61.2257 61.2257L50 100L38.7743 61.2257L0 50L38.7743 38.7743L50 0Z" fill="var(--nb-dark)"/>
          </svg>
        </motion.div>

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row g-5">
            <motion.div 
              className="col-lg-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 variants={itemVariants} className="section-title">Tentang Saya</motion.h2>
              <motion.p variants={itemVariants} className="text-nb-muted mb-4 fw-500">
                Saya adalah mahasiswa Teknik Informatika di Institut Bisnis dan Teknologi Indonesia yang kini berprofesi sebagai junior front-end, back-end sampai fullstack developer. Memiliki minat besar dalam arsitektur software dan optimasi database. Berpengalaman dalam mengerjakan proyek sistem informasi akademik dan integrasi sistem pihak ketiga.
              </motion.p>
              
              <motion.h4 variants={itemVariants} className="text-nb-dark mb-4 mt-5">Pendidikan</motion.h4>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05, rotate: -2, x: 10, backgroundColor: '#f0f0f0' }} className="education-item mb-4 ps-3 py-2 rounded" style={{ borderLeft: '4px solid var(--nb-accent)', cursor: 'pointer' }}>
                <h6 className="text-nb-dark mb-0 fw-bold">MIPA</h6>
                <span className="text-accent small fw-bold">2019 — 2022</span>
                <p className="text-nb-muted small mt-1">SMA Negeri 1 Tampaksiring</p>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05, rotate: 2, x: 10, backgroundColor: '#f0f0f0' }} className="education-item mb-4 ps-3 py-2 rounded" style={{ borderLeft: '4px solid var(--nb-accent)', cursor: 'pointer' }}>
                <h6 className="text-nb-dark mb-0 fw-bold">S1 Informatika</h6>
                <span className="text-accent small fw-bold">2022 — 2026</span>
                <p className="text-nb-muted small mt-1">Institut Bisnis dan Teknologi Indonesia</p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="col-lg-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 variants={itemVariants} className="section-title">Pengalaman</motion.h2>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05, rotate: 2, y: -10, boxShadow: '8px 8px 0px var(--nb-dark)' }} className="experience-card p-4 mb-4" style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow)', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="text-nb-dark fw-bold mb-0">Game Developer Intern</h5>
                  <span className="badge bg-nb-yellow text-nb-dark fw-bold" style={{ backgroundColor: 'var(--nb-yellow)' }}>2024</span>
                </div>
                <p className="text-accent fw-bold mb-3">Hat and Cat Studio</p>
                <ul className="text-nb-dark small fw-500 mb-0">
                  <li>Membangun mekanik gameplay menggunakan JavaScript dan JSON.</li>
                  <li>Debugging dan optimasi performa script JSON/JS.</li>
                </ul>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05, rotate: -2, y: -10, boxShadow: '8px 8px 0px var(--nb-dark)' }} className="experience-card p-4 mb-4" style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow)', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="text-nb-dark fw-bold mb-0">Full Stack Web Developer</h5>
                  <span className="badge bg-nb-pink text-nb-dark fw-bold" style={{ backgroundColor: 'var(--nb-pink)' }}>2025</span>
                </div>
                <p className="text-accent fw-bold mb-3">Skripsi - INSTIKI</p>
                <ul className="text-nb-dark small fw-500 mb-0">
                  <li>Membangun Sistem Informasi Monitoring Indikator Kinerja menggunakan PHP, Laravel, JavaScript dan MySQL.</li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
