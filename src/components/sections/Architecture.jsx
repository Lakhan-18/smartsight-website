import React from 'react';
import { motion } from 'framer-motion';
import { Devices, CloudQueue, Psychology } from '@mui/icons-material';
import Card from '../common/Card';
import GradientText from '../common/GradientText';
import './Architecture.css';

const Architecture = () => {
    const layers = [
        {
            icon: <Devices />,
            title: 'Client Layer',
            items: [
                'React-based Progressive Web App',
                'Logs user interactions and behavioral events',
                'Displays insights, alerts, and recommendations'
            ],
            gradient: 'primary'
        },
        {
            icon: <CloudQueue />,
            title: 'Backend Layer',
            items: [
                'Firebase Cloud Functions',
                'Event preprocessing and anonymization',
                'Secure communication with AI services'
            ],
            gradient: 'secondary'
        },
        {
            icon: <Psychology />,
            title: 'AI & Intelligence Layer',
            items: [
                'Vertex AI for anomaly detection',
                'Sentiment-based risk classification',
                'Recommendation and guidance engine'
            ],
            gradient: 'accent'
        }
    ];

    return (
        <section id="architecture" className="section architecture-section">
            <div className="container">
                <motion.div
                    className="section-header text-center"
                    data-aos="fade-up"
                >
                    <h2>
                        System <GradientText variant="primary">Architecture</GradientText>
                    </h2>
                    <p className="section-description">
                        Three-layer architecture ensuring scalability, security, and intelligent processing
                    </p>
                </motion.div>

                <div className="architecture-diagram">
                    {layers.map((layer, index) => (
                        <React.Fragment key={index}>
                            <Card
                                className="architecture-layer"
                                data-aos="fade-up"
                                data-aos-delay={index * 200}
                            >
                                <div className={`layer-icon gradient-${layer.gradient}`}>
                                    {layer.icon}
                                </div>
                                <h3>{layer.title}</h3>
                                <ul className="layer-items">
                                    {layer.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            </Card>
                            {index < layers.length - 1 && (
                                <div className="layer-connector" data-aos="fade-in" data-aos-delay={(index * 200) + 100}>
                                    <div className="connector-line"></div>
                                    <div className="connector-arrow">↓</div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Architecture;
