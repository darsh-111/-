function AdminFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'بحث...',
  tabs,
  activeTab,
  onTabChange,
  children
}) {
  if (tabs && !onSearchChange && !children) {
    return (
      <div className="border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={(e) => onTabChange?.(e, tab.value)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.value
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              {tab.icon && <i className={`${tab.icon} ml-1.5`} />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (tabs && onSearchChange) {
    return (
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-0 overflow-x-auto border-b border-neutral-200 dark:border-neutral-700">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={(e) => onTabChange?.(e, tab.value)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.value
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative w-[300px] max-w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm pointer-events-none" />
          <input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 pl-9 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none text-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-800 shadow-card">
      <div className="flex gap-4 flex-wrap">
        {onSearchChange && (
          <div className="relative flex-1 min-w-[200px]">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm pointer-events-none" />
            <input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pr-10 pl-9 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none text-sm"
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default AdminFilterBar;
