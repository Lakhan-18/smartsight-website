import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, Container, Typography, Button, Grid, Card, CardContent, 
    Avatar, Paper, Chip, useTheme, useMediaQuery, Fade, Slide, Grow
} from '@mui/material';
import {
    PlayArrow, School, Psychology, Shield, TrendingUp, 
    Analytics, Security, Speed, People, Star, ArrowRight,
    CheckCircle, Insights, AutoGraph, HealthAndSafety, Dashboard
} from '@mui/icons-material';

const Home = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Hero Section Component
    const HeroSection = () => (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
            }
        }}>
            {/* Animated background elements */}
            <Box sx={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: 200,
                height: 200,
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                borderRadius: '50%',
                opacity: 0.1,
                filter: 'blur(40px)',
                animation: 'float 6s ease-in-out infinite'
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '20%',
                left: '5%',
                width: 150,
                height: 150,
                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                borderRadius: '50%',
                opacity: 0.1,
                filter: 'blur(30px)',
                animation: 'float 8s ease-in-out infinite reverse'
            }} />
            
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Fade in={isVisible} timeout={1000}>
                            <Box>
                                <Chip 
                                    label="🚀 Powered by Google AI" 
                                    sx={{ 
                                        mb: 3, 
                                        bgcolor: 'rgba(59, 130, 246, 0.1)',
                                        color: '#3b82f6',
                                        border: '1px solid rgba(59, 130, 246, 0.3)',
                                        fontWeight: 600
                                    }} 
                                />
                                <Typography 
                                    variant="h1" 
                                    sx={{ 
                                        fontSize: { xs: '2.5rem', md: '4rem' },
                                        fontWeight: 800,
                                        color: 'white',
                                        mb: 2,
                                        lineHeight: 1.1,
                                        background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    SmartSight
                                </Typography>
                                <Typography 
                                    variant="h4" 
                                    sx={{ 
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        mb: 3,
                                        fontWeight: 400,
                                        fontSize: { xs: '1.5rem', md: '2rem' }
                                    }}
                                >
                                    AI-Powered Early Risk Detection for Urban Youth
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        mb: 4,
                                        fontSize: '1.1rem',
                                        lineHeight: 1.6,
                                        maxWidth: 500
                                    }}
                                >
                                    Proactively detect behavioral, academic, and emotional risks using 
                                    ethical AI technologies. Receive personalized guidance to help students thrive.
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        endIcon={<PlayArrow />}
                                        onClick={() => navigate('/login')}
                                        sx={{
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 30px rgba(59, 130, 246, 0.4)'
                                            }
                                        }}
                                    >
                                        Get Started Free
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => navigate('/signup')}
                                        sx={{
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                            color: 'white',
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            '&:hover': {
                                                borderColor: '#3b82f6',
                                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </Box>
                            </Box>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Slide direction="left" in={isVisible} timeout={1200}>
                            <Box sx={{ position: 'relative' }}>
                                {/* Floating Cards Demo */}
                                <Box sx={{
                                    position: 'relative',
                                    height: 400,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {[
                                        { icon: <Analytics />, title: 'Risk Analysis', color: '#3b82f6', delay: 0 },
                                        { icon: <Psychology />, title: 'AI Insights', color: '#06b6d4', delay: 200 },
                                        { icon: <Shield />, title: 'Privacy First', color: '#8b5cf6', delay: 400 }
                                    ].map((item, idx) => (
                                        <Grow key={idx} in={isVisible} timeout={1000 + item.delay}>
                                            <Card sx={{
                                                position: 'absolute',
                                                width: 120,
                                                height: 120,
                                                background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`,
                                                border: `1px solid ${item.color}30`,
                                                borderRadius: 3,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transform: `translate(${idx * 60 - 60}px, ${idx % 2 * 40 - 20}px)`,
                                                animation: `float ${4 + idx}s ease-in-out infinite`,
                                                animationDelay: `${idx * 0.5}s`
                                            }}>
                                                <Avatar sx={{ 
                                                    bgcolor: item.color, 
                                                    mb: 1,
                                                    width: 40,
                                                    height: 40
                                                }}>
                                                    {item.icon}
                                                </Avatar>
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {item.title}
                                                </Typography>
                                            </Card>
                                        </Grow>
                                    ))}
                                </Box>
                            </Box>
                        </Slide>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );

    // Features Section Component
    const FeaturesSection = () => {
        const features = [
            {
                icon: <Psychology />,
                title: 'AI-Powered Detection',
                description: 'Advanced machine learning algorithms identify behavioral and emotional patterns early',
                color: '#3b82f6'
            },
            {
                icon: <Shield />,
                title: 'Privacy-First Approach',
                description: 'End-to-end encryption and ethical AI practices ensure student data protection',
                color: '#10b981'
            },
            {
                icon: <Insights />,
                title: 'Personalized Insights',
                description: 'Tailored recommendations and guidance based on individual student needs',
                color: '#8b5cf6'
            },
            {
                icon: <Speed />,
                title: 'Real-Time Monitoring',
                description: 'Continuous assessment with immediate alerts for early intervention',
                color: '#f59e0b'
            },
            {
                icon: <AutoGraph />,
                title: 'Predictive Analytics',
                description: 'Forecast potential risks and outcomes using historical data patterns',
                color: '#ef4444'
            },
            {
                icon: <HealthAndSafety />,
                title: 'Wellness Support',
                description: 'Comprehensive mental health and academic support recommendations',
                color: '#06b6d4'
            }
        ];

        return (
            <Box sx={{ 
                py: 8, 
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Chip 
                            label="🎯 Core Features" 
                            sx={{ 
                                mb: 2, 
                                bgcolor: 'rgba(59, 130, 246, 0.1)',
                                color: '#3b82f6',
                                fontWeight: 600
                            }} 
                        />
                        <Typography 
                            variant="h3" 
                            sx={{ 
                                fontWeight: 800, 
                                color: '#1e293b',
                                mb: 2
                            }}
                        >
                            Powered by Advanced AI Technology
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: '#64748b',
                                fontSize: '1.1rem',
                                maxWidth: 600,
                                mx: 'auto'
                            }}
                        >
                            Our platform leverages cutting-edge Google AI to provide early detection 
                            and intervention for at-risk urban youth.
                        </Typography>
                    </Box>
                    
                    <Grid container spacing={4}>
                        {features.map((feature, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <Grow in={isVisible} timeout={1000 + idx * 200}>
                                    <Card sx={{
                                        height: '100%',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: 3,
                                        p: 3,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0 20px 40px ${feature.color}20`
                                        }
                                    }}>
                                        <Avatar sx={{
                                            bgcolor: feature.color,
                                            width: 64,
                                            height: 64,
                                            mb: 2
                                        }}>
                                            {feature.icon}
                                        </Avatar>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                fontWeight: 700,
                                                color: '#1e293b',
                                                mb: 1
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: '#64748b',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </Card>
                                </Grow>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        );
    };

    // Stats Section Component
    const StatsSection = () => {
        const stats = [
            { value: '95%', label: 'Early Detection Accuracy', icon: <TrendingUp /> },
            { value: '10k+', label: 'Students Supported', icon: <People /> },
            { value: '24/7', label: 'Monitoring Coverage', icon: <Security /> },
            { value: '99%', label: 'Privacy Compliance', icon: <Shield /> }
        ];

        return (
            <Box sx={{
                py: 8,
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {stats.map((stat, idx) => (
                            <Grid item xs={12} sm={6} md={3} key={idx}>
                                <Fade in={isVisible} timeout={1000 + idx * 300}>
                                    <Box sx={{ 
                                        textAlign: 'center',
                                        color: 'white'
                                    }}>
                                        <Avatar sx={{
                                            bgcolor: 'rgba(59, 130, 246, 0.2)',
                                            color: '#3b82f6',
                                            width: 64,
                                            height: 64,
                                            mx: 'auto',
                                            mb: 2,
                                            border: '2px solid rgba(59, 130, 246, 0.3)'
                                        }}>
                                            {stat.icon}
                                        </Avatar>
                                        <Typography 
                                            variant="h3" 
                                            sx={{ 
                                                fontWeight: 800,
                                                mb: 1,
                                                background: 'linear-gradient(135deg, #ffffff, #3b82f6)',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}
                                        >
                                            {stat.value}
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                fontWeight: 500
                                            }}
                                        >
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        );
    };

    // CTA Section Component
    const CTASection = () => (
        <Box sx={{
            py: 10,
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Container maxWidth="md">
                <Fade in={isVisible} timeout={1500}>
                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                        <Typography 
                            variant="h3" 
                            sx={{ 
                                fontWeight: 800,
                                mb: 2
                            }}
                        >
                            Ready to Transform Student Wellbeing?
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: 'rgba(255, 255, 255, 0.9)',
                                mb: 4,
                                fontSize: '1.2rem',
                                maxWidth: 500,
                                mx: 'auto'
                            }}
                        >
                            Join thousands of educational institutions using SmartSight 
                            to create safer, more supportive learning environments.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowRight />}
                                onClick={() => navigate('/signup')}
                                sx={{
                                    bgcolor: 'white',
                                    color: '#3b82f6',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 30px rgba(0, 0, 0, 0.2)'
                                    }
                                }}
                            >
                                Start Your Journey
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/login')}
                                sx={{
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    color: 'white',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );

    return (
        <Box>
            {/* Navigation */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(15, 20, 25, 0.9)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 100,
                py: 2
            }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                            SmartSight
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button 
                                variant="outlined" 
                                onClick={() => navigate('/login')}
                                sx={{ 
                                    color: 'white', 
                                    borderColor: 'white',
                                    '&:hover': {
                                        borderColor: '#3b82f6',
                                        backgroundColor: 'rgba(59, 130, 246, 0.1)'
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={() => navigate('/signup')}
                                sx={{ 
                                    backgroundColor: '#3b82f6',
                                    '&:hover': { backgroundColor: '#2563eb' }
                                }}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Hero Section */}
            <Box sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%)',
                display: 'flex',
                alignItems: 'center',
                pt: 10
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography 
                                variant="h1" 
                                sx={{ 
                                    fontSize: { xs: '2.5rem', md: '4rem' },
                                    fontWeight: 800,
                                    color: 'white',
                                    mb: 2,
                                    lineHeight: 1.1
                                }}
                            >
                                Student Mental Health
                                <Box component="span" sx={{ color: '#3b82f6', display: 'block' }}>
                                    Analytics Platform
                                </Box>
                            </Typography>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    mb: 4,
                                    fontWeight: 400,
                                    lineHeight: 1.6
                                }}
                            >
                                AI-powered insights to support student wellbeing and academic success
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => navigate('/signup')}
                                    startIcon={<PlayArrow />}
                                    sx={{
                                        backgroundColor: '#3b82f6',
                                        py: 1.5,
                                        px: 4,
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        '&:hover': { backgroundColor: '#2563eb' }
                                    }}
                                >
                                    Start Demo
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'white',
                                        py: 1.5,
                                        px: 4,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            borderColor: '#3b82f6',
                                            backgroundColor: 'rgba(59, 130, 246, 0.1)'
                                        }
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ position: 'relative' }}>
                                <Card sx={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: 4,
                                    p: 4
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Avatar sx={{ 
                                            backgroundColor: '#3b82f6', 
                                            mr: 2,
                                            width: 60,
                                            height: 60
                                        }}>
                                            <Dashboard fontSize="large" />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                SmartSight Dashboard
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                                Real-time Analytics
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Paper sx={{ 
                                                p: 2, 
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                border: '1px solid rgba(59, 130, 246, 0.3)'
                                            }}>
                                                <Typography sx={{ color: '#3b82f6', fontSize: '0.9rem', mb: 1 }}>
                                                    Wellness Score
                                                </Typography>
                                                <Typography sx={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                                    87%
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Paper sx={{ 
                                                p: 2, 
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                border: '1px solid rgba(16, 185, 129, 0.3)'
                                            }}>
                                                <Typography sx={{ color: '#10b981', fontSize: '0.9rem', mb: 1 }}>
                                                    Active Users
                                                </Typography>
                                                <Typography sx={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                                    1,234
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 10, backgroundColor: '#1a202c' }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" align="center" sx={{ 
                        color: 'white', 
                        mb: 2,
                        fontWeight: 'bold'
                    }}>
                        Powerful Features
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        mb: 6,
                        maxWidth: 600,
                        mx: 'auto'
                    }}>
                        Advanced AI-driven analytics to monitor, predict, and improve student mental health outcomes
                    </Typography>
                    <Grid container spacing={4}>
                        {[
                            {
                                icon: <Psychology />,
                                title: 'AI-Powered Detection',
                                description: 'Advanced machine learning algorithms analyze behavioral patterns to identify at-risk students early.'
                            },
                            {
                                icon: <Analytics />,
                                title: 'Real-time Monitoring',
                                description: 'Continuous tracking of student engagement and wellbeing metrics with instant alerts.'
                            },
                            {
                                icon: <Shield />,
                                title: 'Privacy Protected',
                                description: 'End-to-end encryption and HIPAA compliance ensuring student data remains secure.'
                            },
                            {
                                icon: <Insights />,
                                title: 'Predictive Insights',
                                description: 'Forecast potential mental health challenges before they impact academic performance.'
                            },
                            {
                                icon: <People />,
                                title: 'Institutional Support',
                                description: 'Comprehensive dashboards for counselors and administrators to coordinate care.'
                            },
                            {
                                icon: <TrendingUp />,
                                title: 'Outcome Tracking',
                                description: 'Measure intervention effectiveness and long-term student success metrics.'
                            }
                        ].map((feature, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card sx={{
                                    height: '100%',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        transition: 'transform 0.3s ease'
                                    }
                                }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Avatar sx={{ 
                                            backgroundColor: '#3b82f6', 
                                            mb: 3,
                                            width: 56,
                                            height: 56
                                        }}>
                                            {feature.icon}
                                        </Avatar>
                                        <Typography variant="h6" sx={{ 
                                            color: 'white', 
                                            mb: 2,
                                            fontWeight: 'bold'
                                        }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography sx={{ 
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            lineHeight: 1.6
                                        }}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box sx={{ py: 10, backgroundColor: '#0f1419' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {[
                            { number: '99%', label: 'Detection Accuracy', icon: <CheckCircle /> },
                            { number: '24/7', label: 'Monitoring', icon: <Security /> },
                            { number: '10k+', label: 'Students Protected', icon: <People /> },
                            { number: '50+', label: 'Institutions', icon: <School /> }
                        ].map((stat, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Avatar sx={{ 
                                        backgroundColor: '#3b82f6',
                                        width: 80,
                                        height: 80,
                                        mx: 'auto',
                                        mb: 2
                                    }}>
                                        {stat.icon}
                                    </Avatar>
                                    <Typography variant="h3" sx={{ 
                                        color: 'white',
                                        fontWeight: 'bold',
                                        mb: 1
                                    }}>
                                        {stat.number}
                                    </Typography>
                                    <Typography sx={{ 
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        fontSize: '1.1rem'
                                    }}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{ py: 10, backgroundColor: '#1a202c' }}>
                <Container maxWidth="md">
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ 
                            color: 'white',
                            mb: 3,
                            fontWeight: 'bold'
                        }}>
                            Ready to Transform Student Care?
                        </Typography>
                        <Typography variant="h6" sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)',
                            mb: 4,
                            lineHeight: 1.6
                        }}>
                            Join leading institutions using SmartSight to improve student mental health outcomes
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/signup')}
                                sx={{
                                    backgroundColor: '#3b82f6',
                                    py: 2,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    '&:hover': { backgroundColor: '#2563eb' }
                                }}
                            >
                                Start Free Trial
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/login')}
                                sx={{
                                    color: 'white',
                                    borderColor: 'white',
                                    py: 2,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    '&:hover': {
                                        borderColor: '#3b82f6',
                                        backgroundColor: 'rgba(59, 130, 246, 0.1)'
                                    }
                                }}
                            >
                                Schedule Demo
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ py: 6, backgroundColor: '#0f1419', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
                                SmartSight
                            </Typography>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Transforming student mental health through intelligent analytics and early intervention.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                                        Product
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                                            Features
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                                            Pricing
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                                            API
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                                        Support
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                                            Documentation
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                                            Help Center
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                                            Contact
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                                        Company
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                                            About
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                                            Privacy
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}>
                                            Terms
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{ 
                        mt: 4, 
                        pt: 4, 
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        textAlign: 'center'
                    }}>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                            © 2024 SmartSight. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;