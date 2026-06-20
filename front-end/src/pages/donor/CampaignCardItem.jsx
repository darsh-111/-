import { useTheme } from '../../contexts/ThemeContext';
import { getLanguage, formatCurrency, formatNumber } from '../../i18n';
import { useInjectStyles } from '../../utils/injectStyles';
import SafeImage from './SafeImage';

const G_GREEN = '#00b16a';
const G_GREEN_DK = '#009659';
const ARABIC_FONT = "'Cairo', 'Tajawal', sans-serif";
const LATIN_FONT = "'Inter', 'Manrope', sans-serif";
const DARK_CARD = '#1e293b';
const DARK_TEXT = '#e2e8f0';
const DARK_HEAD = '#f8fafc';

const loc = (ar, en) => (getLanguage() === 'en' ? (en || ar) : ar);

const cfadeUpStyles = `@keyframes cfadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }`;

function CampaignCardItem({ project, index, onClick, onDonate }) {
    const { isDark } = useTheme();
    useInjectStyles(cfadeUpStyles, 'cfade-up');

    const pct = Math.min(100, Math.round((project.raised / project.goal) * 100));
    const title = loc(project.title, project.titleEn);
    const desc = loc(project.description, project.descriptionEn);
    const prog = loc(project.program, project.programEn);

    return (
        <div
            onClick={() => onClick(project)}
            style={{
                width: '100%', maxWidth: 320, margin: '0 auto', display: 'flex', flexDirection: 'column',
                borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', position: 'relative',
                backgroundColor: isDark ? DARK_CARD : '#fff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#eaf3ef'}`,
                boxShadow: isDark
                    ? '0 8px 30px rgba(0, 19, 11, 0.35), 0 2px 8px rgba(0, 0, 0, 0.20)'
                    : '0 8px 30px rgba(1, 31, 19, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                animation: `cfadeUp 0.5s ease both`,
                animationDelay: `${index * 0.06}s`,
            }}
            className="hover:-translate-y-1.5 group"
        >
            <div className="relative h-40 overflow-hidden shrink-0">
                <SafeImage src={project.image} alt={title} className="card-image group-hover:scale-[1.08]" style={{ filter: `brightness(${isDark ? 0.85 : 0.93})` }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, transparent 25%, rgba(0,0,0,0.4) 100%)', pointerEvents: 'none' }} />

                <span style={{
                    position: 'absolute', zIndex: 4, top: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 10px', borderRadius: 999, fontSize: '0.65rem', fontWeight: 700,
                    color: isDark ? DARK_TEXT : '#fff',
                    background: isDark ? 'rgba(15,23,42,0.6)' : 'rgba(26,74,68,0.55)',
                    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                    border: `1px solid ${isDark ? 'rgba(16,185,129,0.30)' : 'rgba(255,255,255,0.25)'}`,
                }}>
                    <i className="fa-solid fa-tag" style={{ fontSize: '0.75rem' }} />
                    {prog}
                </span>
                <span style={{
                    position: 'absolute', zIndex: 4, top: 10, left: 10, display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 10px', borderRadius: 999, fontSize: '0.65rem', fontWeight: 700,
                    color: isDark ? DARK_TEXT : '#fff',
                    background: isDark ? 'rgba(15,23,42,0.6)' : 'rgba(26,74,68,0.55)',
                    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                    border: `1px solid ${isDark ? 'rgba(16,185,129,0.30)' : 'rgba(255,255,255,0.25)'}`,
                }}>
                    <i className="fa-solid fa-hourglass-half" style={{ fontSize: '0.75rem' }} />
                    {project.daysLeft} {loc('يوم', 'days')}
                </span>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-3 flex items-center justify-center" style={{ background: 'rgba(10,31,28,0.62)', backdropFilter: 'blur(3px)' }}>
                    <span style={{
                        padding: '0 12px', paddingTop: 4, paddingBottom: 4,
                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)',
                        borderRadius: 999, border: '1px solid rgba(255,255,255,0.35)',
                        color: '#fff', fontWeight: 700, fontSize: '0.88rem',
                        letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: 8, userSelect: 'none',
                    }}>
                        <i className="fa-solid fa-eye" style={{ fontSize: '0.8rem' }} />
                        {loc('التفاصيل', 'Details')}
                    </span>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '18px', direction: 'rtl' }}>
                <p style={{
                    fontWeight: 800, fontSize: '1.05rem', fontFamily: ARABIC_FONT,
                    color: isDark ? DARK_HEAD : '#2d3436', lineHeight: 1.45, marginBottom: 6,
                    height: 50, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                    {title}
                </p>

                <p style={{
                    fontFamily: ARABIC_FONT, fontSize: '0.85rem', lineHeight: 1.65,
                    color: isDark ? `rgba(226,232,240,0.65)` : '#636e72',
                    marginBottom: 14, height: 42, overflow: 'hidden',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                    {desc}
                </p>

                <div style={{ marginTop: 'auto' }}>
                    {project.donationAmount && (
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: 8, marginBottom: 12, padding: '6px 12px',
                            borderRadius: '12px',
                            backgroundColor: isDark ? 'rgba(0,177,106,0.10)' : '#f0faf5',
                            border: `1px solid ${isDark ? 'rgba(0,177,106,0.20)' : '#d1f2e4'}`,
                        }}>
                            <i className="fa-solid fa-hand-holding-heart" style={{ fontSize: '0.85rem', color: G_GREEN }} />
                            <span style={{ fontFamily: ARABIC_FONT, fontWeight: 800, fontSize: '0.95rem', color: G_GREEN }}>
                                {formatNumber(project.donationAmount)}
                            </span>
                            <span style={{ fontFamily: ARABIC_FONT, fontWeight: 500, fontSize: '0.7rem', color: isDark ? 'rgba(226,232,240,0.5)' : '#636e72' }}>
                                {loc('جنية مصري', 'EGP')}
                            </span>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                        <span style={{ fontWeight: 800, color: G_GREEN, fontSize: '0.95rem', fontFamily: ARABIC_FONT }}>
                            {formatCurrency(project.raised)}
                        </span>
                        <span style={{
                            backgroundColor: isDark ? 'rgba(0,177,106,0.15)' : '#e6f7ef',
                            color: G_GREEN, fontWeight: 800, fontSize: '0.72rem',
                            borderRadius: '999px', padding: '1px 8px', fontFamily: LATIN_FONT,
                        }}>
                            {pct}%
                        </span>
                        <span style={{ color: isDark ? 'rgba(226,232,240,0.5)' : '#636e72', fontSize: '0.75rem', fontFamily: ARABIC_FONT }}>
                            {loc('الهدف:', 'Goal:')} {formatCurrency(project.goal)}
                        </span>
                    </div>

                    <div style={{ height: 8, borderRadius: 4, marginBottom: 18, backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : '#e6f7ef', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 4, backgroundColor: G_GREEN, width: `${pct}%` }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <i className="fa-solid fa-users" style={{ fontSize: '0.78rem', color: G_GREEN }} />
                            <span style={{ fontFamily: ARABIC_FONT, color: isDark ? '#94a3b8' : '#636e72', fontSize: '0.8rem' }}>
                                {formatNumber(project.donors)} {loc('متبرع', 'donors')}
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <i className="fa-solid fa-clock" style={{ fontSize: '0.78rem', color: G_GREEN }} />
                            <span style={{ fontFamily: ARABIC_FONT, color: isDark ? '#94a3b8' : '#636e72', fontSize: '0.8rem' }}>
                                {project.daysLeft} {loc('يوم', 'days left')}
                            </span>
                        </div>
                    </div>

                    <button
                        className="donate-btn"
                        onClick={(e) => { e.stopPropagation(); onDonate(project); }}
                        style={{
                            width: '100%', borderRadius: '12px', paddingTop: 8, paddingBottom: 8,
                            fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.9rem',
                            textTransform: 'none', backgroundColor: G_GREEN, color: '#fff',
                            position: 'relative', overflow: 'hidden',
                            boxShadow: `0 4px 14px rgba(0,177,106,0.30)`,
                            transition: 'all 0.3s ease-out', border: 'none', cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = G_GREEN_DK; e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = `0 8px 22px rgba(0,177,106,0.42)`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = G_GREEN; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 4px 14px rgba(0,177,106,0.30)`; }}
                        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                    >
                        <span>{loc('تبرع الآن', 'Donate Now')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CampaignCardItem;
export { CampaignCardItem };
