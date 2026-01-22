import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            role: null,
            isAuthenticated: false,
            loading: false,

            setUser: (user, role) => set({
                user,
                role,
                isAuthenticated: true
            }),

            logout: () => set({
                user: null,
                role: null,
                isAuthenticated: false
            }),

            setLoading: (loading) => set({ loading }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;
