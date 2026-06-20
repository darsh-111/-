import { formatCurrency, formatNumber, getLanguage } from '../../i18n';
import AnimatedProgress from './AnimatedProgress';
import StatCard from './StatCard';

const G_GREEN = '#00b16a';
const EMERALD = '#10b981';
const TEAL = '#1a4a44';
const TEAL_MID = '#0d6b58';
const DARK_CARD = '#1e293b';
const DARK_TEXT = '#e2e8f0';
const DARK_HEAD = '#f8fafc';
const ARABIC_FONT = "'Cairo', 'Tajawal', sans-serif";
const LATIN_FONT = "'Inter', 'Manrope', sans-serif";
const loc = (ar, en) => (getLanguage() === 'en' ? (en || ar) : ar);

export default function CampaignSidebar({ campaign, amount, setAmount, isDark, onDonate }) {
    const lang = getLanguage() === 'en';
    const font = lang ? LATIN_FONT : ARABIC_FONT;
    const dir = lang ? 'ltr' : 'rtl';
    const pct = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
    const title = loc(campaign.title, campaign.titleEn);
    const AMOUNT_STEP = 50;

    return (
        <div style={{ position: 'sticky', top: 80 }}>
            <div style={{
                borderRadius: '18px', overflow: 'hidden', marginBottom: 12,
                backgroundColor: isDark ? DARK_CARD : '#fff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#eef2f7'}`,
                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 14px rgba(0,0,0,0.05)',
            }}>
                <div style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_MID} 100%)`, padding: '16px 18px' }}>
                    <p style={{ fontFamily: font, fontWeight: 800, fontSize: '0.95rem', color: '#fff', marginBottom: 3, margin: 0 }}>
                        {loc('ساهم في هذه الحملة', 'Contribute to This Campaign')}
                    </p>
                    <p style={{ fontFamily: font, fontSize: '0.73rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                        {loc('كل تبرع يُحدث فرقًا', 'Every donation makes a difference')}
                    </p>
                </div>
                <div style={{ padding: '16px 18px' }}>
                    <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                            <span style={{ fontWeight: 900, fontSize: '1.3rem', color: G_GREEN, fontFamily: LATIN_FONT }}>
                                {formatCurrency(campaign.raised)}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: isDark ? 'rgba(226,232,240,0.5)' : '#9ca3af', fontFamily: font }}>
                                {loc('من', 'of')} {formatCurrency(campaign.goal)}
                            </span>
                        </div>
                        <AnimatedProgress value={pct} height={8} />
                        <p style={{ fontSize: '0.7rem', color: isDark ? 'rgba(226,232,240,0.4)' : '#b0b0b0', fontFamily: font, marginTop: 4, textAlign: 'center', margin: 0 }}>
                            {pct}% {loc('مكتمل', 'funded')}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
                        <StatCard icon="fa-chart-simple" value={`${pct}%`} label={loc('مكتمل', 'Funded')} />
                        <StatCard icon="fa-users" value={formatNumber(campaign.donors)} label={loc('متبرع', 'Donors')} />
                        <StatCard icon="fa-clock" value={campaign.daysLeft} label={loc('يوم', 'Days')} />
                    </div>
                </div>
            </div>

            <div style={{
                borderRadius: '18px', padding: '16px 18px',
                backgroundColor: isDark ? DARK_CARD : '#fff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#eef2f7'}`,
                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 14px rgba(0,0,0,0.05)',
            }}>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', fontFamily: font, color: isDark ? DARK_HEAD : '#1a1a1a', marginBottom: 10, margin: 0 }}>
                    {loc('اختر مبلغ التبرع', 'Choose Donation Amount')}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {[50, 100, 200, 500, 1000].map(a => {
                        const active = amount === a;
                        return (
                            <button key={a} onClick={() => setAmount(a)} style={{
                                borderRadius: '10px', fontWeight: 700, fontSize: '0.78rem',
                                padding: '4px 10px', minWidth: 0, fontFamily: LATIN_FONT,
                                border: `1.5px solid ${active ? G_GREEN : (isDark ? 'rgba(255,255,255,0.12)' : '#e2e8f0')}`,
                                color: active ? '#fff' : (isDark ? DARK_TEXT : '#555'),
                                backgroundColor: active ? G_GREEN : 'transparent',
                                boxShadow: active ? `0 3px 12px rgba(0,177,106,0.3)` : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                            }}>
                                {a} {loc('ج.م', 'EGP')}
                            </button>
                        );
                    })}
                </div>

                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 12, marginBottom: 16, padding: '8px 10px',
                    borderRadius: '16px',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafb',
                    border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eef2f7'}`,
                }}>
                    <button onClick={() => setAmount(Math.max(AMOUNT_STEP, amount - AMOUNT_STEP))} style={{
                        width: 38, height: 38, borderRadius: '10px',
                        border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#e0e0e0'}`,
                        backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                        color: isDark ? DARK_TEXT : '#555',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}>
                        <i className="fa-solid fa-minus" style={{ fontSize: '0.7rem' }} />
                    </button>

                    <div style={{ textAlign: 'center', minWidth: 90 }}>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => {
                                const v = parseInt(e.target.value) || 0;
                                setAmount(Math.max(0, v));
                            }}
                            style={{
                                border: 'none', outline: 'none', background: 'transparent',
                                fontFamily: LATIN_FONT, fontWeight: 800, fontSize: '1.4rem',
                                color: G_GREEN, textAlign: 'center', width: '100%',
                                direction: 'ltr', padding: 0,
                            }}
                        />
                        <p style={{
                            fontFamily: font, fontWeight: 500, fontSize: '0.65rem',
                            color: isDark ? 'rgba(226,232,240,0.4)' : '#aaa', marginTop: -3, margin: 0,
                        }}>
                            {loc('جنية مصري', 'EGP')}
                        </p>
                    </div>

                    <button onClick={() => setAmount(amount + AMOUNT_STEP)} style={{
                        width: 38, height: 38, borderRadius: '10px',
                        border: `1.5px solid ${isDark ? 'rgba(0,177,106,0.3)' : '#d1f2e4'}`,
                        backgroundColor: isDark ? 'rgba(0,177,106,0.08)' : '#f0faf5',
                        color: G_GREEN,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}>
                        <i className="fa-solid fa-plus" style={{ fontSize: '0.7rem' }} />
                    </button>
                </div>

                <button onClick={onDonate} style={{
                    width: '100%', borderRadius: '14px', paddingTop: 10, paddingBottom: 10,
                    fontWeight: 800, fontSize: '0.95rem', fontFamily: font,
                    backgroundColor: G_GREEN, color: '#fff', border: 'none', cursor: 'pointer',
                    boxShadow: `0 6px 24px rgba(0,177,106,0.35)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 12,
                }}>
                    <i className="fa-solid fa-heart" style={{ marginInlineEnd: 8, fontSize: '0.85rem' }} />
                    {loc('تبرع الآن', 'Donate Now')}
                    <span style={{
                        backgroundColor: 'rgba(255,255,255,0.20)', borderRadius: '10px',
                        padding: '2px 10px', fontWeight: 800, fontSize: '0.8rem',
                        display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 8,
                    }}>
                        {formatNumber(amount)}
                        <span style={{ fontFamily: font, fontWeight: 500, fontSize: '0.55rem', opacity: 0.85 }}>
                            {loc('ج.م', 'EGP')}
                        </span>
                    </span>
                </button>

                <button onClick={() => navigator.share?.({ title, url: window.location.href })} style={{
                    width: '100%', borderRadius: '12px', paddingTop: 7, paddingBottom: 7,
                    fontWeight: 600, fontSize: '0.85rem', fontFamily: font,
                    color: isDark ? 'rgba(226,232,240,0.7)' : '#6b7280',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eef2f7'}`,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#fafbfc',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <i className="fa-solid fa-share-nodes" style={{ marginInlineEnd: 8, fontSize: '0.8rem' }} />
                    {loc('مشاركة الحملة', 'Share Campaign')}
                </button>
            </div>
        </div>
    );
}
