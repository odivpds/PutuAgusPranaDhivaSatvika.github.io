import { useEffect } from 'react';

/**
 * Provides heavy, damped inertial smooth scrolling ("hardscroll") across
 * desktop wheel and mobile touch input. Caches section bounds outside the
 * animation loop to avoid forced synchronous layouts.
 */
const useWeightedScroll = (enabled = true) => {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let lastAppliedY = window.scrollY;
    let prevAppliedY = window.scrollY;
    let rafId = null;
    let lastTime = 0;

    // Touch gesture tracking for weighted mobile hardscroll without breaking taps
    let touchMode = 'none'; // 'none' | 'undecided' | 'weighted' | 'native'
    let touchStartX = 0;
    let touchStartY = 0;
    let touchLastY = 0;
    let touchLastTime = 0;
    let touchVelocityY = 0;

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

    const isIgnoredTouchTarget = (target) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest('input, textarea, select, [data-no-weighted-scroll]'));
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

    const syncToActualScroll = () => {
      const actualY = window.scrollY;
      currentY = actualY;
      targetY = actualY;
      lastAppliedY = actualY;
      prevAppliedY = actualY;
    };

    const startRaf = () => {
      if (rafId === null) {
        lastTime = 0;
        rafId = window.requestAnimationFrame(step);
      }
    };

    function step(now) {
      if (!lastTime) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      targetY = Math.max(0, Math.min(targetY, cachedMaxScroll));

      // Slow-motion viscous damping inside #projects for a weighty hardscroll gallery feel
      const dampingSpeed = isInsideProjectsZone(currentY) ? 2.15 : 4.6;
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
    }

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) return;
      if (document.body.classList.contains('locked')) return;
      if (hasScrollableAncestor(e.target, e.deltaY)) return;

      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 18;
      else if (e.deltaMode === 2) delta *= window.innerHeight;

      const clampedDelta = Math.max(-190, Math.min(190, delta));

      if (rafId === null) {
        refreshBounds();
        syncToActualScroll();
      }

      const weightMultiplier = isInsideProjectsZone(targetY) ? 0.34 : 0.65;
      targetY = Math.max(0, Math.min(targetY + clampedDelta * weightMultiplier, cachedMaxScroll));

      startRaf();
    };

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1 || document.body.classList.contains('locked') || isIgnoredTouchTarget(e.target)) {
        touchMode = 'native';
        return;
      }

      if (rafId !== null) {
        cancelAnimation();
        syncToActualScroll();
      }

      const touch = e.touches[0];
      touchMode = 'undecided';
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchLastY = touch.clientY;
      touchLastTime = performance.now();
      touchVelocityY = 0;
    };

    const handleTouchMove = (e) => {
      if (touchMode === 'native' || touchMode === 'none') return;
      if (e.touches.length !== 1 || !e.cancelable) {
        touchMode = 'native';
        return;
      }

      const touch = e.touches[0];
      const totalDx = touch.clientX - touchStartX;
      const totalDy = touch.clientY - touchStartY;

      if (touchMode === 'undecided') {
        if (Math.abs(totalDx) <= 4 && Math.abs(totalDy) <= 4) return;
        if (
          Math.abs(totalDx) > Math.abs(totalDy) ||
          (window.scrollY <= 1 && totalDy > 0) ||
          hasScrollableAncestor(e.target, -totalDy)
        ) {
          touchMode = 'native';
          return;
        }
        touchMode = 'weighted';
        refreshBounds();
        if (rafId === null) syncToActualScroll();
        touchLastY = touch.clientY;
        touchLastTime = performance.now();
        e.preventDefault();
        return;
      }

      e.preventDefault();

      const now = performance.now();
      const stepDelta = touchLastY - touch.clientY;
      const dtMs = Math.max(4, now - touchLastTime);
      const instantVelocity = (stepDelta / dtMs) * 1000;

      touchVelocityY =
        dtMs > 120 ? instantVelocity : touchVelocityY * 0.55 + instantVelocity * 0.45;
      touchLastY = touch.clientY;
      touchLastTime = now;

      const touchWeight = isInsideProjectsZone(targetY) ? 0.54 : 0.78;
      targetY = Math.max(0, Math.min(targetY + stepDelta * touchWeight, cachedMaxScroll));

      startRaf();
    };

    const handleTouchEnd = () => {
      if (touchMode === 'weighted') {
        const isFreshVelocity = performance.now() - touchLastTime < 90;
        if (isFreshVelocity && Math.abs(touchVelocityY) > 80) {
          const inProjects = isInsideProjectsZone(targetY);
          const momentumFactor = inProjects ? 0.24 : 0.28;
          const maxFlickBoost = inProjects ? 360 : 480;
          const boost = Math.max(-maxFlickBoost, Math.min(maxFlickBoost, touchVelocityY * momentumFactor));
          targetY = Math.max(0, Math.min(targetY + boost, cachedMaxScroll));
        }
        startRaf();
      }
      touchMode = 'none';
      touchVelocityY = 0;
    };

    const handleExternalScroll = () => {
      const actualY = window.scrollY;
      const matchesOurScroll =
        Math.abs(actualY - lastAppliedY) < 5 || Math.abs(actualY - prevAppliedY) < 5;

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
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', handleExternalScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    window.addEventListener('resize', refreshBounds, { passive: true });

    return () => {
      cancelAnimation();
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('scroll', handleExternalScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', refreshBounds);
    };
  }, [enabled]);
};

export default useWeightedScroll;
