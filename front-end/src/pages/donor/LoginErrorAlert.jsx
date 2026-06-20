import { useInjectStyles } from '../../utils/injectStyles';

const alertStyles = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;

function LoginErrorAlert({ type, message }) {
    useInjectStyles(alertStyles, 'login-error-alert-styles');

    if (!message) return null;

    const isError = type === 'error';
    const bg = isError ? 'bg-error-50 dark:bg-error-900/20' : 'bg-success-50 dark:bg-success-900/20';
    const text = isError ? 'text-error-700 dark:text-error-300' : 'text-success-700 dark:text-success-300';
    const border = isError ? 'border-error-200 dark:border-error-800' : 'border-success-200 dark:border-success-800';
    const icon = isError ? 'fa-circle-exclamation' : 'fa-check-circle';

    return (
        <div className={`p-3 rounded-lg text-sm ${bg} ${text} border ${border} mb-2 whitespace-pre-line`} style={{ animation: 'slideIn 0.3s ease' }}>
            <i className={`fa-solid ${icon} ml-1`}></i>
            {message}
        </div>
    );
}

export default LoginErrorAlert;
