import { useInjectStyles } from '../../utils/injectStyles';
import { t } from '../../i18n';

const TEAL = '#1a4a44';
const TEAL_MID = '#112e2a';
const TEAL_DARK = '#0a1f1c';
const DEEP_BLUE = '#0a1628';
const G_GREEN = '#00b16a';
const ACCENT_CYAN = '#22d3ee';

const heroKeyframes = `
    @keyframes vhFadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes vhFadeInScale { from { opacity: 0; transform: scale(0.94) translateY(14px); } to { opacity: 1; transform: scale(1) translateY(0); } }
    @keyframes vhGlowPulse { 0%,100% { opacity: 0.35; transform: scale(1); } 50% { opacity: 0.55; transform: scale(1.08); } }
    @keyframes vhGradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
`;

export default function VolunteerHero({ isDark }) {
    useInjectStyles(heroKeyframes, 'volunteer-hero-styles');

    return (
        <div className="relative text-white pt-24 pb-[120px] md:text-center md:pt-16 md:pb-24" style={{
            background: isDark
                ? `linear-gradient(135deg, ${TEAL_DARK} 0%, #040f0d 55%, ${DEEP_BLUE} 100%)`
                : `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_MID} 55%, ${TEAL_DARK} 100%)`,
        }}>
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 80% 10%, rgba(34,211,238,0.10) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(0,177,106,0.12) 0%, transparent 55%)',
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '44px 44px',
                maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
            }} />

            <div className="absolute top-[-15%] right-[-5%] w-[420px] h-[420px] rounded-full pointer-events-none z-0" style={{
                background: `radial-gradient(circle, rgba(0,177,106,0.18) 0%, transparent 70%)`,
                animation: 'vhGlowPulse 8s ease-in-out infinite',
            }} />
            <div className="absolute bottom-[5%] left-[-8%] w-[340px] h-[340px] rounded-full pointer-events-none z-0" style={{
                background: `radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)`,
                animation: 'vhGlowPulse 10s ease-in-out infinite 1.5s',
            }} />

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
                    <div className="col-span-12 lg:col-span-7 lg:pr-6 xl:pr-8">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[0.8rem] font-semibold mb-3 backdrop-blur" style={{
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.14)',
                            animation: 'vhFadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
                        }}>
                            <i className="fa-solid fa-seedling" style={{ color: ACCENT_CYAN }}></i>
                            انضم لمجتمع المتطوعين
                        </span>
                        <h1 className="font-black text-white text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] leading-tight tracking-tight mb-2.5" style={{ animation: 'vhFadeInUp 0.7s cubic-bezier(0.22,1,0.36,1) both 0.08s' }}>
                            {t('volunteer.title')}{' '}
                            <span className="bg-gradient-to-r from-[#00b16a] to-[#22d3ee] bg-clip-text text-transparent">
                                {t('volunteer.subtitle')}
                            </span>
                        </h1>
                        <p className="text-[0.92rem] md:text-[1.05rem] leading-relaxed max-w-[560px] mb-4" style={{
                            color: 'rgba(255,255,255,0.72)',
                            animation: 'vhFadeInUp 0.7s cubic-bezier(0.22,1,0.36,1) both 0.16s',
                        }}>
                            {t('volunteer.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-1.5 justify-center md:justify-start" style={{ animation: 'vhFadeInUp 0.7s cubic-bezier(0.22,1,0.36,1) both 0.24s' }}>
                            <a href="#volunteer-form"
                                className="inline-flex items-center justify-center gap-2 h-[52px] px-4 rounded-xl font-bold text-base text-white"
                                style={{
                                    background: `linear-gradient(135deg, ${G_GREEN}, #059669)`,
                                    boxShadow: `0 8px 24px rgba(0,177,106,0.4)`,
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,177,106,0.55)`; e.currentTarget.style.background = `linear-gradient(135deg, #059669, ${G_GREEN})`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,177,106,0.4)`; e.currentTarget.style.background = `linear-gradient(135deg, ${G_GREEN}, #059669)`; }}
                            >
                                سجّل تطوعك الآن
                                <i className="fa-solid fa-arrow-left" style={{ fontSize: 14 }} />
                            </a>
                            <a href="#opportunities"
                                className="inline-flex items-center justify-center gap-2 h-[52px] px-4 rounded-xl font-semibold text-base text-white backdrop-blur"
                                style={{
                                    border: '1px solid rgba(255,255,255,0.25)',
                                    backgroundColor: 'rgba(255,255,255,0.04)',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
                            >
                                استكشف الفرص
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:block col-span-12 lg:col-span-5">
                        <div className="relative aspect-square w-full max-w-[340px] mr-auto ml-0" style={{ animation: 'vhFadeInScale 0.9s cubic-bezier(0.22,1,0.36,1) both 0.3s' }}>
                            {[0, 1, 2].map(i => (
                                <div key={i} className="absolute rounded-full" style={{
                                    inset: i * 18,
                                    border: `1px solid rgba(255,255,255,${0.08 + i * 0.03})`,
                                }} />
                            ))}
                            <div className="absolute rounded-full" style={{
                                inset: '20%',
                                background: `conic-gradient(from 180deg, rgba(0,177,106,0.4), rgba(34,211,238,0.35), rgba(0,177,106,0.4))`,
                                filter: 'blur(8px)',
                                opacity: 0.85,
                                animation: 'vhGradientShift 12s linear infinite',
                                backgroundSize: '200% 200%',
                            }} />
                            <div className="absolute rounded-full flex items-center justify-center backdrop-blur" style={{
                                inset: '28%',
                                background: `linear-gradient(135deg, rgba(10,31,28,0.85), rgba(10,31,28,0.7))`,
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.5)',
                            }}>
                                <i className="fa-solid fa-hands-holding-heart" style={{ fontSize: 64, color: '#fff', opacity: 0.95 }}></i>
                            </div>
                            {[
                                { icon: 'fa-solid fa-hospital', top: '-2%', left: '-4%' },
                                { icon: 'fa-solid fa-book-open', top: '6%', right: '-2%' },
                                { icon: 'fa-solid fa-laptop-code', bottom: '6%', left: '-2%' },
                                { icon: 'fa-solid fa-people-roof', bottom: '-2%', right: '-4%' },
                            ].map((b, i) => (
                                <div key={i} className="absolute w-16 h-16 rounded-[18px] flex items-center justify-center text-white text-2xl backdrop-blur" style={{
                                    ...b,
                                    background: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))`,
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                                    animation: `vhFadeInScale 0.6s cubic-bezier(0.22,1,0.36,1) both ${0.5 + i * 0.12}s`,
                                }}>
                                    <i className={b.icon}></i>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
