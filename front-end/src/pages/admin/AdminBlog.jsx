import { useState, useCallback, useEffect } from 'react';
import { AdminPageHeader, AdminDataTable, AdminFormDialog, AdminStatusChip } from '../../components/admin';
import { t, formatDate } from '../../i18n';
import { useAdminData, adminActions } from '../../contexts/AdminDataContext';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['أخبار', 'تقارير', 'قصص نجاح', 'فعاليات', 'مقالات'];

function AdminBlog() {
    const { state, dispatch } = useAdminData();
    const posts = state.blogPosts || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, msg: '', severity: 'success' });
    const [formData, setFormData] = useState({ title: '', summary: '', content: '', image: '', category: 'أخبار', author: '', featured: false, status: 'draft' });
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, post: null });

    useEffect(() => {
        if (snackbar.open) {
            const timer = setTimeout(() => setSnackbar(s => ({ ...s, open: false })), 4000);
            return () => clearTimeout(timer);
        }
    }, [snackbar.open]);

    const resetForm = () => setFormData({ title: '', summary: '', content: '', image: '', category: 'أخبار', author: '', featured: false, status: 'draft' });

    const handleAdd = () => {
        setSelectedPost(null);
        resetForm();
        setIsModalOpen(true);
    };

    const handleEdit = useCallback((post) => {
        setSelectedPost(post);
        setFormData({
            title: post.title || '',
            summary: post.summary || '',
            content: post.content || '',
            image: post.image || '',
            category: post.category || 'أخبار',
            author: post.author || '',
            featured: post.featured || false,
            status: post.status || 'draft',
        });
        setIsModalOpen(true);
    }, []);

    const handleDelete = useCallback((post) => {
        setDeleteConfirm({ open: true, post });
    }, []);

    const confirmDelete = () => {
        const { post } = deleteConfirm;
        if (!post) return;
        dispatch({ type: 'DELETE_BLOG_POST', payload: post.id });
        setSnackbar({ open: true, msg: `تم حذف "${post.title}" بنجاح`, severity: 'success' });
        setDeleteConfirm({ open: false, post: null });
    };

    const handleSubmit = () => {
        if (!formData.title.trim()) {
            setSnackbar({ open: true, msg: 'يرجى إدخال عنوان الخبر', severity: 'error' });
            return;
        }

        if (selectedPost) {
            dispatch({ type: 'UPDATE_BLOG_POST', payload: { ...selectedPost, ...formData } });
            setSnackbar({ open: true, msg: `تم تحديث "${formData.title}" بنجاح`, severity: 'success' });
        } else {
            dispatch({
                type: 'ADD_BLOG_POST',
                payload: {
                    id: Date.now(),
                    ...formData,
                    publishedAt: formData.status === 'published' ? new Date().toISOString() : null,
                }
            });
            setSnackbar({ open: true, msg: `تم إضافة "${formData.title}"`, severity: 'success' });
        }
        setIsModalOpen(false);
        resetForm();
    };

    const toggleStatus = (post) => {
        const newStatus = post.status === 'published' ? 'draft' : 'published';
        dispatch({ type: 'UPDATE_BLOG_POST', payload: { ...post, status: newStatus, publishedAt: newStatus === 'published' ? new Date().toISOString() : post.publishedAt } });
        setSnackbar({ open: true, msg: newStatus === 'published' ? 'تم النشر' : 'تم الحفظ كمسودة', severity: 'info' });
    };

    const columns = [
        { key: 'title', label: 'العنوان', render: (val, row) => (
            <div>
                <p className="text-sm font-medium">{val}</p>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">{row.summary?.slice(0, 60)}</span>
            </div>
        )},
        { key: 'category', label: 'التصنيف', render: (val) => <AdminStatusChip status={val} /> },
        { key: 'status', label: 'الحالة', render: (val) => (
            <AdminStatusChip status={val === 'published' ? 'active' : 'inactive'} label={val === 'published' ? 'منشور' : 'مسودة'} />
        )},
        { key: 'publishedAt', label: 'التاريخ', render: (val) => val ? formatDate(val) : '-' },
    ];

    const actions = [
        { icon: 'fa-solid fa-pen-to-square', tooltip: 'تعديل', onClick: (row) => handleEdit(row), color: 'primary' },
        { icon: 'fa-solid fa-globe', tooltip: 'نشر / إخفاء', onClick: (row) => toggleStatus(row) },
        { icon: 'fa-solid fa-trash', tooltip: 'حذف', onClick: (row) => handleDelete(row), color: 'error' },
    ];

    return (
        <div className="flex flex-col gap-3">
            <AdminPageHeader
                title="إدارة الأخبار والمدونة"
                subtitle="أضف وتابع أخبار الجمعية والتقارير وقصص النجاح"
                action={{ label: 'إضافة خبر', icon: 'fa-solid fa-plus', onClick: handleAdd }}
            />

            <AdminDataTable columns={columns} data={posts} actions={actions} />

            <AdminFormDialog
                open={isModalOpen}
                onClose={() => { setIsModalOpen(false); resetForm(); }}
                onSubmit={handleSubmit}
                title={selectedPost ? 'تعديل الخبر' : 'إضافة خبر جديد'}
                submitLabel={selectedPost ? 'حفظ التغييرات' : 'إضافة'}
                maxWidth="md"
            >
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">العنوان</label>
                    <input autoFocus className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">ملخص قصير</label>
                    <textarea rows={2} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.summary} onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">المحتوى</label>
                    <textarea rows={6} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.content} onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">صورة (رابط URL)</label>
                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={formData.image} onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))} placeholder="https://example.com/image.jpg" />
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-1.5 min-w-[150px]">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">التصنيف</label>
                        <select className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}>
                            {CATEGORIES.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">الكاتب</label>
                        <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={formData.author} onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))} />
                    </div>
                </div>
                <div className="flex gap-3">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <span className="relative inline-block w-10 h-5">
                            <input type="checkbox" className="sr-only peer" checked={formData.featured} onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))} />
                            <span className="absolute inset-0 bg-neutral-300 dark:bg-neutral-600 rounded-full peer-checked:bg-primary-500 transition-colors"></span>
                            <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></span>
                        </span>
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">خبر مميز</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <span className="relative inline-block w-10 h-5">
                            <input type="checkbox" className="sr-only peer" checked={formData.status === 'published'} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked ? 'published' : 'draft' }))} />
                            <span className="absolute inset-0 bg-neutral-300 dark:bg-neutral-600 rounded-full peer-checked:bg-primary-500 transition-colors"></span>
                            <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></span>
                        </span>
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">نشر مباشرة</span>
                    </label>
                </div>
            </AdminFormDialog>

            {deleteConfirm.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setDeleteConfirm({ open: false, post: null })}></div>
                    <div className="relative bg-white dark:bg-neutral-800 rounded-xl shadow-modal max-w-lg w-full mx-4">
                        <h2 className="text-lg font-bold p-4 border-b border-neutral-200 dark:border-neutral-700">تأكيد الحذف</h2>
                        <div className="p-4">
                            <p className="text-neutral-600 dark:text-neutral-400">هل أنت متأكد من حذف "{deleteConfirm.post?.title}"؟</p>
                        </div>
                        <div className="flex justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-700">
                            <button className="px-4 py-2 rounded-md font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors" onClick={() => setDeleteConfirm({ open: false, post: null })}>إلغاء</button>
                            <button className="bg-error-500 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-error-600 transition-colors" onClick={confirmDelete}>حذف نهائياً</button>
                        </div>
                    </div>
                </div>
            )}

            {snackbar.open && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
                    <div className={`px-4 py-3 rounded-lg text-sm shadow-lg ${
                        snackbar.severity === 'success' ? 'bg-success-500 text-white' :
                        snackbar.severity === 'error' ? 'bg-error-500 text-white' :
                        snackbar.severity === 'warning' || snackbar.severity === 'info' ? 'bg-warning-500 text-white' :
                        'bg-primary-500 text-white'
                    }`}>
                        {snackbar.msg}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminBlog;
