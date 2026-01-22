import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Badge } from '@mui/material';
import { Menu as MenuIcon, Notifications, Logout, Person, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { DRAWER_WIDTH } from './Sidebar';

const Header = ({ onDrawerToggle }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notifAnchor, setNotifAnchor] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotifications = (event) => {
        setNotifAnchor(event.currentTarget);
    };

    const handleNotifClose = () => {
        setNotifAnchor(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { md: `${DRAWER_WIDTH}px` },
                bgcolor: 'background.paper',
                color: 'text.primary',
                boxShadow: 1,
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={onDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                    Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'Student'}!
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Notifications */}
                    <IconButton color="inherit" onClick={handleNotifications}>
                        <Badge badgeContent={3} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <Menu
                        anchorEl={notifAnchor}
                        open={Boolean(notifAnchor)}
                        onClose={handleNotifClose}
                    >
                        <MenuItem onClick={handleNotifClose}>
                            <Typography variant="body2">🎯 New recommendation available</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleNotifClose}>
                            <Typography variant="body2">📈 Wellness score improved!</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleNotifClose}>
                            <Typography variant="body2">⚠️ High stress detected today</Typography>
                        </MenuItem>
                    </Menu>

                    {/* User Menu */}
                    <IconButton onClick={handleMenu}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                            {(user?.displayName || user?.email || 'S')[0].toUpperCase()}
                        </Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { handleClose(); navigate('/student/settings'); }}>
                            <Person sx={{ mr: 1 }} /> Profile
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); navigate('/student/settings'); }}>
                            <Settings sx={{ mr: 1 }} /> Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <Logout sx={{ mr: 1 }} /> Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
