import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { CheckCircle, TipsAndUpdates } from '@mui/icons-material';

const RecommendationCard = ({ recommendation }) => {
    const [completed, setCompleted] = React.useState(false);

    const handleComplete = () => {
        setCompleted(!completed);
    };

    return (
        <Card sx={{
            height: '100%',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2), 0 0 30px rgba(139, 92, 246, 0.15)'
            },
            opacity: completed ? 0.8 : 1,
            position: 'relative',
            overflow: 'visible',
            '&::before': {
                content: '""',
                position: 'absolute',
                inset: '-2px',
                borderRadius: 'inherit',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                opacity: 0,
                filter: 'blur(10px)',
                transition: 'opacity 0.3s',
                zIndex: -1
            },
            '&:hover::before': {
                opacity: completed ? 0 : 0.3
            }
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Chip
                        label={recommendation.category || 'General'}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                    {completed && (
                        <CheckCircle color="success" />
                    )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                    <TipsAndUpdates color="primary" sx={{ mt: 0.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        {recommendation.title || recommendation.text}
                    </Typography>
                </Box>

                {recommendation.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {recommendation.description}
                    </Typography>
                )}

                <Button
                    variant={completed ? "outlined" : "contained"}
                    size="small"
                    onClick={handleComplete}
                    fullWidth
                >
                    {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default RecommendationCard;
