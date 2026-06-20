import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const EMERALD = '#10b981';

function AnimatedProgress({ value }) {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const c = Math.min(value, 100);
    return (
        <div ref={ref} style={{ height: 6, borderRadius: 3, backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(16,185,129,0.10)', overflow: 'hidden', marginBottom: 8 }}>
            <div style={{
                height: '100%', borderRadius: 3, backgroundColor: EMERALD,
                width: vis ? `${c}%` : '0%',
                transition: vis ? 'width 1s cubic-bezier(.4,0,.2,1)' : 'none',
                ...(isDark && { boxShadow: `0 0 6px rgba(16,185,129,0.5), 0 0 14px rgba(16,185,129,0.2)` }),
            }} />
        </div>
    );
}

export default AnimatedProgress;
export { AnimatedProgress };
