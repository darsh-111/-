import { useState, useCallback, useMemo, useEffect } from 'react';
import { AdminPageHeader, AdminStatsGrid, AdminFilterBar, AdminDataTable, AdminFormDialog } from '../../components/admin';
import { formatCurrency, t } from '../../i18n';
import { useAdminData, adminActions } from '../../contexts/AdminDataContext';

function AdminFinance() {
    const { state, dispatch } = useAdminData();
    const disbursements = state.disbursements;
    const [activeTab, setActiveTab] = useState('overview');
    const [snackbar, setSnackbar] = useState({ open: false, msg: '', severity: 'success' });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const emptyForm = { beneficiary: '', type: '', amount: '', date: new Date().toLocaleDateString('en-CA') };
    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (snackbar.open) {
            const timer = setTimeout(() => setSnackbar(s => ({ ...s, open: false })), 3000);
            return () => clearTimeout(timer);
        }
    }, [snackbar.open]);

    const currentYear = new Date().getFullYear();
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    
    const financeMonthlyData = useMemo(() => {
        return months.map((month, index) => {
            const income = state.donations
                .filter(d => d.status === 'completed' && d.date && new Date(d.date).getMonth() === index && new Date(d.date).getFullYear() === currentYear)
                .reduce((sum, d) => sum + d.amount, 0);
            const expenses = disbursements
                .filter(d => d.status === 'approved' && d.date && new Date(d.date).getMonth() === index && new Date(d.date).getFullYear() === currentYear)
                .reduce((sum, d) => sum + d.amount, 0);
            return { month, income, expenses };
        });
    }, [state.donations, disbursements, currentYear]);

    const totals = financeMonthlyData.reduce((acc, m) => ({
        income: acc.income + m.income,
        expenses: acc.expenses + m.expenses,
    }), { income: 0, expenses: 0 });

    const kpis = [
        { label: t('admin.financePage.totalIncome'), value: formatCurrency(totals.income), icon: 'fa-solid fa-arrow-trend-up', color: 'success', change: '+12%' },
        { label: t('admin.financePage.totalExpenses'), value: formatCurrency(totals.expenses), icon: 'fa-solid fa-arrow-trend-down', color: 'error', change: '+8%', trend: 'up' },
        { label: t('admin.financePage.availableBalance'), value: formatCurrency(totals.income - totals.expenses), icon: 'fa-solid fa-wallet', color: 'primary' },
        { label: t('admin.financePage.pendingRequests'), value: String(disbursements.filter(d => d.status === 'pending').length), icon: 'fa-solid fa-clock', color: 'warning' },
    ];

    const tabs = [
        { label: t('admin.financePage.overview'), value: 'overview' },
        { label: `${t('admin.financePage.disbursements')} (${disbursements.length})`, value: 'disbursements' },
        { label: t('admin.financePage.budgets'), value: 'budgets' },
    ];

    const handleApprove = useCallback((row) => {
        dispatch(adminActions.updateDisbursement({ ...row, status: 'approved' }));
        setSnackbar({ open: true, msg: `تم اعتماد صرف ${formatCurrency(row.amount)} لـ "${row.beneficiary}"`, severity: 'success' });
    }, [dispatch]);

    const handleViewDisbursement = useCallback((row) => {
        setSnackbar({ open: true, msg: `عرض تفاصيل: ${row.beneficiary} — ${formatCurrency(row.amount)}`, severity: 'info' });
    }, []);

    const disbursementColumns = [
        { key: 'beneficiary', label: t('admin.financePage.beneficiary'), fontWeight: 'medium' },
        { key: 'type', label: t('admin.financePage.type') },
        { key: 'amount', label: t('admin.financePage.amount'), render: (v) => formatCurrency(v), fontWeight: 'bold', color: 'primary.main' },
        { key: 'date', label: t('admin.financePage.date') },
        { key: 'status', label: t('admin.financePage.status'), type: 'status' },
    ];

    const disbursementActions = [
        { icon: 'fa-solid fa-eye', tooltip: 'عرض التفاصيل', onClick: (row) => handleViewDisbursement(row) },
        { icon: 'fa-solid fa-check', tooltip: 'اعتماد', show: (row) => row.status === 'pending', color: 'success', onClick: (row) => handleApprove(row) },
        { icon: 'fa-solid fa-xmark', tooltip: 'رفض', show: (row) => row.status === 'pending', color: 'error', onClick: (row) => {
            dispatch(adminActions.updateDisbursement({ ...row, status: 'rejected' }));
            setSnackbar({ open: true, msg: `تم رفض طلب الصرف`, severity: 'warning' });
        }},
    ];

    const maxValue = Math.max(1, ...financeMonthlyData.flatMap(m => [m.income, m.expenses]));

    const handleAddSubmit = () => {
        if (!formData.beneficiary || !formData.amount) {
            setSnackbar({ open: true, msg: 'يرجى إدخال جميع الحقول الإلزامية', severity: 'error' });
            return;
        }
        dispatch(adminActions.addDisbursement({
            id: Math.max(0, ...disbursements.map(d => d.id)) + 1,
            beneficiary: formData.beneficiary,
            type: formData.type || 'عام',
            amount: Number(formData.amount),
            date: formData.date,
            status: 'pending'
        }));
        setSnackbar({ open: true, msg: 'تم إضافة طلب الصرف', severity: 'success' });
        setIsAddModalOpen(false);
        setFormData(emptyForm);
    };

    return (
        <div className="flex flex-col gap-3">
            <AdminPageHeader
                title={t('admin.financePage.title')}
                subtitle={t('admin.financePage.subtitle')}
                action={{ label: t('admin.financePage.newDisbursement'), icon: 'fa-solid fa-plus', onClick: () => setIsAddModalOpen(true) }}
                secondaryAction={{ label: t('admin.financePage.exportReport'), icon: 'fa-solid fa-download', onClick: () => setSnackbar({ open: true, msg: 'جاري تصدير التقرير المالي...', severity: 'success' }) }}
            />

            <AdminStatsGrid stats={kpis} columns={3} />

            <AdminFilterBar tabs={tabs} activeTab={activeTab} onTabChange={(_, v) => setActiveTab(v)} />

            {activeTab === 'overview' && (
                <>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card border border-neutral-100 dark:border-neutral-700">
                        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                            <h6 className="text-base font-bold">{t('admin.financePage.monthlyChart')}</h6>
                        </div>
                        <div className="p-4">
                            <div className="flex gap-3 flex-wrap">
                                {financeMonthlyData.map((m) => (
                                    <div key={m.month} className="text-center flex-1 min-w-[100px]">
                                        <div className="flex gap-0.5 justify-center items-end h-30 mb-1">
                                            <div
                                                className="w-6 rounded-t-md transition-all duration-500"
                                                style={{ height: `${(m.income / maxValue) * 100}%`, backgroundColor: 'rgba(34, 197, 94, 0.8)' }}
                                            />
                                            <div
                                                className="w-6 rounded-t-md transition-all duration-500"
                                                style={{ height: `${(m.expenses / maxValue) * 100}%`, backgroundColor: 'rgba(239, 68, 68, 0.6)' }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium">{m.month}</span>
                                        <div className="mt-0.5">
                                            <span className="text-xs block text-success-500">{formatCurrency(m.income)}</span>
                                            <span className="text-xs block text-error-500">{formatCurrency(m.expenses)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3 justify-center mt-2">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-sm bg-success-500"></div>
                                    <span className="text-xs">{t('admin.financePage.income')}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-sm bg-error-500"></div>
                                    <span className="text-xs">{t('admin.financePage.expenses')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        {[].map((budget, i) => (
                            <div className="col-span-12 md:col-span-4" key={i}>
                                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card border border-neutral-100 dark:border-neutral-700 p-4">
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm font-bold">{budget.label}</p>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                            {formatCurrency(budget.spent)} {t('admin.financePage.of')} {formatCurrency(budget.total)}
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 overflow-hidden mb-0.5">
                                        <div className="h-full rounded-lg bg-primary-500 transition-all" style={{ width: `${Math.round((budget.spent / budget.total) * 100)}%` }} />
                                    </div>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block text-right">
                                        {t('admin.financePage.spent')}: {Math.round((budget.spent / budget.total) * 100)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {activeTab === 'disbursements' && (
                <AdminDataTable columns={disbursementColumns} data={disbursements} actions={disbursementActions} />
            )}

            {activeTab === 'budgets' && (
                <p className="text-neutral-500 dark:text-neutral-400 p-8 text-center">
                    {t('admin.financePage.budgets')} — قريباً...
                </p>
            )}

            <AdminFormDialog
                open={isAddModalOpen}
                onClose={() => { setIsAddModalOpen(false); setFormData(emptyForm); }}
                onSubmit={handleAddSubmit}
                title="إضافة طلب صرف جديد"
                submitLabel="إضافة"
            >
                <div className="flex flex-col gap-2 mt-1">
                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" placeholder="اسم المستفيد / الجهة" required value={formData.beneficiary} onChange={(e) => setFormData({ ...formData, beneficiary: e.target.value })} />
                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" type="number" placeholder="المبلغ (ج.م)" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" placeholder="نوع المصروف" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                </div>
            </AdminFormDialog>

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

export default AdminFinance;
