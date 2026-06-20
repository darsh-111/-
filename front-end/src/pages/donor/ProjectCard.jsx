import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { t } from '../../i18n';

function ProjectCard({ project }) {
    const { isDark } = useTheme();
    const percentage = Math.round((project.raised / project.goal) * 100);
    const title = project.title;

    return (
        <div
            className="h-full flex flex-col transition-all duration-300 hover:-translate-y-2 overflow-hidden rounded-lg bg-white dark:bg-neutral-800 shadow-card border border-neutral-100 dark:border-neutral-700"
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; }}
        >
            <div className="relative">
                <img
                    className="w-full h-[200px] object-cover"
                    src={project.image}
                    alt={title}
                />
                {project.daysLeft <= 10 && (
                    <span className="absolute top-3 right-3 inline-flex px-2 py-0.5 rounded text-xs font-bold bg-error-500 text-white">
                        {'عاجل'}
                    </span>
                )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <span className="text-xs text-primary-500 font-bold mb-1">{project.program}</span>
                <h6 className="font-bold flex-1 mb-1">{title}</h6>

                <div className="mt-2">
                    <div className="flex justify-between mb-1">
                        <p className="text-sm font-bold">{percentage}% {'مكتمل'}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{project.daysLeft} {'يوم متبقي'}</p>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                        <div className="h-full rounded-full bg-primary-500 transition-all duration-500" style={{ width: `${percentage > 100 ? 100 : percentage}%` }}></div>
                    </div>
                </div>

                <Link
                    to={`/projects/${project.id}`}
                    className="w-full mt-3 border border-primary-500 text-primary-500 px-5 py-2 rounded-md font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-center block"
                >
                    {t('campaigns.donateNow')}
                </Link>
            </div>
        </div>
    );
}

export default ProjectCard;
