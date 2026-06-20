import { categoryColors } from '../../data/mockData';

const ARABIC_FONT = "'Cairo', 'Tajawal', sans-serif";
const GREEN = '#00b16a';

function RelatedItems({ related, category, isDark, navigate }) {
    if (related.length === 0) return null;

    return (
        <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ width: 4, height: 20, borderRadius: 2, background: `linear-gradient(180deg, ${GREEN}, #10b981)` }} />
                <p style={{
                    fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.95rem',
                    color: isDark ? '#f8fafc' : '#1a1a1a', margin: 0,
                }}>
                    مشاريع أخرى في {category.name}
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" style={{ direction: 'rtl' }}>
                {related.slice(0, 6).map((relItem) => {
                    const relColors = categoryColors[category.id] || ['#e8f5e9', '#4caf50'];
                    return (
                        <div key={relItem.id}
                            onClick={() => navigate(`/donate/${category.id}/${relItem.id}`)}
                            style={{
                                borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                                backgroundColor: isDark ? '#1e293b' : '#fff',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,177,106,0.12)'}`,
                                boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.2)' : '0 2px 12px rgba(0,177,106,0.05)',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,177,106,0.15)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                        >
                            <div style={{
                                background: `linear-gradient(135deg, ${relColors[0]} 0%, ${relColors[1]} 100%)`,
                                padding: '14px 0', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            }}>
                                <i className={category.icon} style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,0.7)' }} />
                            </div>
                            <div style={{ padding: '10px 12px', textAlign: 'center' }}>
                                <p style={{
                                    fontFamily: ARABIC_FONT, fontWeight: 700, fontSize: '0.78rem',
                                    color: isDark ? '#e2e8f0' : '#2d3436', margin: '0 0 6px',
                                    lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {relItem.title}
                                </p>
                                <p style={{
                                    fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '0.85rem',
                                    color: GREEN, margin: 0,
                                }}>
                                    {relItem.price.toLocaleString()} <span style={{ fontFamily: ARABIC_FONT, fontWeight: 600, fontSize: '0.6rem' }}>ج.م</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RelatedItems;
