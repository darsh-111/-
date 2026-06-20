import { t } from '../../i18n';
import { useInjectStyles } from '../../utils/injectStyles';

const panelStyles = `
    @keyframes floatParticle {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
        50% { transform: translateY(-20px) scale(1.5); opacity: 0.4; }
    }
    @keyframes glow {
        0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3)); }
        50% { filter: drop-shadow(0 0 24px rgba(255, 255, 255, 0.6)); }
    }
    @keyframes pulseRing {
        0% { transform: scale(0.8); opacity: 0.5; }
        100% { transform: scale(2.4); opacity: 0; }
    }
`;

const particles = [
    { top: '10%', left: '12%', delay: '0s' },
    { top: '25%', left: '85%', size: 10, delay: '0.9s' },
    { top: '45%', left: '18%', size: 6, delay: '1.7s' },
    { top: '65%', left: '72%', delay: '2.3s' },
    { top: '18%', left: '55%', size: 14, delay: '3.1s' },
    { top: '80%', left: '38%', size: 5, delay: '1.2s' },
    { top: '88%', left: '78%', size: 8, delay: '2.8s' },
    { top: '35%', left: '40%', size: 4, delay: '0.4s' },
];

function LoginBrandingPanel() {
    useInjectStyles(panelStyles, 'login-branding-panel-styles');

    return (
        <div className="hidden md:flex w-1/2 relative overflow-hidden">
            <div className="relative flex flex-col items-center justify-center w-full h-full min-h-full overflow-hidden p-8"
                style={{ background: 'linear-gradient(145deg, #0f766e 0%, #115e59 50%, #134e4a 100%)' }}
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((p, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width: p.size || 8,
                                height: p.size || 8,
                                background: 'rgba(255, 255, 255, 0.25)',
                                top: p.top,
                                left: p.left,
                                animation: `floatParticle 7s ease-in-out infinite`,
                                animationDelay: p.delay || '0s',
                            }}
                        />
                    ))}
                </div>

                <div className="relative mb-4 flex items-center justify-center">
                    <div className="absolute w-[120px] h-[120px] rounded-full border-2 border-white/20" style={{ animation: 'pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite' }} />
                    <div className="absolute w-[120px] h-[120px] rounded-full border-2 border-white/20" style={{ animation: 'pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite', animationDelay: '1.5s' }} />
                    <div className="text-[80px] text-white relative z-[1]" style={{ animation: 'glow 3s ease-in-out infinite' }}>
                        <i className="fa-solid fa-moon" />
                    </div>
                </div>

                <h2 className="text-white font-extrabold mb-2 tracking-wider text-4xl md:text-5xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                    نور
                </h2>

                <p className="text-white/90 max-w-[380px] mx-auto mb-8 leading-relaxed text-center font-normal text-lg">
                    {t('auth.loginSubtitle')}
                </p>

                <div className="flex flex-row gap-3 justify-center items-center">
                    {[
                        { value: '١٥ مليون+', label: 'تبرعات' },
                        { value: '١٢,٠٠٠+', label: 'مستفيد' },
                        { value: '٨٧+', label: 'مشروع' },
                    ].map((stat, i, arr) => (
                        <>
                            <div key={stat.label} className="text-center px-1">
                                <h5 className="text-white font-bold text-xl">{stat.value}</h5>
                                <span className="text-white/75 text-xs">{stat.label}</span>
                            </div>
                            {i < arr.length - 1 && (
                                <div className="w-px h-10 bg-white/25" />
                            )}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LoginBrandingPanel;
