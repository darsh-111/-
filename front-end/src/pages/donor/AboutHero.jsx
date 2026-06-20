import { useInjectStyles } from '../../utils/injectStyles';
import { t } from '../../i18n';

const TEAL = '#1a4a44';
const TEAL_MID = '#112e2a';
const TEAL_DARK = '#0a1f1c';

const aboutFadeStyles = `
    @keyframes aboutFadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

function AboutHero({ isDark, aboutUs }) {
    useInjectStyles(aboutFadeStyles, 'about-fade');

    return (
        <section
            className="relative overflow-hidden text-center text-white"
            style={{
                paddingTop: 100,
                paddingBottom: 100,
                background: isDark
                    ? `radial-gradient(ellipse at 30% 20%, ${TEAL_DARK} 0%, #04100e 70%, #020a09 100%)`
                    : `radial-gradient(ellipse at 35% 25%, ${TEAL} 0%, ${TEAL_MID} 55%, ${TEAL_DARK} 100%)`,
            }}
        >
            <div className="relative z-[1] max-w-[800px] mx-auto px-2">
                <div className="w-10 h-[3px] rounded-sm mx-auto mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
                <h1
                    className="font-black mb-2 tracking-normal"
                    style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', animation: 'aboutFadeInUp 0.5s ease both' }}
                >
                    {t('about.title')}
                </h1>
                <p
                    className="leading-relaxed mx-auto"
                    style={{ maxWidth: 700, fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.65)', animation: 'aboutFadeInUp 0.5s ease both 0.1s' }}
                >
                    {aboutUs.story || t('about.subtitle')}
                </p>
            </div>
        </section>
    );
}

export default AboutHero;
