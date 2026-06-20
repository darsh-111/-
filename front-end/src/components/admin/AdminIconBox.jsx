const PALETTE_TAILWIND = {
  primary: 'bg-primary-50 dark:bg-primary-500/20 text-primary-600 dark:text-primary-300',
  secondary: 'bg-secondary-50 dark:bg-secondary-500/20 text-secondary-600 dark:text-secondary-300',
  success: 'bg-success-50 dark:bg-success-500/20 text-success-600 dark:text-success-300',
  warning: 'bg-warning-50 dark:bg-warning-500/20 text-warning-600 dark:text-warning-300',
  error: 'bg-error-50 dark:bg-error-500/20 text-error-600 dark:text-error-300',
  info: 'bg-accent-50 dark:bg-accent-500/20 text-accent-600 dark:text-accent-300',
};

function AdminIconBox({ icon, color = 'primary', size = 40, fontSize = 20, round = false }) {
  const twClasses = PALETTE_TAILWIND[color];

  if (twClasses) {
    return (
      <div
        className={`flex items-center justify-center flex-shrink-0 ${twClasses} ${round ? 'rounded-full' : 'rounded'}`}
        style={{ width: size, height: size, fontSize }}
      >
        <i className={icon} />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 ${round ? 'rounded-full' : 'rounded'}`}
      style={{
        width: size,
        height: size,
        fontSize,
        backgroundColor: `${color}1A`,
        color,
      }}
    >
      <i className={icon} />
    </div>
  );
}

export default AdminIconBox;
