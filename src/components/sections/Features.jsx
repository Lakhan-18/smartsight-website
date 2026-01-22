import React from 'react';
import { motion } from 'framer-motion';
import {
    Psychology,
    Lightbulb,
    AutoAwesome,
    Dashboard,
    Security,
    TrendingUp
} from '@mui/icons-material';
import Card from '../common/Card';
import GradientText from '../common/GradientText';
import './Features.css';

const Features = () => {
    const features = [
        {
            icon: <Psychology />,
            title: 'Behavioral Micro-Signal Intelligence',
            description: 'Detects subtle patterns like study irregularity, app-switching frequency, and sentiment shifts that manual monitoring cannot identify.',
            gradient: 'primary'
        },
        {
            icon: <Lightbulb />,
            title: 'Explainable AI (XAI) Insights',
            description: 'Provides transparent risk scores with clear explanations, ensuring trust and user confidence through Google Explainable AI.',
            gradient: 'secondary'
        },
        {
            icon: <AutoAwesome />,
            title: 'Personalized Guidance Engine',
            description: 'Delivers adaptive AI-driven recommendations for mental well-being, career clarity, productivity, and digital balance.',
            gradient: 'accent'
        },
        {
            icon: <Dashboard />,
            title: 'Institutional Impact Dashboard',
            description: 'Anonymous heatmaps reveal stress-heavy periods and burnout trends across departments without exposing individual identities.',
            gradient: 'primary'
        },
        {
            icon: <Security />,
            title: 'Privacy-First Architecture',
            description: 'No raw personal data storage, differential privacy techniques, and mandatory user consent for ethical AI implementation.',
            gradient: 'secondary'
        },
        {
            icon: <TrendingUp />,
            title: 'Proactive Risk Detection',
            description: 'Identifies risks before escalation through continuous AI monitoring of academic, behavioral, and emotional indicators.',
            gradient: 'accent'
        }
    ];

    return (
        <section id="features" className="section features-section">
            <div className="container">
                <motion.div
                    className="section-header text-center"
                    data-aos="fade-up"
                >
                    <h2>
                        <GradientText variant="primary">Key Features</GradientText> & Innovations
                    </h2>
                    <p className="section-description">
                        Powered by cutting-edge Google AI technologies to provide comprehensive, ethical, and proactive support
                    </p>
                </motion.div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <Card className="feature-card" gradient>
                                <div className={`feature-icon gradient-${feature.gradient}`}>
                                    {feature.icon}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
