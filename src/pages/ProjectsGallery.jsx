import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';

import imgProjectSim from '../assets/project-sim.png';
import imgLatsu from '../assets/latsu.png';
import imgDivgym from '../assets/divgym.png';
import imgLesstresso from '../assets/lesstresso.png';
import imgSkyvoya from '../assets/skyvoya.png';
import imgBarber from '../assets/barber.jpg';

const allProjects = [
  {
    id: 'project-sim',
    title: 'Sistem Monitoring Indikator Kinerja',
    category: 'Web Application',
    image: imgProjectSim,
    desc: 'Platform monitoring real-time untuk efisiensi pelacakan data indikator kinerja akademik institusi secara akurat, terstruktur, dan aman.',
    tags: ['Web Application', 'Laravel', 'MySQL', 'Dashboard', 'Analytics'],
    link: null,
    linkText: '',
    featured: true,
  },
  {
    id: 'latsu-cafe',
    title: 'Latsu Cafe Canggu',
    category: 'Landing Page',
    image: imgLatsu,
    desc: 'Website modern dan estetik untuk Cafe di Canggu Bali dengan visual yang memikat, menu interaktif, dan integrasi WhatsApp ordering.',
    tags: ['Landing Page', 'HTML5', 'CSS3 / Neobrutalism', 'JavaScript', 'Responsive'],
    link: 'https://odivpds.github.io/LatsuCafe/',
    linkText: 'Live Preview',
    featured: true,
  },
  {
    id: 'divgym',
    title: 'DivGym Fitness Center',
    category: 'Landing Page',
    image: imgDivgym,
    desc: 'Website modern untuk pusat kebugaran dengan sistem booking yang intuitif, jadwal kelas interaktif, dan desain yang memikat calon member.',
    tags: ['Landing Page', 'Fitness', 'Booking System', 'Modern UI'],
    link: 'https://odivpds.github.io/DivGym/',
    linkText: 'Live Preview',
    featured: true,
  },
  {
    id: 'lesstresso',
    title: 'Lesstresso Coffee Shop',
    category: 'Landing Page',
    image: imgLesstresso,
    desc: 'Website modern untuk kedai kopi bernuansa aesthetic dengan storytelling brand yang kuat, katalog varian kopi, dan tata letak elegan.',
    tags: ['Landing Page', 'Coffee Shop', 'Branding', 'Minimalist UI'],
    link: 'https://odivpds.github.io/Lesstresso/',
    linkText: 'Live Preview',
    featured: true,
  },
  {
    id: 'skyvoya',
    title: 'SkyVoya Travel Agency',
    category: 'Landing Page',
    image: imgSkyvoya,
    desc: 'Website modern untuk agen perjalanan wisata dengan paket tour terlengkap, formulir reservasi online, dan informasi destinasi terupdate.',
    tags: ['Landing Page', 'Travel & Tour', 'Reservasi Online', 'Responsive'],
    link: 'https://odivpds.github.io/SkyVoyaTravel/',
    linkText: 'Live Preview',
    featured: true,
  },
  {
    id: 'barber-premium',
    title: 'Barbershop Premium',
    category: 'Landing Page',
    image: imgBarber,
    desc: 'Website modern dan elegan untuk barbershop premium dengan sistem reservasi jadwal online, daftar harga layanan grooming, showcase kapster profesional, dan desain dark aesthetic yang memikat.',
    tags: ['Landing Page', 'Barbershop', 'Reservasi Online', 'Dark Aesthetic', 'Responsive'],
    link: 'https://barber.odivpds.my.id',
    linkText: 'Live Preview',
    featured: true,
  },
  {
    id: 'portfolio-drive',
    title: 'Google Drive Portfolio Archive',
    category: 'Arsip & Desain',
    image: null,
    desc: 'Koleksi dokumentasi lengkap proyek, sertifikat keahlian, desain UI/UX Figma, dan berkas portofolio pendukung lainnya.',
    tags: ['Figma', 'UI/UX Design', 'Documentation', 'Certifications'],
    link: 'https://drive.google.com/drive/folders/1Gyw3-Gotec8eDSgS2hvTS1I_m2DBsFZ5?usp=sharing',
    linkText: 'Buka Google Drive',
    featured: false,
  }
];

const categories = ['Semua', 'Web Application', 'Landing Page', 'Arsip & Desain'];

const ProjectsGallery = () => {
  const { playClickSFX } = useAudio();
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState(null);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory = selectedCategory === 'Semua' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    playClickSFX();
    setSelectedCategory(category);
  };

  return (
    <section
      id="projects-gallery"
      className="section-padding bg-darker"
      style={{
        minHeight: '100vh',
        paddingTop: '130px',
        borderBottom: isDark ? '3px solid #2a2a3a' : 'var(--nb-border)',
        backgroundColor: isDark ? '#000000' : 'var(--nb-darker-bg)'
      }}
    >
      <div className="container">
        {/* Page Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="d-inline-block mb-2">
            <span
              className="badge text-uppercase px-3 py-2 fw-bold"
              style={{
                background: 'var(--nb-yellow)',
                color: '#1a1a2e',
                border: '2px solid #1a1a2e',
                borderRadius: '6px',
                fontSize: '0.85rem',
                letterSpacing: '1px',
                boxShadow: isDark ? '3px 3px 0px #000000' : '2px 2px 0px var(--nb-dark)'
              }}
            >
              PROJECT GALLERY
            </span>
          </div>
          <h1 className="display-5 fw-bold text-nb-dark">Galeri Proyek Selengkapnya</h1>
          <p className="text-nb-muted fw-500 mx-auto mt-3" style={{ maxWidth: '750px', fontSize: '1.05rem' }}>
            Eksplorasi visual karya digital dan proyek web yang dirancang dengan presisi, performa tinggi, dan pengalaman pengguna optimal.
          </p>
        </motion.div>

        {/* Filter and Search Bar */}
        <div className="row g-3 justify-content-between align-items-center mb-5">
          {/* Category Tabs */}
          <div className="col-lg-8 col-12">
            <div className="d-flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className="fw-bold px-3 py-2"
                    style={{
                      background: isActive
                        ? 'var(--nb-accent)'
                        : (isDark ? '#14141e' : 'var(--nb-surface)'),
                      color: isActive
                        ? '#ffffff'
                        : (isDark ? '#e0deec' : 'var(--nb-dark)'),
                      border: isActive
                        ? (isDark ? '2px solid #ff8855' : 'var(--nb-border)')
                        : (isDark ? '2px solid #3e3e55' : 'var(--nb-border)'),
                      boxShadow: isActive
                        ? (isDark ? '3px 3px 0px #000000' : '4px 4px 0px var(--nb-dark)')
                        : (isDark ? '2px 2px 0px #000000' : '2px 2px 0px var(--nb-dark)'),
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '0.85rem'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Search Box */}
          <div className="col-lg-4 col-12">
            <div
              className="d-flex align-items-center px-3 py-2"
              style={{
                background: isDark ? '#14141e' : 'var(--nb-surface)',
                border: isDark ? '2px solid #3e3e55' : 'var(--nb-border)',
                boxShadow: isDark ? '4px 4px 0px #000000' : '4px 4px 0px var(--nb-dark)',
                borderRadius: '8px'
              }}
            >
              <i className="fas fa-search me-2" style={{ color: isDark ? '#9a98a8' : 'var(--nb-text-muted)' }}></i>
              <input
                type="text"
                className="form-control border-0 p-0 shadow-none fw-500"
                placeholder="Cari nama atau teknologi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  color: isDark ? '#ffffff' : 'var(--nb-dark)'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn p-0 border-0"
                  onClick={() => setSearchQuery('')}
                  style={{ color: isDark ? '#9a98a8' : 'var(--nb-text-muted)' }}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Minimalist Visual-First Projects Grid (2 Cards Per Row) */}
        <motion.div layout className="row g-4 g-lg-5">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="col-lg-6 col-12"
              >
                <motion.div
                  className="h-100 d-flex flex-column"
                  style={{
                    background: isDark ? '#13131c' : 'var(--nb-surface)',
                    border: isDark ? '3px solid #38384a' : 'var(--nb-border)',
                    boxShadow: isDark ? '6px 6px 0px #000000' : 'var(--nb-shadow)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease'
                  }}
                  onClick={() => {
                    playClickSFX();
                    if (project.link) {
                      window.open(project.link, '_blank');
                    } else {
                      setSelectedProjectForModal(project);
                    }
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: isDark ? '10px 10px 0px #000000' : 'var(--nb-shadow-lg)',
                    borderColor: isDark ? 'var(--nb-accent)' : undefined,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  {/* Dominant Large Image Area (16:9 Aspect Ratio, Uncut/Uncropped Screenshot) */}
                  <div
                    className="position-relative overflow-hidden w-100"
                    style={{
                      aspectRatio: '16 / 9',
                      background: isDark ? '#08080d' : 'var(--nb-darker-bg)',
                      borderBottom: isDark ? '3px solid #38384a' : 'var(--nb-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px'
                    }}
                  >
                    {project.image ? (
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-100 h-100"
                        style={{
                          objectFit: 'contain',
                          display: 'block',
                          borderRadius: '8px'
                        }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    ) : (
                      <div
                        className="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4 text-center rounded-3"
                        style={{ background: 'var(--nb-yellow)' }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center mb-3"
                          style={{
                            width: '72px',
                            height: '72px',
                            background: '#ffffff',
                            border: '3px solid #1a1a2e',
                            boxShadow: '4px 4px 0px #1a1a2e',
                            borderRadius: '14px'
                          }}
                        >
                          <i className="fas fa-folder-open text-accent" style={{ fontSize: '2.2rem' }}></i>
                        </div>
                        {/* Always dark text on yellow background for 100% contrast */}
                        <h5 className="fw-bold mb-1" style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>
                          Arsip Dokumen & Desain
                        </h5>
                        <span
                          className="badge mt-1 fw-bold px-3 py-1"
                          style={{
                            background: '#1a1a2e',
                            color: '#ffffff',
                            fontSize: '0.75rem',
                            border: '1px solid #000'
                          }}
                        >
                          Google Drive Repository
                        </span>
                      </div>
                    )}

                    {/* Top-left: Category Pill */}
                    <span
                      className="position-absolute"
                      style={{
                        top: '16px',
                        left: '16px',
                        background: 'var(--nb-yellow)',
                        color: '#1a1a2e',
                        border: '2px solid #1a1a2e',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        zIndex: 2,
                        boxShadow: isDark ? '2px 2px 0px #000000' : '2px 2px 0px var(--nb-dark)'
                      }}
                    >
                      {project.category}
                    </span>

                    {/* Top-right: Minimalist Action Icon Button */}
                    <motion.button
                      type="button"
                      className="position-absolute d-flex align-items-center justify-content-center btn p-0"
                      style={{
                        top: '16px',
                        right: '16px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: isDark ? '#222232' : 'var(--nb-surface)',
                        border: isDark ? '2px solid #555570' : 'var(--nb-border-sm)',
                        boxShadow: isDark ? '2px 2px 0px #000000' : '2px 2px 0px var(--nb-dark)',
                        zIndex: 2,
                        color: isDark ? '#ffffff' : 'var(--nb-dark)'
                      }}
                      whileHover={{ scale: 1.15, backgroundColor: 'var(--nb-accent)', color: '#ffffff' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSFX();
                        if (project.link) {
                          window.open(project.link, '_blank');
                        } else {
                          setSelectedProjectForModal(project);
                        }
                      }}
                      title={project.link ? "Buka Live Preview" : "Lihat Detail Proyek"}
                    >
                      <i className={`fas ${project.link ? 'fa-arrow-up-right-from-square' : 'fa-info'}`} style={{ fontSize: '0.9rem' }}></i>
                    </motion.button>
                  </div>

                  {/* Minimalist Bottom Info (Large Title & Clean Metadata) */}
                  <div className="p-3 p-md-4 d-flex flex-column justify-content-between flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                      <div style={{ maxWidth: '70%' }}>
                        <h4
                          className="fw-bold mb-1 text-truncate"
                          title={project.title}
                          style={{
                            fontSize: '1.25rem',
                            color: isDark ? '#ffffff' : 'var(--nb-dark)'
                          }}
                        >
                          {project.title}
                        </h4>
                        <p
                          className="small fw-500 mb-0"
                          style={{ color: isDark ? '#9a98a8' : 'var(--nb-text-muted)' }}
                        >
                          {project.category} {project.link ? '• Website Aktif' : '• Sistem Internal'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div
            className="text-center p-5 mx-auto my-4"
            style={{
              maxWidth: '550px',
              background: isDark ? '#14141e' : 'var(--nb-surface)',
              border: isDark ? '3px solid #3e3e55' : 'var(--nb-border)',
              boxShadow: isDark ? '6px 6px 0px #000000' : 'var(--nb-shadow-lg)',
              borderRadius: '12px'
            }}
          >
            <i className="fas fa-search text-accent mb-3" style={{ fontSize: '3rem' }}></i>
            <h4 className="fw-bold" style={{ color: isDark ? '#ffffff' : 'var(--nb-dark)' }}>
              Proyek Tidak Ditemukan
            </h4>
            <p className="fw-500 mb-4" style={{ color: isDark ? '#9a98a8' : 'var(--nb-text-muted)' }}>
              Tidak ada hasil proyek yang cocok dengan kata kunci atau filter yang Anda pilih.
            </p>
            <button
              className="btn btn-accent fw-bold"
              style={{
                border: isDark ? '2px solid #ff8855' : 'var(--nb-border)',
                boxShadow: isDark ? '3px 3px 0px #000000' : '3px 3px 0px var(--nb-dark)'
              }}
              onClick={() => {
                playClickSFX();
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}

        {/* Detail Modal (Accessible when clicking a project or info icon) */}
        <AnimatePresence>
          {selectedProjectForModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(6px)',
                zIndex: 10500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
              onClick={() => setSelectedProjectForModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                  background: isDark ? '#14141e' : 'var(--nb-surface)',
                  border: isDark ? '3px solid #3e3e55' : 'var(--nb-border)',
                  boxShadow: isDark ? '12px 12px 0px #000000' : '10px 10px 0px var(--nb-dark)',
                  borderRadius: '16px',
                  maxWidth: '650px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header Image */}
                {selectedProjectForModal.image && (
                  <div
                    style={{
                      height: '260px',
                      overflow: 'hidden',
                      borderBottom: isDark ? '3px solid #3e3e55' : 'var(--nb-border)',
                      background: isDark ? '#08080d' : 'var(--nb-darker-bg)'
                    }}
                  >
                    <img
                      src={selectedProjectForModal.image}
                      alt={selectedProjectForModal.title}
                      className="w-100 h-100"
                      style={{ objectFit: 'contain', objectPosition: 'top' }}
                    />
                  </div>
                )}

                {/* Modal Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProjectForModal(null)}
                  className="btn position-absolute d-flex align-items-center justify-content-center"
                  style={{
                    top: '15px',
                    right: '15px',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'var(--nb-yellow)',
                    border: '2px solid #1a1a2e',
                    boxShadow: isDark ? '3px 3px 0px #000000' : '3px 3px 0px var(--nb-dark)',
                    color: '#1a1a2e',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    zIndex: 10
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>

                {/* Modal Body */}
                <div className="p-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span
                      className="badge"
                      style={{
                        background: 'var(--nb-yellow)',
                        color: '#1a1a2e',
                        border: '2px solid #1a1a2e',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}
                    >
                      {selectedProjectForModal.category}
                    </span>
                    <span
                      className="badge"
                      style={{
                        background: isDark ? '#222232' : 'var(--nb-bg)',
                        color: isDark ? '#e0deec' : 'var(--nb-dark)',
                        border: isDark ? '2px solid #44445c' : 'var(--nb-border-sm)',
                        fontWeight: '600'
                      }}
                    >
                      {selectedProjectForModal.link ? 'Tersedia Online' : 'Sistem Internal'}
                    </span>
                  </div>

                  <h3
                    className="fw-bold mb-3"
                    style={{ color: isDark ? '#ffffff' : 'var(--nb-dark)' }}
                  >
                    {selectedProjectForModal.title}
                  </h3>
                  <p
                    className="fw-500 mb-4"
                    style={{
                      lineHeight: '1.7',
                      color: isDark ? '#b8b6c8' : 'var(--nb-text-muted)'
                    }}
                  >
                    {selectedProjectForModal.desc}
                  </p>

                  <h6
                    className="fw-bold mb-2"
                    style={{ color: isDark ? '#ffffff' : 'var(--nb-dark)' }}
                  >
                    Teknologi & Fitur Utama:
                  </h6>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {selectedProjectForModal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge px-3 py-2"
                        style={{
                          background: isDark ? '#1e1e2d' : 'var(--nb-bg)',
                          color: isDark ? '#e0deec' : 'var(--nb-dark)',
                          border: isDark ? '2px solid #44445c' : 'var(--nb-border-sm)',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className="d-flex gap-2 pt-3 border-top"
                    style={{ borderColor: isDark ? '#2e2e42' : 'var(--nb-border-color)' }}
                  >
                    {selectedProjectForModal.link ? (
                      <a
                        href={selectedProjectForModal.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-accent fw-bold flex-grow-1 py-2"
                        style={{
                          border: isDark ? '2px solid #ff8855' : 'var(--nb-border)',
                          boxShadow: isDark ? '4px 4px 0px #000000' : '4px 4px 0px var(--nb-dark)'
                        }}
                        onClick={() => playClickSFX()}
                      >
                        Buka Live Website <i className="fas fa-external-link-alt ms-2"></i>
                      </a>
                    ) : (
                      <a
                        href="https://wa.me/6282247250393?text=Halo%20Agus,%20saya%20tertarik%20dengan%20proyek%20Sistem%20Monitoring%20Indikator%20Kinerja."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-accent fw-bold flex-grow-1 py-2"
                        style={{
                          border: isDark ? '2px solid #ff8855' : 'var(--nb-border)',
                          boxShadow: isDark ? '4px 4px 0px #000000' : '4px 4px 0px var(--nb-dark)'
                        }}
                        onClick={() => playClickSFX()}
                      >
                        Tanya Studi Kasus via WhatsApp <i className="fab fa-whatsapp ms-2"></i>
                      </a>
                    )}
                    <button
                      type="button"
                      className="btn fw-bold px-4"
                      style={{
                        border: isDark ? '2px solid #555570' : 'var(--nb-border)',
                        background: isDark ? '#222232' : 'var(--nb-surface)',
                        color: isDark ? '#e0deec' : 'var(--nb-dark)',
                        boxShadow: isDark ? '3px 3px 0px #000000' : 'var(--nb-shadow)'
                      }}
                      onClick={() => setSelectedProjectForModal(null)}
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call To Action Banner */}
        <motion.div
          className="mt-5 p-4 p-md-5 text-center"
          style={{
            background: isDark ? '#14141e' : 'var(--nb-surface)',
            border: isDark ? '3px solid #38384a' : 'var(--nb-border)',
            boxShadow: isDark ? '8px 8px 0px #000000' : 'var(--nb-shadow-lg)',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="badge px-3 py-2 fw-bold mb-3"
            style={{
              background: 'var(--nb-cyan)',
              color: '#1a1a2e',
              border: '2px solid #1a1a2e',
              borderRadius: '6px',
              boxShadow: isDark ? '2px 2px 0px #000000' : '2px 2px 0px var(--nb-dark)'
            }}
          >
            KERJASAMA & PEMBUATAN WEBSITE
          </span>
          <h2 className="fw-bold mb-3" style={{ color: isDark ? '#ffffff' : 'var(--nb-dark)' }}>
            Tertarik Membangun Website untuk Bisnis Anda?
          </h2>
          <p
            className="fw-500 mx-auto mb-4"
            style={{
              maxWidth: '650px',
              color: isDark ? '#9a98a8' : 'var(--nb-text-muted)'
            }}
          >
            Konsultasikan ide digital, landing page, atau web application Anda sekarang. Kami siap membantu mewujudkan solusi digital yang berdampak nyata bagi bisnis Anda.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link
              to="/business"
              className="btn btn-accent fw-bold px-4 py-3"
              style={{
                border: isDark ? '2px solid #ff8855' : 'var(--nb-border)',
                boxShadow: isDark ? '4px 4px 0px #000000' : '4px 4px 0px var(--nb-dark)',
                borderRadius: '8px'
              }}
              onClick={() => playClickSFX()}
            >
              Lihat Paket Layanan <i className="fas fa-tags ms-2"></i>
            </Link>
            <a
              href="https://wa.me/6282247250393?text=Halo%20Agus,%20saya%20melihat%20gallery%20project%20Anda%20dan%20ingin%20berdiskusi."
              target="_blank"
              rel="noopener noreferrer"
              className="btn fw-bold px-4 py-3"
              style={{
                border: isDark ? '2px solid #555570' : 'var(--nb-border)',
                boxShadow: isDark ? '4px 4px 0px #000000' : '4px 4px 0px var(--nb-dark)',
                borderRadius: '8px',
                background: isDark ? '#222232' : 'var(--nb-surface)',
                color: isDark ? '#ffffff' : 'var(--nb-dark)'
              }}
              onClick={() => playClickSFX()}
            >
              Konsultasi via WhatsApp <i className="fab fa-whatsapp ms-2"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
