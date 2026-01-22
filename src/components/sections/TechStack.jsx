import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Psychology, Code } from '@mui/icons-material';
import Card from '../common/Card';
import GradientText from '../common/GradientText';
import './TechStack.css';

const TechStack = () => {
    const techCategories = [
        {
            icon: <Cloud />,
            title: 'Google Cloud & Firebase',
            technologies: [
                { name: 'Firebase Authentication', desc: 'Secure, consent-based access' },
                { name: 'Firestore Database', desc: 'Scalable behavioral data storage' },
                { name: 'Cloud Functions', desc: 'Serverless backend processing' },
                { name: 'Cloud Run', desc: 'Containerized AI service deployment' },
                { name: 'Cloud Monitoring', desc: 'Performance tracking' }
            ],
            gradient: 'primary'
        },
        {
            icon: <Psychology />,
            title: 'Google AI & Machine Learning',
            technologies: [
                { name: 'Vertex AI AutoML', desc: 'Risk prediction models' },
                { name: 'TensorFlow', desc: 'Behavioral pattern learning' },
                { name: 'Natural Language API', desc: 'Sentiment extraction' },
                { name: 'Explainable AI', desc: 'Model interpretability' }
            ],
            gradient: 'secondary'
        },
        {
            icon: <Code />,
            title: 'Frontend Technologies',
            technologies: [
                { name: 'React + Firebase SDK', desc: 'Scalable responsive UI' },
                { name: 'Material UI', desc: 'Accessible design system' },
                { name: 'Progressive Web App', desc: 'Offline access support' }
            ],
            gradient: 'accent'
        }
    ];

    return (
        <section id="tech-stack" className="section tech-section">
            <div className="container">
                <motion.div
                    className="section-header text-center"
                    data-aos="fade-up"
                >
                    <h2>
                        Powered by <GradientText variant="secondary">Google Technologies</GradientText>
                    </h2>
                    <p className="section-description">
                        Built on enterprise-grade Google Cloud infrastructure and cutting-edge AI/ML services
                    </p>
                </motion.div>

                <div className="tech-grid">
                    {techCategories.map((category, index) => (
                        <Card
                            key={index}
                            className="tech-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                        >
                            <div className={`tech-icon gradient-${category.gradient}`}>
                                {category.icon}
                            </div>
                            <h3>{category.title}</h3>
                            <div className="tech-list">
                                {category.technologies.map((tech, techIndex) => (
                                    <div key={techIndex} className="tech-item">
                                        <div className="tech-name">{tech.name}</div>
                                        <div className="tech-desc">{tech.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
