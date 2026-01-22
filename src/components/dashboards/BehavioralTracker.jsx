import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, Box, Card, CardContent, Chip, Avatar,
    Tab, Tabs, IconButton, Tooltip, Fade, Grow
} from '@mui/material';
import {
    Analytics, Timeline, Smartphone, Psychology, 
    TrendingUp, TrendingDown, Speed, CenterFocusStrong
} from '@mui/icons-material';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import useStudentStore from '../../store/studentStore';

const BehavioralTracker = () => {
    const { behavioralData, behaviorData } = useStudentStore();
    const [timeRange, setTimeRange] = useState(7);
    const [activeTab, setActiveTab] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Mock data with enhanced patterns
    const generateMockData = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days.map((day, idx) => ({
            day,
            focusHours: Math.floor(Math.random() * 4) + 4 + (idx < 5 ? 2 : -1), // Weekdays higher
            appSwitches: Math.floor(Math.random() * 30) + 20 + (idx < 5 ? 10 : -5),
            studyTime: Math.floor(Math.random() * 3) + 2 + (idx < 5 ? 2 : -1),
            screenTime: Math.floor(Math.random() * 2) + 6 + (idx >= 5 ? 2 : 0), // Weekends higher
            productivity: Math.floor(Math.random() * 20) + 70 + (idx < 5 ? 5 : -10)
        }));
    };

    const mockData = generateMockData();
    
    // Use mock data if no real data available
    const chartData = behavioralData?.length > 0 ? behavioralData.slice(-timeRange) : mockData;

    // Calculate metrics
    const weeklyFocus = chartData.reduce((sum, day) => sum + (day.focusHours || 0), 0);
    const avgAppSwitches = Math.round(chartData.reduce((sum, day) => sum + (day.appSwitches || 0), 0) / chartData.length);
    const productivityTrend = chartData.length > 1 ? 
        chartData[chartData.length - 1].productivity - chartData[chartData.length - 2].productivity : 0;

    // Metric cards component
    const MetricCard = ({ title, value, unit, icon: Icon, color, trend, delay = 0 }) => (
        <Grow in={isVisible} timeout={1000} style={{ transitionDelay: `${delay}ms` }}>
            <Card
                sx={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 25px ${color}30`
                    }
                }}
            >
                <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Avatar
                            sx={{
                                bgcolor: color,
                                width: 40,
                                height: 40,
                                boxShadow: `0 4px 14px 0 ${color}40`
                            }}
                        >
                            <Icon fontSize="small" />
                        </Avatar>
                        {trend !== undefined && (
                            <Chip
                                icon={trend >= 0 ? <TrendingUp /> : <TrendingDown />}
                                label={`${trend >= 0 ? '+' : ''}${trend}${unit}`}
                                size="small"
                                color={trend >= 0 ? 'success' : 'error'}
                                variant="outlined"
                            />
                        )}
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            background: `linear-gradient(45deg, ${color}, ${color}80)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 0.5
                        }}
                    >
                        {value}{unit}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </Grow>
    );

    return (
        <Fade in={isVisible} timeout={800}>
            <Card
                sx={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }
                }}
            >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    {/* Header */}
                    <Fade in={isVisible} timeout={1000} style={{ transitionDelay: '200ms' }}>
                        <Card
                            sx={{
                                mb: 3,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                                    transform: 'translateX(-100%)',
                                    animation: 'shimmer 3s infinite'
                                },
                                '@keyframes shimmer': {
                                    '0%': { transform: 'translateX(-100%)' },
                                    '100%': { transform: 'translateX(100%)' }
                                },
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: 'rgba(255,255,255,0.2)',
                                                mr: 2,
                                                width: 56,
                                                height: 56,
                                                backdropFilter: 'blur(10px)'
                                            }}
                                        >
                                            <Analytics fontSize="large" />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                Behavioral Analytics
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                AI-powered micro-signal tracking and analysis
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Metrics Grid */}
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
                                    <MetricCard
                                        title="Weekly Focus"
                                        value={weeklyFocus}
                                        unit=" hrs"
                                        icon={CenterFocusStrong}
                                        color="#3b82f6"
                                        delay={100}
                                    />
                                    <MetricCard
                                        title="App Switches"
                                        value={avgAppSwitches}
                                        unit="/day"
                                        icon={Smartphone}
                                        color="#f59e0b"
                                        delay={200}
                                    />
                                    <MetricCard
                                        title="Productivity Score"
                                        value={Math.round(chartData.reduce((sum, day) => sum + (day.productivity || 0), 0) / chartData.length)}
                                        unit="%"
                                        icon={TrendingUp}
                                        color="#10b981"
                                        trend={productivityTrend}
                                        delay={300}
                                    />
                                </Box>

                                {/* Tabs */}
                                <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.2)', mb: 3 }}>
                                    <Tabs
                                        value={activeTab}
                                        onChange={(e, value) => setActiveTab(value)}
                                        textColor="inherit"
                                        indicatorColor="secondary"
                                        sx={{
                                            minHeight: 'auto',
                                            '& .MuiTab-root': {
                                                minHeight: 'auto',
                                                py: 1,
                                                px: 2,
                                                minWidth: 'auto',
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                color: 'rgba(255,255,255,0.7)',
                                                '&.Mui-selected': {
                                                    color: 'white'
                                                }
                                            },
                                            '& .MuiTabs-indicator': {
                                                backgroundColor: 'white',
                                                height: 3,
                                                borderRadius: '2px'
                                            }
                                        }}
                                    >
                                        <Tab label="Focus & Productivity" />
                                        <Tab label="App Usage" />
                                        <Tab label="Study Patterns" />
                                        <Tab label="Wellness Insights" />
                                    </Tabs>
                                </Box>

                                {/* Tab Content */}
                                <Box sx={{ minHeight: 400 }}>
                                    {activeTab === 0 && (
                                        <Box sx={{ height: 400 }}>
                                            <Typography variant="h6" sx={{ mb: 2, color: 'rgba(255,255,255,0.9)' }}>
                                                Focus & Productivity Trends
                                            </Typography>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={chartData}>
                                                    <defs>
                                                        <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                                                        </linearGradient>
                                                        <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                                                    <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                                                    <RechartsTooltip
                                                        contentStyle={{
                                                            backgroundColor: 'rgba(0,0,0,0.8)',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            color: 'white'
                                                        }}
                                                    />
                                                    <Legend />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="focusHours"
                                                        stroke="#3b82f6"
                                                        strokeWidth={3}
                                                        fill="url(#focusGradient)"
                                                        name="Focus Hours"
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="productivity"
                                                        stroke="#10b981"
                                                        strokeWidth={3}
                                                        fill="url(#productivityGradient)"
                                                        name="Productivity %"
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    )}
                                    {activeTab === 1 && (
                                        <Box sx={{ height: 400 }}>
                                            <Typography variant="h6" sx={{ mb: 2, color: 'rgba(255,255,255,0.9)' }}>
                                                App Usage & Context Switching
                                            </Typography>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={chartData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                                                    <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                                                    <RechartsTooltip
                                                        contentStyle={{
                                                            backgroundColor: 'rgba(0,0,0,0.8)',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            color: 'white'
                                                        }}
                                                    />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="appSwitches"
                                                        fill="#f59e0b"
                                                        name="App Switches"
                                                        radius={[4, 4, 0, 0]}
                                                    />
                                                    <Bar
                                                        dataKey="screenTime"
                                                        fill="#ef4444"
                                                        name="Screen Time (hrs)"
                                                        radius={[4, 4, 0, 0]}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    )}
                                    {activeTab === 2 && (
                                        <Box sx={{ textAlign: 'center', py: 8, color: 'rgba(255,255,255,0.7)' }}>
                                            <Timeline sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                                            <Typography variant="body2">
                                                Study pattern analysis coming soon...
                                            </Typography>
                                        </Box>
                                    )}
                                    {activeTab === 3 && (
                                        <Box sx={{ textAlign: 'center', py: 8, color: 'rgba(255,255,255,0.7)' }}>
                                            <Psychology sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                                            <Typography variant="body2">
                                                Wellness insights coming soon...
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Fade>
                </CardContent>
            </Card>
        </Fade>
    );
};

export default BehavioralTracker;
