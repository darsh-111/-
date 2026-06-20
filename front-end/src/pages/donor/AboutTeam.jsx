import { t } from '../../i18n';

function AboutTeam({ isDark }) {
    const team = [
        { name: 'د. أحمد محمود', role: 'رئيس مجلس الإدارة', image: 'fa-solid fa-user-tie' },
        { name: 'أ. فاطمة حسن', role: 'المدير التنفيذي', image: 'fa-solid fa-user-tie' },
        { name: 'م. خالد عبدالله', role: 'مدير البرامج', image: 'fa-solid fa-laptop-code' },
        { name: 'أ. سارة علي', role: 'مدير التطوير', image: 'fa-solid fa-chalkboard-user' },
    ];

    return (
        <div className="mb-12 max-w-[1100px] mx-auto">
            <h4 className="font-extrabold text-center mb-8" style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)', color: isDark ? '#f1f5f9' : '#1e293b' }}>
                {t('about.team')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center">
                {team.map((member, index) => (
                    <div key={index} className="h-full">
                        <div
                            className="h-full p-5 md:p-4 rounded-3xl flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                            style={{
                                background: isDark ? '#1e293b' : '#ffffff',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}`,
                                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.03)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = isDark ? '0 12px 32px rgba(0,0,0,0.3)' : '0 12px 28px rgba(0,0,0,0.08)';
                                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = isDark ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.03)';
                                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';
                            }}
                        >
                            <div
                                className="absolute top-0 left-0 w-full h-[120px] opacity-80"
                                style={{
                                    background: isDark
                                        ? 'linear-gradient(to bottom, rgba(0,177,106,0.1), transparent)'
                                        : 'linear-gradient(to bottom, rgba(26,74,68,0.05), transparent)',
                                }}
                            />

                            <div
                                className="team-avatar w-[100px] h-[100px] mb-3 rounded-full flex items-center justify-center z-[1] text-white border-4 transition-all duration-400"
                                style={{
                                    borderColor: isDark ? '#1e293b' : '#ffffff',
                                    background: isDark
                                        ? 'linear-gradient(135deg, #00b16a, #059669)'
                                        : 'linear-gradient(135deg, #1a4a44, #112e2a)',
                                    boxShadow: `0 4px 12px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = `0 8px 24px ${isDark ? 'rgba(0,177,106,0.3)' : 'rgba(26,74,68,0.2)'}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = '';
                                    e.currentTarget.style.boxShadow = `0 4px 12px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`;
                                }}
                            >
                                <i className={member.image} style={{ fontSize: 40 }}></i>
                            </div>
                            <h6 className="font-extrabold z-[1]" style={{ fontSize: '1.15rem', color: isDark ? '#f1f5f9' : '#1e293b' }}>
                                {member.name}
                            </h6>
                            <p className="text-sm font-bold z-[1]" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                {member.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AboutTeam;
