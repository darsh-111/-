import { getStatusColor, getStatusLabel } from '../../utils/admin.helpers';

const STATUS_CHIP_CLASSES = {
  success: 'bg-success-50 text-success-600 dark:bg-success-100/10 dark:text-success-500',
  warning: 'bg-warning-50 text-warning-600 dark:bg-warning-100/10 dark:text-warning-500',
  error: 'bg-error-50 text-error-600 dark:bg-error-100/10 dark:text-error-500',
  info: 'bg-primary-50 text-primary-600 dark:bg-primary-100/10 dark:text-primary-500',
  default: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300',
};

const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

function AdminDataTable({ columns, data, actions, rowKey = 'id', emptyMessage, header }) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      {header}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
              {columns.map((col, i) => (
                <th
                  key={col.key || i}
                  scope="col"
                  className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 ${alignMap[col.align] || ''}`}
                >
                  {col.label}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th scope="col" className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-center">
                  الإجراءات
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {emptyMessage || 'لا توجد بيانات'}
                  </p>
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row[rowKey]}
                  className="border-b border-neutral-200 dark:border-neutral-700 transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 last:border-b-0"
                >
                  {columns.map((col, i) => {
                    const value = col.key ? row[col.key] : null;
                    const Tag = i === 0 ? 'th' : 'td';
                    const tagProps = i === 0 ? { scope: 'row' } : {};
                    return (
                      <Tag
                        key={col.key || i}
                        {...tagProps}
                        className={`px-4 py-3.5 text-sm font-medium text-neutral-900 dark:text-neutral-100 ${alignMap[col.align] || ''}`}
                      >
                        {col.render ? col.render(value, row) : (
                          col.type === 'status' ? (
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${STATUS_CHIP_CLASSES[getStatusColor(value)] || STATUS_CHIP_CLASSES.default}`}>
                              {getStatusLabel(value)}
                            </span>
                          ) : value
                        )}
                      </Tag>
                    );
                  })}
                  {actions && actions.length > 0 && (
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex gap-0.5 justify-center">
                        {actions
                          .filter(a => !a.show || a.show(row))
                          .map((action, i) => (
                            <button
                              key={i}
                              title={action.tooltip || ''}
                              className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-colors text-neutral-400 hover:text-secondary-500 dark:hover:text-secondary-400"
                              onClick={() => action.onClick?.(row)}
                            >
                              <i className={action.icon} style={{ fontSize: action.iconSize || 16 }} />
                            </button>
                          ))
                        }
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDataTable;
