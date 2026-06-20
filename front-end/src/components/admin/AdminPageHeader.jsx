function AdminPageHeader({ title, subtitle, action, secondaryAction, children }) {
  return (
    <div className="flex justify-between items-start flex-wrap gap-6 mb-6">
      <div>
        <h1 className="font-bold text-[1.75rem] leading-tight mb-1 text-neutral-900 dark:text-neutral-100">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex gap-1.5 items-center flex-shrink-0">
        {children}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 px-5 py-2 rounded-md font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-sm"
          >
            {secondaryAction.icon && <i className={`${secondaryAction.icon} ml-1.5`} />}
            {secondaryAction.label}
          </button>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="bg-secondary-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-secondary-600 transition-colors text-sm"
          >
            {action.icon && <i className={`${action.icon} ml-1.5`} />}
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminPageHeader;
