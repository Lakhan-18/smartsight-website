import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({
    children,
    className = '',
    hover = true,
    gradient = false,
    ...props
}) => {
    const cardClass = `card ${gradient ? 'card-gradient' : ''} ${className}`;

    return (
        <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={hover ? { y: -8, scale: 1.02 } : {}}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
