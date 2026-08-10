import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

const Business = () => {
  const [activeTab, setActiveTab] = useState('landing-page');
  const { playClickSFX } = useAudio();

  const handleTabClick = (tabId) => {
    playClickSFX();
    setActiveTab(tabId);
  };

  const getWaLink = (plan) => `https://wa.me/6282247250393?text=Halo%20Agus,%20saya%20tertarik%20dengan%20${encodeURIComponent(plan)}.`;

  return (
    <section id="business" className="section-padding bg-darker" style={{ minHeight: '100vh', paddingTop: '120px', borderBottom: 'var(--nb-border)' }}>
      <div className="container">
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h5 className="text-accent fw-bold uppercase" style={{ letterSpacing: '2px' }}>PRICELIST LAYANAN</h5>
          <h2 className="display-5 fw-bold text-nb-dark">Website Modern untuk Bisnis Bali yang Ingin Tampil Lebih Profesional & Dipercaya Customer.</h2>
          <p className="text-nb-muted fw-500 mx-auto mb-5" style={{ maxWidth: '800px' }}>
              Kami membuat website modern dengan performa cepat, tampilan elegan, dan pengalaman pengguna yang nyaman di semua device — dirancang untuk membantu bisnis Anda terlihat lebih profesional.
          </p>

          <div className="mainpaket-nav d-flex justify-content-center flex-wrap gap-2 mb-5">
            <button className={`btn-tab ${activeTab === 'landing-page' ? 'active' : ''}`} onClick={() => handleTabClick('landing-page')}>Landing Page</button>
            <button className={`btn-tab ${activeTab === 'company-profile' ? 'active' : ''}`} onClick={() => handleTabClick('company-profile')}>Web Company Profile</button>
            <button className={`btn-tab ${activeTab === 'travel-tour' ? 'active' : ''}`} onClick={() => handleTabClick('travel-tour')}>Web Travel & Tour</button>
            <button className={`btn-tab ${activeTab === 'toko-online' ? 'active' : ''}`} onClick={() => handleTabClick('toko-online')}>Web Toko Online</button>
          </div>
        </motion.div>

        <div className="tab-content position-relative">
          <AnimatePresence mode="wait">
            {activeTab === 'landing-page' && (
              <motion.div 
                key="landing-page"
                className="row g-4 justify-content-center pricing-grid"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Starter Plan */}
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card p-4 mt-lg-3 h-100 d-flex flex-column" style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow-lg)', borderRadius: '12px' }}>
                    <div className="pricing-header mb-4">
                      <h4 className="text-nb-dark fw-bold">Launch</h4>
                      <p className="text-nb-muted small fw-500">Cocok untuk bisnis kecil yang ingin mulai tampil profesional di internet.</p>
                      <div className="price mt-3">
                        <span className="currency text-accent fw-bold h4">Rp</span>
                        <span className="amount display-5 fw-bold text-nb-dark">999</span>
                        <span className="duration text-nb-muted fw-bold">.000</span>
                      </div>
                    </div>
                    <ul className="pricing-features list-unstyled text-nb-dark fw-500 mb-5">
                      <li className="mb-2"><i className="fas fa-check text-accent me-2"></i> Landing Page Modern & Mobile Friendly</li>
                      <li className="mb-2"><i className="fas fa-check text-accent me-2"></i> Domain .com/.id (1 Tahun)</li>
                      <li className="mb-2"><i className="fas fa-check text-accent me-2"></i> Cloud Hosting (1 Tahun)</li>
                      <li className="mb-2"><i className="fas fa-check text-accent me-2"></i> Tombol WhatsApp Langsung ke Customer</li>
                      <li className="mb-2"><i className="fas fa-check text-accent me-2"></i> Website Siap Terindex di Google</li>
                      <li className="mb-2"><i className="fas fa-check text-accent me-2"></i> Garansi Maintenance 15 Hari</li>
                    </ul>
                    <a href={getWaLink('Landing Page Starter')} className="btn btn-outline-accent w-100 fw-bold mt-auto" style={{ border: 'var(--nb-border)' }} onClick={() => playClickSFX()}>Konsultasi Gratis</a>
                  </div>
                </div>

                {/* Business Authority */}
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card featured p-4 h-100 d-flex flex-column" style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow-lg)', borderRadius: '12px', position: 'relative', transform: 'scale(1.05)' }}>
                    <div className="featured-badge" style={{ position: 'absolute', top: '-15px', right: '20px', background: 'var(--nb-yellow)', color: 'var(--nb-dark)', border: 'var(--nb-border-sm)', padding: '5px 15px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem' }}>BEST VALUE</div>
                    <div className="pricing-header mb-4">
                      <h4 className="text-nb-dark fw-bold">Business Authority</h4>
                      <p className="text-nb-muted small fw-500">Tingkatkan Kepercayaan & Otoritas Bisnis</p>
                      <div className="price mt-3">
                        <span className="currency text-accent fw-bold h4">Rp</span>
                        <span className="amount display-5 fw-bold text-nb-dark">1.799</span>
                        <span className="duration text-nb-muted fw-bold">.000</span>
                      </div>
                    </div>
                    <p className="text-accent small fw-bold mb-3">Semua fitur Starter, plus:</p>
                    <ul className="pricing-features list-unstyled text-nb-dark fw-500 mb-5">
                      <li className="mb-2"><i className="fas fa-plus-circle text-accent me-2"></i> Multi-pages</li>
                      <li className="mb-2"><i className="fas fa-plus-circle text-accent me-2"></i> Bisnis Serius</li>
                      <li className="mb-2"><i className="fas fa-plus-circle text-accent me-2"></i> UI Advanced</li>
                    </ul>
                    <a href={getWaLink('Landing Page Growth')} className="btn btn-accent w-100 fw-bold mt-auto" onClick={() => playClickSFX()}>Order Sekarang</a>
                  </div>
                </div>

                {/* Enterprise Elite */}
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card p-4 mt-lg-3 h-100 d-flex flex-column" style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow-lg)', borderRadius: '12px' }}>
                    <div className="pricing-header mb-4">
                      <h4 className="text-nb-dark fw-bold">Custom Project</h4>
                      <p className="text-nb-muted small fw-500">Lets Discuss Your Unique Needs</p>
                    </div>
                    <a href={getWaLink('Landing Page Ultimate')} className="btn btn-outline-accent w-100 fw-bold mt-auto" style={{ border: 'var(--nb-border)' }} onClick={() => playClickSFX()}>Order Sekarang</a>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab !== 'landing-page' && (
              <motion.div 
                key="other-tabs"
                className="row g-4 justify-content-center pricing-grid"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="col-12 text-center text-nb-dark py-5" style={{ background: '#fff', border: 'var(--nb-border)', borderRadius: '12px', boxShadow: 'var(--nb-shadow)' }}>
                  <i className="fas fa-tools fa-3x mb-3 text-accent"></i>
                  <h4 className="fw-bold">Paket Sedang Dirancang</h4>
                  <p className="text-nb-muted fw-500">Silakan hubungi kami untuk penawaran kustom saat ini.</p>
                  <a href="/#contact" className="btn btn-accent fw-bold mt-3" onClick={() => playClickSFX()}>Hubungi Saya</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Business;
