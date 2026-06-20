import { t } from '../../i18n';
import { useInjectStyles } from '../../utils/injectStyles';

const mobileStyles = `
    @keyframes glow {
        0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3)); }
        50% { filter: drop-shadow(0 0 24px rgba(255, 255, 255, 0.6)); }
    }
`;

function LoginBrandingMobile() {
    useInjectStyles(mobileStyles, 'login-branding-mobile-styles');

    return (
        <div
            className="w-full flex md:hidden items-center justify-center py-4 px-2 gap-1.5 flex-col"
            style={{ background: 'linear-gradient(145deg, #d4a017 0%, #b8860b 50%, #8b6508 100%)' }}
        >
            <div className="text-[40px] text-white" style={{ animation: 'glow 3s ease-in-out infinite' }}>
                <i className="fa-solid fa-moon" />
            </div>
            <h4 className="text-white font-extrabold text-2xl">نور</h4>
            <p className="text-sm text-white/85 text-center max-w-[300px]">
                {t('auth.loginSubtitle')}
            </p>
        </div>
    );
}

export default LoginBrandingMobile;
