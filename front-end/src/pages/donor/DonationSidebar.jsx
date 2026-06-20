import { useNavigate } from 'react-router-dom';

const ARABIC_FONT = "'Cairo', 'Tajawal', sans-serif";
const GREEN = '#00b16a';
const GREEN_DK = '#009659';

function DonationSidebar({ item, isDark }) {
    const navigate = useNavigate();

    return (
        <div className="lg:flex-[0_0_calc(33.333%-10px)] lg:w-[calc(33.333%-10px)]">
            <div style={{ position: 'sticky', top: 80 }}>
                <div style={{
                    borderRadius: '18px', overflow: 'hidden',
                    backgroundColor: isDark ? '#1e293b' : '#fff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#eef2f7'}`,
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 14px rgba(0,0,0,0.05)',
                }}>
                    <div style={{
                        background: `linear-gradient(135deg, #1a4a44 0%, #0d6b58 100%)`,
                        padding: '16px 18px',
                    }}>
                        <p style={{
                            fontFamily: ARABIC_FONT, fontWeight: 800, fontSize: '0.95rem',
                            color: '#fff', margin: '0 0 4px',
                        }}>
                            تبرع الآن
                        </p>
                        <p style={{
                            fontFamily: ARABIC_FONT, fontSize: '0.73rem',
                            color: 'rgba(255,255,255,0.55)', margin: 0,
                        }}>
                            ساهم في هذا المشروع وكن جزءًا من صناعة الأمل
                        </p>
                    </div>
                    <div style={{ padding: '16px 18px' }}>
                        <div style={{
                            padding: '12px 14px', borderRadius: '14px', marginBottom: 16,
                            backgroundColor: isDark ? 'rgba(0,177,106,0.06)' : 'rgba(0,177,106,0.04)',
                            border: `1.5px dashed rgba(0,177,106,0.3)`,
                            display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: '10px',
                                backgroundColor: 'rgba(0,177,106,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>
                                <i className="fa-solid fa-coins" style={{ fontSize: '0.9rem', color: GREEN }} />
                            </div>
                            <div>
                                <p style={{
                                    fontFamily: ARABIC_FONT, fontWeight: 600, fontSize: '0.75rem',
                                    color: isDark ? 'rgba(226,232,240,0.6)' : '#888', margin: '0 0 2px',
                                }}>
                                    مبلغ التبرع
                                </p>
                                <p style={{
                                    fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.2rem',
                                    color: GREEN, margin: 0,
                                }}>
                                    {item.price.toLocaleString()} <span style={{ fontFamily: ARABIC_FONT, fontWeight: 600, fontSize: '0.7rem' }}>ج.م</span>
                                </p>
                            </div>
                        </div>

                        <button onClick={() => navigate(`/donate?amount=${item.price}`)}
                            style={{
                                width: '100%', borderRadius: '14px', padding: '10px 0',
                                fontWeight: 800, fontSize: '0.95rem', fontFamily: ARABIC_FONT,
                                backgroundColor: GREEN, color: '#fff', border: 'none', cursor: 'pointer',
                                boxShadow: `0 6px 24px rgba(0,177,106,0.35)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = GREEN_DK; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = GREEN; e.currentTarget.style.transform = ''; }}
                        >
                            <i className="fa-solid fa-heart" style={{ fontSize: '0.85rem' }} />
                            تبرع الآن
                        </button>

                        <button onClick={() => navigator.share?.({ title: item.title, url: window.location.href })}
                            style={{
                                width: '100%', borderRadius: '12px', padding: '8px 0', marginTop: 10,
                                fontWeight: 600, fontSize: '0.82rem', fontFamily: ARABIC_FONT,
                                color: isDark ? 'rgba(226,232,240,0.7)' : '#6b7280',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#eef2f7'}`,
                                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#fafbfc',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <i className="fa-solid fa-share-nodes" style={{ fontSize: '0.8rem' }} />
                            مشاركة المشروع
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DonationSidebar;
