import { useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, isDemoMode } from '../../config/firebase';

// Sign in with email and password
export const loginUser = async (email, password) => {
    // Handle demo mode
    if (isDemoMode) {
        // Simulate successful login in demo mode
        const demoUser = {
            uid: 'demo-user-' + Date.now(),
            email: email,
            displayName: email.split('@')[0],
        };
        
        return {
            user: demoUser,
            role: 'student',
        };
    }
    
    if (!auth) throw new Error('Firebase not configured');

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        return {
            user: {
                uid: user.uid,
                email: user.email,
                displayName: userData?.name || user.email,
            },
            role: userData?.role || 'student',
        };
    } catch (error) {
        throw new Error(getAuthErrorMessage(error.code));
    }
};

// Sign in with Google
export const signInWithGoogle = async () => {
    // Handle demo mode
    if (isDemoMode) {
        // Simulate successful Google sign-in in demo mode
        const demoUser = {
            uid: 'demo-google-user-' + Date.now(),
            email: 'demo@example.com',
            displayName: 'Demo User',
        };
        
        return {
            user: demoUser,
            role: 'student',
        };
    }
    
    if (!auth || !db) throw new Error('Firebase not configured');

    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        // Check if user document exists
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        let role = 'student'; // Default role

        if (!userDoc.exists()) {
            // Create new user document for first-time Google sign-in
            await setDoc(userDocRef, {
                email: user.email,
                name: user.displayName || user.email.split('@')[0],
                role: 'student',
                privacyConsent: true,
                dataOptIns: {
                    behavioral: true,
                    academic: true,
                    emotional: true,
                },
                createdAt: new Date(),
            });

            // Initialize student data
            await setDoc(doc(db, 'students', user.uid), {
                uid: user.uid,
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
            });
        } else {
            const userData = userDoc.data();
            role = userData?.role || 'student';
        }

        return {
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || user.email.split('@')[0],
            },
            role,
        };
    } catch (error) {
        console.error('Google sign-in error:', error);
        throw new Error(getAuthErrorMessage(error.code));
    }
};

// Custom hook to track authentication state
export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If in demo mode, return immediately
        if (isDemoMode) {
            console.warn('Running in demo mode - Authentication is simulated');
            setLoading(false);
            setCurrentUser(null);
            return;
        }
        
        // If Firebase is not configured, return immediately
        if (!auth) {
            console.warn('Firebase Auth not configured');
            setLoading(false);
            setCurrentUser(null);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Get user role from Firestore
                if (db) {
                    try {
                        const userDoc = await getDoc(doc(db, 'users', user.uid));
                        const userData = userDoc.data();
                        setCurrentUser({
                            uid: user.uid,
                            email: user.email,
                            displayName: userData?.name || user.displayName || user.email,
                            role: userData?.role || 'student',
                        });
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        setCurrentUser({
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName || user.email,
                            role: 'student',
                        });
                    }
                } else {
                    setCurrentUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName || user.email,
                        role: 'student',
                    });
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { currentUser, loading };
};

// Sign up with email and password
export const signupUser = async (email, password, name, role = 'student', privacyConsent = false) => {
    // Handle demo mode
    if (isDemoMode) {
        if (!privacyConsent) {
            throw new Error('Privacy consent is required');
        }
        
        // Simulate successful signup in demo mode
        const demoUser = {
            uid: 'demo-user-' + Date.now(),
            email: email,
            displayName: name,
        };
        
        return {
            user: demoUser,
            role,
        };
    }
    
    if (!auth || !db) throw new Error('Firebase not configured');

    if (!privacyConsent) {
        throw new Error('Privacy consent is required');
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email,
            name,
            role,
            privacyConsent,
            dataOptIns: {
                behavioral: true,
                academic: true,
                emotional: true,
            },
            createdAt: new Date(),
        });

        // Initialize student data if role is student
        if (role === 'student') {
            await setDoc(doc(db, 'studentData', user.uid), {
                wellnessScore: 75,
                lastUpdated: new Date(),
            });
        }

        return {
            user: {
                uid: user.uid,
                email: user.email,
                displayName: name,
            },
            role,
        };
    } catch (error) {
        throw new Error(getAuthErrorMessage(error.code));
    }
};

// Sign out
export const logoutUser = async () => {
    if (!auth) throw new Error('Firebase not configured');

    try {
        await signOut(auth);
    } catch (error) {
        throw new Error('Failed to sign out');
    }
};

// Reset password
export const resetPassword = async (email) => {
    if (!auth) throw new Error('Firebase not configured');

    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw new Error(getAuthErrorMessage(error.code));
    }
};

// Listen to auth state changes
export const onAuthChange = (callback) => {
    if (!auth) return () => { };

    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Get user role
            if (db) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const userData = userDoc.data();
                callback({
                    user: {
                        uid: user.uid,
                        email: user.email,
                        displayName: userData?.name || user.email,
                    },
                    role: userData?.role || 'student',
                });
            } else {
                callback({ user, role: 'student' });
            }
        } else {
            callback(null);
        }
    });
};

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered';
        case 'auth/invalid-email':
            return 'Invalid email address';
        case 'auth/operation-not-allowed':
            return 'Operation not allowed';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters';
        case 'auth/user-disabled':
            return 'This account has been disabled';
        case 'auth/user-not-found':
            return 'No account found with this email';
        case 'auth/wrong-password':
            return 'Incorrect password';
        case 'auth/too-many-requests':
            return 'Too many attempts. Please try again later';
        default:
            return 'Authentication failed. Please try again';
    }
};
