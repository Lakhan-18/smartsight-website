import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Theme
import theme from './styles/theme';

// Auth Provider
import { AuthProvider } from './contexts/AuthProvider';

// Landing Pages
import Home from './pages/Home';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Protected Route
import ProtectedRoute from './components/auth/ProtectedRoute';

// Student Pages
import StudentDashboard from './pages/Student/Dashboard';
import CheckInPage from './pages/Student/CheckInPage';
import WellnessPage from './pages/Student/WellnessPage';
import BehaviorPage from './pages/Student/BehaviorPage';
import ResourcesPage from './pages/Student/ResourcesPage';
import PlannerPage from './pages/Student/PlannerPage';
import ProgressPage from './pages/Student/ProgressPage';
import SettingsPage from './pages/Student/SettingsPage';

// Institutional Pages
import InstitutionalDashboard from './pages/Institutional/Dashboard';

function App() {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <div className="App">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Student Routes - Protected */}
                        <Route
                            path="/student/dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <StudentDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student/checkin"
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <CheckInPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student/wellness"
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <WellnessPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student/behavior"
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <BehaviorPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student/resources"
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <ResourcesPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student/planner"
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <PlannerPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student/progress"
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <ProgressPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student/settings"
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <SettingsPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Institutional Routes - Protected */}
                        <Route
                            path="/institutional/dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['counselor', 'admin']}>
                                    <InstitutionalDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
