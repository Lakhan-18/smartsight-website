import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Slider,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Chip,
    Alert,
    ButtonGroup
} from '@mui/material';
import { CheckCircle, TipsAndUpdates, Warning } from '@mui/icons-material';
import Layout from '../../components/layout/Layout';
import mlService from '../../services/mlService';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import useAuthStore from '../../store/authStore';

const CheckInPage = () => {
    const { user } = useAuthStore();
    const [formData, setFormData] = useState({
        focusHours: 3,
        appSwitches: 45,
        sleepHours: 7,
        stressLevel: 5,
        exerciseMinutes: 30,
        socialHours: 2,
    });

    const [prediction, setPrediction] = useState({
        score: null,
        riskFactors: [],
        recommendations: []
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Real-time ML prediction as user types
    useEffect(() => {
        const predictWellness = async () => {
            // Use complete user data for prediction
            const score = await mlService.predictWellnessScore(formData);
            const riskFactors = mlService.detectRiskFactors(formData);
            const recommendations = mlService.generateRecommendations(score, riskFactors, formData);

            setPrediction({ score, riskFactors, recommendations });
        };

        predictWellness();
    }, [formData]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: parseFloat(value) || 0 });
    };

    const handlePreset = (preset) => {
        if (preset === 'good') {
            setFormData({
                focusHours: 6,
                appSwitches: 20,
                sleepHours: 8,
                stressLevel: 2,
                exerciseMinutes: 60,
                socialHours: 3,
            });
        } else if (preset === 'average') {
            setFormData({
                focusHours: 3,
                appSwitches: 45,
                sleepHours: 7,
                stressLevel: 5,
                exerciseMinutes: 30,
                socialHours: 2,
            });
        } else if (preset === 'tough') {
            setFormData({
                focusHours: 1,
                appSwitches: 80,
                sleepHours: 5,
                stressLevel: 8,
                exerciseMinutes: 0,
                socialHours: 1,
            });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Save to Firestore (if configured) or localStorage
            const checkInData = {
                userId: user?.uid || 'guest',
                date: new Date().toISOString().split('T')[0],
                data: formData,
                mlPrediction: prediction,
                timestamp: new Date().toISOString()
            };

            // Try to save to Firestore
            if (db) {
                await addDoc(collection(db, 'checkIns'), checkInData);
            } else {
                // Fallback to localStorage
                const existingData = JSON.parse(localStorage.getItem('checkIns') || '[]');
                existingData.push(checkInData);
                localStorage.setItem('checkIns', JSON.stringify(existingData));
            }

            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.error('Error saving check-in:', error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 70) return 'success.main';
        if (score >= 50) return 'warning.main';
        return 'error.main';
    };

    const getScoreLabel = (score) => {
        if (score >= 70) return 'Great! 🎉';
        if (score >= 50) return 'Good 📈';
        return 'Needs Attention 🤝';
    };

    return (
        <Layout>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    📅 Daily Wellness Check-In
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Track your daily activities for AI-powered insights
                </Typography>

                {submitted && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        ✅ Daily check-in saved! Your wellness data has been recorded.
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {/* Left Column - Input Form */}
                    <Grid item xs={12} md={7}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Today's Activities
                            </Typography>

                            {/* Quick Presets */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Quick Presets:
                                </Typography>
                                <ButtonGroup variant="outlined" size="small">
                                    <Button onClick={() => handlePreset('good')}>😊 Good Day</Button>
                                    <Button onClick={() => handlePreset('average')}>😐 Average Day</Button>
                                    <Button onClick={() => handlePreset('tough')}>😰 Tough Day</Button>
                                </ButtonGroup>
                            </Box>

                            {/* Focus Hours */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" gutterBottom>
                                    📚 Focus Time (hours)
                                </Typography>
                                <TextField
                                    type="number"
                                    value={formData.focusHours}
                                    onChange={(e) => handleInputChange('focusHours', e.target.value)}
                                    fullWidth
                                    inputProps={{ min: 0, max: 12, step: 0.5 }}
                                    helperText="How many hours did you focus on studying/work today?"
                                />
                            </Box>

                            {/* App Switches */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" gutterBottom>
                                    📱 App Switches (times)
                                </Typography>
                                <TextField
                                    type="number"
                                    value={formData.appSwitches}
                                    onChange={(e) => handleInputChange('appSwitches', e.target.value)}
                                    fullWidth
                                    inputProps={{ min: 0, max: 200 }}
                                    helperText="How many times did you switch between apps?"
                                />
                            </Box>

                            {/* Sleep Hours */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" gutterBottom>
                                    🌙 Sleep Hours
                                </Typography>
                                <TextField
                                    type="number"
                                    value={formData.sleepHours}
                                    onChange={(e) => handleInputChange('sleepHours', e.target.value)}
                                    fullWidth
                                    inputProps={{ min: 0, max: 12, step: 0.5 }}
                                    helperText="How many hours did you sleep last night?"
                                />
                            </Box>

                            {/* Stress Level */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" gutterBottom>
                                    😰 Stress Level: {formData.stressLevel}/10
                                </Typography>
                                <Slider
                                    value={formData.stressLevel}
                                    onChange={(e, value) => handleInputChange('stressLevel', value)}
                                    min={1}
                                    max={10}
                                    marks
                                    valueLabelDisplay="auto"
                                    color={formData.stressLevel <= 3 ? 'success' : formData.stressLevel <= 6 ? 'warning' : 'error'}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="caption">😊 Low</Typography>
                                    <Typography variant="caption">😰 High</Typography>
                                </Box>
                            </Box>

                            {/* Exercise */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" gutterBottom>
                                    🏃 Exercise (minutes)
                                </Typography>
                                <TextField
                                    type="number"
                                    value={formData.exerciseMinutes}
                                    onChange={(e) => handleInputChange('exerciseMinutes', e.target.value)}
                                    fullWidth
                                    inputProps={{ min: 0, max: 180 }}
                                    helperText="How many minutes of physical activity?"
                                />
                            </Box>

                            {/* Social Activity */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" gutterBottom>
                                    👥 Social Activity (hours)
                                </Typography>
                                <TextField
                                    type="number"
                                    value={formData.socialHours}
                                    onChange={(e) => handleInputChange('socialHours', e.target.value)}
                                    fullWidth
                                    inputProps={{ min: 0, max: 8, step: 0.5 }}
                                    helperText="How many hours of social interaction?"
                                />
                            </Box>

                            {/* Submit Button */}
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleSubmit}
                                disabled={loading}
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    py: 1.5,
                                    fontSize: '1.1rem'
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : '✅ Submit & Get AI Prediction'}
                            </Button>

                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                                🔒 Your data is private and stored securely
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Right Column - Live Preview */}
                    <Grid item xs={12} md={5}>
                        <Card sx={{ position: 'sticky', top: 80 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    🎯 Live AI Prediction
                                </Typography>

                                {/* Wellness Score */}
                                <Box sx={{ textAlign: 'center', my: 3 }}>
                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                        <CircularProgress
                                            variant="determinate"
                                            value={prediction.score || 0}
                                            size={120}
                                            thickness={6}
                                            sx={{ color: getScoreColor(prediction.score) }}
                                        />
                                        <Box
                                            sx={{
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                                {prediction.score || 0}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Wellness
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body1" sx={{ mt: 2, fontWeight: 600, color: getScoreColor(prediction.score) }}>
                                        {getScoreLabel(prediction.score)}
                                    </Typography>
                                </Box>

                                {/* Risk Factors */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Warning color="warning" fontSize="small" />
                                        Risk Factors: {prediction.riskFactors.length}
                                    </Typography>
                                    {prediction.riskFactors.length > 0 ? (
                                        prediction.riskFactors.map((factor, index) => (
                                            <Chip
                                                key={index}
                                                label={factor}
                                                size="small"
                                                color="warning"
                                                sx={{ mr: 0.5, mb: 0.5 }}
                                            />
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No risk factors detected! 🎉
                                        </Typography>
                                    )}
                                </Box>

                                {/* Recommendations */}
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TipsAndUpdates color="primary" fontSize="small" />
                                        AI Recommendations: {prediction.recommendations.length}
                                    </Typography>
                                    {prediction.recommendations.slice(0, 3).map((rec, index) => (
                                        <Box key={index} sx={{ mb: 1, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {rec.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {rec.description}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default CheckInPage;
