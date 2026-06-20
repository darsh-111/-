import LoginErrorAlert from './LoginErrorAlert';
import { useInjectStyles } from '../../utils/injectStyles';

const otpStyles = `
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

function OtpVerificationForm({ otp, handleOtpChange, handleOtpKeyDown, loading, error, otpSentTo, onSubmit, onResend, onBack }) {
    useInjectStyles(otpStyles, 'otp-form-styles');

    return (
        <div style={{ animation: 'slideIn 0.4s ease' }}>
            <div className="text-center mb-4">
                <div className="text-[52px] text-primary-500 mb-2" style={{ animation: 'bounceIn 0.5s ease' }}>
                    <i className="fa-solid fa-envelope-circle-check" />
                </div>
                <h5 className="text-lg font-bold mb-1">تأكيد البريد الإلكتروني</h5>
                <p className="text-neutral-500 dark:text-neutral-400 mb-1">أرسلنا كود تحقق مكون من 6 أرقام إلى</p>
                <p className="font-bold text-primary-500 inline-block" dir="ltr">{otpSentTo}</p>
            </div>

            <LoginErrorAlert type="error" message={error} />

            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-center" style={{ gap: '1.2rem' }} dir="ltr">
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                id={`otp-${i}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ''))}
                                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                autoFocus={i === 0}
                                className="w-[50px] h-[54px] text-center text-xl font-bold border-2 border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-800 text-inherit focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(var(--color-primary-500),0.15)] transition-all"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.some((d) => !d)}
                        className="w-full bg-primary-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
                    >
                        {loading ? (
                            <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                        ) : 'تأكيد'}
                    </button>
                </div>
            </form>

            <div className="flex flex-row justify-center gap-1 mt-3">
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">لم تتلقى الكود؟</p>
                <button
                    onClick={onResend}
                    disabled={loading}
                    className="text-primary-500 font-bold text-sm bg-transparent border-none cursor-pointer p-0 hover:text-primary-600"
                >
                    إعادة الإرسال
                </button>
            </div>

            <button
                onClick={onBack}
                className="mt-2 w-full text-neutral-500 dark:text-neutral-400 font-semibold text-sm bg-transparent border-none cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300"
            >
                العودة لتسجيل الدخول
            </button>
        </div>
    );
}

export default OtpVerificationForm;
