import { create } from 'zustand';
import { fetchStudentData } from '../services/firebase/studentService';
import mlService from '../services/mlService';

const useStudentStore = create((set, get) => ({
    wellnessScore: null,
    riskScore: null,
    riskFactors: [],
    behavioralData: [],
    recommendations: [],
    loading: false,
    error: null,

    // Load student data and run ML predictions
    loadStudentData: async (userId) => {
        set({ loading: true, error: null });

        try {
            console.log('📊 Loading student data with ML predictions...');

            // Fetch student data from Firestore (or use mock data)
            const data = await fetchStudentData(userId);

            // Use TensorFlow.js to predict wellness score
            console.log('🤖 Running ML prediction...');
            const mlPredictedScore = await mlService.predictWellnessScore(data.behaviorData);

            // Detect risk factors using ML
            const mlRiskFactors = mlService.detectRiskFactors(data.behaviorData);

            // Generate AI-powered recommendations
            const mlRecommendations = mlService.generateRecommendations(mlPredictedScore, mlRiskFactors);

            console.log('✅ ML Prediction complete:', {
                score: mlPredictedScore,
                riskFactors: mlRiskFactors,
                recommendations: mlRecommendations.length
            });

            set({
                wellnessScore: data.wellnessScore || mlPredictedScore,
                riskScore: mlPredictedScore, // ML-predicted score
                riskFactors: mlRiskFactors, // ML-detected risk factors
                behavioralData: data.behaviorData,
                recommendations: mlRecommendations, // AI-generated recommendations
                loading: false,
            });
        } catch (error) {
            console.error('Error loading student data:', error);
            set({ error: error.message, loading: false });
        }
    },

    // Toggle recommendation completion
    toggleRecommendation: (id) => {
        const recommendations = get().recommendations.map(rec =>
            rec.id === id ? { ...rec, completed: !rec.completed } : rec
        );
        set({ recommendations });
    },
}));

export default useStudentStore;
