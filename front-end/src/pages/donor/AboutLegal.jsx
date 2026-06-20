import { t } from '../../i18n';

const TEAL = '#1a4a44';
const G_GREEN = '#00b16a';

function AboutLegal({ isDark }) {
    return (
        <div className="max-w-[1000px] mx-auto">
            <div
                className="p-4 md:p-5 rounded-3xl"
                style={{
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                    background: isDark ? '#1e293b' : '#ffffff',
                    boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.2)' : '0 8px 24px rgba(0,0,0,0.03)',
                }}
            >
                <h5 className="font-extrabold text-center mb-4 text-2xl" style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>
                    {t('about.legal')}
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-center items-stretch">
                    {[
                        { label: t('about.regNumber'), value: '1234 / 2010', icon: 'fa-id-card' },
                        { label: t('about.commercialReg'), value: '56789', icon: 'fa-file-signature' },
                        { label: t('about.taxNumber'), value: '123-456-789', icon: 'fa-file-invoice-dollar' },
                        { label: t('about.headquarters'), value: 'القاهرة، مصر', icon: 'fa-location-dot' }
                    ].map((item, idx) => (
                        <div key={idx}>
                            <div
                                className="flex flex-col items-center text-center h-full p-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.015)',
                                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.03)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = isDark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.015)';
                                }}
                            >
                                <div
                                    className="w-[52px] h-[52px] rounded-xl mb-2 flex items-center justify-center text-xl"
                                    style={{
                                        background: isDark ? 'rgba(0,177,106,0.1)' : 'rgba(26,74,68,0.05)',
                                        color: isDark ? '#00b16a' : '#1a4a44',
                                    }}
                                >
                                    <i className={`fa-solid ${item.icon}`} />
                                </div>

                                <span className="text-xs font-bold tracking-wider leading-tight mb-1 uppercase" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                    {item.label}
                                </span>

                                <p className="font-extrabold mt-auto" style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AboutLegal;
