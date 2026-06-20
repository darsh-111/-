import { Link } from 'react-router-dom';
import { useInjectStyles } from '../../utils/injectStyles';
import { t } from '../../i18n';

const homeKeyframesStyles = `
    @keyframes homeFadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.75; transform: scale(1.05); }
    }
    @keyframes circlePulse {
        0%, 100% { transform: scale(1); opacity: 0.05; }
        50% { transform: scale(1.08); opacity: 0.10; }
    }
    @keyframes sineFloat {
        0%   { transform: translateY(0px); }
        25%  { transform: translateY(-10px); }
        50%  { transform: translateY(-18px); }
        75%  { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
    }
    @keyframes heartPulse {
        0%, 100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 12px rgba(255,107,107,0.5)); }
        50%      { transform: scale(1.12); opacity: 0.85; filter: drop-shadow(0 0 24px rgba(255,107,107,0.8)); }
    }
    @keyframes particleRise {
        0%   { transform: translateY(0) scale(1); opacity: 0.7; }
        60%  { opacity: 0.4; }
        100% { transform: translateY(-90px) scale(0.5); opacity: 0; }
    }
    @keyframes orbitSpin {
        from { transform: rotateX(65deg) rotateZ(0deg); }
        to   { transform: rotateX(65deg) rotateZ(360deg); }
    }
    @keyframes orbitSpinReverse {
        from { transform: rotateX(65deg) rotateZ(360deg); }
        to   { transform: rotateX(65deg) rotateZ(0deg); }
    }
    @keyframes badgeFloat1 {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        33%      { transform: translateY(-8px) translateX(4px); }
        66%      { transform: translateY(4px) translateX(-3px); }
    }
    @keyframes badgeFloat2 {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        40%      { transform: translateY(6px) translateX(-5px); }
        70%      { transform: translateY(-5px) translateX(3px); }
    }
    @keyframes homeSlideUp {
        from { opacity: 0; transform: translateY(16px) scale(0.96); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
    }
`;

function HomeHero({ currentSlide, heroSlides, heroIndex, setHeroIndex, isDark, announcementVisible, activeVerses, currentVerseIndex, islamicDisplayMode, heroBanner }) {
    useInjectStyles(homeKeyframesStyles, 'home-keyframes');

    const heroResponsiveStyles = `
        @media (min-width: 640px) {
            .hero-section { padding-bottom: 80px; }
        }
        @media (min-width: 768px) {
            .hero-section {
                padding-top: ${announcementVisible ? '148px' : '112px'};
                padding-bottom: 160px;
                min-height: 90vh;
            }
        }
    `;
    useInjectStyles(heroResponsiveStyles, 'hero-responsive');

    const hasMultipleSlides = heroSlides.length > 1;
    const heroOverlay = 'rgba(13, 66, 61, 0.6)';
    const heroBase = '#0d6b63';
    const heroDark = '#06423d';
    const heroGlow = 'rgba(77,182,172,0.15)';

    return (
        <section
            className={`relative overflow-hidden flex items-center text-white`}
            style={{
                paddingTop: announcementVisible ? '88px' : '64px',
                paddingBottom: '60px',
                minHeight: 'auto',
                background: currentSlide.image
                    ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${currentSlide.image}) center/cover`
                    : `radial-gradient(circle at 30% 40%, ${heroOverlay}, transparent 40%), linear-gradient(135deg, ${heroBase} 0%, ${heroDark} 100%)`,
                transition: 'background 0.6s ease',
            }}
        >
            <div className="hero-section w-full max-w-[1200px] mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center w-full md:min-h-[70vh]">
                    <div className="relative z-[5] text-center md:text-right order-1">
                        <h1
                            className="font-black leading-tight mb-2 text-white"
                            style={{
                                fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                                animation: 'homeFadeInUp 0.8s ease forwards',
                            }}
                        >
                            {currentSlide.title || heroBanner?.title || t('home.heroTitle')}
                        </h1>
                        <p
                            className="mb-4 leading-relaxed text-white/85"
                            style={{
                                fontSize: 'clamp(0.88rem, 2vw, 1.25rem)',
                                animation: 'homeFadeInUp 0.8s ease forwards 0.2s',
                                opacity: 0,
                                animationFillMode: 'forwards',
                            }}
                        >
                            {currentSlide.subtitle || heroBanner?.subtitle || t('home.heroSubtitle')}
                        </p>
                        {activeVerses.length > 0 && islamicDisplayMode === 'rotating' && (
                            <div className="mb-4 min-h-[60px]">
                                <p className="text-sm md:text-base text-white/90 italic" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)' }}>
                                    "{activeVerses[currentVerseIndex].text}"
                                    {activeVerses[currentVerseIndex].reference && <span className="block mt-0.5 text-xs opacity-80">- {activeVerses[currentVerseIndex].reference}</span>}
                                </p>
                            </div>
                        )}
                        {activeVerses.length > 0 && islamicDisplayMode === 'stacked' && (
                            <div className="flex flex-col gap-2 mb-4">
                                {activeVerses.map(verse => (
                                    <p key={verse.id} className="text-sm md:text-base text-white/90 italic border-r-4 border-primary-500 pr-2" style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}>
                                        "{verse.text}"
                                        {verse.reference && <span className="block mt-0.5 text-xs opacity-80">- {verse.reference}</span>}
                                    </p>
                                ))}
                            </div>
                        )}

                        <div
                            className="flex flex-col sm:flex-row gap-2 items-center sm:items-stretch justify-center md:justify-start"
                            style={{
                                animation: 'homeFadeInUp 0.8s ease forwards 0.4s',
                                opacity: 0,
                                animationFillMode: 'forwards',
                            }}
                        >
                            <Link
                                to={currentSlide.ctaLink || '/donate'}
                                className="inline-flex items-center justify-center rounded-full px-8 py-3 text-lg font-bold bg-primary-700 text-white shadow-lg hover:bg-primary-800 transition-colors"
                                style={{ boxShadow: '0 4px 14px 0 rgba(0,0,0,0.3)' }}
                            >
                                {currentSlide.ctaText || t('common.donate')}
                                {currentSlide.ctaIcon
                                    ? <i className={currentSlide.ctaIcon} style={{ marginInlineStart: 8 }}></i>
                                    : <i className="fa-solid fa-heart" style={{ marginInlineStart: 8 }}></i>
                                }
                            </Link>
                            <Link
                                to="/campaigns"
                                className="inline-flex items-center justify-center rounded-full px-8 py-3 text-lg font-bold text-white border border-white/50 hover:border-white hover:bg-white/10 transition-colors"
                            >
                                {t('common.learnMore')}
                            </Link>
                        </div>

                        {hasMultipleSlides && (
                            <div className="flex gap-1 mt-3 justify-center md:justify-start">
                                {heroSlides.map((_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setHeroIndex(i)}
                                        className="h-2 rounded-full cursor-pointer transition-all duration-300"
                                        style={{
                                            width: i === heroIndex ? 28 : 10,
                                            backgroundColor: i === heroIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative w-full max-w-[280px] sm:max-w-[380px] md:max-w-[500px] aspect-square mx-auto flex justify-center items-center order-2">
                        <div className="absolute inset-0 m-auto rounded-full pointer-events-none" style={{ width: '55%', height: '55%', backgroundColor: heroGlow, opacity: 0.06, animation: 'circlePulse 8s ease-in-out infinite' }} />
                        <div className="absolute inset-0 m-auto rounded-full pointer-events-none sm:w-[75%] sm:h-[75%] md:w-full md:h-full" style={{ maxWidth: 280, maxHeight: 280, backgroundColor: heroGlow, opacity: 0.06, animation: 'circlePulse 8s ease-in-out infinite', animationDelay: '1.5s' }} />
                        <div className="absolute inset-0 m-auto rounded-full pointer-events-none" style={{ width: 'calc(150/400*55%)', height: 'calc(150/400*55%)', backgroundColor: heroGlow, opacity: 0.06, animation: 'circlePulse 8s ease-in-out infinite', animationDelay: '3s' }} />
                        <div
                            className="absolute rounded-full pointer-events-none z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{
                                width: 'clamp(160px, 50%, 320px)',
                                height: 'clamp(160px, 50%, 320px)',
                                background: 'radial-gradient(circle, rgba(77,182,172,0.22) 0%, transparent 70%)',
                            }}
                        />

                        <div
                            className="absolute top-1/2 left-1/2 rounded-full border border-white/10 pointer-events-none z-[3]"
                            style={{
                                width: 'clamp(187px, 27.2vw, 340px)',
                                height: 'clamp(187px, 27.2vw, 340px)',
                                marginTop: 'clamp(-93.5px, -13.6vw, -170px)',
                                marginLeft: 'clamp(-93.5px, -13.6vw, -170px)',
                                animation: 'orbitSpin 22s linear infinite',
                                transformStyle: 'preserve-3d',
                                willChange: 'transform',
                            }}
                        >
                            <div className="absolute -top-[3px] left-1/2 w-[6px] h-[6px] rounded-full bg-white/25" />
                        </div>
                        <div
                            className="absolute top-1/2 left-1/2 rounded-full border border-white/10 pointer-events-none z-[3]"
                            style={{
                                width: 'clamp(242px, 35.2vw, 440px)',
                                height: 'clamp(242px, 35.2vw, 440px)',
                                marginTop: 'clamp(-121px, -17.6vw, -220px)',
                                marginLeft: 'clamp(-121px, -17.6vw, -220px)',
                                animation: 'orbitSpinReverse 32s linear infinite',
                                transformStyle: 'preserve-3d',
                                willChange: 'transform',
                            }}
                        >
                            <div className="absolute -top-[3px] left-1/2 w-[6px] h-[6px] rounded-full bg-white/25" />
                        </div>

                        <div className="absolute top-[38%] left-[42%] text-[0.65rem] text-red-400/70 pointer-events-none z-[4]" style={{ animation: 'particleRise 4s ease-out infinite' }}><i className="fa-solid fa-heart" /></div>
                        <div className="absolute top-[38%] left-[55%] text-[0.5rem] text-red-400/70 pointer-events-none z-[4]" style={{ animation: 'particleRise 4s ease-out infinite', animationDelay: '0.8s' }}><i className="fa-solid fa-heart" /></div>
                        <div className="absolute top-[38%] left-[48%] text-[0.75rem] text-red-400/70 pointer-events-none z-[4]" style={{ animation: 'particleRise 4s ease-out infinite', animationDelay: '1.6s' }}><i className="fa-solid fa-heart" /></div>
                        <div className="absolute top-[38%] left-[60%] text-[0.55rem] text-red-400/70 pointer-events-none z-[4]" style={{ animation: 'particleRise 4s ease-out infinite', animationDelay: '2.4s' }}><i className="fa-solid fa-heart" /></div>
                        <div className="hidden md:contents">
                            <div className="absolute top-[38%] left-[38%] text-[0.6rem] text-red-400/70 pointer-events-none z-[4]" style={{ animation: 'particleRise 4s ease-out infinite', animationDelay: '3.2s' }}><i className="fa-solid fa-heart" /></div>
                            <div className="absolute top-[38%] left-[64%] text-[0.5rem] text-red-400/70 pointer-events-none z-[4]" style={{ animation: 'particleRise 4s ease-out infinite', animationDelay: '1.2s' }}><i className="fa-solid fa-heart" /></div>
                            <div className="absolute top-[38%] left-[45%] text-[0.7rem] text-red-400/70 pointer-events-none z-[4]" style={{ animation: 'particleRise 4s ease-out infinite', animationDelay: '2.8s' }}><i className="fa-solid fa-heart" /></div>
                        </div>

                        <div
                            className="relative z-[2] leading-none"
                            style={{
                                fontSize: 'clamp(4rem, 12vw, 8.5rem)',
                                color: '#fff',
                                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.25))',
                                animation: 'sineFloat 5s ease-in-out infinite',
                                willChange: 'transform',
                            }}
                        >
                            <i className="fa-solid fa-hand-holding" />
                        </div>

                        <div
                            className="absolute top-[22%] left-1/2 -translate-x-1/2 z-[5] leading-none"
                            style={{
                                fontSize: 'clamp(2rem, 6vw, 4rem)',
                                color: '#ff6b6b',
                                animation: 'heartPulse 2.5s ease-in-out infinite',
                                willChange: 'transform, opacity, filter',
                            }}
                        >
                            <i className="fa-solid fa-heart" />
                        </div>

                        <div
                            className="hidden sm:flex absolute items-center gap-1 px-2 py-1 rounded-[14px] z-10 pointer-events-none whitespace-nowrap text-white font-semibold text-xs"
                            style={{
                                top: '12%',
                                right: '-8%',
                                background: 'rgba(255,255,255,0.12)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                                willChange: 'transform',
                                animation: 'badgeFloat1 6s ease-in-out infinite',
                            }}
                        >
                            <i className="fa-solid fa-hand-holding-heart" style={{ fontSize: '0.9rem', color: '#4DB6AC' }} />
                            {'تبرع جديد'}
                        </div>
                        <div
                            className="hidden sm:flex absolute items-center gap-1 px-2 py-1 rounded-[14px] z-10 pointer-events-none whitespace-nowrap text-white font-semibold text-xs"
                            style={{
                                bottom: '18%',
                                left: '-5%',
                                background: 'rgba(255,255,255,0.12)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                                willChange: 'transform',
                                animation: 'badgeFloat2 8s ease-in-out infinite',
                            }}
                        >
                            <i className="fa-solid fa-chart-line" style={{ fontSize: '0.9rem', color: '#FFD54F' }} />
                            {'نشاط حملة'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-[2] pointer-events-none">
                <svg
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    style={{ display: 'block', height: 'clamp(60px, 10vw, 150px)', width: 'calc(100% + 1.3px)' }}
                >
                    <path
                        fill={isDark ? 'var(--color-neutral-900)' : '#f8fafc'}
                        fillOpacity="1"
                        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </section>
    );
}

export default HomeHero;
