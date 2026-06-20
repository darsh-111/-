import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { getLanguage, formatCurrency, formatNumber } from '../../i18n';
import { useInjectStyles } from '../../utils/injectStyles';

const DARK_BG     = '#0f172a';
const DARK_CARD   = '#1e293b';
const DARK_TEXT   = '#e2e8f0';
const DARK_HEAD   = '#f8fafc';
const GOLD_CLR    = '#f59e0b';
const SILVER_CLR  = '#94a3b8';

const loc = (ar, en) => (getLanguage() === 'en' ? en : ar);
const num = (v) => parseFloat(v) || 0;
const isEn = () => getLanguage() === 'en';

const karatPriceKey = { '24': 'gold24k', '21': 'gold21k', '18': 'gold18k' };

const goldSilverStyles = `
    @keyframes fadeInUpGS {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGS {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.06); }
    }
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none; margin: 0;
    }
    input[type=number] { -moz-appearance: textfield; }
`;

const GoldSilverCalculator = ({
  goldEntries,
  onGoldChange,
  onAddGold,
  onRemoveGold,
  silverGrams,
  onSilverChange,
  prices,
  goldZakat,
  silverZakat,
  expanded,
  onToggle,
}) => {
  const { isDark: dk } = useTheme();
  useInjectStyles(goldSilverStyles, 'gold-silver-styles');
  const totalZakat = (goldZakat || 0) + (silverZakat || 0);
  const GOLD_GRADIENT = 'linear-gradient(135deg, #f59e0b, #d97706)';

  const renderHeader = () => (
    <div
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 cursor-pointer select-none transition-colors duration-200 ${
        dk ? 'hover:bg-white/[0.03]' : 'hover:bg-amber-500/[0.04]'
      }`}
    >
      {/* amber icon circle */}
      <div
        className={`w-[44px] h-[44px] min-w-[44px] rounded-full flex items-center justify-center transition-transform duration-250 hover:scale-105 ${
          dk ? 'bg-amber-500/15' : 'bg-amber-500/12'
        }`}
      >
        <i className="fas fa-coins" style={{ fontSize: 20, color: GOLD_CLR }} />
      </div>

      {/* title */}
      <h3
        className="flex-1 font-bold text-[1.05rem] sm:text-[1.15rem]"
        style={{ color: dk ? DARK_HEAD : '#1e293b' }}
      >
        {loc('الذهب والفضة', 'Gold & Silver')}
      </h3>

      {/* zakat badge */}
      {totalZakat > 0 && (
        <div
          className="px-1.5 py-0.5 rounded-[10px] font-bold text-[0.82rem] text-white whitespace-nowrap font-latin"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))',
            animation: 'pulseGS 2s ease-in-out infinite',
          }}
        >
          {formatCurrency(totalZakat)}
        </div>
      )}

      {/* chevron */}
      <div
        className="flex items-center justify-center transition-transform duration-300"
        style={{
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          color: dk ? DARK_TEXT : '#64748b',
          fontSize: 18,
        }}
      >
        <i className="fas fa-chevron-down" />
      </div>
    </div>
  );

  const SubHeader = ({ icon, iconColor, label }) => (
    <div className="mb-2">
      <div className="flex items-center gap-1.2 mb-1.2">
        <div
          className={`w-[34px] h-[34px] min-w-[34px] rounded-full flex items-center justify-center`}
          style={{ backgroundColor: `${iconColor}${dk ? '26' : '1a'}` }}
        >
          <i className={icon} style={{ fontSize: 15, color: iconColor }} />
        </div>
        <h4
          className="font-bold text-[1rem]"
          style={{ color: dk ? DARK_HEAD : '#334155' }}
        >
          {label}
        </h4>
      </div>
      <hr className={`border-t ${dk ? 'border-white/[0.06]' : 'border-[#e2e8f0]/80'}`} />
    </div>
  );

  const InlineCalc = ({ grams, pricePerGram }) => {
    const g = num(grams);
    if (g <= 0) return null;
    const total = g * pricePerGram;
    return (
      <div
        className="mt-1.2 px-1.5 py-0.9 rounded-[10px] flex items-center gap-0.6 flex-wrap justify-center"
        style={{
          direction: 'ltr',
          backgroundColor: dk ? 'rgba(255,255,255,0.04)' : 'rgba(245,158,11,0.05)',
          border: `1px solid ${dk ? 'rgba(255,255,255,0.06)' : 'rgba(245,158,11,0.12)'}`,
        }}
      >
        <span className="font-semibold text-[0.82rem] font-latin" style={{ color: dk ? 'rgba(226,232,240,0.7)' : '#64748b' }}>
          {formatNumber(g)}g &times; {formatCurrency(pricePerGram)}
        </span>
        <span className="font-semibold text-[0.82rem] font-latin mx-0.4" style={{ color: dk ? 'rgba(226,232,240,0.7)' : '#64748b' }}>
          =
        </span>
        <span className="font-bold text-[0.85rem] font-latin" style={{ color: dk ? GOLD_CLR : '#b45309' }}>
          {formatCurrency(total)}{' '}
          <span className="font-semibold text-[0.78rem]" style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif" }}>
            {loc('ج.م', 'EGP')}
          </span>
        </span>
      </div>
    );
  };

  const GoldEntryCard = ({ entry, idx }) => {
    const pricePerGram = prices?.[karatPriceKey[entry.karat]] || 0;
    return (
      <div
        className={`mb-2 p-4 sm:p-5 rounded-xl transition-all duration-250 ${
          dk
            ? 'bg-white/[0.04] border border-white/[0.06] hover:border-amber-500/25 hover:shadow-[0_2px_12px_rgba(245,158,11,0.08)]'
            : 'bg-[#f8fafc]/85 border border-[#e2e8f0]/75 hover:border-amber-500/35 hover:shadow-[0_2px_12px_rgba(245,158,11,0.06)]'
        }`}
      >
        {/* entry header */}
        <div className="flex items-center justify-between mb-1.5">
          <h5
            className="font-bold text-[0.9rem]"
            style={{ color: dk ? DARK_HEAD : '#334155' }}
          >
            {loc(`ذهب ${idx + 1}`, `Gold ${idx + 1}`)}
          </h5>

          {goldEntries.length > 1 && (
            <button
              onClick={() => onRemoveGold(entry.id)}
              className="p-2 rounded-md text-red-500 transition-all duration-200 hover:bg-red-500/10 hover:scale-110"
            >
              <i className="fas fa-trash-alt" style={{ fontSize: 14 }} />
            </button>
          )}
        </div>

        {/* input row */}
        <div className="flex gap-1.5 flex-col sm:flex-row sm:items-center">
          {/* weight input */}
          <div className="relative flex-1">
            <input
              type="number"
              placeholder={loc('الوزن بالجرام', 'Weight in grams')}
              value={entry.grams}
              onChange={(e) => onGoldChange(entry.id, 'grams', e.target.value)}
              className={`w-full px-3 py-2 border rounded-xl font-latin text-[0.95rem] outline-none transition-colors focus:ring-2 focus:ring-amber-500 ${
                dk
                  ? 'bg-black/20 border-white/10 text-[#e2e8f0] hover:border-amber-500/40 focus:border-amber-500'
                  : 'bg-white border-[#e2e8f0] text-[#1e293b] hover:border-amber-500/50 focus:border-amber-500'
              }`}
              style={dk ? { color: DARK_TEXT } : {}}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem] font-semibold font-latin pointer-events-none"
              style={{ color: dk ? 'rgba(226,232,240,0.5)' : '#94a3b8' }}
            >
              {loc('جرام', 'g')}
            </span>
          </div>

          {/* karat toggle */}
          <div className="flex gap-1 min-w-fit">
            {['24', '21', '18'].map((k) => (
              <button
                key={k}
                onClick={() => onGoldChange(entry.id, 'karat', k)}
                className={`px-4 sm:px-[1.125rem] py-[0.35rem] rounded-[10px] font-bold text-[0.8rem] font-latin transition-all duration-200 border ${
                  entry.karat === k
                    ? 'text-white border-amber-500 shadow-[0_2px_8px_rgba(245,158,11,0.3)]'
                    : dk
                      ? 'text-[#e2e8f0]/60 border-white/10 hover:bg-amber-500/10'
                      : 'text-[#64748b] border-[#e2e8f0] hover:bg-amber-500/[0.08]'
                }`}
                style={entry.karat === k ? { background: GOLD_GRADIENT } : {}}
              >
                {k}K
              </button>
            ))}
          </div>
        </div>

        {/* inline calculation */}
        <InlineCalc grams={entry.grams} pricePerGram={pricePerGram} />
      </div>
    );
  };

  const renderAddGoldBtn = () => (
    <button
      onClick={onAddGold}
      className={`w-full mt-0.5 py-1.2 rounded-xl font-bold text-[0.9rem] transition-all duration-250 hover:-translate-y-[1px] ${
        dk
          ? 'border-2 border-dashed border-amber-500/35 text-amber-500 hover:bg-amber-500/[0.08] hover:border-amber-500'
          : 'border-2 border-dashed border-amber-500/45 text-[#b45309] hover:bg-amber-500/[0.06] hover:border-amber-500'
      }`}
      style={{ background: 'transparent' }}
    >
      <i className="fas fa-plus text-[13px]" style={{ marginLeft: isEn() ? 0 : 8, marginRight: isEn() ? 8 : 0 }} />
      {loc('إضافة ذهب آخر', 'Add Gold Entry')}
    </button>
  );

  const renderSilver = () => {
    const silverPrice = prices?.silver || 0;
    return (
      <div className="mt-3">
        <SubHeader icon="fas fa-medal" iconColor={SILVER_CLR} label={loc('الفضة', 'Silver')} />
        <div className="relative">
          <input
            type="number"
            placeholder={loc('الوزن بالجرام', 'Weight in grams')}
            value={silverGrams}
            onChange={(e) => onSilverChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-xl font-latin text-[0.95rem] outline-none transition-colors focus:ring-2 focus:ring-[#94a3b8] ${
              dk
                ? 'bg-black/20 border-white/10 text-[#e2e8f0] hover:border-[#94a3b8]/50 focus:border-[#94a3b8]'
                : 'bg-white border-[#e2e8f0] text-[#1e293b] hover:border-[#94a3b8]/60 focus:border-[#94a3b8]'
            }`}
            style={dk ? { color: DARK_TEXT } : {}}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem] font-semibold font-latin pointer-events-none"
            style={{ color: dk ? 'rgba(226,232,240,0.5)' : '#94a3b8' }}
          >
            {loc('جرام', 'g')}
          </span>
        </div>

        {/* silver inline calc */}
        {num(silverGrams) > 0 && (
          <div
            className="mt-1.2 px-1.5 py-0.9 rounded-[10px] flex items-center gap-0.6 flex-wrap justify-center"
            style={{
              direction: 'ltr',
              backgroundColor: dk ? 'rgba(255,255,255,0.04)' : 'rgba(148,163,184,0.06)',
              border: `1px solid ${dk ? 'rgba(255,255,255,0.06)' : 'rgba(148,163,184,0.15)'}`,
            }}
          >
            <span className="font-semibold text-[0.82rem] font-latin" style={{ color: dk ? 'rgba(226,232,240,0.7)' : '#64748b' }}>
              {formatNumber(num(silverGrams))}g &times; {formatCurrency(silverPrice)}
            </span>
            <span className="font-semibold text-[0.82rem] font-latin mx-0.4" style={{ color: dk ? 'rgba(226,232,240,0.7)' : '#64748b' }}>
              =
            </span>
            <span className="font-bold text-[0.85rem] font-latin" style={{ color: dk ? SILVER_CLR : '#475569' }}>
              {formatCurrency(num(silverGrams) * silverPrice)}{' '}
              <span className="font-semibold text-[0.78rem]" style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif" }}>
                {loc('ج.م', 'EGP')}
              </span>
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderPricesFooter = () => {
    const items = [
      { label: loc('ذهب 24', 'Gold 24K'), value: prices?.gold24k, color: GOLD_CLR },
      { label: loc('ذهب 21', 'Gold 21K'), value: prices?.gold21k, color: GOLD_CLR },
      { label: loc('ذهب 18', 'Gold 18K'), value: prices?.gold18k, color: GOLD_CLR },
      { label: loc('فضة', 'Silver'), value: prices?.silver, color: SILVER_CLR },
    ];

    return (
      <div
        className="mt-3 p-4 sm:p-[1.125rem] rounded-xl"
        style={{
          backgroundColor: dk ? 'rgba(0,0,0,0.25)' : 'rgba(241,245,249,0.7)',
          border: `1px solid ${dk ? 'rgba(255,255,255,0.06)' : 'rgba(226,232,240,0.8)'}`,
        }}
      >
        {/* footer title */}
        <div className="flex items-center gap-0.8 mb-1.2">
          <i className="fas fa-chart-line text-[12px]" style={{ color: dk ? 'rgba(226,232,240,0.45)' : '#94a3b8' }} />
          <span className="text-[0.78rem] font-semibold" style={{ color: dk ? 'rgba(226,232,240,0.5)' : '#94a3b8' }}>
            {loc('الأسعار الحالية', 'Current Prices')}
          </span>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-2 gap-1">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-1.2 py-[0.35rem] rounded-[8px]"
              style={{
                backgroundColor: dk ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${dk ? 'rgba(255,255,255,0.04)' : 'rgba(226,232,240,0.5)'}`,
              }}
            >
              <span className="text-[0.72rem] font-semibold whitespace-nowrap" style={{ color: dk ? 'rgba(226,232,240,0.6)' : '#64748b' }}>
                {item.label}
              </span>
              <span className="text-[0.72rem] font-bold whitespace-nowrap font-latin" style={{ color: item.color }}>
                {formatCurrency(item.value || 0)}
                <span className="font-medium text-[0.65rem] opacity-70" style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif", marginRight: isEn() ? 0 : 3, marginLeft: isEn() ? 3 : 0 }}>
                  {loc('/ جرام', '/ g')}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`rounded-[20px] overflow-hidden transition-all duration-300`}
      style={{
        animation: 'fadeInUpGS 0.45s ease-out',
        direction: 'rtl',
        backgroundColor: dk ? DARK_CARD : '#fff',
        boxShadow: dk
          ? `0 8px 32px rgba(0,0,0,0.35)`
          : `0 4px 24px rgba(148,163,184,0.13)`,
        border: `1px solid ${dk ? 'rgba(255,255,255,0.06)' : 'rgba(226,232,240,0.7)'}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = dk
          ? `0 12px 40px rgba(0,0,0,0.45)`
          : `0 8px 32px rgba(148,163,184,0.2)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = dk
          ? `0 8px 32px rgba(0,0,0,0.35)`
          : `0 4px 24px rgba(148,163,184,0.13)`;
      }}
    >
      {renderHeader()}

      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 sm:px-5 pb-2.5">
          {/* GOLD */}
          <SubHeader icon="fas fa-coins" iconColor={GOLD_CLR} label={loc('الذهب', 'Gold')} />

          {(goldEntries || []).map((entry, idx) => (
            <GoldEntryCard key={entry.id} entry={entry} idx={idx} />
          ))}

          {renderAddGoldBtn()}

          {/* SILVER */}
          {renderSilver()}

          {/* LIVE PRICES */}
          {renderPricesFooter()}
        </div>
      </div>
    </div>
  );
};

export default GoldSilverCalculator;
