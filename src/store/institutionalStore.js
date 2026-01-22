import { create } from 'zustand';
import { generateInstitutionalData } from '../utils/dataGenerator';

const useInstitutionalStore = create((set) => ({
    heatmapData: [],
    departmentStats: [],
    totalStudents: 0,
    totalAtRisk: 0,
    loading: false,

    // Load institutional data
    loadInstitutionalData: () => {
        set({ loading: true });

        // Simulate API call with generated data
        setTimeout(() => {
            const data = generateInstitutionalData();
            set({
                heatmapData: data.heatmapData,
                departmentStats: data.departmentStats,
                totalStudents: data.totalStudents,
                totalAtRisk: data.totalAtRisk,
                loading: false,
            });
        }, 500);
    },
}));

export default useInstitutionalStore;
