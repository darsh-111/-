import { useState } from 'react';

/**
 * Tabs Component - Tab navigation
 */
function Tabs({
    tabs = [],
    defaultTab,
    onChange,
    variant = 'default',
    fullWidth = false,
    className = '',
    children,
}) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        onChange?.(tabId);
    };

    const isPills = variant === 'pills';

    const listClasses = [
        'flex overflow-x-auto scrollbar-none',
        isPills
            ? 'border-b-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 gap-1'
            : 'gap-1 border-b-2 border-neutral-200 dark:border-neutral-700',
        fullWidth && 'gap-0'
    ].filter(Boolean).join(' ');

    return (
        <div className={`w-full ${className}`}>
            <div className={listClasses} role="tablist">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const tabClasses = [
                        'flex items-center justify-center gap-2 px-4 py-3 bg-transparent border-none font-inherit text-base font-medium transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed',
                        fullWidth && 'flex-1',
                        isPills ? 'rounded-md border-b-0 mb-0' : 'border-b-2 border-transparent -mb-0.5',
                        isActive
                            ? isPills
                                ? 'bg-white dark:bg-neutral-700 shadow-sm text-primary-500'
                                : 'text-primary-500 border-b-primary-500'
                            : isPills
                                ? 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-700'
                                : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    ].filter(Boolean).join(' ');

                    return (
                        <button
                            key={tab.id}
                            role="tab"
                            className={tabClasses}
                            aria-selected={isActive}
                            onClick={() => handleTabClick(tab.id)}
                            disabled={tab.disabled}
                        >
                            {tab.icon && <span className="flex items-center">{tab.icon}</span>}
                            <span className="tabs__tab-label">{tab.label}</span>
                            {tab.badge !== undefined && (
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-primary-500 text-white' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'}`}>
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="pt-4" role="tabpanel">
                {typeof children === 'function' ? children(activeTab) : children}
            </div>
        </div>
    );
}

export default Tabs;
