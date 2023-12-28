// courseStore.js
import create from 'zustand';

const useCourseNameStore = create((set) => ({
  courses: [],
  fetchCourses: () => {
    fetch('http://localhost:8080/api/courses')
      .then((response) => response.json())
      .then((data) => {
        set({ courses: data });
      })
      .catch((error) => console.error('Error fetching courses:', error));
  },
}));

export default useCourseNameStore;
