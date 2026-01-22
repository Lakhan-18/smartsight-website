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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import { signupUser } from '../../services/firebase/auth';
import { isDemoMode } from '../../config/firebase';
import useAuthStore from '../../store/authStore';

const Signup = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        privacyConsent: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        if (!formData.privacyConsent) {
            setError('You must accept the privacy policy to continue');
            setLoading(false);
            return;
        }

        // DEMO MODE - Always simulate successful signup
        try {
            const demoUser = {
                uid: 'demo-user-' + Date.now(),
                email: formData.email,
                displayName: formData.name,
            };
            
            setUser(demoUser, formData.role);

            // Redirect based on role
            if (formData.role === 'student') {
                navigate('/student/dashboard');
            } else if (formData.role === 'counselor' || formData.role === 'admin') {
                navigate('/institutional/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Demo signup failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 5,
                }}
            >
                <Card sx={{ width: '100%', boxShadow: 4, borderRadius: 3 }}>
                    <CardContent sx={{ p: 5 }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h4" component="h1" gutterBottom color="primary">
                                SmartSight
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Create your account
                            </Typography>
                        </Box>

                        <Alert severity="info" sx={{ mb: 3 }}>
                            <strong>Demo Mode:</strong> This is a demo version. Any email/password will work!
                        </Alert>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                                sx={{ mb: 2.5 }}
                            />

                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                sx={{ mb: 2 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                sx={{ mb: 2 }}
                            />

                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>I am a...</InputLabel>
                                <Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    label="I am a..."
                                >
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="counselor">Counselor</MenuItem>
                                    <MenuItem value="admin">Administrator</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="privacyConsent"
                                        checked={formData.privacyConsent}
                                        onChange={handleChange}
                                        required
                                    />
                                }
                                label={
                                    <Typography variant="body2" color="text.secondary">
                                        I agree to the privacy policy and consent to data collection for
                                        early risk detection (required)
                                    </Typography>
                                }
                                sx={{ mb: 3 }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} /> : <PersonAdd />}
                                sx={{ mb: 2.5, py: 1.5 }}
                            >
                                {loading ? 'Creating account...' : 'Sign Up'}
                            </Button>

                            <Typography variant="body2" align="center" color="text.secondary">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    style={{ color: '#009688', textDecoration: 'none', fontWeight: 600 }}
                                >
                                    Sign in
                                </Link>
                            </Typography>
                        </form>

                        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
                            <Typography variant="body2" align="center" color="text.secondary">
                                <Link
                                    to="/"
                                    style={{ color: '#009688', textDecoration: 'none' }}
                                >
                                    ← Back to home
                                </Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Signup;
