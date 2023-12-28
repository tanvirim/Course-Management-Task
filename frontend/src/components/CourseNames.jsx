import { useState, useEffect } from 'react';
import useCourseNameStore from '../store/caourseNames';

const CourseList = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { courses, fetchCourses } = useCourseNameStore((state) => state);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    // Update filtered courses when the 'courses' change
    setFilteredCourses(courses);
  }, [courses]);

  const handleCourseClick = (courseId) => {
    console.log('Clicked on course with ID:', courseId);
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
    <div>
      <input
        type='text'
        placeholder='Search courses...'
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <ul>
        {filteredCourses.map((course) => (
          <li key={course._id} onClick={() => handleCourseClick(course._id)}>
            {course.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
