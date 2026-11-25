import React from 'react';
import { motion, useTransform } from 'framer-motion';

const MARQUEE_BANDS = [
  {
    id: 'band-1',
    top: '6%',
    text: 'LARAVEL ✦ REACTJS ✦ NODEJS ✦ JAVASCRIPT ✦ PHP ✦ MYSQL ✦ TAILWIND ✦ ',
    xRange: ['0%', '-14%'],
    tilt: -1.5
  },
  {
    id: 'band-2',
    top: '27%',
    text: 'TAILWIND CSS ✦ DOCKER ✦ GIT & GITHUB ✦ FIGMA ✦ LINUX ✦ SQLITE ✦ ',
    xRange: ['-14%', '0%'],
    tilt: 1.2
  },
  {
    id: 'band-3',
    top: '48%',
    text: 'SQLITE ✦ BOOTSTRAP ✦ REST API ✦ LARAVEL ✦ REACTJS ✦ NODEJS ✦ ',
    xRange: ['0%', '-16%'],
    tilt: -1.2
  },
  {
    id: 'band-4',
    top: '69%',
    text: 'PHP ✦ MYSQL ✦ NODEJS ✦ JAVASCRIPT ✦ POSTMAN ✦ DOCKER ✦ GIT ✦ ',
    xRange: ['-14%', '0%'],
    tilt: 1.5
  },
  {
    id: 'band-5',
    top: '88%',
    text: 'FULLSTACK WEB ✦ REACTJS ✦ LARAVEL ✦ TAILWIND ✦ FIGMA ✦ MYSQL ✦ ',
    xRange: ['0%', '-15%'],
    tilt: -1
  }
];

/**
 * 45 doodles assigned to 4 GPU-composited parallax planes (layer 0..3)
 * so all 45 elements animate smoothly on scroll with only 4 GPU layer transforms.
 */
const DOODLE_SPECS = [
  // Band 1 (~3%)
  { id: 'b1-laravel', kind: 'tech', icon: 'fab fa-laravel', label: 'Laravel', frame: 'oval', pos: { top: '3%', left: '3%' }, layer: 0, rot: -8, scale: 0.96, accent: true },
  { id: 'b1-star', kind: 'svg', svgType: 'starburst', pos: { top: '4%', left: '25%' }, layer: 1, rot: 12, scale: 0.9, accent: false },
  { id: 'b1-react', kind: 'tech', icon: 'fab fa-react', label: 'ReactJS', frame: 'circle', pos: { top: '2%', left: '50%' }, layer: 2, rot: 0, scale: 0.94, spin: true, accent: false },
  { id: 'b1-zigzag', kind: 'svg', svgType: 'zigzag', pos: { top: '5%', left: '72%' }, layer: 3, rot: -6, scale: 0.92, accent: true },
  { id: 'b1-figma', kind: 'tech', icon: 'fab fa-figma', label: 'Figma', frame: 'braces', pos: { top: '3%', right: '3%' }, layer: 1, rot: 10, scale: 0.95, accent: false },

  // Band 2 (~12%)
  { id: 'b2-code', kind: 'svg', svgType: 'codeTag', pos: { top: '12%', left: '11%' }, layer: 2, rot: -10, scale: 0.94, accent: false },
  { id: 'b2-node', kind: 'tech', icon: 'fab fa-node-js', label: 'NodeJS', frame: 'wave', pos: { top: '11%', left: '35%' }, layer: 0, rot: 6, scale: 0.95, accent: true },
  { id: 'b2-spiral', kind: 'svg', svgType: 'spiral', pos: { top: '13%', left: '59%' }, layer: 3, rot: 14, scale: 0.9, accent: false },
  { id: 'b2-mysql', kind: 'tech', icon: 'fa-solid fa-database', label: 'MySQL', frame: 'box', pos: { top: '12%', right: '11%' }, layer: 1, rot: -7, scale: 0.95, accent: false },

  // Band 3 (~21%)
  { id: 'b3-squig', kind: 'svg', svgType: 'squiggle', pos: { top: '21%', left: '2%' }, layer: 3, rot: -5, scale: 0.95, accent: true },
  { id: 'b3-php', kind: 'tech', icon: 'fab fa-php', label: 'PHP', frame: 'oval', pos: { top: '20%', left: '23%' }, layer: 1, rot: 8, scale: 0.92, accent: false },
  { id: 'b3-term', kind: 'svg', svgType: 'terminal', pos: { top: '22%', left: '46%' }, layer: 0, rot: -6, scale: 0.9, accent: false },
  { id: 'b3-tw', kind: 'tech', icon: 'fa-solid fa-wind', label: 'Tailwind', frame: 'wave', pos: { top: '21%', left: '68%' }, layer: 2, rot: 9, scale: 0.94, accent: true },
  { id: 'b3-cur', kind: 'svg', svgType: 'cursor', pos: { top: '22%', right: '3%' }, layer: 0, rot: -12, scale: 0.88, accent: false },

  // Band 4 (~30%)
  { id: 'b4-docker', kind: 'tech', icon: 'fab fa-docker', label: 'Docker', frame: 'wave', pos: { top: '30%', left: '13%' }, layer: 1, rot: -8, scale: 0.95, accent: false },
  { id: 'b4-dots', kind: 'svg', svgType: 'gridDots', pos: { top: '31%', left: '38%' }, layer: 2, rot: 12, scale: 0.92, accent: true },
  { id: 'b4-js', kind: 'tech', icon: 'fab fa-js', label: 'JavaScript', frame: 'braces', pos: { top: '30%', left: '61%' }, layer: 3, rot: -5, scale: 0.95, accent: false },
  { id: 'b4-arr', kind: 'svg', svgType: 'arrowSpark', pos: { top: '31%', right: '8%' }, layer: 0, rot: 10, scale: 0.92, accent: true },

  // Band 5 (~40%)
  { id: 'b5-js2', kind: 'tech', icon: 'fab fa-js', label: 'JS', frame: 'circle', pos: { top: '40%', left: '4%' }, layer: 2, rot: -10, scale: 0.94, accent: true },
  { id: 'b5-orbit', kind: 'svg', svgType: 'orbit', pos: { top: '41%', left: '26%' }, layer: 0, rot: 0, scale: 0.92, spin: true, accent: false },
  { id: 'b5-git', kind: 'tech', icon: 'fab fa-github', label: 'GitHub', frame: 'oval', pos: { top: '39%', left: '49%' }, layer: 3, rot: 7, scale: 0.94, accent: false },
  { id: 'b5-bs', kind: 'tech', icon: 'fab fa-bootstrap', label: 'Bootstrap', frame: 'plain', pos: { top: '41%', left: '72%' }, layer: 1, rot: -9, scale: 0.9, accent: false },
  { id: 'b5-bolt', kind: 'svg', svgType: 'lightning', pos: { top: '40%', right: '3%' }, layer: 2, rot: 14, scale: 0.9, accent: true },

  // Band 6 (~50%)
  { id: 'b6-curly', kind: 'svg', svgType: 'curlyPair', pos: { top: '50%', left: '12%' }, layer: 3, rot: -8, scale: 0.92, accent: false },
  { id: 'b6-linux', kind: 'tech', icon: 'fab fa-linux', label: 'Linux', frame: 'box', pos: { top: '49%', left: '34%' }, layer: 0, rot: 6, scale: 0.94, accent: true },
  { id: 'b6-lar2', kind: 'tech', icon: 'fab fa-laravel', label: 'Laravel', frame: 'wave', pos: { top: '51%', left: '57%' }, layer: 1, rot: -10, scale: 0.93, accent: false },
  { id: 'b6-star2', kind: 'svg', svgType: 'starburst', pos: { top: '50%', right: '10%' }, layer: 2, rot: 15, scale: 0.88, accent: false },

  // Band 7 (~60%)
  { id: 'b7-doc2', kind: 'tech', icon: 'fab fa-docker', label: 'Docker', frame: 'plain', pos: { top: '60%', left: '3%' }, layer: 1, rot: 9, scale: 0.9, accent: false },
  { id: 'b7-squig2', kind: 'svg', svgType: 'squiggle', pos: { top: '61%', left: '24%' }, layer: 0, rot: -6, scale: 0.92, accent: false },
  { id: 'b7-react2', kind: 'tech', icon: 'fab fa-react', label: 'React', frame: 'circle', pos: { top: '59%', left: '47%' }, layer: 3, rot: 0, scale: 0.94, spin: true, accent: true },
  { id: 'b7-api', kind: 'tech', icon: 'fa-solid fa-plug', label: 'Postman', frame: 'box', pos: { top: '61%', left: '69%' }, layer: 2, rot: 8, scale: 0.92, accent: false },
  { id: 'b7-code2', kind: 'svg', svgType: 'codeTag', pos: { top: '60%', right: '3%' }, layer: 1, rot: -11, scale: 0.9, accent: true },

  // Band 8 (~70%)
  { id: 'b8-sql', kind: 'tech', icon: 'fa-solid fa-database', label: 'SQLite', frame: 'oval', pos: { top: '70%', left: '14%' }, layer: 2, rot: -7, scale: 0.94, accent: false },
  { id: 'b8-arr2', kind: 'svg', svgType: 'arrowSpark', pos: { top: '71%', left: '37%' }, layer: 3, rot: 12, scale: 0.9, accent: true },
  { id: 'b8-node2', kind: 'tech', icon: 'fab fa-node-js', label: 'NodeJS', frame: 'braces', pos: { top: '69%', left: '60%' }, layer: 0, rot: -6, scale: 0.94, accent: false },
  { id: 'b8-fig2', kind: 'tech', icon: 'fab fa-figma', label: 'Figma', frame: 'wave', pos: { top: '71%', right: '4%' }, layer: 1, rot: 10, scale: 0.93, accent: true },

  // Band 9 (~80%)
  { id: 'b9-git2', kind: 'tech', icon: 'fab fa-github', label: 'Git', frame: 'circle', pos: { top: '80%', left: '3%' }, layer: 3, rot: -9, scale: 0.92, accent: false },
  { id: 'b9-bolt2', kind: 'svg', svgType: 'lightning', pos: { top: '81%', left: '27%' }, layer: 1, rot: 11, scale: 0.9, accent: true },
  { id: 'b9-php2', kind: 'tech', icon: 'fab fa-php', label: 'PHP', frame: 'box', pos: { top: '79%', left: '51%' }, layer: 2, rot: -6, scale: 0.93, accent: false },
  { id: 'b9-spir2', kind: 'svg', svgType: 'spiral', pos: { top: '81%', left: '74%' }, layer: 0, rot: 16, scale: 0.88, accent: false },
  { id: 'b9-term2', kind: 'svg', svgType: 'terminal', pos: { top: '80%', right: '3%' }, layer: 2, rot: -8, scale: 0.9, accent: true },

  // Band 10 (~90%)
  { id: 'b10-zig2', kind: 'svg', svgType: 'zigzag', pos: { top: '90%', left: '12%' }, layer: 0, rot: 7, scale: 0.9, accent: false },
  { id: 'b10-tw2', kind: 'tech', icon: 'fa-solid fa-wind', label: 'Tailwind', frame: 'oval', pos: { top: '89%', left: '36%' }, layer: 2, rot: -9, scale: 0.92, accent: true },
  { id: 'b10-orb2', kind: 'svg', svgType: 'orbit', pos: { top: '91%', left: '62%' }, layer: 1, rot: 0, scale: 0.92, spin: true, accent: false },
  { id: 'b10-cur2', kind: 'svg', svgType: 'cursor', pos: { top: '90%', right: '5%' }, layer: 3, rot: 12, scale: 0.88, accent: false }
];

const PARALLAX_PLANES = [
  { id: 0, xRange: [-12, 14], yRange: [28, -36] },
  { id: 1, xRange: [14, -14], yRange: [-32, 38] },
  { id: 2, xRange: [-18, 16], yRange: [48, -52] },
  { id: 3, xRange: [16, -18], yRange: [-44, 48] }
];

const SketchSvg = ({ type }) => {
  switch (type) {
    case 'codeTag':
      return (
        <svg width="72" height="42" viewBox="0 0 78 46" fill="none">
          <path d="M22 10 L7 23 L22 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M56 10 L71 23 L56 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 6 L34 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4" />
        </svg>
      );
    case 'squiggle':
      return (
        <svg width="88" height="38" viewBox="0 0 96 42" fill="none">
          <path d="M4 22 Q 14 4, 24 22 T 44 22 T 64 22 T 84 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="90" cy="22" r="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case 'arrowSpark':
      return (
        <svg width="80" height="52" viewBox="0 0 88 58" fill="none">
          <path d="M8 46 C 22 14, 48 16, 68 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 4" />
          <path d="M60 13 L71 23 L57 29" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M78 8 L80 14 L86 16 L80 18 L78 24 L76 18 L70 16 L76 14 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case 'lightning':
      return (
        <svg width="64" height="52" viewBox="0 0 72 58" fill="none">
          <path d="M36 4 L18 30 H32 L24 54 L54 24 H38 L46 4 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="14" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M58 42 L66 42 M62 38 L62 46" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'starburst':
      return (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <path d="M28 4 L32 22 L50 28 L32 34 L28 52 L24 34 L6 28 L24 22 Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <circle cx="46" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="46" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'spiral':
      return (
        <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
          <path
            d="M27 27 C27 23, 33 23, 33 28 C33 35, 21 36, 20 27 C19 16, 36 14, 39 27 C42 40, 17 44, 13 28 C10 13, 34 6, 45 20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'zigzag':
      return (
        <svg width="84" height="32" viewBox="0 0 84 32" fill="none">
          <path d="M4 24 L16 8 L28 24 L40 8 L52 24 L64 8 L76 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'terminal':
      return (
        <svg width="68" height="48" viewBox="0 0 68 48" fill="none">
          <rect x="4" y="4" width="60" height="40" rx="6" stroke="currentColor" strokeWidth="1.7" strokeDasharray="5 3" />
          <path d="M16 18 L24 24 L16 30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 30 H44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'cursor':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <path d="M12 10 L20 40 L26 28 L39 24 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M6 6 L10 10 M16 4 L15 8 M4 16 L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'gridDots':
      return (
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
          {[10, 23, 36].map((cx) =>
            [10, 23, 36].map((cy) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" stroke="currentColor" strokeWidth="1.6" />
            ))
          )}
        </svg>
      );
    case 'curlyPair':
      return (
        <svg width="72" height="44" viewBox="0 0 72 44" fill="none">
          <path d="M22 6 C14 6, 16 18, 10 22 C16 26, 14 38, 22 38" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M50 6 C58 6, 56 18, 62 22 C56 26, 58 38, 50 38" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          <circle cx="29" cy="22" r="2" fill="currentColor" />
          <circle cx="36" cy="22" r="2" fill="currentColor" />
          <circle cx="43" cy="22" r="2" fill="currentColor" />
        </svg>
      );
    case 'orbit':
    default:
      return (
        <svg width="66" height="56" viewBox="0 0 66 56" fill="none">
          <ellipse cx="33" cy="28" rx="28" ry="12" transform="rotate(-24 33 28)" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" />
          <circle cx="33" cy="28" r="7" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="53" cy="18" r="2.5" fill="currentColor" />
        </svg>
      );
  }
};

const DoodleDecoration = ({ frame }) => {
  if (frame === 'oval') {
    return (
      <svg
        width="108"
        height="50"
        viewBox="0 0 108 50"
        fill="none"
        style={{ position: 'absolute', inset: '-10px -14px', pointerEvents: 'none' }}
      >
        <ellipse cx="54" cy="25" rx="49" ry="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
      </svg>
    );
  }
  if (frame === 'circle') {
    return (
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        style={{ position: 'absolute', top: '-14px', left: '-12px', pointerEvents: 'none' }}
      >
        <circle cx="36" cy="36" r="31" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 5" />
      </svg>
    );
  }
  if (frame === 'box') {
    return (
      <svg
        width="106"
        height="46"
        viewBox="0 0 106 46"
        fill="none"
        style={{ position: 'absolute', inset: '-9px -12px', pointerEvents: 'none' }}
      >
        <rect x="3" y="3" width="100" height="40" rx="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
      </svg>
    );
  }
  if (frame === 'wave') {
    return (
      <svg width="86" height="12" viewBox="0 0 92 14" fill="none" style={{ marginTop: '3px', display: 'block' }}>
        <path d="M2 7 Q 11 1, 20 7 T 38 7 T 56 7 T 74 7 T 90 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return null;
};

const DoodleStaticItem = ({ item, isDark, spinTransform }) => {
  const inkColor = item.accent
    ? 'var(--nb-accent)'
    : isDark
    ? '#ffffff'
    : '#1a1a2e';

  const itemOpacity = item.accent
    ? isDark
      ? 0.13
      : 0.15
    : isDark
    ? 0.095
    : 0.115;

  const content =
    item.kind === 'svg' ? (
      <SketchSvg type={item.svgType} />
    ) : (
      <div
        className="position-relative d-inline-flex flex-column align-items-center"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <DoodleDecoration frame={item.frame} />
        <div className="d-inline-flex align-items-center gap-2">
          {item.frame === 'braces' && (
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{'{'}</span>
          )}
          <i className={item.icon} style={{ fontSize: '1.4rem' }}></i>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.4px' }}>
            {item.label}
          </span>
          {item.frame === 'braces' && (
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{'}'}</span>
          )}
        </div>
        {item.frame === 'wave' && <DoodleDecoration frame="wave" />}
      </div>
    );

  if (item.spin) {
    return (
      <motion.div
        style={{
          position: 'absolute',
          ...item.pos,
          rotate: spinTransform,
          scale: item.scale,
          color: inkColor,
          opacity: itemOpacity,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        ...item.pos,
        transform: `rotate(${item.rot}deg) scale(${item.scale})`,
        color: inkColor,
        opacity: itemOpacity,
        pointerEvents: 'none',
        userSelect: 'none'
      }}
    >
      {content}
    </div>
  );
};

const DoodleParallaxPlane = ({ plane, items, scrollProgress, isDark, prefersReducedMotion, spinTransform }) => {
  const x = useTransform(scrollProgress, [0, 1], prefersReducedMotion ? [0, 0] : plane.xRange);
  const y = useTransform(scrollProgress, [0, 1], prefersReducedMotion ? [0, 0] : plane.yRange);

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        x,
        y,
        willChange: 'transform',
        pointerEvents: 'none'
      }}
    >
      {items.map((item) => (
        <DoodleStaticItem
          key={item.id}
          item={item}
          isDark={isDark}
          spinTransform={spinTransform}
        />
      ))}
    </motion.div>
  );
};

const OutlinedMarqueeBand = ({ band, scrollProgress, isDark, prefersReducedMotion }) => {
  const x = useTransform(
    scrollProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : band.xRange
  );
  const strokeColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 26, 46, 0.9)';

  return (
    <motion.div
      style={{
        x,
        position: 'absolute',
        top: band.top,
        left: '-12%',
        willChange: 'transform',
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          transform: `rotate(${band.tilt}deg)`,
          whiteSpace: 'nowrap',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2.8rem, 6.2vw, 5.8rem)',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: 'transparent',
          WebkitTextStroke: `1.3px ${strokeColor}`,
          opacity: isDark ? 0.05 : 0.06,
          userSelect: 'none'
        }}
      >
        {band.text.repeat(2)}
      </div>
    </motion.div>
  );
};

const ProjectsDoodles = React.memo(({ scrollProgress, isDark, prefersReducedMotion }) => {
  const spinTransform = useTransform(
    scrollProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 180]
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        contain: 'layout style paint',
        zIndex: 0
      }}
    >
      {MARQUEE_BANDS.map((band) => (
        <OutlinedMarqueeBand
          key={band.id}
          band={band}
          scrollProgress={scrollProgress}
          isDark={isDark}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}

      {PARALLAX_PLANES.map((plane) => (
        <DoodleParallaxPlane
          key={plane.id}
          plane={plane}
          items={DOODLE_SPECS.filter((item) => item.layer === plane.id)}
          scrollProgress={scrollProgress}
          isDark={isDark}
          prefersReducedMotion={prefersReducedMotion}
          spinTransform={spinTransform}
        />
      ))}
    </div>
  );
});

ProjectsDoodles.displayName = 'ProjectsDoodles';

export default ProjectsDoodles;
