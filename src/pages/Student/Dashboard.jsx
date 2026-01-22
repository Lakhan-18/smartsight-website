import React, { useEffect, useState } from 'react';
import { 
    Box, Typography, Grid, Paper, Avatar, Chip, Card, CardContent,
    LinearProgress, Fade, Grow, Slide, IconButton, Tooltip
} from '@mui/material';
import {
    TrendingUp, Psychology, Shield, CalendarToday, 
    Notifications, Analytics, HealthAndSafety, Speed,
    EmojiEvents, Insights, AutoAwesome
} from '@mui/icons-material';
import useAuthStore from '../../store/authStore';
import useStudentStore from '../../store/studentStore';
import Layout from '../../components/layout/Layout';
import WellnessScore from '../../components/dashboards/WellnessScore';
import BehavioralTracker from '../../components/dashboards/BehavioralTracker';
import RecommendationCard from '../../components/dashboards/RecommendationCard';

const StudentDashboard = () => {
    const { user } = useAuthStore();
    const { loadStudentData, recommendations, loading } = useStudentStore();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (user) {
            loadStudentData(user.uid);
        }
        setIsVisible(true);
    }, [user, loadStudentData]);

    // Modern stat card component
    const StatCard = ({ icon: Icon, title, value, subtitle, color, gradient, delay = 0 }) => (
        <Grow in={isVisible} timeout={800 + delay}>
            <Card sx={{
                background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
                color: 'white',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `0 20px 40px ${color}30`
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 100,
                    height: 100,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    transform: 'translate(30px, -30px)'
                }
            }}>
                <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Avatar sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            width: 48,
                            height: 48
                        }}>
                            <Icon sx={{ fontSize: 24 }} />
                        </Avatar>
                        <Chip 
                            label="Live"
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontSize: '0.7rem',
                                height: 20
                            }}
                        />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, fontSize: '1.8rem' }}>
                        {value}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, opacity: 0.95 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {subtitle}
                    </Typography>
                </CardContent>
            </Card>
        </Grow>
    );

    // Activity indicator component
    const ActivityIndicator = ({ label, value, color, delay = 0 }) => (
        <Fade in={isVisible} timeout={1000 + delay}>
            <Box sx={{ textAlign: 'center' }}>
                <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                    border: `3px solid ${color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: `0 8px 25px ${color}30`
                    }
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color }}>
                        {value}
                    </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {label}
                </Typography>
            </Box>
        </Fade>
    );

    const quickStats = [
        {
            icon: CalendarToday,
            title: 'Tracking Period',
            value: '7 Days',
            subtitle: 'Weekly insights',
            color: '#3b82f6',
            gradient: ['#3b82f6', '#1d4ed8']
        },
        {
            icon: Psychology,
            title: 'Active Recommendations',
            value: recommendations?.length || 3,
            subtitle: 'AI-powered guidance',
            color: '#8b5cf6',
            gradient: ['#8b5cf6', '#7c3aed']
        },
        {
            icon: Shield,
            title: 'Privacy Status',
            value: 'Secured',
            subtitle: 'Data protected',
            color: '#10b981',
            gradient: ['#10b981', '#059669']
        }
    ];

    const activityData = [
        { label: 'Focus Sessions', value: '12', color: '#3b82f6' },
        { label: 'Check-ins', value: '7', color: '#10b981' },
        { label: 'Resources Used', value: '5', color: '#f59e0b' },
        { label: 'Progress Score', value: '85', color: '#8b5cf6' }
    ];

    return (
        <Layout>
            <Box sx={{ p: { xs: 2, md: 0 } }}>
                {/* Welcome Header */}
                <Fade in={isVisible} timeout={600}>
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    fontWeight: 800, 
                                    background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                Welcome back, {user?.displayName?.split(' ')[0] || 'Student'}!
                            </Typography>
                            <Tooltip title="All systems running smoothly">
                                <Chip
                                    icon={<AutoAwesome />}
                                    label="AI Active"
                                    sx={{
                                        background: 'linear-gradient(135deg, #10b981, #059669)',
                                        color: 'white',
                                        fontWeight: 600,
                                        '& .MuiChip-icon': {
                                            color: 'white'
                                        }
                                    }}
                                />
                            </Tooltip>
                        </Box>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                            Here's your personalized dashboard with real-time insights and recommendations
                        </Typography>
                    </Box>
                </Fade>

                {/* Quick Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {quickStats.map((stat, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <StatCard {...stat} delay={idx * 150} />
                        </Grid>
                    ))}
                </Grid>

                {/* Activity Overview */}
                <Slide direction="up" in={isVisible} timeout={1000}>
                    <Paper sx={{
                        p: 3,
                        mb: 4,
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                        border: '1px solid rgba(59, 130, 246, 0.1)',
                        borderRadius: 3
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Avatar sx={{ bgcolor: '#3b82f6', mr: 2, width: 32, height: 32 }}>
                                <Analytics sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                Today's Activity Overview
                            </Typography>
                        </Box>
                        <Grid container spacing={3}>
                            {activityData.map((item, idx) => (
                                <Grid item xs={6} sm={3} key={idx}>
                                    <ActivityIndicator {...item} delay={idx * 100} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Slide>

                {/* Main Dashboard Widgets */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Wellness Score */}
                    <Grid item xs={12} lg={4}>
                        <Slide direction="right" in={isVisible} timeout={1200}>
                            <Box>
                                <WellnessScore />
                            </Box>
                        </Slide>
                    </Grid>

                    {/* Behavioral Tracker */}
                    <Grid item xs={12} lg={8}>
                        <Slide direction="left" in={isVisible} timeout={1400}>
                            <Box>
                                <BehavioralTracker />
                            </Box>
                        </Slide>
                    </Grid>
                </Grid>

                {/* Guidance Engine */}
                <Fade in={isVisible} timeout={1600}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Avatar sx={{ 
                                bgcolor: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                mr: 2,
                                width: 40,
                                height: 40
                            }}>
                                <EmojiEvents sx={{ fontSize: 20 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                    AI Guidance Engine
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Personalized recommendations based on your behavioral patterns
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Grid container spacing={3}>
                            {recommendations && recommendations.length > 0 ? (
                                recommendations.map((rec, index) => (
                                    <Grid item xs={12} sm={6} lg={4} key={index}>
                                        <Grow in={isVisible} timeout={1800 + index * 200}>
                                            <Box>
                                                <RecommendationCard recommendation={rec} />
                                            </Box>
                                        </Grow>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Card sx={{
                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
                                        border: '1px solid rgba(16, 185, 129, 0.2)',
                                        borderRadius: 3
                                    }}>
                                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                            <Avatar sx={{
                                                bgcolor: 'rgba(16, 185, 129, 0.1)',
                                                color: '#10b981',
                                                width: 64,
                                                height: 64,
                                                mx: 'auto',
                                                mb: 2
                                            }}>
                                                <HealthAndSafety sx={{ fontSize: 32 }} />
                                            </Avatar>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#10b981' }}>
                                                All Set! 🎉
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                                                No critical recommendations at this time.
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                Keep maintaining your excellent progress and healthy habits!
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </Fade>
            </Box>
        </Layout>
    );
};

export default StudentDashboard;
