import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import certToeic from '../context/image copy 2.png';
import certIc3 from '../context/image copy.png';
import certDb from '../context/image.png';
import certJinom from '../context/WhatsApp Image 2026-08-11 at 14.56.07.jpeg';

import confetti from 'canvas-confetti';

const About = () => {
  const ref = useRef(null);
  const [showDownloadAlert, setShowDownloadAlert] = useState(false);

  useEffect(() => {
    if (showDownloadAlert) {
      const timer = setTimeout(() => setShowDownloadAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showDownloadAlert]);

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
      <AnimatePresence>
        {showDownloadAlert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2, x: "-50%", y: "-50%", rotate: -20 }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", rotate: [-10, 5, -5, 0] }}
            exit={{ opacity: 0, scale: 2, x: "-50%", y: "-50%", filter: "blur(10px)" }}
            transition={{ type: 'spring', stiffness: 200, damping: 10, mass: 1.5 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: 9999,
              textAlign: 'center',
              pointerEvents: 'none',
              width: '100vw'
            }}
          >
            <h1 className="fw-black text-uppercase m-0" style={{ 
              fontSize: 'clamp(4rem, 10vw, 8rem)', 
              color: 'var(--nb-yellow)', 
              WebkitTextStroke: '4px var(--nb-dark)', 
              textShadow: '8px 8px 0px var(--nb-dark)',
              lineHeight: 1
            }}>
              THANK YOUU
            </h1>
            <h2 className="fw-bold text-uppercase mt-2" style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              color: 'var(--nb-cyan)',
              WebkitTextStroke: '2px var(--nb-dark)',
              textShadow: '4px 4px 0px var(--nb-dark)'
            }}>
              🎉 You're Awesome! 🎉
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

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
        <motion.div style={{ position: 'absolute', top: '10%', left: '5%', y: y1, rotate: rotate1, zIndex: 0, opacity: 0.1 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61.2257 38.7743L100 50L61.2257 61.2257L50 100L38.7743 61.2257L0 50L38.7743 38.7743L50 0Z" fill="var(--nb-dark)" />
          </svg>
        </motion.div>

        <motion.div style={{ position: 'absolute', bottom: '15%', right: '8%', y: y2, rotate: rotate2, zIndex: 0, opacity: 0.1 }}>
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61.2257 38.7743L100 50L61.2257 61.2257L50 100L38.7743 61.2257L0 50L38.7743 38.7743L50 0Z" fill="var(--nb-dark)" />
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

              <motion.h4 variants={itemVariants} className="text-nb-dark mb-4 mt-5">Tools & Workflow</motion.h4>
              <motion.div variants={itemVariants} className="d-flex flex-wrap gap-2 mb-4">
                {['Git & GitHub', 'Docker', 'Postman', 'Figma', 'Linux / Ubuntu', 'SQLite', 'Trello'].map(tool => (
                  <span key={tool} className="badge bg-white text-nb-dark" style={{ border: 'var(--nb-border)', boxShadow: '2px 2px 0px var(--nb-dark)', fontSize: '0.85rem', padding: '0.5rem 0.8rem' }}>
                    {tool}
                  </span>
                ))}
              </motion.div>

              <motion.h4 variants={itemVariants} className="text-nb-dark mb-4 mt-5 d-flex align-items-center">
                Sertifikasi
                <span className="badge text-nb-dark ms-3" style={{ backgroundColor: '#FFD700', border: '1.5px solid var(--nb-dark)', boxShadow: '4px 4px 0px #FF8C00', fontSize: '0.65rem', padding: '0.3rem 0.5rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                  <i className="fa-solid fa-hand-pointer me-1"></i>KLIK UNTUK VERIFIKASI
                </span>
              </motion.h4>

              <a href={certJinom} target="_blank" rel="noreferrer" className="text-decoration-none">
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02, rotate: 1, x: 5, backgroundColor: '#f0f0f0' }} className="education-item mb-3 ps-3 py-2 rounded" style={{ borderLeft: '4px solid var(--nb-accent)', cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center pe-3">
                    <div>
                      <h6 className="text-nb-dark mb-0 fw-bold">Web Developer Internship</h6>
                      <span className="text-accent small fw-bold">2026</span>
                      <p className="text-nb-muted small mt-1 mb-0">PT. Jinom Network Indonesia</p>
                    </div>
                    <i className="fa-solid fa-qrcode fa-2x text-nb-dark opacity-50" title="Verify Authenticity"></i>
                  </div>
                </motion.div>
              </a>

              <a href={certDb} target="_blank" rel="noreferrer" className="text-decoration-none">
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02, rotate: -1, x: 5, backgroundColor: '#f0f0f0' }} className="education-item mb-3 ps-3 py-2 rounded" style={{ borderLeft: '4px solid var(--nb-accent)', cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center pe-3">
                    <div>
                      <h6 className="text-nb-dark mb-0 fw-bold">IT Specialist - Databases</h6>
                      <span className="text-accent small fw-bold">2025</span>
                      <p className="text-nb-muted small mt-1 mb-0">CertNexus / Pearson VUE</p>
                    </div>
                    <i className="fa-solid fa-qrcode fa-2x text-nb-dark opacity-50" title="Verify Authenticity"></i>
                  </div>
                </motion.div>
              </a>

              <a href={certIc3} target="_blank" rel="noreferrer" className="text-decoration-none">
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02, rotate: 1, x: 5, backgroundColor: '#f0f0f0' }} className="education-item mb-3 ps-3 py-2 rounded" style={{ borderLeft: '4px solid var(--nb-accent)', cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center pe-3">
                    <div>
                      <h6 className="text-nb-dark mb-0 fw-bold">IC3 GS6 LEVEL 1</h6>
                      <span className="text-accent small fw-bold">2024</span>
                      <p className="text-nb-muted small mt-1 mb-0">Certiport / Pearson VUE</p>
                    </div>
                    <i className="fa-solid fa-qrcode fa-2x text-nb-dark opacity-50" title="Verify Authenticity"></i>
                  </div>
                </motion.div>
              </a>

              <a href={certToeic} target="_blank" rel="noreferrer" className="text-decoration-none">
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02, rotate: -1, x: 5, backgroundColor: '#f0f0f0' }} className="education-item mb-3 ps-3 py-2 rounded" style={{ borderLeft: '4px solid var(--nb-accent)', cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center pe-3">
                    <div>
                      <h6 className="text-nb-dark mb-0 fw-bold">TOEIC Listening and Reading (Score: 550)</h6>
                      <span className="text-accent small fw-bold">2023</span>
                      <p className="text-nb-muted small mt-1 mb-0">INSTIKI / ETS</p>
                    </div>
                    <i className="fa-solid fa-qrcode fa-2x text-nb-dark opacity-50" title="Verify Authenticity"></i>
                  </div>
                </motion.div>
              </a>

              <motion.div variants={itemVariants} className="mt-5 pt-3 d-none d-lg-block">
                <motion.a
                  href="/src/context/Resume - Putu Agus Prana Dhiva Satvika.pdf"
                  download
                  className="btn-nb-primary d-inline-flex align-items-center gap-2 fw-bold"
                  style={{ padding: '0.8rem 1.5rem', textDecoration: 'none', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow)', backgroundColor: 'var(--nb-accent)', color: 'var(--nb-dark)', borderRadius: '8px', display: 'inline-block' }}
                  whileHover={{ scale: 1.05, rotate: -3, y: -5, boxShadow: '8px 8px 0px var(--nb-dark)' }}
                  whileTap={{ scale: 0.95, rotate: 0, y: 0, boxShadow: '2px 2px 0px var(--nb-dark)' }}
                  onClick={() => {
                    confetti({
                      particleCount: 150,
                      spread: 70,
                      origin: { y: 0.6 },
                      colors: ['#ffde59', '#ff914d', '#ff5757', '#5ce1e6', '#000000']
                    });
                    setShowDownloadAlert(true);
                  }}
                >
                  <i className="fa-solid fa-file-arrow-down fa-lg"></i>
                  Download Resume / CV
                </motion.a>
              </motion.div>
            </motion.div>

            <div className="col-lg-6">
              <motion.h2
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="section-title"
              >
                Pengalaman
              </motion.h2>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, rotate: 2, y: -10, boxShadow: '8px 8px 0px var(--nb-dark)' }}
                className="experience-card p-4 mb-4"
                style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow)', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              >
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

              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, rotate: -2, y: -10, boxShadow: '8px 8px 0px var(--nb-dark)' }}
                className="experience-card p-4 mb-4"
                style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow)', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="text-nb-dark fw-bold mb-0">Full Stack Web Developer</h5>
                  <span className="badge bg-nb-pink text-nb-dark fw-bold" style={{ backgroundColor: 'var(--nb-pink)' }}>2025</span>
                </div>
                <p className="text-accent fw-bold mb-3">Skripsi - INSTIKI</p>
                <ul className="text-nb-dark small fw-500 mb-0">
                  <li>Membangun Sistem Informasi Monitoring Indikator Kinerja menggunakan PHP, Laravel, JavaScript dan MySQL.</li>
                </ul>
              </motion.div>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, rotate: -1, y: -10, boxShadow: '8px 8px 0px var(--nb-dark)' }}
                className="experience-card p-4 mb-4"
                style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow)', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="text-nb-dark fw-bold mb-0">AI Chatbots Integration Intern</h5>
                  <span className="badge bg-nb-cyan text-nb-dark fw-bold" style={{ backgroundColor: 'var(--nb-cyan)' }}>2026</span>
                </div>
                <p className="text-accent fw-bold mb-3">PT JinomNetwork (Jinom AI)</p>
                <ul className="text-nb-dark small fw-500 mb-0">
                  <li className="mb-2">Merancang alur (flow) dan mengembangkan antarmuka (front-end) untuk sistem multi-agent chatbot.</li>
                  <li className="mb-2">Mengintegrasikan model AI (OpenAI compatible & Claude) ke dalam platform Jinom Panel, Fonnte, dan PingTalk.</li>
                  <li className="mb-2">Membangun fitur AI screening untuk HR dengan image recognition dan ekstraksi titik koordinat.</li>
                  <li className="mb-2">Mengelola Vector Database dengan injeksi dataset SOP perusahaan untuk respon AI yang relevan.</li>
                  <li className="mb-2">Mengimplementasikan penyimpanan chat history berbasis SQLite untuk fitur sapaan otomatis terpersonalisasi.</li>
                  <li>Optimasi performa AI melalui penyesuaian tools calling, query transformation, dan adopsi persona spesifik (AO Jinom).</li>
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, rotate: 1, y: -10, boxShadow: '8px 8px 0px var(--nb-dark)' }}
                className="experience-card p-4 mb-4"
                style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow)', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="text-nb-dark fw-bold mb-0">HRIS Developer Intern</h5>
                  <span className="badge bg-nb-pink text-nb-dark fw-bold" style={{ backgroundColor: 'var(--nb-pink)' }}>2026</span>
                </div>
                <p className="text-accent fw-bold mb-3">PT JinomNetwork (HR Jinom)</p>
                <ul className="text-nb-dark small fw-500 mb-0">
                  <li className="mb-2">Membangun dashboard rekrutmen terpusat yang mengonsolidasikan data pelamar otomatis (Glints, Indeed, Portal Internal).</li>
                  <li className="mb-2">Mengembangkan modul Analisa Kebutuhan Tenaga Kerja dengan fitur filter lanjutan.</li>
                  <li className="mb-2">Mengotomatisasi siklus manajemen lowongan, termasuk penutupan otomatis dan notifikasi real-time.</li>
                  <li>Meningkatkan UX tim HR dengan alur penyaringan spesifik untuk membedakan pelamar posisi Staff dan Internship.</li>
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, rotate: -1, y: -10, boxShadow: '8px 8px 0px var(--nb-dark)' }}
                className="experience-card p-4 mb-4"
                style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow)', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="text-nb-dark fw-bold mb-0">Full-Stack Web Developer Intern</h5>
                  <span className="badge bg-nb-yellow text-nb-dark fw-bold" style={{ backgroundColor: 'var(--nb-yellow)' }}>2026</span>
                </div>
                <p className="text-accent fw-bold mb-3">PT JinomNetwork (Jinom.net CMS)</p>
                <ul className="text-nb-dark small fw-500 mb-0">
                  <li className="mb-2">Melakukan setup arsitektur back-end Laravel untuk CMS web Jinom.net.</li>
                  <li className="mb-2">Membangun fitur inti CMS termasuk dashboard utama, manajemen pengguna (permissions), dan sistem antrean pesan (job queue & notify).</li>
                  <li className="mb-2">Mengintegrasikan sistem otentikasi Single Sign-On (SSO) pada antarmuka login.</li>
                  <li className="mb-2">Merancang web scraping untuk mengumpulkan ratusan data Point of Interest (POI) mitra/reseller dari Google Maps.</li>
                  <li>Mengelola infrastruktur lokal, troubleshooting jaringan Docker, dan resolusi isu integrasi kode (merge conflict).</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-5 pt-3 text-center d-block d-lg-none">
                <motion.a
                  href="/src/context/Putu_Agus_Prana_Dhiva_Satvika_Resume.png"
                  download
                  className="btn-nb-primary d-inline-flex align-items-center gap-2 fw-bold w-100 justify-content-center"
                  style={{ padding: '1rem', textDecoration: 'none', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow)', backgroundColor: 'var(--nb-accent)', color: 'var(--nb-dark)', borderRadius: '8px' }}
                  whileHover={{ scale: 1.02, y: -2, boxShadow: '6px 6px 0px var(--nb-dark)' }}
                  whileTap={{ scale: 0.98, y: 2, boxShadow: '2px 2px 0px var(--nb-dark)' }}
                  onClick={() => {
                    confetti({
                      particleCount: 150,
                      spread: 70,
                      origin: { y: 0.6 },
                      colors: ['#ffde59', '#ff914d', '#ff5757', '#5ce1e6', '#000000']
                    });
                    setShowDownloadAlert(true);
                  }}
                >
                  <i className="fa-solid fa-file-arrow-down fa-lg"></i>
                  Download Resume / CV
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
