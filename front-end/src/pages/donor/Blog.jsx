import { Link } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    Chip,
    Avatar,
    Stack,
    TextField,
    MenuItem,
    InputAdornment,
    useTheme,
    alpha
} from '@mui/material';
import { t, formatDate } from '../../i18n';
import { useAdminData } from '../../contexts/AdminDataContext';
import styled from '@emotion/styled';
import { useState, useMemo } from 'react';

const HeroSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.hero.base} 0%, ${theme.palette.hero.dark} 100%)`,
    color: theme.palette.common.white,
    padding: theme.spacing(10, 0, 6),
    textAlign: 'center',
}));

const BlogCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius * 2,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: theme.shadows[8],
    },
}));

const CATEGORIES = ['الكل', 'أخبار', 'تقارير', 'قصص نجاح', 'فعاليات', 'مقالات'];

function Blog() {
    const theme = useTheme();
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
        <Box sx={{ pb: 12 }}>
            <HeroSection>
                <Container>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {t('nav.updates') || 'آخر الأخبار'}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                        تابع آخر أخبارنا وتقاريرنا وقصص النجاح
                    </Typography>
                </Container>
            </HeroSection>

            <Container sx={{ mt: 4 }}>
                {/* Search & Filter */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                    <TextField
                        size="small"
                        placeholder="بحث في الأخبار..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ minWidth: 280 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><i className="fa-solid fa-search" style={{ fontSize: 14 }} /></InputAdornment>,
                        }}
                    />
                    <TextField
                        select
                        size="small"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{ minWidth: 150 }}
                    >
                        {CATEGORIES.map(cat => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </TextField>
                </Box>

                {posts.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                        <i className="fa-regular fa-newspaper" style={{ fontSize: 48, opacity: 0.3 }} />
                        <Typography sx={{ mt: 2 }}>لا توجد منشورات بعد</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} key={post.id} sx={{ display: 'flex' }}>
                                <BlogCard elevation={2}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={post.image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=350&fit=crop'}
                                        alt={post.title}
                                        sx={{ objectFit: 'cover' }}
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=350&fit=crop'; }}
                                    />
                                    <CardContent sx={{ flex: 1 }}>
                                        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                                            {post.category && (
                                                <Chip label={post.category} size="small" color="primary" variant="outlined" />
                                            )}
                                            {post.featured && (
                                                <Chip label="مميز" size="small" color="error" />
                                            )}
                                        </Stack>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {post.summary}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                                        <Button
                                            component={Link}
                                            to={`/blog/${post.id}`}
                                            variant="text"
                                            size="small"
                                            sx={{ textTransform: 'none' }}
                                        >
                                            قراءة المزيد ←
                                        </Button>
                                    </CardActions>
                                </BlogCard>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}

export default Blog;
