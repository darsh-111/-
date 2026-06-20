import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { AdminDataProvider, useAdminData } from '../contexts/AdminDataContext';
import { ToastProvider } from '../components/common';

export default function AppProviders({ children }) {
    return (
        <AuthProvider>
            <NotificationProvider>
                <ThemeProvider>
                    <AdminDataProvider>
                        <ToastProvider>
                            {children}
                        </ToastProvider>
                    </AdminDataProvider>
                </ThemeProvider>
            </NotificationProvider>
        </AuthProvider>
    );
}
