import { useInjectStyles } from '../../../utils/injectStyles';
import { formatCurrency } from '../../../i18n';

/**
 * ProgressBar Component - Shows funding/completion progress
 */
function ProgressBar({
    current = 0,
    goal = 100,
    showLabel = true,
    showAmount = true,
    size = 'md',
    color = 'primary',
    animated = true,
    className = '',
}) {
    const percentage = Math.min(Math.round((current / goal) * 100), 100);

    useInjectStyles(
        `@keyframes progress-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }`,
        'progress-shimmer'
    );

    const trackHeights = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-3.5',
    };

    const fillGradients = {
        primary: 'linear-gradient(90deg, var(--color-primary-400), var(--color-primary-500))',
        success: 'linear-gradient(90deg, var(--color-success-500), #22c55e)',
        accent: 'linear-gradient(90deg, var(--color-accent-400), var(--color-accent-500))',
    };

    const progressClasses = [
        'w-full',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={progressClasses}>
            {(showLabel || showAmount) && (
                <div className="flex justify-between items-center mb-2">
                    {showAmount && (
                        <span className="text-sm text-neutral-600">
                            <span className="font-semibold text-primary-500">{formatCurrency(current)}</span>
                            <span className="text-neutral-400"> / </span>
                            <span className="text-neutral-500">{formatCurrency(goal)}</span>
                        </span>
                    )}
                    {showLabel && (
                        <span className="text-sm font-semibold text-neutral-700">{percentage}%</span>
                    )}
                </div>
            )}

            <div
                className={`w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden ${trackHeights[size] || trackHeights.md}`}
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className={`h-full rounded-full transition-[width] duration-500 ease-out ${animated ? 'relative overflow-hidden' : ''}`}
                    style={{
                        width: `${percentage}%`,
                        background: fillGradients[color] || fillGradients.primary,
                    }}
                >
                    {animated && (
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[progress-shimmer_2s_infinite]" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;
