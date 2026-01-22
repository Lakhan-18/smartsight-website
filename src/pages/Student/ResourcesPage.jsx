import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { Phone, Article, SelfImprovement, Event, Warning } from '@mui/icons-material';
import Layout from '../../components/layout/Layout';

const resources = [
    {
        title: 'Crisis Hotline',
        description: '24/7 support for immediate help',
        icon: <Phone />,
        action: 'Call Now',
        color: '#f44336',
        category: 'Emergency'
    },
    {
        title: 'Campus Counselor',
        description: 'Schedule a session with a professional',
        icon: <Event />,
        action: 'Book Appointment',
        color: '#2196f3',
        category: 'Support'
    },
    {
        title: 'Self-Help Articles',
        description: 'Read about stress management and wellness',
        icon: <Article />,
        action: 'Browse Articles',
        color: '#4caf50',
        category: 'Learning'
    },
    {
        title: 'Meditation Exercises',
        description: 'Guided breathing and relaxation',
        icon: <SelfImprovement />,
        action: 'Start Session',
        color: '#9c27b0',
        category: 'Practice'
    },
    {
        title: 'Emergency SOS',
        description: 'Immediate assistance for critical situations',
        icon: <Warning />,
        action: 'Activate SOS',
        color: '#ff5722',
        category: 'Emergency'
    },
];

const ResourcesPage = () => {
    return (
        <Layout>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Mental Health Resources
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Access support, guidance, and tools for your well-being
                </Typography>

                <Grid container spacing={3}>
                    {resources.map((resource, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        <Box sx={{
                                            p: 1.5,
                                            borderRadius: 2,
                                            bgcolor: resource.color + '20',
                                            color: resource.color,
                                            display: 'flex'
                                        }}>
                                            {resource.icon}
                                        </Box>
                                        <Chip label={resource.category} size="small" />
                                    </Box>
                                    <Typography variant="h6" gutterBottom>
                                        {resource.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {resource.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            background: `linear-gradient(135deg, ${resource.color} 0%, ${resource.color}dd 100%)`,
                                            '&:hover': {
                                                background: resource.color,
                                            }
                                        }}
                                    >
                                        {resource.action}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Hotline Numbers */}
                <Paper sx={{ p: 3, mt: 3, bgcolor: '#fff3e0' }}>
                    <Typography variant="h6" gutterBottom>
                        📞 Important Hotline Numbers
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>National Crisis Hotline:</strong> 1-800-273-8255</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Campus Security:</strong> 1-800-XXX-XXXX</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Student Counseling:</strong> 1-800-XXX-XXXX</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Emergency Services:</strong> 911</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Layout>
    );
};

export default ResourcesPage;
