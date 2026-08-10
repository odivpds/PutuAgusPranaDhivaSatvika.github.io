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
          className="contact-box p-5 rounded-4"
          style={{ background: '#fff', border: 'var(--nb-border)', boxShadow: 'var(--nb-shadow)' }}
          initial={{ opacity: 0, y: 150, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <h2 className="text-nb-dark display-6 fw-bold">Mari Berkolaborasi</h2>
              <p className="text-nb-muted fw-500">Punya ide proyek atau butuh bantuan pengembangan web? Saya siap membantu.</p>
              
              <div className="mt-4">
                <div className="d-flex align-items-center mb-3">
                  <motion.div whileHover={{ scale: 1.2, rotate: 15, y: -5, boxShadow: '4px 4px 0px var(--nb-dark)' }} className="icon-circle me-3" style={{ background: 'var(--nb-yellow)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'var(--nb-border-sm)', cursor: 'pointer' }}>
                    <i className="fas fa-envelope text-nb-dark"></i>
                  </motion.div>
                  <span className="text-nb-dark fw-bold">agusprana31@gmail.com</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <motion.div whileHover={{ scale: 1.2, rotate: -15, y: -5, boxShadow: '4px 4px 0px var(--nb-dark)' }} className="icon-circle me-3" style={{ background: 'var(--nb-cyan)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'var(--nb-border-sm)', cursor: 'pointer' }}>
                    <i className="fab fa-github text-nb-dark"></i>
                  </motion.div>
                  <span className="text-nb-dark fw-bold">odivpds</span>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              {status && (
                <div className={`alert alert-${status.type} border-0 animate__animated animate__fadeIn fw-bold`} style={{ border: 'var(--nb-border-sm)' }}>
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
                    <motion.input type="text" name="name" className="form-control" placeholder="Nama Anda" required whileFocus={{ scale: 1.02, x: -5, y: -5, boxShadow: '6px 6px 0px var(--nb-dark)' }} transition={{ type: 'spring', stiffness: 400 }} />
                  </div>
                  <div className="col-md-6">
                    <motion.input type="email" name="email" className="form-control" placeholder="Email Anda" required whileFocus={{ scale: 1.02, x: -5, y: -5, boxShadow: '6px 6px 0px var(--nb-dark)' }} transition={{ type: 'spring', stiffness: 400 }} />
                  </div>
                  <div className="col-12">
                    <motion.textarea name="message" className="form-control" rows="4" placeholder="Pesan Anda" required whileFocus={{ scale: 1.02, x: -5, y: -5, boxShadow: '6px 6px 0px var(--nb-dark)' }} transition={{ type: 'spring', stiffness: 400 }}></motion.textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <motion.button type="submit" className="btn btn-accent w-100 fw-bold py-3 text-uppercase" disabled={loading} whileHover={{ scale: 1.02, rotate: -1, boxShadow: '8px 8px 0px var(--nb-dark)' }} whileTap={{ scale: 0.95, rotate: 1 }}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <>Kirim Pesan <i className="fas fa-paper-plane ms-2"></i></>
                      )}
                    </motion.button>
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