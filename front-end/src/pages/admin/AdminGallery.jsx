import { useState, useCallback, useEffect } from 'react';
import { AdminPageHeader, AdminFormDialog } from '../../components/admin';
import { useAdminData } from '../../contexts/AdminDataContext';

function AdminGallery() {
    const { state, dispatch } = useAdminData();
    const images = state.gallery || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, msg: '', severity: 'success' });
    const [formData, setFormData] = useState({ title: '', description: '', image: '' });
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, item: null });

    useEffect(() => {
        if (snackbar.open) {
            const timer = setTimeout(() => setSnackbar(s => ({ ...s, open: false })), 4000);
            return () => clearTimeout(timer);
        }
    }, [snackbar.open]);

    const resetForm = () => setFormData({ title: '', description: '', image: '' });

    const handleAdd = () => {
        setSelectedImage(null);
        resetForm();
        setIsModalOpen(true);
    };

    const handleDelete = useCallback((item) => {
        setDeleteConfirm({ open: true, item });
    }, []);

    const confirmDelete = () => {
        if (!deleteConfirm.item) return;
        dispatch({ type: 'DELETE_GALLERY_ITEM', payload: deleteConfirm.item.id });
        setSnackbar({ open: true, msg: 'تم الحذف بنجاح', severity: 'success' });
        setDeleteConfirm({ open: false, item: null });
    };

    const handleSubmit = () => {
        if (!formData.image.trim() || !formData.title.trim()) {
            setSnackbar({ open: true, msg: 'يرجى إدخال العنوان ورابط الصورة', severity: 'error' });
            return;
        }
        if (selectedImage) {
            dispatch({ type: 'UPDATE_GALLERY_ITEM', payload: { ...selectedImage, ...formData } });
        } else {
            dispatch({ type: 'ADD_GALLERY_ITEM', payload: { id: Date.now(), ...formData } });
        }
        setSnackbar({ open: true, msg: selectedImage ? 'تم التحديث' : 'تمت الإضافة', severity: 'success' });
        setIsModalOpen(false);
        resetForm();
    };

    return (
        <div className="flex flex-col gap-3">
            <AdminPageHeader title="معرض الصور" subtitle="إدارة صور وفيديوهات الأنشطة والفعاليات" action={{ label: 'إضافة صورة', icon: 'fa-solid fa-plus', onClick: handleAdd }} />

            {images.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 dark:text-neutral-400">
                    <i className="fa-regular fa-images" style={{ fontSize: 48, opacity: 0.3 }} />
                    <p className="mt-4">لا توجد صور بعد</p>
                </div>
            ) : (
                <div className="grid grid-cols-12 gap-2">
                    {images.map((img) => (
                        <div className="col-span-6 sm:col-span-4 md:col-span-3" key={img.id}>
                            <div className="relative rounded-lg bg-white dark:bg-neutral-800 shadow-card border border-neutral-100 dark:border-neutral-700 group overflow-hidden">
                                <img className="w-full h-[180px] object-cover" src={img.image} alt={img.title}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Error'; }}
                                />
                                <div className="p-3 py-2">
                                    <p className="text-sm font-bold truncate">{img.title}</p>
                                </div>
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button className="p-1.5 rounded-md bg-black/50 hover:bg-black/70 transition-colors" onClick={() => handleDelete(img)}>
                                        <i className="fa-solid fa-trash" style={{ fontSize: 12, color: '#fff' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AdminFormDialog open={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} onSubmit={handleSubmit} title={selectedImage ? 'تعديل الصورة' : 'إضافة صورة جديدة'} submitLabel={selectedImage ? 'حفظ' : 'إضافة'}>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">العنوان</label>
                    <input autoFocus className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">الوصف</label>
                    <textarea rows={2} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">رابط الصورة</label>
                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={formData.image} onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))} placeholder="https://example.com/photo.jpg" />
                </div>
                {formData.image && <img src={formData.image} className="w-full max-h-[200px] object-cover rounded mt-1" onError={(e) => { e.target.style.display = 'none'; }} />}
            </AdminFormDialog>

            {deleteConfirm.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setDeleteConfirm({ open: false, item: null })}></div>
                    <div className="relative bg-white dark:bg-neutral-800 rounded-xl shadow-modal max-w-lg w-full mx-4">
                        <h2 className="text-lg font-bold p-4 border-b border-neutral-200 dark:border-neutral-700">تأكيد الحذف</h2>
                        <div className="p-4">
                            <p className="text-neutral-600 dark:text-neutral-400">هل أنت متأكد من حذف "{deleteConfirm.item?.title}"؟</p>
                        </div>
                        <div className="flex justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-700">
                            <button className="px-4 py-2 rounded-md font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors" onClick={() => setDeleteConfirm({ open: false, item: null })}>إلغاء</button>
                            <button className="bg-error-500 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-error-600 transition-colors" onClick={confirmDelete}>حذف</button>
                        </div>
                    </div>
                </div>
            )}

            {snackbar.open && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
                    <div className={`px-4 py-3 rounded-lg text-sm shadow-lg ${
                        snackbar.severity === 'success' ? 'bg-success-500 text-white' :
                        snackbar.severity === 'error' ? 'bg-error-500 text-white' :
                        snackbar.severity === 'warning' ? 'bg-warning-500 text-white' :
                        'bg-primary-500 text-white'
                    }`}>
                        {snackbar.msg}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminGallery;
