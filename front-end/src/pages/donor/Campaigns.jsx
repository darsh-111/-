import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { getLanguage } from '../../i18n';
import { useAdminData } from '../../contexts/AdminDataContext';
import CampaignCardItem from './CampaignCardItem';
import QuickDonateModal from './QuickDonateModal';

const EMERALD = '#10b981';
const DARK_BG = '#0f172a';
const DARK_TEXT = '#e2e8f0';
const DARK_HEAD = '#f8fafc';
const ARABIC_FONT = "'Cairo', 'Tajawal', sans-serif";

const loc = (ar, en) => (getLanguage() === 'en' ? (en || ar) : ar);

function Campaigns() {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const { state } = useAdminData();
    const activePrograms = state.programs?.filter(p => !p.status || p.status === 'active') || [];
    const projects = state.projects;
    const programs = activePrograms;

    const [activeProgram, setActiveProgram] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [donateProject, setDonateProject] = useState(null);

    const filteredProjects = projects
        .filter((p) => activeProgram === 'all' || p.programId === parseInt(activeProgram))
        .sort((a, b) => {
            if (sortBy === 'mostFunded') return (b.raised / b.goal) - (a.raised / a.goal);
            if (sortBy === 'endingSoon') return a.daysLeft - b.daysLeft;
            return b.id - a.id;
        });

    return (
        <div style={{ paddingBottom: 24, backgroundColor: isDark ? DARK_BG : '#f8fafc', minHeight: '100vh' }}>
            <div style={{
                paddingTop: 100, paddingBottom: 100, textAlign: 'center', position: 'relative', overflow: 'hidden', color: '#fff',
                background: isDark
                    ? 'radial-gradient(ellipse at 30% 20%, #0a1f1c 0%, #04100e 70%, #020a09 100%)'
                    : 'radial-gradient(ellipse at 35% 25%, #1a4a44 0%, #112e2a 55%, #0a1f1c 100%)',
            }}>
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto', padding: '0 12px' }}>
                    <div style={{ width: 40, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)', margin: '0 auto 12px' }} />
                    <p style={{
                        fontWeight: 900, fontFamily: ARABIC_FONT, letterSpacing: 0, marginBottom: 8,
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#fff',
                    }}>
                        {loc('الحملات الخيرية', 'Charity Campaigns')}
                    </p>
                    <p style={{
                        fontFamily: ARABIC_FONT, color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.7, fontSize: 'clamp(0.82rem, 2vw, 0.9rem)',
                    }}>
                        {loc(
                            'ساهم في دعم الحملات الخيرية وكن جزءًا من التغيير',
                            'Contribute to charitable campaigns and be part of the change'
                        )}
                    </p>
                </div>
            </div>

            <div style={{ marginTop: -1, lineHeight: 0 }}>
                <svg viewBox="0 0 1200 36" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 36, fill: isDark ? DARK_BG : '#f8fafc' }}>
                    <path d="M0,0 C300,36 900,0 1200,36 L1200,36 L0,36 Z" />
                </svg>
            </div>

            <div style={{
                position: 'sticky', top: 72, zIndex: 20, paddingTop: 6, paddingBottom: 6,
                background: isDark ? 'rgba(15,23,42,0.75)' : 'rgba(255,255,255,0.80)',
                backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                paddingLeft: 16, paddingRight: 16,
            }}>
                <div style={{ maxWidth: 1120, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 0 }}>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                minWidth: 140, padding: '6px 12px', borderRadius: '10px',
                                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)'}`,
                                color: isDark ? DARK_TEXT : '#333', outline: 'none',
                                fontFamily: ARABIC_FONT,
                            }}
                        >
                            <option value="newest">{loc('الأحدث', 'Newest')}</option>
                            <option value="mostFunded">{loc('الأكثر تمويلاً', 'Most Funded')}</option>
                            <option value="endingSoon">{loc('ينتهي قريباً', 'Ending Soon')}</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                        <button onClick={() => setActiveProgram('all')} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 12px',
                            borderRadius: '999px', fontWeight: 700, fontSize: '0.82rem', border: 'none', cursor: 'pointer',
                            backgroundColor: activeProgram === 'all' ? EMERALD : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'),
                            color: activeProgram === 'all' ? '#fff' : (isDark ? DARK_TEXT : '#374151'),
                        }}>
                            <i className="fa-solid fa-layer-group" style={{ fontSize: '0.72rem' }} />
                            {loc('الكل', 'All')}
                        </button>
                        {programs.map((prog) => (
                            <button key={prog.id} onClick={() => setActiveProgram(String(prog.id))} style={{
                                display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 12px',
                                borderRadius: '999px', fontWeight: 600, fontSize: '0.82rem', border: 'none', cursor: 'pointer',
                                backgroundColor: activeProgram === String(prog.id) ? EMERALD : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'),
                                color: activeProgram === String(prog.id) ? '#fff' : (isDark ? DARK_TEXT : '#374151'),
                            }}>
                                <i className={prog.icon} style={{ fontSize: '0.72rem' }} />
                                {loc(prog.name, prog.nameEn)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 1120, margin: '24px auto 0', padding: '0 12px' }}>
                {filteredProjects.length === 0 ? (
                    <div style={{ textAlign: 'center', paddingTop: 24, paddingBottom: 24 }}>
                        <p style={{ fontSize: '3rem', marginBottom: 8 }}>🔍</p>
                        <p style={{ fontWeight: 700, color: isDark ? DARK_HEAD : '#1a1a1a', marginBottom: 4 }}>
                            {loc('لا توجد نتائج', 'No results found')}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: isDark ? DARK_TEXT : '#666', marginBottom: 12 }}>
                            {loc('جرّب تغيير كلمات البحث أو الفلاتر', 'Try changing your search or filters')}
                        </p>
                        <button onClick={() => setActiveProgram('all')} style={{
                            borderRadius: 999, padding: '4px 20px', border: `1px solid ${EMERALD}`, color: EMERALD,
                            backgroundColor: 'transparent', cursor: 'pointer', fontSize: '0.875rem',
                        }}>
                            {loc('عرض الكل', 'Show All')}
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(8px, 2vw, 16px)', overflow: 'visible', paddingBottom: 16 }}>
                        {filteredProjects.map((project, i) => (
                            <div key={project.id} style={{ display: 'flex', justifyContent: 'center', overflow: 'visible' }}>
                                <CampaignCardItem
                                    project={project}
                                    index={i}
                                    onClick={(p) => navigate(`/campaigns/${p.id}`)}
                                    onDonate={(p) => setDonateProject(p)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <QuickDonateModal
                open={!!donateProject}
                onClose={() => setDonateProject(null)}
                project={donateProject}
            />
        </div>
    );
}

export default Campaigns;
