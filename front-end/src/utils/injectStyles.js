import { useEffect } from 'react';

export function useInjectStyles(css, id) {
  useEffect(() => {
    if (!css) return;
    const existing = document.getElementById(id);
    if (existing) { existing.textContent = css; return; }
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(id);
      if (el && el.parentNode) el.parentNode.removeChild(el);
    };
  }, [css, id]);
}
