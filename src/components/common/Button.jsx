import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    icon,
    loading = false,
    onClick,
    className = '',
    ...props
}) => {
    const buttonClass = `btn btn-${variant} btn-${size} ${className}`;

    return (
        <motion.button
            className={buttonClass}
            onClick={onClick}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            {...props}
        >
            {loading ? (
                <span className="btn-spinner"></span>
            ) : (
                <>
                    {icon && <span className="btn-icon">{icon}</span>}
                    <span>{children}</span>
                </>
            )}
        </motion.button>
    );
};

export default Button;
