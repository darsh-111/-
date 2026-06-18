import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    useTheme,
    alpha
} from '@mui/material';
import { useAdminData } from '../../contexts/AdminDataContext';
import styled from '@emotion/styled';

const HeroSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.hero.base} 0%, ${theme.palette.hero.dark} 100%)`,
    color: theme.palette.common.white,
    padding: theme.spacing(10, 0, 6),
    textAlign: 'center',
}));

function Testimonials() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const { state } = useAdminData();
    const testimonials = state.content?.testimonials || [];

    return (
        <Box sx={{ pb: 12 }}>
            <HeroSection>
                <Container>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>آراء المستفيدين</Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>كلمات الشكر والتقدير من الذين ساهمت في تغيير حياتهم</Typography>
                </Container>
            </HeroSection>

            <Container sx={{ mt: 4 }}>
                {testimonials.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                        <i className="fa-regular fa-comment-dots" style={{ fontSize: 48, opacity: 0.3 }} />
                        <Typography sx={{ mt: 2 }}>لا توجد آراء بعد</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {testimonials.map((test) => (
                            <Grid item xs={12} sm={6} md={4} key={test.id} sx={{ display: 'flex' }}>
                                <Card sx={{
                                    flex: 1, p: 3, borderRadius: 4, position: 'relative',
                                    bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'common.white',
                                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}`,
                                    '&::before': {
                                        content: '"\\201C"', position: 'absolute', top: 8, right: 16,
                                        fontSize: '4rem', color: alpha(theme.palette.primary.main, 0.1),
                                        lineHeight: 1, fontFamily: 'serif',
                                    },
                                }}>
                                    <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 3, fontStyle: 'italic' }}>
                                        "{test.content || test.text}"
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 44, height: 44 }}>
                                            {test.name?.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body2" fontWeight="bold">{test.name}</Typography>
                                            {test.role && <Typography variant="caption" color="text.secondary">{test.role}</Typography>}
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}

export default Testimonials;
