import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if running in development mode
const isDemoMode = firebaseConfig.apiKey === 'demo-api-key' || !firebaseConfig.apiKey;

// Initialize Firebase only if API key is provided and not in demo mode
let app = null;
let auth = null;
let db = null;
let analytics = null;

if (firebaseConfig.apiKey && !isDemoMode) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
    } catch (error) {
        console.warn('Firebase initialization failed:', error);
    }
} else {
    console.warn('Running in demo mode - Firebase services are disabled. Please configure Firebase for full functionality.');
}

export { auth, db, analytics, isDemoMode };
export default app;

