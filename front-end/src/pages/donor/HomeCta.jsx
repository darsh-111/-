import { Link } from 'react-router-dom';
import { t } from '../../i18n';

function HomeCta({ isDark }) {
    const sectionPyMedium = 'py-12 md:py-16';

    return (
        <div className={`${sectionPyMedium} text-center relative`}
            style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(var(--color-primary-500), 0.03)',
            }}
        >
            <div className="max-w-[768px] mx-auto px-4 md:px-6">
                <h3 className="font-extrabold mb-2 text-2xl md:text-3xl">{t('home.ctaTitle')}</h3>
                <p
                    className="mb-5 leading-relaxed font-normal mx-auto"
                    style={{
                        color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)',
                        maxWidth: 520,
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    }}
                >
                    {t('home.ctaSubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Link
                        to="/donate"
                        className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-lg font-bold transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)',
                            color: '#fff',
                            boxShadow: isDark
                                ? '0 4px 20px rgba(0,0,0,0.35)'
                                : '0 4px 20px rgba(var(--color-primary-500), 0.3)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-500) 100%)';
                            e.currentTarget.style.boxShadow = isDark ? '0 8px 28px rgba(0,0,0,0.45)' : '0 8px 28px rgba(var(--color-primary-500), 0.35)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)';
                            e.currentTarget.style.boxShadow = isDark ? '0 4px 20px rgba(0,0,0,0.35)' : '0 4px 20px rgba(var(--color-primary-500), 0.3)';
                        }}
                    >
                        {t('common.donate')} <i className="fa-solid fa-heart" style={{ marginInlineStart: 8 }}></i>
                    </Link>
                    <Link
                        to="/volunteer"
                        className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-lg font-bold border-[1.5px] border-primary-500 text-primary-500 transition-all duration-200 hover:-translate-y-0.5"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(var(--color-primary-500), 0.06)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(var(--color-primary-500), 0.12)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {t('common.joinNow')}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomeCta;
