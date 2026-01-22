import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../../components/layout/Layout';

const progressData = [
    { week: 'Week 1', wellness: 65, focus: 60, sleep: 70 },
    { week: 'Week 2', wellness: 68, focus: 65, sleep: 72 },
    { week: 'Week 3', wellness: 72, focus: 70, sleep: 75 },
    { week: 'Week 4', wellness: 75, focus: 73, sleep: 78 },
];

const ProgressPage = () => {
    return (
        <Layout>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Progress Timeline
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Track your wellness journey and celebrate improvements
                </Typography>

                <Grid container spacing={3}>
                    {/* Wellness Trend */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Wellness Score Trend</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={progressData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="week" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="wellness" stroke="#667eea" fill="#667eea" fillOpacity={0.6} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* Multi-Metric Comparison */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Multi-Metric Progress</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={progressData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="week" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="wellness" stroke="#667eea" strokeWidth={2} />
                                    <Line type="monotone" dataKey="focus" stroke="#764ba2" strokeWidth={2} />
                                    <Line type="monotone" dataKey="sleep" stroke="#4caf50" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* Milestones */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>🎯 Milestones Achieved</Typography>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                                        <Typography variant="h4">🏆</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>7 Day Streak</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                                        <Typography variant="h4">📈</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Score Improved 15%</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5' }}>
                                        <Typography variant="h4">⭐</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>All Goals Met</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
                                        <Typography variant="h4">🎓</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Study Master</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default ProgressPage;
