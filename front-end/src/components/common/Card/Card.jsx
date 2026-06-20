/**
 * Card Component - Base card with variants for different use cases
 */
function Card({
    children,
    variant = 'default',
    padding = 'md',
    hoverable = false,
    onClick,
    className = '',
    ...props
}) {
    const Component = onClick ? 'button' : 'div';

    const paddingClasses = {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        none: 'p-0',
    };

    const variantClasses = {
        default: '',
        elevated: 'shadow-lg',
        outlined: 'shadow-none border-2 border-neutral-200 dark:border-neutral-600',
        filled: 'bg-neutral-50 dark:bg-neutral-800/50 border-none',
    };

    const baseClasses = 'bg-white dark:bg-neutral-800 rounded-lg shadow-card overflow-hidden transition-all border border-neutral-100 dark:border-neutral-700 group';

    const classNames = [
        baseClasses,
        paddingClasses[padding] || paddingClasses.md,
        variantClasses[variant] || '',
        hoverable && 'hover:shadow-lg hover:-translate-y-0.5',
        onClick && 'cursor-pointer w-full text-inherit font-inherit color-inherit focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2',
        className
    ].filter(Boolean).join(' ');

    return (
        <Component
            className={classNames}
            onClick={onClick}
            {...props}
        >
            {children}
        </Component>
    );
}

/**
 * Card Header
 */
Card.Header = function CardHeader({ children, className = '' }) {
    return (
        <div className={`px-4 py-4 border-b border-neutral-100 dark:border-neutral-700 ${className}`}>
            {children}
        </div>
    );
};

/**
 * Card Body
 */
Card.Body = function CardBody({ children, className = '' }) {
    return (
        <div className={`p-4 ${className}`}>
            {children}
        </div>
    );
};

/**
 * Card Footer
 */
Card.Footer = function CardFooter({ children, className = '' }) {
    return (
        <div className={`px-4 py-4 border-t border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 ${className}`}>
            {children}
        </div>
    );
};

/**
 * Card Image
 */
Card.Image = function CardImage({ src, alt, aspectRatio = '16/9', className = '' }) {
    return (
        <div
            className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-700 ${className}`}
            style={{ aspectRatio }}
        >
            <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
    );
};

export default Card;
