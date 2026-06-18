import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Chip,
    Avatar,
    Stack,
    useTheme,
    alpha
} from '@mui/material';
import { formatDate, getLanguage } from '../../i18n';
import { useAdminData } from '../../contexts/AdminDataContext';
import styled from '@emotion/styled';

const HeroSection = styled(Box)(({ theme, image }) => ({
    height: '45vh',
    minHeight: 350,
    maxHeight: 500,
    background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%), url(${image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&h=600&fit=crop'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'flex-end',
    color: theme.palette.common.white,
    paddingBottom: theme.spacing(6),
    position: 'relative',
}));

function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const { state } = useAdminData();

    const post = (state.blogPosts || []).find(p => String(p.id) === String(id));

    if (!post) {
        return (
            <Box sx={{ textAlign: 'center', py: 12, minHeight: '60vh' }}>
                <i className="fa-regular fa-newspaper" style={{ fontSize: 48, opacity: 0.3 }} />
                <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>الخبر غير موجود</Typography>
                <Button component={Link} to="/blog" variant="contained" sx={{ textTransform: 'none' }}>
                    العودة للأخبار
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <HeroSection image={post.image}>
                <Container>
                    <Button
                        onClick={() => navigate('/blog')}
                        sx={{ color: 'rgba(255,255,255,0.8)', mb: 1, textTransform: 'none', '&:hover': { color: '#fff' } }}
                    >
                        ← العودة للأخبار
                    </Button>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        {post.category && <Chip label={post.category} size="small" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }} variant="outlined" />}
                        {post.featured && <Chip label="مميز" size="small" color="error" />}
                    </Stack>
                    <Typography variant="h3" fontWeight="bold">{post.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
                        {post.publishedAt && formatDate(post.publishedAt)}
                        {post.author && ` — ${post.author}`}
                    </Typography>
                </Container>
            </HeroSection>

            <Container maxWidth="md" sx={{ py: 6 }}>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                    {post.summary}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 2, fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
                    {post.content}
                </Typography>

                <Box sx={{ mt: 6, textAlign: 'center' }}>
                    <Button
                        component={Link}
                        to="/blog"
                        variant="outlined"
                        sx={{ textTransform: 'none', borderRadius: 2 }}
                    >
                        ← المزيد من الأخبار
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default BlogDetail;
