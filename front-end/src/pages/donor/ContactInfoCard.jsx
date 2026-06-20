import { useInjectStyles } from '../../utils/injectStyles';

const CARD_RADIUS = 24;

const infoCardStyles = `
    @keyframes slideInRight { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes slideInLeft { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
`;

function ContactInfoCard({ icon, label, value, gradient, isDark, index, isRTL }) {
    useInjectStyles(infoCardStyles, 'contact-info-card-styles');

    return (
        <div className="p-2.5 flex items-center gap-2.5 cursor-default" style={{
            borderRadius: `${CARD_RADIUS}px`,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
            backgroundColor: isDark ? 'rgba(30,41,59,0.75)' : 'rgba(255,255,255,0.80)',
            backdropFilter: isDark ? 'saturate(1.2) blur(20px)' : 'saturate(1.4) blur(24px)',
            boxShadow: isDark ? '0 8px 40px rgba(0,0,0,0.35)' : '0 4px 32px rgba(0,0,0,0.06)',
            opacity: 0,
            animation: `${isRTL ? 'slideInRight' : 'slideInLeft'} 0.5s ease forwards ${0.35 + index * 0.1}s`,
            transition: 'transform 350ms cubic-bezier(0.22,1,0.36,1), box-shadow 350ms cubic-bezier(0.22,1,0.36,1), border-color 250ms ease, background-color 250ms ease',
        }}
        onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = isDark ? '0 12px 36px rgba(0,0,0,0.40)' : '0 10px 32px rgba(0,0,0,0.10)';
            e.currentTarget.style.borderColor = 'rgba(0,177,106,0.20)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = isDark ? '0 8px 40px rgba(0,0,0,0.35)' : '0 4px 32px rgba(0,0,0,0.06)';
            e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
        }}
        >
            <div className="w-[54px] h-[54px] rounded-[16px] flex items-center justify-center text-white text-[21px] shrink-0" style={{
                background: gradient,
                boxShadow: `0 4px 16px rgba(26,74,68,0.25)`,
            }}>
                <i className={icon}></i>
            </div>
            <div className="min-w-0 flex-1">
                <span className="block mb-0.5 font-semibold tracking-wider uppercase text-[0.68rem]" style={{
                    color: isDark ? 'rgba(226,232,240,0.50)' : '#64748b',
                }}>
                    {label}
                </span>
                <p className="font-bold text-[0.92rem] leading-snug break-words" style={{ color: isDark ? '#e2e8f0' : '#1a1a2e' }}>
                    {value}
                </p>
            </div>
        </div>
    );
}

export default ContactInfoCard;
