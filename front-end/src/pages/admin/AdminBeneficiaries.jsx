import { useState, useCallback, useMemo, useEffect } from 'react';
import { AdminPageHeader, AdminStatsGrid, AdminFilterBar, AdminDataTable, AdminFormDialog } from '../../components/admin';
import { beneficiariesList as initialBeneficiaries } from '../../data/adminMockData';
import { useAdminData, adminActions } from '../../contexts/AdminDataContext';
import { t } from '../../i18n';
import { countByStatus } from '../../utils/admin.helpers';

function AdminBeneficiaries() {
    const { state, dispatch } = useAdminData();
    const beneficiaries = state.beneficiaries;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [tabFilter, setTabFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, row: null });
    const [snackbar, setSnackbar] = useState({ open: false, msg: '', severity: 'success' });

    useEffect(() => {
        if (snackbar.open) {
            const timer = setTimeout(() => setSnackbar(s => ({ ...s, open: false })), 3000);
            return () => clearTimeout(timer);
        }
    }, [snackbar.open]);

    const emptyForm = { name: '', type: 'family', phone: '', nationalId: '', governorate: '', address: '', notes: '', program: '' };
    const [formData, setFormData] = useState(emptyForm);

    const filtered = useMemo(() =>
        beneficiaries
            .filter(b => tabFilter === 'all' || b.status === tabFilter)
            .filter(b => !search || b.name.includes(search)),
        [beneficiaries, tabFilter, search]
    );

    const handleAdd = () => {
        setEditItem(null);
        setFormData(emptyForm);
        setIsModalOpen(true);
    };

    const handleEdit = useCallback((row) => {
        setEditItem(row);
        setFormData({
            name: row.name || '', type: row.type === 'أسرة' ? 'family' : 'individual',
            phone: row.phone || '', nationalId: row.nationalId || '',
            governorate: row.location || '', address: row.address || '',
            notes: row.notes || '', program: row.program || '',
        });
        setIsModalOpen(true);
    }, []);

    const handleDelete = useCallback((row) => {
        setDeleteConfirm({ open: true, row });
    }, []);

    const confirmDelete = () => {
        if (!deleteConfirm.row) return;
        dispatch(adminActions.deleteBeneficiary(deleteConfirm.row.id));
        setSnackbar({ open: true, msg: `تم حذف "${deleteConfirm.row.name}"`, severity: 'success' });
        setDeleteConfirm({ open: false, row: null });
    };

    const handleStatusChange = useCallback((row, newStatus) => {
        dispatch(adminActions.updateBeneficiary({ ...row, status: newStatus }));
        setSnackbar({ open: true, msg: `تم تغيير حالة "${row.name}" إلى ${newStatus}`, severity: 'success' });
    }, [dispatch]);

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            setSnackbar({ open: true, msg: 'يرجى إدخال اسم المستفيد', severity: 'error' }); return;
        }

        const typeLabel = formData.type === 'family' ? 'أسرة' : 'فرد';

        if (editItem) {
            dispatch(adminActions.updateBeneficiary({
                ...editItem, name: formData.name, type: typeLabel, phone: formData.phone, nationalId: formData.nationalId, location: formData.governorate, address: formData.address, notes: formData.notes, program: formData.program
            }));
            setSnackbar({ open: true, msg: `تم تحديث بيانات "${formData.name}"`, severity: 'success' });
        } else {
            dispatch(adminActions.addBeneficiary({
                id: Math.max(...beneficiaries.map(b => b.id), 0) + 1,
                name: formData.name, type: typeLabel, program: formData.program || 'عام',
                status: 'pending', cases: 1, location: formData.governorate,
                phone: formData.phone, nationalId: formData.nationalId,
                address: formData.address, notes: formData.notes,
            }));
            setSnackbar({ open: true, msg: `تم إضافة "${formData.name}" بنجاح`, severity: 'success' });
        }
        setIsModalOpen(false);
        setFormData(emptyForm);
    };

    const kpis = [
        { label: t('admin.beneficiariesPage.totalBeneficiaries'), value: String(beneficiaries.length), icon: 'fa-solid fa-users', color: 'primary' },
        { label: t('admin.beneficiariesPage.activeCases'), value: String(countByStatus(beneficiaries, 'active')), icon: 'fa-solid fa-user-check', color: 'success' },
        { label: t('admin.beneficiariesPage.underReview'), value: String(countByStatus(beneficiaries, 'pending')), icon: 'fa-solid fa-clock', color: 'warning' },
    ];

    const tabs = [
        { label: `${t('admin.beneficiariesPage.all')} (${beneficiaries.length})`, value: 'all' },
        { label: `${t('admin.beneficiariesPage.active')} (${countByStatus(beneficiaries, 'active')})`, value: 'active' },
        { label: `${t('admin.beneficiariesPage.pending')} (${countByStatus(beneficiaries, 'pending')})`, value: 'pending' },
        { label: `${t('admin.beneficiariesPage.inactive')} (${countByStatus(beneficiaries, 'inactive')})`, value: 'inactive' },
    ];

    const columns = [
        { key: 'name', label: t('admin.beneficiariesPage.name'), fontWeight: 'medium' },
        { key: 'type', label: t('admin.beneficiariesPage.type') },
        { key: 'program', label: t('admin.beneficiariesPage.program') },
        { key: 'cases', label: t('admin.beneficiariesPage.cases'), render: (v) => `${v} ${t('admin.beneficiariesPage.caseSuffix')}` },
        { key: 'location', label: t('admin.beneficiariesPage.location') },
        {
            key: 'status', label: t('admin.beneficiariesPage.status'),
            render: (val, row) => (
                <select
                    value={val || 'pending'}
                    onChange={(e) => handleStatusChange(row, e.target.value)}
                    className="text-sm font-bold bg-transparent border-0 outline-none cursor-pointer"
                >
                    <option value="pending">قيد الانتظار</option>
                    <option value="under_review">قيد المراجعة</option>
                    <option value="active">معتمد</option>
                    <option value="rejected">مرفوض</option>
                    <option value="closed">مغلق</option>
                </select>
            )
        },
    ];

    const actions = [
        { icon: 'fa-solid fa-eye', tooltip: 'عرض', onClick: (row) => handleEdit(row) },
        { icon: 'fa-solid fa-pen', tooltip: t('common.edit'), onClick: (row) => handleEdit(row) },
        { icon: 'fa-solid fa-trash', tooltip: t('common.delete'), onClick: (row) => handleDelete(row), color: 'error' },
    ];

    const governorates = ['القاهرة', 'الجيزة', 'الإسكندرية', 'المنيا', 'أسوان', 'قنا', 'سوهاج', 'الفيوم', 'بني سويف'];
    const programOptions = state.programs.map(p => p.name || p.title);
    const updateField = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

    return (
        <div className="flex flex-col gap-3">
            <AdminPageHeader
                title={t('admin.beneficiariesPage.title')}
                subtitle={t('admin.beneficiariesPage.subtitle')}
                action={{ label: t('admin.beneficiariesPage.addBtn'), icon: 'fa-solid fa-plus', onClick: handleAdd }}
            />

            <AdminStatsGrid stats={kpis} columns={4} />

            <AdminFilterBar
                tabs={tabs} activeTab={tabFilter} onTabChange={(_, v) => setTabFilter(v)}
                searchValue={search} onSearchChange={setSearch}
                searchPlaceholder={t('admin.beneficiariesPage.searchPlaceholder')}
            />

            <AdminDataTable columns={columns} data={filtered} actions={actions} emptyMessage="لا يوجد مستفيدين مطابقين" />

            <AdminFormDialog
                open={isModalOpen}
                onClose={() => { setIsModalOpen(false); setFormData(emptyForm); }}
                onSubmit={handleSubmit}
                title={editItem ? `تعديل: ${editItem.name}` : t('admin.beneficiariesPage.addDialog')}
                submitLabel={editItem ? t('admin.programsPage.saveChanges') : t('admin.beneficiariesPage.addBeneficiary')}
                dividers
            >
                <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t('admin.beneficiariesPage.fullName')} required value={formData.name} onChange={updateField('name')} />
                <select className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.type} onChange={updateField('type')}>
                    <option value="family">{t('admin.beneficiariesPage.family')}</option>
                    <option value="individual">{t('admin.beneficiariesPage.individual')}</option>
                </select>
                <select className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.program} onChange={updateField('program')}>
                    {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t('admin.beneficiariesPage.phone')} value={formData.phone} onChange={updateField('phone')} />
                <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t('admin.beneficiariesPage.nationalId')} value={formData.nationalId} onChange={updateField('nationalId')} />
                <select className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.governorate} onChange={updateField('governorate')}>
                    <option value="" disabled>{t('admin.beneficiariesPage.selectGovernorate')}</option>
                    {governorates.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t('admin.beneficiariesPage.address')} value={formData.address} onChange={updateField('address')} />
                <textarea className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" rows={3} value={formData.notes} onChange={updateField('notes')} placeholder={t('admin.beneficiariesPage.notesPlaceholder')} />
            </AdminFormDialog>

            {deleteConfirm.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setDeleteConfirm({ open: false, row: null })}></div>
                    <div className="relative bg-white dark:bg-neutral-800 rounded-xl shadow-modal max-w-lg w-full mx-4 max-h-[85vh] overflow-y-auto">
                        <h2 className="text-lg font-bold p-4 border-b border-neutral-200 dark:border-neutral-700">تأكيد الحذف</h2>
                        <div className="p-4">
                            <p className="text-neutral-600 dark:text-neutral-400">
                                هل أنت متأكد من حذف المستفيد "{deleteConfirm.row?.name}"؟ لا يمكن التراجع عن هذا الإجراء.
                            </p>
                        </div>
                        <div className="flex justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-700">
                            <button onClick={() => setDeleteConfirm({ open: false, row: null })} className="px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 rounded-md font-semibold transition-colors">إلغاء</button>
                            <button onClick={confirmDelete} className="bg-error-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-error-600 transition-colors">حذف نهائياً</button>
                        </div>
                    </div>
                </div>
            )}

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

export default AdminBeneficiaries;
