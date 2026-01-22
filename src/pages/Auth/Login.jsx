import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
    Divider,
    Avatar,
    Fade,
    Paper,
} from '@mui/material';
import { 
    Visibility, VisibilityOff, Login as LoginIcon, Google as GoogleIcon, 
    ArrowBack, Email, Lock 
} from '@mui/icons-material';
import { loginUser, signInWithGoogle } from '../../services/firebase/auth';
import { isDemoMode } from '../../config/firebase';
import useAuthStore from '../../store/authStore';

const Login = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // DEMO MODE - Always simulate successful login
        try {
            const demoUser = {
                uid: 'demo-user-' + Date.now(),
                email: formData.email,
                displayName: formData.email.split('@')[0],
            };
            
            setUser(demoUser, 'student');
            navigate('/student/dashboard');
        } catch (err) {
            setError('Demo login failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');

        // DEMO MODE - Always simulate successful Google sign-in
        try {
            const demoUser = {
                uid: 'demo-google-user-' + Date.now(),
                email: 'demo@example.com',
                displayName: 'Demo User',
            };
            
            setUser(demoUser, 'student');
            navigate('/student/dashboard');
        } catch (err) {
            setError('Demo Google sign-in failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Background Elements */}
            <Box sx={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: 300,
                height: 300,
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                borderRadius: '50%',
                opacity: 0.05,
                filter: 'blur(60px)',
                animation: 'float 8s ease-in-out infinite'
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '10%',
                right: '15%',
                width: 200,
                height: 200,
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                borderRadius: '50%',
                opacity: 0.05,
                filter: 'blur(40px)',
                animation: 'float 6s ease-in-out infinite reverse'
            }} />

            {/* Back Button */}
            <IconButton
                onClick={() => navigate('/')}
                sx={{
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                        color: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)'
                    }
                }}
            >
                <ArrowBack />
            </IconButton>

            <Container maxWidth="sm">
                <Fade in={true} timeout={800}>
                    <Paper sx={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 4,
                        p: { xs: 3, sm: 5 },
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Header */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Avatar sx={{
                                width: 80,
                                height: 80,
                                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                                color: 'white',
                                fontSize: '2rem',
                                fontWeight: 700,
                                mx: 'auto',
                                mb: 2
                            }}>
                                S
                            </Avatar>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#64748b' }}>
                                Sign in to your SmartSight account
                            </Typography>
                        </Box>

                        <Alert 
                            severity="info" 
                            sx={{ 
                                mb: 3,
                                borderRadius: 2,
                                '& .MuiAlert-icon': {
                                    color: '#3b82f6'
                                }
                            }}
                        >
                            <strong>Demo Mode:</strong> This is a demo version. Any email/password will work!
                        </Alert>

                        {error && (
                            <Alert 
                                severity="error" 
                                sx={{ 
                                    mb: 3,
                                    borderRadius: 2,
                                    '& .MuiAlert-icon': {
                                        color: '#ef4444'
                                    }
                                }}
                            >
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                sx={{ mb: 3 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email sx={{ color: '#64748b' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
                                sx={{ mb: 4 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: '#64748b' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                sx={{ color: '#64748b' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />

                            <Box sx={{ textAlign: 'right', mb: 3 }}>
                                <Link
                                    to="/reset-password"
                                    style={{ 
                                        color: '#3b82f6', 
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 500
                                    }}
                                >
                                    Forgot password?
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                                sx={{ 
                                    mb: 3, 
                                    py: 1.8,
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                                    '&:hover': {
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                                    },
                                    '&:disabled': {
                                        background: '#94a3b8',
                                        color: 'white'
                                    }
                                }}
                            >
                                {loading ? 'Signing in...' : 'Sign In to SmartSight'}
                            </Button>

                            <Divider sx={{ 
                                my: 3,
                                '&::before, &::after': {
                                    borderColor: '#e2e8f0'
                                }
                            }}>
                                <Typography variant="body2" sx={{ color: '#64748b', px: 2 }}>
                                    OR
                                </Typography>
                            </Divider>

                            <Button
                                fullWidth
                                variant="outlined"
                                size="large"
                                disabled={loading}
                                startIcon={<GoogleIcon />}
                                onClick={handleGoogleSignIn}
                                sx={{
                                    mb: 4,
                                    py: 1.8,
                                    borderColor: '#e2e8f0',
                                    color: '#374151',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    '&:hover': {
                                        borderColor: '#3b82f6',
                                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                    },
                                }}
                            >
                                Continue with Google
                            </Button>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                                    Don't have an account?
                                </Typography>
                                <Button
                                    variant="text"
                                    onClick={() => navigate('/signup')}
                                    sx={{
                                        color: '#3b82f6',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        '&:hover': {
                                            backgroundColor: 'rgba(59, 130, 246, 0.05)'
                                        }
                                    }}
                                >
                                    Create a new account
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default Login;
