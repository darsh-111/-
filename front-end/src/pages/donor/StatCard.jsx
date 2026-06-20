import { useTheme } from '../../contexts/ThemeContext';

const G_GREEN = '#00b16a';
const DARK_HEAD = '#f8fafc';

export default function StatCard({ icon, value, label, color = G_GREEN, isDark: isDarkProp }) {
    const { isDark: themeDark } = useTheme();
    const isDark = isDarkProp !== undefined ? isDarkProp : themeDark;
    return (
        <div style={{
            textAlign: 'center', padding: '9px 8px', borderRadius: '14px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafb',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f0f4f8'}`,
        }}
            className="hover:bg-[#00b16a]/[0.06] hover:border-[#00b16a]/[0.2] transition-colors"
        >
            <div style={{ width: 30, height: 30, borderRadius: '8px', margin: '0 auto 4px', backgroundColor: 'rgba(0,177,106,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={`fa-solid ${icon}`} style={{ color: G_GREEN, fontSize: '0.75rem' }} />
            </div>
            <p style={{ fontWeight: 800, fontSize: '0.95rem', color: isDark ? DARK_HEAD : '#1a1a1a', lineHeight: 1.2, margin: 0 }}>
                {value}
            </p>
            <p style={{ fontSize: '0.65rem', color: isDark ? 'rgba(226,232,240,0.55)' : '#999', marginTop: 2, margin: 0 }}>
                {label}
            </p>
        </div>
    );
}
