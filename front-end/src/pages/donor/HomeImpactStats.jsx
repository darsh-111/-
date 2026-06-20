import { formatNumber } from '../../i18n';

function HomeImpactStats({ displayStats, isDark }) {
    return (
        <div className={`py-4 md:py-12 md:py-16 bg-neutral-50 dark:bg-neutral-900`}>
            <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                <div className="grid grid-cols-12 gap-2 sm:gap-3 justify-center">
                    {displayStats.map((stat, i) => (
                        <div key={i} className="col-span-6 md:col-span-3 flex">
                            <div
                                className="flex flex-col items-center justify-center text-center h-full p-4 gap-0.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 relative overflow-hidden transition-all duration-280 hover:-translate-y-1"
                                style={{
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.08), 0 0 0 1.5px rgba(var(--color-primary-500), 0.3)`;
                                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(var(--color-primary-500), 0.03)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.04)' : '#fff';
                                }}
                            >
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] rounded-t-sm bg-primary-500 transition-all duration-300" />
                                <div
                                    className="stat-icon flex justify-center items-center w-[72px] h-[72px] rounded-full text-[2.4rem] flex-shrink-0 transition-all duration-280"
                                    style={{
                                        color: isDark ? 'var(--color-primary-300)' : '#1F2D3D',
                                        backgroundColor: isDark ? 'rgba(var(--color-primary-500), 0.1)' : 'rgba(var(--color-primary-500), 0.06)',
                                    }}
                                >
                                    <i className={stat.icon}></i>
                                </div>
                                <h4
                                    className="font-extrabold leading-tight"
                                    style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}
                                >
                                    {formatNumber(stat.value)}+
                                </h4>
                                <span
                                    className="text-neutral-500 dark:text-neutral-400 tracking-wide"
                                    style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeImpactStats;
