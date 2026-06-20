/**
 * Input Component
 * Text, number, phone, and textarea variants with validation states
 */
function Input({
    type = 'text',
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    hint,
    required = false,
    disabled = false,
    multiline = false,
    rows = 4,
    icon,
    prefix,
    suffix,
    className = '',
    ...props
}) {
    const inputId = `input-${name}`;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const hasError = !!error;

    const wrapperClasses = [
        'flex flex-col gap-2 w-full',
        className
    ].filter(Boolean).join(' ');

    const inputClasses = [
        'w-full px-4 py-3 font-inherit text-base text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-md transition-all placeholder-neutral-400 hover:border-neutral-400 focus:outline-none focus:border-primary-500 focus:ring-3 focus:ring-primary-500/10 disabled:bg-neutral-100 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-70',
        icon && 'ps-10',
        prefix && 'ps-16',
        suffix && 'pe-12',
        hasError && 'border-error-500 focus:ring-error-500/10',
        multiline && 'resize-y min-h-[100px]'
    ].filter(Boolean).join(' ');

    const InputElement = multiline ? 'textarea' : 'input';

    return (
        <div className={wrapperClasses}>
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {label}
                    {required && <span className="text-error-500 me-1" aria-hidden="true">*</span>}
                </label>
            )}

            <div className="relative flex items-center">
                {icon && <span className="absolute start-3 flex items-center text-neutral-400 pointer-events-none">{icon}</span>}
                {prefix && <span className="absolute flex items-center px-3 text-neutral-500 text-sm pointer-events-none start-0 border-e border-neutral-300 bg-neutral-50 dark:bg-neutral-700 h-full rounded-s-md">{prefix}</span>}

                <InputElement
                    id={inputId}
                    name={name}
                    type={!multiline ? type : undefined}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    rows={multiline ? rows : undefined}
                    className={inputClasses}
                    aria-invalid={hasError}
                    aria-describedby={[
                        error && errorId,
                        hint && hintId
                    ].filter(Boolean).join(' ') || undefined}
                    {...props}
                />

                {suffix && <span className="absolute flex items-center px-3 text-neutral-500 text-sm pointer-events-none end-0">{suffix}</span>}
            </div>

            {error && (
                <span id={errorId} className="text-sm text-error-500 flex items-center gap-1" role="alert">
                    {error}
                </span>
            )}

            {hint && !error && (
                <span id={hintId} className="text-sm text-neutral-500">
                    {hint}
                </span>
            )}
        </div>
    );
}

export default Input;
