import React, { createContext, useContext } from 'react';
import { useAuth } from '../services/firebase/auth';

// Create the Auth Context
const AuthContext = createContext(null);

/**
 * AuthProvider component that wraps the app and provides authentication state
 * Uses the useAuth hook from auth.js to track Firebase authentication
 */
export const AuthProvider = ({ children }) => {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to access the authentication context
 * @returns {Object} { currentUser, loading }
 */
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }

    return context;
};

export default AuthProvider;
