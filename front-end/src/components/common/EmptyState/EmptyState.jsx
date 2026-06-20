/**
 * EmptyState Component - Display when no data available
 */
function EmptyState({
    icon,
    title,
    description,
    action,
    actionLabel,
    onAction,
    size = 'md',
    className = '',
}) {
    const containerClasses = [
        'flex flex-col items-center justify-center text-center',
        size === 'sm' ? 'p-4' : 'p-8',
        className
    ].filter(Boolean).join(' ');

    const iconSize = { sm: 'w-12 h-12', md: 'w-20 h-20', lg: 'w-[120px] h-[120px]' }[size];
    const emojiSize = { sm: 'text-[28px]', md: 'text-[48px]', lg: 'text-[64px]' }[size];
    const titleSize = size === 'sm' ? 'text-base' : 'text-lg';

    return (
        <div className={containerClasses}>
            {icon && (
                <div className={`flex items-center justify-center mb-4 bg-neutral-100 dark:bg-neutral-700 rounded-full text-neutral-400 ${iconSize}`}>
                    {typeof icon === 'string' ? (
                        <span className={emojiSize}>{icon}</span>
                    ) : icon}
                </div>
            )}

            {title && <h3 className={`${titleSize} font-semibold text-neutral-800 dark:text-neutral-200 mb-2`}>{title}</h3>}

            {description && (
                <p className="text-base text-neutral-500 max-w-[320px] mb-4 leading-relaxed">{description}</p>
            )}

            {(action || (actionLabel && onAction)) && (
                <div className="mt-2">
                    {action || (
                        <button onClick={onAction} className="px-5 py-2 border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900 font-semibold transition-colors">
                            {actionLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default EmptyState;
