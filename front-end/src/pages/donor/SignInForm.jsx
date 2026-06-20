import LoginErrorAlert from './LoginErrorAlert';
import { useInjectStyles } from '../../utils/injectStyles';

const signInStyles = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;

const inputClasses = "w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-transparent text-inherit focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all";

function SignInForm({ signInEmail, setSignInEmail, signInPassword, setSignInPassword, showSignInPassword, setShowSignInPassword, loading, onSubmit, onForgotPassword, error }) {
    useInjectStyles(signInStyles, 'signin-form-styles');

    return (
        <form onSubmit={onSubmit} style={{ animation: 'slideIn 0.3s ease' }}>
            <div className="flex flex-col gap-2.5">
                <LoginErrorAlert type="error" message={error} />
                <div className="relative">
                    <i className="fa-solid fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm z-[1]"></i>
                    <input
                        type="email"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="البريد الإلكتروني"
                        autoFocus
                        required
                        className={inputClasses + " pr-10"}
                    />
                </div>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowSignInPassword(!showSignInPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 z-[1]"
                    >
                        <i className={`fa-solid ${showSignInPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ fontSize: '0.85rem' }} />
                    </button>
                    <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm z-[1]"></i>
                    <input
                        type={showSignInPassword ? 'text' : 'password'}
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        placeholder="كلمة المرور"
                        required
                        className={inputClasses + " pr-10 pl-10"}
                    />
                </div>
                <div className="flex justify-start mt-[-0.125rem]">
                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-primary-500 text-sm font-semibold hover:text-primary-600 transition-colors bg-transparent border-none cursor-pointer p-0"
                    >
                        هل نسيت كلمة المرور؟
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={loading || !signInEmail || !signInPassword}
                    className="w-full bg-primary-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
                >
                    {loading ? (
                        <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                    ) : 'تسجيل الدخول'}
                </button>
            </div>
        </form>
    );
}

export default SignInForm;
