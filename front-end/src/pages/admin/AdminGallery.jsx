import { useState, useCallback } from 'react';
import { TextField, Box, Typography, Grid, Card, CardMedia, CardContent, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <AdminPageHeader title="معرض الصور" subtitle="إدارة صور وفيديوهات الأنشطة والفعاليات" action={{ label: 'إضافة صورة', icon: 'fa-solid fa-plus', onClick: handleAdd }} />

            {images.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                    <i className="fa-regular fa-images" style={{ fontSize: 48, opacity: 0.3 }} />
                    <Typography sx={{ mt: 2 }}>لا توجد صور بعد</Typography>
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {images.map((img) => (
                        <Grid item xs={6} sm={4} md={3} key={img.id}>
                            <Card sx={{ position: 'relative', borderRadius: 2, '&:hover .actions': { opacity: 1 } }}>
                                <CardMedia component="img" height="180" image={img.image} alt={img.title} sx={{ objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Error'; }}
                                />
                                <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                                    <Typography variant="body2" fontWeight="bold" noWrap>{img.title}</Typography>
                                </CardContent>
                                <Box className="actions" sx={{ position: 'absolute', top: 4, right: 4, opacity: 0, transition: 'opacity 0.2s' }}>
                                    <IconButton size="small" color="error" sx={{ bgcolor: 'rgba(0,0,0,0.5)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }} onClick={() => handleDelete(img)}>
                                        <i className="fa-solid fa-trash" style={{ fontSize: 12, color: '#fff' }} />
                                    </IconButton>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <AdminFormDialog open={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} onSubmit={handleSubmit} title={selectedImage ? 'تعديل الصورة' : 'إضافة صورة جديدة'} submitLabel={selectedImage ? 'حفظ' : 'إضافة'}>
                <TextField autoFocus label="العنوان" fullWidth required value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} />
                <TextField label="الوصف" fullWidth multiline rows={2} value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} />
                <TextField label="رابط الصورة" fullWidth required value={formData.image} onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))} placeholder="https://example.com/photo.jpg" />
                {formData.image && <Box component="img" src={formData.image} sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 1, mt: 1 }} onError={(e) => { e.target.style.display = 'none'; }} />}
            </AdminFormDialog>

            <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, item: null })}>
                <DialogTitle>تأكيد الحذف</DialogTitle>
                <DialogContent><DialogContentText>هل أنت متأكد من حذف "{deleteConfirm.item?.title}"؟</DialogContentText></DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setDeleteConfirm({ open: false, item: null })} color="inherit">إلغاء</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">حذف</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={snackbar.severity} variant="filled">{snackbar.msg}</Alert>
            </Snackbar>
        </Box>
    );
}

export default AdminGallery;
