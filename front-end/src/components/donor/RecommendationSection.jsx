import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { donationCategories } from '../../data/mockData';
import { aiRecommend } from '../../api/ai.api';

import { useInjectStyles } from '../../utils/injectStyles';
const GREEN = '#00b16a';
const GREEN_DK = '#009659';

const projectsData = donationCategories.flatMap(cat =>
    cat.items.map(item => ({
        title: item.title,
        category: cat.name,
        price: item.price,
        description: `تبرع بقيمة ${item.price} ج.م لـ ${item.title}`,
    }))
);

const recommendationStyles = `@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`;

function RecommendationSection() {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    useInjectStyles(recommendationStyles, 'recommendation-styles');
    const [interest, setInterest] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState('');

    const handleRecommend = async () => {
        const q = interest.trim();
        if (!q || loading) return;
        setLoading(true);
        setError('');
        setRecommendations([]);
        setDone(false);

        try {
            const data = await aiRecommend(q, projectsData);
            setRecommendations(data.recommendations || []);
            setDone(true);
        } catch (err) {
            setError(err.message?.includes('API')
                ? err.message
                : 'عذراً، حدث خطأ. تأكد من تشغيل الخادم الخلفي.');
            setDone(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="py-6 md:py-10" style={{
                background: isDark
                    ? 'linear-gradient(180deg, #04100e 0%, #0a1f1c 50%, #04100e 100%)'
                    : 'linear-gradient(135deg, #f0faf5 0%, #e8f5ef 50%, #f0faf5 100%)',
            }}>
                <div className="max-w-[768px] mx-auto px-4 md:px-6">
                    <div className="text-center mb-4">
                        <span className="inline-block px-[4px] py-[2px] rounded-[6px] text-white font-extrabold text-[0.7rem] mb-1.5" style={{
                            backgroundColor: GREEN,
                            fontFamily: "'Cairo', 'Tajawal', sans-serif",
                        }}>
                            AI
                        </span>
                        <h3 className="font-black text-[1.4rem] md:text-[1.8rem] mb-1" style={{
                            color: isDark ? '#f1f5f9' : '#0d2b2a',
                            fontFamily: "'Cairo', 'Tajawal', sans-serif",
                        }}>
                            التوصيات الذكية
                        </h3>
                        <p className="text-[0.85rem] md:text-[0.95rem]" style={{
                            color: isDark ? '#94a3b8' : '#5a7a78',
                            fontFamily: "'Cairo', 'Tajawal', sans-serif",
                        }}>
                            أخبرنا عن اهتمامك وسنرشح لك المشاريع الأنسب
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1.5 items-center max-w-[600px] mx-auto mb-4">
                        <input
                            placeholder="مثال: عايز أساعد أطفال يتامى"
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleRecommend(); }}
                            disabled={loading}
                            dir="rtl"
                            className="w-full px-3 py-1.5 rounded-[14px] border bg-transparent text-inherit focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            style={{
                                fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                fontSize: '0.9rem',
                                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,177,106,0.15)',
                                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = GREEN; }}
                            onBlur={e => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,177,106,0.15)'; }}
                        />
                        <button
                            onClick={handleRecommend}
                            disabled={loading || !interest.trim()}
                            className="rounded-[14px] py-1.2 sm:py-1.5 px-3 sm:px-4 font-bold text-[0.9rem] text-white transition-all w-full sm:w-auto"
                            style={{
                                fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                backgroundColor: loading || !interest.trim() ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,177,106,0.1)') : GREEN,
                                boxShadow: loading || !interest.trim() ? 'none' : `0 4px 16px rgba(0,177,106,0.25)`,
                                cursor: loading || !interest.trim() ? 'not-allowed' : 'pointer',
                            }}
                            onMouseEnter={e => { if (!loading && interest.trim()) { e.currentTarget.style.backgroundColor = GREEN_DK; e.currentTarget.style.boxShadow = `0 6px 24px rgba(0,177,106,0.35)`; }}}
                            onMouseLeave={e => { if (!loading && interest.trim()) { e.currentTarget.style.backgroundColor = GREEN; e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,177,106,0.25)`; }}}
                        >
                            {loading ? (
                                <span className="flex items-center gap-1">
                                    <span className="inline-block w-[18px] h-[18px] rounded-full border-2" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite' }} />
                                    جاري التحليل...
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <i className="fa-solid fa-wand-magic-sparkles" />
                                    ابحث
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Results */}
                    {recommendations.length > 0 && (
                        <div className="flex flex-col gap-2" style={{ animation: 'fadeUp 0.5s ease both' }}>
                            <div className="flex items-center gap-1 mb-1">
                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: GREEN }} />
                                <p className="font-bold text-[0.95rem]" style={{
                                    fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                    color: isDark ? '#e2e8f0' : '#2d3436',
                                }}>
                                    التوصيات المقترحة لك
                                </p>
                            </div>

                            {recommendations.map((item, idx) => (
                                <div key={idx}
                                    className="p-2 rounded-[16px] flex items-center gap-2 transition-all"
                                    style={{
                                        backgroundColor: isDark ? '#1e293b' : '#ffffff',
                                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,177,106,0.1)'}`,
                                        animation: `fadeUp 0.4s ease both ${idx * 0.1}s`,
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,177,106,0.1)`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                                >
                                    <div className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center" style={{
                                        background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DK})`,
                                    }}>
                                        <i className="fa-solid fa-star" style={{ color: '#fff', fontSize: '1rem' }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-[0.88rem] mb-0.3" style={{
                                            fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                            color: isDark ? '#e2e8f0' : '#2d3436',
                                        }}>
                                            {item.title}
                                        </p>
                                        <p className="text-[0.75rem] mb-0.5" style={{
                                            fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                            color: isDark ? '#94a3b8' : '#5a7a78',
                                        }}>
                                            {item.reason || item.category}
                                        </p>
                                        {item.price && (
                                            <div className="flex items-center gap-0.5">
                                                <i className="fa-solid fa-coins" style={{ fontSize: '0.7rem', color: GREEN }} />
                                                <span className="font-bold text-[0.82rem]" style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif", color: GREEN }}>
                                                    {item.price.toLocaleString()} ج.م
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => navigate(`/donate?amount=${item.price || 0}`)}
                                        className="px-2 py-1 rounded-[10px] font-bold text-[0.75rem] text-white shrink-0 min-w-[80px]"
                                        style={{
                                            fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                            backgroundColor: GREEN,
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = GREEN_DK; }}
                                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = GREEN; }}
                                    >
                                        تبرع
                                    </button>
                                </div>
                            ))}

                            <div className="text-center mt-2">
                                <button
                                    onClick={() => { setInterest(''); setRecommendations([]); setDone(false); }}
                                    className="text-[0.8rem] transition-colors"
                                    style={{
                                        fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                        color: isDark ? '#94a3b8' : '#5a7a78',
                                    }}
                                >
                                    <i className="fa-solid fa-arrow-rotate-left ml-0.5" />
                                    تجربة بحث آخر
                                </button>
                            </div>
                        </div>
                    )}

                    {done && recommendations.length === 0 && !error && (
                        <div className="text-center py-4" style={{ animation: 'fadeUp 0.4s ease both' }}>
                            <i className="fa-solid fa-search" style={{ fontSize: '2rem', color: 'rgba(0,177,106,0.4)', marginBottom: '0.25rem' }} />
                            <p className="text-[0.9rem]" style={{
                                fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                color: isDark ? '#94a3b8' : '#5a7a78',
                            }}>
                                لم نجد مشاريع تطابق اهتمامك. جرب صياغة مختلفة.
                            </p>
                            <button
                                onClick={() => { setInterest(''); setRecommendations([]); setDone(false); }}
                                className="mt-1.5 text-sm transition-colors"
                                style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif", color: GREEN }}
                            >
                                جرب مرة أخرى
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-3" style={{ animation: 'fadeUp 0.4s ease both' }}>
                            <p className="text-[0.85rem]" style={{
                                fontFamily: "'Cairo', 'Tajawal', sans-serif",
                                color: '#ef4444',
                            }}>
                                {error}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default RecommendationSection;
