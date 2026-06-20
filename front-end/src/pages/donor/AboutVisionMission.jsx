import { t } from '../../i18n';

const TEAL = '#1a4a44';
const G_GREEN = '#00b16a';

function AboutVisionMission({ isDark, aboutUs }) {
    return (
        <div className="mb-12">
            <div
                className="rounded-3xl overflow-hidden relative flex flex-col md:flex-row"
                style={{
                    background: isDark ? '#1e293b' : '#ffffff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}`,
                    boxShadow: isDark ? '0 12px 40px rgba(0,0,0,0.25)' : '0 12px 32px rgba(0,0,0,0.04)',
                    animation: 'aboutFadeInUp 0.6s ease forwards 0.3s',
                    opacity: 0,
                    animationFillMode: 'forwards',
                }}
            >
                <div className="flex-1 p-4 md:p-5 flex flex-col items-center justify-center text-center relative transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.02]">
                    <div className="icon-badge w-14 h-14 rounded-xl flex items-center justify-center mb-2.5 text-2xl text-white transition-transform hover:scale-105 hover:-translate-y-0.5"
                        style={{
                            background: `linear-gradient(135deg, ${isDark ? G_GREEN : TEAL}, ${isDark ? '#059669' : '#0d7c65'})`,
                            boxShadow: `0 4px 12px ${isDark ? 'rgba(0,177,106,0.25)' : 'rgba(26,74,68,0.25)'}`,
                        }}
                    >
                        <i className="fa-solid fa-bullseye"></i>
                    </div>
                    <h4 className="font-extrabold mb-1.5 text-lg" style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>
                        {t('about.vision')}
                    </h4>
                    <p className="text-sm leading-relaxed max-w-[360px]" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                        {aboutUs.vision || t('about.visionText')}
                    </p>
                </div>

                <div
                    className="w-full h-px md:w-px md:h-auto"
                    style={{
                        background: isDark
                            ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                            : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)',
                    }}
                />

                <div className="flex-1 p-4 md:p-5 flex flex-col items-center justify-center text-center relative transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.02]">
                    <div className="icon-badge w-14 h-14 rounded-xl flex items-center justify-center mb-2.5 text-2xl text-white transition-transform hover:scale-105 hover:-translate-y-0.5"
                        style={{
                            background: `linear-gradient(135deg, ${isDark ? G_GREEN : TEAL}, ${isDark ? '#059669' : '#0d7c65'})`,
                            boxShadow: `0 4px 12px ${isDark ? 'rgba(0,177,106,0.25)' : 'rgba(26,74,68,0.25)'}`,
                        }}
                    >
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <h4 className="font-extrabold mb-1.5 text-lg" style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>
                        {t('about.mission')}
                    </h4>
                    <p className="text-sm leading-relaxed max-w-[360px]" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                        {aboutUs.mission || t('about.missionText')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutVisionMission;
