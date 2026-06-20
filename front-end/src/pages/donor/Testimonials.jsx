import { useTheme } from '../../contexts/ThemeContext';
import { useAdminData } from '../../contexts/AdminDataContext';

function Testimonials() {
    const { isDark } = useTheme();
    const { state } = useAdminData();
    const testimonials = state.content?.testimonials || [];

    return (
        <div className="pb-16">
            <div className="bg-gradient-to-br from-[#0d6b4b] to-[#094a33] text-white py-16 px-0 text-center">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                    <h3 className="text-3xl font-bold mb-3">آراء المستفيدين</h3>
                    <p className="text-lg opacity-90">كلمات الشكر والتقدير من الذين ساهمت في تغيير حياتهم</p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-6">
                {testimonials.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                        <i className="fa-regular fa-comment-dots text-5xl opacity-30"></i>
                        <p className="mt-3">لا توجد آراء بعد</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-4">
                        {testimonials.map((test) => (
                            <div className="col-span-12 sm:col-span-6 md:col-span-4 flex" key={test.id}>
                                <div
                                    className={`flex-1 p-6 rounded-2xl relative border ${
                                        isDark
                                            ? 'bg-white/[0.04] border-white/[0.08]'
                                            : 'bg-white border-black/[0.04]'
                                    }`}
                                >
                                    <span
                                        className="absolute top-2 right-4 text-6xl leading-none font-serif text-primary-500/10"
                                        aria-hidden="true"
                                    >
                                        &ldquo;
                                    </span>
                                    <p className="leading-relaxed mb-4 italic text-sm dark:text-neutral-200">
                                        &ldquo;{test.content || test.text}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-11 h-11 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold overflow-hidden shrink-0">
                                            {test.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold dark:text-white">{test.name}</p>
                                            {test.role && <span className="text-xs text-neutral-500 dark:text-neutral-400">{test.role}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Testimonials;
