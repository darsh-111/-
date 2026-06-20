import LoginErrorAlert from './LoginErrorAlert';
import { useInjectStyles } from '../../utils/injectStyles';

const forgotStyles = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes bounceIn {
        0% { transform: scale(0); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
    }
`;

const inputClasses = "w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-transparent text-inherit focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all";

function ForgotPasswordForm({ forgotEmail, setForgotEmail, loading, error, successMsg, onSubmit, onBack }) {
    useInjectStyles(forgotStyles, 'forgot-form-styles');

    return (
        <div style={{ animation: 'slideIn 0.4s ease' }}>
            <div className="text-center mb-4">
                <div className="text-[52px] text-primary-500 mb-2" style={{ animation: 'bounceIn 0.5s ease' }}>
                    <i className="fa-solid fa-key" />
                </div>
                <h5 className="text-lg font-bold mb-1">استعادة كلمة المرور</h5>
                <p className="text-neutral-500 dark:text-neutral-400">أدخل بريدك الإلكتروني وسنرسل لك رمزاً لإعادة تعيين كلمة المرور</p>
            </div>

            <LoginErrorAlert type="error" message={error} />
            <LoginErrorAlert type="success" message={successMsg} />

            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <i className="fa-solid fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm z-[1]"></i>
                        <input
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="البريد الإلكتروني"
                            autoFocus
                            required
                            className={inputClasses + " pr-10"}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !forgotEmail}
                        className="w-full bg-primary-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
                    >
                        {loading ? (
                            <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                        ) : 'إرسال الرمز'}
                    </button>
                </div>
            </form>

            <button
                onClick={onBack}
                className="mt-3 w-full text-neutral-500 dark:text-neutral-400 font-semibold text-sm bg-transparent border-none cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300"
            >
                العودة لتسجيل الدخول
            </button>
        </div>
    );
}

export default ForgotPasswordForm;
