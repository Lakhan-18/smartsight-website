import React from 'react';
import { motion } from 'framer-motion';
import { School, Psychology, TrendingDown, Smartphone, Warning } from '@mui/icons-material';
import Card from '../common/Card';
import GradientText from '../common/GradientText';
import './ProblemStatement.css';

const ProblemStatement = () => {
    const problems = [
        { icon: <School />, title: 'Academic Burnout', description: 'Students face overwhelming pressure without early intervention' },
        { icon: <Psychology />, title: 'Emotional Stress', description: 'Anxiety and mental health issues go undetected until crisis' },
        { icon: <TrendingDown />, title: 'Learning Gaps', description: 'Academic struggles compound without timely support' },
        { icon: <Smartphone />, title: 'Digital Overload', description: 'Screen time and digital fatigue impact well-being' },
    ];

    return (
        <section id="problem" className="section problem-section">
            <div className="container">
                <motion.div
                    className="section-header text-center"
                    data-aos="fade-up"
                >
                    <h2>
                        The <GradientText variant="accent">Challenge</GradientText> We're Solving
                    </h2>
                    <p className="section-description">
                        Urban youth face hidden and compounding risks that current solutions fail to address proactively
                    </p>
                </motion.div>

                <div className="problem-grid" data-aos="fade-up" data-aos-delay="200">
                    {problems.map((problem, index) => (
                        <Card key={index} className="problem-card">
                            <div className="problem-icon">{problem.icon}</div>
                            <h3>{problem.title}</h3>
                            <p>{problem.description}</p>
                        </Card>
                    ))}
                </div>

                <div className="problem-highlight" data-aos="zoom-in" data-aos-delay="400">
                    <Warning className="warning-icon" />
                    <div>
                        <h3>Current Solutions Are Reactive</h3>
                        <p>
                            Most existing approaches depend on self-reporting and only act after problems have escalated.
                            There is <strong>no proactive, AI-powered, privacy-first system</strong> that simultaneously
                            monitors academic signals, digital behavior, emotional well-being, and career uncertainty.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
