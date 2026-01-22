import React from 'react';
import { GitHub, LinkedIn, Twitter, Email } from '@mui/icons-material';
import GradientText from '../common/GradientText';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>
                            <GradientText variant="primary">SmartSight</GradientText>
                        </h3>
                        <p>AI-Powered Early Risk Detection for Urban Youth</p>
                        <div className="footer-social">
                            <a href="#" aria-label="GitHub" className="social-link">
                                <GitHub />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="social-link">
                                <LinkedIn />
                            </a>
                            <a href="#" aria-label="Twitter" className="social-link">
                                <Twitter />
                            </a>
                            <a href="#" aria-label="Email" className="social-link">
                                <Email />
                            </a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#tech-stack">Technology</a></li>
                                <li><a href="#architecture">Architecture</a></li>
                                <li><a href="#impact">Impact</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#problem">About</a></li>
                                <li><a href="#ethics">Privacy & Ethics</a></li>
                                <li><a href="#cta">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="#">Documentation</a></li>
                                <li><a href="#">API Reference</a></li>
                                <li><a href="#">Support</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} SmartSight. All rights reserved.</p>
                    <p>Built with ❤️ using Google AI Technologies</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
