import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <section id="about" className="py-5 bg-darker">
        <div className="container">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h6 className="text-accent fw-bold uppercase" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>MAIN TECH STACK</h6>
            <h4 className="text-white fw-bold h5">Teknologi & Bahasa Pemrograman</h4>
          </motion.div>
          <div className="marquee-wrapper">
            <div className="marquee-track opacity-75">
              {/* Repeated for marquee effect */}
              {[...Array(3)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="marquee-item"><i className="fab fa-laravel fa-2x mb-2 text-white"></i><p className="small text-white">Laravel</p></div>
                  <div className="marquee-item"><i className="fab fa-react fa-2x mb-2 text-white"></i><p className="small text-white">ReactJS</p></div>
                  <div className="marquee-item"><i className="fab fa-node-js fa-2x mb-2 text-white"></i><p className="small text-white">NodeJS</p></div>
                  <div className="marquee-item"><i className="fab fa-js fa-2x mb-2 text-white"></i><p className="small text-white">JavaScript</p></div>
                  <div className="marquee-item"><i className="fab fa-php fa-2x mb-2 text-white"></i><p className="small text-white">PHP</p></div>
                  <div className="marquee-item"><i className="fa-solid fa-database fa-2x mb-2 text-white"></i><p className="small text-white">MySQL</p></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-darker">
        <div className="container">
          <div className="row g-5">
            <motion.div 
              className="col-lg-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 variants={itemVariants} className="section-title">Tentang Saya</motion.h2>
              <motion.p variants={itemVariants} className="text-white mb-4 text-justify">
                Saya adalah mantan mahasiswa Teknik Informatika di Institut Bisnis dan Teknologi Indonesia yang kini berprofesi sebagai junior front-end, back-end sampai fullstack developer. Memiliki minat besar dalam arsitektur software dan optimasi database. Berpengalaman dalam mengerjakan proyek sistem informasi akademik dan integrasi sistem pihak ketiga.
              </motion.p>
              
              <motion.h4 variants={itemVariants} className="text-white mb-3">Pendidikan</motion.h4>
              <motion.div variants={itemVariants} className="education-item mb-4 border-start border-accent ps-3">
                <h6 className="text-white mb-0">MIPA</h6>
                <span className="text-accent small">2019 — 2022</span>
                <p className="text-white small">SMA Negeri 1 Tampaksiring</p>
              </motion.div>
              <motion.div variants={itemVariants} className="education-item mb-4 border-start border-accent ps-3">
                <h6 className="text-white mb-0">S1 Informatika</h6>
                <span className="text-accent small">2022 — 2026</span>
                <p className="text-white small">Institut Bisnis dan Teknologi Indonesia</p>
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
              <motion.div variants={itemVariants} className="experience-card p-4 mb-3">
                <div className="d-flex justify-content-between">
                  <h5 className="text-white">Game Developer Intern</h5>
                  <span className="text-accent small">2024</span>
                </div>
                <p className="text-accent mb-2">Hat and Cat Studio</p>
                <ul className="text-white small">
                  <li>Membangun mekanik gameplay menggunakan JavaScript dan JSON.</li>
                  <li>Debugging dan optimasi performa script JSON/JS.</li>
                </ul>
              </motion.div>
              <motion.div variants={itemVariants} className="experience-card p-4 mb-3">
                <div className="d-flex justify-content-between">
                  <h5 className="text-white">Full Stack Web Developer</h5>
                  <span className="text-accent small">2025</span>
                </div>
                <p className="text-accent mb-2">Skripsi - Institut Bisnis dan Teknologi Indonesia</p>
                <ul className="text-white small">
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
