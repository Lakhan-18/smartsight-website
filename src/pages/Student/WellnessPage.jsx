import React from 'react';
import { Box, Typography, Paper, Grid, LinearProgress, Chip, List, ListItem, ListItemText } from '@mui/material';
import Layout from '../../components/layout/Layout';
import useStudentStore from '../../store/studentStore';
import { TrendingUp, TrendingDown, Remove } from '@mui/icons-material';

const WellnessPage = () => {
    const { wellnessScore, riskScore, riskFactors } = useStudentStore();
    const displayScore = riskScore || wellnessScore || 75;
    const trend = displayScore > 70 ? 'improving' : displayScore > 50 ? 'stable' : 'declining';

    return (
        <Layout>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                    Wellness Analysis
                </Typography>

                <Grid container spacing={3}>
                    {/* Overall Score */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Overall Wellness Score</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3 }}>
                                <Typography variant="h2" sx={{ fontWeight: 700, color: displayScore > 70 ? 'success.main' : displayScore > 50 ? 'warning.main' : 'error.main' }}>
                                    {displayScore}
                                </Typography>
                                <Box>
                                    <Chip
                                        icon={trend === 'improving' ? <TrendingUp /> : trend === 'stable' ? <Remove /> : <TrendingDown />}
                                        label={trend.charAt(0).toUpperCase() + trend.slice(1)}
                                        color={trend === 'improving' ? 'success' : trend === 'stable' ? 'default' : 'error'}
                                        size="small"
                                    />
                                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                        vs. last week
                                    </Typography>
                                </Box>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={displayScore}
                                sx={{ height: 10, borderRadius: 5 }}
                                color={displayScore > 70 ? 'success' : displayScore > 50 ? 'warning' : 'error'}
                            />
                        </Paper>
                    </Grid>

                    {/* Risk Factors */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Risk Factors</Typography>
                            {riskFactors && riskFactors.length > 0 ? (
                                <List>
                                    {riskFactors.map((factor, index) => (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={factor}
                                                secondary="Detected in recent activity"
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No significant risk factors detected. Great job!
                                </Typography>
                            )}
                        </Paper>
                    </Grid>

                    {/* Weekly Breakdown */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Weekly Breakdown</Typography>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                                    const score = Math.floor(Math.random() * 30) + 60;
                                    return (
                                        <Grid item xs={12} sm={6} md={3} key={day}>
                                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                                <Typography variant="body2" color="text.secondary">{day}</Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 700, color: score > 70 ? 'success.main' : 'warning.main' }}>
                                                    {score}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default WellnessPage;
