import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency, formatNumber, getLanguage } from '../../i18n';
import { useAdminData } from '../../contexts/AdminDataContext';
import QuickDonateModal from './QuickDonateModal';
import { useInjectStyles } from '../../utils/injectStyles';
import CampaignSidebar from './CampaignSidebar';

const G_GREEN = '#00b16a';
const G_GREEN_DK = '#009959';
const EMERALD = '#10b981';
const TEAL = '#1a4a44';
const TEAL_MID = '#0d6b58';
const DARK_BG = '#0f172a';
const DARK_CARD = '#1e293b';
const DARK_TEXT = '#e2e8f0';
const DARK_HEAD = '#f8fafc';
const ARABIC_FONT = "'Cairo', 'Tajawal', sans-serif";
const LATIN_FONT = "'Inter', 'Manrope', sans-serif";
const loc = (ar, en) => (getLanguage() === 'en' ? (en || ar) : ar);

const campaignDetailStyles = `
    @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
`;

export default function CampaignDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const lang = getLanguage() === 'en';

    const [donateProject, setDonateProject] = useState(null);
    const [donationAmount, setDonationAmount] = useState(200);

    useInjectStyles(campaignDetailStyles, 'campaign-detail-styles');
    const { state } = useAdminData();
    const projects = state.projects;
    const programs = state.programs;

    const campaign = projects.find(p => p.id === parseInt(id));
    const program = programs.find(p => p.id === campaign?.programId);

    if (!campaign) {
        return (
            <div className="text-center py-12 min-h-[60vh] flex flex-col items-center justify-center">
                <div style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px', backgroundColor: 'rgba(0,177,106,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fa-solid fa-search" style={{ fontSize: '2rem', color: G_GREEN }} />
                </div>
                <p style={{ fontFamily: ARABIC_FONT, fontWeight: 800, fontSize: '1.3rem', marginBottom: 8, color: isDark ? DARK_HEAD : '#2d3436' }}>
                    {loc('الحملة غير موجودة', 'Campaign not found')}
                </p>
                <Link to="/campaigns" style={{
                    backgroundColor: G_GREEN, borderRadius: '14px', padding: '6px 24px',
                    fontFamily: ARABIC_FONT, fontWeight: 700, color: '#fff', textDecoration: 'none', display: 'inline-block',
                }}>
                    {loc('العودة للحملات', 'Back to Campaigns')}
                </Link>
            </div>
        );
    }

    const title = loc(campaign.title, campaign.titleEn);
    const desc = loc(campaign.description, campaign.descriptionEn);
    const location = loc(campaign.location, campaign.locationEn);
    const programName = loc(program?.name || campaign.program, program?.nameEn || campaign.programEn);
    const pct = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
    const font = lang ? LATIN_FONT : ARABIC_FONT;
    const dir = lang ? 'ltr' : 'rtl';

    return (
        <div style={{ minHeight: '100vh', backgroundColor: isDark ? DARK_BG : '#f5f7f9' }}>
            <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(12px, 2vw, 24px) 16px' }}>
                <div style={{
                    display: 'flex', flexDirection: 'column',
                    gap: 14, alignItems: 'flex-start',
                }}
                    className="md:flex-row"
                >
                    <div style={{
                        flex: '1 1 auto', width: '100%',
                        animation: 'slideUp 0.5s ease both',
                        direction: dir,
                    }}
                        className="md:flex-[0_0_calc(66.666%-14px)] md:w-[calc(66.666%-14px)]"
                    >
                        <button onClick={() => navigate('/campaigns')} style={{
                            marginBottom: 8, fontFamily: font, fontWeight: 600, fontSize: '0.82rem',
                            color: isDark ? 'rgba(226,232,240,0.7)' : '#777',
                            borderRadius: '10px', padding: '3px 10px',
                            display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none',
                            backgroundColor: 'transparent', cursor: 'pointer',
                        }}
                            className="hover:bg-white/5 dark:hover:bg-white/5"
                        >
                            {lang && <i className="fa-solid fa-arrow-left" style={{ fontSize: '0.65rem' }} />}
                            {loc('العودة للحملات', 'Back to Campaigns')}
                            {!lang && <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.65rem' }} />}
                        </button>

                        <div style={{
                            borderRadius: '20px', overflow: 'hidden', marginBottom: 20,
                            position: 'relative', height: 240,
                            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.08)',
                        }} className="md:h-[340px]">
                            <img
                                src={campaign.image}
                                alt={title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=500&fit=crop';
                                }}
                            />
                            <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <span style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', borderRadius: '10px', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <i className="fa-solid fa-location-dot" style={{ color: '#fff', fontSize: '0.65rem' }} />
                                    <span style={{ color: '#fff', fontSize: '0.75rem', fontFamily: font, fontWeight: 600 }}>{location}</span>
                                </span>
                                <span style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', borderRadius: '10px', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <i className="fa-solid fa-users" style={{ color: '#fff', fontSize: '0.65rem' }} />
                                    <span style={{ color: '#fff', fontSize: '0.75rem', fontFamily: font, fontWeight: 600 }}>
                                        {formatNumber(campaign.donors)} {loc('متبرع', 'donors')}
                                    </span>
                                </span>
                                <span style={{ backgroundColor: 'rgba(0,177,106,0.75)', backdropFilter: 'blur(8px)', borderRadius: '10px', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <i className="fa-solid fa-hourglass-half" style={{ color: '#fff', fontSize: '0.65rem' }} />
                                    <span style={{ color: '#fff', fontSize: '0.75rem', fontFamily: font, fontWeight: 600 }}>
                                        {campaign.daysLeft} {loc('يوم', 'days')}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div style={{
                            borderRadius: '18px', padding: 'clamp(16px, 2.5vw, 20px)',
                            backgroundColor: isDark ? DARK_CARD : '#fff',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#eef2f7'}`,
                            boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.25)' : '0 2px 12px rgba(0,0,0,0.04)',
                        }}>
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 12,
                                fontFamily: font, fontWeight: 700, fontSize: '0.72rem',
                                backgroundColor: isDark ? 'rgba(0,177,106,0.12)' : 'rgba(0,177,106,0.08)',
                                color: G_GREEN, borderRadius: '8px', padding: '4px 10px', height: 26,
                            }}>
                                <i className={program?.icon || 'fa-solid fa-tag'} style={{ fontSize: '0.6rem', color: G_GREEN }} />
                                {programName}
                            </span>

                            <p style={{
                                fontWeight: 900, fontFamily: font,
                                fontSize: 'clamp(1.3rem, 2.5vw, 1.55rem)',
                                lineHeight: 1.4, color: isDark ? DARK_HEAD : '#1a1a1a',
                                marginBottom: 12,
                            }}>
                                {title}
                            </p>

                            <div className="flex items-center gap-1 mb-4">
                                <div style={{ width: 4, height: 20, borderRadius: 2, background: `linear-gradient(180deg, ${G_GREEN}, ${EMERALD})` }} />
                                <p style={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: font, color: isDark ? DARK_HEAD : '#1a1a1a', margin: 0 }}>
                                    {loc('عن الحملة', 'About This Campaign')}
                                </p>
                            </div>
                            <p style={{
                                fontSize: '0.9rem', lineHeight: 2,
                                color: isDark ? 'rgba(226,232,240,0.78)' : '#555',
                                fontFamily: font, marginBottom: 20,
                            }}>
                                {desc}
                            </p>

                            <div className="flex items-center gap-1 mb-4">
                                <div style={{ width: 4, height: 20, borderRadius: 2, background: `linear-gradient(180deg, ${G_GREEN}, ${EMERALD})` }} />
                                <p style={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: font, color: isDark ? DARK_HEAD : '#1a1a1a', margin: 0 }}>
                                    {loc('أهداف الحملة', 'Campaign Goals')}
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[
                                    { icon: 'fa-bullseye', text: loc('الوصول إلى الفئات المستهدفة في المناطق الأكثر احتياجًا', 'Reach targeted groups in underserved areas') },
                                    { icon: 'fa-hand-holding-heart', text: loc('توفير الدعم المادي والعيني بشكل مباشر', 'Provide direct financial and in-kind support') },
                                    { icon: 'fa-eye', text: loc('ضمان الشفافية الكاملة في توزيع التبرعات', 'Ensure full transparency in donation distribution') },
                                    { icon: 'fa-chart-line', text: loc('متابعة وتقييم الأثر بشكل دوري', 'Regular monitoring and impact assessment') },
                                ].map((goal, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: 10,
                                        padding: '8px 10px', borderRadius: '12px',
                                        backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#fafbfc',
                                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : '#f0f4f8'}`,
                                    }}
                                        className="hover:bg-[#00b16a]/[0.04] hover:border-[#00b16a]/[0.15] transition-colors"
                                    >
                                        <div style={{
                                            width: 28, height: 28, borderRadius: '8px',
                                            backgroundColor: 'rgba(0,177,106,0.12)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        }}>
                                            <i className={`fa-solid ${goal.icon}`} style={{ fontSize: '0.6rem', color: G_GREEN }} />
                                        </div>
                                        <p style={{ fontSize: '0.85rem', lineHeight: 1.6, fontFamily: font, color: isDark ? DARK_TEXT : '#444', margin: 0 }}>
                                            {goal.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {campaign.donationAmount && (
                                <>
                                    <hr style={{ margin: '16px 0', border: 'none', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f0f4f8'}` }} />
                                    <div style={{
                                        padding: '10px 14px', borderRadius: '14px',
                                        backgroundColor: isDark ? 'rgba(0,177,106,0.06)' : 'rgba(0,177,106,0.04)',
                                        border: `1.5px dashed rgba(0,177,106,0.3)`,
                                        display: 'flex', alignItems: 'center', gap: 12,
                                    }}>
                                        <div style={{
                                            width: 38, height: 38, borderRadius: '10px',
                                            backgroundColor: 'rgba(0,177,106,0.15)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        }}>
                                            <i className="fa-solid fa-coins" style={{ fontSize: '0.9rem', color: G_GREEN }} />
                                        </div>
                                        <div>
                                            <p style={{ fontFamily: font, fontWeight: 600, fontSize: '0.78rem', color: isDark ? 'rgba(226,232,240,0.6)' : '#888', margin: 0 }}>
                                                {loc('مبلغ التبرع الواحد', 'Single Donation Amount')}
                                            </p>
                                            <p style={{ fontFamily: LATIN_FONT, fontWeight: 800, fontSize: '1.05rem', color: G_GREEN, margin: 0 }}>
                                                {formatCurrency(campaign.donationAmount)}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div style={{
                        flex: '1 1 auto', width: '100%',
                        animation: 'slideUp 0.5s ease both 0.1s',
                        direction: dir,
                    }}
                        className="md:flex-[0_0_calc(33.333%-14px)] md:w-[calc(33.333%-14px)]"
                    >
                        <CampaignSidebar
                            campaign={campaign}
                            amount={donationAmount}
                            setAmount={setDonationAmount}
                            isDark={isDark}
                            onDonate={() => setDonateProject(campaign)}
                        />
                    </div>
                </div>
            </div>

            <QuickDonateModal
                open={!!donateProject}
                onClose={() => setDonateProject(null)}
                project={donateProject}
            />
        </div>
    );
}
