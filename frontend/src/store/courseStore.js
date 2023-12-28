import { create } from 'zustand';
import axios from 'axios';

const useCourseStore = create((set) => ({
  courses: [],
  fetchCourses: async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/courses');
      set({ courses: response.data });
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  },
}));

export default useCourseStore;
