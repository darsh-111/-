import { useState, useEffect } from 'react';
import { AdminPageHeader, AdminStatsGrid, AdminIconBox } from '../../components/admin';
import { t, formatCurrency, formatNumber } from '../../i18n';
import { recentReports, reportTypes } from '../../data/adminMockData';
import { useAdminData } from '../../contexts/AdminDataContext';

function AdminReports() {
    const { state } = useAdminData();
    const dashboardStats = state.dashboardStats || {};
    const [reports, setReports] = useState(recentReports || []);
    const [snackbar, setSnackbar] = useState({ open: false, msg: '', severity: 'success' });

    useEffect(() => {
        if (snackbar.open) {
            const timer = setTimeout(() => setSnackbar(s => ({ ...s, open: false })), 3000);
            return () => clearTimeout(timer);
        }
    }, [snackbar.open]);

    const quickStats = [
        { label: t('admin.reportsPage.totalDonations'), value: formatCurrency(dashboardStats.totalDonations || 0), icon: 'fa-solid fa-coins', color: 'success' },
        { label: t('admin.reportsPage.donorCount'), value: formatNumber(new Set(state.donations.map(d => d.donor || d.donorName)).size), icon: 'fa-solid fa-users', color: 'primary' },
        { label: t('admin.reportsPage.newBeneficiaries'), value: formatNumber(state.beneficiaries?.length || 0), icon: 'fa-solid fa-user-plus', color: 'info' },
        { label: t('admin.reportsPage.completedProjects'), value: formatNumber(state.projects.filter(p => p.status === 'completed').length), icon: 'fa-solid fa-circle-check', color: 'warning' },
    ];

    const generateCSV = (typeTitle) => {
        let headers = [];
        let rows = [];
        
        if (typeTitle.includes('تبرعات')) {
            headers = ['ID', 'المتبرع', 'المبلغ', 'المشروع', 'التاريخ', 'الحالة'];
            rows = state.donations.map(d => [d.id, `"${d.donor || ''}"`, d.amount, `"${d.project || ''}"`, d.date || d.time || '', d.status || '']);
        } else if (typeTitle.includes('مشاريع')) {
            headers = ['ID', 'المشروع', 'الهدف', 'تم جمعه', 'الحالة'];
            rows = state.projects.map(p => [p.id, `"${p.title}"`, p.goal, p.raised || 0, p.status || 'active']);
        } else if (typeTitle.includes('مستفيدين')) {
            headers = ['ID', 'الاسم', 'النوع', 'البرنامج', 'المحافظة', 'الحالة'];
            rows = state.beneficiaries.map(b => [b.id, `"${b.name}"`, b.type, `"${b.program || ''}"`, `"${b.location || ''}"`, b.status || 'active']);
        } else if (typeTitle.includes('مالي')) {
            headers = ['النوع', 'الجهة / المتبرع', 'المبلغ', 'التاريخ', 'الحالة'];
            const incomeRows = state.donations.map(d => ['إيراد (تبرع)', `"${d.donor}"`, d.amount, d.date || '', d.status || '']);
            const expenseRows = state.disbursements.map(d => ['مصروف', `"${d.beneficiary}"`, d.amount, d.date || '', d.status || '']);
            rows = [...incomeRows, ...expenseRows];
        } else {
            headers = ['الوصف', 'القيمة'];
            rows = [
                ['إجمالي التبرعات', dashboardStats.totalDonations || 0],
                ['عدد المستفيدين', dashboardStats.beneficiaries || 0],
                ['المشاريع النشطة', dashboardStats.activeProjects || 0],
            ];
        }
        
        const csvRows = [headers.join(','), ...rows.map(r => r.join(','))];
        const csvString = csvRows.join('\n');
        const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Report_${typeTitle}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCreateReport = (type) => {
        const newReport = {
            id: Math.max(...reports.map(r => r.id), 0) + 1,
            title: type.title,
            icon: type.icon,
            color: type.color,
            period: 'تقرير مخصص',
            generated: new Date().toLocaleDateString('ar-EG'),
        };
        setReports(prev => [newReport, ...prev]);
        generateCSV(type.title);
        setSnackbar({ open: true, msg: `تم إنشاء وتحميل التقرير "${type.title}" بنجاح`, severity: 'success' });
    };

    const handleViewReport = (report) => {
        setSnackbar({ open: true, msg: `جاري فتح التقرير: ${report.title}`, severity: 'info' });
    };

    const handleDownloadReport = (report) => {
        generateCSV(report.title);
        setSnackbar({ open: true, msg: `تم تحميل التقرير: ${report.title}`, severity: 'success' });
    };

    const handleDeleteReport = (reportId) => {
        setReports(prev => prev.filter(r => r.id !== reportId));
        setSnackbar({ open: true, msg: 'تم حذف التقرير', severity: 'success' });
    };

    return (
        <div className="flex flex-col gap-3">
            <AdminPageHeader
                title={t('admin.reportsPage.title')}
                subtitle={t('admin.reportsPage.subtitle')}
                action={{ label: t('admin.reportsPage.createReport'), icon: 'fa-solid fa-plus', onClick: () => handleCreateReport(reportTypes[0]) }}
            />

            <AdminStatsGrid stats={quickStats} columns={3} />

            {/* Report Types - Quick Create */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card border border-neutral-100 dark:border-neutral-700">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h6 className="text-base font-bold">{t('admin.reportsPage.quickCreate')}</h6>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-12 gap-4">
                        {reportTypes.map((rt, i) => (
                            <div className="col-span-12 sm:col-span-6 md:col-span-3" key={i}>
                                <div
                                    onClick={() => handleCreateReport(rt)}
                                    className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-100 dark:border-neutral-700 p-4 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                                >
                                    <AdminIconBox icon={rt.icon} color={rt.color} size={44} />
                                    <p className="font-bold mt-3">{rt.title}</p>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{rt.desc}</span>
                                    <button className="block text-xs font-bold p-0 mt-1 text-primary-500">
                                        {t('admin.reportsPage.create')} <i className="fa-solid fa-arrow-left" style={{ marginInlineEnd: 4 }} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card border border-neutral-100 dark:border-neutral-700">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                    <h6 className="text-base font-bold">{t('admin.reportsPage.recentReports')}</h6>
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium border border-primary-500 text-primary-500">
                        {reports.length}
                    </span>
                </div>
                {reports.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-neutral-500 dark:text-neutral-400">لا توجد تقارير</p>
                    </div>
                ) : (
                    <div>
                        {reports.map((report, i) => (
                            <div key={report.id} className={`flex items-center gap-3 p-3 ${i !== reports.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-700' : ''}`}>
                                <AdminIconBox icon={report.icon} color={report.color} size={40} />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{report.title}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300">
                                            {report.period}
                                        </span>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('admin.reportsPage.createdOn')}: {report.generated}</span>
                                    </div>
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    <button className="border border-primary-500 text-primary-500 px-3 py-1 rounded-md text-xs font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors" onClick={() => handleViewReport(report)}>{t('admin.reportsPage.view')}</button>
                                    <button className="border border-neutral-400 text-neutral-600 dark:text-neutral-300 px-3 py-1 rounded-md text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors" onClick={() => handleDownloadReport(report)}>{t('admin.reportsPage.download')}</button>
                                    <button className="border border-error-500 text-error-500 px-2 py-1 rounded-md text-xs hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors" onClick={() => handleDeleteReport(report.id)}><i className="fa-solid fa-trash" style={{ fontSize: 12 }} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {snackbar.open && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
                    <div className={`px-4 py-3 rounded-lg text-sm font-medium shadow-lg text-white ${
                        snackbar.severity === 'success' ? 'bg-success-500' :
                        snackbar.severity === 'error' ? 'bg-error-500' :
                        snackbar.severity === 'warning' ? 'bg-warning-500' :
                        'bg-primary-500'
                    }`}>
                        {snackbar.msg}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminReports;
