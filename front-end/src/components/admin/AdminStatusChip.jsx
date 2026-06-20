import { getStatusColor, getStatusLabel } from '../../utils/admin.helpers';

const STATUS_CHIP_CLASSES = {
  success: 'bg-success-50 text-success-600 dark:bg-success-100/10 dark:text-success-500',
  warning: 'bg-warning-50 text-warning-600 dark:bg-warning-100/10 dark:text-warning-500',
  error: 'bg-error-50 text-error-600 dark:bg-error-100/10 dark:text-error-500',
  info: 'bg-primary-50 text-primary-600 dark:bg-primary-100/10 dark:text-primary-500',
  default: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300',
};

function AdminStatusChip({ status, label, variant = 'soft', size = 'small' }) {
  const colorKey = getStatusColor(status);

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_CHIP_CLASSES[colorKey] || STATUS_CHIP_CLASSES.default}`}>
      {label || getStatusLabel(status)}
    </span>
  );
}

export default AdminStatusChip;
