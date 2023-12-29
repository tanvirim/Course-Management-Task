import { create } from 'zustand';
import axios from 'axios';
import { baseUrl } from '../api/url';

const useCourseStore = create((set) => ({
  courses: [],
  fetchCourses: async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/courses`);
      set({ courses: response.data });
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  },
}));

export default useCourseStore;
