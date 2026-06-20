import { useTheme } from '../../contexts/ThemeContext';

function TestimonialCardItem({ text, name, role, initial }) {
    const { isDark } = useTheme();
    return (
        <div
            className="h-full p-4 rounded-3xl relative transition-all duration-300 hover:-translate-y-1.5"
            style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.05)',
                border: isDark ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = isDark ? '0 8px 28px rgba(0,0,0,0.35)' : '0 8px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = isDark ? '0 2px 12px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.05)';
            }}
        >
            <div
                className="absolute top-2 right-3 text-6xl leading-none font-serif z-0 pointer-events-none"
                style={{
                    color: isDark ? 'rgba(255,255,255,0.06)' : '#E0F2F1',
                }}
            >
                "
            </div>

            <p
                className="text-sm leading-relaxed relative z-[2] mb-4"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
                {text}
            </p>

            <div className="flex items-center flex-row gap-2 justify-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: '#0F5C54' }}
                >
                    {initial || name.charAt(0)}
                </div>
                <div className="text-right">
                    <p className="font-bold text-sm" style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>{name}</p>
                    <span className="text-xs block" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{role}</span>
                </div>
            </div>
        </div>
    );
}

export default TestimonialCardItem;
