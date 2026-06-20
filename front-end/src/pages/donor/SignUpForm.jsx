import LoginErrorAlert from './LoginErrorAlert';
import { useInjectStyles } from '../../utils/injectStyles';

const signUpStyles = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;

const inputClasses = "w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-transparent text-inherit focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all";

function SignUpForm({ signUpName, setSignUpName, signUpEmail, setSignUpEmail, signUpPassword, setSignUpPassword, signUpConfirmPassword, setSignUpConfirmPassword, showSignUpPassword, setShowSignUpPassword, loading, onSubmit, error }) {
    useInjectStyles(signUpStyles, 'signup-form-styles');

    return (
        <form onSubmit={onSubmit} style={{ animation: 'slideIn 0.3s ease' }}>
            <div className="flex flex-col" style={{ gap: '2.2rem' }}>
                <LoginErrorAlert type="error" message={error} />
                <div className="relative">
                    <i className="fa-solid fa-user absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm z-[1]"></i>
                    <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="الاسم الكامل"
                        autoFocus
                        required
                        className={inputClasses + " pr-10"}
                    />
                </div>
                <div className="relative">
                    <i className="fa-solid fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm z-[1]"></i>
                    <input
                        type="email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="البريد الإلكتروني"
                        required
                        className={inputClasses + " pr-10"}
                    />
                </div>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 z-[1]"
                    >
                        <i className={`fa-solid ${showSignUpPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ fontSize: '0.85rem' }} />
                    </button>
                    <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm z-[1]"></i>
                    <input
                        type={showSignUpPassword ? 'text' : 'password'}
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="كلمة المرور"
                        required
                        className={inputClasses + " pr-10 pl-10"}
                    />
                </div>
                <div className="relative">
                    <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm z-[1]"></i>
                    <input
                        type={showSignUpPassword ? 'text' : 'password'}
                        value={signUpConfirmPassword}
                        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                        placeholder="تأكيد كلمة المرور"
                        required
                        className={`${inputClasses} pl-10 ${signUpConfirmPassword.length > 0 && signUpPassword !== signUpConfirmPassword ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                    />
                    {signUpConfirmPassword.length > 0 && signUpPassword !== signUpConfirmPassword && (
                        <p className="text-error-500 text-xs mt-1">كلمتا المرور غير متطابقتين</p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading || !signUpName || !signUpEmail || !signUpPassword || !signUpConfirmPassword}
                    className="w-full bg-primary-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
                >
                    {loading ? (
                        <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                    ) : 'إنشاء حساب'}
                </button>
            </div>
        </form>
    );
}

export default SignUpForm;
