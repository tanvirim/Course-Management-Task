import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCourseStore from '../store/courseStore';
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
            onClick={() => handleCourseClick(course._id)}
            className='bg-white py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-100'
          >
            {course.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseNames;
