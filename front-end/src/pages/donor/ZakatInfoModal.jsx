import ZakatModalSection from './ZakatModalSection';
import ZakatFormulaBox from './ZakatFormulaBox';
import ZakatCropRateRow from './ZakatCropRateRow';

const DARK_CARD = '#1e293b';
const DARK_HEAD = '#f8fafc';
const DARK_TEXT = '#e2e8f0';
const LATIN_FONT = "'Inter', 'Manrope', sans-serif";

function ZakatInfoModal({ show, onClose, dk, font, dir, nisab, formatCurrency, loc }) {
    if (!show) return null;

    const G_GREEN = '#00b16a';
    const G_GREEN_DK = '#009659';
    const TEAL = '#1a4a44';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="relative rounded-xl max-w-lg w-full mx-4 max-h-[85vh] overflow-y-auto" style={{
                direction: dir,
                backgroundColor: dk ? DARK_CARD : '#fff',
                border: `1px solid ${dk ? 'rgba(255,255,255,0.08)' : '#eef2f7'}`,
            }}>
                <div className="flex items-center gap-1.5 p-4 border-b font-extrabold text-[1.1rem]" style={{
                    fontFamily: font,
                    color: dk ? DARK_HEAD : '#1a1a1a',
                    borderColor: dk ? 'rgba(255,255,255,0.06)' : '#f0f4f8',
                }}>
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(0,177,106,0.12)' }}>
                        <i className="fa-solid fa-book-open" style={{ fontSize: '0.9rem', color: G_GREEN }} />
                    </div>
                    {loc('شرح طريقة حساب الزكاة', 'How Zakat is Calculated')}
                </div>
                <div className="p-4 pt-5 pb-1">
                    <ZakatModalSection icon="fa-scale-balanced" color={TEAL}
                        title={loc('النِّصاب (الحد الأدنى)', 'Nisab (Minimum Threshold)')} font={font} dk={dk}>
                        <p className="text-[0.82rem] leading-relaxed" style={{ fontFamily: font, color: dk ? DARK_TEXT : '#555' }}>
                            {loc(
                                'النصاب هو الحد الأدنى من المال الذي تجب فيه الزكاة، ويعادل قيمة 85 جرام من الذهب عيار 24. إذا بلغت أموالك (نقد + ذهب + فضة) هذا الحد وحال عليها الحول، وجبت فيها الزكاة.',
                                'Nisab is the minimum amount of wealth a Muslim must have before Zakat becomes obligatory...'
                            )}
                        </p>
                        <div className="mt-1.5 p-1.5 rounded-[10px] flex justify-between items-center" style={{ backgroundColor: dk ? 'rgba(255,255,255,0.03)' : '#f8faf8' }}>
                            <span className="text-[0.78rem]" style={{ fontFamily: font, color: dk ? 'rgba(226,232,240,0.6)' : '#888' }}>
                                {loc('النصاب الحالي:', 'Current Nisab:')}
                            </span>
                            <span className="font-extrabold text-[0.9rem]" style={{ fontFamily: LATIN_FONT, color: TEAL }}>
                                {formatCurrency(nisab)}
                            </span>
                        </div>
                    </ZakatModalSection>

                    <ZakatModalSection icon="fa-money-bill-wave" color={G_GREEN}
                        title={loc('زكاة النقود والأموال', 'Cash & Savings Zakat')} font={font} dk={dk}>
                        <p className="text-[0.82rem] leading-relaxed" style={{ fontFamily: font, color: dk ? DARK_TEXT : '#555' }}>
                            {loc(
                                'تُحسب بنسبة 2.5% من إجمالي المبالغ النقدية والمدخرات البنكية التي بلغت النصاب وحال عليها الحول.',
                                'Calculated at 2.5% of total cash and bank savings...'
                            )}
                        </p>
                        <ZakatFormulaBox dk={dk} formula={loc('الزكاة = إجمالي النقود × 2.5%', 'Zakat = Total Cash × 2.5%')} font={font} />
                    </ZakatModalSection>

                    <ZakatModalSection icon="fa-coins" color="#f59e0b"
                        title={loc('زكاة الذهب', 'Gold Zakat')} font={font} dk={dk}>
                        <p className="text-[0.82rem] leading-relaxed" style={{ fontFamily: font, color: dk ? DARK_TEXT : '#555' }}>
                            {loc(
                                'تُحسب بنسبة 2.5% من القيمة السوقية الحالية للذهب...',
                                'Calculated at 2.5% of the current market value...'
                            )}
                        </p>
                        <ZakatFormulaBox dk={dk} formula={loc('الزكاة = (الوزن × سعر الجرام) × 2.5%', 'Zakat = (Weight × Price/g) × 2.5%')} font={font} />
                    </ZakatModalSection>

                    <ZakatModalSection icon="fa-medal" color="#94a3b8"
                        title={loc('زكاة الفضة', 'Silver Zakat')} font={font} dk={dk}>
                        <p className="text-[0.82rem] leading-relaxed" style={{ fontFamily: font, color: dk ? DARK_TEXT : '#555' }}>
                            {loc(
                                'تُحسب بنسبة 2.5% من القيمة السوقية الحالية للفضة.',
                                'Calculated at 2.5% of the current market value of silver.'
                            )}
                        </p>
                        <ZakatFormulaBox dk={dk} formula={loc('الزكاة = (الوزن × سعر الجرام) × 2.5%', 'Zakat = (Weight × Price/g) × 2.5%')} font={font} />
                    </ZakatModalSection>

                    <ZakatModalSection icon="fa-wheat-awn" color="#22c55e"
                        title={loc('زكاة الزروع والثمار', 'Agriculture & Crops Zakat')} font={font} dk={dk}>
                        <p className="text-[0.82rem] leading-relaxed mb-1.5" style={{ fontFamily: font, color: dk ? DARK_TEXT : '#555' }}>
                            {loc(
                                'تُحسب حسب طريقة الري...',
                                'Calculated based on the irrigation method...'
                            )}
                        </p>
                        <div className="flex flex-col gap-1">
                            <ZakatCropRateRow icon="fa-cloud-rain" color="#3b82f6" rate="10%"
                                label={loc('ري طبيعي (بالأمطار)', 'Natural (Rain-fed)')}
                                desc={loc('بدون تكلفة ري', 'No irrigation cost')} font={font} dk={dk} />
                            <ZakatCropRateRow icon="fa-droplet" color="#8b5cf6" rate="7.5%"
                                label={loc('ري مشترك', 'Mixed Irrigation')}
                                desc={loc('جزئياً بالأمطار وجزئياً بالآلات', 'Part rain, part machine')} font={font} dk={dk} />
                            <ZakatCropRateRow icon="fa-faucet-drip" color="#f59e0b" rate="5%"
                                label={loc('ري صناعي (بالآلات)', 'Artificial (Machines)')}
                                desc={loc('بتكلفة ري كاملة', 'Full irrigation cost')} font={font} dk={dk} />
                        </div>
                    </ZakatModalSection>
                </div>
                <div className="p-2.5 pt-1.5">
                    <button onClick={onClose}
                        className="w-full rounded-xl font-bold text-white"
                        style={{
                            paddingTop: '1.2rem',
                            paddingBottom: '1.2rem',
                            fontFamily: font,
                            backgroundColor: G_GREEN,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = G_GREEN_DK; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = G_GREEN; }}
                    >
                        {loc('فهمت', 'Got it')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ZakatInfoModal;
