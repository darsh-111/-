import { useState, useCallback } from 'react';
import { TextField, Box, Typography, useTheme, alpha, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Switch, FormControlLabel, Select, MenuItem } from '@mui/material';
import { AdminPageHeader, AdminDataTable, AdminFormDialog, AdminStatusChip } from '../../components/admin';
import { t, formatDate } from '../../i18n';
import { useAdminData, adminActions } from '../../contexts/AdminDataContext';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['أخبار', 'تقارير', 'قصص نجاح', 'فعاليات', 'مقالات'];

function AdminBlog() {
    const theme = useTheme();
    const { state, dispatch } = useAdminData();
    const posts = state.blogPosts || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, msg: '', severity: 'success' });
    const [formData, setFormData] = useState({ title: '', summary: '', content: '', image: '', category: 'أخبار', author: '', featured: false, status: 'draft' });
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, post: null });

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
            <Box>
                <Typography variant="body2" fontWeight="medium">{val}</Typography>
                <Typography variant="caption" color="text.secondary">{row.summary?.slice(0, 60)}</Typography>
            </Box>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                <TextField autoFocus label="العنوان" fullWidth required value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} />
                <TextField label="ملخص قصير" fullWidth multiline rows={2} value={formData.summary} onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))} />
                <TextField label="المحتوى" fullWidth multiline rows={6} value={formData.content} onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} />
                <TextField label="صورة (رابط URL)" fullWidth value={formData.image} onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))} placeholder="https://example.com/image.jpg" />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField select label="التصنيف" value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} sx={{ minWidth: 150 }}>
                        {CATEGORIES.map(cat => (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))}
                    </TextField>
                    <TextField label="الكاتب" value={formData.author} onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))} fullWidth />
                </Box>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <FormControlLabel control={<Switch checked={formData.featured} onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))} />} label="خبر مميز" />
                    <FormControlLabel control={<Switch checked={formData.status === 'published'} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked ? 'published' : 'draft' }))} />} label="نشر مباشرة" />
                </Box>
            </AdminFormDialog>

            <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, post: null })}>
                <DialogTitle>تأكيد الحذف</DialogTitle>
                <DialogContent>
                    <DialogContentText>هل أنت متأكد من حذف "{deleteConfirm.post?.title}"؟</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setDeleteConfirm({ open: false, post: null })} color="inherit">إلغاء</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">حذف نهائياً</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={snackbar.severity} variant="filled">{snackbar.msg}</Alert>
            </Snackbar>
        </Box>
    );
}

export default AdminBlog;
