import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency, formatNumber } from '../../i18n';
import { useAdminData } from '../../contexts/AdminDataContext';

function ProgramDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { state } = useAdminData();

    const programs = state.programs;
    const projects = state.projects;

    const program = programs.find(p => String(p.id) === String(id));
    const programProjects = projects.filter(p => String(p.programId) === String(id) && p.status === 'active');
    const totalRaised = programProjects.reduce((sum, p) => sum + (p.raised || 0), 0);

    if (!program) {
        return (
            <div className="text-center py-12 min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-primary-500/10 flex items-center justify-center">
                    <i className="fa-solid fa-search text-3xl text-primary-500" />
                </div>
                <h5 className="text-lg font-bold mb-1">البرنامج غير موجود</h5>
                <Link to="/programs" className="bg-primary-500 text-white px-5 py-2.5 rounded-[14px] font-semibold hover:bg-primary-600 transition-colors">
                    العودة للبرامج
                </Link>
            </div>
        );
    }

    return (
        <div className="pb-12">
            <div style={{ background: 'linear-gradient(135deg, #1a4a44 0%, #0a1f1c 100%)' }} className="text-white py-16 text-center relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                    <div className="w-20 h-20 rounded-full mx-auto mb-2 flex items-center justify-center text-4xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
                        <i className={program.icon}></i>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{program.name}</h1>
                    <p className="text-lg opacity-90 max-w-[700px] mx-auto mb-3">
                        {program.description || `برنامج ${program.name} يهدف لتحقيق أثر إيجابي في المجتمع`}
                    </p>

                    <div className="flex justify-center gap-4 mt-2">
                        <div>
                            <h4 className="text-2xl font-bold">{programProjects.length}</h4>
                            <p className="text-sm opacity-80">مشروع نشط</p>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold">{formatCurrency(totalRaised)}</h4>
                            <p className="text-sm opacity-80">تم جمعها</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-bold">المشاريع النشطة</h5>
                    <button onClick={() => navigate('/programs')} className="text-sm font-medium hover:text-primary-500 transition-colors">
                        ← العودة للبرامج
                    </button>
                </div>

                {programProjects.length === 0 ? (
                    <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
                        <i className="fa-regular fa-folder-open text-5xl opacity-30"></i>
                        <p className="mt-2">لا توجد مشاريع نشطة في هذا البرنامج حالياً</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-3">
                        {programProjects.map((project) => {
                            const pct = project.goal > 0 ? Math.min(100, Math.round((project.raised / project.goal) * 100)) : 0;
                            return (
                                <div className="col-span-12 sm:col-span-6 md:col-span-4 flex" key={project.id}>
                                    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-card border border-neutral-100 dark:border-neutral-700 h-full flex flex-col transition-transform duration-300 ease hover:-translate-y-1.5 hover:shadow-lg overflow-hidden">
                                        <img
                                            className="w-full h-44 object-cover"
                                            src={project.imageUrl || project.image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=350&fit=crop'}
                                            alt={project.title}
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=350&fit=crop'; }}
                                        />
                                        <div className="p-4 flex-1 flex flex-col">
                                            <h6 className="font-bold mb-1">{project.title}</h6>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400 flex-1 mb-2">
                                                {project.description || 'مشروع تابع للبرنامج'}
                                            </p>
                                            <div className="mb-1">
                                                <div className="flex justify-between mb-0.5">
                                                    <span className="text-xs font-bold text-primary-500">
                                                        {formatCurrency(project.raised || 0)}
                                                    </span>
                                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                                        {pct}%
                                                    </span>
                                                </div>
                                                <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                                                    <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${pct}%` }}></div>
                                                </div>
                                            </div>
                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="block w-full border border-primary-500 text-primary-500 text-center px-5 py-2 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors mt-auto"
                                            >
                                                عرض المشروع
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProgramDetail;
