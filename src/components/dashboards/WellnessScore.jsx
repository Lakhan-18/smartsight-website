import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, Box, CircularProgress, Chip, Card, CardContent,
    Avatar, LinearProgress, Divider, Fade, Grow, IconButton, Tooltip
} from '@mui/material';
import {
    TrendingUp, TrendingDown, Warning, CheckCircle, 
    HealthAndSafety, Psychology, Speed, ExpandMore, ExpandLess,
    Favorite, EmojiEvents, TipsAndUpdates
} from '@mui/icons-material';
import useStudentStore from '../../store/studentStore';

const WellnessScore = () => {
    const { wellnessScore, riskScore, riskFactors, loading } = useStudentStore();
    const [expanded, setExpanded] = useState(false);
    const [displayScore, setDisplayScore] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Use riskScore if available, otherwise fallback to wellnessScore
    const actualScore = riskScore || wellnessScore || 78;

    useEffect(() => {
        setIsVisible(true);
        // Animate score counting
        const timer = setTimeout(() => {
            let current = 0;
            const increment = actualScore / 30;
            const interval = setInterval(() => {
                current += increment;
                if (current >= actualScore) {
                    current = actualScore;
                    clearInterval(interval);
                }
                setDisplayScore(Math.round(current));
            }, 50);
        }, 500);

        return () => clearTimeout(timer);
    }, [actualScore]);

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    const getScoreGradient = (score) => {
        if (score >= 80) return ['#10b981', '#059669'];
        if (score >= 60) return ['#f59e0b', '#d97706'];
        return ['#ef4444', '#dc2626'];
    };

    const getScoreLabel = (score) => {
        if (score >= 85) return 'Excellent';
        if (score >= 70) return 'Good';
        if (score >= 55) return 'Fair';
        return 'Needs Attention';
    };

    const getScoreIcon = (score) => {
        if (score >= 80) return <EmojiEvents />;
        if (score >= 60) return <TipsAndUpdates />;
        return <Warning />;
    };

    const color = getScoreColor(actualScore);
    const gradient = getScoreGradient(actualScore);
    const label = getScoreLabel(actualScore);

    // Mock wellness factors data
    const wellnessFactors = [
        { name: 'Sleep Quality', value: 85, icon: <HealthAndSafety />, color: '#10b981' },
        { name: 'Stress Level', value: 32, icon: <Psychology />, color: '#3b82f6', inverted: true },
        { name: 'Focus Time', value: 78, icon: <Speed />, color: '#8b5cf6' },
        { name: 'Social Connection', value: 72, icon: <Favorite />, color: '#ec4899' }
    ];

    const CircularProgressWithLabel = ({ value, size = 140 }) => (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant="determinate"
                value={100}
                size={size}
                thickness={4}
                sx={{
                    color: 'rgba(0, 0, 0, 0.1)',
                    position: 'absolute'
                }}
            />
            <CircularProgress
                variant="determinate"
                value={value}
                size={size}
                thickness={4}
                sx={{
                    color,
                    '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                    },
                    transform: 'rotate(-90deg) !important'
                }}
            />
            <Box sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Avatar sx={{
                    bgcolor: `${color}15`,
                    color: color,
                    width: 32,
                    height: 32,
                    mb: 0.5
                }}>
                    {getScoreIcon(value)}
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 800, color }}>
                    {displayScore}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    out of 100
                </Typography>
            </Box>
        </Box>
    );

    if (loading) {
        return (
            <Card sx={{ height: '100%', borderRadius: 3 }}>
                <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
                    <CircularProgress />
                </CardContent>
            </Card>
        );
    }

    return (
        <Fade in={isVisible} timeout={800}>
            <Card sx={{
                height: '100%',
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 40px ${color}20`
                }
            }}>
                <CardContent sx={{ p: 3 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{
                                bgcolor: `${color}15`,
                                color: color,
                                width: 32,
                                height: 32,
                                mr: 2
                            }}>
                                <HealthAndSafety sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                Wellness Score
                            </Typography>
                        </Box>
                        <Chip
                            label={label}
                            sx={{
                                background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.75rem'
                            }}
                        />
                    </Box>

                    {/* Main Score Display */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Grow in={isVisible} timeout={1200}>
                            <Box>
                                <CircularProgressWithLabel value={displayScore} />
                            </Box>
                        </Grow>
                    </Box>

                    {/* Score Interpretation */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}>
                            {actualScore >= 80 ? 'Your wellness indicators are excellent!' :
                             actualScore >= 60 ? 'Good progress with room for improvement.' :
                             'Focus on key wellness areas for better outcomes.'}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Wellness Factors */}
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                Key Factors
                            </Typography>
                            <Tooltip title={expanded ? 'Show less' : 'Show more'}>
                                <IconButton
                                    size="small"
                                    onClick={() => setExpanded(!expanded)}
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {expanded ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </Tooltip>
                        </Box>
                        
                        <Box sx={{ display: 'grid', gap: 1.5 }}>
                            {wellnessFactors.slice(0, expanded ? 4 : 2).map((factor, idx) => (
                                <Fade key={factor.name} in={isVisible} timeout={1000 + idx * 200}>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{
                                                    bgcolor: `${factor.color}15`,
                                                    color: factor.color,
                                                    width: 20,
                                                    height: 20,
                                                    mr: 1
                                                }}>
                                                    {React.cloneElement(factor.icon, { sx: { fontSize: 12 } })}
                                                </Avatar>
                                                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                                    {factor.name}
                                                </Typography>
                                            </Box>
                                            <Typography variant="caption" sx={{ fontWeight: 600, color: factor.color }}>
                                                {factor.inverted ? 100 - factor.value : factor.value}%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={factor.inverted ? 100 - factor.value : factor.value}
                                            sx={{
                                                height: 4,
                                                borderRadius: 2,
                                                bgcolor: `${factor.color}15`,
                                                '& .MuiLinearProgress-bar': {
                                                    bgcolor: factor.color,
                                                    borderRadius: 2
                                                }
                                            }}
                                        />
                                    </Box>
                                </Fade>
                            ))}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Fade>
    );
};

export default WellnessScore;
