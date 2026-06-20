import { useInjectStyles } from '../../utils/injectStyles';
import { t } from '../../i18n';

const G_GREEN = '#00b16a';
const TEAL = '#1a4a44';

const reasonsKeyframes = `
    @keyframes vrGradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
`;

const reasons = [
    { icon: 'fa-solid fa-heart', title: 'أجر عظيم', desc: 'التطوع من أعظم أبواب الخير والصدقة الجارية' },
    { icon: 'fa-solid fa-handshake', title: 'صداقات جديدة', desc: 'انضم لمجتمع من المتطوعين المحبين للخير' },
    { icon: 'fa-solid fa-arrow-trend-up', title: 'تطوير مهاراتك', desc: 'اكتسب خبرات عملية وطوّر مهاراتك المهنية' },
    { icon: 'fa-solid fa-earth-americas', title: 'أثر حقيقي', desc: 'شاهد تأثيرك المباشر على حياة المحتاجين' },
];

export default function VolunteerReasons({ isDark }) {
    useInjectStyles(reasonsKeyframes, 'volunteer-reasons-styles');

    return (
        <div className="mb-10 py-6 md:py-8 px-3 md:px-5 rounded-2xl relative overflow-hidden" style={{
            background: isDark ? 'linear-gradient(160deg, rgba(10,22,40,0.6) 0%, rgba(15,23,42,0.4) 100%)' : `linear-gradient(160deg, rgba(26,74,68,0.03) 0%, rgba(0,177,106,0.015) 50%, rgba(34,211,238,0.02) 100%)`,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(26,74,68,0.06)'}`,
        }}>
            <div className="text-center mb-5 md:mb-7">
                <div className="w-9 h-0.5 rounded mx-auto mb-2" style={{ background: `linear-gradient(90deg, rgba(0,177,106,0.3), rgba(34,211,238,0.5), rgba(0,177,106,0.3))` }} />
                <h2 className="font-extrabold text-[1.3rem] md:text-[1.65rem] tracking-tight" style={{ color: isDark ? '#e2e8f0' : '#1a1a2e' }}>
                    {t('volunteer.whyVolunteer')}
                </h2>
            </div>

            <div className="grid grid-cols-12 gap-2 md:gap-3">
                {reasons.map((reason, i) => (
                    <div key={i} className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="rounded-xl p-[1px] h-full" style={{
                            background: isDark ? `linear-gradient(135deg, rgba(0,177,106,0.25), rgba(34,211,238,0.1), rgba(0,177,106,0.06))` : `linear-gradient(135deg, rgba(26,74,68,0.14), rgba(0,177,106,0.08), rgba(26,74,68,0.04))`,
                            backgroundSize: '200% 200%',
                            animation: `vrGradientShift 8s ease infinite ${i * 0.4}s`,
                        }}>
                            <div className="rounded-[19px] h-full p-3 md:p-3.5 text-center flex flex-col items-center relative overflow-hidden backdrop-blur" style={{
                                backgroundColor: isDark ? 'rgba(15,25,40,0.78)' : 'rgba(255,255,255,0.85)',
                                boxShadow: isDark ? '0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)' : '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                                transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms cubic-bezier(0.22,1,0.36,1)',
                                transform: 'translateY(0)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = isDark ? '0 14px 44px rgba(0,0,0,0.45), 0 0 18px rgba(0,177,106,0.1)' : '0 10px 36px rgba(0,0,0,0.09), 0 0 14px rgba(26,74,68,0.05)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = isDark ? '0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)' : '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)';
                            }}>
                                <div className="w-14 h-14 rounded-[18px] flex items-center justify-center text-2xl text-white mb-2" style={{
                                    background: isDark ? `linear-gradient(135deg, ${G_GREEN}, rgba(34,211,238,0.7))` : `linear-gradient(135deg, ${TEAL}, rgba(0,177,106,0.85))`,
                                    boxShadow: `0 4px 16px ${isDark ? 'rgba(0,177,106,0.22)' : 'rgba(26,74,68,0.22)'}`,
                                }}>
                                    <i className={reason.icon}></i>
                                </div>
                                <h3 className="font-bold text-[0.95rem] md:text-[1.05rem] mb-1 leading-tight" style={{ color: isDark ? '#e2e8f0' : '#333' }}>
                                    {reason.title}
                                </h3>
                                <p className="text-[0.8rem] md:text-[0.88rem] leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#64748b' }}>
                                    {reason.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
