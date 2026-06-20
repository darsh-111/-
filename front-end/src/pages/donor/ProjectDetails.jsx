import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { t, formatCurrency, formatNumber, formatDate, getLanguage } from '../../i18n';
import { updates } from '../../data/mockData';
import { useAdminData } from '../../contexts/AdminDataContext';

function ProjectDetails() {
    const { id } = useParams();
    const { isDark } = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [donationAmount, setDonationAmount] = useState(100);
    const isEn = getLanguage() === 'en';

    const { state } = useAdminData();
    const projects = state.projects;

    const project = projects.find(p => p.id === parseInt(id));
    const projectUpdates = updates.filter(u => u.projectId === parseInt(id));

    if (!project) {
        return (
            <div className="py-12 text-center">
                <h4 className="text-xl mb-2">{'المشروع غير موجود'}</h4>
                <Link to="/projects" className="bg-primary-500 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-primary-600 transition-colors">
                    {'العودة للمشاريع'}
                </Link>
            </div>
        );
    }

    const title = project.title;
    const program = project.program;
    const percentage = Math.round((project.raised / project.goal) * 100);

    const tabs = [t('projectDetails.overview'), t('projectDetails.updates'), t('projectDetails.budget'), t('projectDetails.faq')];

    return (
        <div className="pb-8">
            <div
                className="h-[50vh] min-h-[400px] max-h-[600px] flex items-end text-white pb-6 relative"
                style={{
                    background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%), url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="max-w-[1200px] mx-auto px-4 md:px-6 w-full">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-primary-500 text-white mb-2">
                        {program}
                    </span>
                    <h2
                        className="font-bold"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                    >
                        {title}
                    </h2>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-8">
                        <div className="flex gap-4 mb-4 text-neutral-500 dark:text-neutral-400">
                            <div className="flex items-center gap-1">
                                <i className="fa-solid fa-location-dot"></i>
                                {project.location}
                            </div>
                            <div className="flex items-center gap-1">
                                <i className="fa-regular fa-clock"></i>
                                {project.daysLeft} {t('projects.daysLeft')}
                            </div>
                        </div>

                        <div className="border-b border-neutral-200 dark:border-neutral-700 mb-3">
                            <div className="flex">
                                {tabs.map((label, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveTab(i)}
                                        className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === i ? 'border-primary-500 text-primary-500' : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                                    >
                                        {i === 1 ? (
                                            <span className="flex items-center gap-1">
                                                {label}
                                                {projectUpdates.length > 0 && (
                                                    <span className="inline-flex px-1.5 py-0.5 rounded text-xs font-medium bg-secondary-500 text-white min-w-[20px] h-5 flex items-center justify-center">
                                                        {projectUpdates.length}
                                                    </span>
                                                )}
                                            </span>
                                        ) : (
                                            label
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div role="tabpanel" hidden={activeTab !== 0}>
                            {activeTab === 0 && (
                                <div>
                                    <h5 className="text-lg font-bold mb-1">{t('projectDetails.aboutProject')}</h5>
                                    <p className="mb-4 leading-relaxed">{project.description}</p>

                                    <div className="p-3 bg-primary-500/5 border-r-4 border-primary-500 mb-4 rounded-r-lg" style={{ borderInlineStart: `4px solid var(--color-primary-500, ${isDark ? '#60a5fa' : '#3b82f6'})` }}>
                                        <p className="italic">
                                            {isEn
                                                ? 'Through this project, we aim to provide support and assistance to the most vulnerable communities in Egyptian society. Your generous donation helps change many lives and achieve lasting positive impact.'
                                                : 'نسعى من خلال هذا المشروع إلى تقديم الدعم والمساعدة للفئات الأكثر احتياجًا في المجتمع المصري. بتبرعك الكريم، تساهم في تغيير حياة الكثيرين وتحقيق الأثر الإيجابي المستدام.'}
                                        </p>
                                    </div>

                                    <h5 className="text-lg font-bold mb-1">{t('projectDetails.projectGoals')}</h5>
                                    <ul className="pr-2 list-disc">
                                        {[
                                            'الوصول إلى الفئات المستهدفة في المناطق الأكثر احتياجًا',
                                            'توفير الدعم المادي والعيني بشكل مباشر',
                                            'ضمان الشفافية الكاملة في توزيع التبرعات',
                                            'متابعة وتقييم الأثر بشكل دوري'
                                        ].map((goal, index) => (
                                            <li key={index} className="mb-1">{goal}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div role="tabpanel" hidden={activeTab !== 1}>
                            {activeTab === 1 && (
                                <div className="flex flex-col gap-3">
                                    {projectUpdates.length === 0 ? (
                                        <p className="text-neutral-500 dark:text-neutral-400 text-center py-4">
                                            {'لا توجد تحديثات حالياً'}
                                        </p>
                                    ) : (
                                        projectUpdates.map(update => (
                                            <div key={update.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700 p-3">
                                                <div className="flex flex-col sm:flex-row gap-3">
                                                    <img
                                                        src={update.image}
                                                        alt={update.title}
                                                        className="w-full sm:w-[120px] h-[120px] object-cover rounded-lg"
                                                    />
                                                    <div className="flex-1">
                                                        <h6 className="font-bold mb-1">{update.title}</h6>
                                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{update.content}</p>
                                                        <span className="text-xs text-neutral-400 dark:text-neutral-500">
                                                            <i className="fa-regular fa-calendar ml-1"></i>
                                                            {formatDate(update.date)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        <div role="tabpanel" hidden={activeTab !== 2}>
                            {activeTab === 2 && (
                                <div>
                                    <h5 className="text-lg font-bold mb-1">{t('projectDetails.budgetBreakdown')}</h5>
                                    <div className="flex flex-col gap-3 mt-3">
                                        {[
                                            { label: 'المستلزمات والمواد', value: 60 },
                                            { label: 'النقل والتوزيع', value: 20 },
                                            { label: 'التشغيل والإدارة', value: 15 },
                                            { label: 'الطوارئ والاحتياطي', value: 5 }
                                        ].map((item, index) => (
                                            <div key={index}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-medium">{item.label}</span>
                                                    <span className="font-bold">{item.value}%</span>
                                                </div>
                                                <div className="h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                                                    <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${item.value}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div role="tabpanel" hidden={activeTab !== 3}>
                            {activeTab === 3 && (
                                <div className="flex flex-col gap-2">
                                    {[
                                        { q: 'كيف يمكنني التأكد من وصول تبرعي؟', a: 'نلتزم بالشفافية الكاملة وننشر تحديثات دورية عن توزيع التبرعات مع صور وتقارير مفصلة.'},
                                        { q: 'هل يمكنني التبرع بشكل شهري؟', a: 'نعم، يمكنك إعداد تبرع شهري متكرر لدعم المشروع بشكل مستمر.'},
                                        { q: 'هل التبرع معفى من الضرائب؟', a: 'نعم، التبرعات معفاة من الضرائب وفقًا للقوانين المصرية ونوفر إيصالات رسمية.'}
                                    ].map((faq, index) => (
                                        <div key={index} className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-2">
                                            <p className="font-bold mb-1">{faq.q}</p>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg sticky top-12 border border-neutral-100 dark:border-neutral-700">
                            <div className="p-4">
                                <div className="mb-3">
                                    <div className="flex justify-between items-end mb-1">
                                        <h4 className="text-2xl font-bold text-primary-500">
                                            {formatCurrency(project.raised)}
                                        </h4>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                                            {'من'} {formatCurrency(project.goal)}
                                        </p>
                                    </div>
                                    <div className="h-3 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden mb-2">
                                        <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${percentage > 100 ? 100 : percentage}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-center">
                                        <div>
                                            <h6 className="font-bold text-lg">{percentage}%</h6>
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400">{'مكتمل'}</span>
                                        </div>
                                        <div>
                                            <h6 className="font-bold text-lg">{formatNumber(project.donors)}</h6>
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('projects.donors')}</span>
                                        </div>
                                        <div>
                                            <h6 className="font-bold text-lg">{project.daysLeft}</h6>
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('projects.daysLeft')}</span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-t border-neutral-200 dark:border-neutral-700 my-3" />

                                <p className="text-sm font-medium mb-2">{t('donate.selectAmount')}</p>

                                <div className="grid grid-cols-3 gap-1 mb-3">
                                    {[50, 100, 200, 500, 1000, 2000].map(amount => (
                                        <button
                                            key={amount}
                                            onClick={() => setDonationAmount(amount)}
                                            className={`w-full rounded-lg border py-2 text-sm font-semibold transition-colors ${
                                                donationAmount === amount
                                                    ? 'bg-primary-500/10 border-primary-500 text-primary-500'
                                                    : 'border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                                            }`}
                                        >
                                            {formatCurrency(amount, 'USD').replace('$', '')}
                                        </button>
                                    ))}
                                </div>

                                <Link
                                    to={`/donate?project=${project.id}&amount=${donationAmount}`}
                                    className="block bg-primary-500 text-white text-center px-5 py-3 rounded-md font-semibold hover:bg-primary-600 transition-colors mb-2"
                                >
                                    {t('common.donate')}
                                </Link>

                                <button className="w-full text-neutral-500 dark:text-neutral-400 text-sm py-2 flex items-center justify-center gap-2 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                                    <i className="fa-solid fa-share-nodes"></i>
                                    {t('projectDetails.shareProject')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
