import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    IconButton,
} from '@mui/material';
import {
    Psychology,
    WorkOutline,
    PhoneAndroid,
    CheckCircle,
    Circle,
} from '@mui/icons-material';
import useStudentStore from '../../store/studentStore';

const GuidanceEngine = () => {
    const { recommendations, toggleRecommendation } = useStudentStore();

    const getIcon = (type) => {
        switch (type) {
            case 'mental':
                return <Psychology />;
            case 'career':
                return <WorkOutline />;
            case 'digital':
                return <PhoneAndroid />;
            default:
                return <Circle />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'error';
            case 'medium':
                return 'warning';
            case 'low':
                return 'success';
            default:
                return 'default';
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'mental':
                return 'Mental Well-being';
            case 'career':
                return 'Career Clarity';
            case 'digital':
                return 'Digital Detox';
            default:
                return type;
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Personalized Guidance & Recommendations
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                AI-powered recommendations tailored to your current needs
            </Typography>

            <Grid container spacing={2}>
                {recommendations.map((rec) => (
                    <Grid item xs={12} md={4} key={rec.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                border: rec.completed ? '2px solid #4CAF50' : '1px solid #e0e0e0',
                                opacity: rec.completed ? 0.7 : 1,
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '12px',
                                            bgcolor: 'primary.light',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'primary.main',
                                        }}
                                    >
                                        {getIcon(rec.type)}
                                    </Box>
                                    <Chip
                                        label={rec.priority.toUpperCase()}
                                        color={getPriorityColor(rec.priority)}
                                        size="small"
                                    />
                                </Box>

                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                    {getTypeLabel(rec.type)}
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    {rec.title}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {rec.description}
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ p: 2, pt: 0 }}>
                                {rec.completed ? (
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="success"
                                        startIcon={<CheckCircle />}
                                        onClick={() => toggleRecommendation(rec.id)}
                                    >
                                        Completed
                                    </Button>
                                ) : (
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={() => toggleRecommendation(rec.id)}
                                    >
                                        Mark as Complete
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default GuidanceEngine;
