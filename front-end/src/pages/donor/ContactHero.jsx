import { useInjectStyles } from '../../utils/injectStyles';
import { t } from '../../i18n';

const TEAL = '#1a4a44';
const TEAL_MID = '#112e2a';
const TEAL_DARK = '#0a1f1c';
const DARK_BG = '#0f172a';
const CONTENT_BG = '#f8fafc';

const heroStyles = `
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
`;

function ContactHero({ isDark }) {
    useInjectStyles(heroStyles, 'contact-hero-styles');

    return (
        <>
            <div className="relative overflow-hidden text-center text-white pt-[100px] pb-[100px] md:pt-7 md:pb-11" style={{
                background: isDark
                    ? `radial-gradient(ellipse at 30% 20%, ${TEAL_DARK} 0%, #04100e 70%, #020a09 100%)`
                    : `radial-gradient(ellipse at 35% 25%, ${TEAL} 0%, ${TEAL_MID} 55%, ${TEAL_DARK} 100%)`,
            }}>
                <div className="relative z-10 max-w-[600px] mx-auto px-2">
                    <div className="w-10 h-[3px] rounded-full mx-auto mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
                    <h1 className="font-black mb-1 text-white text-[1.5rem] md:text-[2rem]" style={{ animation: 'fadeInUp 0.5s ease both' }}>
                        {t('contact.title')}
                    </h1>
                    <p className="leading-relaxed text-[0.82rem] md:text-[0.9rem]" style={{ color: 'rgba(255,255,255,0.65)', animation: 'fadeInUp 0.5s ease both 0.1s' }}>
                        {t('contact.subtitle')}
                    </p>
                </div>
            </div>

            <div className="-mt-px leading-none">
                <svg viewBox="0 0 1200 36" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="block w-full h-9" style={{ fill: isDark ? DARK_BG : CONTENT_BG }}>
                    <path d="M0,0 C300,36 900,0 1200,36 L1200,36 L0,36 Z" />
                </svg>
            </div>
        </>
    );
}

export default ContactHero;
