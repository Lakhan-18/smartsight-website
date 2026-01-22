// Generate realistic sample data for student dashboards
export const generateStudentData = (userId) => {
    const today = new Date();
    const days = 30;

    // Generate behavioral metrics for last 30 days
    const behavioralData = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        behavioralData.push({
            date: date.toISOString().split('T')[0],
            studyIrregularity: Math.floor(Math.random() * 40) + 30, // 30-70
            appSwitching: Math.floor(Math.random() * 50) + 20, // 20-70
            digitalFatigue: Math.floor(Math.random() * 60) + 20, // 20-80
        });
    }

    // Calculate wellness score based on recent metrics
    const recentMetrics = behavioralData.slice(-7);
    const avgIrregularity = recentMetrics.reduce((sum, d) => sum + d.studyIrregularity, 0) / 7;
    const avgSwitching = recentMetrics.reduce((sum, d) => sum + d.appSwitching, 0) / 7;
    const avgFatigue = recentMetrics.reduce((sum, d) => sum + d.digitalFatigue, 0) / 7;

    const wellnessScore = Math.round(100 - (avgIrregularity + avgSwitching + avgFatigue) / 3);

    // Generate risk factors
    const riskFactors = [];
    if (avgIrregularity > 50) {
        riskFactors.push('Irregular study patterns detected over the past week');
    }
    if (avgSwitching > 50) {
        riskFactors.push('High app-switching frequency indicating reduced focus');
    }
    if (avgFatigue > 60) {
        riskFactors.push('Elevated digital fatigue levels');
    }
    if (behavioralData.slice(-3).every(d => d.studyIrregularity > 60)) {
        riskFactors.push('3 consecutive days of late assignment submissions');
    }

    // Generate recommendations
    const recommendations = [
        {
            id: '1',
            type: 'mental',
            priority: wellnessScore < 60 ? 'high' : 'medium',
            title: 'Mindfulness & Stress Management',
            description: 'Try our 10-minute guided meditation to reduce stress and improve focus.',
            completed: false,
        },
        {
            id: '2',
            type: 'career',
            priority: 'medium',
            title: 'Career Assessment Tool',
            description: 'Discover your strengths and explore career paths that align with your interests.',
            completed: false,
        },
        {
            id: '3',
            type: 'digital',
            priority: avgFatigue > 60 ? 'high' : 'low',
            title: 'Digital Detox Challenge',
            description: 'Reduce screen time with our 7-day digital wellness program.',
            completed: false,
        },
    ];

    return {
        wellnessScore,
        riskFactors,
        behavioralData,
        recommendations,
    };
};

// Generate institutional aggregate data
export const generateInstitutionalData = () => {
    const departments = ['Computer Science', 'Engineering', 'Business', 'Arts', 'Science'];
    const today = new Date();

    // Generate heatmap data for last 90 days
    const heatmapData = [];
    for (let i = 89; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Higher stress during exam periods (simulate)
        const dayOfMonth = date.getDate();
        const isExamPeriod = dayOfMonth >= 20 && dayOfMonth <= 25;
        const baseStress = isExamPeriod ? 60 : 30;

        heatmapData.push({
            date: date.toISOString().split('T')[0],
            value: Math.floor(Math.random() * 40) + baseStress, // 30-70 or 60-100
        });
    }

    // Department statistics
    const departmentStats = departments.map(dept => ({
        name: dept,
        totalStudents: Math.floor(Math.random() * 300) + 100,
        atRisk: Math.floor(Math.random() * 30) + 10,
        avgWellness: Math.floor(Math.random() * 20) + 70,
    }));

    return {
        heatmapData,
        departmentStats,
        totalStudents: departmentStats.reduce((sum, d) => sum + d.totalStudents, 0),
        totalAtRisk: departmentStats.reduce((sum, d) => sum + d.atRisk, 0),
    };
};
