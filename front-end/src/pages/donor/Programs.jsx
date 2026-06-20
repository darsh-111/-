import { Link } from 'react-router-dom';
import { t } from '../../i18n';
import { useAdminData } from '../../contexts/AdminDataContext';

function Programs() {
    const { state } = useAdminData();
    const activePrograms = state.programs?.filter(p => !p.status || p.status === 'active') || [];
    const programs = activePrograms;
    const projects = state.projects;

    return (
        <div className="pb-12">
            <div style={{ background: 'linear-gradient(135deg, #1a4a44 0%, #0a1f1c 100%)' }} className="text-white py-20 text-center">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                    <h1 className="text-3xl font-bold mb-2">{t('nav.programs')}</h1>
                    <p className="text-lg opacity-90 max-w-[700px] mx-auto">
                        اكتشف برامجنا المتنوعة التي تستهدف مختلف فئات المحتاجين في المجتمع المصري
                    </p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 -mt-4">
                <div className="grid grid-cols-12 gap-4">
                    {programs.map(program => {
                        const programProjects = projects.filter(p => p.programId === program.id);
                        const totalRaised = programProjects.reduce((sum, p) => sum + p.raised, 0);

                        return (
                            <div className="col-span-12 sm:col-span-6 md:col-span-4" key={program.id}>
                                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-card border border-neutral-100 dark:border-neutral-700 overflow-visible mt-4 h-full flex flex-col transition-transform duration-300 ease hover:-translate-y-2 hover:shadow-lg">
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white mx-auto -mt-10 shadow-md border-4 border-white dark:border-neutral-800"
                                        style={{ backgroundColor: program.color }}
                                    >
                                        <i className={program.icon}></i>
                                    </div>
                                    <div className="p-4 pt-3 flex-1 text-center">
                                        <h5 className="text-lg font-bold mb-1">
                                            {program.name}
                                        </h5>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 min-h-[60px] mb-3">
                                            {getProgramDescription(program.id)}
                                        </p>

                                        <hr className="w-3/5 mx-auto border-t border-neutral-200 dark:border-neutral-700 mb-3" />

                                        <div className="flex justify-around my-3">
                                            <div>
                                                <h6 className="text-lg font-bold text-primary-500">
                                                    {programProjects.length}
                                                </h6>
                                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                                    مشروع نشط
                                                </span>
                                            </div>
                                            <div>
                                                <h6 className="text-lg font-bold text-secondary-500">
                                                    {(totalRaised / 1000).toFixed(0)}K
                                                </h6>
                                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                                    ج.م تم جمعها
                                                </span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/programs/${program.id}`}
                                            className="block w-full border border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 text-center px-5 py-2 rounded-md font-semibold hover:border-primary-500 hover:bg-primary-500/5 hover:text-primary-500 transition-colors"
                                        >
                                            عرض التفاصيل
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function getProgramDescription(id) {
    const descriptions = {
        1: 'نوفر الرعاية الشاملة للأيتام من تعليم وصحة ومعيشة كريمة لضمان مستقبل أفضل لهم.',
        2: 'نقدم خدمات طبية مجانية وقوافل علاجية للمناطق المحرومة والفئات الأكثر احتياجًا.',
        3: 'ندعم العملية التعليمية من خلال توفير المستلزمات والمنح الدراسية للطلاب المتفوقين.',
        4: 'نستجيب للأزمات والكوارث بتوفير المساعدات العاجلة للمتضررين.',
        5: 'تنمية شاملة لتحسين مستوى المعيشة ومحاربة الفقر.',
        6: 'مشاريع موسمية في رمضان والأعياد لإدخال الفرحة على الأسر المحتاجة.',
    };
    return descriptions[id] || '';
}

export default Programs;
