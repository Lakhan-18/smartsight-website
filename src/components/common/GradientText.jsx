import React from 'react';
import { motion } from 'framer-motion';
import './GradientText.css';

const GradientText = ({
    children,
    variant = 'primary',
    animate = true,
    className = '',
    ...props
}) => {
    const textClass = `gradient-text gradient-${variant} ${animate ? 'gradient-animated' : ''} ${className}`;

    return (
        <motion.span
            className={textClass}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            {...props}
        >
            {children}
        </motion.span>
    );
};

export default GradientText;
