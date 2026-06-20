import { Link } from 'react-router-dom';
import { t, formatDate } from '../../i18n';
import { useAdminData } from '../../contexts/AdminDataContext';
import { useState, useMemo } from 'react';

const CATEGORIES = ['الكل', 'أخبار', 'تقارير', 'قصص نجاح', 'فعاليات', 'مقالات'];

function Blog() {
    const { state } = useAdminData();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('الكل');

    const posts = useMemo(() => {
        return (state.blogPosts || [])
            .filter(p => p.status === 'published')
            .filter(p => !search || p.title.includes(search) || p.summary?.includes(search))
            .filter(p => category === 'الكل' || p.category === category);
    }, [state.blogPosts, search, category]);

    return (
        <div className="pb-16">
            <div className="bg-gradient-to-br from-[#0d6b4b] to-[#094a33] text-white py-16 px-0 text-center">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                    <h3 className="text-3xl font-bold mb-3">{t('nav.updates') || 'آخر الأخبار'}</h3>
                    <p className="text-lg opacity-90 max-w-[600px] mx-auto">تابع آخر أخبارنا وتقاريرنا وقصص النجاح</p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-6">
                {/* Search & Filter */}
                <div className="flex gap-3 mb-6 flex-wrap">
                    <div className="relative min-w-[280px]">
                        <i className="fa-solid fa-search absolute top-1/2 -translate-y-1/2 right-3 text-sm text-neutral-400"></i>
                        <input
                            type="text"
                            placeholder="بحث في الأخبار..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pr-9 pl-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none dark:text-white text-sm"
                        />
                    </div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="min-w-[150px] px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none dark:text-white text-sm"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                        <i className="fa-regular fa-newspaper text-5xl opacity-30"></i>
                        <p className="mt-3">لا توجد منشورات بعد</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-4">
                        {posts.map((post) => (
                            <div className="col-span-12 sm:col-span-6 md:col-span-4 flex" key={post.id}>
                                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-md border border-neutral-100 dark:border-neutral-700 overflow-hidden flex flex-col w-full transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                                    <img
                                        className="w-full h-48 object-cover"
                                        src={post.image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=350&fit=crop'}
                                        alt={post.title}
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=350&fit=crop'; }}
                                    />
                                    <div className="p-4 flex-1">
                                        <div className="flex gap-2 mb-2">
                                            {post.category && (
                                                <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium border border-primary-500 text-primary-500">{post.category}</span>
                                            )}
                                            {post.featured && (
                                                <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-error-500 text-white">{'مميز'}</span>
                                            )}
                                        </div>
                                        <h6 className="text-base font-bold mb-2 dark:text-white">{post.title}</h6>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">{post.summary}</p>
                                    </div>
                                    <div className="px-4 pb-4 pt-0">
                                        <Link to={`/blog/${post.id}`} className="text-primary-500 hover:underline text-sm font-medium">
                                            قراءة المزيد ←
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Blog;
