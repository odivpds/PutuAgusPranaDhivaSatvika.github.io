import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import imgProjectSim from '../assets/project-sim.png';
import imgLatsu from '../assets/latsu.png';
import imgDivgym from '../assets/divgym.png';
import imgLesstresso from '../assets/lesstresso.png';
import imgSkyvoya from '../assets/skyvoya.png';

const ProjectCard = ({ title, category, image, desc, link, linkText }) => {
  return (
    <motion.div 
      className="col-lg-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ y: -10 }}
    >
      <div className="project-showcase">
        <div className="ps-image-wrapper">
          <img src={image} alt={title} className="ps-img" />
          <div className="ps-overlay">
            <span className="ps-category">{category}</span>
          </div>
        </div>
        <div className="ps-content mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="ps-title text-white mb-0">{title}</h4>
          </div>
          <p className="ps-desc text-white-50 mt-3">{desc}</p>
          {link && (
            <a href={link} className="ps-link-simple" target="_blank" rel="noopener noreferrer">
              {linkText} <i className="fas fa-external-link-alt ms-2"></i>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { scrollYProgress } = useScroll();
  const scaleTitle = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);

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
    <section id="projects" className="section-padding bg-darker" style={{ paddingTop: '1rem' }}>
      <div className="container">
        <motion.div 
          className="text-center mb-5"
          style={{ scale: scaleTitle }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-accent">My Featured Projects</h2>
          <p className="text-white eks text-justify">
            Kumpulan proyek unggulan yang mencerminkan kemampuan saya dalam merancang dan mengembangkan solusi digital yang fungsional, efisien, dan berorientasi pada pengalaman pengguna.
          </p>
        </motion.div>

        <div className="row g-5"> 
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
