import { useEffect } from 'react';

/**
 * Provides heavy, damped inertial smooth scrolling for fine-pointer desktop wheel input.
 * Caches section bounds outside the animation loop to avoid forced synchronous layouts.
 */
const useWeightedScroll = (enabled = true) => {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let lastAppliedY = window.scrollY;
    let prevAppliedY = window.scrollY;
    let rafId = null;
    let lastTime = 0;

    // Cached layout metrics (never read layout inside RAF step)
    let cachedMaxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    let projectsTop = Infinity;
    let projectsBottom = -Infinity;

    const refreshBounds = () => {
      cachedMaxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        projectsTop = rect.top + window.scrollY;
        projectsBottom = rect.bottom + window.scrollY;
      } else {
        projectsTop = Infinity;
        projectsBottom = -Infinity;
      }
    };

    refreshBounds();

    const isInsideProjectsZone = (yPos) => {
      const viewportMid = yPos + window.innerHeight * 0.5;
      return viewportMid >= projectsTop && viewportMid <= projectsBottom;
    };

    const hasScrollableAncestor = (target, deltaY) => {
      let el = target instanceof Element ? target : null;
      while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        const canScroll =
          (overflowY === 'auto' || overflowY === 'scroll') &&
          el.scrollHeight > el.clientHeight + 1;
        if (canScroll) {
          const atTop = el.scrollTop <= 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
          if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) {
            return true;
          }
        }
        el = el.parentElement;
      }
      return false;
    };

    const cancelAnimation = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
        lastTime = 0;
      }
    };

    const step = (now) => {
      if (!lastTime) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      targetY = Math.max(0, Math.min(targetY, cachedMaxScroll));

      // Heavier damping inside #projects for a slower, weighted gallery feel
      const dampingSpeed = isInsideProjectsZone(currentY) ? 3.5 : 6.0;
      const factor = 1 - Math.exp(-dampingSpeed * dt);

      currentY += (targetY - currentY) * factor;
      prevAppliedY = lastAppliedY;

      if (Math.abs(targetY - currentY) < 0.35) {
        currentY = targetY;
        lastAppliedY = Math.round(currentY);
        window.scrollTo({ top: lastAppliedY, behavior: 'instant' });
        rafId = null;
        lastTime = 0;
        return;
      }

      lastAppliedY = currentY;
      window.scrollTo({ top: currentY, behavior: 'instant' });
      rafId = window.requestAnimationFrame(step);
    };

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) return;
      if (document.body.classList.contains('locked')) return;
      if (hasScrollableAncestor(e.target, e.deltaY)) return;

      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 18;
      else if (e.deltaMode === 2) delta *= window.innerHeight;

      const clampedDelta = Math.max(-240, Math.min(240, delta));

      if (rafId === null) {
        refreshBounds();
        currentY = window.scrollY;
        targetY = window.scrollY;
        lastAppliedY = window.scrollY;
        prevAppliedY = window.scrollY;
      }

      const weightMultiplier = isInsideProjectsZone(targetY) ? 0.45 : 0.72;
      targetY = Math.max(0, Math.min(targetY + clampedDelta * weightMultiplier, cachedMaxScroll));

      if (rafId === null) {
        lastTime = 0;
        rafId = window.requestAnimationFrame(step);
      }
    };

    const handleExternalScroll = () => {
      const actualY = window.scrollY;
      const matchesOurScroll =
        Math.abs(actualY - lastAppliedY) < 3 || Math.abs(actualY - prevAppliedY) < 3;

      if (rafId === null || !matchesOurScroll) {
        cancelAnimation();
        currentY = actualY;
        targetY = actualY;
        lastAppliedY = actualY;
        prevAppliedY = actualY;
      }
    };

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        cancelAnimation();
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(refreshBounds) : null;
    if (resizeObserver) {
      resizeObserver.observe(document.documentElement);
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleExternalScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    window.addEventListener('resize', refreshBounds, { passive: true });

    return () => {
      cancelAnimation();
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleExternalScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', refreshBounds);
    };
  }, [enabled]);
};

export default useWeightedScroll;
