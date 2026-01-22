import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from '@mui/icons-material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Button from '../common/Button';
import GradientText from '../common/GradientText';
import './CTA.css';

const CTA = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if Firebase is configured
        if (!db) {
            setError('Firebase is not configured. Please set up your environment variables.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Add email to Firestore
            await addDoc(collection(db, 'waitlist'), {
                email,
                timestamp: new Date(),
            });

            setSubmitted(true);
            setEmail('');
        } catch (err) {
            console.error('Error submitting email:', err);
            setError('Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="cta" className="section cta-section">
            <div className="cta-background">
                <div className="gradient-orb orb-cta-1"></div>
                <div className="gradient-orb orb-cta-2"></div>
            </div>

            <div className="container">
                <motion.div
                    className="cta-content"
                    data-aos="zoom-in"
                >
                    <h2>
                        Ready to Transform <GradientText variant="primary" animate>Student Well-being?</GradientText>
                    </h2>
                    <p className="cta-description">
                        Join the waitlist to be among the first to experience SmartSight's AI-powered
                        early risk detection and guidance system.
                    </p>

                    {!submitted ? (
                        <form className="cta-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="email-input"
                                />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="large"
                                    loading={loading}
                                    icon={<Send />}
                                >
                                    Join Waitlist
                                </Button>
                            </div>
                            {error && <p className="error-message">{error}</p>}
                        </form>
                    ) : (
                        <div className="success-message">
                            <CheckCircle className="success-icon" />
                            <p>Thank you! You've been added to our waitlist.</p>
                        </div>
                    )}

                    <div className="cta-stats">
                        <div className="cta-stat">
                            <div className="stat-value">500+</div>
                            <div className="stat-label">On Waitlist</div>
                        </div>
                        <div className="cta-stat">
                            <div className="stat-value">50+</div>
                            <div className="stat-label">Institutions Interested</div>
                        </div>
                        <div className="cta-stat">
                            <div className="stat-value">Q2 2025</div>
                            <div className="stat-label">Expected Launch</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
