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
    <section id="business" className="section-padding bg-darker" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container">
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h5 className="text-accent fw-bold uppercase" style={{ letterSpacing: '2px' }}>PRICELIST LAYANAN</h5>
          <h2 className="display-5 fw-bold text-white">Investasi Digital Masa Depan: Cepat, Aman, & Eksklusif</h2>
          <p className="text-white-50 mx-auto mb-5" style={{ maxWidth: '800px' }}>
            Lupakan website lambat. Kami menghadirkan <strong>Hand-Crafted Code</strong> (Bukan WordPress). Website Anda akan 10x lebih ringan, aman, dan memberikan kesan premium.
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
                  <div className="pricing-card p-4 mt-lg-3 h-100 d-flex flex-column">
                    <div className="pricing-header mb-4">
                      <h4 className="text-white">Starter Plan</h4>
                      <p className="text-white-50 small">Esensial untuk Personal Brand & UMKM</p>
                      <div className="price mt-3">
                        <span className="currency text-accent">Rp</span>
                        <span className="amount h2 fw-bold text-white">999</span>
                        <span className="duration text-white-50">.000</span>
                      </div>
                    </div>
                    <ul className="pricing-features list-unstyled text-white-50 mb-5">
                      <li><i className="fas fa-check text-accent me-2"></i> 1 Landing Page Profesional</li>
                      <li><i className="fas fa-check text-accent me-2"></i> Domain .com/.id (1 Tahun)</li>
                      <li><i className="fas fa-check text-accent me-2"></i> Cloud Hosting (1 Tahun)</li>
                      <li><i className="fas fa-check text-accent me-2"></i> Integrasi WhatsApp Direct</li>
                      <li><i className="fas fa-check text-accent me-2"></i> Setup Google Search Console</li>
                      <li><i className="fas fa-check text-accent me-2"></i> Garansi Maintenance 15 Hari</li>
                    </ul>
                    <a href={getWaLink('Landing Page Starter')} className="btn btn-outline-accent w-100 fw-bold mt-auto" onClick={() => playClickSFX()}>Order Sekarang</a>
                  </div>
                </div>

                {/* Business Authority */}
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card featured p-4 h-100 border border-accent shadow-lg d-flex flex-column">
                    <div className="featured-badge">BEST VALUE</div>
                    <div className="pricing-header mb-4">
                      <h4 className="text-white">Business Authority</h4>
                      <p className="text-white-50 small">Tingkatkan Kepercayaan & Otoritas Bisnis</p>
                      <div className="price mt-3">
                        <span className="currency text-accent">Rp</span>
                        <span className="amount h2 fw-bold text-white">1.799</span>
                        <span className="duration text-white-50">.000</span>
                      </div>
                    </div>
                    <p className="text-accent small fw-bold mb-3">Semua fitur Starter, plus:</p>
                    <ul className="pricing-features list-unstyled text-white mb-5">
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Hingga 5 Halaman Utama</li>
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Optimasi SEO On-Page</li>
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Email Bisnis (nama@bisnis.com)</li>
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Advanced Copywriting Persuasif</li>
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Keamanan SSL & Anti-Spam</li>
                    </ul>
                    <a href={getWaLink('Landing Page Growth')} className="btn btn-accent w-100 fw-bold mt-auto" onClick={() => playClickSFX()}>Order Sekarang</a>
                  </div>
                </div>

                {/* Enterprise Elite */}
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card p-4 mt-lg-3 h-100 d-flex flex-column">
                    <div className="pricing-header mb-4">
                      <h4 className="text-white">Enterprise Elite</h4>
                      <p className="text-white-50 small">Kecepatan & Desain Tanpa Batas</p>
                      <div className="price mt-3">
                        <span className="currency text-accent">Rp</span>
                        <span className="amount h2 fw-bold text-white">2.999</span>
                        <span className="duration text-white-50">.000</span>
                      </div>
                    </div>
                    <p className="text-white-50 small fw-bold mb-3">Semua fitur Business, plus:</p>
                    <ul className="pricing-features list-unstyled text-white-50 mb-5">
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Desain Animasi Eksklusif</li>
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Optimasi Kecepatan Maksimal</li>
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Hingga 10 Halaman Detail</li>
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Free Logo Design Basic</li>
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Prioritas Support 24/7</li>
                      <li><i className="fas fa-plus-circle text-accent me-2"></i> Garansi Maintenance 60 Hari</li>
                    </ul>
                    <a href={getWaLink('Landing Page Ultimate')} className="btn btn-outline-accent w-100 fw-bold mt-auto" onClick={() => playClickSFX()}>Order Sekarang</a>
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
                <div className="col-12 text-center text-white py-5">
                  <i className="fas fa-tools fa-3x mb-3 text-accent"></i>
                  <h4>Paket Sedang Dirancang</h4>
                  <p className="text-white-50">Silakan hubungi kami untuk penawaran kustom saat ini.</p>
                  <a href="/#contact" className="btn btn-accent fw-bold" onClick={() => playClickSFX()}>Hubungi Saya</a>
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
