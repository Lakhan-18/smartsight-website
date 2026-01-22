import React from 'react';
import { motion } from 'framer-motion';
import { School, Business, Public, TrendingUp } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../common/Card';
import GradientText from '../common/GradientText';
import './Impact.css';

const Impact = () => {
    const impactAreas = [
        {
            icon: <School />,
            title: 'For Students',
            benefits: [
                'Early burnout and stress detection',
                'Improved focus and academic productivity',
                'Clearer academic and career direction'
            ],
            color: 'var(--color-purple)'
        },
        {
            icon: <Business />,
            title: 'For Institutions',
            benefits: [
                'Reduced dropout and disengagement rates',
                'Data-driven academic planning',
                'Early well-being alerts'
            ],
            color: 'var(--color-blue)'
        },
        {
            icon: <Public />,
            title: 'For Society',
            benefits: [
                'Preventive mental health ecosystem',
                'Ethical and scalable AI adoption',
                'Social good through technology'
            ],
            color: 'var(--color-cyan)'
        }
    ];

    const chartData = [
        { name: 'Burnout Prevention', value: 85 },
        { name: 'Academic Success', value: 78 },
        { name: 'Mental Well-being', value: 92 },
        { name: 'Career Clarity', value: 71 }
    ];

    const pieData = [
        { name: 'Students', value: 50000 },
        { name: 'Institutions', value: 250 },
        { name: 'Counselors', value: 1200 }
    ];

    const COLORS = ['#8b5cf6', '#3b82f6', '#06b6d4'];

    return (
        <section id="impact" className="section impact-section">
            <div className="container">
                <motion.div
                    className="section-header text-center"
                    data-aos="fade-up"
                >
                    <h2>
                        Expected <GradientText variant="accent">Impact</GradientText>
                    </h2>
                    <p className="section-description">
                        Transforming lives through proactive AI-powered support and guidance
                    </p>
                </motion.div>

                <div className="impact-grid">
                    {impactAreas.map((area, index) => (
                        <Card
                            key={index}
                            className="impact-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                        >
                            <div className="impact-icon" style={{ background: area.color }}>
                                {area.icon}
                            </div>
                            <h3>{area.title}</h3>
                            <ul className="impact-benefits">
                                {area.benefits.map((benefit, benefitIndex) => (
                                    <li key={benefitIndex}>
                                        <TrendingUp className="benefit-icon" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>

                <div className="impact-charts" data-aos="fade-up" data-aos-delay="400">
                    <Card className="chart-card">
                        <h3>Impact Metrics</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                                <YAxis stroke="var(--color-text-secondary)" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--color-bg-secondary)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: 'var(--radius-md)'
                                    }}
                                />
                                <Bar dataKey="value" fill="url(#colorGradient)" />
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="var(--color-purple)" />
                                        <stop offset="100%" stopColor="var(--color-cyan)" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    <Card className="chart-card">
                        <h3>User Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--color-bg-secondary)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: 'var(--radius-md)'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Impact;
