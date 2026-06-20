import { useTheme } from '../../contexts/ThemeContext';
import { getLanguage, formatCurrency } from '../../i18n';
import { useInjectStyles } from '../../utils/injectStyles';

const loc = (ar, en) => (getLanguage() === 'en' ? en : ar);

const IRRIGATION_OPTIONS = [
    {
        key: 'natural',
        icon: 'fa-cloud-rain',
        color: '#3b82f6',
        rate: '10%',
        labelAr: 'ري طبيعي (بالأمطار)',
        labelEn: 'Natural (Rain-fed)',
        descAr: 'بدون تكلفة ري',
        descEn: 'No irrigation cost',
    },
    {
        key: 'mixed',
        icon: 'fa-droplet',
        color: '#8b5cf6',
        rate: '7.5%',
        labelAr: 'ري مشترك',
        labelEn: 'Mixed (Rain + Machine)',
        descAr: 'جزئياً بالأمطار وجزئياً بالآلات',
        descEn: 'Part rain, part machine',
    },
    {
        key: 'irrigated',
        icon: 'fa-faucet-drip',
        color: '#f59e0b',
        rate: '5%',
        labelAr: 'ري صناعي (بالآلات)',
        labelEn: 'Artificial (Machines)',
        descAr: 'بتكلفة ري كاملة',
        descEn: 'Full irrigation cost',
    },
];

const cropsStyles = `
    @keyframes fadeInUpCrops {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
    }
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none; margin: 0;
    }
    input[type=number] { -moz-appearance: textfield; }
`;

export default function CropsCalculator({
    cropWeight,
    onCropChange,
    irrigationMode,
    onIrrigationChange,
    cropsZakat,
    expanded,
    onToggle,
}) {
    const { isDark: dk } = useTheme();
    useInjectStyles(cropsStyles, 'crops-styles');

    return (
        <div
            className={`rounded-[20px] overflow-hidden transition-all duration-300 border ${
                dk
                    ? 'bg-[#1e293b] shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-white/5 hover:shadow-[0_6px_28px_rgba(0,0,0,0.4)]'
                    : 'bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] border-[#eef2f7] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
            }`}
            style={{ animation: 'fadeInUpCrops 0.35s ease both' }}
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
                    <i className="fa-solid fa-wheat-awn text-primary-500" style={{ fontSize: '1rem' }} />
                </div>

                {/* Title */}
                <h3
                    className="flex-1 font-extrabold text-[1.1rem]"
                    style={{ color: dk ? '#f8fafc' : '#1a1a1a' }}
                >
                    {loc('الزروع والثمار', 'Agriculture & Crops')}
                </h3>

                {/* Crops zakat badge */}
                {cropsZakat > 0 && (
                    <div
                        className={`shrink-0 px-1.5 py-[0.35rem] rounded-full border ${
                            dk ? 'bg-primary-500/15 border-primary-500/25' : 'bg-primary-500/10 border-primary-500/25'
                        }`}
                    >
                        <span className="font-bold text-[0.75rem] whitespace-nowrap text-primary-500 font-latin">
                            {cropsZakat.toFixed(1)} {loc('كجم', 'kg')}
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
                    expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-4 md:px-6 pb-5 md:pb-6 pt-1">
                    {/* Description */}
                    <p
                        className="text-[0.8rem] mb-3 leading-relaxed"
                        style={{ color: dk ? 'rgba(226,232,240,0.6)' : '#888' }}
                    >
                        {loc(
                            'أدخل وزن المحصول واختر طريقة الري المناسبة لحساب زكاة الزروع.',
                            'Enter the harvest weight and select the irrigation method to calculate your crops Zakat.'
                        )}
                    </p>

                    {/* Weight Input */}
                    <div className="relative max-w-[500px] mb-3">
                        <input
                            placeholder={loc('وزن المحصول', 'Harvest weight')}
                            type="number"
                            value={cropWeight}
                            onChange={(e) => onCropChange(e.target.value)}
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
                            {loc('كجم', 'kg')}
                        </span>
                    </div>

                    {/* Irrigation Method Section */}
                    <p
                        className="font-bold text-[0.85rem] mb-1.5"
                        style={{ color: dk ? 'rgba(226,232,240,0.7)' : '#555' }}
                    >
                        {loc('طريقة الري', 'Irrigation Method')}
                    </p>

                    <div className="flex flex-col gap-1.2">
                        {IRRIGATION_OPTIONS.map((opt) => {
                            const selected = irrigationMode === opt.key;
                            return (
                                <div
                                    key={opt.key}
                                    onClick={() => onIrrigationChange(opt.key)}
                                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl cursor-pointer select-none transition-all duration-250 hover:-translate-y-[1px] ${
                                        selected
                                            ? dk
                                                ? 'border-[1.5px] bg-primary-500/10 shadow-[0_2px_12px_rgba(0,0,0,0.15)]'
                                                : 'border-[1.5px] bg-primary-500/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.15)]'
                                            : dk
                                                ? 'border border-white/[0.08] bg-white/[0.02]'
                                                : 'border border-[#eef2f7] bg-[#fafbfc]'
                                    }`}
                                    style={{
                                        borderColor: selected ? opt.color : undefined,
                                        boxShadow: selected ? `0 2px 12px ${opt.color}26` : 'none',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!selected) {
                                            e.currentTarget.style.borderColor = `${opt.color}80`;
                                            e.currentTarget.style.backgroundColor = dk ? `${opt.color}14` : `${opt.color}0a`;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!selected) {
                                            e.currentTarget.style.borderColor = dk ? 'rgba(255,255,255,0.08)' : '#eef2f7';
                                            e.currentTarget.style.backgroundColor = dk ? 'rgba(255,255,255,0.02)' : '#fafbfc';
                                        }
                                    }}
                                >
                                    {/* Option Icon */}
                                    <div
                                        className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                                            dk ? 'bg-primary-500/15' : 'bg-primary-500/10'
                                        }`}
                                        style={{ backgroundColor: `${opt.color}26` }}
                                    >
                                        <i
                                            className={`fa-solid ${opt.icon}`}
                                            style={{ fontSize: '0.95rem', color: opt.color }}
                                        />
                                    </div>

                                    {/* Option Text */}
                                    <div className="flex-1">
                                        <p
                                            className="font-bold text-[0.82rem] transition-colors duration-200"
                                            style={{
                                                color: selected
                                                    ? dk ? '#f8fafc' : '#1a1a1a'
                                                    : dk ? '#e2e8f0' : '#555',
                                            }}
                                        >
                                            {loc(opt.labelAr, opt.labelEn)}
                                        </p>
                                        <p
                                            className="text-[0.68rem] mt-[0.2]"
                                            style={{ color: dk ? 'rgba(226,232,240,0.5)' : '#999' }}
                                        >
                                            {loc(opt.descAr, opt.descEn)}
                                        </p>
                                    </div>

                                    {/* Rate Badge */}
                                    <div
                                        className={`shrink-0 px-1.2 py-[0.3] rounded-[8px] transition-all duration-200 ${
                                            selected
                                                ? dk ? 'bg-primary-500/20' : 'bg-primary-500/12'
                                                : dk ? 'bg-white/[0.04]' : 'bg-[#f0f4f8]'
                                        }`}
                                        style={selected ? { backgroundColor: `${opt.color}33` } : {}}
                                    >
                                        <span
                                            className="font-extrabold text-[0.78rem] font-latin transition-colors duration-200"
                                            style={{
                                                color: selected ? opt.color : dk ? 'rgba(226,232,240,0.5)' : '#aaa',
                                            }}
                                        >
                                            {opt.rate}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Result Preview */}
                    {parseFloat(cropWeight) > 0 && (
                        <div
                            className={`mt-2.5 p-1.5 rounded-xl flex justify-between items-center border ${
                                dk ? 'bg-primary-500/10 border-primary-500/20' : 'bg-primary-500/[0.06] border-primary-500/15'
                            }`}
                            style={{ animation: 'fadeInUpCrops 0.25s ease both' }}
                        >
                            <div className="flex items-center gap-[0.8]">
                                <i className="fa-solid fa-wheat-awn text-[0.75rem] text-primary-500" />
                                <span
                                    className="font-bold text-[0.8rem]"
                                    style={{ color: dk ? '#f8fafc' : '#333' }}
                                >
                                    {loc('زكاة الزروع:', 'Crops Zakat:')}
                                </span>
                            </div>
                            <span className="font-extrabold text-[0.9rem] text-primary-500 font-latin">
                                {cropsZakat.toFixed(1)} {loc('كجم', 'kg')}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
