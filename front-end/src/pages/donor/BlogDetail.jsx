import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDate, getLanguage } from '../../i18n';
import { useAdminData } from '../../contexts/AdminDataContext';

function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useAdminData();

    const post = (state.blogPosts || []).find(p => String(p.id) === String(id));

    if (!post) {
        return (
            <div className="text-center py-16 min-h-[60vh]">
                <i className="fa-regular fa-newspaper text-5xl opacity-30"></i>
                <h5 className="text-lg mt-3 mb-3 dark:text-white">الخبر غير موجود</h5>
                <Link to="/blog" className="inline-block bg-primary-500 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-primary-600 transition-colors">
                    العودة للأخبار
                </Link>
            </div>
        );
    }

    return (
        <div>
            {/* Hero */}
            <div
                className="h-[45vh] min-h-[350px] max-h-[500px] bg-cover bg-center flex items-end relative text-white pb-8"
                style={{
                    background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%), url(${post.image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&h=600&fit=crop'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="max-w-[1200px] mx-auto px-4 md:px-6 w-full">
                    <button
                        onClick={() => navigate('/blog')}
                        className="text-white/80 hover:text-white mb-2 text-sm block"
                    >
                        ← العودة للأخبار
                    </button>
                    <div className="flex gap-2 mb-2">
                        {post.category && (
                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium border border-white/50 text-white">{post.category}</span>
                        )}
                        {post.featured && (
                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-error-500 text-white">{'مميز'}</span>
                        )}
                    </div>
                    <h3 className="text-3xl font-bold">{post.title}</h3>
                    <p className="text-sm opacity-70 mt-2">
                        {post.publishedAt && formatDate(post.publishedAt)}
                        {post.author && ` — ${post.author}`}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[720px] mx-auto px-4 md:px-6 py-8">
                <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">{post.summary}</p>
                <p className="leading-8 text-base whitespace-pre-wrap dark:text-white">{post.content}</p>

                <div className="mt-10 text-center">
                    <Link to="/blog" className="inline-block border border-primary-500 text-primary-500 px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors">
                        ← المزيد من الأخبار
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
