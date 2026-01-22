import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, VerifiedUser, Visibility } from '@mui/icons-material';
import Card from '../common/Card';
import GradientText from '../common/GradientText';
import './Ethics.css';

const Ethics = () => {
    const principles = [
        {
            icon: <Shield />,
            title: 'No Raw Personal Data Storage',
            description: 'All data is anonymized and aggregated before processing, ensuring individual privacy is protected at all times.'
        },
        {
            icon: <Lock />,
            title: 'Differential Privacy Techniques',
            description: 'Advanced privacy-preserving methods ensure insights are derived without compromising individual identities.'
        },
        {
            icon: <Visibility />,
            title: 'Transparent AI Explanations',
            description: 'Every risk score comes with clear, understandable explanations powered by Google Explainable AI.'
        },
        {
            icon: <VerifiedUser />,
            title: 'Mandatory User Consent',
            description: 'All users must explicitly opt-in with full understanding of data usage and privacy policies.'
        }
    ];

    return (
        <section id="ethics" className="section ethics-section">
            <div className="container">
                <motion.div
                    className="section-header text-center"
                    data-aos="fade-up"
                >
                    <h2>
                        <GradientText variant="secondary">Privacy-First</GradientText> & Ethical AI
                    </h2>
                    <p className="section-description">
                        Built on principles of transparency, consent, and data protection
                    </p>
                </motion.div>

                <div className="ethics-grid">
                    {principles.map((principle, index) => (
                        <Card
                            key={index}
                            className="ethics-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="ethics-icon">
                                {principle.icon}
                            </div>
                            <h3>{principle.title}</h3>
                            <p>{principle.description}</p>
                        </Card>
                    ))}
                </div>

                <div className="ethics-statement" data-aos="zoom-in" data-aos-delay="400">
                    <h3>Our Commitment</h3>
                    <p>
                        SmartSight is designed with <strong>ethical AI principles</strong> at its core.
                        We believe that technology should empower and protect users, not exploit them.
                        Every feature is built with privacy, transparency, and user agency as fundamental requirements.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Ethics;
