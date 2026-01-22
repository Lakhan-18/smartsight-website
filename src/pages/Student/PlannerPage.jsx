import React from 'react';
import { Box, Typography, Paper, Grid, Button, TextField, Chip } from '@mui/material';
import { Add, CheckCircle } from '@mui/icons-material';
import Layout from '../../components/layout/Layout';

const PlannerPage = () => {
    const [tasks, setTasks] = React.useState([
        { id: 1, title: 'Study for Math Exam', time: '2:00 PM - 4:00 PM', completed: false },
        { id: 2, title: 'Complete Physics Assignment', time: '4:30 PM - 6:00 PM', completed: false },
        { id: 3, title: 'Review Chemistry Notes', time: '7:00 PM - 8:00 PM', completed: true },
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <Layout>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Study Planner
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Organize your study schedule and track your progress
                </Typography>

                <Grid container spacing={3}>
                    {/* Today's Schedule */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Today's Schedule</Typography>
                                <Button variant="contained" startIcon={<Add />}>
                                    Add Task
                                </Button>
                            </Box>

                            {tasks.map((task) => (
                                <Paper
                                    key={task.id}
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        opacity: task.completed ? 0.6 : 1,
                                        cursor: 'pointer',
                                        '&:hover': { bgcolor: 'action.hover' }
                                    }}
                                    onClick={() => toggleTask(task.id)}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <CheckCircle
                                            color={task.completed ? 'success' : 'disabled'}
                                            sx={{ fontSize: 28 }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    textDecoration: task.completed ? 'line-through' : 'none',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {task.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {task.time}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            ))}
                        </Paper>
                    </Grid>

                    {/* Quick Stats */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, mb: 2 }}>
                            <Typography variant="h6" gutterBottom>Focus Timer</Typography>
                            <Box sx={{ textAlign: 'center', my: 3 }}>
                                <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                    25:00
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Pomodoro Session
                                </Typography>
                            </Box>
                            <Button variant="contained" fullWidth>
                                Start Focus Session
                            </Button>
                        </Paper>

                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>This Week</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Tasks Completed</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>12/18</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Study Hours</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>24.5</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Focus Sessions</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>32</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default PlannerPage;
