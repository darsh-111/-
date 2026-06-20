import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../i18n';

const primaryMain = '#00b16a';
const primaryDark = '#009659';
const primaryLight = '#33c489';

function Transparency() {
    const { isDark } = useTheme();

    const financialData = {
        totalDonations: 15234567,
        totalSpent: 14123456,
        programExpenses: 12500000,
        adminExpenses: 1200000,
        fundraisingExpenses: 423456,
        beneficiaries: 48520,
    };

    const programColors = {
        primary: primaryMain,
        success: '#22c55e',
        secondary: '#6366f1',
        error: '#ef4444',
        info: '#3b82f6',
    };

    const programBreakdown = [
        { name: 'رعاية الأيتام', amount: 4500000, percentage: 36, color: programColors.primary },
        { name: 'الرعاية الصحية', amount: 2800000, percentage: 22, color: programColors.success },
        { name: 'التعليم', amount: 2200000, percentage: 18, color: programColors.secondary },
        { name: 'الإغاثة العاجلة', amount: 1800000, percentage: 14, color: programColors.error },
        { name: 'التنمية المجتمعية', amount: 1200000, percentage: 10, color: programColors.info },
    ];

    const auditors = [
        { year: '2024', firm: 'شركة الحسابات المصرية', status: 'قيد المراجعة' },
        { year: '2023', firm: 'شركة الحسابات المصرية', status: 'معتمد' },
        { year: '2022', firm: 'PWC مصر', status: 'معتمد' },
        { year: '2021', firm: 'PWC مصر', status: 'معتمد' },
    ];

    return (
        <div className="pb-12 bg-white dark:bg-[#0f172a]">
            {/* Hero */}
            <div className="text-white text-center py-12 md:py-16" style={{
                background: `linear-gradient(135deg, ${primaryMain}, ${primaryDark})`,
            }}>
                <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                    <h1 className="text-2xl md:text-3xl font-bold mb-3">
                        الشفافية والمساءلة
                    </h1>
                    <p className="text-base md:text-lg opacity-90 max-w-[700px] mx-auto">
                        نؤمن بحق المتبرعين في معرفة كيف تُستخدم أموالهم. نلتزم بالإفصاح الكامل عن جميع عملياتنا المالية
                    </p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 -mt-6 relative z-10">
                {/* Financial Overview */}
                <div className="mb-12">
                    <h4 className="text-xl font-bold text-center mb-6 hidden">نظرة عامة مالية</h4>
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-6 md:col-span-3">
                            <div className={`p-3 text-center flex flex-col gap-1 h-full justify-center rounded-2xl ${isDark ? 'bg-[#1e293b]' : 'bg-white'} shadow-lg`}>
                                <div className="text-3xl mb-1" style={{ color: primaryMain }}>
                                    <i className="fa-solid fa-coins"></i>
                                </div>
                                <h5 className="text-xl font-bold" style={{ color: isDark ? '#e2e8f0' : '#1a1a2e' }}>
                                    {formatCurrency(financialData.totalDonations)}
                                </h5>
                                <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                    إجمالي التبرعات
                                </p>
                            </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <div className={`p-3 text-center flex flex-col gap-1 h-full justify-center rounded-2xl ${isDark ? 'bg-[#1e293b]' : 'bg-white'} shadow-lg`}>
                                <div className="text-3xl mb-1" style={{ color: primaryMain }}>
                                    <i className="fa-solid fa-chart-pie"></i>
                                </div>
                                <h5 className="text-xl font-bold" style={{ color: isDark ? '#e2e8f0' : '#1a1a2e' }}>
                                    {formatCurrency(financialData.totalSpent)}
                                </h5>
                                <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                    إجمالي المصروفات
                                </p>
                            </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <div className="p-3 text-center flex flex-col gap-1 h-full justify-center rounded-2xl text-white" style={{
                                background: `linear-gradient(135deg, ${primaryMain}, ${primaryLight})`,
                            }}>
                                <div className="text-3xl mb-1">
                                    <i className="fa-solid fa-bullseye"></i>
                                </div>
                                <h4 className="text-2xl font-bold">88%</h4>
                                <p className="text-sm opacity-90">نسبة الإنفاق على البرامج</p>
                            </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <div className={`p-3 text-center flex flex-col gap-1 h-full justify-center rounded-2xl ${isDark ? 'bg-[#1e293b]' : 'bg-white'} shadow-lg`}>
                                <div className="text-3xl mb-1" style={{ color: primaryMain }}>
                                    <i className="fa-solid fa-users"></i>
                                </div>
                                <h5 className="text-xl font-bold" style={{ color: isDark ? '#e2e8f0' : '#1a1a2e' }}>
                                    {financialData.beneficiaries.toLocaleString('ar-EG')}
                                </h5>
                                <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                    مستفيد
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expense Breakdown */}
                <div className="mb-12">
                    <h4 className="text-xl font-bold text-center mb-6" style={{ color: isDark ? '#f1f5f9' : '#1a1a2e' }}>
                        توزيع المصروفات
                    </h4>
                    <div className="flex justify-center">
                        <div className="w-full md:w-2/3">
                            <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#1e293b]' : 'bg-white'} shadow-lg`}>
                                <div className="w-[200px] h-[200px] rounded-full mx-auto mb-3 relative flex items-center justify-center" style={{
                                    background: `conic-gradient(${primaryMain} 0deg 316deg, ${isDark ? '#4a5568' : '#cbd5e1'} 316deg 349deg, ${programColors.secondary} 349deg 360deg)`,
                                }}>
                                    <div className={`w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center z-10 ${isDark ? 'bg-[#0f172a]' : 'bg-white'}`}>
                                        <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>البرامج</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 max-w-[300px] mx-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded" style={{ backgroundColor: primaryMain }}></div>
                                        <p className="text-sm flex-1" style={{ color: isDark ? '#e2e8f0' : '#333' }}>مصروفات البرامج</p>
                                        <p className="text-sm font-medium" style={{ color: isDark ? '#e2e8f0' : '#333' }}>88%</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded" style={{ backgroundColor: isDark ? '#4a5568' : '#cbd5e1' }}></div>
                                        <p className="text-sm flex-1" style={{ color: isDark ? '#e2e8f0' : '#333' }}>مصروفات إدارية</p>
                                        <p className="text-sm font-medium" style={{ color: isDark ? '#e2e8f0' : '#333' }}>9%</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded" style={{ backgroundColor: programColors.secondary }}></div>
                                        <p className="text-sm flex-1" style={{ color: isDark ? '#e2e8f0' : '#333' }}>تكاليف جمع التبرعات</p>
                                        <p className="text-sm font-medium" style={{ color: isDark ? '#e2e8f0' : '#333' }}>3%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program Breakdown */}
                <div className="mb-12">
                    <h4 className="text-xl font-bold text-center mb-6" style={{ color: isDark ? '#f1f5f9' : '#1a1a2e' }}>
                        توزيع الإنفاق على البرامج
                    </h4>
                    <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#1e293b]' : 'bg-white'} shadow-lg`}>
                        <div className="flex flex-col gap-4">
                            {programBreakdown.map((program, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm font-medium" style={{ color: isDark ? '#e2e8f0' : '#333' }}>
                                            {program.name}
                                        </p>
                                        <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                            {formatCurrency(program.amount)}
                                        </p>
                                    </div>
                                    <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: `${program.color}1a` }}>
                                        <div className="h-full rounded-full transition-all" style={{ width: `${program.percentage}%`, backgroundColor: program.color }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Audit Reports */}
                <div className="mb-12">
                    <h4 className="text-xl font-bold text-center mb-6" style={{ color: isDark ? '#f1f5f9' : '#1a1a2e' }}>
                        تقارير المراجعة
                    </h4>
                    <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#1e293b]' : 'bg-white'} shadow-lg`}>
                        <table className="w-full border-collapse">
                            <thead style={{ backgroundColor: isDark ? '#1a2332' : '#f8fafc' }}>
                                <tr>
                                    <th className="p-3 text-sm font-bold text-right">السنة</th>
                                    <th className="p-3 text-sm font-bold text-right">مكتب المراجعة</th>
                                    <th className="p-3 text-sm font-bold text-right">الحالة</th>
                                    <th className="p-3 text-sm font-bold text-right">التقرير</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditors.map((audit, index) => (
                                    <tr key={index} className={`transition-colors ${isDark ? 'hover:bg-[#1a2332]' : 'hover:bg-gray-50'}`} style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}` }}>
                                        <td className="p-3 text-sm" style={{ color: isDark ? '#e2e8f0' : '#333' }}>{audit.year}</td>
                                        <td className="p-3 text-sm" style={{ color: isDark ? '#e2e8f0' : '#333' }}>{audit.firm}</td>
                                        <td className="p-3">
                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium" style={{
                                                backgroundColor: audit.status === 'معتمد' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                                                color: audit.status === 'معتمد' ? '#16a34a' : '#ca8a04',
                                            }}>
                                                {audit.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {audit.status === 'معتمد' ? (
                                                <a href="#" className="flex items-center gap-1 text-sm hover:underline" style={{ color: primaryMain }}>
                                                    <i className="fa-solid fa-file-pdf"></i> تحميل
                                                </a>
                                            ) : (
                                                <p className="text-sm" style={{ color: isDark ? 'rgba(148,163,184,0.5)' : 'rgba(0,0,0,0.38)' }}>
                                                    قريباً
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Governance */}
                <div className="mb-12">
                    <h4 className="text-xl font-bold text-center mb-6" style={{ color: isDark ? '#f1f5f9' : '#1a1a2e' }}>
                        الحوكمة والرقابة
                    </h4>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-4">
                            <div className={`p-4 text-center h-full rounded-2xl shadow ${isDark ? 'bg-[#1e293b]' : 'bg-white'}`}>
                                <div className="text-4xl mb-2" style={{ color: primaryMain }}>
                                    <i className="fa-solid fa-clipboard-list"></i>
                                </div>
                                <h6 className="text-base font-bold mb-2" style={{ color: isDark ? '#e2e8f0' : '#333' }}>
                                    مجلس الإدارة
                                </h6>
                                <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                    مجلس مستقل من 7 أعضاء يجتمع شهريًا لمراجعة الأداء واتخاذ القرارات الاستراتيجية
                                </p>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <div className={`p-4 text-center h-full rounded-2xl shadow ${isDark ? 'bg-[#1e293b]' : 'bg-white'}`}>
                                <div className="text-4xl mb-2" style={{ color: primaryMain }}>
                                    <i className="fa-solid fa-shield-halved"></i>
                                </div>
                                <h6 className="text-base font-bold mb-2" style={{ color: isDark ? '#e2e8f0' : '#333' }}>
                                    لجنة المراجعة
                                </h6>
                                <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                    لجنة مستقلة تراجع البيانات المالية والالتزام بالسياسات والإجراءات
                                </p>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <div className={`p-4 text-center h-full rounded-2xl shadow ${isDark ? 'bg-[#1e293b]' : 'bg-white'}`}>
                                <div className="text-4xl mb-2" style={{ color: primaryMain }}>
                                    <i className="fa-solid fa-scale-balanced"></i>
                                </div>
                                <h6 className="text-base font-bold mb-2" style={{ color: isDark ? '#e2e8f0' : '#333' }}>
                                    الامتثال
                                </h6>
                                <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                    نلتزم بجميع القوانين المصرية المنظمة للعمل الأهلي ومعايير الشفافية الدولية
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transparency;
