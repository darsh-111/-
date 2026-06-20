import { Link } from 'react-router-dom';
import { t } from '../../i18n';

function HomePrograms({ programs, isDark }) {
    return (
        <div className="py-4 md:py-16">
            <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center mb-3 md:mb-6">
                    <h4 className="font-bold" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>{t('home.ourPrograms')}</h4>
                    <Link to="/programs" className="text-primary-500 text-sm md:text-base font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-md px-3 py-1.5 transition-colors">
                        {t('common.viewAll')} ←
                    </Link>
                </div>
                <div className="grid grid-cols-12 gap-2 sm:gap-3">
                    {programs.map((program) => (
                        <div key={program.id} className="col-span-6 md:col-span-3">
                            <Link
                                to={`/programs/${program.id}`}
                                className="flex flex-col items-center justify-center h-full p-4 text-center rounded-2xl border border-neutral-200 dark:border-neutral-700 transition-all duration-300 hover:-translate-y-1 no-underline text-inherit"
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = program.color;
                                    e.currentTarget.style.backgroundColor = isDark ? `${program.color}0d` : `${program.color}0d`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-neutral-200)';
                                    e.currentTarget.style.backgroundColor = '';
                                }}
                            >
                                <div
                                    className="program-icon flex items-center justify-center rounded-full mb-2 transition-all duration-300"
                                    style={{
                                        width: 'clamp(56px, 8vw, 72px)',
                                        height: 'clamp(56px, 8vw, 72px)',
                                        backgroundColor: isDark ? `${program.color}1a` : `${program.color}1a`,
                                        color: program.color,
                                        fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
                                    }}
                                >
                                    <i className={program.icon}></i>
                                </div>
                                <p className="font-bold text-sm md:text-base">{program.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePrograms;
