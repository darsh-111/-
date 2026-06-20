import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { getLanguage, formatCurrency, formatNumber } from '../../i18n';
import { useInjectStyles } from '../../utils/injectStyles';

const DARK_BG     = '#0f172a';
const DARK_CARD   = '#1e293b';
const DARK_TEXT   = '#e2e8f0';
const DARK_HEAD   = '#f8fafc';
const AMBER       = '#f59e0b';
const ARABIC_FONT = "'Cairo', 'Tajawal', sans-serif";
const LATIN_FONT  = "'Inter', 'Manrope', sans-serif";

const loc = (ar, en) => (getLanguage() === 'en' ? en : ar);

const InfoRow = ({ label, value, icon, iconColor, dk }) => (
  <div className="flex items-center justify-between py-[0.8] px-0.5">
    <div className="flex items-center gap-1">
      {icon && (
        <i
          className={`fa-solid ${icon}`}
          style={{
            fontSize: '0.85rem',
            color: iconColor || (dk ? DARK_TEXT : '#64748b'),
            width: 22,
            textAlign: 'center',
          }}
        />
      )}
      <span
        className="text-[0.84rem]"
        style={{ color: dk ? 'rgba(226,232,240,0.8)' : '#475569' }}
      >
        {label}
      </span>
    </div>
    <span
      className="text-[0.84rem] font-bold font-latin"
      style={{ color: dk ? DARK_HEAD : '#1e293b' }}
    >
      {value}
    </span>
  </div>
);

const PriceCell = ({ label, value, dk }) => (
  <div
    className="py-[0.35rem] px-1 rounded-[10px]"
    style={{
      backgroundColor: dk ? 'rgba(255,255,255,0.04)' : 'rgba(248,250,252,0.8)',
      border: `1px solid ${dk ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}`,
    }}
  >
    <span
      className="text-[0.68rem]"
      style={{ color: dk ? 'rgba(226,232,240,0.55)' : '#94a3b8' }}
    >
      {label}
    </span>
    <div className="text-[0.76rem] font-bold font-latin leading-tight" style={{ color: dk ? DARK_HEAD : '#1e293b' }}>
      {value}
      <span
        className="text-[0.62rem] font-medium"
        style={{ color: dk ? 'rgba(226,232,240,0.45)' : '#94a3b8', marginRight: '0.3rem' }}
      >
        {' /'}{loc('جرام', 'g')}
      </span>
    </div>
  </div>
);

const zakatSummaryStyles = `
    @keyframes fadeInUpSum {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseSum {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
    }
`;

const ZakatSummaryCard = ({
  zakatDue = {},
  nisab = 0,
  prices = null,
  isLive = false,
  lastUpdated = null,
  source = 'fallback',
  onRefresh = () => {},
  showInfoModal = () => {},
}) => {
  const { isDark: dk } = useTheme();
  useInjectStyles(zakatSummaryStyles, 'zakat-summary-styles');

  const {
    cash = 0,
    gold = 0,
    silver = 0,
    totalCurrency = 0,
    zakatableWealth = 0,
    cropsWeightDue = 0,
  } = zakatDue;

  const nisabPercent = nisab > 0 ? Math.min((zakatableWealth / nisab) * 100, 100) : 0;
  const nisabReached = nisabPercent >= 100;

  const sourceLabel =
    source === 'api'
      ? loc('أسعار حية', 'Live prices')
      : source === 'admin'
      ? loc('أسعار معتمدة', 'Admin prices')
      : loc('أسعار تقديرية', 'Estimated prices');

  const dotColor = source === 'fallback' ? AMBER : 'var(--color-primary-500)';

  const timeAgo = (() => {
    if (!lastUpdated) return null;
    const diff = Math.floor((Date.now() - new Date(lastUpdated).getTime()) / 1000);
    if (diff < 60) return loc('الآن', 'Just now');
    if (diff < 3600) {
      const m = Math.floor(diff / 60);
      return loc(`منذ ${m} دقيقة`, `${m}m ago`);
    }
    const h = Math.floor(diff / 3600);
    return loc(`منذ ${h} ساعة`, `${h}h ago`);
  })();

  const hasCTA = totalCurrency > 0 || cropsWeightDue > 0;

  return (
    <div
      className={`rounded-[20px] overflow-hidden border ${
        dk
          ? 'bg-[#1e293b] shadow-[0_4px_24px_rgba(0,0,0,0.35)] border-white/[0.06]'
          : 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)] border-[#eef2f7]'
      }`}
      style={{
        direction: 'rtl',
        animation: 'fadeInUpSum 0.5s ease 0.15s both',
      }}
    >
      {/* TEAL GRADIENT HEADER */}
      <div
        className="px-2.5 py-[1.35rem]"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))',
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p
              className="font-bold text-[0.9rem] text-white leading-relaxed"
            >
              {loc('إجمالي الزكاة المستحقة', 'Total Zakat Due')}
            </p>
            <p className="text-[0.72rem] mt-0.2 text-white/50">
              {loc('يتم حسابها تلقائياً', 'Calculated automatically')}
            </p>
          </div>

          <button
            onClick={showInfoModal}
            className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/12 transition-all duration-250"
          >
            <i className="fa-solid fa-circle-info text-[1rem]" />
          </button>
        </div>

        {/* main total */}
        <div className="mt-[1.125rem] mb-0.5">
          <p className="text-[2.2rem] font-black text-white leading-tight tracking-tight font-latin">
            {formatNumber(Math.round(totalCurrency))}
          </p>
          <p className="text-[0.75rem] mt-0.3 text-white/55">
            {loc('جنيه مصري', 'Egyptian Pounds')}
          </p>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="px-2.5 py-2">
        {/* Nisab Progress */}
        {zakatableWealth > 0 && (
          <div className="mb-2">
            <p
              className="text-[0.74rem] font-semibold mb-[0.8]"
              style={{ color: dk ? 'rgba(226,232,240,0.65)' : '#64748b' }}
            >
              {loc('مستوى النصاب', 'Nisab Level')}
            </p>

            {/* Custom progress bar */}
            <div
              className="w-full h-2 rounded-[4px] overflow-hidden"
              style={{ backgroundColor: dk ? 'rgba(255,255,255,0.06)' : '#f1f5f9' }}
            >
              <div
                className="h-full rounded-[4px] transition-all duration-[0.6s] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  width: `${nisabPercent}%`,
                  backgroundColor: nisabReached ? 'var(--color-primary-500)' : AMBER,
                }}
              />
            </div>

            <p
              className="text-[0.72rem] font-semibold mt-[0.35rem] leading-relaxed"
              style={{ color: nisabReached ? 'var(--color-primary-500)' : AMBER }}
            >
              {`${Math.round(nisabPercent)}% — `}
              {nisabReached
                ? loc('بلغت أموالك النصاب — الزكاة واجبة', 'Your wealth has reached Nisab — Zakat is due')
                : loc('أموالك لم تبلغ حد النصاب', 'Your assets are below Nisab')}
            </p>
          </div>
        )}

        {/* Below-Nisab Warning */}
        {zakatableWealth > 0 && !nisabReached && (
          <div
            className="flex items-center gap-1.2 px-1.6 py-1.2 mb-2 rounded-xl border"
            style={{
              backgroundColor: dk ? 'rgba(245,158,11,0.12)' : 'rgba(245,158,11,0.08)',
              borderColor: dk ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.18)',
            }}
          >
            <i className="fa-solid fa-triangle-exclamation text-[0.9rem] shrink-0" style={{ color: AMBER }} />
            <p
              className="text-[0.76rem] font-semibold leading-relaxed"
              style={{ color: dk ? '#fbbf24' : '#92400e' }}
            >
              {loc(
                'أموالك لم تبلغ حد النصاب. لا تجب فيها الزكاة.',
                'Your assets are below the Nisab. No Zakat is due.',
              )}
            </p>
          </div>
        )}

        {/* Info Rows */}
        <hr className={`border-t mb-0.5 ${dk ? 'border-white/[0.06]' : 'border-[#f1f5f9]'}`} />

        <InfoRow
          label={loc('النصاب الحالي', 'Current Nisab')}
          value={formatCurrency(nisab)}
          dk={dk}
        />
        <InfoRow
          label={loc('إجمالي أموالك', 'Your Wealth')}
          value={formatCurrency(zakatableWealth)}
          dk={dk}
        />

        {/* Breakdown Section */}
        {totalCurrency > 0 && (
          <>
            <hr className={`border-t my-1 ${dk ? 'border-white/[0.06]' : 'border-[#f1f5f9]'}`} />

            <p
              className="text-[0.65rem] font-bold tracking-widest uppercase mb-0.5 mt-0.3 font-latin"
              style={{ color: dk ? 'rgba(226,232,240,0.4)' : '#94a3b8' }}
            >
              {loc('التفاصيل', 'BREAKDOWN')}
            </p>

            {cash > 0 && (
              <InfoRow
                label={loc('زكاة النقود', 'Cash')}
                value={formatCurrency(cash)}
                icon="fa-money-bill-wave"
                iconColor="var(--color-primary-500)"
                dk={dk}
              />
            )}
            {gold > 0 && (
              <InfoRow
                label={loc('زكاة الذهب', 'Gold')}
                value={formatCurrency(gold)}
                icon="fa-coins"
                iconColor="#f59e0b"
                dk={dk}
              />
            )}
            {silver > 0 && (
              <InfoRow
                label={loc('زكاة الفضة', 'Silver')}
                value={formatCurrency(silver)}
                icon="fa-medal"
                iconColor="#94a3b8"
                dk={dk}
              />
            )}
          </>
        )}

        {/* Crops Zakat */}
        {cropsWeightDue > 0 && (
          <div
            className="flex items-center gap-1.2 px-1.6 py-1.2 mt-1.5 rounded-xl border"
            style={{
              backgroundColor: dk ? 'rgba(var(--color-primary-500), 0.1)' : 'rgba(var(--color-primary-500), 0.06)',
              borderColor: dk ? 'rgba(var(--color-primary-500), 0.18)' : 'rgba(var(--color-primary-500), 0.14)',
            }}
          >
            <i className="fa-solid fa-wheat-awn text-[0.9rem] shrink-0 text-primary-500" />
            <p
              className="text-[0.78rem] font-bold leading-relaxed"
              style={{ color: dk ? '#6ee7b7' : 'var(--color-primary-500)' }}
            >
              {loc('زكاة الزروع:', 'Crops Zakat:')}{' '}
              <span className="font-extrabold font-latin">
                {cropsWeightDue.toFixed(1)}
              </span>{' '}
              {loc('كجم', 'kg')}
            </p>
          </div>
        )}

        {/* Live Prices Mini-Ticker */}
        {prices && (
          <>
            <hr className={`border-t my-1.5 ${dk ? 'border-white/[0.06]' : 'border-[#f1f5f9]'}`} />

            <div className="grid grid-cols-2 gap-[0.8] mb-1.2">
              <PriceCell
                label={loc('ذهب 24', 'Gold 24K')}
                value={formatCurrency(prices.gold24k)}
                dk={dk}
              />
              <PriceCell
                label={loc('ذهب 21', 'Gold 21K')}
                value={formatCurrency(prices.gold21k)}
                dk={dk}
              />
              <PriceCell
                label={loc('ذهب 18', 'Gold 18K')}
                value={formatCurrency(prices.gold18k)}
                dk={dk}
              />
              <PriceCell
                label={loc('فضة', 'Silver')}
                value={formatCurrency(prices.silver)}
                dk={dk}
              />
            </div>

            {/* source badge row */}
            <div className="flex items-center gap-[0.8] flex-wrap">
              {/* pulsing dot */}
              <div
                className="w-[7px] h-[7px] rounded-full shrink-0"
                style={{
                  backgroundColor: dotColor,
                  animation: 'pulseSum 2s ease-in-out infinite',
                }}
              />

              <span
                className="text-[0.68rem] font-semibold"
                style={{ color: dk ? 'rgba(226,232,240,0.6)' : '#64748b' }}
              >
                {sourceLabel}
              </span>

              {timeAgo && (
                <span
                  className="text-[0.63rem] font-latin mr-auto"
                  style={{ color: dk ? 'rgba(226,232,240,0.38)' : '#94a3b8' }}
                >
                  &middot; {timeAgo}
                </span>
              )}

              <button
                onClick={onRefresh}
                className="p-0.5 rounded-md transition-all duration-250"
                style={{
                  color: dk ? 'rgba(226,232,240,0.5)' : '#94a3b8',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-primary-500)';
                  e.currentTarget.style.backgroundColor = dk ? 'rgba(var(--color-primary-500), 0.08)' : 'rgba(var(--color-primary-500), 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = dk ? 'rgba(226,232,240,0.5)' : '#94a3b8';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <i className="fa-solid fa-rotate-right text-[0.72rem]" />
              </button>
            </div>
          </>
        )}

        {/* CTA Button */}
        <div className="mt-[1.375rem]">
          <Link
            to={`/donate?amount=${Math.round(totalCurrency)}`}
            className={`block w-full py-[1.1rem] rounded-xl text-center font-bold text-[0.95rem] text-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              hasCTA
                ? 'shadow-[0_6px_24px_rgba(var(--color-primary-500),0.35)] hover:-translate-y-[1px] hover:shadow-[0_8px_30px_rgba(var(--color-primary-500),0.45)]'
                : 'pointer-events-none'
            }`}
            style={{
              background: hasCTA
                ? 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))'
                : dk ? 'rgba(255,255,255,0.06)' : '#e2e8f0',
              color: hasCTA ? '#fff' : dk ? 'rgba(226,232,240,0.3)' : '#94a3b8',
              boxShadow: hasCTA ? '0 6px 24px rgba(var(--color-primary-500),0.35)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (hasCTA) {
                e.currentTarget.style.background = 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500))';
              }
            }}
            onMouseLeave={(e) => {
              if (hasCTA) {
                e.currentTarget.style.background = 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))';
              }
            }}
          >
            {loc('أخرج زكاتك الآن', 'Pay Zakat Now')}
            <i className="fa-solid fa-heart text-[0.82rem] mr-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ZakatSummaryCard;
