import React from 'react';
import { Box, Typography, Paper, Grid, Switch, FormControlLabel, Button, Divider } from '@mui/material';
import { Download, Delete, Security } from '@mui/icons-material';
import Layout from '../../components/layout/Layout';

const SettingsPage = () => {
    const [settings, setSettings] = React.useState({
        notifications: true,
        dataSharing: false,
        riskAlerts: true,
        weeklyReports: true,
    });

    const handleToggle = (setting) => {
        setSettings({ ...settings, [setting]: !settings[setting] });
    };

    return (
        <Layout>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Settings & Privacy
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Manage your account, privacy, and data preferences
                </Typography>

                <Grid container spacing={3}>
                    {/* Privacy Settings */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Security /> Privacy Settings
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.notifications}
                                        onChange={() => handleToggle('notifications')}
                                    />
                                }
                                label="Enable Notifications"
                                sx={{ display: 'block', mb: 2 }}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.dataSharing}
                                        onChange={() => handleToggle('dataSharing')}
                                    />
                                }
                                label="Share Anonymous Data for Research"
                                sx={{ display: 'block', mb: 2 }}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.riskAlerts}
                                        onChange={() => handleToggle('riskAlerts')}
                                    />
                                }
                                label="Risk Alert Notifications"
                                sx={{ display: 'block', mb: 2 }}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.weeklyReports}
                                        onChange={() => handleToggle('weeklyReports')}
                                    />
                                }
                                label="Weekly Progress Reports"
                                sx={{ display: 'block' }}
                            />
                        </Paper>
                    </Grid>

                    {/* Data Management */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Data Management
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Button
                                variant="outlined"
                                startIcon={<Download />}
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                Download My Data
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Delete />}
                                fullWidth
                            >
                                Delete Account
                            </Button>

                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                                Your data is encrypted and stored securely. You have full control over your information.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Account Info */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Account Information
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body2" color="text.secondary">Account Created</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>December 22, 2025</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body2" color="text.secondary">Data Points Collected</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>1,247</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body2" color="text.secondary">Privacy Level</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>High</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body2" color="text.secondary">Last Login</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Today, 3:41 PM</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default SettingsPage;
