import { Link } from 'react-router-dom';
import { getLanguage } from '../../i18n';

function HomeZakatCta({ isDark }) {
    const sectionPyMedium = 'py-12 md:py-16';

    return (
        <div
            className={`${sectionPyMedium}`}
            style={{
                background: isDark
                    ? `linear-gradient(135deg, rgba(var(--color-primary-500), 0.08) 0%, rgba(var(--color-primary-700), 0.12) 100%)`
                    : `linear-gradient(135deg, rgba(var(--color-primary-500), 0.04) 0%, rgba(var(--color-primary-300), 0.06) 100%)`,
                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#eef2f6'}`,
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#eef2f6'}`,
            }}
        >
            <div className="max-w-[768px] mx-auto px-4 md:px-6">
                <div
                    className="relative overflow-hidden flex flex-col md:flex-row items-center gap-4 p-3.5 md:p-5 rounded-3xl text-white"
                    style={{
                        background: isDark
                            ? 'linear-gradient(135deg, var(--color-primary-700) 0%, #112d2c 100%)'
                            : 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)',
                        boxShadow: isDark
                            ? '0 8px 32px rgba(0,0,0,0.3)'
                            : '0 8px 30px rgba(var(--color-primary-500), 0.25)',
                    }}
                >
                    <div className="absolute -bottom-[50px] -left-[50px] w-[200px] h-[200px] rounded-full pointer-events-none bg-white/5" />

                    <div
                        className="zakat-icon-box w-20 h-20 rounded-[20px] flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.12)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                        }}
                    >
                        <i className="fa-solid fa-calculator" style={{ fontSize: '2.2rem', color: '#fff' }}></i>
                    </div>

                    <div className="flex-1 text-center md:text-right">
                        <h4
                            className="font-extrabold mb-1.5"
                            style={{
                                fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
                            }}
                        >
                            {getLanguage() === 'en' ? 'Calculate Your Zakat Accurately' : 'احسب زكاتك بدقة وسهولة'}
                        </h4>
                        <p
                            className="text-white/80 leading-relaxed"
                            style={{
                                fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                fontSize: 'clamp(0.85rem, 1.5vw, 0.92rem)',
                                maxWidth: 550,
                            }}
                        >
                            {getLanguage() === 'en'
                                ? 'Use our advanced live calculator to compute Zakat on money, gold, silver, and agricultural crops based on real-time prices.'
                                : 'استخدم حاسبة الزكاة المتطورة لحساب زكاة أموالك، مدخراتك، الذهب، الفضة، والمحاصيل الزراعية بكل دقة بناءً على أسعار السوق الحية.'}
                        </p>
                    </div>

                    <Link
                        to="/zakat"
                        className="inline-flex items-center gap-2 rounded-xl font-extrabold whitespace-nowrap transition-all duration-200 active:translate-y-0"
                        style={{
                            padding: '1.6rem 4rem',
                            backgroundColor: '#fff',
                            color: 'var(--color-primary-700)',
                            fontFamily: "'Cairo', 'Tajawal', sans-serif",
                            fontSize: '1rem',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fff';
                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.15)';
                            e.currentTarget.style.transform = '';
                        }}
                    >
                        {getLanguage() === 'en' ? 'Open Zakat Calculator' : 'افتح حاسبة الزكاة'}
                        <i className="fa-solid fa-arrow-left" style={{ fontSize: '0.85rem' }}></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomeZakatCta;
