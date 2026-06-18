import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Dialog,
    IconButton,
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

function Gallery() {
    const theme = useTheme();
    const { state } = useAdminData();
    const [selected, setSelected] = useState(null);
    const images = state.gallery || [];

    return (
        <Box sx={{ pb: 12 }}>
            <HeroSection>
                <Container>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>معرض الصور</Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>لحظات من رحلتنا الخيرية</Typography>
                </Container>
            </HeroSection>

            <Container sx={{ mt: 4 }}>
                {images.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                        <i className="fa-regular fa-images" style={{ fontSize: 48, opacity: 0.3 }} />
                        <Typography sx={{ mt: 2 }}>لا توجد صور في المعرض بعد</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {images.map((img) => (
                            <Grid item xs={6} sm={4} md={3} key={img.id}>
                                <Card sx={{ cursor: 'pointer', borderRadius: 3, overflow: 'hidden', '&:hover': { '& .overlay': { opacity: 1 } } }} onClick={() => setSelected(img)}>
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={img.image}
                                            alt={img.title}
                                            sx={{ objectFit: 'cover' }}
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=300&fit=crop'; }}
                                        />
                                        <Box className="overlay" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, bgcolor: 'rgba(0,0,0,0.5)', p: 1.5, opacity: 0, transition: 'opacity 0.3s' }}>
                                            <Typography variant="body2" fontWeight="bold" color="white">{img.title}</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>

            {/* Lightbox */}
            <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="lg" PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none' } }}>
                {selected && (
                    <Box sx={{ position: 'relative' }}>
                        <IconButton onClick={() => setSelected(null)} sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(0,0,0,0.5)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
                            <i className="fa-solid fa-xmark" />
                        </IconButton>
                        <Box component="img" src={selected.image} alt={selected.title} sx={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 2, display: 'block' }}
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop'; }}
                        />
                        <Box sx={{ textAlign: 'center', mt: 1 }}>
                            <Typography variant="h6" color="white">{selected.title}</Typography>
                            {selected.description && <Typography variant="body2" color="rgba(255,255,255,0.7)">{selected.description}</Typography>}
                        </Box>
                    </Box>
                )}
            </Dialog>
        </Box>
    );
}

export default Gallery;
