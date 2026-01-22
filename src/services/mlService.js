import * as tf from '@tensorflow/tfjs';

/**
 * Enhanced TensorFlow.js ML Service for SmartSight
 * Improved to use ALL 6 behavioral factors with proper weighting
 * 
 * Features:
 * - Uses all user inputs (focus, apps, sleep, stress, exercise, social)
 * - Better training with realistic patterns
 * - More accurate predictions
 * - Smarter risk detection
 */

class MLService {
    constructor() {
        this.model = null;
        this.isModelLoaded = false;
    }

    /**
     * Initialize and train enhanced neural network
     * Now uses ALL 6 factors from user input
     */
    async initializeModel() {
        if (this.isModelLoaded) return;

        console.log('🤖 Initializing Enhanced ML Model with 6 factors...');

        // Create improved sequential model
        this.model = tf.sequential({
            layers: [
                // Input layer: 6 features (all user inputs)
                tf.layers.dense({ inputShape: [6], units: 24, activation: 'relu' }),

                // Dropout to prevent overfitting
                tf.layers.dropout({ rate: 0.2 }),

                // Hidden layer
                tf.layers.dense({ units: 12, activation: 'relu' }),

                // Output layer: wellness score 0-1
                tf.layers.dense({ units: 1, activation: 'sigmoid' })
            ]
        });

        // Compile with better optimizer
        this.model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'meanSquaredError',
            metrics: ['mae']
        });

        // Train with realistic data
        await this.trainModel();

        this.isModelLoaded = true;
        console.log('✅ Enhanced ML Model ready!');
    }

    /**
     * Train with realistic behavioral patterns
     */
    async trainModel() {
        const trainingData = this.generateRealisticTrainingData(200);

        const xs = tf.tensor2d(trainingData.inputs);
        const ys = tf.tensor2d(trainingData.outputs);

        await this.model.fit(xs, ys, {
            epochs: 100,
            batchSize: 20,
            verbose: 0,
            validationSplit: 0.2,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    if (epoch % 20 === 0) {
                        console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}, val_loss = ${logs.val_loss.toFixed(4)}`);
                    }
                }
            }
        });

        xs.dispose();
        ys.dispose();
    }

    /**
     * Generate realistic training data based on research
     */
    generateRealisticTrainingData(numSamples) {
        const inputs = [];
        const outputs = [];

        for (let i = 0; i < numSamples; i++) {
            // Generate correlated behavioral data
            const focusHours = Math.random() * 8;
            const appSwitches = 100 - (focusHours * 10) + (Math.random() * 30); // Inverse correlation
            const sleepHours = 5 + Math.random() * 4;
            const stressLevel = Math.max(1, 10 - (sleepHours * 1.2) + (Math.random() * 3));
            const exerciseMinutes = Math.random() * 90;
            const socialHours = Math.random() * 5;

            // Calculate wellness score with proper weights
            let wellnessScore = 50; // Base

            // Focus (25% weight) - most important
            wellnessScore += (focusHours / 8) * 25;

            // Sleep (20% weight)
            wellnessScore += ((sleepHours - 5) / 5) * 20;

            // Stress (20% weight) - inverse
            wellnessScore += ((10 - stressLevel) / 10) * 20;

            // App switches (15% weight) - inverse
            wellnessScore += ((100 - appSwitches) / 100) * 15;

            // Exercise (10% weight)
            wellnessScore += (exerciseMinutes / 90) * 10;

            // Social (10% weight)
            wellnessScore += (socialHours / 5) * 10;

            // Normalize
            wellnessScore = Math.max(0, Math.min(100, wellnessScore));

            inputs.push([
                focusHours / 8,
                appSwitches / 100,
                sleepHours / 10,
                stressLevel / 10,
                exerciseMinutes / 90,
                socialHours / 5
            ]);

            outputs.push([wellnessScore / 100]);
        }

        return { inputs, outputs };
    }

    /**
     * Predict wellness using ALL 6 user inputs
     */
    async predictWellnessScore(userData) {
        if (!this.isModelLoaded) {
            await this.initializeModel();
        }

        // Extract all 6 features from user data
        const features = [
            userData.focusHours / 8,
            userData.appSwitches / 100,
            userData.sleepHours / 10,
            userData.stressLevel / 10,
            userData.exerciseMinutes / 90,
            userData.socialHours / 5
        ];

        const inputTensor = tf.tensor2d([features]);
        const prediction = this.model.predict(inputTensor);
        const score = (await prediction.data())[0] * 100;

        inputTensor.dispose();
        prediction.dispose();

        return Math.round(score);
    }

    /**
     * Enhanced risk detection using all factors
     */
    detectRiskFactors(userData) {
        const riskFactors = [];

        // Focus-related risks
        if (userData.focusHours < 2) {
            riskFactors.push('⚠️ Low Focus Duration');
        } else if (userData.focusHours < 3) {
            riskFactors.push('📉 Below Average Focus');
        }

        // Distraction risks
        if (userData.appSwitches > 70) {
            riskFactors.push('🔴 Severe Digital Distraction');
        } else if (userData.appSwitches > 50) {
            riskFactors.push('📱 High Digital Distraction');
        }

        // Sleep risks
        if (userData.sleepHours < 6) {
            riskFactors.push('😴 Sleep Deprivation');
        } else if (userData.sleepHours < 7) {
            riskFactors.push('💤 Insufficient Sleep');
        }

        // Stress risks
        if (userData.stressLevel >= 8) {
            riskFactors.push('🔴 High Stress Level');
        } else if (userData.stressLevel >= 6) {
            riskFactors.push('😰 Elevated Stress');
        }

        // Exercise risks
        if (userData.exerciseMinutes < 15) {
            riskFactors.push('🏃 Low Physical Activity');
        }

        // Social risks
        if (userData.socialHours < 1) {
            riskFactors.push('👥 Social Isolation');
        }

        // Combined risks
        if (userData.focusHours < 2 && userData.appSwitches > 60) {
            riskFactors.push('⚡ Attention Deficit Pattern');
        }

        if (userData.sleepHours < 6 && userData.stressLevel > 7) {
            riskFactors.push('🆘 Burnout Risk');
        }

        return riskFactors;
    }

    /**
     * Generate smarter recommendations
     */
    generateRecommendations(score, riskFactors, userData) {
        const recommendations = [];

        // Critical interventions
        if (score < 50) {
            recommendations.push({
                title: '🆘 Schedule Counselor Session',
                description: 'Your wellness score indicates you need professional support',
                category: 'Critical',
                priority: 'high'
            });
        }

        // Focus-based recommendations
        if (userData.focusHours < 3) {
            recommendations.push({
                title: '🎯 Use Pomodoro Technique',
                description: `Increase focus from ${userData.focusHours}h to 4h with 25-min sessions`,
                category: 'Productivity',
                priority: 'high'
            });
        }

        // Distraction recommendations
        if (userData.appSwitches > 50) {
            recommendations.push({
                title: '📵 Enable Focus Mode',
                description: `Reduce app switches from ${userData.appSwitches} to under 30`,
                category: 'Digital Wellness',
                priority: 'high'
            });
        }

        // Sleep recommendations
        if (userData.sleepHours < 7) {
            recommendations.push({
                title: '😴 Improve Sleep Hygiene',
                description: `Increase sleep from ${userData.sleepHours}h to 7-8h`,
                category: 'Health',
                priority: 'high'
            });
        }

        // Stress recommendations
        if (userData.stressLevel > 6) {
            recommendations.push({
                title: '🧘 Practice Stress Management',
                description: 'Try meditation, deep breathing, or yoga',
                category: 'Mental Health',
                priority: 'high'
            });
        }

        // Exercise recommendations
        if (userData.exerciseMinutes < 30) {
            recommendations.push({
                title: '🏃 Add Physical Activity',
                description: `Increase from ${userData.exerciseMinutes} to 30+ minutes daily`,
                category: 'Physical Health',
                priority: 'medium'
            });
        }

        // Social recommendations
        if (userData.socialHours < 2) {
            recommendations.push({
                title: '👥 Increase Social Connection',
                description: 'Spend time with friends or join study groups',
                category: 'Social Wellness',
                priority: 'medium'
            });
        }

        // Positive reinforcement
        if (score >= 75) {
            recommendations.push({
                title: '🎉 Excellent Progress!',
                description: 'Your wellness habits are outstanding. Keep it up!',
                category: 'Encouragement',
                priority: 'low'
            });
        } else if (score >= 60) {
            recommendations.push({
                title: '👍 Good Work!',
                description: 'You\'re on the right track. Small improvements will help.',
                category: 'Encouragement',
                priority: 'low'
            });
        }

        return recommendations.slice(0, 5); // Top 5 recommendations
    }
}

// Export singleton
const mlService = new MLService();
export default mlService;
