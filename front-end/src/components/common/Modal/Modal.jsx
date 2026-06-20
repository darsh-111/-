import { useEffect, useCallback } from 'react';
import { useInjectStyles } from '../../../utils/injectStyles';

/**
 * Modal Component - Dialog overlay
 */
function Modal({
    isOpen,
    onClose,
    title,
    size = 'md',
    closeOnOverlay = true,
    showCloseButton = true,
    children,
    footer,
    className = '',
}) {
    useInjectStyles(`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`, 'modal-keyframes');
    // Handle escape key
    const handleEscape = useCallback((e) => {
        if (e.key === 'Escape' && isOpen) {
            onClose?.();
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [handleEscape]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlay) {
            onClose?.();
        }
    };

    const sizeClasses = {
        sm: 'max-w-[400px]',
        md: 'max-w-[560px]',
        lg: 'max-w-[720px]',
        xl: 'max-w-[900px]',
        full: 'max-w-[calc(100vw-2rem)]',
    };
    const classNames = [
        'bg-white dark:bg-neutral-800 rounded-xl shadow-modal max-h-[calc(100vh-2rem)] flex flex-col animate-[slideUp_200ms_ease] w-full',
        sizeClasses[size] || sizeClasses.md,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[300]" onClick={handleOverlayClick}>
            <div
                className={classNames}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
            >
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-700">
                        {title && <h2 id="modal-title" className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 m-0">{title}</h2>}
                        {showCloseButton && (
                            <button
                                className="flex items-center justify-center w-9 h-9 border-none bg-transparent rounded-md cursor-pointer text-neutral-500 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                onClick={onClose}
                                aria-label="إغلاق"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                <div className="p-6 overflow-y-auto flex-1">
                    {children}
                </div>

                {footer && (
                    <div className="flex gap-3 justify-start px-6 py-4 border-t border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 rounded-b-xl ltr:justify-end">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;
