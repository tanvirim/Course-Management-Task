import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCourseStore from '../store/courseStore';
import axios from 'axios';
import { baseUrl } from '../api/url';

const CourseNames = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { courses, fetchCourses } = useCourseStore((state) => state);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  const handleCourseClick = (courseId) => {
    navigate(`/course-details/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      // Handle error scenario
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchValue)
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className='mt-8'>
      <p className='text-2xl py-4'>Search Course</p>
      <input
        type='text'
        placeholder='Search courses...'
        value={searchTerm}
        onChange={handleSearchChange}
        className='w-full py-2 px-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500'
        style={{ cursor: 'text' }}
      />

      <ul className='space-y-2'>
        <p className='text-2xl py-4'>Course Lists</p>
        {filteredCourses.map((course) => (
          <li
            key={course._id}
            className='bg-white flex justify-between items-center py-2 px-4 rounded-lg'
          >
            <span
              onClick={() => handleCourseClick(course._id)}
              className='cursor-pointer'
            >
              {course.name}
            </span>
            <button
              onClick={() => handleDeleteCourse(course._id)}
              className='ml-4 text-red-500 bg-transparent border border-red-500 rounded-md py-1 px-3 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseNames;
