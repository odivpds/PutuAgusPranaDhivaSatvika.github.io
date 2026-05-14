import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

const Contact = () => {
  const { playClickSFX } = useAudio();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSFX();
    setLoading(true);

    const form = e.target;
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      if (res.ok) {
        alert('Pesan terkirim!');
        form.reset();
      } else alert('Gagal mengirim.');
    }).catch(() => {
      alert('Terjadi kesalahan jaringan.');
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <motion.div 
          className="contact-box p-5 rounded-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <h2 className="text-white display-6 fw-bold">Mari Berkolaborasi</h2>
              <p className="text-white">Punya ide proyek atau butuh bantuan dalam pengembangan web? Saya siap membantu.</p>
              <div className="mt-4">
                <p className="text-white mb-2"><i className="fas fa-envelope text-accent me-2"></i> agusprana31@gmail.com</p>
                <p className="text-white mb-2"><i className="fab fa-github text-accent me-2"></i> odivpds</p>
              </div>
            </div>
            <div className="col-lg-7">
              <form id="contactForm" action="https://formsubmit.co/agusprana31@gmail.com" method="POST" onSubmit={handleSubmit}>
                <input type="hidden" name="_subject" value="Pesan Baru dari Portfolio!" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" name="Full Name" className="form-control" placeholder="Nama Anda" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" name="Email Address" className="form-control" placeholder="Email Anda" required />
                  </div>
                  <div className="col-12">
                    <textarea name="Message" className="form-control" rows="4" placeholder="Pesan Anda" required></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" id="submitBtn" className="btn btn-accent w-100 fw-bold py-3" disabled={loading}>
                      {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Kirim Sekarang'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
