import { useInjectStyles } from '../../../utils/injectStyles';

/**
 * Skeleton Component - Loading placeholder
 */
function Skeleton({
    variant = 'text',
    width,
    height,
    count = 1,
    className = '',
}) {
    useInjectStyles(
        `@keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }`,
        'skeleton-shimmer'
    );

    const variantClasses = {
        text: 'h-4 w-full',
        title: 'h-6 w-3/5',
        avatar: 'w-12 h-12 rounded-full shrink-0',
        image: 'w-full aspect-video rounded-lg',
        button: 'h-11 w-[120px] rounded-md',
        circle: 'rounded-full',
    };

    const baseClass = 'bg-[linear-gradient(90deg,var(--color-neutral-200)_25%,var(--color-neutral-100)_50%,var(--color-neutral-200)_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-sm';

    const classNames = [
        baseClass,
        variantClasses[variant] || '',
        className
    ].filter(Boolean).join(' ');

    const style = {
        width: width,
        height: height,
    };

    if (count > 1) {
        return (
            <div className="flex flex-col gap-2">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className={classNames} style={style} />
                ))}
            </div>
        );
    }

    return <div className={classNames} style={style} />;
}

/**
 * Pre-built skeleton patterns
 */
Skeleton.Card = function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
            <Skeleton variant="image" />
            <div className="p-4 flex flex-col gap-3">
                <Skeleton variant="title" />
                <Skeleton variant="text" count={2} />
                <Skeleton variant="button" />
            </div>
        </div>
    );
};

Skeleton.List = function SkeletonList({ count = 5 }) {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                    <Skeleton variant="avatar" />
                    <div className="flex-1 flex flex-col gap-2">
                        <Skeleton variant="title" width="60%" />
                        <Skeleton variant="text" width="80%" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Skeleton;
