import { useInjectStyles } from '../../utils/injectStyles';

/**
 * Loading Spinner Component
 * Displays a centered loading spinner with optional text
 */
function Loading({ text = 'جاري التحميل...', fullScreen = false }) {
    useInjectStyles('@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}', 'loading-keyframes');
    return (
        <div className={`flex flex-col items-center justify-center p-8 gap-4 min-h-[200px] w-full ${fullScreen ? 'fixed inset-0 z-[400] bg-[var(--color-bg-primary)]' : ''}`}>
            <div className="w-12 h-12 border-4 border-primary-100 dark:border-primary-900 border-t-primary-500 rounded-full animate-[spin_1s_linear_infinite]"></div>
            {text && <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium animate-[pulse_2s_infinite]">{text}</p>}
        </div>
    );
}

export default Loading;
