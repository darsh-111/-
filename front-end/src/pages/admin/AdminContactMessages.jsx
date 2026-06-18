import { useState, useCallback } from 'react';
import { Box, Typography, Card, CardContent, Chip, Stack, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button, useTheme, alpha } from '@mui/material';
import { AdminPageHeader, AdminDataTable, AdminStatusChip } from '../../components/admin';
import { formatDate } from '../../i18n';
import { useAdminData } from '../../contexts/AdminDataContext';

const STATUS_OPTIONS = ['جديد', 'قيد المعالجة', 'تم الرد'];

function AdminContactMessages() {
    const theme = useTheme();
    const { state, dispatch } = useAdminData();
    const messages = state.contactMessages || [];

    const [snackbar, setSnackbar] = useState({ open: false, msg: '', severity: 'success' });

    const updateStatus = (msg, newStatus) => {
        dispatch({ type: 'UPDATE_CONTACT_MESSAGE', payload: { ...msg, status: newStatus } });
        setSnackbar({ open: true, msg: `تم تحديث الحالة إلى "${newStatus}"`, severity: 'success' });
    };

    const columns = [
        { key: 'name', label: 'الاسم', render: (val, row) => (
            <Box>
                <Typography variant="body2" fontWeight="medium">{val}</Typography>
                <Typography variant="caption" color="text.secondary">{row.email}{row.phone ? ` — ${row.phone}` : ''}</Typography>
            </Box>
        )},
        { key: 'subject', label: 'الموضوع' },
        { key: 'message', label: 'الرسالة', render: (val) => (
            <Typography variant="body2" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</Typography>
        )},
        { key: 'createdAt', label: 'التاريخ', render: (val) => val ? formatDate(val) : '-' },
        { key: 'status', label: 'الحالة', render: (val) => {
            const colors = { 'جديد': 'error', 'قيد المعالجة': 'warning', 'تم الرد': 'success' };
            return <Chip label={val || 'جديد'} size="small" color={colors[val] || 'default'} />;
        }},
    ];

    const actions = [
        { icon: 'fa-solid fa-check', tooltip: 'تم الرد', onClick: (row) => updateStatus(row, 'تم الرد') },
        { icon: 'fa-solid fa-spinner', tooltip: 'قيد المعالجة', onClick: (row) => updateStatus(row, 'قيد المعالجة') },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <AdminPageHeader title="رسائل التواصل" subtitle="إدارة رسائل الزوار من صفحة اتصل بنا" />

            {messages.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                    <i className="fa-regular fa-message" style={{ fontSize: 48, opacity: 0.3 }} />
                    <Typography sx={{ mt: 2 }}>لا توجد رسائل بعد</Typography>
                </Box>
            ) : (
                <AdminDataTable columns={columns} data={messages} actions={actions} />
            )}

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={snackbar.severity} variant="filled">{snackbar.msg}</Alert>
            </Snackbar>
        </Box>
    );
}

export default AdminContactMessages;
