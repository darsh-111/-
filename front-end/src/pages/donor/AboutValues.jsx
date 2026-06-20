import { t } from '../../i18n';

const TEAL = '#1a4a44';
const G_GREEN = '#00b16a';

function AboutValues({ isDark, aboutUs }) {
    return (
        <div className="mb-10">
            <h4 className="font-extrabold text-center mb-5" style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)', color: isDark ? '#f1f5f9' : '#1e293b' }}>
                {t('about.values')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
                {[
                    { icon: 'fa-handshake', title: t('about.integrity'), desc: t('about.integrityDesc') },
                    { icon: 'fa-magnifying-glass', title: t('about.transparency'), desc: t('about.transparencyDesc') },
                    { icon: 'fa-bolt', title: t('about.efficiency'), desc: t('about.efficiencyDesc') },
                    { icon: 'fa-heart', title: t('about.compassion'), desc: t('about.compassionDesc') },
                ].map((item, i) => (
                    <div key={i} className="h-full">
                        <div
                            className="h-full p-4 md:p-3 rounded-2xl flex flex-col items-center justify-start text-center transition-all duration-300 hover:-translate-y-1.5"
                            style={{
                                background: isDark ? '#1e293b' : '#ffffff',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}`,
                                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.03)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = isDark ? '0 12px 32px rgba(0,0,0,0.35)' : '0 12px 28px rgba(0,0,0,0.08)';
                                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = isDark ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.03)';
                                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';
                            }}
                        >
                            <div className="value-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-2.5 text-3xl transition-transform"
                                style={{
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                                    color: isDark ? G_GREEN : TEAL,
                                }}
                            >
                                <i className={`fa-solid ${item.icon}`}></i>
                            </div>
                            <div className="flex-grow flex flex-col justify-start">
                                <h6 className="font-extrabold mb-1.5" style={{ fontSize: '1.15rem', color: isDark ? '#f1f5f9' : '#1e293b' }}>
                                    {item.title}
                                </h6>
                                <p className="text-sm leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                    {i === 0 && aboutUs.values ? aboutUs.values : item.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AboutValues;
