import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { generateStudentData } from '../../utils/dataGenerator';

/**
 * Fetch student data from Firestore
 * Falls back to mock data if Firestore is unavailable or document doesn't exist
 * @param {string} uid - User ID
 * @returns {Promise<Object>} Student data object
 */
export const fetchStudentData = async (uid) => {
    // If Firestore is not configured, use mock data
    if (!db) {
        console.warn('Firestore not configured, using mock data');
        return generateMockStudentData(uid);
    }

    try {
        const studentDocRef = doc(db, 'students', uid);
        const studentDoc = await getDoc(studentDocRef);

        if (studentDoc.exists()) {
            const data = studentDoc.data();

            // Transform Firestore data to match expected format
            return {
                uid: data.uid || uid,
                riskScore: data.riskScore || 75,
                riskFactors: data.riskFactors || [],
                behaviorData: data.behaviorData || [],
                wellnessScore: data.riskScore || 75, // Map riskScore to wellnessScore for compatibility
                behavioralData: transformBehaviorData(data.behaviorData || []),
                recommendations: data.recommendations || generateDefaultRecommendations(data.riskScore),
            };
        } else {
            // Document doesn't exist, use mock data
            console.warn(`No student data found for uid: ${uid}, using mock data`);
            return generateMockStudentData(uid);
        }
    } catch (error) {
        console.error('Error fetching student data from Firestore:', error);
        // Fallback to mock data on error
        return generateMockStudentData(uid);
    }
};

/**
 * Initialize student data in Firestore for new users
 * @param {string} uid - User ID
 * @param {Object} initialData - Optional initial data
 */
export const initializeStudentData = async (uid, initialData = {}) => {
    if (!db) {
        console.warn('Firestore not configured, cannot initialize student data');
        return;
    }

    try {
        const studentDocRef = doc(db, 'students', uid);

        const defaultData = {
            uid,
            riskScore: 75,
            riskFactors: [],
            behaviorData: [
                { day: 'Mon', focusHours: 3, appSwitches: 25 },
                { day: 'Tue', focusHours: 2.5, appSwitches: 30 },
                { day: 'Wed', focusHours: 4, appSwitches: 20 },
                { day: 'Thu', focusHours: 2, appSwitches: 45 },
                { day: 'Fri', focusHours: 3.5, appSwitches: 28 },
                { day: 'Sat', focusHours: 1, appSwitches: 60 },
                { day: 'Sun', focusHours: 2, appSwitches: 35 },
            ],
            lastUpdated: new Date(),
            ...initialData,
        };

        await setDoc(studentDocRef, defaultData);
        console.log('Student data initialized successfully');
    } catch (error) {
        console.error('Error initializing student data:', error);
        throw error;
    }
};

/**
 * Generate mock student data using the existing data generator
 * @param {string} uid - User ID
 * @returns {Object} Mock student data
 */
const generateMockStudentData = (uid) => {
    const mockData = generateStudentData(uid);

    // Add the required fields for the new format
    return {
        uid,
        riskScore: mockData.wellnessScore,
        riskFactors: mockData.riskFactors,
        behaviorData: [
            { day: 'Mon', focusHours: 3, appSwitches: 25 },
            { day: 'Tue', focusHours: 2.5, appSwitches: 30 },
            { day: 'Wed', focusHours: 4, appSwitches: 20 },
            { day: 'Thu', focusHours: 2, appSwitches: 45 },
            { day: 'Fri', focusHours: 3.5, appSwitches: 28 },
            { day: 'Sat', focusHours: 1, appSwitches: 60 },
            { day: 'Sun', focusHours: 2, appSwitches: 35 },
        ],
        ...mockData,
    };
};

/**
 * Transform behavior data from Firestore format to chart format
 * @param {Array} behaviorData - Raw behavior data from Firestore
 * @returns {Array} Transformed data for charts
 */
const transformBehaviorData = (behaviorData) => {
    // If already in the correct format, return as is
    if (behaviorData.length > 0 && behaviorData[0].day) {
        return behaviorData;
    }

    // Otherwise, transform from other possible formats
    return behaviorData.map((item, index) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index % 7],
        focusHours: item.focusHours || 0,
        appSwitches: item.appSwitches || 0,
    }));
};

/**
 * Generate default recommendations based on risk score
 * @param {number} riskScore - Student's risk score
 * @returns {Array} Array of recommendation objects
 */
const generateDefaultRecommendations = (riskScore = 75) => {
    return [
        {
            id: '1',
            type: 'mental',
            priority: riskScore < 60 ? 'high' : 'medium',
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
            priority: riskScore < 50 ? 'high' : 'low',
            title: 'Digital Detox Challenge',
            description: 'Reduce screen time with our 7-day digital wellness program.',
            completed: false,
        },
    ];
};
