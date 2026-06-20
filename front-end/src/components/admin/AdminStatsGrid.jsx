import { Link } from 'react-router-dom';

const CHANGE_CHIP_CLASSES = {
  success: 'bg-success-50 text-success-600 dark:bg-success-100/10 dark:text-success-500',
  error: 'bg-error-50 text-error-600 dark:bg-error-100/10 dark:text-error-500',
};

const STAT_ICON_BG = {
  primary: 'bg-primary-50 dark:bg-primary-500/20 text-primary-600 dark:text-primary-300',
  secondary: 'bg-secondary-50 dark:bg-secondary-500/20 text-secondary-600 dark:text-secondary-300',
  success: 'bg-success-50 dark:bg-success-500/20 text-success-600 dark:text-success-300',
  warning: 'bg-warning-50 dark:bg-warning-500/20 text-warning-600 dark:text-warning-300',
  error: 'bg-error-50 dark:bg-error-500/20 text-error-600 dark:text-error-300',
};

function AdminStatsGrid({ stats, columns }) {
  const mdCols = columns || Math.min(12 / stats.length, 4);

  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      {stats.map((stat, index) => {
        const color = stat.color || 'primary';
        const Wrapper = stat.link ? Link : 'div';

        const mdSpan = { 1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4', 6: 'md:col-span-6', 12: 'md:col-span-12' }[mdCols] || 'md:col-span-4';
        return (
          <div key={index} className={`col-span-full sm:col-span-6 ${mdSpan}`}>
            <div
              className={`border h-full transition-all duration-200 hover:-translate-y-0.5 rounded-lg overflow-hidden ${
                stat.gradient
                  ? 'border-transparent shadow-card text-white'
                  : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-card hover:border-secondary-300 dark:hover:border-secondary-600/30'
              }`}
              style={stat.gradient ? {
                background: `linear-gradient(135deg, ${color === 'primary' ? 'var(--color-primary-500)' : 'var(--color-secondary-500)'}, ${color === 'primary' ? 'var(--color-primary-700)' : 'var(--color-secondary-700)'})`,
                boxShadow: `0 4px 16px ${color === 'primary' ? 'var(--color-primary-500)' : 'var(--color-secondary-500)'}33`,
              } : undefined}
            >
              <Wrapper
                to={stat.link}
                className={`block h-full p-5 flex flex-col items-start justify-start ${stat.gradient ? 'text-white' : ''}`}
              >
                <div className="flex justify-between items-start w-full gap-2 mb-3">
                  <div
                    className={`w-11 h-11 rounded flex items-center justify-center text-xl ${
                      stat.gradient
                        ? 'bg-white/20 text-inherit'
                        : STAT_ICON_BG[color] || 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {stat.icon && <i className={stat.icon} />}
                  </div>
                  {stat.change && (
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${CHANGE_CHIP_CLASSES[stat.trend === 'down' ? 'error' : 'success']}`}>
                      {stat.change}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-[1.8rem] leading-tight mb-1 text-inherit">{stat.value}</h4>
                <p className={`text-sm font-medium ${stat.gradient ? 'text-white/85' : 'text-neutral-500 dark:text-neutral-400'}`}>
                  {stat.label}
                </p>
              </Wrapper>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminStatsGrid;
