import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const isLanding = pathname === '/';
    const isPathChange = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    // Prevent browser from restoring scrolled positions from history
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (isPathChange) {
      // Switched route: immediately disable smooth scrolling so page opens from top with ZERO animation
      root.classList.remove('smooth-scroll');
      root.style.scrollBehavior = 'auto';

      if (hash) {
        const targetElement = document.getElementById(hash.replace('#', ''));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'instant' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          root.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        root.scrollTop = 0;
        document.body.scrollTop = 0;
      }

      // If we are now on the landing page, enable smooth scrolling strictly for landing interactions
      if (isLanding) {
        const frameId = requestAnimationFrame(() => {
          root.classList.add('smooth-scroll');
          root.style.scrollBehavior = 'smooth';
        });
        return () => cancelAnimationFrame(frameId);
      }
    } else {
      // Same route (e.g. clicking anchor links on the landing page)
      if (isLanding) {
        root.classList.add('smooth-scroll');
        root.style.scrollBehavior = 'smooth';

        if (hash) {
          const targetElement = document.getElementById(hash.replace('#', ''));
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        // Any non-landing module stays strictly instant
        root.classList.remove('smooth-scroll');
        root.style.scrollBehavior = 'auto';
      }
    }
  }, [pathname, hash]);

  return null;
}
