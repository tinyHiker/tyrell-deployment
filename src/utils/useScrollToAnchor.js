import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollToAnchor() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);  // Re-run on location changes
}
