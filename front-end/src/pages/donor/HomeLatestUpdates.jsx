import { Link } from 'react-router-dom';
import { t, formatDate } from '../../i18n';

function HomeLatestUpdates({ blogPosts, isDark }) {
    const sectionPyMedium = 'py-12 md:py-16';

    return (
        <div className={`${sectionPyMedium}`}
            style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(var(--color-primary-500), 0.025)',
            }}
        >
            <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center mb-4">
                    <h3
                        className="font-extrabold"
                        style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)' }}
                    >
                        {t('home.latestUpdates')}
                    </h3>
                    <Link
                        to="/blog"
                        className="text-primary-500 font-medium text-sm no-underline hover:underline transition-colors"
                    >
                        {t('common.viewAll')} ←
                    </Link>
                </div>
                <div className="grid grid-cols-12 gap-3">
                    {(blogPosts || []).filter(p => p.status === 'published').slice(0, 3).map((post) => (
                        <div key={post.id} className="col-span-12 md:col-span-4 flex">
                            <Link
                                to={`/blog/${post.id}`}
                                className="h-full w-full rounded-2xl flex flex-col p-0 no-underline text-inherit cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                                style={{
                                    boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.25)' : '0 1px 6px rgba(0,0,0,0.06)',
                                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}`,
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = isDark ? '0 8px 28px rgba(0,0,0,0.35)' : '0 8px 30px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = isDark ? '0 2px 10px rgba(0,0,0,0.25)' : '0 1px 6px rgba(0,0,0,0.06)';
                                }}
                            >
                                <img
                                    src={post.image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=300&fit=crop'}
                                    alt={post.title}
                                    className="w-full h-40 object-cover"
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=300&fit=crop'; }}
                                />
                                <div className="p-2">
                                    <p className="font-bold leading-relaxed mb-0.5">{post.title}</p>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                        {post.publishedAt ? formatDate(post.publishedAt) : ''}
                                        {post.category && ` — ${post.category}`}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeLatestUpdates;
