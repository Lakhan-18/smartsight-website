import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownward } from '@mui/icons-material';
import Button from '../common/Button';
import './Hero.css';

const Hero = () => {
    const scrollToNext = () => {
        const nextSection = document.getElementById('problem');
        nextSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero">
            <div className="container hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Badge */}
                    <div className="hero-badge">
                        <span className="badge-icon">⚡</span>
                        POWERED BY GOOGLE AI
                    </div>

                    {/* Title */}
                    <h1 className="hero-title">
                        EARLY RISK
                        <span className="hero-title-highlight">DETECTION</span>
                        FOR URBAN YOUTH
                    </h1>

                    {/* Description */}
                    <p className="hero-description">
                        SmartSight uses ethical Google AI to proactively detect behavioral, academic,
                        and emotional risks before they escalate—providing timely, personalized guidance
                        to help students thrive.
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-cta">
                        <Button variant="accent" size="large">
                            GET STARTED
                        </Button>
                        <Button variant="primary" size="large">
                            LEARN MORE
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">95%</div>
                            <div className="stat-label">Detection Rate</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">50K+</div>
                            <div className="stat-label">Students</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Monitoring</div>
                        </div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator" onClick={scrollToNext}>
                    <ArrowDownward />
                </div>
            </div>
        </section>
    );
};

export default Hero;
