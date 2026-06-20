function DonateStepIndicator({ steps, step }) {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((label, i) => (
                <div key={i} className="flex items-center">
                    <div className={`flex items-center gap-2 ${i <= step ? 'text-primary-500' : 'text-neutral-400 dark:text-neutral-500'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                            i < step
                                ? 'bg-primary-500 border-primary-500 text-white'
                                : i === step
                                    ? 'border-primary-500 text-primary-500'
                                    : 'border-neutral-300 dark:border-neutral-600 text-neutral-400 dark:text-neutral-500'
                        }`}>
                            {i < step ? <i className="fa-solid fa-check"></i> : i + 1}
                        </div>
                        <span className={`text-sm font-medium hidden sm:inline ${i === step ? 'text-primary-500' : ''}`}>{label}</span>
                    </div>
                    {i < steps.length - 1 && (
                        <div className={`w-12 h-px mx-2 ${i < step ? 'bg-primary-500' : 'bg-neutral-200 dark:bg-neutral-700'}`} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default DonateStepIndicator;
