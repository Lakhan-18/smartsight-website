import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Box, Typography, Divider } from '@mui/material';
import {
    Dashboard,
    FavoriteBorder,
    Timeline,
    LocalLibrary,
    CalendarMonth,
    TrendingUp,
    Settings,
    Psychology,
    EditNote
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 260;

const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/student/dashboard' },
    { text: 'Daily Check-In', icon: <EditNote />, path: '/student/checkin' },
    { text: 'Wellness', icon: <FavoriteBorder />, path: '/student/wellness' },
    { text: 'Behavior', icon: <Timeline />, path: '/student/behavior' },
    { text: 'Resources', icon: <LocalLibrary />, path: '/student/resources' },
    { text: 'Study Planner', icon: <CalendarMonth />, path: '/student/planner' },
    { text: 'Progress', icon: <TrendingUp />, path: '/student/progress' },
];

const bottomItems = [
    { text: 'Settings', icon: <Settings />, path: '/student/settings' },
];

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Logo */}
            <Box sx={{ p: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Psychology /> SmartSight
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    AI-Powered Risk Detection
                </Typography>
            </Box>

            {/* Main Menu */}
            <List sx={{ flex: 1, pt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                            sx={{
                                mx: 1,
                                borderRadius: 2,
                                '&.Mui-selected': {
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? 'white' : 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider />

            {/* Bottom Menu */}
            <List sx={{ pb: 2 }}>
                {bottomItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                            sx={{
                                mx: 1,
                                borderRadius: 2,
                                '&.Mui-selected': {
                                    bgcolor: 'action.selected',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        >
            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
export { DRAWER_WIDTH };
