import { useInjectStyles } from '../../utils/injectStyles';

const G_GREEN = '#00b16a';
const TEAL = '#1a4a44';

const statsKeyframes = `
    @keyframes vssGradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
`;

const impactNumbers = [
    { value: '+2,500', label: 'متطوع نشط', icon: 'fa-solid fa-users' },
    { value: '+50,000', label: 'ساعة تطوعية', icon: 'fa-solid fa-clock' },
    { value: '+120', label: 'مجتمع مستفيد', icon: 'fa-solid fa-people-roof' },
    { value: '+35', label: 'مشروع تطوعي', icon: 'fa-solid fa-bullseye' },
];

export default function VolunteerStatsStrip({ isDark }) {
    useInjectStyles(statsKeyframes, 'volunteer-stats-strip-styles');

    return (
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10 -mt-7 md:-mt-8">
            <div className="rounded-2xl p-[1px]" style={{
                background: `linear-gradient(135deg, rgba(0,177,106,0.45), rgba(34,211,238,0.25), rgba(0,177,106,0.15))`,
                backgroundSize: '200% 200%',
                animation: 'vssGradientShift 8s ease infinite',
                boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
            }}>
                <div className="rounded-[23px] px-1.5 sm:px-2 md:px-3 py-2.5 md:py-3 backdrop-blur" style={{
                    backgroundColor: isDark ? 'rgba(15,25,40,0.92)' : 'rgba(255,255,255,0.96)',
                }}>
                    <div className="flex flex-wrap md:flex-nowrap w-full items-stretch">
                        {impactNumbers.map((stat, i) => (
                            <div key={i} className="flex-[1_1_50%] md:flex-[1_1_0] min-w-0 py-1.5 px-1 sm:px-2 md:px-2.5 flex items-center justify-center" style={{
                                borderInlineEnd: `solid ${(i % 2 === 0 && i < impactNumbers.length - 1) ? '1px' : '0'} ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                                ...(i < 2 ? { borderBottom: `solid 1px ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` } : {}),
                                paddingTop: '1.25rem',
                                paddingBottom: '1.25rem',
                            }}>
                                <div className="inline-flex items-center justify-center gap-1 md:gap-1.5 flex-col sm:flex-row text-center min-h-[72px] md:min-h-0" style={{ gap: '1.25rem' }}>
                                    <div className="w-[38px] md:w-11 h-[38px] md:h-11 rounded-xl flex items-center justify-center text-white text-lg shrink-0" style={{
                                        background: isDark ? `linear-gradient(135deg, ${G_GREEN}, rgba(34,211,238,0.7))` : `linear-gradient(135deg, ${TEAL}, ${G_GREEN})`,
                                        boxShadow: `0 6px 14px ${isDark ? 'rgba(0,177,106,0.3)' : 'rgba(26,74,68,0.3)'}`,
                                    }}>
                                        <i className={stat.icon}></i>
                                    </div>
                                    <div className="text-center sm:text-start">
                                        <p className="font-extrabold text-[1.05rem] sm:text-[1.15rem] md:text-[1.4rem] leading-tight tracking-tight" style={{ color: isDark ? '#e2e8f0' : '#1a1a2e' }}>
                                            {stat.value}
                                        </p>
                                        <p className="text-[0.7rem] sm:text-[0.72rem] md:text-[0.8rem] font-semibold" style={{ color: isDark ? 'rgba(255,255,255,0.65)' : '#64748b', marginTop: '0.25rem' }}>
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
