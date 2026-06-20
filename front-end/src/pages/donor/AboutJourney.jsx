import { useInjectStyles } from '../../utils/injectStyles';
import { t } from '../../i18n';

const aboutTimelineStyles = `
    .timeline-line {
        position: absolute;
        top: 2rem;
        bottom: 2rem;
        width: 2px;
        z-index: 0;
    }
    @media (min-width: 768px) {
        .timeline-line {
            left: 3rem;
        }
    }
`;

function AboutJourney({ isDark, isRtl }) {
    useInjectStyles(aboutTimelineStyles, 'about-timeline');

    const milestones = [
        { year: '2010', event: 'تأسيس الجمعية'},
        { year: '2012', event: 'افتتاح أول دار أيتام'},
        { year: '2015', event: 'إطلاق برنامج القوافل الطبية'},
        { year: '2018', event: 'الوصول لـ 10,000 مستفيد' },
        { year: '2020', event: 'إطلاق المنصة الإلكترونية'},
        { year: '2024', event: 'تحقيق 15 مليون جنيه تبرعات'},
    ];

    const journeyItemPad = isRtl ? 'pr-12 md:pr-20' : 'pl-12 md:pl-20';

    return (
        <div className="mb-14 relative z-[2]">
            <h4 className="font-extrabold text-center mb-8 md:mb-10" style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)', color: isDark ? '#f1f5f9' : '#1e293b' }}>
                {t('about.journey')}
            </h4>

            <div className="relative max-w-[800px] mx-auto">
                <div
                    className="absolute top-8 bottom-8 w-[2px] z-0"
                    style={{
                        [isRtl ? 'right' : 'left']: '1.5rem',
                        background: isDark
                            ? 'linear-gradient(to bottom, transparent, rgba(0,177,106,0.3) 5%, rgba(0,177,106,0.3) 95%, transparent)'
                            : 'linear-gradient(to bottom, transparent, rgba(26,74,68,0.2) 5%, rgba(26,74,68,0.2) 95%, transparent)',
                    }}
                />
                {milestones.map((milestone, index) => (
                    <div key={index} className={`relative flex items-center mb-3 md:mb-4 z-[1] ${journeyItemPad}`}>
                        <div
                            className="connection-node absolute w-3.5 h-3.5 rounded-full z-[2] transition-transform duration-300"
                            style={{
                                [isRtl ? 'right' : 'left']: '1.5rem',
                                top: '50%',
                                transform: isRtl ? 'translate(50%, -50%)' : 'translate(-50%, -50%)',
                                background: isDark ? '#00b16a' : '#1a4a44',
                                boxShadow: `0 0 0 6px ${isDark ? '#0f172a' : '#fafafa'}, 0 0 0 8px ${isDark ? 'rgba(0,177,106,0.2)' : 'rgba(26,74,68,0.1)'}`,
                            }}
                        />

                        <div
                            className="relative w-full rounded-3xl overflow-hidden min-h-[110px] flex flex-col justify-center transition-all duration-400"
                            style={{
                                padding: '0.75rem 1rem',
                                background: isDark
                                    ? 'linear-gradient(145deg, rgba(30,41,59,0.8), rgba(15,23,42,0.6))'
                                    : 'linear-gradient(145deg, rgba(255,255,255,1), rgba(248,250,252,0.8))',
                                backdropFilter: 'blur(12px)',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                                boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.25)' : '0 8px 24px rgba(0,0,0,0.03)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = isDark ? '0 12px 32px rgba(0,177,106,0.15)' : '0 12px 32px rgba(26,74,68,0.08)';
                                e.currentTarget.style.borderColor = isDark ? 'rgba(0,177,106,0.3)' : 'rgba(26,74,68,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = isDark ? '0 8px 24px rgba(0,0,0,0.25)' : '0 8px 24px rgba(0,0,0,0.03)';
                                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
                            }}
                        >
                            <span
                                className="absolute bottom-[-15px] select-none pointer-events-none text-6xl font-black leading-none z-0 transition-all duration-500"
                                style={{
                                    [isRtl ? 'left' : 'right']: -10,
                                    color: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)',
                                }}
                            >
                                {milestone.year}
                            </span>

                            <div className="relative z-[2]">
                                <h5
                                    className="font-black mb-0.5 inline-block"
                                    style={{
                                        fontSize: '1.25rem',
                                        background: isDark
                                            ? 'linear-gradient(90deg, #00b16a, #10b981)'
                                            : 'linear-gradient(90deg, #1a4a44, #2c7a70)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {milestone.year}
                                </h5>
                                <p className="font-bold leading-relaxed" style={{ fontSize: '1.05rem', color: isDark ? '#f1f5f9' : '#1e293b' }}>
                                    {milestone.event}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AboutJourney;
