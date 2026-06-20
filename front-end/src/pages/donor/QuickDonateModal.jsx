import useQuickDonate from '../../hooks/useQuickDonate';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency, formatNumber, getLanguage } from '../../i18n';

const G_GREEN = '#00b16a';
const EMERALD_DK = '#059669';
const TEAL = '#1a4a44';
const TEAL_MID = '#112e2a';
const ARABIC_FONT = "'Cairo', 'Tajawal', sans-serif";
const LATIN_FONT = "'Inter', 'Manrope', sans-serif";
const DARK_HEAD = '#f8fafc';
const DARK_TEXT = '#e2e8f0';

const loc = (ar, en) => (getLanguage() === 'en' ? (en || ar) : ar);

function QuickDonateModal({ open, onClose, project }) {
    const { isDark } = useTheme();
    const {
        step, quantity, setQuantity, name, setName, phone, setPhone,
        selectedWallet, setSelectedWallet, walletPhone, setWalletPhone,
        cardNumber, setCardNumber, cardExpiry, setCardExpiry, cardCvv, setCardCvv,
        cardHolder, setCardHolder, errors, amount, total,
        submitDonation, handleClose, validateCard, validateWallet,
        goToMethod, goBack, title, stepTitles, WALLETS,
    } = useQuickDonate({ open, onClose, project });

    if (!project) return null;
    if (!open) return null;

    const inputBase = 'w-full px-3 py-2.5 border rounded-xl bg-transparent focus:ring-2 outline-none transition-all duration-300 text-sm';
    const inputBorder = isDark ? 'border-white/10' : 'border-neutral-200';
    const inputFocus = 'focus:ring-[#00b16a] focus:border-[#00b16a]';
    const fieldStyle = {
        fontFamily: ARABIC_FONT,
        backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#fafafa',
        borderColor: isDark ? 'rgba(255,255,255,0.10)' : '#e0e0e0',
        borderRadius: '12px',
        transition: 'border-color 0.4s ease',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ direction: 'rtl' }}>
            <div className="fixed inset-0 bg-black/50" style={{ backdropFilter: 'blur(6px)' }} onClick={handleClose}></div>
            <div className="relative bg-white dark:bg-[#1e293b] rounded-3xl shadow-modal max-w-sm w-full mx-4 max-h-[85vh] overflow-y-auto">
                <div style={{
                    background: step === 'success'
                        ? `linear-gradient(135deg, ${G_GREEN} 0%, ${EMERALD_DK} 100%)`
                        : `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_MID} 100%)`,
                    padding: '12px 16px', transition: 'background 0.4s ease',
                }}>
                    <div className="flex items-center justify-between mb-1">
                        {step !== 'info' && step !== 'success' ? (
                            <button onClick={goBack} className="p-1.5 rounded-md text-white/80 bg-white/15 hover:bg-white/30 transition-all" style={{ width: 32, height: 32 }}>
                                <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8rem' }} />
                            </button>
                        ) : (
                            <div style={{ width: 32 }} />
                        )}
                        <button onClick={handleClose} className="p-1.5 rounded-md text-white bg-white/15 hover:bg-white/30 transition-all" style={{ width: 32, height: 32 }}>
                            <i className="fa-solid fa-xmark" style={{ fontSize: '0.9rem' }} />
                        </button>
                    </div>
                    <p style={{ color: '#fff', fontFamily: ARABIC_FONT, fontWeight: 800, fontSize: '1.1rem', marginBottom: 3 }}>
                        {stepTitles[step]}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: ARABIC_FONT, fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {step === 'success' ? loc('شكراً لتبرعك', 'Thank you for your donation') : title}
                    </p>
                </div>

                <div className="p-5">
                    {step === 'info' && (
                        <>
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                marginBottom: 20, padding: '10px 12px', borderRadius: '16px',
                                backgroundColor: isDark ? 'rgba(0,177,106,0.08)' : '#f0faf5',
                                border: `1.5px solid ${isDark ? 'rgba(0,177,106,0.20)' : '#d1f2e4'}`,
                            }}>
                                <i className="fa-solid fa-coins" style={{ fontSize: '1.2rem', color: G_GREEN }} />
                                <span style={{ fontFamily: ARABIC_FONT, fontWeight: 800, fontSize: '1.4rem', color: G_GREEN }}>
                                    {formatNumber(amount)}
                                </span>
                                <span style={{ fontFamily: ARABIC_FONT, fontWeight: 500, fontSize: '0.75rem', color: isDark ? 'rgba(226,232,240,0.5)' : '#636e72' }}>
                                    {loc('جنية مصري', 'EGP')}
                                </span>
                            </div>

                            <p style={{ fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.85rem', color: isDark ? DARK_HEAD : '#2d3436', marginBottom: 8 }}>
                                {loc('الكمية', 'Quantity')}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{
                                    width: 40, height: 40, borderRadius: '12px', border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#e0e0e0'}`,
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#fafafa', color: isDark ? DARK_TEXT : '#333',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                }}>
                                    <i className="fa-solid fa-minus" style={{ fontSize: '0.8rem' }} />
                                </button>
                                <span style={{ fontFamily: LATIN_FONT, fontWeight: 800, fontSize: '1.5rem', color: isDark ? DARK_HEAD : '#2d3436', minWidth: 50, textAlign: 'center' }}>
                                    {quantity}
                                </span>
                                <button onClick={() => setQuantity(quantity + 1)} style={{
                                    width: 40, height: 40, borderRadius: '12px',
                                    border: `1.5px solid ${isDark ? 'rgba(0,177,106,0.30)' : '#d1f2e4'}`,
                                    backgroundColor: isDark ? 'rgba(0,177,106,0.08)' : '#f0faf5', color: G_GREEN,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                }}>
                                    <i className="fa-solid fa-plus" style={{ fontSize: '0.8rem' }} />
                                </button>
                            </div>

                            <p style={{ fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.85rem', color: isDark ? DARK_HEAD : '#2d3436', marginBottom: 8 }}>
                                {loc('بيانات التواصل', 'Contact Information')}
                            </p>
                            <div style={{ marginBottom: 12 }}>
                                <div className="relative">
                                    <i className="fa-solid fa-user absolute top-1/2 -translate-y-1/2 right-3" style={{ fontSize: '0.8rem', color: G_GREEN }}></i>
                                    <input placeholder={loc('الاسم الكامل', 'Full Name')} value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`${inputBase} ${inputBorder} ${inputFocus} pr-9`} style={fieldStyle}
                                    />
                                </div>
                                {errors.name && <p className="text-error-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <div className="relative">
                                    <i className="fa-solid fa-phone absolute top-1/2 -translate-y-1/2 right-3" style={{ fontSize: '0.8rem', color: G_GREEN }}></i>
                                    <input placeholder={loc('رقم الهاتف', 'Phone Number')} value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={`${inputBase} ${inputBorder} ${inputFocus} pr-9`} style={fieldStyle}
                                    />
                                </div>
                                {errors.phone && <p className="text-error-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <button onClick={goToMethod}
                                style={{
                                    width: '100%', borderRadius: '14px', paddingTop: 11, paddingBottom: 11,
                                    fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.95rem',
                                    backgroundColor: G_GREEN, color: '#fff', border: 'none', cursor: 'pointer',
                                    boxShadow: `0 6px 20px rgba(0,177,106,0.35)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <span>{loc('اختار طريقة الدفع', 'Choose Payment Method')}</span>
                                <span style={{ backgroundColor: 'rgba(255,255,255,0.20)', borderRadius: '10px', padding: '2px 10px', fontWeight: 800, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                    {formatNumber(total)}
                                    <span style={{ fontFamily: ARABIC_FONT, fontWeight: 500, fontSize: '0.6rem', opacity: 0.85 }}>
                                        {loc('جنية مصري', 'EGP')}
                                    </span>
                                </span>
                            </button>
                        </>
                    )}

                    {step === 'method' && (
                        <>
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                marginBottom: 20, padding: '6px 12px', borderRadius: '12px',
                                backgroundColor: isDark ? 'rgba(0,177,106,0.06)' : '#f5fcf8',
                                border: `1px solid ${isDark ? 'rgba(0,177,106,0.15)' : '#e0f5ec'}`,
                            }}>
                                <span style={{ fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.85rem', color: isDark ? DARK_TEXT : '#555' }}>
                                    {loc('المبلغ الإجمالي:', 'Total:')}
                                </span>
                                <span style={{ fontFamily: ARABIC_FONT, fontWeight: 800, fontSize: '1.1rem', color: G_GREEN }}>
                                    {formatNumber(total)}
                                </span>
                                <span style={{ fontFamily: ARABIC_FONT, fontWeight: 500, fontSize: '0.65rem', color: isDark ? 'rgba(226,232,240,0.5)' : '#888' }}>
                                    {loc('جنية مصري', 'EGP')}
                                </span>
                            </div>

                            <div onClick={() => setStep('card')} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                                marginBottom: 12, borderRadius: '16px', cursor: 'pointer',
                                border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#e8e8e8'}`,
                                backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
                                transition: 'all 0.25s ease',
                            }} className="hover:border-[#00b16a] hover:bg-[#00b16a]/5 hover:-translate-y-0.5">
                                <div style={{ width: 52, height: 52, borderRadius: '14px', flexShrink: 0, background: 'linear-gradient(135deg, #1a237e, #283593)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="fa-solid fa-credit-card" style={{ fontSize: '1.3rem', color: '#fff' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.95rem', color: isDark ? DARK_HEAD : '#2d3436' }}>
                                        {loc('بطاقة بنكية', 'Bank Card')}
                                    </p>
                                    <p style={{ fontFamily: ARABIC_FONT, fontSize: '0.72rem', color: isDark ? 'rgba(226,232,240,0.5)' : '#888' }}>
                                        {loc('فيزا، ماستركارد، ميزة', 'Visa, Mastercard, Meeza')}
                                    </p>
                                </div>
                                <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.75rem', color: isDark ? 'rgba(226,232,240,0.3)' : '#bbb' }} />
                            </div>

                            <div onClick={() => setStep('wallet')} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                                borderRadius: '16px', cursor: 'pointer',
                                border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#e8e8e8'}`,
                                backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
                                transition: 'all 0.25s ease',
                            }} className="hover:border-[#00b16a] hover:bg-[#00b16a]/5 hover:-translate-y-0.5">
                                <div style={{ width: 52, height: 52, borderRadius: '14px', flexShrink: 0, background: 'linear-gradient(135deg, #e65100, #f57c00)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="fa-solid fa-wallet" style={{ fontSize: '1.3rem', color: '#fff' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.95rem', color: isDark ? DARK_HEAD : '#2d3436' }}>
                                        {loc('المحفظة الإلكترونية', 'Mobile Wallet')}
                                    </p>
                                    <p style={{ fontFamily: ARABIC_FONT, fontSize: '0.72rem', color: isDark ? 'rgba(226,232,240,0.5)' : '#888' }}>
                                        {loc('فودافون، أورانج، اتصالات، وي', 'Vodafone, Orange, Etisalat, WE')}
                                    </p>
                                </div>
                                <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.75rem', color: isDark ? 'rgba(226,232,240,0.3)' : '#bbb' }} />
                            </div>
                        </>
                    )}

                    {step === 'card' && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
                                {['fa-cc-visa', 'fa-cc-mastercard', 'fa-cc-amex'].map((icon) => (
                                    <i key={icon} className={`fa-brands ${icon}`} style={{ fontSize: '2rem', color: isDark ? 'rgba(226,232,240,0.5)' : '#999' }} />
                                ))}
                            </div>

                            <div style={{ marginBottom: 12 }}>
                                <div className="relative">
                                    <i className="fa-solid fa-user absolute top-1/2 -translate-y-1/2 right-3" style={{ fontSize: '0.8rem', color: '#1a237e' }}></i>
                                    <input placeholder={loc('اسم حامل البطاقة', 'Cardholder Name')} value={cardHolder}
                                        onChange={(e) => setCardHolder(e.target.value)}
                                        className={`${inputBase} ${inputBorder} ${inputFocus} pr-9`} style={fieldStyle}
                                    />
                                </div>
                                {errors.cardHolder && <p className="text-error-500 text-xs mt-1">{errors.cardHolder}</p>}
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div className="relative">
                                    <i className="fa-solid fa-credit-card absolute top-1/2 -translate-y-1/2 right-3" style={{ fontSize: '0.8rem', color: '#1a237e' }}></i>
                                    <input placeholder={loc('رقم البطاقة', 'Card Number')} value={cardNumber}
                                        onChange={(e) => {
                                            const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                                            setCardNumber(v.replace(/(.{4})/g, '$1 ').trim());
                                        }}
                                        className={`${inputBase} ${inputBorder} ${inputFocus} pr-9`}
                                        style={{ ...fieldStyle, letterSpacing: '0.15em', fontFamily: LATIN_FONT, direction: 'ltr' }}
                                    />
                                </div>
                                {errors.cardNumber && <p className="text-error-500 text-xs mt-1">{errors.cardNumber}</p>}
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div style={{ flex: 1 }}>
                                    <input placeholder="MM/YY" value={cardExpiry}
                                        onChange={(e) => {
                                            let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                            if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
                                            setCardExpiry(v);
                                        }}
                                        className={`${inputBase} ${inputBorder} ${inputFocus} text-center`}
                                        style={{ ...fieldStyle, fontFamily: LATIN_FONT, direction: 'ltr' }}
                                    />
                                    {errors.cardExpiry && <p className="text-error-500 text-xs mt-1">{errors.cardExpiry}</p>}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input placeholder="CVV" value={cardCvv}
                                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                        type="password"
                                        className={`${inputBase} ${inputBorder} ${inputFocus} text-center`}
                                        style={{ ...fieldStyle, fontFamily: LATIN_FONT, direction: 'ltr' }}
                                    />
                                    {errors.cardCvv && <p className="text-error-500 text-xs mt-1">{errors.cardCvv}</p>}
                                </div>
                            </div>

                            <button onClick={() => { if (validateCard()) submitDonation('بطاقة ائتمان'); }}
                                style={{
                                    width: '100%', marginTop: 8, borderRadius: '14px', paddingTop: 11, paddingBottom: 11,
                                    fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.95rem',
                                    backgroundColor: '#1a237e', color: '#fff', border: 'none', cursor: 'pointer',
                                    boxShadow: '0 6px 20px rgba(26,35,126,0.30)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <i className="fa-solid fa-lock" style={{ fontSize: '0.8rem' }} />
                                <span>{loc('ادفع الآن', 'Pay Now')}</span>
                                <span style={{ backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '10px', padding: '2px 10px', fontWeight: 800, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                    {formatNumber(total)}
                                    <span style={{ fontFamily: ARABIC_FONT, fontWeight: 500, fontSize: '0.6rem', opacity: 0.85 }}>
                                        {loc('جنية مصري', 'EGP')}
                                    </span>
                                </span>
                            </button>
                        </>
                    )}

                    {step === 'wallet' && (
                        <>
                            <p style={{ fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.85rem', color: isDark ? DARK_HEAD : '#2d3436', marginBottom: 12 }}>
                                {loc('اختر المحفظة', 'Select Wallet')}
                            </p>
                            {errors.wallet && <p className="text-error-500 text-xs mb-1">{errors.wallet}</p>}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                                {WALLETS.map((w) => {
                                    const sel = selectedWallet === w.id;
                                    return (
                                        <div key={w.id} onClick={() => { setSelectedWallet(w.id); }} style={{
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                                            padding: '10px 8px', borderRadius: '14px', cursor: 'pointer',
                                            border: `2px solid ${sel ? w.color : (isDark ? 'rgba(255,255,255,0.08)' : '#e8e8e8')}`,
                                            backgroundColor: sel ? (isDark ? `${w.color}1f` : `${w.color}0f`) : (isDark ? 'rgba(255,255,255,0.02)' : '#fff'),
                                        }}>
                                            <img src={w.logoUrl} alt={w.nameEn} style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: '8px' }}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                            <span style={{ fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.72rem', color: sel ? w.color : (isDark ? DARK_TEXT : '#555'), textAlign: 'center' }}>
                                                {loc(w.name, w.nameEn)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <p style={{ fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.85rem', color: isDark ? DARK_HEAD : '#2d3436', marginBottom: 8 }}>
                                {loc('رقم المحفظة', 'Wallet Number')}
                            </p>
                            <div className="relative" style={{ marginBottom: 20 }}>
                                <i className="fa-solid fa-mobile-screen absolute top-1/2 -translate-y-1/2 right-3" style={{ fontSize: '0.9rem', color: selectedWallet ? WALLETS.find(w => w.id === selectedWallet)?.color : G_GREEN }}></i>
                                <input placeholder={loc('مثال: 01xxxxxxxxx', 'e.g. 01xxxxxxxxx')} value={walletPhone}
                                    onChange={(e) => setWalletPhone(e.target.value)}
                                    className={`${inputBase} ${inputBorder} ${inputFocus} pr-9`}
                                    style={{ ...fieldStyle, fontFamily: LATIN_FONT, direction: 'ltr' }}
                                />
                                {errors.walletPhone && <p className="text-error-500 text-xs mt-1">{errors.walletPhone}</p>}
                            </div>

                            <button onClick={() => { if (validateWallet()) submitDonation(loc(WALLETS.find(w => w.id === selectedWallet)?.name || 'محفظة إلكترونية', WALLETS.find(w => w.id === selectedWallet)?.nameEn || 'Mobile Wallet')); }}
                                style={{
                                    width: '100%', borderRadius: '14px', paddingTop: 11, paddingBottom: 11,
                                    fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.95rem',
                                    backgroundColor: selectedWallet ? WALLETS.find(w => w.id === selectedWallet)?.color : G_GREEN,
                                    color: '#fff', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <i className="fa-solid fa-paper-plane" style={{ fontSize: '0.8rem' }} />
                                <span>{loc('تأكيد الدفع', 'Confirm Payment')}</span>
                                <span style={{ backgroundColor: 'rgba(255,255,255,0.20)', borderRadius: '10px', padding: '2px 10px', fontWeight: 800, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                    {formatNumber(total)}
                                    <span style={{ fontFamily: ARABIC_FONT, fontWeight: 500, fontSize: '0.6rem', opacity: 0.85 }}>
                                        {loc('جنية مصري', 'EGP')}
                                    </span>
                                </span>
                            </button>
                        </>
                    )}

                    {step === 'success' && (
                        <div style={{ textAlign: 'center', paddingTop: 8, paddingBottom: 8 }}>
                            <div style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px', backgroundColor: 'rgba(0,177,106,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa-solid fa-check" style={{ fontSize: '2rem', color: G_GREEN }} />
                            </div>
                            <p style={{ fontFamily: ARABIC_FONT, fontWeight: 800, fontSize: '1.2rem', color: isDark ? DARK_HEAD : '#2d3436', marginBottom: 8 }}>
                                {loc('تم استلام تبرعك', 'Donation Received')}
                            </p>
                            <p style={{ fontFamily: ARABIC_FONT, fontSize: '0.85rem', color: isDark ? 'rgba(226,232,240,0.65)' : '#636e72', marginBottom: 4, lineHeight: 1.7 }}>
                                {loc('شكراً لك يا', 'Thank you,')} <strong>{name}</strong>
                            </p>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                backgroundColor: isDark ? 'rgba(0,177,106,0.10)' : '#f0faf5',
                                border: `1px solid ${isDark ? 'rgba(0,177,106,0.20)' : '#d1f2e4'}`,
                                borderRadius: '12px', padding: '6px 14px', marginBottom: 20,
                            }}>
                                <span style={{ fontFamily: ARABIC_FONT, fontWeight: 800, fontSize: '1.2rem', color: G_GREEN }}>
                                    {formatNumber(total)}
                                </span>
                                <span style={{ fontFamily: ARABIC_FONT, fontWeight: 500, fontSize: '0.7rem', color: isDark ? 'rgba(226,232,240,0.5)' : '#636e72' }}>
                                    {loc('جنية مصري', 'EGP')}
                                </span>
                            </div>
                            <button onClick={handleClose} style={{
                                borderRadius: '14px', padding: '10px 28px', fontFamily: ARABIC_FONT, fontWeight: 700,
                                fontSize: '0.9rem', backgroundColor: G_GREEN, color: '#fff', border: 'none', cursor: 'pointer',
                                boxShadow: `0 6px 20px rgba(0,177,106,0.35)`,
                            }}>
                                {loc('إغلاق', 'Close')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuickDonateModal;
