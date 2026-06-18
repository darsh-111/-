import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Stack,
    LinearProgress,
    useTheme,
    alpha
} from '@mui/material';
import { formatCurrency, formatNumber } from '../../i18n';
import { useAdminData } from '../../contexts/AdminDataContext';
import styled from '@emotion/styled';

const HeroSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.hero.base} 0%, ${theme.palette.hero.dark} 100%)`,
    color: theme.palette.common.white,
    padding: theme.spacing(10, 0, 6),
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
}));

const ProjectCard = styled(Card)(({ theme }) => ({
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

function ProgramDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const { state } = useAdminData();

    const programs = state.programs;
    const projects = state.projects;

    const program = programs.find(p => String(p.id) === String(id));
    const programProjects = projects.filter(p => String(p.programId) === String(id) && p.status === 'active');
    const totalRaised = programProjects.reduce((sum, p) => sum + (p.raised || 0), 0);

    if (!program) {
        return (
            <Box sx={{ textAlign: 'center', py: 12, minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 3, bgcolor: alpha(theme.palette.primary.main, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fa-solid fa-search" style={{ fontSize: '2rem', color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>البرنامج غير موجود</Typography>
                <Button component={Link} to="/programs" variant="contained" sx={{ borderRadius: '14px', px: 4, textTransform: 'none' }}>
                    العودة للبرامج
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ pb: 12 }}>
            {/* Hero */}
            <HeroSection>
                <Container>
                    <Box sx={{
                        width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 36, bgcolor: alpha('#fff', 0.15),
                    }}>
                        <i className={program.icon}></i>
                    </Box>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        {program.name}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 700, mx: 'auto', mb: 3 }}>
                        {program.description || `برنامج ${program.name} يهدف لتحقيق أثر إيجابي في المجتمع`}
                    </Typography>

                    {/* Stats */}
                    <Stack direction="row" spacing={4} justifyContent="center" sx={{ mt: 2 }}>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">{programProjects.length}</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>مشروع نشط</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">{formatCurrency(totalRaised)}</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>تم جمعها</Typography>
                        </Box>
                    </Stack>
                </Container>
            </HeroSection>

            {/* Projects Grid */}
            <Container sx={{ mt: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold">المشاريع النشطة</Typography>
                    <Button onClick={() => navigate('/programs')} sx={{ textTransform: 'none' }}>
                        ← العودة للبرامج
                    </Button>
                </Box>

                {programProjects.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                        <i className="fa-regular fa-folder-open" style={{ fontSize: 48, opacity: 0.3 }} />
                        <Typography sx={{ mt: 2 }}>لا توجد مشاريع نشطة في هذا البرنامج حالياً</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {programProjects.map((project) => {
                            const pct = project.goal > 0 ? Math.min(100, Math.round((project.raised / project.goal) * 100)) : 0;
                            return (
                                <Grid item xs={12} sm={6} md={4} key={project.id} sx={{ display: 'flex' }}>
                                    <ProjectCard elevation={2}>
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={project.imageUrl || project.image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=350&fit=crop'}
                                            alt={project.title}
                                            sx={{ objectFit: 'cover' }}
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=350&fit=crop'; }}
                                        />
                                        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                {project.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ flex: 1, mb: 2 }}>
                                                {project.description || 'مشروع تابع للبرنامج'}
                                            </Typography>
                                            <Box sx={{ mb: 1 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                    <Typography variant="caption" fontWeight="bold" color="primary.main">
                                                        {formatCurrency(project.raised || 0)}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {pct}%
                                                    </Typography>
                                                </Box>
                                                <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 4 }} />
                                            </Box>
                                            <Button
                                                component={Link}
                                                to={`/projects/${project.id}`}
                                                variant="outlined"
                                                fullWidth
                                                sx={{ textTransform: 'none', borderRadius: 2, mt: 'auto' }}
                                            >
                                                عرض المشروع
                                            </Button>
                                        </CardContent>
                                    </ProjectCard>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}

export default ProgramDetail;
