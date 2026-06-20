import { useInjectStyles } from '../../utils/injectStyles';
import { t } from '../../i18n';

const TEAL = '#1a4a44';
const TEAL_MID = '#112e2a';
const G_GREEN = '#00b16a';

const oppsKeyframes = `
    @keyframes voGradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
`;

const volunteerAreas = [
    { id: 'medical', icon: 'fa-solid fa-hospital', label: 'طبي', desc: 'المشاركة في القوافل الطبية والتوعية الصحية' },
    { id: 'education', icon: 'fa-solid fa-book-open', label: 'تعليمي', desc: 'تعليم الأطفال ومحو الأمية والدروس الخصوصية' },
    { id: 'community', icon: 'fa-solid fa-people-roof', label: 'مجتمعي', desc: 'تنمية المجتمعات المحلية والمبادرات الاجتماعية' },
    { id: 'tech', icon: 'fa-solid fa-laptop-code', label: 'تقني', desc: 'التصميم والبرمجة ودعم البنية التحتية الرقمية' },
    { id: 'admin', icon: 'fa-solid fa-clipboard-list', label: 'إداري', desc: 'التنظيم والإدارة والتخطيط للمشاريع' },
    { id: 'field', icon: 'fa-solid fa-truck', label: 'ميداني', desc: 'التوزيع والإغاثة والعمل الميداني المباشر' },
];

export default function VolunteerOpportunities({ isDark }) {
    useInjectStyles(oppsKeyframes, 'volunteer-opportunities-styles');

    return (
        <div id="opportunities" className="mb-10 scroll-mt-20">
            <div className="text-center mb-5 md:mb-7">
                <div className="w-9 h-0.5 rounded mx-auto mb-2" style={{ background: `linear-gradient(90deg, rgba(0,177,106,0.3), rgba(34,211,238,0.5), rgba(0,177,106,0.3))` }} />
                <h2 className="font-extrabold text-[1.3rem] md:text-[1.65rem] tracking-tight" style={{ color: isDark ? '#e2e8f0' : '#1a1a2e' }}>
                    {t('volunteer.opportunities')}
                </h2>
            </div>

            <div className="grid grid-cols-12 gap-2 md:gap-3">
                {volunteerAreas.map((area, i) => (
                    <div key={area.id} className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="rounded-xl p-[1px] h-full" style={{
                            background: isDark ? `linear-gradient(135deg, rgba(34,211,238,0.2), rgba(0,177,106,0.12), rgba(34,211,238,0.06))` : `linear-gradient(135deg, rgba(26,74,68,0.12), rgba(0,177,106,0.08), rgba(26,74,68,0.04))`,
                            backgroundSize: '200% 200%',
                            animation: `voGradientShift 7s ease infinite ${i * 0.25}s`,
                        }}>
                            <div className="rounded-[19px] h-full p-3 md:p-3.5 text-center flex flex-col items-center relative overflow-hidden backdrop-blur cursor-pointer" style={{
                                backgroundColor: isDark ? 'rgba(15,25,40,0.78)' : 'rgba(255,255,255,0.85)',
                                boxShadow: isDark ? '0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)' : '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                                transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms cubic-bezier(0.22,1,0.36,1)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = isDark ? '0 14px 44px rgba(0,0,0,0.45), 0 0 18px rgba(34,211,238,0.08)' : '0 10px 36px rgba(0,0,0,0.09), 0 0 14px rgba(26,74,68,0.05)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = isDark ? '0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)' : '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)';
                            }}>
                                <div className="w-[60px] h-[60px] rounded-xl flex items-center justify-center text-2xl text-white mb-2" style={{
                                    background: isDark ? `linear-gradient(135deg, rgba(34,211,238,0.85), ${G_GREEN})` : `linear-gradient(135deg, ${TEAL}, ${TEAL_MID})`,
                                    boxShadow: `0 4px 16px ${isDark ? 'rgba(34,211,238,0.2)' : 'rgba(26,74,68,0.2)'}`,
                                }}>
                                    <i className={area.icon}></i>
                                </div>
                                <h3 className="font-bold text-[0.95rem] md:text-[1.05rem] mb-1 leading-tight" style={{ color: isDark ? '#e2e8f0' : '#333' }}>
                                    {area.label}
                                </h3>
                                <p className="text-[0.8rem] md:text-[0.88rem] leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#64748b' }}>
                                    {area.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
