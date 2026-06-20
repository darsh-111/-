import LoginErrorAlert from './LoginErrorAlert';
import { useInjectStyles } from '../../utils/injectStyles';

const resetStyles = `
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

function ResetPasswordForm({ resetToken, setResetToken, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword, loading, error, successMsg, onSubmit, onBack }) {
    useInjectStyles(resetStyles, 'reset-form-styles');

    return (
        <div style={{ animation: 'slideIn 0.4s ease' }}>
            <div className="text-center mb-4">
                <div className="text-[52px] text-primary-500 mb-2" style={{ animation: 'bounceIn 0.5s ease' }}>
                    <i className="fa-solid fa-lock-open" />
                </div>
                <h5 className="text-lg font-bold mb-1">كلمة مرور جديدة</h5>
                <p className="text-neutral-500 dark:text-neutral-400">أدخل الرمز المرسل إلى بريدك الإلكتروني وكلمة المرور الجديدة</p>
            </div>

            <LoginErrorAlert type="error" message={error} />
            <LoginErrorAlert type="success" message={successMsg} />

            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-2.5">
                    <div className="relative">
                        <i className="fa-solid fa-hashtag absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm z-[1]"></i>
                        <input
                            type="text"
                            value={resetToken}
                            onChange={(e) => setResetToken(e.target.value)}
                            placeholder="الرمز المكون من الأحرف والأرقام"
                            required
                            className={inputClasses + " pr-10"}
                        />
                    </div>
                    <div className="relative">
                        <i className="fa-solid fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm z-[1]"></i>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="٨ أحرف على الأقل، حرف كبير، رقم، ورمز"
                            required
                            className={inputClasses + " pr-10"}
                        />
                    </div>
                    <div className="relative">
                        <i className="fa-solid fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm z-[1]"></i>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            placeholder="تأكيد كلمة المرور"
                            required
                            className={`${inputClasses} pr-10 ${confirmNewPassword.length > 0 && newPassword !== confirmNewPassword ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                        />
                        {confirmNewPassword.length > 0 && newPassword !== confirmNewPassword && (
                            <p className="text-error-500 text-xs mt-1">كلمتا المرور غير متطابقتين</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !resetToken || !newPassword || !confirmNewPassword}
                        className="w-full bg-primary-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
                    >
                        {loading ? (
                            <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                        ) : 'حفظ كلمة المرور'}
                    </button>
                </div>
            </form>

            <button
                onClick={onBack}
                className="mt-3 w-full text-neutral-500 dark:text-neutral-400 font-semibold text-sm bg-transparent border-none cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300"
            >
                إلغاء
            </button>
        </div>
    );
}

export default ResetPasswordForm;
