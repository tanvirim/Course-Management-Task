import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCourseNameStore from '../store/caourseNames';

const CourseNames = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { courses, fetchCourses } = useCourseNameStore((state) => state);

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

export default CourseNames;
