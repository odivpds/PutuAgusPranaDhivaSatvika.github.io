import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import imgProjectSim from '../assets/project-sim.png';
import imgLatsu from '../assets/latsu.png';
import imgDivgym from '../assets/divgym.png';
import imgLesstresso from '../assets/lesstresso.png';
import imgSkyvoya from '../assets/skyvoya.png';

const SplashBackground = () => null; // Removed in neobrutalism

const cardContainerStyle = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  padding: "30px",
  borderRadius: "12px", // smaller border radius
};

const cardStyle = {
  position: "relative",
  zIndex: 1,
  transformOrigin: "10% 60%",
  background: "#ffffff",
  border: "var(--nb-border)",
  boxShadow: "var(--nb-shadow-lg)",
  padding: "20px",
  borderRadius: "12px"
};

// Component for Desktop (Horizontal Sticky Scroll)
const ProjectCardDesktop = ({ title, category, image, desc, link, linkText, index, progress, total }) => {
  const center = index / (total - 1); 
  const range = [center - 0.25, center, center + 0.25];
  
  const rotate = useTransform(progress, range, [4, -3, 4]);
  const y = useTransform(progress, range, [60, -20, 60]);
  const scale = useTransform(progress, range, [0.85, 1.05, 0.85]);
  
  return (
    <div style={{ width: "45vw", minWidth: "350px", maxWidth: "600px", flexShrink: 0, height: "65vh", display: "flex", alignItems: "center" }}>
      <div className={`card-container-${index} w-100 h-100`} style={cardContainerStyle}>
        <SplashBackground />
        
        <motion.div 
          className="project-showcase w-100 d-flex flex-column" 
          style={{ ...cardStyle, rotate, y, scale, height: "90%", cursor: 'pointer' }}
          whileHover={{ boxShadow: '12px 12px 0px var(--nb-dark)', y: -10, transition: { type: 'spring', stiffness: 300 } }}
        >
          <div className="ps-image-wrapper" style={{ flexShrink: 0, border: 'var(--nb-border)', borderRadius: '8px' }}>
            <img src={image} alt={title} className="ps-img" />
            <div className="ps-overlay" style={{ opacity: 1, top: '10px', left: '10px' }}>
              <span className="ps-category" style={{ background: 'var(--nb-yellow)', color: 'var(--nb-dark)', border: 'var(--nb-border-sm)', borderRadius: '4px', textShadow: 'none', backdropFilter: 'none' }}>{category}</span>
            </div>
          </div>
          <div className="ps-content mt-4 flex-grow-1 d-flex flex-column">
            <h4 className="ps-title text-nb-dark mb-0 fw-bold">{title}</h4>
            <p className="ps-desc text-nb-muted mt-3 fw-500">{desc}</p>
            {link && (
              <motion.a 
                href={link} 
                className="btn btn-outline-accent mt-auto align-self-start fw-bold" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotate: -2, backgroundColor: 'var(--nb-accent)', color: '#fff', boxShadow: '4px 4px 0px var(--nb-dark)' }}
                whileTap={{ scale: 0.95 }}
              >
                {linkText} <i className="fas fa-external-link-alt ms-2"></i>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Component for Mobile (Vertical Scroll)
const ProjectCardMobile = ({ title, category, image, desc, link, linkText, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 0.2"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  
  const rotate = useTransform(smoothProgress, [0, 0.5, 1], [5, -2, 5]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [80, -10, 80]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.02, 0.85]);

  return (
    <div className="col-12 mb-5" ref={ref}>
      <div className={`card-container-${index} h-100`} style={{...cardContainerStyle, padding: "20px"}}>
        <SplashBackground />
        <motion.div 
          className="project-showcase w-100" 
          style={{ ...cardStyle, rotate, y, scale, cursor: 'pointer' }}
          whileHover={{ boxShadow: '12px 12px 0px var(--nb-dark)', y: -10, transition: { type: 'spring', stiffness: 300 } }}
        >
          <div className="ps-image-wrapper" style={{ border: 'var(--nb-border)', borderRadius: '8px' }}>
            <img src={image} alt={title} className="ps-img" />
            <div className="ps-overlay" style={{ opacity: 1, top: '10px', left: '10px' }}>
              <span className="ps-category" style={{ background: 'var(--nb-yellow)', color: 'var(--nb-dark)', border: 'var(--nb-border-sm)', borderRadius: '4px', textShadow: 'none', backdropFilter: 'none' }}>{category}</span>
            </div>
          </div>
          <div className="ps-content mt-4">
            <h4 className="ps-title text-nb-dark mb-0 fw-bold">{title}</h4>
            <p className="ps-desc text-nb-muted mt-3 fw-500">{desc}</p>
            {link && (
              <motion.a 
                href={link} 
                className="btn btn-outline-accent align-self-start fw-bold mt-2" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotate: -2, backgroundColor: 'var(--nb-accent)', color: '#fff', boxShadow: '4px 4px 0px var(--nb-dark)' }}
                whileTap={{ scale: 0.95 }}
              >
                {linkText} <i className="fas fa-external-link-alt ms-2"></i>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Projects = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // Stiffness and damping tweaked for a "heavy" but smooth feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 15, mass: 1.5 });
  
  // Total of 5 projects translates from 0% to -66.666% to keep the last item centered
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-66.666%"]);

  const projectsData = [
    {
      title: "Sistem Monitoring Indikator Kinerja",
      category: "Web Application",
      image: imgProjectSim,
      desc: "Membangun platform monitoring real-time untuk efisiensi pelacakan data indikator akademik secara akurat.",
      link: null,
      linkText: ""
    },
    {
      title: "Latsu Cafe Canggu",
      category: "Landing Page",
      image: imgLatsu,
      desc: "Website modern untuk Cafe dengan desain yang memikat.",
      link: "https://odivpds.github.io/LatsuCafe/",
      linkText: "Live Preview"
    },
    {
      title: "DivGym Fitness Center",
      category: "Landing Page",
      image: imgDivgym,
      desc: "Website modern untuk pusat kebugaran dengan sistem booking yang intuitif dan desain yang memikat.",
      link: "https://odivpds.github.io/DivGym/",
      linkText: "Live Preview"
    },
    {
      title: "Lesstresso",
      category: "Landing Page",
      image: imgLesstresso,
      desc: "Website modern untuk toko kopi desain yang memikat.",
      link: "https://odivpds.github.io/Lesstresso/",
      linkText: "Live Preview"
    },
    {
      title: "SkyVoya Travel Agency",
      category: "Landing Page",
      image: imgSkyvoya,
      desc: "Website modern untuk agen perjalanan dengan sistem booking yang intuitif dan desain yang memikat.",
      link: "https://odivpds.github.io/SkyVoyaTravel/",
      linkText: "Live Preview"
    }
  ];

  return (
    <>
      {/* DESKTOP HORIZONTAL SCROLL (Hidden on mobile) */}
      <section ref={targetRef} id="projects" className="bg-darker d-none d-lg-block" style={{ height: "400vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
          
          <motion.div 
            className="text-center w-100" 
            style={{ position: "absolute", top: "8vh", zIndex: 10 }}
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">My Featured Projects</h2>
            <p className="text-nb-muted eks px-5 mx-auto fw-500" style={{ maxWidth: "800px" }}>
              Kumpulan proyek unggulan yang mencerminkan kemampuan saya dalam merancang dan mengembangkan solusi digital yang fungsional, efisien, dan berorientasi pada pengalaman pengguna.
            </p>
          </motion.div>

          <motion.div style={{ x, display: "flex", gap: "5vw", paddingLeft: "27.5vw", paddingRight: "27.5vw", marginTop: "12vh", width: "max-content" }}>
            {projectsData.map((project, index) => (
              <ProjectCardDesktop 
                key={index} 
                {...project} 
                index={index} 
                progress={smoothProgress} 
                total={projectsData.length} 
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* MOBILE VERTICAL SCROLL (Hidden on desktop) */}
      <section id="projects-mobile" className="section-padding bg-darker d-block d-lg-none">
        <div className="container">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">My Featured Projects</h2>
            <p className="text-nb-muted eks fw-500">
              Kumpulan proyek unggulan yang mencerminkan kemampuan saya dalam merancang dan mengembangkan solusi digital yang fungsional, efisien, dan berorientasi pada pengalaman pengguna.
            </p>
          </motion.div>

          <div className="row"> 
            {projectsData.map((project, index) => (
              <ProjectCardMobile key={index} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
