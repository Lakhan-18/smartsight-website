import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../components/layout/Layout';
import BehavioralTracker from '../../components/dashboards/BehavioralTracker';

const BehaviorPage = () => {
    return (
        <Layout>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Behavioral Analysis
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Track your behavioral patterns and identify areas for improvement
                </Typography>

                <BehavioralTracker />
            </Box>
        </Layout>
    );
};

export default BehaviorPage;
