import { useTheme } from '../../contexts/ThemeContext';
import { getLanguage, formatCurrency } from '../../i18n';
import { useInjectStyles } from '../../utils/injectStyles';

const loc = (ar, en) => (getLanguage() === 'en' ? en : ar);

const cashStyles = `
    @keyframes fadeInUpCash {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
    }
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none; margin: 0;
    }
    input[type=number] { -moz-appearance: textfield; }
`;

export default function CashCalculator({ value, onChange, zakatAmount, expanded, onToggle }) {
    const { isDark: dk } = useTheme();
    useInjectStyles(cashStyles, 'cash-styles');

    return (
        <div
            className={`rounded-[20px] overflow-hidden transition-all duration-300 border ${
                dk
                    ? 'bg-[#1e293b] shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-white/5 hover:shadow-[0_6px_28px_rgba(0,0,0,0.4)]'
                    : 'bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] border-[#eef2f7] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
            }`}
            style={{ animation: 'fadeInUpCash 0.35s ease both' }}
        >
            {/* HEADER */}
            <div
                onClick={onToggle}
                className={`flex items-center gap-1.5 px-4 md:px-6 py-[1.1rem] md:py-[1.35rem] cursor-pointer select-none transition-colors duration-200 ${
                    dk ? 'hover:bg-white/[0.03]' : 'hover:bg-black/[0.015]'
                }`}
            >
                {/* Green circle icon */}
                <div
                    className={`w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 ${
                        dk ? 'bg-primary-500/15' : 'bg-primary-500/10'
                    }`}
                >
                    <i className="fa-solid fa-money-bill-wave text-primary-500" style={{ fontSize: '1rem' }} />
                </div>

                {/* Title */}
                <h3
                    className="flex-1 font-extrabold text-[1.1rem]"
                    style={{ color: dk ? '#f8fafc' : '#1a1a1a' }}
                >
                    {loc('النقود والأموال السائلة', 'Cash & Liquid Assets')}
                </h3>

                {/* Zakat badge */}
                {zakatAmount > 0 && (
                    <div
                        className={`shrink-0 px-1.5 py-[0.35rem] rounded-full border ${
                            dk ? 'bg-primary-500/15 border-primary-500/25' : 'bg-primary-500/10 border-primary-500/25'
                        }`}
                    >
                        <span className="font-bold text-[0.75rem] whitespace-nowrap text-primary-500 font-latin">
                            {formatCurrency(zakatAmount)}
                        </span>
                    </div>
                )}

                {/* Chevron */}
                <div
                    className="shrink-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: dk ? 'rgba(226,232,240,0.4)' : '#bbb',
                        fontSize: '0.85rem',
                    }}
                >
                    <i className="fa-solid fa-chevron-down" />
                </div>
            </div>

            {/* BODY */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-4 md:px-6 pb-5 md:pb-6 pt-1">
                    {/* Description */}
                    <p
                        className="text-[0.8rem] mb-3 leading-relaxed"
                        style={{ color: dk ? 'rgba(226,232,240,0.6)' : '#888' }}
                    >
                        {loc(
                            'أدخل إجمالي المبالغ النقدية، المدخرات البنكية، والأموال السائلة التي حال عليها الحول.',
                            'Enter the total of cash, bank savings, and liquid assets held for a full lunar year.'
                        )}
                    </p>

                    {/* Amount Input */}
                    <div className="relative max-w-[500px]">
                        <input
                            placeholder={loc('أدخل المبلغ', 'Enter amount')}
                            type="number"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className={`w-full px-3 py-2.5 border rounded-xl bg-transparent focus:ring-2 focus:ring-primary-500 outline-none transition-colors font-latin text-[0.95rem] ${
                                dk
                                    ? 'border-white/10 bg-white/5 hover:border-primary-500/40 focus:border-primary-500'
                                    : 'border-[#e0e0e0] bg-[#fafafa] hover:border-primary-500/40 focus:border-primary-500'
                            }`}
                        />
                        <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.85rem] pointer-events-none"
                            style={{ color: dk ? 'rgba(226,232,240,0.5)' : '#999' }}
                        >
                            {loc('ج.م', 'EGP')}
                        </span>
                    </div>

                    {/* Inline Preview */}
                    {parseFloat(value) > 0 && (
                        <div
                            className={`mt-2.5 p-1.5 rounded-xl flex justify-between items-center border ${
                                dk ? 'bg-primary-500/10 border-primary-500/20' : 'bg-primary-500/[0.06] border-primary-500/15'
                            }`}
                            style={{ animation: 'fadeInUpCash 0.25s ease both' }}
                        >
                            <div className="flex items-center gap-[0.8]">
                                <i className="fa-solid fa-calculator text-[0.75rem] text-primary-500" />
                                <span
                                    className="font-bold text-[0.8rem]"
                                    style={{ color: dk ? '#f8fafc' : '#333' }}
                                >
                                    {loc('الزكاة المستحقة:', 'Zakat due:')}
                                </span>
                            </div>
                            <span className="font-extrabold text-[0.9rem] text-primary-500 font-latin">
                                {formatCurrency(zakatAmount)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
