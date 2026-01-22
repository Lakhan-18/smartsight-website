import React from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import useAuthStore from '../../store/authStore';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, role, isAuthenticated, loading } = useAuthStore();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // Redirect to appropriate dashboard based on role
        if (role === 'student') {
            return <Navigate to="/student/dashboard" replace />;
        } else if (role === 'counselor' || role === 'admin') {
            return <Navigate to="/institutional/dashboard" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
