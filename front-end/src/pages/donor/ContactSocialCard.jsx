import { t } from '../../i18n';
import { useInjectStyles } from '../../utils/injectStyles';

const CARD_RADIUS = 24;

const socialCardStyles = `
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
`;

const socialColors = {
    facebook: '#1877F2', twitter: '#1DA1F2',
    instagram: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    whatsapp: '#25D366',
};

function ContactSocialCard({ socialLinks, isDark }) {
    useInjectStyles(socialCardStyles, 'contact-social-card-styles');

    return (
        <div className="p-3 text-center" style={{
            borderRadius: `${CARD_RADIUS}px`,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
            backgroundColor: isDark ? 'rgba(30,41,59,0.75)' : 'rgba(255,255,255,0.80)',
            backdropFilter: isDark ? 'saturate(1.2) blur(20px)' : 'saturate(1.4) blur(24px)',
            boxShadow: isDark ? '0 8px 40px rgba(0,0,0,0.35)' : '0 4px 32px rgba(0,0,0,0.06)',
            opacity: 0,
            animation: 'fadeInUp 0.5s ease forwards 0.8s',
            transition: 'transform 350ms cubic-bezier(0.22,1,0.36,1), box-shadow 350ms cubic-bezier(0.22,1,0.36,1)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = isDark ? '0 12px 36px rgba(0,0,0,0.40)' : '0 10px 32px rgba(0,0,0,0.10)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = isDark ? '0 8px 40px rgba(0,0,0,0.35)' : '0 4px 32px rgba(0,0,0,0.06)'; }}
        >
            <p className="font-bold mb-2 text-[0.9rem]" style={{ color: isDark ? '#e2e8f0' : '#1a1a2e' }}>
                {t('contact.social')}
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center">
                {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                        className="w-12 h-12 flex items-center justify-center rounded-full text-white text-[1.15rem]"
                        style={{ backgroundColor: socialColors.facebook, transition: 'transform 350ms cubic-bezier(0.22,1,0.36,1), box-shadow 350ms cubic-bezier(0.22,1,0.36,1)' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(24,119,242,0.45)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                )}
                {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                        className="w-12 h-12 flex items-center justify-center rounded-full text-white text-[1.15rem]"
                        style={{ backgroundColor: socialColors.twitter, transition: 'transform 350ms cubic-bezier(0.22,1,0.36,1), box-shadow 350ms cubic-bezier(0.22,1,0.36,1)' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(29,161,242,0.45)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                        <i className="fa-brands fa-x-twitter"></i>
                    </a>
                )}
                {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                        className="w-12 h-12 flex items-center justify-center rounded-full text-white text-[1.15rem]"
                        style={{ background: socialColors.instagram, transition: 'transform 350ms cubic-bezier(0.22,1,0.36,1), box-shadow 350ms cubic-bezier(0.22,1,0.36,1)' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,0,0,0.35)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                )}
                {socialLinks.youtube && (
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="Youtube"
                        className="w-12 h-12 flex items-center justify-center rounded-full text-white text-[1.15rem]"
                        style={{ backgroundColor: '#FF0000', transition: 'transform 350ms cubic-bezier(0.22,1,0.36,1), box-shadow 350ms cubic-bezier(0.22,1,0.36,1)' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(255,0,0,0.45)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                )}
            </div>
        </div>
    );
}

export default ContactSocialCard;
