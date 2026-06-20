import { t } from '../../../i18n';

/**
 * StatusChip Component - Display status badges
 */
const COLOR_CLASSES = {
    neutral: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300',
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
    success: 'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-300',
    warning: 'bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-300',
    error: 'bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-300',
};

const SIZE_CLASSES = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-0.5 text-sm',
    lg: 'px-4 py-1 text-base',
};

const STATUS_CONFIG = {
    draft: { color: 'neutral', icon: '📝' },
    active: { color: 'success', icon: '✓' },
    pending: { color: 'warning', icon: '⏳' },
    approved: { color: 'success', icon: '✓' },
    rejected: { color: 'error', icon: '✕' },
    completed: { color: 'primary', icon: '★' },
    archived: { color: 'neutral', icon: '📁' },
    cancelled: { color: 'error', icon: '✕' },
};

function StatusChip({
    status,
    size = 'md',
    showIcon = true,
    className = '',
}) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
    const label = t(`status.${status}`) || status;

    const classNames = [
        'inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap',
        COLOR_CLASSES[config.color] || COLOR_CLASSES.neutral,
        SIZE_CLASSES[size] || SIZE_CLASSES.md,
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classNames}>
            {showIcon && <span>{config.icon}</span>}
            <span>{label}</span>
        </span>
    );
}

export default StatusChip;
