import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

const Contact = () => {
  const { playClickSFX } = useAudio();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSFX();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("https://formsubmit.co/ajax/3e133d8a2f9dda6d1550734e0d0a3594", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        setStatus({ type: 'success', message: 'Pesan terkirim!' }); 
        form.reset();
      } else {
        setStatus({ type: 'danger', message: 'Gagal mengirim. Verifikasi email dahulu.' });
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan. Coba matikan Ad-blocker jika ada.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <motion.div 
          className="contact-box p-5 rounded-4 shadow"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <h2 className="text-white display-6 fw-bold">Mari Berkolaborasi</h2>
              <p className="text-white-50">Punya ide proyek atau butuh bantuan pengembangan web? Saya siap membantu.</p>
              
              <div className="mt-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="icon-circle me-3"><i className="fas fa-envelope text-accent"></i></div>
                  <span className="text-white">agusprana31@gmail.com</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="icon-circle me-3"><i className="fab fa-github text-accent"></i></div>
                  <span className="text-white">odivpds</span>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              {status && (
                <div className={`alert alert-${status.type} border-0 animate__animated animate__fadeIn`}>
                  {status.message}
                </div>
              )}

              <form action="https://formsubmit.co/3e133d8a2f9dda6d1550734e0d0a3594" method="POST" onSubmit={handleSubmit}>
                <input type="hidden" name="_subject" value="Pesan Baru dari Portfolio!" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={window.location.href} />

                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" name="name" className="form-control bg-dark text-white border-secondary" placeholder="Nama Anda" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" name="email" className="form-control bg-dark text-white border-secondary" placeholder="Email Anda" required />
                  </div>
                  <div className="col-12">
                    <textarea name="message" className="form-control bg-dark text-white border-secondary" rows="4" placeholder="Pesan Anda" required></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-accent w-100 fw-bold py-3 text-uppercase" disabled={loading}>
                      {loading ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span> Mengirim...</>
                      ) : (
                        'Kirim Sekarang'
                      )}
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