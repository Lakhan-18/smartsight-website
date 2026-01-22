import React, { useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Card,
    CardContent,
} from '@mui/material';
import {
    AccountCircle,
    Logout,
    Dashboard as DashboardIcon,
    People,
    Warning,
    TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import useAuthStore from '../../store/authStore';
import useInstitutionalStore from '../../store/institutionalStore';
import { logoutUser } from '../../services/firebase/auth';

const InstitutionalDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { departmentStats, totalStudents, totalAtRisk, loadInstitutionalData } = useInstitutionalStore();
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        loadInstitutionalData();
    }, [loadInstitutionalData]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const atRiskPercentage = totalStudents > 0 ? ((totalAtRisk / totalStudents) * 100).toFixed(1) : 0;

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#FAFAFA' }}>
            {/* App Bar */}
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <DashboardIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SmartSight - Institutional Dashboard
                    </Typography>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                        {user?.displayName || user?.email}
                    </Typography>
                    <IconButton
                        size="large"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>
                            <Logout sx={{ mr: 1 }} /> Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Welcome Section */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
                            <Typography variant="h4" gutterBottom>
                                Institutional Analytics Dashboard
                            </Typography>
                            <Typography variant="body1">
                                Anonymized aggregate insights to support student well-being
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Overview Stats */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <People color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                    <Box>
                                        <Typography variant="h4">{totalStudents}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Students
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Warning color="warning" sx={{ fontSize: 40, mr: 2 }} />
                                    <Box>
                                        <Typography variant="h4">{totalAtRisk}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Students At Risk
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <TrendingUp color="success" sx={{ fontSize: 40, mr: 2 }} />
                                    <Box>
                                        <Typography variant="h4">{atRiskPercentage}%</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            At-Risk Percentage
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Department Statistics */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Department-wise Student Distribution
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Anonymized aggregate data - no individual student information
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={departmentStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="name" stroke="#757575" />
                                    <YAxis stroke="#757575" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="totalStudents" fill="#009688" name="Total Students" />
                                    <Bar dataKey="atRisk" fill="#EF5350" name="At Risk" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* Privacy Notice */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, bgcolor: 'info.light' }}>
                            <Typography variant="body2" color="info.dark">
                                🔒 <strong>Privacy Protected:</strong> All data shown is anonymized and aggregated.
                                No individual student identities are visible in this dashboard.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default InstitutionalDashboard;
