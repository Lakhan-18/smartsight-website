import React, { useState, useEffect } from 'react';
import { Box, Toolbar, Fade } from '@mui/material';
import Sidebar, { DRAWER_WIDTH } from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Pattern */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
                    `,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />
            
            <Header onDrawerToggle={handleDrawerToggle} />
            <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                    minHeight: '100vh',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Toolbar /> {/* Spacer for fixed header */}
                <Box sx={{ 
                    p: { xs: 2, sm: 3, md: 4 },
                    position: 'relative'
                }}>
                    <Fade in={isVisible} timeout={600}>
                        <Box sx={{
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            p: { xs: 2, md: 3 },
                            minHeight: 'calc(100vh - 140px)',
                            transition: 'all 0.3s ease'
                        }}>
                            {children}
                        </Box>
                    </Fade>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
