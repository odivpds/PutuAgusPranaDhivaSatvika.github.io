import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import ProjectsDoodles from './ProjectsDoodles';
import imgProjectSim from '../assets/project-sim.png';
import imgLatsu from '../assets/latsu.png';
import imgDivgym from '../assets/divgym.png';
import imgLesstresso from '../assets/lesstresso.png';
import imgSkyvoya from '../assets/skyvoya.png';
import imgBarber from '../assets/barber.jpg';

const projectsData = [
  {
    title: "Sistem Monitoring Indikator Kinerja",
    image: imgProjectSim,
    techStack: ["PHP", "Laravel", "JavaScript", "MySQL"],
    link: null,
    desktopGridColumn: "1 / span 7",
    desktopMarginTop: "0px",
    parallaxRange: [28, -28],
    tiltRange: [-1.2, 0, 0.9],
    focusCenter: 0.28
  },
  {
    title: "Latsu Cafe Canggu",
    image: imgLatsu,
    techStack: ["HTML5", "Tailwind CSS", "JavaScript", "Font Awesome"],
    link: "https://odivpds.github.io/LatsuCafe/",
    desktopGridColumn: "8 / span 5",
    desktopMarginTop: "76px",
    parallaxRange: [80, -70],
    tiltRange: [1.4, 0, -1.0],
    focusCenter: 0.30
  },
  {
    title: "DivGym Fitness Center",
    image: imgDivgym,
    techStack: ["HTML5", "Tailwind CSS", "JavaScript", "Font Awesome"],
    link: "https://odivpds.github.io/DivGym/",
    desktopGridColumn: "2 / span 5",
    desktopMarginTop: "0px",
    parallaxRange: [45, -45],
    tiltRange: [-1.3, 0, 1.1],
    focusCenter: 0.50
  },
  {
    title: "Lesstresso",
    image: imgLesstresso,
    techStack: ["HTML5", "Tailwind CSS", "JavaScript", "Font Awesome"],
    link: "https://odivpds.github.io/Lesstresso/",
    desktopGridColumn: "7 / span 6",
    desktopMarginTop: "60px",
    parallaxRange: [90, -75],
    tiltRange: [1.2, 0, -1.1],
    focusCenter: 0.52
  },
  {
    title: "Barbershop Premium",
    image: imgBarber,
    techStack: ["HTML5", "Tailwind CSS", "JavaScript", "i18n"],
    link: "https://barber.odivpds.my.id",
    desktopGridColumn: "1 / span 7",
    desktopMarginTop: "8px",
    parallaxRange: [28, -32],
    tiltRange: [-1.0, 0, 0.9],
    focusCenter: 0.72
  },
  {
    title: "SkyVoya Travel Agency",
    image: imgSkyvoya,
    techStack: ["HTML5", "Tailwind CSS", "JavaScript", "Font Awesome"],
    link: "https://odivpds.github.io/SkyVoyaTravel/",
    desktopGridColumn: "8 / span 5",
    desktopMarginTop: "80px",
    parallaxRange: [80, -70],
    tiltRange: [1.4, 0, -0.9],
    focusCenter: 0.75
  }
];

const useViewportMode = () => {
  const getMode = () => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth >= 992) return 'desktop';
    if (window.innerWidth >= 768) return 'tablet';
    return 'mobile';
  };

  const [mode, setMode] = useState(getMode);

  useEffect(() => {
    const handleResize = () => setMode(getMode());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return mode;
};

const AbstractProjectCard = React.memo(({
  project,
  index,
  mode,
  sectionProgress,
  isDark,
  playClickSFX,
  prefersReducedMotion
}) => {
  const {
    title,
    image,
    techStack,
    link,
    desktopGridColumn,
    desktopMarginTop,
    parallaxRange,
    tiltRange,
    focusCenter
  } = project;
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Scroll-scrubbed slow-motion alternating entrance for mobile cards
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardRef,
    offset: ['start 98%', 'start 66%']
  });

  const mobileEntranceSpring = useSpring(cardScrollProgress, {
    stiffness: 44,
    damping: 21,
    mass: 1.8
  });

  const sideSign = index % 2 === 0 ? 1 : -1;
  const mobileX = useTransform(mobileEntranceSpring, [0, 1], [sideSign * 84, 0]);
  const mobileOpacity = useTransform(mobileEntranceSpring, [0, 0.3, 1], [0.08, 0.82, 1]);
  const mobileRotate = useTransform(mobileEntranceSpring, [0, 1], [sideSign * 2.4, 0]);
  const mobileScale = useTransform(mobileEntranceSpring, [0, 1], [0.92, 1]);

  // Derive parallax, tilt, and focus scale from single shared section scroll spring
  const activeParallaxRange =
    prefersReducedMotion
      ? [0, 0]
      : mode === 'desktop'
      ? parallaxRange
      : mode === 'tablet'
      ? index % 2 === 1
        ? [32, -32]
        : [12, -12]
      : [16, -16];

  const yParallax = useTransform(sectionProgress, [0, 1], activeParallaxRange);

  const focusRange = [
    Math.max(0, focusCenter - 0.35),
    focusCenter,
    Math.min(1, focusCenter + 0.35)
  ];

  const activeTiltRange =
    prefersReducedMotion || mode === 'mobile' ? [0, 0, 0] : tiltRange;

  const rotate = useTransform(sectionProgress, focusRange, activeTiltRange);
  const scale = useTransform(
    sectionProgress,
    focusRange,
    prefersReducedMotion || mode === 'mobile' ? [1, 1, 1] : [0.95, 1, 0.97]
  );

  const borderColor = isDark ? '#2c2c3a' : '#1a1a2e';
  const restingShadow = isDark ? '4px 4px 0px #1a1a26' : '4px 4px 0px #1a1a2e';
  const hoverShadow = isDark ? '6px 6px 0px var(--nb-accent)' : '6px 6px 0px #1a1a2e';

  const wrapperStyle =
    mode === 'desktop'
      ? {
          gridColumn: desktopGridColumn,
          marginTop: desktopMarginTop,
          position: 'relative',
          zIndex: isHovered ? 10 : 2
        }
      : mode === 'tablet'
      ? {
          marginTop: index % 2 === 1 ? '36px' : '0px',
          position: 'relative',
          zIndex: isHovered ? 10 : 2
        }
      : {
          position: 'relative',
          zIndex: isHovered ? 10 : 2
        };

  const innerContent = (
    <>
      <img
        src={image}
        alt={title}
        decoding="async"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
          willChange: 'transform'
        }}
      />

      {/* Small Tech Stack Pills in Top-Left Corner on Hover */}
      <div
        className="position-absolute d-flex flex-wrap"
        style={{
          top: '10px',
          left: '10px',
          maxWidth: 'calc(100% - 20px)',
          gap: '5px',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(-4px)',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          pointerEvents: 'none'
        }}
      >
        {techStack.map((tech) => (
          <span
            key={tech}
            style={{
              background: isDark ? 'rgba(14, 14, 19, 0.9)' : 'rgba(255, 255, 255, 0.94)',
              color: isDark ? '#f4f4f6' : '#1a1a2e',
              border: `1px solid ${isDark ? '#3c3c4e' : '#1a1a2e'}`,
              boxShadow: isDark ? '1.5px 1.5px 0px var(--nb-accent)' : '1.5px 1.5px 0px #1a1a2e',
              borderRadius: '4px',
              padding: '2px 7px',
              fontSize: '0.68rem',
              fontWeight: 700,
              lineHeight: 1.25
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </>
  );

  const isMobileAnimated = mode === 'mobile' && !prefersReducedMotion;

  const cardMotionProps = {
    className: "d-block position-relative overflow-hidden text-decoration-none",
    whileHover: {
      y: -4,
      x: -1,
      boxShadow: hoverShadow,
      borderColor: isDark ? 'var(--nb-accent)' : '#1a1a2e',
      transition: { type: 'spring', stiffness: 360, damping: 24 }
    },
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false),
    style: {
      background: isDark ? '#0e0e13' : '#ffffff',
      border: `1.5px solid ${borderColor}`,
      boxShadow: restingShadow,
      borderRadius: '10px',
      cursor: link ? 'pointer' : 'default',
      contain: 'layout paint'
    }
  };

  const cardElement = link ? (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      onClick={() => playClickSFX()}
      {...cardMotionProps}
    >
      {innerContent}
    </motion.a>
  ) : (
    <motion.div
      tabIndex={0}
      aria-label={title}
      onClick={() => playClickSFX()}
      {...cardMotionProps}
    >
      {innerContent}
    </motion.div>
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        ...wrapperStyle,
        y: yParallax,
        rotate,
        scale,
        willChange: 'transform'
      }}
    >
      {isMobileAnimated ? (
        <motion.div
          style={{
            x: mobileX,
            opacity: mobileOpacity,
            rotate: mobileRotate,
            scale: mobileScale,
            willChange: 'transform, opacity'
          }}
        >
          {cardElement}
        </motion.div>
      ) : (
        cardElement
      )}
    </motion.div>
  );
});

AbstractProjectCard.displayName = 'AbstractProjectCard';

const Projects = () => {
  const { isDark } = useTheme();
  const { playClickSFX } = useAudio();
  const mode = useViewportMode();
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 22,
    mass: 2.3
  });

  const gridStyle =
    mode === 'desktop'
      ? {
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          columnGap: '24px',
          rowGap: '56px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 2
        }
      : mode === 'tablet'
      ? {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          columnGap: '20px',
          rowGap: '32px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 2
        }
      : {
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: '22px',
          position: 'relative',
          zIndex: 2
        };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-darker position-relative"
      style={{
        paddingTop: '96px',
        paddingBottom: '120px',
        borderTop: isDark ? '1.5px solid #22222c' : 'var(--nb-border)',
        overflowX: 'clip',
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* GPU-Composited Tech-Stack Doodles & Outlined Marquee Background */}
      <ProjectsDoodles
        scrollProgress={smoothProgress}
        isDark={isDark}
        prefersReducedMotion={prefersReducedMotion}
      />

      <div className="w-100 px-2 px-md-4 position-relative" style={{ zIndex: 2 }}>
        {/* Abstract Asymmetric Editorial Grid with Scroll Parallax */}
        <div style={gridStyle}>
          {projectsData.map((project, index) => (
            <AbstractProjectCard
              key={project.title}
              project={project}
              index={index}
              mode={mode}
              sectionProgress={smoothProgress}
              isDark={isDark}
              playClickSFX={playClickSFX}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
