import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useInjectStyles } from '../../../utils/injectStyles';

// Toast Context for global access
const ToastContext = createContext(null);

/**
 * Toast Provider - Wrap app to enable toasts
 */
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const toast = {
        info: (msg, duration) => addToast(msg, 'info', duration),
        success: (msg, duration) => addToast(msg, 'success', duration),
        warning: (msg, duration) => addToast(msg, 'warning', duration),
        error: (msg, duration) => addToast(msg, 'error', duration),
        remove: removeToast,
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

/**
 * Hook to use toast
 */
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}

/**
 * Toast Container - Renders all active toasts
 */
function ToastContainer({ toasts, onRemove }) {
    useInjectStyles('@keyframes toastSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}', 'toast-keyframes');
    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-[500] max-w-[90vw] w-[400px]" role="region" aria-label="الإشعارات">
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} onClose={() => onRemove(toast.id)} />
            ))}
        </div>
    );
}

/**
 * Individual Toast Component
 */
function Toast({ message, type, onClose }) {
    const borderColorMap = {
        info: 'border-r-primary-500',
        success: 'border-r-success-500',
        warning: 'border-r-warning-500',
        error: 'border-r-error-500',
    };
    const iconColorMap = {
        info: 'text-primary-500',
        success: 'text-success-500',
        warning: 'text-warning-500',
        error: 'text-error-500',
    };
    const icons = {
        info: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
            </svg>
        ),
        success: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
                <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        warning: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
            </svg>
        ),
        error: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
            </svg>
        ),
    };

    return (
        <div className={`flex items-center gap-3 px-4 py-3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg animate-[toastSlideIn_200ms_ease] border-r-4 ltr:border-r-0 ltr:border-l-4 ${borderColorMap[type]}`} role="alert">
            <span className={`flex-shrink-0 ${iconColorMap[type]}`}>{icons[type]}</span>
            <span className="flex-1 text-sm text-neutral-800 dark:text-neutral-200">{message}</span>
            <button className="flex-shrink-0 flex items-center justify-center w-7 h-7 border-none bg-transparent rounded cursor-pointer text-neutral-400 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-600 dark:hover:text-neutral-300" onClick={onClose} aria-label="إغلاق">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    );
}

export default Toast;
